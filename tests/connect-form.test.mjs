import test from 'node:test';
import assert from 'node:assert/strict';
import { createEnquirySender, getEnquiryContext } from '../connect-form.mjs';

for (const success of [true, 'true']) {
  test(`accepts explicit success ${JSON.stringify(success)}`, async () => {
    let request;
    const send = createEnquirySender(async (url, options) => {
      request = { url, ...options };
      return { ok: true, json: async () => ({ success }) };
    });
    assert.equal(
      await send({ name: 'Demo Person', product: 'Velocity' }),
      true
    );
    assert.equal(JSON.parse(request.body).product, 'Velocity');
    assert.equal(request.method, 'POST');
  });
}
for (const success of [false, 'false', undefined]) {
  test(`rejects service response ${JSON.stringify(success)}`, async () => {
    const send = createEnquirySender(async () => ({
      ok: true,
      json: async () => ({ success }),
    }));
    await assert.rejects(send({}), /accepted/);
  });
}
test('rejects HTTP failure even with a success payload', async () => {
  const send = createEnquirySender(async () => ({
    ok: false,
    json: async () => ({ success: true }),
  }));
  await assert.rejects(send({}), /accepted/);
});
test('invalid JSON and network failure allow a retry', async () => {
  let count = 0;
  const send = createEnquirySender(async () => {
    count++;
    if (count === 1) throw new Error('Network unavailable');
    if (count === 2)
      return {
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      };
    return { ok: true, json: async () => ({ success: 'true' }) };
  });
  await assert.rejects(send({}));
  await assert.rejects(send({}));
  assert.equal(await send({}), true);
});
test('suppresses concurrent sends while allowing the first to finish', async () => {
  let resolve;
  let calls = 0;
  const send = createEnquirySender(() => {
    calls++;
    return new Promise((r) => {
      resolve = r;
    });
  });
  const first = send({});
  assert.equal(await send({}), false);
  assert.equal(calls, 1);
  resolve({ ok: true, json: async () => ({ success: 'true' }) });
  assert.equal(await first, true);
});
test('Velocity context is allowlisted and supports the old demo link', () => {
  assert.equal(getEnquiryContext('?product=velocity').product, 'Velocity');
  assert.equal(
    getEnquiryContext('?product=velocity').emailHref,
    'mailto:hello@astrai.in?subject=Velocity%20demo%20request'
  );
  assert.equal(
    getEnquiryContext('?subject=Velocity_ERP_Demo').product,
    'Velocity'
  );
  assert.equal(getEnquiryContext('?product=untrusted'), null);
  assert.equal(getEnquiryContext(''), null);
});

test('Velocity enquiry funnel: observer records started on send and succeeded on confirmation', async () => {
  const events = [];
  const trackEvent = (name, props) => events.push({ name, props });
  const { createVelocityFormObserver } =
    await import('../velocity-analytics.mjs');
  const observer = createVelocityFormObserver(trackEvent);
  const context = getEnquiryContext('?product=velocity');

  const { submitEnquiryForm } = await import('../connect-form.mjs');

  const send = createEnquirySender(async () => ({
    ok: true,
    json: async () => ({ success: true }),
  }));

  const accepted = await submitEnquiryForm({
    send,
    fields: { name: 'Dr. Test' },
    context,
    observer,
  });

  assert.equal(accepted, true);
  assert.equal(events.length, 2);
  assert.deepEqual(events[0], {
    name: 'velocity_form_start',
    props: { product: 'velocity' },
  });
  assert.deepEqual(events[1], {
    name: 'velocity_form_success',
    props: { product: 'velocity' },
  });
});

test('Velocity enquiry funnel: retry after failure emits single start and single success', async () => {
  const events = [];
  const trackEvent = (name, props) => events.push({ name, props });
  const { createVelocityFormObserver } =
    await import('../velocity-analytics.mjs');
  const observer = createVelocityFormObserver(trackEvent);
  const context = getEnquiryContext('?product=velocity');

  const { submitEnquiryForm } = await import('../connect-form.mjs');

  let attempt = 0;
  const flakySend = createEnquirySender(async () => {
    attempt++;
    if (attempt === 1) {
      throw new Error('Connection reset');
    }
    return { ok: true, json: async () => ({ success: true }) };
  });

  // Attempt 1 fails
  await assert.rejects(
    submitEnquiryForm({
      send: flakySend,
      fields: { name: 'Dr. Test' },
      context,
      observer,
    })
  );

  // Started should have fired once, success 0
  assert.equal(events.length, 1);
  assert.equal(events[0].name, 'velocity_form_start');

  // Attempt 2 succeeds
  const accepted = await submitEnquiryForm({
    send: flakySend,
    fields: { name: 'Dr. Test' },
    context,
    observer,
  });

  assert.equal(accepted, true);
  // Total events: 1 start and 1 success
  assert.equal(events.length, 2);
  assert.equal(events[1].name, 'velocity_form_success');
});

test('Generic enquiry does not emit Velocity funnel events', async () => {
  const events = [];
  const trackEvent = (name, props) => events.push({ name, props });
  const { createVelocityFormObserver } =
    await import('../velocity-analytics.mjs');
  const observer = createVelocityFormObserver(trackEvent);
  const context = getEnquiryContext('?product=general'); // null context

  const { submitEnquiryForm } = await import('../connect-form.mjs');

  const send = createEnquirySender(async () => ({
    ok: true,
    json: async () => ({ success: true }),
  }));

  const accepted = await submitEnquiryForm({
    send,
    fields: { name: 'General User' },
    context,
    observer,
  });

  assert.equal(accepted, true);
  assert.equal(events.length, 0);
});

test('Observer transport error does not break form submission', async () => {
  const brokenObserver = {
    started() {
      throw new Error('Telemetry explosion');
    },
    succeeded() {
      throw new Error('Telemetry explosion');
    },
  };
  const context = getEnquiryContext('?product=velocity');
  const { submitEnquiryForm } = await import('../connect-form.mjs');

  const send = createEnquirySender(async () => ({
    ok: true,
    json: async () => ({ success: true }),
  }));

  const accepted = await submitEnquiryForm({
    send,
    fields: { name: 'Dr. Safe' },
    context,
    observer: brokenObserver,
  });

  assert.equal(accepted, true);
});

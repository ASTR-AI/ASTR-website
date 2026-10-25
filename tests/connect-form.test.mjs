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

import test from 'node:test';
import assert from 'node:assert/strict';
import { createEnquiryHandler } from '../server/enquiry-handler.mjs';

const fields = {
  name: 'Demo Person',
  email: 'demo@example.com',
  product: 'Velocity',
};
const googleUrl = 'https://script.google.com/macros/s/example/exec';
const response = (data, ok = true) => ({ ok, json: async () => data });

function reply() {
  return {
    code: 200,
    status(code) {
      this.code = code;
      return this;
    },
    setHeader() {},
    json(data) {
      this.data = data;
    },
  };
}

test('confirms Google fallback email when FormSubmit is down', async () => {
  const calls = [];
  const handle = createEnquiryHandler({
    sheetUrl: googleUrl,
    fetchImpl: async (url, options) => {
      calls.push({ url, data: JSON.parse(options.body) });
      return url === googleUrl
        ? response({ result: 'success', emailSent: true })
        : response({}, false);
    },
  });
  const res = reply();
  await handle({ method: 'POST', body: fields }, res);
  assert.equal(res.code, 200);
  assert.equal(res.data.success, true);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].data.sendEmail, true);
});

test('keeps FormSubmit delivery and records Sheets without duplicate Google email', async () => {
  const handle = createEnquiryHandler({
    sheetUrl: googleUrl,
    fetchImpl: async (url, options) => {
      if (url === googleUrl) {
        assert.equal(JSON.parse(options.body).sendEmail, false);
        return response({ result: 'success' });
      }
      return response({ success: 'true' });
    },
  });
  const res = reply();
  await handle({ method: 'POST', body: fields }, res);
  assert.equal(res.data.success, true);
});

for (const googleData of [
  { result: 'success' },
  { result: 'success', emailSent: false },
]) {
  test(
    'does not claim email acceptance for a saved row alone ' +
      JSON.stringify(googleData),
    async () => {
      const handle = createEnquiryHandler({
        sheetUrl: googleUrl,
        fetchImpl: async (url) =>
          url === googleUrl ? response(googleData) : response({}, false),
      });
      const res = reply();
      await handle({ method: 'POST', body: fields }, res);
      assert.equal(res.code, 503);
      assert.equal(res.data.success, false);
    }
  );
}

test('rejects invalid fields and unsupported methods without upstream requests', async () => {
  const handle = createEnquiryHandler({
    fetchImpl: async () => {
      throw new Error('must not send');
    },
  });
  for (const [req, code] of [
    [{ method: 'GET' }, 405],
    [{ method: 'POST', body: {} }, 400],
    [{ method: 'POST', body: 'broken' }, 400],
  ]) {
    const res = reply();
    await handle(req, res);
    assert.equal(res.code, code);
  }
});

test('email success survives Sheets network failure', async () => {
  const handle = createEnquiryHandler({
    sheetUrl: googleUrl,
    fetchImpl: async (url) => {
      if (url === googleUrl) throw new Error('offline');
      return response({ success: true });
    },
  });
  const res = reply();
  await handle({ method: 'POST', body: fields }, res);
  assert.equal(res.data.success, true);
});

test('generic contact submissions are not labelled Velocity in Sheets', async () => {
  const handle = createEnquiryHandler({
    sheetUrl: googleUrl,
    fetchImpl: async (url, options) => {
      if (url === googleUrl) {
        assert.equal(JSON.parse(options.body).product, 'Website enquiry');
        assert.equal(JSON.parse(options.body).org, 'City Hospital');
        return response({ result: 'success' });
      }
      return response({ success: true });
    },
  });
  const res = reply();
  await handle(
    {
      method: 'POST',
      body: {
        name: 'Demo Person',
        email: 'demo@example.com',
        org: 'City Hospital',
      },
    },
    res
  );
  assert.equal(res.data.success, true);
});

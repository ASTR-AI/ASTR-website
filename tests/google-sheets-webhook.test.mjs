import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

for (const encoding of ['json', 'parameters', 'email-fallback']) {
  test(`Apps Script appends seven ordered columns from ${encoding}`, () => {
    const rows = [];
    const emails = [];
    const context = vm.createContext({
      SpreadsheetApp: {
        openById: () => ({
          getSheetByName: (name) => {
            assert.equal(name, 'Enquiries');
            return { appendRow: (row) => rows.push(Array.from(row)) };
          },
        }),
      },
      Utilities: {
        formatDate: (_date, timezone, format) => {
          assert.equal(timezone, 'Asia/Kolkata');
          assert.equal(format, 'yyyy-MM-dd HH:mm:ss');
          return '2026-10-30 12:00:00';
        },
      },
      ContentService: {
        MimeType: { JSON: 'application/json' },
        createTextOutput: (text) => ({
          setMimeType: () => JSON.parse(text),
        }),
      },
      MailApp: { sendEmail: (mail) => emails.push(mail) },
    });
    vm.runInContext(
      readFileSync(
        new URL(
          '../docs/integrations/google-sheets-webhook.gs',
          import.meta.url
        ),
        'utf8'
      ),
      context
    );
    const data = {
      name: '=IMPORTXML("https://example.com", "//x")',
      email: 'demo@example.com',
      organizationType: 'Hospital',
      organizationName: 'City Hospital',
      phone: '+91 9876543210',
      sendEmail: encoding === 'email-fallback',
    };
    const event =
      encoding !== 'parameters'
        ? { postData: { contents: JSON.stringify(data) } }
        : { postData: { contents: 'name=Demo' }, parameter: data };
    const result = context.doPost(event);
    assert.equal(result.result, 'success');
    assert.equal(result.emailSent, encoding === 'email-fallback');
    assert.equal(emails.length, encoding === 'email-fallback' ? 1 : 0);
    if (emails.length) {
      assert.equal(emails[0].to, 'hello@astrai.in');
      assert.match(emails[0].body, /demo@example.com/);
    }
    assert.deepEqual(rows, [
      [
        '2026-10-30 12:00:00',
        '\'=IMPORTXML("https://example.com", "//x")',
        'demo@example.com',
        'Hospital',
        'City Hospital',
        '+91 9876543210',
        'Velocity',
      ],
    ]);
  });
}

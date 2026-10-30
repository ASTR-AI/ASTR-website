// Replace with the ID between /d/ and /edit in your Google Sheet URL.
const SPREADSHEET_ID = '1mbqmhhqDhZD7VxNMbCNnTaIhmE2p4SsYmODaiMUA3GE';
const SHEET_NAME = 'Enquiries';

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Create the Enquiries sheet tab before submitting.');

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch {
    data = e.parameter;
  }

  // appendRow treats a leading equals sign as a formula; store it as text.
  const cell = (value) => {
    const text = String(value || '');
    return text.startsWith('=') ? "'" + text : text;
  };

  sheet.appendRow([
    Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss'),
    cell(data.name),
    cell(data.email),
    cell(data.organizationType),
    cell(data.organizationName || data.org),
    cell(data.phone),
    cell(data.product || 'Velocity'),
  ]);

  let emailSent = false;
  if (data.sendEmail === true) {
    MailApp.sendEmail({
      to: 'hello@astrai.in',
      subject: data.product === 'Velocity'
        ? 'Velocity demo request — ASTR AI'
        : 'Website enquiry — ASTR AI',
      body: [
        'Name: ' + String(data.name || ''),
        'Email: ' + String(data.email || ''),
        'Organisation type: ' + String(data.organizationType || ''),
        'Organisation name: ' + String(data.organizationName || data.org || ''),
        'Phone: ' + String(data.phone || ''),
        'Message: ' + String(data.message || ''),
      ].join('\n'),
    });
    emailSent = true;
  }

  return ContentService.createTextOutput(JSON.stringify({ result: 'success', emailSent }))
    .setMimeType(ContentService.MimeType.JSON);
}

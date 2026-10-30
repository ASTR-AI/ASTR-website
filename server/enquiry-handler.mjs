export const GOOGLE_SHEETS_URL =
  'https://script.google.com/macros/s/AKfycby6jkuD7Q65wBLothccW54wzxarwt1hziMAaadgySsU7Vr0kvhlUBDk_lop_AMRq1UTdg/exec';

export function createEnquiryHandler({
  fetchImpl = fetch,
  sheetUrl = process.env.GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL,
} = {}) {
  return async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ success: false });
    }
    let fields;
    try {
      fields = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!fields || typeof fields !== 'object' || Array.isArray(fields))
        throw new Error();
      if (
        typeof fields.name !== 'string' ||
        !fields.name.trim() ||
        typeof fields.email !== 'string' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)
      )
        throw new Error();
      const allowed = [
        'name',
        'email',
        'phone',
        'organizationType',
        'organizationName',
        'org',
        'message',
        'product',
        '_subject',
      ];
      fields = Object.fromEntries(
        allowed
          .filter((key) => typeof fields[key] === 'string')
          .map((key) => [key, fields[key]])
      );
      if (Object.values(fields).some((value) => value.length > 5000))
        throw new Error();
      fields.product ||= 'Website enquiry';
    } catch {
      return res.status(400).json({ success: false });
    }

    let emailAccepted = false;
    try {
      const response = await fetchImpl(
        'https://formsubmit.co/ajax/hello@astrai.in',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(fields),
          signal: AbortSignal.timeout(8000),
        }
      );
      if (response.ok) {
        const data = await response.json();
        emailAccepted = data?.success === true || data?.success === 'true';
      }
    } catch {
      // Try the independently hosted Google email fallback below.
    }

    if (sheetUrl) {
      try {
        const response = await fetchImpl(sheetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          body: JSON.stringify({ ...fields, sendEmail: !emailAccepted }),
          signal: AbortSignal.timeout(12000),
        });
        if (response.ok) {
          const data = await response.json();
          emailAccepted ||=
            data?.result === 'success' && data?.emailSent === true;
        }
      } catch {
        // Preserve a confirmed FormSubmit success if Sheets fails.
      }
    }
    return res
      .status(emailAccepted ? 200 : 503)
      .json({ success: emailAccepted });
  };
}

# Enquiry email and Google Sheets

The website submits to its own `/api/enquiry` endpoint. The endpoint works in Vite development and as a Vercel Function in production. Browser requests no longer depend on FormSubmit's CORS response headers.

The server first tries FormSubmit email delivery to `hello@astrai.in`. It then calls the Google Apps Script webhook once to append the Sheet row. If FormSubmit failed, the webhook also sends the notification using Google MailApp. Success requires confirmed email acceptance from FormSubmit or the Google fallback; saving a row alone never counts as email acceptance.

## Google setup

1. Use a spreadsheet tab named **Enquiries**, with seven headers:

   | Timestamp | Name | Email | Organisation Type | Organisation Name | Phone Number | Product |
   | --------- | ---- | ----- | ----------------- | ----------------- | ------------ | ------- |

2. Paste [google-sheets-webhook.gs](./google-sheets-webhook.gs) into its bound Apps Script project. Set `SPREADSHEET_ID` to the spreadsheet ID. The project prepared for this website is [ASTR Website Enquiries](https://script.google.com/u/0/home/projects/1VhGSBasAi8_35V_MdX45eRo1me3h80k9JXb6AJyZj5tk38IsLeO8_k9v/edit).
3. Deploy as a **Web app**, execute as **Me**, allow **Anyone**, and authorize spreadsheet access and email sending. MailApp requires email sending authorization ([Google documentation](https://developers.google.com/apps-script/reference/mail/mail-app)). Copy the deployed URL ending in `/exec`.
4. Set the server's `GOOGLE_SHEETS_URL` environment variable to that URL, both locally and in Vercel, or configure the `GOOGLE_SHEETS_URL` constant in `server/enquiry-handler.mjs`. The constant now contains the deployed URL supplied for this website; an environment variable can override it. Restart Vite after changing server configuration; redeploy Vercel for production changes.
5. Keep the spreadsheet's general sharing access **Restricted**. The web app's anonymous submission access does not require public access to the Sheet itself.
6. Submit a clearly labelled test enquiry. Check the new Sheet row, the email at `hello@astrai.in`, and the confirmation UI. If it fails, inspect Apps Script's **Executions** panel. Deploy a new script version after updating its code.

## Local and production behavior

Run `npm run dev` for local testing. `npm run preview` serves static build output and does not run the API; use Vite development or a Vercel deployment to submit enquiries. A static-only host cannot run this server endpoint.

The server bounds both upstream requests with timeouts and sends only allowlisted enquiry fields. No Google credentials belong in browser code. The recipient is fixed to `hello@astrai.in` in both providers. Google fallback mail is sent by the Google account that owns the script, subject to its MailApp quotas.

When FormSubmit succeeds, Google records the row without sending a second email. When Google fails after confirmed FormSubmit acceptance, the form still succeeds. A provider timeout can occur after it has already processed a request, so fallback or manual retries can still create duplicate mail or rows; this flow does not promise exactly-once delivery.

The low-level `createEnquirySender(fetchImpl, options)` helper retains its legacy FormSubmit default for existing integrations and tests. The website controllers explicitly select `/api/enquiry` and disable the old parallel browser Sheets request. Avoid setting a separate browser Sheets URL when using the server endpoint, as that would create an additional Sheet row.

## Verified deployment

The configured Google deployment was tested through the real server handler on 30 October 2026. The API returned HTTP 200 with `success: true`; Google returned `result: "success"` and `emailSent: true`, confirming the row append and MailApp send completed. The test row is labelled **ASTR integration test — please ignore**. Inbox arrival was not independently checked.

These configuration changes are local until the website is deployed to Vercel.

# Velocity inline demo request — proposed design

Status: proposed for review. This document defines the design; product code has not been changed.

## Intent

Let interested visitors request a Velocity demo directly in the final `#demo` section. Keep the experience calm, compact, and consistent with the existing black, ivory, and muted gold page. Success means an accepted enquiry with enough information for the ASTR team to follow up; it does not mean a confirmed appointment.

## Decisions and approaches

The user chose an inline form, requested an organisation-type dropdown, and requires phone number. The recommended layout, exact wording, dropdown options, and responsive measurements below are design proposals.

- Inline form: selected direction; keeps product context visible and eliminates navigation before submission.
- Dedicated enquiry page: retain as an alternate entry point, but remove the need to visit it from Velocity's demo CTAs.
- Modal form: considered and rejected for this section; adds an opening step and places the form in a constrained overlay on mobile.

## Visual direction

Use a spacious two-column composition within the existing 1200px maximum container. Left: an editorial introduction. Right: one restrained form card. Preserve the page background, Lora headline, and existing gold accent (`#e6cd99`). Use Geist for form labels, inputs, helper copy, and button text to improve small-text readability.

At widths of 1024px and above, use approximately 44% / 56% columns with a 56px gap. Vertically centre the introduction alongside the card. Section padding: 96px top and bottom. Let the heading wrap naturally rather than retaining the current forced line break.

Introduction:

- Small eyebrow: `VELOCITY DEMO`, muted gold, modest letter spacing.
- Heading: `See how your pharmacy could work with a clearer view.` Retain the existing italic treatment on `a clearer view.` Set responsive size at roughly 40–56px on desktop with compact leading.
- Supporting copy: `Explore stock, purchasing, billing, and hospital supply in a demo built around your team's needs.`
- Below the copy: `Prefer email? hello@astrai.in`, preserving the existing email link and demo subject.

Form card:

- Dark charcoal fill (`#101010`), subtle light border, 20px radius, and 32px internal padding. No heavy glow or animated decoration.
- Card title: `Request your demo`, 24px.
- Short introduction: `Share your details and our team will contact you to arrange a time.`
- One quiet note: `All fields are required.`
- Persistent labels above outlined controls, 16px input text, minimum 48px control height, 16–20px between field groups.
- Full-width gold submit button, minimum 48px height: `Request a demo`.
- Footer text: `We'll use these details to respond to your demo request.` Link to the site's actual privacy policy if one exists; do not invent a destination.

## Fields and order

All five fields are required. No message, job title, organisation size, or product-selection field.

| Field | Control | Detail |
| --- | --- | --- |
| Your name | Text input | Placeholder `Full name`; name autofill. |
| Email address | Email input | Placeholder `you@example.com`; email autofill; accept personal email providers. |
| Phone number | Telephone input | Visible country calling-code selector, default India +91, plus national number input; telephone keyboard and autofill; retain international support. |
| Organisation type | Native select | Non-selectable initial prompt `Select organisation type`. |
| Organisation name | Text input | Placeholder `Your organisation's name`; organisation autofill. |

Suggested organisation-type options: `Hospital`, `Retail pharmacy`, `Clinic`, `Nursing home`, `Other`. These classify enquiries and do not promise suitability or feature support for every setting. Do not add unsupported categories such as wholesale distribution or laboratories as product claims. Choosing Other does not reveal another required field.

Within the desktop card: name spans the full width; email and phone share the next row; organisation type and organisation name each span the full width. Keep the phone group wide enough to accommodate both code and number; stack the contact row if either control becomes cramped.

## Responsive behaviour

Below 1024px, stack the introduction above the form with a 32px gap. At phone sizes, use a single column for every field, 20px card padding, approximately 24px page gutters, and 56–64px section padding. Heading size: roughly 32–40px. No horizontal scrolling at 320px viewport width. Keep the form fully in document flow so opening the mobile keyboard does not obscure controls. Continue hiding the existing mobile conversion bar when the demo section is visible or content has focus.

## Interactions and states

1. Velocity's navigation, hero, intermediate, and mobile demo CTAs lead to `#demo` and use `Request a demo`. Preserve tracking placement metadata. Scrolling respects reduced-motion preferences and the sticky navigation offset; do not automatically open the phone keyboard.
2. Validate on submit, then clear field errors as the visitor corrects them. Do not show errors on untouched fields. Trim text, reject whitespace-only values, use email-format validation, and validate phone numbers according to selected country without an India-only length rule.
3. Show concise errors below affected fields, associate them with controls, and focus the first invalid field. Keep entered values intact.
4. While sending, change the button to `Sending…`, prevent duplicate submissions, and announce progress accessibly.
5. Only after the existing service confirms acceptance, replace the card contents with `Thanks, [name].` and `We've received your request. Our team will contact you to arrange your Velocity demo.` Insert names as plain text. Do not claim a time is booked or promise a response deadline.
6. If submission fails or times out, retain the complete form and show `We couldn't confirm your request. Please try again or email hello@astrai.in.` Re-enable submission and keep the email alternative usable.

## Integration boundaries

Reuse the confirmed-enquiry sending behaviour in `connect-form.mjs`, extracting a shared sender if needed without changing the separate connect page's behaviour. Include name, email, phone including calling code, organisation type, organisation name, and hidden Velocity product/subject context in the enquiry. Do not accidentally retain the old required message-field contract for this new form.

Use the existing analytics conventions for starts and accepted submissions. Never include names, email addresses, phone numbers, or organisation names in analytics event properties. Send no live test enquiries without explicit authorization.

Expected implementation surface: `velocity.html`, scoped additions to `velocity.css`, a dedicated inline-form controller, the existing shared enquiry sender, and relevant conversion/analytics tests. Avoid unrelated page restructuring or new form libraries unless international phone validation needs a small maintained dependency.

## Acceptance criteria

- All five required values arrive in the enquiry payload; valid phone formats match the selected country.
- Every Velocity demo CTA reaches the inline form; the separate enquiry page remains usable.
- Keyboard and screen-reader users can identify fields, use the native select, discover errors, and receive submission status.
- Form remains readable and usable at 320px, 390px, 768px, 1024px, and 1440px; focus indicators and text have adequate contrast.
- Empty/whitespace values, malformed email/phone, repeated clicks, server rejection, timeout, and retry behave as described.
- Build and relevant existing tests pass; submission is verified with mocked responses rather than real customer enquiries.

## Next step

Review this proposed design, then produce the detailed implementation plan after design approval. No calendar booking, additional qualification step, or automatic WhatsApp communication is included.

# Velocity demo card refinement — 2026-10-30

final result: passed

## Visual evidence

- Source: `/var/folders/4t/3r4hhl7n63d06brc378d6dq80000gn/T/TemporaryItems/NSIRD_screencaptureui_J5pcCn/Screenshot 2026-10-30 at 7.42.01 PM.png` (2522 × 1098 pixels).
- Implementation: `/private/tmp/velocity-demo-compact-desktop.png` (1440 × 1000 CSS viewport).
- Mobile evidence: `/private/tmp/velocity-demo-compact-mobile.png` (390 × 844 CSS viewport).
- Source and implementation were opened together for comparison. The source is an enlarged, partial internship form; it is a style reference, not the target page or a complete form. Absolute pixel and height matching would conflict with the user's explicit request for a shorter demo card.
- Compared relative card shape, outline, field treatment, typography, and density. Screenshots use browser-rendered CSS sizing; no pixel-perfect overlay or cross-density match is claimed.
- Full-view comparison: the implementation carries over the rounded frame, subtle border, dark surface, and two-column field arrangement, with less vertical whitespace as requested.
- Focused comparison: visible field regions use uppercase mono labels, underline controls, and serif name/organisation text. Email and phone retain sans-serif text for legibility. No source illustrations or photographic assets require replacement.

## Findings and checks

- No remaining actionable P0/P1/P2 findings within the requested style-and-density scope.
- Before refinement: desktop card height 778.62px at 1440px viewport. After refinement: 532.72px, approximately 32% shorter.
- Name/email share row one; organisation type/name share row two; phone occupies row three. DOM reading and tab order follow this layout.
- All five fields remain required. Country selector and complete phone number remain visible at 390px; controls stay within the viewport at 320px and 390px.
- Invalid submission showed inline required-field errors and focused the first invalid field. No live enquiry was sent.
- Browser console: no error entries returned during the form check.
- Existing suite: 84 tests passed. Production build and Prettier checks passed. Build retains existing CSS tooling warnings.
- Autofill rules retained; actual operating-system autofill was not exercised.

## Comparison history

- Initial measured issue: tall 778.62px card and boxed controls differed from the requested compact underline style.
- Changes: reduced field rows, shortened header copy, rounded frame, contour accents, uppercase mono labels, underline controls, and serif text fields.
- Post-change desktop and mobile captures show the compact form without control overflow. Final comparison found no additional blocking visual fixes.

## Paper surface follow-up

- User requested the exact Connect paper pattern. Verified the live source at `https://www.astrai.in/connect` and its computed styles.
- Reused the existing `.grain-overlay` asset, filter, and 0.015 opacity inside the demo card; scoped its positioning and clipping to that card, including on mobile.
- Moved the existing `.protocol-box` gradient and 5px backdrop blur into the shared stylesheet so Connect and Velocity use one surface definition.
- Updated implementation screenshot: `/private/tmp/velocity-demo-paper-desktop.png`, captured at 1440 × 1000. Compact desktop card remains 532.72px tall.
- Mobile check at 390px: card width 350px, grain displayed and positioned absolutely. Original local Connect form retains the source gradient and 5px blur.
- Follow-up checks: 84 tests pass; production build passes. No live enquiries sent.

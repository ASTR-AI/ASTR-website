# Section 06 reference adaptation QA

Source visual truth: user attachment `/var/folders/4t/3r4hhl7n63d06brc378d6dq80000gn/T/TemporaryItems/NSIRD_screencaptureui_f0xfLK/Screenshot 2026-10-26 at 12.25.42 AM.png` (2684 × 1464 pixels).

Implementation: `http://127.0.0.1:5173/velocity.html?preview=reference-layout#features`.

Evidence: `/tmp/velocity-reference-desktop.png` and `/tmp/velocity-reference-desktop-details.png` (1440 × 1050 pixels, 1440 × 1050 CSS viewport); `/tmp/velocity-reference-mobile.png` (390 × 844 pixels). Browser screenshots use 1:1 CSS-to-image pixels. Comparison board `/tmp/velocity-reference-comparison.jpg` places source and implementation alongside each other, each scaled proportionally to 890px wide. Original captures inspected for legibility and lower-row content.

State: static offering overview. This is a reference-inspired adaptation to the existing website, rather than a reproduction of the transcription product. Intentional differences: site's dark theme, Lora headings, gold ordinal labels, real Velocity dashboard, four offering groups rather than three performance metrics.

## Findings

No actionable P0/P1/P2 issues remain.

- Typography: existing Lora display headings, Geist body text and monospace eyebrow retained; meaningful hierarchy and no clipped row headings. Narrow viewport wraps naturally.
- Spacing/layout: tall framed visual on the left, open feature rows on the right, numbered gutter and fine dividers reproduce the reference's main composition. Existing section padding retained. Phone layout prioritises feature explanations, then shows the full product image.
- Colors/tokens: black, muted warm white and existing gold match the page; light sage frame relates to the existing product-document previews. Text remains readable.
- Image quality: actual supplied dashboard asset reused at native resolution. Desktop uses a deliberate crop; mobile shows the whole image. Source transcription UI is intentionally replaced with Velocity UI. No generated or drawn replacement asset.
- Content: all four capability groups remain, including supported returns, setup qualifications, accounting export names, permissions and organisation settings. Ordinals make no performance claim.

## Comparison history

Initial desktop review found a partial sidebar at the edge of the image crop. Adjusted object-position from 22% to 26%. Recaptured desktop image and checked source/implementation comparison board. Mobile uses the full dashboard rather than a tall crop. No actionable composition or wrapping issues remained after these changes.

## Verification

- Desktop 1440px: two columns, complete image load, all four rows and footer checked across overview and lower-row captures.
- Mobile 390px and 320px: no document overflow or row overflow. Mobile screenshot reviewed for reading order, heading wrapping, line spacing and separators.
- Browser console: no errors observed.
- Section has no new controls; existing page interactions unchanged.
- Production build passes; existing Node tests pass.

## Follow-up polish

None required. A future dedicated portrait product capture could expose more dashboard content without cropping.

final result: passed

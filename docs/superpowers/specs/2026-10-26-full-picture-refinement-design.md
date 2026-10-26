# Section 06 refinement — proposed design

## Intent
Shorten “The full picture” to three benefit-led rows. Remove the tall dashboard image and give the section a distinct visual that needs no supplied photography. Preserve the existing dark palette, gold accents, serif headings, and #features anchor.

## Approaches
1. Recommended: compact illustrative medicine journey on the left, three open rows on the right. Keeps the reference composition while replacing the oversized screenshot with a useful explanation.
2. Text-only: heading and introduction on the left, three rows on the right. Shortest and simplest, but less visually distinctive.

These are proposals; the user has not selected an approach yet.

## Recommended composition
Use a roughly square left panel, approximately 360–420px tall on desktop, vertically centred rather than stretched to the right column. Show a restrained diagram built in HTML/CSS: Receive → Store → Dispense, with “Packs & loose units” and “Batch · Expiry · Location” as supporting labels. This is an explanatory graphic, with no invented dashboard figures or interactive controls.

Place the section eyebrow, heading, and one short introduction above the right-hand rows. Use large gold text markers, concise headings, one supporting sentence per row, and fine dividers. Stack on mobile with reading order heading, rows, diagram; keep the diagram compact. Do not add animation or dependencies.

## Proposed copy
Eyebrow: 06 / The full picture
Heading: Every medicine. Every movement. Connected.
Introduction: From incoming stock to daily dispensing, keep your pharmacy’s work in one place.

| Large marker | Heading | Supporting sentence |
| --- | --- | --- |
| Pack → Unit | Stock down to the last unit. | Track medicines in packs and loose units, with batch, expiry, and location details together. |
| Order → Issue | Keep daily work moving. | Connect purchasing, receiving, billing, and hospital supply without switching between separate systems. |
| 1 workspace | A clearer view for every team. | Bring stock reports, supplier payments, and accounting exports together, with access for each person’s role. |

Footer: For independent pharmacies and hospital teams.
Availability: Hospital workflows and module availability depend on your configured setup.

The markers communicate supported capabilities rather than measured customer outcomes. “100% of medicines,” “all units of measurement,” and “80% faster” are examples supplied by the user, not established claims. Use percentage-led rows only when coverage definitions and measured results are supplied. Do not turn three rows back into a comprehensive feature catalogue; earlier sections and FAQs retain the supporting detail.

## Scope and validation for implementation
Edit only section 06 markup and its styles. Preserve existing uncommitted work elsewhere. Verify desktop/mobile layout, readable markers at narrow widths, no overflow, correct heading order, and production build. No publication.

## Status
Design and copy proposal only; no website implementation changes in this revision.

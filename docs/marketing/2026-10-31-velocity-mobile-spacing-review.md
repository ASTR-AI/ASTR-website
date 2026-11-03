# Velocity mobile spacing review — 31 October 2026

Review only; no product CSS or markup changed. UI UX Designer's layout, proximity, and 8-point spacing guidance informed this review.

## Evidence and scope

Current local page: `http://localhost:5173/velocity.html`, reloaded before final measurements. Inspected current 390×844 screenshots and computed layout. Also measured 320×740 and 430×932. Actual inner widths matched each requested width, and document scroll widths were 320, 390, and 430 respectively. This does not prove absence of clipping inside components.

Evidence: `screenshots/mobile-spacing-review/390-full.png`, `320-full.png`, `430-full.png`, and numbered section crops. Crops are inspection excerpts, not exact section boundaries. Full-page capture places fixed navigation/conversion UI inside some crops; these capture artifacts are not reported as layout defects. Initial cached styles were discarded after reload; all figures below describe the refreshed page.

## Verdict

Horizontal alignment is generally coherent: 20px gutters at 390/430px and 16px at 320px. Vertical spacing needs a consistent hierarchy. Large padding in Reordering, Purchasing, and Supply compounds at adjacent boundaries; Operations and Capabilities use much less space. Heading-to-description gaps also vary without a clear semantic reason.

## Numbered section review

Measurements are CSS pixels at 390×844. Section padding means top / bottom, not the total gap between visible content in adjacent sections.

| Step | Section / evidence | Health | Current padding | Heading → description | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Hero / `01-hero.png` | Minor spacing issue | 132 / 64 | Hero capabilities: 8 | Keep header clearance separate from normal section spacing. Reduce the 76px action-group bottom margin to 32–40px; the preview is too detached from its actions. |
| 2 | Inventory / `02-inventory.png` | Needs refinement | 40 / 56 | 25 | Use 16px heading gap; bring card-to-controls spacing onto 16–24px increments. Preserve the consistent page gutter. |
| 3 | Reordering / `03-reorder.png` | Major rhythm issue | 100 / 100 | 14 | Use 32px section padding each side and 16px heading gap. Its preceding boundary already combines 56px + 100px padding. Reduce excess space inside the fixed-height preview only after preserving image readability. |
| 4 | Purchasing / `04-purchasing.png` | Major rhythm issue | 96 / 96 | 18 | Use 32px section padding each side, 16px heading gap, 32px description-to-content spacing, 12px controls-to-document spacing. The Reorder/Purchasing boundary contains 196px of padding alone. |
| 5 | Hospital Supply / `05-supply.png` | Major rhythm issue | 110 / 110 | 22 | Use 32px section padding each side and 16px heading gap. Purchasing/Supply contributes 206px of padding alone. Use 24px between workflow, qualification, and document controls. |
| 6 | Operations / `06-operations.png` | Too tight relative to neighbors | 24 / 24 | 12 | Increase section padding to 32px each side, heading gap to 16px. Keep 20px copy-card padding. Do not reduce to 16px section padding solely because viewport height is short. |
| 7 | Capabilities / `07-features.png` | Too tight relative to neighbors | 24 / 24 | 12 | Use 32px each side and 16px heading gap. At 320×740 padding falls to 8px each side: remove this height-based compression. Preserve 16px rail gaps and 8px card-title-to-description spacing. |
| 8 | Why Velocity / `08-why.png` | Mixed hierarchy | 88 / 88 | 6 | Use 32px section padding and 16px heading gap. The 6px gap crowds the description beneath a multiline heading while the section exterior is loose. Increase the 12px intro-to-stage gap to 24–32px. |
| 9 | Comparison / `09-comparison.png` | Mostly clear | 64 / 64 | 16 | Retain the 16px heading gap and readable table cell padding. Normalize exterior spacing to avoid doubling gaps alongside neighboring sections. Keep the scroll hint close to its table: 12px. |
| 10 | FAQ / `10-faq.png` | Too loose above content | 88 / 88 | 25 | Use 32px section padding, 16px heading gap and 32px description-to-list spacing. Retain comfortable question hit areas and wrapping. |
| 11 | Demo / `11-demo.png` | Generally sound interior spacing | 56 / 56 | 16 | Keep 20px form-card padding, 16px field gaps, and 32px intro-to-form gap. Normalize section exterior. FAQ/Demo currently contributes 144px of padding alone. |

## Proposed spacing scale

Use an 8px base with 4px subdivisions. This is a design recommendation for this page, not a universal mandated web standard. Material Design describes 8dp spacing and 4dp subdivisions: https://m2.material.io/design/layout/understanding-layout.html

| Relationship | Target |
| --- | --- |
| Page gutter | Keep 20px; 16px below 360px |
| Ordinary section top / bottom | 32px / 32px, producing 64px between adjacent content blocks before any explicit child margin |
| Eyebrow → heading | 8px |
| Section heading → description | 16px |
| Description → main content | 32px |
| Rail controls → cards | 12px |
| Card gap | 16px |
| Card padding | 20px; 16px below 360px |
| Card title → description | 8px |
| Form label → input | 8px |
| Form field gap | 16px |
| Content → supporting note | 16px |

Section spacing should have one clear owner. Do not apply a 64px bottom margin in addition to two 32px section paddings. Distinct surfaces may warrant 40px padding, but avoid unrelated per-section values and viewport-height-based compression.

## Priority and implementation notes

1. Normalize exterior spacing first, especially Reordering → Purchasing → Supply.
2. Restore breathing room around Operations and Capabilities on short phones.
3. Normalize section heading gaps to 16px; card heading gaps remain 8px.
4. Normalize introduction-to-content spacing to 32px.
5. Preserve the existing gutters and sensible form-card padding.

Edit owning rules in `velocity.css`, `velocity-operations.css`, `velocity-supply.css`, and `velocity-hero.css` according to the actual cascade. The current `max-height:740px` rules squeeze Operations and Capabilities independently of page rhythm. Avoid stacking new overrides without reconciling the existing rules.

## Limits

This is a spacing review of default section states. No forms were submitted. All tab/rail states, keyboard navigation, contrast ratios, screen-reader behavior, zoom, safe areas, and real iOS/Android rendering were not comprehensively tested. No full accessibility compliance claim is made. No build or behavior tests were required because product code was unchanged.

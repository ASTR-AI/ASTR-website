# Velocity comparison verification — 29 October 2026

## Follow-up: minimal appearance and disclosure

User requested a neutral table and 10–12 initial rows with an arrow control. Implemented 10 initial rows and an expandable second table body containing the remaining four. A labelled circular chevron button toggles the rows, updates `aria-expanded`, and reverses its arrow. Collapse keeps the control in view. Without JavaScript all 14 rows are visible and the inactive button stays hidden. Initialization and cleanup follow the existing page lifecycle.

Removed contrasting gold/column/header surfaces and gold badge styling from the table; retained subtle neutral dividers. Reduced desktop cell padding from 20px to 16px. The site's existing demo CTA retains its normal styling.

Verification: 65/65 tests pass; scoped lint for `velocity-page.js`, `velocity-comparison.mjs`, and its tests passes; production build and `git diff --check` pass. Browser verified 10 initial rows, four hidden rows, click expansion, Enter-key collapse, and visible GST Coming soon text after expansion. At 390px expansion/collapse works and document width remains 390px. Screenshots: `/private/tmp/velocity-comparison-qa/minimal-collapsed-desktop.png` and `/private/tmp/velocity-comparison-qa/minimal-collapsed-mobile.png`.

The original verification below describes the initial fully expanded implementation; the disclosure and neutral styling above supersede those presentation details.

Implemented the approved comparison in the existing `codex/velocity-product-page` checkout. Existing hero feature-bar edits in `velocity.html` and `velocity.css` were preserved. No commit or deployment was performed.

## Results

- `node --test tests/*.test.mjs`: 63 passed, 0 failed.
- Analytics regression was observed failing before adding the `comparison` placement, then passing. Existing `adoption` remains accepted; extra properties are stripped.
- `npx eslint velocity-analytics.mjs tests/velocity-analytics.test.mjs`: passed.
- `npm run build`: passed. Shared CSS emits unknown `@theme` / `@utility` warnings; Browserslist data is stale. These areas were not changed.
- `git diff --check`: passed.
- Browser checks: 1440×1000, 900×1000, 390×844, 320×740. Document scroll width matched viewport width at all four sizes. At 390px the comparison's scroll region is 348px with a 556px table; at 320px it is 278px with a 416px table.
- All 14 body rows, 14 row-header scopes, 3 column-header scopes and the table caption are present. The accessibility snapshot exposes the section, table, row content, Coming soon text and demo link.
- Keyboard focus reached the labelled scroll region. ArrowRight moved the 390px table to its horizontal end (208px). Opaque sticky capability cells remained visible, with the full Velocity description column fitting beside them.
- The comparison CTA navigated to `/connect?product=velocity`. No live form was submitted. Production analytics ingestion was not tested.
- Legacy `#adoption` alias is retained; navigation between it and `#comparison` landed at the replacement section. Why Velocity and FAQ remain around the section.

## Visual evidence

- Desktop: `/private/tmp/velocity-comparison-qa/desktop.png`.
- Mobile: `/private/tmp/velocity-comparison-qa/mobile-390.png` and `/private/tmp/velocity-comparison-qa/mobile-320.png`.
- Initial port 5173 returned an old stylesheet from browser cache. Verification used fresh origin `http://127.0.0.1:5186` and confirmed the new computed styles.

## Decisions and review

- Below 600px, use 140px capability cells and viewport-sized description cells instead of the planned universal 760px minimum. The initial 760px mobile table let the sticky first column obscure long descriptions; the revised sizing keeps each description readable beside the feature name. Desktop retains the planned 22% / 34% / 44% table.
- Static HTML and CSS need no new controller or copy-mirroring tests. Analytics behavior received a regression test. A separate self-review checked the diff, source claims, table semantics, anchor compatibility and tracking contract; no subagents were used, following the requested direct execution approach.
- Source claims follow the user's confirmations and the product-story notes. Salt search, loose units, staff-device POS, AI reordering and transfer requests lead the comparison. No competitor inferiority or exclusive-feature claims were introduced. GST return filing is Coming soon.
- User-requested one-click Tally sync wording is retained. The application was not available for independent verification here; older product notes describe exports, so the precise sync implementation still needs reconciliation before publication. No continuous two-way integration is promised.
- All content and the demo link are native HTML, with no new motion. Actual JavaScript-disabled, reduced-motion and 200% browser-zoom sessions were not exercised through the available browser controls; those manual checks remain open. Narrow viewport behavior and semantic markup were verified as above.

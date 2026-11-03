# Hospital medicine supply cleanup

Implemented the screenshot review and the user's annotation requesting removal of the preview/demo-data label, Pause button, and step counter.

## Result

- One chronological sequence: Request, Prepare, Dispatch, Receive, with department ownership beneath each step. Two columns on phones, four on larger screens; no sideways workflow clipping.
- Selecting a step shows exactly one corresponding document. Selection remains still until the next user action; the autoplay, timers, shuffle animation, stacked sheets, and toolbar were removed.
- One flat document below the sequence, separated by 24px on phones / 32px on larger screens. Document padding is 20px on phones, 16px below 360px, and 24px on larger screens. Document content has natural height and readable wrapping.
- Approval/return qualification moved below the preview. Removed duplicated closing copy and the redundant reconciliation banner while retaining receipt status, quantities, ledger balance, and footer explanation.
- Native links reach all four documents without enhancement. The initializer hides inactive documents only after validating all four link/document relationships. Cleanup restores the static fallback. Direct document links select the correct initial preview.

## Checks

Seven focused controller tests cover initial selection, every stage, absence of timers/observers, idempotent initialization/cleanup, modifier clicks, document deep links, and malformed-markup fallback. The new manual-selection tests first failed against the old automatic controller, then passed after implementation.

Browser matrix: 320x740, 390x844, 430x932, 768x1024, 1440x900. All four stages were selected at each width. Every state shows exactly one document, with no document/table/workflow or page horizontal overflow. Keyboard Enter selection was checked at 320px. Actual viewport dimensions were measured. Preview spacing and step column counts match the responsive design.

- `node --test tests/*.test.mjs`: 105 passed, 0 failed.
- `npm run build`: passed; existing Browserslist age and dependency CSS `@theme`/`@utility` warnings remain.
- `git diff --check`: passed.

Evidence: `screenshots/supply-cleanup/metrics.json`, section captures for five widths, and the final mobile viewport. Full-page capture can place fixed header artifacts inside section crops; the final viewport is separately inspected. Real-device Safari/Chrome and a full screen-reader audit were not performed. No forms were submitted.

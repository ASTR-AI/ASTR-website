# Velocity mobile spacing verification

Implemented the approved spacing review in the current checkout. Changes are scoped to phone layouts (<=767px) in `velocity.css`, `velocity-hero.css`, and `velocity-operations.css`.

- One shared section rule gives all ten sections after the hero 32px top/bottom padding. Hero retains 128px top clearance for the fixed header and uses 32px bottom padding.
- All visible section heading-to-description gaps measure 16px. Existing short-screen hidden descriptions remain hidden.
- Introduction-to-content spacing uses 32px; rail controls retain a smaller 12px gap to their cards.
- Shared card padding is 20px, reducing to 16px below 360px. Document/table micro-spacing remains component-specific to preserve readability.
- Hero action-to-preview and preview-to-benefit gaps are 32px. Reorder workflow title/body gaps are 8px. Demo labels have one 8px gap instead of compounded flex and Tailwind spacing.
- Removed conflicting short-screen section padding and preserved desktop styles.

## Verification

Measured 320x740, 390x844, 430x932, 767x900, 768x1024, and 1440x900. Actual inner widths match the requested sizes; document scroll width equals viewport width for all six. All ten ordinary sections have 32px top/bottom padding at every tested phone size; visible section heading gaps are 16px. Reviewed section screenshots at 320, 390, and 430px. The 768px tablet and 1440px desktop retain their existing padding values.

Exercised purchasing and capability rails through their final cards and back; next buttons disable at the settled end. Selected Reports & access in Operations and expanded the first FAQ; copy remained readable and content flowed without overlap. Demo form layout was inspected without submitting an enquiry.

- `node --test tests/*.test.mjs`: 105 passed, 0 failed.
- `npm run build`: passed. Existing warnings concern old Browserslist data and unsupported Tailwind `@theme`/`@utility` rules in dependency styles.
- `git diff --check`: passed.

Evidence is under `screenshots/mobile-spacing-implementation/`, including `viewport-metrics.json`, full-page captures, section crops, overview sheets, and an expanded FAQ viewport capture. Full-page images contain fixed-header/conversion-bar capture artifacts in some crops; viewport captures are the proof for live appearance. These are desktop browser checks; actual iOS/Android device behavior remains unverified.

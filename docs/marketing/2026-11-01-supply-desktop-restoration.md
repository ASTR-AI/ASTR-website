# Supply section: restore desktop, scope cleanup to phones

Corrected the scope of the preceding cleanup. The original department-card composition, stacked documents, autoplay, and playback controls are restored for desktop/tablet widths >=768px. The pre-cleanup `velocity-supply.css` is preserved unchanged, followed only by rules hiding additional phone controls.

The compact chronological selection and flat document treatment are confined to `velocity-supply-mobile.css` under <=767px. Both layouts share the same four document articles and IDs. A responsive controller disposes the previous mode before initializing the next; phone-only step links use a separate data attribute and do not interfere with the original desktop steps.

Only the Hospital Medicine Supply section was corrected. The earlier page-wide changes in other sections remain intact.

Validation:

- Original seven autoplay/pause/reduced-motion/fallback tests restored.
- Seven manual-phone tests retained in a separate test module.
- Added a desktop → phone → desktop → phone regression test covering canceled animation frames, document visibility, control visibility, and cleanup.
- Full suite: 113 passed, 0 failed.
- Production build and `git diff --check`: passed. Existing dependency CSS and Browserslist warnings remain.
- Browser checks: 320px, 390px, 767px, 768px, 1440px, then back to 390px. Verified original desktop columns and automatic mode; phone-only grid and manual mode; no horizontal page/document overflow; and restoration of native document visibility when returning to desktop.

Evidence: `screenshots/supply-responsive-restoration/metrics.json` and desktop/phone section screenshots. Actual iOS/Android devices remain unverified.

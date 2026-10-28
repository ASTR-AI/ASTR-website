# Hero transition verification

- Baseline: f0c844d. Inventory-through-footer HTML and existing velocity.css remain byte-identical.
- Desktop 1280×720: native scroll advances a pinned screen from centered to right-aligned with benefit copy. Landing pin top is 112px; benefit opacity reaches 1. Reverse scrolling reduces progress; scrolling past the scene releases the pin.
- 390×844: static screen and benefit text, no enhancement class or aria-hidden copy, no horizontal overflow.
- 1280×650: static fallback confirmed. Viewport override reset after checks.
- Reduced-motion preference changes and cleanup verified through controller tests; OS reduced-motion setting was not changed during browser checks. No-JavaScript fallback is provided by default static markup/CSS, not separately browser-emulated.
- Accessibility review: removed aria-hidden from meaningful benefit copy; regression test first failed, then passed. Noninteractive text remains readable to assistive technology regardless of visual progress.
- Sticky regression: initial browser reproduction showed pin top -279px at scroll792; scoped body overflow correction produces pin top112px at the same scroll position.
- 46 Node tests pass; scoped ESLint passes; production build succeeds; git diff --check passes. Existing CSS tooling warnings remain.
- No continuous image scrubbing or lower-section redesign in this change.

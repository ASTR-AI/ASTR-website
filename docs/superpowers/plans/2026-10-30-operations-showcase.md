# Operations Showcase Implementation Plan

> Execute inline with superpowers:executing-plans.

**Goal:** Implement the approved wide pharmacy workflow showcase.
**Architecture:** Preserve velocity-operations.mjs and its accessible manual tabs. Refine #operations markup in velocity.html and add scoped styles in velocity-operations.css, imported by velocity-page.js. Animate the revealed panel's children with CSS; disable motion for reduced-motion users.
**Tech Stack:** Semantic HTML, CSS, existing JavaScript tabs, Vite.
**Spec:** docs/superpowers/specs/2026-10-30-operations-showcase-design.md

## Constraints
No new dependencies. Preserve existing workflow IDs, medicine data and availability qualifications. Scope all styles to #operations.

## Review Focus
Check all four panels at desktop and 320px; preserve keyboard focus and hidden panels; no horizontal overflow; ensure copy remains readable over gradients; verify supply section remains unchanged.

## Tasks
- [x] Refine the heading, labels and four copy blocks, each with two supporting points.
- [x] Add the shared rounded panel, dark copy inset, larger document previews, subtle background glows and responsive tabs. Preserve readable no-JS and reduced-motion fallbacks.
- [x] Run existing tests and production build. Check every tab and keyboard navigation in the browser, plus desktop/mobile dimensions. Save a preview screenshot.

## Verification
- Existing Node suite: 79/79 pass. No controller changes or test changes required for the scoped layout/copy refinement.
- ESLint on velocity-page.js: pass. git diff --check: pass.
- Vite production build: pass (existing CSS utility and Browserslist warnings remain).
- Browser: all four tabs show exactly one matching panel; Home/End keyboard navigation selects the correct workflow. At 320px every panel and document fits its container without horizontal page overflow. Also inspected 390px mobile and 1440px desktop.
- Saved complete preview: /tmp/astr-operations-showcase.png.
- Independent review: no blocking findings. Improved the existing pale-on-cream Higher tier badge with scoped dark text; production build rechecked after the adjustment.

## Follow-up size and style verification
- Reproduced before fix at1280px: panel heights620.19/655.85/704.45/643.88px; preview heights484.20/519.86/568.46/507.89px.
- Shared CSS grid now reserves identical726.46px panel height and473.20×568.46px documents across all four tabs at1280px.
- Mobile320px: identical1366.18px panel height and246×658.22px documents across all four tabs. No horizontal overflow or clipped document content.
- Computed corners: outer64px, inset52px, document16px. One operations panel visible to accessibility at a time.
- Node suite79/79 pass; Vite production build passes; git diff --check passes.
- Independent review: no actionable bugs. Saved final preview /tmp/astr-operations-refined.png.

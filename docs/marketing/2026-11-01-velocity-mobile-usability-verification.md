# Velocity Mobile Usability and Conversion Verification Report

**Date:** 1 November 2026  
**Primary Viewport Tested:** 440 × 956 (CSS px)  
**Responsive Viewport Matrix:** 320 × 740, 390 × 844, 440 × 956, 768 × 1024, 1440 × 900  
**Status:** All automated tests passing (88/88), clean production build, zero horizontal overflow across all tested viewports.

---

## Executive Summary & Hypotheses

This iteration resolved key usability and layout friction points on the mobile Velocity product page without disturbing desktop composition or backend API / submission payloads:
1. **Reordering Composition Restored:** The blurred predictive reordering screenshot now features the sharp charcoal summary card positioned directly over its lower portion with 16 px side insets, consistent border, rounded corners, and shadow. Conflicting mobile CSS overrides were consolidated.
2. **Product Details Inspection:** Each inventory card now provides an explicit "Enlarge preview" button opening an accessible modal dialog with keyboard focus containment, Escape dismissal, close button, and pan/scroll support on small viewports. The hero preview frame was adjusted so its final stock reporting explanatory note is completely visible.
3. **Operations Layout & 2-Column Grid:** Removed the viewport-height constraint and oversized panel min-height; tab controls are displayed in a discoverable 2-column mobile grid with 2D directional arrow-key navigation. Header demo action and pagination dot touch activation areas now meet or exceed 44 × 44 px. Contrast was increased for normal text, placeholders, and control boundaries.
4. **Conversion Clarity:** Added the audience sentence beneath the hero heading, updated the demo form intro copy, and streamlined the submission label to "Request my demo" while preserving all five required fields.

*Note on Conversion:* These adjustments are design and usability hypotheses intended to reduce cognitive friction and enhance clarity. Measured conversion rate improvements require visitor analytics and A/B test data rather than assumed guarantees.

---

## Verification Evidence by Requirement

### 1. Reordering Composition
- **Before:** Mobile rules statically forced `.v-reorder-summary-card` below the showcase and made it transparent (`background: transparent; border: 0; box-shadow: none;`).
- **After:** Charcoal card (`#17181b`) sits over the lower portion of the blurred screenshot with 16 px side insets (`left: 16px; right: 16px; bottom: 16px`), 18 px border-radius, `border: 1px solid rgba(255, 255, 255, 0.12)`, and desktop-consistent shadow (`0 20px 40px -10px rgba(0, 0, 0, 0.65)`).
- **Showcase & Disclosure Clearance:** `.v-reorder-panel` height set to content-driven 380 px, providing ample breathing room for the browser bar, backdrop, screenshot, and card without overlapping `.v-workflow-details` (`overlapsDisclosure: false`).
- **Animation States:** Kept visible (`opacity: 1 !important; transform: none !important`) across default, JS-disabled, and reduced-motion states.

### 2. Product Details & Inspection
- **Sharpness & Aspect Ratio:** Inventory images maintain `aspect-ratio: 16 / 10; object-fit: cover` with full sharpness.
- **Enlarge Preview Dialog:** Added `[data-enlarge-preview]` control to all 4 inventory cards.
  - Opens `<dialog id="inventory-preview-dialog">` with title matching the card and full-resolution screenshot image.
  - Dialog body has `overflow: auto; -webkit-overflow-scrolling: touch` with `min-width: 540px` image for small-screen panning.
  - Escape key dismisses dialog (`isClosed: true`).
  - Close button dismisses dialog.
  - Focus returns to the initiating trigger button (`focusReturned: true`).
  - Tab and Shift+Tab contain focus within focusable elements.
- **Hero Frame Note:** In `.v-hero-stock-report`, adjusted mobile content sizing (`aspect-ratio: auto; min-height: 295px`), verifying that `.v-hero-report-foot` is 100% visible (`isClipped: false`).

### 3. Mobile Spacing & Controls
- **Operations Sizing:** Removed `min-height: calc(100svh - 64px)` from `#operations` and `min-height: 610px` from `.v-operations-panel`. Panel height is content-driven (`panelHeight: 497.09px`), with consistent 24 px card padding (`copyPadding: 24px`).
- **2-Column Operations Tabs Grid:** Rendered in a 2-column grid (`grid-template-columns: 193px 193px` at 440px), eliminating horizontal scrolling and ensuring all four workflows are discoverable.
- **Directional Navigation:** `getOperationsIndexForKey` updated to support `columns = 2` navigation (ArrowDown/ArrowUp moves between rows with wrap-around; ArrowRight/ArrowLeft moves between columns).
- **Activation Hit Targets (≥ 44 × 44 px):**
  - Header demo CTA (`.v-nav-demo`): 145.2 × 44.0 px (Pass).
  - Inventory pagination dot activation area (`::before`): 44.0 × 44.0 px (Pass), while visual dot remains 18 × 6 px (active) / 6 × 6 px (inactive).
- **Contrast Ratios:**
  - Normal text / card intro / card footer: updated to `#d2d0cb` / `#b5b5b5` (contrast > 5.5:1 against black, exceeding WCAG AA 4.5:1).
  - Placeholder text: updated to `rgba(255, 255, 255, 0.65)` (> 5:1).
  - Control boundary lines (`.field-bottom-line`): updated to `rgba(255, 255, 255, 0.35)` (> 3.2:1 against black, exceeding WCAG 3:1).

### 4. Conversion Copy
- **Hero Audience Sentence:**
  `Stock, expiry tracking and billing for retail and hospital pharmacies.`
- **Demo Form Introduction:**
  `Tell us about your pharmacy. We’ll contact you to arrange a demo around your team’s workflows. All fields are required.`
- **Submit Button:**
  Updated from `[REQUEST_A_DEMO]` to `Request my demo`.
- **Integrity:**
  All 5 required form fields (`name`, `email`, `phone`, `orgType`, `orgName`), client-side validation, error states, and submission lifecycle preserved intact.

---

## Test & Verification Matrix

| Test Suite / Check | Result | Details |
| --- | --- | --- |
| `tests/velocity-inventory.test.mjs` | **PASS** (5/5) | Verified scroll targets, active index, preview dialog open, Escape dismissal, close button, focus restoration |
| `tests/velocity-operations.test.mjs` | **PASS** (6/6) | Verified hash routing, 1D desktop arrows, 2-column mobile grid navigation (ArrowDown/Up row wraps, ArrowRight/Left col wraps) |
| `tests/velocity-*.test.mjs` | **PASS** (88/88) | Full Velocity test suite passing with 0 failures |
| `npm run build` | **PASS** (exit 0) | Production bundle built cleanly via Vite in ~1.0s |
| Horizontal Overflow (320 × 740) | **PASS** | `docW: 320, scrollW: 320, overflows: false` |
| Horizontal Overflow (390 × 844) | **PASS** | `docW: 390, scrollW: 390, overflows: false` |
| Horizontal Overflow (440 × 956) | **PASS** | `docW: 440, scrollW: 440, overflows: false` |
| Horizontal Overflow (768 × 1024) | **PASS** | `docW: 768, scrollW: 768, overflows: false` |
| Horizontal Overflow (1440 × 900) | **PASS** | `docW: 1440, scrollW: 1440, overflows: false` |

---

## Captured Artifacts

Screenshots saved in `docs/marketing/screenshots/mobile-usability/`:
- `440x956-overview.png`: Primary hero with updated audience sentence and fully visible report note.
- `440x956-inventory.png`: Inventory carousel showing sharp screenshots and "Enlarge preview" buttons.
- `440x956-preview-dialog.png`: Open accessible preview modal showing full-size dashboard image.
- `440x956-reordering.png`: Restored charcoal recommendation card overlaid on blurred preview with 16 px insets.
- `440x956-operations.png`: Content-driven operations section with discoverable 2-column tab grid.
- `440x956-demo.png`: Demo form showing new introduction copy, high-contrast boundaries, and "Request my demo" button.
- Responsive viewports: `320x740-hero.png`, `320x740-reordering.png`, `390x844-hero.png`, `390x844-reordering.png`, `768x1024-hero.png`, `768x1024-reordering.png`, `1440x900-hero.png`, `1440x900-reordering.png`.

# Stock & Medicines Carousel Verification Record

**Date:** 2026-10-25  
**Target:** `#inventory` section on `/velocity.html`  
**Reference:** `docs/superpowers/specs/2026-10-25-inventory-carousel-design.md`  
**Approved visual reference:** `/Users/anubhavjaidka/.codex/generated_images/01a17303-6ac7-7b90-86a5-d64e00f9b8aa/exec-d4b9e4fd-5f2f-4ecd-8ca9-c4869fe6baca.png`

---

## 1. Summary of Changes

- **HTML (`velocity.html`):**
  - Updated `<section id="inventory">` to a full-bleed borderless container (`.v-inventory-section`) instead of constraining the entire section within `.v-container`.
  - Nested the header copy (`.v-copy`), control bar (`.v-inventory-nav`), and footer note (`.v-inventory-footer`) inside `.v-container`, while the carousel track (`.v-inventory-track`) spans edge-to-edge across the viewport.
  - Implemented 4 semantic `<article>` cards matching the spec copy and alternating neutral palette:
    1. `inventory-locations`: *Locations* (Graphite dark surface)
    2. `inventory-batches`: *Batches* (Soft-white surface)
    3. `inventory-expiry`: *Expiry* (Graphite dark surface)
    4. `inventory-units`: *Packs & units* (Soft-white surface)
  - Added temporary real dashboard preview images (`/Pictures/velocity-dashboard-light.png`) with intrinsic dimensions, lazy loading, and explicit captions: `Dashboard preview`.
  - Added progressive control elements: `Swipe or scroll to explore` instruction, 4 indicator dots with an elongated active indicator, accessible previous/next circular buttons with SVG icons, and a polite live region (`[data-inventory-status]`).
  - Added bottom section divider and footer note: *Authorised stock adjustments. Recorded history.*

- **CSS (`velocity.css`):**
  - Removed top border (`border-top: none;`) and reduced excessive top padding on `#inventory` so the section flows seamlessly from the hero dashboard preview.
  - Full-bleed borderless carousel track: set left padding dynamically (`max(48px, calc((100% - 1200px) / 2 + 48px))`) to align Card 1 with the section header, while subsequent cards bleed across the right screen edge without artificial container gutters.
  - Dark cards: `#202124` background, `#f5f5f5` heading (`'Lora', serif`), `#c7c9ce` description, subtle neutral border (`rgba(255, 255, 255, 0.08)`), shadow.
  - Light cards: `#f4f5f7` background, `#17191d` heading (`'Lora', serif`), `#505660` description, subtle neutral border (`rgba(0, 0, 0, 0.06)`), shadow.
  - Zero gold or bronze accents on card surfaces, borders, or glows.
  - Native horizontal scroll track with `overflow-x: auto; scroll-snap-type: x mandatory;`.
  - Elongated active indicator (`width: 24px`) vs inactive indicators (`width: 6px`).
  - Visible focus indicators for keyboard accessibility.
  - Removed obsolete rules: `.v-inventory-grid`, `.v-callout`, `.v-sticky-frame`, and associated media query rules.

- **JavaScript (`velocity-inventory.mjs` & `velocity-page.js`):**
  - Created `velocity-inventory.mjs` exporting `initInventoryCarousel(root)`.
  - Derived active index dynamically from actual geometry (closest card to track start).
  - Synchronised position indicators and prev/next disabled boundaries (prev disabled on Card 1, next disabled on Card 4).
  - Supported click navigation, keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End` when track is focused), and direct touch/trackpad swipe.
  - Respected `prefers-reduced-motion: reduce` dynamically (uses immediate scrolling without smooth animation).
  - Progressive enhancement: controls remain `hidden` if JavaScript is unavailable; native scrolling remains fully functional.
  - Safely integrated into `velocity-page.js` lifecycle (`pageshow`/`pagehide`), removing retired inventory sticky code while preserving the hospital-supply step animations.

---

## 2. Automated Test & Build Results

| Check | Command | Result | Notes |
| :--- | :--- | :--- | :--- |
| **Lint** | `npx eslint velocity-page.js velocity-inventory.mjs` | **PASS (code 0)** | Zero lint errors or warnings. |
| **Unit tests** | `node --test tests/connect-form.test.mjs` | **PASS (code 0)** | 9/9 tests pass (0 regressions). |
| **Production build** | `npm run build` | **PASS (code 0)** | Built in ~850ms; `dist/velocity.html` and assets compiled cleanly. |

---

## 3. Interactive Browser Verification Results

Automated headless Chrome CDP execution verified:

| Test Case | Expected Behavior | Actual Observed Result | Status |
| :--- | :--- | :--- | :--- |
| **Initial State** | Dot 0 active, Prev disabled, Next enabled, Status "Feature 1 of 4: Locations" | `dotsActive: ["true", "false", "false", "false"]`, `prevDisabled: true`, `nextDisabled: false`, Status: `"Feature 1 of 4: Locations"` | **PASS** |
| **Next Click** | Navigates to Card 2, Dot 1 active, Prev enabled, Next enabled | `dotsActive: ["false", "true", "false", "false"]`, `prevDisabled: false`, `nextDisabled: false`, Status: `"Feature 2 of 4: Batches"` | **PASS** |
| **End of Carousel** | Card 4 active, Dot 3 active, Next button disabled | `dotsActive: ["false", "false", "false", "true"]`, `prevDisabled: false`, `nextDisabled: true`, Status: `"Feature 4 of 4: Packs & units"` | **PASS** |
| **Dot Direct Click** | Clicking Dot 0 scrolls back to Card 1 | `dotsActive: ["true", "false", "false", "false"]`, `prevDisabled: true`, `nextDisabled: false` | **PASS** |
| **Keyboard Navigation** | `ArrowRight` advances to Card 2; `End` advances to Card 4 | State updates synchronously on keyboard events without document page jumps | **PASS** |
| **Horizontal Overflow** | Document width equals client width across 1440px, 1024px, 768px, 390px, 320px | `docScrollWidth === docClientWidth` (e.g. 320 === 320 at 320px viewport). No horizontal page scrollbar. | **PASS** |
| **Hospital Supply Integration** | `[data-supply-step]` IntersectionObserver intact | Section 04 supply steps present (4) and successfully tracked by observer. | **PASS** |
| **Hero Integrity** | Hero remains completely unchanged | Mockup preview image, window bar, title, and buttons preserved verbatim. | **PASS** |

---

## 4. Screenshot Artifacts

All screenshots recorded in `docs/superpowers/plans/verification-assets/`:
- `baseline-desktop.png`: Full desktop baseline before change
- `baseline-mobile.png`: Full mobile baseline before change
- `task1-desktop-nojs.png`: Native scrolling layout without JavaScript (controls hidden, cards readable)
- `card-1-initial-desktop.png`: Desktop Card 1 active state matching approved design
- `card-2-desktop.png`: Desktop Card 2 active state
- `card-4-final-desktop.png`: Desktop Card 4 active state with disabled next arrow
- `card-mobile-390.png`: Mobile 390px viewport card presentation
- `mobile-full-section.png`: Mobile section layout verification

---

## 5. Asset Limitations & Next Steps

- **Product imagery:** As specified in the design and plan documents, `public/Pictures/velocity-dashboard-light.png` is currently used and explicitly labelled with the visible caption **Dashboard preview**.
- No synthetic or AI-generated interface mockups were inserted as real product screenshots.
- Specialized, high-fidelity inventory/batch/expiry captures can replace these dashboard previews as a drop-in asset update once approved screenshots become available from engineering.

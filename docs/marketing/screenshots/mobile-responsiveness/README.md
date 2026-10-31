# Mobile Responsiveness Verification Evidence

Date: 31 October 2026
Specification: `docs/superpowers/specs/2026-10-31-velocity-mobile-responsiveness-design.md`

## 1. Tested Viewport Matrix

All viewports were tested using automated Chrome headless (CDP) against the built production site:
- **320x740** (Narrow phone): `innerWidth=320`, `scrollWidth=320`, `clientWidth=320` -> **PASS**
- **360x800** (Standard phone): `innerWidth=360`, `scrollWidth=360`, `clientWidth=360` -> **PASS**
- **390x844** (iPhone 12/13/14): `innerWidth=390`, `scrollWidth=390`, `clientWidth=390` -> **PASS**
- **430x932** (iPhone Pro Max): `innerWidth=430`, `scrollWidth=430`, `clientWidth=430` -> **PASS**
- **844x390** (Landscape phone): `innerWidth=844`, `scrollWidth=844`, `clientWidth=844` -> **PASS**
- **768x1024** (Tablet portrait): `innerWidth=768`, `scrollWidth=768`, `clientWidth=768` -> **PASS**
- **1024x768** (Tablet landscape / small laptop): `innerWidth=1024`, `scrollWidth=1024`, `clientWidth=1024` -> **PASS**
- **1440x900** (Desktop wide): `innerWidth=1440`, `scrollWidth=1440`, `clientWidth=1440` -> **PASS**

### Breakpoint Transitions Tested
- **767px / 768px** (Phone to Tablet transition): `scrollWidth === clientWidth` on both sides -> **PASS**
- **800px / 801px** (Operations & Supply split layout): `scrollWidth === clientWidth` on both sides -> **PASS**
- **860px / 861px** (Why Velocity accordion threshold): `scrollWidth === clientWidth` on both sides -> **PASS**
- **900px / 901px** (Navigation compact threshold): `scrollWidth === clientWidth` on both sides -> **PASS**
- **1023px / 1024px** (Desktop motion / pinning activation): `scrollWidth === clientWidth` on both sides -> **PASS**

## 2. Interaction States Tested

- **Purchasing horizontal rail (`#purchasing`)**:
  - Initial position: `scrollLeft: 0`, Previous button disabled (`true`), Next button enabled (`false`).
  - Scrolled by clicking Next button: `scrollLeft: 302`, Previous button enabled (`false`), Next button disabled (`true`) at end.
  - Native touch and keyboard scroll verified with start snap alignment.
- **Everyday operations tabs (`#operations`)**:
  - Single horizontal tab row with native overflow scrolling.
  - Switching to last tab ("Reports & access"): active indicator, tab selection, and associated panel updated cleanly without clipping.
  - Outer visual padding set to 12px; inner document padding set to 16px; copy panel set to 20px (16px below 360px).
- **Capability cards rail (`#features`)**:
  - Initial position: Previous button disabled (`true`), Next button enabled (`false`).
  - Cards sized at `calc(100% - 32px)` exposing 16px of next card with 16px gap.
- **Comparison table (`#comparison`)**:
  - At `<= 600px`: Capability column fixed to 140px, two data columns at 220px each (580px total width).
  - First column sticky with opaque `#141414` background.
  - Horizontal scrolling contained within `.v-comparison-scroll` with scroll hint visible.
- **Hero & HTML Stock Report (`#overview`)**:
  - Clean single-column layout on phones.
  - HTML Stock Report maintains minimum 12px font size (no 0.43rem text) with natural height and full report content.
- **Demo form & Footer**:
  - Single column form layout below 768px.
  - Card padding 20px (16px below 360px).
  - Phone country selector switches to top row below 360px.
  - Conversion bar physical bottom reservation (`padding-bottom: var(--v-conversion-bar-height)`) verified preventing footer obstruction.

## 3. Failures Resolved

1. **Sub-12px Font Sizes**: `velocity-hero.css` was reducing stock report labels to `0.43rem` - `0.5rem` (~7-8px). Replaced with `0.75rem` (12px) minimum font sizes and natural container height.
2. **Comparison Table Column Collapse**: Viewport subtraction at <=600px was reducing content columns to ~138px at 320px width. Corrected to exact specified widths (140px capability column, 220px content columns, 580px min table width).
3. **Form Stacking at 640-767px**: Demo form had a 2-column layout rule between 640px and 767px. Standardized to single-column throughout `<= 767px`.
4. **Gutters at 320-359px**: Added `calc(100% - 32px)` container width for 16px page gutters on narrow phones.
5. **Footer Upper-case Tracking Overflow**: Reduced 6px letter-spacing on narrow phones to avoid horizontal overflow on 320px screens.
6. **Conversion Bar Space Reservation**: Added `padding-bottom: var(--v-conversion-bar-height, 0px)` on body/page to ensure bottom page content is physically elevated above the fixed bar.
7. **Vertical Document Stacking in Purchasing & Capabilities**: Added native swipeable rails with progressive enhancement arrows and hints (`Swipe or use arrows to explore`).

## 4. Remaining Unverified Real-Device Checks

- Local browser emulation, CDP automated testing, and node tests were executed and passed with 100% success.
- Physical iOS Safari and physical Android Chrome hardware testing remains marked unverified per Section 8 instructions (real physical devices not present in automated CI/runner environment).

## 5. Evidence Screenshots

- `01-phone-390-hero.png`: Mobile hero header and stock report at 390px
- `02-purchasing-rail-first.png`: Purchasing rail with Purchase Order active and Next button enabled
- `03-purchasing-rail-last.png`: Purchasing rail scrolled to Goods Receipt with Next button disabled
- `04-supply-stage-phone.png`: Hospital supply department and transfer document stage
- `05-operations-last-tab.png`: Operations segmented tabs with last tab ("Reports & access") selected
- `06-capability-rail-phone.png`: Capabilities card rail on mobile
- `07-comparison-scrolled-right.png`: Comparison table scrolled horizontally with sticky first column
- `08-demo-form-phone.png`: Single-column demo form, status area, and footer
- `09-tablet-768-overview.png`: Tablet 768px overview
- `10-desktop-1440-overview.png`: Desktop 1440px overview

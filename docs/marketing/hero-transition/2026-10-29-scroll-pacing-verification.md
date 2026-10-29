# Velocity Hero Scroll Pacing Verification (2026-10-29)

## Executive Summary

The scroll pacing for the desktop Velocity hero sequence has been updated in `velocity-hero.mjs` and verified through unit tests, scoped linting, production build, and headless Chrome browser execution via Chrome DevTools Protocol (CDP).

### Pacing Multipliers and Travel Geometry

- **Landing Scroll Multiplier**: `HERO_LANDING_VIEWPORTS = 1.2` (increased from 0.8)
- **Chapter Interval Multiplier**: `HERO_CHAPTER_VIEWPORTS = 1.0` (increased from 0.7)
- **Total Scroll Travel**: `landing + 3 * chapterStep` = `4.2` viewport heights (increased from 2.9, a ~45% increase in dwell time).

#### Measured Viewport Geometries
| Viewport | Landing Travel (`1.2 * H`) | Chapter Step (`1.0 * H`) | Total Travel (`--hero-travel`) | Pin Release Position |
| :--- | :--- | :--- | :--- | :--- |
| **1440 × 900** | 1080px | 900px | **3780px** | 4168px (`start: 388px` + `3780px`) |
| **1280 × 720** | 864px | 720px | **3024px** | 3412px (`start: 388px` + `3024px`) |

---

## Verification Results

### 1. Automated Test Suites
- **Focused Hero Suite**: `node --test tests/velocity-hero.test.mjs`
  - 23 of 23 tests passing.
  - Tested: 1.2 landing / 1.0 chapter pacing assertions, smoothstep easing midpoint (`928px`), chapter boundaries (`1468px`, `2368px`, `3268px`, `4168px`), reverse scrolling restoration, chapter summary click target calculation (`landing + (index + 0.25) * step`), resize travel recalculation (`3024px` at 720h), and static fallback / cleanup.
- **Full Workspace Suite**: `node --test tests/*.test.mjs`
  - 62 of 62 tests passing across all test files with 0 failures and 0 skipped.
- **Scoped ESLint**: `npx eslint velocity-hero.mjs tests/velocity-hero.test.mjs`
  - 0 errors, 0 warnings.
- **Production Build**: `npm run build`
  - Vite v8.0.3 production build completed successfully in 946ms (`dist/velocity.html`: 117.85 kB, `dist/assets/velocity-DXqxe5VT.js`: 24.75 kB).
- **Git Diff & Constraints**:
  - `git diff --check` passed cleanly.
  - Preserved all prior uncommitted changes in `velocity-hero.css`, `velocity.html`, and documentation.
  - Inventory-through-footer markup in `velocity.html` remains byte-identical.
  - Zero new runtime dependencies.

### 2. Browser Execution Evidence (Chrome 156 via CDP)

- **Standard Desktop (1440 × 900)**:
  - `--hero-travel` set to `3780px` on `.v-hero-scene`.
  - Pinned hero active (`.v-hero.v-hero-motion`).
  - Landing reveal: Copy opacity smoothly ramps from `0` to `1` by landing position (`1468px`).
  - Chapter progress indicators:
    - `0px` - `1468px`: Chapter progress indicators remain `scaleX(0)`.
    - `1918px` (Chapter 0 midpoint): Chapter 0 fill at `scaleX(0.432)`, Chapter 1 & 2 at `scaleX(0)`.
    - `2818px` (Chapter 1 midpoint): Chapter 0 fill full (`scaleX(1)`), Chapter 1 at `scaleX(0.432)`, Chapter 2 at `scaleX(0)`.
    - `3718px` (Chapter 2 midpoint): Chapter 0 & 1 full (`scaleX(1)`), Chapter 2 at `scaleX(0.432)`.
    - `4168px` (Release): Chapter 2 fills to release threshold.
    - `>4168px` (Inventory): All three chapter indicators stay complete (`scaleX(1)`) as sticky container releases into native document flow.
- **Chapter Summary Clicks**:
  - Clicking Chapter 2 title triggered smooth scroll into Chapter 2 bounds (`3425px`), opening Chapter 2 disclosure and activating Chapter 2 panel without layout jumps.
- **Reverse Scroll Integrity**:
  - Scrolling back from release position `4168px` to `2818px` reproduced identical progress fill state: `[scaleX(1), scaleX(0.432), scaleX(0)]` with zero hysteresis or residual transform state.
- **Minimum Desktop (1280 × 720)**:
  - `--hero-travel` computed to `3024px`. Motion active, progress fills proportional.
- **Short Desktop Fallback (1280 × 650)**:
  - Height < 700px disables pinned motion (`v-hero-motion` absent).
  - `--hero-travel` is cleared (`""`), preventing unnecessary scroll spacing on small screens.
- **Mobile Fallback (390 × 844)**:
  - Pinned motion disabled (`v-hero-motion` absent). Natural stacked layout preserved.
- **Dynamic Reduced Motion**:
  - Emulating `prefers-reduced-motion: reduce` dynamically disables `v-hero-motion` and clears `--hero-travel` immediately.

### 3. Captured Visual Artifacts
- `docs/marketing/screenshots/pacing-1440x900-landing.png`: Verified landing alignment at 1468px scroll.
- `docs/marketing/screenshots/pacing-1440x900-ch1.png`: Verified Chapter 1 active state and off-white progress fills at 2818px scroll.

---

## Limitations & Verification Scope

- **Hardware Input Simulation**: Browser verification was conducted via CDP synthetic scrolling and programmatic `window.scrollTo`. Physical trackpad friction/inertia and mouse-wheel detent behavior cannot be emulated over headless CDP and require manual user observation on physical hardware.

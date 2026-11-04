# Velocity Mobile Spacing Verification Record

**Date:** 2026-11-04  
**Viewport:** 440×956 CSS pixels (primary reference), 390×844, 320×740, 767px, 768px, 1024px, 1440×900  
**Status:** Implemented & Verified  
**Plan:** `docs/superpowers/plans/2026-11-04-velocity-mobile-spacing.md`

---

## 1. Executive Summary

The mobile spacing pass for Velocity has been implemented and verified. All adjustments were strictly scoped inside `@media (max-width: 767px)` below the protected `#overview` hero. The protected hero markup, CSS, controller hashes, and desktop/tablet layouts (>= 768px) remain 100% byte-for-byte isolated and identical to baseline.

All 88 Velocity behavioral tests pass, and all 18 automated viewport matrix checks (from 320px to 1440px) pass with **zero** horizontal overflow.

---

## 2. Geometry & Spacing Verification at 440×956

### A. Gutters and Alignment
- **Hero & Header:** Protected; unchanged.
- **Lower Sections (`#inventory` through `#demo`):** Content containers measure exactly **392px width** with **24px left margin** and **24px right margin** at 440px.
- **Smaller Screens:**
  - At 390×844: Content container is **350px width** (20px gutters).
  - At 320×740: Content container is **288px width** (16px gutters).

### B. Chapter Transitions
| Boundary | Target Gap | Measured Box-to-Box | Owning Paddings | Status |
| --- | --- | --- | --- | --- |
| Hero (`#overview`) → Stock (`#inventory`) | Special | 0px box gap + 40px top | Hero bottom preserved, Stock top 40px | PASS |
| Stock (`#inventory`) → Reordering (`#reordering`) | 80px | 80px total padding | 40px bottom + 40px top | PASS |
| Reordering (`#reordering`) → Purchasing (`#purchasing`) | 80px | 80px total padding | 40px bottom + 40px top | PASS |
| Purchasing (`#purchasing`) → Supply (`#supply`) | 80px | 80px total padding | 40px bottom + 40px top | PASS |
| Supply (`#supply`) → Operations (`#operations`) | 80px | 80px total padding | 40px bottom + 40px top | PASS |
| Operations (`#operations`) → Medicine Workflows (`#features`) | 64px | 64px total padding | 40px bottom + 24px top | PASS |
| Medicine Workflows (`#features`) → Risks (`#why-velocity`) | 64px | 64px total padding | 40px bottom + 24px top | PASS |
| Risks (`#why-velocity`) → Comparison (`#comparison`) | 80px | 80px total padding | 40px bottom + 40px top | PASS |
| Comparison (`#comparison`) → FAQ (`#faq`) | 80px | 80px total padding | 40px bottom + 40px top | PASS |
| FAQ (`#faq`) → Demo (`#demo`) | 80px | 80px total padding | 40px bottom + 40px top | PASS |
| Demo (`#demo`) → Footer (`#footer`) | 64px | 64px total padding | 32px demo bottom + 32px footer top | PASS |

---

## 3. Section-by-Section Measured Details

### Stock across locations (`#inventory`)
- **Introduction → Rail:** 24px (measured: 24px)
- **Title → Description inside card:** 8px (measured: 8px)
- **Description → Preview inside card:** 16px (measured: 16px)
- **Card Padding:** 20px
- **Card Width at 440px:** 360px (`clamp(240px, calc(100vw - 80px), 360px)`)
- **Rail Start Inset:** 24px
- **Next Card Peek at 440px:** Next card starts at x=400, leaving exactly 40px visible at the viewport edge
- **Track → Nav:** 16px (measured: 16px, reduced from 32px)
- **Controls → Footer Note:** 16px (measured: 16px, reduced from 48px)
- **Note Text:** 13px / 20px

### Medicine Workflows (`#features`)
- **Natural Content Flow:** Removed artificial `min-height: calc(100svh - 64px)` and `space-between` flex distribution.
- **Rendered Section Height:** Reduced from 892px (baseline) to **736px** (flows naturally with content without dead space).
- **Heading → Lead:** 16px (measured: 16px)
- **Header → Controls / Rail:** 24px (measured: 24px)
- **Rail → Footnotes:** 16px (measured: 16px)
- **Secondary Cards & Previews:** Scale and internal typography fully preserved.

### Everyday Operations (`#operations`)
- **Intro → Tabs:** 24px (measured: 24px)
- **Tabs → Panel:** 24px (measured: 24px)
- **Card Padding:** 24px
- **Eyebrow → Heading:** 16px (measured: 16px)
- **Heading → Body:** 12px (measured: 12px)
- **Body → Bullets:** 16px (measured: 16px)
- **Body Text:** 15px / 24px leading
- **Tab Stability:** Preserved across all 4 tabs (`#daily-work`, `#ward-operations`, `#accounts`, `#visibility`).

### Hospital Supply (`#supply`)
- **Intro Bottom Margin:** 24px (reduced from 48px)
- **Stages → Preview:** 24px (reduced from 32px)
- **Summary Heading → First Content:** 24px (reduced from 32px)
- **Summary Row Padding:** 16px vertical padding preserved
- **Preview → Qualification:** 24px

### Risks and Activity (`#why-velocity`)
- **Detail Heading:** 24px / 30px Lora
- **Intro → Preview:** 24px
- **Preview → Scenarios:** 24px
- **Scenario Title → Description:** 16px
- **After Scenarios → Notes:** 16px
- **Qualifications:** 13px / 20px

### Comparison (`#comparison`)
- **Intro → Control:** 24px
- **Control → Note:** 16px
- **Checklist Structure:** Preserved collapsed/expandable pattern without table redesign.

### Questions, Answered (`#faq`)
- **Intro → FAQ List:** 24px
- **Question Rows:** 16px vertical padding
- **Answer Text:** 12px top padding, 16px bottom padding
- **Plus Affordance:** Fully functional.

### Demo Form (`#demo`)
- **Heading → Intro:** 16px
- **Intro → Email:** 16px
- **Invitation → Form:** 32px
- **Form Card Padding:** 20px
- **Field-Group Separation:** 24px
- **Label → Input:** 8px
- **Submit Group Top Margin:** 24px
- **Label Typography:** 12px / 18px

### Footer (`#footer`)
- **Scoped Velocity Selector:** `.velocity-page footer#footer` (no modification to `components.js` or other pages).
- **Top Padding:** 32px (paired with 32px demo bottom space for 64px combined transition).
- **Footer Group Separation:** 32px
- **Legal Row Top Margin:** 24px

---

## 4. Protected Hero & Desktop Isolation

```
Hero DOM SHA-256: 9f35cf0b3fcc9ad12359617d3fb455cc9221f8368cd8a6f7913b39cbb239de26 (MATCH)
Hero CSS SHA-256: 4c64d3a8fb014cf0982647fed184a8b5ab915ac3c5d4fe272c42fffc680aab53 (MATCH)
Hero JS  SHA-256: 3f3daee27b1a8eba814734c2f7c1b0061f14a7ea2e06b697f45b47f106f6842f (MATCH)
Desktop at 1440x900: 100% IDENTICAL to baseline across all section heights and paddings.
```

---

## 5. Verification Evidence
- Evidence artifacts saved in:
  - `docs/marketing/baseline/`
  - `docs/marketing/task1-slice/`
  - `docs/marketing/task2-verification/`
  - `docs/marketing/screenshots/mobile-responsiveness/`
- Full suite test results: 88/88 passing (`tests/velocity-*.test.mjs`).
- Viewport responsiveness matrix: 18/18 passing (`scripts/verify-acceptance.mjs`).

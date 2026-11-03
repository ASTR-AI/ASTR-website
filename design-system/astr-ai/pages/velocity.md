# Velocity Page Overrides

> **PROJECT:** ASTR AI  
> **Page Name:** Velocity (Pharmacy & Hospital Supply Chain OS)  
> **Template / File:** `velocity.html`  
> **Page Type:** Product Landing Page / Interactive SaaS Showcase  

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/astr-ai/MASTER.md`).  
> Only deviations from the Master are documented here. For all other rules, refer to the Master and `Design-Guidelines/Velocity_Design_Guideline.md`.

---

## 1. Page-Specific Rules & Overrides

### 1.1 Color Overrides (Dark-Mode Command Center)
- **Canvas Void:** `#000000` / `#050505` (Overrides `#FEF2F2`)
- **Panel Surface:** `#13161c` / `#17181b`
- **Elevated Surfaces:** `#18181b` / `#191918`
- **Brand Accent:** `--v-gold: #E6CD99` (Overrides `#CA8A04`)
- **Text Headings:** `#FFFFFF` (Overrides `#450A0A`)
- **Body Text:** `#d2d0cb` (> 5.5:1 contrast against black)
- **Muted Metadata:** `#b5b5b5` / `#a0a0a5` (> 4.5:1 contrast)
- **Field Boundary Lines:** `rgba(255, 255, 255, 0.35)` (> 3.2:1 against black)
- **Field Placeholders:** `rgba(255, 255, 255, 0.65)` (> 5.2:1 against black)

### 1.2 Typography Overrides
- **Display Headings (H1, H2, H3):** `Lora, serif` (Overrides `Bodoni Moda`)
  - Hero H1: Desktop `clamp(2.3rem, 4.6vw, 3.8rem)` | Mobile `clamp(32px, 8.5vw, 42px)`
  - Section H2: Desktop `clamp(2rem, 4vw, 3.5rem)` | Mobile `clamp(26px, 6.8vw, 32px)`
  - Subheading H3: Desktop `1.25rem` | Mobile `clamp(20px, 5.2vw, 24px)`
- **Interface / Content:** `Geist Variable`, sans-serif (Overrides `Jost`)
- **Telemetry / Metadata:** `JetBrains Mono`, monospace (8px–10px, uppercase, tracking `0.08em - 0.15em`)

### 1.3 Spacing Overrides
- **Desktop Header Offset:** `--v-header-offset: 88px`
- **Desktop Container:** `width: min(1200px, calc(100% - 96px))`
- **Mobile Header Offset:** `--v-header-offset: 64px`
- **Mobile Container:** `width: calc(100% - 40px)`
- **Mobile Spacing Tokens:**
  - `--v-space-small: 8px`
  - `--v-space-heading: 16px`
  - `--v-space-card: 20px`
  - `--v-space-content: 32px`
  - `--v-space-section: 56px`

---

## 2. Layout Specifications: Desktop vs Mobile Separately

### 2.1 Desktop Layout Specification (`min-width: 1024px`)
- **Navigation:** Fixed 3-column bar (`1fr auto 1fr`, 60px min-height), brand logo left, horizontal anchor links with feature dropdown center, liquid-glass pill CTA button right.
- **Hero (`#overview`):** Centered category badge (`Pharmacy management software`), Lora H1, 660px lead paragraph, side-by-side action buttons, 1040px browser window frame mockup with sticky scroll travel (`.v-hero-motion`), hover-activated navigation arrows.
- **Inventory (`#inventory`):** Multi-card bento grid with live batch status telemetry, top-right carousel controls.
- **Reordering (`#reordering`):** Full browser preview screenshot + floating frosted glass card with interactive disclosure tabs.
- **Purchasing (`#purchasing`):** Horizontal linear progression pipeline with vector connector lines.
- **Hospital Supply (`#supply`):** Two-team department handoff bento (Ward Indent card with Amber dot `#E6CD99` + Central Pharmacy card with Blue dot `#60a5fa`) + document reconciliation ledger.
- **Operations (`#operations`):** 2-column operational stage (`--operations-stage-radius: 64px`), 1D horizontal segmented tab bar (1D arrow keys), rich editorial copy on left, live clinical terminal document on right.
- **Features (`#features`):** 3-column bento grid with SVG vector charts and clinical alert widgets.
- **Comparison (`#comparison`):** Full multi-column matrix with sticky header row.
- **FAQ (`#faq`):** 2-column editorial grid.
- **Demo (`#demo`):** 2-column layout (Left: Sanskrit watermark `अस्त्र` + value copy; Right: Frosted intake card with 2-column input fields).

### 2.2 Mobile Layout Specification (`max-width: 767px`)
- **Navigation:** Compact 64px bar, direct demo CTA button meeting minimum `44 × 44 px` activation area.
- **Hero (`#overview`):** Category badge hidden to elevate H1 (`clamp(32px, 8.5vw, 42px)`); audience clarification sentence (`Stock, expiry tracking and billing for retail and hospital pharmacies.`) placed under heading; vertical button stack; **persistently visible** navigation arrows (`42 × 42 px` touch targets); browser frame auto-sized (`min-height: 295px`) ensuring stock reporting footnote is 100% visible.
- **Inventory (`#inventory`):** Horizontal snap carousel (`scroll-snap-type: x proximity`, card flex `calc(100% - 32px)`). Every card features an **"Enlarge preview" accessible modal dialog** (`<dialog id="inventory-preview-dialog">`) with keyboard trapping and gesture panning. Navigation arrows strictly `44 × 44 px`; pagination dots feature `::before` pseudo-element providing `44 × 44 px` touch targets.
- **Reordering (`#reordering`):** Content-driven `380px` panel height with gradient backdrop. Screenshot blurred in background, while sharp opaque charcoal card (`#17181b`) sits anchored over bottom with **16px side insets** (`left: 16px; right: 16px; bottom: 16px`), `18px` border radius, and `0 20px 40px` shadow. Stacked vertical disclosure steps (`grid-template-columns: 20px 1fr`).
- **Purchasing (`#purchasing`):** Flex-reordered vertical stack: Intro (`order: 1`), document snap carousel (`order: 2`), features rail (`order: 3`, 84% width cards on `#18181b` surface), status footer (`order: 4`). Complex connector lines hidden.
- **Hospital Supply (`#supply`):** Vertical padding tightened (`24px 56px`). Complex document ledgers hidden. Integrated **4-step journey tab bar** (`grid-template-columns: repeat(4, 1fr)`) with minimum `48px` touch target links.
- **Operations (`#operations`):** **2-Column Tab Grid** (`repeat(2, minmax(0, 1fr))`) eliminating hidden horizontal scroll; **2D directional arrow-key navigation** (ArrowUp/Down jumps rows with wrap-around, ArrowRight/Left jumps columns); **content-driven panel height** (no 100svh overflow); right-hand document preview hidden to prioritize clinical workflow reading.
- **Features (`#features`):** Single-row proximity snap rail (`80%` card width, max `280px`, `240px` visual height).
- **Comparison (`#comparison`):** Stacked mobile cards with sticky feature headers.
- **FAQ (`#faq`):** Single-column stacked `<details>` list with `44px` min touch height.
- **Demo (`#demo`):** Single-column layout. Inputs enforce **`font-size: 16px`** (strictly preventing iOS auto-zoom) and `min-height: 44px`. Split 2-column phone input group (`116px minmax(0, 1fr)`). High-contrast lines (`border-bottom: 1px solid rgba(255,255,255,0.35)` > 3.2:1). Full-width button labeled **`Request my demo`**.

---

## 3. Mobile Usability & Accessibility Rules
1. **Touch Targets (≥ 44 × 44 px):** Enforced across all buttons, nav arrows, pagination dots (`::before`), and form fields.
2. **Zero Horizontal Overflow:** Root container enforces `overflow: clip` / `overflow-x: hidden` with zero tolerance for scroll blowout.
3. **Form Inputs (≥ 16px):** Prevents unwanted Safari iOS viewport auto-zooming.
4. **Content-Driven Heights:** Zero viewport locking (`100svh`) on composite panels.
5. **Modal Focus Management:** Traps focus inside `<dialog>`, dismisses on `Escape`, and restores focus upon exit.

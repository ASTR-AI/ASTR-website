# ASTR AI Design Guideline

## 1. Design Philosophy: "Ancient Precision meets Future Logic"

The ASTR AI brand identity bridges classical engineering (deep-tech precision, clinical mission-criticality) and futuristic logic. The user experience is designed as an **Editorial Technical Command Center** or **Holographic Journal**, harmonizing organic, authoritative serif typography with high-contrast, modern interface surfaces and monospaced telemetry.

### Core Tenets
1. **Clinical Mission-Criticality:** Uncompromised data fidelity, ultra-clear visual hierarchy, zero ambiguity.
2. **Architectural Minimalism:** Deep space backgrounds (`#000000`, `#050505`), rich charcoal cards (`#13161c`, `#17181b`, `#18181b`), subtle frosted liquid glass (`backdrop-filter: blur(24px)`), and warm Astra Gold accents (`#E6CD99`).
3. **Adaptive Density:** Expansive multi-column bento grids on desktop; focused, discoverable rails and content-driven vertical flows on mobile.

---

## 2. Color Palette & Accessibility Tokens

All interfaces adhere to strict dark-mode contrast standards exceeding WCAG AA requirements (4.5:1 for normal text, 3:1 for graphical controls).

### 2.1 Primary Neutrals (The Void)
- **Main Canvas Background:** `#000000` / `#050505` (Deepest Void)
- **Primary Panel Background:** `#13161c` / `#17181b` (Section containers, dark cards)
- **Elevated Component Surface:** `#18181b` / `#191918` (Nested cards, interactive widgets, dropdowns)
- **Subtle Component Border:** `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.14)`
- **Hover / Active Border:** `rgba(255, 255, 255, 0.22)`
- **Field Boundary Lines:** `rgba(255, 255, 255, 0.35)` (> 3.2:1 against black, WCAG compliant)

### 2.2 Brand Accents (Astra Gold)
- **Primary Gold (`--v-gold`):** `#E6CD99` (Primary call-to-actions, active indicators, brand highlights)
- **Dim Gold:** `#cba864` (Subdued borders, secondary telemetry callouts)
- **Bright Gold:** `#fff2d1` (Interactive glows, high-energy focus states)
- **Gold Glow:** `rgba(230, 205, 153, 0.35)`
- **Gold Surface Tint:** `rgba(230, 205, 153, 0.06)`

### 2.3 Secondary & Status Accents
- **High-Contrast Text:** `#FFFFFF` (Headings, primary display)
- **High-Contrast Body Text:** `#d2d0cb` (> 5.5:1 contrast against black)
- **Muted Metadata / Footers:** `#b5b5b5` / `#a0a0a5` (> 4.5:1 contrast)
- **Form Placeholders:** `rgba(255, 255, 255, 0.65)` (> 5.2:1 contrast)
- **Clinical Blue:** `#60a5fa` (Central pharmacy dispatches, system sync)
- **System Emerald:** `rgba(76, 175, 80, 0.85)` (Nominal stock, verified GRN, success)
- **System Crimson:** `#EF4444` (Critical expiry alert, stock-out, validation error)

---

## 3. Typography Hierarchy

| Role | Font Family | Desktop Size / Leading | Mobile Size / Leading | Weight & Style |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Display H1** | `Lora` (Serif) | `clamp(2.3rem, 4.6vw, 3.8rem)` / `1.15` | `clamp(32px, 8.5vw, 42px)` / `1.15` | 700, balance |
| **Hero Italic Accent** | `Lora` (Serif Italic) | Inherits H1 | Inherits H1 | 400 Italic, `rgba(255,255,255,0.9)` |
| **Section Header H2** | `Lora` (Serif) | `clamp(2rem, 4vw, 3.5rem)` / `1.15` | `clamp(26px, 6.8vw, 32px)` / `1.20` | 700, `-0.02em` |
| **Card / Subheading H3**| `Lora` (Serif) | `1.25rem` / `1.35` | `clamp(20px, 5.2vw, 24px)` / `1.30` | 600, `-0.01em` |
| **Lead Intro Paragraph**| `Lora` (Serif) | `clamp(1.02rem, 1.3vw, 1.18rem)` / `1.75` | `1.00rem` (16px) / `1.60` | 400 |
| **Interface / Body Text**| `Geist Variable`, sans-serif | `0.95rem` / `1.65` | `0.875rem` (14px) / `1.50` | 400, `#d2d0cb` |
| **Technical Metadata** | `JetBrains Mono` (Mono) | `10px` / `1.0` | `9px` / `1.0` | 400, `0.08em - 0.15em` caps |
| **Section Eyebrow** | `Space Grotesk` (Sans) | `0.75rem` / `1.0` | `0.70rem` / `1.0` | 600, `0.12em` caps, gold |

---

## 4. Spacing System & Responsive Breakpoints

### 4.1 Breakpoint Tokens
- **Desktop (Large):** `min-width: 1024px`
- **Tablet / Medium:** `768px – 1023px`
- **Mobile (Phone):** `max-width: 767px` (tested across 320px, 390px, 440px)

### 4.2 Spacing Variables
```css
/* Desktop Root Spacing */
--v-header-offset: 88px;
--v-container-width: min(1200px, calc(100% - 96px));
--v-space-section-desktop: 80px - 120px;
--v-space-card-desktop: 24px - 32px;

/* Mobile Root Spacing (@media max-width: 767px) */
--v-header-offset: 64px;
--v-container-width: calc(100% - 40px);
--v-space-small: 8px;
--v-space-heading: 16px;
--v-space-card: 20px;
--v-space-content: 32px;
--v-space-section: 56px;
```

---

## 5. Velocity Page Design Layout: Desktop vs Mobile

For exhaustive technical specs of every sub-component and API state, see the dedicated [Velocity Design Guideline](Velocity_Design_Guideline.md). Below is the authoritative layout blueprint for desktop and mobile environments.

### 5.1 Global Header & Navigation
- **Desktop Layout (`≥ 1024px`):**
  - Fixed 60px 3-column grid (`1fr auto 1fr`) with `backdrop-filter: blur(24px) saturate(135%)`.
  - Brand wordmark left (`Velocity` in Lora serif with mono `ASTR` tag).
  - Centered horizontal anchor links with hover underline and expandable `<details>` dropdown for features.
  - Right-aligned liquid-glass pill CTA button (`.v-nav-demo`) with gold glow.
- **Mobile Layout (`≤ 767px`):**
  - Streamlined 64px sticky bar with edge-to-edge container.
  - Direct demo CTA button meeting minimum `44 × 44 px` activation bounding box.
  - Zero horizontal overflow; touch-friendly menu toggle.

### 5.2 Hero Section (`#overview`)
- **Desktop Layout (`≥ 1024px`):**
  - Centered category badge (`Pharmacy management software`).
  - High-authority Lora H1 (`Manage your pharmacy. From stock to billing.`).
  - 660px max-width lead paragraph.
  - Paired action buttons: Liquid-glass CTA (`Request a demo`) + explore link (`Explore workflows ->`).
  - 1040px max-width browser window frame mockup with simulated macOS browser bar, address bar, telemetry pills, and sticky scroll choreography (`.v-hero-motion`).
  - Navigation arrows reveal on cursor hover.
- **Mobile Layout (`≤ 767px`):**
  - Category badge hidden to elevate H1 immediately above the fold (`clamp(32px, 8.5vw, 42px)`).
  - Explicit audience sentence placed beneath heading: `Stock, expiry tracking and billing for retail and hospital pharmacies.`
  - Centered vertical action stack (`gap: 24px`, button min-height `46px`).
  - Hero carousel navigation arrows are **persistently visible** (`42 × 42 px` touch targets).
  - Browser mockup auto-sizes (`min-height: 295px`), guaranteeing the stock reporting footnote is 100% visible without clipping.

### 5.3 Inventory Management Carousel (`#inventory`)
- **Desktop Layout (`≥ 1024px`):**
  - High-density bento grid featuring multi-location telemetry, batch status badges, and side-by-side inspection cards.
  - Top-right pagination and cursor drag support.
- **Mobile Layout (`≤ 767px`):**
  - Horizontal swipe rail (`scroll-snap-type: x proximity`) with `calc(100% - 32px)` card width.
  - **Accessible Inspection Modal:** Every card includes a dedicated `[data-enlarge-preview]` trigger opening `<dialog id="inventory-preview-dialog">` with focus trapping, Escape dismissal, and touch-panning support.
  - **Touch Hit Target Compliance:** Prev/Next arrows strictly `44 × 44 px`. Pagination dots feature invisible `::before` pseudo-elements expanding touch areas to `44 × 44 px`.

### 5.4 Smarter Predictive Reordering (`#reordering`)
- **Desktop Layout (`≥ 1024px`):**
  - Expansive tinted section with high-resolution screenshot of the predictive purchase order console.
  - Floating summary card with frosted glass background, accent border, and interactive disclosure steps.
- **Mobile Layout (`≤ 767px`):**
  - **Restored Overlay Composition:** Panel `.v-reorder-panel` set to content-driven `380px` height with gradient backdrop.
  - Screenshot blurred in background, while sharp, opaque charcoal summary card (`#17181b`) sits anchored over the lower screen with exact **16px insets** (`left: 16px; right: 16px; bottom: 16px`), `18px` border radius, and `0 20px 40px` shadow.
  - Disclosure steps stacked vertically (`grid-template-columns: 20px 1fr`) with gold step icons, completely clearing the showcase panel.

### 5.5 Purchasing & Logistics (`#purchasing`)
- **Desktop Layout (`≥ 1024px`):**
  - Horizontal multi-stage progression: Purchase Order → Vendor Dispatch → Waybill Tracking → GRN Receiving → Billing Reconciliation.
  - Connecting vector paths and expanding document inspection panels.
- **Mobile Layout (`≤ 767px`):**
  - Reordered vertical stack: Title/lead (`order: 1`), Document preview carousel (`order: 2`), Feature cards rail (`order: 3`), Status footer (`order: 4`).
  - Feature cards rendered as an 84% width horizontal swipe rail (`#18181b` surface, `16px` border-radius).
  - Heavy connector lines and decorative captions hidden.

### 5.6 Hospital & Ward Supply Chain Bento (`#supply`)
- **Desktop Layout (`≥ 1024px`):**
  - Two-team department handoff bento: Ward Indent Requisition card (Amber node `#E6CD99`) side-by-side with Central Pharmacy Fulfillment card (Blue node `#60a5fa`).
  - Real-time document audit checklist and reconciliation ledger.
- **Mobile Layout (`≤ 767px`):**
  - Section vertical padding tightened (`24px 56px`). Complex document ledgers hidden.
  - Integrated **4-step mobile journey tab bar** (`grid-template-columns: repeat(4, 1fr)`) with minimum `48px` touch target links (Request → Approve → Dispatch → Receive).

### 5.7 Operations Console (`#operations`)
- **Desktop Layout (`≥ 1024px`):**
  - 2-column operational stage (`--operations-stage-radius: 64px`) with ambient radial glow.
  - Top horizontal segmented tab bar switching between 4 workflows with 1D keyboard arrow navigation.
  - Left pane: editorial workflow copy & bulleted capabilities; Right pane: high-fidelity clinical terminal & data tables.
- **Mobile Layout (`≤ 767px`):**
  - **2-Column Tab Grid:** Tab bar rendered as an explicit 2-column grid (`repeat(2, minmax(0, 1fr))`), guaranteeing all 4 workflows are immediately visible.
  - **2D Directional Keyboard Navigation:** ArrowUp/Down wraps between rows; ArrowRight/Left wraps between columns.
  - **Content-Driven Panel Height:** Viewport height locking (`100svh`) and `610px` min-height removed. Panel height expands naturally with content (`24px` padding).
  - Right-hand document mockup hidden on phones to ensure instant legibility of clinical steps.

### 5.8 Capabilities Grid (`#features`)
- **Desktop Layout (`≥ 1024px`):** 3-column bento grid featuring interactive SVG telemetry charts, real-time export row simulations, and drug interaction alert widgets.
- **Mobile Layout (`≤ 767px`):** Single-row proximity snap rail (`scroll-snap-type: x proximity`, card width `80%` / max `280px`) with content-driven `240px` visual height.

### 5.9 Why Velocity & Comparison Matrix (`#why-velocity` & `#comparison`)
- **Desktop Layout (`≥ 1024px`):** Full multi-column matrix comparing Legacy ERP vs Generic POS vs ASTR Velocity across sub-50ms dispensing, offline sync, compliance, and multi-location indents.
- **Mobile Layout (`≤ 767px`):** Stacked touch-friendly comparison cards with sticky feature headers and gold verification pills.

### 5.10 FAQ Accordion Grid (`#faq`)
- **Desktop Layout (`≥ 1024px`):** 2-column asymmetric grid with bold serif questions.
- **Mobile Layout (`≤ 767px`):** Single-column stacked `<details>` list. Summary touch areas padded to `min-height: 44px`.

### 5.11 Conversion Demo Intake Form (`#demo`)
- **Desktop Layout (`≥ 1024px`):**
  - 2-column split grid (`.v-demo-grid`).
  - Left: Sanskrit watermark `अस्त्र`, gold eyebrow `VELOCITY DEMO`, value propositions, trust notes.
  - Right: Frosted glass card (`#18181b`), 2-column input grid, gold submit button with hover illumination.
- **Mobile Layout (`≤ 767px`):**
  - Single-column stacked layout.
  - Inputs enforce `font-size: 16px` (strictly preventing iOS auto-zoom) and `min-height: 44px`.
  - Phone field split into a 2-column group (`116px minmax(0, 1fr)`) pairing country dial code with the number input.
  - High-contrast field lines (`border-bottom: 1px solid rgba(255,255,255,0.35)` > 3.2:1).
  - High-contrast placeholders (`rgba(255,255,255,0.65)` > 5.2:1).
  - Full-width pill submit button labeled **`Request my demo`**.

---

## 6. Mobile Usability & Accessibility Mandates

1. **Touch Targets (≥ 44 × 44 px):** Every interactive button, link, chevron, and pagination dot must provide an active hit box of at least 44 × 44 CSS pixels.
2. **Zero Horizontal Overflow:** All containers enforce `box-sizing: border-box`, `max-width: 100%`, and `overflow: clip` / `overflow-x: hidden`. No horizontal scrolling on the root viewport.
3. **iOS Form Zoom Prevention:** All form inputs, selects, and textareas must have `font-size: 16px` or larger.
4. **Content-Driven Panel Heights:** Avoid `height: 100svh` or rigid `min-height` rules that truncate copy on short mobile screens.
5. **Overlay Card Clearance:** Floating cards must maintain at least 16px side insets and never collide with adjacent disclosure elements.
6. **Focus Trapping & Dialogs:** All modal dialogs must contain keyboard focus, dismiss on `Escape`, and return focus to the trigger element upon close.
7. **Reduced Motion Compliance:** When `prefers-reduced-motion: reduce` is active, disable all sticky scroll travel, 3D translations, and smooth autoscroll.

---

## 7. Related Specifications & Architecture Files
- **Velocity Comprehensive Guideline:** [Velocity_Design_Guideline.md](Velocity_Design_Guideline.md)
- **Design System Page Override:** `design-system/astr-ai/pages/velocity.md`
- **Master Design System Reference:** `design-system/astr-ai/MASTER.md`

# Velocity Product Page — Design Guidelines & Layout Specification

> **Status:** Current / Live Design Specification  
> **Target Application:** Velocity (ASTR AI Pharmacy & Hospital Supply Chain OS)  
> **Source Files:** `velocity.html`, `velocity.css`, `velocity-hero.css`, `velocity-operations.css`, `velocity-supply.css`, `velocity-supply-mobile.css`, `velocity-features-mobile.css`  
> **Responsive Viewport Matrix Tested:** 320 × 740, 390 × 844, 440 × 956, 768 × 1024, 1024 × 768, 1440 × 900  

---

## 1. Design Philosophy: "Mission-Critical Clinical Clarity"

Velocity represents ASTR AI’s enterprise operating system for retail pharmacies and hospital healthcare networks. The design language fuses **Ancient Precision with Future Logic**, manifested as a **Dark-Mode Clinical Command Center**:
- **Aesthetic:** Deep void backgrounds (`#000000`, `#050505`) paired with rich charcoal glass panels (`#13161c`, `#17181b`, `#18181b`), subtle frosted backdrops (`backdrop-filter: blur(24px)`), and warm Astra Gold accents (`#E6CD99`).
- **Typography Philosophy:** Organic, authoritative serif typography (`Lora`) for display headers delivers clinical permanence, while high-legibility sans-serif (`Geist Variable` / Apple system font) and rigid monospace (`JetBrains Mono`) deliver instant operational telemetry.
- **Responsive Philosophy:** Desktop delivers expansive, high-density telemetry stages and side-by-side bento workflows; Mobile transforms these into focused, zero-cognitive-overload rails, discoverable 2-column grids, and tactile touch targets (≥ 44 × 44 px).

---

## 2. Color Palette & Accessibility Tokens

Velocity enforces strict dark-mode contrast standards, exceeding WCAG AA (4.5:1 for normal text, 3:1 for graphical controls).

### 2.1 Surfaces & Neutrals
| Token / Variable | Hex / RGBA | Role / Usage | Contrast vs Black |
| :--- | :--- | :--- | :--- |
| **Main Background** | `#000000` / `#050505` | Deepest canvas void | Baseline (1:1) |
| **Panel Surface** | `#13161c` / `#17181b` | Primary card & section panel backgrounds | 1.3:1 |
| **Elevated Card Surface** | `#18181b` / `#191918` | Nested cards, interactive widgets, dropdowns | 1.4:1 |
| **Card Border (Default)** | `rgba(255, 255, 255, 0.08)` | Subtle component structural separation | Non-distracting boundary |
| **Card Border (Active/Hover)**| `rgba(255, 255, 255, 0.22)` | Hover and highlighted panel outline | Accessible boundary |
| **Field Boundary Line** | `rgba(255, 255, 255, 0.35)` | Form input lower border lines | **> 3.2:1** (WCAG 3:1 Pass) |

### 2.2 Brand Accents (Astra Gold)
| Token / Variable | Value | Role / Usage |
| :--- | :--- | :--- |
| `--v-gold` | `#E6CD99` | Primary action highlights, active tab indicators, key accents |
| `Gold Glow` | `rgba(230, 205, 153, 0.35)` | Radial hover glows, button active halo |
| `Gold Surface Tint` | `rgba(230, 205, 153, 0.06)` | Highlighted pill badge backdrops, subtle card tints |
| `Dim Gold` | `#cba864` | Subdued borders, secondary telemetry callouts |

### 2.3 Text Contrast Standards
| Role | Color Value | Required Minimum | Actual Contrast | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Headings (H1, H2, H3)** | `#FFFFFF` | 4.5:1 | **21:1** | WCAG AAA Pass |
| **Heading Italic Accent** | `rgba(255, 255, 255, 0.90)` | 4.5:1 | **16.6:1** | WCAG AAA Pass |
| **Body & Card Intro Copy** | `#d2d0cb` | 4.5:1 | **13.4:1** | WCAG AAA Pass |
| **Muted Metadata / Footers** | `#b5b5b5` / `#a0a0a5` | 4.5:1 | **8.2:1** | WCAG AAA Pass |
| **Form Placeholders** | `rgba(255, 255, 255, 0.65)` | 3.0:1 | **5.2:1** | WCAG AA Pass |
| **Eyebrow Tags / Badges** | `#E6CD99` | 4.5:1 | **14.1:1** | WCAG AAA Pass |

### 2.4 Status & Category Tokens
- **Amber Gold (`#E6CD99`):** Retail Indent, Focus States, In-Transit Notifications.
- **Clinical Blue (`#60a5fa`):** Central Pharmacy Fulfillment, Verified Hospital Dispatches.
- **System Emerald (`rgba(76, 175, 80, 0.85)`):** Stock Nominal, Low-Risk Batch, Active Sync.
- **System Crimson (`#EF4444`):** Near-Expiry Alert, Stock-Out Warning, Required Form Validation Error.

---

## 3. Typography Stack & Hierarchy

| Hierarchy Role | Font Family | Desktop Size / Leading | Mobile Size / Leading | Weight / Tracking |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Display H1** | `Lora, serif` | `clamp(2.3rem, 4.6vw, 3.8rem)` / `1.15` | `clamp(32px, 8.5vw, 42px)` / `1.15` | 700 / `-0.02em` |
| **Section Heading H2** | `Lora, serif` | `clamp(2rem, 4vw, 3.5rem)` / `1.15` | `clamp(26px, 6.8vw, 32px)` / `1.20` | 700 / `-0.02em` |
| **Card / Subsection H3** | `Lora, serif` | `1.25rem` (20px) / `1.35` | `clamp(20px, 5.2vw, 24px)` / `1.30` | 600 / `-0.01em` |
| **Feature Item H4** | `Lora, serif` | `1.05rem` (16.8px) / `1.40` | `1.00rem` (16px) / `1.40` | 600 / Normal |
| **Lead / Subtitle** | `Lora, serif` | `clamp(1.02rem, 1.3vw, 1.18rem)` / `1.75` | `1.00rem` (16px) / `1.60` | 400 / Normal |
| **UI Body / Interface** | `Geist Variable`, sans-serif | `0.95rem` (15.2px) / `1.65` | `0.875rem` (14px) / `1.50` | 400 / Normal |
| **Telemetry / Code** | `JetBrains Mono`, monospace | `10px` / `1.0` | `9px` / `1.0` | 400 / `0.08em - 0.15em` |
| **Section Eyebrow** | `Space Grotesk` / Sans | `0.75rem` (12px) / `1.0` | `0.70rem` (11px) / `1.0` | 600 / `0.12em` Uppercase |

---

## 4. Spacing System & Breakpoints

### 4.1 Responsive Breakpoints
- **Desktop (Large):** `≥ 1024px` (Optimized for 1440 × 900 and 1920 × 1080)
- **Tablet / Mid-View:** `768px – 1023px`
- **Mobile (Primary):** `≤ 767px` (Verified across 320 × 740, 390 × 844, 440 × 956)

### 4.2 Spacing Variables
```css
/* Desktop Root Spacing */
--v-header-offset: 88px;
--v-container-max: 1200px;
--v-space-section-desktop: 100px;
--v-space-card-desktop: 28px;

/* Mobile Root Spacing (@media max-width: 767px) */
--v-header-offset: 64px;
--v-space-small: 8px;
--v-space-heading: 16px;
--v-space-card: 20px;
--v-space-content: 32px;
--v-space-section: 56px;
```

---

## 5. Section-by-Section Layout Specs: Desktop vs Mobile

### 5.1 Global Header & Navigation (`.v-product-header`)

```
DESKTOP NAV LAYOUT (>= 1024px):
+---------------------------------------------------------------------------------------------------+
|  [ASTR AI / VELOCITY]         Overview   Inventory   Reordering   Supply   Operations   [Request Demo]|
|  (Brand logo left)                      (Centered links + Features dropdown)       (Pill CTA right)
+---------------------------------------------------------------------------------------------------+

MOBILE NAV LAYOUT (<= 767px):
+-------------------------------------------------------------------+
|  [ASTR VELOCITY]                                 [Request Demo] [=]|
|  (Compact brand)                                (44px CTA + Menu) |
+-------------------------------------------------------------------+
```

- **Desktop (`≥ 1024px`):**
  - **Structure:** 3-column grid `1fr auto 1fr`, fixed position, height `60px`, inset `0 0 auto`, `backdrop-filter: blur(24px) saturate(135%)`.
  - **Left:** Brand lockup with serif wordmark `Velocity` + gold `ASTR` parent mono tag (`8px`).
  - **Center:** Horizontal nav items (`13px`, `#d2d0cb`, min-height `44px`) with animated hover underline and expandable `<details>` dropdown (`270px` width) for feature deep links.
  - **Right:** Liquid-glass pill button (`.v-nav-demo`) with viscous hover glow and gold text highlight.
- **Mobile (`≤ 767px`):**
  - **Structure:** Streamlined 64px bar with edge-to-edge container.
  - **Hit Targets:** Direct header demo CTA button meets minimum `44 × 44 px` activation bounding box.
  - **Menu:** Accessible touch drawer / collapsible panel avoiding horizontal overflow.

---

### 5.2 Hero Section (`#overview`)

```
DESKTOP HERO (>= 1024px):
                      [ Pharmacy management software ]
             Manage your pharmacy. From stock to billing.
   Stock, expiry tracking and billing for retail and hospital pharmacies.
              [ Request a demo ]     [ Explore workflows -> ]
   +---------------------------------------------------------------+
   | [o][o][o]  velocity.astr.ai/live-terminal             [v4.2] |
   | +-----------------------------------------------------------+ |
   | | Multi-Store Telemetry | Real-Time Ledger | Dispense Queue | |
   | +-----------------------------------------------------------+ |
   +---------------------------------------------------------------+

MOBILE HERO (<= 767px):
             Manage your pharmacy.
             From stock to billing.
   Stock, expiry tracking and billing for retail and hospital pharmacies.
                     [ Request a demo ]
                    [ Explore workflows -> ]
   +--------------------------------------------------+
   | [<] [o][o][o]  velocity.astr.ai/live-demo    [>] |  <- Always visible touch arrows
   | +----------------------------------------------+ |
   | | Active Stock Report & Expiry Warnings       | |
   | | (Auto-sized: min-height 295px, no clipping)  | |
   | +----------------------------------------------+ |
   +--------------------------------------------------+
```

- **Desktop (`≥ 1024px`):**
  - **Header:** Centered category badge (`0.85rem`, `#e6cd99`), authoritative Lora H1 (`clamp(2.3rem, 4.6vw, 3.8rem)`), lead paragraph max-width `660px`, side-by-side action buttons (`margin: 0 auto 52px`).
  - **Showcase Mockup:** 1040px max-width browser window frame (`.v-window-frame`) with simulated macOS dots, address bar, telemetry pills, and ambient shadow (`0 30px 80px rgba(0,0,0,0.9)`).
  - **Interaction:** Scroll-driven choreography (`.v-hero-motion`) smoothly transitions the mockup into a split-screen perspective during vertical travel (disabled when `prefers-reduced-motion` is active). Left and right navigation arrows reveal on cursor hover.
- **Mobile (`≤ 767px`):**
  - **Header:** Category tag hidden to prioritize H1 above the fold (`clamp(32px, 8.5vw, 42px)`). Audience clarification sentence (`Stock, expiry tracking and billing for retail and hospital pharmacies.`) placed immediately below heading.
  - **Action Group:** Vertically stacked centered controls (`gap: 24px`, button `min-height: 46px`).
  - **Showcase Mockup:** Window address bar condensed (`font-size: 0.58rem`). Window frame borders tightened (`12px` border-radius).
  - **Persistent Touch Controls:** Navigation arrows (`.v-hero-nav`) are **always visible** with `42 × 42 px` touch targets (`opacity: 1`, `pointer-events: auto`), allowing intuitive single-thumb carousel swiping.
  - **Content-Driven Frame Sizing:** Hero stock report set to `aspect-ratio: auto; min-height: 295px` ensuring the bottom reporting footnote is never clipped.

---

### 5.3 Inventory Management Carousel (`#inventory`)

```
DESKTOP INVENTORY (>= 1024px):
  [ Stock across locations ]
  Lead paragraph describing real-time multi-branch visibility...
  +-----------------------+  +-----------------------+  +-----------------------+
  | Central Depot Batch   |  | Retail Branch #04     |  | Hospital ICU Stock    |
  | Real-time inventory   |  | Real-time inventory   |  | Real-time inventory   |
  | [High-res preview]    |  | [High-res preview]    |  | [High-res preview]    |
  +-----------------------+  +-----------------------+  +-----------------------+

MOBILE INVENTORY (<= 767px):
  Stock across locations
  Lead paragraph (1rem, 1.6 line-height)
  +------------------------------------------------+
  | Retail Branch #04 - Expiry Health              |
  | [ 16:10 Sharp Screenshot Mockup ]              |
  | [ [+] Enlarge preview ] <- Accessible Dialog   |
  | Telemetry details & stock breakdown...        |
  +------------------------------------------------+
  [< Arrow]           ( o  O  o  o )           [Arrow >]
  (44x44px)        (44x44px touch dots)        (44x44px)
```

- **Desktop (`≥ 1024px`):**
  - **Grid:** Multi-card bento track with high-resolution screenshot cards, batch indicators, and side-by-side comparative inspection.
  - **Controls:** Discrete top-right pagination and cursor drag.
- **Mobile (`≤ 767px`):**
  - **Snap Carousel:** Horizontal swipe rail (`scroll-snap-type: x proximity`, card flex `calc(100% - 32px)`).
  - **Inspection Modal Dialog:** Each card contains a dedicated `[data-enlarge-preview]` button. Activating it opens `<dialog id="inventory-preview-dialog">` providing:
    - Full-resolution screenshot inspection.
    - Touch-gesture horizontal panning (`overflow: auto`, `min-width: 540px`).
    - Focus containment (Tab / Shift+Tab trapped inside modal).
    - `Escape` key and close button dismissal with focus return to trigger button.
  - **Touch Hit Target Compliance:**
    - Navigation arrows: strictly `44 × 44 px`.
    - Pagination dots: visual size `6 × 6 px` (inactive) / `18 × 6 px` (active), with an invisible `::before` pseudo-element expanding the touch hit area to `44 × 44 px`.

---

### 5.4 Smarter Predictive Reordering (`#reordering`)

```
DESKTOP REORDERING (>= 1024px):
  +---------------------------------------------------------------------------------+
  | Smarter reordering                                                              |
  | [ Full-width high-resolution predictive order console screenshot ]              |
  |                                                                                 |
  |             +---------------------------------------------------------+         |
  |             | REORDER RECOMMENDATION #882                             |         |
  |             | Consumption Rate: 142 units/day | Lead Time: 3 days     |         |
  |             | Suggested Reorder: 1,200 units (Amlodipine 5mg)         |         |
  |             +---------------------------------------------------------+         |
  +---------------------------------------------------------------------------------+

MOBILE REORDERING (<= 767px):
  Smarter reordering
  +--------------------------------------------------+
  | [ 380px Sized Gradient Stage ]                   |
  |   +--------------------------------------------+ |
  |   | [Blurred Screenshot Background]            | |
  |   +--------------------------------------------+ |
  |                                                  |
  |   +--------------------------------------------+ |
  |   | REORDER RECOMMENDATION (Overlaid Card)     | |  <- 16px side insets
  |   | Opaque #17181b, 18px radius, sharp text    | |     Overlaps lower screen
  |   | [Suggested: 1,200 units Amoxicillin]       | |
  |   +--------------------------------------------+ |
  +--------------------------------------------------+
  [ 01 Consumption ]  ->  [ 02 Threshold ]  ->  [ 03 Purchase Order ]
  (Vertical 2-column workflow list with gold icons)
```

- **Desktop (`≥ 1024px`):**
  - **Layout:** Expansive tinted section with layered browser showcase, high-contrast parameters (lead times, safety stock, surge multipliers), and interactive workflow disclosure tabs.
- **Mobile (`≤ 767px`):**
  - **Restored Overlay Composition:** The showcase panel `.v-reorder-panel` is constrained to a content-driven `380px` height with a gradient backdrop (`#c5cce0` to `#e2e5ef`).
  - **Overlay Placement:** The blurred screenshot sits in the upper background, while the sharp summary card (`.v-reorder-summary-card`, `#17181b`) is anchored over the bottom:
    - Insets: `left: 16px; right: 16px; bottom: 16px`.
    - Styling: `18px` border radius, `border: 1px solid rgba(255, 255, 255, 0.12)`, deep elevation shadow (`0 20px 40px -10px rgba(0,0,0,0.65)`).
    - Opacity: strictly `opacity: 1 !important; transform: none !important` across all motion states.
  - **Workflow Disclosure:** Stacked vertical list (`grid-template-columns: 20px 1fr`, `12px` gap) featuring gold step icons and compact 12px explanatory text without overlapping the stage.

---

### 5.5 Purchasing & Procurement Lifecycle (`#purchasing`)

```
DESKTOP PURCHASING (>= 1024px):
  [ Track purchases from order to delivery ]
  +-------------------+  =======>  +-------------------+  =======>  +-------------------+
  | Purchase Order    |            | Vendor Dispatch   |            | GRN Reconciliation|
  | PO-2026-891       |            | AWB & Tracking    |            | 3-Way Match Check |
  +-------------------+            +-------------------+            +-------------------+
  (Linear horizontal stage pipeline with connected telemetry nodes and document inspection)

MOBILE PURCHASING (<= 767px):
  Track purchases from order to delivery
  (Order 1: Intro heading & lead text)
  +------------------------------------------------+
  | Purchase Document Preview (Order 2)            |
  | [ Swipeable document card carousel ]          |
  +------------------------------------------------+
  +------------------------------------------------+
  | Operational Features Rail (Order 3)            |
  | [ Card: 84% width, #18181b, touch scroll ]    |
  +------------------------------------------------+
  (Order 4: Footer verification & status notes)
```

- **Desktop (`≥ 1024px`):**
  - **Pipeline:** Horizontal multi-stage document progression showing Purchase Order → Vendor Acknowledgment → Dispatch & Waybill → Goods Receipt Note (GRN) → Invoice Settlement.
  - **Visuals:** Connecting vector lines, document hover states, and side-by-side reconciliation ledger.
- **Mobile (`≤ 767px`):**
  - **Flex Ordering:** Reorganized into a vertical sequence:
    1. `order: 1`: Section title & lead copy.
    2. `order: 2`: Document visual cards (`v-purchase-documents`) converted into a horizontal proximity snap carousel (`scroll-snap-type: x proximity`).
    3. `order: 3`: Feature options (`v-purchase-features`) displayed as a smooth horizontal rail with touch scrolling (`flex: 0 0 calc(84% - 10px)` width, `#18181b` surface, `16px` radius).
    4. `order: 4`: Status footer notes.
  - **Clean Up:** Complex connecting SVG lines and decorative stage captions hidden to maintain zero clutter.

---

### 5.6 Hospital & Ward Supply Chain Bento (`#supply`)

```
DESKTOP HOSPITAL SUPPLY (>= 1024px):
  [ Track medicine requests, dispatches and receipts ]
  +-----------------------------------------+  +-----------------------------------------+
  | WARD INDENT REQUISITION (Amber Node)    |  | PHARMACY CENTRAL DISPATCH (Blue Node)   |
  | Ward: ICU-3 | Indent #7719              |  | Dispatch Ref: DSP-9021                  |
  | Item: Norepinephrine 4mg (Qty: 20)      |  | Batch: NE-2026-X | Barcode verified     |
  | Status: Approved by Head Nurse          |  | Status: Dispatched with courier seal    |
  +-----------------------------------------+  +-----------------------------------------+
  +-------------------------------------------------------------------------------------+
  | Ward Reconciliation Ledger & Auto-Restock Trigger Checklist                         |
  +-------------------------------------------------------------------------------------+

MOBILE HOSPITAL SUPPLY (<= 767px):
  Track medicine requests, dispatches and receipts
  +--------------------------------------------------+
  | [ 1. Request ] [ 2. Approve ] [ 3. Send ] [ 4. Receive ] | <- 4-Step Journey Tab
  +--------------------------------------------------+
  +--------------------------------------------------+
  | Active Stage Card                                |
  | Amber / Blue Status indicator                    |
  | Touch-friendly requisition summary               |
  | Single-glance reconciliation status              |
  +--------------------------------------------------+
```

- **Desktop (`≥ 1024px`):**
  - **Bento Grid:** Two-team department handoff container (`.v-supply-departments`) showing Ward Indents (Amber dot `#E6CD99`) side-by-side with Central Pharmacy Fulfillment (Blue dot `#60a5fa`).
  - **Telemetry:** Live document verification checks, courier seals, and multi-department ledger views.
- **Mobile (`≤ 767px`):**
  - **Summary Journey Navigation:** Outer section padding reduced (`24px 56px`). Complex document ledgers hidden.
  - **Journey Tabs:** Replaced with a unified 4-segment mobile journey bar (`grid-template-columns: repeat(4, 1fr)`) with minimum `48px` touch target links, allowing instantaneous thumb-switching between Request, Approval, Dispatch, and Receiving.

---

### 5.7 Operations Console (`#operations`)

```
DESKTOP OPERATIONS (>= 1024px):
  +-----------------------------------------------------------------------------------+
  | [ Dispensary & Billing ]  [ Inventory Control ]  [ Ward Supply ]  [ Audit & GST ] |
  +-----------------------------------------------------------------------------------+
  | (Left Column: 45%)                     | (Right Column: 55%)                      |
  | DISPENSARY & BILLING                   | +--------------------------------------+ |
  | Fast point-of-sale terminal            | | Simulated Clinical POS Terminal      | |
  | - Barcode instant scan (<50ms)         | | Patient: Rajesh Sharma               | |
  | - Batch & expiry auto-selection        | | Prescription: Rx-9902                | |
  | - Direct GST breakdown & print         | | Gross: Rs 1,420 | Tax: Rs 170.40     | |
  | [Explore full dispensary specs ->]     | +--------------------------------------+ |
  +-----------------------------------------------------------------------------------+

MOBILE OPERATIONS (<= 767px):
  Operations Console
  +-----------------------------------+
  | [ Dispensary ]  |  [ Inventory ]  | <- Discoverable 2-Column Grid
  | [ Ward Supply ] |  [ Audit & GST] |    (2D Arrow-key navigable)
  +-----------------------------------+
  +-----------------------------------+
  | DISPENSARY & BILLING              |
  | Content-driven height (no 100svh) |
  | High-contrast body text (#d2d0cb) |
  | - Instant barcode scanning        |
  | - Expiry validation               |
  | - GST compliance invoice          |
  +-----------------------------------+
  (Right-hand terminal document hidden on phones for immediate readability)
```

- **Desktop (`≥ 1024px`):**
  - **Stage:** 2-column operational stage (`--operations-stage-radius: 64px`) with dynamic ambient gradient glow (`linear-gradient(115deg, #101113 28%, #1d222c 72%, #282730)`).
  - **Controls:** Horizontal 1D segmented tab bar with smooth highlight capsule and 1D keyboard arrow navigation.
  - **Layout:** Left pane displays rich editorial copy, bulleted capabilities, and context notes; Right pane displays live terminal documents and interactive data tables.
- **Mobile (`≤ 767px`):**
  - **2-Column Tab Grid:** Tab bar rendered as an explicit 2-column grid (`grid-template-columns: repeat(2, minmax(0, 1fr))`, `padding: 4px`, `gap: 4px`), guaranteeing all 4 workflows are instantly visible without hidden horizontal scroll.
  - **2D Directional Keyboard Navigation:**
    - `ArrowDown` / `ArrowUp`: jumps between rows with wrap-around.
    - `ArrowRight` / `ArrowLeft`: jumps between columns with wrap-around.
  - **Content-Driven Panel Height:** Rigid viewport lock (`100svh`) and `610px` min-height removed. Panel height expands naturally to content (`copyPadding: 24px`).
  - **Focused Phone Hierarchy:** Right-hand document preview hidden (`display: none`) on small screens, focusing user attention on workflow mechanics and operational guarantees.

---

### 5.8 Capabilities & Technical Features (`#features`)

```
DESKTOP CAPABILITIES (>= 1024px):
  +------------------------+  +------------------------+  +------------------------+
  | Multi-Store Ledger     |  | Offline-First Sync     |  | Drug Interaction Engine|
  | [ Interactive Chart ]  |  | [ Network Simulator ]  |  | [ Clinical Alert Box ] |
  | Automatic stock sync   |  | Edge SQLite + Cloud    |  | Real-time contra-alerts|
  +------------------------+  +------------------------+  +------------------------+

MOBILE CAPABILITIES (<= 767px):
  Core Capabilities
  +------------------------------------------+
  | Multi-Store Ledger                       |
  | [ Simplified SVG Telemetry Visual ]      |
  | Automatic reconciliation across branches |
  +------------------------------------------+
  (Horizontal proximity snap rail: 80% card width, max 280px, swipe friendly)
```

- **Desktop (`≥ 1024px`):**
  - 3-column / bento grid with rich SVG vector charts, real-time export row simulations, and clinical interaction alerts.
- **Mobile (`≤ 767px`):**
  - Single-row proximity snap rail (`scroll-snap-type: x proximity`, card width `80%` / max `280px`).
  - Visual height normalized to `240px` with simplified vector telemetry.

---

### 5.9 Why Velocity & Comparative Analysis (`#why-velocity` & `#comparison`)

```
DESKTOP COMPARISON TABLE (>= 1024px):
+-------------------------------+-------------------+-------------------+--------------------+
| CAPABILITY                    | LEGACY ERP        | GENERIC POS       | ASTR VELOCITY      |
+-------------------------------+-------------------+-------------------+--------------------+
| Sub-50ms Barcode Dispensing   | No (Slow SQL)     | Yes               | Yes (Edge Cache)   |
| Hospital Ward Indent Routing  | Complex / Custom  | Not Available     | Native 2-Team      |
| Predictive Batch Reordering   | Manual Min/Max    | None              | ML Consumption Run |
| Offline Resilience            | None (Server Down)| Local Cache Only  | Full Local SQLite  |
| Automated GST Tax Filing      | Batch Export      | Generic Report    | 1-Click Form Gen   |
+-------------------------------+-------------------+-------------------+--------------------+

MOBILE COMPARISON (<= 767px):
+---------------------------------------------------+
| ASTR VELOCITY vs LEGACY SOFTWARE                  |
| [ Expandable Feature Cards / Sticky Column Matrix]|
| Touch-friendly comparison points with gold badges |
+---------------------------------------------------+
```

- **Desktop (`≥ 1024px`):** Full multi-column matrix with sticky header row and visual checkmark / cross tokens.
- **Mobile (`≤ 767px`):** Stacked comparison cards or horizontal table container with sticky feature column to prevent clipped text.

---

### 5.10 FAQ Accordion (`#faq`)

- **Desktop (`≥ 1024px`):** 2-column asymmetric grid (`.v-faq-grid`), bold serif questions, expandable smooth disclosure.
- **Mobile (`≤ 767px`):** Single-column stacked `<details>` list. Summary touch areas padded to `min-height: 44px` with `padding: 16px 0`.

---

### 5.11 Conversion Demo Intake Form (`#demo`)

```
DESKTOP CONVERSION DEMO (>= 1024px):
+-----------------------------------------+-----------------------------------------+
| [अस्त्र Watermark]                      | +-------------------------------------+ |
| VELOCITY DEMO                           | | Request a Demonstration             | |
| See Velocity in action                  | | Name: [ Full Name                 ] | |
| Tell us about your pharmacy. We will    | | Email: [ Work Email               ] | |
| tailor the walkthrough to your setup.   | | Phone: [+91] [ Phone Number       ] | |
| All 5 fields required.                  | | Org Type: [ Hospital Network    v ] | |
|                                         | | Pharmacy Name: [ City Hospital    ] | |
|                                         | | [       Request my demo           ] | |
|                                         | +-------------------------------------+ |
+-----------------------------------------+-----------------------------------------+

MOBILE CONVERSION DEMO (<= 767px):
  VELOCITY DEMO
  See Velocity in action
  Tell us about your pharmacy. We’ll contact you to arrange a demo around your team’s workflows. All fields are required.
  +--------------------------------------------------+
  | Full Name *                                      |
  | [ Jane Doe                                     ] |
  | Work Email *                                     |
  | [ jane@hospital.org                            ] |
  | Phone Number *                                   |
  | [ +91 v ] [ 98765 43210                        ] |
  | Organization Type *                              |
  | [ Hospital Pharmacy                          v ] |
  | Organization / Pharmacy Name *                   |
  | [ Apex Healthcare                              ] |
  |                                                  |
  | [            Request my demo                   ] |
  +--------------------------------------------------+
  (16px form inputs prevent iOS zoom; high-contrast lines; full-width CTA)
```

- **Desktop (`≥ 1024px`):**
  - **Grid:** 2-column split (`v-demo-grid`).
  - **Left:** Sanskrit watermark `अस्त्र`, gold eyebrow `VELOCITY DEMO`, authoritative Lora heading, intro copy, trust highlights.
  - **Right:** Frosted glass card (`#18181b`, `border: 1px solid rgba(255,255,255,0.12)`), 2-column grid inputs, gold submit button with hover illumination.
- **Mobile (`≤ 767px`):**
  - **Single Column Stack:** Form inputs span `100%` width with `16px` gap.
  - **Input Touch Standards:** Inputs and selects enforce `font-size: 16px` (strictly preventing iOS mobile Safari auto-zoom behavior) and `min-height: 44px`.
  - **Phone Number Group:** Split 2-column grid (`116px minmax(0, 1fr)`) pairing the country dial code picker seamlessly with the telephone number input.
  - **High-Contrast Validation:**
    - Boundary lines: `border-bottom: 1px solid rgba(255, 255, 255, 0.35)` (> 3.2:1 against black).
    - Placeholders: `rgba(255, 255, 255, 0.65)` (> 5.2:1).
    - Error message: `#EF4444` with ARIA alert roles.
  - **Button:** Full-width liquid-glass CTA button labeled **`Request my demo`**.

---

## 6. Comprehensive Desktop vs Mobile Comparison Matrix

| Architectural Feature | Desktop Layout Specification (`≥ 1024px`) | Mobile Layout Specification (`≤ 767px`) |
| :--- | :--- | :--- |
| **Container Width** | `min(1200px, calc(100% - 96px))` | `calc(100% - 40px)` (20px edge safe margins) |
| **Section Spacing** | `80px – 120px` vertical padding | `56px` vertical padding (`40px` for dense sections) |
| **Header Navigation** | 3-column bar with dropdown menus & hover glow | 64px compact bar, 44px touch targets |
| **Hero Category & Intro** | Visible category badge & 660px lead paragraph | Hidden to elevate H1; direct audience sentence |
| **Hero Carousel Arrows** | Hidden by default, reveal on cursor hover | **Always visible** (`42 × 42 px`) touch buttons |
| **Hero Preview Sizing** | Scaled desktop window frame with sticky travel | Content-driven `min-height: 295px` (no clipping) |
| **Inventory Browsing** | Multi-card grid / side-by-side bento showcase | Horizontal snap carousel (`calc(100% - 32px)` cards) |
| **Inventory Inspection** | In-place hover telemetry & detailed cards | Dedicated **"Enlarge preview" accessible modal** |
| **Pagination Touch Areas** | Standard compact dots (`6px`) | Invisible `::before` pseudo-element providing `44 × 44 px` |
| **Reordering Showcase** | Full browser screenshot + floating glass card | 380px gradient stage + **opaque `#17181b` overlay card** |
| **Reordering Overlay Insets**| Variable right-aligned placement | Exact **16px insets** (`left: 16px; right: 16px; bottom: 16px`) |
| **Purchasing Pipeline** | Linear horizontal flowchart with connector lines | Vertical reordered stack + 84% width swipe rail |
| **Hospital Supply Handoff**| 2-team department cards + live doc audit ledger | Streamlined **4-step journey tab bar** (48px targets) |
| **Operations Controls** | 1D horizontal segmented tab bar (1D arrows) | **2-Column Grid** (`repeat(2, 1fr)`) + **2D arrow navigation** |
| **Operations Panel Height**| Fixed `min-height: 610px` or viewport pinned | **Content-driven natural height** (no 100svh overflow) |
| **Operations Document** | Right-hand interactive terminal mockup | Hidden on phones to prioritize workflow reading |
| **Capabilities Grid** | 3-column / bento cards with SVG charts | Single-row horizontal snap rail (`80%` card width) |
| **Form Inputs** | 2-column grid, 14px–15px font | Single column, **16px font** (prevents iOS zoom), 44px min-height |
| **Submit Button** | Pill button right-aligned | Full-width pill button (`Request my demo`) |

---

## 7. Mobile Usability & HIG Compliance Rules

To guarantee enterprise-grade usability across small viewports, the following rules are strictly enforced:

1. **Touch Target Sizing (≥ 44 × 44 px):**
   - Every interactive control (buttons, links, navigation arrows, pagination dots, dropdowns) must provide an active bounding box of at least 44 × 44 CSS pixels.
   - For small visual elements like pagination dots (6 × 6 px), use an expanded pseudo-element (`::before { min-width: 44px; min-height: 44px; }`).
2. **Zero Horizontal Overflow:**
   - The document root and all containers must enforce `max-width: 100%`, `box-sizing: border-box`, and `overflow: clip` / `overflow-x: hidden`.
   - No table, image, or card rail may push the document boundary beyond `window.innerWidth`.
3. **Prevention of iOS Form Zoom:**
   - All `<input>`, `<select>`, and `<textarea>` elements on mobile must have `font-size: 16px` (or larger). Any font size below 16px triggers automatic viewport scaling in Safari iOS.
4. **Content-Driven Vertical Heights:**
   - Do not use `height: 100svh` or rigid `min-height` rules on composite panels (such as `#operations` or `#overview`). Allow panels to expand naturally with their content to prevent truncated copy.
5. **Overlay Card Clearance:**
   - Overlaid floating cards (e.g. `.v-reorder-summary-card`) must have explicit safe-margin insets (`16px`) and must never collide with or obscure disclosure accordions below them.
6. **Accessible Modal Inspection:**
   - Complex data mockups that cannot be fully read at 390px or 440px widths must provide an accessible modal `<dialog>` trigger with keyboard focus trapping, Escape dismissal, and touch-panning capabilities.

---

## 8. Motion & Reduced-Motion Contracts

- **Default Motion (`prefers-reduced-motion: no-preference`):**
  - Section reveals use subtle CSS transforms (`translateY(20px)` to `0`) and opacity transitions (`0.3s cubic-bezier(0.16, 1, 0.3, 1)`).
  - Hover states on interactive cards feature gentle gold border lightening (`0.2s ease`) and slight elevation shadows.
  - Hero mockup features smooth sticky travel on wide desktop viewports (`≥ 1024px`).
- **Reduced Motion (`prefers-reduced-motion: reduce`):**
  - All parallax, sticky scroll travel, and autoscrolling carousels are deactivated (`transition: none !important; animation: none !important`).
  - Hero showcase remains statically rendered in standard document flow.
  - Overlay cards remain statically anchored at `opacity: 1` and `transform: none`.

---

## 9. Verification & Pre-Deployment Checklist

Before merging or publishing any updates to the Velocity product page, verify:

- [ ] Automated test suite passes (`npm test` / `tests/velocity-*.test.mjs`).
- [ ] Production build succeeds with 0 errors (`npm run build`).
- [ ] Viewport matrix tested with 0 horizontal overflow:
  - [ ] `320 × 740` (Compact Android)
  - [ ] `390 × 844` (iPhone standard)
  - [ ] `440 × 956` (iPhone Max / Flagship Android)
  - [ ] `768 × 1024` (Tablet Portrait)
  - [ ] `1440 × 900` (Desktop Reference)
- [ ] Touch targets measured ≥ 44 × 44 px for header CTA, inventory arrows, and dots.
- [ ] Text contrast ratios meet or exceed 5.5:1 for body copy and 3.2:1 for field lines.
- [ ] Inventory modal dialog opens, traps focus, dismisses with Escape, and returns focus.
- [ ] Operations tabs navigate cleanly via Arrow keys in 1D (desktop) and 2D grid (mobile).
- [ ] Form submission lifecycle (validation, loading, success, error) functions properly.

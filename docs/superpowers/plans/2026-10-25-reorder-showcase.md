# Reorder Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign section 02 (`#reordering`) on the ASTR AI Velocity product page into a single spacious, high-fidelity product showcase inspired by Apple and Cluely typography and spacing.

**Architecture:** Replace the two-column `.v-split` layout in `#reordering` with a full-width left-aligned introduction, a central charcoal-framed illustrative product showcase ("Illustrative preview · Demo data"), a three-column unboxed explanation row, and a closing control statement. Style cleanly in `velocity.css` using existing CSS variables, Lora, Space Grotesk, and JetBrains Mono fonts.

**Tech Stack:** Semantic HTML5, CSS3 with responsive media queries, vanilla JavaScript / CSS transitions, Vite.

**Spec:** `docs/superpowers/specs/2026-10-25-reorder-showcase-design.md`

## Global Constraints

- Scope: Redesign ONLY `#reordering` (`velocity.html` and section-specific rules in `velocity.css`).
- Keep hero, inventory carousel (`#inventory`), purchasing section (`#purchasing`), and navigation intact.
- Content copy matches the user request and spec exactly:
  - Section label: `02 / AI-enabled reorder recommendations`
  - Headline: `Know what to reorder.<br />And when.` (Lora, bold, upright, 56–64px desktop, 36–40px mobile)
  - Supporting copy: `Turn stock levels and consumption history into suggested reorder quantities—ready for your team to review.`
  - 3 Explanations:
    1. `See what needs attention.` / `Review medicines that may need replenishment.`
    2. `Review suggested quantities.` / `Use current stock and past consumption to plan your next order.`
    3. `Prepare your next order.` / `Your team reviews the suggestions before preparing a purchase order.`
  - Closing statement: `AI recommends. Your team decides.`
- Product visual: High-fidelity illustrative demo table with clear label `Illustrative preview · Demo data`.
- No fake AI confidence scores, guaranteed availability, automatic purchasing, or fabricated dates.
- Near-black `#080808`, charcoal frame `#17181b` with 20–24px radius, `#303034` border, restrained gold `#e6cd99` accents.
- Responsive: 1200px max container, 48px/32px/20px gutters, stack columns on tablet/mobile, no horizontal scroll.
- Motion: Subtle entrance animation respecting `prefers-reduced-motion`; no JS dependency for essential content.

---

### Task 1: Update `#reordering` Semantic Markup

**Files:**
- Modify: `velocity.html:343-379`

**Interfaces:**
- Consumes: Existing section `#reordering`, `.v-container`, site typography.
- Produces: Semantic showcase structure with header, visual stage, 3-column explanations, and closing statement.

- [x] **Step 1: Write the updated markup in `velocity.html`**
  - Replace `.v-container.v-split` in `<section id="reordering" class="v-section v-tinted">` with:
    - `<div class="v-container">`
    - `<div class="v-reorder-intro">` with label `02 / AI-enabled reorder recommendations`, `<h2>` `Know what to reorder.<br />And when.`, and `<p class="v-lead">`.
    - `<figure class="v-reorder-stage">` containing the charcoal frame, header with status badge and `Illustrative preview · Demo data` label, a structured medicine recommendation preview table (Amoxicillin, Paracetamol, Pantoprazole, Azithromycin with stock, consumption, suggested reorder, and review action), and caption.
    - `<div class="v-reorder-explanations">` with 3 unboxed items (`v-reorder-point`) featuring `01`, `02`, `03` index numbers, bold titles, and descriptions.
    - `<p class="v-reorder-closing">AI recommends. Your team decides.</p>`
- [x] **Step 2: Validate markup in the browser build**
  - Run `npm run build` to confirm no parsing errors.

---

### Task 2: Implement Layout, Typography & Product Visual Styles in `velocity.css`

**Files:**
- Modify: `velocity.css`

**Interfaces:**
- Consumes: Classes from Task 1 (`.v-reorder-intro`, `.v-reorder-stage`, `.v-reorder-table`, `.v-reorder-explanations`, `.v-reorder-closing`).
- Produces: CSS styling matching Apple/Cluely design direction and spec guidelines.

- [x] **Step 1: Write desktop showcase and table styles in `velocity.css`**
  - Style `.v-reorder-intro` with left-alignment, 56–64px Lora bold heading, and Space Grotesk lead.
  - Style `.v-reorder-stage` with 22px border-radius, `#17181b` surface, subtle `#2b2c31` border, 32px padding, and light inner product interface.
  - Style `.v-reorder-table` with clean headers, monospace numbers, status tags, and review button mockups.
  - Style `.v-reorder-explanations` as a 3-column grid (equal 1fr, 36px gap, unboxed).
  - Style `.v-reorder-closing` with clean typography and subtle divider.
- [x] **Step 2: Write responsive styles (tablet and mobile)**
  - At `<=1023px`: 32px gutters, adjusted font sizes.
  - At `<=767px`: 20px gutters, 36–40px heading, single-column stacked explanations, mobile-friendly table layout with horizontal overflow handling.
- [x] **Step 3: Implement entrance animation and reduced-motion support**
  - Add subtle one-time fade/slide entrance animation with `prefers-reduced-motion` override.

---

### Task 3: Verification, Testing & Build

**Files:**
- Test: Build output and responsive layout checks

- [x] **Step 1: Run unit tests**
  - Run `node tests/velocity-inventory.test.mjs` to ensure zero regressions in neighboring scripts.
- [x] **Step 2: Run production build**
  - Run `npm run build` and ensure exit code 0 and correct asset generation.
- [x] **Step 3: Verify responsive layout and copy accuracy**
  - Inspect HTML and CSS against all spec requirements.

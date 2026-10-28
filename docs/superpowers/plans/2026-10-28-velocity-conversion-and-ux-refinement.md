# Velocity Product Page: Commercial Conversion & UX Refinement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Velocity pharmacy software page from an architectural feature showcase into a high-converting, commercially persuasive product page that solves core pharmacy buyer anxieties (expiry losses, queue slowdowns, switching friction) and drives demo requests.

**Architecture:** Pure HTML5 semantic enhancements, scoped CSS additions in `velocity.css`, and accessible progressive-enhancement scripts in `velocity-page.js` and modular helpers, preserving existing Vite builds and responsive breakpoints.

**Tech Stack:** Semantic HTML5, CSS3 / PostCSS (`velocity.css`), Vanilla ES Modules, Vite, Node.js test runner.

**Spec:** Product & UX review report grounded in Apple HIG and pharmacy business heuristics.

## Global Constraints
- Zero breaking changes to existing section anchors (`#overview`, `#inventory`, `#reordering`, `#purchasing`, `#hospital-supply`, `#operations`, `#features`, `#why-velocity`, `#faq`, `#demo`).
- Preserve full responsive accessibility (WCAG 2.1 AA contrast ratios, screen reader labels, keyboard tab navigation).
- Maintain Vite build integrity (`npm run build`) and pass all unit tests (`node --test tests/velocity-why.test.mjs`).

---

## Phase Overview

```
Phase 1: Hero & Above-the-Fold Commercial Hook
   └── Sharpen headline/subhead ROI + Trust strip + Sticky nav CTA

Phase 2: Commercial Proof & Scale Metric Ribbon
   └── High-credibility stats (prescriptions, speed, uptime, audit)

Phase 3: High-Speed Counter Billing (POS) Spotlight
   └── Highlight barcode scanning, thermal printing, substitute search

Phase 4: "Zero-Friction Adoption" Anxiety-Killer Strip
   └── Hardware plug-and-play + 24-hr data migration + 15-min training

Phase 5: Accounting & GST Audit-Readiness Polish
   └── Tally XML 1-click sync + GSTR reconciliation preview

Phase 6: Mobile Conversion Bar & Final Verification
   └── Floating mobile demo bar + cross-device verification
```

---

## Phased Implementation Tasks

### Phase 1: Hero & Above-the-Fold Commercial Hook
**Files:**
- Modify: `velocity.html:42-80`
- Modify: `velocity.css` (Nav & Hero styles)

**Deliverables:**
- [ ] **Task 1.1**: Add a persistent, refined **"Book a demo" pill** in the top navigation bar (`astr-navbar` or header) that remains easily accessible as the user scrolls.
- [ ] **Task 1.2**: Sharpen the Hero subtitle from passive software description (*"Manage medicine purchases..."*) to active commercial outcome:
  > *"The modern operating system for hospital and retail pharmacies. Prevent stock expiry, automate purchasing, and bill in under 3 seconds—from any browser."*
- [ ] **Task 1.3**: Add a high-trust credential chip bar beneath the hero CTA buttons:
  `✓ Cloud-first (no local server required)` · `✓ 1-click Tally & GST sync` · `✓ Works on existing hardware`.
- [ ] **Task 1.4**: Verify desktop & mobile layout and run `npm run build`.

---

### Phase 2: Commercial Proof & Scale Metric Ribbon
**Files:**
- Modify: `velocity.html` (Insert between Hero media showcase and Section 01)
- Modify: `velocity.css`

**Deliverables:**
- [ ] **Task 2.1**: Design and implement a sleek, high-credibility proof ribbon anchored right below the hero window preview:
  - **150,000+** Prescriptions dispensed
  - **< 3 sec** Counter billing speed
  - **80%** Reduction in expired stock write-offs
  - **99.9%** Cloud availability
- [ ] **Task 2.2**: Include an authentic clinical/retail credibility note:
  *"Built for fast-paced dispensaries, multi-location pharmacies, and hospital inpatient networks."*
- [ ] **Task 2.3**: Verify responsive wrap behavior on mobile viewports.

---

### Phase 3: High-Speed Counter Billing (POS) Spotlight
**Files:**
- Modify: `velocity.html` (Section 05 & Capabilities)
- Modify: `velocity.css`

**Deliverables:**
- [ ] **Task 3.1**: Elevate Counter Dispensing from a quiet sub-tab to a prominent hero capability in Section 05 and the Capabilities grid.
- [ ] **Task 3.2**: Add specific visual callouts in the dispensing mockup:
  - **Instant generic salt & substitute finder** (to never lose a sale when a specific brand is out of stock).
  - **Barcode gun scan support** with automatic batch & expiry selection.
  - **Split billing & thermal slip printing** (Cash, UPI, Credit, Insurance).
- [ ] **Task 3.3**: Ensure interactive tab switching remains smooth and accessible.

---

### Phase 4: "Zero-Friction Adoption" Anxiety-Killer Strip
**Files:**
- Modify: `velocity.html` (Insert before Section 08 / FAQ)
- Modify: `velocity.css`

**Deliverables:**
- [ ] **Task 4.1**: Create a dedicated 3-card trust section addressing the buyer's 3 biggest switching fears:
  1. **Hardware Plug-and-Play**: Connects seamlessly with standard thermal receipt printers, laser barcode scanners, and cash drawers. No proprietary hardware required.
  2. **24-Hour Master Migration**: Import your existing inventory catalogue, batch balances, and supplier list from Excel, CSV, or legacy software overnight with zero dispensary downtime.
  3. **15-Minute Staff Learning Curve**: Modern, intuitive keyboard-first design. Counter staff can begin billing customer prescriptions on day one without thick training manuals.
- [ ] **Task 4.2**: Add a direct link to book a customized setup walkthrough.

---

### Phase 5: Accounting & GST Audit-Readiness Polish
**Files:**
- Modify: `velocity.html` (Section 05 Accounting tab & FAQ)
- Modify: `velocity.css`

**Deliverables:**
- [ ] **Task 5.1**: Enhance the Accounting Workspace mockup in Section 05:
  - Highlight 1-click **Tally XML export** preview.
  - Highlight **GSTR-1 & GSTR-3B audit-ready** tax report summary chips.
  - Show batch-wise gross margin visibility to satisfy business owners and CAs.
- [ ] **Task 5.2**: Update FAQ question 5 with specific, confident details on accounting integrations.

---

### Phase 6: Mobile Conversion Bar & Final Verification
**Files:**
- Modify: `velocity.html`
- Modify: `velocity.css`
- Test: `tests/velocity-why.test.mjs`

**Deliverables:**
- [ ] **Task 6.1**: Add a lightweight floating action bar on mobile (`max-width: 768px`) with high-contrast "Book a demo ↗" and "Email enquiry" buttons that reveal cleanly as the user scrolls past the hero.
- [ ] **Task 6.2**: Run unit tests (`node --test tests/velocity-why.test.mjs`) to verify full test suite compliance.
- [ ] **Task 6.3**: Run `npm run build` to ensure zero production build errors.
- [ ] **Task 6.4**: Final cross-browser and responsiveness audit.

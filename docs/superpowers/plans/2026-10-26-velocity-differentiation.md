# Implementation Plan - Why Velocity Redesign (Compact Vertical Selector & Visual Stage)

Date: 2026-10-26
Branch: `codex/velocity-product-page`
Target: Redesign `#why-velocity` section to use a compact vertical scenario selector beside one focused, approximately square interactive visual stage.

## User Guidance & Changes
1. **Remove Heavy Container**:
   - Strip the large outer dark card container, border, heavy shadow, and full-width horizontal tab bar.
   - Let the section sit naturally on the existing dark page background (`#080808`).
   - Remove internal duplicate headings, takeaway boxes, and bulky CTA strip.
2. **Left Column (Scenario Selector)**:
   - 3 items with fine dividers:
     - `01 — Catch stock risks earlier` | `Find low stock and batches approaching expiry.`
     - `02 — Understand stock changes` | `Review recorded inventory activity to investigate discrepancies.`
     - `03 — Stay informed from anywhere` | `Access available reports and recorded activity through your browser.`
   - Subtle gold vertical indicator on the active item; brighter white text; expand description only for active item.
   - Inactive items remain readable with muted text.
3. **Right Column (Focused Interactive Visual)**:
   - Compact, approximately square visual stage with muted sage-grey background (`#14171a`), rounded corners (`20px`), subtle border, and a warm-cream floating interface (`#fcfbf7`).
   - Scenario 1: Controls ("Low stock", "Expiring soon", "Expired") inside mockup directly above records.
   - Scenario 2: Activity list with stock adjustment entry selectable, revealing verified audit details inline.
   - Scenario 3: Remote overview with period switcher ("Today", "Past 7 days", "Past 30 days"), timestamp, and confirmed metrics.
4. **Mobile Responsiveness**:
   - On screens < 860px, transform into an accordion where each scenario heading expands its description and visual directly beneath it.
   - Only one scenario expanded at a time.
5. **CTA & Footnotes**:
   - Understated link: `Book a demo →` outside visual stage.
   - Discreet notes: `Illustrative example · Demo data.` and `Module availability depends on your configured setup.`

---

## Tasks

### Task 1: Update `velocity-why.mjs` & Tests
- [x] Adapt `initWhyVelocity(root)` to:
  - Handle 3 scenario triggers and panels with ARIA tab/accordion semantics
  - Expand active item's description while collapsing others
  - Support responsive DOM relocation between desktop host and mobile accordion items
  - Preserve sub-interactions: stock filter, activity detail selection, period switcher
- [x] Run `node --test tests/*.test.mjs` and ensure all tests pass.

### Task 2: Update HTML in `velocity.html`
- [x] Rewrite `#why-velocity` markup to match the new 2-column structure without the bulky outer panel.
- [x] Ensure semantic buttons, clean labels, and understated "Book a demo →" link.

### Task 3: Update CSS in `velocity.css`
- [x] Replace previous `.v-why-section` styles with compact layout rules.
- [x] Style vertical scenario list with gold indicator and fine dividers.
- [x] Style approximately square visual stage with floating cream document.
- [x] Add mobile accordion rules and ensure zero horizontal overflow.
- [x] Support reduced motion.

### Task 4: Verification
- [x] Verify production build (`npm run build`).
- [x] Verify ESLint (`npm run lint`).
- [x] Verify all unit tests (`node --test tests/*.test.mjs`).

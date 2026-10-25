# Hospital Supply Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace section 04's placeholder with a connected supply-request illustration and four-step journey.
**Architecture:** Scoped static HTML and CSS in the existing checkout, preserving the latest purchasing work. No new JavaScript or dependencies.
**Tech Stack:** HTML, CSS, inline decorative SVG, Vite.
**Spec:** `docs/superpowers/specs/2026-10-25-hospital-supply-design.md`

## Global Constraints

Only change section 04. Use labelled illustrative demo data. Preserve existing fonts, colours and adjacent sections. Never imply automatic approval or delivery.

## Review Focus

Check document text and diagram order on mobile, horizontal overflow at 320px, inherited global styles on light surfaces, static content visibility, and consistent spacing with section 03.

### Task 1: Supply presentation

**Files:** `velocity.html`, `velocity.css`.
**Interfaces:** Consumes shared page tokens and container; produces scoped `.v-hospital-*` presentation classes.

- [x] Replace `#supply` placeholder and side list with location panels, a supply-request document, a semantic four-step journey, and the existing approval/returns note.
- [x] Add scoped desktop and responsive CSS; stack the diagram and turn the journey into a vertical timeline on narrow screens.
- [x] Review desktop, tablet, 390px and 320px layouts in the browser. Check text contrast, no clipping, and readable document quantities.
- [x] Run `npm run build`, `node --test tests/velocity-inventory.test.mjs`, and `git diff --check`.

## Execution decisions

The user approved implementation in this conversation. Keep work in the current checkout to preserve the preceding sections' design. Use visual checks for the static presentation; do not introduce tests that mirror markup. No publication or commit requested.

Verification: production build passed; all 4 inventory tests passed; diff whitespace check passed. Browser review at 1280px, 1024px, 390px and 320px showed no overflow in section 04. Static HTML carries all essential content and no new animation or JavaScript was added. Scope assertions confirmed all markup outside section 04 and all existing CSS are preserved.

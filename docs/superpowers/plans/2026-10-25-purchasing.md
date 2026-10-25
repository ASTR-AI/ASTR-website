# Purchasing Section Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Give section 03 a connected purchasing workflow consistent with sections 01 and 02.
**Architecture:** Static semantic document illustrations and scoped responsive CSS, using the current checkout to retain the preceding sections' uncommitted design work.
**Tech Stack:** HTML, CSS, Vite.
**Spec:** `docs/superpowers/specs/2026-10-25-purchasing-design.md`

## Global Constraints

Preserve surrounding sections and existing edits. Label illustrations as demo data. No new packages, JavaScript, fictional controls, or automatic approval claims.

## Review Focus

Verify narrow mobile widths, document value wrapping, 200% text reflow, visibility without JavaScript, and adjacent sections remaining intact.

### Task 1: Purchasing presentation

**Files:** `velocity.html`, `velocity.css`.
**Interfaces:** Consumes existing container and typography tokens; produces `.v-purchasing-section`, document previews, and explanation row.

- [x] Replace only the purchasing section's placeholder markup with labelled order/receipt illustrations and a three-column explanation row.
- [x] Add scoped desktop CSS and stacked tablet/mobile rules. Keep document details readable without horizontal scrolling.
- [x] Inspect desktop, tablet, mobile and 200% equivalent reflow in the browser, including static content without JavaScript.
- [x] Run `node --test tests/velocity-inventory.test.mjs` and `npm run build`; review the scoped diff.

## Execution notes

User explicitly approved implementation. Work stays in the current checkout because the visual references are uncommitted there. Static visual changes need browser verification rather than implementation-mirroring unit tests. No commit or publication requested.

Verification: production build passed; 4/4 inventory tests passed; git diff --check passed. Browser reviewed at 1280px, 768px, 390px and 320px. No horizontal overflow at tested widths. Corrected inherited definition-list padding and text colours during browser review. Content is static HTML with no JavaScript dependency. Existing build warnings remain for CSS utility at-rules and stale Browserslist data.

# Velocity Mobile Spacing Implementation Plan

> Implement inline with superpowers:executing-plans.

**Goal:** Apply the mobile spacing review approved by the user across the Velocity page.
**Architecture:** Share spacing variables in the existing phone media query and reconcile component-owned spacing rules. Preserve desktop geometry and existing behavior.
**Tech stack:** Existing CSS, Vite, vanilla JavaScript.
**Spec:** `docs/marketing/2026-10-31-velocity-mobile-spacing-review.md`

## Constraints

- Mobile scope: <=767px. Ordinary section padding 32px each side; hero retains fixed-header clearance.
- Heading-to-description 16px; intro-to-content 32px; card title-to-text 8px; card gaps 16px; card padding 20px (16px below 360px).
- Retain 20px page gutters, 16px below 360px, readable document interiors, touch targets, forms, rails, and desktop layout.
- Reuse the current checkout. No new runtime dependencies or generated CSS-string tests for this reversible presentation change.

## Task: Normalize and verify mobile spacing

- [x] Update `velocity.css`, `velocity-hero.css`, `velocity-operations.css` where each owns mobile spacing. The shared Supply introduction rule already works without changing its document stylesheet. Remove competing short-screen section padding. Keep a shared section rule and explicit component relationships.
- [x] Check all sections at 320x740, 390x844, 430x932 and the 767/768 transition; inspect desktop at 1440x900. Confirm computed padding, heading gaps, natural content heights, no page overflow, rail ends, expanded FAQ, alternate operations tab, and demo form layout.
- [x] Run `node --test tests/*.test.mjs`, `npm run build`, and `git diff --check`; inspect the final diff. Save current screenshots and verification notes.

## Review focus

Short viewport compression, compounded parent/child gaps, stylesheet specificity/load order, narrow form/rail widths, and desktop regressions are covered by browser measurements and screenshots.

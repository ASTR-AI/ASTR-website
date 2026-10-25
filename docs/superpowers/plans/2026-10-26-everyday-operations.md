# Everyday Operations Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Combine sections 05–07 into one accessible four-view showcase.
**Architecture:** Static HTML provides complete fallback content. A separate tabs module progressively enhances it; scoped CSS preserves the floating aesthetic.
**Tech Stack:** HTML, CSS, vanilla JavaScript ES modules, Vite.
**Spec:** `docs/superpowers/specs/2026-10-26-everyday-operations-design.md`

## Global Constraints

Preserve current sections 01–04. Four visible categories, no autoplay, labelled illustrative demo data, supported claims only, no dependencies or publication. Preserve legacy anchors and renumber the following sections to 06/07.

## Review Focus

Check click/keyboard state synchronization; hash navigation to hidden views; optional hospital-module copy; narrow-screen overflow; all content readable without enhancement.

### Task 1: Presentation and content

**Files:** `velocity.html`, `velocity.css`.
**Interfaces:** Shared container and typography; `.v-operations-*` scoped classes; `data-operations-*` enhancement hooks.

- [x] Replace only sections 05–07 with the shared introduction, visible selectors, four semantic workflow panels, labelled previews, and module note.
- [x] Add responsive floating layout, active/focus states, and no-JavaScript fallback. Renumber feature index and FAQ.

### Task 2: Progressive enhancement and verification

**Files:** `velocity-operations.mjs`, `velocity-page.js`.
**Interfaces:** Export `initOperationsTabs(root)` returning cleanup; root contains controls and four panels; maps tabs to `daily-work`, `ward-operations`, `accounts`, `visibility` anchors.

- [x] Add automated tests for keyboard wrapping and hash resolution before implementation; verify tab selection and page lifecycle in the browser.
- [x] Add the isolated controller and initialize/clean up with page lifecycle. Hide inactive panels only after successful initialization.
- [x] Verify all four tabs, keyboard arrows/Home/End, legacy hash activation, and fallback content in browser.
- [x] Verify 1280px, 768px, 390px and 320px layouts, scoped changes, production build, and existing inventory tests.

## Execution notes

User approved implementation. Work remains in the current checkout to preserve ongoing design work; no commit requested. Browser checks cover visual and interaction behavior; existing inventory tests cover the adjacent carousel.

## Final verification

- Four new navigation tests were observed failing before implementation, then passing. All 17 repository tests pass.
- Production build, scoped ESLint, and git diff whitespace check pass. Existing CSS utility and Browserslist build warnings remain.
- Actual browser checks covered all four click targets, matching previews, Home/End and right-arrow wrapping, direct legacy hash navigation and reload, and the combined section anchor.
- Fallback review with the page controller removed showed all four workflow articles and hid the inactive controls. Temporary fallback fixture was removed after review.
- Reviewed 1280px, 768px, 390px, and 320px layouts. All four views fit at 390px; narrow export view checked at 320px. No horizontal overflow found.
- Scope assertions confirm sections 01–04 and all existing CSS remain unchanged; following section content differs only in numbering. No duplicate IDs.
- Independent read-only review reported no blocking findings.
- No commit, push, or publication performed. Preview saved at `/tmp/velocity-everyday-operations.png`.

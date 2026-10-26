# Full Picture Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan inline. Track steps below.

**Goal:** Replace section 06's long feature index with four readable capability cards.
**Architecture:** Static semantic HTML with section-scoped CSS; reuse page fonts and gold accents. No JavaScript or dependencies.
**Tech Stack:** HTML, CSS, Vite.
**Spec:** docs/superpowers/specs/2026-10-26-full-picture-design.md

## Global Constraints

Preserve all prior edits, capability coverage and setup qualifications. No publication or commit needed.

## Review Focus

Mobile wrapping; readable contrast; all capabilities represented; no implied interactive controls; unaffected surrounding sections.

### Task 1: Capability cards

**Files:** Modify velocity.html and velocity.css.
**Interfaces:** Retain #features anchor; four static articles using scoped v-capability classes.

- [x] Replace #features contents with the approved heading, four cards, compact audience line and availability note.
- [x] Add two-column layout, decorative SVG icons, subtle borders and mobile stacking. Remove unused feature/audience styles without affecting shared definition lists.
- [x] Run production build and existing tests; inspect desktop/mobile in the browser and check overflow.
- [x] Review section-only changes and mark design approved and implementation complete.

Execution: User approved design and asked to finish efficiently. Use current checkout to preserve existing page edits; no extra approval or worktree needed for this static change. Visual inspection and build replace new tests for this reversible layout change.

Verification: production build succeeded; 17 existing tests passed. Browser measurements: 1280px two columns; 390px and 320px single column; no document or card overflow. Existing build warnings concern animation CSS directives and Browserslist data. Final review preserved feature coverage, including supported transfer returns.

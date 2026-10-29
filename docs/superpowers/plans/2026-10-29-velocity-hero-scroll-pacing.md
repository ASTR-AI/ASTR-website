# Velocity Hero Scroll Pacing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Slow the desktop hero reveal and give each chapter more reading time while keeping motion and progress directly responsive to native scrolling.

**Architecture:** Increase the existing scroll-distance multipliers in `measure()`. Continue deriving media position, chapter selection, click targets, progress fills, and sticky release from the same geometry. Retain the existing animation loop and directional crossfade.

**Tech Stack:** Existing JavaScript modules, CSS, HTML, Node test runner, Vite. No dependencies.

**Spec:** `docs/superpowers/specs/2026-10-28-velocity-hero-transition-design.md`, amended by the user's request to plan slower scrolling on 2026-10-29. Proposed pacing: landing 1.2 viewport heights; each chapter 1.0 viewport height.

## Current state and scope

Source inspection confirms the earlier refinements are already present in the working tree: one frame, 280ms directional 16px crossfades, direct element styles, animated disclosures, and off-white progress fills. Do not repeat that work. Existing edits in `velocity.html`, `velocity-hero.css`, `velocity-hero.mjs`, and `tests/velocity-hero.test.mjs`, plus untracked refinement documentation, must be preserved.

The current landing distance is `innerHeight * 0.8`, chapter step is `innerHeight * 0.7`, and total travel is landing plus three steps. Proposed total travel increases from 2.9 to 4.2 viewport heights (~45%). At a 900px viewport: landing 720→1080px, each chapter 630→900px, total 2610→3780px. The geometry start position is unchanged.

## Global constraints

- Motion remains enabled only at width >=1024px, height >=700px, and reduced motion off.
- Preserve native document scrolling: no wheel/touch interception, scroll library, synthetic inertia, delayed interpolation, or CSS transitions on scroll-driven transforms/progress fills.
- Preserve 280ms panel crossfades, 16px directional offsets, and 220ms disclosure animations unless a separately reproduced defect requires attention.
- Keep divider `rgba(255,255,255,0.12)` and progress fill `#c8c5bd`; retain current indicator visibility rules.
- Preserve existing copy, image assets, CTA links, focus protection, accessibility state, static fallbacks, and initial/final media geometry.
- Keep inventory-through-footer markup unchanged. No deployment or unrelated refactor.

## Files

- Modify `velocity-hero.mjs`: named pacing constants and their use in `measure()`.
- Modify `tests/velocity-hero.test.mjs`: pacing assertions and geometry-dependent integration cases.
- Create `docs/marketing/hero-transition/2026-10-29-scroll-pacing-verification.md`: fresh measurements and browser observations.
- No HTML/CSS changes are expected; inspect them to verify existing behavior rather than modifying them preemptively.

## Review focus

1. Hardcoded test scroll positions must not silently select the wrong chapter after the distance change (Task 1).
2. Reverse scrolling must reproduce identical geometry and progress at identical positions (Task 1).
3. Chapter clicks, fills, and pin release must share the new boundaries (Tasks 1–2).
4. Resizing and preference changes must recompute or disable geometry without retained enhancement styles (Tasks 1–2).
5. Longer travel must give reading time without making the section tedious on wheel and trackpad input (Task 2).

### Task 1: Change pacing and verify geometry

**Interfaces:** Keep all existing public helper signatures and the `initHeroTransition(root)` cleanup contract. Add internal constants `HERO_LANDING_VIEWPORTS = 1.2` and `HERO_CHAPTER_VIEWPORTS = 1.0`; do not export configuration solely for tests. Existing `geometry.end`, `geometry.step`, and `--hero-travel` remain the shared inputs for rendering/navigation/release.

- [ ] Run `node --test tests/velocity-hero.test.mjs` before editing and record the baseline. Inspect the existing uncommitted diff so the pacing patch does not overwrite prior work.
- [ ] Update fixture-driven tests for a 900px viewport: with scene document top 500px and pin top 112px, start is 388px, landing is 1468px, chapter boundaries are 1468/2368/3268px, and travel ends at 4168px. Assert `--hero-travel` is 3780px and landing transform reaches its existing final geometry.
- [ ] Replace integration-test magic positions such as 1150/1800/2500 with named fixture geometry and explicit chapter offsets. Keep expected pacing values independently specified in tests so importing the production constants cannot mask a wrong configuration.
- [ ] Assert landing midpoint at 928px gives the existing eased midpoint. Assert before/at/after each chapter boundary, midpoint fill states, all fills complete at release, and identical states when visiting positions in reverse order.
- [ ] Assert chapter click targets equal landing plus `(index + 0.25) * 900` and resolve to the requested chapter. Extend the fixture's `scrollTo` capture if needed; test the controller wiring, not only the unchanged helper.
- [ ] Add resize coverage with a document-stable scene-top fixture: at 720px viewport height, landing travel is 864px, each chapter is 720px, and total travel is 3024px. Verify recalculated progress and existing reduced-motion/static cleanup. A fixture must not keep a constant viewport-relative rect when `scrollY` changes.
- [ ] Run the focused tests and confirm the new pacing assertions fail for the intended old values before changing implementation.
- [ ] Add the two constants and replace only the existing distance multipliers in `measure()`. Keep smoothstep easing, chapter targets, progress math, and total-travel formula unchanged.
- [ ] Run the focused tests again. Confirm the existing animation, focus, and cleanup coverage still passes; investigate failures without weakening assertions.

### Task 2: Validate pacing in browsers and record results

**Deliverable:** Fresh visual evidence and a verification record. Unit tests do not establish perceived smoothness.

- [ ] Run the local site and record the hero at 1440×900 and 1280×720. Exercise ordinary wheel scrolling, small trackpad movements, fast flings, and reversing during landing and chapter crossfades. If real input hardware is unavailable, explicitly record that limitation instead of describing scripted scroll as hardware testing.
- [ ] Verify the reveal now takes 1.2 viewport heights and each chapter takes 1.0. Check the fixed frame, readable copy, responsive off-white fills, clickable titles, final full progress, and natural release into inventory. Confirm there is no extra empty interval after the final chapter.
- [ ] Check resize while pinned, interrupted title-click smooth scrolling, keyboard selection/focus, reduced motion at load and dynamically, mobile 390×844, short desktop 1280×650, and JavaScript disabled. Static layouts must not acquire the longer scroll space.
- [ ] Record a short frame sequence or video and a performance trace for the same scroll sequence. Look for long frames, unexpected layout work, or repeated disclosure restarts. Do not add smoothing delays to conceal rendering stalls; record any separate defect with evidence.
- [ ] Evaluate the proposed 4.2-viewport sequence for excessive dwell. Use 1.2/1.0 as the first implementation; if it clearly drags, try a single bounded alternative of 1.1/0.9 (3.8 total), compare the same sequence, and document the selected values and reason. Update geometry assertions to match any selected alternative.
- [ ] Run `node --test tests/*.test.mjs`, `npx eslint velocity-hero.mjs tests/velocity-hero.test.mjs`, `npm run build`, and `git diff --check`. Distinguish existing failures from pacing regressions.
- [ ] Save commands, selected distances, tested viewports/input methods, screenshots/recording paths, observed performance, and untested limitations to the new verification record. Confirm the pacing change did not modify lower-section markup or unrelated working-tree edits.

## Completion criteria

The initial reveal and chapter intervals use the selected, documented distances; forward/reverse scroll remains immediate; fills and clicks agree with chapter boundaries; static layouts remain unchanged; tests and build pass or pre-existing blockers are documented; and fresh browser evidence supports the chosen pacing. This planning turn does not change product code or claim that perceived smoothness has been verified.

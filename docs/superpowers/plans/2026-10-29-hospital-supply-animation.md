# Hospital Supply Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatically explain one hospital supply request through four restrained interface states, preserving the current Velocity visual style.

**Architecture:** Progressively enhance section `#supply` with a dedicated, cleanup-safe controller. Stable HTML carries the complete workflow; JavaScript changes a small status area and step emphasis using scoped CSS transitions. Replace the old supply observer in the page entry point without changing the shared reorder preference handling.

**Tech Stack:** Existing HTML, CSS, vanilla JavaScript ES modules, Vite, Node built-in test runner. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-10-29-hospital-supply-animation-design.md` (proposed; review before implementation).

## Global Constraints

- Only section `#supply` and its lifecycle integration change.
- One request, `SR–0024`, remains visible throughout.
- Keep “Illustrative workflow · Demo data” and the existing approvals/returns note visible.
- No enclosing section panel, video, audio, new dependencies, simulated cursor, typing effect, particle effects, exaggerated glow, or continuous loop.
- Use 180–240 ms opacity/color transitions and at most 4 px of translation on changing explanatory text.
- Without JavaScript, IntersectionObserver, or required animation markup, preserve a readable static workflow.
- No adjacent-section redesign, new CTA, backend, publication, or commit is requested.

## Review Focus

1. At narrow widths the observed card, changing caption, and playback controls must remain understandable together; a tall section must not prevent playback from starting.
2. Rapid scrolling and tab switching must preserve remaining stage time and must not override an explicit user pause.
3. Initial reduced motion, preference changes, and unavailable browser APIs must leave the complete workflow readable.
4. Duplicate initialization and page restoration must not create multiple playback clocks or restart a finished demonstration.
5. All stages must retain consistent medicine quantities, identify the acting team, and avoid implying automatic approval or receipt.

## Files and responsibilities

- Modify `velocity.html`, section `#supply` currently beginning near line 877: semantic preview, compact endpoints, statuses, static explanations, hidden-until-initialized controls.
- Modify `velocity.css`, `.v-hospital-*` rules currently beginning near line 1940: responsive composition and restrained state transitions; scope new rules to `#supply`.
- Create `velocity-supply.mjs`: playback state, visibility/preference handling, rendering, idempotent initialization and cleanup.
- Modify `velocity-page.js`: import/init/cleanup the controller; remove obsolete `supplySteps`, `supplyObserver`, `updateSupplyMotion`, and its supply-only resize listener. Preserve `preference` and reorder behavior.
- Create `tests/velocity-supply.test.mjs`: meaningful playback and lifecycle tests using lightweight DOM/browser fakes and a deterministic clock, matching the repository's dependency-free test approach.

### Task 1: Build the static, responsive demonstration

**Interfaces:** Produce `[data-supply-demo]` on the figure, `[data-supply-card]` on the document, `[data-supply-status]`, `[data-supply-caption]`, four `[data-supply-step]` elements with `request|pick|dispatch|receive` values, `[data-supply-playback]`, and `[data-supply-complete]`. JS writes `data-supply-state` on the figure and `aria-current="step"` on the active step. Static markup defaults to the complete receipt state, all explanations readable, controls hidden.

- [ ] Restructure only `#supply` around compact endpoints, a stable document, integrated indicator, and short actor caption. Use the exact example and stage copy from the spec.
- [ ] Add responsive CSS for desktop and the existing 850 px breakpoint, including a two-by-two indicator at 380 px and below. Reserve space for the longest caption; keep quantities readable and controls at least 44 px tall.
- [ ] Add scoped active/completed styles and 180–240 ms transitions. Reduced-motion styles suppress all new motion; status meaning must remain clear without color.
- [ ] Inspect the static result at 1440, 1024, 850, 390, and 320 px. Verify no horizontal overflow, readable labels, and all four explanations available without JS. Compare surrounding sections to confirm scope.

### Task 2: Implement playback and lifecycle behavior

**Interfaces:** Export `initSupplyDemo(root: Element | null): () => void` from `velocity-supply.mjs`. Repeated initialization cleans up prior resources. Persist playback progress per root in a module WeakMap, including completed/user-paused state, for page restoration. No global controller API or dependency is needed.

- [ ] Write failing tests in `tests/velocity-supply.test.mjs` for null/incomplete roots returning harmless cleanup, initial static fallback when APIs are missing, no autoplay before card intersection, and four ordered 3500 ms stages ending once in receipt. Use Node mock timers or a local fake clock; no wall-clock sleeps.
- [ ] Run `node --test tests/velocity-supply.test.mjs`; confirm failures exercise missing controller behavior rather than fixture/import errors.
- [ ] Implement initialization, required-node validation, progressive enhancement, stable text updates, step semantics, and one active playback clock. Observe the card at threshold 0.5. Use elapsed time, not a free-running interval that skips stages after backgrounding.
- [ ] Add tests for pause halfway through a stage, resume with the remaining time, Replay resetting a completed run, and Show all steps immediately completing it. Confirm unrelated clicks/keyboard events do not change playback.
- [ ] Implement Pause/Resume/Replay and Show all steps using native button click listeners; hide Show all steps on completion. Keep focus on the activated button and avoid automatic live announcements.
- [ ] Add tests for offscreen and hidden-document suspension, explicit pause surviving visibility changes, initial/runtime reduced motion, reinitialization, idempotent cleanup, and completed progress surviving restoration. Assert timers cannot mutate the DOM after cleanup and data quantities never change.
- [ ] Implement those lifecycle cases. Reduced motion settles to complete; disabling it does not trigger autoplay. Clean up all listeners, pending work, and observers, including preference listeners.
- [ ] Run `node --test tests/velocity-supply.test.mjs`; require all behavior tests to pass.
- [ ] Integrate the module in `velocity-page.js` alongside existing initializers and pageshow/pagehide cleanup. Remove the unused supply observer and supply-only resize wiring; preserve reorder motion initialization and preference updates.

### Task 3: Verify the complete experience

**Interfaces:** Consumes the static markup and controller from Tasks 1–2; produces a visually reviewed section and recorded verification results.

- [ ] Review an actual autoplay run in the in-app browser: request originates at Hospital store; stock preparation/dispatch occurs at Central pharmacy; receipt is recorded by Hospital store. Confirm one request and unchanged quantities throughout.
- [ ] Review desktop, tablet, 390 px, and 320 px screenshots, including all four stages and the final settled state. Confirm no layout jumps, clipped captions, oversized empty cards, or gold/glow effects that distract from the text. Adjust timing only if reading comfort requires it, updating spec and tests together.
- [ ] Check keyboard Pause/Resume/Replay and Show all steps, visible focus, screen-reader reading order, reduced motion, JS-disabled static content, scroll-away/back, hidden-tab return, resize mid-run, and back/forward restoration. Confirm reentering a completed section never replays automatically.
- [ ] Run `node --test tests/*.test.mjs`, `npm run build`, and `git diff --check`. Require passing tests, successful build, and no whitespace errors; fix only failures introduced by this work and report unrelated baseline failures.
- [ ] Review the diff to confirm purchasing, reorder motion, inventory, operations, and other sections remain intact. Record browser observations and command outcomes here; do not claim completion from unit tests alone.

## Execution handoff

Planning only. Recommended execution is inline in the existing checkout because the markup, CSS, and small controller are closely coupled. Review this proposal before changing product code. No implementation tests or production build have been run for this planning-only change.

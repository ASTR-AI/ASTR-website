# Velocity Hero Motion Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make chapter changes calm, reversible, and interruption-safe while preserving the current hero sequence and static fallbacks.

**Architecture:** Keep one browser frame and bar around four overlapping content panels. Retain native document scrolling and the existing progress calculations; apply continuous styles to their consuming elements and animate only content and disclosure bodies.

**Tech Stack:** Existing HTML, CSS, JavaScript modules, Node test runner, Vite; no new runtime dependency.

**Spec:** `docs/superpowers/specs/2026-10-28-velocity-hero-transition-design.md`, plus the six recommendations supplied on 2026-10-29. The choices below are proposed defaults for review, not previously approved design decisions.

## Assessment and proposed decisions

| Finding | Code evidence | Assessment |
| --- | --- | --- |
| Scroll direction | `velocity-hero.css` animates every arrival from `translateY(100%)` and every departure to `translateY(-100%)`. | Valid mismatch on reverse selection. Recommend opacity plus signed 16px movement over 280ms, rather than full-height sliding. |
| Style thrashing | `render()` in `velocity-hero.mjs` writes four inherited properties on `scene`; scroll scheduling already uses a passive listener and one pending animation frame. | Valid optimization opportunity, not proven layout thrashing or a justified P0 without a browser trace. Move continuous properties to consumers; profile before claiming a gain. |
| Frame chrome | Each of the four panels in `velocity.html` duplicates `.v-window-frame` and `.v-window-bar`. | Valid continuity problem: the entire frame moves during chapter selection. Use one persistent shell. |
| Disclosure height | `selectChapter()` changes native `details.open`; the copy wrapper is vertically centered using `translateY(-50%)`. | Abrupt height changes are supported by the code. Actual perceived displacement needs browser measurement. Animate body height and check column positioning. |
| Image readiness | Reorder and activity use `loading="lazy"`; activity repeats the already eager overview URL. | Reasonable readiness improvement, not proof of a blank frame. Only reorder introduces a unique image (~604KB versus ~1.1MB dashboard). Eager loading trades earlier availability for network contention. |
| Animation cleanup | Entry/exit classes remain until another selection or controller cleanup, using fill mode `both`. | Valid lifecycle improvement. Panels are not permanently frozen: subsequent selection resets the classes. Completion alone is insufficient for cancellation, preference changes, and teardown. |

Motion alternatives: direction-aware full-height slides preserve the current effect but retain substantial movement; a pure opacity crossfade is simplest but loses direction cues. Recommend a signed 16px crossfade as the middle ground. Treat visible motion and cleanup as one P1 deliverable; reserve P0 for demonstrated severe breakage.

## Global constraints

- Desktop enhancement: width >=1024px, height >=700px, reduced motion off.
- Keep initial dashboard landing, chapter order, scroll distances, native scrolling, and existing destinations.
- No nested scrolling, wheel interception, new dependencies, or screenshot replacement.
- Preserve copy, stock report demo-data/snapshot qualifiers, image dimensions, and aspect ratio `2940 / 1842`.
- Preserve native disclosures and overview image without JavaScript. Mobile and short screens have no pinned scroll distance.
- Reduced motion: immediate chapter/disclosure changes and no smooth programmatic scrolling.
- Keep keyboard focus protection and current `aria-hidden`/`inert` behavior for inactive panels.
- Keep inventory-through-footer HTML unchanged. No deployment.

## File responsibilities

- `velocity.html`: consolidate hero browser shell; adjust only hero image loading attributes.
- `velocity-hero.css`: shared content viewport, signed crossfade, disclosure height states, reduced-motion overrides, scoped hover behavior.
- `velocity-hero.mjs`: local style writes, chapter state, interruption-safe animation/disclosure lifecycle and cleanup.
- `tests/velocity-hero.test.mjs`: extend existing fixtures for independent element styles, animation events, and focus/body behavior.
- `docs/marketing/hero-transition/2026-10-29-refinement-verification.md`: new evidence and outstanding limits; retain historical verification.
- Leave `velocity-page.js` lifecycle integration unchanged unless a reproduced integration failure requires it.

## Review focus

1. Rapid forward/reverse selection must settle on the latest chapter, including returning to a panel still departing (Task 2).
2. Resize and reduced-motion changes during animation must restore correct styles and cancel stale work (Tasks 2–4).
3. Focus inside a disclosure must remain usable even when scrolling selects another chapter (Task 4).
4. Cold-cache image failure and late decoding must preserve frame dimensions and the latest selected chapter (Task 5).
5. No-JavaScript and mobile disclosure behavior must remain native and readable (Tasks 1, 4, 6).

### Task 1: Consolidate the browser frame

**Files:** `velocity.html`, `velocity-hero.css`, `tests/velocity-hero.test.mjs`.

**Interface:** Retain the four `data-hero-panel` keys and three `data-hero-chapter` keys used by the controller. Panels become content layers inside one `.v-window-content` viewport.

- [ ] Capture a browser baseline at 1440×900, 1280×720, 1280×650, and 390×844; record forward/reverse transitions and the hero-to-inventory boundary. Record a performance trace for continuous scroll and chapter changes separately.
- [ ] Add a hero-scoped structural assertion: exactly one frame and bar, four content panels, overview visible without enhancement, remaining panels initially hidden. Confirm it fails on current markup.
- [ ] Move the shared shell outside the panel stack. Keep the bar outside the clipped content viewport and preserve the shell shadow. Animate no shell ancestor during chapter changes.
- [ ] Scope fixed aspect ratio to the enhanced viewport. Ensure report layout fills that viewport and the fallback dashboard reserves its dimensions.
- [ ] Override frame hover transforms in desktop motion mode: the existing hover rule can otherwise move the supposedly stationary shell. Retain static-layout hover behavior.
- [ ] Run `node --test tests/velocity-hero.test.mjs`; inspect desktop/mobile and JavaScript-disabled rendering. The bar must stay fixed relative to the media element during chapter changes; the initial landing still moves the media element as before.

### Task 2: Implement the crossfade and complete its lifecycle

**Files:** `velocity-hero.mjs`, `velocity-hero.css`, `tests/velocity-hero.test.mjs`.

**Interface:** Keep public exports unchanged. Internal `selectPanel(key)` infers direction from ordered keys `overview`, `stock`, `reorder`, `activity` and owns transition cleanup.

- [ ] Extend panel fixtures with event registration/dispatch and visible class state. Test normal completion, reverse selection, repeated selection, skipped chapters, and `stock → reorder → stock` before completion. Confirm missing cleanup/direction tests fail first.
- [ ] Replace 620ms full-height slides with 280ms opacity/transform animations using the existing easing. Forward: incoming +16px to 0 and outgoing 0 to -16px; reverse: invert signs. Incoming opacity starts at 0. No animation on initial setup.
- [ ] Register completion/cancellation handling once during initialization, not on every selection. Filter events by target and hero animation name so descendant animations cannot settle a panel.
- [ ] Define settled CSS independently of animation fill: current panel visible at zero offset; all inactive panels invisible and noninteractive. On settlement remove entry/exit classes and transient direction styles.
- [ ] On new selection, invalidate earlier transition work and settle obsolete layers before starting the latest pair. Associate handlers with the active transition and clean up obsolete listeners so old completion/cancellation events cannot settle a newer transition. Explicit reset remains authoritative; do not depend on cancellation-event support.
- [ ] Settle synchronously when reduced motion is enabled or the controller is disposed. Remove listeners and any pending animation work during cleanup/reinitialization. Scope reduced-motion CSS to suppress hero animation even during a preference change.
- [ ] Run focused tests and inspect rapid threshold reversals in a browser. After settlement exactly one panel is current, no transition classes remain, and inactive panels retain `aria-hidden`/`inert`.

### Task 3: Localize continuous scroll styles

**Files:** `velocity-hero.mjs`, `velocity-hero.css`, `tests/velocity-hero.test.mjs`.

**Interface:** `getHeroTransition()`, `getHeroChapter()`, and `getHeroChapterTarget()` retain current results. Scene retains geometry properties; media/copy own continuous rendering properties.

- [ ] Give scene, media, and copy independent fixture style maps. Add tests that scroll updates media transform and copy opacity/transform without writing continuous motion variables to scene. Assert one pending render for a burst of scroll events.
- [ ] Write the complete translate/scale transform directly to media, and opacity/translate directly to copy. Preserve `-50%` centering, computed shift/scale, and the existing focus-visible opacity override; an inline opacity must not defeat that keyboard safeguard.
- [ ] Keep pin top/height, travel, and media width geometry on scene. Skip unchanged chapter `open` assignments and unchanged continuous values, especially after progress clamps at 1.
- [ ] Remove only enhancement-owned media/copy properties on disable and cleanup; preserve unrelated inline styles. Add tests for resize, reduced-motion toggle, teardown, and reinitialization.
- [ ] Run focused tests and compare browser traces with the same viewport and scroll sequence. Distinguish recalculated style from forced layout; report measured changes without a predetermined percentage target. Investigate ResizeObserver feedback if present.

### Task 4: Animate disclosure bodies without losing native semantics

**Files:** `velocity-hero.mjs`, `velocity-hero.css`, `tests/velocity-hero.test.mjs`.

**Interface:** Native `details` and `summary` remain. One internal disclosure updater owns open state, body height animation, and cancellation. Existing focus-inside-body exception remains.

- [ ] Add tests for opening, closing, rapid reversal, focus inside an outgoing body, reduced motion, and cleanup during height animation. Assert focused body content is never collapsed by scroll selection.
- [ ] Use measured body heights and the Web Animations API for enhanced disclosures: opening sets `open` before expanding from 0; closing keeps `open` until contraction finishes. Settle expanded height to natural size afterward. Use 220ms with the existing easing and no arbitrary max-height.
- [ ] Keep the logical selected chapter separate from temporary `details.open` values during closing. While closing, prevent hidden-link focus entry when no existing focus is inside. Restore all temporary body styles/accessibility state on settle or cancellation.
- [ ] Batch body measurements before writes. Start height animation only for changed chapter states, not each scroll frame. Cancel/settle before resize measurement; observe expanded natural content when necessary for font changes without creating resize loops.
- [ ] Keep the current vertical centering initially: smooth height changes should smooth its movement. If browser evidence still shows distracting drift, document it as a separate anchoring decision rather than silently reserving a large blank area.
- [ ] Test native summary keyboard activation, mobile manual selection, dynamic reduced motion, and no-JavaScript disclosure behavior. Confirm closed body links are unavailable and open body text remains fully visible at 200% zoom.

### Task 5: Improve hero image readiness

**Files:** `velocity.html`, optionally `velocity-hero.mjs` for a demonstrated readiness defect, `tests/velocity-hero.test.mjs` if behavior changes.

**Interface:** Retain existing image URLs, alternative text, dimensions, and chapter mapping.

- [ ] Set reorder and activity images to `loading="eager" decoding="async"`. Keep the overview eager; do not assign high fetch priority to all images or modify lower-section lazy loading.
- [ ] Inspect cold-cache requests and fast chapter selection under network/CPU throttling. Activity uses the same dashboard URL as overview; verify reuse rather than claiming a separate download saving.
- [ ] Record whether eager reorder loading materially delays the first dashboard/LCP. If it does, prefer warming the reorder asset after overview readiness and before chapter entry, documenting that tradeoff.
- [ ] If a late decoded image visibly blanks a selected panel, add a readiness gate that retains the previous visual until the requested image is ready. Guard async results against newer selection/disposal, handle `decode()` rejection, and test rapid selection and network failure. Do not add async state solely because decoding is set to async.
- [ ] Verify frame size is stable before/after load and after an asset failure; retain useful alt text and avoid an indefinite hidden/loading state.

### Task 6: Verify the complete experience

**Files:** verification record above; tests touched by preceding tasks.

- [ ] Run `node --test tests/*.test.mjs`, `npx eslint velocity-hero.mjs tests/velocity-hero.test.mjs`, `npm run build`, and `git diff --check`. Record failures and distinguish pre-existing issues.
- [ ] Browser-check 1440×900 and 1280×720 motion layouts; 1280×650 static fallback; 390×844 and 320×700 mobile; and both sides of the 1024px/700px enhancement boundaries.
- [ ] Exercise forward/reverse scrolling, fast flings, keyboard chapter selection, interrupted smooth scrolling, direct chapter jumps, resize during motion, reduced motion at load and dynamically, 200% zoom, JavaScript disabled, and cold-cache/error assets. Verify no horizontal overflow and natural sticky release.
- [ ] Capture frame/content transitions and disclosure motion as a short recording or frame sequence; static screenshots alone cannot demonstrate smoothness. Keep before/after performance traces with observed style/layout costs and dashboard loading timings.
- [ ] Confirm focus-visible copy remains readable throughout landing, link destinations work, no stale listeners/classes/styles remain after teardown, and repeated initialization creates only one active controller.
- [ ] Compare inventory-through-footer markup with the pre-change revision and inspect the diff for scope. Save fresh evidence in the verification record; note any browser behavior that was not actually tested.

## Current evidence and limits

On 2026-10-29, source inspection confirmed the structures and state changes above; `node --test tests/velocity-hero.test.mjs` passed all 12 existing tests. No fresh browser rendering or performance measurement was performed for this assessment. Those tests validate current logic, not animation smoothness, decoding readiness, or layout cost. This document changes no product code.

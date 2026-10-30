# Follow the Request Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the rejected supply badge animation with a visibly transforming, scroll-controlled request journey.

**Architecture:** Prove the choreography on a dev-only motion-study route, then integrate it into `#supply`. One scoped GSAP timeline controls visual layers and semantic chapter state; static semantic HTML remains the fallback. The page lifecycle lazily loads the controller and guards against setup after teardown.

**Tech Stack:** Existing HTML/CSS and ES modules, GSAP core + ScrollTrigger via npm, Vite, Node built-in test runner. No video, image-generation service, animation framework, or global scroll smoother.

**Spec:** `docs/superpowers/specs/2026-10-29-supply-scroll-story-design.md`. This supersedes the earlier badge-animation plan and its 14-second autoplay requirements.

## Global Constraints

- Every stage must have an obviously different composition, with visible continuity between them.
- A badge change does not count as a scene transition.
- Keep the composition floating directly on the page.
- No click is needed to discover the story; the visitor's ordinary scrolling advances it.
- No automated approval, guaranteed delivery, unverified inventory balance changes, or fabricated live timestamps.
- No pinning and no long artificial spacer on mobile/short screens.
- Do not reset or discard current working-tree changes.
- Use GSAP core and ScrollTrigger only, installed through npm and bundled by Vite; do not use a runtime CDN.

## Review Focus

1. Substantial movement must work in both scroll directions, including fast jumps directly to the receiving scene.
2. Hash entry, fonts loading, resize, and back/forward restoration must map actual scroll position to the correct scene.
3. Breakpoint/reduced-motion changes and failed imports must remove pin spacers and restore readable content.
4. Navigation height, short screens, 320 px width, and 200% zoom must not obscure essential text or trap keyboard navigation.
5. Late async initialization, duplicate init, and cleanup must leave one owned timeline and preserve unrelated page behavior.

---

## Current baseline and file map

The working tree already contains changes to `velocity.html`, `velocity.css`, and `velocity-page.js`, plus `velocity-supply.mjs` and its tests. The current controller uses a 3500 ms stage clock, changes status/caption/current-step state, and preserves autoplay state in WeakMaps. Those mechanisms are specifically being replaced. Preserve the data and external initializer contract, not the old autoplay behavior.

| File | Responsibility |
| --- | --- |
| `prototypes/supply-scroll-story/index.html` (create) | Dev-only motion study using the real fonts/styles, four scene layers, canonical summary, and scroll runout. Not a new production page or Vite build entry. |
| `prototypes/supply-scroll-story/main.mjs` (create) | Import page styling and initialize the same controller used in production; no duplicated animation implementation. |
| `velocity-supply-model.mjs` (create) | Constant example data, exact chapter copy, normalized scene ranges, pure progress-to-chapter helper. No DOM/GSAP imports. |
| `velocity-supply.mjs` (replace deliberately) | DOM validation, layout measurement, timeline, scoped responsive setup, semantic progress, cleanup. |
| `velocity-supply-loader.mjs` (create) | Lazy section loading, intersection/hash activation, stale-import cancellation, and teardown. Keeps lifecycle races independently testable. |
| `velocity-page.js` (modify) | Lazy supply import and lifecycle cancellation; preserve all other initializers. |
| `velocity.html` (`#supply` only) | Canonical summary/table, visual scene layers, skip target, preserved intro and approval note. |
| `velocity.css` (`#supply` rules only) | Scene layouts, readable poses, responsive/static states, local clipping and focus styles. |
| `tests/velocity-supply.test.mjs` (replace relevant cases) | Model boundaries and meaningful controller lifecycle behavior. Remove obsolete timer-based expectations. |
| `package.json`, `package-lock.json` | Add GSAP and exact resolved lockfile version during implementation. |

## Task 1: Define the storyboard data and meaningful scene states

**Interfaces**

- Export `SUPPLY_EXAMPLE` with `reference`, `source`, `destination`, and `items` (`id`, `name`, `detail`, `quantity`, `unit`). Use the spec's exact constant example.
- Export `SUPPLY_CHAPTERS`: ordered `{ id, label, title, caption, start }[]`, with ids `request|prepare|dispatch|receive` and starts `0, 0.27, 0.55, 0.84`.
- Export `getSupplyChapter(progress: number): number`, returning an index 0–3. Clamp finite values to 0–1; nonfinite values resolve to 0.

- [ ] Capture baseline production build output and run `node --test tests/*.test.mjs`; record preexisting failures before any product changes. Read the existing supply test fixtures and lifecycle patterns before replacing them.
- [ ] Write failing model tests: exact reference/units/quantities; indices at 0, 0.2699, 0.27, 0.5499, 0.55, 0.8399, 0.84, 1; clamped values -1/2; NaN/Infinity; reversed sequence 1 → 0.6 → 0.3 → 0. Run `node --test tests/velocity-supply.test.mjs` and confirm assertions expose missing behavior.
- [ ] Implement `velocity-supply-model.mjs` with those exports. Model data must contain no fabricated application features and no alternative quantities for later stages.
- [ ] Run the focused tests; require all model assertions to pass.
- [ ] Translate the spec into four settled compositions in the dev-only route: compact request, wide picking sheet, compact traveling dispatch document, expanded receiving sheet. Use common data and explicit actor captions. Include the static semantic summary and example table.
- [ ] Add scoped layout rules in `velocity.css`; visually inspect each settled composition at 1440×900 and 1024×768. Confirm distinctly different silhouettes and legible reading poses before animating.

## Task 2: Build and review the working motion study

**Files:** prototype route, `velocity-supply.mjs`, `velocity.css`, package/lockfile, supply tests.

**Interfaces**

- `initSupplyDemo(root: Element | null): () => void` remains the production export. Allow an optional injected environment `{ gsap, ScrollTrigger, window, document }` for dependency-free lifecycle tests; production defaults use bundled imports.
- Required selectors: `[data-supply-story]` root within `#supply`; `[data-supply-viewport]` pin target; `[data-supply-summary]` semantic fallback; `[data-supply-visuals]` decorative scene container; four `[data-supply-scene="request|prepare|dispatch|receive"]`; paired `[data-supply-item="paracetamol|ors"]` visual rows; compact `[data-supply-anchor="pharmacy|hospital"]`; chapter indicator `[data-supply-chapter]`; `[data-supply-skip]`; `[data-supply-end]` after pinned content.
- `data-supply-enhanced` is set only after successful setup. CSS must never hide the fallback merely because JavaScript is available.
- Internal `measureSupplyLayout(root: Element): object` returns settled rectangles and travel offsets relative to the viewport. `buildSupplyTimeline(root, metrics, gsap): GSAPTimeline` returns a paused timeline; GSAP stays out of the model module.

- [ ] Install GSAP from npm with `npm install gsap`. Verify core and ScrollTrigger imports work through Vite; record the resolved version. Do not add ScrollSmoother, Flip, SplitText, or a CDN script.
- [ ] Write failing controller tests with injected GSAP/ScrollTrigger fakes: null root is harmless; missing required markup leaves summary visible; setup failure restores fallback; duplicate init reverts the old instance; cleanup is idempotent and only releases owned resources.
- [ ] Implement validated setup with a per-root cleanup WeakMap. Build all timelines and ScrollTriggers inside a scoped GSAP context/matchMedia instance. Restore fallback visibility if any setup step throws.
- [ ] Implement measured document/row movement through the four settled layouts. Pair corresponding layers at matching coordinates and crossfade through handoffs; animate transforms/opacity and local reveals. Read geometry during setup/refresh, never within the per-scroll update callback.
- [ ] Compose the normalized timeline exactly as specified: holds at 0–0.12, 0.27–0.40, 0.55–0.68, 0.84–1; transitions fill the intervening spans. Pre-render captions and animate them from that same timeline. Update `aria-current="step"` only when the displayed chapter changes, using `getSupplyChapter(timeline.progress())`.
- [ ] Add desktop ScrollTrigger when width >=1024, height >=700, and reduced motion is off. Pin below measured product navigation height +16 px, fit the stage in the remaining height minus 16 px (maximum 760 px), and fall back to ordinary-flow scenes if text does not fit readably. Use total travel `window.innerHeight * 2`, `scrub: 0.35`, `pinSpacing: true`, `invalidateOnRefresh: true`, and refresh-safe functional transform measurements. Do not add scroll interception or snapping.
- [ ] Add a functional Skip animation link: its fallback anchor targets the end of the story; enhanced activation uses instant scroll beyond the owned trigger end and moves focus to the dedicated `tabindex="-1"` end target. No hidden panel contains focusable controls.
- [ ] Run focused tests and the dev route. Observe forward/backward playback at slow and fast speeds. Save screenshots at progress 0.06, 0.20, 0.33, 0.48, 0.62, 0.76, and 0.92; also inspect the running sequence, since screenshots cannot establish motion quality.
- [ ] Assess the motion acceptance gate: request travels >=20% of stage width; dispatch travels >=30%; rows visibly reorganize; settled views use legible text at scale 1; the final receiving pose is readable before release. Tune spatial offsets if the motion still feels like a status change.
- [ ] Show the running dev-only motion study to the user for movement/pacing review before production integration. Report the actual review URL and what remains provisional. The checkpoint is explicitly part of the agreed exploration, not a request to approve unseen implementation.

## Task 3: Implement responsive and accessible fallbacks

**Files:** controller, scoped CSS, prototype markup, supply tests.

**Interfaces:** Consumes scene selectors and shared model from Tasks 1–2. Owns mutually exclusive desktop pin / ordinary-flow scenes / static reduced-motion states. All cleanup paths restore baseline classes and inline styles.

- [ ] Write failing tests for mode changes: desktop → narrow → desktop never accumulates triggers/spacers; runtime reduced motion reverts all moving layers; initial reduced motion never creates a timeline; summary and visual-copy accessibility states are correct on failure and success.
- [ ] Use GSAP matchMedia for desktop versus narrow/short viewports and reduced motion. For narrow/short mode, put four scenes in ordinary vertical flow with no artificial spacer. Limit optional entry motion to 24 px / 450 ms and 60 ms row stagger, once per scene. Reduced motion shows all scenes without animation.
- [ ] Ensure the canonical summary remains accessible after enhancement. Decorative animated copies have `aria-hidden="true"` and no interactive descendants. Keep the skip link and chapter/actor context available without live announcements on every scroll update.
- [ ] Verify the prototype at 1024×768, 1023×768, 850×900, 768×1024, 390×844, 320×700, and 844×390, plus browser zoom at 200%. Assert no horizontal overflow, clipped units, or blank stage. At height 699 px desktop pinning must disable.
- [ ] Check keyboard navigation forward/backward, skip behavior despite any global smooth-scroll CSS, visible focus, and readable semantic sequence with the visual layer ignored. Simulate JS unavailable and a forced setup failure; confirm static summary/table survive.
- [ ] Run focused tests; inspect transitions during a live breakpoint/preference change. Confirm no orphan spacer or fixed layer remains.

## Task 4: Integrate production and retire the badge controller

**Files:** `velocity.html`, `velocity-page.js`, controller/CSS, supply tests.

**Interfaces:** `velocity-page.js` keeps its local `initSupply()`/`supplyCleanup` pattern and calls `initSupplyLoader(root: Element | null, options?: { loadModule, window, document }): () => void` exported by `velocity-supply-loader.mjs`. The loader dynamically imports `velocity-supply.mjs`; its default `loadModule` returns that import promise. An initialization-generation token prevents late imports from attaching after teardown. The loaded controller's public initializer still returns cleanup.

- [ ] Replace only `#supply` presentation with the reviewed storyboard markup. Preserve heading, real example data, demo label, and approval/returns note. Remove obsolete supply state classes/controls/styles tied to the 14-second clock; avoid parallel old/new animation systems.
- [ ] Replace the static supply import with a lazy section loader. Observe `#supply` with a 600 px root margin; load immediately when initial hash is `#supply`, and handle later hash navigation. Catch dynamic-import failures and leave the summary visible. If IntersectionObserver is absent, leave the static fallback.
- [ ] Add regression tests for asynchronous lifecycle using `initSupplyLoader`: import resolving after pagehide cannot initialize; a newer initialization invalidates an older pending setup; repeated initialization creates one controller; a rejected import does not prevent other page helpers. Use injected `loadModule` deferred promises, not real sleeps. Keep loader tests in `tests/velocity-supply.test.mjs` alongside the controller tests.
- [ ] Integrate pageshow/pagehide. Reinitialize from actual restored scroll position; do not restore the previous timed-stage WeakMap state. Wait for `document.fonts.ready` and request a safe refresh only if the current initialization is still active. Use ScrollTrigger's resize behavior and local remeasurement, with no per-scroll refresh loop.
- [ ] Verify `#supply` direct entry, back/forward restoration, late fonts, rapid resize mid-transition, and fast scrolling past the story. Check the following operations section starts at the right place and remains clickable after unpinning.
- [ ] Confirm the existing reorder preference listener, hero, inventory, operations, conversion, comparison, navigation, and analytics code remain intact. Delete the temporary prototype route only after production verification; retain the screenshot evidence and design docs.

## Task 5: Production verification and handoff

**Deliverable:** Reviewed production section, verification notes, and representative visual evidence.

- [ ] Run `node --test tests/*.test.mjs`; require no new failures. Verify the replacement tests prove scroll/lifecycle behavior and do not merely assert status text.
- [ ] Run `npm run build` and `git diff --check`; require a successful production build and no whitespace errors. Review the built Velocity entry to confirm GSAP is lazy-loaded and not injected into unrelated pages.
- [ ] Compare build output with Task 1's baseline and record incremental asset sizes. Inspect a browser performance trace of a complete forward/reverse run; check for layout work on every update, long tasks, jank, and continuing work after the section is inactive. Optimize only observed issues and record limitations of the test device.
- [ ] Inspect production browser playback and screenshots at the four holds and three transitions. Recheck responsive modes, reduced motion, keyboard skip, static/loading fallback, and restoration. Verify actual rendering rather than assuming mocked GSAP tests prove visual behavior.
- [ ] Review the diff for accidental adjacent-section changes and unrelated modifications. Do not reset uncommitted work, publish, or commit without a separate request.
- [ ] Record commands/results, viewport evidence, motion-review feedback, remaining limitations, and the verified preview URL in this plan. Mark complete only when large visible movement and natural scroll release have been observed.

## Definition of done

The scene visibly evolves from request to picking sheet to dispatch to receipt; movement communicates who acts and where the request/stock is going. Desktop scroll controls progression in both directions, with readable pauses and natural exit. Mobile and accessibility fallbacks remain useful. Product facts remain consistent. Tests/build pass, lifecycle cleanup is verified, and browser review confirms the effect is substantially more than a changing tag.

## Execution recommendation

Implement inline in the current checkout, preserving the current work. Start with the motion-study route and review the running result before production integration. This document is a plan, not evidence that the new experience has been built or tested.

## Motion-study checkpoint — 29 October 2026

- [x] Baseline captured: 73 tests passed; production build passed.
- [x] Added GSAP 3.15.0 through npm and a standalone dev route at `/prototypes/supply-scroll-story/`.
- [x] Implemented the four scene layouts, visible horizontal request/dispatch travel, expanding preparation/receiving sheets, staggered rows, readable chapter holds, and reverse scrolling.
- [x] Browser-reviewed desktop 1440×900 playback in both directions, dispatch and receiving states, natural release, skip focus/position, desktop-to-mobile transitions, short desktop 1024×700, and 390×844 / 320×700 mobile layouts. Observed no horizontal overflow at those tested widths.
- [x] Independent read-only review identified skip positioning, stale resize coordinates, and short-screen collision risks. Corrected skip to the actual end target; made starting transforms refreshable; added content-fit measurement and rebuild-on-resize. Browser recheck showed skip end target at 88 px below the 72 px navigation and zero pin spacers in flow mode.
- [x] Four new behavior tests cover forward/reverse chapter boundaries, invalid progress, actual skip-target calculation, and full-scene fit. All were observed failing before their implementation and passing afterward.
- [ ] User review of the running motion study.
- [ ] Production integration, lazy-loader lifecycle tests, full accessibility/reduced-motion runtime testing, and performance trace remain for the next phase.

Ruling: keep the current checkout and branch (`codex/velocity-product-page`) because the accepted plan explicitly preserves existing uncommitted work here. No commit or publication was made.

Ruling: the prototype uses `velocity-supply-story.mjs`, its own scoped `story.css`, and `tests/velocity-supply-story.test.mjs` alongside the old controller/tests. This intentionally preserves the existing production section until the motion-review checkpoint; the reviewed controller can replace the old module during integration. The page entry point and production supply markup/styles were not changed by this phase.

Ruling: compute pin eligibility from actual scene height and available canvas space, so some short desktop viewports use flow mode even above 700 px. This implements the spec's readability guard rather than shrinking the receipt into the progress indicator.

The study is not a completed production implementation. No runtime reduced-motion or performance-trace claims are made at this checkpoint. Browser screenshot exports require full (non-diffed) captures; incomplete diff exports were rejected.

Final checkpoint verification: all 77 tests passed; the standalone prototype build and existing production build both succeeded; `git diff --check` passed. The prototype bundle is 122.53 kB JS / 47.60 kB gzip including GSAP, plus 9.68 kB CSS / 2.94 kB gzip. Existing production Velocity output remains 29.18 kB JS / 8.85 kB gzip because the prototype is not yet integrated. One accepted screenshot shows the preparation-to-dispatch handoff; live browser scrolling is the primary review evidence.

## Production integration — completed 29 October 2026

The user reviewed the motion study and explicitly requested integration into the existing section. The production markup now carries all four visual scenes plus a static semantic summary, while retaining the existing section headline, supporting copy, and approvals/returns note. Prototype navigation and its ending section are excluded.

- [x] Replaced the old three-card/badge presentation inside `#supply`; removed obsolete presentation CSS while retaining the introduction.
- [x] Added `velocity-supply.css`, scoped entirely to `.velocity-page #supply`, including explicit dark document-title color to override the site's white headings.
- [x] Added the lazy loader and connected existing initial setup/pageshow/pagehide hooks. The loader imports the reviewed `velocity-supply-story.mjs` and uses its `initSupplyDemo` alias; the old timer controller is no longer imported by the page.
- [x] Added six loader regression tests: approach loading/cleanup, direct hash entry, stale import suppression, duplicate initialization, rejected imports, missing observer fallback, and font-ready direct-link alignment (some tests cover more than one condition).
- [x] Browser-verified production forward/reverse playback, request travel and preparation expansion, dispatch and receipt, fixed-navigation clearance, skip target/focus, direct `#supply` alignment, and working Ward operations tab in the following section.
- [x] Browser-verified 1440×900 desktop, 390×844 and 320×700 mobile with no horizontal overflow; mobile mode has no pin spacer. Verified 1024×768 pinned mode with 458 px canvas height accommodating the 417 px receipt. Short laptop styling suppresses the redundant bottom metadata line and reduces unused spacing.
- [x] Independent read-only integration review found no new must-fix defects. Final `node --test tests/*.test.mjs`: 83 passed, zero failed. `npm run build`, targeted ESLint checks, and `git diff --check` passed after the final CSS change.

Production output: Velocity entry 27.45 kB / 8.65 kB gzip; lazy supply-story chunk 119.49 kB / 47.06 kB gzip, including GSAP. No publication or commit was made. Verified source preview: `http://localhost:5173/velocity.html#supply`. The separate IPv4 preview on port 5173 had stale content; use the localhost development server for this checkout.

Ruling: retain the dev-only prototype route as a comparison reference, sharing the production animation controller. It is not a production build entry. Retain the previous untracked timer module/tests untouched as earlier local work; they have no active production import. Loader regressions live in their own focused test file rather than overwriting those tests.

Limitations: reduced-motion support and static failure fallback are implemented, but full assistive-technology testing, runtime OS preference switching, 200% zoom review, a performance trace, and back/forward restoration observation were not completed. Do not infer those checks from the unit suite. After the interruption the browser tabs were cleared; the final remaining 1024×700 viewport repeat could not be completed, although the prototype had previously been observed in flow mode at that size. The successful 1024×768 production check was completed after the final spacing change.

Accepted production screenshot: `/Users/anubhavjaidka/.codex/visualizations/2026/10/29/01a1880b-47b1-70b1-a558-5aa6e8f1e547/supply-scroll-story/integrated.jpg`.

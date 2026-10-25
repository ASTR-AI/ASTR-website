# Stock & medicines carousel implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Use superpowers:subagent-driven-development only if the user chooses delegated execution.

**Goal:** Replace Velocity’s stock-section placeholder/list layout with the approved neutral, horizontally scrollable feature cards.

**Architecture:** Keep semantic card content in `velocity.html` and responsive styles scoped to `#inventory` in `velocity.css`. Add a small progressive-enhancement controller in `velocity-inventory.mjs`, initialised from `velocity-page.js`; native scrolling remains usable without JavaScript. Retire inventory-only sticky/observer behaviour while retaining hospital-supply behaviour.

**Tech stack:** Existing static HTML, CSS, vanilla JavaScript ES modules, Vite; no new dependencies.

**Spec:** `docs/superpowers/specs/2026-10-25-inventory-carousel-design.md` (read alongside this plan).

## Global constraints

- Redesign only `#inventory` on the Velocity marketing page.
- The hero, navigation, other sections, destinations, and shared brand styles remain unchanged.
- No gold or bronze card accents or glows.
- Disable arrows at the ends; do not loop or autoplay.
- Normal vertical page scrolling stays intact.
- Without JavaScript, cards remain readable through native scrolling and inactive enhancement controls stay hidden.
- No additional product features, dependencies, routes, or forms are required.
- Use real dashboard imagery labelled **Dashboard preview** until approved inventory captures exist; never use the generated mockup as a real product screenshot.

## Review focus

1. Touch/trackpad scrolling: vertical scrolling must stay native; verify in Task 3.
2. Resize or zoom after navigation: active indicator and arrow availability must match the new card positions; verify in Task 3.
3. Keyboard and assistive technology: controls have names, focus is visible, hidden cards remain reachable, and announcements are restrained; verify in Task 3.
4. JavaScript disabled or motion preference changed: content remains available and navigation respects the current preference; verify in Tasks 1 and 3.
5. Existing page behaviour: hero appearance, inventory anchor, and hospital-supply highlights must survive removal of old inventory logic; verify in Task 3.

## File map

| File | Responsibility |
| --- | --- |
| `velocity.html` | Replace only inventory contents with heading, four semantic cards, image captions, and enhancement controls. |
| `velocity.css` | Add inventory-scoped styling; remove obsolete inventory-only grid/callout/sticky rules after checking references. |
| `velocity-inventory.mjs` (new) | Initialise native-scroll controls and derive current card state from actual geometry. |
| `velocity-page.js` | Initialise the controller and remove retired inventory observer code while preserving supply effects. |
| `docs/superpowers/plans/2026-10-25-inventory-carousel-verification.md` (during execution) | Record checks, results, screenshots, and asset limitations. |

## Task 1: Build the semantic, responsive card section

**Files:** Modify `velocity.html` and `velocity.css`.

**Interfaces:** Produce one `[data-inventory-carousel]` root within `#inventory`, a focusable `[data-inventory-track]` scroll region, four `[data-inventory-card]` articles with IDs `inventory-locations`, `inventory-batches`, `inventory-expiry`, and `inventory-units`, and an initially hidden `[data-inventory-controls]` group. Controls contain `[data-inventory-prev]`, `[data-inventory-next]`, four `[data-inventory-dot]` buttons in card order, and `[data-inventory-status]`.

- [ ] Capture baseline screenshots of the hero, current inventory section, and hospital supply at desktop and mobile widths. Record the current `#inventory` markup and old selectors so the scope can be checked later.
- [ ] Replace the placeholder and numbered callout list with the exact heading, intro, four headings/descriptions, and footer note from the spec. Give the section an accessible name through its heading. Use semantic articles; this is a carousel, not a tab interface.
- [ ] Place the existing dashboard image in each card as temporary preview imagery, with accurate alt text, intrinsic dimensions, lazy loading, and the visible caption **Dashboard preview**. Use undistorted crops only; no invented screens or data. Avoid repeating development-process messaging inside customer copy.
- [ ] Add native buttons labelled **Previous feature**, **Next feature**, and **Show Locations/Batches/Expiry/Packs & units**. Keep controls hidden until successful controller initialisation. Provide the scroll instruction outside the hidden controls so it remains useful without JavaScript.
- [ ] Add scoped tokens: dark card `#202124`, light card `#f4f5f7`, dark-card text `#f5f5f5`/`#c7c9ce`, light-card text `#17191d`/`#505660`. Use neutral borders and controls; use the existing serif for titles and a system sans-serif stack for descriptions/controls. Do not alter global font rules.
- [ ] Implement `overflow-x: auto`, `scroll-snap-type: x mandatory`, card `scroll-snap-align: start`, and a small visible native scrollbar. Start with 46% card width and 24px gaps above 1023px, 68% and 20px at tablet widths, and 88% and 16px below 768px. Leave trailing padding so the last card can align to the start. Tune against screenshots; avoid fixed card heights that clip text.
- [ ] Verify native horizontal scrolling at 1440px, 1024px, 768px, 390px, and 320px, including 200% zoom. The next-card preview is deliberate, but the document itself must not overflow horizontally. With JavaScript disabled, all four cards remain reachable and no dead buttons appear.

## Task 2: Add synchronised manual controls

**Files:** Create `velocity-inventory.mjs`; modify `velocity-page.js`.

**Interfaces:** Export `initInventoryCarousel(root: HTMLElement): (() => void)` from `velocity-inventory.mjs`. Initialisation queries Task 1’s hooks, attaches listeners, reveals controls after validation, and returns a cleanup function. `velocity-page.js` imports and initialises it once when the root exists. Internal `goTo(index: number): void` clamps to available cards, navigates the track only, and uses the current motion preference. Internal `sync(): void` derives the current card from the card start nearest the track’s visible start.

- [ ] Establish the failing behaviour in the browser: clicking the new arrows/dots does not yet navigate or update state. Record this as the baseline for the interaction checks; do not add a test framework for this section.
- [ ] Implement `initInventoryCarousel(root)` with a safe no-op cleanup if required elements are absent. Derive scroll targets from card and track geometry rather than a fixed width; no global wheel/touch interception or document scrolling.
- [ ] Wire previous/next to adjacent cards and dots to their specific cards. Focus stays on the activated control. Handle Left/Right/Home/End only when the track itself is focused; do not intercept keys in other page elements.
- [ ] Implement `sync()` through a requestAnimationFrame-throttled passive scroll listener and resize observation. Keep exactly one dot marked `aria-current="true"`; disable previous at the first card and next at the last. Use a dedicated inventory state selector so the page’s existing `.is-active` cleanup cannot affect it.
- [ ] Use **Feature N of 4: Name** for the accessible status. Update the polite live status once navigation settles, not on every pixel of scrolling; use a short debounced fallback rather than depending solely on `scrollend`. Respect reduced motion dynamically; no autoplay, timers for slide advancement, or looping.
- [ ] Integrate controller lifecycle safely: avoid duplicate initialisation after back/forward cache restoration, cancel pending animation/timer callbacks on cleanup, and keep controls functional on `pageshow`. Do not permanently destroy a cached page’s controller without restoring it.
- [ ] Remove inventory-specific `frame`, `callouts`, desktop/sticky handling, and observer branches from `velocity-page.js`. Keep the reduced-motion-aware supply-step observer. Search the repository before removing obsolete CSS selectors; preserve any selector still used outside inventory.
- [ ] Verify clicks, all four dots, direct scrolling, touch swipes, keyboard navigation, first/last boundaries, resize, and reduced-motion changes. After every navigation method, the current dot, status, and available arrows must agree with the visible card.

## Task 3: Verify appearance, accessibility, and page integration

**Files:** Review the four implementation files; create the verification record listed above.

**Interfaces:** Consume the finished `#inventory` section and controller; produce recorded check results and desktop/mobile screenshots, including a comparison against the approved mockup.

- [ ] Run `npm run build`. Expected: successful Vite production build, including `dist/velocity.html`, with no missing asset errors.
- [ ] Run `npx eslint velocity-page.js velocity-inventory.mjs`. Expected: no errors in changed JavaScript. Run `node --test tests/connect-form.test.mjs` as an existing page-integration regression check; expected: all tests pass. Do not broaden into unrelated cleanup.
- [ ] Preview the production build using the project’s existing preview command. Use the in-app browser and inspect the first, middle, and final card positions at 1440px and 390px, plus layout checks at 320px and 200% zoom. Compare mockup and implementation together; fix clipped copy, poor crops, excess gaps, inconsistent rounding, or weak contrast.
- [ ] On touch/trackpad, verify swiping moves the cards while ordinary vertical scrolling still moves the document. No scroll trap or horizontal document overflow is acceptable.
- [ ] At a middle card, resize desktop to mobile and back, then zoom. Verify the current indicator and end buttons match actual geometry and all cards remain reachable. Check the final card can align correctly despite trailing space.
- [ ] Traverse controls and the track with keyboard; verify names, focus rings, disabled end states, and Left/Right/Home/End behaviour. Check no offscreen focus becomes invisible, and the status announces settled changes without continuous chatter. Verify representative body/control contrast meets WCAG AA.
- [ ] Disable JavaScript and verify all card content is reachable by native scrolling and enhancement controls are hidden. Enable reduced motion, then change the preference while the page is open; control navigation should be immediate with motion reduced.
- [ ] Test `#inventory` entry from **Explore the system**, page refresh, browser back/forward, and the next section boundary. Compare the hero with the baseline and confirm the hospital-supply highlight behaviour still works.
- [ ] Inspect the final diff: only inventory markup/styles/controller integration and the verification record should change. Confirm no new dependency, hero change, unrelated section edit, invented inventory asset, or publishing action slipped in.
- [ ] Save screenshots and check results in the verification record. Report the local preview, what was tested, and the dashboard-preview asset limitation. Do not claim specialised inventory screenshots were delivered.

## Delivery and recovery

Implementation happens after plan review. Execute the three tasks sequentially in this chat by default if the user selects native execution. Review each task’s checks before moving on. Use the suitable current checkout after checking for user changes; do not reset or overwrite them. No push, deployment, or external publication is part of this plan. If a commit is requested, stage only the reviewed files after all checks pass. The implementation is recoverable by reverting its scoped changes without touching the rest of the page.

## Plan self-review

- Scope, exact copy, neutral palette, native fallback, four-slide controls, reduced motion, and accurate assets map to Tasks 1–2.
- Each of the five review-focus conditions has explicit verification in Task 3.
- Hook names and module exports match across tasks; no framework or dependency addition is needed.
- Remaining asset work is explicit: real inventory/batch/expiry/pack captures can replace labelled dashboard previews later.

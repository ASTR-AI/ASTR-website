# Velocity mobile responsiveness — implementation handoff specification

Date: 31 October 2026
Status: Proposed specification for owner review. The mixed layout approach is approved; this detailed specification still needs review before implementation.
Scope: `/velocity.html`, including its shared footer as rendered on this page. Other site pages are outside scope.

Handoff review: A fresh frontend reviewer checked this document for consequential unanswered implementation questions and reported “nothing important left.” This was a specification review, not verification of implemented mobile behavior.

## 1. Intent and decisions

Make the complete Velocity marketing page comfortable to read and operate on phones. Prevent crowded controls, overlapping panels, narrow text columns, and excessive vertical stacking. Preserve the existing visual identity, pharmacy copy, examples, and desktop experience.

The owner selected a mixed layout: fit headings and explanatory content to the viewport, use horizontal scrolling for repeated cards and choices, and retain accordions for longer explanations. This is responsive refinement, not a redesign.

Approaches considered:
- Stack everything: simple, but creates excessive page length and repeats large visual blocks.
- Make most content swipeable: compact, but conceals narrative content and actions.
- Selected mixed layout: vertical reading flow with explicitly bounded horizontal collections. Slightly more section-specific work, with better readability and discovery.

The exact dimensions and implementation choices below are author proposals, not additional preferences stated by the owner. Builders may settle incidental styling details within these constraints.

## 2. Evidence and limits

The current source already includes mobile navigation, an inventory carousel, operation tabs, a mobile Why Velocity accordion, comparison overflow, and a conditional bottom conversion bar. Extend these rather than replace them.

Specific source concerns:
- `velocity-hero.css` reduces some report labels to `0.43rem` below 600px.
- `velocity.css` stacks purchasing documents and capability cards vertically on phones.
- `velocity-operations.css` combines outer visual padding with inner document padding, leaving little document width.
- Comparison columns below 600px use viewport subtraction that becomes narrow at 320px.
- Responsive rules are distributed across multiple stylesheets and several breakpoint thresholds.

References supplied by the owner:
- https://openai.com/business/solutions/engineering/
- https://chatgpt.com/overview/?openaicom_referred=true

Their text was retrieved, but browser protection prevented visual mobile inspection. Do not claim this spec reproduces their mobile implementation. Local browser viewport emulation also failed during reconnaissance; current phone screenshots must be captured during implementation. Existing `docs/marketing/screenshots/` images show older content and are not current acceptance evidence.

## 3. Non-goals and hard constraints

- No new product claims, headline rewrites, illustrations, backend changes, routing changes, dependencies, or analytics events.
- Preserve all existing section IDs, form field names, links, data hooks, qualifications, and demo request behavior.
- Preserve existing in-progress work. At reconnaissance, `velocity.html`, `velocity.css`, and `velocity-motion.mjs` had uncommitted changes. Recheck status before editing; never restore those files to HEAD.
- No whole-page horizontal scrolling. Do not solve defects by hiding meaningful content with root overflow rules.
- Do not scale live HTML UI with `transform: scale()` or disable browser zoom to make it fit.
- Screenshots are illustrative images, not interactive applications. Their embedded text may scale; actual explanatory text and HTML controls must remain readable.
- Use native CSS overflow and scroll snapping. No carousel library, automatic card advancement, swipe-only interactions, or drag interception.
- Do not change desktop hero pinning/chapter timing, supply autoplay timing, or conversion-bar policy unless a verified responsive defect requires it.

## 4. Responsive contract

CSS pixel widths, independent of device names:

| Range | Required behavior |
| --- | --- |
| 320–359px | Narrow phone; 16px page gutters; phone country selector above number |
| 360–767px | Phone; 20px page gutters; mixed layout described below |
| 768–1023px | Tablet; 32px page gutters; preserve existing section-specific tablet arrangements unless they fail acceptance |
| 1024px and above | Preserve desktop layout; existing compact navigation up to 900px remains intentional |

New phone card rails switch at `max-width: 767px`. Preserve existing intentional thresholds: navigation 900px, operations/supply split layout 800px, Why Velocity accordion 860px, conversion bar 768px, desktop hero motion 1024px plus its existing height/preference conditions. Do not mechanically replace all breakpoints.

Phone design values:
- Main section padding: 56px top and bottom. Intro-to-content gap: 24px. Internal major block gap: 24px. Related small elements: 8–16px.
- Hero top padding: actual header height plus 32px; bottom padding 48px. Fixed header must never cover the category label.
- H1: `clamp(28px, 7.2vw, 36px)`, line-height 1.15. H2: `clamp(26px, 6.8vw, 32px)`, line-height 1.2. H3: 20–24px, line-height 1.3.
- Narrative body copy: 16px minimum, line-height 1.6. Captions, badges, table content, and illustrative HTML document labels: 12px minimum, line-height at least 1.4. Form controls: 16px minimum.
- Primary buttons, tabs, menu toggles, disclosure triggers, carousel arrow buttons: at least 44px high. Small position dots may retain a small visible dot inside a 44px hit area.
- Use existing font families, dark backgrounds, gold accents, borders, and focus styling. Reduce padding, oversized radii, decorative labels, and redundant gaps before reducing text.
- Phone-only authored `<br>` breaks in headings should become natural wrapping where needed; preserve meaningful text and emphasis.
- No fixed height on text-containing cards. Collections may stretch cards to the tallest member; nothing may be clipped to equalize heights.

## 5. Shared horizontal collection behavior

For inventory, purchasing document previews, and capability cards on phones:
- Each collection owns its overflow; the section header and surrounding page remain stationary horizontally.
- Use a 16px card gap and card width `calc(100% - 32px)` relative to the rail's content width. This exposes 16px of the next card at the initial position. Respect the page gutter; do not use viewport-wide negative margins.
- Use `overflow-x: auto`, `scroll-snap-type: x proximity`, start-aligned snap points, and `min-width: 0` on shrinking grid/flex ancestors. Ensure the last card can align fully without a clipped right edge.
- Provide a short visible hint and previous/next buttons. New purchasing/capability rails use the hint `Swipe or use arrows to explore`; preserve the inventory hint/counter if already equivalent. Rail names: `Purchasing documents` and `Medicine workflow features`.
- Buttons have accessible names `Previous purchasing document`, `Next purchasing document`, `Previous medicine workflow feature`, and `Next medicine workflow feature`. Disable at the corresponding ends, including after touch scrolling or resizing. Scroll by one card; keep focus on the activated arrow.
- Scroll the rail only; do not invoke vertical page navigation when changing cards. Avoid mandatory snapping, custom touch handlers, wheel hijacking, and autoplay.
- Keyboard users can focus and scroll the labelled rail using native keyboard behavior, and can use the buttons. All cards remain in logical DOM order and accessible; offscreen cards are not `aria-hidden`.
- Reduced motion uses immediate programmatic scrolling. JS unavailable: the rail still scrolls; enhancement-only controls stay hidden.
- Tablet/desktop: new purchasing/capability rail hints and controls are hidden; original grids return. No stale widths or scroll offsets may affect the restored grid.

## 6. Section requirements

### Header
Keep brand, Request a demo, and Menu on one row at 320px without collisions. The demo button and Menu each retain a 44px touch height. Reduce decorative gaps first. Keep existing 900px compact-menu threshold, nested Features disclosure, outside-click close, Escape behavior, and link-click close. Constrain expanded menu height to the visible viewport and allow vertical menu scrolling. No menu content may sit behind the conversion bar.

### Hero and benefit chapters
Use one centered reading column. Place the demo CTA above the secondary Explore the system link on phones. Dashboard images use full available width, intrinsic aspect ratio, and no forced desktop crop. Hide decorative session metadata when space is limited.

Keep the existing manual benefit disclosures and panel-selection behavior on phones. No phone pinning or scroll-controlled chapter progression. The HTML stock report must use natural height on phones: retain its existing heading, three example rows, demo-data label, and reporting caveat; simplify decorative chrome and whitespace to meet the 12px minimum. Do not replace it with new claims or duplicate it in a second mobile DOM tree. Switching panels must not overlap the chapters or next section. Keep the existing Key Capabilities list compact, wrapping within the viewport without squeezing badges into text.

### Inventory (`#inventory`)
Retain `initInventoryCarousel`, existing cards, position controls, counter, and arrows. Apply shared phone rail sizing and spacing without introducing a second controller. Each card's heading, description, and image remain fully visible. Dots/arrows do not collide at 320px; controls may occupy a separate row.

### Reordering (`#reordering`)
One heading/description column. Screenshot stays inside its frame, with meaningful content recognizable; a decorative crop is acceptable only if the separate existing summary explains the example. On phones the summary card is in normal flow below the screenshot, not absolutely overlaid. Retain all three explanatory workflow steps as compact vertical items; these are narrative, not another carousel.

### Purchasing (`#purchasing`)
Keep the three high-level steps visible above the documents as a compact wrapping sequence. They are explanatory labels, not tabs. Use a two-card horizontal rail for Purchase order then Goods receipt. Hide the desktop connector on phones. Each document is readable at the type minimums, with wrapping supplier/status fields and natural height. Keep the three explanatory purchase features below as compact vertical items separated by existing dividers; they are not rail content. Retain demo labels, purchase-to-receipt relationship, and existing example data.

### Hospital supply (`#supply`)
One column for explanatory content and one document stage below it. Keep existing workflow order, 5-second autoplay, Pause/Resume, static fallback, and reduced-motion behavior. Reduce shuffle displacement/rotation on phones as needed to keep all transformed corners within the stage. Layered background cards are decorative; only the active card is exposed by the enhanced controller as today.

The stage must accommodate the tallest of all four documents at the active width, including font loading and resizing. No document footers clipped, visible text collisions, or stage collapse between transitions. If natural grid overlap already accomplishes this, retain it; do not add JS height measurement unnecessarily. Table names, quantities, batch, and expiry remain readable and aligned. No extra horizontal rail inside this stage.

### Everyday operations (`#operations`)
Retain all four existing tabs and controller. One horizontal tab row; labels never wrap, shrink to illegibility, or stack. Keep selected tabs visible on click and keyboard selection, preserving ArrowLeft/ArrowRight/Home/End behavior and panel deep links. Active content is copy above visual on phones.

Limit the visual's outer padding to 12px and inner document padding to 16px on phones. Copy-panel padding: 20px (16px below 360px). Existing document/table text may wrap; preserve column relationships and amounts. Use natural heights, including the longest tab. Remove phone-only forced heading line breaks. Do not introduce horizontal scrolling inside an operations document to compensate for excess padding.

### Capability cards (`#features`)
Convert the three existing `.v-capability-card` articles inside `.v-capabilities-grid` into the shared phone rail. Keep each visual, title, and description together. Do not reorder, duplicate, or hide content. Keep product-availability qualifications below the entire rail, always visible. Restore the existing grid at 768px.

### Why Velocity (`#why-velocity`)
Retain the existing <=860px accordion and single stage relocation/controller. Expand content below its trigger. Remove unnecessary fixed/minimum stage heights on phones; accommodate actual content. Existing stock filters and other demo controls must wrap or fit with usable hit areas. Keep demo items, qualifications, and request link intact. No duplicate stages or nested sideways scrolling.

### Comparison (`#comparison`)
Keep the semantic three-column table and existing Show more disclosure. At <=600px, use a 140px capability column and two 220px content columns (580px total minimum table width). The wrapper owns horizontal scrolling; retain the first column's sticky position and opaque background. Use 12px horizontal cell padding and readable 14px text. Preserve all header relationships and demo/availability labels.

Show a visible scroll hint on compact screens. The last column must be fully reachable. Do not turn this into stacked cards or make its cells independently scrollable. The labelled scroll region must support keyboard focus. Expanded rows retain the same widths and sticky behavior.

### FAQ, demo request, and footer
FAQ: one column; questions wrap beside the disclosure icon, with comfortable hit areas. Answers must not overlap the next item.

Demo: one column at <=767px, including 640–767px where the current form has two columns. Card padding 20px (16px below 360px). Keep field labels/errors/status text in natural flow. Inputs/selects >=16px; country selector above phone input below 360px, otherwise 116px + remaining-width columns. Long organisation names, email addresses, and errors cannot expand the page. Preserve field names, validation, API payload, submit states, and privacy link. Never send a real enquiry during QA.

Conversion bar: preserve `shouldShowConversionBar` policy: hidden before the hero passes, while demo is visible, while compact menu is open, and when input focus or overlapping focused content makes it obstructive. Preserve measured bottom reservation and safe-area padding. Verify reservation actually prevents the last page content from sitting behind the bar; scroll-padding alone is not space reservation.

Footer: retain shared component and content. Apply Velocity-scoped wrapping/spacing overrides for long technical labels, email, address, and legal links. Do not modify shared footer markup/styles for all pages just to fix this page. No horizontally scrolling footer.

## 7. Implementation map and bounded work order

Existing architecture: Vite, vanilla HTML/CSS/ES modules, Tailwind utilities, existing Motion library, Node built-in test runner. No framework migration.

| File | Responsibility / expected changes |
| --- | --- |
| `velocity.html` | Minimal rail wrappers, names/hints/buttons; retain existing article content and hooks |
| `velocity.css` | Page geometry, nav, inventory, purchasing, capabilities, comparison, form, footer-scoped phone rules |
| `velocity-hero.css` | Phone hero/report sizing; avoid touching desktop pinning rules |
| `velocity-operations.css` | Final operations padding/typography overrides |
| `velocity-supply.css` | Phone supply document readability and contained shuffle geometry |
| `velocity-page.js` | Wire any new rail enhancement alongside existing initializers |
| `velocity-mobile-rails.mjs` (new, if needed) | One small reusable initializer for the two new native rails; cleanup and resize handling |
| `velocity-inventory.mjs` | Only if existing controller needs sizing/end-state adaptation |
| `velocity-operations.mjs`, `velocity-hero.mjs`, `velocity-why.mjs`, `velocity-conversion.mjs`, `velocity-supply.mjs` | Change only for a demonstrated responsive interaction defect |
| `tests/velocity-mobile-rails.test.mjs` (new, if JS added) | Rail end states, independent instances, resize and cleanup behavior |

Read actual stylesheet load order before editing: `velocity.html` links index, velocity, supply, and hero CSS; `velocity-page.js` also imports supply/operations CSS and the motion module imports motion CSS. Later or more specific rules may override earlier phone rules. Edit the owning rules; avoid a new pile of duplicate `!important` overrides. Scope all changes beneath `.velocity-page`.

Suggested delivery units, in order:
1. Page geometry, navigation, typography, form/footer, and conversion spacing.
2. Native purchasing/capability rails and inventory alignment, including keyboard/end-state behavior.
3. Hero, reorder, supply, operations, and Why Velocity preview refinements.
4. Full acceptance pass and targeted corrections; record evidence.

Keep changes local and inspect each unit before continuing. Do not refactor unrelated modules or reopen settled copy/design choices. If a requirement conflicts with actual controller behavior, document the concrete conflict before changing that behavior.

## 8. Acceptance and evidence

Required viewport matrix: 320x740, 360x800, 390x844, 430x932, 768x1024, 1024x768, and 1440x900. Also test 844x390 landscape. Inspect breakpoint transitions around 767/768, 800/801, 860/861, 900/901, and 1023/1024 where affected.

For every viewport:
- Confirm actual `window.innerWidth` matches the requested viewport before collecting evidence; report tooling limitations rather than substituting a desktop screenshot.
- `document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1`. Also inspect clipping: this metric can pass even if existing root `overflow: clip` masks a defect.
- Inspect every section after fonts load. All meaningful content is visible or intentionally reachable through the named rail/disclosure/tab, never merely clipped.
- No overlap between text, controls, table cells, badges, panel transitions, section boundaries, and fixed UI. Intentional decorative supply-card layering is allowed.
- Reach the last item of every rail/table, then return to the first. Verify arrows/dots stay in sync after touch/trackpad scrolling and resizing.
- At phone widths exercise all hero topics, all four operations tabs, all Why Velocity scenarios and filters, all four supply stages, comparison expansion, FAQ expansion, and nav Features menu. No state may reuse a clipped height from another state.
- Verify `#inventory`, `#supply`, `#operations`, and existing operation-panel hashes land below the fixed header after direct load and font loading.
- Verify portrait-to-landscape-to-portrait and phone-to-desktop-to-phone preserve usable controls, rail bounds, active panels, and navigation state.
- Repeat representative navigation, rail, and panel interactions with reduced motion. With JavaScript disabled, essential content remains reachable and enhancement-only controls are hidden.
- Keyboard: visible focus, reachable links/buttons/rails, working tab arrow navigation, Escape closes menu. At 200% zoom, no inaccessible/clipped text or controls.
- On actual iOS Safari and Android Chrome if available: touch rails, menu, safe area, virtual keyboard, form focus, and validation layout. If unavailable, explicitly mark real-device checks unverified; desktop emulation is not real-device verification.

Run `node --test tests/*.test.mjs`, `npm run build`, and `git diff --check`. Record actual results and separate pre-existing warnings/failures from new ones. Add focused behavioral tests when changing JS; avoid tests that only search CSS strings or duplicate implementation details. Use browser evidence for layout.

Save new representative screenshots under `docs/marketing/screenshots/mobile-responsiveness/`: phone hero, purchasing rail (first and last card), supply's longest stage, operations with last tab selected, capability rail, comparison scrolled right, and demo/footer; include tablet and desktop overview evidence. Record tested viewports, interaction states, failures resolved, and remaining unverified checks in a short verification note beside them. Do not overwrite older evidence.

## 9. Handoff instructions for the implementing AI

Start by reading this complete spec, applicable repository instructions, `package.json`, and the current target files. Review `git status` and preserve existing changes. Obtain owner approval of this specification before writing product code. Then create a short implementation plan from section 7 and implement in the current checkout unless repository instructions require isolation.

Do not spend time re-researching references, redesigning desktop, installing a UI toolkit, or generating new assets. Prefer CSS and native scroll behavior; share only the minimal new rail logic. Run existing tests once after coherent changes, rerun focused checks after fixes, and complete the viewport/interaction matrix. Finish with changed files, checks actually run, screenshots, and any genuine unverified device checks. Do not deploy, submit forms, discard existing changes, or claim checks passed without evidence.

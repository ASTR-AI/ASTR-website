# Velocity Product Page Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` if available to implement this plan task by task. Use another execution workflow if the destination project requires it. Steps use checkbox syntax for tracking. This handoff is for the ASTR AI website project, not the Velocity application repository.

**Goal:** Build a polished, accessible Velocity product page on ASTR AI's website that explains the pharmacy software in easy English and turns interested hospital and pharmacy buyers into demo enquiries.

**Architecture:** Add a dedicated product page using the website project's existing router, shared navigation, footer, design tokens, and contact mechanism. Render the complete content as semantic HTML, then progressively enhance selected product visuals with scroll-driven motion. Keep marketing content and media independent of the operational Velocity application and its API.

**Tech Stack:** Use the destination website's actual stack, determined in Task 1. Public `.html` links do not establish its source framework. Do not add React, a new router, a smooth-scroll engine, or an animation library merely because Velocity itself uses React.

**Spec:** Read `./astr-pharmacy-product-story.md` alongside this plan. It supplies the detailed feature explanations, FAQ answers, audience summaries, and evidence boundaries. This plan adds confirmed branding, website integration decisions, implementation tasks, and acceptance checks; it takes precedence for product naming, route, page order, and interactions.

## Global constraints

- Product name: **Velocity**. Brand attribution: **by ASTR AI**.
- Destination: **https://www.astrai.in/**. Work in that site's project; do not insert this marketing page into the Velocity dashboard.
- Default canonical path: **`/velocity`**. Follow existing routing and hosting conventions; do not change public URL structure elsewhere to achieve this.
- Plain-English product descriptor: **Pharmacy management software for hospitals and pharmacies.**
- Core promise: **Every medicine. Every movement. One clear view.**
- Primary CTA: **Book a demo**. Secondary hero CTA: **Explore the workflow**.
- Preserve the site's identity and shared navigation. This is one product page plus its existing listing links, not a company-wide redesign.
- Use real product screenshots with synthetic demonstration data. Visible numbers must be labelled **Demo data**.
- No connection to production medical, payment, stock, or user data. The page needs no Velocity login or operational API requests.
- No fabricated testimonials, customer logos, statistics, compliance badges, prices, or support promises.
- Forecasting supports a human purchasing decision. Accounting is an export workflow. Ward features depend on the enabled setup.
- Standard browser scrolling remains available. Essential text must be readable without animation or JavaScript enhancement.
- No deployment, DNS changes, new paid services, or live customer-enquiry submissions are part of this plan. Deliver a verified preview and implementation report for the website owner.

## Current-site findings and evidence limits

Reviewed 25 October 2026:

- Homepage: https://www.astrai.in/
- Solutions page: https://www.astrai.in/solutions (also linked publicly as `/solutions.html`).
- Current homepage product entry calls the product Velocity and links “Learn More” to the general Solutions page.
- Public Solutions content includes a Velocity ERP section with broader hospital/business claims. The inspected Velocity repository did not establish payroll, theatre logging, insurance-claim synchronisation, or a complete hospital-management suite. Replace those claims within Velocity's listing when integrating this page; do not copy them into the new product page.
- The captured homepage has a near-black background, gold logo and particle artwork, translucent rounded navigation, fine outlines, and editorial heading typography. Reuse exact source tokens and font definitions after opening the website repository. The screenshot does not establish exact CSS values.
- Website text fetched through web tools and the live browser did not expose identical amounts of content at the same instant. Some content appears dynamically. The implementing AI must locate the actual source and recheck current routes; do not assume content missing from one observation has been deleted.
- The visual identity was inspected in the live browser. Capture a fresh reference in the destination project; no reusable screenshot is included in this package.
- The website source repository, build commands, contact endpoint, and deployment configuration were not available in this planning project. Task 1 resolves them before coding.

## Visual direction

Use ASTR AI's dark and gold identity with the focus and pacing of a premium product launch. Large headlines, generous space, restrained gold accents, and readable product screens should carry the page. Existing technical reference labels may appear as small decorative metadata, but the main story must speak to hospital and pharmacy staff.

Use the site's existing editorial heading font for the product identity and short headlines if it remains readable. Use its readable body font for explanations. Do not force long explanations or essential buttons into widely tracked uppercase text. Source the existing logo; do not redraw it.

Use screenshots of Velocity's actual light or dark interface inside quiet image frames. Preserve the application UI's appearance rather than recolouring its badges, charts, or controls to match the gold marketing page. The Velocity application design guide governs those captures, not the structure of the separate company website.

Avoid generic hospital stock photography as the hero. Avoid decorative graphs, fake dashboards, pill-shaped 3D scenes, robot imagery, console logs, and exaggerated metrics standing in for product evidence. A subtle existing brand background is acceptable if it does not compete with the screen or headline.

## Page structure and exact anchor contract

Use one visible H1. “Velocity” can be a separate product label above the H1. Each chapter has an H2 and a short paragraph. Start from the following copy; fuller descriptions and FAQ answers are supplied in the accompanying story document.

| Order / anchor | Copy and purpose | Visual / interaction |
| --- | --- | --- |
| 1 / `#overview` | Product label: **Velocity by ASTR AI**. Descriptor: **Pharmacy management software for hospitals and pharmacies.** H1: **Every medicine. Every movement. One clear view.** Body: “Manage medicine purchases, stock, billing, and hospital supply in one connected system. See what is available, what needs attention, and what your team needs to do next.” | Actual dashboard hero. `Book a demo` links to `#demo`; `Explore the workflow` links to `#workflow`. |
| 2 / `#workflow` | **A busy pharmacy needs clear answers.** “Is this medicine available? Where is it stored? Has the ward received its supply? Which supplier still needs to be paid? Velocity brings these everyday questions into one connected workflow.” | Compact overview: Purchase → Receive → Store → Supply → Sell or use → Review. Explain that this is an overview, not a rigid sequence for every transaction. |
| 3 / `#inventory` | **Know what you have. And where it is.** “Check medicine stock across your warehouse, pharmacy, and hospital locations. Follow batches and expiry dates, and see quantities in the packs and units your team uses.” | Inventory capture with location, batch, expiry, and quantity callouts. |
| 4 / `#reordering` | **Plan your next order with a clearer picture.** “Review reorder suggestions based on available stock and past use. See which medicines need attention and use the recommendations to prepare purchase orders.” | Reorder view; user review remains explicit. |
| 5 / `#purchasing` | **From order to received stock. Keep every step clear.** “Create purchase orders, review approvals, and record the medicines you receive. Keep supplier bills and payment records connected to your purchasing work.” | Order and receipt screen pair. |
| 6 / `#supply` | **Keep your pharmacy and hospital store connected.** “Follow supply requests through picking, dispatch, and receipt. See what is being prepared, what has been sent, and what has arrived.” | Four-step warehouse-run narrative. Rejected deliveries have a return workflow; do not imply every request is accepted. |
| 7 / `#daily-work` | **Ready for the counter. Connected to the ward.** Counter: “Create sales, record payments, review transaction history, and download bills.” Ward: “Record medicines issued to wards, track consumption, and manage returns to the pharmacy.” | Two labelled views with **Pharmacy counter** and **Hospital ward**; default to stacked sections rather than hiding important material in tabs. |
| 8 / `#accounts` | **Make the next accounting step easier.** “Keep supplier payment records organised and prepare pharmacy data for your accounts team. Export Tally XML and GST audit spreadsheets from the accounting workspace.” | Export preview and file-type labels. No suggestion of automatic tax filing. |
| 9 / `#visibility` | **See what needs your attention.** “Review stock, purchasing, supplier, hospital, and financial reports. Find low-stock items, stock nearing expiry, and medicines that move slowly.” Support line: “Role-based access and approval workflows help organise responsibilities.” | Report capture with visible period and freshness. |
| 10 / `#features` | **Explore what Velocity can do.** Include all feature-index rows from the companion story document and its audience summaries. | Accessible grouped lists. Groups: Stock and medicines; Purchasing and suppliers; Pharmacy and hospital supply; Reports, accounts, and access. No search feature is necessary for this list. |
| 11 / `#faq` | **A few questions, answered.** Include the six supplied product FAQs. | Use the existing accessible accordion or native `details`/`summary`; answers available to keyboard users and search engines. |
| 12 / `#demo` | **See how your pharmacy could work with a clearer view.** “Explore stock, purchasing, billing, and hospital supply in a demo built around your team's needs.” | Existing enquiry integration, with Velocity as the product context. |

Do not add claims about reductions in waste, revenue increases, medical error prevention, instant onboarding, or unlimited scale. Explain available capabilities and intended benefits without inventing results.

### Existing product-listing copy

Use wherever Velocity is already listed on the homepage and Solutions page:

- Name: **Velocity**.
- Descriptor: **Pharmacy management for hospitals and pharmacies.**
- Body: **Connect medicine stock, purchasing, billing, hospital supply, and accounting exports in one system. Get a clearer view of what is available and what needs attention.**
- Link: **Explore Velocity →**, destination `/velocity`.

Remove or rewrite unsupported claims only inside those Velocity entries. Preserve ORBIT EMS and unrelated company content.

## Motion specification

These are implementation defaults for this page, not inferred measurements from Apple or ASTR AI.

| Scene | Desktop behaviour | Mobile / reduced motion |
| --- | --- | --- |
| Hero | Product frame settles from scale 0.97 to 1 and translateY 16px to 0 over 700ms, once. Text and CTA are visible before animation. | Static frame below 768px or for reduced motion. |
| Inventory | From 1024px viewport width and 720px viewport height, image may remain sticky beside four normal-flow explanations. Active callout follows the visible explanation using IntersectionObserver. No forced scrolling. | Stack image and explanations; show all labels without scroll-dependent visibility. |
| Supply | The four workflow steps receive emphasis as their explanations enter view. Optional transform/opacity transitions, 250ms. Keep all step names visible. | Simple ordered list with each state visible. |
| Other chapters | Optional once-only reveal, opacity 0.85 to 1 and translateY 12px to 0 over 350ms. Text stays fully visible if script fails. | No positional motion for reduced-motion users. |

At most one substantial sticky product sequence on the page. Account for the shared navbar height with a CSS variable. Disable sticky scenes at short viewport heights or when content would clip. Screenshots may crossfade in the same reserved frame; do not make the document jump between image sizes. No canvas/WebGL dependency, autoplay audio, endless decorative loops, scroll lock, or custom wheel handling is required.

Use CSS and IntersectionObserver if sufficient. Reuse an installed animation library when it simplifies implementation. Add a new one only with a documented need; implement static layout first.

## Asset contract

Prepare the following assets in the website's existing static-asset convention; suggested logical names are given, not assumed current paths:

| Asset stem | Required subject |
| --- | --- |
| `velocity-dashboard` | Dashboard with synthetic stock/activity data |
| `velocity-inventory` | Inventory with batch, expiry, location, and pack information |
| `velocity-reorder` | Recommendation list and review controls |
| `velocity-purchasing` | Purchase order or goods receipt |
| `velocity-supply` | Warehouse run and its visible state |
| `velocity-counter` | Pharmacy checkout using synthetic customer data |
| `velocity-ward` | Ward issue/consumption workflow |
| `velocity-accounting` | Tally XML and GST audit export preview |
| `velocity-reports` | Report showing date range and demo data |
| `velocity-social` | 1200 × 630 social preview using approved brand/product assets |

Use AVIF/WebP with fallback as supported by the current image pipeline. Supply width/height and responsive sizes. Target at least 1600px source width for desktop product screenshots; use targeted crops for legible mobile detail. Avoid browser/desktop chrome unless it adds useful context.

An ASTR homepage capture is a brand reference only, not a Velocity product asset. Healthray images are reference material only and must not appear in the finished page.

If actual product captures are missing, build the text/layout and reserve dimensions in development. Record missing asset names in the handoff and block release until real captures are supplied. Do not generate synthetic dashboard images and present them as shipped UI. Synthetic demo records inside actual Velocity screens are appropriate.

## Proposed file responsibilities

The source website is not available here. Task 1 must map the following logical units to exact destination paths in a short implementation map before edits. These are responsibilities, not instructions to create an unnecessary framework:

- Route/page: `/velocity` document and metadata.
- Product content: headings, feature groups, FAQs, and media descriptions in the project's existing content/data format.
- Product styles: page-scoped styles using shared brand tokens.
- Motion enhancement: one page-scoped module, with listener/observer cleanup.
- Product assets: approved captures and social image.
- Existing listings: homepage Velocity entry and Solutions Velocity section.
- Routing/hosting metadata: route registration, sitemap, and redirects if required.
- Verification note: exact commands run, viewport evidence, CTA behaviour, remaining blockers.

For a static site, a `velocity.html` source plus scoped CSS/JS may be sufficient if the host already exposes extensionless routes. For a framework site, use its existing page/component conventions. Do not create both versions.

## Review focus

1. Slow or failed media: page text, CTA, layout stability, and meaningful image alternatives remain usable.
2. Reduced motion, keyboard use, zoom, and short screens: no hidden copy, focus traps, or sticky overlap.
3. Direct navigation to `/velocity` and legacy `.html` conventions: one canonical destination with working refresh and back navigation.
4. Enquiry failure or missing endpoint: no false success, lost input, or nonfunctional primary CTA.
5. Other website pages: product styles and observers must not alter the homepage, Solutions layout, ORBIT listing, or global navigation.

---

### Task 1: Inspect the website project and record integration paths

**Files:** Read destination `AGENTS.md`, package/build manifest if present, navigation/footer sources, route configuration, homepage/Solutions sources, contact implementation, and token/styles sources. Create an implementation map in the destination project's documentation convention.

**Interfaces:** Consumes this plan, companion story, and destination source. Produces exact source paths, route mechanism, asset root, shared token names, build commands, contact destination, and installed motion tools.

- [ ] Read project instructions before edits; use its knowledge graph first if required and available.
- [ ] Locate existing Velocity entries by their product name and inspect their current links and copy.
- [ ] Locate the canonical logo, fonts, colors, navigation, and footer. Reuse actual source values.
- [ ] Inspect contact handling. Identify whether it supports product context and whether an existing form can be reused safely.
- [ ] Write the implementation map with exact destination paths and commands. Do not leave placeholder filenames in the execution report.
- [ ] Run the project's existing build/check baseline; record existing failures separately. Use the Node version required by that project before Node commands.

**Acceptance:** The implementer can name the exact files that will change and can explain how direct routing and demo enquiries will work. If the website repository is unavailable, request access/location; do not modify Velocity as a substitute.

### Task 2: Build the complete static page and content

**Files:** The mapped route/page, product content, page styles, asset references, and shared-shell integration.

**Interfaces:** Produces all anchor IDs from the page-structure table. Native links target those IDs. The complete story and FAQ content exist before motion code runs.

- [ ] Register `/velocity` using the existing routing pattern and reuse shared navigation/footer.
- [ ] Implement all twelve sections in the specified order, using the companion document for expanded feature and FAQ content.
- [ ] Include the Velocity product label, exact H1, plain-English descriptor, and both hero actions.
- [ ] Group the full feature index and audience summaries so independent pharmacies can distinguish shared capabilities from hospital modules.
- [ ] Add approved product captures with explicit dimensions, useful alt text, and a visible Demo data caption.
- [ ] Implement the responsive layout first: 360px and 390px single-column, 768px tablet, and 1280px/1440px desktop. No horizontal page overflow at 320px or 200% zoom.
- [ ] Inspect with motion code disabled and with a deliberately failed image request. Confirm every explanation and CTA remains readable, image frames reserve their space, and alternatives make sense.
- [ ] Run the project's build/lint checks for the changed scope and record a checkpoint commit if that is the repository's normal workflow.

**Acceptance:** The page explains the product without scrolling effects. Missing real product assets remain explicit release blockers; never fill the gap with invented UI.

### Task 3: Add progressive scroll storytelling

**Files:** Mapped page-scoped motion module and styles; route lifecycle integration if the site uses client navigation.

**Interfaces:** Consumes the existing section anchors and media containers. Reads `prefers-reduced-motion`; observes the inventory explanations; writes only page-scoped presentation state.

- [ ] Implement the motion table, using existing tools or CSS/IntersectionObserver.
- [ ] Enable the inventory sticky sequence only when viewport width is at least 1024px and height at least 720px. Ensure the actual content also fits; fall back to normal flow when it does not.
- [ ] Keep native document scrolling and ensure no animation completion is required to read or click anything.
- [ ] Respect reduced motion on initial load and when the preference changes. Remove listeners/observers when navigating away.
- [ ] Verify desktop scroll down/up, narrow view, short landscape view, reduced motion, and client navigation away/back. Confirm no stale emphasis, clipping, jump, or duplicate observers.
- [ ] Use browser performance tools to check that reading/scrolling does not trigger repeated layout work or long animation tasks. Simplify effects if it does.

**Acceptance:** Motion clarifies the inventory and supply story, with a complete static alternative and no effect on other routes.

### Task 4: Integrate demo enquiries and existing Velocity listings

**Files:** Existing enquiry integration, local demo section, homepage Velocity entry, Solutions Velocity entry, route links.

**Interfaces:** Every primary CTA reaches `#demo`. The demo section invokes the existing validated contact mechanism with Velocity context when supported.

- [ ] Reuse the existing contact component/handler if available. Keep current privacy and consent behaviour; do not invent a new lead backend.
- [ ] Prefer fields for name, hospital/pharmacy name, contact, and business type. Avoid collecting patient or prescription information. Adapt field names to the actual endpoint contract.
- [ ] If reusing the existing contact page is necessary, make `#demo` explain the next step and provide a working link there with product context using the site's supported mechanism.
- [ ] If no working form exists, use a visible fallback link to `mailto:hello@astrai.in?subject=Velocity%20demo%20request` and show the email address. Do not show a form with simulated success.
- [ ] For any custom form state introduced, test invalid input, pending state, duplicate submission prevention, API rejection/network failure, preserved input on failure, and confirmed success. Use the existing test framework; do not install a heavy test suite for the landing page.
- [ ] Verify form transport with a mock or approved staging endpoint; do not send a test enquiry to the live business inbox.
- [ ] Update only the existing Velocity listings with the specified copy and `/velocity` link. Replace the unsupported Velocity-specific broader claims identified above.
- [ ] Inspect homepage, Solutions, and ORBIT areas after the change to confirm shared layout and unrelated content remain intact.

**Acceptance:** Every primary CTA has a working, honest destination. No enquiry is reported successful without an actual success response. Both existing product listings lead to the dedicated page.

### Task 5: Add metadata, verify, and hand off

**Files:** Page head/metadata, sitemap if present, necessary hosting route configuration, social asset, and verification note.

**Interfaces:** Canonical URL is `https://www.astrai.in/velocity` unless the destination project proves a different existing canonical-host policy. Route aliases resolve to that single canonical form.

- [ ] Set title: **Velocity | Pharmacy Management Software | ASTR AI**.
- [ ] Set description: **Manage pharmacy stock, purchases, billing, ward supply, and accounting exports with Velocity by ASTR AI. Built for hospitals and pharmacies.**
- [ ] Add canonical, Open Graph, and social image using the site's existing metadata mechanism. Add the route to the sitemap when one exists.
- [ ] Add SoftwareApplication structured data only with known factual fields. Do not invent offers, ratings, reviews, operating-system requirements, or availability claims. Structured data is optional; accurate visible content takes priority.
- [ ] Verify direct entry and refresh at `/velocity`, homepage/Solutions inbound links, native back navigation, anchor offsets under the header, and unknown-route behaviour. Add redirects only for actual aliases introduced or already published for this page.
- [ ] Verify keyboard navigation, visible focus, heading order, FAQ controls, meaningful links, 200% zoom, touch targets, and reduced motion. Check text contrast against actual gradients/backgrounds: at least 4.5:1 for normal text and 3:1 for large text.
- [ ] Verify 360 × 800, 390 × 844, 768 × 1024, 1280 × 720, 1440 × 900, and one short landscape viewport. Capture the hero, a middle chapter, the feature reference, and demo section.
- [ ] Optimise image sizes and loading. Prioritise the hero image; lazy-load lower images and use explicit dimensions. Avoid placing the hero behind an animation or loading gate.
- [ ] Run the established lint/build and any meaningful tests added for form/motion state. Target mobile Lighthouse Performance at least 90 and Accessibility at least 95 on the production build; report actual values and conditions. Lab LCP ≤2.5s and CLS ≤0.1 are targets, not measured guarantees. Do not claim field INP without field data.
- [ ] Record changed files, exact verification commands/results, final route, CTA destination, asset provenance, screenshots, and any remaining blockers. Supply the preview/branch/PR according to the website project's conventions. Do not publish as part of this task.

**Acceptance:** A reviewer can inspect the actual page, verify its claims against the companion content, follow its links, assess mobile/motion behaviour, and see precisely what remains before release.

## Definition of done

The page is complete when it looks native to ASTR AI, clearly identifies Velocity, explains all supplied product areas in easy English, demonstrates real software, works on mobile and with reduced motion, connects every CTA to a verified destination, and passes the relevant checks. The implementation report must distinguish completed work from unavailable product assets or unresolved business terms. A placeholder screenshot, fake form response, or merely successful build does not meet this definition.

## Handoff contents

Transfer these documents together into the website project or attach the supplied archive:

1. This implementation plan.
2. `./astr-pharmacy-product-story.md`.
3. `./velocity-website-ai-prompt.md`.

The copy-ready starting prompt is in `./velocity-website-ai-prompt.md`. These sibling paths match this website repository. The original portable archive retains its own directory structure; use the filenames listed in its README when opening that archive.

## Source references

- ASTR AI homepage: https://www.astrai.in/ — product listing, company identity, and visual context.
- ASTR AI Solutions: https://www.astrai.in/solutions — existing Velocity entry and integration points. Published wording is not independent proof of product capability.
- Healthray: https://healthray.com/pharmacy-management-system/ — reference for category explanation, audience segmentation, feature coverage, and FAQs. Do not copy their prose/assets or attribute their customer results to Velocity.
- Apple: https://www.apple.com/macbook-pro/ — structural inspiration for highlights, imagery, and deeper explanation. This plan does not assert that Apple's animation implementation was inspected.
- Companion story: contains the inspected Velocity source paths and the distinction between implementation evidence and production acceptance.

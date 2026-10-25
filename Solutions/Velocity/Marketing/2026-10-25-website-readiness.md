# Velocity website readiness and implementation map

Reviewed 25 October 2026. This report prepares the supplied plan for this repository. It does not claim that the product page is implemented or ready to release.

## Readiness decision

The supplied narrative is detailed enough to build a static development preview: twelve sections, eighteen feature rows, six audience summaries, six FAQs, and explicit motion and publication boundaries. No framework migration is needed.

Release still requires approved product captures and a verified enquiry path. The current form needs response validation before it can be a dependable demo destination. These gaps do not prevent independent copy/layout work with clearly labelled development placeholders.

This pass changes documentation only. No page, public listing, form behaviour, deployment, or operational Velocity connection has changed.

## Documents reviewed

- `2026-10-25-velocity-website-handoff.md`: takes precedence for naming, route, copy defaults, page order, motion, and acceptance criteria.
- `astr-pharmacy-product-story.md`: expanded copy, feature index, audience summaries, FAQs, and evidence boundaries.
- `velocity-website-ai-prompt.md`: execution brief subordinate to the detailed documents.
- `velocity-website-ai-handoff.zip`: inventory and README inspected. This contains documents, not product screenshots. Its internal directory structure differs from the loose files here.

Use the loose Markdown files for work in this repository. Their local cross-references are corrected as part of this preparation; the ZIP remains the original portable handoff and does not contain this report. Historical statements that website source was unavailable describe the earlier planning context; this report resolves those unknowns.

Content corrections required:

- Homepage Velocity card: replace the complete-hospital/business-platform positioning with the supplied pharmacy-management copy.
- Solutions `#velocity`: replace the ERP heading, hospital/business subtitle, payroll, patient registry, theatre logging, automatic procurement, insurance syncing, GST-compliance implication, capital-flow tracking, and automated-audit claims with the supplied evidenced capabilities.
- Preserve human review of reorder recommendations; describe accounting as exports; qualify ward features by configured setup. MR means medical representatives.
- Omit unconfirmed prices, onboarding promises, certifications, customer proof, and measured results. Capability evidence in the story comes from the supplied operational-repository review and was not independently re-audited here.

## Verified repository integration

| Concern | Source and finding |
| --- | --- |
| Architecture | Root HTML documents with vanilla JS and explicit Vite inputs in `vite.config.js`. React is installed but the existing page architecture does not require it. |
| Hosting | `vercel.json`: `cleanUrls: true`, build `npm run build`, output `dist`. Registering `velocity.html` fits `/velocity`; direct production paths and alias redirects still need verification. |
| Shared shell | `components.js` registers `astr-navbar` and `astr-footer`. Existing pages import it through `main.js`; a dedicated Velocity module can import it directly. |
| Styling | `index.css`, `tailwind.config.js`, and font links in HTML. Root HTML files are already in Tailwind's content scan. |
| Brand | Gold `#E6CD99` / `--color-gold-DEFAULT`, dim gold `#cba864`, black `#121212`; Solutions also uses `#050505`. Lora, Cinzel, Geist Variable, and JetBrains Mono are configured. Lora suits the editorial identity; Geist is available for readable body copy. |
| Logo | `/Pictures/logo-optimized.webp`, already used by navbar/footer. |
| Motion | Existing pages load GSAP/ScrollTrigger and Three.js via CDN. CSS and IntersectionObserver suffice for the new page; no new dependency is needed. |
| Global behaviour | `main.js` includes scenes, manual scroll restoration, hash handling, service-worker registration, and analytics. Shell reuse does not require importing all those behaviours. |
| Contact | Inline `connectForm` handler in `connect.html`, JSON POST to `https://formsubmit.co/ajax/hello@astrai.in`. No live submission was made. |
| Privacy | Footer links to `mission-docs.html#privacy` and `#terms`; preserve these destinations. |
| Metadata | `public/sitemap.xml`, `public/robots.txt`, and existing canonical tags use `https://astrai.in` without `www`. |
| Cache | `public/sw.js` precaches existing pages and dynamically caches navigations. An uncached offline navigation can fall back to the homepage; test fresh and existing worker state. |

No AGENTS.md, CLAUDE.md, Node-version pin, or test files were found in the repository search. Baseline checks used Node v24.12.0 and npm 11.6.2.

## Proposed exact file map

These are next-step changes, not code written during this pass.

| Path | Responsibility |
| --- | --- |
| `velocity.html` — new | Static semantic story, one H1, twelve anchors, eighteen features, six audience summaries, six FAQs, demo section, metadata, and shared shell elements. Essential copy lives in HTML. |
| `velocity.css` — new | Page-scoped layout and motion rules, responsive image frames, focus states, navbar offsets, reduced-motion and short-screen overrides. |
| `velocity.js` — new | Import `components.js`; progressively enhance inventory/supply. Avoid importing the whole `main.js` solely for navbar/footer. Keep any analytics consistent with existing use without importing scene code. |
| `vite.config.js` | Add the `velocity.html` build input. |
| `index.html` | Update only the Velocity card near “Card 1: Velocity ERP”; supplied copy and `/velocity` link. |
| `solutions.html` | Update only `section#velocity`, including capabilities and CTA. Keep its anchor for existing inbound links; preserve ORBIT. |
| `connect.html` | If contact-page reuse is chosen, implement explicit product context, pending guard, HTTP/service-result validation, and retry behaviour preserving input. |
| `public/Pictures/velocity/` — new | Approved responsive product captures and social preview. |
| `public/sitemap.xml` | Add the final canonical Velocity URL when the page is ready. |
| `components.js` — conditional | Small shared mobile-menu semantic correction if required by keyboard verification; preserve the existing appearance. |
| `tailwind.config.js` — conditional | No change for HTML utilities. Add `velocity.js` to the content scan if it introduces utility classes; prefer state classes styled in `velocity.css`. |
| `public/sw.js`, `vercel.json` — conditional | Change only if route/cache verification demonstrates a need. Do not introduce a catch-all SPA rewrite. |

The shared mobile hamburger is currently a clickable `div` without button semantics or expanded state. Verify keyboard operation and address this small shell issue for the new page. Custom-element navigation/footer also depend on JavaScript today. No-script verification must distinguish the existing shell limitation from the requirement that the new story remain readable.

## Enquiry findings and proposed contract

The existing Solutions CTA uses `connect.html?subject=Velocity_ERP_Demo`. The contact script only reads `params`, with infrastructure/drone/AI handling; it ignores `subject`. The hidden `_subject` remains generic, so Velocity context is lost.

The handler parses JSON and presents success without checking `response.ok` or a service acceptance value. A JSON rejection can reach the success presentation. Pending state changes pointer events without a disabled button and explicit in-flight guard. These are source findings; inbox delivery has not been tested.

Recommended next-step proposal: hero CTAs target `#demo`; that section explains the next step and links to `/connect?product=velocity`. Add allowlisted product handling to the existing form, prefill an editable demo message, and submit an explicit product field and Velocity subject. Preserve the existing fields (`name`, `email`, `org`, `industry`, `message`) and transport. Do not overload industry with the product name.

Before implementing a success predicate, inspect the service's actual accepted-response contract. Verify with mocked responses: acceptance, HTTP errors, service rejection, invalid JSON, network failure, duplicate submission, and input retention. No live business-inbox tests. Until transport is verified, show `hello@astrai.in` and `mailto:hello@astrai.in?subject=Velocity%20demo%20request` as the honest fallback; opening a mail client must not imply that an enquiry was sent.

## Asset readiness

`public/Pictures/velocity_Mockup.png` is 4340 × 2641. Visual inspection shows a laptop-framed dashboard with “Test Admin,” numeric metrics, and partial application content. It has no visible Demo data label. Provenance, current-version accuracy, and approval are not established here. Review it for possible dashboard reuse; it cannot demonstrate the other required workflows.

| Missing approved stem | Required subject |
| --- | --- |
| `velocity-dashboard` | Current dashboard with synthetic records and plausible demonstration values |
| `velocity-inventory` | Location, batch, expiry, packs and loose units |
| `velocity-reorder` | Suggestions and human review controls |
| `velocity-purchasing` | Order and receipt views; the story requires a pair |
| `velocity-supply` | Enough request/picking/dispatch/receipt frames to support the narrative |
| `velocity-counter` | Counter sales with synthetic customer information |
| `velocity-ward` | Ward issue/consumption and supported returns |
| `velocity-accounting` | Export preview, Tally XML and GST spreadsheet types |
| `velocity-reports` | Report with visible period and freshness |
| `velocity-social` | Approved 1200 × 630 social preview |

Capture actual screens with synthetic records, aim for at least 1600px desktop width, prepare legible mobile crops, add visible Demo data captions, and record provenance/approval. Development can reserve dimensions without inventing product UI.

## Canonical URL proposal

Use `https://astrai.in/velocity` to match existing source canonicals. The handoff allows the repository's canonical-host policy to override its `www` default. Keep inbound links `/velocity`. Verify actual hosting redirects for `/velocity`, `/velocity.html`, and both hosts before release. This review establishes the source convention only; it did not inspect live domain settings or change DNS. Preserve other pages' public URL structure.

## Baseline verification

| Check | Result before product changes |
| --- | --- |
| `npm run build` | Passed; Vite generated all nine existing HTML documents. |
| Build warnings | CSS minifier warnings for `@theme` / `@utility` from the existing `tw-animate-css` import, plus stale Browserslist data. Avoid adopting incompatible utilities; investigate separately if they affect this page. |
| `npm run lint` | Failed: 32 errors and 8 warnings. 31 errors are reported auto-fixable formatting issues; one is `no-useless-assignment` in `solutions.js`. Findings also occur in `components.js`, `main.js`, and HTML-fix scripts. Do not run repo-wide auto-fix for the landing page. |
| Assets/archive | Existing dashboard mockup visually inspected; no approved workflow capture set supplied. |
| Enquiry | Source inspected only. Neither service acceptance nor inbox delivery verified; no live submission. |

Build output is ignored; no tracked build files changed. No browser layout, route, accessibility, Lighthouse, or end-to-end form checks were performed in this preparation pass. Build success alone does not establish those results.

## Proposed execution order and acceptance

1. Confirm the supplied workflow-led direction. Alternatives in the story are audience-led (early segmentation, repeated shared content) and feature-led (fast requirements lookup, weaker introduction). Workflow-led is recommended because the copy and planned captures follow medicine movement.
2. Build static content and register the Vite input. Exact anchor order: `overview`, `workflow`, `inventory`, `reordering`, `purchasing`, `supply`, `daily-work`, `accounts`, `visibility`, `features`, `faq`, `demo`.
3. Correct only the Velocity listings and links. Preserve `solutions.html#velocity` and verify ORBIT and surrounding layout.
4. Correct and mock-test the enquiry integration, or use the email fallback while unresolved.
5. Add approved captures, responsive sizes, explicit dimensions, alt text, Demo data captions, and social preview. Missing media need not block independent content work.
6. Add optional motion after static content works. At most one substantial sticky sequence; inventory needs width ≥1024px, height ≥720px, and enough room for its actual content. Respect live reduced-motion preference changes.
7. Verify built routing/direct refresh, back navigation, anchors, mobile menu, keyboard FAQs, 200% zoom, no-script content, failed media, and fresh/existing worker state. Test 320px overflow and the handoff's 360×800, 390×844, 768×1024, 1280×720, 1440×900, and short landscape viewports.
8. Run build and scoped lint for changed JS, record remaining baseline lint issues, capture viewport evidence, and measure Lighthouse against the supplied targets. Deliver the preview and report without deploying.

## Owner dependencies

- Scope: preparation only, preparatory code changes, or full page implementation; clarification requested during this review.
- Screenshots: identify approved current captures or confirm the existing mockup's provenance before reuse. This is the main asset dependency.
- Enquiry: proposed corrected contact-page reuse avoids a second form. Mocked verification and owner/staging confirmation of delivery readiness remain necessary.
- Packages: retain “module availability depends on the configured setup” until package details are confirmed. Prices and onboarding terms can remain omitted.

The original handoff plus this file map are sufficient to begin the agreed implementation work. This report completes repository preparation; page implementation and release verification remain outstanding.

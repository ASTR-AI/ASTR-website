# Velocity hero scroll transition

Scope: carry the existing hero dashboard into a benefit message using the reference’s visual continuity. Keep every section from inventory onward unchanged. This is the focused next step approved after restoring the previous page.

Desktop (width >=1024px, height >=700px, reduced motion off): the dashboard enters normally, pins below the fixed navigation, then scales down and moves right as the first approved benefit message fades in on the left. It releases naturally at the end of the hero. Progress follows native document scrolling in both directions. No nested scrolling, wheel interception, new dependencies, or screenshot replacement.

Copy: “Save money. Know what’s not selling.” / “See which medicines are selling slowly or nearing expiry, so you can make better buying decisions.” The original dashboard remains a product overview, not a fabricated slow-moving report. Retain existing capability links after the transition.

Fallback: normal hero image plus readable benefit text at smaller/shorter viewports, reduced motion, and without JavaScript. No pinned scroll distance or transforms in fallback.

Implementation: scoped `velocity-hero.css`, focused `velocity-hero.mjs`, small hero-only HTML additions, and existing page lifecycle integration. Native keyboard/anchor behavior, CTAs, and lower sections remain intact. Reserve image dimensions and remeasure on resize/image/font readiness. Cleanup restores static state and removes listeners.

Acceptance: smooth reversible intermediate states, unclipped screenshot, readable copy, natural release, no horizontal overflow, working links, and byte-identical inventory-through-footer HTML. Verify desktop, mobile, reduced-motion CSS, tests and production build. No deployment.

## Three-chapter extension

After the screen lands, retain the shared pinned window through three short, selectable chapters: “Save money. Know what’s not selling.”, “Know what to order and when.”, and “See how your pharmacy is doing.” Scrolling updates the open explanation and its corresponding stock report, reorder preview, or dashboard; selecting a title navigates to its chapter. The stock report is an illustrative view with a visible demo-data label and snapshot qualifier. The introductory dashboard remains visible during the initial movement.

On mobile and reduced-motion layouts, the chapters appear above the product window and can be selected without a pinned scroll. Without JavaScript, all explanations remain accessible through native disclosures and the original dashboard remains visible. Existing feature sections and deep links below the hero are retained.

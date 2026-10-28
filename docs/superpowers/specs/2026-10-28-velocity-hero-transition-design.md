# Velocity hero scroll transition

Scope: carry the existing hero dashboard into a benefit message using the reference’s visual continuity. Keep every section from inventory onward unchanged. This is the focused next step approved after restoring the previous page.

Desktop (width >=1024px, height >=700px, reduced motion off): the dashboard enters normally, pins below the fixed navigation, then scales down and moves right as the first approved benefit message fades in on the left. It releases naturally at the end of the hero. Progress follows native document scrolling in both directions. No nested scrolling, wheel interception, new dependencies, or screenshot replacement.

Copy: “Save money. Know what’s not selling.” / “See which medicines are selling slowly or nearing expiry, so you can make better buying decisions.” The original dashboard remains a product overview, not a fabricated slow-moving report. Retain existing capability links after the transition.

Fallback: normal hero image plus readable benefit text at smaller/shorter viewports, reduced motion, and without JavaScript. No pinned scroll distance or transforms in fallback.

Implementation: scoped `velocity-hero.css`, focused `velocity-hero.mjs`, small hero-only HTML additions, and existing page lifecycle integration. Native keyboard/anchor behavior, CTAs, and lower sections remain intact. Reserve image dimensions and remeasure on resize/image/font readiness. Cleanup restores static state and removes listeners.

Acceptance: smooth reversible intermediate states, unclipped screenshot, readable copy, natural release, no horizontal overflow, working links, and byte-identical inventory-through-footer HTML. Verify desktop, mobile, reduced-motion CSS, tests and production build. No deployment.

# Medicine workflows mobile spacing

Added a dedicated mobile stylesheet to distribute whitespace around the existing heading, rail controls, cards, and supporting notes. The section has a minimum height equal to the small viewport minus the fixed header, with 40px top / 48px bottom padding and at least 32px between groups. The container distributes additional room between those groups; cards do not grow. Short/narrow phones use 24px gaps and 24px / 32px outer padding, and can grow naturally to preserve content.

At 440×956, section height is 892px. Before and after, all three mockups remain 280px wide with heights 241.758 / 240 / 240.836px. Entire card heights also remain 376.258 / 374.5 / 355.836px. Screenshot confirms only this section appears below the header. Carousel arrows still move the rail.

Browser checks at 440×956, 430×932, 390×844, 320×740, and 1440×1000 show no page-level horizontal overflow. All new layout rules are mobile-only. Production build, formatting checks, and git diff --check pass. Temporary viewport override was reset. Physical devices were not tested.

Evidence: screenshots/features-mobile-spacing/440-956.png and metrics.json.

# Everyday operations mobile spacing

The user's requested 440 × 956px layout uses a minimum section height of the small viewport minus the fixed header. Content can grow naturally on smaller screens or with enlarged text. The section uses 40px top / 48px bottom padding, 32px between content groups, and 32px card padding. The workflow card grows into the remaining space. Short and narrow phones use 24px gaps/card padding and smaller outer padding. Desktop rules remain unchanged.

Browser verification covered all four workflow tabs at 440×956, 430×932, 390×844, 320×740, and 1440×1000. All tabs retain the same section height at each size and no page-level horizontal overflow. Section heights are respectively 892, 868, 780, 692.289, and 1149.539px. At 440×956 the header and Everyday operations occupy the screen, the availability note is visible, and the next section is below the viewport. The short 320px layout grows slightly beyond its viewport to preserve content. Desktop card padding remains 56px.

Production build, Prettier check, and git diff --check pass. Temporary browser viewport override was reset. Physical device testing was not performed.

Evidence: screenshots/operations-mobile-spacing/440-956.png and metrics.json.

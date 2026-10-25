# Stock & medicines carousel design

## Approved direction

Redesign only `#inventory` on the Velocity marketing page. The hero, navigation, other sections, destinations, and shared brand styles remain unchanged. The user approved the horizontal feature-card concept and requested neutral cards instead of gold accents.

Visual target: `/Users/anubhavjaidka/.codex/generated_images/01a17303-6ac7-7b90-86a5-d64e00f9b8aa/exec-d4b9e4fd-5f2f-4ecd-8ca9-c4869fe6baca.png`.

## Intent and presentation

Help customers understand inventory capabilities through four large, readable cards: Locations, Batches, Expiry, and Packs & units. Use the existing dark page background, graphite and soft-white alternating card surfaces, neutral borders, white/grey controls, a serif heading, and sans-serif supporting copy. No gold or bronze card accents or glows. The existing small section label may retain its brand colour.

Heading: **Your stock. A clearer picture.**

Introduction: **Across locations, down to the batch. See the details that matter.**

Cards:

| Card | Heading | Description |
| --- | --- | --- |
| Locations | See stock across every location. | Keep your warehouse, pharmacy, and hospital locations in view. |
| Batches | Keep every batch connected. | Follow medicine batches and their stock details. |
| Expiry | Keep expiry dates in view. | Find medicines nearing expiry and review stock that needs attention. |
| Packs & units | Read stock the way your team works. | See quantities in each medicine’s configured packs and loose units. |

Footer note: **Authorised stock adjustments. Recorded history.**

## Interaction

Use native horizontal scrolling and scroll snapping. Customers swipe/scroll left to reveal later cards or use previous/next buttons and four clickable position indicators. Show part of the next card and the instruction **Swipe or scroll to explore**. The current indicator is elongated. Disable arrows at the ends; do not loop or autoplay. Normal vertical page scrolling stays intact.

Desktop shows roughly two cards and a next-card preview where width permits; mobile shows one readable card plus a next-card preview. Controls work with keyboard and touch, with visible focus states and useful accessible labels. Reduced motion uses immediate navigation. Without JavaScript, cards remain readable through native scrolling and inactive enhancement controls stay hidden.

## Assets and boundaries

Only a real dashboard capture is currently available: `public/Pictures/velocity-dashboard-light.png`. Use it as clearly labelled **Dashboard preview** imagery while specialised inventory captures are unavailable. Never extract the generated concept’s fictional inventory UI, invent product data, or imply that dashboard crops demonstrate batch/expiry screens. Reuse the existing image URL, allow undistorted crops, and provide accurate alt text. Replacing these with approved inventory captures is a later asset update, not a blocker for the layout.

## Alternatives and decisions

The earlier tabbed showcase and vertical navigator were considered. The user selected horizontal Cluely-style cards for discoverability and visual storytelling, then chose neutral card colours. Use CSS scroll snapping and a small vanilla JavaScript controller rather than a carousel package: this fits the existing static HTML/Vite site and provides a working native-scrolling fallback. Omit autoplay/play controls because no automatic playback is requested.

Exact spacing and responsive measurements are implementation decisions, guided by the selected image and actual readability. No additional product features, dependencies, routes, or forms are required.

---
status: investigating
trigger: "Investigate and fix the persistent clipping of the 'ASTR AI' particle logo on mobile (specifically resolution 430x932) in index.html."
created: 2024-04-18T10:00:00Z
updated: 2024-04-18T10:00:00Z
---

## Current Focus

hypothesis: Initial investigation of index.html for layout and Three.js configuration.
test: Examine the container structure and renderer setup.
expecting: Identify constraints or mismatches in canvas sizing or camera perspective.
next_action: Read index.html and associated JS.

## Symptoms

expected: The 'ASTR AI' particle logo should be fully visible and centered on mobile (430x932).
actual: The logo is 'getting cut in half' or clipped vertically/horizontally.
errors: None reported, just visual clipping.
reproduction: View index.html at 430x932 resolution.
started: Persistent through multiple attempts to adjust camera/scaling.

## Eliminated

## Evidence

- timestamp: 2024-04-18T10:05:00Z
  checked: index.html script tags
  found: The `animate()` function overwrites `particles.position.y` every frame with `Math.sin(time) * 0.15`, ignoring any value set in `updateSize()`.
  implication: Any attempts to adjust the logo's vertical position using `particles.position.y` in `updateSize()` are negated, causing the logo to always be centered at the viewport's middle (Y=0).

- timestamp: 2024-04-18T10:07:00Z
  checked: CSS z-index and layout
  found: The canvas container has `z-index: 10`, while the UI content (header/footer) has `z-index: 20`.
  implication: The logo is rendered behind the header and footer. On mobile (430x932), the footer is likely tall enough to cover the bottom half of the logo if it's centered at Y=0.

- timestamp: 2024-04-18T10:10:00Z
  checked: Particle generation and scaling
  found: The logo is scaled to 0.6 and camera is at z=35 on mobile.
  implication: The logo should fit within the viewport width, but its vertical position is critical to avoid being covered by the UI.

- timestamp: 2024-04-18T10:12:00Z
  checked: CSS for clipping
  found: `body { overflow: hidden; }` and canvas is in a `fixed inset-0` div.
  implication: No obvious CSS clipping on the canvas itself, but the `backdrop-filter: blur(15px)` on the footer might be making particles behind it invisible.

## Resolution

root_cause: The `animate()` function was overwriting `particles.position.y` to approximately 0 every frame, ignoring the mobile-specific Y-offset intended to move the logo into the "empty space" above the footer. This caused the logo to be centered at the viewport's middle, where it was being obscured/clipped by the `liquid-glass` footer (and its blur effect) on mobile resolutions.
fix: 1. Introduced `baseX` and `baseY` properties to the `particles` object. 2. Updated `updateSize()` to set these base values according to screen size (setting `baseY = 3.5` for mobile). 3. Modified `animate()` to add the breathing sway to these base values instead of overwriting them. 4. Added `!important` CSS to the canvas to ensure full viewport coverage.
verification: Manual verification needed for 430x932 resolution. The logic ensures the logo is positioned in the visual empty space and the canvas is correctly sized.
files_changed: [index.html]

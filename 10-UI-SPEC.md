---
status: draft
phase: 10
title: Coming Soon Vertical Rhythm Refinement (Mobile)
---

# UI Specification: Coming Soon Vertical Rhythm Refinement

## 1. Vision & Constraints
**Phase Objective:** Refine the vertical flow of the 'Coming Soon' page for mobile (430x932). Increase the prominence of the footer glass card and bridge the visual gap between the particle animation and the card to create a cohesive, intentional layout.

**Target Device:** High-end mobile (e.g., iPhone 14/15 Pro Max, 430x932).
**Key Metrics:** 
- Reduce perceived "empty space" by 25-30%.
- Increase footer card vertical presence by 20%.

## 2. Spacing & Layout
The vertical rhythm follows a "Connected Stack" approach rather than a "Split Ends" approach.

| Element | Mobile Class (Target) | Change from Previous |
|---------|-----------------------|----------------------|
| Main Container | `p-8 pb-10` | Increased vertical padding to frame the content. |
| Top Spacer | `flex-1` | Maintain (for top alignment of logo). |
| Middle Gap | `h-[8vh] md:hidden` | Introduced a subtle buffer to prevent particles from touching the logo. |
| Footer Wrapper | `w-full max-w-5xl mb-2` | Slight margin-bottom for better lift. |
| Glass Card | `p-10 pb-12 gap-10` | Significantly increased padding and internal gap. |

## 3. Typography (Mobile Refinement)
Scale-up typography on mobile to ensure the glass card feels substantial and legible.

| Component | Class | Size (px) | Notes |
|-----------|-------|-----------|-------|
| Card Heading | `text-[1.1rem]` | ~17.6px | Bold, tracking-[2px], Gold. |
| Card Body | `text-[0.9rem]` | ~14.4px | White/70, Lora. |
| Card Labels | `text-[0.65rem]` | ~10.4px | Uppercase, White/40. |
| Card Values | `text-[0.8rem]` | ~12.8px | Gold/White bold. |
| Bottom Tagline | `text-[0.55rem]` | ~8.8px | Increased tracking-[4px]. |

## 4. Three.js Positioning Contract
To achieve the "Vertical Connection", the world coordinates are shifted downward to anchor the particles closer to the footer.

**Target Breakpoint:** `w < 480px`

| Property | Value | Rationale |
|----------|-------|-----------|
| `camera.position.z` | `23` | Brings particles closer for more impact. |
| `camera.position.y` | `-0.8` | Lower camera center to accommodate the shifted focus. |
| `camera.lookAt` | `(0, -0.8, 0)` | Aligns focus with the new camera height. |
| `particles.baseY` | `0.4` | **CRITICAL:** Brings particles down from `2.2` to `0.4`, bridging the gap. |
| `particles.scale` | `0.8` | Maintains legibility of "COMING SOON" text. |

## 5. Visual Hierarchy & Connection
- **Particle Anchor:** The particles now sit visually "above" the glass card with a narrower gap, creating a "System Terminal" feel where the data (particles) flows into the console (card).
- **Glass Card Prominence:** By increasing `p-10` and `gap-10`, the card occupies more vertical real estate, preventing it from feeling like a small ribbon at the bottom.
- **Header logo:** `h-[90px]` on mobile (increased from `80px`) to match the larger footer presence.

## 6. Implementation Checklist
- [ ] Update `updateSize()` in `index.html` with new Three.js coordinates.
- [ ] Update `liquid-glass` container classes in `index.html`.
- [ ] Update font size classes for footer elements.
- [ ] Add `h-[8vh]` spacer above footer if needed, or adjust `flex-1` behavior.
- [ ] Verify 430x932 aspect ratio in DevTools.

## 7. Safety & Performance
- No change to particle count (2000 for mobile).
- `backdrop-filter` remains `blur(15px)`.
- Opacity remains `0.85`.

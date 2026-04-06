---
status: draft
phase: 11
title: Coming Soon Tagline Optimization (Mobile)
---

# UI Specification: Coming Soon Tagline Optimization

## 1. Vision & Constraints
**Phase Objective:** Optimize the bottom tags ('AI SOLUTIONS', 'INFRASTRUCTURE', 'DRONE NETWORKS') for high-end mobile displays (430x932). Ensure zero horizontal clipping, refine vertical rhythm with the glass card footer, and maintain a high-end "system metadata" aesthetic.

**Target Device:** iPhone 14/15 Pro Max (430x932).
**Success Criteria:**
- One-line horizontal layout for all screens down to 390px wide.
- Reduced "float" between the glass card and the tags.
- Subtler opacity for better visual hierarchy.

## 2. Spacing & Layout
The vertical rhythm is tightened to bridge the gap created by the enlarged footer card in Phase 10.

| Element | Mobile Class | Desktop Class | Change |
|---------|--------------|---------------|--------|
| Tag Container | `mt-4` (16px) | `mt-8` (32px) | **Tightened** from `mt-8` on mobile. |
| Tag Gap | `gap-4` (16px) | `gap-6` (24px) | **Reduced** from `gap-6` for better fit. |
| Horizontal Padding | `px-4` | `px-0` | Added safe zone for tiny screens. |

## 3. Typography (Refined for Mobile)
Scaling down tracking and size to ensure a single-line fit on 430px (and 390px) screens.

| Component | Class | Size (px) | Tracking | Note |
|-----------|-------|-----------|----------|------|
| Bottom Tags | `text-[0.55rem]` | ~8.8px | `tracking-[2px]` | Reduced from `3px`. |
| Separators | `text-gold/20` | ~8.8px | N/A | Subtler than the text. |

## 4. Color & Opacity
- **Text Color:** `text-white/20` (Reduced from `30%` to ensure it feels like metadata).
- **Dot Color:** `text-gold/20` (Reduced from `30%`).

## 5. Interaction & Structure
The tags remain outside the `liquid-glass` card to act as a "grounding line" for the layout, rather than cluttering the console content.

### Exact HTML Structure (Target)
```html
<div class="mt-4 md:mt-8 flex justify-center items-center gap-4 md:gap-6 text-[0.55rem] md:text-[0.6rem] uppercase tracking-[2px] md:tracking-[3px] text-white/20 font-bold px-4">
    <span>AI SOLUTIONS</span> 
    <span class="text-gold/20">•</span> 
    <span>INFRASTRUCTURE</span> 
    <span class="text-gold/20">•</span> 
    <span>DRONE NETWORKS</span>
</div>
```

## 6. Layout Rationale
- **Single Line vs Stacked:** Stacking would consume excessive vertical space on 932px tall screens, pushing the "system metadata" too close to the status bar or gestures. A compact one-liner maintains the wide-screen cinematic feel.
- **Vertical Rhythm:** Reducing `mt-8` to `mt-4` counteracts the `pb-12` of the glass card, making the tags feel like they are "docked" to the card rather than floating in space.
- **Tracking:** `tracking-[2px]` is the sweet spot for legibility and width conservation on 430px wide screens.

## 7. Implementation Checklist
- [ ] Update `mt-8` to `mt-4 md:mt-8` on the tag container in `index.html`.
- [ ] Update `gap-6` to `gap-4 md:gap-6`.
- [ ] Update `text-[0.6rem]` to `text-[0.55rem] md:text-[0.6rem]`.
- [ ] Update `tracking-[3px]` to `tracking-[2px] md:tracking-[3px]`.
- [ ] Update text color to `text-white/20` and dots to `text-gold/20`.
- [ ] Add `px-4` to the container for edge safety.
- [ ] Verify no horizontal overflow on 430px width.

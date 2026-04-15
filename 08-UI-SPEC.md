---
status: draft
phase: 08
title: Mobile Responsivity Fixes (Hero Logo)
---

# UI Specification: Mobile Responsivity Fixes

## 1. Vision & Constraints
**Phase Objective:** Resolve clipping and crowding issues for the 'ASTR AI' particle logo on mobile viewports (< 768px). Utilize empty space at the top of the screen and ensure the full branding is visible.

**Context:** 
- Upstream: `index.html` (Main Site), `main.js`, `coming-soon.html` (former placeholder).
- Tech Stack: Tailwind CSS, Three.js.

## 2. Design Tokens (Overrides for Mobile)

| Token | Desktop (Ref) | Mobile (< 768px) | Source |
|-------|---------------|------------------|--------|
| Camera Z-Distance | 9 | 24 - 26 | RESEARCH.md |
| Camera Y-Offset | 0 | 2 | Decision |
| Particle Size | 0.04 | 0.06 | Decision |
| Particle Jitter | 0 | 0.25 | Decision |
| Scale Divisor | 180 | 220 | Decision |

## 3. Component Inventory (Hero Canvas)

### Hero Particle Logo (`#heroCanvas`)
- **Positioning:** 
  - Particle target `yOffset` increased to **6.0** (up from 4.5).
  - Camera `lookAt` point shifted to `(0, 2, 0)` (up from `(0, 0, 0)`).
  - Camera `position.y` set to **2** to maintain perspective.
- **Particle Formation:**
  - **Density:** 6,000 particles (Main) + 800 particles (Core).
  - **Spread:** Apply random jitter of `±0.25` units to all axis for `astra` shape target.
  - **Z-Depth:** Increase Z-randomization for logo target from `±0.15` to `±0.35` to add volume without density.
- **Responsivity:**
  - Breakpoint: `< 768px` (Portrait).
  - For narrow viewports (`< 480px`), increase Camera Z-Distance to **28**.

### Coming Soon Particle Logo (`#comingSoonCanvas`)
- **Positioning:**
  - Camera Z-Distance: **26** (up from 22).
  - Particle Scale: **0.4** for `< 480px`.
- **Clipping:**
  - Ensure `overflow-hidden` on parent does not clip the top 10% of the canvas.

## 4. Copywriting Contract
No changes to copy in this phase.

## 5. Interaction Contract
- **Touch Interaction:** 
  - Rotation sensitivity on mobile: **1.5x** compared to desktop.
  - Smooth lerping: Use `0.05` weight for target rotation follow.

## 6. Safety & Verification (Registry)
No third-party components beyond existing CDN scripts (Three.js, GSAP).

### Verification Steps
1. Open DevTools in Responsive Mode (iPhone SE/iPhone 12 Pro).
2. Confirm 'ASTR AI' logo is centered in the top half of the glass container.
3. Confirm particles appear "distributed" rather than a dense cluster.
4. Verify 'Explore Infrastructure' link at the bottom right is not overlapped by the logo.

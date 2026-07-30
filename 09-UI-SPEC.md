---
status: draft
phase: 09
title: Coming Soon Mobile Refinement (430x932)
---

# UI Specification: Coming Soon Mobile Refinement

## 1. Vision & Constraints

**Phase Objective:** Finalize the visual rhythm and positioning of the 'Coming Soon' particle system for high-resolution mobile devices (specifically 430x932). Ensure the transition between 'ASTR' and 'COMING SOON' formations is seamless, centered, and premium, resolving previous "too high" or "too low" positioning issues.

**Context:**

- **Target Resolution:** 430px x 932px (iPhone 14/15 Pro Max).
- **Upstream:** `index.html` (Coming Soon page).
- **Tech Stack:** Three.js, Tailwind CSS.

## 2. Layout Audit (Mobile 430x932)

To achieve the "Golden Mean" of vertical rhythm, the layout is audited as follows:

| Section                      | Height (px) | Notes                                            |
| ---------------------------- | ----------- | ------------------------------------------------ |
| Header (Logo + Padding)      | 102px       | 70px logo + 32px (p-8) top padding.              |
| **Empty Space (Target)**     | **542px**   | **Ideal zone for particle animation.**           |
| Footer Card (Glass + Bottom) | 288px       | Includes margins, stacked items, and legal text. |
| **Midpoint of Space**        | **373px**   | **Measured from top of screen.**                 |

## 3. Three.js Positioning Spec (Golden Mean)

For viewports with `width < 480px` (Portrait Mobile):

| Property              | Value        | Rationale                                                                        |
| --------------------- | ------------ | -------------------------------------------------------------------------------- |
| Camera Z-Distance     | 32           | Provides enough FOV to fit the "COMING SOON" width without clipping.             |
| Camera Y-Offset       | -2.6         | Moves the world origin (0,0,0) to 373px from the top (offset from 466px center). |
| Camera LookAt         | (0, -2.6, 0) | Aligns viewport center with camera offset to prevent perspective distortion.     |
| Particle Global Scale | 0.9          | Prevents horizontal overflow and maintains brand elegance.                       |

## 4. Particle Aesthetics (Premium Grade)

- **Count:** 15,000 (Increased from 12,000 for better density on high-DPI mobile screens).
- **Size:** 0.10 units (Sharper, more "stardust" feel; avoids the "blurry mess" or "solid shape" look).
- **Depth Spread (Z):** ±0.4 units (Enhanced volume for better parallax during rotation).
- **Color Mix:** 70% Gold (`#e6cd99`), 30% White (`#ffffff`) with subtle random interpolation.
- **Blending:** `THREE.AdditiveBlending` (Required for luminous overlap).

## 5. Visual Hierarchy & Rhythm

- **Rhythm:** The particles are positioned to have a ~205px gap from the header and a ~205px gap from the footer card. This 1:1:1 balance (Header Area : Particle Area : Footer Area) is the visual Golden Mean for this phase.
- **Competition:** By centering the particles at 373px (instead of the previous ~255px), we provide enough "negative space" so the header logo and particle formation do not compete for the user's focus.

## 6. Implementation Spec (index.html)

### A. Camera Logic Update

```javascript
function updateSize() {
  const w = window.innerWidth,
    h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;

  if (w < 480) {
    // Targeted for 430x932 (Golden Mean)
    camera.position.z = 32;
    camera.position.y = -2.6;
    camera.lookAt(0, -2.6, 0);
    const s = 0.9;
    particles.scale.set(s, s, s);
  } else if (w < 768) {
    camera.position.z = 26;
    camera.position.y = -2.1;
    camera.lookAt(0, -2.1, 0);
    const s = 1.0;
    particles.scale.set(s, s, s);
  } else {
    camera.position.z = 12;
    camera.position.y = 0;
    camera.lookAt(0, 0, 0);
    particles.scale.set(1, 1, 1);
  }
  camera.updateProjectionMatrix();
}
```

### B. Particle Material Refinement

```javascript
const material = new THREE.PointsMaterial({
  size: isNarrow ? 0.1 : isMobile ? 0.12 : 0.012,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  sizeAttenuation: true,
});
```

### C. Formation Depth & Sampling

- **Sampling:** Maintain `y += 2` and `x += 2` step in `loadAssets()` to ensure 15k particles fill the shape targets adequately.
- **Depth Spread:**

```javascript
// Inside loadAssets()
targets.astr[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
targets.soon[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
```

## 7. Verification Steps

1. Set Chrome DevTools to **iPhone 14 Pro Max** (430x932).
2. Refresh and verify the particle formation is perfectly centered between the logo and the footer glass card.
3. Ensure "COMING SOON" text fits within the screen width with a small margin on both sides.
4. Verify particles look like distinct points of light, not a solid blur.

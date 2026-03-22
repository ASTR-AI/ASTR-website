---
status: draft
phase: "Infrastructure Refinement"
---

# UI Design Contract: Infrastructure Build Footer

This specification outlines the visual and interaction contract for refining the "Build" title in the infrastructure section footer.

## 1. Component: Infrastructure Build Footer (`#infra-build-footer`)

### 1.1 Context & Problem
The "Build" title is currently right-aligned in a 40/60 split grid, placing it near the center of the container. Previous attempts to push it left using `padding-right` (20px → 40px) were insufficient. To achieve a clean, aligned look that satisfies the "move more to the left" requirement, the title will be switched to left alignment.

### 1.2 Layout & Spacing
- **Grid Structure**: Maintain the current `antigravity-split-inline` grid (40% / 60% split).
- **Title Alignment**: 
    - Change `text-align: right` to `text-align: left`.
    - Set `padding-right: 0px` (removes the ineffective "push" from the right).
- **Indentation**: 
    - The title will now naturally align with the left edge of the 1000px container (which is 40px from the screen edge due to `.antigravity-split-inline` padding).
    - This aligns the title with the "Infrastructure" visual pane above it.
- **Mobile Behavior**: Ensure left alignment is maintained or enforced on mobile (`< 992px`) where the grid stacks vertically.

## 2. Design Tokens (Derived from Project)

### 2.1 Colors
- **Dominant**: `--black` (#121212)
- **Secondary**: `--black-rich` (#1a1a1a)
- **Accent**: `--gold` (#E6CD99)
- **Text (Primary)**: `--white` (#D1D5DB)
- **Text (Muted)**: `rgba(255, 255, 255, 0.55)` (for `.build-description`)

### 2.2 Typography
- **Title (`.build-title`)**:
    - Family: `'Lora', serif`
    - Size: `16px`
    - Weight: `700`
    - Line-height: `1.4`
    - Color: `--white`
- **Description (`.build-description`)**:
    - Family: `'Lora', serif` (Project default)
    - Size: `14px`
    - Weight: `400`
    - Line-height: `1.6`
    - Color: `rgba(255, 255, 255, 0.55)`

## 3. Interaction & States
- **Hover**: No specific hover state required for the title text.
- **Animation**: Inherits the `reveal` animation (fade in and slide up) if applied to the parent.

## 4. Copywriting Contract
- **Title**: `Build`
- **Description**: "We help you build the right foundation for your AI projects. Instead of sticking to just one brand, we pick the best hardware from leading global companies to create a custom setup for you. Whether you need an Innovation Lab, a Center of Excellence, or a Secure Data Centre, we handle the entire setup to ensure your system is powerful and stays running 24/7."

## 5. Registry & Safety (shadcn)
- **Tool**: Manual CSS/HTML (No shadcn detected).
- **Third-party**: None.

---
**Source of Truth:**
- Upstream: User request via prompt.
- Scouting: Detected `text-align: right` in `index.css` as the root cause of the "stuck to the center" feel.

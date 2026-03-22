---
status: draft
phase: "Infrastructure Build Footer Refinement"
---

# UI Design Contract: Infrastructure Build Footer (Refinement)

This specification outlines the refinements for the "Build" footer section within the infrastructure vertical to improve visual balance and information hierarchy.

## 1. Component: Infrastructure Build Footer (`#infra-build-footer`)

### 1.1 Context & Problem
The "Build" footer current layout has a top margin of 80px, which creates a large gap from the interactive showcase stage above it. To tighten the visual relationship between the stage and its footer description, the spacing needs to be reduced. Additionally, the "Build" title (currently 16px) lacks sufficient prominence against the body text (14px).

### 1.2 Layout & Spacing
- **Container**: `.antigravity-split-inline`
- **Top Margin**: Reduce from `80px` to `48px`.
    - *Rationale*: Matches a standard 8-point rhythmic multiple (6x8) and provides a tighter grouping with the preceding interactive stage while remaining distinct.
- **Max Width**: Maintain `1000px`.
- **Grid Gap**: Maintain `40px`.
- **Padding**: Maintain `0 40px` (Desktop).

### 1.3 Mobile Layout Refinements
- **Top Margin**: Reduce from `60px` to `40px` for mobile (`< 992px`).
- **Padding**: Maintain `0 20px`.

## 2. Design Tokens (Updated)

### 2.1 Typography
- **Title (`.build-title`)**:
    - **Font Size**: Increase from `16px` to `18px`.
    - **Font Weight**: `700` (Bold).
    - **Line Height**: `1.4`.
    - **Alignment**: `left` (Locked from previous phase).
- **Description (`.build-description`)**:
    - **Font Size**: `14px` (Maintain).
    - **Font Weight**: `400` (Regular).
    - **Color**: `rgba(255, 255, 255, 0.55)` (Muted white).

### 2.2 Color Split
- **Dominant**: `--black` (60%)
- **Secondary**: `--black-rich` (30% - background of sections)
- **Accent**: `--white` (10% - for active titles and highlights)

## 3. Copywriting Contract
- **CTA Label**: N/A (Informational section)
- **Primary Title**: "Build"
- **Empty State**: N/A
- **Error State**: N/A

## 4. Registry & Safety (shadcn)
- **Tool**: Manual CSS
- **Third-party**: None

---
**Source of Truth:**
- Upstream: User request for reduced margin and increased title size.
- Scouting: Detected `80px` top margin and `16px` font size in `index.css`.
- Decision: Settled on `48px` top margin for optimal visual balance with a `40px` grid gap.

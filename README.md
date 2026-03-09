# ASTR AI Landing Page

A high-fidelity UI/UX web design for a deep-tech company named 'ASTR AI'.

## Design System

The website features a modern, premium design system with a specific aesthetic:

### Color Palette
- **Background**: `#121212` (Deep Space Dark)
- **Primary Accent**: `#E6CD99` (Elegant Gold)
- **Text Color**: `#D1D5DB` (Soft Light Gray)

### Typography
- **Primary Font**: [Lora](https://fonts.google.com/specimen/Lora) (Serif)
  - Used across the entire site for a sophisticated, trustworthy, and modern feel.

### UI Effects
- **Apple Vision OS Liquid Glass**:
  - **Floating Pills**: Use aggressive rounding. `border-radius: 100px;` for thin strips (navbars, toolbars) and `border-radius: 64px;` for large content containers (hero, floating windows).
  - **Backdrop Blur**: Strong frosted glass effect. `backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);` applied over a translucent white/dark background (e.g., `rgba(255, 255, 255, 0.08)` or `rgba(10, 10, 10, 0.6)`).
  - **Specular Inner Highlight**: The crucial "liquid" effect. Use `inset 0 1px 1px rgba(255, 255, 255, 0.3)` internally on the top edge to mimic light catching the rim.
  - **Depth Shadow**: Strong outer drop shadow lifting elements off the background. E.g., `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);`
- **Glassmorphism**: Standard content cards utilize minimal frosted glass textures with subtle golden borders and background blur (`backdrop-filter`) to create a futuristic layered effect.
- **Scroll Reveal**: Sections smoothly fade in and slide up as you scroll down the page.
- **Micro-interactions**: Liquid glass hover effects that encase elements in soft translucent bubbles.

## Content Structure

The landing page features 5 distinct sections:

1. **Hero Section (Dark Theme)**
   - Interactive HTML Canvas background featuring a neural network visualization (nodes and connections) reacting to mouse movements.
   - Main headline ("Intelligence for What Matters.") with dual Call-to-Action buttons.

2. **Our Philosophy (Light Theme)**
   - Details the inspiration behind the name ASTR (from Sanskrit "Astra") and what the acronym stands for (Advanced System for Technology, Robotics and AI).

3. **Three Synergistic Pillars (Dark Theme with Glassmorphism)**
   - Displays three core verticals: AI Solutions, Infrastructure, and Drone Solutions using sleek glassmorphism cards.

4. **Pioneering the Future & Trust (Light Theme)**
   - Highlights R&D focus, government trust, and building the talent pipeline.

5. **Footer / Contact (Dark Theme)**
   - Clean layout containing contact information, quick links, social links, and physical headquarters address.

## Technologies Used
- HTML5 (Semantic Structure)
- Vanilla CSS3 (Custom Properties/Tokens, Flexbox, Grid, Animations, No preprocessors needed)
- Vanilla JavaScript (IntersectionObserver for scroll animations, Canvas API for the interactive neural network background)
- No external frameworks or libraries, keeping the bundle incredibly lightweight and fast.

## Running Locally

To run the site locally, simply serve the directory with any HTTP server. For example:

```sh
# Using Node.js http-server
npx http-server . -p 8080

# Using Python
python3 -m http.server 8080
```

Then visit `http://localhost:8080` in your web browser.
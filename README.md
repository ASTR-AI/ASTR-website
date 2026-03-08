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
- **Glassmorphism**: Content cards and floating elements utilize frosted glass textures with subtle golden borders and background blur (`backdrop-filter`) to create a futuristic layered effect.
- **Scroll Reveal**: Sections smoothly fade in and slide up as you scroll down the page.
- **Micro-interactions**: Hover effects on buttons and cards that elevate elements and add soft golden shadows.

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
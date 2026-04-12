/* ===================================
   ASTR AI — Main JavaScript
   =================================== */
document.addEventListener('DOMContentLoaded', () => {
  // initNavbar is now handled by the <astr-navbar> component in components.js
  initScrollReveal();
  initTextAnimate();
  initHeroCanvas();
  initEcosystemGraph();
  initPillarTabs();
  initInfraCanvas();
  initDroneCanvas();
  initAnomalyConsole();
  initBlueprintCTA();
  initCTAParticles();
  initPremiumAnimations();
  initRDAnimations();
  initPhilosophyAnimations();
});

/* --- Philosophy Page Specialized Animations --- */
function initPhilosophyAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const pillars = document.querySelectorAll('.pillar-reveal');
  if (pillars.length > 0) {
    gsap.fromTo(
      pillars,
      { 
        y: 150, 
        scale: 0.8, 
        opacity: 0 
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.pillars-classical',
          start: 'top 85%',
        },
      }
    );
  }
}

/* --- R&D Page Specialized Animations --- */
function initRDAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // 0. Hero Sequence (Coordinated Entrance)
  const heroMetadata = document.querySelector('.rd-hero-metadata');
  const heroTitle = document.querySelector('.rd-hero-title');
  const heroDesc = document.querySelector('.rd-hero-description');
  const heroCTA = document.querySelector('.rd-hero-cta');

  if (heroTitle) {
    const heroTl = gsap.timeline({ delay: 0.5 });
    
    heroTl.fromTo(heroMetadata, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )
    .fromTo(heroTitle, 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' }, 
      '-=0.6'
    )
    .fromTo(heroDesc, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 
      '-=1'
    )
    .fromTo(heroCTA, 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }, 
      '-=0.8'
    );
  }

  // 1. Journal Entry Staggered Reveal
  const journalEntries = document.querySelectorAll('.rd-journal .relative.pl-12');
  if (journalEntries.length > 0) {
    gsap.fromTo(
      journalEntries,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.rd-journal',
          start: 'top 90%',
        },
      }
    );
  }

  // 2. Monolith Sequence
  const monolithSeal = document.querySelector('.monolith-seal-container');
  const monolithLines = document.querySelectorAll('.rd-monolith svg line');
  const monolithPillars = document.querySelectorAll('.monolith-pillar');

  if (monolithSeal) {
    // Initial State
    gsap.set([monolithSeal, monolithPillars], { opacity: 0 });
    gsap.set(monolithSeal, { scale: 0.8 });
    gsap.set(monolithPillars, { y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.rd-monolith',
        start: 'top 85%', // Trigger even earlier for better visibility
      },
    });

    tl.to(monolithSeal, { 
      scale: 1, 
      opacity: 1, 
      duration: 1.2, 
      ease: 'expo.out' 
    })
    .to(monolithLines, { 
      opacity: 0.2, 
      duration: 1, 
      stagger: 0.1,
      ease: 'power2.out' 
    }, '-=0.6') // Fade in lines as seal finishes
    .to(monolithPillars, { 
      y: 0, 
      opacity: 1, 
      duration: 1, 
      stagger: 0.1, 
      ease: 'power3.out' 
    }, '-=0.8'); // Overlap with lines and seal

    // Subtle Floating for Monolith Pillars
    monolithPillars.forEach((pillar, i) => {
      gsap.to(pillar, {
        y: '+=8',
        duration: 2.5 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });
  }

  // 3. Track Cards Hover Enhancement (Surgical GSAP)
  const trackCards = document.querySelectorAll('.research-tracks .group');
  trackCards.forEach((card) => {
    const note = card.querySelector('.font-caveat');
    card.addEventListener('mouseenter', () => {
      gsap.to(note, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(note, { opacity: 0, y: 10, duration: 0.4, ease: 'power2.in' });
    });
  });
}

/* --- Premium Editorial Animations (Master Reveal System) --- */
function initPremiumAnimations() {
  console.log('Initializing Premium Master Animations...');
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger NOT FOUND');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // 1. Universal Reveal Elements (Replacing basic CSS reveals)
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el) => {
    // Determine delay from CSS classes if present
    let delay = 0;
    if (el.classList.contains('reveal-delay-1')) delay = 0.2;
    if (el.classList.contains('reveal-delay-2')) delay = 0.4;
    if (el.classList.contains('reveal-delay-3')) delay = 0.6;
    if (el.classList.contains('reveal-delay-4')) delay = 0.8;

    gsap.fromTo(
      el,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // 2. Specialized GSAP Reveals (Containers)
  const gsapReveals = document.querySelectorAll('.gsap-reveal');
  gsapReveals.forEach((el) => {
    const type = el.getAttribute('data-reveal-type') || 'stagger';
    if (type === 'stagger') {
      const children = el.children;
      gsap.fromTo(
        children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            onEnter: () => {
              // Ensure container becomes visible when children start animating
              gsap.set(el, { visibility: 'visible', opacity: 1 });
            },
          },
        }
      );
    }
  });

  // 3. Journal Item Surgical Parallax
  const journalItems = document.querySelectorAll('.journal-item');
  journalItems.forEach((item) => {
    const img = item.querySelector('.w-\\[45\\%\\]');
    const content = item.querySelector('.flex-1');

    if (img) {
      gsap.fromTo(
        img,
        { scale: 0.9, opacity: 0, y: 60 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          },
        }
      );
    }

    if (content) {
      const elements = content.children;
      gsap.fromTo(
        elements,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        }
      );
    }
  });

  // 4. Hero Specific Entrance
  const heroGlass = document.querySelector('.hero-glass');
  if (heroGlass) {
    gsap.set('.hero-corner', { opacity: 0, y: 20 });
    gsap.fromTo(
      heroGlass,
      { scale: 1.15, opacity: 0, y: 100 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 2.5,
        ease: 'expo.out',
        onComplete: () => {
          gsap.to('.hero-corner', {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: 'power3.out',
          });
        },
      }
    );
  }

  // 5. CTA Terminal Panel Entrance
  const ctaPanel = document.getElementById('cta-panel');
  if (ctaPanel) {
    gsap.fromTo(
      ctaPanel,
      { y: 80, scale: 0.9, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: ctaPanel,
          start: 'top 92%',
        },
      }
    );
  }
}

/* --- Magic UI: Text Animation (Blur In) --- */
function initTextAnimate() {
  const elements = document.querySelectorAll('.text-animate');

  elements.forEach((el) => {
    const type = el.getAttribute('data-animate-type') || 'word';
    const text = el.innerText.trim();

    // Split based on type: word or character
    const items = type === 'word' ? text.split(' ') : text.split('');

    el.innerHTML = '';
    items.forEach((item, index) => {
      if (item === '\n') {
        el.appendChild(document.createElement('br'));
      } else if (item === ' ' && type === 'char') {
        el.innerHTML += ' ';
      } else {
        const span = document.createElement('span');
        span.className = 'text-animate-char';
        span.textContent = item;
        el.appendChild(span);

        // Add space after word if it's word-level animation and not the last word
        if (type === 'word' && index < items.length - 1) {
          el.appendChild(document.createTextNode(' '));
        }
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const spans = el.querySelectorAll('.text-animate-char');
            const stagger = type === 'word' ? 80 : 40; // Slower stagger for words, faster for chars

            spans.forEach((span, index) => {
              setTimeout(() => {
                span.classList.add('visible');
              }, index * stagger);
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
  });
}

/* --- Problem Section: Anomaly Console Logic --- */
function initAnomalyConsole() {
  const tags = document.querySelectorAll('.anomaly-tag');
  const contents = document.querySelectorAll('.anomaly-content');

  if (!tags.length || !contents.length) return;

  tags.forEach((tag) => {
    tag.addEventListener('click', () => {
      const targetId = tag.getAttribute('data-anomaly');

      // Update Tags
      tags.forEach((t) => t.classList.remove('active'));
      tag.classList.add('active');

      // Update Content
      contents.forEach((content) => {
        content.classList.remove('active');
        if (content.id === `anomaly-content-${targetId}`) {
          content.classList.add('active');
        }
      });
    });
  });

  // Set first one active by default
  if (tags[0] && contents[0]) {
    tags[0].classList.add('active');
    contents[0].classList.add('active');
  }
}

/* --- Navbar scroll effect & mobile menu --- */
/* --- Scroll reveal animation (REPLACED BY GSAP initPremiumAnimations) --- */
function initScrollReveal() {
  /*
  const reveals = document.querySelectorAll('.reveal');
  ...
  reveals.forEach((el) => observer.observe(el));
  */
}

/* --- Hero Canvas: Cosmic Astra / Star Visualization (Three.js WebGL) --- */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.error(
      'Three.js not loaded. Make sure the CDN script is included in index.html.'
    );
    return;
  }

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for mobile performance

  const container = canvas.parentElement;
  const scene = new THREE.Scene();

  // Camera initialization
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

  function updateSize() {
    const w = container.clientWidth;
    const h = container.clientHeight;

    renderer.setSize(w, h);
    camera.aspect = w / h;

    // Dynamic positioning for mobile vs desktop
    if (w < 768) {
      // Mobile: Move camera up and back
      camera.position.y = 2; 
      // Adjust Z distance based on portrait aspect ratio
      const aspect = w / h;
      // Further back for very narrow/tall devices like iPhone 14/15 Pro Max (430x932)
      // aspect for 430x932 is ~0.46
      camera.position.z = aspect < 0.5 ? 32 : (aspect < 0.6 ? 28 : 24);
      camera.lookAt(0, 2, 0);
    } else {
      // Desktop: Perfectly centered
      camera.position.y = 0;
      camera.position.z = 9;
      camera.lookAt(0, 0, 0);
    }

    camera.updateProjectionMatrix();
  }

  // Initial call
  updateSize();

  // ---- Logo Pixel Sampling from Image ----
  const logoImg = new Image();
  logoImg.src = '/Pictures/ASTR LOGO TEXT.png';
  logoImg.onload = () => {
    const logoCanvas = document.createElement('canvas');
    const logoCtx = logoCanvas.getContext('2d');
    
    // Higher resolution sample for the logo
    logoCanvas.width = 1600;
    logoCanvas.height = 1200;
    
    const imgAspect = logoImg.width / logoImg.height;
    let drawWidth = logoCanvas.width;
    let drawHeight = logoCanvas.width / imgAspect;
    if (drawHeight > logoCanvas.height) {
      drawHeight = logoCanvas.height;
      drawWidth = logoCanvas.height * imgAspect;
    }
    
    logoCtx.drawImage(
      logoImg,
      (logoCanvas.width - drawWidth) / 2,
      (logoCanvas.height - drawHeight) / 2,
      drawWidth,
      drawHeight
    );

    const logoImageData = logoCtx.getImageData(0, 0, logoCanvas.width, logoCanvas.height);
    const logoPixels = [];
    const isMobile = window.innerWidth < 768;
    const isNarrow = window.innerWidth < 480;
    
    // Decrease divisor on mobile to make it LARGER (more prominent particles)
    const scaleDivisor = isNarrow ? 120 : (isMobile ? 140 : 180); 

    // Extract non-transparent pixels (the logo)
    for (let y = 0; y < logoCanvas.height; y += 1) {
      for (let x = 0; x < logoCanvas.width; x += 1) {
        if (logoImageData.data[(y * logoCanvas.width + x) * 4 + 3] > 50) {
          logoPixels.push({
            x: (x - logoCanvas.width / 2) / scaleDivisor,
            y: (logoCanvas.height / 2 - y) / scaleDivisor
          });
        }
      }
    }

    if (logoPixels.length === 0) logoPixels.push({ x: 0, y: 0 });

    // ---- Particle System Geometry & Materials ----
    // SIGNIFICANTLY reduced counts for mobile to prevent "squished" or "over-dense" look
    const particleCount = isNarrow ? 4800 : (isMobile ? 7000 : 15000);
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const shapeTargets = {
      sphere: new Float32Array(particleCount * 3),
      astra: new Float32Array(particleCount * 3),
      sun: new Float32Array(particleCount * 3),
      planet: new Float32Array(particleCount * 3),
    };

    const colorGold = new THREE.Color(0xffd700);
    const colorOrange = new THREE.Color(0xff8c00);
    const colorYellow = new THREE.Color(0xffed4a);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      // 1. Sphere
      const rSphere = 3.2;
      shapeTargets.sphere[i * 3] = rSphere * Math.sin(phi) * Math.cos(theta);
      shapeTargets.sphere[i * 3 + 1] = rSphere * Math.sin(phi) * Math.sin(theta);
      shapeTargets.sphere[i * 3 + 2] = rSphere * Math.cos(phi);

      // 2. Exact Logo Shape (from Image)
      const lp = logoPixels[Math.floor(Math.random() * logoPixels.length)];
      // Shift logo up on mobile to use empty space (balanced)
      const yOffset = isNarrow ? 3.5 : (isMobile ? 3.0 : 0);
      // Add jitter on mobile so particles are not "crowded" (spread them out)
      const jitter = isMobile ? (Math.random() - 0.5) * 0.35 : 0;
      
      shapeTargets.astra[i * 3] = lp.x + jitter;
      shapeTargets.astra[i * 3 + 1] = lp.y + yOffset + jitter;
      shapeTargets.astra[i * 3 + 2] = (Math.random() - 0.5) * (isMobile ? 0.35 : 0.15);

      // 3. Sun
      const isRay = Math.random() > 0.7;
      const rSun = isRay ? Math.random() * 6 + 1.5 : Math.random() * 2;
      shapeTargets.sun[i * 3] = rSun * Math.sin(phi) * Math.cos(theta);
      shapeTargets.sun[i * 3 + 1] = rSun * Math.sin(phi) * Math.sin(theta);
      shapeTargets.sun[i * 3 + 2] = rSun * Math.cos(phi);

      // 4. Planet
      const isRing = Math.random() > 0.4;
      if (isRing) {
        const innerRadius = 3.5;
        const outerRadius = 7.0;
        const rRing = innerRadius + Math.random() * (outerRadius - innerRadius);
        shapeTargets.planet[i * 3] = rRing * Math.cos(theta);
        shapeTargets.planet[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
        shapeTargets.planet[i * 3 + 2] = rRing * Math.sin(theta);
      } else {
        const rPlanet = 2.5;
        shapeTargets.planet[i * 3] = rPlanet * Math.sin(phi) * Math.cos(theta);
        shapeTargets.planet[i * 3 + 1] = rPlanet * Math.sin(phi) * Math.sin(theta);
        shapeTargets.planet[i * 3 + 2] = rPlanet * Math.cos(phi);
      }

      positions[i * 3] = shapeTargets.sphere[i * 3];
      positions[i * 3 + 1] = shapeTargets.sphere[i * 3 + 1];
      positions[i * 3 + 2] = shapeTargets.sphere[i * 3 + 2];
      originalPositions[i * 3] = shapeTargets.sphere[i * 3];
      originalPositions[i * 3 + 1] = shapeTargets.sphere[i * 3 + 1];
      originalPositions[i * 3 + 2] = shapeTargets.sphere[i * 3 + 2];

      const mix = Math.random();
      let c = colorGold.clone();
      if (mix > 0.6) c.lerp(colorOrange, Math.random());
      else if (mix > 0.3) c.lerp(colorYellow, Math.random());
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aOriginalPosition', new THREE.BufferAttribute(originalPositions, 3));
    geometry.setAttribute('aTarget', new THREE.BufferAttribute(shapeTargets.sphere, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isNarrow ? 0.10 : (isMobile ? 0.12 : 0.04),
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    particles.rotation.x = Math.PI / 8;
    scene.add(particles);

    // ---- Inner Core (Bright Central Star) ----
    const coreCount = isNarrow ? 400 : (isMobile ? 600 : 2000);
    const coreGeometry = new THREE.BufferGeometry();
    const corePositions = new Float32Array(coreCount * 3);
    const coreOriginals = new Float32Array(coreCount * 3);
    const coreTargets = {
      sphere: new Float32Array(coreCount * 3),
      astra: new Float32Array(coreCount * 3),
      sun: new Float32Array(coreCount * 3),
      planet: new Float32Array(coreCount * 3),
    };

    for (let i = 0; i < coreCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const rCore = 1.6;
      const cx = rCore * Math.sin(phi) * Math.cos(theta);
      const cy = rCore * Math.sin(phi) * Math.sin(theta);
      const cz = rCore * Math.cos(phi);

      coreTargets.sphere[i * 3] = cx;
      coreTargets.sphere[i * 3 + 1] = cy;
      coreTargets.sphere[i * 3 + 2] = cz;
      coreTargets.sun[i * 3] = cx * 1.5;
      coreTargets.sun[i * 3 + 1] = cy * 1.5;
      coreTargets.sun[i * 3 + 2] = cz * 1.5;
      coreTargets.planet[i * 3] = cx * 1.2;
      coreTargets.planet[i * 3 + 1] = cy * 1.2;
      coreTargets.planet[i * 3 + 2] = cz * 1.2;

      const clp = logoPixels[Math.floor(Math.random() * logoPixels.length)];
      const cyOffset = isNarrow ? 3.5 : (isMobile ? 3.0 : 0);
      const cJitter = isMobile ? (Math.random() - 0.5) * 0.35 : 0;
      
      coreTargets.astra[i * 3] = clp.x + cJitter;
      coreTargets.astra[i * 3 + 1] = clp.y + cyOffset + cJitter;
      coreTargets.astra[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

      corePositions[i * 3] = cx;
      corePositions[i * 3 + 1] = cy;
      corePositions[i * 3 + 2] = cz;
      coreOriginals[i * 3] = cx;
      coreOriginals[i * 3 + 1] = cy;
      coreOriginals[i * 3 + 2] = cz;
    }

    coreGeometry.setAttribute('position', new THREE.BufferAttribute(corePositions, 3));
    coreGeometry.setAttribute('aOriginalPosition', new THREE.BufferAttribute(coreOriginals, 3));
    coreGeometry.setAttribute('aTarget', new THREE.BufferAttribute(coreTargets.sphere, 3));

    const coreMaterial = new THREE.PointsMaterial({
      size: isNarrow ? 0.08 : (isMobile ? 0.10 : 0.03),
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const core = new THREE.Points(coreGeometry, coreMaterial);
    scene.add(core);

    // Mouse & Touch interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    function updateInput(x, y) {
      const w = container.clientWidth;
      const h = container.clientHeight;
      mouseX = (x - w / 2) * 0.0005;
      mouseY = (y - h / 2) * 0.0005;
    }

    container.addEventListener('mousemove', (event) => {
      const rect = container.getBoundingClientRect();
      updateInput(event.clientX - rect.left, event.clientY - rect.top);
    });

    container.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });

    document.addEventListener('touchmove', (event) => {
      if (event.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        // Check if touch is within hero container
        const touch = event.touches[0];
        if (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
        ) {
          updateInput(touch.clientX - rect.left, touch.clientY - rect.top);
        }
      }
    }, { passive: true });

    window.addEventListener('resize', updateSize);

    // ---- Animation State Machine ----
    const clock = new THREE.Clock();
    const shapeKeys = ['sphere', 'astra', 'sun', 'planet'];
    let currentShapeIndex = 0;
    let morphTimer = 0;
    const MORPH_INTERVAL = 8.0;
    const LERP_SPEED = 0.04;
    let currentNoiseScale = 0.35;

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime() * 0.3;

      const activeShape = shapeKeys[currentShapeIndex];
      const targetNoise = activeShape === 'astra' ? 0.04 : 0.35;
      currentNoiseScale += (targetNoise - currentNoiseScale) * LERP_SPEED * 2.0;

      morphTimer += delta;
      if (morphTimer > MORPH_INTERVAL) {
        morphTimer = 0;
        currentShapeIndex = (currentShapeIndex + 1) % shapeKeys.length;
        const nextShape = shapeKeys[currentShapeIndex];
        geometry.setAttribute('aTarget', new THREE.BufferAttribute(shapeTargets[nextShape], 3));
        coreGeometry.setAttribute('aTarget', new THREE.BufferAttribute(coreTargets[nextShape], 3));
      }

      targetX = mouseX;
      targetY = mouseY;

      const baseRotation = 0.002;
      particles.rotation.y += baseRotation;
      core.rotation.y = particles.rotation.y;
      
      particles.rotation.x += (targetY * 2 - particles.rotation.x) * 0.05;
      particles.rotation.y += (targetX * 2 - particles.rotation.y) * 0.05;
      core.rotation.x = particles.rotation.x;
      core.rotation.y = particles.rotation.y;

      const posAttribute = geometry.attributes.position;
      const origAttribute = geometry.attributes.aOriginalPosition;
      const targetAttribute = geometry.attributes.aTarget;

      for (let i = 0; i < particleCount; i++) {
        let ox = origAttribute.getX(i);
        let oy = origAttribute.getY(i);
        let oz = origAttribute.getZ(i);
        const tx = targetAttribute.getX(i);
        const ty = targetAttribute.getY(i);
        const tz = targetAttribute.getZ(i);

        ox += (tx - ox) * LERP_SPEED;
        oy += (ty - oy) * LERP_SPEED;
        oz += (tz - oz) * LERP_SPEED;
        origAttribute.setXYZ(i, ox, oy, oz);

        // Re-enabled wave math for mobile (slightly simplified)
        const freq = isMobile ? 0.8 : 1.0;
        const wave1 = Math.sin(ox * freq + time) * Math.cos(oy * freq + time) * Math.sin(oz * freq + time);
        const wave2 = isMobile ? 0 : (Math.sin(ox * freq * 1.5 - time) * Math.cos(oy * freq * 1.5 + time) * 0.5);
        const noise = wave1 + wave2;
        const scale = 1 + noise * currentNoiseScale;
        posAttribute.setXYZ(i, ox * scale, oy * scale, oz * scale);
      }
      origAttribute.needsUpdate = true;
      posAttribute.needsUpdate = true;

      const corePosAttr = coreGeometry.attributes.position;
      const coreOrigAttr = coreGeometry.attributes.aOriginalPosition;
      const coreTargetAttr = coreGeometry.attributes.aTarget;
      for (let i = 0; i < coreCount; i++) {
        let cox = coreOrigAttr.getX(i);
        let coy = coreOrigAttr.getY(i);
        let coz = coreOrigAttr.getZ(i);
        const ctx = coreTargetAttr.getX(i);
        const cty = coreTargetAttr.getY(i);
        const ctz = coreTargetAttr.getZ(i);

        cox += (ctx - cox) * LERP_SPEED;
        coy += (cty - coy) * LERP_SPEED;
        coz += (ctz - coz) * LERP_SPEED;
        coreOrigAttr.setXYZ(i, cox, coy, coz);

        // Consistency: Apply same wave logic to core
        const cfreq = isMobile ? 0.8 : 1.0;
        const cwave1 = Math.sin(cox * cfreq + time) * Math.cos(coy * cfreq + time) * Math.sin(coz * cfreq + time);
        const cwave2 = isMobile ? 0 : (Math.sin(cox * cfreq * 1.5 - time) * Math.cos(coy * cfreq * 1.5 + time) * 0.5);
        const cnoise = cwave1 + cwave2;
        const cscale = 1 + cnoise * currentNoiseScale;
        corePosAttr.setXYZ(i, cox * cscale, coy * cscale, coz * cscale);
      }
      coreOrigAttr.needsUpdate = true;
      corePosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animate();
  };
}

/* --- Intelligence Ecosystem: Physics-Based Knowledge Graph --- */
class EcosystemGraph {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.nodes = [];
    this.links = [];
    this.hoveredNode = null;

    this.initData();
    this.initSVG();
    this.initPhysics();
    this.animate();

    // Handle resize
    window.addEventListener('resize', () => {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.svg.setAttribute(
        'viewBox',
        `-${this.width / 2} -${this.height / 2} ${this.width} ${this.height}`
      );
    });
  }

  initData() {
    // Central Core
    const core = { id: 'ASTR AI', type: 'core', x: 0, y: 0, vx: 0, vy: 0 };
    this.nodes.push(core);

    const categories = [
      { id: 'Custom Software', sub: ['FEFO Logic', 'Cloud ERP', 'Telemetry'] },
      { id: 'AI Integration', sub: ['Neural Nets', 'Comp. Vision', 'Agents'] },
      { id: 'Workflow Opt.', sub: ['Automation', 'Silo Sync', 'Flow Map'] },
      { id: 'System Support', sub: ['Vigilance', 'Uptime', 'Security'] },
    ];

    // Organic, irregular angles (radians) — NOT evenly spaced
    const catAngles = [
      -1.2, // Custom Software: upper-left (~-69°)
      0.4, // AI Integration: right-ish (~23°)
      2.3, // Workflow Opt.: lower-left (~132°)
      3.9, // System Support: lower-right (~223°)
    ];
    // Vary distances per category for organic feel
    const catDistMultipliers = [0.28, 0.32, 0.26, 0.3];

    categories.forEach((cat, i) => {
      const angle = catAngles[i];
      const dist = Math.min(this.width, this.height) * catDistMultipliers[i];
      const catNode = {
        id: cat.id,
        type: 'category',
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
      };
      this.nodes.push(catNode);
      this.links.push({ source: core, target: catNode });

      cat.sub.forEach((sub, j) => {
        // Spread sub-nodes at irregular offsets around the category
        const offsets = [-0.55, 0.1, 0.65];
        const subAngle = angle + offsets[j];
        const subDistVariance = 0.85 + Math.random() * 0.3; // 0.85–1.15x
        const subDist =
          Math.min(this.width, this.height) * 0.42 * subDistVariance;
        const subNode = {
          id: sub,
          type: 'sub',
          x: Math.cos(subAngle) * subDist,
          y: Math.sin(subAngle) * subDist,
          vx: 0,
          vy: 0,
        };
        this.nodes.push(subNode);
        this.links.push({ source: catNode, target: subNode });
      });
    });
  }

  initSVG() {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute(
      'viewBox',
      `-${this.width / 2} -${this.height / 2} ${this.width} ${this.height}`
    );
    this.svg.style.width = '100%';
    this.svg.style.height = '100%';
    this.container.appendChild(this.svg);

    // Defs for gradient definitions
    this.defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    this.svg.appendChild(this.defs);

    this.gLinks = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.gNodes = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.svg.appendChild(this.gLinks);
    this.svg.appendChild(this.gNodes);

    this.renderElements();
  }

  renderElements() {
    // Create lines for each link
    this.links.forEach((link, idx) => {
      const line = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      line.setAttribute('class', 'edge-line');
      link.el = line;
      this.gLinks.appendChild(line);
    });

    this.nodes.forEach((node) => {
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('class', `node-group ${node.type}`);

      if (node.type === 'core') {
        const imgSize = 230; // Increased from 100
        const logo = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'image'
        );
        logo.setAttributeNS(
          'http://www.w3.org/1999/xlink',
          'href',
          '/Pictures/without bg 02.png'
        );
        logo.setAttribute('width', imgSize);
        logo.setAttribute('height', imgSize);
        logo.setAttribute('x', -imgSize / 2);
        logo.setAttribute('y', -imgSize / 2);
        group.appendChild(logo);
      } else {
        const circle = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle'
        );
        circle.setAttribute('r', node.type === 'category' ? 6 : 3);
        circle.setAttribute('class', `node-circle ${node.type}`);

        const text = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'text'
        );
        text.textContent = node.id;
        text.setAttribute('dy', node.type === 'sub' ? 16 : 28);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('class', `node-text ${node.type}`);

        group.appendChild(circle);
        group.appendChild(text);
      }

      node.el = group;

      group.addEventListener('mouseenter', () => this.setHover(node));
      group.addEventListener('mouseleave', () => this.setHover(null));

      this.gNodes.appendChild(group);
    });
  }

  setHover(node) {
    this.hoveredNode = node;
    const allLines = this.container.querySelectorAll('.edge-line');
    allLines.forEach((l) => l.classList.remove('active'));

    if (node) {
      this.highlightPath(node);
    }
  }

  highlightPath(node) {
    this.links.forEach((link) => {
      if (link.target === node) {
        link.el.classList.add('active');
        this.highlightPath(link.source);
      }
    });
  }

  initPhysics() {
    this.k = 0.04;
    this.repulsion = 800;
    this.damping = 0.9;
  }

  updatePhysics() {
    // 1. Repulsion (Many-body)
    for (let i = 0; i < this.nodes.length; i++) {
      const nodeA = this.nodes[i];
      for (let j = i + 1; j < this.nodes.length; j++) {
        const nodeB = this.nodes[j];
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distSq = dx * dx + dy * dy + 0.1;
        const force = this.repulsion / distSq;
        const fx = (dx / Math.sqrt(distSq)) * force;
        const fy = (dy / Math.sqrt(distSq)) * force;
        nodeA.vx -= fx;
        nodeA.vy -= fy;
        nodeB.vx += fx;
        nodeB.vy += fy;
      }
    }

    // 2. Springs
    this.links.forEach((link) => {
      const dx = link.target.x - link.source.x;
      const dy = link.target.y - link.source.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const targetDist =
        link.source.type === 'core'
          ? Math.min(this.width, this.height) * 0.32
          : Math.min(this.width, this.height) * 0.14;
      const force = (dist - targetDist) * this.k;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      link.source.vx += fx;
      link.source.vy += fy;
      link.target.vx -= fx;
      link.target.vy -= fy;
    });

    // 3. Apply and Damp
    this.nodes.forEach((node) => {
      if (node.type === 'core') return; // Pin center
      node.x += node.vx;
      node.y += node.vy;
      node.vx *= this.damping;
      node.vy *= this.damping;

      node.el.setAttribute('transform', `translate(${node.x}, ${node.y})`);
    });

    this.links.forEach((link) => {
      // --- LOGO CLIPPING LOGIC ---
      // Instead of starting at (0,0), lines from core start at the logo's edge
      const logoRadius = 85; // Approximate radius where the logo's visual weight ends

      let x1 = link.source.x;
      let y1 = link.source.y;
      let x2 = link.target.x;
      let y2 = link.target.y;

      if (link.source.type === 'core') {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > logoRadius) {
          // Move start point to the edge of the logo
          x1 = x1 + (dx / dist) * logoRadius;
          y1 = y1 + (dy / dist) * logoRadius;
        }
      }

      link.el.setAttribute('x1', x1);
      link.el.setAttribute('y1', y1);
      link.el.setAttribute('x2', x2);
      link.el.setAttribute('y2', y2);

      // Update gradient coordinates so the fade follows the line direction
      if (link.gradEl) {
        link.gradEl.setAttribute('x1', x1);
        link.gradEl.setAttribute('y1', y1);
        link.gradEl.setAttribute('x2', x2);
        link.gradEl.setAttribute('y2', y2);
      }
    });
  }

  panTo(categoryName) {
    const node = this.nodes.find((n) => n.id === categoryName);
    if (!node) return;

    // Subtle pan to focus on the category
    const viewWidth = Math.max(this.width, 500);
    const viewHeight = Math.max(this.height, 500);
    gsap.to(this.svg, {
      attr: {
        viewBox: `${node.x - viewWidth / 2} ${node.y - viewHeight / 2} ${viewWidth} ${viewHeight}`,
      },
      duration: 1.2,
      ease: 'power2.inOut',
    });
  }

  resetView() {
    if (
      confirm('This will reset your custom infrastructure view. Are you sure?')
    ) {
      gsap.to(this.svg, {
        attr: {
          viewBox: `-${this.width / 2} -${this.height / 2} ${this.width} ${this.height}`,
        },
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }
  }

  // Add a non-confirming version for internal use
  internalResetView() {
    gsap.to(this.svg, {
      attr: {
        viewBox: `-${this.width / 2} -${this.height / 2} ${this.width} ${this.height}`,
      },
      duration: 1.2,
      ease: 'power2.inOut',
    });
  }

  animate() {
    this.updatePhysics();
    requestAnimationFrame(() => this.animate());
  }
}

function initEcosystemGraph() {
  const graph = new EcosystemGraph('ecosystem-graph');
  const textBlocks = document.querySelectorAll('.adaptive-text-block');

  if (!graph.container || textBlocks.length === 0) return;

  // Show the full ecosystem by default instead of panning to categories on scroll
  setTimeout(() => {
    graph.internalResetView();
  }, 500);
}

/* --- Pillar Showcase: Tab Switching Logic --- */
/* --- State Handling: Empty & Error states --- */
function showPillarState(state) {
  const allStates = document.querySelectorAll('.pillar-state');
  const allContent = document.querySelectorAll('.pillar-content');

  allStates.forEach((s) => s.classList.add('hidden'));

  if (state === 'normal') {
    const activeTab = document.querySelector('.nav-item.active');
    if (activeTab) {
      const target = activeTab.getAttribute('data-pillar');
      const targetContent = document.getElementById(`content-${target}`);
      if (targetContent) targetContent.classList.add('active');
    }
  } else {
    const stateEl = document.getElementById(`pillar-state-${state}`);
    if (stateEl) {
      allContent.forEach((c) => c.classList.remove('active'));
      stateEl.classList.remove('hidden');
    }
  }
}

function initPillarTabs() {
  const tabs = document.querySelectorAll('.nav-item');
  const contents = document.querySelectorAll('.pillar-content');
  const slider = document.querySelector('.nav-highlight');
  const stage = document.querySelector('.pillar-display-stage');

  if (!tabs.length || !contents.length || !slider || !stage) return;

  function moveSlider(tab) {
    slider.style.width = `${tab.offsetWidth}px`;
    slider.style.left = `${tab.offsetLeft}px`;
  }

  // Initialize slider position and stage attribute
  const activeTab = document.querySelector('.nav-item.active');
  if (activeTab) {
    const initialTarget = activeTab.getAttribute('data-pillar');
    stage.setAttribute('data-active-pillar', initialTarget);
    setTimeout(() => moveSlider(activeTab), 50);
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-pillar');
      if (!target) return;

      // Reset any active states when switching tabs
      showPillarState('normal');

      // Update Stage Attribute for CSS targeting
      stage.setAttribute('data-active-pillar', target);

      // Update Tabs
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Move the background highlight
      moveSlider(tab);

      // Update Content
      contents.forEach((content) => {
        content.classList.remove('active');
        if (content.id === `content-${target}`) {
          content.classList.add('active');
          // Dispatch custom event for canvas resizing
          window.dispatchEvent(new Event('pillarTabChanged'));
        }
      });

      // Toggle Build/Deploy Footer visibility
      const buildFooter = document.getElementById('infra-build-footer');
      const deployFooter = document.getElementById('drone-deploy-footer');

      if (buildFooter) {
        if (target === 'infra') {
          buildFooter.classList.add('visible');
        } else {
          buildFooter.classList.remove('visible');
        }
      }

      if (deployFooter) {
        if (target === 'drone') {
          deployFooter.classList.add('visible');
        } else {
          deployFooter.classList.remove('visible');
        }
      }
    });
  });

  // Initial check for Footers
  const activeTabOnLoad = document.querySelector('.nav-item.active');
  const buildFooter = document.getElementById('infra-build-footer');
  const deployFooter = document.getElementById('drone-deploy-footer');
  if (activeTabOnLoad) {
    const target = activeTabOnLoad.getAttribute('data-pillar');
    if (buildFooter && target === 'infra') buildFooter.classList.add('visible');
    if (deployFooter && target === 'drone')
      deployFooter.classList.add('visible');
  }

  // Handle window resize to keep slider aligned
  window.addEventListener('resize', () => {
    const currentActive = document.querySelector('.nav-item.active');
    if (currentActive) moveSlider(currentActive);
  });
}

/* --- Infrastructure Showcase: Particle Data Vault --- */
function initInfraCanvas() {
  const canvas = document.getElementById('infraCanvas');
  if (!canvas) return;

  if (typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);

  function resize() {
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000); // 1:1 aspect for the square pane
  camera.position.z = 16;
  camera.position.y = 6;
  camera.lookAt(0, 0, 0);

  // Create a 3D Grid of Particles (The Data Vault)
  const gridSize = 7; // Reduced grid size for better clarity in the smaller pane
  const spacing = 0.9;
  const particleCount = gridSize * gridSize * gridSize;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  const colorGold = new THREE.Color(0xe6cd99);
  const colorDim = new THREE.Color(0x222222);

  let idx = 0;
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
        positions[idx * 3] = (x - (gridSize - 1) / 2) * spacing;
        positions[idx * 3 + 1] = (y - (gridSize - 1) / 2) * spacing;
        positions[idx * 3 + 2] = (z - (gridSize - 1) / 2) * spacing;

        colorDim.toArray(colors, idx * 3);
        sizes[idx] = 1.0;
        idx++;
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Initial resize
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pillarTabChanged', resize);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    points.rotation.y += 0.002;
    points.rotation.x = Math.sin(time * 0.5) * 0.1;

    const posAttr = geometry.attributes.position;
    const colorAttr = geometry.attributes.color;

    // Data Pulse Animation
    for (let i = 0; i < particleCount; i++) {
      const y = posAttr.getY(i);
      const x = posAttr.getX(i);

      // Create a traveling "wave" of data light
      const pulse =
        Math.sin(y * 0.5 - time * 3.0) + Math.cos(x * 0.5 + time * 2.0);
      const intensity = Math.max(0, pulse > 1.5 ? 1.0 : 0.2);

      if (intensity > 0.5) {
        colorGold.toArray(colors, i * 3);
      } else {
        colorDim.toArray(colors, i * 3);
      }
    }
    colorAttr.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
}

/* --- Drone Solutions: Professional Industrial 3D Drone --- */
function initDroneCanvas() {
  const canvas = document.getElementById('droneCanvas');
  if (!canvas) return;
  if (typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 5, 12);
  camera.lookAt(0, 0, 0);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xe6cd99, 1.2);
  pointLight.position.set(5, 10, 5);
  scene.add(pointLight);

  const droneGroup = new THREE.Group();
  droneGroup.scale.setScalar(0.9);
  scene.add(droneGroup);

  const colorGold = new THREE.Color(0xe6cd99);
  const colorDark = new THREE.Color(0x1a1a1a);
  const colorGrey = new THREE.Color(0x444444);

  // Materials
  const bodyMat = new THREE.MeshPhongMaterial({
    color: colorDark,
    specular: colorGold,
    shininess: 100,
    flatShading: true,
  });

  const goldWireMat = new THREE.MeshBasicMaterial({
    color: colorGold,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
  });

  const glowingMat = new THREE.MeshBasicMaterial({
    color: colorGold,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  // 1. Central Chassis (Industrial Octagon)
  const chassisGeo = new THREE.CylinderGeometry(1.5, 1.7, 0.7, 8);
  const chassis = new THREE.Mesh(chassisGeo, bodyMat);
  droneGroup.add(chassis);

  const chassisWire = new THREE.Mesh(chassisGeo, goldWireMat);
  chassisWire.scale.setScalar(1.01);
  droneGroup.add(chassisWire);

  // 2. Battery / Power Module (Top)
  const batteryGeo = new THREE.BoxGeometry(1.2, 0.4, 2.0);
  const battery = new THREE.Mesh(batteryGeo, bodyMat);
  battery.position.y = 0.5;
  droneGroup.add(battery);

  // 3. Professional Arms (Reinforced Truss)
  const armLength = 4.0;
  const armCount = 4;
  for (let i = 0; i < armCount; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const armGroup = new THREE.Group();
    armGroup.rotation.y = angle;
    droneGroup.add(armGroup);

    // Main Tube
    const tubeGeo = new THREE.CylinderGeometry(0.12, 0.18, armLength, 6);
    tubeGeo.rotateZ(Math.PI / 2);
    tubeGeo.translate(armLength / 2, 0, 0);
    const tube = new THREE.Mesh(tubeGeo, bodyMat);
    armGroup.add(tube);

    // Support Truss (Wireframe)
    const truss = new THREE.Mesh(tubeGeo, goldWireMat);
    truss.scale.set(1, 1.5, 1.5);
    armGroup.add(truss);

    // 4. Heavy Duty Motors & Rotors
    const motorPos = armLength;
    const motorGroup = new THREE.Group();
    motorGroup.position.x = motorPos;
    armGroup.add(motorGroup);

    const motorGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 8);
    const motor = new THREE.Mesh(motorGeo, bodyMat);
    motorGroup.add(motor);

    const rotorGroup = new THREE.Group();
    rotorGroup.position.y = 0.4;
    motorGroup.add(rotorGroup);

    // Triple Blades (Carbon Fiber Look)
    for (let j = 0; j < 3; j++) {
      const bladeGeo = new THREE.BoxGeometry(2.5, 0.03, 0.2);
      bladeGeo.translate(1.25, 0, 0);
      const blade = new THREE.Mesh(bladeGeo, bodyMat);
      blade.rotation.y = (j * Math.PI * 2) / 3;
      rotorGroup.add(blade);
    }

    // Rotor Blur Disc
    const blurGeo = new THREE.CircleGeometry(2.6, 32);
    const blurMat = new THREE.MeshBasicMaterial({
      color: colorGold,
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const blur = new THREE.Mesh(blurGeo, blurMat);
    blur.rotation.x = Math.PI / 2;
    rotorGroup.add(blur);

    // Status LED
    const ledGeo = new THREE.SphereGeometry(0.1, 8, 8);
    const led = new THREE.Mesh(ledGeo, glowingMat.clone());
    led.position.set(0, -0.4, 0);
    motorGroup.add(led);
  }

  // 5. Landing Gear (Retractable Style)
  const gearGroup = new THREE.Group();
  droneGroup.add(gearGroup);

  const legGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.5);
  legGeo.translate(0, -0.75, 0);
  legGeo.rotateZ(0.3);

  const footGeo = new THREE.BoxGeometry(0.2, 0.1, 1.0);
  footGeo.translate(0, -1.5, 0);

  const legs = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  legs.forEach((l) => {
    const leg = new THREE.Mesh(legGeo, bodyMat);
    leg.position.set(l[0] * 0.8, -0.3, l[1] * 0.8);
    leg.rotation.y = Math.atan2(l[1], l[0]) + Math.PI / 2;
    gearGroup.add(leg);

    const foot = new THREE.Mesh(footGeo, bodyMat);
    foot.position.set(l[0] * 1.1, -0.3, l[1] * 1.1);
    foot.rotation.y = Math.atan2(l[1], l[0]) + Math.PI / 2;
    gearGroup.add(foot);
  });

  // 6. Sensor Payload (Gimbal & LiDAR)
  const payloadGroup = new THREE.Group();
  payloadGroup.position.y = -0.6;
  droneGroup.add(payloadGroup);

  const gimbalBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16),
    bodyMat
  );
  payloadGroup.add(gimbalBase);

  const cameraBall = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 16, 16),
    bodyMat
  );
  cameraBall.position.y = -0.4;
  payloadGroup.add(cameraBall);

  // LiDAR Beam (Cone)
  const beamGeo = new THREE.ConeGeometry(3, 10, 32, 1, true);
  beamGeo.translate(0, -5, 0);
  const beamMat = new THREE.MeshBasicMaterial({
    color: colorGold,
    transparent: true,
    opacity: 0.1,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  payloadGroup.add(beam);

  // 7. Landing Pad (Industrial Grid Base)
  const padGroup = new THREE.Group();
  padGroup.position.y = -6;
  scene.add(padGroup);

  // Main Grid
  const gridSize = 12;
  const gridDivisions = 6;
  const gridHelper = new THREE.GridHelper(
    gridSize,
    gridDivisions,
    colorGold,
    colorGrey
  );
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.2;
  padGroup.add(gridHelper);

  // Corner Brackets (Industrial L-shapes)
  const bracketSize = 1.5;
  const corners = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  corners.forEach((c) => {
    const bracketGroup = new THREE.Group();
    bracketGroup.position.set(c[0] * (gridSize / 2), 0, c[1] * (gridSize / 2));
    padGroup.add(bracketGroup);

    const bLineMat = new THREE.LineBasicMaterial({
      color: colorGold,
      transparent: true,
      opacity: 0.6,
    });

    // Horizontal corner lines
    const hpts = [
      new THREE.Vector3(-c[0] * bracketSize, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -c[1] * bracketSize),
    ];
    const bGeo = new THREE.BufferGeometry().setFromPoints(hpts);
    const bLine = new THREE.Line(bGeo, bLineMat);
    bracketGroup.add(bLine);
  });

  // Perimeter Lights (Corners and Mid-points)
  const padLights = [];
  const lightPositions = [
    [6, 0, 6],
    [-6, 0, 6],
    [6, 0, -6],
    [-6, 0, -6],
    [6, 0, 0],
    [-6, 0, 0],
    [0, 0, 6],
    [0, 0, -6],
  ];

  lightPositions.forEach((pos) => {
    const lightGeo = new THREE.BoxGeometry(0.2, 0.1, 0.2);
    const light = new THREE.Mesh(lightGeo, glowingMat.clone());
    light.position.set(pos[0], 0.05, pos[2]);
    padGroup.add(light);
    padLights.push(light);
  });

  // Interaction State
  let mouseX = 0;
  let mouseY = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX = (x / container.clientWidth) * 2 - 1;
    mouseY = -(y / container.clientHeight) * 2 + 1;
  });

  container.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
  });

  window.addEventListener('resize', resize);
  window.addEventListener('pillarTabChanged', resize);
  resize();

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // 1. Stable Flight Physics
    droneGroup.position.y = Math.sin(time * 0.8) * 0.2; // Very stable hover
    droneGroup.position.x = Math.cos(time * 0.4) * 0.1;

    // Professional Tilting
    const targetTiltX = -mouseY * 0.2;
    const targetTiltZ = -mouseX * 0.3;
    const targetRotY = mouseX * 0.5;

    droneGroup.rotation.x += (targetTiltX - droneGroup.rotation.x) * 0.04;
    droneGroup.rotation.z += (targetTiltZ - droneGroup.rotation.z) * 0.04;
    droneGroup.rotation.y += (targetRotY - droneGroup.rotation.y) * 0.03;

    // 2. Component Animations
    droneGroup.traverse((child) => {
      if (child.type === 'Group' && child.children.length > 2) {
        // This is a rotor group
        child.children.forEach((rotorChild) => {
          if (
            rotorChild.type === 'Mesh' &&
            rotorChild.geometry.type === 'BoxGeometry'
          ) {
            rotorChild.rotation.y += 0.6;
          }
        });
      }
    });

    // 3. Sensor & HUD Animation
    beam.rotation.y = time * 2;
    beam.scale.setScalar(1 + Math.sin(time * 4) * 0.05);

    // 4. Pad Light Sequence
    padLights.forEach((light, i) => {
      light.material.opacity = 0.3 + Math.sin(time * 3 + i * 0.5) * 0.5;
    });

    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   CTA BLUEPRINT LOGIC
   ========================================================================== */
function initBlueprintCTA() {
  const nodes = document.querySelectorAll('.blueprint-node');
  const submitBtn = document.getElementById('blueprint-submit');
  const logCount = document.getElementById('log-count');
  const logStatus = document.getElementById('log-status');
  const lines = document.querySelectorAll('.blueprint-line');

  if (!submitBtn) return;

  let selectedParams = new Set();

  function updateEmailLink() {
    const paramsList = Array.from(selectedParams).join(', ');
    const subject =
      selectedParams.size > 0
        ? `Technical Consultation: ${paramsList}`
        : 'Technical Consultation Inquiry';

    const body =
      selectedParams.size > 0
        ? `Initiating technical consultation for the following subsystems:%0D%0A- ${paramsList}%0D%0A%0D%0APlease provide additional mission details here:`
        : 'I would like to initiate a technical consultation regarding ASTR AI solutions.%0D%0A%0D%0APlease provide mission details here:';

    submitBtn.href = `mailto:hello@astrai.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (logCount)
      logCount.textContent = selectedParams.size.toString().padStart(2, '0');
    if (logStatus)
      logStatus.textContent =
        selectedParams.size > 0 ? 'CONFIG_ACTIVE' : 'READY';

    lines.forEach((line) => {
      if (selectedParams.size > 0) {
        line.style.stroke = 'var(--color-gold-DEFAULT)';
        line.style.strokeOpacity = '0.4';
        line.style.strokeDasharray = '4 4';
      } else {
        line.style.stroke = 'rgba(255,255,255,0.1)';
        line.style.strokeOpacity = '1';
        line.style.strokeDasharray = 'none';
      }
    });
  }

  updateEmailLink();

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      const paramName = node.getAttribute('data-param');

      if (selectedParams.has(paramName)) {
        selectedParams.delete(paramName);
        node.classList.remove('selected');
      } else {
        selectedParams.add(paramName);
        node.classList.add('selected');
      }

      updateEmailLink();
    });
  });
}

/* --- CTA Section: Particle "CONNECT" Animation --- */
function initCTAParticles() {
  const canvas = document.getElementById('cta-particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const isMobile = window.innerWidth < 768;
  const mouse = { x: null, y: null, radius: isMobile ? 60 : 100 };

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    init();
  }

  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor(x, y, color) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.baseX = x;
      this.baseY = y;

      // Cosmic Orbit Properties
      this.angle = Math.random() * Math.PI * 2;
      this.velocity = Math.random() * 0.02 + 0.01;
      this.radius = Math.random() * 100 + 50;

      this.size = 1.0;
      this.color = color;
      this.density = Math.random() * 20 + 1;
      this.formationStartTime = null;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update(now) {
      if (!this.formationStartTime) return;

      const elapsed = now - this.formationStartTime;
      const isForming = elapsed > 2000; // 2s drift before forming

      let isNearMouse = false;
      if (mouse.x !== null && mouse.y !== null) {
        let dxMouse = mouse.x - this.x;
        let dyMouse = mouse.y - this.y;
        let distMouse =
          Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse) + 0.0001;

        if (distMouse < mouse.radius) {
          isNearMouse = true;
          const force = (mouse.radius - distMouse) / mouse.radius;
          const dirX = (dxMouse / distMouse) * force * this.density;
          const dirY = (dyMouse / distMouse) * force * this.density;
          this.x -= dirX;
          this.y -= dirY;
        }
      }

      if (!isNearMouse) {
        if (isForming) {
          // High-fidelity Lerp to target
          const dxTarget = this.baseX - this.x;
          const dyTarget = this.baseY - this.y;

          // Use a spring-like attraction
          this.x += dxTarget * 0.05;
          this.y += dyTarget * 0.05;
        } else {
          // Cinematic Cosmic Vortex
          this.angle += this.velocity;
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;

          const targetX = centerX + Math.cos(this.angle) * this.radius;
          const targetY = centerY + Math.sin(this.angle) * this.radius;

          this.x += (targetX - this.x) * 0.02;
          this.y += (targetY - this.y) * 0.02;
        }
      }
    }
  }

  function init() {
    particles = [];
    const goldColor = '#e6cd99';

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    const fontSize = Math.min(canvas.width / 12, 40);
    tempCtx.fillStyle = 'white';
    tempCtx.font = `bold ${fontSize}px Cinzel`;
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';

    tempCtx.fillText(
      'INNOVATE WITH US!',
      tempCanvas.width / 2,
      tempCanvas.height / 2
    );

    const textData = tempCtx.getImageData(
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );

    // Increased density for clearer readability
    const step = 3; 
    for (let y = 0; y < textData.height; y += step) {
      for (let x = 0; x < textData.width; x += step) {
        if (textData.data[y * 4 * textData.width + x * 4 + 3] > 128) {
          particles.push(new Particle(x, y, goldColor));
        }
      }
    }
  }

  let animationId;
  let isVisible = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          // Reset formation timer for all particles when it scrolls into view
          const startTime = Date.now();
          particles.forEach((p) => (p.formationStartTime = startTime));
          animate();
        } else {
          cancelAnimationFrame(animationId);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(canvas.parentElement);

  function animate() {
    if (!isVisible) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = Date.now();
    for (let i = 0; i < particles.length; i++) {
      particles[i].draw();
      particles[i].update(now);
    }
    animationId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
}

/* ==========================================================================
   SOLUTIONS PAGE EXPANSION LOGIC
   ========================================================================== */
function initSolutionsExpansion() {
  // 1. Before & After Slider
  const baContainer = document.querySelector('.ba-container');
  if (baContainer) {
    const afterState = baContainer.querySelector('.ba-after');
    const handle = baContainer.querySelector('.ba-handle');
    let isDragging = false;

    const moveSlider = (e) => {
      if (!isDragging) return;
      const rect = baContainer.getBoundingClientRect();
      let x = (e.clientX || e.touches?.[0].clientX) - rect.left;
      x = Math.max(0, Math.min(x, rect.width)); // clamp
      const percent = (x / rect.width) * 100;
      
      handle.style.left = `${percent}%`;
      afterState.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
    };

    baContainer.addEventListener('mousedown', () => isDragging = true);
    baContainer.addEventListener('touchstart', () => { isDragging = true; }, {passive: true});
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('mousemove', moveSlider);
    window.addEventListener('touchmove', moveSlider, {passive: true});
  }

  // 2. Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      
      const isActive = item.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-content').style.maxHeight = '0px';
      });

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // 3. Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate all
      tabBtns.forEach(b => {
        b.classList.remove('active', 'bg-white/10', 'text-white');
        b.classList.add('text-white/50');
      });
      tabPanes.forEach(p => {
        p.classList.remove('active', 'opacity-100');
        p.classList.add('opacity-0', 'pointer-events-none');
        p.style.zIndex = '0';
      });

      // Activate clicked
      btn.classList.add('active', 'bg-white/10', 'text-white');
      btn.classList.remove('text-white/50');
      const targetId = btn.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active', 'opacity-100');
        targetPane.classList.remove('opacity-0', 'pointer-events-none');
        targetPane.style.zIndex = '10';
      }
    });
  });

  // 4. Strategic Choice Entry Animations (The Slider Section)
  const strategicSection = document.querySelector('.before-after-section');
  if (strategicSection && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const card = strategicSection.querySelector('.ba-container');
    const annotations = strategicSection.querySelectorAll('.xl\\:flex.flex-col .relative.pl-4');
    const mobileNotes = strategicSection.querySelectorAll('.xl\\:hidden .relative.pl-8');

    // Card Entrance
    if (card) {
      gsap.fromTo(card, 
        { scale: 0.95, opacity: 0, y: 40 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    }

    // Desktop Annotations Stagger
    if (annotations.length > 0) {
      gsap.fromTo(annotations,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: strategicSection.querySelector('.xl\\:flex'),
            start: "top 80%",
          }
        }
      );
    }

    // Mobile Notes Stagger
    if (mobileNotes.length > 0) {
      gsap.fromTo(mobileNotes,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: strategicSection.querySelector('.xl\\:hidden'),
            start: "top 90%",
          }
        }
      );
    }
  }

  // 5. Timeline ScrollTrigger
  const timelineSection = document.querySelector('.timeline-section');
  if (timelineSection && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    const steps = document.querySelectorAll('.timeline-step');
    const progressPath = document.getElementById('timeline-progress-path');
    const progressLineMobile = document.getElementById('timeline-progress-line-mobile');

    // Desktop: Curved SVG Path Animation
    if (progressPath && window.innerWidth >= 768) {
      const pathLength = progressPath.getTotalLength();
      
      // Initialize path
      gsap.set(progressPath, { 
        strokeDasharray: pathLength, 
        strokeDashoffset: pathLength 
      });

      gsap.to(progressPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-wrapper',
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: true
        }
      });
    }

    // Mobile: Straight Line Animation (Fallback)
    if (progressLineMobile && window.innerWidth < 768) {
      gsap.to(progressLineMobile, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-wrapper',
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: true
        }
      });
    }

    steps.forEach((step, i) => {
      const circle = step.querySelector('.step-circle');
      const content = step.querySelector('div:not(.absolute)'); // Targeting the content columns
      const isEven = i % 2 !== 0;

      // Animate the entire step container opacity
      gsap.to(step, {
        opacity: 1,
        scrollTrigger: {
          trigger: step,
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play reverse play reverse',
          onEnter: () => step.classList.add('active'),
          onLeaveBack: () => step.classList.remove('active')
        }
      });

      // Animate the circle (scale and border)
      if (circle) {
        gsap.fromTo(circle, 
          { scale: 0.8, borderColor: 'rgba(255,255,255,0.2)' },
          {
            scale: 1.2,
            borderColor: '#E6CD99',
            backgroundColor: 'rgba(230,205,153,0.1)',
            duration: 0.6,
            scrollTrigger: {
              trigger: step,
              start: 'top 60%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }

      // Animate the text content (slide in)
      if (content) {
        gsap.fromTo(content,
          { x: isEven ? 40 : -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSolutionsExpansion();
});


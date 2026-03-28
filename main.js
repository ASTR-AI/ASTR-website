/* ===================================
   ASTR AI — Main JavaScript
   =================================== */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initHeroCanvas();
  initEcosystemGraph();
  initPillarTabs();
  initInfraCanvas();
  initDroneCanvas();
});

/* --- Navbar scroll effect & mobile menu --- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/* --- Scroll reveal animation --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
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
  renderer.setPixelRatio(window.devicePixelRatio);

  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;
  renderer.setSize(width, height);

  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  // Move camera further back on smaller screens
  camera.position.z = width < 768 ? 14 : 9;

  // Keep camera centered
  camera.position.x = 0;

  camera.position.y = 1.0; // Angle down slightly

  // ---- Particle System Geometry & Materials ----
  const particleCount = 15000;
  const geometry = new THREE.BufferGeometry();

  // We need current positions for rendering, and original positions to act as a clean base for noise
  const positions = new Float32Array(particleCount * 3);
  const originalPositions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Shape Targets
  const shapeTargets = {
    sphere: new Float32Array(particleCount * 3),
    astra: new Float32Array(particleCount * 3), // Weapon / Arrow
    sun: new Float32Array(particleCount * 3), // Starburst
    planet: new Float32Array(particleCount * 3), // Planet with rings
  };

  // Color palette - Matching Golden mythological theme
  const colorGold = new THREE.Color(0xffd700); // Bright Gold
  const colorOrange = new THREE.Color(0xff8c00); // Deep Orange
  const colorYellow = new THREE.Color(0xffed4a); // Light Yellow/White

  // Pre-calculate vertices for all shapes
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

    // 2. Astra (Arrow/Weapon) - Exact ASTR AI Logo silhouette
    //    Uses polygon triangulation to fill particles within the logo outline.
    //    Logo vertices (x, y) define the spearhead with barbs:
    //      Tip at top, widens out, pinches at waist, two prongs sweep down.
    //
    //    Outline vertices (clockwise from tip):
    //      A(0,5)  B(1.8,0.8)  C(0.45,-0.8)  D(1.3,-3.8)  E(0.2,-2.0)  F(0,-3.2)
    //      G(-0.2,-2.0)  H(-1.3,-3.8)  I(-0.45,-0.8)  J(-1.8,0.8)
    //
    //    Triangulated into 8 triangles for uniform fill.
    const logoVerts = [
      [0, 5], // A - 0
      [1.8, 0.8], // B - 1
      [0.45, -0.8], // C - 2
      [1.3, -3.8], // D - 3
      [0.2, -2.0], // E - 4
      [0, -3.2], // F - 5
      [-0.2, -2.0], // G - 6
      [-1.3, -3.8], // H - 7
      [-0.45, -0.8], // I - 8
      [-1.8, 0.8], // J - 9
    ];
    // Triangles (indices into logoVerts) that fill the logo
    const logoTris = [
      [0, 1, 2], // upper right blade
      [0, 2, 8], // upper center
      [0, 8, 9], // upper left blade
      [2, 4, 8], // center diamond
      [4, 6, 8], // center lower
      [2, 3, 4], // right barb
      [8, 6, 7], // left barb
      [4, 5, 6], // bottom shaft tip
    ];
    // Pick a random triangle (weighted by area for uniformity)
    const triIdx = Math.floor(Math.random() * logoTris.length);
    const tri = logoTris[triIdx];
    const vA = logoVerts[tri[0]];
    const vB = logoVerts[tri[1]];
    const vC = logoVerts[tri[2]];
    // Random point inside triangle using barycentric coords
    let r1 = Math.random(),
      r2 = Math.random();
    if (r1 + r2 > 1) {
      r1 = 1 - r1;
      r2 = 1 - r2;
    }
    const bx = vA[0] + r1 * (vB[0] - vA[0]) + r2 * (vC[0] - vA[0]);
    const by = vA[1] + r1 * (vB[1] - vA[1]) + r2 * (vC[1] - vA[1]);
    shapeTargets.astra[i * 3] = bx;
    shapeTargets.astra[i * 3 + 1] = by;
    shapeTargets.astra[i * 3 + 2] = (Math.random() - 0.5) * 0.35; // thin z depth

    // 3. Sun / Star (Dense core with rays)
    const isRay = Math.random() > 0.7;
    const rSun = isRay ? Math.random() * 6 + 1.5 : Math.random() * 2;
    shapeTargets.sun[i * 3] = rSun * Math.sin(phi) * Math.cos(theta);
    shapeTargets.sun[i * 3 + 1] = rSun * Math.sin(phi) * Math.sin(theta);
    shapeTargets.sun[i * 3 + 2] = rSun * Math.cos(phi);

    // 4. Planet (Globe + Rings)
    const isRing = Math.random() > 0.4;
    if (isRing) {
      // Disk Ring
      const innerRadius = 3.5;
      const outerRadius = 7.0;
      const rRing = innerRadius + Math.random() * (outerRadius - innerRadius);
      shapeTargets.planet[i * 3] = rRing * Math.cos(theta);
      shapeTargets.planet[i * 3 + 1] = (Math.random() - 0.5) * 0.4; // Flatness
      shapeTargets.planet[i * 3 + 2] = rRing * Math.sin(theta);
    } else {
      // Core Globe
      const rPlanet = 2.5;
      shapeTargets.planet[i * 3] = rPlanet * Math.sin(phi) * Math.cos(theta);
      shapeTargets.planet[i * 3 + 1] =
        rPlanet * Math.sin(phi) * Math.sin(theta);
      shapeTargets.planet[i * 3 + 2] = rPlanet * Math.cos(phi);
    }

    // Initialize display positions at the sphere
    positions[i * 3] = shapeTargets.sphere[i * 3];
    positions[i * 3 + 1] = shapeTargets.sphere[i * 3 + 1];
    positions[i * 3 + 2] = shapeTargets.sphere[i * 3 + 2];

    originalPositions[i * 3] = shapeTargets.sphere[i * 3];
    originalPositions[i * 3 + 1] = shapeTargets.sphere[i * 3 + 1];
    originalPositions[i * 3 + 2] = shapeTargets.sphere[i * 3 + 2];

    // Spread colors
    const mix = Math.random();
    let c = colorGold.clone();
    if (mix > 0.6) c.lerp(colorOrange, Math.random());
    else if (mix > 0.3) c.lerp(colorYellow, Math.random());

    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  // aOriginalPosition acts as the base structure before noise is applied in the render loop
  geometry.setAttribute(
    'aOriginalPosition',
    new THREE.BufferAttribute(originalPositions, 3)
  );
  // aTarget tells the lerp function what shape structure to pull towards
  geometry.setAttribute(
    'aTarget',
    new THREE.BufferAttribute(shapeTargets.sphere, 3)
  );
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.04,
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
  const coreCount = 2000;
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

    // Sphere/Sun/Planet Core
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

    // Astra Core - central spine of the logo
    // Core particles form the bright inner shaft line
    const coreLogoVerts = [
      [0, 5], // tip
      [0.3, 0.8], // right inner edge
      [0.12, -1.5], // right mid
      [0, -3.2], // bottom
      [-0.12, -1.5], // left mid
      [-0.3, 0.8], // left inner edge
    ];
    const coreLogoTris = [
      [0, 1, 5], // upper core
      [1, 2, 5], // mid core
      [2, 4, 5], // lower-mid core
      [2, 3, 4], // bottom core
    ];
    const cTriIdx = Math.floor(Math.random() * coreLogoTris.length);
    const cTri = coreLogoTris[cTriIdx];
    const cvA = coreLogoVerts[cTri[0]];
    const cvB = coreLogoVerts[cTri[1]];
    const cvC = coreLogoVerts[cTri[2]];
    let cr1 = Math.random(),
      cr2 = Math.random();
    if (cr1 + cr2 > 1) {
      cr1 = 1 - cr1;
      cr2 = 1 - cr2;
    }
    coreTargets.astra[i * 3] =
      cvA[0] + cr1 * (cvB[0] - cvA[0]) + cr2 * (cvC[0] - cvA[0]);
    coreTargets.astra[i * 3 + 1] =
      cvA[1] + cr1 * (cvB[1] - cvA[1]) + cr2 * (cvC[1] - cvA[1]);
    coreTargets.astra[i * 3 + 2] = (Math.random() - 0.5) * 0.08;

    corePositions[i * 3] = cx;
    corePositions[i * 3 + 1] = cy;
    corePositions[i * 3 + 2] = cz;

    coreOriginals[i * 3] = cx;
    coreOriginals[i * 3 + 1] = cy;
    coreOriginals[i * 3 + 2] = cz;
  }
  coreGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(corePositions, 3)
  );
  coreGeometry.setAttribute(
    'aOriginalPosition',
    new THREE.BufferAttribute(coreOriginals, 3)
  );
  coreGeometry.setAttribute(
    'aTarget',
    new THREE.BufferAttribute(coreTargets.sphere, 3)
  );

  const coreMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: 0xffffff, // Hot white center
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const core = new THREE.Points(coreGeometry, coreMaterial);
  core.rotation.x = Math.PI / 8;
  scene.add(core);

  // Mouse interaction parameters
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let windowHalfX = width / 2;
  let windowHalfY = height / 2;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.0005;
    mouseY = (event.clientY - windowHalfY) * 0.0005;
  });
  window.addEventListener('resize', () => {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    windowHalfX = width / 2;
    windowHalfY = height / 2;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = width < 768 ? 14 : 9;
    camera.position.x = 0;
    camera.updateProjectionMatrix();
  });

  // ---- Animation State Machine ----
  const clock = new THREE.Clock();
  const shapeKeys = ['sphere', 'astra', 'sun', 'planet'];
  let currentShapeIndex = 0;
  let morphTimer = 0;
  const MORPH_INTERVAL = 8.0; // Seconds before changing shape

  // Lerp smoothing factor
  const LERP_SPEED = 0.015;

  // Dynamic noise scaling to preserve logo readability
  let currentNoiseScale = 0.35;

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const time = clock.getElapsedTime() * 0.3; // Animation speed

    const activeShape = shapeKeys[currentShapeIndex];
    const targetNoise = activeShape === 'astra' ? 0.04 : 0.35;
    currentNoiseScale += (targetNoise - currentNoiseScale) * LERP_SPEED * 2.0;

    // Shape Transition Logic
    morphTimer += delta;
    if (morphTimer > MORPH_INTERVAL) {
      morphTimer = 0;
      currentShapeIndex = (currentShapeIndex + 1) % shapeKeys.length;
      const nextShape = shapeKeys[currentShapeIndex];

      // Swap out the target attribute arrays
      geometry.setAttribute(
        'aTarget',
        new THREE.BufferAttribute(shapeTargets[nextShape], 3)
      );
      coreGeometry.setAttribute(
        'aTarget',
        new THREE.BufferAttribute(coreTargets[nextShape], 3)
      );
    }

    // Smooth mouse-follow rotation using lerp
    targetX = mouseX;
    targetY = mouseY;

    // Base continuous rotation
    particles.rotation.y += 0.002;
    core.rotation.y -= 0.003;
    core.rotation.x += 0.001;

    // Apply mouse offset smoothly
    particles.rotation.x += (targetY * 2 - particles.rotation.x) * 0.05;
    particles.rotation.y += (targetX * 2 - particles.rotation.y) * 0.05;

    // ---- Vertex Lerping & Deformation ----
    const posAttribute = geometry.attributes.position;
    const origAttribute = geometry.attributes.aOriginalPosition;
    const targetAttribute = geometry.attributes.aTarget;

    for (let i = 0; i < particleCount; i++) {
      // Get current base structure and target
      let ox = origAttribute.getX(i);
      let oy = origAttribute.getY(i);
      let oz = origAttribute.getZ(i);

      const tx = targetAttribute.getX(i);
      const ty = targetAttribute.getY(i);
      const tz = targetAttribute.getZ(i);

      // Lerp base structure towards target
      ox += (tx - ox) * LERP_SPEED;
      oy += (ty - oy) * LERP_SPEED;
      oz += (tz - oz) * LERP_SPEED;

      // Save updated base before noise
      origAttribute.setXYZ(i, ox, oy, oz);

      // Apply procedural waves on top of the base positions so it always undulates
      const freq = 1.0;
      const wave1 =
        Math.sin(ox * freq + time) *
        Math.cos(oy * freq + time) *
        Math.sin(oz * freq + time);
      const wave2 =
        Math.sin(ox * freq * 1.5 - time) *
        Math.cos(oy * freq * 1.5 + time) *
        0.5;
      const noise = wave1 + wave2;

      // Scale exaggerated by noise to create the breathing fire effect
      const scale = 1 + noise * currentNoiseScale;

      posAttribute.setXYZ(i, ox * scale, oy * scale, oz * scale);
    }
    origAttribute.needsUpdate = true;
    posAttribute.needsUpdate = true;

    // Core Lerping
    const corePosAttr = coreGeometry.attributes.position;
    const coreOrigAttr = coreGeometry.attributes.aOriginalPosition;
    const coreTargetAttr = coreGeometry.attributes.aTarget;
    for (let i = 0; i < coreCount; i++) {
      let ox = coreOrigAttr.getX(i);
      let oy = coreOrigAttr.getY(i);
      let oz = coreOrigAttr.getZ(i);

      const tx = coreTargetAttr.getX(i);
      const ty = coreTargetAttr.getY(i);
      const tz = coreTargetAttr.getZ(i);

      ox += (tx - ox) * (LERP_SPEED * 1.5); // Core moves slightly faster
      oy += (ty - oy) * (LERP_SPEED * 1.5);
      oz += (tz - oz) * (LERP_SPEED * 1.5);

      coreOrigAttr.setXYZ(i, ox, oy, oz);

      const noise = Math.sin(ox * 3 - time * 2) * Math.cos(oy * 3 + time * 2);
      const scale = 1 + noise * (currentNoiseScale * 0.4);

      corePosAttr.setXYZ(i, ox * scale, oy * scale, oz * scale);
    }
    coreOrigAttr.needsUpdate = true;
    corePosAttr.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
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
    // Create fading gradient lines for each link
    this.links.forEach((link, idx) => {
      // Create a unique gradient per link
      const gradId = `edge-grad-${idx}`;
      const grad = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'linearGradient'
      );
      grad.setAttribute('id', gradId);
      grad.setAttribute('gradientUnits', 'userSpaceOnUse');

      const stop1 = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'stop'
      );
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', 'rgba(212, 175, 55, 0.25)');

      const stop2 = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'stop'
      );
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', 'rgba(212, 175, 55, 0)');

      grad.appendChild(stop1);
      grad.appendChild(stop2);
      this.defs.appendChild(grad);

      const line = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      line.setAttribute('class', 'edge-line');
      line.setAttribute('stroke', `url(#${gradId})`);
      link.el = line;
      link.gradEl = grad;
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
          'Pictures/without bg.png'
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
      link.el.setAttribute('x1', link.source.x);
      link.el.setAttribute('y1', link.source.y);
      link.el.setAttribute('x2', link.target.x);
      link.el.setAttribute('y2', link.target.y);

      // Update gradient coordinates so the fade follows the line direction
      if (link.gradEl) {
        link.gradEl.setAttribute('x1', link.source.x);
        link.gradEl.setAttribute('y1', link.source.y);
        link.gradEl.setAttribute('x2', link.target.x);
        link.gradEl.setAttribute('y2', link.target.y);
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
    graph.resetView();
  }, 500);
}

/* --- Pillar Showcase: Tab Switching Logic --- */
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

      // Toggle Build Footer visibility (only for Infrastructure)
      const buildFooter = document.getElementById('infra-build-footer');
      if (buildFooter) {
        if (target === 'infra') {
          buildFooter.classList.add('visible');
        } else {
          buildFooter.classList.remove('visible');
        }
      }
    });
  });

  // Initial check for Build Footer (in case Infra is active on load)
  const activeTabOnLoad = document.querySelector('.nav-item.active');
  const buildFooter = document.getElementById('infra-build-footer');
  if (activeTabOnLoad && buildFooter) {
    if (activeTabOnLoad.getAttribute('data-pillar') === 'infra') {
      buildFooter.classList.add('visible');
    }
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
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
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
    flatShading: true
  });
  
  const goldWireMat = new THREE.MeshBasicMaterial({ 
    color: colorGold, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.4 
  });

  const glowingMat = new THREE.MeshBasicMaterial({ 
    color: colorGold, 
    transparent: true, 
    opacity: 0.8,
    blending: THREE.AdditiveBlending 
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
  for(let i=0; i < armCount; i++) {
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
    for(let j=0; j < 3; j++) {
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
      blending: THREE.AdditiveBlending
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

  const legs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  legs.forEach(l => {
    const leg = new THREE.Mesh(legGeo, bodyMat);
    leg.position.set(l[0] * 0.8, -0.3, l[1] * 0.8);
    leg.rotation.y = Math.atan2(l[1], l[0]) + Math.PI/2;
    gearGroup.add(leg);
    
    const foot = new THREE.Mesh(footGeo, bodyMat);
    foot.position.set(l[0] * 1.1, -0.3, l[1] * 1.1);
    foot.rotation.y = Math.atan2(l[1], l[0]) + Math.PI/2;
    gearGroup.add(foot);
  });

  // 6. Sensor Payload (Gimbal & LiDAR)
  const payloadGroup = new THREE.Group();
  payloadGroup.position.y = -0.6;
  droneGroup.add(payloadGroup);

  const gimbalBase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16), bodyMat);
  payloadGroup.add(gimbalBase);

  const cameraBall = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 16), bodyMat);
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
    side: THREE.DoubleSide
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
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, colorGold, colorGrey);
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.2;
  padGroup.add(gridHelper);

  // Corner Brackets (Industrial L-shapes)
  const bracketSize = 1.5;
  const corners = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  
  corners.forEach(c => {
    const bracketGroup = new THREE.Group();
    bracketGroup.position.set(c[0] * (gridSize/2), 0, c[1] * (gridSize/2));
    padGroup.add(bracketGroup);

    const bLineMat = new THREE.LineBasicMaterial({ color: colorGold, transparent: true, opacity: 0.6 });
    
    // Horizontal corner lines
    const hpts = [
      new THREE.Vector3(-c[0] * bracketSize, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -c[1] * bracketSize)
    ];
    const bGeo = new THREE.BufferGeometry().setFromPoints(hpts);
    const bLine = new THREE.Line(bGeo, bLineMat);
    bracketGroup.add(bLine);
  });

  // Perimeter Lights (Corners and Mid-points)
  const padLights = [];
  const lightPositions = [
    [6, 0, 6], [-6, 0, 6], [6, 0, -6], [-6, 0, -6],
    [6, 0, 0], [-6, 0, 0], [0, 0, 6], [0, 0, -6]
  ];

  lightPositions.forEach(pos => {
    const lightGeo = new THREE.BoxGeometry(0.2, 0.1, 0.2);
    const light = new THREE.Mesh(lightGeo, glowingMat.clone());
    light.position.set(pos[0], 0.05, pos[2]);
    padGroup.add(light);
    padLights.push(light);
  });

  // Interaction State
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
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
    droneGroup.traverse(child => {
      if (child.type === 'Group' && child.children.length > 2) {
        // This is a rotor group
        child.children.forEach(rotorChild => {
          if (rotorChild.type === 'Mesh' && rotorChild.geometry.type === 'BoxGeometry') {
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



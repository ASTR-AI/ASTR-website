/* ===================================
   ASTR AI — Main JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initNavbar();
    initScrollReveal();
    initHeroCanvas();
    initBlueprintScroll();
});

/* --- Lenis: Smooth Scroll --- */
function initLenis() {
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
        duration: 1.0, // Reduced from 1.2 for snappier feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.1, // Added for better response
        touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // --- GSAP Section Snapping ---
    const sections = ['#hero', '#adaptive', '#pillars', '#future', '#footer'];

    // Check if we are on the landing page (index.html)
    if (document.getElementById('hero')) {
        ScrollTrigger.create({
            start: 0,
            end: "max",
            snap: {
                snapTo: (value) => {
                    const sectionElements = sections.map(id => document.querySelector(id)).filter(el => el !== null);
                    const positions = [];
                    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

                    sectionElements.forEach(el => {
                        const pos = el.offsetTop / totalHeight;
                        positions.push(pos);

                        // Special case for the long adaptive section (4 steps)
                        if (el.id === 'adaptive') {
                            const height = el.offsetHeight;
                            // Add snap points for step 2, 3, and 4
                            positions.push((el.offsetTop + height * 0.25) / totalHeight);
                            positions.push((el.offsetTop + height * 0.50) / totalHeight);
                            positions.push((el.offsetTop + height * 0.75) / totalHeight);
                        }
                    });

                    // Sort positions numerically
                    positions.sort((a, b) => a - b);

                    let closest = positions.reduce((prev, curr) => {
                        return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
                    });

                    return closest;
                },
                duration: { min: 0.2, max: 0.5 },
                delay: 0.2, // Increased delay to allow manual scrolling to settle
                ease: "power1.inOut"
            }
        });
    }
}

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
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

/* --- Scroll reveal animation --- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* --- Hero Canvas: Cosmic Astra / Star Visualization (Three.js WebGL) --- */
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded. Make sure the CDN script is included in index.html.');
        return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
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
        planet: new Float32Array(particleCount * 3) // Planet with rings
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
            [0, 5],        // A - 0
            [1.8, 0.8],    // B - 1
            [0.45, -0.8],  // C - 2
            [1.3, -3.8],   // D - 3
            [0.2, -2.0],   // E - 4
            [0, -3.2],     // F - 5
            [-0.2, -2.0],  // G - 6
            [-1.3, -3.8],  // H - 7
            [-0.45, -0.8], // I - 8
            [-1.8, 0.8]    // J - 9
        ];
        // Triangles (indices into logoVerts) that fill the logo
        const logoTris = [
            [0, 1, 2],  // upper right blade
            [0, 2, 8],  // upper center
            [0, 8, 9],  // upper left blade
            [2, 4, 8],  // center diamond
            [4, 6, 8],  // center lower
            [2, 3, 4],  // right barb
            [8, 6, 7],  // left barb
            [4, 5, 6]   // bottom shaft tip
        ];
        // Pick a random triangle (weighted by area for uniformity)
        const triIdx = Math.floor(Math.random() * logoTris.length);
        const tri = logoTris[triIdx];
        const vA = logoVerts[tri[0]];
        const vB = logoVerts[tri[1]];
        const vC = logoVerts[tri[2]];
        // Random point inside triangle using barycentric coords
        let r1 = Math.random(), r2 = Math.random();
        if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }
        const bx = vA[0] + r1 * (vB[0] - vA[0]) + r2 * (vC[0] - vA[0]);
        const by = vA[1] + r1 * (vB[1] - vA[1]) + r2 * (vC[1] - vA[1]);
        shapeTargets.astra[i * 3] = bx;
        shapeTargets.astra[i * 3 + 1] = by;
        shapeTargets.astra[i * 3 + 2] = (Math.random() - 0.5) * 0.35; // thin z depth

        // 3. Sun / Star (Dense core with rays)
        const isRay = Math.random() > 0.7;
        const rSun = isRay ? (Math.random() * 6 + 1.5) : (Math.random() * 2);
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
            shapeTargets.planet[i * 3 + 1] = rPlanet * Math.sin(phi) * Math.sin(theta);
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
    geometry.setAttribute('aOriginalPosition', new THREE.BufferAttribute(originalPositions, 3));
    // aTarget tells the lerp function what shape structure to pull towards
    geometry.setAttribute('aTarget', new THREE.BufferAttribute(shapeTargets.sphere, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
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
        planet: new Float32Array(coreCount * 3)
    }

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

        coreTargets.sphere[i * 3] = cx; coreTargets.sphere[i * 3 + 1] = cy; coreTargets.sphere[i * 3 + 2] = cz;
        coreTargets.sun[i * 3] = cx * 1.5; coreTargets.sun[i * 3 + 1] = cy * 1.5; coreTargets.sun[i * 3 + 2] = cz * 1.5;
        coreTargets.planet[i * 3] = cx * 1.2; coreTargets.planet[i * 3 + 1] = cy * 1.2; coreTargets.planet[i * 3 + 2] = cz * 1.2;

        // Astra Core - central spine of the logo
        // Core particles form the bright inner shaft line
        const coreLogoVerts = [
            [0, 5],       // tip
            [0.3, 0.8],   // right inner edge
            [0.12, -1.5], // right mid
            [0, -3.2],    // bottom
            [-0.12, -1.5],// left mid
            [-0.3, 0.8]   // left inner edge
        ];
        const coreLogoTris = [
            [0, 1, 5],  // upper core
            [1, 2, 5],  // mid core
            [2, 4, 5],  // lower-mid core
            [2, 3, 4]   // bottom core
        ];
        const cTriIdx = Math.floor(Math.random() * coreLogoTris.length);
        const cTri = coreLogoTris[cTriIdx];
        const cvA = coreLogoVerts[cTri[0]];
        const cvB = coreLogoVerts[cTri[1]];
        const cvC = coreLogoVerts[cTri[2]];
        let cr1 = Math.random(), cr2 = Math.random();
        if (cr1 + cr2 > 1) { cr1 = 1 - cr1; cr2 = 1 - cr2; }
        coreTargets.astra[i * 3] = cvA[0] + cr1 * (cvB[0] - cvA[0]) + cr2 * (cvC[0] - cvA[0]);
        coreTargets.astra[i * 3 + 1] = cvA[1] + cr1 * (cvB[1] - cvA[1]) + cr2 * (cvC[1] - cvA[1]);
        coreTargets.astra[i * 3 + 2] = (Math.random() - 0.5) * 0.08;

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
        size: 0.03,
        color: 0xffffff, // Hot white center
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false
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
            geometry.setAttribute('aTarget', new THREE.BufferAttribute(shapeTargets[nextShape], 3));
            coreGeometry.setAttribute('aTarget', new THREE.BufferAttribute(coreTargets[nextShape], 3));
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
            const wave1 = Math.sin(ox * freq + time) * Math.cos(oy * freq + time) * Math.sin(oz * freq + time);
            const wave2 = Math.sin(ox * freq * 1.5 - time) * Math.cos(oy * freq * 1.5 + time) * 0.5;
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

/* --- Adaptive Solutions: Sticky Split-Screen Blueprint Tracker --- */
function initBlueprintScroll() {
    const track = document.getElementById('adaptiveScrollTrack');
    const textBlocks = document.querySelectorAll('.adaptive-text-block');
    const svgNodes = [
        document.getElementById('svg-node-1'),
        document.getElementById('svg-node-2'),
        document.getElementById('svg-node-3'),
        document.getElementById('svg-node-4')
    ];

    if (!track || textBlocks.length === 0 || svgNodes.includes(null)) return;

    function handleScroll() {
        const rect = track.getBoundingClientRect();
        const scrollDistance = rect.height - window.innerHeight;

        if (scrollDistance <= 0) return;

        let progress = -rect.top / scrollDistance;
        progress = Math.max(0, Math.min(1, progress));

        const totalBlocks = textBlocks.length;
        let index = Math.floor(progress * totalBlocks);
        if (index >= totalBlocks) index = totalBlocks - 1;

        if (index % 2 === 1) {
            track.classList.add('layout-reverse');
        } else {
            track.classList.remove('layout-reverse');
        }

        textBlocks.forEach((block, i) => {
            if (i === index) {
                block.classList.add('active');
                svgNodes[i].classList.add('active');
            } else {
                block.classList.remove('active');
                svgNodes[i].classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // init once on load
}
/* ── Three Pillars: Orbital Stage (CSS + JS) ── */
/* ── config ── */
const PILLARS = [
    {
        id: 'pillarAI', num: '01', title: 'AI Solutions', angle: -90,
        desc: 'Custom software, AI agent integration & workflow optimisation to transform operations end-to-end.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 0-4 4c0 2 1 3 2 4l-5 7h14l-5-7c1-1 2-2 2-4a4 4 0 0 0-4-4z"/><path d="M12 18v4"/></svg>`,
        gfDur: '5.2s', gfDelay: '0s'
    },
    {
        id: 'pillarInfra', num: '02', title: 'Infrastructure', angle: 30,
        desc: 'Advanced IT hardware & smart ecosystems — including centralised command and control rooms.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
        gfDur: '4.6s', gfDelay: '-1.5s'
    },
    {
        id: 'pillarDrone', num: '03', title: 'Drone Solutions', angle: 150,
        desc: 'The ASTR Drone Network for surveillance, logistics & infrastructure inspection at scale.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/><circle cx="5" cy="5" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/></svg>`,
        gfDur: '5.8s', gfDelay: '-0.8s'
    }
];

const stage = document.getElementById('stage');
const stageRect = () => stage.getBoundingClientRect();
const CX = () => stage.offsetWidth / 2;
const CY = () => stage.offsetHeight / 2;
const RADIUS = () => stage.offsetWidth * 0.36;

/* ── build stars ── */
const starContainer = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2 + 0.5;
    s.style.cssText = `
    left:${Math.random() * 100}%;top:${Math.random() * 100}%;
    width:${size}px;height:${size}px;
    --dur:${2 + Math.random() * 4}s;
    --delay:${-Math.random() * 5}s;
    --min:${0.05 + Math.random() * 0.1};
    --max:${0.3 + Math.random() * 0.5};
  `;
    starContainer.appendChild(s);
}

/* ── build pillar nodes + spokes ── */
function placeNodes() {
    // remove old
    stage.querySelectorAll('.pillar-node,.spoke,.spoke-dot').forEach(e => e.remove());

    const cx = CX(), cy = CY(), r = RADIUS();

    PILLARS.forEach((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const nx = cx + r * Math.cos(rad);
        const ny = cy + r * Math.sin(rad);

        /* spoke */
        const dx = nx - cx, dy = ny - cy;
        const len = Math.sqrt(dx * dx + dy * dy);
        const angD = Math.atan2(dy, dx) * 180 / Math.PI;

        const spoke = document.createElement('div');
        spoke.className = 'spoke';
        spoke.style.cssText = `width:${len * 0.72}px;transform:rotate(${angD}deg);margin-left:-1px;`;
        stage.appendChild(spoke);

        /* travelling dot */
        const dot = document.createElement('div');
        dot.className = 'spoke-dot';
        dot.style.cssText = `
      --tx:${dx * 0.68}px;--ty:${dy * 0.68}px;
      --ts-dur:${2.5 + i}s;--ts-delay:${-i * 0.9}s;
    `;
        stage.appendChild(dot);

        /* node */
        const node = document.createElement('div');
        node.className = 'pillar-node';
        node.id = p.id;
        node.style.cssText = `transform:translate(${nx - cx}px,${ny - cy}px)`;

        /* decide text alignment based on angle */
        const isLeft = Math.cos(rad) < -0.3;
        const isRight = Math.cos(rad) > 0.3;
        const flexDir = 'column';
        let bodyStyle = 'transform:translate(-50%,-50%);';
        if (isLeft) bodyStyle = 'transform:translate(-88%,-50%);align-items:flex-end;text-align:right;';
        if (isRight) bodyStyle = 'transform:translate(-12%,-50%);align-items:flex-start;text-align:left;';

        const connStyle = isLeft
            ? 'margin-left:auto;margin-right:31px;'
            : 'margin-left:31px;';

        node.innerHTML = `
      <div class="node-body" style="${bodyStyle}">
        <div class="node-gem" style="--gf-dur:${p.gfDur};--gf-delay:${p.gfDelay}">
          ${p.icon}
        </div>
        <div class="node-connector" style="${connStyle}"></div>
        <div class="node-label">
          <div class="node-number">${p.num}</div>
          <div class="node-title">${p.title}</div>
          <div class="node-desc">${p.desc}</div>
          <a href="#" class="node-link">
            Learn more
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>`;

        stage.appendChild(node);
    });
}

placeNodes();
window.addEventListener('resize', placeNodes);

/* ── slow orbital rotation (entire stage) ── */
let stageAngle = 0;
function rotateStage() {
    stageAngle += 0.012;
    /* rotate ONLY the spokes+dots by rotating the stage lightly,
       but keep the nucleus text upright by counter-rotating nucleus */
    const nucleus = document.querySelector('.nucleus');
    if (nucleus) nucleus.style.transform = `translate(-50%,-50%) rotate(${-stageAngle}deg)`;

    /* gently rotate orbits */
    document.querySelectorAll('.orbit-ring').forEach((r, i) => {
        const base = [0, 30, 60][i];
        r.style.transform = `translate(-50%,-50%) rotateX(72deg) rotateZ(${base + stageAngle * 0.4 * (i + 1) * 0.5}deg)`;
    });

    requestAnimationFrame(rotateStage);
}
rotateStage();

/* ── parallax on mouse move ── */
document.addEventListener('mousemove', e => {
    const w = window.innerWidth, h = window.innerHeight;
    const dx = (e.clientX / w - 0.5) * 2;
    const dy = (e.clientY / h - 0.5) * 2;
    stage.style.transform = `perspective(900px) rotateX(${dy * -4}deg) rotateY(${dx * 5}deg)`;
    starContainer.style.transform = `translate(${dx * -14}px,${dy * -10}px)`;
});
document.addEventListener('mouseleave', () => {
    stage.style.transform = '';
    starContainer.style.transform = '';
});

/* ── node gem hover glow pulse ── */
document.addEventListener('mouseover', e => {
    const gem = e.target.closest('.node-gem');
    if (gem) gem.style.setProperty('--glow', 'rgba(201,168,76,0.35)');
});

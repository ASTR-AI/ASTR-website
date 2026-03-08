/* ===================================
   ASTR AI — Main JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollReveal();
    initHeroCanvas();
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

/* --- Hero Canvas: Cosmic Astra / Star Visualization --- */
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, cx, cy;
    let animationId;
    let time = 0;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    // Gold / Fire color palette
    const GOLD = { r: 230, g: 205, b: 153 };
    const ORANGE = { r: 255, g: 140, b: 0 };
    const RED = { r: 200, g: 30, b: 0 };

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        // Offset center to the right on larger screens so it doesn't collide with text
        cx = width > 992 ? width * 0.65 : width / 2;
        cy = height / 2;
    }

    function getParticleCount() {
        return width < 768 ? 150 : 300;
    }

    function initParticles() {
        particles = [];
        const count = getParticleCount();
        for (let i = 0; i < count; i++) {
            particles.push({
                angle: Math.random() * Math.PI * 2,
                dist: Math.random() * 150 + 50,
                speed: (Math.random() - 0.5) * 0.003,
                size: Math.random() * 2 + 0.5,
                color: Math.random() > 0.6 ? GOLD : (Math.random() > 0.5 ? ORANGE : RED),
                life: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.01 + 0.005,
                vx: 0,
                vy: 0
            });
        }
    }

    function drawAstraCore(time, scale) {
        // Glowing core (Sun / Bindu)
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 1.5);
        coreGrad.addColorStop(0, `rgba(255, 255, 230, 0.4)`);
        coreGrad.addColorStop(0.15, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, 0.2)`);
        coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, scale * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Rotating geometric rings (Mandala / Chakra feel)
        const numRings = 4;
        for (let i = 0; i < numRings; i++) {
            const radius = scale * (0.25 + i * 0.25);
            const points = 8 + i * 8; // Number of petals/points
            const rotation = time * (i % 2 === 0 ? 0.06 : -0.04) + (i * Math.PI / 4);

            ctx.beginPath();
            for (let j = 0; j < points; j++) {
                const angle = rotation + (j / points) * Math.PI * 2;
                // Star-like wavy distortion (petals)
                const distortedRadius = radius + Math.sin(j * (i + 2) + time * 0.5) * (scale * 0.08);

                const px = cx + Math.cos(angle) * distortedRadius;
                const py = cy + Math.sin(angle) * distortedRadius;
                if (j === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();

            ctx.lineWidth = 2 - i * 0.4;
            ctx.strokeStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${0.4 - i * 0.08})`;
            ctx.stroke();

            // Outer connection points (Bindus on the Chakra)
            ctx.beginPath();
            for (let j = 0; j < points; j++) {
                const angle = rotation + (j / points) * Math.PI * 2;
                const distortedRadius = radius + Math.sin(j * (i + 2) + time * 0.5) * (scale * 0.08);

                const px = cx + Math.cos(angle) * distortedRadius;
                const py = cy + Math.sin(angle) * distortedRadius;

                ctx.moveTo(px, py);
                ctx.arc(px, py, 1.5, 0, Math.PI * 2);
            }
            ctx.fillStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, 0.6)`;
            ctx.fill();
        }

        // Solar flare / energy bursts (Tejas)
        const rays = 24;
        ctx.beginPath();
        for (let i = 0; i < rays; i++) {
            const angle = (i / rays) * Math.PI * 2 + time * 0.015;
            // Dynamic length
            const rayLength = scale * 0.8 + Math.sin(i * 7 - time * 0.8) * scale * 0.4;

            ctx.moveTo(cx + Math.cos(angle) * (scale * 0.2), cy + Math.sin(angle) * (scale * 0.2));
            ctx.lineTo(cx + Math.cos(angle) * rayLength, cy + Math.sin(angle) * rayLength);
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, 0.15)`;
        ctx.stroke();
    }

    function updateAndDrawParticles(scale) {
        for (let p of particles) {
            p.angle += p.speed;
            p.life += p.wobbleSpeed;

            // Orbiting around center with sine-wave breathing
            const currentDist = (p.dist * (scale / 120)) + Math.sin(p.life) * (scale * 0.15);
            let px = cx + Math.cos(p.angle) * currentDist;
            let py = cy + Math.sin(p.angle) * currentDist;

            // Mouse interaction (repel)
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const distToMouse = Math.sqrt(dx * dx + dy * dy);
            if (distToMouse < 150) {
                const force = (150 - distToMouse) / 150;
                p.vx += (dx / distToMouse) * force * 2;
                p.vy += (dy / distToMouse) * force * 2;
            }

            p.vx *= 0.9;
            p.vy *= 0.9;
            px += p.vx;
            py += p.vy;

            const alpha = 0.2 + Math.sin(p.life * 2) * 0.4;

            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        time += 0.003;
        const baseScale = Math.min(width, height) * 0.4;

        // Gentle breathing effect for the whole structure
        const scale = baseScale * (1 + Math.sin(time) * 0.01);

        drawAstraCore(time, scale);
        updateAndDrawParticles(scale);

        animationId = requestAnimationFrame(animate);
    }

    // Event listeners
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resize();
            initParticles();
        }, 200);
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    // Init
    resize();
    initParticles();
    animate();
}

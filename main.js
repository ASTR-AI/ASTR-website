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

/* --- Hero Canvas: Abstract Neural Network Visualization --- */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let nodes = [];
  let mouse = { x: -1000, y: -1000 };
  let animationId;

  const GOLD = { r: 200, g: 162, b: 78 };
  const NODE_COUNT_DESKTOP = 80;
  const NODE_COUNT_MOBILE = 40;
  const CONNECTION_DISTANCE = 180;
  const MOUSE_RADIUS = 200;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function getNodeCount() {
    return width < 768 ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;
  }

  function createNodes() {
    const count = getNodeCount();
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }

  function drawNode(node, time) {
    const pulse = Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.3 + 0.7;
    const alpha = node.opacity * pulse;

    // Outer glow
    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 4);
    gradient.addColorStop(0, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${alpha * 0.3})`);
    gradient.addColorStop(1, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, 0)`);
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Core dot
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${alpha})`;
    ctx.fill();
  }

  function drawConnection(a, b, dist) {
    const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${alpha})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }

  function updateNodes() {
    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off edges
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // Mouse influence
      const dx = node.x - mouse.x;
      const dy = node.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.02;
        node.vx += dx / dist * force;
        node.vy += dy / dist * force;
      }

      // Dampen velocity
      node.vx *= 0.998;
      node.vy *= 0.998;
    }
  }

  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DISTANCE) {
          drawConnection(nodes[i], nodes[j], dist);
        }
      }
    }

    // Draw nodes
    for (const node of nodes) {
      drawNode(node, time);
    }

    updateNodes();
    animationId = requestAnimationFrame(animate);
  }

  // Event listeners
  window.addEventListener('resize', () => {
    resize();
    createNodes();
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
  createNodes();
  animate(0);
}

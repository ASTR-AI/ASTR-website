import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const DIST_DIR = path.resolve('dist');
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

function createStaticServer(port = 8124) {
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/velocity.html';
    let filePath = path.join(DIST_DIR, reqPath);
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }
    if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
    // Also fallback to project root for /Pictures or other uncopied assets if any
    if (!fs.existsSync(filePath)) {
      const rootPath = path.resolve(reqPath.startsWith('/') ? reqPath.slice(1) : reqPath);
      if (fs.existsSync(rootPath) && fs.statSync(rootPath).isFile()) {
        filePath = rootPath;
      }
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      resolve({ server, port });
    });
  });
}

class CDPClient {
  constructor(ws) {
    this.ws = ws;
    this.id = 1;
    this.callbacks = new Map();
    this.events = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.text || 'Runtime.evaluate error');
    }
    return res.result?.value;
  }
}

async function startChrome(debugPort = 9225) {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      `--remote-debugging-port=${debugPort}`,
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  // Wait for remote debugging endpoint
  for (let i = 0; i < 50; i++) {
    try {
      const resp = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      if (resp.ok) break;
    } catch {
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  // Create new target
  const newTargetResp = await fetch(`http://127.0.0.1:${debugPort}/json/new`, { method: 'PUT' });
  const target = await newTargetResp.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => (ws.onopen = resolve));

  const client = new CDPClient(ws);
  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('DOM.enable');

  return { chrome, client, ws };
}

async function runAcceptance() {
  console.log('Building dist...');
  const { server, port } = await createStaticServer();
  console.log(`Static server running at http://127.0.0.1:${port}`);

  const { chrome, client } = await startChrome();
  console.log('Chrome headless started and connected via CDP');

  const screenshotsDir = path.resolve('docs/marketing/screenshots/mobile-responsiveness');
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const results = {
    viewports: {},
    interactions: {},
    screenshots: [],
    overflowFailures: [],
  };

  const requiredViewports = [
    { name: 'phone-320', width: 320, height: 740, mobile: true },
    { name: 'phone-360', width: 360, height: 800, mobile: true },
    { name: 'phone-390', width: 390, height: 844, mobile: true },
    { name: 'phone-430', width: 430, height: 932, mobile: true },
    { name: 'phone-landscape-844', width: 844, height: 390, mobile: true },
    { name: 'tablet-768', width: 768, height: 1024, mobile: false },
    { name: 'desktop-1024', width: 1024, height: 768, mobile: false },
    { name: 'desktop-1440', width: 1440, height: 900, mobile: false },
    // Breakpoint transitions
    { name: 'transition-767', width: 767, height: 800, mobile: true },
    { name: 'transition-768', width: 768, height: 800, mobile: false },
    { name: 'transition-800', width: 800, height: 800, mobile: false },
    { name: 'transition-801', width: 801, height: 800, mobile: false },
    { name: 'transition-860', width: 860, height: 800, mobile: false },
    { name: 'transition-861', width: 861, height: 800, mobile: false },
    { name: 'transition-900', width: 900, height: 800, mobile: false },
    { name: 'transition-901', width: 901, height: 800, mobile: false },
    { name: 'transition-1023', width: 1023, height: 800, mobile: false },
    { name: 'transition-1024', width: 1024, height: 800, mobile: false },
  ];

  // Helper to set viewport
  async function setViewport(w, h, isMobile) {
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: h,
      deviceScaleFactor: 1,
      mobile: isMobile,
    });
  }

  // Navigate to velocity page
  await client.send('Page.navigate', { url: `http://127.0.0.1:${port}/velocity.html` });
  await new Promise((r) => setTimeout(r, 1000));

  console.log('\n--- VERIFYING VIEWPORT MATRIX ---');
  for (const vp of requiredViewports) {
    await setViewport(vp.width, vp.height, vp.mobile);
    await new Promise((r) => setTimeout(r, 300));

    const check = await client.eval(`
      (() => {
        const docW = document.documentElement.clientWidth;
        const scrollW = document.documentElement.scrollWidth;
        const innerW = window.innerWidth;
        const overflowing = [];
        document.querySelectorAll('*').forEach((el) => {
          if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX === 'visible') {
            overflowing.push(el.tagName + (el.className ? '.' + el.className.split(' ').join('.') : ''));
          }
        });
        return {
          innerWidth: innerW,
          clientWidth: docW,
          scrollWidth: scrollW,
          hasHorizontalOverflow: scrollW > docW + 1,
          overflowDelta: scrollW - docW,
          overflowingElements: overflowing.slice(0, 5),
        };
      })()
    `);

    const passed = !check.hasHorizontalOverflow && check.innerWidth === vp.width;
    results.viewports[vp.name] = { ...check, width: vp.width, height: vp.height, passed };
    console.log(
      `Viewport ${vp.name} (${vp.width}x${vp.height}): innerWidth=${check.innerWidth}, scrollWidth=${check.scrollWidth}, clientWidth=${check.clientWidth} -> ${
        passed ? 'PASS' : 'FAIL (overflow ' + check.overflowDelta + 'px)'
      }`
    );
    if (!passed) {
      results.overflowFailures.push({ name: vp.name, ...check });
    }
  }

  // Helper to take screenshot
  async function captureShot(filename, clip = null) {
    const params = { format: 'png' };
    if (clip) params.clip = clip;
    const { data } = await client.send('Page.captureScreenshot', params);
    const filePath = path.join(screenshotsDir, filename);
    fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
    results.screenshots.push(filename);
    console.log(`Saved screenshot: ${filename}`);
  }

  console.log('\n--- VERIFYING INTERACTION STATES & CAPTURING EVIDENCE ---');

  // 1. Phone 390x844: Hero top
  await setViewport(390, 844, true);
  await client.eval('window.scrollTo(0, 0);');
  await new Promise((r) => setTimeout(r, 500));
  await captureShot('01-phone-390-hero.png');

  // 1b. Phone 390x844: Hero Mockup & Options
  const chapterStates = await client.eval(`
    (() => {
      const copy = document.querySelector('.v-hero-scroll-copy');
      if (copy) copy.scrollIntoView({ behavior: 'instant', block: 'center' });
      const chs = Array.from(document.querySelectorAll('.v-hero-chapter'));
      return chs.map(c => ({
        chapter: c.dataset.heroChapter,
        open: c.open,
        bodyH: c.querySelector('.v-hero-chapter-body')?.offsetHeight
      }));
    })()
  `);
  console.log('Chapter states at 01b:', chapterStates);
  await new Promise((r) => setTimeout(r, 400));
  await captureShot('01b-phone-390-hero-options.png');

  // 1c. Swipe hero rail to card 2 ("reorder")
  await client.eval(`
    (() => {
      const copy = document.querySelector('.v-hero-scroll-copy');
      const ch1 = document.querySelector('[data-hero-chapter="reorder"]');
      if (ch1 && copy) {
        ch1.scrollIntoView({ behavior: 'instant', inline: 'start', block: 'nearest' });
      }
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));
  await captureShot('01c-phone-390-hero-swipe.png');

  // 2. Purchasing Rail on Phone (First card and Last card)
  await client.eval(`
    (() => {
      const el = document.querySelector('#purchasing');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()
  `);
  await new Promise((r) => setTimeout(r, 500));

  // Verify purchasing rail initial state
  const purchaseInitial = await client.eval(`
    (() => {
      const rail = document.querySelector('[data-purchase-rail]');
      const prev = document.querySelector('[data-purchase-prev]');
      const next = document.querySelector('[data-purchase-next]');
      return {
        scrollLeft: rail.scrollLeft,
        prevDisabled: prev ? prev.disabled : null,
        nextDisabled: next ? next.disabled : null,
      };
    })()
  `);
  results.interactions.purchaseInitial = purchaseInitial;
  await captureShot('02-purchasing-rail-first.png');

  // Scroll to last card using next button
  await client.eval(`
    (() => {
      const next = document.querySelector('[data-purchase-next]');
      if (next) next.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 800));

  const purchaseScrolled = await client.eval(`
    (() => {
      const rail = document.querySelector('[data-purchase-rail]');
      const prev = document.querySelector('[data-purchase-prev]');
      const next = document.querySelector('[data-purchase-next]');
      return {
        scrollLeft: rail.scrollLeft,
        prevDisabled: prev ? prev.disabled : null,
        nextDisabled: next ? next.disabled : null,
      };
    })()
  `);
  results.interactions.purchaseScrolled = purchaseScrolled;
  await captureShot('03-purchasing-rail-last.png');

  // 3. Hospital Supply Longest Stage on Phone
  await client.eval(`
    (() => {
      const el = document.querySelector('#supply');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()
  `);
  await new Promise((r) => setTimeout(r, 600));
  await captureShot('04-supply-stage-phone.png');

  // 4. Everyday operations with last tab selected
  await client.eval(`
    (() => {
      const el = document.querySelector('#operations');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      const tabs = document.querySelectorAll('[data-operations-tab]');
      if (tabs.length > 0) {
        tabs[tabs.length - 1].click();
      }
    })()
  `);
  await new Promise((r) => setTimeout(r, 800));

  const operationsTabState = await client.eval(`
    (() => {
      const activeTab = document.querySelector('.v-operations-controls .nav-item.active, .v-operations-controls .nav-item[aria-selected="true"]');
      const activePanel = document.querySelector('.v-operations-panel:not([hidden])');
      return {
        activeTab: activeTab ? activeTab.textContent.trim() : null,
        activePanelId: activePanel ? activePanel.id : null,
      };
    })()
  `);
  results.interactions.operationsTabState = operationsTabState;
  await captureShot('05-operations-last-tab.png');

  // 5. Capability cards rail on phone
  await client.eval(`
    (() => {
      const el = document.querySelector('#features');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()
  `);
  await new Promise((r) => setTimeout(r, 600));
  await captureShot('06-capability-rail-phone.png');

  // 6. Comparison table scrolled right
  await client.eval(`
    (() => {
      const el = document.querySelector('#comparison');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      const scroll = document.querySelector('.v-comparison-scroll');
      if (scroll) scroll.scrollLeft = scroll.scrollWidth - scroll.clientWidth;
    })()
  `);
  await new Promise((r) => setTimeout(r, 600));
  await captureShot('07-comparison-scrolled-right.png');

  // 7. Demo form & Footer with Conversion Bar
  await client.eval(`
    (() => {
      const el = document.querySelector('#demo');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()
  `);
  await new Promise((r) => setTimeout(r, 600));
  await captureShot('08-demo-form-phone.png');

  // 8. Tablet overview (768x1024)
  await setViewport(768, 1024, false);
  await client.eval('window.scrollTo(0, 0);');
  await new Promise((r) => setTimeout(r, 600));
  await captureShot('09-tablet-768-overview.png');

  // 9. Desktop overview (1440x900)
  await setViewport(1440, 900, false);
  await client.eval('window.scrollTo(0, 0);');
  await new Promise((r) => setTimeout(r, 600));
  await captureShot('10-desktop-1440-overview.png');

  // Clean up
  chrome.kill();
  server.close();

  // Write verification report
  const reportPath = path.join(screenshotsDir, 'verification-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nVerification complete. Summary written to ${reportPath}`);

  return results;
}

runAcceptance().catch((err) => {
  console.error('Acceptance run failed:', err);
  process.exit(1);
});

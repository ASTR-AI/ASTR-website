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

function createStaticServer(port = 8129) {
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

async function startChrome(debugPort = 9227) {
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

  for (let i = 0; i < 50; i++) {
    try {
      const resp = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      if (resp.ok) break;
    } catch {
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  const newTargetResp = await fetch(`http://127.0.0.1:${debugPort}/json/new`, { method: 'PUT' });
  const target = await newTargetResp.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => (ws.onopen = resolve));

  const client = new CDPClient(ws);
  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('DOM.enable');

  return { chrome, client, ws, target };
}

async function run() {
  const outputDir = path.resolve('docs/marketing/screenshots/mobile-usability');
  fs.mkdirSync(outputDir, { recursive: true });

  const { server, port } = await createStaticServer();
  console.log(`Server started at http://127.0.0.1:${port}`);

  const { chrome, client, target } = await startChrome();
  console.log('Chrome connected');

  async function setViewport(w, h, isMobile) {
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: h,
      deviceScaleFactor: 1,
      mobile: isMobile,
    });
  }

  async function captureScreenshot(filepath, clip = null) {
    const params = clip ? { clip } : {};
    const res = await client.send('Page.captureScreenshot', params);
    fs.writeFileSync(filepath, Buffer.from(res.data, 'base64'));
  }

  await client.send('Page.navigate', { url: `http://127.0.0.1:${port}/velocity.html` });
  await new Promise((r) => setTimeout(r, 1500));

  console.log('\n=== PRIMARY ACCEPTANCE VIEWPORT (440 x 956) ===');
  await setViewport(440, 956, true);
  await new Promise((r) => setTimeout(r, 400));

  // Check 1: Horizontal overflow
  const overflowCheck = await client.eval(`
    (() => {
      const docW = document.documentElement.clientWidth;
      const scrollW = document.documentElement.scrollWidth;
      return { docW, scrollW, overflows: scrollW > docW };
    })()
  `);
  console.log('Horizontal overflow at 440px:', overflowCheck);

  // Check 2: Audience sentence beneath hero heading
  const heroAudience = await client.eval(`
    (() => {
      const intro = document.querySelector('.v-hero-intro');
      return intro ? intro.textContent.trim() : null;
    })()
  `);
  console.log('Hero audience copy:', heroAudience);

  // Check 3: Hero explanatory note visibility
  const heroNoteVisibility = await client.eval(`
    (() => {
      const reportFoot = document.querySelector('.v-hero-report-foot');
      const windowContent = document.querySelector('.v-window-content');
      if (!reportFoot || !windowContent) return { error: 'elements not found' };
      const footRect = reportFoot.getBoundingClientRect();
      const contRect = windowContent.getBoundingClientRect();
      return {
        footBottom: footRect.bottom,
        contentBottom: contRect.bottom,
        isClipped: footRect.bottom > contRect.bottom + 1,
        footText: reportFoot.textContent.trim()
      };
    })()
  `);
  console.log('Hero note visibility:', heroNoteVisibility);

  // Check 4: Reordering card composition
  const reorderMetrics = await client.eval(`
    (() => {
      const panel = document.querySelector('.v-reorder-panel');
      const card = document.querySelector('.v-reorder-summary-card');
      const details = document.querySelector('.v-workflow-details');
      if (!panel || !card) return { error: 'elements not found' };
      const panelRect = panel.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const detailsRect = details ? details.getBoundingClientRect() : null;
      const cardStyle = window.getComputedStyle(card);
      return {
        panelHeight: panelRect.height,
        cardPosition: cardStyle.position,
        cardBg: cardStyle.backgroundColor,
        cardOpacity: cardStyle.opacity,
        cardTransform: cardStyle.transform,
        cardBottomInset: panelRect.bottom - cardRect.bottom,
        cardLeftInset: cardRect.left - panelRect.left,
        cardRightInset: panelRect.right - cardRect.right,
        overlapsDisclosure: detailsRect ? cardRect.bottom > detailsRect.top : false
      };
    })()
  `);
  console.log('Reordering composition metrics:', reorderMetrics);

  // Check 5: Operations section sizing & 2-column grid
  const opsMetrics = await client.eval(`
    (() => {
      const opsSection = document.querySelector('#operations');
      const opsControls = document.querySelector('.v-operations-controls');
      const opsPanel = document.querySelector('.v-operations-panel');
      const opsCopy = document.querySelector('#operations .v-operations-copy');
      const tabs = [...document.querySelectorAll('[data-operations-tab]')];
      if (!opsSection || !opsControls) return { error: 'elements not found' };

      const sectionRect = opsSection.getBoundingClientRect();
      const panelRect = opsPanel ? opsPanel.getBoundingClientRect() : null;
      const copyStyle = opsCopy ? window.getComputedStyle(opsCopy) : null;
      const controlsStyle = window.getComputedStyle(opsControls);

      const tabRects = tabs.map((t) => {
        const r = t.getBoundingClientRect();
        return { id: t.dataset.operationsTab, left: r.left, top: r.top, width: r.width, height: r.height };
      });

      return {
        sectionHeight: sectionRect.height,
        panelHeight: panelRect ? panelRect.height : null,
        copyPadding: copyStyle ? copyStyle.padding : null,
        controlsDisplay: controlsStyle.display,
        controlsGridColumns: controlsStyle.gridTemplateColumns,
        tabs: tabRects
      };
    })()
  `);
  console.log('Operations layout metrics:', opsMetrics);

  // Check 6: Enlarge preview dialog interaction
  const dialogInteraction = await client.eval(`
    (() => {
      const trigger = document.querySelector('[data-enlarge-preview]');
      const dialog = document.querySelector('#inventory-preview-dialog');
      const closeBtn = document.querySelector('[data-dialog-close]');
      const dialogImg = document.querySelector('[data-dialog-img]');
      const dialogTitle = document.querySelector('#inventory-preview-title');
      if (!trigger || !dialog) return { error: 'trigger or dialog missing' };

      // Click enlarge
      trigger.click();

      const isOpen = dialog.hasAttribute('open') && !dialog.hasAttribute('hidden');
      const imgSrc = dialogImg ? dialogImg.src : null;
      const titleText = dialogTitle ? dialogTitle.textContent.trim() : null;

      return {
        isOpen,
        imgSrc,
        titleText
      };
    })()
  `);
  console.log('Enlarge dialog opened:', dialogInteraction);

  // Capture screenshot with dialog open
  await captureScreenshot(path.join(outputDir, '440x956-preview-dialog.png'));

  // Close dialog via Escape key
  const dialogClose = await client.eval(`
    (() => {
      const dialog = document.querySelector('#inventory-preview-dialog');
      const trigger = document.querySelector('[data-enlarge-preview]');
      dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      const isClosed = !dialog.hasAttribute('open');
      const focusReturned = document.activeElement === trigger;
      return { isClosed, focusReturned };
    })()
  `);
  console.log('Dialog closed via Escape and focus restored:', dialogClose);

  // Check 7: Hit targets (Header demo CTA and pagination dots)
  const hitTargets = await client.eval(`
    (() => {
      const navDemo = document.querySelector('.v-nav-demo');
      const dot = document.querySelector('.v-inventory-dot');
      const navDemoRect = navDemo ? navDemo.getBoundingClientRect() : null;
      const dotRect = dot ? dot.getBoundingClientRect() : null;
      const dotBeforeStyle = dot ? window.getComputedStyle(dot, '::before') : null;

      return {
        navDemo: { width: navDemoRect?.width, height: navDemoRect?.height },
        dotVisual: { width: dotRect?.width, height: dotRect?.height },
        dotActivationTarget: { width: dotBeforeStyle?.minWidth, height: dotBeforeStyle?.minHeight }
      };
    })()
  `);
  console.log('Hit targets:', hitTargets);

  // Check 8: Demo form copy & submit label
  const formCopy = await client.eval(`
    (() => {
      const intro = document.querySelector('.v-demo-card-intro');
      const submitBtn = document.querySelector('.v-demo-submit-btn span');
      return {
        intro: intro ? intro.textContent.trim().replace(/\\s+/g, ' ') : null,
        submitLabel: submitBtn ? submitBtn.textContent.trim() : null
      };
    })()
  `);
  console.log('Demo form copy & submit label:', formCopy);

  // Capture sectional screenshots at 440 x 956
  console.log('\nCapturing 440x956 section screenshots...');
  const sections = ['overview', 'inventory', 'reordering', 'operations', 'demo'];
  for (const id of sections) {
    await client.eval(`document.querySelector('#${id}')?.scrollIntoView({ block: 'start' });`);
    await new Promise((r) => setTimeout(r, 400));
    await captureScreenshot(path.join(outputDir, `440x956-${id}.png`));
  }

  // Multi-viewport matrix
  const otherViewports = [
    { name: '320x740', w: 320, h: 740, mobile: true },
    { name: '390x844', w: 390, h: 844, mobile: true },
    { name: '768x1024', w: 768, h: 1024, mobile: false },
    { name: '1440x900', w: 1440, h: 900, mobile: false },
  ];

  for (const vp of otherViewports) {
    console.log(`\nVerifying ${vp.name}...`);
    await setViewport(vp.w, vp.h, vp.mobile);
    await new Promise((r) => setTimeout(r, 300));

    const vpOverflow = await client.eval(`
      (() => {
        const docW = document.documentElement.clientWidth;
        const scrollW = document.documentElement.scrollWidth;
        return { docW, scrollW, overflows: scrollW > docW };
      })()
    `);
    console.log(`Overflow check for ${vp.name}:`, vpOverflow);

    await client.eval(`window.scrollTo(0, 0);`);
    await new Promise((r) => setTimeout(r, 300));
    await captureScreenshot(path.join(outputDir, `${vp.name}-hero.png`));

    await client.eval(`document.querySelector('#reordering')?.scrollIntoView({ block: 'start' });`);
    await new Promise((r) => setTimeout(r, 300));
    await captureScreenshot(path.join(outputDir, `${vp.name}-reordering.png`));
  }

  console.log('\nAll verifications completed successfully!');
  chrome.kill();
  server.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

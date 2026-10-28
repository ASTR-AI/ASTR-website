import { exec } from 'node:child_process';
import fs from 'node:fs';

const viewports = [
  { name: 'velocity-320x740.png', url: 'http://localhost:4173/velocity.html', width: 320, height: 740, mobile: true },
  { name: 'velocity-390x844.png', url: 'http://localhost:4173/velocity.html', width: 390, height: 844, mobile: true },
  { name: 'velocity-768x1024.png', url: 'http://localhost:4173/velocity.html', width: 768, height: 1024, mobile: true },
  { name: 'velocity-900x700.png', url: 'http://localhost:4173/velocity.html', width: 900, height: 700, mobile: false },
  { name: 'velocity-1280x720.png', url: 'http://localhost:4173/velocity.html', width: 1280, height: 720, mobile: false },
  { name: 'velocity-1440x900.png', url: 'http://localhost:4173/velocity.html', width: 1440, height: 900, mobile: false },
  { name: 'velocity-mobile-bar-390x844.png', url: 'http://localhost:4173/velocity.html', width: 390, height: 844, mobile: true, scrollTo: '#daily-work' },
  { name: 'velocity-adoption-1280x720.png', url: 'http://localhost:4173/velocity.html', width: 1280, height: 720, mobile: false, scrollTo: '#adoption' },
  { name: 'connect-velocity-390x844.png', url: 'http://localhost:4173/connect.html?product=velocity', width: 390, height: 844, mobile: true },
  { name: 'connect-velocity-1280x720.png', url: 'http://localhost:4173/connect.html?product=velocity', width: 1280, height: 720, mobile: false },
];

fs.mkdirSync('docs/marketing/screenshots', { recursive: true });

async function run() {
  const chrome = exec(
    '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --headless=new --remote-debugging-port=9228 --disable-gpu'
  );

  // Wait for chrome to start
  await new Promise((r) => setTimeout(r, 1200));

  try {
    for (const vp of viewports) {
      console.log(`Capturing ${vp.name}...`);
      const targetRes = await fetch('http://127.0.0.1:9228/json/new?' + encodeURIComponent(vp.url), { method: 'PUT' });
      const target = await targetRes.json();
      const ws = new WebSocket(target.webSocketDebuggerUrl);

      await new Promise((resolve, reject) => {
        let msgId = 1;
        const send = (method, params = {}) => {
          const id = msgId++;
          ws.send(JSON.stringify({ id, method, params }));
          return id;
        };

        ws.onopen = () => {
          send('Emulation.setDeviceMetricsOverride', {
            width: vp.width,
            height: vp.height,
            deviceScaleFactor: 1,
            mobile: vp.mobile,
          });
          if (vp.scrollTo) {
            send('Runtime.evaluate', {
              expression: `document.querySelector('${vp.scrollTo}')?.scrollIntoView({ block: 'start' });`,
            });
          }
          // Wait for load and rendering
          setTimeout(() => {
            send('Page.captureScreenshot', {});
          }, 800);
        };

        ws.onmessage = async (event) => {
          const data = JSON.parse(event.data);
          if (data.result && data.result.data) {
            fs.writeFileSync(`docs/marketing/screenshots/${vp.name}`, Buffer.from(data.result.data, 'base64'));
            ws.close();
            // Close page tab
            await fetch(`http://127.0.0.1:9228/json/close/${target.id}`);
            resolve();
          }
        };

        ws.onerror = (err) => reject(err);
      });
    }
    console.log('All screenshots captured successfully.');
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

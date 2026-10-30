import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { createEnquiryHandler } from './server/enquiry-handler.mjs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'enquiry-api',
      configureServer(server) {
        const handle = createEnquiryHandler();
        server.middlewares.use('/api/enquiry', async (req, res) => {
          let body = '';
          for await (const chunk of req) {
            body += chunk;
            if (Buffer.byteLength(body) > 65536) {
              res.statusCode = 413;
              res.end();
              return;
            }
          }
          req.body = body;
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          };
          await handle(req, res);
        });
      },
    },
    {
      name: 'dev-link-logger',
      configureServer(server) {
        server.httpServer.once('listening', () => {
          const address = server.httpServer.address();
          const isObject = typeof address === 'object' && address !== null;
          const port = isObject ? address.port : server.config.server.port;
          const protocol = server.config.server.https ? 'https' : 'http';
          setTimeout(() => {
            console.log(
              `\n  \x1b[33m➜\x1b[0m  \x1b[1mProduction Site\x1b[0m: \x1b[36m${protocol}://localhost:${port}/index.html\x1b[0m\n`
            );
          }, 100);
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        comingsoon: resolve(__dirname, 'coming-soon.html'),
        philosophy: resolve(__dirname, 'philosophy.html'),
        solutions: resolve(__dirname, 'solutions.html'),
        velocity: resolve(__dirname, 'velocity.html'),
        rd: resolve(__dirname, 'rd.html'),
        connect: resolve(__dirname, 'connect.html'),
        missiondocs: resolve(__dirname, 'mission-docs.html'),
        internship: resolve(__dirname, 'internship.html'),
        verify: resolve(__dirname, 'verify.html'),
      },
    },
  },
});

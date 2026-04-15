import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dev-link-logger',
      configureServer(server) {
        server.httpServer.once('listening', () => {
          const address = server.httpServer.address();
          const isObject = typeof address === 'object' && address !== null;
          const port = isObject ? address.port : server.config.server.port;
          const protocol = server.config.server.https ? 'https' : 'http';
          setTimeout(() => {
            console.log(`\n  \x1b[33m➜\x1b[0m  \x1b[1mProduction Site\x1b[0m: \x1b[36m${protocol}://localhost:${port}/index.html\x1b[0m\n`);
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
        rd: resolve(__dirname, 'rd.html'),
      },
    },
  },
});

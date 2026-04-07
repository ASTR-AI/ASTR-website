import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    {
      name: 'dev-link-logger',
      configureServer(server) {
        server.httpServer.once('listening', () => {
          const address = server.httpServer.address();
          const isObject = typeof address === 'object' && address !== null;
          const port = isObject ? address.port : server.config.server.port;
          const protocol = server.config.server.https ? 'https' : 'http';
          setTimeout(() => {
            console.log(`\n  \x1b[33m➜\x1b[0m  \x1b[1mDevelopment Site\x1b[0m: \x1b[36m${protocol}://localhost:${port}/main-site.html\x1b[0m\n`);
          }, 100);
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        site: resolve(__dirname, 'main-site.html'),
        philosophy: resolve(__dirname, 'philosophy.html'),
        solutions: resolve(__dirname, 'solutions.html'),
      },
    },
  },
});

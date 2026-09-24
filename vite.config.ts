import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

const exampleDir = resolve('example');

function serveExampleData(): Plugin {
  return {
    name: 'serve-example-data',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        
        const pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
        
        if (!/\.ya?ml$/.test(pathname)) {
          next();
          return;
        }
        
        const path = resolve(exampleDir, `.${pathname}`);
        
        if (!path.startsWith(`${exampleDir}/`) || !existsSync(path)) {
          res.statusCode = 404;
          res.end();
          return;
        }
        
        res.setHeader('Content-Type', 'text/yaml; charset=utf-8');
        res.end(readFileSync(path));
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    serveExampleData()
  ]
});

import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from './vite-plugins/vite-pluging-handlebars-precompile';

export default defineConfig({
  publicDir: resolve(__dirname, 'public'),
  plugins: [
    handlebars(),
  ],
  root: resolve(__dirname, 'src'),
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, 'dist'),
  },
});

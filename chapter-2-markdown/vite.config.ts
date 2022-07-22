import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/markdown-parser.ts',
      formats: ['es'],
    },
  },
  resolve: {
    alias: {
      '~bootstrap': `@import './src/index.css'`,
    },
  },
});

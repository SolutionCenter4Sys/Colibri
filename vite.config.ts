import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  // Avoid intermittent Windows locks under node_modules/.vite
  cacheDir: '.vite-cache',
});

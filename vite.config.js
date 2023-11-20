import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: "http://backend:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/study-platform/',
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      app: path.resolve(__dirname, './src/app'),
      pages: path.resolve(__dirname, './src/pages'),
      widgets: path.resolve(__dirname, './src/widgets'),
      features: path.resolve(__dirname, './src/features'),
      entities: path.resolve(__dirname, './src/entities'),
      shared: path.resolve(__dirname, './src/shared'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api/v1': {
        changeOrigin: true,
        secure: false,
        target: 'http://192.168.3.29:8080',
      },
    },
    strictPort: true,
  },
});

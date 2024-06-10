// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ofert: resolve(__dirname, 'pages/oferta.html'),
        about: resolve(__dirname, 'pages/firma.html'),
        contact: resolve(__dirname, 'pages/kontakt.html'),
      },
    },
  },
});

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/kings-bakes-website/' : '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        menu: resolve(__dirname, 'menu.html'),
        contact: resolve(__dirname, 'contact.html'),
        admin: resolve(__dirname, 'admin.html'),
        adminDashboard: resolve(__dirname, 'admin-dashboard.html')
      }
    }
  }
});

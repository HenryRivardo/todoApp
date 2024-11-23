import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables dari file .env.development
dotenv.config({ path: '.env.development' });

// Konversi `import.meta.url` ke direktori
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: 'src/assets/**/*.svg',
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Gunakan path.resolve dengan __dirname baru
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@/scss/_shared.scss';
        `,
      },
    },
  },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/movie-database/',
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    proxy: {
      "/api": {
        target: "https://bcit-movie-db-git-staging-kes-projects-3f83c4b4.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
})

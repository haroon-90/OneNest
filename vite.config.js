import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/OneNest/',
  plugins: [react(), tailwindcss(),],
  build: {
    chunkSizeWarningLimit: 1000, // 1000 kB (increase limit from 500 kB)
  },
})

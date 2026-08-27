import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The site is published to https://arditi888.github.io/barciao/, so every
// built asset URL has to carry that prefix.
export default defineConfig({
  base: '/barciao/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssTarget: 'safari14',
  },
})

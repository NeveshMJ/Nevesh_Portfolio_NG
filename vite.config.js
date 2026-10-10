import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset URLs relative so the build works on any static host
// (Netlify, Vercel, GitHub Pages in a sub-path, S3...). Navigation is hash-based,
// so no server-side route rewrites are required.
export default defineConfig({
  plugins: [react()],
  base: './',
})

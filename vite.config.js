import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: true,
    allowedHosts: ['rissme.com', '217.216.58.20'],
    proxy: {
      // Forwards to the Express server (`npm run server`) so the waitlist
      // form works in dev without hardcoding a full URL.
      '/api': 'http://localhost:3000',
    },
  },
  preview: {
    port: 5173,
    host: true,
    allowedHosts: ['rissme.com', '217.216.58.20'],
  },
})

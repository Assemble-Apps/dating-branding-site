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
  },
  preview: {
    port: 5173,
    host: true,
    allowedHosts: ['rissme.com', '217.216.58.20'],
  },
})

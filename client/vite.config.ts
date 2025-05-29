import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 5173, // Change the port here
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

delete (globalThis as any).crypto;
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

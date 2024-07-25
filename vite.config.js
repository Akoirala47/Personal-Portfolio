import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
  
base: '/Personal-Portfolio/',
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

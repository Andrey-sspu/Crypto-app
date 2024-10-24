import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://andrey-sspu.github.io/Crypto-app/',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
})

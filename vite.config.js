import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias'

import path from 'path'

export default defineConfig({
  server: {
    port: 8081
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'build'
  },
  plugins: [
    alias(),
    react()
  ]
})

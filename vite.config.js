import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  plugins: [
    vue(),WindiCSS(),
  ],
  server: {
    hmr: true,
    port: 17080,
    proxy: {
      '/web': {
        target: 'http://localhost:18080',
        secure: false,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/web/, '')
      },
    }
  },
})

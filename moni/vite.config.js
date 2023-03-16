import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy:{
      '/api': {
      target: 'http://192.168.45.5:12313',
      // changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, ''),
    }
  }
  }
})

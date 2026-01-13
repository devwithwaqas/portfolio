import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/', // GitHub Pages root path
  publicDir: 'public',
  plugins: [
    vue(),
    // Plugin to transform HTML asset paths
    {
      name: 'transform-html-assets',
      transformIndexHtml(html) {
        const base = '/'
        // Replace absolute asset paths with base-prefixed paths
        return html.replace(/href="\/assets\//g, `href="${base}assets/`)
                   .replace(/src="\/assets\//g, `src="${base}assets/`)
      }
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { copyFileSync, existsSync } from 'fs'

export default defineConfig({
  base: '/portfolio/', // GitHub Pages base path
  publicDir: 'public',
  plugins: [
    vue(),
    // Plugin to transform HTML asset paths
    {
      name: 'transform-html-assets',
      transformIndexHtml(html) {
        const base = '/portfolio/'
        // Replace absolute asset paths with base-prefixed paths
        return html.replace(/href="\/assets\//g, `href="${base}assets/`)
                   .replace(/src="\/assets\//g, `src="${base}assets/`)
      }
    },
    // Plugin to copy 404.html to dist root after build
    {
      name: 'copy-404-html',
      buildEnd() {
        const src404 = path.resolve(__dirname, 'public/404.html')
        const dest404 = path.resolve(__dirname, 'dist/404.html')
        if (existsSync(src404)) {
          try {
            copyFileSync(src404, dest404)
            console.log('✓ Copied 404.html to dist/')
          } catch (err) {
            console.error('Failed to copy 404.html:', err)
          }
        } else {
          console.warn('404.html not found in public/')
        }
      }
    }
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

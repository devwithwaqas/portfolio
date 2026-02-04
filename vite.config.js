import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/portfolio/', // GitHub Pages base path - repo name is 'portfolio', so site is at /portfolio/
  publicDir: 'public',
  plugins: [
    vue(),
    // Plugin to transform HTML asset paths
    {
      name: 'transform-html-assets',
      transformIndexHtml(html) {
        const base = '/portfolio/'
        const ga4Id = process.env.VITE_GA4_MEASUREMENT_ID || ''
        // Replace absolute asset paths with base-prefixed paths
        let transformed = html.replace(/href="\/assets\//g, `href="${base}assets/`)
                             .replace(/src="\/assets\//g, `src="${base}assets/`)
                             // Also handle favicon paths
                             .replace(/href="\/portfolio\/assets\/img\/(favicon|apple-touch-icon)/g, `href="${base}assets/img/$1`)
                             .replace(/href="\/assets\/img\/(favicon|apple-touch-icon)/g, `href="${base}assets/img/$1`)
                             // Fix manifest path to include base
                             .replace(/href="\/site\.webmanifest"/g, `href="${base}site.webmanifest"`)
        // Replace GA4 placeholder with actual Measurement ID if provided
        if (ga4Id) {
          transformed = transformed.replace(/VITE_GA4_MEASUREMENT_ID_PLACEHOLDER/g, ga4Id)
        }
        return transformed
      }
    },
    // Plugin to defer CSS loading (non-blocking) for better mobile performance
    {
      name: 'defer-css-loading',
      closeBundle() {
        // This runs after build - we'll modify the built HTML file
        const fs = require('fs')
        const path = require('path')
        const htmlPath = path.resolve(__dirname, 'dist/index.html')
        
        if (fs.existsSync(htmlPath)) {
          let html = fs.readFileSync(htmlPath, 'utf-8')
          
          // Defer Vite-generated CSS by using print media trick
          // Match CSS links that don't already have media attribute
          html = html.replace(
            /<link([^>]*rel=["']stylesheet["'][^>]*)>/gi,
            (match, attrs) => {
              // Skip if already has media attribute, is in noscript, or is a vendor/external CSS
              if (attrs.includes('media=') || 
                  attrs.includes('noscript') || 
                  attrs.includes('vendor/') ||
                  attrs.includes('cdnjs.cloudflare.com') ||
                  attrs.includes('fonts.googleapis.com') ||
                  attrs.includes('cdn.jsdelivr.net')) {
                return match
              }
              // Defer Vite-generated CSS (main bundle)
              return `<link${attrs} media="print" onload="this.media='all'"><noscript>${match}</noscript>`
            }
          )
          
          fs.writeFileSync(htmlPath, html, 'utf-8')
        }
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
    assetsDir: 'assets',
    // Performance optimizations
    minify: 'esbuild', // Use esbuild (default, faster, no extra dependencies)
    // Code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate vendor chunks
          if (id.includes('node_modules')) {
            // Vue core libraries
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vue-vendor'
            }
            // Everything else goes into separate chunks (lazy loaded)
            // This allows better code splitting
            return undefined // Let Vite handle automatic splitting for other node_modules
          }
          
          // Split large utility files into their own chunks for better caching
          if (id.includes('src/utils/iconResolver')) {
            return 'utils-icon-resolver'
          }
          if (id.includes('src/services/')) {
            return 'services'
          }
          if (id.includes('src/utils/')) {
            return 'utils'
          }
          
          // Let Vite handle automatic splitting for everything else
          return undefined
        }
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  }
})

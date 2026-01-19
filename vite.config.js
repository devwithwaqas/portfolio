import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Critters from 'critters'

export default defineConfig({
  base: '/portfolio/', // GitHub Pages base path - repo name is 'portfolio', so site is at /portfolio/
  publicDir: 'public',
  plugins: [
    vue(),
    // Critical CSS inlining - extracts and inlines critical CSS
    {
      name: 'vite-plugin-critters',
      apply: 'build',
      transformIndexHtml: {
        order: 'post',
        handler: async (html) => {
          const critters = new Critters({
            path: 'dist',
            publicPath: '/portfolio/',
            preload: 'swap', // Preload non-critical CSS
            noscriptFallback: true,
            inlineFonts: false, // Don't inline fonts (too large)
            pruneSource: false, // Keep original CSS for fallback
            logLevel: 'warn'
          })
          return await critters.process(html)
        }
      }
    },
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

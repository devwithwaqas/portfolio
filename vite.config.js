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
        manualChunks: {
          // Separate vendor chunks
          'vue-vendor': ['vue', 'vue-router'],
          'chart-vendor': ['chart.js'],
          'ui-vendor': ['swiper', 'vue3-carousel', '@panzoom/panzoom']
        }
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  }
})

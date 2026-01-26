import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import splitMobileCSS from './scripts/split-css-plugin.js'
import removeConsole from 'vite-plugin-remove-console'

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
  // Firebase modes: 'firebase' (prod) or 'firebase-dev' (dev)
  const isFirebase = mode === 'firebase' || mode === 'firebase-dev'
  const isFirebaseProd = mode === 'firebase'
  const isDev = mode === 'development'
  
  // Set analytics endpoint for Firebase builds if not provided via env
  if (isFirebase && !process.env.VITE_PORTFOLIO_GA4_API_ENDPOINT) {
    process.env.VITE_PORTFOLIO_GA4_API_ENDPOINT = 'https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-read'
  }
  
  // Set SMTP endpoint for Firebase builds if not provided via env
  if (isFirebase && !process.env.VITE_SMTP_ENDPOINT) {
    process.env.VITE_SMTP_ENDPOINT = 'https://us-central1-robust-builder-484406-b3.cloudfunctions.net/sendEmail'
  }
  
  // Set Firebase site URL for Firebase builds if not provided via env
  if (isFirebase && !process.env.VITE_FIREBASE_SITE_URL) {
    process.env.VITE_FIREBASE_SITE_URL = 'https://waqasahmad-portfolio.web.app'
  }
  
  // Set GA4 Measurement ID for Firebase builds
  if (isFirebase && !process.env.VITE_GA4_MEASUREMENT_ID) {
    process.env.VITE_GA4_MEASUREMENT_ID = process.env.VITE_GA4_MEASUREMENT_ID_FIREBASE || 'G-02TG7S6Z2V'
  }
  // Firebase PROD: server-side tracking only — skip gtag script to avoid 404 (fixes accessibility console errors)
  if (isFirebaseProd && !process.env.VITE_GA4_FORCE_SERVER_SIDE) {
    process.env.VITE_GA4_FORCE_SERVER_SIDE = 'true'
  }

  // Firebase PROD: report client errors to Cloud Function so you can read them via gcloud logging
  if (isFirebaseProd && !process.env.VITE_ERROR_REPORT_URL) {
    process.env.VITE_ERROR_REPORT_URL = 'https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-error-report'
  }

  // Pass Firebase site URL to sitemap generation script
  if (isFirebase) {
    process.env.FIREBASE_SITE_URL = process.env.VITE_FIREBASE_SITE_URL || 'https://waqasahmad-portfolio.web.app'
  }
  
  // Production mode: strip console and hide errors
  // firebase = prod, firebase-dev = dev (keeps console, shows full errors)
  const isProd = mode === 'production' || isFirebaseProd

  return {
  base: isDev ? '/' : (isFirebase ? '/' : '/portfolio/'), // Use root for dev and Firebase, /portfolio/ for GitHub Pages builds
  publicDir: 'public',
  plugins: [
    vue(),
    ...(isProd ? [removeConsole({ includes: ['log', 'info', 'warn', 'debug'] })] : []),
    // Plugin to transform HTML asset paths
    {
      name: 'transform-html-assets',
      transformIndexHtml(html, context) {
        // In dev mode, Vite serves public files at root regardless of base, so don't transform
        // Only transform during build
        const isDev = mode === 'development'
        if (isDev) {
          // In dev mode, only replace GA4 placeholder if needed
          const ga4Id = process.env.VITE_GA4_MEASUREMENT_ID || 'G-1HMMJLP7GK'
          if (ga4Id) {
            return html.replace(/VITE_GA4_MEASUREMENT_ID_PLACEHOLDER/g, ga4Id)
          }
          return html
        }
        
        // Use the base path from config (dynamic based on mode) - BUILD ONLY
        const base = isFirebase ? '/' : '/portfolio/'
        // Use Firebase GA4 ID for Firebase builds
        const ga4Id = isFirebase 
          ? (process.env.VITE_GA4_MEASUREMENT_ID_FIREBASE || process.env.VITE_GA4_MEASUREMENT_ID || 'G-02TG7S6Z2V')
          : (process.env.VITE_GA4_MEASUREMENT_ID || 'G-1HMMJLP7GK')
        // Replace absolute asset paths with base-prefixed paths
        let transformed = html.replace(/href="\/assets\//g, `href="${base}assets/`)
                             .replace(/src="\/assets\//g, `src="${base}assets/`)
                             // Also handle favicon paths
                             .replace(/href="\/portfolio\/assets\/img\/(favicon|apple-touch-icon)/g, `href="${base}assets/img/$1`)
                             .replace(/href="\/assets\/img\/(favicon|apple-touch-icon)/g, `href="${base}assets/img/$1`)
                             // Fix manifest path to include base
                             .replace(/href="\/site\.webmanifest"/g, `href="${base}site.webmanifest"`)
                             // Fix Font Awesome CSS path (already handled by above, but ensure it works)
                             .replace(/href="\/assets\/fonts\/fontawesome\//g, `href="${base}assets/fonts/fontawesome/`)
        // Replace GA4 placeholder with actual Measurement ID if provided
        if (ga4Id) {
          transformed = transformed.replace(/VITE_GA4_MEASUREMENT_ID_PLACEHOLDER/g, ga4Id)
        }
        // Note: index.html already has Firebase URLs, no transformation needed
        return transformed
      }
    },
    // Plugin to split CSS into mobile/desktop for better mobile performance
    splitMobileCSS(),
    // Plugin to defer CSS loading (non-blocking) for better mobile performance
    {
      name: 'defer-css-loading',
      closeBundle() {
        // This runs after build - we'll modify the built HTML file
        // NOTE: This runs BEFORE split-css-plugin, so we need to skip split CSS files
        const htmlPath = path.resolve(__dirname, 'dist/index.html')
        
        if (fs.existsSync(htmlPath)) {
          let html = fs.readFileSync(htmlPath, 'utf-8')
          
          // Defer Vite-generated CSS by using print media trick
          // Match CSS links that don't already have media attribute
          html = html.replace(
            /<link([^>]*rel=["']stylesheet["'][^>]*)>/gi,
            (match, attrs) => {
              // Skip if already has media attribute, is in noscript, or is a vendor/external CSS
              // ALSO skip split CSS files (handled by split-css-plugin)
              if (attrs.includes('media=') || 
                  attrs.includes('noscript') || 
                  attrs.includes('vendor/') ||
                  attrs.includes('shared.css') ||
                  attrs.includes('mobile.css') ||
                  attrs.includes('desktop.css') ||
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
    port: 3001,
    open: true,
    hmr: mode === 'development' ? {
      protocol: 'ws',
      host: 'localhost',
      port: 3001,
      // Disable HMR client auto-reconnect attempts when server is off
      // This prevents "vite connecting" messages when dev server is not running
      client: {
        reconnect: 3, // Limit reconnection attempts
        overlay: true
      }
    } : false // Completely disable HMR in production/firebase mode
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
          // Separate vendor chunks - more aggressive splitting
          if (id.includes('node_modules')) {
            // Vue core libraries (small, critical)
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vue-vendor'
            }
            // Heavy chart library - lazy load separately
            if (id.includes('chart.js')) {
              return 'vendor-chartjs'
            }
            // Panzoom - lazy loaded
            if (id.includes('@panzoom')) {
              return 'vendor-panzoom'
            }
            // EmailJS - lazy load when contact form is needed
            if (id.includes('@emailjs')) {
              return 'vendor-emailjs'
            }
            // Carousel - lazy load when needed
            if (id.includes('vue3-carousel')) {
              return 'vendor-carousel'
            }
            // Swiper - separate chunk if bundled
            if (id.includes('swiper')) {
              return 'vendor-swiper'
            }
            // Everything else from node_modules
            return 'vendor-other'
          }
          
          // Split large utility files into their own chunks for better caching
          if (id.includes('src/utils/iconResolver')) {
            return 'utils-icon-resolver'
          }
          
          // OPTIMIZATION: Split large data/config files separately
          if (id.includes('src/data/') || id.includes('src/config/')) {
            return 'data-config'
          }
          
          // Split components that use heavy libraries
          if (id.includes('src/components/projects/PerformanceMetricsSection')) {
            return 'components-charts'
          }
          if (id.includes('src/components/projects/DiagramViewer')) {
            return 'components-diagrams'
          }
          if (id.includes('src/components/projects/ProjectGallery')) {
            return 'components-gallery'
          }
          
          // OPTIMIZATION: Split home components more granularly
          if (id.includes('src/components/home/Portfolio')) {
            return 'components-portfolio'
          }
          if (id.includes('src/components/home/Services')) {
            return 'components-services'
          }
          if (id.includes('src/components/home/Testimonials')) {
            return 'components-testimonials'
          }
          
          // Group services
          if (id.includes('src/services/')) {
            return 'services'
          }
          
          // OPTIMIZATION: Split utils more granularly
          if (id.includes('src/utils/structuredData')) {
            return 'utils-structured-data'
          }
          if (id.includes('src/utils/analyticsData')) {
            return 'utils-analytics'
          }
          // Group other utils
          if (id.includes('src/utils/')) {
            return 'utils-other'
          }
          
          // Let Vite handle automatic splitting for everything else
          return undefined
        },
        // Optimize chunk file names for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop().replace('.vue', '').replace('.js', '')
            : 'chunk'
          return `assets/js/${facadeModuleId}-[hash].js`
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/img/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[ext]/[name]-[hash][extname]`
        }
      }
    },
    // Chunk size warnings (increased for better splitting)
    chunkSizeWarningLimit: 500,
    // Enable source maps for production debugging (optional, can disable for smaller bundles)
    sourcemap: false,
    // Optimize dependencies
    optimizeDeps: {
      include: ['vue', 'vue-router'],
      exclude: ['@panzoom/panzoom', 'chart.js'] // These are lazy loaded
    },
    // Disable HMR in production builds to prevent connection attempts when server is off
    // HMR is only needed in development - this prevents "vite connecting" messages in production
    define: isProd ? {
      'import.meta.hot': 'undefined' // Disable HMR client in production builds
    } : {}
  }
  }
})

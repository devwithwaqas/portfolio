import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { assetPath } from './utils/assetPath.js'
import { trackPageView } from './utils/analytics.js'

// Import CSS
import './assets/css/font-sizes.css'
import './assets/css/main.css'

const app = createApp(App)

// Add global asset path helper for use in templates
app.config.globalProperties.$assetPath = assetPath

app.use(router)
app.mount('#app')

// Track initial page view after app mounts (ensures GA4 is loaded)
router.isReady().then(() => {
  setTimeout(() => {
    trackPageView(window.location.pathname + window.location.search, document.title)
  }, 500)
})

// Register service worker for better asset caching on repeat visits
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/portfolio/sw.js').catch(() => {
      // Silent fail; caching is optional
    })
  })
}

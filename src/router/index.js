import { createRouter, createWebHistory } from 'vue-router'
// Lazy load all views for better code splitting
import { setPageSEO, applyHomeSEO, applyProjectSEO, applyServiceSEO, applyBlogIndexSEO, applyBlogSEO } from '../utils/seo.js'
import { getMetaKeywords } from '../config/seoKeywords.js'
import { generateProjectPageStructuredData, generateServicePageStructuredData, generateBlogArticleStructuredData, generateBlogIndexStructuredData, generateBreadcrumbSchema, generateWebPageSchema, injectStructuredData, assertStructuredData } from '../utils/structuredData.js'
// Blog data loaded only when navigating to /blog or /blog/:slug (dynamic import) to avoid chunk TDZ in prod
import { trackPageView, trackServicePageView, trackProjectPageView } from '../utils/analytics.js'
import { SITE_URL } from '../config/constants.js'
import { handleError } from '../utils/errorHandler.js'
import { logError, shouldPreventReload, recordReloadAttempt } from '../utils/errorTracker.js'

// Service Data Map - Actual service titles and descriptions for SEO
const SERVICE_DATA_MAP = {
  'FullStackDevelopment': {
    title: 'Full Stack Development',
    description: 'End-to-end development of enterprise applications tailored to your requirements. Whether you need Angular, Vue.js, React, or any modern frontend framework combined with robust .NET Core backends, I deliver scalable solutions that drive business growth. IT services and IT consulting for full stack development projects.'
  },
  'AzureCloudArchitecture': {
    title: 'Azure Cloud Architecture',
    description: 'Design and implementation of cloud-native solutions using Microsoft Azure. From architecture design to deployment, I deliver scalable, secure, and cost-effective cloud infrastructure. IT services for Azure cloud architecture, cloud migration, and enterprise cloud solutions.'
  },
  'TechnicalLeadership': {
    title: 'Technical Leadership',
    description: 'Leading development teams, establishing best practices, and delivering mission-critical systems. Technical leadership services for engineering teams, code reviews, architecture guidance, and team mentorship. IT services for technical leadership and engineering management.'
  },
  'MicroservicesArchitecture': {
    title: 'Microservices Architecture',
    description: 'Design and implementation of scalable microservices-based applications using Azure Service Fabric, Docker containers, and modern architectural patterns. IT services for microservices architecture, distributed systems design, and enterprise microservices solutions.'
  },
  'AgileProjectManagement': {
    title: 'Agile Project Management',
    description: 'Leading agile development teams, conducting sprint planning, retrospectives, and ensuring timely delivery of high-quality software products. IT services for agile project management, Scrum, Kanban, and agile transformation.'
  },
  'DatabaseDesignOptimization': {
    title: 'Database Design & Optimization',
    description: 'Database schema design, query optimization, indexing strategies, and performance tuning for SQL Server, Azure SQL, and other database systems. IT services for database design, database optimization, and database consulting.'
  },
  'MobileDevelopment': {
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile application development for iOS and Android. Whether you need native iOS (Swift/Objective-C), native Android (Kotlin/Java), React Native, Flutter, or Xamarin, I deliver high-performance mobile solutions. IT services for mobile app development and mobile consulting.'
  }
}

// Project Data Map - Actual project titles and descriptions for SEO
const PROJECT_DATA_MAP = {
  'HeatExchanger': {
    title: 'Heat Exchanger Portal - Mission Critical Petroleum Operations',
    description: 'Enterprise-grade .NET Core platform for one of the five biggest oil and gas companies in the world, hosted on OpenShift with comprehensive monitoring through Grafana and Prometheus.',
    technologies: ['.NET Core', 'Angular', 'SQL Server', 'OpenShift', 'Docker', 'Grafana', 'Prometheus', 'Apache Kafka']
  },
  'AirAsiaID90': {
    title: 'AirAsia ID90 Portal - Revolutionary Last-Minute Employee Flight Discount System',
    description: 'A groundbreaking enterprise platform that revolutionized AirAsia\'s employee travel benefits by enabling 90% discounted flights within the critical 60-minute departure window.',
    technologies: ['.NET Core', 'Angular', 'SQL Server', 'Azure', 'Google SSO']
  },
  'BATInhouseApp': {
    title: 'BAT Inhouse App',
    description: 'A comprehensive enterprise application - a microservices platform for British American Tobacco. This project integrates 8+ enterprise systems including SAP Planet 8/9, Cherwell HR/IT, Power Apps, SharePoint.',
    technologies: ['.NET Core', 'Azure Service Fabric', 'Azure SQL', 'Cosmos DB', 'SAP', 'SharePoint']
  },
  'PJSmartCity': {
    title: 'PJ Smart City',
    description: 'A comprehensive smart city platform for Petaling Jaya City Council powered by SuperMap GIS technology. This advanced municipal solution integrates Big Data GIS, 3D GIS, and Geospatial AI capabilities.',
    technologies: ['.NET Core', 'Angular', 'SuperMap GIS', 'IoT', 'Azure']
  },
  'GamifiedEmployeeManagement': {
    title: 'Gamified Employee Management',
    description: 'Enterprise gamification platform for employee engagement, performance management, and analytics. Built with microservices architecture and real-time processing capabilities.',
    technologies: ['.NET Core', 'Microservices', 'Real-time Processing', 'Analytics']
  },
  'ValetParking': {
    title: 'Valet Parking',
    description: 'Enterprise valet parking management system with real-time tracking, mobile applications, and comprehensive analytics.',
    technologies: ['.NET Core', 'Mobile', 'Real-time', 'Analytics']
  },
  'MobileGames': {
    title: 'Mobile Games Collection',
    description: 'Collection of mobile game applications developed for iOS and Android platforms with engaging gameplay and modern mobile technologies.',
    technologies: ['Mobile', 'iOS', 'Android', 'Game Development']
  },
  'UKPropertyManagement': {
    title: 'UK Property Management Platform',
    description: 'Comprehensive property management platform for UK real estate operations with advanced features and enterprise-scale architecture.',
    technologies: ['.NET Core', 'Angular', 'SQL Server', 'Enterprise Architecture']
  },
  'G5POS': {
    title: 'G5 POS',
    description: 'A comprehensive F&B point of sales solution developed in collaboration with Squad Cell, specifically designed for Food & Beverage establishments.',
    technologies: ['.NET Core', 'Microservices', 'Real-time Processing', 'F&B Management']
  },
  'ChubbInsuranceApplications': {
    title: 'Chubb Insurance Applications',
    description: 'Enterprise insurance applications for Chubb with comprehensive features, security, and scalability.',
    technologies: ['.NET Core', 'Enterprise', 'Security', 'Scalability']
  }
}

// Per-project testimonials (real LinkedIn/client reviews) and impact metrics for Review/AggregateRating schema.
// Add real testimonials here when available; keep empty array if none yet.
const PROJECT_TESTIMONIALS_MAP = {
  HeatExchanger: [],
  AirAsiaID90: [],
  BATInhouseApp: [],
  PJSmartCity: [],
  GamifiedEmployeeManagement: [],
  ValetParking: [],
  MobileGames: [],
  UKPropertyManagement: [],
  G5POS: [],
  ChubbInsuranceApplications: []
}

// Optional impact metrics per project (e.g. "Scalability increased by 40%") for AggregateRating when no testimonials.
const PROJECT_METRICS_MAP = {
  HeatExchanger: 'Mission-critical petroleum operations platform with enterprise-grade reliability.',
  AirAsiaID90: 'Revolutionary last-minute employee flight discount system with high-concurrency handling.',
  BATInhouseApp: 'Microservices platform integrating 8+ enterprise systems with 99.9% data quality.',
  UKPropertyManagement: '60% reduction in manual processes, 99.9% uptime for 9,000+ properties.'
}

const CHUNK_RELOAD_KEY = 'portfolio_chunk_reload'

function isChunkLoadError(err) {
  const msg = (err && err.message) ? String(err.message) : ''
  return /Failed to fetch dynamically imported module|Loading chunk \d+ failed|Importing a module script failed/i.test(msg)
}

// Helper function for safe dynamic imports with error handling
// On chunk 404 (stale cache after deploy): reload once to pick up fresh index + chunks.
const loadComponent = (componentImport) => {
  return componentImport().catch((error) => {
    // In DEV: chunk load errors are common during HMR/server restarts - don't log them
    // In PROD: log chunk load errors as they indicate stale cache issues
    if (!import.meta.env.DEV) {
      logError(error, 'router.chunk')
      handleError(error, 'router.chunk')
    } else {
      // In DEV: just log to console, don't persist
      console.warn('[Router] Chunk load error (DEV - expected during HMR):', error.message)
    }

    // CRITICAL: Never reload in DEV mode - causes infinite loops with HMR
    // Only reload in PROD and only for actual chunk load errors
    if (
      import.meta.env.PROD &&
      !import.meta.env.DEV &&
      typeof sessionStorage !== 'undefined' &&
      isChunkLoadError(error)
    ) {
      // Check circuit breaker - prevent infinite reloads
      if (shouldPreventReload()) {
        console.error('[Router] RELOAD BLOCKED by circuit breaker - too many reloads detected!')
        console.error('[Router] Check localStorage "portfolio_error_log" for error details')
        
        // Return error component instead of reloading
        return {
          default: {
            name: 'ErrorComponent',
            template: `
              <div class="error-container" style="padding: 40px; text-align: center;">
                <h2>Failed to Load Page</h2>
                <p>Sorry, this page could not be loaded. Too many reload attempts detected.</p>
                <p style="color: #ef4444; font-size: 0.9em; margin-top: 10px;">
                  Check browser console for error details. Open DevTools → Application → Local Storage → portfolio_error_log
                </p>
                <button @click="$router.push('/')" class="btn btn-primary" style="margin-top: 20px;">Go Home</button>
                <button @click="clearErrors" class="btn btn-secondary" style="margin-top: 10px; margin-left: 10px;">Clear Error Log</button>
              </div>
            `,
            methods: {
              clearErrors() {
                try {
                  localStorage.removeItem('portfolio_error_log')
                  localStorage.removeItem('portfolio_reload_count')
                  window.location.reload()
                } catch {}
              }
            }
          }
        }
      }
      
      const reloadKey = CHUNK_RELOAD_KEY
      const hasReloaded = sessionStorage.getItem(reloadKey)
      
      // Only reload once, and add a cooldown to prevent infinite loops
      if (!hasReloaded) {
        const reloadCooldown = sessionStorage.getItem(`${reloadKey}_cooldown`)
        const now = Date.now()
        
        // Check if we've reloaded recently (within 5 seconds)
        if (!reloadCooldown || (now - parseInt(reloadCooldown)) > 5000) {
          if (shouldPreventReload()) {
            console.error('[Router] Reload blocked by circuit breaker')
            logError(new Error('Router reload blocked by circuit breaker'), 'router.reload')
          } else {
            recordReloadAttempt()
            sessionStorage.setItem(reloadKey, '1')
            sessionStorage.setItem(`${reloadKey}_cooldown`, now.toString())
            setTimeout(() => {
              try {
                sessionStorage.removeItem(reloadKey)
                sessionStorage.removeItem(`${reloadKey}_cooldown`)
              } catch (_) {}
            }, 10000)
            console.warn('[Router] Reloading due to chunk load error...')
            window.location.reload()
            return new Promise(() => {})
          }
        }
      }
    }

    // Return error component instead of reloading
    return {
      default: {
        name: 'ErrorComponent',
        template: `
          <div class="error-container" style="padding: 40px; text-align: center;">
            <h2>Failed to Load Page</h2>
            <p>Sorry, this page could not be loaded. Please try refreshing the page.</p>
            <button @click="$router.push('/')" class="btn btn-primary">Go Home</button>
          </div>
        `
      }
    }
  })
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => loadComponent(() => import('../views/Home.vue'))
  },
  {
    path: '/projects/heat-exchanger',
    name: 'HeatExchanger',
    component: () => loadComponent(() => import('../views/projects/HeatExchangerPage.vue'))
  },
  {
    path: '/projects/airasia-id90',
    name: 'AirAsiaID90',
    component: () => loadComponent(() => import('../views/projects/AirAsiaID90Page.vue'))
  },
  // Placeholder routes for projects not yet implemented
  {
    path: '/projects/bat-inhouse-app',
    name: 'BATInhouseApp',
    component: () => loadComponent(() => import('../views/projects/BATInhouseAppPage.vue'))
  },
  {
    path: '/projects/pj-smart-city',
    name: 'PJSmartCity',
    component: () => loadComponent(() => import('../views/projects/SmartCityPage.vue'))
  },
  {
    path: '/projects/gamified-employee-management',
    name: 'GamifiedEmployeeManagement',
    component: () => loadComponent(() => import('../views/projects/GamifiedEmployeeManagementPage.vue'))
  },
    {
      path: '/projects/valet-parking',
      name: 'ValetParking',
      component: () => loadComponent(() => import('../views/projects/ValetParkingPage.vue'))
    },
  {
    path: '/projects/mobile-games',
    name: 'MobileGames',
    component: () => loadComponent(() => import('../views/projects/MobileGamesPage.vue'))
  },
  {
    path: '/projects/uk-property-management',
    name: 'UKPropertyManagement',
    component: () => loadComponent(() => import('../views/projects/UKPropertyManagementPage.vue'))
  },
  {
    path: '/projects/g5-pos',
    name: 'G5POS',
    component: () => loadComponent(() => import('../views/projects/G5POSPage.vue'))
  },
  {
    path: '/projects/chubb-insurance-applications',
    name: 'ChubbInsuranceApplications',
    component: () => loadComponent(() => import('../views/projects/InsuranceClientsPage.vue'))
  },
  // Redirect any old routes to home (no hash)
  {
    path: '/portfolio',
    redirect: '/'
  },
  {
    path: '/services',
    redirect: '/'
  },
    {
      path: '/services/full-stack-development',
      name: 'FullStackDevelopment',
      component: () => loadComponent(() => import('../views/services/FullStackDevelopmentPage.vue'))
    },
    {
      path: '/services/azure-cloud-architecture',
      name: 'AzureCloudArchitecture',
      component: () => loadComponent(() => import('../views/services/AzureCloudArchitecturePage.vue'))
    },
    {
      path: '/services/technical-leadership',
      name: 'TechnicalLeadership',
      component: () => loadComponent(() => import('../views/services/TechnicalLeadershipPage.vue'))
    },
    {
      path: '/services/microservices-architecture',
      name: 'MicroservicesArchitecture',
      component: () => loadComponent(() => import('../views/services/MicroservicesArchitecturePage.vue'))
    },
    {
      path: '/services/agile-project-management',
      name: 'AgileProjectManagement',
      component: () => loadComponent(() => import('../views/services/AgileProjectManagementPage.vue'))
    },
    {
      path: '/services/database-design-optimization',
      name: 'DatabaseDesignOptimization',
      component: () => loadComponent(() => import('../views/services/DatabaseDesignOptimizationPage.vue'))
    },
    {
      path: '/services/mobile-development',
      name: 'MobileDevelopment',
      component: () => loadComponent(() => import('../views/services/MobileDevelopmentPage.vue'))
    },
  {
    path: '/contact',
    redirect: '/'
  },
  {
    path: '/about',
    redirect: '/'
  },
  {
    path: '/resume',
    redirect: '/'
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => loadComponent(() => import('../views/Privacy.vue'))
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => loadComponent(() => import('../views/blog/BlogIndex.vue'))
  },
  {
    path: '/blog/:slug',
    name: 'BlogArticle',
    component: () => loadComponent(() => import('../views/blog/BlogArticlePage.vue'))
  },
  // Catch-all route for 404 errors - must be last
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => loadComponent(() => import('../views/NotFound.vue'))
  }
]

const scrollKey = (path) => `scroll:${path}`
const returnSectionKey = 'home:returnSection'

const saveScrollPosition = (path) => {
  if (typeof window === 'undefined') return
  if (path !== '/') return
  try {
    sessionStorage.setItem(scrollKey(path), String(window.scrollY))
  } catch (error) {
    // Ignore storage errors (private mode, quota, etc.)
  }
}

const getSavedScrollPosition = (path) => {
  if (typeof window === 'undefined') return null
  if (path !== '/') return null
  try {
    const raw = sessionStorage.getItem(scrollKey(path))
    if (!raw) return null
    const value = Number(raw)
    return Number.isFinite(value) ? value : null
  } catch (error) {
    return null
  }
}

const getReturnSection = () => {
  if (typeof window === 'undefined') return null
  try {
    return sessionStorage.getItem(returnSectionKey)
  } catch (error) {
    return null
  }
}

const clearReturnSection = () => {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(returnSectionKey)
  } catch (error) {
    // Ignore storage errors
  }
}

// Cache section positions to avoid repeated layout reads
let sectionPositionsCache = null
let cacheTimestamp = 0
const CACHE_DURATION = 1000 // Cache for 1 second

const detectHomeSection = () => {
  if (typeof window === 'undefined') return null
  
  const now = Date.now()
  const sections = ['hero', 'about', 'technology-expertise', 'skills', 'resume', 'portfolio', 'services', 'contact']
  
  // Use cached positions if available and fresh
  if (sectionPositionsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    // Batch scroll position reads to avoid forced reflow
    const scrollY = window.scrollY || window.pageYOffset
    const innerHeight = window.innerHeight
    const scrollPosition = scrollY + innerHeight / 3
    
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const cached = sectionPositionsCache[sections[i]]
      if (cached !== undefined && cached <= scrollPosition) {
        return sections[i]
      }
    }
    return 'hero'
  }
  
  // Batch all layout reads in a single operation to minimize forced reflows
  // Read all layout properties together to avoid multiple reflows
  const positions = {}
  // Batch scroll and viewport reads
  const scrollY = window.scrollY || window.pageYOffset
  const innerHeight = window.innerHeight
  const scrollPosition = scrollY + innerHeight / 3
  
  // Batch all offsetTop reads together
  for (let i = 0; i < sections.length; i += 1) {
    const section = document.getElementById(sections[i])
    if (section) {
      // Read offsetTop once and cache it (offsetTop doesn't cause reflow)
      positions[sections[i]] = section.offsetTop
    }
  }
  
  // Update cache
  sectionPositionsCache = positions
  cacheTimestamp = now
  
  // Find matching section using cached positions
  for (let i = sections.length - 1; i >= 0; i -= 1) {
    const pos = positions[sections[i]]
    if (pos !== undefined && pos <= scrollPosition) {
      return sections[i]
    }
  }
  return 'hero'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use Vite's base URL for router
  routes,
  scrollBehavior(to, from, savedPosition) {
    // For back/forward navigation, use browser's saved position
    if (savedPosition) {
      return savedPosition
    }

    // For project/service/404 pages, always scroll to top IMMEDIATELY (before content renders)
    if (to.path.startsWith('/projects/') || to.path.startsWith('/services/') || to.name === 'NotFound') {
      // Use 'instant' behavior to scroll immediately, preventing content flash
      // This ensures scroll happens before Vue renders the new page
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
      return { top: 0, behavior: 'instant' }
    }

    // For home page with hash or return section, don't scroll to top
    // Let Home.vue handle scrolling after content renders
    // For home page: ALWAYS scroll to top first (unified behavior like breadcrumbs)
    // Then Home.vue will scroll to the target section after content renders
    if (to.path === '/') {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
      return { top: 0, behavior: 'instant' }
    }

    // Default: scroll to top for all other routes
    return { top: 0, behavior: 'smooth' }
  }
})

// SEO Meta Tags - Set on route change
router.beforeEach((to, from, next) => {
  if (from?.path === '/' && (to.path.startsWith('/projects/') || to.path.startsWith('/services/'))) {
    const sectionId = detectHomeSection()
    if (sectionId) {
      try {
        sessionStorage.setItem(returnSectionKey, sectionId)
      } catch (error) {
        // Ignore storage errors
      }
    }
  }

  if (from && from.fullPath) {
    saveScrollPosition(from.fullPath)
  }

  const BASE_URL = import.meta.env.BASE_URL || '/portfolio/'
  
  // SEO: every route sets meta (title, description, canonical, 5–8 keywords, OG/Twitter). Safe practices, no stuffing.
  if (to.name === 'Home') {
    applyHomeSEO()
    // Structured data will be generated by Home.vue component with testimonials
  } else if (to.path.startsWith('/projects/')) {
    const projectData = PROJECT_DATA_MAP[to.name] || {
      title: to.name.replace(/([A-Z])/g, ' $1').trim(),
      description: `${to.name.replace(/([A-Z])/g, ' $1').trim()} - Enterprise software project by Waqas Ahmad, Senior Software Engineer & Technical Lead.`,
      technologies: []
    }
    applyProjectSEO({
      title: projectData.title,
      description: projectData.description,
      technologies: projectData.technologies || [],
      url: to.path,
      image: `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`
    })
    const testimonials = PROJECT_TESTIMONIALS_MAP[to.name] || []
    const metrics = PROJECT_METRICS_MAP[to.name] || projectData.metrics
    generateProjectPageStructuredData(
      {
        title: projectData.title,
        description: projectData.description,
        url: to.path,
        image: `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`
      },
      { testimonials, metrics: testimonials.length > 0 ? undefined : metrics }
    )
  } else if (to.path.startsWith('/services/')) {
    const serviceInfo = SERVICE_DATA_MAP[to.name] || {
      title: to.name.replace(/([A-Z])/g, ' $1').trim(),
      description: `${to.name.replace(/([A-Z])/g, ' $1').trim()} — overview of capabilities, technologies, and experience.`
    }
    const serviceData = {
      title: serviceInfo.title,
      description: serviceInfo.description,
      url: to.path,
      serviceType: serviceInfo.title
    }
    applyServiceSEO(serviceData)
    generateServicePageStructuredData(serviceData, [])
  } else if (to.path === '/blog') {
    applyBlogIndexSEO()
    import('../config/blogArticles.js').then(({ BLOG_ARTICLES }) => {
      generateBlogIndexStructuredData([...BLOG_ARTICLES])
    })
  } else if (to.path.startsWith('/blog/') && to.params.slug) {
    import('../config/blogArticles.js').then(({ getArticleBySlug }) => {
      const article = getArticleBySlug(to.params.slug)
      if (article) {
        applyBlogSEO(article)
        generateBlogArticleStructuredData(article)
      } else {
        setPageSEO({
          title: 'Article Not Found',
          description: 'The requested article was not found. Return to the blog to explore more articles.',
          keywords: getMetaKeywords('/blog').length ? getMetaKeywords('/blog') : ['blog', 'articles', 'technical blog', 'engineering'],
          url: `${SITE_URL}${to.path}`,
          noindex: true
        })
        const notFoundBreadcrumbs = generateBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Blog', url: `${SITE_URL}blog` },
          { name: 'Article Not Found', url: `${SITE_URL}${to.path}` }
        ])
        const articleNotFoundWebPage = generateWebPageSchema({
          path: to.path,
          title: 'Article Not Found',
          description: 'The requested article was not found. Return to the blog to explore more articles.'
        })
        injectStructuredData([notFoundBreadcrumbs, articleNotFoundWebPage])
      }
    })
  } else if (to.name === 'Privacy') {
    setPageSEO({
      title: 'Privacy & Analytics | Waqas Ahmad',
      description: 'Privacy and analytics disclosure: Google Analytics (GA4), Microsoft Clarity. What we collect, your choices, and how to contact us.',
      keywords: getMetaKeywords('/privacy').length ? getMetaKeywords('/privacy') : ['privacy', 'analytics', 'Google Analytics', 'Microsoft Clarity', 'data', 'cookies'],
      url: `${SITE_URL}${to.path}`
    })
    const privacyBreadcrumbs = generateBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Privacy', url: `${SITE_URL}${to.path}` }
    ])
    const privacyWebPage = generateWebPageSchema({ path: to.path, title: 'Privacy & Analytics' })
    injectStructuredData([privacyBreadcrumbs, privacyWebPage])
  } else if (to.name === 'NotFound') {
    setPageSEO({
      title: '404 - Page Not Found',
      description: 'The page you are looking for does not exist. Return to the homepage to explore the portfolio and services.',
      keywords: getMetaKeywords('/404').length ? getMetaKeywords('/404') : ['404', 'page not found', 'portfolio', 'home'],
      url: `${SITE_URL}${to.path}`,
      noindex: true
    })
    const notFoundBreadcrumbs = generateBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Page Not Found', url: `${SITE_URL}${to.path}` }
    ])
    const notFoundWebPage = generateWebPageSchema({
      path: to.path,
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist. Return to the homepage to explore the portfolio and services.'
    })
    injectStructuredData([notFoundBreadcrumbs, notFoundWebPage])
  } else {
    setPageSEO({
      title: 'Senior Software Engineer & Technical Lead',
      description: 'Senior Software Engineer & Technical Lead. Portfolio of experience in .NET, Azure Cloud, and enterprise architecture.',
      keywords: getMetaKeywords('/').length ? getMetaKeywords('/') : ['Senior Software Engineer', 'Technical Lead', 'software engineering', 'cloud architecture', '.NET'],
      url: `${SITE_URL}${to.path}`
    })
    const fallbackWebPage = generateWebPageSchema({
      path: to.path,
      title: 'Senior Software Engineer & Technical Lead',
      description: 'Senior Software Engineer & Technical Lead. Portfolio of experience in .NET, Azure Cloud, and enterprise architecture.'
    })
    const fallbackBreadcrumbs = generateBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Page', url: `${SITE_URL}${to.path}` }
    ])
    injectStructuredData([fallbackBreadcrumbs, fallbackWebPage])
  }
  
  // Track page view for all routes
  trackPageView(to.path, document.title)
  
  // Track specific page types
  if (to.path.startsWith('/projects/')) {
    const projectName = to.meta?.title || to.name.replace(/([A-Z])/g, ' $1').trim()
    trackProjectPageView(projectName)
  } else if (to.path.startsWith('/services/')) {
    const serviceName = to.meta?.title || to.name.replace(/([A-Z])/g, ' $1').trim()
    trackServicePageView(serviceName)
  }
  
  next()
})

// Dev-only: assert expected JSON-LD schema types after navigation (delay so component-injected schemas e.g. FAQ are present)
if (import.meta.env.DEV) {
  router.afterEach((to) => {
    const run = () => assertStructuredData(to)
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(run, { timeout: 600 })
    } else {
      setTimeout(run, 350)
    }
  })
}

export default router

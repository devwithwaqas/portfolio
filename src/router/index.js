import { createRouter, createWebHistory } from 'vue-router'
// Lazy load all views for better code splitting
import { setPageSEO, getHomePageSEO, getProjectPageSEO, getServicePageSEO } from '../utils/seo.js'
import { generateProjectPageStructuredData, generateServicePageStructuredData } from '../utils/structuredData.js'
import { trackPageView, trackServicePageView, trackProjectPageView } from '../utils/analytics.js'

// Helper function for safe dynamic imports with error handling
// This prevents "failed to load dynamic modules" errors during memory profiling
const loadComponent = (componentImport) => {
  return componentImport().catch((error) => {
    console.error('Failed to load dynamic module:', error)
    // Return a fallback error component instead of crashing
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
  const scrollPosition = window.scrollY + window.innerHeight / 3
  
  // Use cached positions if available and fresh
  if (sectionPositionsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const cached = sectionPositionsCache[sections[i]]
      if (cached !== undefined && cached <= scrollPosition) {
        return sections[i]
      }
    }
    return 'hero'
  }
  
  // Batch all layout reads in a single operation to minimize forced reflows
  // Use requestAnimationFrame to read layout after any pending style changes
  const positions = {}
  for (let i = 0; i < sections.length; i += 1) {
    const section = document.getElementById(sections[i])
    if (section) {
      // Read offsetTop once and cache it
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

    // For home page with return section, let Home.vue handle scrolling
    if (to.path === '/') {
      const returnSection = getReturnSection()
      if (returnSection) {
        // Don't scroll here - Home.vue will handle it after content renders
        return { top: 0, behavior: 'auto' }
      }
    }

    // Handle hash links
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }

    // Default: scroll to top
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
  // Ensure SITE_URL always includes /portfolio/ for GitHub Pages
  const SITE_URL = 'https://devwithwaqas.github.io/portfolio/'
  
  // Set SEO based on route
  if (to.name === 'Home') {
    const seo = getHomePageSEO()
    setPageSEO({
      ...seo,
      url: SITE_URL
    })
    // Structured data will be generated by Home.vue component with testimonials
  } else if (to.path.startsWith('/projects/')) {
    // Project page - get data from route meta or use defaults
    const projectTitle = to.name.replace(/([A-Z])/g, ' $1').trim()
    const seo = getProjectPageSEO({
      title: projectTitle,
      description: `${projectTitle} - Enterprise software project by Waqas Ahmad, Senior Software Engineer & Technical Lead.`,
      technologies: [],
      url: to.path,
      image: `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`
    })
    setPageSEO({
      ...seo,
      url: `${SITE_URL}${to.path}`,
      type: 'article'
    })
    generateProjectPageStructuredData({
      title: projectTitle,
      description: seo.description,
      url: to.path,
      image: seo.image
    })
  } else if (to.path.startsWith('/services/')) {
    // Service page - Enhanced for recruiter searches
    const serviceTitle = to.name.replace(/([A-Z])/g, ' $1').trim()
    const serviceData = {
      title: serviceTitle,
      description: `Hire expert ${serviceTitle} services. ${serviceTitle} consultant with 17+ years of experience in enterprise solutions, Azure Cloud, and .NET development. Available for consulting, freelance, and contract projects in Malaysia and globally.`,
      url: to.path,
      serviceType: serviceTitle,
      keywords: [
        `hire ${serviceTitle.toLowerCase()} malaysia`,
        `${serviceTitle.toLowerCase()} consultant`,
        `${serviceTitle.toLowerCase()} expert`,
        `freelance ${serviceTitle.toLowerCase()} developer`,
        `contract ${serviceTitle.toLowerCase()} services`
      ]
    }
    const seo = getServicePageSEO(serviceData)
    setPageSEO({
      ...seo,
      url: `${SITE_URL}${to.path}`
    })
    // Generate structured data (FAQ will be added by component)
    generateServicePageStructuredData(serviceData, [])
  } else if (to.name === 'NotFound') {
    // 404 page SEO
    setPageSEO({
      title: '404 - Page Not Found | Waqas Ahmad Portfolio',
      description: 'The page you are looking for does not exist. Return to the homepage to explore Waqas Ahmad\'s portfolio and services.',
      keywords: ['404', 'Page Not Found'],
      url: `${SITE_URL}${to.path}`
    })
  } else {
    // Default SEO for other pages
    setPageSEO({
      title: 'Waqas Ahmad - Senior Software Engineer & Technical Lead',
      description: 'Senior Software Engineer & Technical Lead with 17+ years of experience in .NET, Azure Cloud, and enterprise architecture.',
      keywords: ['Senior Software Engineer', 'Technical Lead', 'Malaysia'],
      url: `${SITE_URL}${to.path}`
    })
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

export default router

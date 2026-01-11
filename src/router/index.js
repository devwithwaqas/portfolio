import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import HeatExchangerPage from '../views/projects/HeatExchangerPage.vue'
import AirAsiaID90Page from '../views/projects/AirAsiaID90Page.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects/heat-exchanger',
    name: 'HeatExchanger',
    component: HeatExchangerPage
  },
  {
    path: '/projects/airasia-id90',
    name: 'AirAsiaID90',
    component: AirAsiaID90Page
  },
  // Placeholder routes for projects not yet implemented
  {
    path: '/projects/bat-inhouse-app',
    name: 'BATInhouseApp',
    component: () => import('../views/projects/BATInhouseAppPage.vue')
  },
  {
    path: '/projects/pj-smart-city',
    name: 'PJSmartCity',
    component: () => import('../views/projects/SmartCityPage.vue')
  },
  {
    path: '/projects/gamified-employee-management',
    name: 'GamifiedEmployeeManagement',
    component: () => import('../views/projects/GamifiedEmployeeManagementPage.vue')
  },
    {
      path: '/projects/valet-parking',
      name: 'ValetParking',
      component: () => import('../views/projects/ValetParkingPage.vue')
    },
  {
    path: '/projects/mobile-games',
    name: 'MobileGames',
    component: () => import('../views/projects/MobileGamesPage.vue')
  },
  {
    path: '/projects/uk-property-management',
    name: 'UKPropertyManagement',
    component: () => import('../views/projects/UKPropertyManagementPage.vue')
  },
  {
    path: '/projects/g5-pos',
    name: 'G5POS',
    component: () => import('../views/projects/G5POSPage.vue')
  },
  {
    path: '/projects/chubb-insurance-applications',
    name: 'ChubbInsuranceApplications',
    component: () => import('../views/projects/InsuranceClientsPage.vue')
  },
  // Redirect any old routes to home with hash
  {
    path: '/portfolio',
    redirect: '/#portfolio'
  },
  {
    path: '/services',
    redirect: '/#services'
  },
    {
      path: '/services/full-stack-development',
      name: 'FullStackDevelopment',
      component: () => import('../views/services/FullStackDevelopmentPage.vue')
    },
    {
      path: '/services/azure-cloud-architecture',
      name: 'AzureCloudArchitecture',
      component: () => import('../views/services/AzureCloudArchitecturePage.vue')
    },
    {
      path: '/services/technical-leadership',
      name: 'TechnicalLeadership',
      component: () => import('../views/services/TechnicalLeadershipPage.vue')
    },
    {
      path: '/services/microservices-architecture',
      name: 'MicroservicesArchitecture',
      component: () => import('../views/services/MicroservicesArchitecturePage.vue')
    },
    {
      path: '/services/agile-project-management',
      name: 'AgileProjectManagement',
      component: () => import('../views/services/AgileProjectManagementPage.vue')
    },
    {
      path: '/services/database-design-optimization',
      name: 'DatabaseDesignOptimization',
      component: () => import('../views/services/DatabaseDesignOptimizationPage.vue')
    },
    {
      path: '/services/mobile-development',
      name: 'MobileDevelopment',
      component: () => import('../views/services/MobileDevelopmentPage.vue')
    },
  {
    path: '/contact',
    redirect: '/#contact'
  },
  {
    path: '/about',
    redirect: '/#about'
  },
  {
    path: '/resume',
    redirect: '/#resume'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      // Handle hash navigation with delay to ensure DOM is ready
      return new Promise((resolve) => {
        setTimeout(() => {
          const element = document.querySelector(to.hash)
          if (element) {
            resolve({
              el: to.hash,
              behavior: 'smooth',
              top: 100 // Offset for fixed header
            })
          } else {
            resolve({ top: 0 })
          }
        }, 100)
      })
    } else {
      return { top: 0 }
    }
  }
})

export default router

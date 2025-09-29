import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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

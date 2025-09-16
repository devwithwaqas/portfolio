import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import CSS
import './assets/css/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

// Initialize vendor libraries after Vue app is mounted
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  }

  // Initialize PureCounter
  if (typeof PureCounter !== 'undefined') {
    new PureCounter()
  }

  // Initialize GLightbox
  if (typeof GLightbox !== 'undefined') {
    const lightbox = GLightbox({
      selector: '.glightbox'
    })
  }

  // Initialize Swiper for testimonials
  if (typeof Swiper !== 'undefined') {
    // Wait for testimonials slider to be available
    const initTestimonialsSwiper = () => {
      const testimonialsSlider = document.querySelector('.testimonials-slider')
      if (testimonialsSlider && !testimonialsSlider.swiper) {
        console.log('Initializing Swiper for testimonials')
        new Swiper('.testimonials-slider', {
          speed: 600,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          },
          slidesPerView: 1,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: false
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            768: {
              slidesPerView: 1
            },
            1024: {
              slidesPerView: 1
            }
          }
        })
      }
    }
    
    // Try to initialize immediately
    initTestimonialsSwiper()
    
    // Also try after delays in case DOM isn't ready
    setTimeout(initTestimonialsSwiper, 500)
    setTimeout(initTestimonialsSwiper, 1000)
  }

  // Initialize Isotope for portfolio filtering
  if (typeof Isotope !== 'undefined') {
    const portfolioIsotope = document.querySelector('.portfolio-isotope')
    if (portfolioIsotope) {
      const portfolioFilter = portfolioIsotope.getAttribute('data-portfolio-filter')
      if (portfolioFilter) {
        new Isotope(portfolioIsotope, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        })
      }
    }
  }
})
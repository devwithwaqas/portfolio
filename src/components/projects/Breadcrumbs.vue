<template>
  <div class="page-title" data-aos="fade">
    <div class="container">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol itemscope itemtype="https://schema.org/BreadcrumbList">
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <meta itemprop="position" content="1" />
            <router-link to="/" itemprop="item">
              <span itemprop="name">Home</span>
            </router-link>
          </li>
          <li v-if="parentLink" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <meta itemprop="position" content="2" />
            <a href="#" @click.prevent="navigateToSection" itemprop="item">
              <span itemprop="name">{{ parentLabel }}</span>
            </a>
          </li>
          <li class="current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <meta itemprop="position" :content="parentLink ? '3' : '2'" />
            <span itemprop="name">{{ currentPage }}</span>
            <meta itemprop="item" :content="safeCurrentUrl" />
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script>
import { generateBreadcrumbSchema, injectStructuredData } from '../../utils/structuredData.js'
import { SITE_URL } from '../../config/constants.js'

export default {
  name: 'Breadcrumbs',
  props: {
    currentPage: {
      type: String,
      required: true
    },
    parentLink: {
      type: String,
      default: '/#portfolio'
    },
    parentLabel: {
      type: String,
      default: 'Portfolio'
    }
  },
  data() {
    return {
      currentUrl: SITE_URL // Default fallback
    }
  },
  computed: {
    safeCurrentUrl() {
      // Return the current URL safely, ensuring it's always a string
      return this.currentUrl || SITE_URL
    },
    sectionId() {
      // Extract section ID from parentLink (e.g., '/#portfolio' -> 'portfolio')
      if (this.parentLink && this.parentLink.includes('#')) {
        return this.parentLink.split('#')[1]
      }
      return null
    }
  },
  methods: {
    navigateToSection(event) {
      event.preventDefault()
      
      if (!this.sectionId) return
      
      // Always scroll without changing URL - no hash fragments
      if (this.$route.path !== '/') {
        // If not on home page, navigate to home first, then scroll
        this.$router.push('/').then(() => {
          this.$nextTick(() => {
            this.scrollToSectionElement(this.sectionId)
          })
        })
      } else {
        // Already on home page - scroll directly
        this.scrollToSectionElement(this.sectionId)
      }
    },
    
    scrollToSectionElement(sectionId) {
      const element = document.getElementById(sectionId)
      if (!element) {
        // Element not found - retry a few times
        let retryCount = 0
        const maxRetries = 10
        const retryInterval = setInterval(() => {
          retryCount++
          const retryElement = document.getElementById(sectionId)
          if (retryElement || retryCount >= maxRetries) {
            clearInterval(retryInterval)
            if (retryElement) {
              this.performScroll(retryElement)
            }
          }
        }, 100)
        return
      }
      
      this.performScroll(element)
    },
    
    performScroll(element) {
      // Use requestAnimationFrame to ensure layout is stable
      // OPTIMIZATION: Use offsetTop instead of getBoundingClientRect to avoid forced reflow
      // This matches the Navigation component's approach for consistency
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // offsetTop doesn't cause forced reflow (unlike getBoundingClientRect)
          const elementOffsetTop = element.offsetTop
          const headerOffset = 120
          const offsetPosition = elementOffsetTop - headerOffset
          
          // Ensure we're scrolling to a valid position
          if (offsetPosition >= 0) {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        })
      })
    }
  },
  mounted() {
    // Safely get current URL - window is guaranteed to exist in mounted()
    try {
      if (typeof window !== 'undefined' && window.location && window.location.href) {
        this.currentUrl = window.location.href
      } else if (this.$route && this.$route.path) {
        // Fallback: build URL from router
        const baseUrl = SITE_URL.replace(/\/$/, '')
        const path = this.$route.path.startsWith('/') ? this.$route.path : `/${this.$route.path}`
        this.currentUrl = `${baseUrl}${path}`
      }
    } catch (e) {
      // If anything fails, keep the default SITE_URL
      this.currentUrl = SITE_URL
    }
    
    // Generate and inject BreadcrumbList structured data for SEO
    const breadcrumbItems = [
      { name: 'Home', url: SITE_URL },
      { name: this.parentLabel, url: `${SITE_URL}${this.parentLink.replace(/^\/#/, '')}` },
      { name: this.currentPage, url: this.currentUrl }
    ]
    
    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)
    injectStructuredData(breadcrumbSchema)
  }
}
</script>

<style scoped>
/* Breadcrumbs styling - Compact and centered */
.page-title {
  padding: 20px 0;
  background: linear-gradient(135deg, rgba(30, 15, 50, 0.95) 0%, rgba(20, 10, 35, 0.98) 100%);
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  display: flex;
  align-items: center;
  min-height: 60px;
}

.breadcrumbs {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
}

.breadcrumbs li + li::before {
  content: '/';
  padding: 0 10px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1;
}

.breadcrumbs a {
  color: #7c3aed;
  text-decoration: none;
  transition: color 0.3s ease;
  line-height: 1;
}

.breadcrumbs a:hover {
  color: rgba(139, 92, 246, 1);
  text-decoration: underline;
}

.breadcrumbs .current {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  line-height: 1;
}

/* Desktop */
@media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
  .page-title {
    padding: 18px 0;
    min-height: 56px;
  }
}

/* Tablet */
@media (pointer: coarse) and (min-width: 768px) and (max-width: 1199px) {
  .page-title {
    padding: 16px 0;
    min-height: 52px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .page-title {
    padding: 12px 0;
    min-height: auto;
  }
  
  /* Mobile: Make breadcrumbs more compact and allow wrapping */
  .breadcrumbs {
    width: 100%;
    overflow: visible;
  }
  
  .breadcrumbs ol {
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 2px 0;
    row-gap: 4px;
  }
  
  /* Mobile: Reduce font size for all breadcrumb items */
  .breadcrumbs a,
  .breadcrumbs .current {
    font-size: 0.8rem !important;
    line-height: 1.2;
  }
  
  /* Mobile: Reduce separator padding and size */
  .breadcrumbs li + li::before {
    padding: 0 4px;
    font-size: 0.7rem;
    margin: 0 2px;
  }
  
  /* Mobile: Truncate only long project names with ellipsis, keep links visible */
  .breadcrumbs .current {
    max-width: calc(100vw - 100px); /* Account for container padding, hamburger button, and other breadcrumb items */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    flex-shrink: 1;
    min-width: 0; /* Allow flex item to shrink below content size */
  }
  
  /* Mobile: Keep all links visible but make them compact */
  .breadcrumbs li {
    flex-shrink: 0; /* Don't shrink Home and Portfolio links */
  }
  
  /* Mobile: Allow Home and Portfolio to wrap if absolutely necessary */
  .breadcrumbs li:not(.current) {
    white-space: nowrap;
  }
}
</style>



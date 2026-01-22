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
            <router-link :to="parentLink" itemprop="item">
              <span itemprop="name">{{ parentLabel }}</span>
            </router-link>
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

const SITE_URL = 'https://devwithwaqas.github.io/portfolio/'

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
      console.warn('Failed to get current URL:', e)
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
@media (pointer: coarse) and (max-width: 767px) {
  .page-title {
    padding: 14px 0;
    min-height: 48px;
  }
}
</style>



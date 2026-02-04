<template>
  <div class="page-title" :class="{ 'page-title--blog': variant === 'blog' }" data-aos="fade">
    <div class="container">
      <nav class="breadcrumbs" :class="{ 'breadcrumbs--blog': variant === 'blog' }" aria-label="Breadcrumb">
        <ol itemscope itemtype="https://schema.org/BreadcrumbList">
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <meta itemprop="position" content="1" />
            <router-link to="/" itemprop="item" :class="{ 'breadcrumb-pill': variant === 'blog' }">
              <span itemprop="name">Home</span>
            </router-link>
          </li>
          <li v-if="showParent" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <meta itemprop="position" content="2" />
            <template v-if="variant === 'blog'">
              <span class="breadcrumb-chevron" aria-hidden="true">›</span>
              <router-link v-if="isParentRoute" :to="parentLink" itemprop="item" class="breadcrumb-pill">
                <span itemprop="name">{{ parentLabel }}</span>
              </router-link>
              <a v-else href="#" @click.prevent="navigateToSection" itemprop="item" class="breadcrumb-pill">
                <span itemprop="name">{{ parentLabel }}</span>
              </a>
            </template>
            <template v-else>
              <router-link v-if="isParentRoute" :to="parentLink" itemprop="item">
                <span itemprop="name">{{ parentLabel }}</span>
              </router-link>
              <a v-else href="#" @click.prevent="navigateToSection" itemprop="item">
                <span itemprop="name">{{ parentLabel }}</span>
              </a>
            </template>
          </li>
          <li class="current" :class="{ 'current--blog': variant === 'blog' }" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <meta itemprop="position" :content="showParent ? '3' : '2'" />
            <span itemprop="name" :title="currentPage" :class="{ 'current-title--blog': variant === 'blog' }">{{ currentPage }}</span>
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
import { navigateToSection } from '../../utils/scrollToSection.js'

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
    },
    /** 'blog' = two-line layout: "Home / Blog" on first line, long article title on second with ellipsis */
    variant: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentUrl: SITE_URL // Default fallback
    }
  },
  computed: {
    // Hide parent when it's just "Home" so we don't get "Home | Home | Blog" – only "Home | Blog"
    showParent() {
      if (!this.parentLink) return false
      if (this.parentLabel === 'Home' || this.parentLink === '/') return false
      return true
    },
    safeCurrentUrl() {
      // Return the current URL safely, ensuring it's always a string
      return this.currentUrl || SITE_URL
    },
    // Parent is a route path (e.g. /blog) → use router-link. Parent has hash (e.g. /#portfolio) → use scroll-to-section
    isParentRoute() {
      if (!this.parentLink) return false
      return this.parentLink.indexOf('#') === -1
    },
    sectionId() {
      // Extract section ID from parentLink (e.g., '/#portfolio' -> 'portfolio', '#portfolio' -> 'portfolio')
      if (this.parentLink) {
        const hashIndex = this.parentLink.indexOf('#')
        if (hashIndex !== -1) {
          return this.parentLink.substring(hashIndex + 1)
        }
      }
      return null
    }
  },
  methods: {
    navigateToSection(event) {
      event.preventDefault()
      if (!this.sectionId) return
      // Use centralized navigation utility for uniform behavior
      navigateToSection(this.$router, this.sectionId)
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
      ...(this.showParent ? [{ name: this.parentLabel, url: `${SITE_URL}${this.parentLink.replace(/^\/#/, '')}` }] : []),
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
}

.breadcrumbs .current {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  line-height: 1;
}

/* ---- Blog variant: pill path + article title block ---- */
.page-title--blog {
  padding: 16px 0 18px;
  min-height: auto;
}

.page-title--blog .breadcrumbs--blog ol {
  flex-wrap: wrap;
  width: 100%;
  row-gap: 0;
  column-gap: 0;
  align-items: center;
}

/* Hide default slash; we use chevron between pills */
.page-title--blog .breadcrumbs--blog li + li::before {
  display: none;
}

.page-title--blog .breadcrumbs--blog li {
  display: inline-flex;
  align-items: center;
}

/* Pills: Home and Blog as clickable chips */
.breadcrumb-pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 9999px;
  background: rgba(139, 92, 246, 0.18);
  border: 1px solid rgba(139, 92, 246, 0.4);
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  line-height: 1.2;
}

.breadcrumb-pill:hover {
  background: rgba(139, 92, 246, 0.28);
  border-color: rgba(139, 92, 246, 0.6);
  color: #fff;
  text-decoration: none;
}

.breadcrumb-chevron {
  color: rgba(255, 255, 255, 0.45);
  font-size: 1rem;
  padding: 0 6px;
  line-height: 1;
  user-select: none;
}

/* Current article: full-width row with left accent bar and ellipsis */
.page-title--blog .breadcrumbs--blog li.current--blog {
  flex: 1 1 100%;
  min-width: 0;
  width: 100%;
  order: 3;
  padding-left: 0;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(139, 92, 246, 0.15);
}

.page-title--blog .breadcrumbs--blog li.current--blog::before {
  display: none;
}

.breadcrumbs--blog .current-title--blog {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.95rem;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.92);
  padding-left: 12px;
  border-left: 3px solid rgba(139, 92, 246, 0.7);
  font-weight: 500;
}

@media (max-width: 767px) {
  .page-title--blog {
    padding: 12px 0 14px;
  }

  .breadcrumb-pill {
    padding: 5px 10px;
    font-size: 0.75rem;
  }

  .breadcrumb-chevron {
    padding: 0 4px;
    font-size: 0.9rem;
  }

  .page-title--blog .breadcrumbs--blog li.current--blog {
    margin-top: 8px;
    padding-top: 8px;
  }

  .breadcrumbs--blog .current-title--blog {
    font-size: 0.85rem;
    padding-left: 10px;
    border-left-width: 2px;
  }
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



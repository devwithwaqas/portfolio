<template>
  <div class="project-page">
    
    <!-- Breadcrumbs Component -->
    <Breadcrumbs 
      :currentPage="projectTitle"
      :parentLink="parentLink"
      :parentLabel="parentLabel"
    />

    <!-- Main Content -->
    <article class="portfolio-details section" id="portfolio-details" itemscope itemtype="https://schema.org/Article">
      <div class="container" data-aos="fade-up">
        
        <!-- Project Hero Card (Required) -->
        <slot name="hero"></slot>
        
        <!-- Project Gallery (Optional) -->
        <slot name="gallery"></slot>
        
        <!-- 2-Column Layout: Main Content + Sidebar (First 3 sections only) -->
        <div class="row g-3">
          
          <!-- LEFT COLUMN: Main Content (col-lg-8 = 66.66%) -->
          <div class="col-12 col-lg-8">
            <slot name="main-content-top"></slot>
          </div>
          
          <!-- RIGHT COLUMN: Sidebar (col-lg-4 = 33.33%) -->
          <div class="col-12 col-lg-4">
            <slot name="sidebar"></slot>
          </div>
          
        </div>
        
        <!-- Full-Width Content (Remaining sections) -->
        <slot name="main-content-bottom"></slot>
        
        <!-- Additional Full-Width Content (Optional) -->
        <slot name="additional-content"></slot>
        
        <!-- Related services (SEO: internal links from project to service pages) -->
        <div v-if="relatedServices.length > 0" class="project-related-services mt-4">
          <ReusableCard title="Related services" icon-name="services" class="mb-4">
            <p class="related-services-intro txt-p-lg mb-3">Services used in this type of work:</p>
            <div class="related-services-links">
              <router-link
                v-for="(item, index) in relatedServices"
                :key="index"
                :to="item.path"
                class="related-service-link"
              >
                <span class="related-service-title">{{ item.title }}</span>
                <i class="bi bi-arrow-right"></i>
              </router-link>
            </div>
          </ReusableCard>
        </div>
        <!-- Part of cluster (SEO: topical cluster links) -->
        <TopicClusterLinks :current-path="$route?.path || ''" page-type="project" class="mt-4" />
        
      </div>
    </article>

  </div>
</template>

<script>
import Breadcrumbs from '../projects/Breadcrumbs.vue'
import ReusableCard from './ReusableCard.vue'
import TopicClusterLinks from '../services/TopicClusterLinks.vue'
import { getRelatedServicesForProject } from '../../config/relatedServices.js'

export default {
  name: 'ProjectPageTemplate',
  components: {
    Breadcrumbs,
    ReusableCard,
    TopicClusterLinks
  },
  computed: {
    relatedServices() {
      return getRelatedServicesForProject(this.$route?.path || '')
    }
  },
  props: {
    projectTitle: {
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
  mounted() {
    // CRITICAL: Scroll to top immediately on mount to prevent "filling from bottom" effect
    // This ensures scroll happens even if router scrollBehavior didn't fire
    // Works for both desktop and mobile
    if (typeof window !== 'undefined') {
      // Use instant scroll to prevent any visual flash
      window.scrollTo({ top: 0, behavior: 'instant' })
      
      // Also set scroll position directly as backup (for older browsers)
      if (window.scrollY > 0) {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
    }
  }
}
</script>

<style scoped>
/* Portfolio Details Section */
.portfolio-details {
  padding: 10px 0;
}

.portfolio-details .container {
  max-width: 100% !important;
  width: 100% !important;
  padding-left: 0;
  padding-right: 0;
}

/* Remove padding from diagram cards to maximize viewport */
.portfolio-details :deep(.reusable-card .card-body) {
  padding: 0 !important;
}

/* Ensure diagram container uses full width and increased height for drag/zoom */
.portfolio-details :deep(.diagram-container) {
  width: 100% !important;
  max-width: 100% !important;
  min-height: 90vh !important; /* Increased height for better drag/zoom visibility */
  height: 90vh !important; /* Set explicit height to match min-height */
}

/* Also ensure card-body doesn't constrain height */
.portfolio-details :deep(.reusable-card .card-body) {
  height: auto !important;
  min-height: auto !important;
  display: block !important;
}

/* Ensure the row and col don't constrain height */
.portfolio-details :deep(.row),
.portfolio-details :deep(.col-12) {
  height: auto !important;
}

/* Remove bottom margin from card header for diagrams */
.portfolio-details :deep(.reusable-card .card-header) {
  margin-bottom: 20px !important;
}

/* Desktop - account for side nav (16.66% width) */
@media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
  .portfolio-details .container {
    padding-left: 10px;
    padding-right: 10px;
  }
}

/* Tablet & Mobile - no side nav, no side padding */
@media (pointer: coarse) {
  .portfolio-details .container {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .portfolio-details {
    padding: 10px 0;
  }
}

/* Related services (SEO internal links) */
.project-related-services :deep(.related-services-links) {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.project-related-services :deep(.related-service-link) {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 245, 255, 0.98) 100%);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 10px;
  color: #374151;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.project-related-services :deep(.related-service-link:hover) {
  border-color: rgba(139, 92, 246, 0.5);
  color: #7c3aed;
  background: rgba(139, 92, 246, 0.06);
}

.project-related-services :deep(.related-services-intro) {
  color: #4b5563;
}
</style>

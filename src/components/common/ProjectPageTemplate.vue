<template>
  <div class="project-page">
    
    <!-- Breadcrumbs Component -->
    <Breadcrumbs 
      :currentPage="projectTitle"
      :parentLink="parentLink"
      :parentLabel="parentLabel"
    />

    <!-- Main Content -->
    <section class="portfolio-details section" id="portfolio-details">
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
        
      </div>
    </section>

  </div>
</template>

<script>
import Breadcrumbs from '../projects/Breadcrumbs.vue'

export default {
  name: 'ProjectPageTemplate',
  components: {
    Breadcrumbs
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
</style>

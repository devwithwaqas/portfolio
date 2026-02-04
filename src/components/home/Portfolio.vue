<template>
  <section id="portfolio" class="portfolio section" itemscope itemtype="https://schema.org/ItemList">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      
      <!-- Portfolio Card -->
      <ReusableCard 
        title="Project Portfolio" 
        icon-name="project portfolio"
        body-padding="0"
      >

              <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

                <!-- Portfolio Filters Removed - All projects are Enterprise Projects -->

                <div class="isotope-container">

                  <EpicCard
                    v-for="project in projects"
                    :key="project.detailsLink"
                    :title="project.title"
                    :subtitle="project.subtitle"
                    :bannerImage="project.bannerImage"
                    :detailsLink="project.detailsLink"
                    :techStack="project.techStack"
                  />

                </div><!-- End Portfolio Container -->

              </div><!-- End Isotope Layout -->

      </ReusableCard>

    </div>
  </section><!-- /Portfolio Section -->
</template>

<script>
import { defineAsyncComponent } from 'vue'
import ReusableCard from '../common/ReusableCard.vue'
import { portfolioProjects } from '../../data/portfolioProjects.js'

const EpicCard = defineAsyncComponent(() => import('../common/EpicCard.vue'))

export default {
  name: 'Portfolio',
  components: {
    ReusableCard,
    EpicCard
  },
  data() {
    return {
      projects: portfolioProjects
    }
  }
}
</script>

<style scoped>
/* All Epic Card styling now handled by EpicCard.vue component */
/* This file only contains Portfolio-specific overrides */

/* Portfolio overflow fixes - Allow border animation to work properly */
.portfolio-item,
.isotope-container,
.row,
#portfolio,
section,
#portfolio .container,
#portfolio .row,
#portfolio .portfolio-item {
  overflow: visible !important;
  height: auto !important;
}

</style>

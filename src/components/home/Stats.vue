<template>
  <section id="stats" class="stats section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <!-- Stats Card -->
      <ReusableCard 
        title="Professional Statistics" 
        icon-name="professional statistics"
        body-padding="0"
      >
        <div class="row mb-5 g-4">
            <div class="col-12">
              <div class="text-center mb-4 txt-h3-xl stats-section-title">
                <IconComponent icon-name="professional statistics" fallback-emoji="📊" size="lg" style="margin-right: 10px;" />
                Professional Statistics
              </div>
            </div>
                
                <!-- Happy Clients -->
                <StatCard 
                  label="Happy Clients"
                  :value="calculatedStats.happyClients"
                  iconPath="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  iconColor="#ffd700"
                />
                
                <!-- Projects -->
                <StatCard 
                  label="Projects"
                  :value="calculatedStats.totalProjects"
                  iconPath="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
                  iconColor="#00ff88"
                />
                
                <!-- Years Experience -->
                <StatCard 
                  label="Years Experience"
                  :value="calculatedStats.yearsExperience"
                  iconPath="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"
                  iconColor="#ff1744"
                />
                
                <!-- Years as Tech Lead -->
                <StatCard 
                  label="Years as Tech Lead"
                  :value="calculatedStats.yearsAsTechLead"
                  iconPath="M16,4C18.21,4 20,5.79 20,8C20,10.21 18.21,12 16,12C13.79,12 12,10.21 12,8C12,5.79 13.79,4 16,4M16,5.9A2.1,2.1 0 0,0 13.9,8A2.1,2.1 0 0,0 16,10.1A2.1,2.1 0 0,0 18.1,8A2.1,2.1 0 0,0 16,5.9M16,13C18.67,13 24,14.33 24,17V20H8V17C8,14.33 13.33,13 16,13M2,12V20H0V12H2M22,12V20H20V12H22M6,12V20H4V12H6M18,12V20H16V12H18M10,12V20H8V12H10M14,12V20H12V12H14Z"
                  iconColor="#00e676"
                />
                
        </div>
      </ReusableCard>
    </div>
  </section>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import StatCard from '../common/StatCard.vue'
import IconComponent from '../common/IconComponent.vue'
import { APP_CONFIG, ANIMATION_CONFIG } from '../../config/constants.js'

export default {
  components: {
    ReusableCard,
    StatCard,
    IconComponent
  },
  name: 'Stats',
  computed: {
    // Calculate stats dynamically based on work experience
    calculatedStats() {
      // Calculate total experience from first job (Jan 1, 2008) to present
      const startDate = new Date(2008, 0, 1) // January 1, 2008
      const today = new Date()
      const diffTime = Math.abs(today - startDate)
      const totalYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25))
      
      // Tech Lead experience: From midway Squad Cell career (around 2015) to present
      const techLeadStartDate = new Date(2015, 0, 1) // Midway through Squad Cell career
      const diffTimeTechLead = Math.abs(today - techLeadStartDate)
      const techLeadYears = Math.floor(diffTimeTechLead / (1000 * 60 * 60 * 24 * 365.25))
      
      return {
        happyClients: 50,
        totalProjects: 75,
        yearsExperience: totalYears,
        yearsAsTechLead: techLeadYears
      }
    }
  }
}
</script>

<style scoped>
/* All stat card styling now handled by StatCard.vue component */
/* This file only contains Stats section-specific overrides if needed */

.stats-section-title {
  color: #0563bb;
  font-weight: 600;
}

/* Responsive adjustments for row/card-body */
@media (pointer: coarse) and (max-width: 768px) {
  .card-body {
    padding: 0 5px !important;
  }
  
  .row {
    margin: 0 -5px !important;
  }
}

@media (pointer: coarse) and (max-width: 576px) {
  .card-body {
    padding: 0 !important;
  }
  
  .row {
    margin: 0 !important;
  }
}
</style>
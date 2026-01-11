<template>
  <section id="portfolio" class="portfolio section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      
      <!-- Portfolio Card -->
      <ReusableCard 
        title="Project Portfolio" 
        icon-name="project portfolio"
        body-padding="0"
      >

              <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

                <!-- Portfolio Filters Removed - All projects are Enterprise Projects -->

                <div class="isotope-container" data-aos="fade-up" data-aos-delay="200">

                  <!-- Heat Exchanger Portal -->
                  <EpicCard
                    :title="projects[0].title"
                    :subtitle="projects[0].subtitle"
                    :bannerImage="projects[0].bannerImage"
                    :detailsLink="projects[0].detailsLink"
                    :techStack="projects[0].techStack"
                  />

                  <!-- Air Asia ID90 -->
                  <EpicCard
                    :title="projects[1].title"
                    :subtitle="projects[1].subtitle"
                    :bannerImage="projects[1].bannerImage"
                    :detailsLink="projects[1].detailsLink"
                    :techStack="projects[1].techStack"
                  />

                  <!-- BAT Inhouse App -->
                  <EpicCard
                    :title="projects[2].title"
                    :subtitle="projects[2].subtitle"
                    :bannerImage="projects[2].bannerImage"
                    :detailsLink="projects[2].detailsLink"
                    :techStack="projects[2].techStack"
                  />

                  <!-- PJ Smart City -->
                  <EpicCard
                    :title="projects[3].title"
                    :subtitle="projects[3].subtitle"
                    :bannerImage="projects[3].bannerImage"
                    :detailsLink="projects[3].detailsLink"
                    :techStack="projects[3].techStack"
                  />

                  <!-- G5 POS -->
                  <EpicCard
                    :title="projects[8].title"
                    :subtitle="projects[8].subtitle"
                    :bannerImage="projects[8].bannerImage"
                    :detailsLink="projects[8].detailsLink"
                    :techStack="projects[8].techStack"
                  />

                  <!-- Gamified Employee Management -->
                  <EpicCard
                    :title="projects[4].title"
                    :subtitle="projects[4].subtitle"
                    :bannerImage="projects[4].bannerImage"
                    :detailsLink="projects[4].detailsLink"
                    :techStack="projects[4].techStack"
                  />

                  <!-- Valet Parking -->
                  <EpicCard
                    :title="projects[5].title"
                    :subtitle="projects[5].subtitle"
                    :bannerImage="projects[5].bannerImage"
                    :detailsLink="projects[5].detailsLink"
                    :techStack="projects[5].techStack"
                  />

                  <!-- Mobile Games Collection -->
                  <EpicCard
                    :title="projects[6].title"
                    :subtitle="projects[6].subtitle"
                    :bannerImage="projects[6].bannerImage"
                    :detailsLink="projects[6].detailsLink"
                    :techStack="projects[6].techStack"
                  />

                  <!-- Confidential Insurance Clients -->
                  <EpicCard
                    :title="projects[9].title"
                    :subtitle="projects[9].subtitle"
                    :bannerImage="projects[9].bannerImage"
                    :detailsLink="projects[9].detailsLink"
                    :techStack="projects[9].techStack"
                  />

                  <!-- UK Property Management Platform -->
                  <EpicCard
                    :title="projects[7].title"
                    :subtitle="projects[7].subtitle"
                    :bannerImage="projects[7].bannerImage"
                    :detailsLink="projects[7].detailsLink"
                    :techStack="projects[7].techStack"
                  />

                </div><!-- End Portfolio Container -->

              </div><!-- End Isotope Layout -->

      </ReusableCard>

    </div>
  </section><!-- /Portfolio Section -->
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import EpicCard from '../common/EpicCard.vue'

export default {
  name: 'Portfolio',
  components: {
    ReusableCard,
    EpicCard
  },
  data() {
    return {
      projects: [
        {
          title: 'Heat Exchanger Portal',
          subtitle: 'Enterprise Thermal Management',
          bannerImage: '/assets/img/he1.jpg',
          detailsLink: '/projects/heat-exchanger',
          techStack: [
            { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg' },
            { name: '.NET Core', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
            { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg' },
            { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
            { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' }
          ]
        },
        {
          title: 'Air Asia ID90',
          subtitle: 'Allstars Portal & Refund System',
          bannerImage: '/assets/img/aa1.jpg',
          detailsLink: '/projects/airasia-id90',
          techStack: [
            { name: '.NET Core', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
            { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg' },
            { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg' },
            { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
            { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' }
          ]
        },
        {
          title: 'BAT Inhouse App',
          subtitle: 'British American Tobacco Management',
          bannerImage: '/assets/img/bat1.jpg',
          detailsLink: '/projects/bat-inhouse-app',
          techStack: [
            { name: '.NET Core', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
            { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg' },
            { name: 'jQuery', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg' },
            { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' }
          ]
        },
        {
          title: 'PJ Smart City',
          subtitle: 'Petaling Jaya Smart City Platform',
          bannerImage: '/assets/img/pj1.jpg',
          detailsLink: '/projects/pj-smart-city',
          techStack: [
            { name: '.NET Core', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
            { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg' },
            { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
            { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg' }
          ]
        },
        {
          title: 'Gamified Employee Management',
          subtitle: 'Syntronic Employee Engagement Platform',
          bannerImage: '/assets/img/sf1.jpg',
          detailsLink: '/projects/gamified-employee-management',
          techStack: [
            { name: '.NET Core', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
            { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg' },
            { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg' },
            { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' }
          ]
        },
        {
          title: 'Valet Parking',
          subtitle: 'Secure Parking UAE Management System',
          bannerImage: '/assets/img/vp1.jpg',
          detailsLink: '/projects/valet-parking',
          techStack: [
            { name: '.NET Core', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
            { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg' },
            { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
            { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' }
          ]
        },
        {
          title: 'Mobile Games Collection',
          subtitle: 'Geniteam Java & AndEngine Games',
          bannerImage: '/assets/img/gd1.jpg',
          detailsLink: '/projects/mobile-games',
          techStack: [
            { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
            { name: 'Android', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' }
          ]
        },
        {
          title: 'UK Property Management Platform',
          subtitle: 'Azure-Based Residential Property Management System',
          bannerImage: '/assets/img/gpc1.jpg',
          detailsLink: '/projects/uk-property-management',
          techStack: [
            { name: '.NET Core', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
            { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg' },
            { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
            { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg' }
          ]
        },
        {
          title: 'G5 POS',
          subtitle: 'Squad Cell Point of Sale System',
          bannerImage: '/assets/img/g51.jpg',
          detailsLink: '/projects/g5-pos',
          techStack: [
            { name: '.NET Core', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
            { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg' },
            { name: 'jQuery', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg' }
          ]
        },
        {
          title: 'Confidential Insurance Clients',
          subtitle: 'Enterprise Insurance Management Platform',
          bannerImage: '/assets/img/in1.jpg',
          detailsLink: '/projects/chubb-insurance-applications',
          techStack: [
            { name: '.NET Core', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
            { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg' },
            { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
            { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg' }
          ]
        }
      ]
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

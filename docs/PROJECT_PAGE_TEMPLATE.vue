<!-- 
  PROJECT PAGE STARTER TEMPLATE / BOILERPLATE
  ============================================
  
  This is a STARTER FILE showing how to structure a new project page.
  It uses the existing ProjectPageTemplate component (in src/components/common/ProjectPageTemplate.vue)
  which is already used by all project pages (AirAsia, G5POS, SmartCity, etc.)
  
  INSTRUCTIONS:
  1. Copy this file to src/views/projects/YourProjectPage.vue
  2. Replace "YourProject" with your actual project name throughout
  3. Populate all the data sections with your project information
  4. Follow PROJECT_PAGE_IMPLEMENTATION_GUIDE.md for detailed instructions
  
  NOTE: This is NOT a replacement for ProjectPageTemplate component.
  It's a boilerplate showing HOW TO USE ProjectPageTemplate with proper structure.
-->

<template>
  <!-- Using the existing ProjectPageTemplate component from src/components/common/ -->
  <ProjectPageTemplate projectTitle="Your Project Title">
    
    <!-- Hero Card -->
    <template #hero>
      <ProjectHeroCard
        :title="projectData.title"
        :description="projectData.description"
        :tags="projectData.tags"
        :achievements-col1="projectData.achievementsCol1"
        :achievements-col2="projectData.achievementsCol2"
      />
    </template>

    <!-- Gallery -->
    <template #gallery>
      <ProjectGallery :images="galleryData" />
    </template>

    <!-- Project Overview -->
    <template #overview>
      <ProjectOverview :overview-data="projectOverviewData" />
    </template>

    <!-- Technology Stack -->
    <template #technology>
      <TechnologyStack
        title="Technology Stack"
        :technologies="technologies"
        :columns-per-row="2"
      />
    </template>

    <!-- Project Information -->
    <template #info>
      <ProjectInfo :info-items="projectInfoData" />
    </template>

    <!-- Architecture Diagram -->
    <template #architecture-diagram>
      <DiagramViewer
        title="C4 Architecture Diagram"
        :icon-name="PROJECT_ICON_NAMES.ARCHITECTURE_OVERVIEW"
        diagram-src="/assets/diagrams/YourProject_C4_Diagram.svg"
        :narration-steps="narrationSteps"
        :svg-width="17181"
        :svg-height="6890"
        :show-narration="false"
      />
    </template>

    <!-- Architecture Overview -->
    <template #architecture-overview>
      <ArchitectureOverview
        :architecture-layers="architectureLayers"
        :benefits-description="architectureBenefits"
      />
    </template>

    <!-- Engineering Challenges -->
    <template #challenges>
      <EngineeringChallenges :challenges="engineeringChallenges" />
    </template>

    <!-- Performance Metrics -->
    <template #performance>
      <PerformanceMetricsSection
        :stats="performanceStats"
        :charts="performanceCharts"
      />
    </template>

    <!-- Metrics Framework -->
    <template #metrics-framework>
      <MetricsFramework
        title="Metrics & Measurement Framework"
        :framework-data="metricsFrameworkData"
      />
    </template>

    <!-- ROI Section -->
    <template #roi>
      <ROISection
        :left-items="roiLeftItems"
        :right-items="roiRightItems"
        :metrics="roiMetrics"
      />
    </template>

  </ProjectPageTemplate>
</template>

<script>
import { ref } from 'vue'
import { PROJECT_ICON_NAMES, TECH_CATEGORIES } from '@/config/constants.js'

// Import components
import ProjectPageTemplate from '@/components/common/ProjectPageTemplate.vue'
import ProjectHeroCard from '@/components/projects/ProjectHeroCard.vue'
import ProjectGallery from '@/components/projects/ProjectGallery.vue'
import ProjectOverview from '@/components/projects/ProjectOverview.vue'
import TechnologyStack from '@/components/projects/TechnologyStack.vue'
import ProjectInfo from '@/components/projects/ProjectInfo.vue'
import DiagramViewer from '@/components/projects/DiagramViewer.vue'
import ArchitectureOverview from '@/components/projects/ArchitectureOverview.vue'
import EngineeringChallenges from '@/components/projects/EngineeringChallenges.vue'
import PerformanceMetricsSection from '@/components/projects/PerformanceMetricsSection.vue'
import MetricsFramework from '@/components/projects/MetricsFramework.vue'
import ROISection from '@/components/projects/ROISection.vue'

export default {
  name: 'YourProjectPage',
  components: {
    ProjectPageTemplate,
    ProjectHeroCard,
    ProjectGallery,
    ProjectOverview,
    TechnologyStack,
    ProjectInfo,
    DiagramViewer,
    ArchitectureOverview,
    EngineeringChallenges,
    PerformanceMetricsSection,
    MetricsFramework,
    ROISection
  },
  setup() {
    // Project Hero Data
    const projectData = ref({
      title: 'Your Project Title',
      description: 'Project description...',
      tags: [
        { value: 'Tag1', label: 'Tag 1', color: 'purple' },
        { value: 'Tag2', label: 'Tag 2', color: 'blue' }
      ],
      achievementsCol1: [
        { emoji: 'performance', label: 'Metric 1', value: 'Value 1' },
        { emoji: 'uptime', label: 'Metric 2', value: 'Value 2' }
      ],
      achievementsCol2: [
        { emoji: 'scalability', label: 'Metric 3', value: 'Value 3' },
        { emoji: 'enterprise', label: 'Metric 4', value: 'Value 4' }
      ]
    })

    // Gallery Data
    const galleryData = ref([
      {
        src: '/assets/img/projects/your-project/image1.jpg',
        alt: 'Image 1',
        caption: 'Caption 1'
      }
      // Add more images
    ])

    // Project Overview Data
    const projectOverviewData = ref({
      description: 'Detailed project description...',
      challenge: 'Challenge description...',
      solution: 'Solution description...',
      keyFeatures: [
        {
          icon: 'feature-icon',
          title: 'Feature 1',
          description: 'Feature description...'
        }
        // Add more features
      ],
      technicalArchitecture: 'Architecture description...',
      businessImpact: 'Business impact description...'
    })

    // Technologies
    // IMPORTANT: Use existing icon mappings from iconResolver.js
    // Check PROJECT_PAGE_IMPLEMENTATION_GUIDE.md for icon mapping strategy
    const technologies = ref([
      {
        name: "Technology Name",  // Will auto-resolve icon from name
        description: "Technology description",
        category: TECH_CATEGORIES.BACKEND  // Use appropriate category
      }
      // Add more technologies
    ])

    // Architecture Layers
    // IMPORTANT: Use simple icon names for architecture layer icons
    // Examples: 'api', 'database', 'security', 'monitoring', 'performance'
    const architectureLayers = ref([
      {
        icon: 'ecommerce',  // Use existing icon name
        title: 'Layer Title',
        description: 'Layer description...',
        features: [
          {
            icon: 'api',  // Use simple icon name
            name: 'Feature Name',
            description: 'Feature description...'
          }
          // Add more features
        ]
      }
      // Add more layers
    ])

    const architectureBenefits = ref("Architecture benefits description...")

    // Engineering Challenges
    const engineeringChallenges = ref([
      {
        title: 'Challenge Title',
        problem: 'Problem description...',
        solutions: [
          {
            icon: 'performance',  // Use existing icon name
            name: 'Solution Name',
            description: 'Solution description...'
          }
          // Add more solutions
        ]
      }
      // Add more challenges
    ])

    // Performance Stats
    // Use valid color names: green, purple, pink, blue, orange, teal, indigo, red, yellow, cyan
    const performanceStats = ref([
      {
        value: '98%',
        label: 'Metric Label',
        color: 'green'  // Valid color name
      }
      // Add more stats (4-8 total)
    ])

    // Performance Charts
    // IMPORTANT: Each chart MUST have unique ID
    // See PROJECT_PAGE_IMPLEMENTATION_GUIDE.md for chart structure
    const performanceCharts = ref([
      {
        id: 'yourProjectChart1',  // UNIQUE ID REQUIRED
        type: 'doughnut',  // doughnut, bar, line, polarArea
        title: 'Chart Title',
        icon: 'performance',  // Use existing icon name
        width: 'half',  // 'half' or 'full'
        data: {
          labels: ['Label 1', 'Label 2'],
          datasets: [{
            data: [50, 50],
            backgroundColor: ['#FFD700', '#4ECDC4'],
            borderWidth: 3,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,  // MUST be false
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 15,
                usePointStyle: true,
                font: { size: 12, weight: '500' },
                color: '#374151'
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(139, 92, 246, 0.5)',
              padding: 12
            }
          },
          animation: {
            duration: 1500,
            easing: 'easeInOutQuart'
          }
          // Add chart-specific options (cutout for doughnut, scales for bar/line, etc.)
        }
      }
      // Add more charts (4-9 total)
    ])

    // Metrics Framework
    const metricsFrameworkData = ref({
      introduction: 'Framework introduction...',
      categories: [
        {
          name: 'Category Name',
          icon: 'performance',  // Use existing icon name
          items: [
            {
              name: 'Metric Name',
              description: 'Metric description...'
            }
            // Add more items
          ]
        }
        // Add more categories
      ]
    })

    // ROI Section
    const roiLeftItems = ref([
      {
        icon: 'financial',
        title: 'Financial Impact',
        value: '$Value',
        description: 'Description...'
      }
      // Add more items
    ])

    const roiRightItems = ref([
      {
        icon: 'operational',
        title: 'Operational Impact',
        value: 'Value',
        description: 'Description...'
      }
      // Add more items
    ])

    const roiMetrics = ref([
      {
        label: 'Metric Label',
        value: 'Value',
        change: '+X%',
        trend: 'up'  // 'up' or 'down'
      }
      // Add more metrics
    ])

    // Diagram Narration Steps (if using narration)
    const narrationSteps = ref([
      {
        icon: 'architecture',
        title: 'Step Title',
        description: 'Step description...',
        highlights: []  // SVG element IDs to highlight
      }
      // Add more steps
    ])

    // Project Info
    const projectInfoData = ref({
      category: 'Category',
      client: 'Client Name',
      date: 'Date',
      url: 'https://example.com',
      companySize: 'Company Size'
    })

    return {
      PROJECT_ICON_NAMES,
      projectData,
      galleryData,
      projectOverviewData,
      technologies,
      architectureLayers,
      architectureBenefits,
      engineeringChallenges,
      performanceStats,
      performanceCharts,
      metricsFrameworkData,
      roiLeftItems,
      roiRightItems,
      roiMetrics,
      narrationSteps,
      projectInfoData
    }
  }
}
</script>

<style scoped>
/* Add custom styles if needed */
/* Most styling is handled by component styles */
</style>

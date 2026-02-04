<!--
  PROJECT PAGE STARTER / BOILERPLATE
  ==================================
  Copy this file to YourProjectPage.vue in this folder and rename.
  Uses ProjectPageTemplate from src/components/common/ProjectPageTemplate.vue.
  See docs/PROJECT_PAGE_CREATION_GUIDE.md for full instructions.
  This file is not a route — it is a reference to copy from.
-->

<template>
  <ProjectPageTemplate projectTitle="Your Project Title">
    <template #hero>
      <ProjectHeroCard
        :title="projectData.title"
        :description="projectData.description"
        :tags="projectData.tags"
        :achievements-col1="projectData.achievementsCol1"
        :achievements-col2="projectData.achievementsCol2"
      />
    </template>
    <template #gallery>
      <ProjectGallery :images="galleryData" />
    </template>
    <template #overview>
      <ProjectOverview :overview-data="projectOverviewData" />
    </template>
    <template #technology>
      <TechnologyStack
        title="Technology Stack"
        :technologies="technologies"
        :columns-per-row="2"
      />
    </template>
    <template #info>
      <ProjectInfo :info-items="projectInfoData" />
    </template>
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
    <template #architecture-overview>
      <ArchitectureOverview
        :architecture-layers="architectureLayers"
        :benefits-description="architectureBenefits"
      />
    </template>
    <template #challenges>
      <EngineeringChallenges :challenges="engineeringChallenges" />
    </template>
    <template #performance>
      <PerformanceMetricsSection
        :stats="performanceStats"
        :charts="performanceCharts"
      />
    </template>
    <template #metrics-framework>
      <MetricsFramework
        title="Metrics & Measurement Framework"
        :framework-data="metricsFrameworkData"
      />
    </template>
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
  name: 'ProjectPageStarter',
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
    const galleryData = ref([
      { src: '/assets/img/projects/your-project/image1.jpg', alt: 'Image 1', caption: 'Caption 1' }
    ])
    const projectOverviewData = ref({
      description: 'Detailed project description...',
      challenge: 'Challenge description...',
      solution: 'Solution description...',
      keyFeatures: [{ icon: 'feature-icon', title: 'Feature 1', description: 'Feature description...' }],
      technicalArchitecture: 'Architecture description...',
      businessImpact: 'Business impact description...'
    })
    const technologies = ref([
      { name: 'Technology Name', description: 'Technology description', category: TECH_CATEGORIES.BACKEND }
    ])
    const architectureLayers = ref([
      {
        icon: 'ecommerce',
        title: 'Layer Title',
        description: 'Layer description...',
        features: [{ icon: 'api', name: 'Feature Name', description: 'Feature description...' }]
      }
    ])
    const architectureBenefits = ref('Architecture benefits description...')
    const engineeringChallenges = ref([
      {
        title: 'Challenge Title',
        problem: 'Problem description...',
        solutions: [{ icon: 'performance', name: 'Solution Name', description: 'Solution description...' }]
      }
    ])
    const performanceStats = ref([
      { value: '98%', label: 'Metric Label', color: 'green' }
    ])
    const performanceCharts = ref([
      {
        id: 'yourProjectChart1',
        type: 'doughnut',
        title: 'Chart Title',
        icon: 'performance',
        width: 'half',
        data: {
          labels: ['Label 1', 'Label 2'],
          datasets: [{ data: [50, 50], backgroundColor: ['#FFD700', '#4ECDC4'], borderWidth: 3, borderColor: '#ffffff' }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { padding: 15, usePointStyle: true, font: { size: 12, weight: '500' }, color: '#374151' } },
            tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.85)', titleColor: '#ffffff', bodyColor: '#ffffff', borderColor: 'rgba(139, 92, 246, 0.5)', padding: 12 }
          },
          animation: { duration: 1500, easing: 'easeInOutQuart' }
        }
      }
    ])
    const metricsFrameworkData = ref({
      introduction: 'Framework introduction...',
      categories: [{ name: 'Category Name', icon: 'performance', items: [{ name: 'Metric Name', description: 'Metric description...' }] }]
    })
    const roiLeftItems = ref([{ icon: 'financial', title: 'Financial Impact', value: '$Value', description: 'Description...' }])
    const roiRightItems = ref([{ icon: 'operational', title: 'Operational Impact', value: 'Value', description: 'Description...' }])
    const roiMetrics = ref([{ label: 'Metric Label', value: 'Value', change: '+X%', trend: 'up' }])
    const narrationSteps = ref([{ icon: 'architecture', title: 'Step Title', description: 'Step description...', highlights: [] }])
    const projectInfoData = ref({ category: 'Category', client: 'Client Name', date: 'Date', url: 'https://example.com', companySize: 'Company Size' })
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
</style>

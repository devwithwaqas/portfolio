<!-- 
  Mobile Games Collection Project Page
  ============================================
  
  This page follows the same structure as other project pages.
  Use PROJECT_PAGE_IMPLEMENTATION_GUIDE.md for detailed instructions.
-->

<template>
  <ProjectPageTemplate projectTitle="Mobile Games Collection">
    
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

    <!-- Gallery Slot -->
    <template #gallery>
      <ProjectGallery 
        :title="galleryData.title"
        :projectName="galleryData.projectName"
        :images="galleryData.images"
      />
    </template>
    
    <!-- Main Content Top -->
    <template #main-content-top>
      <ProjectOverview 
        title="Project Overview"
        :icon-name="PROJECT_ICON_NAMES.PROJECT_OVERVIEW"
        :content="projectOverviewData.description"
      />
      
      <TechnologyStack 
        title="Technology Stack"
        :icon-name="PROJECT_ICON_NAMES.TECHNOLOGY_STACK"
        :technologies="technologies" 
      />
    </template>
    
    <!-- Sidebar -->
    <template #sidebar>
      <ProjectInfo 
        title="Project Information"
        :icon-name="PROJECT_ICON_NAMES.PROJECT_INFORMATION"
        :category="PROJECT_CATEGORIES.MOBILE_APPLICATIONS"
        client="Geniteam"
        projectDate="2015 - 2017"
        projectUrl=""
        companySize="Startup"
      />
    </template>
    
    <!-- Main Content Bottom -->
    <template #main-content-bottom>
      
      <!-- C4 Architecture Diagram -->
      <DiagramViewer 
        title="C4 Architecture Diagram"
        :icon-name="PROJECT_ICON_NAMES.ARCHITECTURE_OVERVIEW"
        :diagram-src="$assetPath('/assets/diagrams/MobileGames_C4_Diagram.svg')"
        :narration-steps="mobileGamesNarrationSteps"
        :svg-width="8637"
        :svg-height="6659"
        :show-narration="false"
      />

      <!-- Architecture Overview -->
      <ArchitectureOverview 
        title="Architecture Overview"
        :icon-name="PROJECT_ICON_NAMES.ARCHITECTURE_OVERVIEW"
        :architectureLayers="architectureLayers"
        :benefitsDescription="architectureBenefits"
      />

      <!-- Engineering Challenges -->
      <EngineeringChallenges 
        title="Engineering Challenges"
        :icon-name="PROJECT_ICON_NAMES.ENGINEERING_CHALLENGES"
        :challenges="engineeringChallenges"
        :business-impact="businessImpactResults"
      />

      <!-- Performance Metrics Section -->
      <PerformanceMetricsSection 
        title="Performance Metrics & Analytics"
        :icon-name="PROJECT_ICON_NAMES.PERFORMANCE_METRICS"
        :stats="performanceStats"
        :charts="performanceCharts"
      />

      <!-- Metrics Framework -->
      <MetricsFramework 
        title="Metrics & Measurement Framework"
        :introduction="metricsFrameworkData.introduction"
        :metricsCategories="metricsFrameworkData.metricsCategories"
        :frameworkItems="metricsFrameworkData.frameworkItems"
      />
      
      <!-- ROI Section -->
      <ROISection 
        mainTitle="Mobile Games Collection Business Impact & Growth Metrics"
        :mainIcon="ROI_ICON_NAMES.MAIN_ICON"
        leftTitle="Financial Growth Impact"
        :leftIcon="ROI_ICON_NAMES.FINANCIAL_ICON"
        rightTitle="Operational Growth Impact"
        :rightIcon="ROI_ICON_NAMES.OPERATIONAL_ICON"
        metricsTitle="Mobile Games Growth Success Metrics"
        :metricsIcon="ROI_ICON_NAMES.SUCCESS_ICON"
        :leftItems="roiLeftItems"
        :rightItems="roiRightItems"
        :metrics="roiMetrics"
      />
      
    </template>
    
    <!-- Additional Content Slot (Full Width) -->
    <template #additional-content>
      <!-- Related Services -->
      <RelatedServices
        :services="relatedServices"
        introduction="This project utilized the following services I offer:"
      />
    </template>

  </ProjectPageTemplate>
</template>

<script>
import { ref } from 'vue'
import ProjectPageTemplate from '@/components/common/ProjectPageTemplate.vue'
import ProjectHeroCard from '@/components/projects/ProjectHeroCard.vue'
import ProjectGallery from '@/components/projects/ProjectGallery.vue'
import ProjectOverview from '@/components/projects/ProjectOverview.vue'
import TechnologyStack from '@/components/projects/TechnologyStack.vue'
import ProjectInfo from '@/components/projects/ProjectInfo.vue'
import ArchitectureOverview from '@/components/projects/ArchitectureOverview.vue'
import DiagramViewer from '@/components/projects/DiagramViewer.vue'
import EngineeringChallenges from '@/components/projects/EngineeringChallenges.vue'
import PerformanceMetricsSection from '@/components/projects/PerformanceMetricsSection.vue'
import MetricsFramework from '@/components/projects/MetricsFramework.vue'
import ROISection from '@/components/projects/ROISection.vue'
import RelatedServices from '@/components/common/RelatedServices.vue'
import { assetPath } from '@/utils/assetPath.js'

// Import constants
import { 
  PROJECT_ICON_NAMES, 
  PROJECT_CATEGORIES, 
  TECH_CATEGORIES,
  ROI_ICON_NAMES 
} from '@/config/constants.js'

export default {
  name: 'MobileGamesPage',
  components: {
    ProjectPageTemplate,
    ProjectHeroCard,
    ProjectGallery,
    ProjectOverview,
    TechnologyStack,
    ProjectInfo,
    ArchitectureOverview,
    DiagramViewer,
    EngineeringChallenges,
    PerformanceMetricsSection,
    MetricsFramework,
    ROISection,
    RelatedServices
  },
  setup() {
    // Mobile Games Collection Project Data
    // TODO: Update with actual content from c:\inetpub\portfolio
    const projectData = ref({
      title: 'Mobile Games Collection - Geniteam Game Development Portfolio',
      description: 'Comprehensive mobile game development portfolio developed during tenure at Geniteam, featuring multiple successful arcade and action games for Android platforms. This collection showcases expertise in Java development with AndEngine framework, backend services for RPG games including the famous Mafia Wars, and successful app store optimization strategies..',
      tags: [
        'Mobile Games',
        'Android',
        'Java',
        'AndEngine',
        'Game Development'
      ],
      achievementsCol1: [
        { emoji: 'mobile', label: 'Total Downloads', value: '500K+' },
        { emoji: 'performance', label: 'User Rating', value: '4.2+ stars' }
      ],
      achievementsCol2: [
        { emoji: 'success', label: 'Games Published', value: '5+ games' },
        { emoji: 'enterprise', label: 'Platform', value: 'Android' }
      ]
    })

    // Gallery Data
    const galleryData = ref({
      title: "Mobile Games Collection Gallery",
      projectName: "Mobile Games Collection",
      images: [
        assetPath("/assets/img/gd1.jpg"),
        assetPath("/assets/img/gd2.jpg"),
        assetPath("/assets/img/gd3.jpg"),
        assetPath("/assets/img/gd4.jpg")
      ]
    })

    // Project Overview Data
    const projectOverviewData = ref({
      description: `Mobile Games Collection - Geniteam Game Development Portfolio

The Challenge:
Game development requires efficient rendering, smooth animations, physics simulation, and optimal performance on mobile devices with limited resources. Developers need game engines that provide powerful graphics capabilities, physics engines, and efficient resource management while maintaining high frame rates and engaging gameplay.

The Solution:
The Mobile Games Collection leverages Java programming language and AndEngine game framework to create engaging mobile games for Android platform. AndEngine provides powerful 2D graphics rendering, physics engine integration, sprite management, and scene management capabilities enabling efficient game development with smooth performance. The portfolio includes multiple arcade and action games, plus backend services development for RPG games including the globally successful Mafia Wars.

Key Features:
• AndEngine Framework: 2D game development with OpenGL ES
• Arcade Game Mechanics: Fast-paced action and engaging gameplay
• Backend Services: Database services for RPG games including Mafia Wars
• Monetization Strategy: In-app purchases and ad integration
• Social Integration: Leaderboards, achievements, and sharing
• Performance Optimization: Smooth 60fps gameplay on Android
• Analytics & Tracking: User behavior and performance metrics
• Regular Updates: Content updates and bug fixes

Technical Architecture:
Built with Java programming language and AndEngine game framework, the games feature efficient rendering pipelines, physics simulation, sprite management, and resource optimization. The framework provides scene management, entity systems, and comprehensive game development tools. Backend services include Java servlets, MySQL database, and RESTful APIs for RPG games including Mafia Wars.

Business Impact:
The Mobile Games Collection has successfully established a presence in the competitive mobile gaming market using the AndEngine framework. The portfolio demonstrates expertise in Java-based game development, backend services for RPG games including the globally successful Mafia Wars, resulting in positive user feedback, strong download numbers, and sustainable revenue generation.`
    })

    // Technologies
    const technologies = ref([
      { name: "Java", description: "Java for mobile game development", category: TECH_CATEGORIES.BACKEND },
      { name: "AndEngine", description: "AndEngine Framework (Nicholas Gramlich) for mobile game development", category: TECH_CATEGORIES.FRONTEND },
      { name: "Android SDK", description: "Android SDK & NDK for mobile game deployment", category: TECH_CATEGORIES.MOBILE },
      { name: "OpenGL ES", description: "OpenGL ES for Graphics for mobile game development", category: TECH_CATEGORIES.FRONTEND },
      { name: "Box2D Physics", description: "Box2D Physics Engine for mobile game development", category: TECH_CATEGORIES.FRONTEND },
      { name: "Android Canvas", description: "Android Canvas & SurfaceView for mobile game development", category: TECH_CATEGORIES.MOBILE },
      { name: "2D Sprite Animation", description: "2D Sprite Animation for mobile game development", category: TECH_CATEGORIES.FRONTEND },
      { name: "Sound & Audio Management", description: "Sound & Audio Management for mobile game development", category: TECH_CATEGORIES.FRONTEND },
      { name: "Java Servlets", description: "Java Servlets & JSP for mobile game development", category: TECH_CATEGORIES.BACKEND },
      { name: "MySQL", description: "MySQL Database for mobile game development", category: TECH_CATEGORIES.DATABASE },
      { name: "RESTful Web Services", description: "RESTful Web Services for mobile game development", category: TECH_CATEGORIES.BACKEND },
      { name: "JSON Data Exchange", description: "JSON Data Exchange for mobile game development", category: TECH_CATEGORIES.BACKEND },
      { name: "Google Play Console", description: "Google Play Console for mobile game development", category: TECH_CATEGORIES.MOBILE },
      { name: "AdMob Integration", description: "AdMob Integration for mobile game development", category: TECH_CATEGORIES.MOBILE },
      { name: "Push Notifications", description: "Push Notifications for mobile game development", category: TECH_CATEGORIES.MOBILE },
      { name: "Analytics & Crash Reporting", description: "Analytics & Crash Reporting for mobile game development", category: TECH_CATEGORIES.BACKEND }
    ])

    // Architecture Layers
    const architectureLayers = ref([
      {
        icon: 'mobile',
        title: 'Android Game Applications',
        description: 'Native Android games built with Java and AndEngine framework featuring efficient 2D graphics rendering, physics simulation, sprite management, and engaging gameplay mechanics. Includes multiple game titles: Dead Run: Brave, Brave Temple Gorilla, Mega Running, Miss Jump, and Marine Defender.',
        features: [
          {
            icon: 'java',
            name: 'Java Game Development',
            description: 'Primary programming language for Android game development providing object-oriented design, performance optimization, and comprehensive game logic implementation. Features efficient memory management, multi-threading, and platform-specific optimizations for smooth gameplay.'
          },
          {
            icon: 'android',
            name: 'AndEngine Framework',
            description: '2D game engine framework created by Nicholas Gramlich providing OpenGL ES acceleration, sprite rendering, scene management, and physics integration. Features efficient rendering pipelines, texture management, and comprehensive game development tools for Android platform.'
          },
          {
            icon: 'performance',
            name: 'Box2D Physics Engine',
            description: 'Physics engine integration for realistic game mechanics including collision detection, gravity simulation, and dynamic object interactions. Features efficient physics calculations, joint systems, and comprehensive physics simulation for engaging gameplay.'
          },
          {
            icon: 'graphics',
            name: 'OpenGL ES Graphics',
            description: 'Hardware-accelerated 2D graphics rendering using OpenGL ES for efficient sprite rendering, animations, and visual effects. Features texture batching, efficient draw calls, and optimal GPU utilization for smooth 60fps gameplay.'
          }
        ]
      },
      {
        icon: 'api',
        title: 'Backend Services & Game Services',
        description: 'Java-based backend services for RPG games including Mafia Wars, providing database management, game state persistence, and multiplayer features.',
        features: [
          {
            icon: 'api',
            name: 'Java Servlets & JSP',
            description: 'Server-side Java components handling game data requests, player state management, and game service operations. Features efficient request processing, session management, and comprehensive game logic for RPG games including Mafia Wars.'
          },
          {
            icon: 'database',
            name: 'MySQL Database',
            description: 'Relational database storing player data, game state, progression records, and game economy information. Features efficient data modeling, query optimization, and comprehensive data persistence for RPG games and player management.'
          },
          {
            icon: 'api',
            name: 'RESTful Web Services',
            description: 'JSON-based REST APIs for game-client communication, player data synchronization, and multiplayer features. Features efficient data exchange, error handling, and comprehensive API design for game services.'
          }
        ]
      }
    ])

    const architectureBenefits = ref("The Mobile Games Collection architecture demonstrates efficient game development using Java and AndEngine framework. The games feature smooth 60fps performance, engaging gameplay mechanics, and professional game development practices. AndEngine provides powerful 2D graphics capabilities with OpenGL ES acceleration, efficient sprite rendering, and physics integration. The backend services support RPG games including the globally successful Mafia Wars with robust database management and multiplayer features. This architecture showcases mobile game development expertise, performance optimization skills, and successful game monetization strategies.")

    // Engineering Challenges
    const engineeringChallenges = ref([
      {
        icon: 'performance',
        title: 'Game Performance Optimization & 60fps Achievement',
        problem: 'Achieving consistent 60fps gameplay on Android devices with varying hardware capabilities while maintaining smooth animations, physics simulation, and engaging visuals. Required efficient rendering, memory management, and resource optimization for optimal game performance.',
        solutions: [
          {
            icon: 'performance',
            name: 'AndEngine Optimization',
            description: 'Optimized AndEngine framework usage with efficient sprite batching, texture management, and rendering pipelines. Features draw call optimization, texture atlasing, and efficient resource loading ensuring smooth 60fps gameplay across Android devices.'
          },
          {
            icon: 'graphics',
            name: 'OpenGL ES Optimization',
            description: 'Hardware-accelerated graphics rendering using OpenGL ES with efficient vertex buffers, texture compression, and optimal GPU utilization. Features efficient rendering pipelines and graphics optimization for smooth frame rates.'
          }
        ]
      },
      {
        icon: 'database',
        title: 'Backend Services for RPG Games (Mafia Wars)',
        problem: 'Developing scalable backend services for globally successful RPG games like Mafia Wars, handling millions of players, complex game state management, and real-time multiplayer features. Required efficient database design, API optimization, and high-performance game services.',
        solutions: [
          {
            icon: 'database',
            name: 'MySQL Database Design',
            description: 'Efficient database schema design for player data, game state, progression tracking, and game economy. Features optimized queries, indexing strategies, and comprehensive data modeling for RPG game services supporting millions of players.'
          },
          {
            icon: 'api',
            name: 'RESTful API Optimization',
            description: 'Optimized RESTful web services with efficient JSON data exchange, request handling, and response optimization. Features API caching, efficient serialization, and comprehensive error handling for high-performance game services.'
          }
        ]
      }
    ])

    // Business Impact Results
    const businessImpactResults = ref("These engineering solutions delivered successful results: 500,000+ total downloads across all games, average 4.2+ star ratings on Google Play Store, successful monetization strategies generating sustainable revenue, backend services supporting globally successful Mafia Wars RPG game, high user engagement with strong retention rates, and regular content updates maintaining active player base. The AndEngine framework optimization enabled smooth 60fps gameplay across Android devices. Backend services efficiently supported millions of players in RPG games including Mafia Wars. The portfolio successfully established presence in competitive mobile gaming market demonstrating game development expertise and business acumen.")

    // Performance Stats
    const performanceStats = ref([
      {
        value: '500K+',
        label: 'Total Downloads',
        color: 'green'
      },
      {
        value: '4.2+',
        label: 'User Rating',
        color: 'blue'
      },
      {
        value: '5+',
        label: 'Games Published',
        color: 'purple'
      },
      {
        value: '60fps',
        label: 'Frame Rate',
        color: 'teal'
      }
    ])

    // Performance Charts
    const performanceCharts = ref([
      {
        id: 'mobileGamesPerformanceChart',
        type: 'doughnut',
        title: 'Game Performance Distribution',
        icon: 'performance',
        width: 'half',
        data: {
          labels: ['Rendering', 'Physics', 'Audio', 'Networking', 'Game Logic', 'UI'],
          datasets: [{
            data: [28, 22, 12, 15, 18, 5],
            backgroundColor: ['#FFD700', '#4ECDC4', '#45B7D1', '#FF6B9D', '#8B5CF6', '#22C55E'],
            borderWidth: 3,
            borderColor: '#ffffff',
            hoverOffset: 15
          }]
        },
        options: {
          interaction: { mode: 'point' },
          plugins: {
            legend: {
              position: 'bottom',
              align: 'center',
              labels: {
                padding: 15,
                usePointStyle: true,
                pointStyle: 'circle',
                font: { size: 12, weight: '500' },
                color: '#374151',
                boxWidth: 12,
                boxHeight: 12,
                generateLabels: (chart) => {
                  const data = chart.data
                  return data.labels.map((label, i) => ({
                    text: `${label} (${data.datasets[0].data[i]}%)`,
                    fillStyle: data.datasets[0].backgroundColor[i],
                    strokeStyle: '#ffffff',
                    lineWidth: 2,
                    hidden: false,
                    index: i
                  }))
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              titleFont: { size: 14, weight: 'bold' },
              bodyFont: { size: 12 },
              displayColors: true,
              callbacks: {
                label: (context) => {
                  const label = context.label || ''
                  const value = context.parsed || 0
                  return `${label}: ${value}%`
                }
              }
            }
          },
          maintainAspectRatio: false,
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1500,
            easing: 'easeInOutQuart'
          }
        }
      },
      {
        id: 'mobileGamesDownloadsChart',
        type: 'line',
        title: 'Downloads Growth & Performance Trends',
        icon: 'mobile',
        width: 'half',
        data: {
          labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
          datasets: [{
            label: 'Total Downloads',
            data: [50, 120, 200, 280, 380, 500],
            borderColor: '#4ECDC4',
            backgroundColor: 'rgba(78, 205, 196, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#4ECDC4',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                padding: 15,
                font: { size: 12, weight: '500' },
                color: '#374151'
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              titleFont: { size: 14, weight: 'bold' },
              bodyFont: { size: 12 }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: { size: 11 },
                color: '#6B7280',
                callback: function(value) {
                  return value + 'K'
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: { size: 11 },
                color: '#6B7280'
              }
            }
          },
          animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
          }
        }
      },
      {
        id: 'mobileGamesMetricsChart',
        type: 'bar',
        title: 'Game Performance Metrics',
        icon: 'analytics',
        width: 'full',
        data: {
          labels: ['Frame Rate (fps)', 'User Rating', 'Downloads (K)', 'Games Published', 'Retention Rate (%)', 'Session Time (min)'],
          datasets: [{
            label: 'Performance Metrics',
            data: [60, 4.2, 500, 5, 75, 12],
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(78, 205, 196, 0.8)',
              'rgba(255, 215, 0, 0.8)',
              'rgba(69, 183, 209, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(255, 107, 157, 0.8)'
            ],
            borderColor: [
              '#22C55E',
              '#4ECDC4',
              '#FFD700',
              '#45B7D1',
              '#8B5CF6',
              '#FF6B9D'
            ],
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              titleFont: { size: 14, weight: 'bold' },
              bodyFont: { size: 12 },
              callbacks: {
                label: (context) => {
                  const value = context.parsed.y
                  const label = context.label || ''
                  if (label.includes('Rating')) {
                    return `${label}: ${value}/5.0`
                  } else if (label.includes('Downloads')) {
                    return `${label}: ${value}K+`
                  } else if (label.includes('Rate')) {
                    return `${label}: ${value}%`
                  } else if (label.includes('Time')) {
                    return `${label}: ${value} min`
                  } else if (label.includes('Frame Rate')) {
                    return `${label}: ${value} fps`
                  } else {
                    return `${label}: ${value}`
                  }
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: { size: 11 },
                color: '#6B7280'
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: { size: 11 },
                color: '#6B7280'
              }
            }
          },
          animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
          }
        }
      }
    ])

    // Metrics Framework
    const metricsFrameworkData = ref({
      introduction: 'The Mobile Games Collection employs a comprehensive metrics framework to measure game performance, user engagement, download metrics, and technical quality for mobile game development.',
      metricsCategories: [
        {
          icon: 'performance',
          title: 'Game Performance Metrics',
          metrics: [
            {
              icon: 'performance',
              name: 'Frame Rate (60fps)',
              measurementMethod: 'Real-time frame rate monitoring using AndEngine performance tracking and Android profiling tools. Measures rendering performance, frame consistency, and smooth gameplay across different Android devices and hardware configurations.',
              context: 'Critical for mobile games where consistent 60fps ensures smooth gameplay and engaging user experience. High frame rates prevent lag, stuttering, and provide responsive game controls essential for action and arcade games.',
              validation: 'Achieved through AndEngine optimization, OpenGL ES acceleration, efficient sprite batching, and resource management ensuring smooth 60fps gameplay across Android devices with varying hardware capabilities.'
            },
            {
              icon: 'mobile',
              name: 'Memory Usage Optimization',
              measurementMethod: 'Memory profiling using Android Studio profiler and AndEngine memory management tracking. Monitors heap usage, texture memory, and resource consumption during gameplay to ensure optimal memory efficiency.',
              context: 'Essential for mobile games where limited device memory requires efficient resource management. Optimal memory usage prevents crashes, improves performance, and enables games to run on lower-end devices.',
              validation: 'Implemented through efficient texture management, sprite pooling, resource cleanup, and memory optimization strategies ensuring optimal memory usage across all game titles.'
            }
          ]
        },
        {
          icon: 'mobile',
          title: 'User Engagement & Success Metrics',
          metrics: [
            {
              icon: 'mobile',
              name: 'Total Downloads (500K+)',
              measurementMethod: 'Download tracking using Google Play Console analytics and app store metrics. Monitors total downloads, download trends, and user acquisition across all published games in the collection.',
              context: 'Critical for measuring game portfolio success and market reach. High download numbers indicate successful game development, marketing effectiveness, and user interest in the game collection.',
              validation: 'Achieved through engaging gameplay, successful app store optimization, regular content updates, and positive user reviews resulting in 500,000+ total downloads across all games.'
            },
            {
              icon: 'success',
              name: 'User Rating (4.2+ stars)',
              measurementMethod: 'User rating tracking using Google Play Store ratings and review analysis. Monitors average ratings, rating distribution, and user feedback across all published games.',
              context: 'Essential for measuring user satisfaction and game quality. High ratings indicate successful game design, engaging gameplay, and positive user experience essential for app store visibility and organic growth.',
              validation: 'Achieved through polished game mechanics, smooth performance, engaging gameplay, and regular updates resulting in average 4.2+ star ratings on Google Play Store.'
            },
            {
              icon: 'performance',
              name: 'User Retention Rate (75%)',
              measurementMethod: 'Retention tracking using game analytics and user behavior monitoring. Measures daily active users, retention rates, and session frequency to assess long-term user engagement.',
              context: 'Critical for game success where high retention indicates engaging gameplay and successful game design. Strong retention enables sustainable monetization and long-term game success.',
              validation: 'Implemented through engaging game mechanics, regular content updates, achievement systems, and social features ensuring 75% user retention rate with strong long-term engagement.'
            }
          ]
        },
        {
          icon: 'enterprise',
          title: 'Backend Services & RPG Game Metrics',
          metrics: [
            {
              icon: 'database',
              name: 'Mafia Wars Backend Support',
              measurementMethod: 'Backend service performance tracking for globally successful RPG games including Mafia Wars. Monitors player data management, game state persistence, and service scalability supporting millions of players.',
              context: 'Critical for RPG games where backend services must handle massive player bases, complex game state, and real-time multiplayer features. Efficient backend services enable successful global game operations.',
              validation: 'Achieved through scalable MySQL database design, optimized RESTful APIs, efficient data modeling, and high-performance game services successfully supporting millions of players in globally successful RPG games including Mafia Wars.'
            }
          ]
        }
      ],
      frameworkItems: [
        {
          title: 'Game Performance Monitoring',
          description: 'Continuous monitoring of frame rates, memory usage, and rendering performance using Android profiling tools and AndEngine performance tracking',
          icon: 'monitoring'
        },
        {
          title: 'User Analytics & Engagement',
          description: 'Comprehensive analytics for download trends, user ratings, retention rates, and gameplay metrics using Google Play Console and game analytics',
          icon: 'analytics'
        },
        {
          title: 'Backend Service Monitoring',
          description: 'Real-time monitoring of backend services for RPG games including Mafia Wars, tracking player data management and service performance',
          icon: 'monitoring'
        }
      ]
    })

    // ROI Section

    // ROI Section
        const roiLeftItems = ref([
      { label: "Total Revenue Generated", value: "$TBD" },
      { label: "Download Revenue", value: "$TBD" },
      { label: "In-App Purchase Revenue", value: "$TBD" },
      { label: "Ad Revenue", value: "$TBD" },
      { label: "ROI on Development", value: "TBD" }
    ])

        const roiRightItems = ref([
      { label: "Total Downloads", value: "500K+" },
      { label: "User Rating", value: "4.2+ stars" },
      { label: "Games Published", value: "5+ games" },
      { label: "Frame Rate", value: "60fps" },
      { label: "Retention Rate", value: "75%" }
    ])

        const roiMetrics = ref([
      { value: "500K+", label: "Total Downloads", color: "green" },
      { value: "4.2+", label: "User Rating", color: "blue" },
      { value: "5+", label: "Games Published", color: "purple" },
      { value: "60fps", label: "Frame Rate", color: "pink" },
      { value: "75%", label: "Retention Rate", color: "cyan" },
      { value: "Android", label: "Platform", color: "teal" }
    ])

    // Diagram Narration Steps (placeholder - add when diagram is created)
    const mobileGamesNarrationSteps = ref([])

    // Related Services
    const relatedServices = ref([
      {
        title: 'Mobile Development',
        description: 'Cross-platform mobile application development for iOS and Android platforms',
        path: '/services/mobile-development',
        icon: 'bi bi-phone'
      }
    ])

    return {
      // Data
      projectData,
      galleryData,
      projectOverviewData,
      technologies,
      mobileGamesNarrationSteps,
      architectureLayers,
      architectureBenefits,
      engineeringChallenges,
      businessImpactResults,
      performanceStats,
      performanceCharts,
      metricsFrameworkData,
      roiLeftItems,
      roiRightItems,
      roiMetrics,
      relatedServices,
      
      // Constants
      PROJECT_ICON_NAMES,
      PROJECT_CATEGORIES,
      TECH_CATEGORIES,
      ROI_ICON_NAMES
    }
  }
}
</script>

<style scoped>
/* Add custom styles if needed */
/* Most styling is handled by component styles */
</style>

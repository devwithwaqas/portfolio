<!-- 
  UK Property Management Platform Project Page
  ============================================
  
  This page follows the same structure as other project pages.
  Use PROJECT_PAGE_IMPLEMENTATION_GUIDE.md for detailed instructions.
-->

<template>
  <ProjectPageTemplate projectTitle="UK Property Management Platform">
    
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
        :category="PROJECT_CATEGORIES.ENTERPRISE_APPLICATIONS"
        client="Confidential UK Property Client"
        projectDate="2022 - 2023"
        projectUrl=""
        companySize="Enterprise"
      />
    </template>
    
    <!-- Main Content Bottom -->
    <template #main-content-bottom>
      
      <!-- C4 Architecture Diagram -->
      <DiagramViewer 
        title="C4 Architecture Diagram"
        :icon-name="PROJECT_ICON_NAMES.ARCHITECTURE_OVERVIEW"
        :diagram-src="$assetPath('/assets/diagrams/UKPropertyManagement_C4_Diagram.svg')"
        :narration-steps="ukPropertyManagementNarrationSteps"
        :svg-width="20103"
        :svg-height="9146"
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
        mainTitle="UK Property Management Business Impact & Growth Metrics"
        :mainIcon="ROI_ICON_NAMES.MAIN_ICON"
        leftTitle="Financial Growth Impact"
        :leftIcon="ROI_ICON_NAMES.FINANCIAL_ICON"
        rightTitle="Operational Growth Impact"
        :rightIcon="ROI_ICON_NAMES.OPERATIONAL_ICON"
        metricsTitle="UK Property Management Growth Success Metrics"
        :metricsIcon="ROI_ICON_NAMES.SUCCESS_ICON"
        :leftItems="roiLeftItems"
        :rightItems="roiRightItems"
        :metrics="roiMetrics"
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

// Import constants
import { 
  PROJECT_ICON_NAMES, 
  PROJECT_CATEGORIES, 
  TECH_CATEGORIES,
  ROI_ICON_NAMES 
} from '@/config/constants.js'

export default {
  name: 'UKPropertyManagementPage',
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
    ROISection
  },
  setup() {
    // UK Property Management Project Data
    const projectData = ref({
      title: 'UK Property Management Platform - Azure-Based Residential Property System',
      description: 'Comprehensive Azure-based property management platform developed for the UK\'s largest residential property landlord, managing a portfolio valued at over £3 billion with 9,000+ properties. Built entirely on Microsoft Azure using Functions, Logic Apps, Service Bus, and App Services, this enterprise solution handles complex property management workflows and tenant services..',
      tags: [
        'Property Management',
        'Azure',
        '.NET Core',
        'Angular'
      ],
            achievementsCol1: [
        { emoji: 'enterprise', label: 'Properties Managed', value: '9,000+' },
        { emoji: 'financial', label: 'Portfolio Value', value: '£3B+' }
      ],
            achievementsCol2: [
        { emoji: 'success', label: 'Tenant Satisfaction', value: '80% improvement' },
        { emoji: 'cloud', label: 'System Uptime', value: '99.9%' }
      ]
    })

    // Gallery Data
    const galleryData = ref({
      title: "UK Property Management Gallery",
      projectName: "UK Property Management Platform",
      images: [
        "/assets/img/gpc1.jpg",
        "/assets/img/gpc2.jpg",
        "/assets/img/gpc3.jpg"
      ]
    })

    // Project Overview Data
    const projectOverviewData = ref({
      description: `UK Property Management Platform - Azure-Based Residential Property System

The Challenge:
Property management companies require comprehensive portfolio management, tenant services, maintenance tracking, and financial operations. The platform must handle complex property workflows, maintain regulatory compliance, and provide scalable solutions for managing large property portfolios valued at over £3 billion with 9,000+ properties.

The Solution:
Azure-based property management platform built with .NET Core and Angular, deployed entirely on Microsoft Azure cloud infrastructure. Features comprehensive property management, tenant services, maintenance tracking, and financial operations capabilities. The system leverages Azure Functions for serverless processing, Logic Apps for workflow automation, and Service Bus for event-driven architecture.

Key Features:
• Property Portfolio Management: Comprehensive property tracking and management
• Tenant Portal: Self-service tenant interface and communication
• Maintenance Management: Automated maintenance request processing
• Financial Operations: Rent collection, invoicing, and financial reporting
• Document Management: Digital document storage and processing
• Compliance Monitoring: Regulatory compliance tracking and reporting
• Analytics & Reporting: Real-time portfolio performance insights

Technical Architecture:
Built with .NET Core Web API backend, Angular frontend, Azure SQL Database, and comprehensive Azure cloud services including Azure Functions, Logic Apps, Service Bus, and App Services. Features microservices architecture, serverless processing, event-driven workflows, and comprehensive Azure integration for scalable property management operations.

Business Impact:
The UK Property Management Platform has successfully transformed property management operations for the UK's largest listed residential landlord, managing a portfolio valued at over £3 billion with more than 9,000 homes. The system significantly improves operational efficiency, reduces manual processes, and enhances tenant satisfaction while providing robust Azure cloud infrastructure for reliable and scalable operations.`
    })

    // Technologies
    const technologies = ref([
      { name: "Azure Functions", description: "Serverless compute for automation", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Logic Apps", description: "Workflow automation and integration", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Service Bus", description: "Message queuing and event processing", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure App Service", description: "Web application hosting", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure SQL Database", description: "Managed database service", category: TECH_CATEGORIES.DATABASE },
      { name: "Azure Storage", description: "Blob storage for documents", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Key Vault", description: "Security and secret management", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Application Insights", description: "Monitoring and analytics", category: TECH_CATEGORIES.CLOUD },
      { name: ".NET Core", description: "Backend application framework", category: TECH_CATEGORIES.BACKEND },
      { name: "Angular", description: "Frontend application framework", category: TECH_CATEGORIES.FRONTEND },
      { name: "TypeScript", description: "Type-safe development", category: TECH_CATEGORIES.FRONTEND },
      { name: "RESTful APIs", description: "Service communication", category: TECH_CATEGORIES.BACKEND },
      { name: "Azure DevOps", description: "CI/CD pipeline", category: TECH_CATEGORIES.DEVOPS },
      { name: "Docker", description: "Containerization", category: TECH_CATEGORIES.DEVOPS },
      { name: "Azure Container Registry", description: "Image management", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Active Directory", description: "Identity management", category: TECH_CATEGORIES.CLOUD }
    ])

    // Architecture Layers
    const architectureLayers = ref([
      {
        icon: 'portal',
        title: 'Frontend Application Layer',
        description: 'Angular-based web application providing comprehensive property management interface with portfolio management, tenant portal, maintenance tracking, and financial operations. Features responsive design, real-time updates, and comprehensive analytics visualization.',
        features: [
          {
            icon: 'angular',
            name: 'Angular Frontend Application',
            description: 'Modern Angular application built with TypeScript providing comprehensive property management interface. Features portfolio management modules, tenant portal, maintenance tracking workflows, financial operations, and real-time analytics. Implements responsive design patterns, secure authentication, and comprehensive API integration for seamless backend communication.'
          },
          {
            icon: 'portal',
            name: 'Tenant Portal',
            description: 'Self-service tenant interface enabling tenants to manage accounts, submit maintenance requests, view documents, and communicate with property management. Features secure authentication, document management, payment processing, and comprehensive tenant information access.'
          }
        ]
      },
      {
        icon: 'cloud',
        title: 'Azure Serverless & Integration Services',
        description: 'Azure Functions, Logic Apps, and Service Bus providing serverless processing, workflow automation, and event-driven architecture.',
        features: [
          {
            icon: 'cloud',
            name: 'Azure Functions',
            description: 'Serverless compute service handling property management workflows, automated notifications, maintenance scheduling, financial calculations, and event-driven processing. Features automatic scaling, pay-per-use pricing, and comprehensive Azure integration for efficient property management operations.'
          },
          {
            icon: 'cloud',
            name: 'Azure Logic Apps',
            description: 'Workflow automation service providing business process orchestration, integration workflows, approval processes, scheduled tasks, and conditional logic. Features visual workflow design, comprehensive connector library, and seamless Azure service integration.'
          },
          {
            icon: 'cloud',
            name: 'Azure Service Bus',
            description: 'Message queuing and event processing service providing reliable messaging, asynchronous processing, pub/sub patterns, and dead letter queues. Features guaranteed message delivery, message ordering, and comprehensive event-driven architecture support.'
          }
        ]
      },
      {
        icon: 'api',
        title: 'Backend API Services Layer',
        description: '.NET Core Web API microservices providing property management, tenant services, maintenance tracking, and financial operations services.',
        features: [
          {
            icon: 'api',
            name: 'Property Management API',
            description: 'RESTful API service handling portfolio management, property tracking, tenant management, and property lifecycle operations. Features comprehensive property data management, tenant relationship management, and property analytics.'
          },
          {
            icon: 'api',
            name: 'Maintenance Management API',
            description: 'Microservice handling maintenance request processing, scheduling, tracking, and resolution workflows. Features automated maintenance workflows, contractor management, and maintenance analytics.'
          },
          {
            icon: 'database',
            name: 'Data Access Layer',
            description: 'Entity Framework Core data access layer with Azure SQL Database providing efficient data persistence, query optimization, and comprehensive data modeling for property management operations.'
          }
        ]
      },
      {
        icon: 'cloud',
        title: 'Azure Cloud Infrastructure',
        description: 'Azure cloud services providing scalable hosting, database services, storage, and comprehensive cloud infrastructure.',
        features: [
          {
            icon: 'cloud',
            name: 'Azure App Service',
            description: 'Cloud hosting platform for scalable web application deployment with auto-scaling, load balancing, and high availability. Features automated deployment, health monitoring, and comprehensive Azure integration.'
          },
          {
            icon: 'database',
            name: 'Azure SQL Database',
            description: 'Fully managed cloud database service with high availability, automated backups, and comprehensive security features. Features elastic scaling, geo-replication, and advanced monitoring capabilities for property management data.'
          },
          {
            icon: 'cloud',
            name: 'Azure Storage',
            description: 'Blob storage service for document and media management providing scalable storage, secure access, and comprehensive file management. Features tiered storage, lifecycle management, and comprehensive security features.'
          }
        ]
      }
    ])

    const architectureBenefits = ref("The UK Property Management Platform architecture demonstrates enterprise-grade property management with Azure-native design, serverless processing, and comprehensive cloud infrastructure. The platform features scalable property management capabilities managing 9,000+ properties worth over £3 billion with 60% reduction in manual processes, 80% improvement in tenant satisfaction, and 99.9% system uptime. Angular frontend provides responsive user experience with real-time updates and comprehensive analytics. Azure Functions enable serverless processing for efficient property management workflows. Azure Logic Apps provide workflow automation for business process orchestration. Azure Service Bus enables event-driven architecture with reliable messaging. Azure cloud infrastructure provides scalable hosting, automated deployment, and comprehensive monitoring. This architecture successfully supports enterprise property management operations for the UK's largest listed residential landlord.")

    // Engineering Challenges
    const engineeringChallenges = ref([
      {
        icon: 'cloud',
        title: 'Azure Serverless Architecture & Scalability',
        problem: 'Designing and implementing scalable serverless architecture for managing 9,000+ properties with complex workflows, real-time processing requirements, and varying load patterns. Required efficient serverless design, workflow automation, and optimal Azure service integration.',
        solutions: [
          {
            icon: 'cloud',
            name: 'Azure Functions Serverless Processing',
            description: 'Implemented serverless compute with Azure Functions for property management workflows, automated notifications, maintenance scheduling, and financial calculations. Features automatic scaling, pay-per-use pricing, and event-driven processing achieving efficient property management operations with 60% reduction in manual processes.'
          },
          {
            icon: 'cloud',
            name: 'Azure Logic Apps Workflow Automation',
            description: 'Built comprehensive workflow automation with Azure Logic Apps providing business process orchestration, integration workflows, approval processes, and scheduled tasks. Features visual workflow design, comprehensive connector library, and seamless Azure service integration enabling efficient property management workflows.'
          }
        ]
      },
      {
        icon: 'cloud',
        title: 'Event-Driven Architecture & Service Bus Integration',
        problem: 'Implementing reliable event-driven architecture for property management operations with message queuing, asynchronous processing, and event coordination across multiple Azure services. Required reliable messaging, event processing, and comprehensive service integration.',
        solutions: [
          {
            icon: 'cloud',
            name: 'Azure Service Bus Messaging',
            description: 'Implemented reliable message queuing with Azure Service Bus providing guaranteed message delivery, asynchronous processing, pub/sub patterns, and dead letter queues. Features message ordering, retry policies, and comprehensive event-driven architecture support ensuring reliable property management operations.'
          },
          {
            icon: 'api',
            name: 'Event-Driven Microservices',
            description: 'Designed event-driven microservices architecture with Azure Functions and Service Bus integration. Features event publishing, event consumption, and comprehensive event coordination enabling efficient property management workflows and real-time updates.'
          }
        ]
      },
      {
        icon: 'database',
        title: 'Large-Scale Data Management & Performance',
        problem: 'Managing large-scale property data for 9,000+ properties with complex queries, high transaction volumes, and performance requirements. Required efficient database design, query optimization, and scalable data management.',
        solutions: [
          {
            icon: 'database',
            name: 'Azure SQL Database Optimization',
            description: 'Optimized Azure SQL Database with efficient indexing, query optimization, and elastic scaling capabilities. Features connection pooling, efficient data modeling, and comprehensive performance monitoring ensuring optimal performance for large-scale property management operations.'
          },
          {
            icon: 'cloud',
            name: 'Azure Storage for Documents',
            description: 'Implemented Azure Blob Storage for document and media management providing scalable storage, secure access, and comprehensive file management. Features tiered storage, lifecycle management, and efficient document processing for property management operations.'
          }
        ]
      }
    ])

    // Business Impact Results
    const businessImpactResults = ref("These engineering solutions delivered transformative results for the UK's largest listed residential landlord: 60% reduction in manual processes through Azure Functions and Logic Apps automation, 80% improvement in tenant satisfaction through enhanced user experience and self-service capabilities, 45% faster rent collection processing with automated financial workflows, 70% faster maintenance request resolution through automated maintenance management, 40% reduction in operational costs through automation and process optimization, and 99.9% system uptime with Azure SLA guarantees. The Azure serverless architecture enabled scalable property management for 9,000+ properties worth over £3 billion. Azure Functions and Logic Apps revolutionized workflow automation with serverless processing and visual workflow design. Azure Service Bus enabled reliable event-driven architecture with guaranteed message delivery. The platform successfully transformed property management operations providing comprehensive portfolio management, tenant services, and operational automation through Azure cloud services.")

    // Performance Stats
    const performanceStats = ref([
      {
        value: '9,000+',
        label: 'Properties Managed',
        color: 'green'
      },
      {
        value: '£3B+',
        label: 'Portfolio Value',
        color: 'blue'
      },
      {
        value: '80%',
        label: 'Tenant Satisfaction',
        color: 'purple'
      },
      {
        value: '99.9%',
        label: 'System Uptime',
        color: 'teal'
      }
    ])

    // Performance Charts
    const performanceCharts = ref([
      {
        id: 'propertyPerformanceChart',
        type: 'doughnut',
        title: 'Property Management Operations Distribution',
        icon: 'performance',
        width: 'half',
        data: {
          labels: ['Portfolio Management', 'Tenant Services', 'Maintenance', 'Financial Operations', 'Document Management', 'Analytics'],
          datasets: [{
            data: [25, 20, 18, 15, 12, 10],
            backgroundColor: ['#0ea2bd', '#ff6b35', '#28a745', '#6f42c1', '#ffc107', '#17a2b8'],
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
                boxHeight: 12
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
        id: 'propertyMetricsChart',
        type: 'line',
        title: 'Property Management Performance Trends',
        icon: 'analytics',
        width: 'half',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
          datasets: [
            {
              label: 'Operational Efficiency',
              data: [100, 115, 130, 150, 160, 160],
              borderColor: '#0ea2bd',
              backgroundColor: 'rgba(14, 162, 189, 0.1)',
              fill: true,
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointBackgroundColor: '#0ea2bd',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2
            },
            {
              label: 'Tenant Satisfaction',
              data: [100, 120, 140, 160, 175, 180],
              borderColor: '#ff6b35',
              backgroundColor: 'rgba(255, 107, 53, 0.1)',
              fill: true,
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointBackgroundColor: '#ff6b35',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2
            }
          ]
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
                  return value + '%'
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
        id: 'propertySuccessChart',
        type: 'bar',
        title: 'Property Management Success Metrics',
        icon: 'success',
        width: 'full',
        data: {
          labels: ['Properties Managed', 'Portfolio Value', 'Tenant Satisfaction', 'System Uptime', 'Operational Efficiency', 'Cost Reduction'],
          datasets: [{
            label: 'Success Metrics',
            data: [9000, 3, 80, 99.9, 60, 40],
            backgroundColor: [
              'rgba(14, 162, 189, 0.8)',
              'rgba(255, 107, 53, 0.8)',
              'rgba(40, 167, 69, 0.8)',
              'rgba(111, 66, 193, 0.8)',
              'rgba(255, 193, 7, 0.8)',
              'rgba(23, 162, 184, 0.8)'
            ],
            borderColor: [
              '#0ea2bd',
              '#ff6b35',
              '#28a745',
              '#6f42c1',
              '#ffc107',
              '#17a2b8'
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
                  if (label.includes('Properties')) {
                    return `${label}: ${value.toLocaleString()}+`
                  } else if (label.includes('Portfolio Value')) {
                    return `${label}: £${value}B+`
                  } else if (label.includes('Uptime')) {
                    return `${label}: ${value}%`
                  } else if (label.includes('Satisfaction') || label.includes('Efficiency') || label.includes('Reduction')) {
                    return `${label}: ${value}% improvement`
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
      introduction: 'The UK Property Management Platform employs a comprehensive metrics framework to measure portfolio performance, tenant satisfaction, operational efficiency, system reliability, and financial effectiveness for large-scale property management operations.',
      metricsCategories: [
        {
          icon: 'performance',
          title: 'Portfolio & Operational Performance Metrics',
          metrics: [
            {
              icon: 'enterprise',
              name: 'Properties Managed (9,000+)',
              measurementMethod: 'Portfolio tracking using property management system and database analytics. Monitors total properties under management, property types, geographic distribution, and portfolio growth trends.',
              context: 'Critical for property management operations where portfolio scale indicates system capability and business growth. Large portfolio management demonstrates scalable architecture and efficient property management capabilities.',
              validation: 'Successfully manages 9,000+ properties worth over £3 billion through Azure cloud infrastructure, scalable architecture, and efficient property management workflows demonstrating enterprise-scale property management capabilities.'
            },
            {
              icon: 'performance',
              name: 'Operational Efficiency (60% reduction)',
              measurementMethod: 'Operational process tracking using workflow analytics and automation metrics. Monitors manual process reduction, automation efficiency, and overall operational cost savings.',
              context: 'Essential for property management profitability where operational efficiency improves margins, enables competitive pricing, and supports business growth. Reduced manual processes are critical for scalable property management operations.',
              validation: 'Implemented through Azure Functions and Logic Apps automation, workflow optimization, and process automation achieving 60% reduction in manual processes with improved efficiency and productivity.'
            }
          ]
        },
        {
          icon: 'success',
          title: 'Tenant Experience & Satisfaction Metrics',
          metrics: [
            {
              icon: 'success',
              name: 'Tenant Satisfaction (80% improvement)',
              measurementMethod: 'Tenant satisfaction tracking using surveys, feedback analysis, and tenant experience metrics. Monitors tenant satisfaction scores, Net Promoter Score (NPS), and tenant feedback trends.',
              context: 'Critical for property management business success where high tenant satisfaction drives retention, referrals, and business growth. Enhanced tenant experience is essential for competitive property management operations.',
              validation: 'Achieved through improved user interface, self-service capabilities, faster processing, real-time updates, and comprehensive tenant portal features resulting in 80% improvement in tenant satisfaction scores.'
            },
            {
              icon: 'performance',
              name: 'Maintenance Request Resolution (70% faster)',
              measurementMethod: 'Maintenance processing time tracking using workflow analytics and maintenance management system metrics. Monitors request intake time, resolution duration, and maintenance workflow efficiency.',
              context: 'Essential for property management operations where faster maintenance resolution improves tenant satisfaction, reduces property damage, and enables efficient property maintenance. Reduced processing time is critical for competitive property management services.',
              validation: 'Implemented through automated maintenance workflows, efficient scheduling, contractor management, and optimized maintenance processing achieving 70% faster maintenance request resolution with improved tenant satisfaction.'
            }
          ]
        },
        {
          icon: 'financial',
          title: 'Financial & System Reliability Metrics',
          metrics: [
            {
              icon: 'financial',
              name: 'Rent Collection Processing (45% faster)',
              measurementMethod: 'Financial processing time tracking using financial workflow analytics and payment processing metrics. Monitors rent collection time, invoicing duration, and financial processing efficiency.',
              context: 'Critical for property management financial operations where faster rent collection improves cash flow, reduces outstanding balances, and enables efficient financial management. Reduced processing time is essential for property management profitability.',
              validation: 'Achieved through automated financial workflows, payment processing automation, and efficient invoicing systems resulting in 45% faster rent collection processing with improved cash flow and financial efficiency.'
            },
            {
              icon: 'uptime',
              name: 'System Uptime (99.9%)',
              measurementMethod: 'System availability tracking using Azure Application Insights, health monitoring, and uptime monitoring tools. Measures system availability, downtime incidents, and service reliability metrics.',
              context: 'Essential for enterprise property management operations where high system availability ensures continuous service delivery, prevents business disruption, and maintains tenant trust. High uptime is critical for property management business operations.',
              validation: 'Implemented through Azure cloud infrastructure, automated monitoring, high availability configuration, health checks, and comprehensive error tracking achieving 99.9% system uptime with Azure SLA guarantees.'
            },
            {
              icon: 'financial',
              name: 'Operational Cost Reduction (40%)',
              measurementMethod: 'Operational cost tracking using process analytics, automation metrics, and cost analysis. Monitors manual process reduction, automation efficiency, and overall operational cost savings.',
              context: 'Essential for property management business profitability where cost reduction improves margins, enables competitive pricing, and supports business growth. Operational efficiency is critical for property management business success.',
              validation: 'Implemented through process automation, workflow optimization, reduced manual processes, and efficient system operations achieving 40% reduction in operational costs with improved efficiency and productivity.'
            }
          ]
        }
      ],
      frameworkItems: [
        {
          title: 'Portfolio Performance Monitoring',
          description: 'Continuous monitoring of portfolio performance, property management efficiency, and operational metrics using Azure Application Insights and performance analytics',
          icon: 'monitoring'
        },
        {
          title: 'Tenant Experience Analytics',
          description: 'Comprehensive analytics for tenant satisfaction, user experience, and tenant feedback using surveys and feedback analysis',
          icon: 'analytics'
        },
        {
          title: 'Financial Operations Monitoring',
          description: 'Real-time monitoring of financial operations, rent collection, and payment processing using financial analytics and workflow tracking',
          icon: 'monitoring'
        },
        {
          title: 'System Reliability Monitoring',
          description: 'Real-time monitoring of system uptime, availability, and reliability using Azure monitoring and health check systems',
          icon: 'monitoring'
        }
      ]
    })

    // ROI Section
        const roiLeftItems = ref([
      { label: "Operational Cost Reduction", value: "40%" },
      { label: "Rent Collection Efficiency", value: "45% faster" },
      { label: "Portfolio Value Managed", value: "£3B+" },
      { label: "Cost Savings", value: "$TBD" },
      { label: "ROI on Automation", value: "TBD" }
    ])
        const roiRightItems = ref([
      { label: "Properties Managed", value: "9,000+" },
      { label: "Tenant Satisfaction", value: "80% improvement" },
      { label: "Maintenance Resolution", value: "70% faster" },
      { label: "System Uptime", value: "99.9%" },
      { label: "Operational Efficiency", value: "60% reduction" }
    ])
        const roiMetrics = ref([
      { value: "9,000+", label: "Properties", color: "green" },
      { value: "£3B+", label: "Portfolio Value", color: "blue" },
      { value: "80%", label: "Tenant Satisfaction", color: "purple" },
      { value: "99.9%", label: "System Uptime", color: "pink" },
      { value: "60%", label: "Efficiency Gain", color: "cyan" },
      { value: "40%", label: "Cost Reduction", color: "teal" }
    ])

    // Diagram Narration Steps
    const ukPropertyManagementNarrationSteps = ref([])

    return {
      // Data
      projectData,
      galleryData,
      projectOverviewData,
      technologies,
      ukPropertyManagementNarrationSteps,
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

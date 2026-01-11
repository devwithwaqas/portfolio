<!-- 
  Insurance Clients (Chubb Insurance Applications) Project Page
  ============================================
  
  This page follows the same structure as other project pages.
  Use PROJECT_PAGE_IMPLEMENTATION_GUIDE.md for detailed instructions.
-->

<template>
  <ProjectPageTemplate projectTitle="Confidential Insurance Clients">
    
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
        client="Confidential Insurance Clients (Top 5 Global Agency)"
        projectDate="2012 - 2018"
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
        diagram-src="/assets/diagrams/InsuranceClients_C4_Diagram.svg"
        :narration-steps="insuranceClientsNarrationSteps"
        :svg-width="18428"
        :svg-height="9196"
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
        mainTitle="Insurance Clients Business Impact & Growth Metrics"
        :mainIcon="ROI_ICON_NAMES.MAIN_ICON"
        leftTitle="Financial Growth Impact"
        :leftIcon="ROI_ICON_NAMES.FINANCIAL_ICON"
        rightTitle="Operational Growth Impact"
        :rightIcon="ROI_ICON_NAMES.OPERATIONAL_ICON"
        metricsTitle="Insurance Clients Growth Success Metrics"
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
  name: 'InsuranceClientsPage',
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
    // Insurance Clients Project Data
    const projectData = ref({
      title: 'Confidential Insurance Clients - Enterprise Insurance Solutions',
      description: 'Comprehensive insurance management system developed for one of the world\'s five biggest insurance agencies featuring two main enterprise applications: Policy Management System and Claims Processing Platform. Built with .NET Core, Angular, and SQL Server, this solution includes advanced CI/CD automation for seamless deployment and continuous integration..',
      tags: [
        'Insurance',
        'Enterprise',
        '.NET Core',
        'Angular',
        'Azure'
      ],
            achievementsCol1: [
        { emoji: 'enterprise', label: 'Processing Speed', value: '70% faster' },
        { emoji: 'compliance', label: 'System Uptime', value: '99.9%' }
      ],
            achievementsCol2: [
        { emoji: 'success', label: 'Customer Satisfaction', value: '85% improvement' },
        { emoji: 'cloud', label: 'Deployment Speed', value: '90% faster' }
      ]
    })

    // Gallery Data
    const galleryData = ref({
      title: "Insurance Clients Gallery",
      projectName: "Confidential Insurance Clients",
      images: [
        "/assets/img/in1.jpg",
        "/assets/img/in2.jpg",
        "/assets/img/in3.jpg"
      ]
    })

    // Project Overview Data
    const projectOverviewData = ref({
      description: `Confidential Insurance Clients - Enterprise Insurance Management Platform

The Challenge:
Insurance companies require comprehensive policy management, claims processing, regulatory compliance, and secure data handling. The platform must handle complex insurance workflows, maintain regulatory compliance, and provide secure access to sensitive insurance data for one of the world's five biggest insurance agencies.

The Solution:
Enterprise insurance management platform built with .NET Core and Angular, deployed on Azure cloud infrastructure. Features comprehensive policy management, claims processing, regulatory compliance, and secure data handling capabilities. The system consists of two main products: Policy Management System and Claims Processing Platform with advanced CI/CD automation.

Key Features:
• Policy Management: End-to-end policy lifecycle management
• Claims Processing: Automated claims assessment and settlement
• Customer Portal: Self-service customer interface
• Agent Dashboard: Comprehensive agent management tools
• Underwriting Engine: Automated risk assessment
• Document Management: Digital document processing
• Payment Processing: Secure payment handling
• Analytics Dashboard: Business intelligence and reporting

Technical Architecture:
Built with .NET Core Web API backend, Angular frontend, SQL Server database, and Azure cloud services. Features microservices architecture, secure authentication, comprehensive API integration, and advanced CI/CD automation with Azure DevOps for seamless deployment and continuous integration.

Business Impact:
The Confidential Insurance Clients Applications have revolutionized insurance operations for one of the world's five biggest insurance agencies by providing a comprehensive, automated platform that streamlines policy management and claims processing. The system significantly improves operational efficiency, reduces processing times, and enhances customer satisfaction while providing robust CI/CD automation for reliable deployments.`
    })

    // Technologies
    const technologies = ref([
      { name: ".NET Core", description: ".NET Core for enterprise insurance management", category: TECH_CATEGORIES.BACKEND },
      { name: "ASP.NET Core Web API", description: "ASP.NET Core Web API for enterprise insurance management", category: TECH_CATEGORIES.BACKEND },
      { name: "Entity Framework Core", description: "Entity Framework Core for enterprise insurance management", category: TECH_CATEGORIES.BACKEND },
      { name: "SQL Server", description: "SQL Server for enterprise insurance management", category: TECH_CATEGORIES.DATABASE },
      { name: "Redis Cache", description: "Redis Cache for enterprise insurance management", category: TECH_CATEGORIES.BACKEND },
      { name: "SignalR", description: "SignalR for enterprise insurance management", category: TECH_CATEGORIES.BACKEND },
      { name: "Azure App Service", description: "Azure App Service for enterprise insurance management", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure SQL Database", description: "Azure SQL Database for enterprise insurance management", category: TECH_CATEGORIES.CLOUD },
      { name: "Angular", description: "Angular for enterprise insurance management", category: TECH_CATEGORIES.FRONTEND },
      { name: "TypeScript", description: "TypeScript for enterprise insurance management", category: TECH_CATEGORIES.FRONTEND },
      { name: "Bootstrap", description: "Bootstrap for enterprise insurance management", category: TECH_CATEGORIES.FRONTEND },
      { name: "Chart.js", description: "Chart.js for enterprise insurance management", category: TECH_CATEGORIES.FRONTEND },
      { name: "Azure DevOps", description: "Azure DevOps for enterprise insurance management", category: TECH_CATEGORIES.DEVOPS },
      { name: "Docker", description: "Docker for enterprise insurance management", category: TECH_CATEGORIES.DEVOPS },
      { name: "Azure Container Registry", description: "Azure Container Registry for enterprise insurance management", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Key Vault", description: "Azure Key Vault for enterprise insurance management", category: TECH_CATEGORIES.CLOUD }
    ])

    // Architecture Layers
    const architectureLayers = ref([
      {
        icon: 'portal',
        title: 'Frontend Application Layer',
        description: 'Angular-based web application providing comprehensive insurance management interface with policy management, claims processing, customer portal, and agent dashboard. Features responsive design, real-time updates, and comprehensive analytics visualization.',
        features: [
          {
            icon: 'angular',
            name: 'Angular Frontend Application',
            description: 'Modern Angular application built with TypeScript and Bootstrap providing comprehensive insurance management interface. Features policy management modules, claims processing workflows, customer self-service portal, agent dashboard, and real-time analytics with Chart.js integration. Implements responsive design patterns, secure authentication, and comprehensive API integration for seamless backend communication.'
          },
          {
            icon: 'portal',
            name: 'Customer Portal',
            description: 'Self-service customer interface enabling policyholders to manage policies, submit claims, view documents, and track claim status. Features secure authentication, document management, payment processing, and comprehensive policy information access.'
          },
          {
            icon: 'portal',
            name: 'Agent Dashboard',
            description: 'Comprehensive agent management tools providing policy creation, customer management, claims processing, and performance analytics. Features real-time updates, workflow management, and comprehensive reporting capabilities.'
          }
        ]
      },
      {
        icon: 'api',
        title: 'Backend API Services Layer',
        description: '.NET Core Web API microservices providing policy management, claims processing, underwriting engine, and document management services.',
        features: [
          {
            icon: 'api',
            name: 'Policy Management API',
            description: 'RESTful API service handling policy creation, renewal processing, underwriting engine operations, and policy lifecycle management. Features automated policy generation, risk assessment, premium calculation, and regulatory compliance monitoring.'
          },
          {
            icon: 'api',
            name: 'Claims Processing API',
            description: 'Microservice handling claims intake, assessment engine operations, approval workflows, payment processing, and fraud detection. Features multi-channel claims submission, automated damage assessment, multi-level approval processes, and AI-powered fraud prevention.'
          },
          {
            icon: 'database',
            name: 'Data Access Layer',
            description: 'Entity Framework Core data access layer with SQL Server database providing efficient data persistence, query optimization, and comprehensive data modeling for insurance operations.'
          }
        ]
      },
      {
        icon: 'cloud',
        title: 'Azure Cloud Infrastructure',
        description: 'Azure cloud services providing scalable hosting, database services, containerization, and CI/CD automation.',
        features: [
          {
            icon: 'cloud',
            name: 'Azure App Service',
            description: 'Cloud hosting platform for scalable microservices deployment with auto-scaling, load balancing, and high availability. Features automated deployment, health monitoring, and comprehensive Azure integration.'
          },
          {
            icon: 'database',
            name: 'Azure SQL Database',
            description: 'Fully managed cloud database service with high availability, automated backups, and comprehensive security features. Features elastic scaling, geo-replication, and advanced monitoring capabilities.'
          },
          {
            icon: 'devops',
            name: 'Azure DevOps CI/CD',
            description: 'Automated deployment pipeline with Azure DevOps providing continuous integration, automated testing, Docker containerization, and environment promotion. Features automated build process, quality gates, security scanning, and production deployment automation.'
          }
        ]
      }
    ])

    const architectureBenefits = ref("The Confidential Insurance Clients architecture demonstrates enterprise-grade insurance management with microservices design, comprehensive CI/CD automation, and Azure cloud infrastructure. The platform features scalable policy management and claims processing capabilities with 70% faster processing, 60% reduction in claims processing time, and 99.9% system uptime. Angular frontend provides responsive user experience with real-time updates and comprehensive analytics. .NET Core backend microservices enable efficient policy management, claims processing, and underwriting operations. Azure cloud infrastructure provides scalable hosting, automated deployment, and comprehensive monitoring. CI/CD automation with Azure DevOps enables 90% faster deployment with automated testing, quality gates, and production deployment. This architecture successfully supports enterprise insurance operations for one of the world's five biggest insurance agencies.")

    // Engineering Challenges
    const engineeringChallenges = ref([
      {
        icon: 'performance',
        title: 'Enterprise-Scale Policy & Claims Processing Performance',
        problem: 'Handling high-volume policy management and claims processing for one of the world\'s five biggest insurance agencies with complex workflows, real-time processing requirements, and strict performance SLAs. Required efficient processing, scalable architecture, and optimal database performance.',
        solutions: [
          {
            icon: 'performance',
            name: 'Microservices Architecture & Performance Optimization',
            description: 'Implemented scalable microservices architecture with .NET Core Web API services, Redis caching for performance optimization, and efficient database query optimization. Features load balancing, horizontal scaling, and comprehensive performance monitoring achieving 70% faster policy processing and 60% reduction in claims processing time.'
          },
          {
            icon: 'database',
            name: 'Database Optimization & Caching Strategy',
            description: 'Optimized SQL Server database with efficient indexing, query optimization, and Redis caching for frequently accessed data. Features connection pooling, efficient data modeling, and comprehensive caching strategies ensuring optimal performance for high-volume insurance operations.'
          }
        ]
      },
      {
        icon: 'devops',
        title: 'CI/CD Automation & Deployment Pipeline',
        problem: 'Implementing comprehensive CI/CD automation for enterprise insurance applications with multiple environments, automated testing, quality gates, and reliable production deployments. Required automated deployment pipeline, containerization, and comprehensive quality assurance.',
        solutions: [
          {
            icon: 'devops',
            name: 'Azure DevOps CI/CD Pipeline',
            description: 'Implemented comprehensive CI/CD automation with Azure DevOps providing automated build process, Docker containerization, automated testing, quality gates, security scanning, and environment promotion. Features automated deployment pipeline with 90% faster deployment, comprehensive testing automation, and reliable production deployments.'
          },
          {
            icon: 'cloud',
            name: 'Docker Containerization & Azure Container Registry',
            description: 'Containerized applications with Docker for consistent deployment across environments. Features Azure Container Registry for image management, automated container builds, and seamless deployment to Azure App Service ensuring reliable and scalable application deployment.'
          }
        ]
      },
      {
        icon: 'compliance',
        title: 'Regulatory Compliance & Security',
        problem: 'Ensuring regulatory compliance and enterprise-grade security for sensitive insurance data with industry-standard security protocols, compliance monitoring, and secure data handling. Required comprehensive security measures, compliance engine, and secure authentication.',
        solutions: [
          {
            icon: 'security',
            name: 'Enterprise Security & Azure Key Vault',
            description: 'Implemented enterprise-grade security with Azure Key Vault for secure credential management, industry-standard authentication protocols, and comprehensive security monitoring. Features secure data encryption, secure API communication, and comprehensive security compliance.'
          },
          {
            icon: 'compliance',
            name: 'Regulatory Compliance Engine',
            description: 'Built comprehensive compliance engine with automated compliance monitoring, regulatory reporting, and compliance validation. Features real-time compliance tracking, automated compliance checks, and comprehensive regulatory reporting ensuring adherence to insurance industry standards.'
          }
        ]
      }
    ])

    // Business Impact Results
    const businessImpactResults = ref("These engineering solutions delivered transformative results for one of the world's five biggest insurance agencies: 70% faster policy processing through microservices architecture and performance optimization, 60% reduction in claims processing time with automated workflows and efficient processing, 85% improvement in customer satisfaction through enhanced user experience and self-service capabilities, 40% reduction in operational costs through automation and process optimization, 90% faster deployment with comprehensive CI/CD automation, and 99.9% system uptime with automated monitoring and high availability. The microservices architecture enabled scalable policy management and claims processing for enterprise operations. CI/CD automation with Azure DevOps revolutionized deployment processes with automated testing and quality gates. Enterprise security and compliance engine ensured regulatory adherence and secure data handling. The platform successfully transformed insurance operations providing comprehensive policy management, claims processing, and regulatory compliance capabilities.")

    // Performance Stats
    const performanceStats = ref([
      {
        value: '70%',
        label: 'Faster Processing',
        color: 'green'
      },
      {
        value: '60%',
        label: 'Claims Reduction',
        color: 'blue'
      },
      {
        value: '85%',
        label: 'Customer Satisfaction',
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
        id: 'insurancePerformanceChart',
        type: 'doughnut',
        title: 'Insurance Operations Performance Distribution',
        icon: 'performance',
        width: 'half',
        data: {
          labels: ['Policy Processing', 'Claims Processing', 'Underwriting', 'Document Management', 'Payment Processing', 'Analytics'],
          datasets: [{
            data: [25, 20, 15, 12, 18, 10],
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
        id: 'insuranceMetricsChart',
        type: 'line',
        title: 'Insurance Performance Metrics Trends',
        icon: 'analytics',
        width: 'half',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
          datasets: [
            {
              label: 'Policy Processing Speed',
              data: [100, 115, 130, 150, 165, 170],
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
              label: 'Claims Processing Efficiency',
              data: [100, 120, 140, 155, 160, 160],
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
        id: 'insuranceSuccessChart',
        type: 'bar',
        title: 'Insurance Success Metrics',
        icon: 'success',
        width: 'full',
        data: {
          labels: ['Processing Speed', 'Claims Efficiency', 'Customer Satisfaction', 'System Uptime', 'Deployment Speed', 'Cost Reduction'],
          datasets: [{
            label: 'Improvement Percentage',
            data: [70, 60, 85, 99.9, 90, 40],
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
                  if (label.includes('Uptime')) {
                    return `${label}: ${value}%`
                  } else if (label.includes('Speed') || label.includes('Efficiency') || label.includes('Satisfaction') || label.includes('Reduction')) {
                    return `${label}: ${value}% improvement`
                  } else {
                    return `${label}: ${value}%`
                  }
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
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
      }
    ])

    // Metrics Framework
    const metricsFrameworkData = ref({
      introduction: 'The Confidential Insurance Clients platform employs a comprehensive metrics framework to measure policy processing performance, claims efficiency, customer satisfaction, system reliability, and operational effectiveness for enterprise insurance management.',
      metricsCategories: [
        {
          icon: 'performance',
          title: 'Policy & Claims Processing Metrics',
          metrics: [
            {
              icon: 'performance',
              name: 'Policy Processing Speed (70% faster)',
              measurementMethod: 'Processing time tracking using application performance monitoring and workflow analytics. Measures policy creation time, renewal processing time, and overall policy lifecycle efficiency compared to baseline performance.',
              context: 'Critical for insurance operations where faster policy processing improves customer experience, reduces operational costs, and enables higher policy volume handling. Efficient processing is essential for competitive insurance operations.',
              validation: 'Achieved through microservices architecture optimization, Redis caching, database query optimization, and efficient workflow automation resulting in 70% faster policy processing compared to previous systems.'
            },
            {
              icon: 'performance',
              name: 'Claims Processing Efficiency (60% reduction)',
              measurementMethod: 'Claims processing time tracking using workflow analytics and claims management system metrics. Monitors claims intake time, assessment duration, approval workflow time, and settlement processing time.',
              context: 'Essential for insurance operations where efficient claims processing improves customer satisfaction, reduces operational costs, and enables faster claim settlements. Reduced processing time is critical for competitive insurance services.',
              validation: 'Implemented through automated workflows, efficient assessment engine, streamlined approval processes, and optimized payment processing achieving 60% reduction in claims processing time with improved accuracy and customer satisfaction.'
            }
          ]
        },
        {
          icon: 'success',
          title: 'Customer Experience & Satisfaction Metrics',
          metrics: [
            {
              icon: 'success',
              name: 'Customer Satisfaction (85% improvement)',
              measurementMethod: 'Customer satisfaction tracking using surveys, feedback analysis, and customer experience metrics. Monitors customer satisfaction scores, Net Promoter Score (NPS), and customer feedback trends.',
              context: 'Critical for insurance business success where high customer satisfaction drives retention, referrals, and business growth. Enhanced customer experience is essential for competitive insurance operations.',
              validation: 'Achieved through improved user interface, self-service capabilities, faster processing, real-time updates, and comprehensive customer portal features resulting in 85% improvement in customer satisfaction scores.'
            }
          ]
        },
        {
          icon: 'uptime',
          title: 'System Reliability & Operational Metrics',
          metrics: [
            {
              icon: 'uptime',
              name: 'System Uptime (99.9%)',
              measurementMethod: 'System availability tracking using Azure Application Insights, health monitoring, and uptime monitoring tools. Measures system availability, downtime incidents, and service reliability metrics.',
              context: 'Essential for enterprise insurance operations where high system availability ensures continuous service delivery, prevents business disruption, and maintains customer trust. High uptime is critical for insurance business operations.',
              validation: 'Implemented through Azure cloud infrastructure, automated monitoring, high availability configuration, health checks, and comprehensive error tracking achieving 99.9% system uptime with minimal downtime incidents.'
            },
            {
              icon: 'devops',
              name: 'Deployment Speed (90% faster)',
              measurementMethod: 'Deployment time tracking using Azure DevOps pipeline metrics and deployment analytics. Monitors build time, deployment duration, and overall deployment process efficiency.',
              context: 'Critical for agile insurance operations where faster deployment enables rapid feature delivery, bug fixes, and system updates. Efficient deployment processes are essential for competitive insurance technology.',
              validation: 'Achieved through comprehensive CI/CD automation with Azure DevOps, Docker containerization, automated testing, and streamlined deployment processes resulting in 90% faster deployment compared to manual processes.'
            },
            {
              icon: 'financial',
              name: 'Operational Cost Reduction (40%)',
              measurementMethod: 'Operational cost tracking using process analytics, automation metrics, and cost analysis. Monitors manual process reduction, automation efficiency, and overall operational cost savings.',
              context: 'Essential for insurance business profitability where cost reduction improves margins, enables competitive pricing, and supports business growth. Operational efficiency is critical for insurance business success.',
              validation: 'Implemented through process automation, workflow optimization, reduced manual processes, and efficient system operations achieving 40% reduction in operational costs with improved efficiency and productivity.'
            }
          ]
        }
      ],
      frameworkItems: [
        {
          title: 'Performance Monitoring',
          description: 'Continuous monitoring of policy processing, claims efficiency, and system performance using Azure Application Insights and performance analytics',
          icon: 'monitoring'
        },
        {
          title: 'Customer Experience Analytics',
          description: 'Comprehensive analytics for customer satisfaction, user experience, and customer feedback using surveys and feedback analysis',
          icon: 'analytics'
        },
        {
          title: 'System Reliability Monitoring',
          description: 'Real-time monitoring of system uptime, availability, and reliability using Azure monitoring and health check systems',
          icon: 'monitoring'
        },
        {
          title: 'CI/CD Pipeline Analytics',
          description: 'Deployment pipeline monitoring and analytics using Azure DevOps metrics and deployment tracking',
          icon: 'devops'
        }
      ]
    })

    // ROI Section
        const roiLeftItems = ref([
      { label: "Operational Cost Reduction", value: "40%" },
      { label: "Processing Efficiency Gains", value: "$TBD" },
      { label: "Deployment Cost Savings", value: "$TBD" },
      { label: "Manual Process Reduction", value: "40%" },
      { label: "ROI on Automation", value: "TBD" }
    ])
        const roiRightItems = ref([
      { label: "Processing Speed", value: "70% faster" },
      { label: "Claims Efficiency", value: "60% reduction" },
      { label: "Customer Satisfaction", value: "85% improvement" },
      { label: "System Uptime", value: "99.9%" },
      { label: "Deployment Speed", value: "90% faster" }
    ])
        const roiMetrics = ref([
      { value: "70%", label: "Faster Processing", color: "green" },
      { value: "60%", label: "Claims Reduction", color: "blue" },
      { value: "85%", label: "Customer Satisfaction", color: "purple" },
      { value: "99.9%", label: "System Uptime", color: "pink" },
      { value: "90%", label: "Deployment Speed", color: "cyan" },
      { value: "40%", label: "Cost Reduction", color: "teal" }
    ])

    // Diagram Narration Steps
    const insuranceClientsNarrationSteps = ref([])

    return {
      // Data
      projectData,
      galleryData,
      projectOverviewData,
      technologies,
      insuranceClientsNarrationSteps,
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

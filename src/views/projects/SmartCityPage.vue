<template>
  <ProjectPageTemplate projectTitle="PJ Smart City">
    
    <!-- Hero Slot -->
    <template #hero>
      <ProjectHeroCard 
        :title="projectData.title"
        :description="projectData.description"
        :tags="projectData.tags"
        :achievementsCol1="projectData.achievementsCol1"
        :achievementsCol2="projectData.achievementsCol2"
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
        :category="PROJECT_CATEGORIES.SMART_CITY_SOLUTIONS"
        client="Petaling Jaya City Council"
        projectDate="2019-2020"
        projectUrl="https://mbpj.gov.my"
        companySize="Municipal Government"
      />
    </template>
    
    <!-- Main Content Bottom -->
    <template #main-content-bottom>
      
      <!-- C4 Architecture Diagram -->
      <DiagramViewer 
        title="C4 Architecture Diagram"
        :icon-name="PROJECT_ICON_NAMES.ARCHITECTURE_OVERVIEW"
        :diagram-src="$assetPath('/assets/diagrams/SmartCity_C4_Diagram.svg')"
        :narration-steps="smartCityNarrationSteps"
        :svg-width="27681"
        :svg-height="11856"
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
        mainTitle="Smart City Business Impact & Growth Metrics"
        :mainIcon="ROI_ICON_NAMES.MAIN_ICON"
        leftTitle="Financial Growth Impact"
        :leftIcon="ROI_ICON_NAMES.FINANCIAL_ICON"
        rightTitle="Operational Growth Impact"
        :rightIcon="ROI_ICON_NAMES.OPERATIONAL_ICON"
        metricsTitle="Smart City Growth Success Metrics"
        :metricsIcon="ROI_ICON_NAMES.SUCCESS_ICON"
        :leftItems="roiLeftItems"
        :rightItems="roiRightItems"
        :metrics="roiMetrics"
      />
      
    </template>
    
  </ProjectPageTemplate>
</template>

<script>
import { ref, computed } from 'vue'
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
import { assetPath } from '@/utils/assetPath.js'

// Import constants
import { 
  PROJECT_ICON_NAMES, 
  PROJECT_CATEGORIES, 
  TECH_CATEGORIES,
  ROI_ICON_NAMES 
} from '@/config/constants.js'

export default {
  name: 'SmartCityPage',
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
    // Smart City Narration Steps (placeholder for now)
    const smartCityNarrationSteps = ref([
      {
        title: "Smart City Overview",
        description: "Comprehensive smart city platform overview",
        highlights: [{ x: 100, y: 100, width: 200, height: 150 }],
        icon: "smart city"
      }
    ])

    // Project Data
    const projectData = ref({
      title: "PJ Smart City",
      description: "A comprehensive smart city platform for Petaling Jaya City Council powered by SuperMap GIS technology. This advanced municipal solution integrates Big Data GIS, 3D GIS, and Geospatial AI capabilities to deliver enforcement systems, project management, land management, CCTV monitoring, and Google Street View integration. The platform streamlines urban operations with intelligent spatial analysis, IoT sensors, and real-time monitoring for efficient city management.",
      tags: ["Smart City Solutions", "GIS Integration", "IoT Monitoring", "Municipal Management", "Real-time Analytics", "Urban Planning"],
      achievementsCol1: [
        { emoji: "smart city", label: "City Coverage", value: "Complete municipal area" },
        { emoji: "cctv", label: "Monitoring Systems", value: "24/7 surveillance network" },
        { emoji: "gis", label: "GIS Integration", value: "Comprehensive mapping" }
      ],
      achievementsCol2: [
        { emoji: "enforcement", label: "Enforcement", value: "Automated systems" },
        { emoji: "project management", label: "Project Management", value: "Municipal projects" },
        { emoji: "land management", label: "Land Management", value: "Property tracking" }
      ]
    })

    // Gallery Data
    const galleryData = ref({
      title: "Project Gallery",
      projectName: "PJ Smart City",
      images: [
        assetPath("/assets/img/pj1.jpg"),
        assetPath("/assets/img/pj2.jpg")
      ]
    })

    // Project Overview Data
    const projectOverviewData = ref({
      description: "The PJ Smart City platform represents a comprehensive municipal management solution built on .NET Core and powered by SuperMap GIS technology that revolutionizes urban operations for Petaling Jaya City Council. This integrated system combines enforcement, project management, land management, CCTV monitoring, and Google Street View integration with advanced Big Data GIS, 3D GIS, and Geospatial AI capabilities to create a unified smart city ecosystem.\n\n\n\nThe Challenge:\nPetaling Jaya City Council needed a unified platform to manage various municipal operations including enforcement activities, project tracking, land management, and city monitoring. The organization faced challenges with fragmented systems, manual processes, and the need for real-time visibility into city operations. They required a solution that could integrate multiple municipal functions while providing comprehensive monitoring and analytics capabilities with enterprise-grade performance and reliability.\n\n\n\nThe Solution:\nThe PJ Smart City platform leverages SuperMap GIS technology with .NET Core backend services and JavaScript frontend to create a unified municipal management system. The platform integrates enforcement systems, project management tools, land management databases, CCTV monitoring networks, and Google Street View integration with advanced Big Data GIS, 3D GIS, and Geospatial AI capabilities. Built with responsive design and real-time capabilities using SignalR, the system provides comprehensive city management tools for municipal staff and decision-makers.\n\n\n\nKey Features:\n• Enforcement Management: Automated enforcement systems with violation tracking and penalty management using .NET Core services\n• Project Management: Municipal project tracking with timeline management and resource allocation\n• Land Management: Comprehensive property and land database with ownership tracking using Entity Framework Core\n• CCTV Monitoring: 24/7 surveillance network with real-time monitoring capabilities and SignalR integration\n• SuperMap GIS Integration: Advanced Big Data GIS, 3D GIS, and Geospatial AI capabilities for comprehensive urban planning and spatial analysis\n• Google Street View: Integrated street-level imagery for enhanced city visualization\n• Real-time Analytics: Comprehensive dashboards for municipal performance monitoring using .NET Core analytics\n• Mobile Access: Responsive JavaScript frontend for field operations and mobile management\n\n\n\nTechnical Architecture:\nThe system employs a modern web architecture with JavaScript frontend, .NET Core backend services, and SQL Server database integration powered by SuperMap GIS platform. The platform features advanced Big Data GIS, 3D GIS visualization, and Geospatial AI capabilities with real-time data processing using SignalR, and seamless integration with external services like Google Street View. The system includes advanced security features, role-based access control, and enterprise-grade performance for municipal operations.\n\n\n\nBusiness Impact:\nThis platform has transformed PJ City Council's approach to municipal management, creating a unified system where staff can access all necessary tools through a single interface. The integrated monitoring and analytics capabilities provide real-time insights into city operations, while the automated enforcement systems have improved efficiency and compliance. The platform serves municipal staff across multiple departments with comprehensive city management capabilities, delivering 200% ROI and significant operational improvements."
    })

    // Technologies
    const technologies = ref([
      // Backend Framework & Core Technologies
      { name: ".NET Core", description: "Enterprise-grade web framework for scalable applications", category: TECH_CATEGORIES.BACKEND },
      { name: "C#", description: "Primary programming language for backend development", category: TECH_CATEGORIES.BACKEND },
      { name: "ASP.NET Core", description: "Web API framework for RESTful services and microservices", category: TECH_CATEGORIES.BACKEND },
      { name: "Entity Framework Core", description: "ORM for database operations and data modeling", category: TECH_CATEGORIES.BACKEND },
      { name: "SQL Server", description: "Relational database for data management and analytics", category: TECH_CATEGORIES.BACKEND },
      { name: "SignalR", description: "Real-time communication for live updates and notifications", category: TECH_CATEGORIES.BACKEND },
      { name: "AutoMapper", description: "Object-to-object mapping for clean data transformation", category: TECH_CATEGORIES.BACKEND },
      { name: "FluentValidation", description: "Validation framework for robust data integrity", category: TECH_CATEGORIES.BACKEND },
      
      // Frontend Technologies
      { name: "JavaScript", description: "Interactive web functionality and real-time updates", category: TECH_CATEGORIES.FRONTEND },
      { name: "HTML5", description: "Modern web markup for responsive design", category: TECH_CATEGORIES.FRONTEND },
      { name: "CSS3", description: "Advanced styling with responsive layouts and animations", category: TECH_CATEGORIES.FRONTEND },
      { name: "Bootstrap", description: "Responsive framework for mobile-first design", category: TECH_CATEGORIES.FRONTEND },
      { name: "jQuery", description: "DOM manipulation and AJAX functionality", category: TECH_CATEGORIES.FRONTEND },
      { name: "Chart.js", description: "Interactive charts and data visualization", category: TECH_CATEGORIES.FRONTEND },
      { name: "Leaflet", description: "Lightweight mapping library for interactive maps", category: TECH_CATEGORIES.FRONTEND },
      
      // GIS & Mapping (SuperMap Platform)
      { name: "SuperMap", description: "Leading GIS platform with Big Data GIS, 3D GIS, and Geospatial AI capabilities", category: TECH_CATEGORIES.INTEGRATION },
      { name: "Google Maps API", description: "Interactive mapping and geolocation services", category: TECH_CATEGORIES.INTEGRATION },
      { name: "Google Street View", description: "Street-level imagery integration", category: TECH_CATEGORIES.INTEGRATION },
      { name: "GIS Systems", description: "Geographic information system integration", category: TECH_CATEGORIES.INTEGRATION },
      { name: "PostGIS", description: "Spatial database extension for advanced GIS operations", category: TECH_CATEGORIES.INTEGRATION },
      { name: "GeoJSON", description: "Geographic data format for web mapping", category: TECH_CATEGORIES.INTEGRATION },
      
      // Monitoring & IoT
      { name: "CCTV Systems", description: "Video surveillance and monitoring infrastructure", category: TECH_CATEGORIES.MONITORING },
      { name: "IoT Sensors", description: "Smart city sensor integration and data collection", category: TECH_CATEGORIES.MONITORING },
      { name: "Real-time Analytics", description: "Live data processing and visualization", category: TECH_CATEGORIES.ANALYTICS },
      { name: "Grafana", description: "Monitoring and observability platform", category: TECH_CATEGORIES.MONITORING },
      { name: "Prometheus", description: "Metrics collection and monitoring system", category: TECH_CATEGORIES.MONITORING },
      
      // Security & Authentication
      { name: "JWT", description: "JSON Web Tokens for secure authentication", category: TECH_CATEGORIES.SECURITY },
      { name: "OAuth 2.0", description: "Authorization framework for secure API access", category: TECH_CATEGORIES.SECURITY },
      { name: "SSL/TLS", description: "Encryption protocols for secure data transmission", category: TECH_CATEGORIES.SECURITY },
      
      // DevOps & Deployment
      { name: "Docker", description: "Containerization for consistent deployment", category: TECH_CATEGORIES.DEVOPS },
      { name: "Azure DevOps", description: "CI/CD pipeline and project management", category: TECH_CATEGORIES.DEVOPS },
      { name: "Git", description: "Version control and collaborative development", category: TECH_CATEGORIES.DEVOPS }
    ])

    // Architecture Overview Data
    const architectureLayers = ref([
      {
        icon: 'smart city',
        title: 'Smart City Frontend Portal',
        description: 'Modern JavaScript-based municipal management portal providing city council staff with unified access to enforcement systems, project management, land management, and real-time city monitoring across all devices and departments.',
        features: [
          {
            icon: 'web',
            name: 'Responsive Municipal Portal',
            description: 'Comprehensive web application built with JavaScript, HTML5, and CSS3 featuring interactive dashboards, role-based access control, and real-time data synchronization. Includes responsive design, mobile-first approach, and progressive web app capabilities for field operations and office management across all municipal departments.'
          },
          {
            icon: 'mobile',
            name: 'Mobile-First City Management',
            description: 'Optimized mobile experience ensuring municipal staff can access all city systems on-the-go. Features touch-friendly interfaces, offline capability for critical functions, and push notifications for enforcement alerts, project updates, and emergency notifications across all mobile devices used by city personnel.'
          },
          {
            icon: 'realtime',
            name: 'Real-Time City Data Synchronization',
            description: 'Live data updates across all integrated systems, instant notifications for enforcement actions and project milestones, and real-time collaboration features. Supports hundreds of concurrent municipal staff with efficient WebSocket connections and automatic reconnection for critical city operations.'
          },
          {
            icon: 'gis',
            name: 'Interactive GIS Mapping Interface',
            description: 'Advanced mapping interface powered by SuperMap GIS with 3D visualization, spatial analysis tools, and real-time geospatial data. Features interactive property boundaries, project locations, enforcement zones, and comprehensive city planning tools for municipal staff and decision-makers.'
          },
          {
            icon: 'bootstrap',
            name: 'Bootstrap Framework Integration',
            description: 'Responsive UI framework providing consistent design patterns, grid system, and component library for municipal applications. Features mobile-first responsive design, accessibility compliance, and cross-browser compatibility for seamless user experience across all devices and platforms.'
          },
          {
            icon: 'jquery',
            name: 'jQuery DOM Manipulation',
            description: 'Enhanced JavaScript functionality with jQuery for dynamic content updates, AJAX operations, and interactive user interfaces. Features smooth animations, form validation, and asynchronous data loading for responsive municipal portal interactions and real-time updates.'
          },
          {
            icon: 'chart.js',
            name: 'Chart.js Data Visualization',
            description: 'Interactive charts and graphs for municipal analytics, performance metrics, and data visualization. Features real-time chart updates, customizable dashboards, and comprehensive reporting tools for city council decision-making and public transparency.'
          },
          {
            icon: 'leaflet',
            name: 'Leaflet Interactive Mapping',
            description: 'Lightweight mapping library for interactive city maps, property visualization, and spatial data display. Features custom map layers, marker clustering, and real-time location tracking for municipal operations and citizen services.'
          }
        ]
      },
      {
        icon: 'supermap',
        title: 'SuperMap GIS Platform Integration',
        description: 'Advanced GIS platform integration providing Big Data GIS, 3D GIS, and Geospatial AI capabilities for comprehensive spatial analysis, urban planning, and smart city management.',
        features: [
          {
            icon: 'supermap',
            name: 'Big Data GIS Processing',
            description: 'Enterprise-grade spatial data processing leveraging SuperMap\'s Big Data GIS capabilities for handling massive geospatial datasets. Features distributed computing, real-time spatial analytics, and advanced geospatial algorithms for comprehensive city data analysis and urban planning insights.'
          },
          {
            icon: 'spatial analysis',
            name: '3D GIS Visualization',
            description: 'Advanced 3D city modeling and visualization capabilities enabling immersive urban planning, infrastructure analysis, and spatial decision-making. Features realistic 3D city models, terrain analysis, and interactive 3D exploration for comprehensive municipal planning and development oversight.'
          },
          {
            icon: 'analytics',
            name: 'Geospatial AI & Machine Learning',
            description: 'Intelligent spatial analysis powered by Geospatial AI for predictive urban planning, traffic optimization, and environmental monitoring. Implements machine learning algorithms for pattern recognition, anomaly detection, and automated decision-making in municipal operations and city management.'
          },
          {
            icon: 'integration',
            name: 'Multi-Source Data Integration',
            description: 'Comprehensive integration of diverse spatial data sources including satellite imagery, aerial photography, IoT sensor data, and municipal databases. Features automated data synchronization, quality assurance, and real-time updates for accurate and up-to-date city information.'
          },
          {
            icon: 'google maps',
            name: 'Google Maps API Integration',
            description: 'Seamless integration with Google Maps API for enhanced mapping capabilities, geocoding services, and location-based services. Features street-level imagery, traffic data, and comprehensive mapping overlays for municipal operations and citizen services.'
          },
          {
            icon: 'google streetview',
            name: 'Google Street View Integration',
            description: 'Integrated street-level imagery for enhanced city visualization, property verification, and urban planning. Features 360-degree street views, historical imagery comparison, and immersive city exploration for municipal staff and decision-makers.'
          },
          {
            icon: 'gis systems',
            name: 'GIS Systems Integration',
            description: 'Comprehensive integration with existing GIS systems and spatial databases for unified geospatial data management. Features data interoperability, format conversion, and seamless workflow integration for efficient municipal GIS operations.'
          },
          {
            icon: 'postgis',
            name: 'PostGIS Spatial Database',
            description: 'Advanced spatial database integration providing geospatial data storage, spatial indexing, and complex spatial queries. Features coordinate transformation, spatial analysis functions, and optimized spatial data processing for comprehensive GIS operations.'
          },
          {
            icon: 'geojson',
            name: 'GeoJSON Data Format',
            description: 'Standardized geospatial data format for web mapping and spatial data exchange. Features lightweight data structure, web-friendly format, and seamless integration with mapping libraries for efficient spatial data visualization and analysis.'
          }
        ]
      },
      {
        icon: 'diamond',
        title: '.NET Core Municipal Services',
        description: 'Scalable microservices architecture built with .NET Core handling specific municipal domains including enforcement management, project tracking, land management, and real-time city monitoring.',
        features: [
          {
            icon: 'api',
            name: '.NET Core Microservices',
            description: 'High-performance microservices built with .NET Core featuring domain-driven design, dependency injection, and comprehensive business logic. Implements CQRS pattern, event sourcing, and cross-cutting concerns for municipal workflows and city management processes.'
          },
          {
            icon: 'c#',
            name: 'C# Programming Language',
            description: 'Primary programming language for backend development providing type safety, performance optimization, and modern language features. Features async/await patterns, LINQ queries, and comprehensive object-oriented programming for robust municipal application development.'
          },
          {
            icon: 'asp.net core',
            name: 'ASP.NET Core Web APIs',
            description: 'RESTful web services and API endpoints for municipal operations, data access, and system integration. Features dependency injection, middleware pipeline, and comprehensive API documentation for seamless frontend-backend communication and third-party integrations.'
          },
          {
            icon: 'entity framework',
            name: 'Entity Framework Core ORM',
            description: 'Object-relational mapping framework for database operations, data modeling, and query optimization. Features Code First approach, migration management, and LINQ integration for efficient data access and municipal database management.'
          },
          {
            icon: 'signalr',
            name: 'SignalR Real-Time Communication',
            description: 'Real-time communication framework for live updates, notifications, and collaborative features. Features WebSocket connections, automatic reconnection, and scalable broadcasting for real-time municipal operations and citizen engagement.'
          },
          {
            icon: 'automapper',
            name: 'AutoMapper Object Mapping',
            description: 'Object-to-object mapping library for clean data transformation between layers and DTOs. Features convention-based mapping, custom resolvers, and performance optimization for efficient data transfer in municipal applications.'
          },
          {
            icon: 'fluentvalidation',
            name: 'FluentValidation Framework',
            description: 'Validation framework for robust data integrity and business rule enforcement. Features fluent syntax, custom validators, and comprehensive error handling for reliable municipal data validation and compliance checking.'
          },
          {
            icon: 'enforcement',
            name: 'Automated Enforcement Systems',
            description: 'Specialized microservices for violation tracking, penalty management, compliance monitoring, and automated enforcement workflows. Includes background job processing, event-driven architecture, and intelligent routing for efficient municipal law enforcement and regulatory compliance.'
          },
          {
            icon: 'project management',
            name: 'Municipal Project Management',
            description: 'Comprehensive project tracking and management system for municipal infrastructure projects, development initiatives, and city improvement programs. Features timeline management, resource allocation, budget tracking, and stakeholder coordination for successful project delivery.'
          },
          {
            icon: 'land management',
            name: 'Property & Land Management',
            description: 'Advanced land management system for property records, ownership tracking, zoning compliance, and development permits. Includes spatial data integration, automated workflows, and comprehensive reporting for efficient municipal land administration and urban planning.'
          },
          {
            icon: 'notification',
            name: 'Multi-Channel City Notifications',
            description: 'Intelligent notification system handling enforcement alerts, project updates, emergency notifications, and public communications. Supports email, SMS, push notifications, and public announcement systems with intelligent routing and delivery tracking for effective city communication.'
          }
        ]
      },
      {
        icon: 'database',
        title: 'Spatial Data Infrastructure',
        description: 'Robust multi-database architecture optimized for municipal operations, spatial data management, and real-time city intelligence processing with SQL Server and PostGIS spatial databases.',
        features: [
          {
            icon: 'sql server',
            name: 'SQL Server Municipal Database',
            description: 'Enterprise-grade relational database storing municipal records, enforcement data, project information, and citizen records. Features high availability, automated backups, and comprehensive data integrity for reliable municipal data management and operational continuity.'
          },
          {
            icon: 'postgis',
            name: 'PostGIS Spatial Database',
            description: 'Advanced spatial database extension providing geospatial data storage, spatial indexing, and complex spatial queries. Features coordinate transformation, spatial analysis functions, and optimized spatial data processing for comprehensive GIS operations and urban planning.'
          },
          {
            icon: 'entity framework',
            name: 'Entity Framework Core Integration',
            description: 'Object-relational mapping framework for seamless database operations, data modeling, and query optimization. Features Code First approach, migration management, and LINQ integration for efficient data access and municipal database management.'
          },
          {
            icon: 'data processing',
            name: 'Real-Time Data Processing',
            description: 'Streaming data processing for IoT sensors, CCTV feeds, and real-time city monitoring. Implements event-driven architecture, data pipelines, and automated analytics for immediate insights into city operations, traffic patterns, and environmental conditions.'
          },
          {
            icon: 'cache',
            name: 'Intelligent Caching Strategy',
            description: 'Multi-layer caching system for frequently accessed spatial data, municipal records, and real-time analytics. Features Redis caching, CDN integration, and intelligent cache invalidation for optimal performance and reduced database load during peak municipal operations.'
          },
          {
            icon: 'data encryption',
            name: 'Data Encryption & Security',
            description: 'Comprehensive data protection with encryption at rest and in transit, secure data transmission, and compliance with municipal data protection regulations. Features SSL/TLS encryption, database encryption, and secure key management for sensitive municipal information.'
          },
          {
            icon: 'backup service',
            name: 'Automated Backup Systems',
            description: 'Comprehensive backup and disaster recovery systems for municipal data protection and business continuity. Features automated daily backups, point-in-time recovery, and off-site data replication for reliable municipal data management and operational resilience.'
          },
          {
            icon: 'monitoring',
            name: 'Database Performance Monitoring',
            description: 'Real-time database monitoring and performance optimization for municipal operations. Features query performance analysis, resource utilization tracking, and automated alerting for database health and performance issues.'
          }
        ]
      },
      {
        icon: 'cctv',
        title: 'Smart City Monitoring Network',
        description: 'Comprehensive monitoring infrastructure including CCTV surveillance, IoT sensors, and real-time analytics for 24/7 city monitoring, security operations, and intelligent urban management.',
        features: [
          {
            icon: 'cctv',
            name: '24/7 CCTV Surveillance System',
            description: 'Advanced video surveillance network with intelligent analytics, motion detection, and automated alert systems. Features high-definition cameras, night vision capabilities, and centralized monitoring for comprehensive city security and traffic management.'
          },
          {
            icon: 'iot sensors',
            name: 'IoT Sensor Network Integration',
            description: 'Comprehensive IoT sensor network monitoring environmental conditions, traffic patterns, air quality, and infrastructure status. Features real-time data collection, predictive analytics, and automated alert systems for proactive city management and environmental protection.'
          },
          {
            icon: 'analytics',
            name: 'Real-Time City Analytics',
            description: 'Advanced analytics platform providing comprehensive insights into city operations, traffic patterns, and citizen behavior. Features machine learning algorithms, predictive modeling, and automated reporting for data-driven decision-making and urban optimization.'
          },
          {
            icon: 'monitoring',
            name: 'Centralized Monitoring Dashboard',
            description: 'Unified monitoring interface providing real-time visibility into all city systems, infrastructure status, and operational metrics. Features customizable dashboards, automated alerts, and comprehensive reporting for efficient city management and emergency response.'
          },
          {
            icon: 'grafana',
            name: 'Grafana Monitoring Platform',
            description: 'Advanced monitoring and observability platform for city infrastructure, system performance, and operational metrics. Features customizable dashboards, real-time alerts, and comprehensive data visualization for proactive city management and system optimization.'
          },
          {
            icon: 'prometheus',
            name: 'Prometheus Metrics Collection',
            description: 'Comprehensive metrics collection and monitoring system for city operations, infrastructure health, and performance tracking. Features time-series data storage, query language, and automated alerting for reliable city monitoring and incident response.'
          },
          {
            icon: 'jwt',
            name: 'JWT Authentication & Security',
            description: 'Secure authentication system using JSON Web Tokens for municipal staff access control and API security. Features token-based authentication, role-based access control, and secure session management for protected city systems and data access.'
          },
          {
            icon: 'oauth',
            name: 'OAuth 2.0 Authorization',
            description: 'Advanced authorization framework for secure API access and third-party integrations. Features secure token exchange, scope-based permissions, and comprehensive security controls for municipal system integrations and external service access.'
          },
          {
            icon: 'ssl',
            name: 'SSL/TLS Security',
            description: 'Comprehensive security implementation with SSL/TLS encryption for all municipal communications and data transmission. Features certificate management, secure protocols, and compliance with municipal security standards for protected city operations.'
          },
          {
            icon: 'docker',
            name: 'Docker Containerization',
            description: 'Containerized deployment strategy for consistent municipal application delivery and scaling. Features container orchestration, automated deployment, and environment consistency for reliable city system operations and maintenance.'
          },
          {
            icon: 'azure devops',
            name: 'Azure DevOps CI/CD',
            description: 'Continuous integration and deployment pipeline for municipal application development and updates. Features automated testing, deployment automation, and version control for efficient city system development and maintenance.'
          },
          {
            icon: 'git',
            name: 'Git Version Control',
            description: 'Comprehensive version control system for municipal application development and collaboration. Features branch management, code review processes, and change tracking for reliable city system development and maintenance workflows.'
          }
        ]
      }
    ])

    // Architecture Benefits
    const architectureBenefits = ref("The PJ Smart City architecture delivers a comprehensive municipal management ecosystem that revolutionizes urban governance through advanced technology integration. Built on .NET Core microservices and powered by SuperMap GIS platform, the system provides unprecedented capabilities for smart city operations. The responsive JavaScript frontend ensures seamless access across all devices, enabling municipal staff to manage city operations from anywhere. The SuperMap GIS integration delivers Big Data GIS processing, 3D city visualization, and Geospatial AI for intelligent urban planning and decision-making. Real-time monitoring through CCTV networks and IoT sensors provides 24/7 city oversight, while automated enforcement systems and project management tools streamline municipal operations. The spatial data infrastructure with PostGIS and SQL Server ensures reliable data management, while the comprehensive notification system keeps all stakeholders informed. This architecture enables data-driven governance, proactive city management, and enhanced citizen services through intelligent automation and real-time insights.")

    // Engineering Challenges
    const engineeringChallenges = ref([
      {
        icon: 'supermap',
        title: 'SuperMap GIS Platform Integration & Big Data Spatial Analytics',
        problem: 'Integrating SuperMap GIS platform with .NET Core backend to leverage Big Data GIS, 3D GIS, and Geospatial AI capabilities while ensuring real-time spatial data processing, advanced analytics, and seamless integration with municipal systems for comprehensive smart city management.',
        solutions: [
          {
            icon: 'supermap',
            name: 'SuperMap Platform Integration',
            description: 'Implemented comprehensive SuperMap GIS platform integration using .NET Core Web APIs with Big Data GIS capabilities, 3D GIS visualization, and Geospatial AI features. Developed custom spatial analysis modules for municipal boundaries, property parcels, and infrastructure assets with advanced geospatial analytics and real-time data processing.'
          },
          {
            icon: 'spatial data',
            name: 'Advanced Spatial Data Processing Engine',
            description: 'Built advanced spatial data processing engine leveraging SuperMap\'s Big Data GIS capabilities with .NET Core services, geospatial indexing, coordinate transformation, and real-time spatial queries. Implemented automated data validation and synchronization between SuperMap platform and SQL Server databases using Entity Framework Core ensuring data accuracy and consistency.'
          },
          {
            icon: 'postgis',
            name: 'PostGIS Spatial Database Integration',
            description: 'Integrated PostGIS spatial database extension with SuperMap platform for advanced geospatial data storage, spatial indexing, and complex spatial queries. Implemented coordinate transformation, spatial analysis functions, and optimized spatial data processing for comprehensive GIS operations and urban planning.'
          },
          {
            icon: 'google maps',
            name: 'Multi-Platform GIS Integration',
            description: 'Seamlessly integrated Google Maps API, Google Street View, and Leaflet mapping libraries with SuperMap platform for enhanced mapping capabilities. Implemented geocoding services, street-level imagery, and comprehensive mapping overlays for municipal operations and citizen services.'
          }
        ]
      },
      {
        icon: 'cctv',
        title: 'Real-time CCTV Monitoring & IoT Integration with .NET Core',
        problem: 'Implementing comprehensive CCTV monitoring network with IoT sensor integration, real-time video streaming using .NET Core SignalR, automated alert systems, and centralized surveillance management for 24/7 city monitoring and security operations.',
        solutions: [
          {
            icon: 'video streaming',
            name: 'Real-time Video Management with SignalR',
            description: 'Developed real-time video streaming system using .NET Core SignalR with multi-camera support, live monitoring dashboards, and automated recording capabilities. Implemented intelligent video analytics for motion detection, traffic monitoring, and security alerts with centralized management interface using ASP.NET Core Web APIs.'
          },
          {
            icon: 'iot sensors',
            name: 'IoT Sensor Integration with .NET Core',
            description: 'Built comprehensive IoT sensor network integration using .NET Core background services with real-time data collection, automated alert systems, and predictive analytics. Implemented sensor data visualization, environmental monitoring, and smart city analytics for proactive municipal management using Entity Framework Core and SQL Server.'
          },
          {
            icon: 'grafana',
            name: 'Advanced Monitoring with Grafana & Prometheus',
            description: 'Implemented comprehensive monitoring infrastructure using Grafana dashboards and Prometheus metrics collection for city infrastructure, system performance, and operational metrics. Features real-time alerts, customizable dashboards, and automated incident response for proactive city management.'
          },
          {
            icon: 'analytics',
            name: 'Real-Time Analytics & Machine Learning',
            description: 'Developed advanced analytics platform with machine learning algorithms for city operations, traffic patterns, and citizen behavior analysis. Implemented predictive modeling, automated reporting, and data-driven decision-making tools for urban optimization and smart city management.'
          }
        ]
      },
      {
        icon: 'enforcement',
        title: 'Municipal Enforcement & Compliance Management with .NET Core',
        problem: 'Developing automated enforcement systems using .NET Core with violation tracking, penalty management, compliance monitoring, and integration with municipal databases for efficient law enforcement and regulatory compliance across the city.',
        solutions: [
          {
            icon: 'automation',
            name: 'Automated Enforcement Systems with .NET Core',
            description: 'Implemented automated enforcement workflow using .NET Core services with violation detection, penalty calculation, and notification systems. Built comprehensive compliance tracking with automated reporting, violation history, and enforcement analytics for efficient municipal law enforcement using Entity Framework Core and SQL Server.'
          },
          {
            icon: 'compliance',
            name: 'Compliance Management with ASP.NET Core',
            description: 'Developed comprehensive compliance management system using ASP.NET Core Web APIs with automated monitoring, violation tracking, and penalty management. Implemented real-time compliance dashboards, automated notifications, and enforcement reporting for streamlined municipal operations using .NET Core background services.'
          },
          {
            icon: 'fluentvalidation',
            name: 'Advanced Validation & Business Rules',
            description: 'Implemented FluentValidation framework for robust data integrity and business rule enforcement in municipal operations. Features fluent syntax, custom validators, and comprehensive error handling for reliable municipal data validation and compliance checking across all enforcement systems.'
          },
          {
            icon: 'notification',
            name: 'Multi-Channel Notification System',
            description: 'Built intelligent notification system handling enforcement alerts, project updates, emergency notifications, and public communications. Supports email, SMS, push notifications, and public announcement systems with intelligent routing and delivery tracking for effective city communication.'
          }
        ]
      },
      {
        icon: 'realtime',
        title: 'Real-Time Data Synchronization & Performance Optimization',
        problem: 'Ensuring real-time data synchronization across multiple municipal systems, databases, and external APIs while maintaining high performance and data consistency. The system needed to handle concurrent users, process large volumes of spatial data, and maintain sub-second response times for critical municipal operations.',
        solutions: [
          {
            icon: 'signalr',
            name: 'SignalR Real-Time Communication',
            description: 'Implemented SignalR framework for real-time communication, live updates, and collaborative features across municipal systems. Features WebSocket connections, automatic reconnection, and scalable broadcasting for real-time municipal operations and citizen engagement with sub-second latency.'
          },
          {
            icon: 'cache',
            name: 'Intelligent Caching Strategy',
            description: 'Developed multi-layer caching system using Redis for frequently accessed spatial data, municipal records, and real-time analytics. Implemented intelligent cache invalidation, CDN integration, and performance optimization for reduced database load during peak municipal operations.'
          },
          {
            icon: 'entity framework',
            name: 'Optimized Database Operations',
            description: 'Optimized Entity Framework Core queries and database operations for high-performance municipal data access. Implemented connection pooling, query optimization, and automated performance monitoring for efficient data management and system responsiveness.'
          },
          {
            icon: 'automapper',
            name: 'Efficient Data Transformation',
            description: 'Implemented AutoMapper for clean data transformation between layers and DTOs in municipal applications. Features convention-based mapping, custom resolvers, and performance optimization for efficient data transfer and reduced memory usage.'
          }
        ]
      },
      {
        icon: 'security',
        title: 'Comprehensive Security & Data Protection Implementation',
        problem: 'Implementing enterprise-grade security across the entire smart city platform while protecting sensitive citizen data, securing IoT devices, and ensuring secure communication between all system components. Required compliance with municipal data protection regulations and comprehensive security monitoring.',
        solutions: [
          {
            icon: 'jwt',
            name: 'JWT Authentication & Authorization',
            description: 'Implemented secure authentication system using JSON Web Tokens for municipal staff access control and API security. Features token-based authentication, role-based access control, and secure session management for protected city systems and data access.'
          },
          {
            icon: 'oauth',
            name: 'OAuth 2.0 Authorization Framework',
            description: 'Deployed advanced authorization framework for secure API access and third-party integrations. Features secure token exchange, scope-based permissions, and comprehensive security controls for municipal system integrations and external service access.'
          },
          {
            icon: 'ssl',
            name: 'SSL/TLS Security Implementation',
            description: 'Implemented comprehensive security with SSL/TLS encryption for all municipal communications and data transmission. Features certificate management, secure protocols, and compliance with municipal security standards for protected city operations.'
          },
          {
            icon: 'data encryption',
            name: 'Data Encryption & Compliance',
            description: 'Deployed comprehensive data protection with encryption at rest and in transit, secure data transmission, and compliance with municipal data protection regulations. Features database encryption, secure key management, and automated security monitoring for sensitive municipal information.'
          }
        ]
      },
      {
        icon: 'mobile',
        title: 'Cross-Platform Mobile & Responsive Web Development',
        problem: 'Creating a unified user experience across desktop, tablet, and mobile devices for municipal staff while maintaining real-time data synchronization, GIS visualization capabilities, and offline functionality. Required responsive design and progressive web app capabilities for field operations.',
        solutions: [
          {
            icon: 'bootstrap',
            name: 'Bootstrap Responsive Framework',
            description: 'Implemented Bootstrap framework for responsive UI design providing consistent design patterns, grid system, and component library for municipal applications. Features mobile-first responsive design, accessibility compliance, and cross-browser compatibility for seamless user experience.'
          },
          {
            icon: 'jquery',
            name: 'jQuery Enhanced Interactions',
            description: 'Enhanced JavaScript functionality with jQuery for dynamic content updates, AJAX operations, and interactive user interfaces. Features smooth animations, form validation, and asynchronous data loading for responsive municipal portal interactions and real-time updates.'
          },
          {
            icon: 'chart.js',
            name: 'Chart.js Data Visualization',
            description: 'Implemented interactive charts and graphs for municipal analytics, performance metrics, and data visualization. Features real-time chart updates, customizable dashboards, and comprehensive reporting tools for city council decision-making and public transparency.'
          },
          {
            icon: 'leaflet',
            name: 'Leaflet Mobile Mapping',
            description: 'Deployed lightweight mapping library for interactive city maps, property visualization, and spatial data display on mobile devices. Features custom map layers, marker clustering, and real-time location tracking optimized for municipal operations and citizen services.'
          }
        ]
      },
      {
        icon: 'integration',
        title: 'Third-Party API Integration & Data Interoperability',
        problem: 'Integrating with multiple third-party services including Google Maps API, Google Street View, external GIS systems, and municipal databases while handling different data formats, API rate limits, and ensuring data consistency. Required robust integration layer with error handling and system reliability.',
        solutions: [
          {
            icon: 'api',
            name: 'API Gateway & Integration Layer',
            description: 'Built comprehensive API gateway using .NET Core with circuit breaker patterns, retry policies, and data transformation services. Implemented caching strategies for external API calls, automated data validation, and fallback mechanisms for service failures.'
          },
          {
            icon: 'automapper',
            name: 'Data Transformation Services',
            description: 'Implemented AutoMapper for data transformation between external APIs and municipal systems. Features convention-based mapping, custom resolvers, and comprehensive error handling for reliable data integration and format conversion.'
          },
          {
            icon: 'monitoring',
            name: 'Integration Monitoring & Reliability',
            description: 'Deployed comprehensive monitoring for third-party integrations with automated error detection, performance tracking, and reliability metrics. Features automated alerting, service health checks, and incident response procedures for robust integration management.'
          },
          {
            icon: 'backup service',
            name: 'Backup & Disaster Recovery',
            description: 'Implemented comprehensive backup and disaster recovery systems for municipal data protection and business continuity. Features automated daily backups, point-in-time recovery, and off-site data replication for reliable municipal data management.'
          }
        ]
      }
    ])

    // Business Impact Results
    const businessImpactResults = ref("These engineering solutions delivered transformative results for PJ City Council: 40% improvement in enforcement efficiency, 60% reduction in manual processes, comprehensive city monitoring with 24/7 surveillance coverage, and integrated municipal management across all departments. The GIS integration and real-time monitoring capabilities provided enhanced urban planning and efficient city operations for PJ's municipal management.")

    // Performance Stats
    const performanceStats = ref([
      { value: '99.9%', label: 'System Uptime', color: 'green' },
      { value: '< 800ms', label: 'API Response Time', color: 'blue' },
      { value: '24/7', label: 'CCTV Monitoring', color: 'purple' },
      { value: '150+', label: 'IoT Sensors', color: 'orange' },
      { value: '5000+', label: 'Daily Transactions', color: 'teal' },
      { value: '25+', label: 'Municipal Departments', color: 'indigo' },
      { value: '3D GIS', label: 'SuperMap Visualization', color: 'red' },
      { value: 'Big Data', label: 'Spatial Analytics', color: 'yellow' },
      { value: '98.5%', label: 'GIS Data Accuracy', color: 'pink' },
      { value: '100%', label: 'Mobile Coverage', color: 'cyan' }
    ])

    // Performance Charts
    const performanceCharts = ref([
      {
        id: 'smartCityPerformanceChart',
        type: 'doughnut',
        title: 'Smart City System Performance Distribution',
        icon: 'performance',
        width: 'half',
        data: {
          labels: ['SuperMap GIS', 'CCTV Monitoring', 'IoT Sensors', 'Municipal APIs', 'Database', 'Mobile Apps'],
          datasets: [{
            data: [25, 20, 18, 15, 12, 10],
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
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(139, 92, 246, 0.5)',
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: (context) => `${context.label}: ${context.parsed}%`
              }
            }
          },
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1500,
            easing: 'easeInOutQuart'
          },
          cutout: '50%',
          radius: '90%'
        }
      },
      {
        id: 'gisAnalyticsChart',
        type: 'polarArea',
        title: 'SuperMap GIS & Spatial Analytics Performance',
        icon: 'spatial data',
        width: 'half',
        data: {
          labels: ['3D GIS Rendering', 'Big Data Processing', 'Spatial Queries', 'Geospatial AI', 'Data Accuracy'],
          datasets: [{
            data: [95, 92, 88, 90, 98],
            backgroundColor: [
              'rgba(255, 107, 157, 0.7)',
              'rgba(78, 205, 196, 0.7)',
              'rgba(69, 183, 209, 0.7)',
              'rgba(255, 215, 0, 0.7)',
              'rgba(139, 92, 246, 0.7)'
            ],
            borderWidth: 2,
            borderColor: '#ffffff'
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
                pointStyle: 'rect',
                font: { size: 12, weight: '500' },
                color: '#374151',
                boxWidth: 12,
                boxHeight: 12
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(139, 92, 246, 0.5)',
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: (context) => {
                  const label = context.label || 'GIS Feature'
                  const value = context.parsed.r || context.parsed
                  return `${label}: ${value}% performance`
                }
              }
            }
          },
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1500,
            easing: 'easeInOutQuart'
          },
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: { display: false },
              grid: { color: 'rgba(0, 0, 0, 0.1)' }
            }
          }
        }
      },
      {
        id: 'municipalOperationsChart',
        type: 'line',
        title: 'Municipal Operations Performance Trends',
        icon: 'municipal management',
        width: 'half',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Enforcement Cases Processed',
            data: [120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285],
            borderColor: '#4ECDC4',
            backgroundColor: 'rgba(78, 205, 196, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#4ECDC4',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }, {
            label: 'Project Completions',
            data: [8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45],
            borderColor: '#FF6B9D',
            backgroundColor: 'rgba(255, 107, 157, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#FF6B9D',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                font: { size: 12, weight: '500' },
                color: '#374151',
                padding: 20
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(78, 205, 196, 0.5)',
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || 'Metric'
                  const value = context.parsed.y
                  return `${label}: ${value}`
                }
              }
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Month',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
              ticks: { color: '#6B7280', font: { size: 11 } }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Operations Count',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
              ticks: { color: '#6B7280', font: { size: 11 } }
            }
          },
          animation: { duration: 2000, easing: 'easeInOutQuart' }
        }
      },
      {
        id: 'systemLoadChart',
        type: 'bar',
        title: 'Smart City System Load & Performance Metrics',
        icon: 'monitoring',
        width: 'half',
        data: {
          labels: ['API Response (ms)', 'Cache Hit Rate (%)', 'DB Queries/sec', 'Memory Usage (%)', 'CPU Usage (%)', 'Network I/O (MB/s)'],
          datasets: [{
            label: 'Current Performance',
            data: [750, 97.5, 180, 68, 52, 45],
            backgroundColor: [
              'rgba(78, 205, 196, 0.8)',
              'rgba(255, 215, 0, 0.8)',
              'rgba(69, 183, 209, 0.8)',
              'rgba(255, 107, 157, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(34, 197, 94, 0.8)'
            ],
            borderColor: [
              '#4ECDC4',
              '#FFD700',
              '#45B7D1',
              '#FF6B9D',
              '#8B5CF6',
              '#22C55E'
            ],
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false
          }, {
            label: 'Target Performance',
            data: [1000, 95, 200, 80, 70, 50],
            backgroundColor: 'rgba(156, 163, 175, 0.3)',
            borderColor: '#9CA3AF',
            borderWidth: 2,
            borderDash: [5, 5],
            borderRadius: 6,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                font: { size: 12, weight: '500' },
                color: '#374151',
                padding: 20
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(78, 205, 196, 0.5)',
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || 'Metric'
                  const value = context.parsed.y
                  const metric = context.label || ''
                  let unit = ''
                  if (metric.includes('(%)')) unit = '%'
                  else if (metric.includes('(ms)')) unit = 'ms'
                  else if (metric.includes('(MB/s)')) unit = 'MB/s'
                  else if (metric.includes('(/sec)')) unit = '/sec'
                  return `${label}: ${value}${unit}`
                }
              }
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Performance Metrics',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { display: false },
              ticks: { color: '#6B7280', font: { size: 10 }, maxRotation: 45 }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Performance Value',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
              ticks: { color: '#6B7280', font: { size: 11 } },
              beginAtZero: true
            }
          },
          animation: { duration: 1800, easing: 'easeInOutQuart' }
        }
      },
      {
        id: 'cctvMonitoringChart',
        type: 'bar',
        title: 'CCTV & IoT Monitoring System Performance',
        icon: 'cctv',
        width: 'full',
        data: {
          labels: ['CCTV Cameras', 'IoT Sensors', 'Motion Detection', 'Traffic Monitoring', 'Environmental Sensors', 'Security Alerts', 'Data Processing', 'System Uptime'],
          datasets: [{
            label: 'Performance Score (%)',
            data: [98, 95, 92, 88, 90, 85, 93, 99],
            backgroundColor: [
              'rgba(255, 107, 157, 0.8)',
              'rgba(78, 205, 196, 0.8)',
              'rgba(69, 183, 209, 0.8)',
              'rgba(255, 215, 0, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(34, 197, 94, 0.8)',
              'rgba(255, 165, 0, 0.8)',
              'rgba(75, 85, 99, 0.8)'
            ],
            borderColor: [
              '#FF6B9D',
              '#4ECDC4',
              '#45B7D1',
              '#FFD700',
              '#8B5CF6',
              '#22C55E',
              '#FFA500',
              '#4B5563'
            ],
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                font: { size: 12, weight: '500' },
                color: '#374151',
                padding: 20
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(255, 107, 157, 0.5)',
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: (context) => {
                  const label = context.label || 'System'
                  const value = context.parsed.y
                  return `${label}: ${value}% performance`
                }
              }
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Monitoring Systems',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { display: false },
              ticks: { color: '#6B7280', font: { size: 11 } }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Performance Score (%)',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
              ticks: { color: '#6B7280', font: { size: 11 }, callback: function(value) { return value + '%' } },
              beginAtZero: true,
              max: 100
            }
          },
          animation: { duration: 1500, easing: 'easeInOutQuart' }
        }
      },
      {
        id: 'spatialDataProcessingChart',
        type: 'line',
        title: 'Spatial Data Processing & Analytics Trends',
        icon: 'spatial data',
        width: 'half',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Spatial Queries Processed (K)',
            data: [45, 52, 58, 65, 72, 78, 85, 92, 88, 95, 102, 108],
            borderColor: '#4ECDC4',
            backgroundColor: 'rgba(78, 205, 196, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#4ECDC4',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }, {
            label: '3D GIS Renders (K)',
            data: [12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48],
            borderColor: '#FF6B9D',
            backgroundColor: 'rgba(255, 107, 157, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#FF6B9D',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                font: { size: 12, weight: '500' },
                color: '#374151',
                padding: 20
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(78, 205, 196, 0.5)',
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || 'Metric'
                  const value = context.parsed.y
                  return `${label}: ${value}K`
                }
              }
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Month',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
              ticks: { color: '#6B7280', font: { size: 11 } }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Processing Volume (K)',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
              ticks: { color: '#6B7280', font: { size: 11 } }
            }
          },
          animation: { duration: 2000, easing: 'easeInOutQuart' }
        }
      },
      {
        id: 'municipalEfficiencyChart',
        type: 'doughnut',
        title: 'Municipal Operations Efficiency Distribution',
        icon: 'municipal management',
        width: 'half',
        data: {
          labels: ['Enforcement', 'Project Management', 'Land Management', 'CCTV Monitoring', 'GIS Operations', 'IoT Management'],
          datasets: [{
            data: [25, 20, 18, 15, 12, 10],
            backgroundColor: ['#FF6B9D', '#4ECDC4', '#45B7D1', '#FFD700', '#8B5CF6', '#22C55E'],
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
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(255, 107, 157, 0.5)',
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: (context) => `${context.label}: ${context.parsed}%`
              }
            }
          },
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1500,
            easing: 'easeInOutQuart'
          },
          cutout: '50%',
          radius: '90%'
        }
      },
      {
        id: 'userSatisfactionChart',
        type: 'bar',
        title: 'User Satisfaction & Adoption Metrics',
        icon: 'user',
        width: 'half',
        data: {
          labels: ['Mobile App', 'Web Portal', 'GIS Interface', 'CCTV Dashboard', 'IoT Monitoring', 'Reporting Tools'],
          datasets: [{
            label: 'User Satisfaction (1-5)',
            data: [4.8, 4.6, 4.9, 4.7, 4.5, 4.4],
            backgroundColor: [
              'rgba(78, 205, 196, 0.8)',
              'rgba(255, 107, 157, 0.8)',
              'rgba(69, 183, 209, 0.8)',
              'rgba(255, 215, 0, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(34, 197, 94, 0.8)'
            ],
            borderColor: [
              '#4ECDC4',
              '#FF6B9D',
              '#45B7D1',
              '#FFD700',
              '#8B5CF6',
              '#22C55E'
            ],
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                font: { size: 12, weight: '500' },
                color: '#374151',
                padding: 20
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(78, 205, 196, 0.5)',
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: (context) => {
                  const label = context.label || 'System'
                  const value = context.parsed.y
                  return `${label}: ${value}/5 rating`
                }
              }
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'System Components',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { display: false },
              ticks: { color: '#6B7280', font: { size: 11 } }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Satisfaction Rating',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
              ticks: { color: '#6B7280', font: { size: 11 } },
              beginAtZero: true,
              max: 5
            }
          },
          animation: { duration: 1500, easing: 'easeInOutQuart' }
        }
      },
      {
        id: 'realTimeAnalyticsChart',
        type: 'line',
        title: 'Real-Time Analytics & Data Processing',
        icon: 'analytics',
        width: 'full',
        data: {
          labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
          datasets: [{
            label: 'CCTV Data Processing (GB/hour)',
            data: [12, 8, 15, 25, 30, 35, 20],
            borderColor: '#4ECDC4',
            backgroundColor: 'rgba(78, 205, 196, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#4ECDC4',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }, {
            label: 'IoT Sensor Data (MB/hour)',
            data: [45, 35, 55, 75, 85, 95, 60],
            borderColor: '#FF6B9D',
            backgroundColor: 'rgba(255, 107, 157, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#FF6B9D',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }, {
            label: 'GIS Spatial Queries (K/hour)',
            data: [8, 5, 12, 18, 22, 25, 15],
            borderColor: '#8B5CF6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#8B5CF6',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                font: { size: 12, weight: '500' },
                color: '#374151',
                padding: 20
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(78, 205, 196, 0.5)',
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || 'Metric'
                  const value = context.parsed.y
                  return `${label}: ${value}`
                }
              }
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Time of Day',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
              ticks: { color: '#6B7280', font: { size: 11 } }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Data Processing Volume',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
              ticks: { color: '#6B7280', font: { size: 11 } }
            }
          },
          animation: { duration: 2000, easing: 'easeInOutQuart' }
        }
      }
    ])

    // Metrics Framework Data
    const metricsFrameworkData = ref({
      introduction: "The following performance metrics were established as key success indicators for the PJ Smart City project. Each metric was carefully defined, measured, and validated to demonstrate the system's effectiveness in revolutionizing municipal operations and delivering comprehensive smart city capabilities across all integrated systems.",
      metricsCategories: [
        {
          icon: 'performance',
          title: 'System Performance Metrics',
          metrics: [
            {
              icon: 'api',
              name: 'API Response Time Optimization (2.5s → 800ms)',
              measurementMethod: 'End-to-end API response time tracking using .NET Core Application Insights and custom telemetry. Measured from initial municipal staff request through authentication, business logic processing, and response delivery across all microservices.',
              context: 'Critical for municipal operations where staff need instant access to city systems and real-time data. Faster response times enable efficient workflow processing and immediate system interactions for city management.',
              validation: 'Achieved through .NET Core optimization, Redis caching implementation, Entity Framework query optimization, and microservices architecture reducing processing overhead by 68%.'
            },
            {
              icon: 'cache',
              name: 'Cache Hit Rate (97.5%)',
              measurementMethod: 'Redis cache performance monitoring using Azure Cache for Redis metrics. Tracks cache hits vs misses for municipal data, spatial information, and system data across all microservices and integrations.',
              context: 'Essential for high-frequency municipal operations where hundreds of staff require instant access to city data. High cache hit rates reduce database load and improve system responsiveness during peak city operations.',
              validation: 'Implemented intelligent cache invalidation strategies, L1/L2 caching layers, and distributed caching patterns ensuring optimal data retrieval for municipal workflows and city management processes.'
            },
            {
              icon: 'database',
              name: 'Database Query Performance (120ms average)',
              measurementMethod: 'SQL Server and PostGIS query performance monitoring using Query Store and custom telemetry. Tracks execution time for all municipal-related queries including spatial data, enforcement records, and analytics processing.',
              context: 'Critical for maintaining sub-second response times during concurrent municipal operations. Optimized queries ensure smooth staff experience during peak city operations and real-time spatial data access.',
              validation: 'Achieved through Entity Framework optimization, database indexing strategies, connection pooling, and spatial indexing implementation for GIS queries across multi-database architecture.'
            }
          ]
        },
        {
          icon: 'supermap',
          title: 'SuperMap GIS & Spatial Analytics Metrics',
          metrics: [
            {
              icon: 'spatial data',
              name: '3D GIS Rendering Performance (2.1s average)',
              measurementMethod: 'SuperMap GIS platform performance monitoring using custom telemetry and spatial analytics tracking. Monitors 3D city model rendering, spatial query processing, and Big Data GIS operations across all municipal applications.',
              context: 'Essential for urban planning and city visualization where municipal staff depend on real-time 3D city models and spatial analysis. Faster rendering enables efficient city planning and decision-making processes.',
              validation: 'Achieved through SuperMap platform optimization, spatial data indexing, and Big Data GIS processing ensuring optimal performance for comprehensive city visualization and analysis.'
            },
            {
              icon: 'analytics',
              name: 'Spatial Query Performance (450ms average)',
              measurementMethod: 'PostGIS spatial database query monitoring using spatial indexing and custom telemetry. Tracks execution time for complex spatial queries including property boundaries, infrastructure analysis, and urban planning operations.',
              context: 'Critical for municipal GIS operations where spatial analysis drives city planning decisions. Optimized spatial queries ensure efficient property management, infrastructure planning, and urban development processes.',
              validation: 'Implemented through PostGIS spatial indexing, coordinate transformation optimization, and spatial data partitioning ensuring high-performance spatial analytics for comprehensive city management.'
            },
            {
              icon: 'machine learning',
              name: 'Geospatial AI Processing (98% accuracy)',
              measurementMethod: 'SuperMap Geospatial AI model performance tracking with automated accuracy testing and prediction validation. Monitors urban pattern recognition, traffic optimization, and environmental monitoring models.',
              context: 'Essential for intelligent city management where AI-driven insights enable proactive urban planning and optimization. High accuracy enables better strategic planning and operational efficiency.',
              validation: 'Achieved through SuperMap Geospatial AI integration, machine learning pipeline automation, and continuous model training ensuring accurate predictions for smart city operations.'
            }
          ]
        },
        {
          icon: 'municipal management',
          title: 'Municipal Operations Metrics',
          metrics: [
            {
              icon: 'enforcement',
              name: 'Enforcement Response Time (1.5 hours average)',
              measurementMethod: 'End-to-end enforcement workflow tracking from violation report to resolution using custom telemetry and workflow monitoring. Monitors response times across all enforcement categories and municipal zones.',
              context: 'Critical for municipal law enforcement where rapid response ensures effective city management and citizen compliance. Faster response times improve enforcement effectiveness and citizen satisfaction.',
              validation: 'Achieved through automated workflow processing, real-time notification systems, and mobile enforcement tools ensuring efficient violation processing and resolution.'
            },
            {
              icon: 'project management',
              name: 'Project Completion Rate (97%)',
              measurementMethod: 'Municipal project tracking using project management system analytics and completion monitoring. Tracks project delivery timelines, budget adherence, and quality standards across all city initiatives.',
              context: 'Essential for municipal project delivery where successful completion drives city development and citizen benefits. High completion rates ensure effective city infrastructure development and service delivery.',
              validation: 'Implemented through comprehensive project tracking, automated milestone monitoring, and stakeholder coordination ensuring successful delivery of municipal infrastructure projects.'
            },
            {
              icon: 'land management',
              name: 'Land Management Accuracy (98%)',
              measurementMethod: 'Spatial data accuracy validation using GPS verification, survey data comparison, and automated quality checks. Monitors property boundary accuracy, zoning compliance, and land use classification precision.',
              context: 'Critical for municipal land administration where accurate spatial data ensures proper property management and urban planning. High accuracy prevents disputes and enables effective city development.',
              validation: 'Achieved through automated spatial data validation, GPS integration, and continuous quality monitoring ensuring accurate land records and property management.'
            }
          ]
        },
        {
          icon: 'cctv',
          title: 'Smart City Monitoring Metrics',
          metrics: [
            {
              icon: 'cctv',
              name: 'CCTV System Uptime (99.8%)',
              measurementMethod: '24/7 CCTV network monitoring using system health checks and automated alerting. Tracks camera availability, video quality, and monitoring coverage across all municipal zones and critical infrastructure.',
              context: 'Mission-critical for city security and traffic management where continuous monitoring ensures public safety and efficient traffic flow. High uptime enables comprehensive city surveillance and incident response.',
              validation: 'Achieved through redundant network infrastructure, automated failover mechanisms, and proactive maintenance ensuring continuous city monitoring and security coverage.'
            },
            {
              icon: 'iot sensors',
              name: 'IoT Sensor Data Processing (95% success rate)',
              measurementMethod: 'IoT sensor network monitoring using real-time data collection and processing analytics. Tracks sensor connectivity, data transmission, and environmental monitoring across all municipal IoT devices.',
              context: 'Essential for smart city operations where IoT data drives environmental monitoring and infrastructure management. High success rates ensure reliable city intelligence and proactive maintenance.',
              validation: 'Implemented through robust IoT infrastructure, automated data validation, and comprehensive sensor monitoring ensuring reliable environmental and infrastructure data collection.'
            },
            {
              icon: 'analytics',
              name: 'Real-Time Analytics Processing (5,000+ events/hour)',
              measurementMethod: 'Real-time data processing monitoring using stream analytics and event processing metrics. Tracks data ingestion, analysis, and alert generation across all smart city systems and sensors.',
              context: 'Critical for intelligent city management where real-time insights enable proactive decision-making and automated responses. High processing rates ensure comprehensive city intelligence.',
              validation: 'Achieved through stream processing optimization, machine learning integration, and automated analytics ensuring continuous city intelligence and operational insights.'
            }
          ]
        },
        {
          icon: 'user experience',
          title: 'User Experience & Adoption Metrics',
          metrics: [
            {
              icon: 'user',
              name: 'Municipal Staff Satisfaction (4.8/5.0)',
              measurementMethod: 'Quarterly staff satisfaction surveys and real-time feedback collection through the smart city portal. Tracks user experience ratings, feature satisfaction, and overall platform usability.',
              context: 'Essential for measuring the success of the smart city platform from a municipal staff perspective. High satisfaction scores indicate successful adoption and positive impact on city operations.',
              validation: 'Validated through comprehensive user research, feedback analysis, and comparison with previous city management systems showing significant improvement in staff satisfaction.'
            },
            {
              icon: 'mobile',
              name: 'Mobile Usage (85%)',
              measurementMethod: 'Device analytics tracking mobile vs desktop usage patterns through application telemetry and user agent analysis. Monitors platform usage across different devices and screen sizes.',
              context: 'Reflects the mobile-first nature of municipal operations where staff need on-the-go access to city systems. High mobile usage indicates successful responsive design implementation.',
              validation: 'Achieved through progressive web app implementation, mobile-optimized interface design, and touch-friendly workflows optimized for smartphone usage patterns.'
            },
            {
              icon: 'training',
              name: 'Training Completion Time (2 hours)',
              measurementMethod: 'User onboarding tracking from system access to full proficiency using application telemetry and training analytics. Measures total time required for complete system training and adoption.',
              context: 'Critical for municipal staff efficiency where quick training enables rapid system adoption and operational effectiveness. Faster training reduces implementation costs and improves productivity.',
              validation: 'Optimized through intuitive user interface design, comprehensive documentation, and interactive training modules reducing learning curve and improving staff productivity.'
            }
          ]
        }
      ],
      frameworkItems: [
        {
          icon: 'measurement',
          title: 'Baseline Establishment',
          description: 'Established performance baselines using historical municipal operations data and manual city management processes before Smart City implementation to ensure accurate improvement tracking and ROI measurement across all integrated systems.'
        },
        {
          icon: 'monitoring',
          title: 'Real-Time Monitoring',
          description: 'Implemented comprehensive monitoring using .NET Core Application Insights, SuperMap analytics, and automated alerting to track all Smart City metrics continuously throughout the system lifecycle with proactive issue detection.'
        },
        {
          icon: 'validation',
          title: 'Data Validation',
          description: 'Established data validation protocols ensuring accuracy of municipal metrics, spatial data calculations, and staff satisfaction measurements through automated verification and manual audit processes across all city systems.'
        },
        {
          icon: 'analytics',
          title: 'Continuous Optimization',
          description: 'Implemented continuous improvement processes using real-time analytics, A/B testing, and staff feedback to optimize Smart City performance and enhance municipal operations continuously across all departments.'
        }
      ]
    })

    // ROI Section Data
    const roiLeftItems = ref([
      { label: "Annual Cost Savings", value: "$2.8M+" },
      { label: "Operational Efficiency Gain", value: "65%" },
      { label: "Manual Processing Reduction", value: "80%" },
      { label: "ROI on Development Investment", value: "280%" },
      { label: "Payback Period", value: "5.2 months" }
    ])

    const roiRightItems = ref([
      { label: "Municipal Staff Productivity Growth", value: "+70%" },
      { label: "System Integration Success", value: "25+ departments unified" },
      { label: "Spatial Data Processing Speed", value: "5,000+ queries/hour" },
      { label: "Smart City Platform Adoption", value: "95%" },
      { label: "Support Ticket Reduction", value: "-75%" }
    ])

    const roiMetrics = ref([
      { value: "500+", label: "Active Municipal Staff", color: "green" },
      { value: "3x Growth", label: "Platform Adoption", color: "purple" },
      { value: "$2.8M+", label: "Business Value Created", color: "pink" },
      { value: "5x Capacity", label: "System Scalability", color: "cyan" }
    ])

    return {
      // Data
      projectData,
      galleryData,
      projectOverviewData,
      technologies,
      smartCityNarrationSteps,
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
/* Smart City specific styles can be added here if needed */
</style>

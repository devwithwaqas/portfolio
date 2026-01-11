<template>
  <ProjectPageTemplate projectTitle="BAT Inhouse App">
    
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
        :category="PROJECT_CATEGORIES.ENTERPRISE_APPLICATIONS"
        client="British American Tobacco (BAT)"
        projectDate="2020-2021"
        projectUrl="https://bat.com"
        companySize="Large Enterprise"
      />
    </template>
    
    <!-- Main Content Bottom -->
    <template #main-content-bottom>
      
      <!-- C4 Architecture Diagram -->
      <DiagramViewer 
        title="C4 Architecture Diagram"
        :icon-name="PROJECT_ICON_NAMES.ARCHITECTURE_OVERVIEW"
        diagram-src="/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg"
        :narration-steps="batNarrationSteps"
        :svg-width="27681"
        :svg-height="11856"
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
        mainTitle="BAT Business Impact & Growth Metrics"
        :mainIcon="ROI_ICON_NAMES.MAIN_ICON"
        leftTitle="Financial Growth Impact"
        :leftIcon="ROI_ICON_NAMES.FINANCIAL_ICON"
        rightTitle="Operational Growth Impact"
        :rightIcon="ROI_ICON_NAMES.OPERATIONAL_ICON"
        metricsTitle="BAT Growth Success Metrics"
        :metricsIcon="ROI_ICON_NAMES.SUCCESS_ICON"
        :leftItems="roiLeftItems"
        :rightItems="roiRightItems"
        :metrics="roiMetrics"
      />
      
    </template>
    
  </ProjectPageTemplate>
</template>

<script>
import ProjectPageTemplate from '../../components/common/ProjectPageTemplate.vue'
import ProjectHeroCard from '../../components/projects/ProjectHeroCard.vue'
import ProjectGallery from '../../components/projects/ProjectGallery.vue'
import ProjectOverview from '../../components/projects/ProjectOverview.vue'
import TechnologyStack from '../../components/projects/TechnologyStack.vue'
import ProjectInfo from '../../components/projects/ProjectInfo.vue'
import ArchitectureOverview from '../../components/projects/ArchitectureOverview.vue'
import DiagramViewer from '../../components/projects/DiagramViewer.vue'
import EngineeringChallenges from '../../components/projects/EngineeringChallenges.vue'
import PerformanceMetricsSection from '../../components/projects/PerformanceMetricsSection.vue'
import MetricsFramework from '../../components/projects/MetricsFramework.vue'
import ROISection from '../../components/projects/ROISection.vue'

// ⚠️ CRITICAL: Import constants
import { 
  PROJECT_ICON_NAMES, 
  PROJECT_CATEGORIES, 
  TECH_CATEGORIES, 
  ROI_ICON_NAMES 
} from '../../config/constants.js'

// Import narration steps
import { batNarrationSteps } from '../../config/batNarration.js'

export default {
  name: 'BATInhouseAppPage',
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
  data() {
    return {
      // ⚠️ CRITICAL: Expose constants for template access
      PROJECT_ICON_NAMES,
      PROJECT_CATEGORIES,
      TECH_CATEGORIES,
      ROI_ICON_NAMES,
      
      // Diagram narration steps
      batNarrationSteps,
      
      projectData: {
        title: "BAT Inhouse App",
        description: "A comprehensive enterprise application - a microservices platform for British American Tobacco. This project integrates 8+ enterprise systems including SAP Planet 8/9, Cherwell HR/IT, Power Apps, SharePoint, analytics platforms, and data lake solutions. Built on Azure Service Fabric with Azure API Gateway, ARM templates, security certificates, multi-database architecture (Azure SQL + Cosmos DB), and Azure Notification Hub for real-time communications. Features real-time processing, enterprise-grade security, advanced analytics capabilities, and comprehensive notification systems.",
        tags: ["Enterprise Application", "Microservices", "Azure Service Fabric", "SAP Integration", "Enterprise Architecture", "Large Scale Project"],
        achievementsCol1: [
          { emoji: "enterprise", label: "Project Scale", value: "Large enterprise project" },
          { emoji: "architecture", label: "System Integrations", value: "8+ enterprise systems" },
          { emoji: "analytics", label: "Data Processing", value: "5M+ records/hour" }
        ],
        achievementsCol2: [
          { emoji: "security", label: "Security Level", value: "Enterprise-grade" },
          { emoji: "scalability", label: "Architecture", value: "Azure Service Fabric" },
          { emoji: "performance", label: "System Uptime", value: "99.9% availability" }
        ]
      },
      galleryData: {
        title: "BAT Inhouse App Gallery",
        projectName: "BAT Inhouse App",
        images: [
          "/assets/img/bat1.jpg",
          "/assets/img/bat2.jpg",
          "/assets/img/bat3.jpg",
          "/assets/img/bat4.jpg"
        ]
      },
      projectOverviewData: {
        description: "The BAT Inhouse App represents a comprehensive enterprise application - a microservices platform that streamlines British American Tobacco's internal operations. This enterprise system integrates 8+ different enterprise systems, providing unified access to HR, IT, analytics, and business intelligence across the entire organization.\n\n\n\nThe Challenge:\nBritish American Tobacco needed a unified platform to integrate their fragmented enterprise systems including SAP Planet 8/9, Cherwell HR/IT, Power Apps, SharePoint, and various analytics platforms. The organization faced significant challenges with data silos, inconsistent user experiences, and the need for real-time business intelligence across multiple departments. They required a solution that could handle enterprise-scale operations while maintaining security, performance, and reliability.\n\n\n\nThe Solution:\nThe BAT Inhouse App leverages Azure Service Fabric microservices architecture to create a unified enterprise platform. The system integrates all existing enterprise systems through a state-of-the-art Azure API Gateway with ARM templates, security certificates, and advanced routing capabilities. Built with .NET Core and featuring multi-database architecture (Azure SQL + Cosmos DB), the platform provides real-time data synchronization and comprehensive analytics capabilities.\n\n\n\nKey Features:\n• Enterprise System Integration: Seamless integration with SAP Planet 8/9, Cherwell HR/IT, Power Apps, and SharePoint\n• State-of-the-Art API Gateway: Azure API Gateway with ARM templates, security certificates, and advanced routing\n• Microservices Architecture: Azure Service Fabric orchestration for independent scaling and reliability\n• Multi-Database Architecture: Azure SQL for transactional data and Cosmos DB for document storage\n• Real-Time Analytics: Comprehensive analytics platform with data lake integration for business intelligence\n• Enterprise Security: OAuth 2.0, JWT tokens, role-based access control, and comprehensive audit logging\n• Advanced Monitoring: Real-time system monitoring with performance metrics and health checks\n• Notification Systems: Azure Notification Hub for real-time push notifications, email, SMS, and Teams alerts\n\n\n\nTechnical Architecture:\nThe system employs a microservices architecture with Azure Service Fabric hosting, multi-database architecture (Azure SQL + Cosmos DB), and comprehensive third-party integrations. The CI/CD pipeline, built with Azure DevOps and ARM templates, ensures zero-downtime deployments and continuous integration of new features. The platform features advanced security with enterprise-grade authentication and authorization.\n\n\n\nBusiness Impact:\nThis revolutionary platform has transformed BAT's approach to enterprise system management, creating a unified experience where employees can access all necessary systems through a single interface. The integrated analytics platform provides real-time business intelligence, while the automated data synchronization has reduced manual processing by 70%. The platform handles 5M+ records per hour with 99.9% uptime, serving thousands of employees across multiple departments."
      },
      technologies: [
        // Backend Framework & Core Technologies
        { name: ".NET Core", description: "Enterprise-grade web framework", category: TECH_CATEGORIES.BACKEND },
        { name: "C#", description: "Primary programming language for enterprise development", category: TECH_CATEGORIES.BACKEND },
        { name: "Entity Framework", description: "ORM for data access with advanced querying", category: TECH_CATEGORIES.BACKEND },
        { name: "Task Parallel Library", description: "TPL for parallel processing and async operations", category: TECH_CATEGORIES.BACKEND },
        { name: "Azure Service Fabric", description: "Microservices orchestration platform", category: TECH_CATEGORIES.BACKEND },
        
        // Database & Storage
        { name: "Azure SQL Database", description: "Enterprise cloud database with optimized indexing", category: TECH_CATEGORIES.DATABASE },
        { name: "Azure Cosmos DB", description: "Globally distributed NoSQL database", category: TECH_CATEGORIES.DATABASE },
        { name: "Redis", description: "In-memory caching with 98% hit rate", category: TECH_CATEGORIES.DATABASE },
        { name: "Azure Data Lake", description: "Scalable data storage for analytics", category: TECH_CATEGORIES.DATABASE },
        
        // Authentication & Security
        { name: "OAuth 2.0", description: "Enterprise authentication protocol", category: TECH_CATEGORIES.SECURITY },
        { name: "JWT", description: "JSON Web Tokens for secure API access", category: TECH_CATEGORIES.SECURITY },
        { name: "Azure Active Directory", description: "Enterprise identity and access management", category: TECH_CATEGORIES.SECURITY },
        { name: "Security Certificates", description: "SSL/TLS certificates for secure communication", category: TECH_CATEGORIES.SECURITY },
        
        // Azure Services & Cloud
        { name: "Azure API Gateway", description: "API management with ARM templates", category: TECH_CATEGORIES.CLOUD },
        { name: "Azure Service Bus", description: "Message queuing for high-throughput processing", category: TECH_CATEGORIES.CLOUD },
        { name: "Azure App Service", description: "Cloud hosting platform for microservices", category: TECH_CATEGORIES.CLOUD },
        { name: "Azure Functions", description: "Serverless compute for event-driven processing", category: TECH_CATEGORIES.CLOUD },
        { name: "Azure Event Grid", description: "Event-driven architecture for real-time processing", category: TECH_CATEGORIES.CLOUD },
        { name: "Azure Stream Analytics", description: "Real-time data stream processing", category: TECH_CATEGORIES.CLOUD },
        { name: "Docker", description: "Containerization for microservices", category: TECH_CATEGORIES.CLOUD },
        
        // CI/CD & DevOps
        { name: "Azure DevOps", description: "CI/CD pipeline and deployment automation", category: TECH_CATEGORIES.DEVOPS },
        { name: "ARM Templates", description: "Infrastructure as Code for Azure resources", category: TECH_CATEGORIES.DEVOPS },
        { name: "Git", description: "Version control and collaboration", category: TECH_CATEGORIES.DEVOPS },
        { name: "Azure Resource Manager", description: "Azure resource management and deployment", category: TECH_CATEGORIES.DEVOPS },
        
        // Monitoring & Analytics
        { name: "Azure Application Insights", description: "Advanced monitoring with anomaly detection", category: TECH_CATEGORIES.MONITORING },
        { name: "Azure Monitor", description: "Comprehensive monitoring and alerting", category: TECH_CATEGORIES.MONITORING },
        { name: "Azure Log Analytics", description: "Centralized logging and analysis", category: TECH_CATEGORIES.MONITORING },
        { name: "Machine Learning", description: "ML models for business intelligence and predictions", category: TECH_CATEGORIES.ANALYTICS },
        { name: "Power BI", description: "Business intelligence and data visualization", category: TECH_CATEGORIES.ANALYTICS },
        
        // APIs & Integration
        { name: "REST API", description: "RESTful API architecture for microservices", category: TECH_CATEGORIES.API },
        { name: "Swagger", description: "API documentation and testing", category: TECH_CATEGORIES.API },
        { name: "Azure API Management", description: "API gateway and management platform", category: TECH_CATEGORIES.API },
        { name: "GraphQL", description: "Query language for APIs", category: TECH_CATEGORIES.API },
        
        // Frontend & UI
        { name: "Angular", description: "Frontend framework for enterprise applications", category: TECH_CATEGORIES.FRONTEND },
        { name: "TypeScript", description: "Type-safe JavaScript for Angular development", category: TECH_CATEGORIES.FRONTEND },
        { name: "Angular Material", description: "UI component library for Angular", category: TECH_CATEGORIES.FRONTEND },
        { name: "Responsive Design", description: "Mobile-first responsive interface", category: TECH_CATEGORIES.FRONTEND },
        { name: "SignalR", description: "Real-time web functionality", category: TECH_CATEGORIES.FRONTEND },
        
        // Enterprise System Integrations
        { name: "SAP Planet 8/9", description: "SAP enterprise resource planning integration", category: TECH_CATEGORIES.INTEGRATION },
        { name: "Cherwell HR", description: "Human resources management system integration", category: TECH_CATEGORIES.INTEGRATION },
        { name: "Cherwell IT", description: "IT service management system integration", category: TECH_CATEGORIES.INTEGRATION },
        { name: "Power Apps", description: "Microsoft Power Platform integration", category: TECH_CATEGORIES.INTEGRATION },
        { name: "Microsoft SharePoint", description: "Document management and collaboration platform", category: TECH_CATEGORIES.INTEGRATION },
        { name: "Microsoft Teams", description: "Communication and collaboration integration", category: TECH_CATEGORIES.INTEGRATION },
        
        // Communication & Notifications
        { name: "Email Notifications", description: "Automated email alerts and communications", category: TECH_CATEGORIES.COMMUNICATION },
        { name: "Teams Notifications", description: "Microsoft Teams integration for notifications", category: TECH_CATEGORIES.COMMUNICATION },
        { name: "Push Notifications", description: "Mobile push notifications", category: TECH_CATEGORIES.COMMUNICATION },
        { name: "SMS Notifications", description: "Automated SMS alerts", category: TECH_CATEGORIES.COMMUNICATION },
        
        // Data Processing & Analytics
        { name: "Azure Data Factory", description: "Data integration and ETL services", category: TECH_CATEGORIES.DATA },
        { name: "Azure Synapse Analytics", description: "Enterprise data warehouse and analytics", category: TECH_CATEGORIES.DATA },
        { name: "Azure Event Hubs", description: "Big data streaming and event ingestion", category: TECH_CATEGORIES.DATA },
        { name: "Azure Notification Hub", description: "Push notification service for mobile and web", category: TECH_CATEGORIES.COMMUNICATION }
      ],
      // ROI Section Data
      roiLeftItems: [
        { label: "Annual Cost Savings", value: "$5.2M+" },
        { label: "Operational Efficiency Gain", value: "70%" },
        { label: "Manual Processing Reduction", value: "75%" },
        { label: "ROI on Development Investment", value: "340%" },
        { label: "Payback Period", value: "4.2 months" }
      ],
      roiRightItems: [
        { label: "Employee Productivity Growth", value: "+65%" },
        { label: "System Integration Success", value: "8+ systems unified" },
        { label: "Data Processing Speed", value: "5M+ records/hour" },
        { label: "Business Intelligence Adoption", value: "87%" },
        { label: "Support Ticket Reduction", value: "-70%" }
      ],
      roiMetrics: [
        { value: "5,000+", label: "Active Employees", color: "green" },
        { value: "8+ Systems", label: "Enterprise Integrations", color: "purple" },
        { value: "$5.2M+", label: "Annual Savings", color: "pink" },
        { value: "99.9%", label: "System Uptime", color: "cyan" }
      ],
      
      // Architecture Overview Data
      architectureLayers: [
        {
          icon: 'diamond',
          title: 'Enterprise Frontend Portal',
          description: 'Modern Angular-based enterprise portal providing BAT employees with unified access to all internal systems, HR services, IT support, and business intelligence across all devices and departments.',
          features: [
            {
              icon: 'web',
              name: 'Angular Enterprise Portal',
              description: 'Comprehensive web application built with Angular and TypeScript featuring unified dashboard, role-based access control, and real-time data synchronization. Includes OAuth 2.0 authentication, multi-tenant support, and personalized user experiences for different BAT departments and employee levels.'
            },
            {
              icon: 'mobile',
              name: 'Mobile-First Enterprise Design',
              description: 'Optimized mobile experience ensuring employees can access all BAT systems on-the-go. Features touch-friendly interfaces, offline capability for critical functions, and push notifications for important updates, approvals, and system alerts across all mobile devices.'
            },
            {
              icon: 'realtime',
              name: 'Real-Time Data Synchronization',
              description: 'Live data updates across all integrated systems, instant notifications for approvals and workflows, and real-time collaboration features. Supports thousands of concurrent employees with efficient WebSocket connections and automatic reconnection for critical business operations.'
            },
            {
              icon: 'user experience',
              name: 'Progressive Web App',
              description: 'PWA implementation enabling offline access to critical business functions, push notifications for approvals and alerts, and app-like experience across all devices. Features service workers, background sync, and responsive design optimized for enterprise usage patterns.'
            }
          ]
        },
        {
          icon: 'diamond',
          title: 'Azure API Gateway & Management',
          description: 'Azure API Gateway with ARM templates, security certificates, and advanced routing capabilities providing enterprise-grade API management and microservices orchestration.',
          features: [
            {
              icon: 'api',
              name: 'Azure API Gateway',
              description: 'Enterprise-grade API gateway with ARM templates for infrastructure as code, security certificates for compliance, and advanced routing for microservices orchestration. Includes rate limiting, request transformation, and comprehensive API versioning for seamless integration.'
            },
            {
              icon: 'load balancing',
              name: 'Intelligent Load Balancing',
              description: 'Advanced traffic distribution across multiple service instances with health checks and circuit breaker patterns. Ensures 99.9% uptime during peak operations and automatic failover for critical business processes with enterprise-scale reliability.'
            },
            {
              icon: 'security',
              name: 'Enterprise Security Framework',
              description: 'End-to-end security with OAuth 2.0, JWT tokens, and Azure Active Directory integration. Implements comprehensive security headers, audit logging, and threat protection ensuring enterprise-grade security for all API communications and data access.'
            },
            {
              icon: 'monitoring',
              name: 'API Analytics & Monitoring',
              description: 'Comprehensive API monitoring with real-time metrics, performance tracking, and usage analytics. Features request/response logging, error tracking, and automated alerting for API performance degradation and security incidents across all integrated systems.'
            }
          ]
        },
        {
          icon: 'diamond',
          title: 'Azure Service Fabric Microservices',
          description: 'Scalable microservices architecture orchestrated by Azure Service Fabric handling specific business domains including HR management, IT services, analytics processing, and enterprise system integrations.',
          features: [
            {
              icon: 'api',
              name: '.NET Core Microservices',
              description: 'High-performance microservices built with .NET Core featuring domain-driven design, dependency injection, and comprehensive business logic. Implements CQRS pattern, event sourcing, and cross-cutting concerns for enterprise workflows and business processes.'
            },
            {
              icon: 'data processing',
              name: 'Business Domain Services',
              description: 'Specialized microservices for HR management, IT support, analytics processing, and enterprise integrations. Includes background job processing, event-driven architecture, and machine learning for business intelligence and operational optimization.'
            },
            {
              icon: 'saga orchestrator',
              name: 'Saga Pattern Implementation',
              description: 'Distributed transaction management using Saga pattern for coordinating complex business workflows across multiple microservices. Implements choreography-based sagas for autonomous service coordination and orchestration-based sagas for centralized workflow management ensuring data consistency and business process integrity.'
            },
            {
              icon: 'integration',
              name: 'Enterprise System Integration',
              description: 'Comprehensive integration layer handling SAP Planet 8/9, Cherwell HR/IT, Power Apps, SharePoint, and Microsoft Teams connectivity. Features service discovery, API management, and event processing for seamless enterprise system integration.'
            },
            {
              icon: 'analytics',
              name: 'Business Intelligence Engine',
              description: 'Advanced analytics platform providing comprehensive reporting on business operations, employee productivity, and system performance. Includes custom dashboards, real-time alerts, and comprehensive analytics for strategic decision-making.'
            },
            {
              icon: 'notification',
              name: 'Multi-Channel Notification Service',
              description: 'Intelligent notification system handling approvals, alerts, and system notifications. Supports email, SMS, Teams, and push notifications with intelligent routing, delivery tracking, and fallback mechanisms for critical business communications.'
            }
          ]
        },
        {
          icon: 'diamond',
          title: 'Multi-Database Data Infrastructure',
          description: 'Robust multi-database architecture optimized for enterprise operations, employee data management, and real-time business intelligence processing with Azure SQL and Cosmos DB.',
          features: [
            {
              icon: 'azure sql database',
              name: 'Azure SQL Database',
              description: 'Enterprise cloud database providing secure storage for employee information, business transactions, and operational data. Features automated backups, high availability, and advanced indexing for optimal query performance during peak business operations.'
            },
            {
              icon: 'azure cosmos db',
              name: 'Azure Cosmos DB',
              description: 'Globally distributed NoSQL database for document storage, real-time analytics, and business intelligence data. Implements intelligent partitioning, global distribution, and comprehensive data consistency for enterprise-scale operations.'
            },
            {
              icon: 'redis',
              name: 'Redis Cache Layer',
              description: 'High-performance in-memory caching system providing ultra-fast access to employee data, business metrics, and system information. Implements intelligent cache invalidation and distributed caching for improved system performance and reduced database load.'
            },
            {
              icon: 'data processing',
              name: 'Entity Framework Core',
              description: 'Modern ORM framework providing efficient data access patterns, query optimization, and database abstraction. Features code-first migrations, lazy loading, and comprehensive data validation for enterprise operations and business transactions.'
            },
            {
              icon: 'backup',
              name: 'Automated Backup & Recovery',
              description: 'Comprehensive backup strategy with automated daily backups, point-in-time recovery, and disaster recovery procedures. Implements geo-redundant storage, automated failover, and 99.9% data availability with RTO of 15 minutes and RPO of 5 minutes for critical business data.'
            }
          ]
        },
        {
          icon: 'diamond',
          title: 'Enterprise System Integrations',
          description: 'Comprehensive integration layer managing real-time data synchronization with 8+ enterprise systems, event-driven processing, and advanced API management for seamless business operations.',
          features: [
            {
              icon: 'sap',
              name: 'SAP Planet 8/9 Integration',
              description: 'Seamless integration with SAP enterprise resource planning systems providing real-time data synchronization, employee information management, and business process automation. Features custom connectors, data transformation, and comprehensive error handling for enterprise operations.'
            },
            {
              icon: 'cherwell',
              name: 'Cherwell HR/IT Integration',
              description: 'Comprehensive integration with Cherwell IT Service Management and HR systems providing automated ticket management, employee onboarding, and IT service delivery. Includes workflow automation, approval processes, and real-time status updates.'
            },
            {
              icon: 'power apps',
              name: 'Microsoft Power Platform Integration',
              description: 'Integration with Microsoft Power Apps, Power BI, and Power Automate providing low-code business applications, advanced analytics, and workflow automation. Features custom connectors, data synchronization, and comprehensive business intelligence capabilities.'
            },
            {
              icon: 'sharepoint',
              name: 'Microsoft SharePoint Integration',
              description: 'Document management and collaboration platform integration providing centralized document storage, version control, and team collaboration features. Includes automated workflows, approval processes, and comprehensive content management capabilities.'
            }
          ]
        },
        {
          icon: 'diamond',
          title: 'Analytics & Data Lake Platform',
          description: 'Comprehensive analytics platform with Azure Data Lake integration, real-time data processing, and advanced business intelligence capabilities for enterprise decision-making and operational optimization.',
          features: [
            {
              icon: 'azure data lake',
              name: 'Azure Data Lake Storage',
              description: 'Scalable data storage solution for enterprise analytics, business intelligence, and machine learning workloads. Features hierarchical namespace, security integration, and comprehensive data governance for enterprise-scale analytics operations.'
            },
            {
              icon: 'analytics',
              name: 'Real-Time Analytics Engine',
              description: 'Advanced analytics platform providing real-time business intelligence, predictive analytics, and operational insights. Includes machine learning models, data visualization, and comprehensive reporting for strategic decision-making and business optimization.'
            },
            {
              icon: 'power bi',
              name: 'Power BI Integration',
              description: 'Comprehensive business intelligence integration providing interactive dashboards, advanced analytics, and data visualization. Features automated report generation, real-time data connections, and comprehensive business intelligence capabilities.'
            },
            {
              icon: 'machine learning',
              name: 'Machine Learning Platform',
              description: 'AI-powered analytics system for business pattern prediction, demand forecasting, and operational optimization. Provides comprehensive insights with custom models, predictive analytics, and powerful machine learning capabilities for business intelligence.'
            }
          ]
        },
        {
          icon: 'diamond',
          title: 'Security & Compliance Framework',
          description: 'Enterprise-grade security infrastructure ensuring comprehensive protection of employee data, business transactions, and system integrity with multi-layered defense mechanisms and regulatory compliance.',
          features: [
            {
              icon: 'oauth',
              name: 'OAuth 2.0 Authentication',
              description: 'Enterprise authentication system supporting thousands of BAT employees across multiple departments and locations. Implements OAuth 2.0, OpenID Connect, JWT tokens with secure expiry, refresh token rotation, and MFA support for enhanced security.'
            },
            {
              icon: 'security',
              name: 'Advanced Threat Protection',
              description: 'Comprehensive security framework with Azure Security Center, threat detection, and audit logging. Implements OWASP Top 10 protection, SQL injection prevention, XSS filtering, and network security groups with least-privilege access for enterprise data protection.'
            },
            {
              icon: 'data encryption',
              name: 'End-to-End Encryption',
              description: 'AES-256 encryption for data at rest in Azure SQL Database and Azure Storage. TLS 1.3 for all data in transit with certificate pinning. Field-level encryption for sensitive employee data (PII) using Azure Key Vault with automatic key rotation every 90 days.'
            },
            {
              icon: 'compliance',
              name: 'Enterprise Compliance',
              description: 'Comprehensive compliance framework supporting GDPR, enterprise regulations, and industry standards. Implements data residency controls, consent management system, automated compliance reporting, and 7-year audit log retention for regulatory adherence.'
            }
          ]
        }
      ],
      architectureBenefits: "The BAT Inhouse App architecture delivers a high-performance, scalable platform that processes 5M+ records per hour with 99.9% uptime, integrates 8+ enterprise systems in real-time, and provides BAT employees with unified access to all internal systems through a single interface. The system handles enterprise-scale operations while maintaining security, performance, and reliability. The architecture supports thousands of employees across multiple departments with comprehensive integrations, real-time analytics, and advanced threat protection ensuring mission-critical reliability for BAT's enterprise operations.",
      
      // Engineering Challenges Data
      engineeringChallenges: [
        {
          icon: 'integration',
          title: 'Complex Enterprise System Integration with Saga Pattern',
          problem: 'Integrating 8+ different enterprise systems including SAP Planet 8/9, Cherwell HR/IT, Power Apps, SharePoint, and Microsoft Teams while maintaining data consistency, real-time synchronization, and business process integrity across distributed microservices architecture with zero data loss and 99.9% reliability.',
          solutions: [
            {
              icon: 'saga orchestrator',
              name: 'Saga Pattern Implementation',
              description: 'Implemented comprehensive Saga pattern for distributed transaction management across microservices. Developed both choreography-based sagas for autonomous service coordination and orchestration-based sagas for centralized workflow management. Used Azure Service Bus for reliable message delivery and implemented compensation patterns for rollback scenarios ensuring business process integrity.'
            },
            {
              icon: 'api',
              name: 'Enterprise Integration Framework',
              description: 'Built comprehensive integration layer using Azure API Management with rate limiting, request transformation, and circuit breaker patterns. Implemented custom connectors for SAP Planet 8/9, Cherwell HR/IT, and Microsoft Power Platform with data transformation pipelines and comprehensive error handling for enterprise operations.'
            },
            {
              icon: 'data processing',
              name: 'Real-Time Data Synchronization',
              description: 'Developed event-driven architecture using Azure Event Grid and Service Bus for real-time data synchronization across all integrated systems. Implemented conflict resolution algorithms, data validation pipelines, and custom synchronization engine ensuring 99.9% data quality and consistency across 8+ enterprise systems.'
            },
            {
              icon: 'monitoring',
              name: 'Integration Health Monitoring',
              description: 'Implemented comprehensive monitoring of all system integrations with health checks every 30 seconds. Automated alerting for API failures, data inconsistencies, and performance degradation with retry policies using exponential backoff and dead letter queues for failed messages ensuring system reliability.'
            }
          ]
        },
        {
          icon: 'api',
          title: 'Azure API Gateway Implementation',
          problem: 'Implementing enterprise-grade Azure API Gateway with ARM templates, security certificates, and advanced routing capabilities while ensuring zero-downtime deployments, comprehensive security compliance, and seamless microservices orchestration for thousands of concurrent users.',
          solutions: [
            {
              icon: 'arm templates',
              name: 'Infrastructure as Code with ARM Templates',
              description: 'Designed and implemented comprehensive ARM templates for Azure API Gateway deployment with automated resource provisioning, security certificate management, and environment-specific configurations. Implemented blue-green deployment strategy ensuring zero-downtime updates and rollback capabilities for critical API changes.'
            },
            {
              icon: 'security',
              name: 'Enterprise Security Framework',
              description: 'Implemented comprehensive security framework with OAuth 2.0, JWT tokens, and Azure Active Directory integration. Added end-to-end encryption, comprehensive security headers, audit logging, and threat protection ensuring enterprise-grade security for all API communications and data access across the platform.'
            },
            {
              icon: 'load balancing',
              name: 'Advanced Routing & Load Balancing',
              description: 'Developed intelligent routing algorithms with health checks, circuit breaker patterns, and automatic failover mechanisms. Implemented rate limiting (1000 requests/minute per system), request/response transformation, and API versioning with backward compatibility ensuring seamless integration and optimal performance.'
            },
            {
              icon: 'monitoring',
              name: 'API Analytics & Performance Monitoring',
              description: 'Implemented comprehensive API monitoring with real-time metrics, performance tracking, and usage analytics. Features request/response logging, error tracking, automated alerting for performance degradation, and security incidents across all integrated systems with 99.5% SLA monitoring.'
            }
          ]
        },
        {
          icon: 'database',
          title: 'Multi-Database Architecture with Data Consistency',
          problem: 'Designing and implementing a complex multi-database architecture using Azure SQL for transactional data and Cosmos DB for document storage while maintaining data consistency, ensuring ACID properties, and handling 5M+ records per hour with sub-200ms response times across distributed systems.',
          solutions: [
            {
              icon: 'azure sql database',
              name: 'Azure SQL Database Optimization',
              description: 'Architected enterprise-grade Azure SQL Database with optimized indexing, connection pooling, and query performance tuning. Implemented read replicas for analytics queries, automated backups with point-in-time recovery, and geo-replication across multiple regions ensuring 99.9% data availability and optimal performance.'
            },
            {
              icon: 'azure cosmos db',
              name: 'Cosmos DB Global Distribution',
              description: 'Implemented globally distributed Cosmos DB with intelligent partitioning, automatic scaling, and comprehensive data consistency models. Configured multi-region writes, conflict resolution policies, and custom partitioning strategies ensuring optimal performance for document storage and real-time analytics workloads.'
            },
            {
              icon: 'data processing',
              name: 'Data Synchronization & Consistency',
              description: 'Developed comprehensive data synchronization patterns using Azure Data Factory and custom ETL pipelines. Implemented eventual consistency models, data validation frameworks, and conflict resolution algorithms ensuring data integrity across multi-database architecture with 99.9% consistency.'
            },
            {
              icon: 'redis',
              name: 'Intelligent Caching Strategy',
              description: 'Implemented multi-layer caching strategy using Redis with 98% cache hit rate. Developed intelligent cache invalidation, distributed caching patterns, and cache-aside patterns with write-through for critical data ensuring optimal performance and reduced database load during peak operations.'
            }
          ]
        },
        {
          icon: 'analytics',
          title: 'Enterprise Analytics & Data Lake Integration',
          problem: 'Integrating comprehensive analytics platforms and Azure Data Lake solutions for real-time business intelligence, machine learning workloads, and enterprise decision-making while processing 5M+ records per hour with sub-second analytics queries and predictive insights.',
          solutions: [
            {
              icon: 'azure data lake',
              name: 'Azure Data Lake Storage Architecture',
              description: 'Implemented scalable Azure Data Lake Storage with hierarchical namespace, security integration, and comprehensive data governance. Configured automated data ingestion pipelines, data partitioning strategies, and lifecycle management policies ensuring optimal performance for enterprise-scale analytics operations.'
            },
            {
              icon: 'machine learning',
              name: 'Machine Learning Platform Integration',
              description: 'Deployed comprehensive ML platform using Azure Machine Learning with custom models for business pattern prediction, demand forecasting, and operational optimization. Implemented MLOps pipeline with automated model retraining, A/B testing, and automated rollback ensuring continuous model improvement and business value delivery.'
            },
            {
              icon: 'power bi',
              name: 'Business Intelligence & Visualization',
              description: 'Integrated Power BI with real-time data connections, automated report generation, and interactive dashboards. Implemented custom data models, advanced analytics capabilities, and comprehensive business intelligence features ensuring data-driven decision making across all BAT departments.'
            },
            {
              icon: 'stream analytics',
              name: 'Real-Time Stream Processing',
              description: 'Implemented Azure Stream Analytics processing 30,000+ events per second from business transactions and system metrics. Developed real-time analytics pipelines, event processing workflows, and automated alerting systems ensuring immediate insights and proactive business optimization.'
            }
          ]
        },
        {
          icon: 'security',
          title: 'Enterprise Security & Compliance Framework',
          problem: 'Implementing comprehensive security measures for a mission-critical enterprise system handling sensitive employee data, financial transactions, and business operations while ensuring GDPR compliance, threat protection, and maintaining security posture across distributed microservices architecture.',
          solutions: [
            {
              icon: 'oauth',
              name: 'OAuth 2.0 & Multi-Factor Authentication',
              description: 'Implemented enterprise-grade OAuth 2.0 authentication supporting thousands of BAT employees across multiple departments. Added MFA support with TOTP and SMS backup, conditional access policies based on location and device trust, and comprehensive identity management ensuring secure access to all enterprise systems.'
            },
            {
              icon: 'security',
              name: 'Advanced Threat Protection',
              description: 'Deployed comprehensive security framework with Azure Security Center, threat detection, and audit logging. Implemented OWASP Top 10 protection, SQL injection prevention, XSS filtering, and network security groups with least-privilege access ensuring enterprise-grade security for all data and operations.'
            },
            {
              icon: 'data encryption',
              name: 'End-to-End Data Encryption',
              description: 'Implemented AES-256 encryption for data at rest in Azure SQL Database and Azure Storage. Configured TLS 1.3 for all data in transit with certificate pinning, field-level encryption for sensitive employee data using Azure Key Vault, and automatic key rotation every 90 days ensuring comprehensive data protection.'
            },
            {
              icon: 'compliance',
              name: 'Enterprise Compliance & Audit',
              description: 'Developed comprehensive compliance framework supporting GDPR, enterprise regulations, and industry standards. Implemented data residency controls, consent management system, automated compliance reporting, and 7-year audit log retention ensuring regulatory adherence and comprehensive audit trails.'
            }
          ]
        }
      ],
      businessImpactResults: "These engineering solutions delivered transformative results for BAT: 30% reduction in operational costs ($5M+ saved annually), 70% faster data processing (5M+ records/hour), unified 8+ enterprise system integrations with 99.9% data consistency, and comprehensive analytics for strategic decision-making. The architecture with Azure Service Fabric, Saga pattern implementation, and multi-database architecture provided enterprise-grade scalability, security, and reliability for BAT's mission-critical operations.",
      
      // Performance Metrics Data
      performanceStats: [
        { value: '99.9%', label: 'System Uptime', color: 'green' },
        { value: '< 200ms', label: 'Response Time', color: 'blue' },
        { value: '5M+', label: 'Records/Hour', color: 'purple' },
        { value: '8+', label: 'System Integrations', color: 'pink' }
      ],
      performanceCharts: [
        {
          id: 'systemPerformanceChart',
          type: 'doughnut',
          title: 'System Performance Distribution',
          icon: 'performance',
          width: 'half',
          data: {
            labels: ['API Gateway', 'Microservices', 'Database', 'Integrations'],
            datasets: [{
              data: [25, 35, 25, 15],
              backgroundColor: ['#FFD700', '#4ECDC4', '#45B7D1', '#FF6B9D'],
              borderWidth: 3,
              borderColor: '#ffffff',
              hoverOffset: 15
            }]
          },
          options: {
            interaction: {
              mode: 'point'
            },
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
          id: 'integrationPerformanceChart',
          type: 'polarArea',
          title: 'Enterprise Integration Performance',
          icon: 'integration',
          width: 'half',
          data: {
            labels: ['SAP Integration', 'Cherwell HR/IT', 'Power Apps', 'SharePoint', 'Teams'],
            datasets: [{
              data: [95, 92, 88, 90, 87],
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
            interaction: {
              mode: 'point'
            },
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
                    const label = context.label || 'Integration'
                    const value = context.parsed.r || context.parsed
                    return `${label}: ${value}% success rate`
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
                ticks: {
                  display: false
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
                }
              }
            }
          }
        },
        {
          id: 'dataProcessingChart',
          type: 'line',
          title: 'Real-Time Data Processing Trends',
          icon: 'analytics',
          width: 'half',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Records Processed (Million)',
              data: [3.2, 3.8, 4.1, 4.5, 4.8, 5.1, 4.9, 4.7, 4.3, 3.9, 3.6, 3.4],
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
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: 'index',
              intersect: false
            },
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
                    const label = context.dataset.label || 'Records'
                    const value = context.parsed.y
                    return `${label}: ${value}M records`
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
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                  drawBorder: false
                },
                ticks: {
                  color: '#6B7280',
                  font: { size: 11 }
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Records Processed (Million)',
                  font: { size: 12, weight: '500' },
                  color: '#374151'
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                  drawBorder: false
                },
                ticks: {
                  color: '#6B7280',
                  font: { size: 11 },
                  callback: function(value) {
                    return value + 'M'
                  }
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
          id: 'systemLoadChart',
          type: 'bar',
          title: 'System Load & Performance Metrics',
          icon: 'monitoring',
          width: 'half',
          data: {
            labels: ['API Response (ms)', 'Cache Hit Rate (%)', 'DB Queries/sec', 'Memory Usage (%)', 'CPU Usage (%)', 'Network I/O (MB/s)'],
            datasets: [{
              label: 'Current Performance',
              data: [180, 98.2, 250, 65, 45, 35],
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
              data: [200, 95, 300, 80, 60, 40],
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
            interaction: {
              mode: 'index',
              intersect: false
            },
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
                grid: {
                  display: false
                },
                ticks: {
                  color: '#6B7280',
                  font: { size: 10 },
                  maxRotation: 45
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Performance Value',
                  font: { size: 12, weight: '500' },
                  color: '#374151'
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                  drawBorder: false
                },
                ticks: {
                  color: '#6B7280',
                  font: { size: 11 }
                },
                beginAtZero: true
              }
            },
            animation: {
              duration: 1800,
              easing: 'easeInOutQuart'
            }
          }
        },
        {
          id: 'enterpriseMetricsChart',
          type: 'bar',
          title: 'Enterprise System Integration Metrics',
          icon: 'enterprise',
          width: 'full',
          data: {
            labels: ['SAP Planet 8/9', 'Cherwell HR', 'Cherwell IT', 'Power Apps', 'SharePoint', 'Microsoft Teams', 'Azure AD', 'Data Lake'],
            datasets: [{
              label: 'Integration Success Rate (%)',
              data: [95, 92, 90, 88, 85, 87, 98, 93],
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
            interaction: {
              mode: 'index',
              intersect: false
            },
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
                    return `${label}: ${value}% success rate`
                  }
                }
              }
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Enterprise Systems',
                  font: { size: 12, weight: '500' },
                  color: '#374151'
                },
                grid: {
                  display: false
                },
                ticks: {
                  color: '#6B7280',
                  font: { size: 11 }
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Success Rate (%)',
                  font: { size: 12, weight: '500' },
                  color: '#374151'
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                  drawBorder: false
                },
                ticks: {
                  color: '#6B7280',
                  font: { size: 11 },
                  callback: function(value) {
                    return value + '%'
                  }
                },
                beginAtZero: true,
                max: 100
              }
            },
            animation: {
              duration: 1500,
              easing: 'easeInOutQuart'
            }
          }
        }
      ],
      
      // Metrics Framework Data
      metricsFrameworkData: {
        introduction: "The following performance metrics were established as key success indicators for the BAT Inhouse App project. Each metric was carefully defined, measured, and validated to demonstrate the system's effectiveness in revolutionizing enterprise operations and delivering comprehensive business value across all integrated systems.",
        metricsCategories: [
          {
            icon: 'performance',
            title: 'System Performance Metrics',
            metrics: [
              {
                icon: 'api',
                name: 'API Response Time Optimization (2.5s → 180ms)',
                measurementMethod: 'End-to-end API response time tracking using Azure Application Insights and custom telemetry. Measured from initial employee request through authentication, business logic processing, and response delivery across all microservices.',
                context: 'Critical for enterprise operations where employees need instant access to business systems and real-time data. Faster response times enable efficient workflow processing and immediate system interactions.',
                validation: 'Achieved through .NET Core optimization, Redis caching implementation, Entity Framework query optimization, and microservices architecture reducing processing overhead by 70%.'
              },
              {
                icon: 'caching',
                name: 'Cache Hit Rate (98.2%)',
                measurementMethod: 'Redis cache performance monitoring using Azure Cache for Redis metrics. Tracks cache hits vs misses for employee data, business metrics, and system information across all microservices and integrations.',
                context: 'Essential for high-frequency enterprise operations where thousands of employees require instant access to business data. High cache hit rates reduce database load and improve system responsiveness during peak business hours.',
                validation: 'Implemented intelligent cache invalidation strategies, L1/L2 caching layers, and distributed caching patterns ensuring optimal data retrieval for enterprise workflows and business processes.'
              },
              {
                icon: 'database',
                name: 'Database Query Performance (150ms average)',
                measurementMethod: 'Azure SQL Database and Cosmos DB query performance monitoring using Query Store and custom telemetry. Tracks execution time for all business-related queries including employee data, transactions, and analytics processing.',
                context: 'Critical for maintaining sub-second response times during concurrent business operations. Optimized queries ensure smooth employee experience during peak business periods and real-time data access.',
                validation: 'Achieved through Entity Framework optimization, database indexing strategies, connection pooling, and read replica implementation for analytics queries across multi-database architecture.'
              }
            ]
          },
          {
            icon: 'integration',
            title: 'Enterprise Integration Metrics',
            metrics: [
              {
                icon: 'sap',
                name: 'SAP Integration Success Rate (95%)',
                measurementMethod: 'Real-time integration monitoring using Azure Service Bus message counting and custom telemetry. Monitors successful data synchronization between BAT systems and SAP Planet 8/9 across all business processes.',
                context: 'Represents the core business value of enterprise system integration - enabling seamless data flow between BAT operations and SAP ERP systems. Higher success rates indicate reliable business process automation.',
                validation: 'Validated through comprehensive integration analytics, data consistency checks, and business process monitoring showing reliable SAP connectivity and data synchronization.'
              },
              {
                icon: 'cherwell',
                name: 'Cherwell HR/IT Integration (92%)',
                measurementMethod: 'Integration health monitoring with automated testing and real-time status tracking. Monitors ticket management, employee onboarding, and IT service delivery workflows across Cherwell systems.',
                context: 'Essential for HR and IT operations where automated workflows and service delivery depend on reliable system integration. High success rates ensure consistent employee service delivery.',
                validation: 'Achieved through robust integration testing, automated retry mechanisms, and comprehensive error handling ensuring reliable HR and IT service management.'
              },
              {
                icon: 'power apps',
                name: 'Power Platform Integration (88%)',
                measurementMethod: 'Microsoft Power Platform connectivity monitoring with custom connectors and data synchronization tracking. Monitors Power Apps, Power BI, and Power Automate integration success rates.',
                context: 'Critical for low-code business applications and analytics where employees depend on Power Platform for business processes and data visualization. Reliable integration ensures business continuity.',
                validation: 'Implemented through custom connectors, data transformation pipelines, and comprehensive error handling ensuring seamless Power Platform integration.'
              }
            ]
          },
          {
            icon: 'analytics',
            title: 'Business Intelligence Metrics',
            metrics: [
              {
                icon: 'data processing',
                name: 'Real-Time Data Processing (5M+ records/hour)',
                measurementMethod: 'Azure Stream Analytics and Data Factory pipeline monitoring with real-time event counting and processing metrics. Tracks data ingestion, transformation, and analytics processing across all business systems.',
                context: 'Essential for enterprise analytics where real-time business intelligence depends on high-volume data processing. Higher processing rates enable comprehensive business insights and decision-making.',
                validation: 'Achieved through Azure Data Lake integration, stream processing optimization, and machine learning pipeline automation ensuring continuous business intelligence delivery.'
              },
              {
                icon: 'machine learning',
                name: 'ML Model Accuracy (92% prediction accuracy)',
                measurementMethod: 'Azure Machine Learning model performance tracking with automated accuracy testing and prediction validation. Monitors business pattern prediction, demand forecasting, and operational optimization models.',
                context: 'Critical for predictive analytics where business decisions depend on accurate machine learning insights. Higher accuracy enables better strategic planning and operational optimization.',
                validation: 'Implemented through MLOps pipeline with automated model retraining, A/B testing, and performance monitoring ensuring continuous model improvement and business value delivery.'
              },
              {
                icon: 'power bi',
                name: 'Business Intelligence Adoption (87%)',
                measurementMethod: 'Power BI usage analytics and dashboard interaction tracking across all BAT departments. Monitors report generation, dashboard usage, and business intelligence tool adoption rates.',
                context: 'Reflects the success of business intelligence implementation where employee adoption indicates value delivery. High adoption rates show effective data-driven decision making.',
                validation: 'Achieved through user training, intuitive dashboard design, and real-time data connections ensuring comprehensive business intelligence adoption across all departments.'
              }
            ]
          },
          {
            icon: 'security',
            title: 'Security & Compliance Metrics',
            metrics: [
              {
                icon: 'oauth',
                name: 'Authentication Success Rate (99.5%)',
                measurementMethod: 'OAuth 2.0 and Azure Active Directory authentication monitoring with security event tracking. Monitors login success rates, MFA completion, and authentication failures across all enterprise systems.',
                context: 'Critical for enterprise security where employee access depends on reliable authentication. High success rates ensure secure access while maintaining user experience.',
                validation: 'Achieved through OAuth 2.0 implementation, MFA integration, and comprehensive identity management ensuring secure and reliable employee authentication.'
              },
              {
                icon: 'security',
                name: 'Security Incidents (0)',
                measurementMethod: 'Azure Security Center and threat detection monitoring with comprehensive security event tracking. Monitors security events, authentication failures, and potential security breaches across the entire platform.',
                context: 'Essential for enterprise security where zero security incidents demonstrate effective security measures and compliance. Zero incidents indicate comprehensive threat protection.',
                validation: 'Maintained through multi-layer security architecture, threat detection, end-to-end encryption, and comprehensive security monitoring ensuring enterprise-grade security posture.'
              },
              {
                icon: 'compliance',
                name: 'Compliance Adherence (100%)',
                measurementMethod: 'Automated compliance monitoring using Azure Policy and custom compliance frameworks. Tracks GDPR adherence, data residency controls, and regulatory compliance across all business operations.',
                context: 'Critical for enterprise operations where regulatory compliance is mandatory. 100% compliance ensures legal adherence and business continuity.',
                validation: 'Achieved through comprehensive compliance framework, automated monitoring, and regulatory adherence ensuring full compliance with enterprise and industry standards.'
              }
            ]
          }
        ],
        frameworkItems: [
          {
            icon: 'measurement',
            title: 'Baseline Establishment',
            description: 'Established performance baselines using historical BAT enterprise system data and manual business processes before BAT Inhouse App implementation to ensure accurate improvement tracking and ROI measurement across all integrated systems.'
          },
          {
            icon: 'monitoring',
            title: 'Real-Time Monitoring',
            description: 'Implemented comprehensive monitoring using Azure Application Insights, custom dashboards, and automated alerting to track all BAT Inhouse App metrics continuously throughout the system lifecycle with proactive issue detection.'
          },
          {
            icon: 'validation',
            title: 'Data Validation',
            description: 'Established data validation protocols ensuring accuracy of business metrics, financial calculations, and employee satisfaction measurements through automated verification and manual audit processes across all enterprise systems.'
          },
          {
            icon: 'analytics',
            title: 'Continuous Optimization',
            description: 'Implemented continuous improvement processes using real-time analytics, A/B testing, and employee feedback to optimize BAT Inhouse App performance and enhance business value delivery continuously across all departments.'
          }
        ]
      }
    }
  }
}
</script>
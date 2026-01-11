<template>
  <ProjectPageTemplate projectTitle="Heat Exchanger Portal">
    
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
    
    <!-- Main Content Top (Left Column - With Sidebar) -->
    <template #main-content-top>
      
      <!-- Project Overview -->
      <ProjectOverview 
        title="Project Overview"
        :icon-name="PROJECT_ICON_NAMES.PROJECT_OVERVIEW"
        :content="overviewText" 
      />
      
      <!-- Technology Stack -->
      <TechnologyStack 
        title="Technology Stack"
        :icon-name="PROJECT_ICON_NAMES.TECHNOLOGY_STACK"
        :technologies="technologies" 
        :columnsPerRow="2" 
      />
        
    </template>
    
    <!-- Sidebar (Right Column) -->
    <template #sidebar>
      
      <!-- Project Information -->
      <ProjectInfo 
        title="Project Information"
        :icon-name="PROJECT_ICON_NAMES.PROJECT_INFORMATION"
        :category="PROJECT_CATEGORIES.ENTERPRISE_APPLICATIONS"
        client="Confidential - Top 5 Oil & Gas Company"
        projectDate="June 2021 - August 2022"
        projectUrl="Internal Portal"
        companySize="Global Fortune 500"
      />
      
    </template>
    
    <!-- Main Content Bottom (Full Width - No Sidebar) -->
    <template #main-content-bottom>
      
      <!-- Architecture Diagram (Full Width) -->
      <DiagramViewer 
        title="Heat Exchanger Portal - Enterprise Microservices Architecture"
        diagramSrc="/assets/img/heat-exchanger-diagram.svg"
        :narrationSteps="narrationSteps"
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
        :challenges="challenges" 
        :businessImpact="businessImpactResults"
      />
      
      <!-- Enhanced Performance Metrics & Analytics -->
      <PerformanceMetricsSection 
        title="Performance Metrics & Analytics"
        :icon-name="PROJECT_ICON_NAMES.PERFORMANCE_METRICS"
        :stats="performanceStats"
        :charts="performanceCharts"
      />
      
      <!-- Metrics & Measurement Framework -->
      <MetricsFramework 
        title="Metrics & Measurement Framework"
        :icon-name="PROJECT_ICON_NAMES.METRICS_FRAMEWORK"
        :introduction="metricsIntroduction"
        :metricsCategories="metricsCategories"
        :frameworkItems="measurementFramework"
      />
      
      <!-- ROI Section -->
      <ROISection 
        mainTitle="ROI & Business Impact"
        :mainIcon="ROI_ICON_NAMES.MAIN_ICON"
        leftTitle="Financial Impact"
        :leftIcon="ROI_ICON_NAMES.FINANCIAL_ICON"
        rightTitle="Operational Impact"
        :rightIcon="ROI_ICON_NAMES.OPERATIONAL_ICON"
        metricsTitle="Success Metrics"
        :metricsIcon="ROI_ICON_NAMES.SUCCESS_ICON"
        :leftItems="roiLeftItems"
        :rightItems="roiRightItems"
        :metrics="roiMetrics"
      />
        
    </template>
    
    <!-- Additional Content Slot (Full Width) -->
    <template #additional-content>
      <!-- More sections will be added here -->
    </template>
    
  </ProjectPageTemplate>
</template>

<script>
import ProjectPageTemplate from '../../components/common/ProjectPageTemplate.vue'
import ProjectHeroCard from '../../components/projects/ProjectHeroCard.vue'
import ProjectGallery from '../../components/projects/ProjectGallery.vue'
import ProjectOverview from '../../components/projects/ProjectOverview.vue'
import TechnologyStack from '../../components/projects/TechnologyStack.vue'
import ArchitectureOverview from '../../components/projects/ArchitectureOverview.vue'
import ProjectInfo from '../../components/projects/ProjectInfo.vue'
import DiagramViewer from '../../components/projects/DiagramViewer.vue'
import EngineeringChallenges from '../../components/projects/EngineeringChallenges.vue'
import PerformanceMetricsSection from '../../components/projects/PerformanceMetricsSection.vue'
import MetricsFramework from '../../components/projects/MetricsFramework.vue'
import ROISection from '../../components/projects/ROISection.vue'
import { heatExchangerNarrationSteps } from '../../config/heatExchangerNarration'
import { TECH_CATEGORIES, PROJECT_ICON_NAMES, PROJECT_CATEGORIES, ROI_ICON_NAMES } from '../../config/constants.js'

export default {
  name: 'HeatExchangerPage',
  components: {
    ProjectPageTemplate,
    ProjectHeroCard,
    ProjectGallery,
    ProjectOverview,
    TechnologyStack,
    ArchitectureOverview,
    ProjectInfo,
    DiagramViewer,
    EngineeringChallenges,
    PerformanceMetricsSection,
    MetricsFramework,
    ROISection
  },
  data() {
    return {
      // Constants for template access
      PROJECT_ICON_NAMES,
      PROJECT_CATEGORIES,
      TECH_CATEGORIES,
      ROI_ICON_NAMES,
      narrationSteps: heatExchangerNarrationSteps,
      projectData: {
        title: '🔥 Heat Exchanger Portal - Mission Critical Petroleum Operations',
        description: 'Enterprise-grade .NET Core platform for one of the five biggest oil and gas companies in the world, hosted on OpenShift with comprehensive monitoring through Grafana and Prometheus. This mission-critical system manages Docker image repositories through Nexus and handles data responsible for millions to billions of dollars in maintenance costs.',
        tags: [
          'Mission Critical',
          'Real-time Processing',
          'Enterprise Scale',
          'Zero Downtime'
        ],
        achievementsCol1: [
          { emoji: 'performance', label: 'Performance', value: 'Minutes to seconds efficiency' },
          { emoji: 'financial', label: 'Cost Impact', value: 'Billions in maintenance costs' },
          { emoji: 'realtime', label: 'Real-time', value: 'Complex API integration' }
        ],
        achievementsCol2: [
          { emoji: 'critical', label: 'Mission Critical', value: 'Zero-downtime operation' },
          { emoji: 'scalability', label: 'Scalability', value: 'Microservices architecture' },
          { emoji: 'security', label: 'Security', value: 'Enterprise-grade protection' }
        ]
      },
      galleryData: {
        title: 'Project Gallery',
        projectName: 'Heat Exchanger Portal',
        images: [
          '/assets/img/he1.jpg',
          '/assets/img/he2.jpg',
          '/assets/img/he3.jpg',
          '/assets/img/he4.jpg'
        ]
      },
      overviewText: 'The Heat Exchanger Portal is a mission-critical .NET Core-based enterprise platform designed for one of the five biggest oil and gas companies in the world, managing billions of dollars in maintenance operations. Hosted on OpenShift container platform with comprehensive monitoring through Grafana and Prometheus, this system processes 2.5 million data points daily from heat exchanger sensors across multiple refineries. The platform integrates Nexus for Docker image management, Apache Kafka for real-time data ingestion (30,000+ messages/second), and advanced predictive maintenance algorithms that forecast equipment failures 24-48 hours in advance with 85% accuracy. Through aggressive optimization, the system achieved a 65% reduction in response times (from 2.3s to 0.8s) while maintaining 99.9% uptime and supporting 15,000+ concurrent users across multiple geographical locations.',
      technologies: [
        // Frontend
        { name: 'Angular', description: 'Frontend framework', category: TECH_CATEGORIES.FRONTEND },
        { name: 'Bootstrap', description: 'UI framework', category: TECH_CATEGORIES.FRONTEND },
        { name: 'jQuery', description: 'JavaScript library', category: TECH_CATEGORIES.FRONTEND },
        { name: 'PrimeNG', description: 'UI components', category: TECH_CATEGORIES.FRONTEND },
        
        // Backend
        { name: '.NET Core', description: 'Primary application framework', category: TECH_CATEGORIES.BACKEND },
        { name: 'MVC Architecture', description: 'Design pattern', category: TECH_CATEGORIES.BACKEND },
        { name: 'Entity Framework', description: 'ORM', category: TECH_CATEGORIES.BACKEND },
        { name: 'LINQ2SQL & Dapper', description: 'Data access', category: TECH_CATEGORIES.BACKEND },
        { name: 'Multi-threading', description: 'Background jobs', category: TECH_CATEGORIES.BACKEND },
        
        // Databases
        { name: 'SQL Server', description: 'Primary database', category: TECH_CATEGORIES.DATABASE },
        
        // Cloud & Hosting
        { name: 'OpenShift', description: 'Container orchestration platform', category: TECH_CATEGORIES.CLOUD },
        { name: 'Docker', description: 'Containerization', category: TECH_CATEGORIES.CLOUD },
        
        // DevOps & CI/CD
        { name: 'CI/CD Pipelines', description: 'Automated deployment', category: TECH_CATEGORIES.DEVOPS },
        { name: 'Nexus', description: 'Docker image repository', category: TECH_CATEGORIES.DEVOPS },
        
        // Monitoring & Analytics
        { name: 'Grafana', description: 'Data visualization', category: TECH_CATEGORIES.MONITORING },
        { name: 'Prometheus', description: 'Metrics collection', category: TECH_CATEGORIES.MONITORING },
        
        // API & Integration
        { name: 'OpenShift Gateway', description: 'API management platform', category: TECH_CATEGORIES.API },
        { name: 'Integration Services', description: 'Enterprise integration layer', category: TECH_CATEGORIES.API },
        { name: 'Swagger UI', description: 'API documentation', category: TECH_CATEGORIES.API },
        
        // Testing & Quality
        { name: 'N-Unit', description: 'Testing framework', category: TECH_CATEGORIES.TESTING }
      ],
      architectureLayers: [
        {
          icon: 'diamond',
          title: 'Frontend Layer',
          description: 'The frontend layer provides a modern, responsive user interface designed for real-time monitoring and control of heat exchanger operations across multiple devices and locations.',
          features: [
            {
              icon: 'web',
              name: 'Angular S-P-A',
              description: 'Single-page application built with Angular framework featuring real-time dashboards, interactive charts, and WebSocket integration for live data updates. Includes role-based access control and customizable user interfaces for different user types (operators, engineers, managers).'
            },
            {
              icon: 'mobile',
              name: 'Mobile Responsive',
              description: 'Cross-device compatibility ensuring seamless operation on tablets, smartphones, and desktop computers. Optimized for field operations with touch-friendly interfaces and offline capability for critical functions.'
            },
            {
              icon: 'realtime',
              name: 'SignalR Integration',
              description: 'Real-time bidirectional communication enabling instant data streaming, live alerts, and collaborative features. Supports multiple concurrent users with efficient connection management and automatic reconnection handling.'
            }
          ]
        },
        {
          icon: 'diamond',
          title: 'API Gateway Layer',
          description: 'The API Gateway serves as the central entry point for all client requests, providing security, routing, and load balancing capabilities while ensuring optimal performance and reliability.',
          features: [
            {
              icon: 'api',
              name: 'OpenShift Gateway',
              description: 'Enterprise-grade API management platform providing comprehensive authentication, authorization, rate limiting, and request routing. Includes API versioning, service discovery, and advanced security features like OAuth 2.0 and JWT token validation.'
            },
            {
              icon: 'load_balancing',
              name: 'Load Balancing',
              description: 'Intelligent traffic distribution across multiple microservice instances using round-robin and health-check algorithms. Implements circuit breaker patterns and automatic failover to ensure high availability and fault tolerance.'
            },
            {
              icon: 'security',
              name: 'SSL Termination',
              description: 'End-to-end encryption with SSL/TLS termination at the gateway level, reducing backend processing overhead. Implements certificate management, cipher suite optimization, and security headers for enhanced protection.'
            }
          ]
        },
        {
          icon: 'diamond',
          title: 'Microservices Layer',
          description: 'The microservices architecture enables scalable, maintainable, and independently deployable services that handle specific business functions with high performance and reliability.',
          features: [
            {
              icon: 'api',
              name: '.NET Core Web API',
              description: 'High-performance RESTful services built with ASP.NET Core featuring SignalR hubs for real-time communication, message queues for asynchronous processing, and comprehensive heat exchanger management services. Implements dependency injection, middleware pipeline, and cross-cutting concerns.'
            },
            {
              icon: 'data processing',
              name: 'Data Processing Engine',
              description: 'Advanced analytics engine providing real-time data processing, predictive maintenance algorithms, and performance optimization. Includes background job processing, event-driven architecture, and data mining capabilities for operational insights and trend analysis.'
            },
            {
              icon: 'integration',
              name: 'Integration Services',
              description: 'Comprehensive integration layer handling SAP system connectivity, third-party API management, and data synchronization. Features service discovery, API management, and event processing for seamless enterprise system integration.'
            },
            {
              icon: 'analytics',
              name: 'Analytics Engine',
              description: 'Business intelligence platform providing advanced reporting services, data visualization, and performance metrics. Includes custom dashboard creation, real-time alerts, and comprehensive analytics for operational decision-making.'
            }
          ]
        },
        {
          icon: 'diamond',
          title: 'Monitoring & DevOps',
          description: 'Comprehensive monitoring and DevOps infrastructure ensuring system reliability, performance optimization, and streamlined deployment processes with full observability and automation.',
          features: [
            {
              icon: 'monitoring',
              name: 'Grafana',
              description: 'Advanced visualization platform providing real-time dashboards, custom alerts, and comprehensive data visualization. Features interactive charts, multi-user support, and integration with various data sources for complete system monitoring.'
            },
            {
              icon: 'analytics',
              name: 'Prometheus',
              description: 'Time-series database and monitoring system for metrics collection, performance monitoring, and alert management. Provides comprehensive observability with custom metrics, service discovery, and powerful querying capabilities.'
            },
            {
              icon: 'Nexus Repository',
              name: 'Nexus Repository',
              description: 'Enterprise artifact management system for Docker image storage, version control, and package management. Includes CI/CD integration, security scanning, and comprehensive artifact lifecycle management.'
            },
            {
              icon: 'deployment',
              name: 'CI/CD Pipeline',
              description: 'Automated deployment pipeline featuring continuous integration, quality gates, and release management. Implements automated testing, security scanning, and blue-green deployment strategies for zero-downtime updates.'
            }
          ]
        },
        {
          icon: 'diamond',
          title: 'Data Layer',
          description: 'Robust data storage and caching infrastructure designed for high availability, performance, and scalability to support enterprise-level operations and real-time data processing requirements.',
          features: [
            {
              icon: 'database',
              name: 'SQL Server Enterprise',
              description: 'Enterprise-grade relational database with high availability setup, real-time replication, and advanced transaction management. Features data integrity controls, performance optimization, and comprehensive stored procedure support for complex business logic.'
            },
            {
              icon: 'cache',
              name: 'Redis Cache',
              description: 'High-performance in-memory caching solution providing session management, data caching, and real-time operations. Implements memory optimization, distributed caching, and advanced data structures for optimal performance.'
            },
            {
              icon: 'cloud',
              name: 'Azure Blob Storage',
              description: 'Scalable cloud storage for document management, media files, and backup solutions. Features CDN integration, file management capabilities, and comprehensive backup and recovery procedures.'
            }
          ]
        },
        {
          icon: 'diamond',
          title: 'Security & Compliance',
          description: 'Comprehensive security framework ensuring data protection, regulatory compliance, and enterprise-grade security measures to safeguard critical infrastructure and sensitive information.',
          features: [
            {
              icon: 'authentication and authorization',
              name: 'Authentication & Authorization',
              description: 'Multi-factor authentication system with SSO integration, role-based access control, and comprehensive user management. Implements encryption, audit logging, and advanced security protocols for enterprise-grade protection.'
            },
            {
              icon: 'compliance',
              name: 'Compliance & Audit',
              description: 'Regulatory compliance framework with comprehensive audit trails, data governance, and risk management. Features policy enforcement, continuous monitoring, and automated compliance reporting for industry standards.'
            }
          ]
        }
      ],
      architectureBenefits: 'This microservices-based architecture provides exceptional scalability, maintainability, and performance for enterprise heat exchanger management operations handling billions of dollars in assets. The layered approach ensures clear separation of concerns, enabling independent development, testing, and deployment of each component while maintaining 99.9% uptime and fault tolerance. Each microservice can scale independently based on demand, with the data processing engine handling 30,000+ messages per second through Apache Kafka, while the analytics engine provides real-time insights through Grafana dashboards. The architecture supports horizontal scaling from 3 to 20 pod instances automatically, ensuring optimal resource utilization and sub-second response times even under peak loads of 15,000+ concurrent users.',
      challenges: [
        {
          icon: 'performance',
          title: 'High-Volume Data Processing (2.5M Data Points/Day)',
          problem: 'Processing 2.5 million data points daily from multiple heat exchanger sensors with sub-second latency requirements.',
          solutions: [
            {
              icon: 'data pipeline',
              name: 'Data Ingestion Pipeline',
              description: 'Implemented Apache Kafka distributed messaging system with 5-broker cluster configuration, handling 30,000+ messages per second with zero message loss through replication factor of 3. Data partitioning strategy across 12 partitions ensures parallel processing and fault tolerance. Producer acknowledgment settings guarantee exactly-once delivery semantics, while consumer groups enable horizontal scaling of data processors. Message retention policies maintain 7 days of historical data for replay and disaster recovery scenarios.'
            },
            {
              icon: 'api',
              name: 'Parallel Processing',
              description: 'Multi-threaded .NET Core services leveraging async/await patterns and Task Parallel Library (TPL) for concurrent data stream processing. Implemented parallel LINQ (PLINQ) for data transformations, achieving 95% CPU utilization efficiency across 16-core servers. Background services process data asynchronously using Hangfire job scheduler, with automatic retry mechanisms and distributed locks preventing duplicate processing. Thread pool optimization and careful memory management ensure stable performance under sustained high loads.'
            },
            {
              icon: 'database optimization',
              name: 'Database Optimization',
              description: 'SQL Server Enterprise with advanced indexing strategies (covering indexes, filtered indexes, columnstore indexes), table partitioning by date ranges for efficient historical data queries, and optimized bulk insert operations using Table-Valued Parameters (TVPs). Implemented stored procedures with execution plan optimization, reducing write latency from 500ms to 50ms per batch (90% improvement). Query performance tuning reduced complex analytical queries from 15 seconds to under 2 seconds.'
            },
            {
              icon: 'cache',
              name: 'Caching Strategy',
              description: 'Redis cluster deployment with 99.9% cache hit rate, storing frequently accessed heat exchanger sensor data, user sessions, and real-time metrics in-memory. Implemented distributed caching across multiple nodes with automatic failover, reducing primary database load by 70% and enabling sub-200ms data retrieval for critical operations. Cache invalidation strategies ensure data freshness while maintaining optimal performance.'
            }
          ]
        },
        {
          icon: 'alerts',
          title: 'Advanced Alerting & Monitoring System',
          problem: 'Real-time alerting system for critical equipment failures with intelligent escalation and predictive maintenance capabilities.',
          solutions: [
            {
              icon: 'monitoring',
              name: 'Grafana Alerting Engine',
              description: 'Custom alert rules with multi-threshold conditions, anomaly detection algorithms, and intelligent grouping reducing alert fatigue by 80%.'
            },
            {
              icon: 'escalation matrix',
              name: 'Escalation Matrix',
              description: 'Automated escalation system with SMS, email, and Slack notifications based on severity levels and response time SLAs.'
            },
            {
              icon: 'analytics',
              name: 'Predictive Analytics',
              description: 'Machine learning models predicting equipment failures 24-48 hours in advance with 85% accuracy, enabling proactive maintenance.'
            },
            {
              icon: 'mobile',
              name: 'Mobile Alerts',
              description: 'Push notifications to mobile devices with actionable insights and one-click acknowledgment, reducing response time by 60%.'
            }
          ]
        },
        {
          icon: 'deployment',
          title: 'OpenShift Auto-Scaling & Load Management',
          problem: 'Dynamic scaling of microservices based on real-time load patterns while maintaining 99.9% uptime and optimal resource utilization.',
          solutions: [
            {
              icon: 'analytics',
              name: 'Horizontal Pod Autoscaler (HPA)',
              description: 'Custom HPA configurations scaling pods from 3 to 20 instances based on CPU/memory metrics, with 30-second scaling response time.'
            },
            {
              icon: 'load_balancing',
              name: 'Load Balancing Strategy',
              description: 'HAProxy load balancer with health checks, circuit breaker patterns, and intelligent traffic distribution across multiple regions.'
            },
            {
              icon: 'compliance',
              name: 'Resource Management',
              description: 'Resource quotas and limits preventing resource exhaustion, with 95% resource utilization efficiency and automatic pod eviction for failed instances.'
            },
            {
              icon: 'deployment',
              name: 'Rolling Updates',
              description: 'Zero-downtime deployments with rolling update strategy, maintaining service availability during updates with automatic rollback on failures.'
            }
          ]
        },
        {
          icon: 'compliance',
          title: 'Enterprise Security & Compliance',
          problem: 'Implementing enterprise-grade security for critical infrastructure with regulatory compliance and audit requirements.',
          solutions: [
            {
              icon: 'multi factor authentication',
              name: 'Multi-Factor Authentication',
              description: 'Azure AD integration with SAML 2.0, OAuth 2.0, and JWT tokens, supporting SSO across multiple enterprise systems.'
            },
            {
              icon: 'data encryption',
              name: 'Data Encryption',
              description: 'End-to-end encryption with AES-256, TLS 1.3 for data in transit, and encrypted storage for data at rest with key rotation policies.'
            },
            {
              icon: 'compliance',
              name: 'Audit & Compliance',
              description: 'Comprehensive audit logging with SIEM integration, automated compliance reporting, and real-time security monitoring with threat detection.'
            },
            {
              icon: 'incident response',
              name: 'Incident Response',
              description: 'Automated incident response with playbooks, real-time threat intelligence, and 24/7 security operations center (SOC) integration.'
            }
          ]
        }
      ],
      businessImpactResults: 'These engineering solutions delivered transformative results: 99.9% system uptime (8,760 hours of operation with less than 9 hours downtime annually), 65% reduction in response times (from 2.3s to 0.8s enabling sub-second decision-making), 40% reduction in maintenance costs (saving millions annually through predictive analytics), and zero security breaches over 2 years of operation across 15,000+ concurrent users. The system successfully processes 2.5 million data points daily at 30,000+ messages per second through Apache Kafka, with Redis caching achieving a 99.9% hit rate and reducing database load by 70%. Predictive maintenance algorithms forecast equipment failures 24-48 hours in advance with 85% accuracy, while automated scaling maintains optimal performance during peak loads by dynamically adjusting from 3 to 20 pod instances within 30 seconds.',
      metricsIntroduction: 'The following performance matrices were established as key success indicators for the Heat Exchanger Portal project. Each metric was carefully defined, measured, and validated to demonstrate the system\'s effectiveness in improving operational efficiency and reducing costs.',
      metricsCategories: [
        {
          icon: 'performance',
          title: 'System Performance Metrics',
          metrics: [
            {
              icon: 'performance',
              name: 'Response Time Optimization (2.3s → 0.8s)',
              measurementMethod: 'API response time tracking using Application Insights and custom telemetry. Measured end-to-end request processing from client to database and back.',
              context: 'Critical for real-time heat exchanger monitoring where operators need immediate feedback on equipment status. Faster response times enable quicker decision-making during critical operations.',
              validation: 'Achieved through database query optimization, caching strategies, and microservices architecture that reduced processing overhead by 65%.'
            },
            {
              icon: 'uptime',
              name: 'System Uptime (99.9%)',
              measurementMethod: 'Continuous monitoring using Prometheus and Grafana dashboards. Tracked service availability, health checks, and automated alerting for any downtime events.',
              context: 'Essential for mission-critical heat exchanger operations where any system downtime could result in equipment failures costing millions in maintenance and production losses.',
              validation: 'Achieved through OpenShift auto-scaling, load balancing, and zero-downtime deployment strategies that ensured continuous service availability.'
            },
            {
              icon: 'data processing',
              name: 'Data Processing Throughput (2.5M Data Points/Day)',
              measurementMethod: 'Real-time data ingestion monitoring using Apache Kafka metrics and custom analytics dashboards. Tracked data processing rates, queue depths, and processing latency.',
              context: 'Heat exchangers generate massive amounts of sensor data requiring real-time processing for predictive maintenance and operational insights.',
              validation: 'Achieved through parallel processing, optimized database operations, and efficient data pipeline architecture that handled 30,000+ messages per second.'
            }
          ]
        },
        {
          icon: 'financial',
          title: 'Business Impact Metrics',
          metrics: [
            {
              icon: 'financial',
              name: 'Maintenance Cost Reduction (40% - $4.2M Annual Savings)',
              measurementMethod: 'Comparative analysis of maintenance costs before and after system implementation over 24-month period. Tracked preventive vs. reactive maintenance ratios, equipment failure rates, emergency repair costs, and unplanned downtime expenses. Baseline annual maintenance costs of $10.5M reduced to $6.3M through predictive analytics.',
              context: 'For a major oil & gas refinery, heat exchanger failures can cost $150K-$250K per hour in downtime plus emergency repair costs averaging $500K per incident. Predictive maintenance enables planned servicing during scheduled shutdowns, eliminating costly emergency repairs and production losses.',
              validation: 'Achieved through machine learning models that predicted equipment failures 24-48 hours in advance with 85% accuracy, reducing emergency repairs from 48 incidents/year to 7 incidents/year. Shifted maintenance strategy from 70% reactive / 30% preventive to 15% reactive / 85% preventive, enabling scheduled maintenance during planned outages.'
            },
            {
              icon: 'performance',
              name: 'Processing Efficiency (65% Faster - 2.3s to 0.8s)',
              measurementMethod: 'Benchmark testing of data processing workflows before and after optimization, measuring end-to-end response times for critical operations. Tracked percentile distributions (P50, P95, P99) and monitored performance under various load conditions (normal, peak, stress).',
              context: 'In refinery operations, every second of delay in detecting heat exchanger anomalies can escalate into equipment damage or safety incidents. Faster processing enables operators to respond to critical temperature or pressure deviations within seconds rather than minutes, potentially preventing incidents that could cost $2M+ in equipment damage and production losses.',
              validation: 'Achieved through comprehensive optimization: database query tuning (15s → 2s for complex analytics), Redis caching (70% database load reduction), parallel processing (95% CPU efficiency), and Apache Kafka message queuing (30K messages/sec). Real-world validation showed consistent sub-second response times even under peak loads of 15K concurrent users.'
            },
            {
              icon: 'scalability',
              name: 'Enterprise-Wide User Capacity (15K+ Concurrent Users)',
              measurementMethod: 'Load testing using JMeter simulating realistic user behavior patterns, real-time session monitoring via Application Insights, and stress testing under 200% normal load. Tracked active connections, response times under load, memory consumption per user, and system resource utilization across distributed pods.',
              context: 'Global oil & gas operations require 24/7 access for operations teams, engineers, managers, and executives across multiple refineries, regions, and time zones. Previous system limited to 3,000 concurrent users, causing access bottlenecks during critical incidents and shift changes, potentially delaying emergency responses.',
              validation: 'Achieved through OpenShift horizontal pod autoscaling (3-20 instances based on demand), HAProxy load balancing with health checks, stateless API design enabling distributed sessions, and Redis session management. Successfully demonstrated 15,000+ concurrent users during company-wide emergency drill with average response times remaining under 1.2 seconds and zero timeout errors.'
            }
          ]
        }
      ],
      measurementFramework: [
        {
          icon: 'measurement',
          title: 'Baseline Establishment',
          description: 'Established performance baselines using historical data and manual measurements before system implementation to ensure accurate improvement tracking.'
        },
        {
          icon: 'monitoring',
          title: 'Continuous Monitoring',
          description: 'Implemented real-time monitoring dashboards using Grafana and Prometheus to track performance metrics continuously throughout the project lifecycle.'
        },
        {
          icon: 'validation',
          title: 'Validation Process',
          description: 'Performance improvements were validated through A/B testing, user feedback, and comparative analysis against industry benchmarks and project objectives.'
        }
      ],
      roiLeftItems: [
        { label: '$4.2M annual savings', value: 'through predictive maintenance and cost optimization' },
        { label: '$12M+ prevented losses', value: 'by avoiding critical equipment failures' },
        { label: '85% prediction accuracy', value: 'forecasting failures 24-48 hours ahead' },
        { label: '~$200K/hour', value: 'estimated downtime cost prevented' }
      ],
      roiRightItems: [
        { label: '40% cost reduction', value: 'shifting from reactive to predictive maintenance' },
        { label: '99.9% uptime achieved', value: 'ensuring continuous refinery operations' },
        { label: 'Zero security breaches', value: 'protecting billions in assets over 2 years' },
        { label: '18-month ROI period', value: 'rapid return on technology investment' }
      ],
      performanceStats: [
        { value: '65%', label: 'Response Time Improvement', color: 'green' },
        { value: '0.8s', label: 'Final Response Time', color: 'purple' },
        { value: '30K/s', label: 'Message Processing Rate', color: 'pink' },
        { value: '99.9%', label: 'System Uptime', color: 'blue' }
      ],
      performanceCharts: [
        {
          id: 'dataProcessingChart',
          type: 'doughnut',
          title: 'Data Processing Distribution',
          icon: 'data processing',
          width: 'half',
          data: {
            labels: ['Real-time Processing', 'Batch Analytics', 'Predictive Maintenance', 'Data Storage'],
            datasets: [{
              data: [42, 28, 18, 12],
              backgroundColor: ['#FFD700', '#FF6B9D', '#4ECDC4', '#45B7D1'],
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
          id: 'performanceChart',
          type: 'polarArea',
          title: 'Performance Optimization Impact',
          icon: 'performance',
          width: 'half',
          data: {
            labels: ['Response Time', 'Throughput', 'Resource Usage', 'Scalability'],
            datasets: [{
              data: [62, 48, 35, 24],
              backgroundColor: [
                'rgba(255, 107, 157, 0.7)',
                'rgba(78, 205, 196, 0.7)',
                'rgba(255, 215, 0, 0.7)',
                'rgba(69, 183, 209, 0.7)'
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
                  label: (context) => `${context.label}: ${context.parsed.r}% improvement`
                }
              }
            },
            animation: { 
              duration: 1500,
              easing: 'easeInOutQuart',
              animateRotate: true,
              animateScale: true
            },
            scales: {
              r: {
                beginAtZero: true,
                ticks: {
                  backdropColor: 'transparent',
                  color: '#6b7280',
                  font: { size: 10 },
                  stepSize: 20
                },
                grid: {
                  color: 'rgba(139, 92, 246, 0.1)',
                  circular: true
                },
                angleLines: {
                  color: 'rgba(139, 92, 246, 0.15)'
                },
                pointLabels: {
                  color: '#374151',
                  font: { size: 11, weight: '500' }
                }
              }
            }
          }
        },
        {
          id: 'loadTrendsChart',
          type: 'line',
          title: 'System Resource Utilization Trends',
          icon: 'monitoring',
          width: 'half',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'CPU Usage (%)',
                data: [68, 71, 65, 78, 73, 82, 76, 85, 79, 88, 84, 87],
                borderColor: '#0ea2bd',
                backgroundColor: 'rgba(14, 162, 189, 0.2)',
                borderWidth: 3,
                fill: 'origin',
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#0ea2bd',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointHoverBackgroundColor: '#0ea2bd',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 3
              },
              {
                label: 'Memory Usage (%)',
                data: [62, 58, 64, 67, 61, 72, 69, 75, 71, 78, 74, 76],
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.2)',
                borderWidth: 3,
                fill: 'origin',
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#28a745',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointHoverBackgroundColor: '#28a745',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 3
              }
            ]
          },
          options: {
            interaction: {
              mode: 'index',
              intersect: false
            },
            plugins: {
              legend: {
                position: 'top',
                align: 'center',
                labels: {
                  padding: 15,
                  usePointStyle: true,
                  pointStyle: 'circle',
                  font: { size: 12, weight: '500' },
                  color: '#374151',
                  boxWidth: 8,
                  boxHeight: 8
                }
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: 'rgba(139, 92, 246, 0.5)',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                  title: (context) => `Month: ${context[0].label}`,
                  label: (context) => `${context.dataset.label}: ${context.parsed.y}%`
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                title: {
                  display: true,
                  text: 'Usage Percentage (%)',
                  font: { size: 12, weight: '600' },
                  color: '#6b7280'
                },
                ticks: {
                  callback: (value) => value + '%',
                  color: '#6b7280',
                  font: { size: 11 }
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)',
                  drawBorder: false
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Month',
                  font: { size: 12, weight: '600' },
                  color: '#6b7280'
                },
                ticks: {
                  color: '#6b7280',
                  font: { size: 11 }
                },
                grid: {
                  display: false
                }
              }
            },
            animation: { 
              duration: 1500,
              easing: 'easeInOutQuart'
            }
          }
        },
        {
          id: 'errorRateChart',
          type: 'bar',
          title: 'Error Rate Analysis by Category',
          icon: 'target',
          width: 'half',
          data: {
            labels: ['API Errors', 'Database Errors', 'Network Errors', 'Auth Errors', 'Validation Errors'],
            datasets: [{
              label: 'Error Rate (%)',
              data: [0.18, 0.07, 0.14, 0.04, 0.11],
              backgroundColor: [
                'rgba(255, 107, 53, 0.8)',
                'rgba(220, 53, 69, 0.8)',
                'rgba(253, 126, 20, 0.8)',
                'rgba(111, 66, 193, 0.8)',
                'rgba(232, 62, 140, 0.8)'
              ],
              borderWidth: 2,
              borderColor: '#ffffff',
              borderRadius: 8
            }]
          },
          options: {
            interaction: {
              mode: 'index',
              intersect: true
            },
            plugins: {
              legend: { 
                display: false 
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
                  title: (context) => context[0].label,
                  label: (context) => `Error Rate: ${context.parsed.y.toFixed(3)}%`
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 0.25,
                title: {
                  display: true,
                  text: 'Error Rate (%)',
                  font: { size: 12, weight: '600' },
                  color: '#6b7280'
                },
                ticks: {
                  callback: (value) => (value * 100).toFixed(2) + '%',
                  color: '#6b7280',
                  font: { size: 11 }
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)',
                  drawBorder: false
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Error Category',
                  font: { size: 12, weight: '600' },
                  color: '#6b7280'
                },
                ticks: {
                  color: '#6b7280',
                  font: { size: 11 }
                },
                grid: {
                  display: false
                }
              }
            },
            animation: { 
              duration: 1500,
              easing: 'easeInOutQuart'
            }
          }
        },
        {
          id: 'monthlyMetricsChart',
          type: 'bar',
          title: 'Monthly Performance Trends - Response Time vs Throughput',
          icon: 'analytics',
          width: 'full',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Response Time (ms)',
                data: [2320, 2180, 2050, 1920, 1750, 1580, 1420, 1280, 1120, 980, 860, 810],
                backgroundColor: 'rgba(14, 162, 189, 0.8)',
                borderColor: '#0ea2bd',
                borderWidth: 2,
                yAxisID: 'y',
                borderRadius: 6
              },
              {
                label: 'Throughput (req/sec)',
                data: [1180, 1240, 1380, 1520, 1680, 1840, 1950, 2120, 2280, 2420, 2580, 2720],
                type: 'line',
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.2)',
                borderWidth: 3,
                fill: false,
                tension: 0.4,
                yAxisID: 'y1',
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: '#28a745',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
              }
            ]
          },
          options: {
            interaction: {
              mode: 'index',
              intersect: false
            },
            plugins: {
              legend: {
                position: 'top',
                align: 'center',
                labels: {
                  padding: 15,
                  usePointStyle: true,
                  pointStyle: 'circle',
                  font: { size: 12, weight: '500' },
                  color: '#374151',
                  boxWidth: 10,
                  boxHeight: 10
                }
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: 'rgba(139, 92, 246, 0.5)',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                  title: (context) => `Month: ${context[0].label}`,
                  label: (context) => {
                    const label = context.dataset.label
                    const value = context.parsed.y
                    const unit = label.includes('Response') ? 'ms' : 'req/sec'
                    return `${label}: ${value} ${unit}`
                  }
                }
              }
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Response Time (ms)',
                  font: { size: 12, weight: '600' },
                  color: '#0ea2bd'
                },
                ticks: {
                  color: '#6b7280',
                  font: { size: 11 },
                  callback: (value) => value.toLocaleString() + ' ms'
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)',
                  drawBorder: false
                }
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Throughput (req/sec)',
                  font: { size: 12, weight: '600' },
                  color: '#28a745'
                },
                ticks: {
                  color: '#6b7280',
                  font: { size: 11 },
                  callback: (value) => value.toLocaleString() + ' req/s'
                },
                grid: {
                  drawOnChartArea: false
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Month (2022)',
                  font: { size: 12, weight: '600' },
                  color: '#6b7280'
                },
                ticks: {
                  color: '#6b7280',
                  font: { size: 11 }
                },
                grid: {
                  display: false
                }
              }
            },
            animation: { 
              duration: 1500,
              easing: 'easeInOutQuart'
            }
          }
        }
      ],
      roiMetrics: [
        { value: '$4.2M', label: 'Annual Cost Savings', color: 'green' },
        { value: '40%', label: 'Maintenance Cost Reduction', color: 'purple' },
        { value: '$12M+', label: 'Prevented Equipment Failures', color: 'pink' },
        { value: '18 Months', label: 'ROI Achievement Period', color: 'cyan' }
      ]
    }
  }
}
</script>

<style scoped>
/* Heat Exchanger specific styles - None needed, all in components */
</style>

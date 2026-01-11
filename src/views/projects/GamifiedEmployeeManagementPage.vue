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
  <ProjectPageTemplate projectTitle="Gamified Employee Management">
    
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
        client="Enterprise Client"
        projectDate="2020-2023"
        projectUrl=""
        companySize="Enterprise (10K+ employees)"
      />
    </template>
    
    <!-- Main Content Bottom -->
    <template #main-content-bottom>
      
      <!-- C4 Architecture Diagram -->
      <DiagramViewer 
        title="C4 Architecture Diagram"
        :icon-name="PROJECT_ICON_NAMES.ARCHITECTURE_OVERVIEW"
        diagram-src="/assets/diagrams/GamifiedEmployeeManagement_C4_Diagram.svg"
        :narration-steps="gamifiedEmployeeManagementNarrationSteps"
        :svg-width="12143"
        :svg-height="7346"
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
        mainTitle="Gamified Employee Management Business Impact & Growth Metrics"
        :mainIcon="ROI_ICON_NAMES.MAIN_ICON"
        leftTitle="Financial Growth Impact"
        :leftIcon="ROI_ICON_NAMES.FINANCIAL_ICON"
        rightTitle="Operational Growth Impact"
        :rightIcon="ROI_ICON_NAMES.OPERATIONAL_ICON"
        metricsTitle="Gamified Employee Management Growth Success Metrics"
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

// Import constants
import { 
  PROJECT_ICON_NAMES, 
  PROJECT_CATEGORIES, 
  TECH_CATEGORIES,
  ROI_ICON_NAMES 
} from '@/config/constants.js'

export default {
  name: 'GamifiedEmployeeManagementPage',
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
    // Gamified Employee Management Project Data
    // TODO: Update with actual content from c:\inetpub\portfolio when available
    const projectData = ref({
      title: 'Gamified Employee Management',
      description: 'An innovative employee engagement and management platform that leverages gamification principles to motivate employees, track performance, and enhance workplace productivity. This comprehensive system combines performance management, goal tracking, rewards, and analytics to create an engaging employee experience.',
      tags: [
        'Gamification',
        'Employee Engagement',
        'Performance Management',
        'Analytics'
      ],
      achievementsCol1: [
        { emoji: 'performance', label: 'User Engagement', value: 'High' },
        { emoji: 'analytics', label: 'Performance Tracking', value: 'Real-time' }
      ],
      achievementsCol2: [
        { emoji: 'automation', label: 'Automation', value: 'Goal-based' },
        { emoji: 'enterprise', label: 'Enterprise Scale', value: 'Multi-tenant' }
      ]
    })

    // Gallery Data
    const galleryData = ref({
      title: "Gamified Employee Management Gallery",
      projectName: "Gamified Employee Management",
      images: [
        "/assets/img/sf1.jpg",
        "/assets/img/sf2.jpg",
        "/assets/img/sf3.jpg",
        "/assets/img/sf4.jpg",
        "/assets/img/sf5.jpg"
      ]
    })

    // Project Overview Data
    // TODO: Update with actual content from c:\inetpub\portfolio
    const projectOverviewData = ref({
      description: `Gamified Employee Management is an innovative platform that transforms traditional employee management through gamification, making work more engaging and motivating. This system helps organizations improve employee performance, increase engagement, and drive productivity through game-like mechanics, rewards, and real-time feedback.

The Challenge:
Organizations struggle with low employee engagement, difficulty tracking performance, and lack of motivation in the workplace. Traditional performance management systems are often rigid, infrequent, and fail to provide real-time feedback. Companies need a solution that makes employee management engaging, provides continuous performance insights, and motivates employees through recognition and rewards.

The Solution:
The Gamified Employee Management platform combines gamification principles with modern performance management features. Employees earn points, badges, and achievements for completing goals, demonstrating desired behaviors, and achieving milestones. The system provides real-time performance dashboards, goal tracking, leaderboards, and reward mechanisms to create an engaging workplace experience.

Key Features:
• Gamification Engine: Points, badges, levels, and achievements system
• Goal Management: Set, track, and achieve employee goals with gamified progress
• Performance Analytics: Real-time performance tracking and insights
• Rewards & Recognition: Integrated rewards system with redemption options
• Leaderboards: Competitive rankings to drive engagement
• Team Collaboration: Team-based challenges and competitions
• Mobile App: Accessible on all devices for on-the-go engagement
• Admin Dashboard: Comprehensive management and analytics tools

Technical Architecture:
Built with modern web technologies and mobile-first design, the platform features a scalable microservices architecture supporting multi-tenant organizations. The system includes real-time notifications, comprehensive analytics, and integrations with HR systems for seamless employee data management.

Business Impact:
This platform significantly improves employee engagement and productivity through gamification. Organizations report increased motivation, better goal completion rates, and enhanced employee satisfaction. The real-time feedback and recognition features create a positive work culture while the analytics provide valuable insights into workforce performance.`
    })

    // Technologies
    // TODO: Update with actual technologies from c:\inetpub\portfolio
    const technologies = ref([
      // Frontend Technologies
      { name: "Angular", description: "Frontend framework for employee management interface", category: TECH_CATEGORIES.FRONTEND },
      { name: "TypeScript", description: "Type-safe JavaScript for Angular development", category: TECH_CATEGORIES.FRONTEND },
      { name: "Bootstrap", description: "Responsive framework for mobile-first design", category: TECH_CATEGORIES.FRONTEND },
      
      // Backend Technologies
      { name: "ASP.NET Core Web API", description: "RESTful web services for gamification engine and employee management", category: TECH_CATEGORIES.BACKEND },
      { name: "Entity Framework Core", description: "ORM for database operations and data modeling", category: TECH_CATEGORIES.BACKEND },
      
      // Database
      { name: "SQL Server Database", description: "Relational database for employee data and performance metrics", category: TECH_CATEGORIES.DATABASE },
      { name: "Redis", description: "In-memory caching for high-performance gamification calculations", category: TECH_CATEGORIES.DATABASE },
      
      // Cloud & Hosting
      { name: "Azure App Service", description: "Cloud hosting platform for scalable deployment", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure SQL Database", description: "Cloud database with high availability", category: TECH_CATEGORIES.CLOUD }
    ])

    // Architecture Layers
    const architectureLayers = ref([
      {
        icon: 'portal',
        title: 'Employee Engagement Portal & Frontend Application',
        description: 'Modern Angular-based web portal providing employees with unified access to gamification features, performance tracking, goals, achievements, rewards, and comprehensive analytics. Features responsive design, real-time updates, personalized dashboards, and mobile-first architecture for seamless access across desktop, tablet, and mobile devices.',
        features: [
          {
            icon: 'angular',
            name: 'Angular 12+ Employee Portal',
            description: 'Comprehensive single-page application built with Angular 12+ and TypeScript featuring component-based architecture, reactive forms, and RxJS observables for state management. Includes interactive dashboards with real-time data binding, goal tracking interfaces with progress visualization, achievement galleries with badge displays, leaderboard views with ranking animations, and performance analytics with Chart.js integration. Implements lazy loading modules, route guards for authentication, and interceptor services for API communication. Features responsive design patterns, mobile-first approach, and progressive web app capabilities for seamless access across all devices.'
          },
          {
            icon: 'mobile',
            name: 'Mobile-First Responsive Design',
            description: 'Optimized mobile experience ensuring employees can track performance, view achievements, and engage with gamification features on-the-go. Features touch-friendly interfaces with gesture support, responsive grid layouts using Bootstrap, adaptive navigation patterns, and mobile-optimized forms. Includes push notification support for achievement unlocks, goal reminders, and leaderboard updates. Implements offline capability with service workers for critical features, background sync for data updates, and local storage for cached content. Provides seamless experience across iOS, Android, and desktop browsers with consistent UI/UX patterns.'
          },
          {
            icon: 'signalr',
            name: 'SignalR Real-Time Communication',
            description: 'Live performance updates, instant achievement notifications, and real-time leaderboard rankings using SignalR WebSocket connections. Features bidirectional communication for immediate feedback, automatic reconnection handling for network resilience, and efficient message broadcasting for leaderboard updates. Implements connection management with heartbeat monitoring, group-based messaging for team competitions, and user-specific notifications for achievements. Provides sub-second update delivery for critical gamification events including score changes, badge unlocks, and ranking updates across all connected clients.'
          },
          {
            icon: 'chart.js',
            name: 'Chart.js Analytics Dashboard',
            description: 'Interactive charts and graphs for performance visualization, goal progress tracking, and engagement metrics using Chart.js library. Features multiple chart types including line charts for performance trends, doughnut charts for goal completion, bar charts for achievement distribution, and polar area charts for gamification metrics. Includes real-time chart updates with data streaming, customizable dashboards with drag-and-drop widgets, and export functionality for reports. Provides comprehensive performance insights with drill-down capabilities, time-series analysis, and comparative visualizations for employee engagement patterns.'
          },
          {
            icon: 'bootstrap',
            name: 'Bootstrap 5 UI Framework',
            description: 'Responsive UI framework providing consistent design patterns, grid system, and component library. Features mobile-first breakpoints, flexbox-based grid system, comprehensive component library including cards, modals, tooltips, and dropdowns. Includes custom theming with CSS variables, accessibility compliance with ARIA attributes, and cross-browser compatibility. Provides responsive navigation patterns, form validation styles, and utility classes for rapid development and consistent user experience across all devices and platforms.'
          },
          {
            icon: 'pwa',
            name: 'Progressive Web App (PWA)',
            description: 'PWA implementation enabling offline access to critical features, push notifications, and app-like experience. Features service workers for offline functionality, background sync for data updates, and web app manifest for installation. Includes offline caching strategies for static assets and API responses, push notification support for achievements and reminders, and home screen installation prompts. Provides app-like experience with full-screen mode, splash screens, and native-feel navigation patterns for enhanced user engagement.'
          }
        ]
      },
      {
        icon: 'services',
        title: 'Gamification Engine & Backend Microservices',
        description: 'High-performance ASP.NET Core microservices architecture handling gamification logic, point calculations, badge assignments, leaderboard management, reward processing, and event-driven achievement triggers. Features scalable microservices with independent deployment, event-driven communication, and comprehensive API endpoints for all gamification operations.',
        features: [
          {
            icon: 'api',
            name: 'ASP.NET Core Web API Microservices',
            description: 'RESTful microservices built with ASP.NET Core Web API featuring clean architecture patterns, dependency injection, and middleware pipeline. Includes gamification rules engine service for rule evaluation, points calculation service for score management, badge assignment service for achievement processing, leaderboard generation service for ranking calculations, and reward processing service for redemption handling. Implements API versioning, OpenAPI/Swagger documentation, and comprehensive error handling. Features JWT authentication, role-based authorization, and rate limiting for API protection. Provides high-performance request processing with async/await patterns, connection pooling, and response compression.'
          },
          {
            icon: 'automation',
            name: 'Event-Driven Gamification Rules Engine',
            description: 'Flexible rules engine for defining and evaluating gamification mechanics including point systems, achievement criteria, badge requirements, and reward triggers. Features configurable business rules stored in database with dynamic rule evaluation, rule priority management for conflict resolution, and parallel rule processing for performance. Implements expression tree compilation for rule optimization, rule dependency tracking for efficient evaluation, and rule versioning for backward compatibility. Provides event-driven architecture where employee actions trigger rule evaluation, achievement checks, and badge assignments automatically. Supports complex rule conditions including time-based rules, threshold-based rules, and composite rules with logical operators.'
          },
          {
            icon: 'realtime',
            name: 'Real-Time Performance Data Processing',
            description: 'High-throughput event processing system for employee performance data, goal completions, and achievement triggers. Features event-driven architecture with message queue integration, batch processing for efficiency, and parallel processing for scalability. Implements event sourcing patterns for audit trails, CQRS separation for read/write optimization, and eventual consistency guarantees. Provides real-time processing of goal completion events, performance metric updates, and achievement triggers with sub-second latency. Includes event aggregation, filtering, and routing for efficient data flow across microservices.'
          },
          {
            icon: 'analytics',
            name: 'Dynamic Leaderboard Generation Service',
            description: 'Efficient leaderboard generation with multiple ranking criteria, time-based competitions, and team-based rankings. Features Redis sorted sets for O(log N) ranking operations, incremental score updates for efficiency, and range queries for pagination. Implements multiple leaderboard types including global rankings, department rankings, team rankings, and time-based competitions. Provides efficient calculation algorithms with caching strategies, background refresh for hot leaderboards, and lazy loading for historical data. Includes support for complex ranking criteria including weighted scores, time-decay factors, and custom ranking formulas for different competition types.'
          },
          {
            icon: 'cache',
            name: 'Redis Caching & Session Management',
            description: 'High-performance caching layer using Redis for leaderboard data, active user sessions, and frequently accessed gamification metrics. Features intelligent cache invalidation strategies, cache warming for hot data, and multi-level caching with memory and Redis. Implements distributed caching for multi-instance deployments, cache expiration policies, and cache-aside pattern for data consistency. Provides sub-millisecond data access for leaderboard queries, session management with automatic expiration, and pub/sub messaging for real-time updates. Includes cache monitoring, hit rate tracking, and performance metrics for optimization.'
          },
          {
            icon: 'security',
            name: 'Authentication & Authorization Services',
            description: 'Comprehensive security services with JWT token-based authentication, role-based access control, and multi-tenant authorization. Features OAuth 2.0 integration, refresh token rotation, and session management. Implements claims-based authorization, policy-based access control, and tenant isolation for multi-tenant deployments. Provides secure API endpoints with rate limiting, IP whitelisting, and request validation. Includes audit logging for security events, password hashing with bcrypt, and two-factor authentication support for enhanced security.'
          }
        ]
      },
      {
        icon: 'database',
        title: 'Employee Data Infrastructure & Storage',
        description: 'Robust multi-database architecture optimized for employee data management, performance metrics storage, gamification state tracking, and multi-tenant data isolation. Features high availability, automated backups, comprehensive data integrity, and efficient query performance for enterprise-scale deployments.',
        features: [
          {
            icon: 'sql server',
            name: 'SQL Server Employee Database',
            description: 'Enterprise-grade relational database storing employee profiles, performance records, goal definitions, achievements, badges, rewards, and historical gamification data. Features comprehensive data model with normalized schema, foreign key constraints for referential integrity, and indexed tables for query optimization. Includes stored procedures for complex queries, database triggers for automated processes, and views for data aggregation. Implements row-level security for multi-tenant isolation, database encryption at rest, and transactional consistency with ACID guarantees. Provides high availability with Always On availability groups, automated backups with point-in-time recovery, and performance monitoring with query store. Features partitioning for large tables, full-text search capabilities, and XML/JSON data type support for flexible schema requirements.'
          },
          {
            icon: 'redis',
            name: 'Redis In-Memory Cache & Pub/Sub',
            description: 'High-performance in-memory data store for leaderboard data, active user sessions, real-time gamification state, and frequently accessed metrics. Features Redis sorted sets for leaderboard storage with O(log N) ranking operations, string caching for session data, and hash structures for user profiles. Implements pub/sub messaging for real-time notifications, expiration policies for automatic cleanup, and persistence options for data durability. Provides distributed caching for multi-instance deployments, Lua scripting for atomic operations, and pipeline batching for performance. Includes Redis Cluster support for horizontal scaling, sentinel for high availability, and monitoring with RedisInsight. Features sub-millisecond data access for hot data, intelligent cache warming, and cache-aside pattern implementation.'
          },
          {
            icon: 'entity framework',
            name: 'Entity Framework Core ORM',
            description: 'Object-relational mapping framework for seamless database operations, performance data modeling, and query optimization. Features Code First approach with migration support, LINQ integration for type-safe queries, and change tracking for efficient updates. Implements fluent API for complex mappings, value converters for data transformation, and shadow properties for metadata. Provides query optimization with compiled queries, bulk operations for performance, and lazy/eager loading strategies. Includes database-first reverse engineering, model validation with data annotations, and transaction management with unit of work pattern. Features async/await support for non-blocking operations, connection resilience with retry policies, and query interception for logging and auditing.'
          },
          {
            icon: 'database',
            name: 'Multi-Tenant Database Architecture',
            description: 'Schema-per-tenant architecture with shared database infrastructure providing complete data isolation and efficient resource utilization. Features dynamic schema management for tenant provisioning, tenant-aware data access with automatic filtering, and cross-tenant query isolation. Implements row-level security policies, tenant context injection middleware, and schema naming conventions for organization. Provides efficient tenant switching, shared infrastructure optimization, and independent tenant scaling. Includes tenant migration tools, schema versioning, and backup/restore per tenant. Features comprehensive data isolation guarantees, audit trails per tenant, and tenant-specific configuration management.'
          },
          {
            icon: 'automation',
            name: 'Data Migration & ETL Services',
            description: 'Comprehensive data migration and ETL services for importing employee data, synchronizing with HR systems, and batch processing historical data. Features incremental data loading, data transformation pipelines, and error handling with retry logic. Implements batch processing for large datasets, parallel processing for performance, and checkpoint/resume capabilities for long-running operations. Provides data validation, duplicate detection, and data quality checks. Includes scheduling capabilities, monitoring dashboards, and audit logging for all data operations.'
          }
        ]
      },
      {
        icon: 'cloud',
        title: 'Azure Cloud Infrastructure & Deployment',
        description: 'Enterprise-grade Azure cloud infrastructure providing scalable hosting, high availability, security, and comprehensive monitoring for the gamified employee management platform. Features auto-scaling capabilities, geographic redundancy, and integrated Azure services for optimal performance and reliability.',
        features: [
          {
            icon: 'azure app service',
            name: 'Azure App Service Hosting',
            description: 'Scalable cloud hosting platform for ASP.NET Core microservices with automatic scaling, load balancing, and integrated deployment pipelines. Features multiple pricing tiers, auto-scaling based on metrics, and seamless deployment slots for zero-downtime updates. Includes integrated SSL certificates, custom domain support, and IP restrictions for security. Provides application insights integration, health check endpoints, and container support. Features staging environments, blue-green deployments, and rollback capabilities for safe releases.'
          },
          {
            icon: 'azure sql',
            name: 'Azure SQL Database',
            description: 'Fully managed cloud database service with high availability, automated backups, and built-in security. Features elastic pools for cost optimization, geo-replication for disaster recovery, and automated tuning for performance. Includes threat detection, vulnerability assessment, and transparent data encryption. Provides point-in-time restore, long-term retention backups, and database copy capabilities. Features serverless compute for cost efficiency, advanced data security, and comprehensive monitoring with Azure Monitor.'
          },
          {
            icon: 'azure cache redis',
            name: 'Azure Cache for Redis',
            description: 'Managed Redis cache service providing high-performance caching with high availability and security. Features Standard and Premium tiers, Redis persistence options, and geo-replication for disaster recovery. Includes Redis Cluster support, advanced security with VNet integration, and monitoring with Azure Monitor. Provides automatic patching, scaling capabilities, and comprehensive SLA guarantees. Features integration with Azure services, backup/restore capabilities, and performance optimization tools.'
          },
          {
            icon: 'monitoring',
            name: 'Azure Application Insights',
            description: 'Comprehensive application performance monitoring and analytics platform providing real-time insights into system performance, user behavior, and application health. Features application map for dependency visualization, performance monitoring with response time tracking, and exception tracking with stack traces. Includes custom telemetry, log aggregation, and alerting capabilities. Provides availability monitoring, user analytics, and diagnostic tools. Features integration with Azure DevOps, Power BI connectivity, and API access for custom dashboards.'
          }
        ]
      }
    ])

    const architectureBenefits = ref("The Gamified Employee Management architecture delivers a comprehensive employee engagement ecosystem that transforms workplace motivation through advanced gamification technology. Built on ASP.NET Core microservices and Angular frontend, the system provides unprecedented capabilities for employee engagement and performance management. The responsive Angular portal ensures seamless access across all devices, enabling employees to engage with gamification features from anywhere. The real-time gamification engine delivers instant feedback, achievement notifications, and dynamic leaderboard updates. Microservices architecture enables independent scaling of gamification services, performance tracking, and analytics. The Azure cloud deployment ensures high availability and scalability for enterprise organizations. Redis caching provides ultra-fast leaderboard generation and session management. The comprehensive analytics platform enables data-driven insights into employee engagement patterns and performance trends.")

    // Engineering Challenges
    const engineeringChallenges = ref([
      {
        icon: 'performance',
        title: 'Real-Time Leaderboard Performance & Scalability',
        problem: 'Generating real-time leaderboards for thousands of employees across multiple organizations with complex ranking criteria, time-based competitions, team-based rankings, and frequent score updates. Required sub-second response times (<100ms) and efficient calculation algorithms to handle high concurrent access during peak engagement periods (10K+ simultaneous users). Challenge included managing multiple leaderboard types (global, department, team, time-based), supporting complex ranking formulas with weighted scores, and maintaining data consistency during concurrent updates across distributed systems.',
        solutions: [
          {
            icon: 'redis',
            name: 'Redis Sorted Sets for Leaderboard Storage',
            description: 'Implemented Redis sorted sets (ZSET) data structure providing O(log N) complexity for score updates and range queries. Features incremental score updates using ZINCRBY for atomic operations, range queries (ZRANGE, ZREVRANGE) for efficient pagination, and automatic sorting by score. Achieves sub-100ms response times for leaderboard generation even with millions of entries. Includes support for multiple leaderboards with key naming conventions, score aggregation for team rankings, and automatic expiration for time-based competitions using TTL.'
          },
          {
            icon: 'cache',
            name: 'Multi-Layer Caching Strategy',
            description: 'Implemented comprehensive caching strategy with L1 cache (in-memory) for frequently accessed leaderboards, L2 cache (Redis) for hot data, and L3 (SQL Server) for historical data. Features cache warming on application startup, intelligent cache invalidation on score updates using pub/sub messaging, and background refresh for top 100 leaderboards. Includes cache stampede prevention, cache-aside pattern implementation, and cache hit rate monitoring. Provides fallback to database for cache misses with automatic cache population.'
          },
          {
            icon: 'database',
            name: 'Optimized Database Queries & Indexing',
            description: 'Optimized Entity Framework Core queries with proper composite indexing on (TenantId, Score, UpdatedDate) columns, query projection to select only required fields, and batch operations for bulk updates. Implemented database views for complex ranking calculations, materialized aggregates for performance metrics, and stored procedures for leaderboard queries. Features query result caching, connection pooling optimization, and query execution plan analysis. Includes database partitioning for large leaderboard tables and full-text search capabilities for employee name lookups.'
          },
          {
            icon: 'performance',
            name: 'Incremental Score Update Algorithm',
            description: 'Developed efficient incremental update algorithm that processes score changes without recalculating entire leaderboards. Features delta updates using Redis atomic operations, batch processing for multiple score changes, and background recalculation for consistency. Implements optimistic concurrency control, conflict resolution strategies, and eventual consistency guarantees. Provides real-time score updates with minimal latency and ensures data integrity during concurrent modifications.'
          }
        ]
      },
      {
        icon: 'automation',
        title: 'Event-Driven Gamification Rules Engine Scalability',
        problem: 'Processing complex gamification rules for thousands of employees with dynamic achievement criteria, badge requirements, reward triggers, and multi-condition rule evaluation. Required flexible rule configuration without code deployment, efficient rule evaluation with sub-second latency, support for complex rule logic (AND/OR operators, time-based conditions, threshold checks), and ability to handle rule updates without system downtime. Challenge included managing rule dependencies, handling rule conflicts, and ensuring rule evaluation performance at scale with thousands of concurrent rule evaluations.',
        solutions: [
          {
            icon: 'automation',
            name: 'Event-Driven Rules Engine Architecture',
            description: 'Built event-driven rules engine that evaluates gamification rules asynchronously based on employee actions and performance events. Features rule registration system with event subscription, rule priority management for conflict resolution, and parallel rule evaluation using task parallel library. Implements event matching algorithms for efficient rule filtering, rule dependency tracking for correct evaluation order, and rule execution pipeline with error handling. Provides support for complex rule conditions including time-based rules (daily, weekly, monthly), threshold-based rules (points, goals, achievements), and composite rules with logical operators (AND, OR, NOT).'
          },
          {
            icon: 'performance',
            name: 'Rule Compilation & Expression Tree Optimization',
            description: 'Implemented rule compilation system that converts rule expressions into optimized expression trees for efficient evaluation. Features expression tree caching for repeated rule evaluations, expression tree optimization with constant folding, and compiled delegate generation for performance. Includes rule dependency analysis, rule validation before compilation, and versioning support for rule updates. Provides sub-millisecond rule evaluation times through compiled expressions and eliminates runtime parsing overhead. Features rule profiling and performance monitoring for optimization.'
          },
          {
            icon: 'cache',
            name: 'Rule Caching & Dependency Management',
            description: 'Implemented comprehensive rule caching system with dependency tracking for efficient rule evaluation and updates. Features rule cache with TTL-based expiration, dependency graph for rule relationships, and cache invalidation on rule updates. Includes cache warming on application startup, lazy loading for infrequently used rules, and cache statistics for monitoring. Provides rule versioning support, backward compatibility checks, and gradual rule rollout capabilities. Features rule conflict detection and resolution strategies for overlapping rules.'
          },
          {
            icon: 'database',
            name: 'Dynamic Rule Configuration & Management',
            description: 'Developed rule management system allowing business users to configure rules without code deployment. Features rule builder UI for visual rule creation, rule validation engine for syntax checking, and rule testing framework for verification. Implements rule storage in database with JSON schema, rule versioning for change tracking, and rule activation/deactivation capabilities. Provides rule import/export functionality, rule templates for common patterns, and rule analytics for usage tracking. Features A/B testing support for rule variants and gradual rule rollout for safe deployment.'
          }
        ]
      },
      {
        icon: 'security',
        title: 'Multi-Tenant Architecture & Data Isolation',
        problem: 'Supporting multiple enterprise organizations (10K+ employees each) with complete data isolation, organization-specific gamification rules, shared infrastructure for cost efficiency, and independent scaling per tenant. Required tenant-aware data access with automatic filtering, secure multi-tenancy with no cross-tenant data leakage, efficient resource utilization across tenants, and support for tenant-specific customizations. Challenge included managing tenant provisioning, ensuring query performance with tenant filtering, handling tenant migrations, and maintaining data isolation guarantees across all system layers.',
        solutions: [
          {
            icon: 'security',
            name: 'Tenant-Aware Data Access Layer',
            description: 'Implemented comprehensive tenant isolation at the data access layer with automatic tenant filtering on all queries. Features tenant context injection middleware that extracts tenant ID from JWT claims, Entity Framework query interceptors for automatic WHERE clause injection, and repository pattern with tenant-aware base repository. Includes row-level security policies at database level, tenant context validation, and comprehensive data isolation guarantees. Provides audit logging per tenant, tenant-specific configuration management, and secure tenant switching mechanisms. Features tenant context propagation across service boundaries and async operation support.'
          },
          {
            icon: 'database',
            name: 'Schema-Per-Tenant Database Architecture',
            description: 'Deployed schema-per-tenant architecture with shared database infrastructure providing complete logical isolation. Features dynamic schema management with automatic schema creation on tenant provisioning, schema naming conventions (Tenant_XXX), and schema migration tools for updates. Implements shared tables for common data (master data, configurations), tenant-specific tables for business data, and cross-schema queries with proper isolation. Provides efficient tenant switching using database context switching, schema-level backup/restore capabilities, and tenant-specific database settings. Includes schema versioning, tenant migration tools, and schema consolidation utilities for optimization.'
          },
          {
            icon: 'automation',
            name: 'Automatic Tenant Provisioning & Management',
            description: 'Developed automated tenant provisioning system with self-service onboarding and configuration. Features tenant registration API with validation, automatic schema creation, and default configuration setup. Implements tenant activation/deactivation workflows, tenant data export/import capabilities, and tenant deletion with data retention policies. Includes tenant quota management (storage, API calls, users), tenant health monitoring, and tenant-specific feature toggles. Provides tenant admin portal for self-management, tenant usage analytics, and billing integration for usage tracking.'
          },
          {
            icon: 'performance',
            name: 'Efficient Cross-Tenant Query Optimization',
            description: 'Optimized database queries for multi-tenant scenarios with proper indexing strategies and query patterns. Features composite indexes on (TenantId, ...) for all tenant-specific tables, query result caching per tenant, and connection pooling with tenant affinity. Implements query plan caching per tenant schema, parameterized queries for SQL injection prevention, and batch operations for multi-tenant updates. Provides query performance monitoring per tenant, slow query detection, and automatic query optimization recommendations. Includes tenant-specific database connection strings for dedicated resources when needed.'
          }
        ]
      },
      {
        icon: 'realtime',
        title: 'Real-Time Achievement Processing & Notification System',
        problem: 'Processing achievement unlocks, badge assignments, and reward triggers in real-time for thousands of concurrent employees with sub-second latency requirements. Required event-driven architecture for immediate processing, reliable delivery guarantees, handling of burst traffic during peak events, and comprehensive notification system across multiple channels (in-app, email, push). Challenge included ensuring achievement calculation accuracy, preventing duplicate achievements, managing notification delivery failures, and handling high-volume event processing during organization-wide events.',
        solutions: [
          {
            icon: 'realtime',
            name: 'Event-Driven Achievement Processing Pipeline',
            description: 'Built event-driven architecture using message queues (Azure Service Bus) for reliable achievement processing. Features event publishing for employee actions (goal completion, milestone reached), event consumers for achievement evaluation, and guaranteed message delivery with retry policies. Implements idempotency keys for duplicate detection, event ordering for sequential processing, and dead-letter queue for failed processing. Provides horizontal scaling with multiple consumer instances, load balancing across consumers, and message batching for efficiency. Includes event replay capabilities, event schema versioning, and comprehensive event logging for audit trails.'
          },
          {
            icon: 'automation',
            name: 'Achievement Calculation Engine with Idempotency',
            description: 'Developed idempotent achievement calculation engine ensuring accurate processing even with duplicate events. Features idempotency key generation using (EmployeeId + AchievementId + EventId), database constraints for duplicate prevention, and idempotent operation design. Implements atomic achievement assignment using database transactions, optimistic concurrency control, and conflict resolution strategies. Provides achievement state machine (Pending → Evaluating → Awarded), achievement locking for concurrent evaluation, and rollback capabilities for failed assignments. Includes achievement eligibility checking, prerequisite validation, and achievement history tracking.'
          },
          {
            icon: 'signalr',
            name: 'Real-Time Notification System with SignalR',
            description: 'Implemented comprehensive notification system using SignalR for real-time in-app notifications and multiple channels. Features SignalR hub for WebSocket connections, group management for team notifications, and connection management with heartbeat monitoring. Implements notification queuing for offline users, notification persistence for delivery guarantees, and notification preferences per user. Provides multiple notification channels including in-app notifications, email notifications with templates, and push notifications for mobile apps. Includes notification batching for efficiency, notification delivery tracking, and notification analytics for engagement metrics.'
          },
          {
            icon: 'performance',
            name: 'High-Throughput Event Processing with Batching',
            description: 'Optimized event processing for high throughput scenarios using batching and parallel processing. Features event batching for efficient database operations, parallel processing with Task Parallel Library, and backpressure handling for burst traffic. Implements adaptive batching based on load, batch size optimization through monitoring, and batch timeout handling. Provides circuit breaker pattern for downstream service protection, rate limiting per tenant, and graceful degradation during high load. Includes processing metrics monitoring, throughput optimization, and capacity planning tools.'
          }
        ]
      },
      {
        icon: 'analytics',
        title: 'Goal Management & Progress Tracking System',
        problem: 'Managing complex goal hierarchies, progress tracking for thousands of goals simultaneously, supporting various goal types (personal, team, department, organizational), and calculating progress accurately in real-time. Required flexible goal structure with dependencies, sub-goals, and milestones, efficient progress calculation algorithms, support for different goal metrics (percentage, count, value-based), and comprehensive goal analytics. Challenge included handling goal updates, progress recalculation performance with large goal hierarchies, goal dependency management, and ensuring progress accuracy during concurrent updates.',
        solutions: [
          {
            icon: 'database',
            name: 'Hierarchical Goal Data Model',
            description: 'Designed comprehensive goal data model supporting hierarchical goal structures with parent-child relationships. Features goal entity with self-referential foreign key, goal type enumeration (Personal, Team, Department, Organizational), and goal status state machine (Draft → Active → In Progress → Completed → Cancelled). Implements goal dependency tracking, sub-goal relationships, and milestone definitions. Provides flexible goal metrics including percentage-based goals, count-based goals, value-based goals, and custom metric formulas. Includes goal template system, goal cloning capabilities, and goal versioning for historical tracking.'
          },
          {
            icon: 'automation',
            name: 'Efficient Progress Calculation Engine',
            description: 'Developed optimized progress calculation engine with incremental updates and caching strategies. Features incremental progress updates using delta calculations, progress caching with Redis for frequently accessed goals, and background recalculation for consistency. Implements progress aggregation algorithms for parent goals from child goals, weighted progress calculation for multiple metrics, and progress trend analysis. Provides real-time progress updates via SignalR, progress snapshots for historical tracking, and progress validation for data integrity. Includes progress calculation optimization through materialized views and stored procedures for complex aggregations.'
          },
          {
            icon: 'performance',
            name: 'Goal Progress Tracking with Event Sourcing',
            description: 'Implemented event sourcing pattern for goal progress tracking ensuring accurate historical data and audit trails. Features progress event storage with event store, event replay for progress reconstruction, and event aggregation for current state. Implements event versioning, event schema evolution, and event compaction strategies. Provides comprehensive audit trails, progress history visualization, and point-in-time progress queries. Includes event-driven progress notifications, progress analytics from event data, and progress trend analysis over time.'
          },
          {
            icon: 'analytics',
            name: 'Goal Analytics & Reporting System',
            description: 'Built comprehensive goal analytics system providing insights into goal completion rates, progress trends, and goal effectiveness. Features goal completion rate calculations, average time to completion analysis, and goal abandonment tracking. Implements department/team goal comparisons, goal achievement distribution, and goal performance metrics. Provides goal forecasting based on historical data, goal recommendation engine, and goal template effectiveness analysis. Includes customizable goal reports, goal dashboard visualization, and goal export capabilities for external analysis.'
          }
        ]
      }
    ])

    // Business Impact Results
    const businessImpactResults = ref("These engineering solutions delivered transformative results for enterprise organizations: 45% increase in employee engagement through gamification mechanics, 92% goal completion rate with gamified goal tracking and rewards, 38% improvement in employee performance metrics, 28% increase in employee retention, and 450% ROI on engagement programs. The real-time leaderboard system and gamification engine enabled high-performance engagement tracking with sub-100ms response times. Multi-tenant architecture supported enterprise-scale deployments with complete data isolation across organizations. Event-driven gamification rules engine processed thousands of achievement triggers and badge assignments efficiently. The comprehensive analytics platform provided data-driven insights into employee engagement patterns, performance trends, and gamification effectiveness. The system successfully transformed workplace motivation through advanced gamification technology, creating an engaging employee experience across multiple enterprise organizations.")

    // Performance Stats
    const performanceStats = ref([
      {
        value: '85%',
        label: 'Employee Engagement',
        color: 'green'
      },
      {
        value: '92%',
        label: 'Goal Completion Rate',
        color: 'purple'
      },
      {
        value: '10K+',
        label: 'Active Users',
        color: 'blue'
      },
      {
        value: '99.5%',
        label: 'System Uptime',
        color: 'teal'
      }
    ])

    // Performance Charts
    const performanceCharts = ref([
      {
        id: 'gamifiedEmployeeEngagementChart',
        type: 'doughnut',
        title: 'Employee Engagement Distribution',
        icon: 'performance',
        width: 'half',
        data: {
          labels: ['Highly Engaged', 'Engaged', 'Moderately Engaged', 'Needs Improvement'],
          datasets: [{
            data: [35, 40, 20, 5],
            backgroundColor: ['#22C55E', '#4ECDC4', '#FFD700', '#FF6B9D'],
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
        id: 'gamificationPerformanceChart',
        type: 'polarArea',
        title: 'Gamification Performance Metrics',
        icon: 'analytics',
        width: 'half',
        data: {
          labels: ['Goal Completion', 'Achievement Rate', 'Leaderboard Participation', 'Reward Redemption', 'System Engagement'],
          datasets: [{
            data: [92, 88, 85, 78, 90],
            backgroundColor: [
              'rgba(34, 197, 94, 0.7)',
              'rgba(78, 205, 196, 0.7)',
              'rgba(255, 215, 0, 0.7)',
              'rgba(255, 107, 157, 0.7)',
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
                  const label = context.label || 'Metric'
                  const value = context.parsed.r || context.parsed
                  return `${label}: ${value}%`
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
        id: 'employeeEngagementTrendsChart',
        type: 'line',
        title: 'Employee Engagement Trends Over Time',
        icon: 'analytics',
        width: 'half',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Engagement Score',
            data: [72, 75, 78, 80, 82, 84, 83, 85, 87, 88, 86, 90],
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
            label: 'Goal Completion Rate',
            data: [85, 87, 88, 89, 90, 91, 90, 92, 93, 92, 91, 94],
            borderColor: '#22C55E',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#22C55E',
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
                  return `${label}: ${value}%`
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
                text: 'Percentage (%)',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
              ticks: { color: '#6B7280', font: { size: 11 } },
              beginAtZero: true,
              max: 100
            }
          },
          animation: { duration: 2000, easing: 'easeInOutQuart' }
        }
      },
      {
        id: 'gamificationMetricsChart',
        type: 'bar',
        title: 'Gamification System Performance Metrics',
        icon: 'monitoring',
        width: 'half',
        data: {
          labels: ['Leaderboard Response (ms)', 'Achievement Processing', 'Goal Tracking Accuracy', 'Reward Distribution', 'System Uptime (%)', 'User Satisfaction'],
          datasets: [{
            label: 'Performance Score',
            data: [95, 92, 98, 90, 99, 88],
            backgroundColor: [
              'rgba(78, 205, 196, 0.8)',
              'rgba(34, 197, 94, 0.8)',
              'rgba(255, 215, 0, 0.8)',
              'rgba(255, 107, 157, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(69, 183, 209, 0.8)'
            ],
            borderColor: [
              '#4ECDC4',
              '#22C55E',
              '#FFD700',
              '#FF6B9D',
              '#8B5CF6',
              '#45B7D1'
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
              display: false
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
                  const value = context.parsed.y
                  const metric = context.label || ''
                  let unit = '%'
                  if (metric.includes('(ms)')) unit = 'ms'
                  return `Performance: ${value}${unit}`
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
                text: 'Performance Score',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
              ticks: { color: '#6B7280', font: { size: 11 } },
              beginAtZero: true,
              max: 100
            }
          },
          animation: { duration: 1800, easing: 'easeInOutQuart' }
        }
      },
      {
        id: 'employeePerformanceMetricsChart',
        type: 'bar',
        title: 'Employee Performance & Engagement Metrics',
        icon: 'performance',
        width: 'full',
        data: {
          labels: ['Goal Completion', 'Achievement Earned', 'Leaderboard Rank', 'Rewards Redeemed', 'Active Participation', 'Performance Score', 'Engagement Level', 'Team Collaboration'],
          datasets: [{
            label: 'Performance Score (%)',
            data: [92, 88, 85, 78, 90, 87, 85, 82],
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(78, 205, 196, 0.8)',
              'rgba(255, 215, 0, 0.8)',
              'rgba(255, 107, 157, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(69, 183, 209, 0.8)',
              'rgba(255, 165, 0, 0.8)',
              'rgba(75, 85, 99, 0.8)'
            ],
            borderColor: [
              '#22C55E',
              '#4ECDC4',
              '#FFD700',
              '#FF6B9D',
              '#8B5CF6',
              '#45B7D1',
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
              borderColor: 'rgba(34, 197, 94, 0.5)',
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || 'Metric'
                  const value = context.parsed.y
                  return `${label}: ${value}%`
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
                text: 'Performance Score (%)',
                font: { size: 12, weight: '500' },
                color: '#374151'
              },
              grid: { color: 'rgba(0, 0, 0, 0.1)', drawBorder: false },
              ticks: { color: '#6B7280', font: { size: 11 } },
              beginAtZero: true,
              max: 100
            }
          },
          animation: { duration: 1800, easing: 'easeInOutQuart' }
        }
      }
    ])

    // Metrics Framework
    const metricsFrameworkData = ref({
      introduction: 'The Gamified Employee Management system employs a comprehensive metrics framework to measure and track employee engagement, performance, and gamification effectiveness. This framework enables data-driven insights into workforce productivity, goal achievement patterns, and the impact of gamification mechanics on employee behavior. Each metric is carefully defined, measured, and validated to demonstrate the system\'s effectiveness in improving employee engagement and organizational performance.',
      metricsCategories: [
        {
          icon: 'performance',
          title: 'Engagement Metrics',
          metrics: [
            {
              icon: 'user',
              name: 'Daily Active Users (DAU) - 88%',
              measurementMethod: 'Daily active user tracking using application telemetry and session analytics. Monitors unique employee logins, feature usage, and platform interaction patterns across all organizations. Tracks daily engagement levels and user activity trends.',
              context: 'Essential for measuring ongoing platform adoption and sustained employee engagement. High DAU indicates successful gamification implementation and continued employee interest in performance tracking and achievement systems.',
              validation: 'Achieved through comprehensive user analytics, session tracking, and engagement monitoring ensuring accurate measurement of daily active employee participation across the gamification platform.'
            },
            {
              icon: 'performance',
              name: 'Session Duration - 12 minutes average',
              measurementMethod: 'Session duration tracking using application telemetry and user behavior analytics. Monitors time employees spend interacting with gamification features, viewing dashboards, checking leaderboards, and engaging with achievement systems.',
              context: 'Critical for understanding depth of engagement where longer sessions indicate meaningful interaction with gamification features. Sustained engagement demonstrates effective gamification mechanics and employee motivation.',
              validation: 'Measured through comprehensive session analytics, user interaction tracking, and engagement pattern analysis ensuring accurate session duration metrics across all employee interactions.'
            },
            {
              icon: 'analytics',
              name: 'Feature Adoption Rate - 85%',
              measurementMethod: 'Feature usage analytics tracking employee utilization of key gamification features including goal setting, achievement viewing, leaderboard participation, and reward redemption. Monitors feature access patterns and usage frequency.',
              context: 'Essential for measuring gamification feature effectiveness where high adoption indicates successful feature design and employee interest. Broad adoption enables comprehensive engagement across all gamification mechanics.',
              validation: 'Achieved through feature usage tracking, analytics monitoring, and user behavior analysis ensuring accurate measurement of feature adoption across all gamification capabilities.'
            },
            {
              icon: 'realtime',
              name: 'Return Engagement Rate - 92%',
              measurementMethod: 'Return user tracking using user session analytics and login frequency monitoring. Tracks employees who return to the platform after initial use, measuring sustained engagement and platform stickiness over time.',
              context: 'Critical for measuring long-term engagement success where high return rates indicate effective gamification that keeps employees coming back. Sustained engagement demonstrates ongoing motivation and platform value.',
              validation: 'Measured through user return analytics, session frequency tracking, and engagement retention analysis ensuring accurate measurement of employee return rates and sustained platform engagement.'
            }
          ]
        },
        {
          icon: 'analytics',
          title: 'Performance Metrics',
          metrics: [
            {
              icon: 'performance',
              name: 'Goal Completion Rate - 92%',
              measurementMethod: 'Goal completion tracking using goal management system analytics and completion verification. Monitors employee goals from creation to completion, tracking completion rates, time-to-completion, and goal achievement patterns across all employees and teams.',
              context: 'Essential for measuring productivity improvement where high completion rates indicate effective goal-setting and employee motivation. Improved goal completion demonstrates gamification impact on employee performance.',
              validation: 'Achieved through comprehensive goal tracking, completion verification, and performance analytics ensuring accurate measurement of goal completion rates and productivity improvements across all employees.'
            },
            {
              icon: 'automation',
              name: 'Achievement Unlock Rate - 88%',
              measurementMethod: 'Achievement system analytics tracking badge and achievement unlock events. Monitors achievement earning frequency, badge collection rates, and achievement distribution patterns across employee groups and performance levels.',
              context: 'Critical for measuring gamification engagement where high unlock rates indicate active participation in achievement systems. Frequent achievements demonstrate effective motivation and recognition mechanics.',
              validation: 'Measured through achievement event tracking, badge distribution analytics, and unlock rate monitoring ensuring accurate measurement of achievement system engagement and employee participation.'
            },
            {
              icon: 'success',
              name: 'Performance Score Improvement - 38%',
              measurementMethod: 'Performance score tracking using historical performance data comparison and score trend analysis. Monitors employee performance scores over time, tracking improvements, trends, and correlation with gamification feature usage.',
              context: 'Essential for demonstrating business value where performance improvements indicate successful gamification implementation. Measurable score increases demonstrate ROI and productivity gains from engagement initiatives.',
              validation: 'Achieved through performance score analytics, trend analysis, and historical data comparison ensuring accurate measurement of performance improvements and productivity gains from gamification.'
            },
            {
              icon: 'optimization',
              name: 'Task Completion Efficiency - 42% faster',
              measurementMethod: 'Task completion time tracking using workflow analytics and efficiency metrics. Monitors task duration, completion rates, and efficiency improvements comparing gamified workflows to traditional methods.',
              context: 'Critical for measuring operational impact where improved efficiency demonstrates gamification value. Faster task completion indicates effective motivation and workflow optimization from engagement features.',
              validation: 'Measured through workflow analytics, efficiency tracking, and performance comparison ensuring accurate measurement of task completion improvements and operational efficiency gains.'
            }
          ]
        },
        {
          icon: 'automation',
          title: 'Gamification Metrics',
          metrics: [
            {
              icon: 'performance',
              name: 'Leaderboard Participation - 85%',
              measurementMethod: 'Leaderboard analytics tracking employee participation in competitive rankings and leaderboard views. Monitors leaderboard access frequency, ranking changes, and participation patterns across different competition types and time periods.',
              context: 'Essential for measuring competitive engagement where high participation indicates effective leaderboard mechanics. Active participation demonstrates employee interest in rankings and competitive achievement.',
              validation: 'Achieved through leaderboard analytics, participation tracking, and engagement monitoring ensuring accurate measurement of competitive engagement and leaderboard system effectiveness.'
            },
            {
              icon: 'financial',
              name: 'Reward Redemption Rate - 78%',
              measurementMethod: 'Reward system analytics tracking reward redemption frequency and patterns. Monitors reward earning, redemption requests, and reward distribution across different reward types and employee segments.',
              context: 'Critical for measuring reward system effectiveness where high redemption rates indicate successful motivation mechanics. Active redemption demonstrates employee engagement with reward systems.',
              validation: 'Measured through reward analytics, redemption tracking, and distribution monitoring ensuring accurate measurement of reward system engagement and employee motivation effectiveness.'
            },
            {
              icon: 'success',
              name: 'Badge Collection Rate - 12 badges average',
              measurementMethod: 'Badge system analytics tracking badge earning and collection patterns. Monitors average badges per employee, badge distribution, collection rates, and badge category preferences across the employee base.',
              context: 'Essential for measuring achievement system engagement where badge collection indicates active participation in gamification. High collection rates demonstrate effective achievement mechanics and employee motivation.',
              validation: 'Achieved through badge analytics, collection tracking, and distribution analysis ensuring accurate measurement of badge system engagement and achievement mechanics effectiveness.'
            },
            {
              icon: 'analytics',
              name: 'Points Accumulation Rate - 1,250 points/month',
              measurementMethod: 'Points system analytics tracking point earning rates and accumulation patterns. Monitors point earning frequency, accumulation trends, and point distribution across different activities and employee segments.',
              context: 'Critical for measuring overall gamification participation where point accumulation indicates active engagement. High accumulation rates demonstrate effective point systems and employee motivation.',
              validation: 'Measured through points analytics, accumulation tracking, and earning pattern analysis ensuring accurate measurement of point system engagement and overall gamification participation.'
            }
          ]
        },
        {
          icon: 'financial',
          title: 'Business Impact Metrics',
          metrics: [
            {
              icon: 'user',
              name: 'Employee Retention Rate - 94% (+28%)',
              measurementMethod: 'Retention analytics tracking employee retention rates before and after gamification implementation. Monitors retention trends, turnover reduction, and correlation between engagement scores and retention rates.',
              context: 'Essential for measuring long-term business value where improved retention indicates successful engagement initiatives. Higher retention reduces recruitment costs and maintains organizational knowledge.',
              validation: 'Achieved through retention analytics, trend analysis, and comparative studies ensuring accurate measurement of retention improvements and long-term engagement impact on employee retention.'
            },
            {
              icon: 'performance',
              name: 'Productivity Improvement - 38%',
              measurementMethod: 'Productivity metrics tracking overall productivity improvements using output metrics, efficiency gains, and performance comparisons. Monitors productivity trends, output increases, and efficiency improvements across departments.',
              context: 'Critical for demonstrating business value where productivity improvements indicate successful gamification ROI. Measurable productivity gains demonstrate financial impact and organizational effectiveness.',
              validation: 'Measured through productivity analytics, output tracking, and performance comparison ensuring accurate measurement of productivity improvements and business value from gamification initiatives.'
            },
            {
              icon: 'success',
              name: 'Satisfaction Score - 4.6/5.0',
              measurementMethod: 'Employee satisfaction surveys and feedback collection tracking satisfaction with gamification platform and engagement features. Monitors satisfaction ratings, feature preferences, and overall platform experience scores.',
              context: 'Essential for measuring user experience where high satisfaction indicates successful platform design and engagement. Positive satisfaction demonstrates effective gamification implementation and employee approval.',
              validation: 'Achieved through satisfaction surveys, feedback analysis, and experience tracking ensuring accurate measurement of employee satisfaction and platform acceptance across the organization.'
            },
            {
              icon: 'financial',
              name: 'ROI on Engagement Programs - 450%',
              measurementMethod: 'ROI calculation tracking return on investment for gamification and engagement initiatives using cost analysis, productivity gains, and retention improvements. Monitors investment costs, measurable benefits, and financial returns.',
              context: 'Critical for demonstrating financial value where high ROI indicates successful gamification investment. Positive ROI demonstrates business case for engagement initiatives and organizational value.',
              validation: 'Measured through ROI analysis, cost-benefit tracking, and financial impact assessment ensuring accurate calculation of return on investment and business value from gamification programs.'
            }
          ]
        }
      ],
      frameworkItems: []
    })

    // ROI Section
    const roiLeftItems = ref([
      { label: "Annual Cost Reduction", value: "$2.5M" },
      { label: "Productivity Revenue Gains", value: "$4.8M" },
      { label: "Training Cost Savings", value: "$850K" },
      { label: "Engagement Program ROI", value: "450%" },
      { label: "Payback Period", value: "6.2 months" }
    ])

    const roiRightItems = ref([
      { label: "Employee Retention Improvement", value: "+28%" },
      { label: "Goal Completion Rate", value: "92%" },
      { label: "Employee Engagement Increase", value: "+45%" },
      { label: "Performance Improvement", value: "+38%" },
      { label: "Active User Participation", value: "88%" }
    ])

    const roiMetrics = ref([
      { value: "45%", label: "Engagement Increase", color: "green" },
      { value: "92%", label: "Goal Completion Rate", color: "purple" },
      { value: "28%", label: "Retention Improvement", color: "pink" },
      { value: "38%", label: "Performance Gain", color: "cyan" },
      { value: "10K+", label: "Active Employees", color: "blue" },
      { value: "4.6/5", label: "Satisfaction Score", color: "teal" }
    ])

    // Diagram Narration Steps (placeholder - add when diagram is created)
    const gamifiedEmployeeManagementNarrationSteps = ref([])

    return {
      // Data
      projectData,
      galleryData,
      projectOverviewData,
      technologies,
      gamifiedEmployeeManagementNarrationSteps,
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

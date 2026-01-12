<template>
  <div class="service-page">
    <div class="container service-container">
      
      <!-- Hero Section -->
      <ServiceHeroSection
        title="Database Design & Optimization"
        icon-name="database"
        tagline="Designing and optimizing SQL Server databases, implementing Entity Framework best practices, and ensuring high-performance data access patterns. Build databases that scale, perform, and support your business needs."
        :hero-image="$assetPath('/assets/img/services/database-hero.jpg')"
        :benefits="heroBenefits"
        :badges="heroBadges"
        class="service-section-first"
      />

      <!-- Service Overview -->
      <ServiceOverview
        title="Database Design & Optimization"
        :content="overviewContent"
        :banner-images="overviewBannerImages"
      />

      <!-- Capabilities -->
      <ServiceCapabilities
        :capabilities="capabilities"
        :methodologies="methodologies"
        :deliverables="deliverables"
      />

      <!-- Process -->
      <ServiceProcess
        :steps="processSteps"
        timeline="2-6 weeks (typical database project)"
        :engagement-models="engagementModels"
        :process-image="$assetPath('/assets/img/services/database-process.jpg')"
      />

      <!-- Technologies -->
      <TechnologyStack
        title="Database Technology Stack"
        :technologies="technologies"
      />

      <!-- Case Studies -->
      <ServiceCaseStudies
        introduction="Here are some examples of database design and optimization I've delivered:"
        :case-studies="caseStudies"
      />

      <!-- FAQ -->
      <ServiceFAQ
        :faq-items="faqItems"
      />

      <!-- CTA -->
      <ServiceCTA
        cta-text="Ready to optimize your database performance or design a new database? Let's discuss how database design and optimization can improve your application performance and support your business growth."
        :show-contact-form="false"
        :cta-image="$assetPath('/assets/img/services/database-cta.jpg')"
        class="service-section-last"
      />

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ServiceHeroSection from '@/components/services/ServiceHeroSection.vue'
import ServiceOverview from '@/components/services/ServiceOverview.vue'
import ServiceCapabilities from '@/components/services/ServiceCapabilities.vue'
import ServiceProcess from '@/components/services/ServiceProcess.vue'
import ServiceCaseStudies from '@/components/services/ServiceCaseStudies.vue'
import ServiceFAQ from '@/components/services/ServiceFAQ.vue'
import ServiceCTA from '@/components/services/ServiceCTA.vue'
import TechnologyStack from '@/components/projects/TechnologyStack.vue'
import { TECH_CATEGORIES } from '@/config/constants.js'
import { assetPath } from '@/utils/assetPath.js'

export default {
  name: 'DatabaseDesignOptimizationPage',
  components: {
    ServiceHeroSection,
    ServiceOverview,
    ServiceCapabilities,
    ServiceProcess,
    ServiceCaseStudies,
    ServiceFAQ,
    ServiceCTA,
    TechnologyStack
  },
  setup() {
    // Hero Benefits
    const heroBenefits = ref([
      { icon: 'database', label: 'Performance', value: 'Optimized Queries' },
      { icon: 'indexing', label: 'Indexing', value: 'Strategic Indexes' },
      { icon: 'scalability', label: 'Scalability', value: 'Enterprise Scale' },
      { icon: 'data integrity', label: 'Data Integrity', value: 'ACID Compliance' }
    ])

    const heroBadges = ref(['SQL Server', 'Entity Framework', 'Performance', 'Optimized'])

    // Overview Banner Images
    const overviewBannerImages = ref([
      assetPath('/assets/img/services/database-banner-1.jpg'),
      assetPath('/assets/img/services/database-banner-2.jpg'),
      assetPath('/assets/img/services/database-banner-3.jpg')
    ])

    // Overview Content
    const overviewContent = ref({
      what: "Database Design & Optimization is the practice of designing efficient database schemas, optimizing query performance, implementing proper indexing strategies, and ensuring data integrity and scalability. I specialize in SQL Server database design, Entity Framework Core optimization, query tuning, indexing strategies, and performance optimization. This service covers everything from initial database schema design and normalization to query optimization, index design, performance tuning, and data migration. Whether you're designing a new database, optimizing existing databases, migrating data, or troubleshooting performance issues, I deliver database solutions that are performant, scalable, and maintainable.",
      who: "This service is ideal for organizations that need efficient, high-performance databases to support their applications. Whether you're building a new application requiring database design, experiencing performance issues with existing databases, planning database migration, needing to scale databases for growth, or requiring data optimization, Database Design & Optimization provides the expertise to ensure your databases perform optimally. I work with clients who have slow queries, need better indexing, want to improve application performance, are planning database migrations, or need to design databases for new applications.",
      valuePropositions: [
        "Improved query performance through optimization",
        "Better scalability through proper database design",
        "Reduced database costs through efficient resource usage",
        "Faster application performance through optimized data access",
        "Better data integrity through proper design and constraints",
        "Reduced maintenance overhead through clean database design",
        "Better support for business requirements through proper schema design",
        "Improved developer productivity through Entity Framework optimization"
      ],
      useCases: [
        "Designing new database schemas for applications",
        "Optimizing existing databases with performance issues",
        "Migrating databases to new platforms or versions",
        "Implementing proper indexing strategies",
        "Optimizing Entity Framework Core queries",
        "Tuning slow queries and improving response times",
        "Designing databases for scalability",
        "Implementing data archiving and partitioning strategies"
      ]
    })

    // Capabilities
    const capabilities = ref([
      {
        title: "Database Schema Design",
        description: "Designing efficient database schemas, normalization, table design, relationships, constraints, and data modeling. Includes ERD creation, schema documentation, and best practices for database design.",
        icon: "database",
        technologies: ["Schema Design", "Normalization", "ERD", "Data Modeling"]
      },
      {
        title: "Query Optimization",
        description: "Analyzing and optimizing SQL queries, identifying performance bottlenecks, rewriting queries for better performance, and implementing query optimization techniques. Includes execution plan analysis and query tuning.",
        icon: "optimization",
        technologies: ["Query Tuning", "Execution Plans", "Query Rewriting", "Performance Analysis"]
      },
      {
        title: "Indexing Strategies",
        description: "Designing and implementing indexing strategies, creating appropriate indexes, analyzing index usage, and optimizing index performance. Includes covering indexes, filtered indexes, and index maintenance.",
        icon: "indexing",
        technologies: ["Index Design", "Covering Indexes", "Index Analysis", "Index Maintenance"]
      },
      {
        title: "Entity Framework Optimization",
        description: "Optimizing Entity Framework Core queries, reducing N+1 queries, implementing proper eager/lazy loading, using compiled queries, and optimizing LINQ expressions. Includes EF Core best practices.",
        icon: "entity framework",
        technologies: ["EF Core Optimization", "Query Compilation", "Eager Loading", "LINQ Optimization"]
      },
      {
        title: "Performance Tuning",
        description: "Database performance tuning, identifying bottlenecks, optimizing resource usage, configuring database settings, and implementing performance monitoring. Includes wait statistics analysis and resource optimization.",
        icon: "performance",
        technologies: ["Performance Tuning", "Bottleneck Analysis", "Resource Optimization", "Monitoring"]
      },
      {
        title: "Data Migration & Archiving",
        description: "Planning and executing database migrations, data archiving strategies, partitioning large tables, and implementing data lifecycle management. Includes migration scripts and data validation.",
        icon: "migration",
        technologies: ["Data Migration", "Table Partitioning", "Data Archiving", "Lifecycle Management"]
      }
    ])

    const methodologies = ref([
      "Database Normalization",
      "Query Performance Analysis",
      "Index Design Patterns",
      "Entity Framework Best Practices",
      "Database Partitioning",
      "Data Archiving Strategies",
      "Performance Monitoring",
      "Capacity Planning",
      "Disaster Recovery Planning",
      "Data Migration Strategies"
    ])

    const deliverables = ref([
      "Database schema design documents",
      "ERD diagrams and data models",
      "Optimized SQL queries and stored procedures",
      "Index design and implementation scripts",
      "Entity Framework optimization recommendations",
      "Performance tuning reports",
      "Database migration scripts",
      "Query optimization documentation",
      "Database maintenance plans",
      "Performance monitoring setup"
    ])

    // Process Steps
    const processSteps = ref([
      {
        step: 1,
        title: "Assessment & Analysis",
        description: "Assessing current database performance, analyzing slow queries, reviewing schema design, and identifying optimization opportunities. Includes performance baseline and bottleneck identification.",
        duration: "3-5 days"
      },
      {
        step: 2,
        title: "Design & Planning",
        description: "Designing database schema (for new databases) or optimization plan (for existing), creating ERD, defining indexes, and planning optimization strategy. Creating technical specifications.",
        duration: "3-5 days"
      },
      {
        step: 3,
        title: "Implementation",
        description: "Implementing schema changes, creating indexes, optimizing queries, configuring Entity Framework, and applying optimization techniques. Includes testing and validation.",
        duration: "1-3 weeks"
      },
      {
        step: 4,
        title: "Testing & Validation",
        description: "Testing optimized queries, validating performance improvements, comparing before/after metrics, and ensuring data integrity. Includes performance testing and validation.",
        duration: "3-5 days"
      },
      {
        step: 5,
        title: "Monitoring & Tuning",
        description: "Setting up performance monitoring, fine-tuning optimizations, analyzing query performance, and making additional improvements. Includes ongoing monitoring setup.",
        duration: "3-5 days"
      },
      {
        step: 6,
        title: "Documentation & Handoff",
        description: "Documenting database design, optimization changes, query patterns, and maintenance procedures. Providing knowledge transfer and documentation.",
        duration: "2-3 days"
      }
    ])

    const engagementModels = ref([
      "Database Design Projects",
      "Performance Optimization",
      "Database Migration",
      "Ongoing Database Support",
      "Hybrid Model"
    ])

    // Technologies
    const technologies = ref([
      // Database Platforms
      { name: "SQL Server", description: "Microsoft relational database management system", category: TECH_CATEGORIES.DATABASE },
      { name: "Azure SQL Database", description: "Managed cloud database service", category: TECH_CATEGORIES.DATABASE },
      { name: "SQL Server Management Studio", description: "Database management and administration", category: TECH_CATEGORIES.DATABASE },
      { name: "PostgreSQL", description: "Open-source relational database", category: TECH_CATEGORIES.DATABASE },
      
      // ORM & Data Access
      { name: "Entity Framework Core", description: "ORM for .NET applications", category: TECH_CATEGORIES.BACKEND },
      { name: "Dapper", description: "Lightweight ORM for high performance", category: TECH_CATEGORIES.BACKEND },
      { name: "LINQ", description: "Language Integrated Query", category: TECH_CATEGORIES.BACKEND },
      
      // Performance Tools
      { name: "SQL Server Profiler", description: "Query performance analysis tool", category: TECH_CATEGORIES.MONITORING },
      { name: "Execution Plans", description: "Query execution plan analysis", category: TECH_CATEGORIES.MONITORING },
      { name: "Dynamic Management Views", description: "SQL Server performance monitoring", category: TECH_CATEGORIES.MONITORING },
      { name: "Query Store", description: "Query performance tracking", category: TECH_CATEGORIES.MONITORING },
      
      // Indexing & Optimization
      { name: "Clustered Indexes", description: "Primary key indexing strategy", category: TECH_CATEGORIES.DATABASE },
      { name: "Non-Clustered Indexes", description: "Secondary indexing strategy", category: TECH_CATEGORIES.DATABASE },
      { name: "Covering Indexes", description: "Index optimization technique", category: TECH_CATEGORIES.DATABASE },
      { name: "Filtered Indexes", description: "Conditional indexing strategy", category: TECH_CATEGORIES.DATABASE },
      
      // Data Management
      { name: "Table Partitioning", description: "Large table management strategy", category: TECH_CATEGORIES.DATABASE },
      { name: "Data Archiving", description: "Historical data management", category: TECH_CATEGORIES.DATABASE },
      { name: "Backup & Recovery", description: "Data protection strategies", category: TECH_CATEGORIES.DATABASE },
      
      // Caching
      { name: "Redis", description: "In-memory caching for database queries", category: TECH_CATEGORIES.DATABASE },
      { name: "SQL Server In-Memory OLTP", description: "In-memory database technology", category: TECH_CATEGORIES.DATABASE }
    ])

    // Case Studies
    const caseStudies = ref([
      {
        project: "Heat Exchanger Portal",
        link: "/projects/heat-exchanger",
        description: "Optimized database handling 2.5 million data points daily, implemented strategic indexing, query optimization, and achieved 65% reduction in response times.",
        image: assetPath("/assets/img/he1.jpg"),
        metrics: {
          label: "Performance",
          value: "65% faster"
        }
      },
      {
        project: "G5 POS",
        link: "/projects/g5-pos",
        description: "Designed and optimized database for restaurant management system handling 1M+ daily transactions across 50+ locations with high performance and reliability.",
        image: assetPath("/assets/img/g51.jpg"),
        metrics: {
          label: "Transactions",
          value: "1M+ daily"
        }
      },
      {
        project: "UK Property Management",
        link: "/projects/uk-property-management",
        description: "Designed database schema for property management platform managing 9,000+ properties with optimized queries, indexing, and Entity Framework Core integration.",
        image: assetPath("/assets/img/gpc1.jpg"),
        metrics: {
          label: "Properties",
          value: "9,000+"
        }
      }
    ])

    // FAQ
    const faqItems = ref([
      {
        question: "What database platforms do you work with?",
        answer: "I primarily work with SQL Server (on-premises and Azure SQL Database) and have experience with PostgreSQL. I specialize in SQL Server database design, optimization, and Entity Framework Core integration. I can also work with other relational databases based on your requirements. My expertise includes database schema design, query optimization, indexing, performance tuning, and data migration."
      },
      {
        question: "How do you optimize slow queries?",
        answer: "I optimize slow queries by analyzing execution plans, identifying bottlenecks (missing indexes, table scans, inefficient joins), rewriting queries for better performance, creating appropriate indexes, and using query hints where necessary. I use tools like SQL Server Profiler, Execution Plans, and Query Store to identify performance issues. I also optimize Entity Framework Core queries by reducing N+1 queries, using compiled queries, and optimizing LINQ expressions."
      },
      {
        question: "What is your approach to database indexing?",
        answer: "I design indexing strategies based on query patterns, creating indexes that support frequently executed queries. I analyze query execution plans to identify missing indexes, create covering indexes for query optimization, use filtered indexes for specific conditions, and maintain a balance between read performance and write performance. I also monitor index usage and remove unused indexes to optimize maintenance overhead."
      },
      {
        question: "Can you help optimize Entity Framework Core performance?",
        answer: "Absolutely! I specialize in optimizing Entity Framework Core queries by reducing N+1 queries through proper eager loading, using compiled queries for frequently executed queries, optimizing LINQ expressions, implementing proper change tracking, using projections to reduce data transfer, and following EF Core best practices. I also help design database schemas that work well with Entity Framework Core."
      },
      {
        question: "How do you handle database migrations?",
        answer: "I plan and execute database migrations by creating migration scripts, testing migrations in non-production environments, validating data integrity, and ensuring minimal downtime. I use Entity Framework Core migrations for schema changes, create custom migration scripts for complex changes, and implement rollback strategies. I also handle data migration, schema changes, and version upgrades."
      },
      {
        question: "What about database scalability?",
        answer: "I design databases for scalability by implementing proper indexing, partitioning large tables, using read replicas for read-heavy workloads, implementing caching strategies with Redis, optimizing queries for performance, and designing schemas that support horizontal scaling. I also help with capacity planning and database architecture for growth."
      },
      {
        question: "How long does a database optimization project take?",
        answer: "A typical database optimization project takes 2-6 weeks, depending on complexity, database size, and scope of optimization. Simple query optimization might take 1-2 weeks, while comprehensive database redesign and optimization can take 4-6 weeks. The timeline includes assessment, design, implementation, testing, and documentation phases."
      }
    ])

    return {
      heroBenefits,
      heroBadges,
      overviewBannerImages,
      overviewContent,
      capabilities,
      methodologies,
      deliverables,
      processSteps,
      engagementModels,
      technologies,
      caseStudies,
      faqItems
    }
  }
}
</script>

<style scoped>
.service-page {
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(20, 0, 40, 0.3) 0%, rgba(10, 0, 20, 0.5) 100%);
  padding: 10px 0;
}

.service-container {
  max-width: 1200px;
  padding-top: 10px;
  padding-bottom: 10px;
}

/* Remove top margin from first section */
.service-section-first :deep(.reusable-card.mb-4) {
  margin-top: 0 !important;
}

/* Remove bottom margin from last section */
.service-section-last :deep(.reusable-card.mb-4) {
  margin-bottom: 0 !important;
}

/* Alternative: Target first and last child directly */
.service-container > :first-child :deep(.reusable-card.mb-4) {
  margin-top: 0 !important;
}

.service-container > :last-child :deep(.reusable-card.mb-4) {
  margin-bottom: 0 !important;
}
</style>

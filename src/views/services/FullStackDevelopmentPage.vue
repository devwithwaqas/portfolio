<template>
  <div class="service-page">
    <div class="container service-container">
      
      <!-- Hero Section -->
      <ServiceHeroSection
        title="Full Stack Development"
        icon-name="full stack development"
        tagline="End-to-end development of enterprise applications tailored to your requirements. Whether you need Angular, Vue.js, React, or any modern frontend framework combined with robust .NET Core backends, I deliver scalable solutions that drive business growth."
        :hero-image="$assetPath('/assets/img/services/full-stack-hero.jpg')"
        :benefits="heroBenefits"
        :badges="heroBadges"
        class="service-section-first"
      />

      <!-- Service Overview -->
      <ServiceOverview
        title="Full Stack Development"
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
        timeline="8-12 weeks (typical project)"
        :engagement-models="engagementModels"
        :process-image="$assetPath('/assets/img/services/full-stack-process.jpg')"
      />

      <!-- Technologies -->
      <TechnologyStack
        title="Technology Stack"
        :technologies="technologies"
      />

      <!-- Case Studies -->
      <ServiceCaseStudies
        introduction="Here are some examples of full stack applications I've developed:"
        :case-studies="caseStudies"
      />

      <!-- FAQ -->
      <ServiceFAQ
        :faq-items="faqItems"
      />

      <!-- CTA -->
      <ServiceCTA
        cta-text="Ready to build your full stack application? Whether you need Vue.js, React, Angular, or any modern frontend framework, let's discuss your project requirements and create a solution tailored to your needs that drives your business forward."
        :show-contact-form="false"
        :cta-image="$assetPath('/assets/img/services/full-stack-cta.jpg')"
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
  name: 'FullStackDevelopmentPage',
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
      { icon: 'fullstack', label: 'Flexible Frontend', value: 'Vue • React • Angular' },
      { icon: 'performance', label: 'Performance', value: 'Optimized' },
      { icon: 'scalability', label: 'Scalability', value: 'Enterprise-Ready' },
      { icon: 'security', label: 'Security', value: 'Enterprise-Grade' }
    ])

    const heroBadges = ref(['Client-Focused', 'Technology-Agnostic', 'Modern Stack', 'Scalable'])

    // Overview Banner Images (LinkedIn cover style - wide, short)
    const overviewBannerImages = ref([
      assetPath('/assets/img/services/full-stack-banner-1.jpg'),
      assetPath('/assets/img/services/full-stack-banner-2.jpg'),
      assetPath('/assets/img/services/full-stack-banner-3.jpg')
    ])

    // Overview Content
    const overviewContent = ref({
      what: "Full Stack Development is the comprehensive process of building both frontend and backend components of web applications. I specialize in creating end-to-end enterprise solutions that adapt to YOUR requirements. Whether you prefer Angular for enterprise applications, Vue.js for modern reactive interfaces, React for component-based architectures, or any other modern frontend framework, I work with the technology stack that best fits your business needs. Combined with robust .NET Core backends, SQL Server databases, and cloud infrastructure, I deliver complete solutions from database design to user interface development, ensuring seamless integration between all layers of your application.",
      who: "This service is ideal for businesses and organizations that need complete custom software solutions tailored to their specific requirements. Whether you're a startup looking to build your MVP with Vue.js, an established company needing to modernize legacy systems with React, an enterprise requiring scalable Angular applications, or any organization with unique technology preferences, I adapt my approach to match your needs. Full stack development provides a single point of contact for all your development needs, with the flexibility to work with your preferred technology stack.",
      valuePropositions: [
        "Technology flexibility - Work with Vue.js, React, Angular, or your preferred frontend framework",
        "Client-focused approach - Solutions tailored to your specific requirements and technology preferences",
        "Single point of contact for entire application development lifecycle",
        "Consistent architecture and design patterns across all layers",
        "Faster time-to-market with integrated development approach",
        "Reduced communication overhead between frontend and backend teams",
        "Comprehensive understanding of entire application stack",
        "Scalable team approach - Can scale with dedicated developers when needed"
      ],
      useCases: [
        "Building new enterprise applications with your preferred frontend framework (Vue, React, Angular)",
        "Modernizing legacy systems with modern technology stacks",
        "Creating scalable web applications for growing businesses",
        "Developing custom business solutions with specific technology requirements",
        "Migrating existing applications to modern frameworks",
        "Building responsive Progressive Web Apps (PWAs) with any frontend framework"
      ]
    })

    // Capabilities
    const capabilities = ref([
      {
        title: "Backend Development",
        description: "Robust API development using ASP.NET Core Web API with Entity Framework Core for data access. Includes RESTful API design, authentication, authorization, and business logic implementation.",
        icon: "api",
        technologies: [".NET Core", "ASP.NET Core", "Entity Framework", "SQL Server"]
      },
      {
        title: "Frontend Development",
        description: "Modern single-page applications built with your preferred framework - Vue.js for reactive interfaces, React for component-based architectures, Angular for enterprise applications, or any modern JavaScript framework. Features responsive design, real-time updates, state management, and comprehensive user experience optimization. I work with Vue 3 Composition API, React Hooks, Angular 12+, TypeScript, and modern UI libraries to deliver exceptional user experiences.",
        icon: "frontend",
        technologies: ["Vue.js 3", "React", "Angular", "TypeScript", "Bootstrap", "Tailwind CSS", "PWA"]
      },
      {
        title: "Database Design",
        description: "Efficient database schema design, query optimization, and data modeling. Includes indexing strategies, performance tuning, and data migration services.",
        icon: "database",
        technologies: ["SQL Server", "Entity Framework", "Redis", "Database Optimization"]
      },
      {
        title: "DevOps & Deployment",
        description: "CI/CD pipeline setup, containerization with Docker, and cloud deployment. Includes automated testing, quality gates, and production deployment automation.",
        icon: "devops",
        technologies: ["Azure DevOps", "Docker", "CI/CD", "Azure Cloud"]
      },
      {
        title: "Integration Services",
        description: "Third-party API integration, payment gateway integration, and external service connectivity. Ensures seamless communication between your application and external systems.",
        icon: "integration",
        technologies: ["REST APIs", "Webhooks", "Payment Gateways", "External Services"]
      },
      {
        title: "Security Implementation",
        description: "Enterprise-grade security with authentication, authorization, data encryption, and compliance. Includes JWT tokens, OAuth 2.0, and security best practices.",
        icon: "security",
        technologies: ["JWT", "OAuth 2.0", "SSL/TLS", "Security Compliance"]
      }
    ])

    const methodologies = ref([
      "Agile Development",
      "Scrum Framework",
      "Test-Driven Development (TDD)",
      "Continuous Integration/Continuous Deployment (CI/CD)",
      "Code Reviews",
      "Pair Programming",
      "DevOps Practices"
    ])

    const deliverables = ref([
      "Production-ready full stack application",
      "Comprehensive API documentation",
      "Database schema and documentation",
      "Deployment pipelines and scripts",
      "User documentation and guides",
      "Source code with comments",
      "Testing suite and test documentation",
      "Performance optimization reports"
    ])

    // Process Steps
    const processSteps = ref([
      {
        step: 1,
        title: "Discovery & Planning",
        description: "Understanding your business requirements, technical constraints, and project goals. Creating detailed project plan, architecture design, and timeline estimation.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Architecture Design",
        description: "Designing system architecture, database schema, API structure, and frontend components. Creating technical specifications and design documents.",
        duration: "1 week"
      },
      {
        step: 3,
        title: "Backend Development",
        description: "Implementing RESTful APIs, business logic, database layer, and backend services. Setting up authentication, authorization, and security features.",
        duration: "3-4 weeks"
      },
      {
        step: 4,
        title: "Frontend Development",
        description: "Building user interface, implementing user interactions, integrating with APIs, and ensuring responsive design across all devices.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Integration & Testing",
        description: "Integrating frontend and backend, comprehensive testing (unit, integration, e2e), bug fixes, and performance optimization.",
        duration: "2 weeks"
      },
      {
        step: 6,
        title: "Deployment & Launch",
        description: "Setting up production environment, deploying application, monitoring setup, and providing post-launch support and documentation.",
        duration: "1 week"
      }
    ])

    const engagementModels = ref([
      "Fixed Price Projects",
      "Time & Materials",
      "Dedicated Team",
      "Hybrid Model"
    ])

    // Technologies
    const technologies = ref([
      // Backend Technologies
      { name: "ASP.NET Core Web API", description: "RESTful web services and API endpoints", category: TECH_CATEGORIES.BACKEND },
      { name: "Entity Framework Core", description: "ORM for database operations", category: TECH_CATEGORIES.BACKEND },
      { name: "C#", description: "Primary backend programming language", category: TECH_CATEGORIES.BACKEND },
      
      // Frontend Frameworks (Flexible)
      { name: "Vue.js 3", description: "Modern reactive frontend framework with Composition API", category: TECH_CATEGORIES.FRONTEND },
      { name: "React", description: "Component-based frontend library with Hooks", category: TECH_CATEGORIES.FRONTEND },
      { name: "Angular 12+", description: "Enterprise frontend framework with TypeScript", category: TECH_CATEGORIES.FRONTEND },
      { name: "TypeScript", description: "Type-safe JavaScript for modern development", category: TECH_CATEGORIES.FRONTEND },
      { name: "JavaScript (ES6+)", description: "Modern JavaScript for frontend development", category: TECH_CATEGORIES.FRONTEND },
      { name: "Bootstrap 5", description: "Responsive CSS framework", category: TECH_CATEGORIES.FRONTEND },
      { name: "Tailwind CSS", description: "Utility-first CSS framework", category: TECH_CATEGORIES.FRONTEND },
      { name: "Vuex / Pinia", description: "State management for Vue.js", category: TECH_CATEGORIES.FRONTEND },
      { name: "Redux", description: "State management for React", category: TECH_CATEGORIES.FRONTEND },
      { name: "PWA", description: "Progressive Web App capabilities", category: TECH_CATEGORIES.FRONTEND },
      
      // Database Technologies
      { name: "SQL Server", description: "Relational database management", category: TECH_CATEGORIES.DATABASE },
      { name: "Redis", description: "In-memory caching and session storage", category: TECH_CATEGORIES.DATABASE },
      { name: "PostgreSQL", description: "Open-source relational database", category: TECH_CATEGORIES.DATABASE },
      
      // Communication & Real-time
      { name: "SignalR", description: "Real-time communication for .NET", category: TECH_CATEGORIES.COMMUNICATION },
      { name: "WebSocket", description: "Real-time bidirectional communication", category: TECH_CATEGORIES.COMMUNICATION },
      
      // DevOps & CI/CD
      { name: "Azure DevOps", description: "CI/CD pipeline and project management", category: TECH_CATEGORIES.DEVOPS },
      { name: "GitHub Actions", description: "CI/CD automation", category: TECH_CATEGORIES.DEVOPS },
      { name: "Docker", description: "Containerization for consistent deployments", category: TECH_CATEGORIES.DEVOPS },
      { name: "Kubernetes", description: "Container orchestration", category: TECH_CATEGORIES.DEVOPS },
      
      // Cloud Platforms
      { name: "Azure App Service", description: "Cloud hosting platform", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure SQL Database", description: "Managed cloud database", category: TECH_CATEGORIES.CLOUD },
      { name: "AWS", description: "Amazon Web Services cloud platform", category: TECH_CATEGORIES.CLOUD }
    ])

    // Case Studies
    const caseStudies = ref([
      {
        project: "G5 POS",
        link: "/projects/g5-pos",
        description: "Full stack restaurant management system with .NET Core backend and Angular frontend, handling 1M+ daily transactions across 50+ locations.",
        image: assetPath("/assets/img/g51.jpg"),
        metrics: {
          label: "Order Processing",
          value: "60% faster"
        }
      },
      {
        project: "Gamified Employee Management",
        link: "/projects/gamified-employee-management",
        description: "Complete employee engagement platform with microservices architecture, real-time leaderboards, and comprehensive analytics.",
        image: assetPath("/assets/img/sf1.jpg"),
        metrics: {
          label: "Engagement",
          value: "45% increase"
        }
      },
      {
        project: "UK Property Management",
        link: "/projects/uk-property-management",
        description: "Azure-native property management platform managing 9,000+ properties with full stack Angular and .NET Core implementation.",
        image: assetPath("/assets/img/gpc1.jpg"),
        metrics: {
          label: "Properties Managed",
          value: "9,000+"
        }
      }
    ])

    // FAQ
    const faqItems = ref([
      {
        question: "What frontend frameworks do you work with?",
        answer: "I work with all major modern frontend frameworks including Vue.js 3 (which this portfolio is built with), React, Angular 12+, and can adapt to your preferred technology stack. Whether you need Vue.js for reactive interfaces, React for component-based architectures, Angular for enterprise applications, or any other modern JavaScript framework, I tailor the solution to match your requirements. The backend typically uses .NET Core with SQL Server, but I can work with other backend technologies based on your needs."
      },
      {
        question: "Can you work with my existing technology stack?",
        answer: "Absolutely! I believe in adapting to client requirements rather than forcing a specific technology stack. If you have an existing application in Vue.js, React, Angular, or any other framework, I can work with it. If you have specific technology preferences or constraints, I'll design the solution accordingly. My approach is client-focused - I use the technologies that best fit your business needs, team expertise, and long-term goals."
      },
      {
        question: "What technologies do you use for full stack development?",
        answer: "I work with a flexible technology stack that adapts to your requirements. For backends, I primarily use .NET Core with ASP.NET Core Web API, Entity Framework Core, and SQL Server. For frontends, I work with Vue.js 3, React, Angular 12+, TypeScript, and modern UI frameworks like Bootstrap or Tailwind CSS. I also integrate Redis for caching, SignalR for real-time features, Docker for containerization, and Azure/AWS for cloud deployment. The exact stack is customized based on your specific requirements and preferences."
      },
      {
        question: "How long does a typical full stack project take?",
        answer: "A typical full stack project takes 8-12 weeks, depending on complexity, scope, and technology stack. Simple applications with Vue.js or React might take 6-8 weeks, while complex enterprise solutions with Angular can take 12-16 weeks. The timeline includes discovery, architecture design, development, testing, and deployment phases. I can also scale the team when needed to accelerate delivery for larger projects."
      },
      {
        question: "Do you provide ongoing support after project completion?",
        answer: "Yes, I offer ongoing support and maintenance services. This includes bug fixes, feature enhancements, performance optimization, and technical support. Support can be provided on a retainer basis or as needed."
      },
      {
        question: "Can you work with existing systems or databases?",
        answer: "Absolutely! I have extensive experience integrating with legacy systems, existing databases, and third-party services. I can work with your current infrastructure and gradually modernize it while maintaining business continuity."
      },
      {
        question: "What is your approach to security in full stack applications?",
        answer: "Security is a top priority. I implement industry-standard security practices including JWT authentication, OAuth 2.0, SSL/TLS encryption, secure API design, input validation, and compliance with security standards. Regular security audits and penetration testing are also available."
      },
      {
        question: "Do you handle deployment and DevOps setup?",
        answer: "Yes, I provide complete DevOps services including CI/CD pipeline setup, Docker containerization, cloud deployment (Azure, AWS), monitoring setup, and automated testing. I ensure smooth deployment processes and production readiness for applications built with any frontend framework (Vue.js, React, Angular) or backend technology."
      },
      {
        question: "Can you scale the team for larger projects?",
        answer: "Yes, I can scale the development team when needed for larger projects. While I handle the core architecture and development, I can bring in additional developers with expertise in Vue.js, React, Angular, or other required technologies to ensure timely delivery. This allows me to take on projects of any size while maintaining quality and meeting deadlines."
      },
      // Recruiter-focused FAQs
      {
        question: "Are you available for hire as a full stack developer?",
        answer: "Yes, I am available for hire as a full stack developer for contract, freelance, and consulting projects. With 17+ years of experience in .NET, Azure Cloud, Vue.js, React, Angular, and enterprise architecture, I can work remotely or on-site in Malaysia. I'm open to both short-term projects and long-term engagements."
      },
      {
        question: "What is your availability for new projects?",
        answer: "I am currently available for new full stack development projects. I can work on a full-time, part-time, or project basis. My location is Selangor, Malaysia, but I have extensive experience working remotely with global teams and Fortune 500 companies. I'm flexible with time zones and can accommodate various engagement models."
      },
      {
        question: "What industries have you worked with?",
        answer: "I have extensive experience across multiple industries including enterprise applications, e-commerce, petroleum operations, employee benefits systems, property management, mobile applications, and smart city solutions. I've worked with Fortune 500 companies and delivered mission-critical systems processing millions of data points daily."
      },
      {
        question: "How can I contact you for a project?",
        answer: "You can contact me through the contact form on this website, via email, or LinkedIn. I typically respond within 24 hours. I'm happy to discuss your project requirements, provide estimates, and answer any questions about my full stack development services, availability, or engagement models."
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

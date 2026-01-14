<template>
  <div class="service-page">
    <div class="container service-container">
      
      <!-- Hero Section -->
      <ServiceHeroSection
        title="Microservices Architecture"
        icon-name="microservices"
        tagline="Design and implementation of scalable microservices-based applications using Azure Service Fabric, Docker containers, and modern architectural patterns. Build systems that scale, evolve, and perform."
        :hero-image="$assetPath('/assets/img/services/microservices-hero.jpg')"
        :benefits="heroBenefits"
        :badges="heroBadges"
        class="service-section-first"
      />

      <!-- Service Overview -->
      <ServiceOverview
        title="Microservices Architecture"
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
        timeline="6-12 weeks (typical microservices implementation)"
        :engagement-models="engagementModels"
        :process-image="$assetPath('/assets/img/services/microservices-process.jpg')"
      />

      <!-- Technologies -->
      <TechnologyStack
        title="Microservices Technology Stack"
        :technologies="technologies"
      />

      <!-- Case Studies -->
      <ServiceCaseStudies
        introduction="Here are some examples of microservices architectures I've designed and implemented:"
        :case-studies="caseStudies"
      />

      <!-- FAQ -->
      <ServiceFAQ
        :faq-items="faqItems"
      />

      <!-- CTA -->
      <ServiceCTA
        cta-text="Ready to build scalable microservices architecture? Let's discuss how microservices can transform your application architecture and enable independent scaling, deployment, and evolution."
        :show-contact-form="false"
        :cta-image="$assetPath('/assets/img/services/microservices-cta.jpg')"
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
  name: 'MicroservicesArchitecturePage',
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
      { icon: 'microservices', label: 'Scalability', value: 'Independent Scaling' },
      { icon: 'deployment', label: 'Deployment', value: 'Independent Release' },
      { icon: 'resilience', label: 'Resilience', value: 'Fault Isolation' },
      { icon: 'technology', label: 'Technology', value: 'Polyglot' }
    ])

    const heroBadges = ref(['Service Fabric', 'Docker', 'Azure', 'Scalable'])

    // Overview Banner Images
    const overviewBannerImages = ref([
      assetPath('/assets/img/services/microservices-banner-1.jpg'),
      assetPath('/assets/img/services/microservices-banner-2.jpg'),
      assetPath('/assets/img/services/microservices-banner-3.jpg')
    ])

    // Overview Content
    const overviewContent = ref({
      what: "Microservices Architecture is an architectural approach where applications are built as a collection of small, independent services that communicate over well-defined APIs. Each microservice is responsible for a specific business capability, can be developed and deployed independently, and can scale independently based on demand. I specialize in designing and implementing microservices architectures using Azure Service Fabric, Docker containers, Kubernetes, and modern patterns like API Gateway, Service Mesh, and Event-Driven Architecture. This service covers everything from microservices design and service decomposition to containerization, orchestration, service communication, and distributed system patterns. Whether you're building new microservices applications or migrating from monolithic architectures, I deliver scalable, resilient, and maintainable microservices solutions.",
      who: "This service is ideal for organizations that need scalable, maintainable applications that can evolve independently. Whether you're a startup building cloud-native applications, an established company migrating from monolithic systems, an enterprise requiring independent scaling of different application components, or any organization needing systems that can scale and evolve rapidly, Microservices Architecture provides the foundation for modern, scalable applications. I work with clients who have complex applications, need independent scaling, want faster deployment cycles, require technology diversity across services, or need to support multiple teams working independently.",
      valuePropositions: [
        "Independent scaling of services based on demand",
        "Independent deployment and release cycles",
        "Technology diversity - use best technology for each service",
        "Fault isolation - failures in one service don't bring down entire system",
        "Team autonomy - teams can work independently on different services",
        "Easier maintenance and evolution of individual services",
        "Better resource utilization through targeted scaling",
        "Support for polyglot programming and technology choices"
      ],
      useCases: [
        "Migrating monolithic applications to microservices",
        "Building new cloud-native applications from scratch",
        "Implementing scalable enterprise applications",
        "Creating systems with independent scaling requirements",
        "Supporting multiple development teams working independently",
        "Building applications with diverse technology requirements",
        "Implementing event-driven and distributed systems",
        "Creating systems that need high availability and resilience"
      ]
    })

    // Capabilities
    const capabilities = ref([
      {
        title: "Microservices Design",
        description: "Designing microservices architecture, service decomposition, domain-driven design, and service boundaries. Includes identifying service boundaries, defining service contracts, and establishing communication patterns.",
        icon: "architecture",
        technologies: ["Service Decomposition", "Domain-Driven Design", "Service Boundaries", "API Design"]
      },
      {
        title: "Containerization & Orchestration",
        description: "Containerizing microservices with Docker, orchestrating with Kubernetes or Azure Service Fabric, and managing container lifecycle. Includes container images, container registries, and orchestration configuration.",
        icon: "docker",
        technologies: ["Docker", "Kubernetes", "Azure Service Fabric", "Container Orchestration"]
      },
      {
        title: "Service Communication",
        description: "Implementing service-to-service communication patterns including REST APIs, gRPC, message queues, and event-driven communication. Includes API Gateway, Service Mesh, and event sourcing patterns.",
        icon: "api",
        technologies: ["REST APIs", "gRPC", "Message Queues", "Event-Driven Architecture"]
      },
      {
        title: "Distributed System Patterns",
        description: "Implementing distributed system patterns including service discovery, circuit breakers, bulkheads, retry policies, and distributed tracing. Includes resilience patterns and fault tolerance.",
        icon: "resilience",
        technologies: ["Service Discovery", "Circuit Breakers", "Distributed Tracing", "Fault Tolerance"]
      },
      {
        title: "Data Management",
        description: "Designing data management for microservices including database-per-service pattern, event sourcing, CQRS, and distributed data consistency. Includes data synchronization and eventual consistency patterns.",
        icon: "database",
        technologies: ["Database-per-Service", "Event Sourcing", "CQRS", "Data Consistency"]
      },
      {
        title: "DevOps & Deployment",
        description: "Setting up CI/CD pipelines for microservices, automated testing, blue-green deployments, canary releases, and service monitoring. Includes deployment automation and rollback strategies.",
        icon: "devops",
        technologies: ["CI/CD Pipelines", "Automated Testing", "Blue-Green Deployment", "Service Monitoring"]
      }
    ])

    const methodologies = ref([
      "Domain-Driven Design (DDD)",
      "Service Decomposition",
      "API-First Design",
      "Event-Driven Architecture",
      "Container-First Development",
      "Infrastructure as Code",
      "Continuous Integration/Deployment",
      "Service Mesh Patterns",
      "Distributed Tracing",
      "Chaos Engineering"
    ])

    const deliverables = ref([
      "Microservices architecture design document",
      "Service decomposition and boundaries",
      "API specifications and contracts",
      "Container images and Dockerfiles",
      "Orchestration configuration (Kubernetes/Service Fabric)",
      "CI/CD pipeline configuration",
      "Service communication patterns",
      "Distributed system patterns implementation",
      "Monitoring and observability setup",
      "Microservices documentation and runbooks"
    ])

    // Process Steps
    const processSteps = ref([
      {
        step: 1,
        title: "Assessment & Planning",
        description: "Assessing current architecture, identifying microservices candidates, defining service boundaries, and creating microservices migration or design plan. Includes domain analysis and service decomposition strategy.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Architecture Design",
        description: "Designing microservices architecture, defining service contracts, communication patterns, data management strategy, and infrastructure requirements. Creating technical specifications and architecture diagrams.",
        duration: "1-2 weeks"
      },
      {
        step: 3,
        title: "Infrastructure Setup",
        description: "Setting up container orchestration platform (Kubernetes/Service Fabric), container registry, service mesh, API Gateway, and monitoring infrastructure. Implementing Infrastructure as Code.",
        duration: "1-2 weeks"
      },
      {
        step: 4,
        title: "Service Development",
        description: "Developing microservices, implementing service logic, APIs, data access, and business logic. Containerizing services, implementing communication patterns, and setting up service discovery.",
        duration: "3-6 weeks"
      },
      {
        step: 5,
        title: "Integration & Testing",
        description: "Integrating microservices, implementing distributed patterns, comprehensive testing (unit, integration, contract), and performance testing. Setting up monitoring and observability.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Deployment & Optimization",
        description: "Deploying microservices to production, setting up CI/CD pipelines, implementing deployment strategies, and optimizing performance. Providing documentation and knowledge transfer.",
        duration: "1-2 weeks"
      }
    ])

    const engagementModels = ref([
      "Microservices Migration Projects",
      "New Microservices Development",
      "Architecture Consulting",
      "Microservices Training",
      "Hybrid Model"
    ])

    // Technologies
    const technologies = ref([
      // Microservices Platforms
      { name: "Azure Service Fabric", description: "Microservices platform for distributed systems", category: TECH_CATEGORIES.CLOUD },
      { name: "Kubernetes (AKS)", description: "Container orchestration platform", category: TECH_CATEGORIES.CLOUD },
      { name: "Docker", description: "Containerization platform", category: TECH_CATEGORIES.DEVOPS },
      { name: "Docker Compose", description: "Multi-container Docker applications", category: TECH_CATEGORIES.DEVOPS },
      
      // Service Communication
      { name: "REST APIs", description: "RESTful service communication", category: TECH_CATEGORIES.API },
      { name: "gRPC", description: "High-performance RPC framework", category: TECH_CATEGORIES.COMMUNICATION },
      { name: "Azure Service Bus", description: "Messaging service for microservices", category: TECH_CATEGORIES.COMMUNICATION },
      { name: "Azure Event Grid", description: "Event routing service", category: TECH_CATEGORIES.COMMUNICATION },
      { name: "API Gateway", description: "API management and routing", category: TECH_CATEGORIES.API },
      
      // Backend Services
      { name: "ASP.NET Core Web API", description: "RESTful API services", category: TECH_CATEGORIES.BACKEND },
      { name: "Azure Functions", description: "Serverless microservices", category: TECH_CATEGORIES.CLOUD },
      
      // Data & Storage
      { name: "Azure SQL Database", description: "Managed relational database", category: TECH_CATEGORIES.DATABASE },
      { name: "Azure Cosmos DB", description: "Globally distributed NoSQL database", category: TECH_CATEGORIES.DATABASE },
      { name: "Redis", description: "Distributed caching", category: TECH_CATEGORIES.DATABASE },
      
      // Patterns & Tools
      { name: "Service Mesh", description: "Service-to-service communication layer", category: TECH_CATEGORIES.ARCHITECTURE },
      { name: "Circuit Breaker", description: "Fault tolerance pattern", category: TECH_CATEGORIES.ARCHITECTURE },
      { name: "Event Sourcing", description: "Event-driven data pattern", category: TECH_CATEGORIES.ARCHITECTURE },
      { name: "CQRS", description: "Command Query Responsibility Segregation", category: TECH_CATEGORIES.ARCHITECTURE },
      
      // DevOps & Monitoring
      { name: "Azure DevOps", description: "CI/CD pipelines", category: TECH_CATEGORIES.DEVOPS },
      { name: "Application Insights", description: "Distributed application monitoring", category: TECH_CATEGORIES.MONITORING },
      { name: "Distributed Tracing", description: "Cross-service request tracking", category: TECH_CATEGORIES.MONITORING },
      
      // Security
      { name: "Azure Active Directory", description: "Identity and access management", category: TECH_CATEGORIES.SECURITY },
      { name: "Azure Key Vault", description: "Secrets management", category: TECH_CATEGORIES.SECURITY }
    ])

    // Case Studies
    const caseStudies = ref([
      {
        project: "Heat Exchanger Portal",
        link: "/projects/heat-exchanger",
        description: "Enterprise microservices platform with .NET Core, processing 2.5M data points daily with Docker and OpenShift orchestration.",
        image: assetPath("/assets/img/he1.jpg"),
        technologies: ['.NET Core', 'Microservices', 'Docker', 'OpenShift'],
        metrics: {
          label: "Data Processing",
          value: "2.5M daily"
        }
      },
      {
        project: "Gamified Employee Management",
        link: "/projects/gamified-employee-management",
        description: "Microservices architecture with Azure Service Fabric, multiple independent services for gamification, leaderboards, analytics, and multi-tenant support with complete data isolation.",
        image: assetPath("/assets/img/sf1.jpg"),
        technologies: ['Azure Service Fabric', 'Microservices', '.NET Core', 'Azure'],
        metrics: {
          label: "Services",
          value: "10+ microservices"
        }
      },
      {
        project: "G5 POS",
        link: "/projects/g5-pos",
        description: "Restaurant management system with microservices architecture for order processing, inventory, kitchen display, and reporting services across 50+ locations.",
        image: assetPath("/assets/img/g51.jpg"),
        technologies: ['Microservices', '.NET Core', 'Angular', 'Azure'],
        metrics: {
          label: "Locations",
          value: "50+"
        }
      }
    ])

    // FAQ
    const faqItems = ref([
      {
        question: "What is microservices architecture?",
        answer: "Microservices architecture is an approach where applications are built as a collection of small, independent services. Each service is responsible for a specific business capability, can be developed and deployed independently, and can scale independently. Services communicate through well-defined APIs, typically REST or messaging. This contrasts with monolithic architectures where all functionality is in a single application."
      },
      {
        question: "When should I use microservices architecture?",
        answer: "Microservices are ideal when you need independent scaling of different application components, want independent deployment cycles, have multiple teams working on different parts of the system, need technology diversity, or have complex applications that benefit from decomposition. However, microservices add complexity, so they're best for larger, more complex applications where the benefits outweigh the added complexity."
      },
      {
        question: "What technologies do you use for microservices?",
        answer: "I work with Azure Service Fabric and Kubernetes (AKS) for orchestration, Docker for containerization, ASP.NET Core for service development, Azure Service Bus and Event Grid for messaging, Azure SQL Database and Cosmos DB for data storage, and various patterns like API Gateway, Service Mesh, Circuit Breakers, and Event Sourcing. The exact technology stack depends on your requirements and preferences."
      },
      {
        question: "Can you help migrate from monolithic to microservices?",
        answer: "Absolutely! I specialize in microservices migration, helping organizations decompose monolithic applications into microservices. This includes assessing the monolith, identifying service boundaries, creating migration strategy, implementing strangler fig pattern, and gradually migrating functionality to microservices while maintaining business continuity."
      },
      {
        question: "How do you handle service communication in microservices?",
        answer: "I implement various communication patterns based on requirements. For synchronous communication, I use REST APIs or gRPC. For asynchronous communication, I use message queues (Azure Service Bus) or event-driven patterns (Azure Event Grid). I also implement API Gateway for external access, Service Mesh for service-to-service communication, and distributed tracing for monitoring cross-service requests."
      },
      {
        question: "What about data management in microservices?",
        answer: "I implement database-per-service pattern where each microservice has its own database, ensuring data independence. For distributed data scenarios, I use event sourcing, CQRS, and eventual consistency patterns. I also implement data synchronization strategies and distributed transaction patterns where needed, while maintaining service autonomy."
      },
      {
        question: "How long does a microservices project take?",
        answer: "A typical microservices implementation takes 6-12 weeks, depending on complexity, number of services, and whether it's a new build or migration. Simple microservices applications might take 4-6 weeks, while complex enterprise migrations can take 12-16 weeks. The timeline includes assessment, architecture design, infrastructure setup, service development, integration, testing, and deployment."
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

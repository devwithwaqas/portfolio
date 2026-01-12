<template>
  <div class="service-page">
    <div class="container service-container">
      
      <!-- Hero Section -->
      <ServiceHeroSection
        title="Azure Cloud Architecture"
        icon-name="azure"
        tagline="Design and implementation of cloud-native solutions using Microsoft Azure. From architecture design to deployment, I deliver scalable, secure, and cost-effective cloud infrastructure that drives business growth."
        :hero-image="$assetPath('/assets/img/services/azure-hero.jpg')"
        :benefits="heroBenefits"
        :badges="heroBadges"
        class="service-section-first"
      />

      <!-- Service Overview -->
      <ServiceOverview
        title="Azure Cloud Architecture"
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
        timeline="4-8 weeks (typical cloud migration/architecture project)"
        :engagement-models="engagementModels"
        :process-image="$assetPath('/assets/img/services/azure-process.jpg')"
      />

      <!-- Technologies -->
      <TechnologyStack
        title="Azure Technology Stack"
        :technologies="technologies"
      />

      <!-- Case Studies -->
      <ServiceCaseStudies
        introduction="Here are some examples of Azure cloud solutions I've architected and implemented:"
        :case-studies="caseStudies"
      />

      <!-- FAQ -->
      <ServiceFAQ
        :faq-items="faqItems"
      />

      <!-- CTA -->
      <ServiceCTA
        cta-text="Ready to migrate to Azure or build cloud-native solutions? Let's discuss your cloud architecture needs and create a scalable, secure, and cost-effective solution that transforms your infrastructure."
        :show-contact-form="false"
        :cta-image="$assetPath('/assets/img/services/azure-cta.jpg')"
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
  name: 'AzureCloudArchitecturePage',
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
      { icon: 'azure', label: 'Cloud Expertise', value: 'Azure Certified' },
      { icon: 'scalability', label: 'Scalability', value: 'Auto-Scaling' },
      { icon: 'security', label: 'Security', value: 'Enterprise-Grade' },
      { icon: 'cost', label: 'Cost Optimization', value: 'Cost-Effective' }
    ])

    const heroBadges = ref(['Cloud-Native', 'Microservices', 'DevOps', 'Secure'])

    // Overview Banner Images
    const overviewBannerImages = ref([
      assetPath('/assets/img/services/azure-banner-1.jpg'),
      assetPath('/assets/img/services/azure-banner-2.jpg'),
      assetPath('/assets/img/services/azure-banner-3.jpg')
    ])

    // Overview Content
    const overviewContent = ref({
      what: "Azure Cloud Architecture is the design and implementation of cloud-native solutions using Microsoft Azure's comprehensive suite of services. I specialize in creating scalable, secure, and cost-effective cloud infrastructures that leverage Azure App Services, Azure Functions, Service Fabric, Azure SQL Database, Azure Storage, and other Azure services. This service covers everything from initial architecture design and cloud migration planning to implementation, deployment, and ongoing optimization. Whether you're migrating existing applications to the cloud or building new cloud-native solutions from scratch, I deliver architectures that are resilient, performant, and aligned with your business objectives.",
      who: "This service is ideal for businesses and organizations looking to leverage cloud computing for scalability, reliability, and cost efficiency. Whether you're a startup building cloud-native applications, an established company planning cloud migration, an enterprise requiring hybrid cloud solutions, or any organization needing scalable infrastructure, Azure Cloud Architecture provides the expertise to transform your infrastructure. I work with clients who need modern cloud solutions, want to reduce infrastructure costs, require high availability and disaster recovery, or need to scale applications dynamically based on demand.",
      valuePropositions: [
        "Scalable infrastructure that grows with your business needs",
        "Cost optimization through right-sizing and reserved instances",
        "High availability and disaster recovery built-in",
        "Security and compliance with Azure's enterprise-grade security",
        "DevOps integration with CI/CD pipelines and automation",
        "Reduced infrastructure management overhead",
        "Global reach with Azure's worldwide data centers",
        "Flexible architecture that adapts to your requirements"
      ],
      useCases: [
        "Migrating existing on-premises applications to Azure cloud",
        "Building new cloud-native applications from scratch",
        "Implementing microservices architecture on Azure",
        "Setting up hybrid cloud solutions (on-prem + Azure)",
        "Creating serverless applications with Azure Functions",
        "Implementing containerized solutions with Azure Container Instances or AKS",
        "Building scalable web applications with Azure App Services",
        "Setting up data analytics and AI solutions on Azure"
      ]
    })

    // Capabilities
    const capabilities = ref([
      {
        title: "Cloud Architecture Design",
        description: "Comprehensive cloud architecture design using Azure services including App Services, Functions, Service Fabric, and container orchestration. Includes scalability patterns, high availability design, disaster recovery planning, and cost optimization strategies.",
        icon: "architecture",
        technologies: ["Azure App Services", "Azure Functions", "Service Fabric", "AKS", "Container Instances"]
      },
      {
        title: "Cloud Migration",
        description: "Planning and executing migration of existing applications to Azure cloud. Includes assessment, migration strategy, data migration, application refactoring, and cutover planning. Ensures minimal downtime and business continuity.",
        icon: "migration",
        technologies: ["Azure Migrate", "Azure Site Recovery", "Database Migration", "Application Migration"]
      },
      {
        title: "DevOps & CI/CD",
        description: "Setting up Azure DevOps pipelines, automated deployments, infrastructure as code (ARM templates, Terraform), and continuous integration/continuous deployment. Includes automated testing, quality gates, and production deployment automation.",
        icon: "devops",
        technologies: ["Azure DevOps", "ARM Templates", "Terraform", "Azure Pipelines", "GitHub Actions"]
      },
      {
        title: "Azure Services Integration",
        description: "Integration of Azure services including Azure SQL Database, Azure Storage, Azure Service Bus, Azure Key Vault, Azure Active Directory, and Azure Monitor. Ensures seamless communication between services and optimal performance.",
        icon: "integration",
        technologies: ["Azure SQL Database", "Azure Storage", "Service Bus", "Key Vault", "Azure AD", "Azure Monitor"]
      },
      {
        title: "Security & Compliance",
        description: "Implementing Azure security best practices including network security groups, Azure Firewall, DDoS protection, identity and access management, encryption at rest and in transit, and compliance with industry standards (GDPR, HIPAA, SOC 2).",
        icon: "security",
        technologies: ["Azure Security Center", "Azure Key Vault", "Azure AD", "Network Security", "Compliance"]
      },
      {
        title: "Monitoring & Optimization",
        description: "Setting up comprehensive monitoring with Azure Monitor, Application Insights, Log Analytics, and alerting. Includes performance optimization, cost analysis, resource right-sizing, and ongoing infrastructure optimization.",
        icon: "monitoring",
        technologies: ["Azure Monitor", "Application Insights", "Log Analytics", "Cost Management", "Performance Tuning"]
      }
    ])

    const methodologies = ref([
      "Cloud-First Architecture",
      "Microservices Design Patterns",
      "Infrastructure as Code (IaC)",
      "DevOps Best Practices",
      "Agile Cloud Development",
      "Cost Optimization Strategies",
      "Security by Design",
      "Disaster Recovery Planning",
      "Performance Optimization",
      "Continuous Monitoring"
    ])

    const deliverables = ref([
      "Comprehensive cloud architecture design document",
      "Migration plan and execution strategy",
      "Infrastructure as Code templates (ARM/Terraform)",
      "CI/CD pipeline configuration",
      "Security and compliance documentation",
      "Monitoring and alerting setup",
      "Cost optimization recommendations",
      "Disaster recovery plan",
      "Deployment scripts and automation",
      "Cloud infrastructure documentation"
    ])

    // Process Steps
    const processSteps = ref([
      {
        step: 1,
        title: "Assessment & Planning",
        description: "Evaluating current infrastructure, identifying migration candidates, assessing cloud readiness, and creating comprehensive migration and architecture plan. Includes cost analysis and ROI projections.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Architecture Design",
        description: "Designing cloud architecture using Azure services, defining scalability patterns, security architecture, network topology, and disaster recovery strategy. Creating technical specifications and design documents.",
        duration: "1-2 weeks"
      },
      {
        step: 3,
        title: "Infrastructure Setup",
        description: "Setting up Azure resources, configuring networking, security groups, identity management, and storage. Implementing Infrastructure as Code and establishing CI/CD pipelines.",
        duration: "1-2 weeks"
      },
      {
        step: 4,
        title: "Migration/Implementation",
        description: "Migrating applications and data to Azure, refactoring applications for cloud, setting up monitoring and alerting, and performing integration testing.",
        duration: "2-4 weeks"
      },
      {
        step: 5,
        title: "Optimization & Tuning",
        description: "Performance optimization, cost optimization, security hardening, and fine-tuning of Azure resources. Implementing auto-scaling and load balancing configurations.",
        duration: "1 week"
      },
      {
        step: 6,
        title: "Go-Live & Support",
        description: "Executing cutover plan, monitoring production environment, providing post-deployment support, and delivering documentation and knowledge transfer.",
        duration: "1 week"
      }
    ])

    const engagementModels = ref([
      "Cloud Migration Projects",
      "Architecture Consulting",
      "DevOps Setup & Automation",
      "Ongoing Cloud Management",
      "Hybrid Model"
    ])

    // Technologies
    const technologies = ref([
      // Azure Compute
      { name: "Azure App Services", description: "Platform-as-a-Service for web applications", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Functions", description: "Serverless compute for event-driven applications", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Service Fabric", description: "Microservices platform for distributed systems", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Container Instances", description: "Serverless containers", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Kubernetes Service (AKS)", description: "Managed Kubernetes orchestration", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Virtual Machines", description: "Infrastructure-as-a-Service compute", category: TECH_CATEGORIES.CLOUD },
      
      // Azure Data & Storage
      { name: "Azure SQL Database", description: "Managed relational database service", category: TECH_CATEGORIES.DATABASE },
      { name: "Azure Cosmos DB", description: "Globally distributed NoSQL database", category: TECH_CATEGORIES.DATABASE },
      { name: "Azure Storage", description: "Scalable cloud storage (Blob, Table, Queue, File)", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Data Factory", description: "Data integration and ETL service", category: TECH_CATEGORIES.CLOUD },
      
      // Azure Networking
      { name: "Azure Virtual Network", description: "Isolated network environment", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Load Balancer", description: "High availability and load distribution", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Application Gateway", description: "Web traffic load balancer", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure CDN", description: "Content delivery network", category: TECH_CATEGORIES.CLOUD },
      
      // Azure Security & Identity
      { name: "Azure Active Directory", description: "Identity and access management", category: TECH_CATEGORIES.SECURITY },
      { name: "Azure Key Vault", description: "Secrets and certificate management", category: TECH_CATEGORIES.SECURITY },
      { name: "Azure Security Center", description: "Unified security management", category: TECH_CATEGORIES.SECURITY },
      { name: "Azure Firewall", description: "Cloud-native firewall service", category: TECH_CATEGORIES.SECURITY },
      
      // Azure DevOps & Monitoring
      { name: "Azure DevOps", description: "CI/CD pipelines and project management", category: TECH_CATEGORIES.DEVOPS },
      { name: "Azure Monitor", description: "Comprehensive monitoring and analytics", category: TECH_CATEGORIES.MONITORING },
      { name: "Application Insights", description: "Application performance monitoring", category: TECH_CATEGORIES.MONITORING },
      { name: "Log Analytics", description: "Centralized log management", category: TECH_CATEGORIES.MONITORING },
      
      // Infrastructure as Code
      { name: "ARM Templates", description: "Azure Resource Manager templates", category: TECH_CATEGORIES.DEVOPS },
      { name: "Terraform", description: "Infrastructure as Code tool", category: TECH_CATEGORIES.DEVOPS },
      { name: "Azure CLI", description: "Command-line interface for Azure", category: TECH_CATEGORIES.DEVOPS },
      
      // Azure Integration
      { name: "Azure Service Bus", description: "Messaging and communication service", category: TECH_CATEGORIES.COMMUNICATION },
      { name: "Azure Event Grid", description: "Event routing service", category: TECH_CATEGORIES.COMMUNICATION },
      { name: "Azure API Management", description: "API gateway and management", category: TECH_CATEGORIES.API }
    ])

    // Case Studies
    const caseStudies = ref([
      {
        project: "UK Property Management",
        link: "/projects/uk-property-management",
        description: "Azure-native property management platform managing 9,000+ properties with Azure App Services, Azure SQL Database, and comprehensive cloud infrastructure.",
        image: assetPath("/assets/img/gpc1.jpg"),
        metrics: {
          label: "Properties Managed",
          value: "9,000+"
        }
      },
      {
        project: "Insurance Clients",
        link: "/projects/insurance-clients",
        description: "Enterprise insurance platform with microservices architecture on Azure, handling millions of policies with high availability and scalability.",
        image: assetPath("/assets/img/in1.jpg"),
        metrics: {
          label: "Uptime",
          value: "99.9%"
        }
      },
      {
        project: "Gamified Employee Management",
        link: "/projects/gamified-employee-management",
        description: "Cloud-native employee engagement platform with Azure microservices, real-time processing, and scalable architecture supporting enterprise deployments.",
        image: assetPath("/assets/img/sf1.jpg"),
        metrics: {
          label: "Engagement",
          value: "45% increase"
        }
      }
    ])

    // FAQ
    const faqItems = ref([
      {
        question: "What Azure services do you work with?",
        answer: "I work with a comprehensive range of Azure services including Azure App Services, Azure Functions, Azure Service Fabric, Azure Kubernetes Service (AKS), Azure SQL Database, Azure Storage, Azure Virtual Networks, Azure Active Directory, Azure Key Vault, Azure DevOps, Azure Monitor, Application Insights, and many more. I design solutions using the Azure services that best fit your specific requirements, whether you need serverless functions, container orchestration, managed databases, or traditional virtual machines."
      },
      {
        question: "Can you help migrate existing applications to Azure?",
        answer: "Absolutely! I specialize in cloud migration projects, helping organizations move their existing on-premises or other cloud applications to Azure. This includes assessment of current infrastructure, migration strategy development, application refactoring for cloud, data migration, and cutover planning. I ensure minimal downtime and business continuity throughout the migration process."
      },
      {
        question: "How do you ensure cost optimization on Azure?",
        answer: "Cost optimization is a key focus in all Azure architectures. I implement strategies including right-sizing resources, using reserved instances for predictable workloads, implementing auto-scaling to match demand, leveraging serverless options where appropriate, optimizing storage tiers, and continuous monitoring of costs. I provide cost analysis and recommendations to ensure you're getting maximum value from your Azure investment."
      },
      {
        question: "What about security and compliance on Azure?",
        answer: "Security is built into every Azure architecture I design. I implement Azure security best practices including network security groups, Azure Firewall, DDoS protection, Azure Active Directory for identity management, Azure Key Vault for secrets management, encryption at rest and in transit, and compliance with industry standards (GDPR, HIPAA, SOC 2). I also leverage Azure Security Center for unified security management and threat protection."
      },
      {
        question: "Do you set up DevOps and CI/CD on Azure?",
        answer: "Yes, I provide complete DevOps setup on Azure including Azure DevOps pipelines, GitHub Actions integration, Infrastructure as Code using ARM templates or Terraform, automated testing, quality gates, and production deployment automation. I ensure smooth CI/CD processes that enable rapid, reliable deployments to Azure environments."
      },
      {
        question: "How long does an Azure cloud migration or architecture project take?",
        answer: "A typical Azure cloud migration or architecture project takes 4-8 weeks, depending on complexity, scope, and number of applications. Simple migrations might take 2-4 weeks, while complex enterprise migrations with multiple applications can take 8-12 weeks. The timeline includes assessment, architecture design, infrastructure setup, migration/implementation, optimization, and go-live phases."
      },
      {
        question: "Can you work with hybrid cloud scenarios?",
        answer: "Yes, I have extensive experience with hybrid cloud architectures that combine on-premises infrastructure with Azure cloud services. This includes Azure Arc for managing on-premises resources, Azure ExpressRoute for private connectivity, and designing solutions that seamlessly integrate on-premises and cloud components based on your business requirements."
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

<template>
  <div class="service-page">
    <div class="container service-container">
      
      <!-- Hero Section -->
      <ServiceHeroSection
        title="Technical Leadership"
        icon-name="leadership"
        tagline="Leading development teams, mentoring developers, establishing best practices, and driving technical excellence. From code reviews to architecture decisions, I help teams deliver high-quality software solutions."
        :hero-image="$assetPath('/assets/img/services/leadership-hero.jpg')"
        :benefits="heroBenefits"
        :badges="heroBadges"
        class="service-section-first"
      />

      <!-- Service Overview -->
      <ServiceOverview
        title="Technical Leadership"
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
        timeline="Ongoing engagement (typically 3-6 months minimum)"
        :engagement-models="engagementModels"
        :process-image="$assetPath('/assets/img/services/leadership-process.jpg')"
      />

      <!-- Technologies -->
      <TechnologyStack
        title="Technical Leadership Focus Areas"
        :technologies="technologies"
      />

      <!-- Case Studies -->
      <ServiceCaseStudies
        introduction="Here are some examples of technical leadership I've provided:"
        :case-studies="caseStudies"
      />

      <!-- FAQ -->
      <ServiceFAQ
        :faq-items="faqItems"
      />

      <!-- CTA -->
      <ServiceCTA
        cta-text="Ready to elevate your development team's performance? Let's discuss how technical leadership can transform your software development process and drive technical excellence."
        :show-contact-form="false"
        :cta-image="$assetPath('/assets/img/services/leadership-cta.jpg')"
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

export default {
  name: 'TechnicalLeadershipPage',
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
      { icon: 'leadership', label: 'Team Leadership', value: 'Proven Track Record' },
      { icon: 'mentoring', label: 'Mentoring', value: 'Developer Growth' },
      { icon: 'best practices', label: 'Best Practices', value: 'Quality Focus' },
      { icon: 'architecture', label: 'Architecture', value: 'Strategic Decisions' }
    ])

    const heroBadges = ref(['Team Building', 'Code Quality', 'Agile', 'Excellence'])

    // Overview Banner Images
    const overviewBannerImages = ref([
      '/assets/img/services/leadership-banner-1.jpg',
      '/assets/img/services/leadership-banner-2.jpg',
      '/assets/img/services/leadership-banner-3.jpg'
    ])

    // Overview Content
    const overviewContent = ref({
      what: "Technical Leadership is the practice of guiding development teams, making strategic technical decisions, establishing best practices, and fostering a culture of technical excellence. I provide technical leadership services that help organizations build high-performing development teams, improve code quality, accelerate delivery, and make informed architecture decisions. This service covers everything from mentoring junior developers and conducting code reviews to leading architecture discussions, establishing coding standards, implementing development processes, and driving technical innovation. Whether you need a technical lead for a specific project, ongoing team leadership, or strategic technical guidance, I deliver leadership that transforms how your team develops software.",
      who: "This service is ideal for organizations that need experienced technical leadership to guide their development teams. Whether you're a startup building your first development team, an established company looking to improve code quality and development velocity, an organization undergoing digital transformation, or any company needing strategic technical direction, Technical Leadership provides the expertise to elevate your team's performance. I work with organizations that want to establish best practices, improve developer productivity, make better architecture decisions, mentor junior developers, or scale their development capabilities.",
      valuePropositions: [
        "Improved code quality through code reviews and best practices",
        "Faster development velocity with better processes and guidance",
        "Better architecture decisions through experienced technical leadership",
        "Developer growth through mentoring and knowledge sharing",
        "Reduced technical debt through strategic planning and refactoring",
        "Consistent development practices across teams",
        "Better alignment between business goals and technical implementation",
        "Risk mitigation through technical oversight and guidance"
      ],
      useCases: [
        "Leading development teams on complex projects",
        "Mentoring junior and mid-level developers",
        "Establishing coding standards and best practices",
        "Conducting code reviews and providing technical feedback",
        "Making architecture and technology decisions",
        "Driving technical innovation and adoption of new technologies",
        "Improving development processes and workflows",
        "Building high-performing development teams"
      ]
    })

    // Capabilities
    const capabilities = ref([
      {
        title: "Team Leadership",
        description: "Leading development teams on complex projects, facilitating technical discussions, making architecture decisions, and ensuring timely delivery of high-quality software. Includes sprint planning, technical standups, and cross-functional collaboration.",
        icon: "leadership",
        technologies: ["Agile Leadership", "Sprint Planning", "Technical Standups", "Cross-functional Collaboration"]
      },
      {
        title: "Mentoring & Coaching",
        description: "Mentoring junior and mid-level developers, conducting one-on-one sessions, providing career guidance, and helping developers grow their technical skills. Includes pair programming, knowledge sharing sessions, and technical training.",
        icon: "mentoring",
        technologies: ["One-on-One Mentoring", "Pair Programming", "Knowledge Sharing", "Technical Training"]
      },
      {
        title: "Code Reviews & Quality",
        description: "Conducting comprehensive code reviews, establishing code quality standards, implementing code review processes, and ensuring adherence to best practices. Includes automated code quality tools, static analysis, and quality metrics.",
        icon: "code review",
        technologies: ["Code Reviews", "Code Quality Standards", "Static Analysis", "Quality Metrics"]
      },
      {
        title: "Architecture & Design",
        description: "Making architecture decisions, designing system architectures, evaluating technology choices, and establishing architectural patterns. Includes architecture reviews, design patterns, and technical documentation.",
        icon: "architecture",
        technologies: ["Architecture Design", "Technology Evaluation", "Design Patterns", "Technical Documentation"]
      },
      {
        title: "Best Practices & Standards",
        description: "Establishing coding standards, development processes, Git workflows, testing practices, and DevOps practices. Includes creating style guides, process documentation, and best practice guidelines.",
        icon: "best practices",
        technologies: ["Coding Standards", "Git Workflows", "Testing Practices", "DevOps Practices"]
      },
      {
        title: "Technical Strategy",
        description: "Developing technical roadmaps, evaluating new technologies, making technology stack decisions, and aligning technical strategy with business goals. Includes technology research, proof-of-concepts, and strategic planning.",
        icon: "strategy",
        technologies: ["Technical Roadmaps", "Technology Evaluation", "Proof of Concepts", "Strategic Planning"]
      }
    ])

    const methodologies = ref([
      "Agile Leadership",
      "Scrum Master Practices",
      "Code Review Processes",
      "Pair Programming",
      "Mob Programming",
      "Technical Documentation",
      "Knowledge Sharing Sessions",
      "Continuous Improvement",
      "Retrospectives",
      "Technical Debt Management"
    ])

    const deliverables = ref([
      "Technical leadership and team guidance",
      "Code review reports and recommendations",
      "Architecture design documents",
      "Coding standards and style guides",
      "Development process documentation",
      "Technical roadmaps and strategy documents",
      "Mentoring plans and developer growth paths",
      "Best practices documentation",
      "Technical training materials",
      "Code quality metrics and reports"
    ])

    // Process Steps
    const processSteps = ref([
      {
        step: 1,
        title: "Assessment & Planning",
        description: "Assessing current team capabilities, development processes, code quality, and technical challenges. Creating technical leadership plan, identifying improvement areas, and establishing goals.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Establishing Foundations",
        description: "Establishing coding standards, code review processes, development workflows, and best practices. Setting up tools, documentation, and processes for consistent development.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "Team Engagement",
        description: "Starting regular code reviews, mentoring sessions, technical discussions, and team leadership activities. Conducting one-on-ones, pair programming, and knowledge sharing.",
        duration: "Ongoing"
      },
      {
        step: 4,
        title: "Architecture & Strategy",
        description: "Making architecture decisions, designing systems, evaluating technologies, and developing technical roadmaps. Leading architecture discussions and strategic planning.",
        duration: "Ongoing"
      },
      {
        step: 5,
        title: "Continuous Improvement",
        description: "Monitoring progress, gathering feedback, refining processes, and continuously improving development practices. Conducting retrospectives and adjusting approach.",
        duration: "Ongoing"
      },
      {
        step: 6,
        title: "Knowledge Transfer",
        description: "Documenting processes, creating training materials, conducting knowledge sharing sessions, and ensuring team can continue practices independently.",
        duration: "Ongoing"
      }
    ])

    const engagementModels = ref([
      "Full-Time Technical Lead",
      "Part-Time Technical Leadership",
      "Project-Based Leadership",
      "Mentoring & Coaching",
      "Architecture Consulting",
      "Hybrid Model"
    ])

    // Technologies (Focus Areas)
    const technologies = ref([
      // Leadership & Process
      { name: "Agile Methodologies", description: "Scrum, Kanban, and agile practices", category: TECH_CATEGORIES.METHODOLOGY },
      { name: "Code Review Tools", description: "GitHub, Azure DevOps, GitLab code review", category: TECH_CATEGORIES.DEVOPS },
      { name: "Static Analysis", description: "SonarQube, ESLint, StyleCop", category: TECH_CATEGORIES.DEVOPS },
      { name: "CI/CD Practices", description: "Continuous integration and deployment", category: TECH_CATEGORIES.DEVOPS },
      
      // Architecture & Design
      { name: "Architecture Patterns", description: "Microservices, MVC, Clean Architecture", category: TECH_CATEGORIES.ARCHITECTURE },
      { name: "Design Patterns", description: "SOLID principles, design patterns", category: TECH_CATEGORIES.ARCHITECTURE },
      { name: "System Design", description: "Scalable system architecture", category: TECH_CATEGORIES.ARCHITECTURE },
      
      // Development Practices
      { name: "Test-Driven Development", description: "TDD and testing best practices", category: TECH_CATEGORIES.METHODOLOGY },
      { name: "Clean Code", description: "Clean code principles and practices", category: TECH_CATEGORIES.METHODOLOGY },
      { name: "Refactoring", description: "Code refactoring techniques", category: TECH_CATEGORIES.METHODOLOGY },
      { name: "Git Workflows", description: "Git branching strategies and workflows", category: TECH_CATEGORIES.DEVOPS },
      
      // Technologies (for evaluation and decisions)
      { name: ".NET Core", description: "Backend framework expertise", category: TECH_CATEGORIES.BACKEND },
      { name: "Vue.js / React / Angular", description: "Frontend framework guidance", category: TECH_CATEGORIES.FRONTEND },
      { name: "Azure Cloud", description: "Cloud architecture decisions", category: TECH_CATEGORIES.CLOUD },
      { name: "SQL Server", description: "Database design and optimization", category: TECH_CATEGORIES.DATABASE },
      
      // Tools & Practices
      { name: "Documentation", description: "Technical documentation practices", category: TECH_CATEGORIES.METHODOLOGY },
      { name: "Knowledge Sharing", description: "Team knowledge transfer practices", category: TECH_CATEGORIES.METHODOLOGY }
    ])

    // Case Studies
    const caseStudies = ref([
      {
        project: "G5 POS",
        link: "/projects/g5-pos",
        description: "Led development team building restaurant management system, established coding standards, conducted code reviews, and mentored developers on microservices architecture.",
        image: "/assets/img/g51.jpg",
        metrics: {
          label: "Team Size",
          value: "5+ developers"
        }
      },
      {
        project: "Gamified Employee Management",
        link: "/projects/gamified-employee-management",
        description: "Provided technical leadership for enterprise employee engagement platform, made architecture decisions, established best practices, and mentored team on microservices patterns.",
        image: "/assets/img/sf1.jpg",
        metrics: {
          label: "Architecture",
          value: "Microservices"
        }
      },
      {
        project: "Insurance Clients",
        link: "/projects/insurance-clients",
        description: "Led technical team for insurance platform, established CI/CD practices, conducted code reviews, and drove adoption of modern development practices.",
        image: "/assets/img/in1.jpg",
        metrics: {
          label: "Deployment",
          value: "90% faster"
        }
      }
    ])

    // FAQ
    const faqItems = ref([
      {
        question: "What does technical leadership involve?",
        answer: "Technical leadership involves leading development teams, making architecture and technology decisions, conducting code reviews, mentoring developers, establishing best practices, and driving technical excellence. I provide guidance on code quality, development processes, architecture design, and help teams deliver high-quality software solutions. This includes everything from day-to-day team leadership to strategic technical planning and developer growth."
      },
      {
        question: "Do you work with existing teams or help build new teams?",
        answer: "I work with both existing teams and help build new teams. For existing teams, I assess current practices, identify improvement areas, and help elevate team performance through mentoring, code reviews, and process improvements. For new teams, I help establish foundations including coding standards, development processes, tools, and best practices from the start. I can also help hire and onboard new developers."
      },
      {
        question: "How do you conduct code reviews?",
        answer: "I conduct comprehensive code reviews focusing on code quality, best practices, architecture alignment, performance, security, and maintainability. Reviews include feedback on code structure, design patterns, testing, documentation, and adherence to coding standards. I use tools like GitHub, Azure DevOps, or GitLab for code reviews and provide constructive feedback that helps developers grow. I also establish code review processes and guidelines for the team."
      },
      {
        question: "What technologies and frameworks do you provide leadership for?",
        answer: "I provide technical leadership for a wide range of technologies including .NET Core, ASP.NET Core, Vue.js, React, Angular, SQL Server, Azure cloud services, and modern development tools. I help teams make technology decisions, evaluate new technologies, and establish best practices for their specific technology stack. My focus is on helping teams work effectively with whatever technologies they're using."
      },
      {
        question: "How do you mentor developers?",
        answer: "I mentor developers through one-on-one sessions, pair programming, code reviews, knowledge sharing sessions, and technical training. I help developers grow their skills, understand best practices, make better technical decisions, and advance their careers. Mentoring includes guidance on coding practices, architecture understanding, problem-solving approaches, and career development. I create personalized growth plans based on each developer's goals and current skill level."
      },
      {
        question: "Can you help establish development processes and best practices?",
        answer: "Absolutely! I specialize in establishing development processes, coding standards, Git workflows, testing practices, code review processes, and DevOps practices. I create documentation, style guides, process workflows, and best practice guidelines tailored to your team's needs. I also help implement tools and automation to support these processes, ensuring consistency and quality across the development team."
      },
      {
        question: "What is the typical engagement model for technical leadership?",
        answer: "Technical leadership is typically an ongoing engagement, usually 3-6 months minimum to establish practices and see meaningful improvement. I can work full-time as a technical lead, part-time for specific guidance, or on a project basis for specific initiatives. Engagement models include full-time technical lead, part-time leadership, project-based leadership, mentoring and coaching, or architecture consulting. The model depends on your team size, needs, and goals."
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

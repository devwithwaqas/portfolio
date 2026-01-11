<template>
  <div class="service-page">
    <div class="container service-container">
      
      <!-- Hero Section -->
      <ServiceHeroSection
        title="Agile Project Management"
        icon-name="agile"
        tagline="Leading agile development teams, conducting sprint planning, retrospectives, and ensuring timely delivery of high-quality software products. Transform your development process with proven agile methodologies."
        hero-image="/assets/img/services/agile-hero.jpg"
        :benefits="heroBenefits"
        :badges="heroBadges"
        class="service-section-first"
      />

      <!-- Service Overview -->
      <ServiceOverview
        title="Agile Project Management"
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
        timeline="Ongoing engagement (typically 3+ months)"
        :engagement-models="engagementModels"
        process-image="/assets/img/services/agile-process.jpg"
      />

      <!-- Technologies -->
      <TechnologyStack
        title="Agile Tools & Methodologies"
        :technologies="technologies"
      />

      <!-- Case Studies -->
      <ServiceCaseStudies
        introduction="Here are some examples of agile project management I've led:"
        :case-studies="caseStudies"
      />

      <!-- FAQ -->
      <ServiceFAQ
        :faq-items="faqItems"
      />

      <!-- CTA -->
      <ServiceCTA
        cta-text="Ready to transform your development process with agile methodologies? Let's discuss how agile project management can improve your team's productivity, quality, and delivery speed."
        :show-contact-form="false"
        cta-image="/assets/img/services/agile-cta.jpg"
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
  name: 'AgileProjectManagementPage',
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
      { icon: 'agile', label: 'Agile Methods', value: 'Scrum & Kanban' },
      { icon: 'sprint', label: 'Sprint Planning', value: '2-Week Sprints' },
      { icon: 'delivery', label: 'Delivery', value: 'Timely & Quality' },
      { icon: 'team', label: 'Team Collaboration', value: 'High Performance' }
    ])

    const heroBadges = ref(['Scrum', 'Kanban', 'Sprint', 'Retrospectives'])

    // Overview Banner Images
    const overviewBannerImages = ref([
      '/assets/img/services/agile-banner-1.jpg',
      '/assets/img/services/agile-banner-2.jpg',
      '/assets/img/services/agile-banner-3.jpg'
    ])

    // Overview Content
    const overviewContent = ref({
      what: "Agile Project Management is an iterative, collaborative approach to software development that emphasizes flexibility, customer collaboration, and rapid delivery of working software. I provide agile project management services that help teams deliver high-quality software through proven methodologies like Scrum and Kanban. This service covers everything from sprint planning and daily standups to retrospectives, backlog management, release planning, and stakeholder communication. Whether you need a Scrum Master, Agile Coach, or Project Manager to lead your agile teams, I deliver management that transforms how your team works, improves productivity, ensures timely delivery, and maintains high quality standards.",
      who: "This service is ideal for organizations that want to improve their software development process, increase team productivity, deliver software faster, and respond quickly to changing requirements. Whether you're a startup building your first development team, an established company transitioning to agile, an organization with multiple agile teams needing coordination, or any company wanting to improve delivery speed and quality, Agile Project Management provides the expertise to transform your development process. I work with organizations that want to adopt agile practices, improve team collaboration, reduce time-to-market, increase customer satisfaction, or scale agile practices across multiple teams.",
      valuePropositions: [
        "Faster time-to-market through iterative delivery",
        "Better adaptability to changing requirements",
        "Improved team collaboration and communication",
        "Higher quality through continuous testing and feedback",
        "Better visibility into project progress and blockers",
        "Increased customer satisfaction through regular delivery",
        "Reduced risk through early and frequent delivery",
        "Better alignment between business and development teams"
      ],
      useCases: [
        "Leading agile development teams as Scrum Master or Project Manager",
        "Transitioning teams from waterfall to agile methodologies",
        "Conducting sprint planning, daily standups, and retrospectives",
        "Managing product backlogs and release planning",
        "Coordinating multiple agile teams on large projects",
        "Improving team velocity and delivery speed",
        "Establishing agile practices and processes",
        "Training teams on agile methodologies"
      ]
    })

    // Capabilities
    const capabilities = ref([
      {
        title: "Scrum Master Services",
        description: "Leading Scrum teams, facilitating sprint ceremonies (planning, daily standups, reviews, retrospectives), removing impediments, and ensuring team follows Scrum practices. Includes sprint planning, backlog refinement, and sprint execution.",
        icon: "scrum",
        technologies: ["Sprint Planning", "Daily Standups", "Sprint Reviews", "Retrospectives"]
      },
      {
        title: "Backlog Management",
        description: "Managing product backlogs, user story creation, prioritization, estimation, and refinement. Includes backlog grooming, story mapping, and maintaining well-defined, prioritized backlogs.",
        icon: "backlog",
        technologies: ["User Stories", "Story Points", "Backlog Refinement", "Prioritization"]
      },
      {
        title: "Sprint Planning & Execution",
        description: "Facilitating sprint planning sessions, helping teams commit to sprint goals, tracking sprint progress, and ensuring timely delivery. Includes velocity tracking, burndown charts, and sprint execution.",
        icon: "sprint",
        technologies: ["Sprint Planning", "Velocity Tracking", "Burndown Charts", "Sprint Execution"]
      },
      {
        title: "Stakeholder Communication",
        description: "Managing stakeholder communication, conducting sprint reviews, presenting progress, gathering feedback, and ensuring alignment between business and development teams. Includes status reporting and demos.",
        icon: "communication",
        technologies: ["Sprint Reviews", "Stakeholder Updates", "Progress Reporting", "Demos"]
      },
      {
        title: "Agile Coaching & Training",
        description: "Coaching teams on agile practices, conducting agile training sessions, helping teams improve their agile maturity, and establishing agile culture. Includes workshops, training, and continuous improvement.",
        icon: "coaching",
        technologies: ["Agile Training", "Workshops", "Agile Coaching", "Continuous Improvement"]
      },
      {
        title: "Multi-Team Coordination",
        description: "Coordinating multiple agile teams, managing dependencies, facilitating cross-team communication, and ensuring alignment across teams. Includes Scrum of Scrums, release planning, and program management.",
        icon: "coordination",
        technologies: ["Scrum of Scrums", "Release Planning", "Dependency Management", "Program Management"]
      }
    ])

    const methodologies = ref([
      "Scrum Framework",
      "Kanban Method",
      "Scrum of Scrums",
      "SAFe (Scaled Agile Framework)",
      "Lean Software Development",
      "Extreme Programming (XP)",
      "Sprint Planning",
      "Retrospectives",
      "Continuous Improvement",
      "Agile Metrics & Reporting"
    ])

    const deliverables = ref([
      "Sprint plans and execution",
      "Product backlog and user stories",
      "Sprint reports and metrics",
      "Velocity tracking and burndown charts",
      "Retrospective action items",
      "Release plans and roadmaps",
      "Stakeholder status reports",
      "Agile process documentation",
      "Team improvement plans",
      "Agile training materials"
    ])

    // Process Steps
    const processSteps = ref([
      {
        step: 1,
        title: "Assessment & Setup",
        description: "Assessing current process, team structure, and challenges. Setting up agile framework (Scrum/Kanban), establishing team roles, and creating initial backlog. Includes tool setup and process definition.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Sprint Planning",
        description: "Facilitating sprint planning sessions, helping team select user stories, estimate effort, and commit to sprint goals. Creating sprint backlog and defining sprint objectives.",
        duration: "Ongoing (per sprint)"
      },
      {
        step: 3,
        title: "Sprint Execution",
        description: "Facilitating daily standups, tracking progress, removing impediments, and ensuring team stays on track. Monitoring burndown, velocity, and sprint health.",
        duration: "Ongoing (during sprint)"
      },
      {
        step: 4,
        title: "Sprint Review & Retrospective",
        description: "Facilitating sprint reviews with stakeholders, demonstrating completed work, gathering feedback. Conducting retrospectives to identify improvements and action items.",
        duration: "Ongoing (end of sprint)"
      },
      {
        step: 5,
        title: "Backlog Refinement",
        description: "Continuously refining product backlog, creating new user stories, prioritizing items, and ensuring backlog is ready for future sprints. Includes story estimation and acceptance criteria.",
        duration: "Ongoing"
      },
      {
        step: 6,
        title: "Continuous Improvement",
        description: "Monitoring team metrics, identifying improvement opportunities, implementing process improvements, and helping team mature in agile practices. Includes coaching and training.",
        duration: "Ongoing"
      }
    ])

    const engagementModels = ref([
      "Full-Time Scrum Master",
      "Part-Time Agile Coach",
      "Project-Based Management",
      "Agile Training & Coaching",
      "Hybrid Model"
    ])

    // Technologies (Agile Tools)
    const technologies = ref([
      // Agile Frameworks
      { name: "Scrum", description: "Agile framework for iterative development", category: TECH_CATEGORIES.METHODOLOGY },
      { name: "Kanban", description: "Visual workflow management method", category: TECH_CATEGORIES.METHODOLOGY },
      { name: "SAFe", description: "Scaled Agile Framework for enterprises", category: TECH_CATEGORIES.METHODOLOGY },
      { name: "Lean", description: "Lean software development principles", category: TECH_CATEGORIES.METHODOLOGY },
      
      // Project Management Tools
      { name: "Azure DevOps", description: "Agile project management and tracking", category: TECH_CATEGORIES.DEVOPS },
      { name: "Jira", description: "Issue tracking and project management", category: TECH_CATEGORIES.DEVOPS },
      { name: "GitHub Projects", description: "Project management and planning", category: TECH_CATEGORIES.DEVOPS },
      { name: "Trello", description: "Kanban board management", category: TECH_CATEGORIES.DEVOPS },
      
      // Collaboration Tools
      { name: "Microsoft Teams", description: "Team collaboration and communication", category: TECH_CATEGORIES.COMMUNICATION },
      { name: "Slack", description: "Team communication platform", category: TECH_CATEGORIES.COMMUNICATION },
      { name: "Confluence", description: "Documentation and knowledge sharing", category: TECH_CATEGORIES.METHODOLOGY },
      
      // Metrics & Reporting
      { name: "Velocity Tracking", description: "Team velocity and capacity planning", category: TECH_CATEGORIES.METHODOLOGY },
      { name: "Burndown Charts", description: "Sprint progress visualization", category: TECH_CATEGORIES.METHODOLOGY },
      { name: "Cumulative Flow", description: "Workflow visualization", category: TECH_CATEGORIES.METHODOLOGY },
      
      // Practices
      { name: "User Stories", description: "Requirements as user stories", category: TECH_CATEGORIES.METHODOLOGY },
      { name: "Story Points", description: "Relative estimation technique", category: TECH_CATEGORIES.METHODOLOGY },
      { name: "Sprint Planning", description: "Iteration planning process", category: TECH_CATEGORIES.METHODOLOGY },
      { name: "Retrospectives", description: "Continuous improvement practice", category: TECH_CATEGORIES.METHODOLOGY }
    ])

    // Case Studies
    const caseStudies = ref([
      {
        project: "G5 POS",
        link: "/projects/g5-pos",
        description: "Led agile development team building restaurant management system, conducted sprint planning, daily standups, and retrospectives, ensuring timely delivery across 50+ locations.",
        image: "/assets/img/g51.jpg",
        metrics: {
          label: "Delivery",
          value: "On-time"
        }
      },
      {
        project: "Insurance Clients",
        link: "/projects/insurance-clients",
        description: "Managed agile development for enterprise insurance platform, coordinated multiple teams, facilitated Scrum of Scrums, and ensured 90% faster deployment through agile practices.",
        image: "/assets/img/in1.jpg",
        metrics: {
          label: "Deployment",
          value: "90% faster"
        }
      },
      {
        project: "Gamified Employee Management",
        link: "/projects/gamified-employee-management",
        description: "Led agile team for employee engagement platform, managed product backlog, conducted sprint reviews, and delivered comprehensive microservices solution on schedule.",
        image: "/assets/img/sf1.jpg",
        metrics: {
          label: "Engagement",
          value: "45% increase"
        }
      }
    ])

    // FAQ
    const faqItems = ref([
      {
        question: "What agile methodologies do you use?",
        answer: "I primarily work with Scrum and Kanban, the two most widely adopted agile methodologies. For Scrum, I facilitate all ceremonies including sprint planning, daily standups, sprint reviews, and retrospectives. For Kanban, I help teams visualize workflow, manage work-in-progress limits, and optimize flow. I can also work with SAFe (Scaled Agile Framework) for larger organizations with multiple teams. The methodology choice depends on your team's needs, project type, and organizational context."
      },
      {
        question: "What does a Scrum Master do?",
        answer: "As a Scrum Master, I facilitate Scrum ceremonies (sprint planning, daily standups, sprint reviews, retrospectives), help the team follow Scrum practices, remove impediments blocking the team, protect the team from external distractions, and coach the team on agile principles. I also work with the Product Owner on backlog management and help stakeholders understand agile processes. The goal is to help the team become self-organizing and continuously improve."
      },
      {
        question: "How do you handle sprint planning?",
        answer: "I facilitate sprint planning sessions where the team reviews the product backlog, selects user stories for the sprint, estimates effort (using story points or hours), and commits to sprint goals. I help break down large stories, clarify requirements, identify dependencies, and ensure the team has a clear understanding of what they're committing to. I also help establish sprint capacity and velocity tracking."
      },
      {
        question: "Can you help transition from waterfall to agile?",
        answer: "Absolutely! I specialize in helping organizations transition from waterfall to agile methodologies. This includes assessing current processes, creating transition plan, training teams on agile practices, establishing agile ceremonies, and gradually adopting agile principles. I help teams understand the mindset shift, establish new processes, and overcome common challenges during the transition."
      },
      {
        question: "How do you track progress and metrics?",
        answer: "I track various agile metrics including velocity (story points completed per sprint), burndown charts (sprint progress), cumulative flow diagrams (workflow visualization), sprint goal achievement, and team health metrics. I use tools like Azure DevOps, Jira, or GitHub Projects for tracking and create regular reports for stakeholders. Metrics help identify trends, bottlenecks, and improvement opportunities."
      },
      {
        question: "What about managing multiple teams?",
        answer: "I have experience coordinating multiple agile teams through practices like Scrum of Scrums, where representatives from each team meet to coordinate work, manage dependencies, and align on progress. I also facilitate release planning across teams, manage cross-team dependencies, and ensure alignment on shared goals. For larger organizations, I can work with SAFe framework for scaled agile."
      },
      {
        question: "What is the typical engagement model?",
        answer: "Agile project management is typically an ongoing engagement, usually 3+ months minimum to establish practices and see meaningful improvement. I can work full-time as a Scrum Master, part-time for specific guidance, or on a project basis for specific initiatives. Engagement models include full-time Scrum Master, part-time agile coach, project-based management, agile training and coaching, or hybrid models. The model depends on your team size, needs, and goals."
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

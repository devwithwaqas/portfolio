<template>
  <ServicePageTemplate serviceTitle="Mobile Development">
    
    <!-- Hero Section -->
      <ServiceHeroSection
        title="Mobile Development"
        icon-name="mobile"
        tagline="Native and cross-platform mobile application development for iOS and Android. Whether you need native iOS (Swift/Objective-C), native Android (Kotlin/Java), React Native, Flutter, or Xamarin, I deliver high-performance mobile solutions that engage users and drive business growth."
        :hero-image="$assetPath('/assets/img/services/mobile-hero.jpg')"
        :benefits="heroBenefits"
        :badges="heroBadges"
        class="service-section-first"
      />

      <!-- Service Overview -->
      <ServiceOverview
        title="Mobile Development"
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
        timeline="8-16 weeks (typical mobile app project)"
        :engagement-models="engagementModels"
        :process-image="$assetPath('/assets/img/services/mobile-process.jpg')"
      />

      <!-- Technologies -->
      <TechnologyStack
        title="Technology Stack"
        :technologies="technologies"
      />

      <!-- Case Studies -->
      <ServiceCaseStudies
        introduction="Here are some examples of mobile applications I've developed:"
        :case-studies="caseStudies"
      />

      <!-- FAQ -->
      <ServiceFAQ
        :faq-items="faqItems"
      />

      <!-- Related Projects -->
      <RelatedProjects
        :projects="relatedProjects"
        introduction="Explore related mobile development projects I've worked on:"
      />

      <!-- CTA -->
      <ServiceCTA
        cta-text="Ready to build your mobile application? Whether you need native iOS, native Android, React Native, Flutter, or Xamarin, let's discuss your mobile app requirements and create a solution that delivers exceptional user experiences and drives your business forward."
        :show-contact-form="false"
        :cta-image="$assetPath('/assets/img/services/mobile-cta.jpg')"
        class="service-section-last"
      />

  </ServicePageTemplate>
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
import RelatedProjects from '@/components/common/RelatedProjects.vue'
import TechnologyStack from '@/components/projects/TechnologyStack.vue'
import ServicePageTemplate from '@/components/common/ServicePageTemplate.vue'
import { TECH_CATEGORIES } from '@/config/constants.js'
import { assetPath } from '@/utils/assetPath.js'

export default {
  name: 'MobileDevelopmentPage',
  components: {
    ServiceHeroSection,
    ServiceOverview,
    ServiceCapabilities,
    ServiceProcess,
    ServiceCaseStudies,
    ServiceFAQ,
    ServiceCTA,
    RelatedProjects,
    TechnologyStack,
    ServicePageTemplate
  },
  setup() {
    // Hero Benefits
    const heroBenefits = ref([
      { icon: 'mobile', label: 'Platform Coverage', value: 'iOS • Android • Cross-Platform' },
      { icon: 'performance', label: 'Performance', value: 'Native-Like' },
      { icon: 'scalability', label: 'Scalability', value: 'Enterprise-Ready' },
      { icon: 'security', label: 'Security', value: 'Industry-Standard' }
    ])

    const heroBadges = ref(['Platform-Agnostic', 'Native & Cross-Platform', 'Modern Stack', 'User-Focused'])

    // Overview Banner Images
    const overviewBannerImages = ref([
      assetPath('/assets/img/services/mobile-banner-1.jpg'),
      assetPath('/assets/img/services/mobile-banner-2.jpg'),
      assetPath('/assets/img/services/mobile-banner-3.jpg')
    ])

    // Overview Content
    const overviewContent = ref({
      what: "Mobile Development is the process of creating applications for mobile devices including smartphones and tablets. I specialize in developing both native and cross-platform mobile applications that adapt to YOUR requirements. Whether you need native iOS applications using Swift or Objective-C, native Android applications using Kotlin or Java, cross-platform solutions with React Native, Flutter, or Xamarin, or any other mobile framework, I work with the technology stack that best fits your business needs, target audience, and budget. Combined with robust backend integration, cloud services, and mobile-first design principles, I deliver complete mobile solutions from concept to app store deployment, ensuring exceptional user experiences across all platforms.",
      who: "This service is ideal for businesses and organizations that need mobile applications to engage customers, streamline operations, or extend their digital presence to mobile platforms. Whether you're a startup building your first mobile app with React Native for cost-effectiveness, an established company needing native iOS apps for premium user experience, an enterprise requiring both iOS and Android apps, or any organization with specific platform requirements, I adapt my approach to match your needs. Mobile development provides access to millions of mobile users, enhances customer engagement, and enables new business opportunities through mobile-first experiences.",
      valuePropositions: [
        "Platform flexibility - Native iOS (Swift/Objective-C), Native Android (Kotlin/Java), React Native, Flutter, Xamarin, or your preferred mobile framework",
        "Client-focused approach - Solutions tailored to your specific requirements, target platforms, and budget constraints",
        "Single codebase for cross-platform apps or platform-specific native development based on your needs",
        "Consistent user experience across iOS and Android platforms",
        "Faster time-to-market with efficient development practices and team scalability",
        "Seamless backend integration with REST APIs, GraphQL, and cloud services",
        "App store optimization and deployment assistance",
        "Scalable team approach - Can scale with dedicated mobile developers when needed"
      ],
      useCases: [
        "Building native iOS applications with Swift or Objective-C for Apple ecosystem",
        "Developing native Android applications with Kotlin or Java for Google Play",
        "Creating cross-platform mobile apps with React Native for code reuse and faster development",
        "Building high-performance apps with Flutter for consistent UI across platforms",
        "Enterprise mobile applications with Xamarin for .NET integration",
        "Mobile games and entertainment applications with native performance",
        "E-commerce and retail mobile applications with secure payment integration",
        "Healthcare and fitness mobile apps with sensor integration and data tracking",
        "Social and communication apps with real-time features",
        "IoT and smart device companion mobile applications"
      ]
    })

    // Capabilities
    const capabilities = ref([
      {
        title: "Native iOS Development",
        description: "Native iOS application development using Swift or Objective-C. Includes UIKit, SwiftUI, Core Data, Core Location, Push Notifications, In-App Purchases, and App Store submission. Optimized for iPhone and iPad with support for latest iOS features.",
        icon: "mobile",
        technologies: ["Swift", "Objective-C", "iOS SDK", "SwiftUI", "Core Data", "Push Notifications"]
      },
      {
        title: "Native Android Development",
        description: "Native Android application development using Kotlin or Java. Includes Material Design, Jetpack Compose, Room Database, Android Jetpack, Firebase integration, Google Play Services, and Play Store submission. Optimized for various Android devices and versions.",
        icon: "mobile",
        technologies: ["Kotlin", "Java", "Android SDK", "Material Design", "Jetpack Compose", "Firebase"]
      },
      {
        title: "Cross-Platform Development",
        description: "Cross-platform mobile application development using React Native, Flutter, or Xamarin. Write once, deploy to both iOS and Android with native-like performance. Includes state management, navigation, native module integration, and platform-specific optimizations.",
        icon: "mobile",
        technologies: ["React Native", "Flutter", "Xamarin", "Dart", "TypeScript", "Cross-Platform"]
      },
      {
        title: "Backend Integration",
        description: "Seamless integration with backend services including REST APIs, GraphQL, WebSocket connections, authentication, authorization, and real-time data synchronization. Supports .NET Core APIs, Node.js, and cloud-based backends.",
        icon: "api",
        technologies: ["REST APIs", "GraphQL", "WebSocket", "Authentication", "Real-time Sync", "Cloud Backend"]
      },
      {
        title: "Mobile Cloud Services",
        description: "Integration with cloud services including Firebase (Authentication, Cloud Firestore, Cloud Functions, Cloud Storage, Analytics), AWS Amplify, Azure Mobile Apps, and push notification services (FCM, APNs).",
        icon: "cloud hosting",
        technologies: ["Firebase", "AWS Amplify", "Azure Mobile Apps", "FCM", "APNs", "Cloud Storage"]
      },
      {
        title: "Mobile UI/UX Design",
        description: "Mobile-first UI/UX design following platform guidelines (Material Design for Android, Human Interface Guidelines for iOS). Includes responsive layouts, accessibility features, animations, and intuitive user experience optimization.",
        icon: "frontend",
        technologies: ["Material Design", "Human Interface Guidelines", "Responsive Design", "Accessibility", "Animations"]
      },
      {
        title: "App Store Deployment",
        description: "App Store optimization, submission, and deployment assistance for both Apple App Store and Google Play Store. Includes app metadata optimization, screenshots, app descriptions, version management, and release management.",
        icon: "deployment",
        technologies: ["App Store Connect", "Google Play Console", "ASO", "App Signing", "Version Management"]
      },
      {
        title: "Mobile Testing & QA",
        description: "Comprehensive mobile testing including unit testing, integration testing, UI testing, device testing, performance testing, and security testing. Supports TestFlight, Firebase Test Lab, and automated testing frameworks.",
        icon: "testing",
        technologies: ["Unit Testing", "UI Testing", "Device Testing", "Performance Testing", "Automated Testing", "TestFlight"]
      }
    ])

    const methodologies = ref([
      "Agile Mobile Development",
      "Mobile-First Design",
      "Test-Driven Development (TDD)",
      "Continuous Integration/Continuous Deployment (CI/CD)",
      "Code Reviews",
      "Pair Programming",
      "App Store Optimization (ASO)",
      "User-Centered Design",
      "Platform-Specific Best Practices"
    ])

    const deliverables = ref([
      "Production-ready mobile application (iOS, Android, or both)",
      "Complete source code with documentation",
      "Backend API integration and documentation",
      "App store assets (icons, screenshots, descriptions)",
      "Testing suite and test documentation",
      "User documentation and guides",
      "Deployment scripts and CI/CD configuration",
      "Performance optimization reports",
      "App store submission assistance"
    ])

    // Process Steps
    const processSteps = ref([
      {
        step: 1,
        title: "Discovery & Planning",
        description: "Understanding your mobile app requirements, target platforms (iOS, Android, or both), user personas, technical constraints, and business goals. Creating detailed project plan, architecture design, platform selection, and timeline estimation.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Design & Prototyping",
        description: "Creating mobile UI/UX designs following platform guidelines, creating wireframes, prototypes, and design mockups. Defining user flows, navigation patterns, and visual design system. Getting stakeholder approval.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "Architecture & Setup",
        description: "Setting up development environment, project structure, choosing technology stack (native vs cross-platform), architecture patterns (MVC, MVVM, Clean Architecture), and backend API integration planning.",
        duration: "1 week"
      },
      {
        step: 4,
        title: "Development",
        description: "Implementing mobile application features, UI components, business logic, backend integration, authentication, data storage, push notifications, and platform-specific features. Regular progress updates and iterative development.",
        duration: "6-10 weeks"
      },
      {
        step: 5,
        title: "Testing & Quality Assurance",
        description: "Comprehensive testing including unit tests, integration tests, UI tests, device testing across multiple devices and OS versions, performance testing, security testing, and bug fixes.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "App Store Submission & Launch",
        description: "Preparing app store assets, optimizing app metadata, submitting to App Store and/or Play Store, handling review process, beta testing with TestFlight/Internal Testing, and production release.",
        duration: "1-2 weeks"
      },
      {
        step: 7,
        title: "Post-Launch Support",
        description: "Monitoring app performance, collecting user feedback, fixing bugs, releasing updates, feature enhancements, and ongoing maintenance. Providing analytics reports and optimization recommendations.",
        duration: "Ongoing"
      }
    ])

    const engagementModels = ref([
      "Fixed Price Projects",
      "Time & Materials",
      "Dedicated Mobile Team",
      "Hybrid Model",
      "Retainer for Ongoing Support"
    ])

    // Technologies
    const technologies = ref([
      // Native iOS
      { name: "Swift", description: "Modern iOS programming language", category: TECH_CATEGORIES.FRONTEND },
      { name: "Objective-C", description: "iOS development language", category: TECH_CATEGORIES.FRONTEND },
      { name: "iOS SDK", description: "Apple iOS Software Development Kit", category: TECH_CATEGORIES.FRONTEND },
      { name: "SwiftUI", description: "Declarative UI framework for iOS", category: TECH_CATEGORIES.FRONTEND },
      { name: "UIKit", description: "iOS user interface framework", category: TECH_CATEGORIES.FRONTEND },
      { name: "Core Data", description: "iOS data persistence framework", category: TECH_CATEGORIES.DATABASE },
      { name: "Core Location", description: "iOS location services framework", category: TECH_CATEGORIES.FRONTEND },
      { name: "Push Notifications (APNs)", description: "Apple Push Notification service", category: TECH_CATEGORIES.COMMUNICATION },
      
      // Native Android
      { name: "Kotlin", description: "Modern Android programming language", category: TECH_CATEGORIES.FRONTEND },
      { name: "Java", description: "Android development language", category: TECH_CATEGORIES.FRONTEND },
      { name: "Android SDK", description: "Google Android Software Development Kit", category: TECH_CATEGORIES.FRONTEND },
      { name: "Jetpack Compose", description: "Modern Android UI toolkit", category: TECH_CATEGORIES.FRONTEND },
      { name: "Material Design", description: "Google's design system for Android", category: TECH_CATEGORIES.FRONTEND },
      { name: "Room Database", description: "Android SQLite abstraction library", category: TECH_CATEGORIES.DATABASE },
      { name: "Android Jetpack", description: "Android development components", category: TECH_CATEGORIES.FRONTEND },
      { name: "Firebase", description: "Google mobile development platform", category: TECH_CATEGORIES.CLOUD },
      { name: "FCM (Firebase Cloud Messaging)", description: "Google push notification service", category: TECH_CATEGORIES.COMMUNICATION },
      
      // Cross-Platform
      { name: "React Native", description: "Cross-platform mobile framework", category: TECH_CATEGORIES.FRONTEND },
      { name: "Flutter", description: "Google's cross-platform UI framework", category: TECH_CATEGORIES.FRONTEND },
      { name: "Dart", description: "Flutter programming language", category: TECH_CATEGORIES.FRONTEND },
      { name: "Xamarin", description: "Microsoft cross-platform framework", category: TECH_CATEGORIES.FRONTEND },
      { name: "TypeScript", description: "Type-safe JavaScript for React Native", category: TECH_CATEGORIES.FRONTEND },
      
      // Backend Integration
      { name: "REST APIs", description: "RESTful API integration", category: TECH_CATEGORIES.API },
      { name: "GraphQL", description: "GraphQL API integration", category: TECH_CATEGORIES.API },
      { name: "WebSocket", description: "Real-time bidirectional communication", category: TECH_CATEGORIES.COMMUNICATION },
      { name: "JWT", description: "JSON Web Tokens for authentication", category: TECH_CATEGORIES.SECURITY },
      { name: "OAuth 2.0", description: "OAuth authentication protocol", category: TECH_CATEGORIES.SECURITY },
      
      // Cloud Services
      { name: "Firebase Authentication", description: "User authentication service", category: TECH_CATEGORIES.SECURITY },
      { name: "Cloud Firestore", description: "NoSQL cloud database", category: TECH_CATEGORIES.DATABASE },
      { name: "Firebase Cloud Functions", description: "Serverless backend functions", category: TECH_CATEGORIES.CLOUD },
      { name: "Firebase Analytics", description: "Mobile app analytics", category: TECH_CATEGORIES.ANALYTICS },
      { name: "AWS Amplify", description: "AWS mobile development platform", category: TECH_CATEGORIES.CLOUD },
      { name: "Azure Mobile Apps", description: "Azure mobile backend service", category: TECH_CATEGORIES.CLOUD },
      
      // Tools & Services
      { name: "App Store Connect", description: "Apple app submission platform", category: TECH_CATEGORIES.DEVOPS },
      { name: "Google Play Console", description: "Google app submission platform", category: TECH_CATEGORIES.DEVOPS },
      { name: "TestFlight", description: "Apple beta testing platform", category: TECH_CATEGORIES.TESTING },
      { name: "Firebase Test Lab", description: "Google cloud testing platform", category: TECH_CATEGORIES.TESTING },
      { name: "CI/CD", description: "Continuous integration and deployment", category: TECH_CATEGORIES.DEVOPS },
      { name: "GitHub Actions", description: "CI/CD automation for mobile apps", category: TECH_CATEGORIES.DEVOPS }
    ])

    // Case Studies
    const caseStudies = ref([
      {
        project: "Mobile Games",
        link: "/projects/mobile-games",
        description: "Native Android game development with 2D graphics, physics engine, sound management, and Google Play integration. Achieved high user engagement and positive reviews.",
        image: assetPath("/assets/img/in1.jpg"),
        metrics: {
          label: "User Engagement",
          value: "High Ratings"
        }
      },
      {
        project: "AirAsia ID90",
        link: "/projects/airasia-id90",
        description: "Enterprise employee travel discount system with mobile capabilities, real-time flight availability, and seamless booking experience for AirAsia employees.",
        image: assetPath("/assets/img/airasia1.jpg"),
        metrics: {
          label: "User Base",
          value: "Enterprise"
        }
      }
    ])

    // Related Projects
    const relatedProjects = ref([
      {
        title: 'Mobile Games Collection',
        description: 'Native Android game development portfolio with Java and AndEngine framework, 500K+ downloads',
        path: '/projects/mobile-games',
        image: assetPath('/assets/img/gd1-thumb.jpg'),
        technologies: ['Java', 'Android', 'AndEngine']
      }
    ])

    // FAQ
    const faqItems = ref([
      {
        question: "Do you develop native or cross-platform mobile apps?",
        answer: "I work with both native and cross-platform mobile development based on your requirements. For native development, I create iOS apps using Swift/Objective-C and Android apps using Kotlin/Java. For cross-platform solutions, I work with React Native, Flutter, or Xamarin. The choice depends on your budget, timeline, performance requirements, and target platforms. Native apps offer the best performance and platform-specific features, while cross-platform apps provide faster development and code reuse across platforms."
      },
      {
        question: "Which mobile platforms do you support?",
        answer: "I develop mobile applications for both iOS (iPhone and iPad) and Android (phones and tablets). Whether you need iOS-only, Android-only, or both platforms, I can deliver. For cross-platform solutions, one codebase can target both platforms, making it cost-effective for businesses needing apps on both iOS and Android."
      },
      {
        question: "What technologies do you use for mobile development?",
        answer: "For native iOS, I use Swift, Objective-C, SwiftUI, and UIKit. For native Android, I use Kotlin, Java, Jetpack Compose, and Material Design. For cross-platform, I work with React Native (JavaScript/TypeScript), Flutter (Dart), or Xamarin (.NET). I also integrate with backend services (REST APIs, GraphQL), cloud services (Firebase, AWS Amplify, Azure Mobile Apps), and handle app store submission for both Apple App Store and Google Play Store."
      },
      {
        question: "Can you integrate mobile apps with existing backend systems?",
        answer: "Absolutely! I specialize in integrating mobile applications with existing backend systems, whether they're .NET Core APIs, Node.js services, or cloud-based backends. I can work with REST APIs, GraphQL, WebSocket connections, and ensure secure authentication and data synchronization. I can also help design and implement mobile-optimized backend services if needed."
      },
      {
        question: "How long does a typical mobile app project take?",
        answer: "A typical mobile app project takes 8-16 weeks, depending on complexity, number of features, platforms (iOS only, Android only, or both), and whether it's native or cross-platform. Simple apps with basic features might take 6-8 weeks, while complex enterprise mobile apps with advanced features can take 12-20 weeks. Cross-platform apps typically take less time than building separate native apps for each platform."
      },
      {
        question: "Do you handle app store submission?",
        answer: "Yes, I provide complete app store submission assistance including preparing app store assets (icons, screenshots, descriptions), optimizing app metadata for App Store Optimization (ASO), submitting to Apple App Store and/or Google Play Store, handling the review process, and managing version releases. I also assist with beta testing using TestFlight (iOS) and Internal Testing (Android)."
      },
      {
        question: "What about app maintenance and updates?",
        answer: "Yes, I offer ongoing mobile app maintenance and update services. This includes bug fixes, feature enhancements, compatibility updates for new OS versions, performance optimization, security updates, and regular app store submissions. Maintenance can be provided on a retainer basis or as needed."
      },
      {
        question: "Can you scale the team for larger mobile projects?",
        answer: "Yes, I can scale the mobile development team when needed for larger projects. While I handle the core architecture and development, I can bring in additional mobile developers with expertise in iOS, Android, React Native, Flutter, or other required technologies to ensure timely delivery. This allows me to take on mobile projects of any size while maintaining quality and meeting deadlines."
      },
      {
        question: "Do you work with app monetization features?",
        answer: "Yes, I have experience implementing various app monetization features including in-app purchases (iOS and Android), subscription models, advertisement integration (AdMob), freemium models, and payment gateway integration. I can help you choose and implement the best monetization strategy for your mobile app."
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
      faqItems,
      relatedProjects
    }
  }
}
</script>

<style scoped>
/* Styles moved to ServicePageTemplate component */
</style>

export const buildFaqItems = (config) => [
  {
    question: `What services does ${config.fullName} provide?`,
    answer: `${config.fullName} provides software engineering consulting services including full stack development (.NET Core, Vue.js, Angular), Azure Cloud architecture design and implementation, microservices architecture consulting, RESTful API development, technical leadership, database design and optimization, and DevOps automation. Services are delivered remotely for clients in USA, Europe, and globally.`
  },
  {
    question: `What technologies does ${config.fullName} work with?`,
    answer: `${config.fullName} specializes in .NET development (.NET Core, ASP.NET, C#), Azure Cloud services (App Services, Service Fabric, Functions, Key Vault, App Insights), microservices architecture patterns, RESTful API design, Vue.js and Angular frontend development, SQL Server database design, and CI/CD pipeline automation. Has delivered enterprise solutions processing 2.5M+ data points daily.`
  },
  {
    question: `What type of projects does ${config.fullName} handle?`,
    answer: `${config.fullName} handles enterprise-scale software projects including microservices platforms, cloud-native applications, API development, system architecture design, technical team leadership, and legacy system modernization. Experience includes working with Fortune 500 companies across financial services, manufacturing, telecommunications, and technology sectors.`
  },
  {
    question: `Is ${config.fullName} available for remote work?`,
    answer: `Yes, ${config.fullName} is available for remote consulting, freelance, and contract projects. Works with clients in USA, Europe (UK, Germany, Netherlands, Switzerland), and globally. Provides flexible timezone support for EST, PST, GMT, and CET timezones.`
  },
  {
    question: `What is ${config.fullName}'s experience with enterprise solutions?`,
    answer: `${config.fullName} has delivered 32+ enterprise solutions for 20+ Fortune 500 companies across multiple industries. Experience includes microservices platforms processing 2.5M+ data points daily, systems managing billions in operational costs, and applications serving 20,000+ concurrent users. Has ${config.stats.yearsExperience}+ years of experience in enterprise software development.`
  },
  {
    question: `How can I engage ${config.fullName} for a project?`,
    answer: `You can contact ${config.fullName} through the contact form on this website, via email, phone, or WhatsApp. ${config.fullName} responds to inquiries promptly and is available for initial consultations to discuss your project requirements. Engagement models include consulting, freelance, and contract projects with flexible terms.`
  },
  // Question-intent SEO: match "best provider" and "how to choose" queries (visible in accordion, not hidden)
  {
    question: `Who is the best .NET software service provider for small businesses?`,
    answer: `${config.fullName} offers .NET software services tailored for small businesses and startups: custom .NET app development, API development, and cloud-based solutions. With ${config.stats.yearsExperience}+ years of experience and remote availability for USA, Europe, and globally, he delivers scalable, production-ready solutions without the overhead of large agencies.`
  },
  {
    question: `How do I choose a senior .NET developer?`,
    answer: `Look for proven .NET and Azure experience, enterprise delivery (e.g. Fortune 500), clear communication, and remote availability. ${config.fullName} is a Senior Software Engineer and Technical Lead with ${config.stats.yearsExperience}+ years in .NET, microservices, and cloud architecture, and is available for remote consulting, freelance, and contract projects.`
  }
]

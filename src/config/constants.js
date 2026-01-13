// Basic constants for the portfolio application
// All personal information comes from environment variables (.env file)
// See .env.example for setup instructions
export const APP_CONFIG = {
  fullName: import.meta.env.VITE_FULL_NAME || "Your Name",
  location: import.meta.env.VITE_LOCATION || "Your Location",
  linkedin: import.meta.env.VITE_LINKEDIN_URL || "",
  github: import.meta.env.VITE_GITHUB_URL || "",
  email: import.meta.env.VITE_CONTACT_EMAIL || "your.email@example.com",
  phone: import.meta.env.VITE_PHONE || "",
  portfolio: "#portfolio",
  contactLinks: {
    email: `mailto:${import.meta.env.VITE_CONTACT_EMAIL || "your.email@example.com"}`,
    phone: `tel:${import.meta.env.VITE_PHONE || ""}`,
    linkedin: import.meta.env.VITE_LINKEDIN_URL || "",
    github: import.meta.env.VITE_GITHUB_URL || "",
    website: import.meta.env.VITE_WEBSITE_URL || "https://devwithwaqas.github.io/portfolio/",
    whatsapp: import.meta.env.VITE_WHATSAPP_URL || "",
    location: import.meta.env.VITE_GOOGLE_MAPS_URL || ""
  },
  // EmailJS Configuration for Contact Form
  // These values come from environment variables (.env file)
  // See .env.example for setup instructions
  emailjs: {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '', // From .env file
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '', // From .env file
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '' // From .env file
  },
  // About section data - Will be calculated dynamically from work experience
  totalExperience: 17, // Calculated from Jan 1, 2008 to present
  techLeadExperience: 9, // Calculated from midway Squad Cell career (2015) to present
  formattedBirthday: "September 21, 1987",
  // Stats data - Calculated from actual work experience
  stats: {
    happyClients: 50,
    totalProjects: 75,
    yearsExperience: 17, // Jan 1, 2008 to present
    yearsAsTechLead: 9 // Midway Squad Cell career (2015) to present
  }
};

export const ANIMATION_CONFIG = {
  // Animation configuration
  duration: 300,
  easing: 'ease-in-out',
  counter: {
    duration: 2000
  },
  scrollAnimations: {
    threshold: 0.1
  }
};

export const COMPONENT_DEFAULTS = {
  navigation: {
    sections: [
      { id: 'hero', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'resume', label: 'Resume' },
      { id: 'services', label: 'Services' },
      { id: 'portfolio', label: 'Portfolio' },
      { id: 'contact', label: 'Contact' }
    ]
  }
};

// Technology Stack Categories - Standardized category names
export const TECH_CATEGORIES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend', 
  DATABASE: 'database',
  CLOUD: 'cloud',
  DEVOPS: 'devops',
  MONITORING: 'monitoring',
  ANALYTICS: 'analytics',
  API: 'api',
  SECURITY: 'security',
  COMMUNICATION: 'communication',
  TESTING: 'testing',
  METHODOLOGY: 'methodology',
  ARCHITECTURE: 'architecture'
};

// Technology Stack Category Labels - Display names for categories
export const TECH_CATEGORY_LABELS = {
  [TECH_CATEGORIES.FRONTEND]: 'Frontend & UI',
  [TECH_CATEGORIES.BACKEND]: 'Backend Framework',
  [TECH_CATEGORIES.DATABASE]: 'Database & Storage',
  [TECH_CATEGORIES.CLOUD]: 'Cloud & Hosting',
  [TECH_CATEGORIES.DEVOPS]: 'DevOps & CI/CD',
  [TECH_CATEGORIES.MONITORING]: 'Monitoring & Analytics',
  [TECH_CATEGORIES.ANALYTICS]: 'Analytics & Intelligence',
  [TECH_CATEGORIES.API]: 'APIs & Integration',
  [TECH_CATEGORIES.SECURITY]: 'Security & Authentication',
  [TECH_CATEGORIES.COMMUNICATION]: 'Communication & Notifications',
  [TECH_CATEGORIES.TESTING]: 'Testing & Quality Assurance',
  [TECH_CATEGORIES.METHODOLOGY]: 'Methodology & Practices',
  [TECH_CATEGORIES.ARCHITECTURE]: 'Architecture & Design'
};

// Project Component Icon Names - Standardized icon names for project components
export const PROJECT_ICON_NAMES = {
  PROJECT_OVERVIEW: 'project overview',
  TECHNOLOGY_STACK: 'technology stack',
  PROJECT_INFORMATION: 'project information',
  ARCHITECTURE_OVERVIEW: 'architecture excellence',
  ENGINEERING_CHALLENGES: 'engineering excellence',
  PERFORMANCE_METRICS: 'performance metrics',
  METRICS_FRAMEWORK: 'metrics framework',
  PROJECT_GALLERY: 'project gallery',
  ROI_SECTION: 'business impact'
};

// Project Information Categories - Standardized project categories
export const PROJECT_CATEGORIES = {
  ENTERPRISE_APPLICATIONS: 'Enterprise Applications',
  EMPLOYEE_BENEFITS: 'Employee Travel Discount System',
  WEB_APPLICATIONS: 'Web Applications',
  MOBILE_APPLICATIONS: 'Mobile Applications',
  DATA_PLATFORMS: 'Data Platforms',
  INTEGRATION_SOLUTIONS: 'Integration Solutions',
  SMART_CITY_SOLUTIONS: 'Smart City Solutions'
};

// ROI Section Icon Names - Standardized ROI section icons
export const ROI_ICON_NAMES = {
  MAIN_ICON: 'target',
  FINANCIAL_ICON: 'financial',
  OPERATIONAL_ICON: 'operational',
  SUCCESS_ICON: 'success'
};

// Debug Configuration - Set to true to enable logging for specific components
export const DEBUG_CONFIG = {
  // Project Components
  DiagramViewer: false,
  DiagramNarrator: false,
  NarrationBubble: false,
  HighlightOverlay: false,
  
  // Specific Issue Debugging
  FullscreenDiagramIssue: false, // Enable for bubble, highlight, zoom debugging
  
  // Home Components
  Hero: false,
  About: false,
  Stats: false,
  Skills: false,
  Resume: false,
  Services: false,
  Portfolio: false,
  Contact: false,
  
  // Global
  Navigation: false,
  Footer: false,
  
  // Main.js
  DeviceDetection: false,
  AnimationController: false
};

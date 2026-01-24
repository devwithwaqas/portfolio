// Experience calculation functions - Single source of truth
const calculateTotalExperience = () => {
  const startDate = new Date(2008, 0, 1) // January 1, 2008
  const today = new Date()
  const diffTime = Math.abs(today - startDate)
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25))
  return diffYears
}

const calculateTechLeadExperience = () => {
  const techLeadStartDate = new Date(2015, 0, 1) // January 1, 2015
  const today = new Date()
  const diffTime = Math.abs(today - techLeadStartDate)
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25))
  return diffYears
}

// Calculate experience values once
const totalExperience = calculateTotalExperience()
const techLeadExperience = calculateTechLeadExperience()

// Site URL Configuration - Supports both GitHub Pages and Firebase Hosting
// Determines SITE_URL based on build mode (firebase vs production/development)
const BASE_URL = import.meta.env.BASE_URL || '/portfolio/'
const isFirebaseBuild = import.meta.env.MODE === 'firebase'
const FIREBASE_SITE_URL = import.meta.env.VITE_FIREBASE_SITE_URL || 'https://waqasahmad-portfolio.web.app/'
const GITHUB_PAGES_SITE_URL = 'https://devwithwaqas.github.io/portfolio/'
export const SITE_URL = isFirebaseBuild ? FIREBASE_SITE_URL : GITHUB_PAGES_SITE_URL

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
    website: SITE_URL, // Use dynamic SITE_URL
    whatsapp: import.meta.env.VITE_WHATSAPP_URL || "",
    location: import.meta.env.VITE_GOOGLE_MAPS_URL || ""
  },
  // SMTP Configuration for Contact Form (Google Cloud Functions)
  // This is the primary and only email method
  // See docs/SMTP_SETUP.md for setup instructions
  smtp: {
    endpoint: import.meta.env.VITE_SMTP_ENDPOINT || '', // Google Cloud Function endpoint
    apiKey: import.meta.env.VITE_SMTP_API_KEY || '' // Optional API key for function authentication
  },
  // About section data - Calculated dynamically from work experience
  totalExperience: totalExperience, // Calculated from Jan 1, 2008 to present
  techLeadExperience: techLeadExperience, // Calculated from Jan 1, 2015 to present
  // Stats data - Calculated from actual work experience
  stats: {
    enterpriseClients: 20, // Fortune 500 companies and enterprise clients
    enterpriseSolutions: 32, // Major enterprise solutions delivered (~2 per year over totalExperience years)
    yearsExperience: totalExperience, // Jan 1, 2008 to present (calculated)
    yearsAsTechLead: techLeadExperience // Jan 1, 2015 to present (calculated)
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
  AnimationController: false,

  // Analytics & Logging
  GA4: false,
  AnalyticsData: false,
  AnalyticsStats: false,
  ScrollRestore: false
};

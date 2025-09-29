// Basic constants for the portfolio application
export const APP_CONFIG = {
  fullName: "Waqas Ahmed",
  location: "Malaysia",
  linkedin: "https://linkedin.com/in/waqas-ahmed",
  github: "https://github.com/waqas-ahmed",
  email: "waqas@example.com",
  phone: "+60 123 456 789",
  portfolio: "#portfolio",
  contactLinks: {
    email: "mailto:waqas@example.com",
    phone: "tel:+60123456789",
    linkedin: "https://linkedin.com/in/waqas-ahmed",
    github: "https://github.com/waqas-ahmed",
    website: "https://www.waqasahmad.com",
    whatsapp: "https://wa.me/60123456789"
  },
  // About section data
  totalExperience: 8,
  techLeadExperience: 5,
  formattedBirthday: "January 15, 1990",
  // Stats data
  stats: {
    happyClients: 50,
    totalProjects: 75,
    yearsExperience: 8,
    yearsAsTechLead: 5
  }
};

export const ANIMATION_CONFIG = {
  // Animation configuration
  duration: 300,
  easing: 'ease-in-out'
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

// Basic constants for the portfolio application
export const APP_CONFIG = {
  fullName: "Waqas Ahmed",
  location: "Malaysia",
  linkedin: "https://linkedin.com/in/waqas-ahmed",
  github: "https://github.com/waqas-ahmed",
  contactLinks: {
    email: "waqas@example.com",
    phone: "+60 123 456 789",
    linkedin: "https://linkedin.com/in/waqas-ahmed",
    github: "https://github.com/waqas-ahmed"
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

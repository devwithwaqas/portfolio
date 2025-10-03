// Basic constants for the portfolio application
export const APP_CONFIG = {
  fullName: "Waqas Ahmad",
  location: "Kuala Lumpur, Malaysia",
  linkedin: "https://www.linkedin.com/in/waqas1430/",
  github: "https://github.com/devwithwaqas",
  email: "devwithwaqas@gmail.com",
  phone: "+60146806067",
  portfolio: "#portfolio",
  contactLinks: {
    email: "mailto:devwithwaqas@gmail.com",
    phone: "tel:+60146806067",
    linkedin: "https://www.linkedin.com/in/waqas1430/",
    github: "https://github.com/devwithwaqas",
    website: "https://www.waqasahmad.com",
    whatsapp: "https://wa.me/60146806067"
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

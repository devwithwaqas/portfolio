# 🚀 Portfolio Website - Vue.js SPA Template

A modern, responsive portfolio website template built with Vue.js 3 and Vite. Perfect for developers, designers, and professionals who want to showcase their work with an interactive, feature-rich portfolio.

## ✨ Features

- **🎨 Modern Design** - Beautiful, responsive design with gradients and animations
- **⚡ Vue.js 3** - Built with Composition API and Vue Router
- **📱 Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **🎯 Interactive Diagrams** - C4 architecture diagrams with narration support
- **📧 Contact Form** - Google Cloud Functions (SMTP) integration for contact form submissions
- **🎭 Component-Based** - Modular architecture for easy customization
- **🚀 Fast Development** - Vite for instant HMR and optimized builds
- **🔍 SEO Optimized** - Proper meta tags and semantic HTML
- **🎤 Audio Narration** - Text-to-speech narration for project diagrams
- **📊 Dynamic Icons** - Smart icon resolution system with fallbacks

## 🚦 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Set up environment variables:**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your personal information:
   # - Personal info (name, location, email, phone)
   # - Social media links (LinkedIn, GitHub, website, etc.)
   # - EmailJS credentials (for contact form)
   # See docs/EMAILJS_SETUP.md for EmailJS setup instructions
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload when you make changes

6. **Build for production:**
   ```bash
   npm run build
   ```

7. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

For a detailed visual structure with flowchart and complete directory descriptions, see [PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md).

```
portfolio/
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── vite.config.js            # Vite configuration
│   ├── index.html                # Main HTML entry point
│   └── setup.bat                 # Setup script
│
├── 📚 Documentation
│   ├── README.md                 # Main documentation
│   ├── docs/                     # Detailed guides
│   │   ├── PROJECT_PAGE_CREATION_GUIDE.md
│   │   ├── SERVICE_PAGE_CREATION_GUIDE.md
│   │   ├── PROJECT_STRUCTURE.md  # Complete structure with flowchart
│   │   ├── FILES_TO_REMOVE_VERIFIED.md
│   │   └── diagrams/             # PlantUML diagram sources (reference templates)
│   │       └── *.puml            # C4 architecture diagram source files
│
├── 🎨 Source Code (src/)
│   ├── components/               # Vue components
│   │   ├── common/               # Shared components (ProjectPageTemplate, ReusableCard, etc.)
│   │   ├── home/                 # Home page sections (Hero, About, Services, Portfolio, Contact)
│   │   ├── layout/               # Layout components (Navigation, NavButton)
│   │   ├── projects/             # Project-specific components (ProjectHeroCard, DiagramViewer, etc.)
│   │   └── services/             # Service page components (ServiceHeroSection, ServiceOverview, etc.)
│   ├── views/                    # Page views (routes)
│   │   ├── Home.vue              # Main home page
│   │   ├── projects/             # Project detail pages
│   │   └── services/             # Service detail pages
│   ├── router/                   # Vue Router configuration
│   │   └── index.js              # Routes definition
│   ├── config/                   # Configuration files
│   │   ├── constants.js          # App constants (SMTP, contact info, categories)
│   │   └── *_Narration.js        # Narration configs (optional, for diagrams with narration)
│   ├── utils/                  # Utility functions
│   │   └── iconResolver.js       # Dynamic icon resolution
│   ├── assets/                   # Assets (CSS, fonts, etc.)
│   │   └── css/
│   │       └── main.css          # Main stylesheet
│   └── main.js                   # Vue app entry point
│
├── 🌐 Public Assets (public/)
│   └── assets/
│       ├── img/                  # Images
│       │   ├── Icons/            # Technology/service icons (used by iconResolver)
│       │   ├── services/         # Service page images
│       │   └── ... (project images)
│       ├── diagrams/             # Architecture diagram SVGs (used by DiagramViewer)
│       └── vendor/               # Third-party libraries (Bootstrap, AOS, etc.)
│
└── 📦 Build Output (generated)
    ├── dist/                     # Production build (generated by `npm run build`)
    └── node_modules/             # Dependencies (generated by `npm install`)
```

## 📚 Documentation

### For Users (Setting Up Your Portfolio)

1. **[📖 PROJECT_PAGE_CREATION_GUIDE.md](./docs/PROJECT_PAGE_CREATION_GUIDE.md)** - Complete guide to creating new project pages with diagrams
2. **[📖 SERVICE_PAGE_CREATION_GUIDE.md](./docs/SERVICE_PAGE_CREATION_GUIDE.md)** - Complete guide to creating new service pages
3. **[📧 EmailJS Setup Guide](./docs/EMAILJS_SETUP.md)** - How to set up contact form email functionality (if available)
4. **[🚀 Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)** - Complete guide for deploying to GitHub Pages, Netlify, Vercel, and other platforms

### For Developers (Advanced)

- **[🎨 Component Documentation](./docs/COMPONENTS.md)** - Detailed component reference
- **[🎯 Icon System Guide](./docs/ICON_SYSTEM.md)** - How to add and manage icons
- **[📊 Diagram Setup Guide](./docs/DIAGRAM_SETUP_GUIDE.md)** - Creating interactive C4 diagrams (also see PROJECT_PAGE_CREATION_GUIDE.md)

## 🎯 Key Pages & Routes

- `/` - Home page (all sections)
- `/projects/[project-name]` - Project detail pages
- `/services/[service-name]` - Service detail pages
- `/contact` - Contact page with form

## 🛠️ Customization

### Personalize Your Portfolio

1. **Update Personal Information:**
   - Edit your `.env` file (created from `.env.example`)
   - Update all personal information:
     - `VITE_FULL_NAME` - Your full name
     - `VITE_LOCATION` - Your location
     - `VITE_CONTACT_EMAIL` - Your email address
     - `VITE_PHONE` - Your phone number
     - `VITE_LINKEDIN_URL` - Your LinkedIn profile URL
     - `VITE_GITHUB_URL` - Your GitHub profile URL
     - `VITE_WEBSITE_URL` - Your personal website (if any)
     - `VITE_WHATSAPP_URL` - Your WhatsApp link (if any)
     - `VITE_GOOGLE_MAPS_URL` - Google Maps link to your location
   - **No need to edit `constants.js`** - it reads from environment variables automatically

2. **Update Content:**
   - Home page sections: `src/components/home/`
   - Project pages: `src/views/projects/`
   - Service pages: `src/views/services/`

3. **Add Your Projects:**
   - Follow [PROJECT_PAGE_CREATION_GUIDE.md](./docs/PROJECT_PAGE_CREATION_GUIDE.md)
   - Copy existing project page as template

4. **Add Your Services:**
   - Follow [SERVICE_PAGE_CREATION_GUIDE.md](./docs/SERVICE_PAGE_CREATION_GUIDE.md)
   - Use service page components

5. **Set Up Contact Form:**
   - Follow [Google Cloud Functions (SMTP) Setup Guide](./docs/SMTP_SETUP.md)
   - Uses Google Cloud Functions with Gmail SMTP

### Styling

- **Main styles:** `src/assets/css/main.css`
- **Component styles:** Scoped CSS in each component
- **Bootstrap classes:** Available for layout utilities

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📦 Dependencies

### Core
- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router** - Official router for Vue.js
- **Vite** - Next generation frontend tooling

### UI & Styling
- **Bootstrap** - CSS framework (via CDN)
- **Bootstrap Icons** - Icon library (via CDN)

### Features
- **Google Cloud Functions** - SMTP email service integration
- **chart.js** - Charts and graphs
- **@panzoom/panzoom** - Diagram zoom/pan
- **swiper** - Touch slider

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🌐 Deployment & Hosting

### GitHub Pages / Static Hosting

For static hosting (GitHub Pages, Netlify, Vercel, etc.), environment variables need to be set at **build time**:

#### Option 1: GitHub Pages with GitHub Actions (Recommended)

1. **Create GitHub Actions workflow:**
   - Create `.github/workflows/deploy.yml` (see example below)
   - Set all environment variables as GitHub Secrets

2. **Set GitHub Secrets:**
   - Go to: Repository Settings > Secrets and variables > Actions > New repository secret
   - Add all variables from `.env.example`:
     - `VITE_FULL_NAME`, `VITE_LOCATION`, `VITE_CONTACT_EMAIL`, `VITE_PHONE`
     - `VITE_LINKEDIN_URL`, `VITE_GITHUB_URL`, `VITE_WEBSITE_URL`, `VITE_WHATSAPP_URL`, `VITE_GOOGLE_MAPS_URL`
     - `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`

3. **GitHub Actions Workflow Example:**
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
           env:
             VITE_FULL_NAME: ${{ secrets.VITE_FULL_NAME }}
             VITE_LOCATION: ${{ secrets.VITE_LOCATION }}
             VITE_CONTACT_EMAIL: ${{ secrets.VITE_CONTACT_EMAIL }}
             VITE_PHONE: ${{ secrets.VITE_PHONE }}
             VITE_LINKEDIN_URL: ${{ secrets.VITE_LINKEDIN_URL }}
             VITE_GITHUB_URL: ${{ secrets.VITE_GITHUB_URL }}
             VITE_WEBSITE_URL: ${{ secrets.VITE_WEBSITE_URL }}
             VITE_WHATSAPP_URL: ${{ secrets.VITE_WHATSAPP_URL }}
             VITE_GOOGLE_MAPS_URL: ${{ secrets.VITE_GOOGLE_MAPS_URL }}
             VITE_SMTP_ENDPOINT: ${{ secrets.VITE_SMTP_ENDPOINT }}
             VITE_SMTP_API_KEY: ${{ secrets.VITE_SMTP_API_KEY }}
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

#### Option 2: Netlify / Vercel

1. **Netlify:**
   - Go to Site Settings > Environment Variables
   - Add all variables from `.env.example`
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Vercel:**
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env.example`
   - Build command: `npm run build`
   - Output directory: `dist`

**Important:** Environment variables are injected at build time, so they become part of the static bundle. The SMTP endpoint URL is safe to expose, but keep the API key secure.

**📚 See [DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md) for detailed step-by-step deployment instructions for all platforms.**

## 📄 License

This project is licensed under the MIT License - feel free to use it for your own portfolio!

## 🤝 Contributing

This is a portfolio template - feel free to fork and customize for your needs!

## 👨‍💻 Original Author

**Waqas Ahmad**
- Senior Software Engineer & Technical Lead
- Email: devwithwaqas@gmail.com
- Portfolio: [devwithwaqas.github.io/portfolio](https://devwithwaqas.github.io/portfolio/)

---

**Happy Coding! 🚀**

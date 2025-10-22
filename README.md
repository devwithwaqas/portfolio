# Waqas Ahmad Portfolio - Vue.js SPA

A modern, responsive portfolio website built with Vue.js 3 and Vite, converted from the original HTML portfolio to a Single Page Application (SPA).

## 🚀 Features

- **Vue.js 3** with Composition API
- **Vue Router** for SPA navigation
- **Vite** for fast development and building
- **Responsive Design** with Bootstrap
- **Component-based Architecture** for maintainability
- **Modern CSS** with gradients and animations
- **SEO Optimized** with proper meta tags
- **Interactive Diagrams** with C4 architecture visualization
- **Audio Narration System** for guided project explanations
- **Modular Project Pages** with reusable components
- **Dynamic Icon Resolution** system
- **Performance Optimized** with lazy loading

## 📁 Project Structure

```
portfolio/
├── public/
│   └── assets/
│       ├── img/          # Images and icons
│       │   └── Icons/    # Technology and service icons
│       └── vendor/       # Third-party libraries
├── src/
│   ├── components/       # Vue components
│   │   ├── projects/     # Project-specific components
│   │   │   └── DiagramViewer.vue  # Interactive diagram viewer
│   │   ├── Hero.vue
│   │   ├── About.vue
│   │   ├── Stats.vue
│   │   ├── Skills.vue
│   │   ├── Resume.vue
│   │   ├── Portfolio.vue
│   │   ├── Services.vue
│   │   ├── Testimonials.vue
│   │   ├── Contact.vue
│   │   ├── Navigation.vue
│   │   ├── Footer.vue
│   │   └── ReusableCard.vue
│   ├── views/            # Page views
│   │   ├── Home.vue
│   │   └── projects/     # Project pages
│   │       └── AirAsiaID90Page.vue
│   ├── config/           # Configuration files
│   │   ├── constants.js  # Standardized categories and icons
│   │   └── airasiaNarration.js  # Narration configuration
│   ├── composables/      # Vue composables
│   │   └── useAnimationControl.js
│   ├── utils/            # Utility functions
│   │   └── iconResolver.js  # Dynamic icon resolution
│   ├── router/           # Vue Router configuration
│   │   └── index.js
│   ├── assets/           # CSS and other assets
│   │   └── css/
│   ├── App.vue           # Main app component
│   └── main.js           # App entry point
├── index.html            # Main HTML file
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── AirAsia_ID90_C4_Diagram.puml  # PlantUML diagram source
├── AirAsia_ID90_C4_Diagram.svg   # Generated diagram
├── Project_Narration_Guide.md     # Narration implementation guide
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git** (for version control)

### Quick Setup

1. **Clone or navigate to the project directory:**
   ```bash
   cd C:\portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000` (or next available port)

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

### Development Environment
- **Hot Module Replacement (HMR)** enabled for instant updates
- **ESLint** for code quality
- **Vite** for fast development and optimized builds
- **Vue DevTools** browser extension recommended

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📱 Pages & Routes

- `/` - Home page (all sections)
- `/about` - About section only
- `/portfolio` - Portfolio section only
- `/services` - Services section only
- `/contact` - Contact section only
- `/projects/airasia-id90` - AirAsia ID90 project page with interactive C4 diagram

## 🎨 Components

### Main Components
- **Hero** - Landing section with animated text
- **About** - Personal information and profile
- **Stats** - Professional statistics with counters
- **Skills** - Technical skills with progress bars
- **Resume** - Work experience and education
- **Portfolio** - Project showcase
- **Services** - Offered services
- **Testimonials** - Client feedback
- **Contact** - Contact form and information

### Layout Components
- **Navigation** - Responsive navigation menu
- **Footer** - Footer with social links and contact info

### Project Components
- **DiagramViewer** - Interactive diagram viewer with narration support
- **ReusableCard** - Modular card component for project sections

## 🔧 Customization

### Adding New Project Pages
For detailed instructions on adding new project pages with the modular component system, see:
**[📚 ADDING_NEW_PROJECT_PAGES.md](./ADDING_NEW_PROJECT_PAGES.md)**

#### Standard Component Order
When adding new project pages, follow this established order:
1. **DiagramViewer** - Interactive diagram first (visual introduction)
2. **ArchitectureOverview** - Text overview second (detailed explanation)
3. **EngineeringChallenges** - Technical challenges
4. **PerformanceMetricsSection** - Performance data
5. **MetricsFramework** - Metrics framework
6. **ROISection** - Business impact

**⚠️ Always verify component order against existing pages (HeatExchangerPage) to maintain consistency.**

### Diagram Setup & Generation
For comprehensive guide on creating and maintaining interactive diagrams, see:
**[📊 DIAGRAM_SETUP_GUIDE.md](./DIAGRAM_SETUP_GUIDE.md)**

For specific C4 architecture diagram generation (PlantUML), see:
**[📊 AirAsia_ID90_C4_Diagram_Guide.md](./AirAsia_ID90_C4_Diagram_Guide.md)**

### Interactive Diagrams & Narration System
The portfolio includes an advanced narration system for interactive project explanations:

#### DiagramViewer Component
- **Interactive SVG diagrams** with clickable elements
- **Audio narration** with text-to-speech support
- **Step-by-step guidance** through complex architectures
- **Icon integration** with dynamic resolution
- **Responsive design** for all device sizes
- **Auto-zoom and highlight** during narration

**⚠️ CRITICAL**: Always specify `svg-width` and `svg-height` props matching the actual SVG viewBox dimensions!
```vue
<DiagramViewer 
  :svg-width="5692"    <!-- MUST match SVG viewBox width -->
  :svg-height="4173"   <!-- MUST match SVG viewBox height -->
  diagram-src="/diagram.svg"
  :narration-steps="steps"
/>
```
Check SVG viewBox with: `Select-String -Path "diagram.svg" -Pattern 'viewBox="([^"]*)"'`

#### Smart Zoom & Positioning System
The DiagramViewer includes an advanced zoom and positioning system that automatically adapts to any diagram size:

**Dynamic Zoom Scaling:**
- **Base zoom calculation**: `2.5 * sqrt(svgSizeRatio)` where `svgSizeRatio = (currentSVG) / (HeatExchanger baseline)`
- **Automatic size adaptation**: Larger diagrams get proportionally higher zoom levels
- **Area-based zoom adjustment**: 
  - Large highlights (>30% of diagram): 48% of base zoom
  - Medium highlights (15-30%): 60% of base zoom  
  - Small highlights (8-15%): 80% of base zoom
  - Tiny highlights (<8%): Full base zoom

**Smart Boundary Detection:**
- **Width constraint**: `screenWidth / highlightWidth`
- **Height constraint**: `screenHeight / highlightHeight`
- **Side offset constraint**: `(screenWidth - sideOffset*2) / highlightWidth`
- **Automatic fit-to-screen**: Uses minimum of all constraints with 90% padding

**Side-Based Positioning:**
- **Left side highlights**: Positioned at 25% from left edge (creates gap for bubble)
- **Right side highlights**: Positioned at 75% from left edge (creates gap for bubble)
- **Bubble separation**: Maintains visual separation between highlight and narration bubble
- **Universal compatibility**: Works for any diagram size and highlight location

#### Narration Configuration
- **Structured narration steps** in `src/config/[project]Narration.js`
- **Component explanations** with technical details
- **Workflow descriptions** with step-by-step processes
- **Architecture overviews** with system interactions
- **Icon mapping** for visual consistency
- **Dual text format**: Display text (short forms) vs Audio text (full forms)
- **Tech term rules**: Common terms (API, SQL) use short forms, Non-common terms (TLS, JWT) use full forms in audio

#### Narration Structure (STANDARDIZED ✅)
Each narration step **MUST** include these fields:
```javascript
{
  title: 'Display Title',                    // Short form for UI
  speechTitle: 'Spoken Title',               // Full form for audio (can be same as title)
  description: 'Display description',        // Short, concise for UI
  speechDescription: 'Spoken description',   // Detailed, comprehensive for audio
  icon: 'icon.svg',                          // Icon file name (must exist in Icons/)
  position: { x: 400, y: 500 },              // Bubble position on diagram
  highlights: [                              // SVG coordinates for visual highlighting
    { x: 405, y: 490, width: 160, height: 100 }
  ]
}
```

**⚠️ CRITICAL: Fields to NEVER include:**
- ❌ `id` - Not used by DiagramViewer
- ❌ `details` array - Not used by DiagramViewer
- ❌ `audio` object - DiagramNarrator uses speechTitle + speechDescription
- ❌ `highlights[].element` - Must use actual SVG coordinates (x, y, width, height)
- ❌ `highlights[].type` - Not used
- ❌ `highlights[].duration` or `audio.duration` - Calculated automatically

#### Speech vs Display Text Pattern
**Established Pattern** (from HeatExchanger):
- **Display text**: Short, concise descriptions with abbreviations
- **Speech text**: Detailed, comprehensive descriptions with full forms
- **HeatExchanger Example**:
  - Display: "OpenShift API Gateway serves as the secure entry point, handling authentication (JWT/OAuth2), authorization, TLS termination, and WAF protection."
  - Speech: "OpenShift Application Programming Interface Gateway serves as the secure entry point, handling authentication using JSON Web Token and OAuth2, authorization, Transport Layer Security termination, and web application firewall protection."
- **AirAsia Example**:
  - Display: "Edge gateway for authentication, routing, and API management"
  - Speech: "Azure Application Programming Interface Management serves as our enterprise-grade API gateway, providing sophisticated rate limiting, throttling, and comprehensive system protection. It handles API versioning, documentation management, request transformation, and enforces security policies with advanced features. This ensures consistent, secure access to all backend services while maintaining high performance and reliability standards."

#### Tech Term Rules
- **Common terms** (API, SQL, UI, UX): Use short forms in both display and audio
- **Non-common terms** (TLS, JWT, SSO, TDE): Use short forms in display, full forms in audio
- **Examples**:
  - Display: "JWT-based authentication"
  - Audio: "JSON Web Token-based authentication"
  - Display: "TLS termination"
  - Audio: "Transport Layer Security termination"

#### Icon Requirements
**All narration steps MUST have appropriate icons:**
- **Available icons**: 69+ icons in `public/assets/img/Icons/`
- **Icon mapping**: Each component should have a relevant icon
- **Examples**:
  - Web App → `Angular.svg`
  - Mobile PWA → `mobile.png`
  - API Gateway → `api gateway.svg`
  - Database → `Azure SQL Database.svg`
  - Analytics → `analytics.png`
- **Missing icons**: Will cause display issues in narration bubbles

#### Comprehensive Narration Requirements (STANDARDIZED ✅)
**Every narration step MUST include exactly 7 fields (no more, no less):**

| # | Field | Type | Description | Example |
|---|-------|------|-------------|---------|
| 1 | `title` | string | Short display title | `"Web Application"` |
| 2 | `speechTitle` | string | Full spoken title | `"Web Application"` or `"Application Programming Interface Gateway"` |
| 3 | `description` | string | Short display description | `"Angular-based responsive web app"` |
| 4 | `speechDescription` | string | Detailed spoken description with architecture & flow | `"The Web Application serves as our primary user interface..."` |
| 5 | `icon` | string | Icon filename in `Icons/` folder | `"Angular.svg"` |
| 6 | `position` | object | Bubble position `{ x, y }` | `{ x: 309, y: 351 }` |
| 7 | `highlights` | array | SVG coordinates array | `[{ x: 207.6, y: 451.5, width: 203.3, height: 97.8 }]` |

**❌ NEVER include these fields:**
- `id` - Not used by DiagramViewer
- `details` - Not used by DiagramViewer
- `audio` - DiagramNarrator uses speechTitle + speechDescription
- `highlights[].element` - Must use actual coordinates
- `highlights[].type` - Not used
- `highlights[].duration` - Auto-calculated
- `audio.duration` - Auto-calculated

**Critical Requirements:**
- **NO missing fields**: All 7 fields are mandatory
- **NO extra fields**: Don't add id, details, or audio objects
- **Detailed speech descriptions**: Must include architecture, flow, and technical details
- **Proper tech term usage**: Common terms short, non-common terms full in speech
- **Accurate coordinates**: Use `scripts/extract_diagram_coordinates.py` to extract from SVG

#### Narration Timing Formula
- **Automatic Calculation**: DiagramNarrator automatically calculates duration from `speechTitle + speechDescription`
- **Formula**: `characters ÷ 14.62 = seconds` (implemented in DiagramNarrator.vue)
- **Source**: Based on actual measurement (285 characters in 19.5 seconds)
- **Implementation**: 
  - **DO NOT** set hardcoded `duration` values in narration config
  - **DO** provide `speechTitle` and `speechDescription` fields
  - DiagramNarrator will calculate duration automatically
- **Example**:
  - speechTitle: "Web Application" + speechDescription: "Angular-based responsive..." 
  - DiagramNarrator calculates: (speechTitle + speechDescription) ÷ 14.62 = duration
- **Validation**: Test all durations to ensure smooth playback

#### Creating New Narrations
For comprehensive guidance on implementing narration for any project, see:
**[📖 Project_Narration_Guide.md](./Project_Narration_Guide.md)**

#### Extracting Diagram Coordinates
**For new diagrams, extract SVG coordinates automatically:**

```bash
# 1. Generate diagram SVG (e.g., PlantUML → Kroki → SVG)
# 2. Extract all component coordinates
python scripts/extract_diagram_coordinates.py YourDiagram.svg

# Output: YourDiagram_coordinates.json with all positions
```

**Script features:**
- Finds all `entity_*` groups in SVG
- Extracts rectangle coordinates for standard components
- Handles database cylinders (path-based shapes)
- Outputs `{x, y, width, height, centerX, centerY}` for each component

**For package boundaries** (layer groupings):
- Define package → component mappings in Python
- Call `calculate_package_boundaries(components, package_definitions)`
- Adds padding around component groups automatically

**Example:** See `src/config/airasiaDiagramCoordinates.json`
- 33 individual components
- 8 package boundaries
- 41 total highlightable items

#### C4 Architecture Diagrams
- **PlantUML integration** for professional diagrams
- **Kroki.io rendering** for high-quality SVG output
- **C4-PlantUML** for standardized architecture visualization
- **Custom styling** with proper spacing and colors
- **Version control** for diagram evolution

**For detailed diagram setup instructions, see:** [DIAGRAM_SETUP_GUIDE.md](./DIAGRAM_SETUP_GUIDE.md)

### Adding New Sections
1. Create a new component in `src/components/`
2. Add it to the Home view in `src/views/Home.vue`
3. Update the navigation in `src/components/Navigation.vue`
4. Add route in `src/router/index.js` if needed

### Styling
- Main styles are in `src/assets/css/main.css`
- Component-specific styles use scoped CSS
- Bootstrap classes are available for layout

### Content Updates
- Update component data in respective Vue files
- Images are stored in `public/assets/img/`
- Icons use Bootstrap Icons and custom technology icons in `public/assets/img/Icons/`
- Project-specific content in `src/views/projects/`
- Narration content in `src/config/`

### Icon System
- **Dynamic icon resolution** via `src/utils/iconResolver.js`
- **Standardized categories** in `src/config/constants.js`
- **Technology icons** in `public/assets/img/Icons/`
- **Automatic fallbacks** for missing icons

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Waqas Ahmad**
- Senior Software Engineer & Technical Lead
- Email: devwithwaqas@gmail.com
- Phone: +60146806067
- Location: Selangor, Malaysia

## 📊 Current Project Implementations

### AirAsia ID90 Project
- **Complete C4 Architecture Diagram** with professional styling
- **Interactive narration system** with 50+ narration steps
- **Comprehensive project documentation** with technical details
- **Performance metrics** and engineering challenges
- **ROI analysis** and business impact
- **Technology stack** with detailed explanations

**Access:** `/projects/airasia-id90`

### Diagram Generation
- **PlantUML source:** `AirAsia_ID90_C4_Diagram.puml`
- **Generated SVG:** `public/AirAsia_ID90_C4_Diagram.svg`
- **Generation guide:** `AirAsia_ID90_C4_Diagram_Guide.md`

## 🚀 Deployment

The built files in the `dist/` directory can be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- Azure Static Web Apps
- AWS S3 + CloudFront

---

*Built with ❤️ using Vue.js 3 and modern web technologies*

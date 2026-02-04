# 📚 Project Page Creation Guide

Complete guide for creating new project pages in this portfolio template. This guide consolidates all essential information for adding new projects with interactive diagrams, narration, and comprehensive content.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Creation](#step-by-step-creation)
4. [Component Reference](#component-reference)
5. [Diagram Setup](#diagram-setup)
6. [Icon Management](#icon-management)
7. [Common Issues & Solutions](#common-issues--solutions)
8. [Best Practices](#best-practices)

---

## 🚀 Quick Start

**Fastest way to create a new project page:**

1. **Copy existing project page:**
   ```bash
   cp src/views/projects/HeatExchangerPage.vue src/views/projects/YourProjectPage.vue
   ```

2. **Add route in `src/router/index.js`:**
   ```javascript
   {
     path: '/projects/your-project',
     name: 'YourProject',
     component: () => import('../views/projects/YourProjectPage.vue')
   }
   ```

3. **Update the page with your project data**

4. **Test in browser**

**Estimated Time:** 1-2 hours for complete page with all sections

---

## ✅ Prerequisites

Before creating a new project page, ensure you have:

- [ ] Project description and details
- [ ] Technology stack list
- [ ] Project images/screenshots
- [ ] Architecture diagram (SVG) - optional but recommended
- [ ] Performance metrics/statistics - optional
- [ ] Engineering challenges and solutions - optional

---

## 📝 Step-by-Step Creation

### Step 1: Copy Template File

```bash
# Option A: Copy from HeatExchangerPage (most complete example)
cp src/views/projects/HeatExchangerPage.vue src/views/projects/YourProjectPage.vue

# Option B: Use PROJECT_PAGE_TEMPLATE.vue (boilerplate starter)
cp docs/PROJECT_PAGE_TEMPLATE.vue src/views/projects/YourProjectPage.vue
```

### Step 2: Add Router Entry

**File:** `src/router/index.js`

```javascript
{
  path: '/projects/your-project',
  name: 'YourProject',
  component: () => import('../views/projects/YourProjectPage.vue')
}
```

### Step 3: Update Component Imports

Ensure all component imports are correct:

```javascript
import ProjectHeroCard from '../../components/projects/ProjectHeroCard.vue'
import ProjectGallery from '../../components/projects/ProjectGallery.vue'
import ProjectOverview from '../../components/projects/ProjectOverview.vue'
import TechnologyStack from '../../components/projects/TechnologyStack.vue'
import ArchitectureOverview from '../../components/projects/ArchitectureOverview.vue'
import ProjectInfo from '../../components/projects/ProjectInfo.vue'
import DiagramViewer from '../../components/projects/DiagramViewer.vue'
import EngineeringChallenges from '../../components/projects/EngineeringChallenges.vue'
import PerformanceMetricsSection from '../../components/projects/PerformanceMetricsSection.vue'
import MetricsFramework from '../../components/projects/MetricsFramework.vue'
import ROISection from '../../components/projects/ROISection.vue'
```

### Step 4: Standard Component Order

**CRITICAL:** Always follow this exact order in your project pages:

1. **ProjectHeroCard** - Hero section with title, description, tags, achievements
2. **ProjectGallery** - Image gallery
3. **ProjectOverview** - Project overview text
4. **TechnologyStack** - Technology stack visualization
5. **ProjectInfo** - Project information (sidebar)
6. **DiagramViewer** - Interactive architecture diagram (optional)
7. **ArchitectureOverview** - Architecture layers and benefits
8. **EngineeringChallenges** - Technical challenges and solutions
9. **PerformanceMetricsSection** - Performance stats and charts
10. **MetricsFramework** - Metrics framework details
11. **ROISection** - Business impact and ROI

### Step 5: Populate Project Data

Update all data sections in your page:

- Project title, description, tags
- Gallery images
- Technology stack
- Architecture layers
- Performance metrics
- Engineering challenges
- ROI data

### Step 6: Test & Verify

- [ ] Page loads without errors
- [ ] All icons display correctly
- [ ] All charts render (if applicable)
- [ ] Navigation works
- [ ] Responsive design works
- [ ] No console errors

---

## 🧩 Component Reference

### ProjectPageTemplate (Wrapper Component)

**File:** `src/components/common/ProjectPageTemplate.vue`

**CRITICAL:** All project pages must use `ProjectPageTemplate` as the wrapper component. This provides the layout structure, breadcrumbs, and responsive design.

**Props:**
```javascript
{
  projectTitle: String (required),  // Project title for breadcrumbs
  parentLink: String (optional, default: '/#portfolio'),  // Parent page link
  parentLabel: String (optional, default: 'Portfolio')  // Parent page label
}
```

**Slots:**
- `#hero` - ProjectHeroCard component (required)
- `#gallery` - ProjectGallery component (optional)
- `#main-content-top` - ProjectOverview, TechnologyStack (first 2 sections)
- `#sidebar` - ProjectInfo component (sidebar content)
- `#main-content-bottom` - DiagramViewer, ArchitectureOverview, EngineeringChallenges, PerformanceMetricsSection, etc. (full-width sections)
- `#additional-content` - Additional full-width sections (optional)

**Example Usage:**
```vue
<template>
  <ProjectPageTemplate projectTitle="Your Project Name">
    
    <!-- Hero Slot (Required) -->
    <template #hero>
      <ProjectHeroCard
        :title="projectData.title"
        :description="projectData.description"
        :tags="projectData.tags"
        :achievements-col1="projectData.achievementsCol1"
        :achievements-col2="projectData.achievementsCol2"
      />
    </template>
    
    <!-- Gallery Slot (Optional) -->
    <template #gallery>
      <ProjectGallery :images="galleryImages" />
    </template>
    
    <!-- Main Content Top (Left Column - 66.66% width) -->
    <template #main-content-top>
      <ProjectOverview :content="overviewText" />
      <TechnologyStack :technologies="technologies" />
    </template>
    
    <!-- Sidebar (Right Column - 33.33% width) -->
    <template #sidebar>
      <ProjectInfo
        client="Client Name"
        project-date="Date Range"
        project-url="Project URL"
        company-size="Company Size"
      />
    </template>
    
    <!-- Main Content Bottom (Full Width) -->
    <template #main-content-bottom>
      <DiagramViewer
        title="Architecture Diagram"
        diagram-src="/assets/diagrams/YourProject_Diagram.svg"
        :svg-width="2403"
        :svg-height="2205"
      />
      <ArchitectureOverview :architecture-layers="layers" />
      <EngineeringChallenges :challenges="challenges" />
      <PerformanceMetricsSection :stats="stats" :charts="charts" />
    </template>
    
  </ProjectPageTemplate>
</template>

<script>
import ProjectPageTemplate from '../../components/common/ProjectPageTemplate.vue'
// ... other component imports
</script>
```

### ProjectHeroCard

**File:** `src/components/projects/ProjectHeroCard.vue`

**Props:**
```javascript
{
  title: String (required),
  description: String (required),
  tags: Array (required),  // Array of tag strings
  achievementsCol1: Array (required),  // [{ emoji/icon, label, value }]
  achievementsCol2: Array (required)   // [{ emoji/icon, label, value }]
}
```

**Example:**
```vue
<ProjectHeroCard
  title="Your Project Name"
  description="Project description here"
  :tags="['Enterprise', 'Microservices', 'Azure']"
  :achievements-col1="[
    { emoji: 'performance', label: 'Performance', value: 'Optimized' },
    { emoji: 'scalability', label: 'Scalability', value: 'Enterprise-Ready' }
  ]"
  :achievements-col2="[
    { emoji: 'security', label: 'Security', value: 'Enterprise-Grade' },
    { emoji: 'automation', label: 'Automation', value: 'Full Automation' }
  ]"
/>
```

### ProjectGallery

**File:** `src/components/projects/ProjectGallery.vue`

**Props:**
```javascript
{
  images: Array (required),  // Array of image paths
  title: String (optional),
  projectName: String (optional)
}
```

**Example:**
```vue
<ProjectGallery
  :images="[
    '/assets/img/project1.jpg',
    '/assets/img/project2.jpg',
    '/assets/img/project3.jpg'
  ]"
  title="Project Gallery"
  project-name="Your Project Name"
/>
```

### TechnologyStack

**File:** `src/components/projects/TechnologyStack.vue`

**Props:**
```javascript
{
  technologies: Array (required),  // [{ name, description, category }]
  title: String (optional, default: 'Technology Stack'),
  columnsPerRow: Number (optional, default: 2)  // 1, 2, 3, or 4
}
```

**How Icons Work:**
- Icons are resolved automatically using `iconResolver.js`
- Just provide technology `name` - icon resolver handles the rest
- Use `TECH_CATEGORIES` from `constants.js` for categories

**Example:**
```vue
<TechnologyStack
  :technologies="[
    { 
      name: 'Angular', 
      description: 'Frontend framework', 
      category: TECH_CATEGORIES.FRONTEND 
    },
    { 
      name: '.NET Core', 
      description: 'Backend framework', 
      category: TECH_CATEGORIES.BACKEND 
    },
    { 
      name: 'SQL Server', 
      description: 'Database', 
      category: TECH_CATEGORIES.DATABASE 
    }
  ]"
  columns-per-row="2"
/>
```

### DiagramViewer

**File:** `src/components/projects/DiagramViewer.vue`

**Props:**
```javascript
{
  title: String (required),
  diagramSrc: String (required),  // Path to SVG file
  narrationSteps: Array (optional),  // Narration configuration array
  showNarration: Boolean (optional, default: true),  // Enable/disable narration toolbar
  svgWidth: Number (required),  // MUST match SVG viewBox width
  svgHeight: Number (required),  // MUST match SVG viewBox height
  iconName: String (optional),
  highlightStyle: String (optional, default: 'glow'),  // 'glow', 'pulse', 'dashed', 'solid'
  highlightColor: String (optional, default: '#ffeb3b')  // Highlight color
}
```

**CRITICAL:** Always specify `svg-width` and `svg-height` matching your SVG's viewBox dimensions exactly!

#### Diagrams WITH Narration (Interactive)

**When to use:** For important/complex diagrams where you want to guide users through the architecture step-by-step.

**Features:**
- Interactive narration toolbar with controls (Play, Pause, Previous, Next, Stop)
- Step-by-step highlighting of diagram components
- Narration bubbles with descriptions
- Voice selection dropdown (text-to-speech)
- Fullscreen narration mode

**Example (With Narration):**
```vue
<DiagramViewer
  title="Project Architecture"
  diagram-src="/assets/diagrams/YourProject_Diagram.svg"
  :narration-steps="narrationSteps"
  :show-narration="true"
  :svg-width="2403"
  :svg-height="2205"
/>
```

**Toolbar shows:**
- Left: Zoom controls (Zoom In, Zoom Out, Fit, Reset)
- Right: Narration controls (Start, Previous, Play, Pause, Next, Stop, Voice Selection)

**Reference Example:** `HeatExchangerPage.vue` - Has narration enabled with full narration steps

#### Diagrams WITHOUT Narration (View-Only)

**When to use:** For simpler diagrams or when narration is not needed - just a static/interactive view of the diagram.

**Features:**
- Only zoom controls in toolbar (Zoom In, Zoom Out, Fit, Reset)
- No narration controls
- No highlighting or narration bubbles
- Cleaner, simpler interface
- Still fully interactive (pan, zoom, fullscreen)

**Example (Without Narration):**
```vue
<DiagramViewer
  title="Project Architecture"
  diagram-src="/assets/diagrams/YourProject_Diagram.svg"
  :show-narration="false"
  :svg-width="2403"
  :svg-height="2205"
/>
```

**Toolbar shows:**
- Center: Zoom controls only (Zoom In, Zoom Out, Fit, Reset)
- No narration controls (toolbar is centered)

**Reference Examples:** 
- `G5POSPage.vue` - Has `:show-narration="false"` (no narration controls)
- `MobileGamesPage.vue` - Has `:show-narration="false"`
- `UKPropertyManagementPage.vue` - Has `:show-narration="false"`

#### Key Differences Summary

| Feature | WITH Narration | WITHOUT Narration |
|---------|---------------|-------------------|
| **Toolbar Controls** | Zoom controls + Narration controls | Zoom controls only (centered) |
| **Narration Steps** | Required (provide `narrationSteps` array) | Optional (can omit) |
| **Show Narration Prop** | `:show-narration="true"` or omit (default) | `:show-narration="false"` |
| **Highlighting** | Step-by-step component highlighting | No highlighting |
| **Narration Bubbles** | Shows with descriptions | No bubbles |
| **Voice Selection** | Available | Not available |
| **Fullscreen Mode** | Full narration toolbar | Just diagram |
| **Best For** | Complex/important architectures | Simple diagrams or quick views |

### Other Components

See existing project pages (e.g., `HeatExchangerPage.vue`) for examples of:
- `ProjectOverview` - Project overview text
- `ProjectInfo` - Project information sidebar
- `ArchitectureOverview` - Architecture layers and benefits
- `EngineeringChallenges` - Technical challenges and solutions
- `PerformanceMetricsSection` - Performance stats and charts
- `MetricsFramework` - Metrics framework details
- `ROISection` - Business impact and ROI

---

## 📊 Diagram Setup

### Creating Architecture Diagrams

#### Option 1: PlantUML + Kroki (Recommended)

1. **Create PlantUML file:**

   Use the sample structure below as a template. All existing `.puml` files in `docs/diagrams/` serve as reference examples.

   **Sample PlantUML C4 Diagram Structure:**
   ```puml
   @startuml YourProject_C4_Diagram
   !include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml
   
   ' Title and layout configuration
   title Your Project - C4 Architecture Diagram
   LAYOUT_WITH_LEGEND()
   
   ' Skin param for consistent styling
   skinparam defaultFontSize 12
   skinparam titleFontSize 16
   skinparam titleFontStyle bold
   skinparam componentFontSize 11
   skinparam arrowFontSize 10
   
   ' Personas/Users
   Person(user, "User", "End user accessing the system")
   
   ' Systems (external)
   System_Ext(external_api, "External API", "Third-party API service")
   
   ' Containers (main applications)
   Container(webapp, "Web Application", "Angular/Vue/React SPA", "Provides user interface")
   Container(api, "Web API", "ASP.NET Core Web API", "RESTful API for business logic")
   ContainerDb(database, "Database", "SQL Server", "Stores application data")
   
   ' Relationships
   Rel(user, webapp, "Uses", "HTTPS")
   Rel(webapp, api, "Calls", "HTTPS/REST")
   Rel(api, database, "Reads from and writes to", "SQL")
   Rel(api, external_api, "Calls", "HTTPS")
   
   @enduml
   ```

   **Font Sizes Reference:**
   - `defaultFontSize 12` - Default text size for all elements
   - `titleFontSize 16` - Diagram title font size
   - `titleFontStyle bold` - Title font style
   - `componentFontSize 11` - Component/container labels
   - `arrowFontSize 10` - Relationship arrow labels
   
   **Important Notes:**
   - Always use descriptive names for components
   - Include technology stack in container descriptions (e.g., "Angular SPA", "ASP.NET Core Web API")
   - Use clear relationship labels (e.g., "Uses", "Calls", "Reads from and writes to")
   - Add protocol/technology in relationship details (e.g., "HTTPS", "SQL", "REST")

   **Reference Examples:**
   - See existing `.puml` files in `docs/diagrams/` for complete examples:
     - `docs/diagrams/G5_POS_C4_Diagram.puml` - Complete C4 Container diagram example
     - `docs/diagrams/AirAsia_ID90_C4_Diagram.puml` - Complex enterprise architecture example
     - `docs/diagrams/BAT_InhouseApp_C4_Diagram.puml` - Microservices architecture example
     - All other `*_C4_Diagram.puml` files in `docs/diagrams/` serve as reference templates

2. **Generate SVG using Kroki:**
   ```powershell
   # Read PUML file
   $pumlContent = Get-Content "YourProject_C4_Diagram.puml" -Raw
   
   # Generate SVG using Kroki API
   $response = Invoke-WebRequest -Uri "https://kroki.io/plantuml/svg" -Method POST -Body $pumlContent -ContentType "text/plain"
   
   # Save SVG file
   $response.Content | Out-File "YourProject_C4_Diagram.svg" -Encoding UTF8
   ```

   **Alternative using curl (if available):**
   ```bash
   curl -X POST "https://kroki.io/plantuml/svg" -H "Content-Type: text/plain" --data-binary "@YourProject_C4_Diagram.puml" -o "YourProject_C4_Diagram.svg"
   ```

3. **Add SVG to project:**
   ```bash
   # Move SVG to diagrams directory
   cp YourProject_C4_Diagram.svg public/assets/diagrams/YourProject_C4_Diagram.svg
   
   # Keep PUML file in docs/diagrams/ for future reference
   # (All PUML files are kept as reference templates in docs/diagrams/)
   ```

4. **Get SVG dimensions:**
   ```powershell
   # Check SVG viewBox to get dimensions
   Select-String -Path "YourProject_C4_Diagram.svg" -Pattern 'viewBox="([^"]*)"'
   # Output: viewBox="0 0 2403 2205" → width=2403, height=2205
   ```

   **CRITICAL:** Use these exact dimensions in your `DiagramViewer` component's `svg-width` and `svg-height` props!

#### Option 2: Use Existing SVG

If you have an existing SVG:

1. Place it in `public/assets/diagrams/`
2. Get viewBox dimensions (see above)
3. Use in DiagramViewer component

### Narration Setup (Optional)

**Note:** Narration is OPTIONAL. You can use diagrams with or without narration. See the DiagramViewer component section above for detailed comparison.

#### Enabling Narration

If you want interactive narration for your diagram (step-by-step guided tour):

1. **Set `show-narration="true"` (or omit - it's the default):**
   ```vue
   <DiagramViewer
     :show-narration="true"
     :narration-steps="narrationSteps"
     ...
   />
   ```

2. **Create narration configuration file:**
   ```bash
   cp src/config/heatExchangerNarration.js src/config/yourProjectNarration.js
   ```

3. **Configure narration steps:**
   ```javascript
   export const yourProjectNarrationSteps = [
     {
       title: "Component Name",
       speechTitle: "Spoken Title",
       description: "Visual description",
       speechDescription: "Detailed spoken description",
       icon: "icon.svg",
       position: { x: 400, y: 500 },
       highlights: [
         { x: 405, y: 490, width: 160, height: 100 }
       ]
     }
   ]
   ```

4. **Import and use in your page:**
   ```javascript
   import { yourProjectNarrationSteps } from '../../config/yourProjectNarration.js'
   ```

#### Disabling Narration

If you don't want narration (view-only diagram with zoom controls):

1. **Set `show-narration="false"`:**
   ```vue
   <DiagramViewer
     :show-narration="false"
     diagram-src="/assets/diagrams/YourProject_Diagram.svg"
     :svg-width="2403"
     :svg-height="2205"
   />
   ```

2. **You can omit `narration-steps` prop** (not needed when narration is disabled)

**For detailed narration guide:** See `Project_Narration_Guide.md`

**Reference Examples:**
- **With Narration:** `HeatExchangerPage.vue`, `AirAsiaID90Page.vue`, `BATInhouseAppPage.vue`
- **Without Narration:** `G5POSPage.vue`, `MobileGamesPage.vue`, `UKPropertyManagementPage.vue`

---

## 🎨 Icon System & iconResolver

### How Icon Resolution Works

Icons are resolved automatically by the `iconResolver.js` utility. You don't need to manually specify icons - just provide the technology name.

**File:** `src/utils/iconResolver.js`

**Priority Order:**
1. **Devicon CDN** (first priority) - Popular technologies from Devicon library
2. **Local Icons** (second priority) - Custom icons in `public/assets/img/Icons/`
3. **Emoji Fallback** (last resort) - Generic emojis

### How Components Use iconResolver

**In TechnologyStack Component:**
```javascript
// TechnologyStack.vue automatically uses resolveIcon
import { resolveIcon } from '../../utils/iconResolver.js'

// When you provide a technology:
{ name: 'Angular', description: 'Frontend framework', category: TECH_CATEGORIES.FRONTEND }

// The component automatically resolves the icon:
const iconData = resolveIcon(tech.name)  // Returns: { type: 'devicon'|'local'|'emoji', src: string, alt: string }
```

**In Service Components:**
```javascript
// ServiceHeroSection, ServiceCapabilities, etc. use resolveIcon
import { resolveIcon } from '../../utils/iconResolver.js'

const iconData = resolveIcon('full stack development')  // Resolves to appropriate icon
```

**In ReusableCard Component:**
```javascript
// ReusableCard uses resolveIcon for header icons
import { resolveIcon, getDeviconClass } from '../../utils/iconResolver.js'

const iconData = resolveIcon(iconName)  // Resolves icon for card header
```

### Using resolveIcon Function

**Function Signature:**
```javascript
resolveIcon(techName: string, fallbackName?: string): { type: string, src: string, alt: string }
```

**Return Object:**
```javascript
{
  type: 'devicon' | 'local' | 'emoji',  // Icon source type
  src: string,                           // Icon source (CDN class name, local path, or emoji)
  alt: string                            // Alt text for accessibility
}
```

**Examples:**
```javascript
// Devicon icon
resolveIcon('Angular')
// Returns: { type: 'devicon', src: 'angular', alt: 'Angular' }

// Local icon
resolveIcon('Push Notifications')
// Returns: { type: 'local', src: '/assets/img/Icons/push notification.png', alt: 'Push Notifications' }

// Emoji fallback
resolveIcon('Unknown Technology')
// Returns: { type: 'emoji', src: '⚙️', alt: 'Unknown Technology' }
```

### Adding New Icon Mappings

**File:** `src/utils/iconResolver.js`

**Step 1: Add to ICON_MAP object**

```javascript
const ICON_MAP = {
  // ... existing mappings
  
  // Add both normalized and original versions for reliability
  'your technology name': { 
    type: 'devicon',        // 'devicon', 'local', or 'emoji'
    icon: 'icon-name',      // Devicon class name (for devicon type) or local filename (for local type)
    local: 'icon.svg',      // optional: local icon path (preferred over devicon CDN)
    fallback: '🔷'          // emoji fallback (last resort)
  },
  'your.technology.name': {  // Add original version with special characters
    type: 'devicon', 
    icon: 'icon-name', 
    local: 'icon.svg',
    fallback: '🔷' 
  }
}
```

**Step 2: Icon Types**

1. **Devicon Type:**
   ```javascript
   'angular': { 
     type: 'devicon', 
     icon: 'angular',  // Devicon class name
     local: 'Angular.svg',  // Optional: prefer local over CDN
     fallback: '🅰️' 
   }
   ```

2. **Local Type:**
   ```javascript
   'push notifications': { 
     type: 'local', 
     icon: 'push notification.png',  // Filename in public/assets/img/Icons/
     fallback: '🔔' 
   }
   ```

3. **Emoji Type (rare):**
   ```javascript
   'unknown tech': { 
     type: 'emoji', 
     src: '⚙️', 
     alt: 'Technology' 
   }
   ```

**Step 3: Test Your Icon**

```javascript
// In browser console (after page loads)
import { resolveIcon } from '@/utils/iconResolver'
console.log(resolveIcon('Your Technology Name'))

// Or test in component:
const iconData = resolveIcon('Your Technology Name')
console.log(iconData)
```

### Common Icon Mappings Reference

**See `src/utils/iconResolver.js` for complete list. Common ones include:**

- **.NET Technologies:** `.NET Core`, `ASP.NET Core Web API`, `Entity Framework`, `C#`
- **Frontend:** `Angular`, `Vue.js`, `React`, `TypeScript`, `Bootstrap`, `Tailwind CSS`
- **Backend:** `.NET Core`, `Node.js`, `Express`, `FastAPI`
- **Databases:** `SQL Server`, `PostgreSQL`, `MySQL`, `MongoDB`, `Redis`
- **Cloud:** `Azure`, `AWS`, `Firebase`, `Google Cloud`
- **DevOps:** `Docker`, `Kubernetes`, `Azure DevOps`, `CI/CD`
- **Mobile:** `React Native`, `Flutter`, `Swift`, `Kotlin`, `Android`, `iOS`

### Icon Resolution Tips

1. **Use exact technology names** - Icon resolver normalizes names (lowercase, removes special chars)
2. **Add both normalized and original versions** - For reliability with special characters
3. **Prefer local icons** - Set `local` property even for devicon icons to avoid CDN dependency
4. **Test in browser console** - Verify icon resolution before using in components
5. **Check existing mappings first** - Many icons are already mapped

---

## ⚠️ Common Issues & Solutions

### Icons Not Showing / Showing Settings Icon (⚙️)

**Problem:** Icon mapping missing

**Solution:**
1. Check `src/utils/iconResolver.js` for mapping
2. Add mapping for your technology (both normalized and original versions)
3. Test in browser console: `resolveIcon('Technology Name')`

### Diagram Not Displaying Correctly

**Problem:** SVG dimensions mismatch

**Solution:**
1. Check SVG viewBox: `Select-String -Path "diagram.svg" -Pattern 'viewBox="([^"]*)"'`
2. Ensure `svg-width` and `svg-height` props match viewBox dimensions exactly
3. Verify SVG file is in correct location: `public/assets/diagrams/`

### Charts Not Rendering

**Problem:** Chart configuration issues

**Solution:**
1. Ensure each chart has unique `id`
2. Verify chart data structure (labels, datasets, data)
3. Check `maintainAspectRatio: false` in chart options
4. Check browser console for errors

### Component Import Errors

**Problem:** Wrong component name or path

**Solution:**
1. Verify component exists in `src/components/projects/`
2. Check import path (relative to your page location)
3. Ensure component name matches file name exactly

### Router Not Working

**Problem:** Route not configured

**Solution:**
1. Add route in `src/router/index.js`
2. Verify route path matches your link paths
3. Check route name matches component name

---

## ✅ Best Practices

1. **Always follow standard component order** - Maintains consistency
2. **Use existing icon mappings** - Avoids generic fallback icons
3. **Test in browser frequently** - Catch errors early
4. **Use realistic data** - Don't use placeholder content
5. **Verify responsive design** - Test on mobile/tablet
6. **Check console for errors** - Fix issues before finishing
7. **Use constants from `src/config/constants.js`** - Standardized values
8. **Keep narration descriptions detailed** - Better user experience
9. **Optimize images** - Reduce file sizes
10. **Document custom configurations** - Help future maintenance

---

## 📖 Additional Resources

- **PROJECT_SETUP_GUIDE.md** - Detailed component reference
- **PROJECT_PAGE_IMPLEMENTATION_GUIDE.md** - Advanced implementation details
- **QUICK_START_NEW_PROJECT_PAGE.md** - Fast-track guide
- **DIAGRAM_SETUP_GUIDE.md** - Diagram creation details
- **Project_Narration_Guide.md** - Narration system guide
- **PROJECT_PAGE_TEMPLATE.vue** - Starter template file (in `docs/` folder)

---

## 🎯 Quick Reference Checklist

- [ ] Copied template file
- [ ] Added router entry
- [ ] Updated component imports
- [ ] Followed standard component order
- [ ] Populated all project data
- [ ] Added/configured diagram (if applicable)
- [ ] Added icon mappings (if needed)
- [ ] Tested in browser
- [ ] Verified icons display correctly
- [ ] Verified charts render (if applicable)
- [ ] Checked responsive design
- [ ] No console errors
- [ ] Removed all placeholder content

---

**Happy Creating! 🚀**

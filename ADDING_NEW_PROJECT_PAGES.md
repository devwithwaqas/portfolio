# 🚀 Adding New Project Pages - Complete Guide

## 📋 Overview

This guide explains how to add new project pages to the portfolio using the modular component system. The portfolio uses a template-based approach with **standardized constants** and **consistent styling** that makes adding new projects simple and maintainable.

## ⚠️ Important: Standardization Requirements

**ALL new project pages MUST follow these standardization rules:**

1. **Use Constants** - Never hardcode icon names or categories
2. **Standardized Font Classes** - Use `txt-*` and `icon-*` utility classes
3. **Consistent Component Structure** - Follow the established patterns
4. **Proper Icon Resolution** - Use Devicon → Local → Emoji fallback system
5. **Standard Component Order** - Follow the established component sequence

### 📋 Standard Component Order
**CRITICAL**: Always follow this exact order in your project pages:

1. **DiagramViewer** - Interactive diagram first (visual introduction)
2. **ArchitectureOverview** - Text overview second (detailed explanation)  
3. **EngineeringChallenges** - Technical challenges
4. **PerformanceMetricsSection** - Performance data
5. **MetricsFramework** - Metrics framework
6. **ROISection** - Business impact

**⚠️ Always verify component order against existing pages (HeatExchangerPage) to maintain consistency.**

## 🏗️ Architecture

### Core Components
- **`ProjectPageTemplate.vue`** - Main page layout and structure
- **`ProjectGallery.vue`** - Custom 3D carousel for project images
- **`ProjectHeroCard.vue`** - Project header with achievements
- **`DiagramViewer.vue`** - Interactive diagrams with narration
- **`ReusableCard.vue`** - Consistent card styling for sections

### Project Structure
```
src/views/projects/
├── HeatExchangerPage.vue    # Example project page
└── YourNewProjectPage.vue   # Your new project

src/components/projects/
├── ProjectGallery.vue       # Custom 3D carousel
├── ProjectHeroCard.vue      # Project header
├── DiagramViewer.vue        # Interactive diagrams
├── TechnologyStack.vue      # Tech stack display
├── ProjectOverview.vue      # Project description
├── ArchitectureOverview.vue # Architecture details
├── EngineeringChallenges.vue # Challenges & solutions
├── PerformanceMetricsSection.vue # Performance charts
├── MetricsFramework.vue     # Metrics framework
├── ROISection.vue          # Business impact
└── ProjectInfo.vue         # Project information

src/components/common/
├── ProjectPageTemplate.vue  # Main page template
└── ReusableCard.vue        # Reusable card component
```

## 🎯 Step-by-Step Guide

### 1. Create New Project Page

Create a new file: `src/views/projects/YourProjectPage.vue`

```vue
<template>
  <ProjectPageTemplate projectTitle="Your Project Name">
    
    <!-- Hero Slot -->
    <template #hero>
      <ProjectHeroCard 
        :title="projectData.title"
        :description="projectData.description"
        :tags="projectData.tags"
        :achievementsCol1="projectData.achievementsCol1"
        :achievementsCol2="projectData.achievementsCol2"
      />
    </template>
    
    <!-- Gallery Slot -->
    <template #gallery>
      <ProjectGallery 
        :title="galleryData.title"
        :projectName="galleryData.projectName"
        :images="galleryData.images"
      />
    </template>
    
    <!-- Main Content Top -->
    <template #main-content-top>
      <ProjectOverview 
        title="Project Overview"
        :icon-name="PROJECT_ICON_NAMES.PROJECT_OVERVIEW"
        :content="projectOverviewData.description"
      />
      
      <TechnologyStack 
        title="Technology Stack"
        :icon-name="PROJECT_ICON_NAMES.TECHNOLOGY_STACK"
        :technologies="technologies" 
      />
    </template>
    
    <!-- Sidebar -->
    <template #sidebar>
      <ProjectInfo 
        title="Project Information"
        :icon-name="PROJECT_ICON_NAMES.PROJECT_INFORMATION"
        :category="PROJECT_CATEGORIES.YOUR_CATEGORY"
        client="Your Client Name"
        projectDate="2024"
        projectUrl="https://your-project.com"
        companySize="Enterprise"
      />
    </template>
    
    <!-- Main Content Bottom -->
    <template #main-content-bottom>
      <ROISection 
        mainTitle="Business Impact & Growth Metrics"
        :mainIcon="ROI_ICON_NAMES.MAIN_ICON"
        leftTitle="Financial Growth Impact"
        :leftIcon="ROI_ICON_NAMES.FINANCIAL_ICON"
        rightTitle="Operational Growth Impact"
        :rightIcon="ROI_ICON_NAMES.OPERATIONAL_ICON"
        metricsTitle="Growth Success Metrics"
        :metricsIcon="ROI_ICON_NAMES.SUCCESS_ICON"
        :leftItems="roiLeftItems"
        :rightItems="roiRightItems"
        :metrics="roiMetrics"
      />
    </template>
    
  </ProjectPageTemplate>
</template>

<script>
import ProjectPageTemplate from '../../components/common/ProjectPageTemplate.vue'
import ProjectHeroCard from '../../components/projects/ProjectHeroCard.vue'
import ProjectGallery from '../../components/projects/ProjectGallery.vue'
import ProjectOverview from '../../components/projects/ProjectOverview.vue'
import TechnologyStack from '../../components/projects/TechnologyStack.vue'
import ProjectInfo from '../../components/projects/ProjectInfo.vue'
import ROISection from '../../components/projects/ROISection.vue'

// ⚠️ CRITICAL: Import constants
import { 
  PROJECT_ICON_NAMES, 
  PROJECT_CATEGORIES, 
  TECH_CATEGORIES, 
  ROI_ICON_NAMES 
} from '../../config/constants.js'

export default {
  name: 'YourProjectPage',
  components: {
    ProjectPageTemplate,
    ProjectHeroCard,
    ProjectGallery,
    ProjectOverview,
    TechnologyStack,
    ProjectInfo,
    ROISection
  },
  data() {
    return {
      // ⚠️ CRITICAL: Expose constants for template access
      PROJECT_ICON_NAMES,
      PROJECT_CATEGORIES,
      TECH_CATEGORIES,
      ROI_ICON_NAMES,
      
      projectData: {
        title: "Your Project Title",
        description: "Your project description...",
        tags: ["Vue.js", "Node.js", "MongoDB"],
        achievementsCol1: [
          { icon: "performance", text: "50% faster load times" },
          { icon: "scalability", text: "10K+ concurrent users" }
        ],
        achievementsCol2: [
          { icon: "security", text: "Enterprise-grade security" },
          { icon: "analytics", text: "Real-time analytics" }
        ]
      },
      galleryData: {
        title: "Project Gallery", // ⚠️ NO EMOJIS - Use icon-name prop instead
        projectName: "Your Project",
        images: [
          "/assets/img/your-project/img1.jpg",
          "/assets/img/your-project/img2.jpg",
          "/assets/img/your-project/img3.jpg"
        ]
      },
      // ⚠️ CRITICAL: Use TECH_CATEGORIES constants
      technologies: [
        { name: "Vue.js", description: "Frontend framework", category: TECH_CATEGORIES.FRONTEND },
        { name: "Node.js", description: "Backend runtime", category: TECH_CATEGORIES.BACKEND },
        { name: "MongoDB", description: "NoSQL database", category: TECH_CATEGORIES.DATABASE }
      ],
      projectOverviewData: {
        description: `The Challenge:

Your project challenge description here.

The Solution:

• Key solution point 1
• Key solution point 2
• Key solution point 3

Technical Architecture:

• Architecture component 1
• Architecture component 2
• Architecture component 3

Business Impact:

• Impact metric 1
• Impact metric 2
• Impact metric 3`
      },
      // ROI & Growth Metrics - Focus on Business Impact & Growth (not performance)
      roiLeftItems: [
        { label: "Annual Cost Savings", value: "$2.5M+" },
        { label: "Revenue Recovery", value: "$1.8M+" },
        { label: "ROI on Investment", value: "280%" },
        { label: "Payback Period", value: "6 months" }
      ],
      roiRightItems: [
        { label: "User Satisfaction Growth", value: "+45%" },
        { label: "System Adoption Rate", value: "87%" },
        { label: "Operational Efficiency", value: "+65%" },
        { label: "Support Reduction", value: "-60%" }
      ],
      roiMetrics: [
        { value: "25,000+", label: "Active Users", color: "green" },
        { value: "5 Countries", label: "Geographic Reach", color: "purple" },
        { value: "$4.3M+", label: "Business Value", color: "pink" },
        { value: "8x Scale", label: "System Capacity", color: "cyan" }
      ]
    }
  }
}
</script>
```

### 2. Add Route

Update `src/router/index.js`:

```javascript
import YourProjectPage from '../views/projects/YourProjectPage.vue'

const routes = [
  // ... existing routes
  {
    path: '/projects/your-project',
    name: 'YourProject',
    component: YourProjectPage
  }
]
```

### 3. Update Navigation

Update `src/components/layout/Navigation.vue` to include your project in the portfolio section.

## 🖼️ Project Gallery Setup

### Custom 3D Carousel Features

The `ProjectGallery` component includes:

- **3D flip/rotate transitions** with perspective effects
- **Autoplay with pause on hover**
- **Custom navigation arrows** with hover effects
- **Pagination dots overlay** on images with glassmorphism
- **Smooth transitions** with cubic-bezier easing
- **Responsive design** for all screen sizes

### Image Requirements

1. **Image Format**: JPG or PNG
2. **Recommended Size**: 1200x800px or similar aspect ratio
3. **File Location**: `public/assets/img/your-project/`
4. **Naming Convention**: `img1.jpg`, `img2.jpg`, etc.

### Gallery Data Structure

```javascript
galleryData: {
  title: "📸 Project Gallery",
  projectName: "Your Project Name",
  images: [
    "/assets/img/your-project/img1.jpg",
    "/assets/img/your-project/img2.jpg",
    "/assets/img/your-project/img3.jpg",
    "/assets/img/your-project/img4.jpg"
  ]
}
```

## 🎨 Available Components

### Core Components

#### ProjectHeroCard
- Project title and description
- Technology tags
- Achievement metrics
- Gradient background with animations

#### ProjectGallery
- Custom 3D carousel
- Autoplay functionality
- Navigation controls
- Pagination dots

#### DiagramViewer
- Interactive SVG diagrams
- Narration system
- Highlighting system
- Fullscreen mode

#### TechnologyStack
- Technology icons with Devicon integration
- Local icon fallbacks
- Responsive grid layout

#### ProjectOverview
- Project description
- Key features
- Business impact

#### ArchitectureOverview
- Architecture layers
- Feature descriptions
- Benefits and outcomes

#### EngineeringChallenges
- Challenges and solutions
- Technical approaches
- Problem-solving methodology

#### PerformanceMetricsSection
- Performance charts
- Metrics visualization
- Data-driven insights

**Template Usage:**
```vue
<PerformanceMetricsSection 
  title="Performance Metrics & Analytics"
  :icon-name="PROJECT_ICON_NAMES.PERFORMANCE_METRICS"
  :stats="performanceStats"
  :charts="performanceCharts"
/>
```

**Data Structure:**
```javascript
// 4 Key Performance Stats (matches Heat Exchanger styling)
performanceStats: [
  { value: '0.8s', label: 'Average Response Time', color: 'green' },
  { value: '99.9%', label: 'System Uptime', color: 'blue' },
  { value: '3,000+', label: 'Daily Bookings', color: 'purple' },
  { value: '90%', label: 'Flight Discounts', color: 'pink' }
],

// 5 Interactive Charts (comprehensive metrics visualization)
performanceCharts: [
  {
    id: 'bookingDistributionChart',
    type: 'doughnut',
    title: 'Booking Distribution by Time Window',
    icon: 'analytics',
    width: 'half',
    data: { /* Chart.js data */ },
    options: { /* Full Chart.js options with animations */ }
  },
  {
    id: 'systemPerformanceChart',
    type: 'polarArea',
    title: 'System Performance Metrics',
    icon: 'performance',
    width: 'half',
    data: { /* Chart.js data */ },
    options: { /* Full Chart.js options with scales */ }
  },
  {
    id: 'bookingTrendsChart',
    type: 'line',
    title: 'Daily Booking Volume Trends',
    icon: 'analytics',
    width: 'half',
    data: { /* Chart.js data */ },
    options: { /* Full Chart.js options with line styling */ }
  },
  {
    id: 'discountUtilizationChart',
    type: 'bar',
    title: 'Discount Utilization by Employee Category',
    icon: 'financial',
    width: 'half',
    data: { /* Chart.js data */ },
    options: { /* Full Chart.js options with bar styling */ }
  },
  {
    id: 'systemLoadChart',
    type: 'bar',
    title: 'System Load & Performance Metrics',
    icon: 'monitoring',
    width: 'full',
    data: { /* Chart.js data */ },
    options: { /* Full Chart.js options with comparison bars */ }
  }
]
```

**Guidelines:**
- **Stats Cards**: Always use 4 cards with consistent color scheme (green, blue, purple, pink)
- **Chart Types**: Use 5 charts total - doughnut, polarArea, line, bar, bar (full-width)
- **Chart Variety**: Mix chart types for comprehensive data visualization
- **Realistic Data**: Ensure all metrics align with your project's actual performance
- **Chart Options**: Include full Chart.js options for animations, tooltips, legends
- **Icons**: Use appropriate icons for chart titles (analytics, performance, financial, monitoring)
- **Layout**: Use 'half' width for most charts, 'full' width for comprehensive system metrics

#### MetricsFramework
- Measurement categories
- Validation methods
- Context and baseline

#### ROISection
- **Growth Metrics Focus**: Business impact & growth (NOT performance metrics)
- **Financial Impact**: Cost savings, revenue recovery, ROI percentages
- **Operational Impact**: User growth, adoption rates, efficiency gains
- **Success Metrics**: 4 colored metric cards with value, label, color properties

#### ProjectInfo
- Project metadata
- Client information
- Timeline and scope

## 🎯 ROI Section Guidelines (CRITICAL)

### ✅ Correct ROI Data Structure

**Key Distinction**: ROI section focuses on **Growth Metrics** (business impact, user growth, financial value) NOT **Performance Metrics** (response time, uptime, cache hit rate).

```javascript
// ✅ CORRECT: Growth-focused metrics
roiLeftItems: [
  { label: "Annual Employee Savings", value: "$15.2M+" },
  { label: "Revenue Recovery from Unsold Seats", value: "$8.5M+" },
  { label: "ROI on Development Investment", value: "340%" },
  { label: "Payback Period", value: "4.2 months" }
],
roiRightItems: [
  { label: "Employee Satisfaction Growth", value: "+67%" },
  { label: "Booking Volume Growth", value: "+245%" },
  { label: "System Adoption Rate", value: "94%" },
  { label: "Support Ticket Reduction", value: "-78%" }
],
roiMetrics: [
  { value: "50,000+", label: "Active Employees", color: "green" },
  { value: "10 Countries", label: "Geographic Expansion", color: "purple" },
  { value: "$23.7M+", label: "Business Value Created", color: "pink" },
  { value: "10x Capacity", label: "System Scalability", color: "cyan" }
]
```

### ❌ WRONG ROI Data Structure

```javascript
// ❌ WRONG: Performance metrics (belong in PerformanceMetricsSection)
roiMetrics: [
  { value: "0.8s", label: "Response Time", color: "green" },      // Performance metric
  { value: "99.9%", label: "Uptime", color: "blue" },            // Performance metric
  { value: "98.2%", label: "Cache Hit Rate", color: "purple" }   // Performance metric
]

// ❌ WRONG: Complex objects instead of simple value/label/color
roiMetrics: [
  {
    icon: "growth",
    title: "User Base Expansion",
    value: "50,000+ employees",
    description: "Active users across countries",
    details: "Detailed explanation..."
  }
]
```

### 🎯 ROI Section Template Usage

```vue
<ROISection 
  mainTitle="Business Impact & Growth Metrics"
  :mainIcon="ROI_ICON_NAMES.MAIN_ICON"
  leftTitle="Financial Growth Impact"
  :leftIcon="ROI_ICON_NAMES.FINANCIAL_ICON"
  rightTitle="Operational Growth Impact"
  :rightIcon="ROI_ICON_NAMES.OPERATIONAL_ICON"
  metricsTitle="Growth Success Metrics"
  :metricsIcon="ROI_ICON_NAMES.SUCCESS_ICON"
  :leftItems="roiLeftItems"
  :rightItems="roiRightItems"
  :metrics="roiMetrics"
/>
```

## 🎯 Constants System (CRITICAL)

### Available Constants

**⚠️ NEVER hardcode strings - Always use constants from `src/config/constants.js`:**

```javascript
// Import constants
import { 
  PROJECT_ICON_NAMES, 
  PROJECT_CATEGORIES, 
  TECH_CATEGORIES, 
  ROI_ICON_NAMES 
} from '../../config/constants.js'

// Expose in data() for template access
data() {
  return {
    PROJECT_ICON_NAMES,
    PROJECT_CATEGORIES,
    TECH_CATEGORIES,
    ROI_ICON_NAMES,
    // ... rest of data
  }
}
```

### Technology Categories

```javascript
// ✅ CORRECT - Use constants
technologies: [
  { name: "Vue.js", category: TECH_CATEGORIES.FRONTEND },
  { name: "Node.js", category: TECH_CATEGORIES.BACKEND },
  { name: "MongoDB", category: TECH_CATEGORIES.DATABASE }
]

// ❌ WRONG - Don't hardcode
technologies: [
  { name: "Vue.js", category: "frontend" },
  { name: "Node.js", category: "backend" }
]
```

### Project Icon Names

```javascript
// ✅ CORRECT - Use constants
<ProjectOverview :icon-name="PROJECT_ICON_NAMES.PROJECT_OVERVIEW" />
<TechnologyStack :icon-name="PROJECT_ICON_NAMES.TECHNOLOGY_STACK" />
<ProjectInfo :icon-name="PROJECT_ICON_NAMES.PROJECT_INFORMATION" />

// ❌ WRONG - Don't hardcode
<ProjectOverview icon-name="project overview" />
<TechnologyStack icon-name="technology stack" />
```

### Project Categories

```javascript
// ✅ CORRECT - Use constants
<ProjectInfo :category="PROJECT_CATEGORIES.ENTERPRISE_APPLICATIONS" />

// ❌ WRONG - Don't hardcode
<ProjectInfo category="Enterprise Applications" />
```

## 🎯 Icon System

### Icon Resolution Priority

The portfolio uses a unified icon system in `src/utils/iconResolver.js`:

1. **Devicon Icons** - Technology stack icons (SVG, colored)
2. **Local Icons** - Custom project icons (PNG/SVG)
3. **Emoji Fallbacks** - When icons aren't available

### Icon Usage

```javascript
// In component data - Icons are automatically resolved
{ icon: "microservices", name: "Microservices Architecture" }

// Icon resolver automatically finds:
// 1. microservices.png (local)
// 2. devicon-microservices (Devicon)
// 3. 🏗️ (emoji fallback)
```

### Adding New Icons

1. **Local Icons**: Add to `public/assets/img/Icons/`
2. **Update iconResolver.js**: Add mapping for new icons
3. **Use in components**: Icons are automatically resolved

### Icon Mapping Examples

```javascript
// In iconResolver.js
'asp.net core': { 
  type: 'devicon', 
  icon: 'dotnetcore', 
  local: 'NET core.svg', 
  fallback: '⚙️' 
},
'vue.js': { 
  type: 'devicon', 
  icon: 'vuejs', 
  fallback: '🟢' 
},
'custom-icon': { 
  type: 'local', 
  icon: 'custom-icon.png', 
  fallback: '📦' 
}
```

## 🎨 Standardized Styling

### ⚠️ CRITICAL: Use Standardized Font & Icon Classes

**ALL components MUST use these standardized utility classes:**

### Font Classes (`txt-*`)

```css
/* Headers */
.txt-h1-4xl    /* 2.5rem - Main project title */
.txt-h3-2xl    /* 1.75rem - Section headers */
.txt-h4-xl     /* 1.25rem - Subsection headers */

/* Body Text */
.txt-p-lg      /* 1.125rem - Project descriptions */
.txt-p-sm      /* 0.875rem - Small text */
.txt-label-md  /* 0.875rem - Labels */
.txt-label-sm  /* 0.75rem - Small labels */
```

### Icon Classes (`icon-*`)

```css
/* Icon Sizes */
.icon-img-xl     /* 32px - Large icons (headers) */
.icon-img-lg     /* 24px - Medium icons */
.icon-img-md     /* 20px - Small icons */
.icon-img-sm     /* 16px - Tiny icons */

/* Icon Wrappers */
.icon-wrapper-xl /* 32px wrapper with flex centering */
.icon-wrapper-lg /* 24px wrapper with flex centering */
.icon-wrapper-md /* 20px wrapper with flex centering */
```

### Component-Specific Classes

```css
/* Card Styling */
.reusable-card     /* Main card container */
.fancy-3d-header   /* 3D header effects */

/* Layout */
.section-header    /* Flex container for icon + text */
.achievement-item  /* Flex container for achievements */
.info-value        /* Flex container for project info */
```

### ✅ CORRECT Usage Examples

```vue
<!-- Headers with icons -->
<h4 class="section-header txt-h4-xl">
  <div class="section-icon-wrapper icon-wrapper-xl">
    <img class="icon-img-xl" :src="iconSrc" />
  </div>
  Header Text
</h4>

<!-- Achievement items -->
<div class="achievement-item">
  <img class="icon-img-md" :src="iconSrc" />
  <span class="txt-p-sm">Achievement text</span>
</div>

<!-- Project info -->
<div class="info-value">
  <img class="icon-img-md" :src="iconSrc" />
  <span class="txt-p-sm">Info text</span>
</div>
```

### ❌ WRONG Usage Examples

```vue
<!-- Don't use custom sizes -->
<h4 style="font-size: 18px;">
  <img style="width: 25px; height: 25px;" />
  Header Text
</h4>

<!-- Don't use inline styles -->
<div style="display: flex; align-items: center;">
  <img style="width: 20px;" />
  <span style="font-size: 14px;">Text</span>
</div>
```

### Custom Styling Rules

1. **Use utility classes** - Never inline styles for common patterns
2. **Follow existing patterns** - Copy from working components
3. **Maintain consistency** - Use the same classes across components
4. **Scoped CSS only** - For component-specific styling
5. **CSS variables** - For easy theming and consistency

## 🚀 Best Practices

### 1. ⚠️ CRITICAL: Standardization
- **ALWAYS use constants** - Never hardcode strings
- **ALWAYS use utility classes** - Never inline styles
- **ALWAYS follow patterns** - Copy from existing components
- **ALWAYS expose constants** - Add to data() for template access

### 2. Component Structure
- Use existing components when possible
- Follow the template structure exactly
- Maintain consistent prop interfaces
- Use proper slot placement (hero, gallery, main-content-top, sidebar, main-content-bottom)

### 3. Data Structure
- Use proper data formats for each component
- Follow the established patterns from HeatExchangerPage.vue
- Use constants for all categories and icon names
- Structure projectOverviewData with proper formatting

### 4. Performance
- Optimize images (compress, resize)
- Use lazy loading for galleries
- Minimize bundle size
- Test loading times

### 5. Accessibility
- Provide alt text for images
- Use semantic HTML
- Ensure keyboard navigation
- Test with screen readers

### 6. Responsive Design
- Test on multiple screen sizes
- Use Bootstrap grid system
- Optimize for mobile
- Verify icon and text alignment

## 🔧 Troubleshooting

### Common Issues

1. **Page shows only footer**: 
   - Check if constants are exposed in data()
   - Verify component imports are correct
   - Check for prop mismatches in data structure

2. **Icons showing as text (e.g., "web", "api", "database")**:
   - **Root Cause**: Component expects `feature.icon` but data uses `feature.name` for icon resolution
   - **Fix**: Ensure component uses `getFeatureIconData(feature.icon)` not `getFeatureIconData(feature.name)`
   - **Check**: Verify icon names exist in iconResolver.js mappings
   - **Example**: `{ icon: 'web', name: 'Angular SPA' }` - component should use `feature.icon` for icon resolution

3. **Icons showing as fallback emojis (e.g., ⚙️, 📊, 🔗) in Engineering Challenges**:
   - **Root Cause**: Inconsistent icon resolution between components
   - **Fix**: Use standardized hybrid approach - `icon` property first, then `name` for intelligent mapping
   - **Check**: Verify data structure has both `icon` and `name` properties
   - **Example**: `{ icon: 'authentication', name: 'Enterprise Google SSO Integration' }` - uses `icon` first, then falls back to `name` for intelligent mapping to detect "Google SSO"

4. **Wrong icons showing (e.g., generic cache icon instead of Redis icon)**:
   - **Root Cause**: Using generic icon names instead of specific technology names
   - **Fix**: Use specific technology names for better icon resolution
   - **Examples**: 
     - ❌ `icon: 'caching'` → ✅ `icon: 'redis'` for Redis Cache Layer
     - ❌ `icon: 'database'` → ✅ `icon: 'azure sql database'` for Azure SQL Database
     - ❌ `icon: 'monitoring'` → ✅ `icon: 'application insights'` for Azure Application Insights
     - ❌ `icon: 'deployment'` → ✅ `icon: 'azure devops'` for Azure DevOps Pipeline
     - ❌ `icon: 'api'` → ✅ `icon: 'rest api'` for REST API
   - **Rule**: Always use the most specific technology name available in iconResolver.js
   - **Azure Services**: Use full Azure service names (e.g., `azure sql database`, `azure devops`, `azure service bus`)

5. **Icons not showing**: 
   - Check iconResolver.js mappings
   - Verify icon names are correct
   - Check if constants are being used

6. **TypeError: Cannot read properties of undefined**:
   - Constants not exposed in data() function
   - Missing imports from constants.js
   - Template trying to access undefined constants

7. **Images not loading**: 
   - Verify file paths in public/assets/img/
   - Check image file extensions (.jpg, .png, .svg)
   - Ensure images exist in correct directory

8. **Styling issues**: 
   - Check CSS class names and scoping
   - Verify utility classes are being used
   - Check for inline styles that should be classes

9. **Navigation not working**: 
   - Verify route configuration in router/index.js
   - Check if route path matches navigation links
   - Ensure component is properly imported

10. **Technology stack not displaying**:
   - Check if TECH_CATEGORIES constants are used
   - Verify category names match constants
   - Check if technologies array is properly structured

### Debug Tips

1. **Check browser console** for errors
2. **Verify component imports** are correct
3. **Test icon resolution** with console.log
4. **Validate image paths** are accessible
5. **Check constants exposure** in Vue devtools
6. **Compare with working page** (HeatExchangerPage.vue)
7. **Test with minimal data** first, then add complexity

### Quick Fixes

```javascript
// Fix constants not accessible in template
data() {
  return {
    // Add these lines
    PROJECT_ICON_NAMES,
    PROJECT_CATEGORIES,
    TECH_CATEGORIES,
    ROI_ICON_NAMES,
    // ... rest of data
  }
}

// Fix technology categories
technologies: [
  { name: "Vue.js", category: TECH_CATEGORIES.FRONTEND }, // ✅ Correct
  { name: "Vue.js", category: "frontend" }                // ❌ Wrong
]

// Fix component props
<ProjectOverview :icon-name="PROJECT_ICON_NAMES.PROJECT_OVERVIEW" /> // ✅ Correct
<ProjectOverview icon-name="project overview" />                      // ❌ Wrong

// Fix icons showing as text in Architecture Overview
// ❌ WRONG - Component using feature.name for icon resolution
getFeatureIconData(feature.name)

// ✅ CORRECT - Component using feature.icon for icon resolution  
getFeatureIconData(feature.icon)

// Data structure should be:
features: [
  {
    icon: 'web',           // ← This is used for icon resolution
    name: 'Angular SPA',   // ← This is used for display text
    description: '...'
  }
]
```

## 📚 Examples

### Complete Project Page Examples

- **`src/views/projects/HeatExchangerPage.vue`** - Full-featured example with all components
- **`src/views/projects/AirAsiaID90Page.vue`** - Standardized example with constants

### ✅ CORRECT Component Usage Examples

```vue
<!-- Technology Stack with constants -->
<TechnologyStack 
  title="Technology Stack"
  :icon-name="PROJECT_ICON_NAMES.TECHNOLOGY_STACK"
  :technologies="technologies"
/>

<!-- Project Overview with constants -->
<ProjectOverview 
  title="Project Overview"
  :icon-name="PROJECT_ICON_NAMES.PROJECT_OVERVIEW"
  :content="projectOverviewData.description"
/>

<!-- Project Info with constants -->
<ProjectInfo 
  title="Project Information"
  :icon-name="PROJECT_ICON_NAMES.PROJECT_INFORMATION"
  :category="PROJECT_CATEGORIES.ENTERPRISE_APPLICATIONS"
  client="Client Name"
  projectDate="2024"
  projectUrl="https://project.com"
  companySize="Enterprise"
/>

<!-- ROI Section with constants -->
<ROISection 
  mainTitle="Business Impact & Growth Metrics"
  :mainIcon="ROI_ICON_NAMES.MAIN_ICON"
  leftTitle="Financial Growth Impact"
  :leftIcon="ROI_ICON_NAMES.FINANCIAL_ICON"
  rightTitle="Operational Growth Impact"
  :rightIcon="ROI_ICON_NAMES.OPERATIONAL_ICON"
  metricsTitle="Growth Success Metrics"
  :metricsIcon="ROI_ICON_NAMES.SUCCESS_ICON"
  :leftItems="roiLeftItems"
  :rightItems="roiRightItems"
  :metrics="roiMetrics"
/>
```

### ❌ WRONG Component Usage Examples

```vue
<!-- Don't use emojis in titles -->
<TechnologyStack 
  :title="'🛠️ Technology Stack'"
  :technologies="techStackData"
/>

<!-- Don't hardcode icon names -->
<ProjectOverview 
  title="Project Overview"
  icon-name="project overview"
  :content="projectOverviewData.description"
/>

<!-- Don't hardcode categories -->
<ProjectInfo 
  title="Project Information"
  category="Enterprise Applications"
  client="Client Name"
/>
```

## 🎯 Complete Project Page Checklist

### ⚠️ CRITICAL: Standardization Checklist
- [ ] **Import constants** from `src/config/constants.js`
- [ ] **Expose constants** in data() function
- [ ] **Use TECH_CATEGORIES** for all technology categories
- [ ] **Use PROJECT_ICON_NAMES** for all component icons
- [ ] **Use PROJECT_CATEGORIES** for project categories
- [ ] **Use ROI_ICON_NAMES** for ROI section icons
- [ ] **No hardcoded strings** anywhere in the component

### 📁 File Structure Checklist
- [ ] Create project page file in `src/views/projects/`
- [ ] Add route to `src/router/index.js`
- [ ] Update navigation in `src/components/layout/Navigation.vue`
- [ ] Add project images to `public/assets/img/your-project/`

### 🎨 Component Checklist
- [ ] **ProjectHeroCard** - Title, description, tags, achievements
- [ ] **ProjectGallery** - Images with custom 3D carousel
- [ ] **ProjectOverview** - Project story with diamond bullets
- [ ] **TechnologyStack** - Technologies with proper categories
- [ ] **ProjectInfo** - Project metadata in sidebar
- [ ] **ROISection** - Business impact metrics

### 🎯 Data Structure Checklist
- [ ] **projectData** - Hero section data
- [ ] **galleryData** - Gallery images and title
- [ ] **technologies** - Array with TECH_CATEGORIES
- [ ] **projectOverviewData** - Formatted project story
- [ ] **roiLeftItems** - Financial growth impact (label/value pairs)
- [ ] **roiRightItems** - Operational growth impact (label/value pairs)
- [ ] **roiMetrics** - Success metrics (value/label/color objects)

### 🎨 Styling Checklist
- [ ] **Use utility classes** - txt-*, icon-* classes
- [ ] **No inline styles** - Use standardized classes
- [ ] **Proper alignment** - Icons and text on same line
- [ ] **Consistent spacing** - Follow established patterns

### 🧪 Testing Checklist
- [ ] **Page loads correctly** - No "footer only" issues
- [ ] **All icons display** - No missing icons or text
- [ ] **Responsive design** - Works on mobile and desktop
- [ ] **Navigation works** - Links and active states
- [ ] **No console errors** - Clean browser console
- [ ] **Constants accessible** - Template can access all constants

---

**🎉 That's it! You now have everything you need to add new project pages to your portfolio!**

**⚠️ Remember: The key to success is following the standardization rules exactly. Copy the patterns from the working examples and use constants for everything!**

The modular system makes it easy to create consistent, professional project pages with minimal effort. Just follow the template structure, use constants, and customize the content for your specific project.

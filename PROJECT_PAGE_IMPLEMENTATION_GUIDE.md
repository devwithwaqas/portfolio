# Project Page Implementation Guide

This guide ensures consistent and error-free implementation of new project pages, avoiding common pitfalls with icons, charts, and data structure.

## Table of Contents
1. [Icon Mapping Strategy](#icon-mapping-strategy)
2. [Chart Implementation Guide](#chart-implementation-guide)
3. [Data Structure Requirements](#data-structure-requirements)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [Common Issues & Solutions](#common-issues--solutions)

---

## Icon Mapping Strategy

### Overview
All icons should use existing mappings in `src/utils/iconResolver.js`. Never use generic fallback icons (like settings ⚙️).

### Step 1: Check Existing Icon Mappings
Before adding a new technology/icon, check if it already exists:

```javascript
// In src/utils/iconResolver.js, search for similar technologies
grep -i "technology-name" src/utils/iconResolver.js
```

### Step 2: Icon Naming Conventions

#### For Technology Stack
- Use exact technology names as they appear (e.g., "ASP.NET Core Web API", "Entity Framework Core")
- The resolver normalizes names (lowercase, removes special chars), so both formats work:
  - `"ASP.NET Core Web API"` → normalizes to `"asp net core web api"`
  - `"asp.net core web api"` → also works
  - Add both variations to ICON_MAP for reliability

#### For Architecture Layers & Features
- Use simple, lowercase icon names from existing mappings:
  - `'api'`, `'database'`, `'security'`, `'monitoring'`, `'performance'`
  - `'integration'`, `'services'`, `'portal'`, `'analytics'`
  - `'pwa'`, `'websocket'`, `'signalr'`, `'azure'`

### Step 3: Adding New Icon Mappings

When you need to add a new icon mapping to `src/utils/iconResolver.js`:

```javascript
// Add to ICON_MAP object with normalized key
const ICON_MAP = {
  // ... existing mappings
  
  // NEW MAPPING: Add both normalized and original versions
  'technology name normalized': { 
    type: 'devicon',        // or 'local'
    icon: 'icon-name',      // devicon name or local icon filename
    local: 'icon.svg',      // optional: local icon path (for devicon types)
    fallback: '🔷'          // emoji fallback
  },
  
  // Add original version too if it contains special characters
  'technology.name.original': { 
    type: 'devicon', 
    icon: 'icon-name', 
    local: 'icon.svg',
    fallback: '🔷' 
  }
}
```

### Step 4: Icon Types

1. **Devicon** (CDN): For popular technologies
   ```javascript
   { type: 'devicon', icon: 'angular', local: 'Angular.svg', fallback: '🅰️' }
   ```

2. **Local Icons**: For custom/project-specific icons
   ```javascript
   { type: 'local', icon: 'performance.png', fallback: '⚡' }
   ```

3. **Emoji Fallback**: Only as last resort
   ```javascript
   { type: 'emoji', src: '⚙️', alt: 'Technology' }
   ```

### Step 5: Icon Mapping Checklist

Before finalizing a project page:
- [ ] All technology stack items have icons mapped
- [ ] All architecture layer icons use existing mappings
- [ ] All feature icons use existing mappings
- [ ] No settings icons (⚙️) appearing anywhere
- [ ] Test icon resolution in browser console:
  ```javascript
  import { resolveIcon } from '@/utils/iconResolver'
  console.log(resolveIcon('Your Technology Name'))
  ```

### Common Icon Mappings Reference

```javascript
// .NET Technologies
'asp.net core web api' / 'asp net core web api'
'entity framework core' / 'entity framework'
'.net core' / 'net core'
'c#' / 'c sharp'

// Frontend
'angular' / 'angular 12+' / 'angular 12'
'typescript'
'bootstrap' / 'bootstrap 5'
'pwa' / 'progressive web app'
'chart.js'

// Backend
'sql server' / 'sql server database'
'redis'
'signalr'
'websocket'

// Cloud
'azure' / 'azure app service' / 'azure sql database' / 'azure blob storage'

// Security
'jwt'
'oauth' / 'oauth 2.0'
'ssl' / 'ssl/tls'
'pci dss' / 'pci dss compliance'

// Integration
'payment gateway integration'
'printer integration'
'barcode scanner' / 'barcode scanner support'
```

---

## Chart Implementation Guide

### Overview
All charts use Chart.js v4.5.0. Ensure proper structure, realistic data, and correct initialization.

### Step 1: Chart Data Structure

Each chart must have this structure:

```javascript
{
  id: 'uniqueChartId',           // REQUIRED: Unique ID for canvas element
  type: 'doughnut' | 'bar' | 'line' | 'polarArea',  // Chart type
  title: 'Chart Title',          // Display title
  icon: 'performance',           // Icon name (must exist in iconResolver)
  width: 'half' | 'full',        // Column width
  data: {                        // Chart.js data object
    labels: ['Label1', 'Label2'],
    datasets: [{
      // Dataset configuration
    }]
  },
  options: {                     // Chart.js options object
    responsive: true,
    maintainAspectRatio: false,
    // ... other options
  }
}
```

### Step 2: Chart Types & Use Cases

#### Doughnut Chart
**Use for**: Distribution, percentages, proportions
```javascript
{
  id: 'distributionChart',
  type: 'doughnut',
  title: 'System Performance Distribution',
  icon: 'performance',
  width: 'half',
  data: {
    labels: ['Category A', 'Category B', 'Category C'],
    datasets: [{
      data: [35, 30, 35],
      backgroundColor: ['#FFD700', '#4ECDC4', '#45B7D1'],
      borderWidth: 3,
      borderColor: '#ffffff',
      hoverOffset: 15
    }]
  },
  options: {
    cutout: '50%',
    radius: '90%',
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { /* tooltip config */ }
    },
    animation: { duration: 1500 }
  }
}
```

#### Bar Chart
**Use for**: Comparisons, metrics, performance scores
```javascript
{
  id: 'metricsChart',
  type: 'bar',
  title: 'Performance Metrics',
  icon: 'monitoring',
  width: 'half',
  data: {
    labels: ['Metric 1', 'Metric 2', 'Metric 3'],
    datasets: [{
      label: 'Performance Score (%)',
      data: [95, 88, 92],
      backgroundColor: 'rgba(78, 205, 196, 0.8)',
      borderColor: '#4ECDC4',
      borderWidth: 2,
      borderRadius: 8
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true, max: 100 },
      x: { /* x-axis config */ }
    }
  }
}
```

#### Line Chart
**Use for**: Trends over time, historical data
```javascript
{
  id: 'trendsChart',
  type: 'line',
  title: 'Performance Trends',
  icon: 'analytics',
  width: 'half',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Series 1',
      data: [100, 120, 115, 135, 140],
      borderColor: '#4ECDC4',
      backgroundColor: 'rgba(78, 205, 196, 0.1)',
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true }
    }
  }
}
```

#### Polar Area Chart
**Use for**: Multi-dimensional metrics, radar-style comparisons
```javascript
{
  id: 'multidimensionalChart',
  type: 'polarArea',
  title: 'Multi-Dimensional Performance',
  icon: 'performance',
  width: 'half',
  data: {
    labels: ['Dimension 1', 'Dimension 2', 'Dimension 3'],
    datasets: [{
      data: [85, 90, 88],
      backgroundColor: [
        'rgba(255, 107, 157, 0.7)',
        'rgba(78, 205, 196, 0.7)',
        'rgba(69, 183, 209, 0.7)'
      ]
    }]
  },
  options: {
    scales: {
      r: { beginAtZero: true, max: 100 }
    }
  }
}
```

### Step 3: Realistic Data Guidelines

#### Distribution Data (Doughnut/Pie)
- Should sum to meaningful total (100%, total count, etc.)
- Use meaningful categories relevant to the project
- Example: `[25, 20, 18, 15, 12, 10]` (sums to 100%)

#### Performance Metrics (Bar)
- Use realistic percentages (80-99% for good performance)
- Include relevant metrics for the project domain
- Example: `[98, 95, 92, 88, 90, 85, 93, 99]`

#### Time Series (Line)
- Show realistic growth/trend patterns
- Use appropriate time intervals (months, quarters, etc.)
- Example: `[12000, 13500, 15000, 16500, 18000, 19500]` (showing growth)

#### Multi-Dataset Comparisons
```javascript
datasets: [
  {
    label: 'Current Performance',
    data: [95, 88, 92],
    backgroundColor: 'rgba(78, 205, 196, 0.8)'
  },
  {
    label: 'Target Performance',
    data: [90, 85, 90],
    backgroundColor: 'rgba(156, 163, 175, 0.3)',
    borderDash: [5, 5]  // Dashed line for targets
  }
]
```

### Step 4: Color Palette

Use consistent color schemes:

```javascript
// Primary Colors
const colors = {
  primary: '#8B5CF6',      // Purple
  secondary: '#EC4899',    // Pink
  accent: '#4ECDC4',       // Teal
  success: '#22C55E',      // Green
  warning: '#FFD700',      // Gold
  info: '#45B7D1',         // Blue
  danger: '#FF6B9D'        // Rose
}

// Chart Color Arrays
const chartColors = [
  '#FFD700', '#4ECDC4', '#45B7D1', '#FF6B9D', 
  '#8B5CF6', '#22C55E', '#FFA500', '#4B5563'
]

// RGBA Variants (for transparency)
const chartColorsRGBA = [
  'rgba(255, 215, 0, 0.8)',    // Gold
  'rgba(78, 205, 196, 0.8)',   // Teal
  'rgba(69, 183, 209, 0.8)',   // Blue
  'rgba(255, 107, 157, 0.8)',  // Rose
  'rgba(139, 92, 246, 0.8)',   // Purple
  'rgba(34, 197, 94, 0.8)'     // Green
]
```

### Step 5: Chart Configuration Best Practices

#### Required Options
```javascript
options: {
  responsive: true,              // Always true
  maintainAspectRatio: false,    // Always false (we control height via CSS)
  interaction: { 
    mode: 'point' | 'index',     // Based on chart type
    intersect: false 
  },
  plugins: {
    legend: {
      position: 'bottom' | 'top',
      labels: {
        usePointStyle: true,
        padding: 15,
        font: { size: 12, weight: '500' },
        color: '#374151'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: 'rgba(139, 92, 246, 0.5)',
      padding: 12,
      displayColors: true
    }
  },
  animation: {
    duration: 1500,              // Smooth animation
    easing: 'easeInOutQuart'
  }
}
```

#### Scales Configuration
```javascript
scales: {
  y: {
    beginAtZero: true,           // Usually true for bar/line charts
    max: 100,                    // If showing percentages
    grid: { color: 'rgba(0, 0, 0, 0.1)' },
    ticks: { color: '#6B7280', font: { size: 11 } }
  },
  x: {
    grid: { display: false },    // Usually hide x-axis grid
    ticks: { color: '#6B7280', font: { size: 10 } }
  },
  r: {                          // For polar area charts
    beginAtZero: true,
    max: 100,
    ticks: { display: false }
  }
}
```

### Step 6: Chart ID Naming Convention

Use descriptive, unique IDs:
- Format: `{projectPrefix}{ChartType}Chart`
- Examples:
  - `g5POSPerformanceChart`
  - `orderProcessingChart`
  - `systemLoadChart`
  - `metricsChart`

### Step 7: Chart Implementation Checklist

- [ ] Each chart has unique ID
- [ ] Chart type matches data structure
- [ ] Data values are realistic and relevant
- [ ] Colors follow palette guidelines
- [ ] Required options are included
- [ ] Icon name exists in iconResolver
- [ ] Width is set ('half' or 'full')
- [ ] Chart title is descriptive
- [ ] Test chart renders in browser

---

## Data Structure Requirements

### Technology Stack Array

```javascript
const technologies = ref([
  {
    name: "Technology Name",           // Exact technology name
    description: "Brief description",  // What it does
    category: TECH_CATEGORIES.BACKEND  // Category constant
  }
])
```

**Categories Available:**
- `TECH_CATEGORIES.FRONTEND`
- `TECH_CATEGORIES.BACKEND`
- `TECH_CATEGORIES.DATABASE`
- `TECH_CATEGORIES.CLOUD`
- `TECH_CATEGORIES.DEVOPS`
- `TECH_CATEGORIES.MONITORING`
- `TECH_CATEGORIES.ANALYTICS`
- `TECH_CATEGORIES.API`
- `TECH_CATEGORIES.SECURITY`
- `TECH_CATEGORIES.COMMUNICATION`
- `TECH_CATEGORIES.INTEGRATION`
- `TECH_CATEGORIES.TESTING`

### Performance Stats Array

```javascript
const performanceStats = ref([
  {
    value: '98%',                    // Display value
    label: 'Uptime',                 // Metric label
    color: 'green'                   // Stat card color
  }
])
```

**Color Options:**
- `green`, `purple`, `pink`, `blue`, `orange`, `teal`, `indigo`, `red`, `yellow`, `cyan`

### Performance Charts Array

See [Chart Implementation Guide](#chart-implementation-guide) above.

---

## Step-by-Step Implementation

### Phase 1: Preparation

1. **Review Existing Project Pages**
   - Check `SmartCityPage.vue` or `G5POSPage.vue` for structure
   - Note component usage patterns
   - Review data structures

2. **Gather Project Information**
   - **Primary Source**: Check `c:\inetpub\portfolio` for project content, documentation, images, and details
   - Technology stack
   - Architecture details
   - Performance metrics
   - Key features
   - Challenges & solutions
   - Project descriptions and narratives
   - Gallery images
   - Any existing documentation or specifications

3. **Plan Icon Mappings**
   - List all technologies
   - Check existing mappings
   - Identify needed additions

### Phase 2: Icon Mapping

1. **Add Icon Mappings** (if needed)
   ```bash
   # Edit src/utils/iconResolver.js
   # Add normalized and original versions
   ```

2. **Test Icon Resolution**
   ```javascript
   // In browser console
   import { resolveIcon } from '@/utils/iconResolver'
   resolveIcon('Your Technology Name')
   ```

### Phase 3: Component Setup

1. **Create Project Page Component**
   ```bash
   # Option 1: Copy the starter template
   cp PROJECT_PAGE_TEMPLATE.vue src/views/projects/YourProjectPage.vue
   
   # Option 2: Copy from existing project page
   cp src/views/projects/G5POSPage.vue src/views/projects/YourProjectPage.vue
   ```
   
   **Note**: All project pages use the existing `ProjectPageTemplate` component (located in `src/components/common/ProjectPageTemplate.vue`). The starter template (`PROJECT_PAGE_TEMPLATE.vue`) is a boilerplate showing how to structure your page using this component.

2. **Import Required Components**
   ```javascript
   import ProjectPageTemplate from '@/components/projects/ProjectPageTemplate.vue'
   import ProjectHeroCard from '@/components/projects/ProjectHeroCard.vue'
   import TechnologyStack from '@/components/projects/TechnologyStack.vue'
   import PerformanceMetricsSection from '@/components/projects/PerformanceMetricsSection.vue'
   // ... other components
   ```

3. **Set Up Route**
   ```javascript
   // In src/router/index.js
   {
     path: '/projects/your-project',
     name: 'YourProject',
     component: () => import('../views/projects/YourProjectPage.vue')
   }
   ```

### Phase 4: Data Population

1. **Project Hero Data**
   - Title, description, tags
   - Achievements (2 columns)

2. **Technology Stack**
   - Use existing icon mappings
   - Categorize properly

3. **Performance Stats**
   - 4-8 meaningful metrics
   - Realistic values

4. **Performance Charts**
   - 4-9 charts (mix of types)
   - Realistic, relevant data
   - Proper IDs and configuration

5. **Other Sections**
   - Architecture layers
   - Engineering challenges
   - ROI metrics
   - Metrics framework

### Phase 5: Testing

1. **Icon Verification**
   - [ ] All icons display correctly
   - [ ] No settings icons (⚙️)
   - [ ] Icons match technologies

2. **Chart Verification**
   - [ ] All charts render
   - [ ] Data displays correctly
   - [ ] Charts are responsive
   - [ ] No console errors

3. **Content Verification**
   - [ ] No placeholder text
   - [ ] All sections populated
   - [ ] No leftover content from other projects

4. **Browser Testing**
   - [ ] Test in Chrome
   - [ ] Test responsive design
   - [ ] Check console for errors

---

## Common Issues & Solutions

### Issue 1: Icons Showing Settings Icon (⚙️)

**Cause**: Technology name not mapped in iconResolver

**Solution**:
1. Check exact technology name
2. Add mapping to `src/utils/iconResolver.js`
3. Add both normalized and original versions
4. Test icon resolution

**Example**:
```javascript
// If "ASP.NET Core Web API" shows ⚙️
// Add both:
'asp net core web api': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
'asp.net core web api': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
```

### Issue 2: Charts Not Showing

**Cause**: Canvas elements not found or initialization timing issue

**Solution**:
1. Ensure each chart has unique `id`
2. Check browser console for errors
3. Verify chart data structure is correct
4. Ensure Chart.js is imported correctly

**Debug Steps**:
```javascript
// In browser console
document.getElementById('yourChartId')  // Should return canvas element
```

### Issue 3: Chart Data Not Displaying

**Cause**: Incorrect data structure or missing required properties

**Solution**:
1. Verify `data.labels` is an array
2. Verify `data.datasets` is an array
3. Ensure datasets have `data` property
4. Check chart type matches data structure

### Issue 4: Icons Not Resolving in Architecture Layers

**Cause**: Using incorrect icon name format

**Solution**:
- Use simple, lowercase icon names from existing mappings
- Don't use full technology names
- Examples: `'api'`, `'database'`, `'security'`, not `'ASP.NET Core Web API'`

### Issue 5: Performance Stats Not Displaying

**Cause**: Incorrect color value

**Solution**:
- Use only valid color names: `green`, `purple`, `pink`, `blue`, `orange`, `teal`, `indigo`, `red`, `yellow`, `cyan`
- Check spelling

### Issue 6: Charts Rendering with Wrong Dimensions

**Cause**: Missing CSS or incorrect options

**Solution**:
- Ensure `maintainAspectRatio: false` in options
- Verify `.chart-canvas-wrapper` has height set
- Check responsive classes are applied

---

## Quick Reference Checklist

### Before Starting
- [ ] Reviewed existing project pages
- [ ] Gathered all project information
- [ ] Planned icon mappings
- [ ] Planned chart structure

### During Implementation
- [ ] Created component file
- [ ] Added route
- [ ] Imported all components
- [ ] Populated all data sections
- [ ] Added icon mappings (if needed)
- [ ] Created charts with realistic data

### Before Completion
- [ ] All icons display correctly
- [ ] All charts render properly
- [ ] No console errors
- [ ] No placeholder content
- [ ] Responsive design works
- [ ] Content is project-specific

---

## File Locations

- **Icon Resolver**: `src/utils/iconResolver.js`
- **Project Components**: `src/components/projects/`
- **Project Pages**: `src/views/projects/`
- **Router Config**: `src/router/index.js`
- **Constants**: `src/config/constants.js`

---

## Additional Resources

- **Chart.js Documentation**: https://www.chartjs.org/docs/latest/
- **Devicon Icons**: https://devicon.dev/
- **Existing Project Examples**:
  - `src/views/projects/SmartCityPage.vue`
  - `src/views/projects/G5POSPage.vue`
  - `src/views/projects/BATInhouseAppPage.vue`

---

**Last Updated**: Based on G5 POS implementation
**Version**: 1.0


## Diagram Generation

For diagram generation issues and the working method, see **DIAGRAM_GENERATION_FIX.md**. This document provides the correct PowerShell script using POST with text/plain content type (NOT JSON) to successfully generate SVGs from PlantUML files using Kroki.io.

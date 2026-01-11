# 🎯 Project Setup Guide - Complete Reference

## 📋 **CRITICAL: Always Consult This Guide Before Creating New Project Pages**

### 🚨 **Common Issues to Avoid:**
- ❌ **Component Import Errors**: Using non-existent component names
- ❌ **Props Mismatch**: Passing wrong props to components
- ❌ **Missing Components**: Trying to use components that don't exist
- ❌ **Router Issues**: Incorrect route configuration

---

## 🏗️ **Available Project Components & Their Props**

### **1. ProjectHeroCard**
**File**: `src/components/projects/ProjectHeroCard.vue`
**Props**:
```javascript
{
  title: String (required),
  description: String (required),
  tags: Array (required),
  achievementsCol1: Array (required),
  achievementsCol2: Array (required)
}
```
**Example**:
```vue
<ProjectHeroCard
  title="Your Project Name"
  description="Project description here"
  :tags="['Enterprise', 'Microservices', 'Azure']"
  :achievementsCol1="[
    { icon: 'enterprise', text: 'Enterprise Scale' },
    { icon: 'realtime', text: 'Real-time Processing' }
  ]"
  :achievementsCol2="[
    { icon: 'automation', text: 'Automation' },
    { icon: 'analytics', text: 'Analytics' }
  ]"
/>
```

### **2. ProjectGallery**
**File**: `src/components/projects/ProjectGallery.vue`
**Props**:
```javascript
{
  images: Array (required),
  title: String (optional),
  subtitle: String (optional)
}
```
**Example**:
```vue
<ProjectGallery
  :images="galleryImages"
  title="Project Gallery"
  subtitle="Project screenshots and diagrams"
/>
```

### **3. TechnologyStack**
**File**: `src/components/projects/TechnologyStack.vue`
**Props**:
```javascript
{
  technologies: Array (required),
  title: String (optional),
  subtitle: String (optional)
}
```
**Example**:
```vue
<TechnologyStack
  :technologies="technologyStack"
  title="Technology Stack"
  subtitle="Technologies and frameworks used"
/>
```

### **4. ProjectInfo**
**File**: `src/components/projects/ProjectInfo.vue`
**Props**:
```javascript
{
  projectInfo: Object (required),
  title: String (optional),
  subtitle: String (optional)
}
```
**Example**:
```vue
<ProjectInfo
  :projectInfo="projectInformation"
  title="Project Information"
  subtitle="Project details and specifications"
/>
```

### **5. ProjectOverview**
**File**: `src/components/projects/ProjectOverview.vue`
**Props**:
```javascript
{
  architecture: Object (required),
  title: String (optional),
  subtitle: String (optional)
}
```
**Example**:
```vue
<ProjectOverview
  :architecture="architectureDetails"
  title="Project Architecture"
  subtitle="System architecture and design"
/>
```

### **6. EngineeringChallenges**
**File**: `src/components/projects/EngineeringChallenges.vue`
**Props**:
```javascript
{
  challenges: Array (required),
  title: String (optional),
  subtitle: String (optional)
}
```
**Example**:
```vue
<EngineeringChallenges
  :challenges="engineeringChallenges"
  title="Engineering Challenges"
  subtitle="Technical problems and solutions"
/>
```

### **7. PerformanceMetricsSection**
**File**: `src/components/projects/PerformanceMetricsSection.vue`
**Props**:
```javascript
{
  metrics: Object (required),
  title: String (optional),
  subtitle: String (optional)
}
```
**Example**:
```vue
<PerformanceMetricsSection
  :metrics="performanceMetrics"
  title="Performance Metrics"
  subtitle="System performance achievements"
/>
```

---

## 🚀 **Step-by-Step Project Page Creation**

### **Step 1: Create Project Page File**
```bash
# Copy from existing project page
cp src/views/projects/HeatExchangerPage.vue src/views/projects/YourProjectPage.vue
```

### **Step 2: Update Router**
**File**: `src/router/index.js`
```javascript
{
  path: '/projects/your-project',
  name: 'YourProject',
  component: () => import('../views/projects/YourProjectPage.vue')
}
```

### **Step 3: Update Component Imports**
```javascript
// CORRECT imports (use these exact names)
import ProjectHeroCard from '../../components/projects/ProjectHeroCard.vue'
import ProjectGallery from '../../components/projects/ProjectGallery.vue'
import TechnologyStack from '../../components/projects/TechnologyStack.vue'
import ProjectInfo from '../../components/projects/ProjectInfo.vue'
import ProjectOverview from '../../components/projects/ProjectOverview.vue'
import EngineeringChallenges from '../../components/projects/EngineeringChallenges.vue'
import PerformanceMetricsSection from '../../components/projects/PerformanceMetricsSection.vue'
```

### **Step 4: Update Components Object**
```javascript
components: {
  ProjectHeroCard,
  ProjectGallery,
  TechnologyStack,
  ProjectInfo,
  ProjectOverview,
  EngineeringChallenges,
  PerformanceMetricsSection
}
```

### **Step 5: Update Template with Correct Props**
```vue
<template>
  <div class="your-project-page">
    <!-- Project Hero Card -->
    <ProjectHeroCard
      title="Your Project Name"
      description="Project description"
      :tags="['Tag1', 'Tag2', 'Tag3']"
      :achievementsCol1="achievementsCol1"
      :achievementsCol2="achievementsCol2"
    />

    <!-- Project Gallery -->
    <ProjectGallery
      :images="galleryImages"
      title="Project Gallery"
      subtitle="Project screenshots"
    />

    <!-- Technology Stack -->
    <TechnologyStack
      :technologies="technologyStack"
      title="Technology Stack"
      subtitle="Technologies used"
    />

    <!-- Project Information -->
    <ProjectInfo
      :projectInfo="projectInformation"
      title="Project Information"
      subtitle="Project details"
    />

    <!-- Project Architecture -->
    <ProjectOverview
      :architecture="architectureDetails"
      title="Project Architecture"
      subtitle="System architecture"
    />

    <!-- Engineering Challenges -->
    <EngineeringChallenges
      :challenges="engineeringChallenges"
      title="Engineering Challenges"
      subtitle="Technical challenges"
    />

    <!-- Performance Metrics -->
    <PerformanceMetricsSection
      :metrics="performanceMetrics"
      title="Performance Metrics"
      subtitle="Performance achievements"
    />
  </div>
</template>
```

---

## 📊 **Data Structure Templates**

### **Gallery Images**
```javascript
galleryImages: [
  {
    src: '/assets/img/project1.jpg',
    alt: 'Project Screenshot 1',
    title: 'Main Dashboard',
    description: 'Project main interface'
  }
]
```

### **Technology Stack**
```javascript
technologyStack: [
  {
    category: 'Backend Technologies',
    technologies: [
      { name: '.NET Core', icon: 'icon-url', level: 'Expert' }
    ]
  }
]
```

### **Project Information**
```javascript
projectInformation: {
  client: 'Client Name',
  industry: 'Industry',
  projectType: 'Project Type',
  duration: 'Duration',
  teamSize: 'Team Size',
  myRole: 'Your Role',
  technologies: ['Tech1', 'Tech2'],
  keyFeatures: ['Feature1', 'Feature2'],
  challenges: ['Challenge1', 'Challenge2'],
  achievements: ['Achievement1', 'Achievement2']
}
```

### **Architecture Details**
```javascript
architectureDetails: {
  overview: 'Architecture overview',
  components: [
    {
      name: 'Component Name',
      description: 'Component description',
      technologies: ['Tech1', 'Tech2']
    }
  ],
  dataFlow: 'Data flow description',
  security: 'Security measures',
  scalability: 'Scalability features'
}
```

### **Engineering Challenges**
```javascript
engineeringChallenges: [
  {
    title: 'Challenge Title',
    description: 'Challenge description',
    solution: 'Solution implemented',
    technologies: ['Tech1', 'Tech2'],
    impact: 'Impact achieved'
  }
]
```

### **Performance Metrics**
```javascript
performanceMetrics: {
  overview: 'Performance overview',
  metrics: [
    {
      category: 'Performance',
      metrics: [
        { name: 'Response Time', value: '< 200ms', improvement: '60% faster' }
      ]
    }
  ],
  optimizations: ['Optimization1', 'Optimization2']
}
```

---

## ⚠️ **Common Mistakes to Avoid**

### **❌ Wrong Component Names**
```javascript
// WRONG - These components don't exist
import ProjectInformation from '../../components/projects/ProjectInformation.vue'
import ProjectArchitecture from '../../components/projects/ProjectArchitecture.vue'
import PerformanceMetrics from '../../components/projects/PerformanceMetrics.vue'

// CORRECT - Use these exact names
import ProjectInfo from '../../components/projects/ProjectInfo.vue'
import ProjectOverview from '../../components/projects/ProjectOverview.vue'
import PerformanceMetricsSection from '../../components/projects/PerformanceMetricsSection.vue'
```

### **❌ Wrong Props**
```vue
<!-- WRONG - These props don't exist -->
<ProjectHeroCard
  projectTitle="Project Name"
  bannerImage="/assets/img/image.jpg"
  techStack="Tech Stack"
/>

<!-- CORRECT - Use these exact props -->
<ProjectHeroCard
  title="Project Name"
  description="Project description"
  :tags="['Tag1', 'Tag2']"
  :achievementsCol1="achievementsCol1"
  :achievementsCol2="achievementsCol2"
/>
```

### **❌ Missing Components**
```javascript
// WRONG - These components don't exist
import ProjectInformation from '../../components/projects/ProjectInformation.vue'
import ProjectArchitecture from '../../components/projects/ProjectArchitecture.vue'

// CORRECT - Use existing components
import ProjectInfo from '../../components/projects/ProjectInfo.vue'
import ProjectOverview from '../../components/projects/ProjectOverview.vue'
```

---

## 🔍 **Troubleshooting**

### **Error: "Failed to fetch dynamically imported module"**
- **Cause**: Component import errors or missing components
- **Solution**: Check component names and imports against this guide

### **Error: "Property 'X' is not defined"**
- **Cause**: Wrong prop names or missing data
- **Solution**: Check props against component definitions in this guide

### **Error: "Component not found"**
- **Cause**: Using non-existent component names
- **Solution**: Use exact component names from this guide

---

## 📝 **Quick Reference Checklist**

Before creating a new project page, ensure:

- [ ] **Component names** match exactly (case-sensitive)
- [ ] **Props** match component definitions
- [ ] **Data structure** follows templates
- [ ] **Router** is updated correctly
- [ ] **Imports** use correct paths
- [ ] **Template** uses correct component names
- [ ] **Data** is properly structured

---

## 🎯 **Remember: Always Consult This Guide First!**

This guide contains all the correct component names, props, and data structures. **DO NOT** create project pages without consulting this guide first. It will save time and prevent errors.

**Last Updated**: January 2025
**Version**: 1.0

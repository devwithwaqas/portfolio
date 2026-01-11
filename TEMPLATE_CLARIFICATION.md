# Template Clarification

## Two Different Templates

There are **two different templates** in this project, serving different purposes:

### 1. ProjectPageTemplate Component (Already Exists)
**Location**: `src/components/common/ProjectPageTemplate.vue`

This is the **actual reusable component** that provides the layout structure for all project pages. It:
- Defines the page layout (hero, gallery, main content, sidebar)
- Provides slots for content injection
- Handles breadcrumbs and container structure
- Is used by ALL existing project pages (AirAsia, G5POS, SmartCity, BAT, HeatExchanger)

**Usage in project pages:**
```vue
<template>
  <ProjectPageTemplate projectTitle="Your Project">
    <template #hero>...</template>
    <template #gallery>...</template>
    <template #main-content-top>...</template>
    <template #sidebar>...</template>
    <template #main-content-bottom>...</template>
  </ProjectPageTemplate>
</template>
```

### 2. PROJECT_PAGE_TEMPLATE.vue (Starter/Boilerplate File)
**Location**: Root directory `PROJECT_PAGE_TEMPLATE.vue`

This is a **starter file/boilerplate** that shows developers how to structure a NEW project page. It:
- Provides a complete example of how to use ProjectPageTemplate
- Shows all required data structures
- Includes comments and placeholders
- Should be copied and customized for new projects

**Purpose**: When creating a new project page, copy this file to use as a starting point.

---

## How They Work Together

```
┌─────────────────────────────────────────┐
│  PROJECT_PAGE_TEMPLATE.vue              │  ← Starter/Boilerplate
│  (Root directory)                       │     (Copy this to create new page)
└─────────────────┬───────────────────────┘
                  │
                  │ Copy & customize
                  ↓
┌─────────────────────────────────────────┐
│  src/views/projects/YourProjectPage.vue │  ← Your new project page
│                                         │
│  <ProjectPageTemplate>                  │
│    <template #hero>...</template>       │
│    ...                                  │
│  </ProjectPageTemplate>                 │
└─────────────────┬───────────────────────┘
                  │
                  │ Uses
                  ↓
┌─────────────────────────────────────────┐
│  src/components/common/                 │
│    ProjectPageTemplate.vue              │  ← Reusable layout component
│                                         │     (Already exists, don't modify)
└─────────────────────────────────────────┘
```

---

## Creating a New Project Page

### Step 1: Copy the Starter Template
```bash
cp PROJECT_PAGE_TEMPLATE.vue src/views/projects/YourProjectPage.vue
```

### Step 2: Customize Your Project Page
- Replace "YourProject" with your actual project name
- Populate all data sections
- The starter template already uses `ProjectPageTemplate` correctly

### Step 3: Add Route
```javascript
// In src/router/index.js
{
  path: '/projects/your-project',
  name: 'YourProject',
  component: () => import('../views/projects/YourProjectPage.vue')
}
```

---

## What NOT to Do

❌ **Don't modify** `src/components/common/ProjectPageTemplate.vue`  
✅ **Do modify** your project page file after copying from the starter template

❌ **Don't create** a new ProjectPageTemplate component  
✅ **Do use** the existing ProjectPageTemplate component in your project page

---

## Examples

All existing project pages follow this pattern:

- `src/views/projects/AirAsiaID90Page.vue` - Uses ProjectPageTemplate
- `src/views/projects/G5POSPage.vue` - Uses ProjectPageTemplate  
- `src/views/projects/SmartCityPage.vue` - Uses ProjectPageTemplate
- `src/views/projects/BATInhouseAppPage.vue` - Uses ProjectPageTemplate

They all import and use:
```javascript
import ProjectPageTemplate from '@/components/common/ProjectPageTemplate.vue'
```

---

## Summary

- **ProjectPageTemplate.vue** (in components/common) = The reusable layout component (already exists)
- **PROJECT_PAGE_TEMPLATE.vue** (root directory) = Starter file showing how to create a new page (copy this)

The starter template is just a helper file to make it easier to create new project pages following the correct structure.

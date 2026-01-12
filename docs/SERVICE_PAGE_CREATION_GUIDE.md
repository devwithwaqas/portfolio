# 📚 Service Page Creation Guide

Complete guide for creating new service pages in this portfolio template. This guide shows how to create professional service detail pages with components, content, and images.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Creation](#step-by-step-creation)
4. [Component Reference](#component-reference)
5. [Content Structure](#content-structure)
6. [Image Management](#image-management)
7. [Common Issues & Solutions](#common-issues--solutions)
8. [Best Practices](#best-practices)

---

## 🚀 Quick Start

**Fastest way to create a new service page:**

1. **Copy existing service page:**
   ```bash
   cp src/views/services/FullStackDevelopmentPage.vue src/views/services/YourServicePage.vue
   ```

2. **Add route in `src/router/index.js`:**
   ```javascript
   {
     path: '/services/your-service',
     name: 'YourService',
     component: () => import('../views/services/YourServicePage.vue')
   }
   ```

3. **Update the page with your service data**

4. **Add images to `public/assets/img/services/`**

5. **Update home page services link**

6. **Test in browser**

**Estimated Time:** 1-2 hours for complete page with all sections

---

## ✅ Prerequisites

Before creating a new service page, ensure you have:

- [ ] Service description and details
- [ ] Service capabilities/offerings list
- [ ] Technology stack (if applicable)
- [ ] Process/timeline information
- [ ] Service images (hero, process, CTA, carousel images)
- [ ] FAQ questions and answers
- [ ] Case studies/references (optional)

---

## 📝 Step-by-Step Creation

### Step 1: Copy Template File

```bash
# Copy from FullStackDevelopmentPage (complete example)
cp src/views/services/FullStackDevelopmentPage.vue src/views/services/YourServicePage.vue
```

### Step 2: Add Router Entry

**File:** `src/router/index.js`

```javascript
{
  path: '/services/your-service',
  name: 'YourService',
  component: () => import('../views/services/YourServicePage.vue')
}
```

### Step 3: Update Component Imports

Ensure all component imports are correct:

```javascript
import ServiceHeroSection from '../../components/services/ServiceHeroSection.vue'
import ServiceOverview from '../../components/services/ServiceOverview.vue'
import ServiceCapabilities from '../../components/services/ServiceCapabilities.vue'
import ServiceProcess from '../../components/services/ServiceProcess.vue'
import TechnologyStack from '../../components/projects/TechnologyStack.vue'
import ServiceCaseStudies from '../../components/services/ServiceCaseStudies.vue'
import ServiceFAQ from '../../components/services/ServiceFAQ.vue'
import ServiceCTA from '../../components/services/ServiceCTA.vue'
```

### Step 4: Standard Component Order

**CRITICAL:** Always follow this exact order in your service pages:

1. **ServiceHeroSection** - Hero section with title, tagline, key benefits
2. **ServiceOverview** - What the service is, who it's for, value propositions
3. **ServiceCapabilities** - Capabilities and offerings
4. **ServiceProcess** - Process steps, timeline, engagement models
5. **TechnologyStack** - Technology stack (if applicable)
6. **ServiceCaseStudies** - Related project examples
7. **ServiceFAQ** - Frequently asked questions
8. **ServiceCTA** - Call-to-action section

### Step 5: Populate Service Data

Update all data sections in your page:

- Service title, tagline, description
- Hero benefits
- Overview content (what, who, value)
- Capabilities list
- Process steps
- Technology stack
- Case studies
- FAQ items
- CTA content

### Step 6: Add Service Images

**Directory:** `public/assets/img/services/`

**Required images:**
- `your-service-hero.jpg` - Hero section image
- `your-service-process.jpg` - Process section image
- `your-service-cta.jpg` - CTA section image
- `your-service-banner-1.jpg` - Carousel image 1
- `your-service-banner-2.jpg` - Carousel image 2
- `your-service-banner-3.jpg` - Carousel image 3

**Image Sources:**
- **Unsplash** (unsplash.com) - Free, high-quality images
- **Pexels** (pexels.com) - Free stock photos

**Image Guidelines:**
- Use relevant, professional images
- Avoid: datacenters, people sitting alone, couples, money handshakes
- Use: Tech/code images, team collaboration, IT infrastructure
- Ensure carousel images are unique (no duplicates)

### Step 7: Update Home Page Link

**File:** `src/components/home/Services.vue`

Add or update service card link:

```vue
<router-link to="/services/your-service" class="service-item item-[color]">
  <!-- Service card content -->
</router-link>
```

### Step 8: Test & Verify

- [ ] Page loads without errors
- [ ] All icons display correctly
- [ ] All images load
- [ ] Navigation works
- [ ] Responsive design works
- [ ] No console errors

---

## 🧩 Component Reference

### ServiceHeroSection

**File:** `src/components/services/ServiceHeroSection.vue`

**Props:**
```javascript
{
  iconName: String (required),  // Service icon name
  tagline: String (required),   // Service tagline
  heroBenefits: Array (required)  // [{ icon, label, value }]
}
```

**Example:**
```vue
<ServiceHeroSection
  icon-name="full stack development"
  tagline="End-to-end development of enterprise applications"
  :hero-benefits="[
    { icon: 'vue', label: 'Flexible Frontend', value: 'Vue • React • Angular' },
    { icon: 'backend', label: 'Robust Backend', value: '.NET Core' },
    { icon: 'cloud', label: 'Cloud Ready', value: 'Azure' }
  ]"
/>
```

### ServiceOverview

**Props:**
```javascript
{
  content: Object (required)  // { what, who, value, useCases }
}
```

### ServiceCapabilities

**Props:**
```javascript
{
  capabilities: Array (required)  // [{ icon, name, description }]
}
```

### ServiceProcess

**Props:**
```javascript
{
  steps: Array (required),  // [{ step, title, description, duration }]
  timeline: String (optional),
  engagementModels: Array (optional)
}
```

### TechnologyStack

**Reused from projects** - Same component as project pages

**Props:**
```javascript
{
  technologies: Array (required),  // [{ name, description, category }]
  title: String (optional),
  columnsPerRow: Number (optional, default: 2)
}
```

### ServiceCaseStudies

**Props:**
```javascript
{
  caseStudies: Array (required)  // [{ project, link, description, metrics }]
}
```

### ServiceFAQ

**Props:**
```javascript
{
  faqItems: Array (required)  // [{ question, answer }]
}
```

### ServiceCTA

**Props:**
```javascript
{
  ctaText: String (required),
  ctaButtonText: String (optional),
  showContactForm: Boolean (optional, default: false)
}
```

---

## 📄 Content Structure

### Hero Section Data

```javascript
const heroData = {
  iconName: 'your-service-icon',
  tagline: 'Your service tagline here',
  heroBenefits: [
    { icon: 'icon1', label: 'Benefit 1', value: 'Value 1' },
    { icon: 'icon2', label: 'Benefit 2', value: 'Value 2' },
    { icon: 'icon3', label: 'Benefit 3', value: 'Value 3' }
  ]
}
```

### Overview Content

```javascript
const overviewContent = {
  what: 'Description of what the service is',
  who: 'Description of who needs this service',
  value: [
    'Value proposition 1',
    'Value proposition 2',
    'Value proposition 3'
  ],
  useCases: [
    'Use case 1',
    'Use case 2',
    'Use case 3'
  ]
}
```

### Capabilities

```javascript
const capabilities = [
  {
    icon: 'capability-icon',
    name: 'Capability Name',
    description: 'Detailed description of capability'
  }
  // ... more capabilities
]
```

### Process Steps

```javascript
const processSteps = [
  {
    step: 1,
    title: 'Step Title',
    description: 'Step description',
    duration: '1-2 weeks'
  }
  // ... more steps
]
```

### Technology Stack

```javascript
const technologies = [
  {
    name: 'Technology Name',
    description: 'Technology description',
    category: TECH_CATEGORIES.BACKEND  // Use constants from constants.js
  }
  // ... more technologies
]
```

### FAQ Items

```javascript
const faqItems = [
  {
    question: 'FAQ Question?',
    answer: 'FAQ Answer'
  }
  // ... more FAQ items
]
```

---

## 🖼️ Image Management

### Image Naming Convention

**Format:** `[service-name]-[section].jpg`

**Examples:**
- `full-stack-hero.jpg`
- `full-stack-process.jpg`
- `full-stack-cta.jpg`
- `full-stack-banner-1.jpg`
- `full-stack-banner-2.jpg`
- `full-stack-banner-3.jpg`

### Image Placement

**Directory:** `public/assets/img/services/`

**Usage in components:**
```javascript
heroImage: '/assets/img/services/your-service-hero.jpg',
processImage: '/assets/img/services/your-service-process.jpg',
ctaImage: '/assets/img/services/your-service-cta.jpg',
bannerImages: [
  '/assets/img/services/your-service-banner-1.jpg',
  '/assets/img/services/your-service-banner-2.jpg',
  '/assets/img/services/your-service-banner-3.jpg'
]
```

### Image Guidelines

1. **Hero Images:**
   - High-quality, relevant to service
   - Avoid: Datacenters, generic space images
   - Use: Tech/code images, service-specific visuals

2. **Process Images:**
   - Related to process/workflow
   - Avoid: People sitting alone, money handshakes
   - Use: Team collaboration, workflow diagrams

3. **Carousel/Banner Images:**
   - Unique, relevant images
   - Avoid: Duplicates, irrelevant content
   - Use: Service-specific, professional images

4. **CTA Images:**
   - Call-to-action appropriate
   - Professional, engaging

---

## ⚠️ Common Issues & Solutions

### Icons Not Showing

**Problem:** Icon mapping missing

**Solution:**
1. Check `src/utils/iconResolver.js` for mapping
2. Add mapping for your service/capability icon
3. Use existing icon names when possible

### Images Not Loading

**Problem:** Incorrect image path

**Solution:**
1. Verify image is in `public/assets/img/services/`
2. Check path in component (should start with `/assets/img/services/`)
3. Ensure image filename matches exactly (case-sensitive)

### Service Card Not Linking

**Problem:** Router link not configured

**Solution:**
1. Check `src/components/home/Services.vue`
2. Ensure `router-link` has correct `to` path
3. Verify route exists in `src/router/index.js`
4. Remove any conflicting `<a>` tags with `stretched-link` class

### Navigation Highlighting Wrong

**Problem:** Active section not set correctly

**Solution:**
1. Check `src/components/layout/Navigation.vue`
2. Ensure `setActiveSectionFromRoute()` handles service routes
3. Verify route path matches navigation check

---

## ✅ Best Practices

1. **Follow standard component order** - Maintains consistency
2. **Use relevant, professional images** - Better user experience
3. **Ensure images are unique** - Avoid duplicates in carousel
4. **Use constants from `src/config/constants.js`** - Standardized values
5. **Write clear, concise content** - Better readability
6. **Test in browser frequently** - Catch errors early
7. **Verify responsive design** - Test on mobile/tablet
8. **Check console for errors** - Fix issues before finishing
9. **Use existing icon mappings** - Avoids generic fallback icons
10. **Keep FAQ answers helpful** - Address common questions

---

## 📖 Additional Resources

- **SERVICES_PAGES_IMPLEMENTATION_PLAN.md** - Detailed implementation plan
- **FullStackDevelopmentPage.vue** - Complete example reference
- **src/utils/iconResolver.js** - Icon mapping reference
- **src/config/constants.js** - Constants reference

---

## 🎯 Quick Reference Checklist

- [ ] Copied template file
- [ ] Added router entry
- [ ] Updated component imports
- [ ] Followed standard component order
- [ ] Populated all service data
- [ ] Added service images (hero, process, CTA, banners)
- [ ] Updated home page service link
- [ ] Added icon mappings (if needed)
- [ ] Tested in browser
- [ ] Verified icons display correctly
- [ ] Verified images load
- [ ] Checked responsive design
- [ ] No console errors
- [ ] Removed all placeholder content

---

**Happy Creating! 🚀**

# SEO Enhancement Plan - Name-Based & IT Services Searches

## 🎯 Goal
Enhance SEO for:
1. **Name-based searches**: "Waqas", "Waqas UET", "UET Lahore", "Waqas IT"
2. **Service searches**: "IT services", service-related searches
3. **Ensure all pages have proper SEO** (no duplications)

## 📊 Current State Analysis

### ✅ What's Already Good:
- Home page has comprehensive keywords in `index.html`
- Structured data (Person, ProfessionalService, Organization) exists
- Router has basic SEO setup
- UET Lahore mentioned in About.vue and structuredData.js

### ❌ Gaps Identified:
1. **Missing name-based keywords**: "Waqas", "Waqas UET", "UET Lahore", "Waqas IT"
2. **Missing IT services keywords**: "IT services", "IT consulting", "IT engineering services"
3. **Project pages**: Using generic route names instead of actual project data
4. **Service pages**: Basic SEO but missing IT services context
5. **Person schema**: UET education exists but not emphasized in keywords
6. **Home page**: Static `index.html` keywords don't include UET/IT variations

## 📝 Implementation Plan

### Phase 1: Enhance Home Page SEO
1. **Update `index.html` keywords**:
   - Add: "Waqas", "Waqas Ahmad UET", "Waqas UET Lahore", "UET Lahore graduate", "Waqas IT", "Waqas IT services"
   - Add: "IT services", "IT consulting services", "IT engineering services", "IT services consultant"
   - Keep existing keywords (no duplicates)

2. **Update `getHomePageSEO()` in `seo.js`**:
   - Add name-based keyword arrays
   - Add IT services keyword arrays
   - Merge into existing keywords (deduplicate)

3. **Update Person schema in `structuredData.js`**:
   - Enhance `alumniOf` with more details
   - Add UET-related keywords to `knowsAbout`
   - Add IT services to job titles

### Phase 2: Enhance Service Pages SEO
1. **Update `getServicePageSEO()` in `seo.js`**:
   - Add "IT services" context to all service pages
   - Add service-specific IT keywords
   - Ensure no duplicates

2. **Update ProfessionalService schema**:
   - Add "IT Services" to `serviceType`
   - Add IT-related keywords

### Phase 3: Enhance Project Pages SEO
1. **Update router to use actual project data**:
   - Import project data from `portfolioProjects.js`
   - Use real project titles, descriptions, technologies
   - Pass to `getProjectPageSEO()` with actual data

2. **Update `getProjectPageSEO()`**:
   - Add name-based keywords: "Waqas project", "Waqas UET project"
   - Add IT services context where relevant

### Phase 4: Verify All Pages
1. **Check all project pages** have SEO
2. **Check all service pages** have SEO
3. **Verify no keyword duplications**
4. **Test structured data validation**

## 🔑 Key Keywords to Add

### Name-Based Keywords:
- "Waqas"
- "Waqas Ahmad"
- "Waqas UET"
- "Waqas UET Lahore"
- "UET Lahore"
- "University of Engineering and Technology Lahore"
- "UET Lahore graduate"
- "Waqas IT"
- "Waqas IT services"
- "Waqas IT consultant"

### IT Services Keywords:
- "IT services"
- "IT consulting services"
- "IT engineering services"
- "IT services consultant"
- "IT consultant"
- "IT engineering consultant"
- "IT services provider"
- "IT solutions"
- "IT services expert"

## ✅ Success Criteria
- All pages have proper SEO meta tags
- Name-based searches include UET/IT variations
- Service pages include IT services context
- No keyword duplications
- Structured data validates correctly
- All pages indexed properly

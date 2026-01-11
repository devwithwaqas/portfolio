# Quick Start: Creating a New Project Page

This guide provides a fast-track approach to creating a new project page based on lessons learned from G5 POS implementation.

## Files Reference

1. **PROJECT_PAGE_IMPLEMENTATION_GUIDE.md** - Comprehensive guide with all details
2. **PROJECT_PAGE_CHECKLIST.md** - Step-by-step checklist
3. **PROJECT_PAGE_TEMPLATE.vue** - Boilerplate template file

## Quick Start (5 Steps)

### Step 0: Gather Content from Source Directory (10 minutes)

**IMPORTANT**: Before starting, gather all project information from:
- `c:\inetpub\portfolio` - Primary source for project content, documentation, images, and details
- Look for project-specific folders or documentation
- Gather: descriptions, technologies, architecture info, metrics, images, challenges

### Step 1: Prepare Icon Mappings (5 minutes)

Before starting, check and add icon mappings:

```bash
# Check existing mappings
grep -i "your-technology" src/utils/iconResolver.js

# Edit src/utils/iconResolver.js to add missing mappings
```

**Key Points:**
- Add both normalized (no dots/special chars) and original versions
- Use existing icons whenever possible
- Test in browser console: `resolveIcon('Technology Name')`

### Step 2: Copy Starter Template (1 minute)

```bash
# Copy the starter template (boilerplate file)
cp PROJECT_PAGE_TEMPLATE.vue src/views/projects/YourProjectPage.vue

# Edit the file and replace "YourProject" with actual project name
```

**Note**: The starter template (`PROJECT_PAGE_TEMPLATE.vue`) shows how to use the existing `ProjectPageTemplate` component (in `src/components/common/ProjectPageTemplate.vue`) which all project pages use. You're not creating a new template - you're creating a new page that follows the same structure.

### Step 3: Add Route (1 minute)

```javascript
// In src/router/index.js
{
  path: '/projects/your-project',
  name: 'YourProject',
  component: () => import('../views/projects/YourProjectPage.vue')
}
```

### Step 4: Populate Data (30-60 minutes)

Follow the template structure and populate:

1. **Project Hero** - Title, description, tags, achievements
2. **Technology Stack** - Use existing icon mappings
3. **Performance Stats** - 4-8 realistic metrics
4. **Performance Charts** - 4-9 charts with unique IDs
5. **Architecture Layers** - Use simple icon names
6. **Other Sections** - Engineering challenges, ROI, metrics

### Step 5: Test & Verify (10 minutes)

Use the checklist in `PROJECT_PAGE_CHECKLIST.md`:

- [ ] All icons display (no ⚙️ icons)
- [ ] All charts render
- [ ] No console errors
- [ ] No placeholder content
- [ ] Responsive design works

## Critical Reminders

### Icons
✅ **DO**: Use existing icon mappings
✅ **DO**: Add normalized + original versions
✅ **DO**: Use simple names for architecture icons (`'api'`, `'database'`)
❌ **DON'T**: Use full tech names as icon names in architecture layers

### Charts
✅ **DO**: Give each chart unique ID
✅ **DO**: Set `maintainAspectRatio: false`
✅ **DO**: Use realistic, relevant data
✅ **DO**: Include required options (responsive, plugins, animation)
❌ **DON'T**: Forget to test chart rendering

### Data
✅ **DO**: Use project-specific content
✅ **DO**: Ensure realistic values
✅ **DO**: Remove all placeholder text
❌ **DON'T**: Copy content from other projects without updating

## Common Issues Quick Fix

### Icons showing ⚙️
→ Add mapping to `src/utils/iconResolver.js` (both normalized and original)

### Charts not showing
→ Check unique IDs, verify canvas elements exist, check console for errors

### Chart data not displaying
→ Verify data structure (labels array, datasets array, data property)

### Architecture icons wrong
→ Use simple icon names, not full technology names

## Example: Adding a New Technology Icon

```javascript
// In src/utils/iconResolver.js

// Add both versions for reliability
'your technology name': { 
  type: 'devicon',        // or 'local'
  icon: 'icon-name',      // devicon name
  local: 'icon.svg',      // optional local icon
  fallback: '🔷' 
},
'your.technology.name': { 
  type: 'devicon', 
  icon: 'icon-name', 
  local: 'icon.svg',
  fallback: '🔷' 
}
```

## Example: Creating a Chart

```javascript
{
  id: 'uniqueChartId',           // REQUIRED: Unique
  type: 'doughnut',              // Chart type
  title: 'Chart Title',
  icon: 'performance',           // Existing icon name
  width: 'half',                 // 'half' or 'full'
  data: {
    labels: ['A', 'B', 'C'],
    datasets: [{
      data: [33, 33, 34],
      backgroundColor: ['#FFD700', '#4ECDC4', '#45B7D1'],
      borderWidth: 3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,  // REQUIRED
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { /* config */ }
    },
    animation: { duration: 1500 }
  }
}
```

## Time Estimates

- Icon mapping setup: 5-10 minutes
- Component setup: 5 minutes
- Data population: 30-60 minutes
- Testing & fixes: 10-15 minutes
- **Total: ~1-1.5 hours**

## Next Steps

1. Read `PROJECT_PAGE_IMPLEMENTATION_GUIDE.md` for details
2. Use `PROJECT_PAGE_CHECKLIST.md` during implementation
3. Copy `PROJECT_PAGE_TEMPLATE.vue` as starting point
4. Test thoroughly before considering complete

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify icon mappings in `iconResolver.js`
3. Test icon resolution: `resolveIcon('Technology Name')`
4. Check chart IDs are unique
5. Verify data structures match Chart.js requirements
6. Review `PROJECT_PAGE_IMPLEMENTATION_GUIDE.md` for detailed solutions

---

**Remember**: The goal is to avoid the issues we faced with G5 POS by following these patterns from the start!

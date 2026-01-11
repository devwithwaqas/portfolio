# Project Page Implementation Checklist

Quick reference checklist for creating new project pages.

## Pre-Implementation

- [ ] Reviewed `PROJECT_PAGE_IMPLEMENTATION_GUIDE.md`
- [ ] Reviewed existing project page (`SmartCityPage.vue` or `G5POSPage.vue`)
- [ ] **Gathered content from `c:\inetpub\portfolio`** (project descriptions, tech stack, images, etc.)
- [ ] Listed all technologies to be used
- [ ] Planned chart types and data

## Icon Mapping

- [ ] Checked existing icon mappings in `src/utils/iconResolver.js`
- [ ] Added missing icon mappings (both normalized and original versions)
- [ ] Tested icon resolution in browser console
- [ ] Verified no technologies will show settings icon (⚙️)

## Component Setup

- [ ] Created `src/views/projects/YourProjectPage.vue`
- [ ] Added route in `src/router/index.js`
- [ ] Imported all required components
- [ ] Registered components in `components` section

## Data Population

### Project Hero
- [ ] Title and description
- [ ] Tags (3-6 items)
- [ ] Achievements (2 columns, 2-4 items each)

### Technology Stack
- [ ] All technologies listed
- [ ] Each has proper category
- [ ] Descriptions added
- [ ] Icons mapped correctly

### Performance Stats
- [ ] 4-8 meaningful metrics
- [ ] Realistic values
- [ ] Valid color names
- [ ] Clear labels

### Performance Charts
- [ ] 4-9 charts (mix of types)
- [ ] Each chart has unique ID
- [ ] Realistic data values
- [ ] Proper chart configuration
- [ ] Icons mapped for chart titles
- [ ] Width set ('half' or 'full')

### Architecture Overview
- [ ] 3-4 architecture layers
- [ ] Each layer has icon (from existing mappings)
- [ ] Features within layers
- [ ] Feature icons use simple names
- [ ] Benefits description

### Engineering Challenges
- [ ] 3-5 challenges
- [ ] Each has problem and solution
- [ ] Solution items with icons
- [ ] Icons use existing mappings

### ROI Section
- [ ] Left items (financial impact)
- [ ] Right items (operational impact)
- [ ] Growth metrics
- [ ] Realistic values

### Metrics Framework
- [ ] Introduction text
- [ ] 3-5 categories
- [ ] Framework items per category
- [ ] All icons mapped

## Testing

### Icons
- [ ] All technology icons display correctly
- [ ] All architecture layer icons display correctly
- [ ] All feature icons display correctly
- [ ] No settings icons (⚙️) anywhere

### Charts
- [ ] All charts render on page load
- [ ] Chart data displays correctly
- [ ] Charts are responsive
- [ ] No console errors related to charts

### Content
- [ ] No placeholder text
- [ ] No leftover content from other projects
- [ ] All sections populated
- [ ] Project-specific content throughout

### Browser
- [ ] Tested in Chrome
- [ ] Tested responsive design (mobile, tablet, desktop)
- [ ] No console errors
- [ ] Navigation works
- [ ] All links functional

## Final Review

- [ ] Code follows existing patterns
- [ ] Consistent with other project pages
- [ ] All data is realistic and relevant
- [ ] Professional appearance
- [ ] Ready for deployment

---

## Quick Icon Mapping Reference

**Before adding new mapping, check these common ones:**

### Backend
- `.net core` / `asp.net core` / `asp net core web api`
- `entity framework` / `entity framework core`
- `c#` / `c sharp`
- `sql server` / `sql server database`
- `redis`

### Frontend
- `angular` / `angular 12+`
- `typescript`
- `bootstrap` / `bootstrap 5`
- `pwa` / `progressive web app`
- `chart.js`

### Cloud
- `azure` / `azure app service` / `azure sql database` / `azure blob storage`

### Security
- `jwt`
- `oauth` / `oauth 2.0`
- `ssl` / `ssl/tls`
- `pci dss` / `pci dss compliance`

### Integration
- `payment gateway integration`
- `printer integration`
- `barcode scanner`

### Common Feature Icons (use simple names)
- `api`, `database`, `security`, `monitoring`, `performance`
- `integration`, `services`, `portal`, `analytics`
- `realtime`, `automation`, `cache`, `deployment`

---

## Chart Type Quick Reference

**Doughnut**: Distribution, percentages (cutout: '50%')
**Bar**: Comparisons, metrics (beginAtZero: true)
**Line**: Trends over time (fill: true, tension: 0.4)
**Polar Area**: Multi-dimensional metrics (scales.r.max: 100)

---

## Common Errors to Avoid

❌ **Don't**: Use full technology names as icon names in architecture layers
✅ **Do**: Use simple icon names like `'api'`, `'database'`

❌ **Don't**: Forget to add icon mappings for new technologies
✅ **Do**: Add both normalized and original versions

❌ **Don't**: Use placeholder data in charts
✅ **Do**: Use realistic, relevant data

❌ **Don't**: Forget unique IDs for charts
✅ **Do**: Use descriptive IDs like `projectMetricChart`

❌ **Don't**: Leave `maintainAspectRatio: true` in chart options
✅ **Do**: Always set `maintainAspectRatio: false`

---

**Quick Debug Commands:**

```javascript
// Test icon resolution
import { resolveIcon } from '@/utils/iconResolver'
console.log(resolveIcon('Your Technology Name'))

// Check if canvas exists
document.getElementById('yourChartId')

// Check chart instances
// In PerformanceMetricsSection component
this.chartInstances
```

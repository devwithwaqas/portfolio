# 🎯 Diagram System Setup Guide

## Quick Setup for New Diagrams

### 1. Create Narration Configuration
```bash
# Copy template and rename
cp src/config/templateNarration.js src/config/yourProjectNarration.js
```

**Edit the narration file:**
- Update component titles and descriptions
- Set correct highlight coordinates (x, y, width, height)
- Add appropriate icons from `public/assets/img/Icons/`
- Set narration bubble positions

### 2. Create Project Page
```bash
# Option A: Copy full HeatExchangerPage (has all sections)
cp src/views/projects/HeatExchangerPage.vue src/views/projects/YourProjectPage.vue

# Option B: Use ProjectPageStarter.vue (boilerplate in this folder)
cp src/views/projects/ProjectPageStarter.vue src/views/projects/YourProjectPage.vue
```

**Edit the project page:**
- Update project title and description
- Change `diagramSrc` to your SVG file path
- **CRITICAL**: Set `svg-width` and `svg-height` props matching your SVG's viewBox
- Import your narration configuration (replace `heatExchangerNarrationSteps`)
- Update project data, gallery, and technology stack
- Remove optional sections you don't need

**Example DiagramViewer configuration:**
```vue
<DiagramViewer
  title="Your Project Architecture"
  :icon-name="PROJECT_ICON_NAMES.ARCHITECTURE_OVERVIEW"
  diagram-src="/your-diagram.svg"
  :narration-steps="yourProjectNarrationSteps"
  :svg-width="2403"    <!-- MUST match SVG viewBox width -->
  :svg-height="2205"   <!-- MUST match SVG viewBox height -->
/>
```

**To get SVG dimensions:**
```bash
# Check SVG viewBox
Select-String -Path "your-diagram.svg" -Pattern 'viewBox="([^"]*)"'
# Output: viewBox="0 0 2403 2205" → width=2403, height=2205
```

### 3. Generate SVG from PlantUML using Kroki.io
```powershell
# Generate SVG from PlantUML using Kroki.io API
$pumlContent = Get-Content "YourDiagram.puml" -Raw
$response = Invoke-WebRequest -Uri "https://kroki.io/plantuml/svg" -Method POST -Body $pumlContent -ContentType "text/plain"
$response.Content | Out-File "YourDiagram.svg" -Encoding UTF8
```

**Alternative using curl (if available):**
```bash
curl -X POST "https://kroki.io/plantuml/svg" -H "Content-Type: text/plain" --data-binary "@YourDiagram.puml" -o "YourDiagram.svg"
```

### 4. Add SVG Diagram to Project
```bash
# Add your diagram file
cp your-diagram.svg public/assets/img/your-diagram.svg
```

**SVG Requirements:**
- Must have proper viewBox
- Elements should have IDs for highlighting
- Optimize file size for web

### 5. Add Icons (Optional)
```bash
# Add component icons
cp component-icons/* public/assets/img/Icons/
```

## Configuration Details

### Narration Step Format
```javascript
{
  title: "Component Name",           // Display title
  speechTitle: "Spoken Title",       // What gets spoken
  description: "Visual description", // Display description  
  speechDescription: "Spoken text",  // What gets spoken
  icon: "icon.svg",                  // Icon file name
  position: { x: 400, y: 500 },      // Narration bubble position
  highlights: [                      // Highlight rectangles
    { x: 405, y: 490, width: 160, height: 100 }
  ]
}
```

### DiagramViewer Props
```javascript
<DiagramViewer 
  title="Your Diagram Title"                    // Required
  diagramSrc="/assets/img/your-diagram.svg"    // Required  
  :narrationSteps="yourNarrationSteps"         // Required
  highlightStyle="glow"                        // Optional: glow, pulse, dashed, solid
  highlightColor="#ffeb3b"                     // Optional: highlight color
/>
```

## What's Automatic

✅ **Highlighting**: Automatically works with any SVG  
✅ **Zoom & Pan**: Works with any diagram size  
✅ **Text-to-Speech**: Works with any narration text  
✅ **Loading Animation**: Reusable for all diagrams  
✅ **Fullscreen Mode**: Works with any diagram  
✅ **Mobile Responsive**: Automatically responsive  
✅ **All Components**: ProjectHeroCard, ProjectGallery, TechnologyStack, etc.

## What You Need to Configure

❌ **Highlight Coordinates**: Must match your SVG elements  
❌ **Narration Text**: Must be written for your diagram  
❌ **Icon Files**: Must exist in Icons folder  
❌ **SVG File**: Must be optimized and properly formatted

## Required vs Optional Components

### REQUIRED (Minimum for diagram narration):
- `ProjectPageTemplate` - Page layout
- `ProjectHeroCard` - Project header
- `DiagramViewer` - Diagram with narration
- Narration configuration file

### OPTIONAL (Add as needed):
- `ProjectGallery` - Image gallery
- `ProjectOverview` - Project description
- `TechnologyStack` - Tech stack display
- `ProjectInfo` - Sidebar info
- `ArchitectureOverview` - Architecture details
- `EngineeringChallenges` - Challenges section
- `PerformanceMetricsSection` - Performance data
- `MetricsFramework` - Metrics framework
- `ROISection` - ROI information  

## Testing Your Setup

1. **Start the dev server**: `npm run dev`
2. **Navigate to your project page**
3. **Click "Start Narration"**
4. **Verify highlights match SVG elements**
5. **Check text-to-speech works**
6. **Test fullscreen mode**

## Smart Zoom & Positioning System

The DiagramViewer automatically handles zoom and positioning for any diagram size:

### Dynamic Zoom Scaling
- **Automatic adaptation**: Larger diagrams get proportionally higher zoom levels
- **Area-based adjustment**: Large highlights zoom out, small highlights zoom in
- **Formula**: `baseZoom = 2.5 * sqrt(svgSizeRatio)` where `svgSizeRatio = (currentSVG) / (HeatExchanger baseline)`

### Smart Boundary Detection
- **Prevents overflow**: Automatically calculates maximum zoom to keep highlights within screen bounds
- **Side-based positioning**: Left highlights at 25% from left edge, right highlights at 75% from left edge
- **Bubble separation**: Maintains visual gap between highlight and narration bubble

### Universal Compatibility
- **Works for any diagram size**: HeatExchanger (2403x2205), AirAsia (5692x4173), or any future diagrams
- **Adapts to any screen size**: Desktop, tablet, mobile
- **No manual configuration needed**: Just set correct `svg-width` and `svg-height` props

## Troubleshooting

### Highlights Not Showing
- Check highlight coordinates match SVG elements
- Verify SVG elements have proper IDs
- Check browser console for errors

### Zoom/Positioning Issues
- **Verify SVG dimensions**: Ensure `svg-width` and `svg-height` props match actual SVG viewBox
- **Check console logs**: DiagramViewer logs zoom calculations and positioning decisions
- **Test different highlight sizes**: Small components should zoom in more, large components should zoom out

### Text-to-Speech Not Working  
- Check narration text is properly formatted
- Verify speechSynthesis is supported
- Check browser permissions

### Diagram Not Loading
- Verify SVG file path is correct
- Check SVG file is valid
- Ensure file is in public/assets/img/

## Examples

See existing implementations:
- `src/config/heatExchangerNarration.js` - Narration configuration
- `src/views/projects/HeatExchangerPage.vue` - Project page using ProjectPageTemplate
- `src/components/common/ProjectPageTemplate.vue` - Reusable page template
- `public/assets/img/heat-exchanger-diagram.svg` - SVG diagram file

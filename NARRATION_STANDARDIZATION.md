# Narration Configuration Standardization

## 🎯 Standard Format (HeatExchanger Pattern)

All narration configurations should follow this exact structure:

### ✅ Required Fields

```javascript
{
  // Display text (shown in UI)
  title: "Short Title",
  
  // Audio text (spoken by narrator) - can be expanded for clarity
  speechTitle: "Full Title for Audio",
  
  // Display description (shown in UI) - concise
  description: "Brief description for display",
  
  // Audio description (spoken by narrator) - detailed architectural explanation
  speechDescription: "Comprehensive technical description with full context...",
  
  // Icon reference (must exist in public/assets/img/Icons/)
  icon: "icon-name.svg",
  
  // Bubble position for narration UI
  position: { x: 400, y: 500 },
  
  // SVG highlight coordinates (actual x,y,width,height from SVG)
  highlights: [
    { x: 405, y: 490, width: 160, height: 100 }
  ]
}
```

### ❌ Fields to REMOVE

- ~~`id`~~ - Not used by DiagramViewer
- ~~`details`~~ array - Not used by DiagramViewer
- ~~`audio`~~ object - Speech synthesis uses `speechTitle` + `speechDescription`
- ~~`highlights[].element`~~ - Must use actual coordinates
- ~~`highlights[].type`~~ - Not used
- ~~`highlights[].duration`~~ - Calculated automatically (no hardcoded durations!)

## 📊 Current Status Comparison

| Field | HeatExchanger ✅ | AirAsia ❌ | Action |
|-------|-----------------|-----------|---------|
| `title` | ✅ Present | ✅ Present | Keep |
| `speechTitle` | ✅ Present | ✅ Present | Keep |
| `description` | ✅ Present | ✅ Present | Keep |
| `speechDescription` | ✅ Present | ✅ Present | Keep |
| `icon` | ✅ Present | ✅ Present | Keep |
| `position` | ✅ Present | ❌ **Missing** | **ADD** |
| `highlights` | ✅ `{x,y,w,h}` | ❌ `{element,type}` | **CONVERT** |
| `id` | ✅ Not present | ❌ Present | **REMOVE** |
| `details` | ✅ Not present | ❌ Present | **REMOVE** |
| `audio` | ✅ Not present | ❌ Present | **REMOVE** |

## 🔧 Required Changes for AirAsia

### 1. Add `position` Field
Calculate bubble position based on highlight coordinates:
```javascript
position: { 
  x: highlight.x + highlight.width/2, 
  y: highlight.y - 100  // Above the highlighted area
}
```

### 2. Convert `highlights` Format
**FROM (AirAsia - WRONG):**
```javascript
highlights: [
  { element: 'web_app', type: 'focus', duration: 3000 }
]
```

**TO (HeatExchanger - CORRECT):**
```javascript
highlights: [
  { x: 207.6, y: 451.5, width: 203.3, height: 97.8 }
]
```

### 3. Remove Unnecessary Fields
```javascript
// REMOVE these fields:
id: 'web_app',              // ❌ Remove
details: [...],             // ❌ Remove
audio: { text: '...' }      // ❌ Remove (use speechTitle + speechDescription)
```

### 4. Tech Term Rules (Already Implemented ✅)

**Common terms** (short form in both display and audio):
- API, SQL, UI, UX

**Non-common terms** (short in display, full in audio):
- TLS → Transport Layer Security (audio)
- JWT → JSON Web Token (audio)
- SSO → Single Sign-On (audio)
- PWA → Progressive Web App (audio)
- SMS → Short Message Service (audio)
- NoSQL → No SQL (audio)
- DB → Database (audio)

## 🎬 Automatic Features (Do NOT Hardcode)

### Audio Duration
**❌ NEVER hardcode:**
```javascript
audio: { duration: 5000 }  // WRONG!
highlights: [{ duration: 3000 }]  // WRONG!
```

**✅ Automatic calculation:**
- Formula: `characters ÷ 14.62 = seconds`
- Calculated by `DiagramNarrator.vue` from `speechTitle` + `speechDescription`
- Progress bar and timing handled automatically

## 📝 Implementation Checklist

- [ ] Convert all `highlights` to use `{x, y, width, height}` format
- [ ] Add `position` field to all narration steps
- [ ] Remove `id` field from all narration steps
- [ ] Remove `details` array from all narration steps
- [ ] Remove `audio` object from all narration steps
- [ ] Verify all icons exist in `public/assets/img/Icons/`
- [ ] Verify `speechTitle` and `speechDescription` are comprehensive
- [ ] Ensure no hardcoded durations anywhere

## 🎯 Component Dependencies

### DiagramViewer.vue
- Expects: `highlights[{x, y, width, height}]`
- Uses: `position{x, y}` for bubble placement
- Calculates: Auto-zoom to highlight area

### DiagramNarrator.vue
- Uses: `speechTitle` + `speechDescription` for text-to-speech
- Calculates: Duration automatically from character count
- Displays: `title` and `description` in UI

### HighlightOverlay.vue
- Expects: `highlights[{x, y, width, height}]`
- Renders: SVG rectangles for visual highlighting

## 📦 Files to Update

1. ✅ `src/config/heatExchangerNarration.js` - **STANDARD** (reference)
2. ❌ `src/config/airasiaNarration.js` - **NEEDS CONVERSION**
3. ✅ `src/config/airasiaDiagramCoordinates.json` - **READY** (33 components + 8 packages)

## 🚀 Next Steps

1. Run conversion script to transform AirAsia narration format
2. Test highlight and zoom functionality on AirAsia page
3. Verify all 44 narration steps work correctly
4. Update README with standardization requirements
5. Document this pattern for all future project diagrams


# AirAsia Diagram Color Scheme Update

## ✅ What Was Changed

### Legend Updated
The legend now accurately reflects the **actual colors used** in the diagram, not theoretical C4 colors.

**Old Legend (Incorrect):**
- Person/Actor (Dark Blue)
- System (Medium Blue) ❌ *Not actually used*
- Container (Dark Navy) ❌ *Not actually used*
- External Person (Gray) ❌ *Not actually used*
- External System (Light Gray) ❌ *Not actually used*
- External Container (Lighter Gray) ❌ *Not actually used*

**New Legend (Correct):**
- **Person/Actor** (Dark Blue `#08427B`) ✅ *Actually used for employee/admin*
- **Packages/Layers** (Light Blue `#EEF2FF`) ✅ *Actually used for group backgrounds*
- **Link Labels** (Dark Gray `#1F2937`) ✅ *Actually used for note bubbles*
- **Connectors/Arrows** (Red `#FF4D4F`) ✅ *Actually used for connection lines*

### Colors Actually Used in Diagram

| Color | Hex | Usage |
|-------|-----|-------|
| Light Blue-Gray | `#F7F9FC` | Canvas background |
| Dark Blue | `#08427B` | Person/Actor shapes (employee, admin) |
| Very Light Blue | `#EEF2FF` | Package/Layer backgrounds |
| Dark Gray | `#1F2937` | Link label bubbles |
| Red | `#FF4D4F` | Connectors and arrows |
| White | `#FFFFFF` | Text on dark elements |
| Dark Gray-Black | `#111827` | Text on light elements |

### Why Some Colors Don't Appear

**C4-PlantUML Limitation:**
- The C4 library macros (`Container`, `System_Ext`, `ContainerDb`) use **standard C4 rendering**
- Color override variables (`$CONTAINER_BG_COLOR`, etc.) **only affect the legend**, not actual shapes
- Only `Person` macro supports custom background colors in Kroki.io rendering

**This is expected behavior** - C4-PlantUML prioritizes semantic clarity over visual customization.

## 📁 Files Updated

1. ✅ `AirAsia_ID90_C4_Diagram.puml` - Fixed legend with accurate colors
2. ✅ `AirAsia_ID90_C4_Diagram.svg` - Regenerated with aligned legend
3. ✅ `public/AirAsia_ID90_C4_Diagram.svg` - Copied for web display
4. ✅ `AirAsia_ID90_C4_Diagram_Guide.md` - Updated color documentation

## 🎯 Final Result

The diagram now has:
- ✅ Professional light background (not white)
- ✅ Red connectors (not orange)
- ✅ Dark label bubbles (not yellow)
- ✅ Accurate legend showing **only colors that actually appear**
- ✅ Properly aligned legend entries
- ✅ Clean, professional appearance matching HeatExchanger aesthetic
- ✅ **CORRECT SVG DIMENSIONS**: 5692x4173 (not 2403x2205)

The diagram maintains the **C4 semantic structure** (Person, Container, System_Ext) while adopting the **HeatExchanger color palette** where possible within C4-PlantUML constraints.

## 🐛 **Critical Fix: SVG Dimensions**

**Problem Found:**
- AirAsia page specified `svg-width="2403"` and `svg-height="2205"` 
- But the actual SVG viewBox is `0 0 5692 4173`
- This caused **highlight/zoom misalignment** - coordinates were scaled incorrectly!

**Solution Applied:**
1. ✅ **Fixed `DiagramViewer.vue`**: Converted `svgWidth` and `svgHeight` from hardcoded `data()` to `props`
   - Was: `svgWidth: 2403, svgHeight: 2205` in `data()` (ignored prop values!)
   - Now: Proper props with defaults `2403` and `2205` for backward compatibility
2. ✅ **Updated `AirAsiaID90Page.vue`**: Specified correct SVG dimensions
   - `:svg-width="5692"` and `:svg-height="4173"` (matching actual viewBox)
3. ✅ **Result**: Highlights and zoom now work perfectly, matching HeatExchanger behavior!


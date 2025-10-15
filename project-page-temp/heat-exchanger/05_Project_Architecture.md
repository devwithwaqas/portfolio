# Project Architecture Section

## Title
🔥 Heat Exchanger Portal - Enterprise Microservices Architecture

## Control Buttons (Toolbar)
- **Zoom In** - Zoom into diagram
- **Zoom Out** - Zoom out of diagram
- **Fit** - Fit diagram to view
- **Reset** - Reset view to default
- **Magnify** - Toggle magnifier lens
- **Narrate** - Start narration (deep dive)
- **Pause** - Pause narration
- **Resume** - Resume narration
- **Stop** - Stop narration

## Diagram
- SVG file: `heat-exchanger-diagram.svg`
- Interactive pan & zoom
- Magnifier lens feature
- Node highlighting on hover
- Flow path highlighting
- Narration system (speaks about nodes and flows)
- Devicon integration for technology badges
- Custom icon resolver for special technologies

## Technical Features
- Pan-zoom functionality (panzoom library or custom)
- SVG manipulation
- Touch gesture support
- Magnifier lens (260x260px, blurred background)
- Focus rect highlighting
- Badge popup on hover (shows tech info)
- Speech synthesis for narration
- Icon fallback system (tries multiple paths, falls back to emoji)

## Design Notes
- Uses ReusableCard component style
- Fancy 3D toolbar (purple gradient buttons)
- Diagram viewport: 600px height
- Grab cursor for pan
- Touch-action: none for gestures
- Multiple JavaScript utilities: diagram-utils.js, diagrams.js, hx-icon-resolver.js, hx-inline.js, hx-svg-bubble.js


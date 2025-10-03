# Navigation Buttons Configuration

This file contains all the configuration data for the navigation buttons before converting them to the NavButton component.

## Button 1: Home
- **Label**: Home
- **Href**: #hero
- **Color (RGB)**: `236, 72, 153` (Pink)
- **SVG Paths**:
  ```javascript
  [
    { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }
  ]
  ```
- **SVG Polylines**:
  ```javascript
  [
    { points: '9 22 9 12 15 12 15 22' }
  ]
  ```

## Button 2: About
- **Label**: About
- **Href**: #about
- **Color (RGB)**: `16, 185, 129` (Green/Emerald)
- **SVG Paths**:
  ```javascript
  [
    { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }
  ]
  ```
- **SVG Circles**:
  ```javascript
  [
    { cx: '12', cy: '7', r: '4' }
  ]
  ```

## Button 3: Resume
- **Label**: Resume
- **Href**: #resume
- **Color (RGB)**: `255, 215, 0` (Gold/Yellow)
- **SVG Paths**:
  ```javascript
  [
    { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }
  ]
  ```
- **SVG Polylines**:
  ```javascript
  [
    { points: '14 2 14 8 20 8' },
    { points: '10 9 9 9 8 9' }
  ]
  ```
- **SVG Lines**:
  ```javascript
  [
    { x1: '16', y1: '13', x2: '8', y2: '13' },
    { x1: '16', y1: '17', x2: '8', y2: '17' }
  ]
  ```

## Button 4: Portfolio
- **Label**: Portfolio
- **Href**: #portfolio
- **Color (RGB)**: `6, 182, 212` (Cyan)
- **SVG Paths**:
  ```javascript
  [
    { d: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' }
  ]
  ```
- **SVG Rects**:
  ```javascript
  [
    { x: '2', y: '7', width: '20', height: '14', rx: '2', ry: '2' }
  ]
  ```

## Button 5: Services
- **Label**: Services
- **Href**: #services
- **Color (RGB)**: `251, 146, 60` (Orange)
- **SVG Paths**:
  ```javascript
  [
    { d: 'M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m0-6l4.2-4.2' }
  ]
  ```
- **SVG Circles**:
  ```javascript
  [
    { cx: '12', cy: '12', r: '3' }
  ]
  ```

## Button 6: Contact
- **Label**: Contact
- **Href**: #contact
- **Color (RGB)**: `139, 92, 246` (Purple/Violet)
- **SVG Paths**:
  ```javascript
  [
    { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }
  ]
  ```
- **SVG Polylines**:
  ```javascript
  [
    { points: '22,6 12,13 2,6' }
  ]
  ```

---

## Usage Example

```vue
<NavButton 
  href="#hero" 
  label="Home"
  buttonColor="236, 72, 153"
  :svgPaths="[{ d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }]"
  :svgPolylines="[{ points: '9 22 9 12 15 12 15 22' }]"
  :isActive="activeSection === 'hero'"
  @navigate="scrollToSection('hero', $event)"
/>
```

## Color Palette Summary
- Home: Pink `rgb(236, 72, 153)`
- About: Emerald `rgb(16, 185, 129)`
- Resume: Gold `rgb(255, 215, 0)`
- Portfolio: Cyan `rgb(6, 182, 212)`
- Services: Orange `rgb(251, 146, 60)`
- Contact: Violet `rgb(139, 92, 246)`


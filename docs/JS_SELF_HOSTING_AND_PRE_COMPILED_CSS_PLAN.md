# JavaScript Self-Hosting & Pre-Compiled CSS Plan

## 🎯 Goal
1. Identify JavaScript resources that can be self-hosted
2. Pre-compile mobile-specific CSS to reduce runtime processing
3. Minimize CSS variable DOM operations
4. Move device detection to build-time where possible

---

## 📊 Current Analysis

### 1. JavaScript Resources

#### ✅ **Google Analytics** - Cannot Self-Host
- **Source**: `googletagmanager.com`
- **Reason**: Google requires their domain for analytics
- **Status**: Already optimized (deferred on mobile)
- **Action**: None required

#### ✅ **No Other External JS Found**
- All JavaScript is bundled by Vite
- No CDN JS libraries detected
- **Action**: No JS self-hosting needed

---

### 2. CSS Variable DOM Operations

#### ⚠️ **Found Runtime CSS Variable Reads:**

**EpicCard.vue** (Line 289-292):
```javascript
const wrapperStyle = getComputedStyle(cardWrapper)
cachedWrapperPadding = parseFloat(wrapperStyle.getPropertyValue('--wrapper-padding')) || 20.25
```
- **Issue**: Runtime read of CSS variable `--wrapper-padding`
- **Impact**: Causes forced reflow
- **Solution**: Can be replaced with hardcoded value or computed at build time

**NavButton.vue** (Lines 103-108):
```javascript
'--btn-r': r,
'--btn-g': g,
'--btn-b': b,
// ... dynamic RGB values
```
- **Issue**: Dynamic CSS variable setting based on props
- **Impact**: Runtime manipulation
- **Solution**: Acceptable (needed for dynamic colors), but can be optimized

**HighlightOverlay.vue** (Lines 78-82):
```javascript
'--highlight-color': this.highlightColor,
'--highlight-rgb': this.hexToRgb(this.highlightColor)
```
- **Issue**: Dynamic CSS variable setting based on props
- **Impact**: Runtime manipulation
- **Solution**: Acceptable (needed for dynamic highlights)

---

### 3. Device Detection (Runtime)

#### ⚠️ **Found Runtime Device Detection:**

**main.js** (Line 29):
```javascript
const isMobile = window.innerWidth <= 768
const delay = isMobile ? 3000 : 500
```
- **Issue**: Runtime window size check
- **Impact**: Blocks rendering, causes reflow
- **Solution**: Can use build-time detection or user-agent parsing

**main.js** (Line 324):
```javascript
if (isMobileDevice) {
  setTimeout(initGA4, 3000);
} else {
  initGA4();
}
```
- **Issue**: Runtime device check for GA4 loading
- **Impact**: Delays analytics initialization
- **Solution**: Can use user-agent or CSS media query

**Navigation.vue** (Line 355):
```javascript
const viewportHeight = window.innerHeight || 0
```
- **Issue**: Runtime viewport check
- **Impact**: Causes reflow
- **Solution**: Acceptable (needed for dynamic positioning)

---

### 4. Media Queries in CSS

#### ✅ **Current State:**
- All CSS uses `@media` queries (standard approach)
- Browser already "pre-compiles" these at parse time
- **Total Media Queries**: ~74 in main.css + font-sizes.css

#### 💡 **Optimization Opportunity:**
- Can split mobile/desktop CSS into separate files
- Load only mobile CSS on mobile devices (smaller initial payload)
- Load desktop CSS only on desktop (exclude mobile-specific rules)

---

## ✅ Implementation Plan

### Phase 1: Fix CSS Variable DOM Operations (High Priority)

#### 1.1 EpicCard CSS Variable Read
**Current:**
```javascript
const wrapperStyle = getComputedStyle(cardWrapper)
cachedWrapperPadding = parseFloat(wrapperStyle.getPropertyValue('--wrapper-padding')) || 20.25
```

**Solution:**
- Replace with hardcoded value: `20.25`
- Or compute at build time if CSS variable is needed for other reasons
- **Savings**: Eliminates 1 forced reflow per card

#### 1.2 NavButton & HighlightOverlay CSS Variables
**Status**: ✅ Acceptable
- These need runtime values (dynamic colors)
- Cannot be pre-compiled
- **Action**: Keep as-is (already optimized)

---

### Phase 2: Pre-Compile Mobile CSS (High Priority)

#### 2.1 Split CSS at Build Time

**⚠️ CRITICAL: CSS Order Preservation**
- **CSS cascade order is critical** - rules must maintain their sequence
- **Variables must come first** - `:root` and CSS custom properties
- **@keyframes must be preserved** - animations need to be in shared CSS
- **@import/@font-face must be preserved** - dependencies must load first
- **Media query order matters** - later rules override earlier ones

**Strategy:**
1. Parse CSS files in import order (font-sizes.css → main.css)
2. Extract mobile rules (`@media (max-width: 768px)`) to mobile.css
3. Extract desktop rules (`@media (min-width: 769px)`) to desktop.css
4. Keep shared rules (no media queries, @keyframes, :root) in main.css
5. **Preserve original sequence** within each file

**Build Process:**
```javascript
// vite.config.js plugin
{
  name: 'split-mobile-css',
  generateBundle() {
    // 1. Read CSS files in import order
    // 2. Parse while preserving sequence
    // 3. Extract mobile/desktop rules
    // 4. Write split files maintaining order
    // 5. Update HTML to load split CSS
  }
}
```

**HTML Output:**
```html
<!-- Mobile CSS (loaded on mobile only) -->
<link href="/assets/css/mobile.css" rel="stylesheet" media="(max-width: 768px)">

<!-- Desktop CSS (loaded on desktop only) -->
<link href="/assets/css/desktop.css" rel="stylesheet" media="(min-width: 769px)">

<!-- Shared CSS (loaded on all devices) -->
<link href="/assets/css/main.css" rel="stylesheet">
```

**Expected Mobile Savings:**
- **Current**: All CSS loaded (~150-200KB)
- **Mobile**: Only mobile + shared (~100-120KB)
- **Savings**: ~50-80KB (~30-40% reduction)

---

### Phase 3: Build-Time Device Detection (Medium Priority)

#### 3.1 User-Agent Based Detection

**Strategy:**
1. Detect device type at build time using User-Agent
2. Inject device class into HTML: `<html class="mobile">` or `<html class="desktop">`
3. Use CSS classes instead of JavaScript checks

**Implementation:**
```javascript
// vite.config.js plugin
{
  name: 'inject-device-class',
  transformIndexHtml(html) {
    // Parse User-Agent from build context (if available)
    // Or use environment variable
    const isMobile = process.env.VITE_BUILD_MOBILE === 'true'
    return html.replace('<html', `<html class="${isMobile ? 'mobile' : 'desktop'}"`)
  }
}
```

**Limitation:**
- Build-time detection only works for static site generation
- For dynamic apps, still need runtime detection
- **Recommendation**: Use CSS classes + media queries instead

#### 3.2 CSS-Only Device Detection

**Strategy:**
1. Use CSS media queries for device-specific behavior
2. Avoid JavaScript device detection where possible
3. Use `<script>` with `media` attribute for conditional loading

**Example:**
```html
<!-- Mobile-only script -->
<script src="/js/mobile.js" media="(max-width: 768px)"></script>

<!-- Desktop-only script -->
<script src="/js/desktop.js" media="(min-width: 769px)"></script>
```

---

### Phase 4: Optimize Runtime Device Detection (Low Priority)

#### 4.1 Replace `window.innerWidth` with `matchMedia`

**Current:**
```javascript
const isMobile = window.innerWidth <= 768
```

**Optimized:**
```javascript
const isMobile = window.matchMedia('(max-width: 768px)').matches
// Or cache the MediaQueryList object
const mobileQuery = window.matchMedia('(max-width: 768px)')
const isMobile = mobileQuery.matches
```

**Benefits:**
- `matchMedia` is faster than `innerWidth` check
- Can cache MediaQueryList object
- Can listen to changes: `mobileQuery.addEventListener('change', handler)`

#### 4.2 Use CSS Classes Instead of JS Checks

**Strategy:**
1. Add CSS class based on viewport size (using media query + JS)
2. Use CSS selectors instead of JavaScript conditionals

**Example:**
```css
/* CSS */
.mobile-only { display: block; }
.desktop-only { display: none; }

@media (min-width: 769px) {
  .mobile-only { display: none; }
  .desktop-only { display: block; }
}
```

---

## 📈 Expected Performance Improvements

### Mobile CSS Reduction:
- **Before**: ~150-200KB (all CSS)
- **After**: ~100-120KB (mobile + shared only)
- **Savings**: ~50-80KB (~30-40% reduction)

### Forced Reflow Reduction:
- **EpicCard CSS Variable Read**: 1 reflow eliminated per card
- **Total Savings**: ~10-20ms on page load

### Device Detection Optimization:
- **matchMedia vs innerWidth**: ~5-10ms faster
- **CSS Classes vs JS Checks**: Eliminates JS execution time

---

## ⚠️ Trade-offs & Considerations

### Pre-Compiled Mobile CSS:
**✅ Benefits:**
1. Smaller initial payload (~30-40% CSS reduction)
2. Faster CSS parsing (fewer rules to process)
3. Better cache separation (mobile vs desktop)

**❌ Downsides:**
1. More complex build process
2. Need to maintain separate files
3. Some duplication if rules overlap

### Build-Time Device Detection:
**✅ Benefits:**
1. No runtime JS checks
2. Immediate CSS application

**❌ Downsides:**
1. Only works for static sites
2. Dynamic apps still need runtime detection
3. Limited use cases

### CSS Variable DOM Operations:
**✅ EpicCard Fix Benefits:**
1. Eliminates forced reflow
2. Faster rendering

**❌ NavButton/HighlightOverlay:**
1. Need runtime values (cannot pre-compile)
2. Already optimized (only set once)

---

## 🎯 Recommendation

### High Priority:
1. **Fix EpicCard CSS Variable Read** - Easy win, eliminates reflow
2. **Split Mobile/Desktop CSS** - Biggest impact (~30-40% CSS reduction)

### Medium Priority:
3. **Replace `innerWidth` with `matchMedia`** - Small improvement
4. **Use CSS classes for device-specific behavior** - Reduces JS execution

### Low Priority:
5. **Build-time device detection** - Limited use cases, complex implementation

---

## 📝 Implementation Priority

1. ✅ **Phase 1.1**: Fix EpicCard CSS variable read (10 minutes)
2. ✅ **Phase 2**: Pre-compile mobile CSS (2-3 hours)
3. ✅ **Phase 3**: Build-time device detection (optional, if needed)
4. ✅ **Phase 4**: Optimize runtime detection (30 minutes)

---

## 🔧 Next Steps

1. **Review this plan** - Confirm approach before implementation
2. **Start with Phase 1.1** - Quick win (EpicCard fix)
3. **Implement Phase 2** - Biggest impact (mobile CSS split)
4. **Test on mobile device** - Verify improvements
5. **Measure performance** - Compare before/after metrics

---

## 📚 Resources

- Vite Plugin API: https://vitejs.dev/guide/api-plugin.html
- CSS Media Queries: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries
- matchMedia API: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia

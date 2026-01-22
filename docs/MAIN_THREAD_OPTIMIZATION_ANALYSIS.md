# Main Thread Optimization Analysis - Home Page

## Current Main Thread Work (Identified)

### 1. **Render-Blocking CSS** (High Impact)
**Location**: `index.html`
- ✅ Bootstrap CSS - Loaded synchronously (render-blocking)
- ✅ Bootstrap Icons CSS - Loaded synchronously (render-blocking)
- ✅ Font Awesome CSS - Already async (good)
- ✅ Google Fonts CSS - Already async (good)
- ✅ Devicon CSS - Already deferred (good)

**Can Reduce**: Make Bootstrap CSS async (but need critical CSS inline)

### 2. **JavaScript Execution** (High Impact)
**Location**: `src/main.js`
- ✅ Vue.js initialization - Must run (unavoidable)
- ✅ Router initialization - Must run (unavoidable)
- ✅ Font loading check (`document.fonts.ready`) - Runs on main thread
- ✅ Service worker registration - Runs on 'load' event

**Can Reduce**:
- Defer service worker registration further (after 5s or on idle)
- Defer font loading check (not critical for initial render)

### 3. **Component Mounting** (Medium Impact)
**Location**: `src/views/Home.vue`
- ✅ Hero component - Loaded immediately (above-fold, necessary)
- ✅ About component - Loaded immediately (could be lazy?)
- ✅ TechnologyExpertise component - Loaded immediately (could be lazy?)

**Can Reduce**:
- Make About component lazy (below hero, not critical for LCP)
- Make TechnologyExpertise component lazy (below hero)

### 4. **Scroll Restoration Logic** (Medium Impact)
**Location**: `src/views/Home.vue` (mounted hook)
- ❌ Uses `getBoundingClientRect()` - **Forced reflow**
- ❌ Uses `window.pageYOffset` - **Layout read**
- ❌ Uses `IntersectionObserver` - Good, but still runs on main thread
- ❌ Multiple `setTimeout` calls - Main thread work

**Can Reduce**:
- Defer scroll restoration until after page is interactive
- Use `requestIdleCallback` instead of `setTimeout`
- Batch all layout reads together

### 5. **Router Operations** (Medium Impact)
**Location**: `src/router/index.js`
- ❌ SEO meta tag updates on every route - Main thread
- ❌ Analytics tracking on every route - Main thread
- ❌ `detectHomeSection()` uses `getBoundingClientRect()` - **Forced reflow**
- ❌ `saveScrollPosition()` - Storage operations (main thread)

**Can Reduce**:
- Defer SEO updates until after render
- Defer analytics tracking (already done in main.js)
- Defer scroll position detection until idle

### 6. **Hero Component** (Low-Medium Impact)
**Location**: `src/components/home/Hero.vue`
- ✅ Animations deferred to interaction (good)
- ❌ `setInterval` for rotating text - Runs on main thread (every 3s)
- ✅ AnalyticsStats lazy loaded (good)

**Can Reduce**:
- Use `requestAnimationFrame` instead of `setInterval` (if possible)
- Or defer rotating text until after LCP

### 7. **Font Loading** (Low Impact)
**Location**: `src/main.js`, `index.html`
- ✅ Google Fonts async (good)
- ❌ `document.fonts.ready` check - Runs on main thread
- ❌ Font parsing - Browser internal (unavoidable)

**Can Reduce**:
- Defer `document.fonts.ready` check until after LCP
- Self-host fonts (reduces external requests, but parsing still happens)

### 8. **Service Worker** (Low Impact)
**Location**: `src/main.js`
- ❌ Registration on 'load' event - Main thread
- ❌ Cache operations - Main thread

**Can Reduce**:
- Defer registration until after 5s or on idle
- Use `requestIdleCallback` for registration

### 9. **Structured Data Generation** (Low Impact)
**Location**: `src/views/Home.vue`
- ✅ Already deferred with `requestIdleCallback` (good)

### 10. **GA4 Script** (Already Optimized)
**Location**: `index.html`
- ✅ Deferred 3s on mobile (good)
- ✅ Loaded immediately on desktop (acceptable)

## Optimization Opportunities (Priority Order)

### High Priority (Biggest Impact):

1. **Make Bootstrap CSS Async**
   - Extract critical CSS (hero section only)
   - Inline critical CSS
   - Load Bootstrap CSS async
   - **Impact**: -300-500ms main thread work

2. **Defer Scroll Restoration**
   - Move scroll restoration to `requestIdleCallback`
   - Defer until after 2-3 seconds
   - **Impact**: -100-200ms main thread work

3. **Lazy Load Below-Fold Components**
   - Make About component lazy
   - Make TechnologyExpertise component lazy
   - **Impact**: -200-300ms initial JavaScript execution

### Medium Priority:

4. **Defer Router SEO Updates**
   - Move SEO meta updates to `requestIdleCallback`
   - **Impact**: -50-100ms main thread work

5. **Defer Service Worker Registration**
   - Register after 5s or on idle
   - **Impact**: -50-100ms main thread work

6. **Optimize Scroll Position Detection**
   - Batch layout reads
   - Use `requestIdleCallback`
   - **Impact**: -50-100ms main thread work

### Low Priority:

7. **Defer Font Loading Check**
   - Move `document.fonts.ready` to after LCP
   - **Impact**: -20-50ms main thread work

8. **Optimize Rotating Text**
   - Use `requestAnimationFrame` instead of `setInterval`
   - Or defer until after LCP
   - **Impact**: -10-30ms main thread work

## What CANNOT Be Reduced:

1. **Vue.js Initialization** - Must run to render page
2. **Router Initialization** - Must run for navigation
3. **Critical CSS Parsing** - Browser must parse for first paint
4. **Layout Calculations** - Browser must calculate element positions
5. **Paint Operations** - Browser must paint pixels
6. **Font Parsing** - Browser internal (unavoidable)

## Expected Impact:

### After High Priority Optimizations:
- **Main Thread Work**: ~2.7s → **~2.0-2.2s** (-500-700ms)
- **Style & Layout**: ~923ms → **~600-700ms** (-200-300ms)
- **Script Evaluation**: ~519ms → **~400-450ms** (-70-120ms)
- **Others**: ~763ms → **~700-750ms** (-13-63ms)

### After All Optimizations:
- **Main Thread Work**: ~2.7s → **~1.8-2.0s** (-700-900ms)
- **Style & Layout**: ~923ms → **~500-600ms** (-300-400ms)
- **Script Evaluation**: ~519ms → **~350-400ms** (-120-170ms)
- **Others**: ~763ms → **~650-700ms** (-63-113ms)

## Implementation Notes:

- **Bootstrap CSS async**: Need to inline critical CSS first
- **Lazy load About/TechnologyExpertise**: Easy, just change imports
- **Defer scroll restoration**: Use `requestIdleCallback` with timeout
- **Defer router SEO**: Move to `requestIdleCallback`

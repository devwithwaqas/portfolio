# Mobile LCP Fix Plan - Target: < 2.5s

## Current State
- **LCP**: 6.6s ❌ (Target: < 2.5s)
- **FCP**: 4.8s ❌ (Target: < 1.8s)
- **SI**: 5.7s ❌ (Target: < 3.4s)

## Root Causes

### 1. **Hero Image Loading Delay** (Biggest Issue)
- Image goes through: OptimizedImage → LazyImage → Vue rendering
- Vue.js must mount before image can render
- Component initialization adds ~500-1000ms delay

### 2. **Render-Blocking CSS**
- Bootstrap CSS loads synchronously
- Bootstrap Icons CSS loads synchronously
- Blocks first paint

### 3. **Font Loading**
- Google Fonts load async but still delay render
- Font swap causes layout shifts

### 4. **JavaScript Execution**
- Vue.js app must initialize
- Router must initialize
- Components must mount
- All before LCP element can render

### 5. **Network Latency**
- Slow 4G throttling (1.6 Mbps)
- Multiple round trips for resources
- No HTTP/2 prioritization

## Fix Strategy

### Phase 1: Critical Path Optimization (Biggest Impact)

#### 1.1 Inline Hero Image Directly in HTML
**Impact**: -2-3s LCP
- Add hero image directly in `index.html` (before Vue mounts)
- Use `<img>` with `fetchpriority="high"` and `loading="eager"`
- Bypass Vue component rendering for LCP element
- Hide with CSS, show when Vue mounts

#### 1.2 Inline Critical CSS
**Impact**: -500ms FCP
- Extract hero section CSS
- Inline in `<head>` of `index.html`
- Reduces render-blocking CSS

#### 1.3 Defer Non-Critical CSS
**Impact**: -300ms FCP
- Make Bootstrap CSS load async (already done for some)
- Make Bootstrap Icons CSS load async
- Use print media trick

### Phase 2: JavaScript Optimization

#### 2.1 Reduce JavaScript Bundle Size
**Impact**: -200ms TBT
- Code splitting already done
- Further optimize Vue component loading
- Lazy load non-critical components

#### 2.2 Defer Vue App Initialization
**Impact**: -100ms LCP
- Load Vue app after LCP element renders
- Use `defer` for main.js

### Phase 3: Image Optimization

#### 3.1 Optimize Hero Image Further
**Impact**: -500ms LCP
- Reduce mobile image size (currently 300w, try 250w)
- Use AVIF for modern browsers
- Ensure WebP fallback is optimized

#### 3.2 Preload with Higher Priority
**Impact**: -200ms LCP
- Already preloading, but ensure it's earliest possible
- Move preload to very top of `<head>`

### Phase 4: Font Optimization

#### 4.1 Self-Host Google Fonts
**Impact**: -300ms LCP
- Download and self-host fonts
- Eliminate external font request
- Use `font-display: swap` (already done)

#### 4.2 Preload Critical Fonts
**Impact**: -100ms LCP
- Preload only hero section fonts
- Defer other font weights

## Implementation Priority

### High Priority (Do First):
1. ✅ **Inline hero image in HTML** (-2-3s LCP)
2. ✅ **Inline critical CSS** (-500ms FCP)
3. ✅ **Defer Bootstrap CSS** (-300ms FCP)

### Medium Priority:
4. ✅ **Optimize mobile hero image** (-500ms LCP)
5. ✅ **Self-host Google Fonts** (-300ms LCP)

### Low Priority:
6. ✅ **Further JavaScript optimization** (-200ms TBT)
7. ✅ **Preload critical fonts** (-100ms LCP)

## Expected Results

### After Phase 1:
- **LCP**: 6.6s → **3.5-4.0s** ✅ (Still needs work)
- **FCP**: 4.8s → **2.5-3.0s** ✅ (Better)

### After Phase 2:
- **LCP**: 3.5s → **2.8-3.2s** ✅ (Close to target)
- **FCP**: 2.5s → **2.0-2.3s** ✅ (Good)

### After Phase 3 + 4:
- **LCP**: 2.8s → **2.0-2.5s** ✅ **TARGET MET**
- **FCP**: 2.0s → **1.5-1.8s** ✅ **TARGET MET**

## Quick Wins (Can Do Now)

1. **Move hero image preload to top of `<head>`**
2. **Add hero image directly in HTML** (bypass Vue)
3. **Inline hero section CSS**
4. **Make Bootstrap CSS async**

These 4 changes should get LCP from 6.6s → **3.5-4.0s** immediately.

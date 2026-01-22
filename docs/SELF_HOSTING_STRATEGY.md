# Self-Hosting Strategy for Mobile Performance

## 🎯 Goal
Reduce mobile payload by self-hosting resources instead of using CDNs to:
- Eliminate DNS lookup overhead
- Reduce TCP connection overhead
- Improve HTTP/2 multiplexing
- Better cache control

---

## 📊 Current External Resources

### 1. ✅ **Font Awesome** - Already Self-Hosted!
- **Status**: `/assets/fonts/fontawesome/all.css`
- **Size**: ~80KB CSS + ~500KB fonts
- **Mobile Impact**: ✅ Same domain, already optimized

### 2. ⚠️ **Google Fonts** - Can Self-Host
- **Current**: `fonts.googleapis.com` (3 fonts: Roboto, Poppins, Raleway)
- **Size**: ~30-40KB CSS + ~200-300KB fonts
- **Mobile Impact**: 
  - ❌ DNS lookup: ~20-50ms
  - ❌ TCP connection: ~50-100ms
  - ❌ Preconnect overhead
- **Self-Host Benefits**: 
  - Save ~70-150ms on mobile
  - Eliminate 2 preconnect requests
  - Better cache control

### 3. ⚠️ **Devicon CSS** - Can Self-Host
- **Current**: `cdn.jsdelivr.net` (Devicon icons)
- **Size**: ~20-30KB CSS
- **Mobile Impact**: 
  - ❌ DNS lookup: ~20-50ms
  - ❌ TCP connection: ~50-100ms
  - ⚠️ Note: Most icons already intercepted by `diag4-prehook.js` (uses local SVGs)
- **Self-Host Benefits**: 
  - Save ~70-150ms on mobile
  - Eliminate 1 preconnect request
  - Most icons already local, just need CSS

### 4. ❌ **Google Analytics** - Cannot Self-Host
- **Current**: `googletagmanager.com`
- **Reason**: Google requires their domain for analytics
- **Optimization**: Already deferred on mobile (loads after 3 seconds)

---

## ✅ Self-Hosting Implementation Plan

### Phase 1: Self-Host Google Fonts (High Priority)

#### Step 1: Download Fonts
```bash
# Install Google Webfonts Helper CLI or use online tool
# https://gwfh.mranftl.com/fonts

# Or manually:
# 1. Go to https://fonts.google.com/
# 2. Select: Roboto, Poppins, Raleway
# 3. Download all weights (400, 500, 600, 700, 800, 900)
# 4. Use Google Webfonts Helper: https://gwfh.mranftl.com/fonts/roboto?subsets=latin
```

#### Step 2: Organize Fonts
```
public/assets/fonts/
  ├── roboto/
  │   ├── roboto-400.woff2
  │   ├── roboto-500.woff2
  │   ├── roboto-600.woff2
  │   ├── roboto-700.woff2
  │   ├── roboto-800.woff2
  │   └── roboto-900.woff2
  ├── poppins/
  │   └── (same structure)
  └── raleway/
      └── (same structure)
```

#### Step 3: Create Local CSS
```css
/* public/assets/fonts/google-fonts.css */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('./roboto/roboto-400.woff2') format('woff2');
}
/* ... repeat for all weights/fonts */
```

#### Step 4: Update index.html
```html
<!-- Remove Google Fonts CDN -->
<!-- <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet"> -->

<!-- Add local fonts -->
<link href="/assets/fonts/google-fonts.css" rel="stylesheet">
```

**Expected Mobile Savings**: 70-150ms (DNS + TCP + SSL)

---

### Phase 2: Self-Host Devicon CSS (Medium Priority)

#### Step 1: Download Devicon CSS
```bash
# Download from: https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css
# Save to: public/assets/vendor/devicon/devicon.min.css
```

#### Step 2: Update index.html
```html
<!-- Remove Devicon CDN -->
<!-- <link rel="preload" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" ...> -->

<!-- Add local Devicon -->
<link href="/assets/vendor/devicon/devicon.min.css" rel="stylesheet" media="print" onload="this.media='all'">
```

**Expected Mobile Savings**: 70-150ms (DNS + TCP + SSL)

---

## 📈 Expected Mobile Performance Improvements

### Network Overhead Reduction:
- **Google Fonts**: ~70-150ms saved
- **Devicon**: ~70-150ms saved
- **Total**: ~140-300ms saved on mobile

### Request Reduction:
- **Before**: 4 external domains (fonts.googleapis.com, fonts.gstatic.com, cdn.jsdelivr.net, googletagmanager.com)
- **After**: 1 external domain (googletagmanager.com - cannot self-host)
- **Savings**: 3 fewer DNS lookups, 3 fewer TCP connections

### Preconnect Cleanup:
- **Before**: 5 preconnect requests
- **After**: 2 preconnect requests (only for analytics)
- **Savings**: 3 fewer preconnect requests

---

## ⚠️ Trade-offs

### ✅ Benefits:
1. **Faster Mobile Load**: 140-300ms saved
2. **Fewer Requests**: 3 fewer DNS lookups
3. **Better Cache Control**: Can set longer cache times
4. **Privacy**: No tracking from Google Fonts

### ❌ Downsides:
1. **Bundle Size**: ~200-300KB fonts added to bundle
2. **No CDN Benefits**: No geographic distribution
3. **Maintenance**: Need to manually update fonts

---

## 🎯 Recommendation

### For Mobile LCP:
**Prioritize Google Fonts self-hosting** - Biggest impact (~70-150ms saved)

### For Overall Performance:
**Self-host both** - Eliminates 3 external domains, saves ~140-300ms on mobile

### For SEO:
**Both are worth it** - Every millisecond counts for mobile LCP ranking

---

## 📝 Implementation Priority

1. **High Priority**: Self-host Google Fonts (biggest mobile impact)
2. **Medium Priority**: Self-host Devicon CSS (smaller impact, but easy)
3. **Low Priority**: Already done (Font Awesome, Bootstrap)

---

## 🔧 Next Steps

1. Create script to download and optimize Google Fonts
2. Create local CSS file with `@font-face` declarations
3. Update `index.html` to use local fonts
4. Remove preconnect hints for external font domains
5. Test on mobile device
6. Measure LCP improvement

---

## 📚 Resources

- Google Webfonts Helper: https://gwfh.mranftl.com/
- Font Squirrel Webfont Generator: https://www.fontsquirrel.com/tools/webfont-generator
- WOFF2 Format: Best compression, best browser support

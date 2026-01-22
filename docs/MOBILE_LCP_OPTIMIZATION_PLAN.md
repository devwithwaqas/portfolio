# Mobile LCP Optimization Plan

## 📊 Problem

**Current Metrics:**
- **Desktop LCP**: 1.5s ✅ Excellent
- **Mobile LCP**: 5.2-5.8s ❌ Poor (Target: <2.5s)
- **Forced Reflows**: 188ms (154ms + 34ms)

**SEO Impact:**
- Mobile LCP is the #1 ranking factor for mobile search
- Google uses mobile-first indexing
- Poor mobile performance = lower search rankings

---

## 🔍 Root Causes

### 1. Network Speed (Biggest Factor)
- Desktop: Fast WiFi (100+ Mbps)
- Mobile: Slow 4G (1.5-7 Mbps)
- **Profile image** (LCP element) is ~50-70KB
- At 1.5 Mbps: 50KB takes ~267ms, but with latency/overhead: ~500-800ms

### 2. Image Loading
- Profile image is LCP element
- Not optimized for mobile (could be smaller)
- Decoding happens after download

### 3. Critical Path Latency
- CSS/JS parsing on weaker mobile CPUs
- Multiple resource requests (waterfall)
- Render-blocking resources

### 4. Forced Reflows (188ms)
- Navigation/Footer scroll handlers
- Home.vue scroll restoration
- EpicCard resize observers

---

## ✅ Solution Plan

### Phase 1: Optimize Profile Image for Mobile (High Priority)

#### 1.1 Create Mobile-Specific Image Variants
- **Desktop**: 365x116px @ 85% quality (~50-70KB)
- **Mobile**: 300x95px @ 75% quality (~25-35KB)
- **Target**: 40-50% file size reduction for mobile

#### 1.2 Use Responsive Images (`srcset`)
- Generate multiple sizes: 300w, 365w, 730w (2x)
- Use `sizes` attribute: `(max-width: 768px) 300px, 365px`
- Let browser choose best size for device

#### 1.3 WebP/AVIF Format
- Use modern formats (WebP/AVIF) for better compression
- Expected: 30-50% smaller than JPG at same quality

### Phase 2: Optimize Critical Path (Medium Priority)

#### 2.1 Critical CSS Inlining
- Extract critical above-the-fold CSS
- Inline in `<head>`
- Defer rest of CSS

#### 2.2 Resource Hints
- Preload profile image with higher priority
- Preconnect to image CDN/domain
- DNS-prefetch for external resources

#### 2.3 Defer Non-Critical Resources
- Defer Font Awesome (already done)
- Defer Devicon (already done)
- Defer analytics scripts

### Phase 3: Reduce Forced Reflows (Low Priority)

#### 3.1 Batch Layout Reads
- Cache layout properties
- Use `requestAnimationFrame` batching
- Reduce `getBoundingClientRect()` calls

#### 3.2 Optimize Scroll Handlers
- Debounce/throttle more aggressively
- Use `IntersectionObserver` instead of scroll events

---

## 📈 Expected Improvements

### Mobile LCP:
- **Current**: 5.2-5.8s
- **Target**: 3.5-4.0s (30-40% improvement)
- **Optimistic**: 2.8-3.2s (45-50% improvement)

### Forced Reflows:
- **Current**: 188ms
- **Target**: 80-100ms (47-57% reduction)

---

## 🔧 Implementation Steps

### Step 1: Generate Mobile Image Variants
```bash
node scripts/generate-mobile-hero-image.js
```

### Step 2: Update OptimizedImage Component
- Add responsive `srcset` generation
- Use `sizes` attribute for mobile

### Step 3: Optimize Forced Reflows
- Cache layout reads
- Batch operations

### Step 4: Test & Measure
- Test on real mobile device (3G/4G)
- Use PageSpeed Insights
- Verify LCP improvement

---

## ⚠️ Risks & Considerations

1. **Image Quality**: Lower quality may affect visual quality (test first)
2. **Browser Support**: WebP/AVIF not supported in older browsers (use fallback)
3. **Build Process**: May need to update build scripts

---

## 📝 Notes

- Mobile LCP is harder to optimize than desktop
- Network speed is the biggest factor (can't control user's connection)
- Image optimization is the #1 priority for mobile LCP
- Reducing forced reflows helps but won't dramatically improve LCP

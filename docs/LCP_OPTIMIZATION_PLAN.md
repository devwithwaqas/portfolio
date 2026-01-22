# 🚀 LCP Optimization Plan - Mobile Performance

## Problems Identified

### Performance Metrics (Mobile)
- **LCP**: 6s (Target: < 2.5s)
- **Style & Layout**: 1,401ms ⚠️ (Too high - animations causing reflows)
- **Script Evaluation**: 778ms
- **Script Parsing**: 100ms
- **Total Blocking Time (TBT)**: Unscored but high

### Root Causes
1. **Animations running on mount** - EpicCard, StatCard, ContactCard all start animations immediately
2. **SVG files** - 45+ SVG files not optimized/converted
3. **Main thread blocking** - Continuous animation loops consuming resources

---

## Solution Strategy

### 1. Lazy Animation Loading (Priority: HIGH)

**Current State:**
- EpicCard: SVG border animation runs continuously on mount
- StatCard: Counter animation runs immediately on mount
- ContactCard: CSS transitions but still triggers layout work

**New Approach:**
- All animations start as **INACTIVE**
- Animations activate **only on first touch/click/hover**
- Once activated, stay active for that session
- Use CSS `:active` and `touchstart` events for mobile-first

**Implementation:**
```javascript
// Pseudo-code pattern
data() {
  return {
    animationActive: false
  }
},
mounted() {
  // DO NOT start animations here
  // Wait for user interaction
},
methods: {
  activateAnimation() {
    if (!this.animationActive) {
      this.animationActive = true
      this.startAnimation()
    }
  }
}
```

### 2. SVG Optimization (Priority: MEDIUM)

**Current State:**
- 45 SVG icon files in `/public/assets/img/Icons/`
- 9 C4 diagram SVGs in `/public/assets/diagrams/`
- Basic SVG optimization script exists but doesn't convert to WebP

**New Approach:**
1. **Icons**: Convert to WebP (fallback to optimized SVG for icons that need scalability)
2. **Diagrams**: Keep as SVG (they need to be scalable for zoom), but lazy-load
3. **Optimize existing SVGs** with SVGO

**Trade-offs:**
- **WebP advantages**: Smaller file size, better compression
- **SVG advantages**: Scalable, crisp at any size, editable
- **Decision**: Convert simple icons to WebP, keep complex diagrams as SVG

### 3. CSS Optimization (Priority: HIGH)

**Current Issues:**
- Too many `will-change` properties causing layout thrashing
- Transitions on properties that trigger reflow (transform, opacity OK; height, width BAD)
- `contain: layout style paint` not used consistently

**Fixes:**
- Use `contain` for card components
- Use `transform` and `opacity` only for animations
- Remove unnecessary `will-change` (only add when animation active)

---

## Implementation Steps

### Phase 1: Animation Lazy Loading (Immediate Impact)

1. **EpicCard.vue**
   - Remove `setupAnimation()` from `mounted()`
   - Add `@touchstart` and `@click` handlers to activate
   - Start animation only after first interaction

2. **StatCard.vue**
   - Don't call `animateCounter()` in `mounted()`
   - Show final value immediately (no animation on load)
   - Add touch/click handler to animate on demand

3. **ContactCard.vue**
   - Already CSS-only, but verify no JS triggers on mount
   - Ensure `:hover` and `:active` work without JS

### Phase 2: SVG Conversion (Secondary)

1. Create `scripts/convert-svgs-to-webp.js`
2. Convert all icon SVGs to WebP (keep originals as backup)
3. Update icon references in code
4. Test visual quality

### Phase 3: Lazy Load Diagrams

1. Lazy load C4 diagrams in DiagramViewer
2. Use IntersectionObserver
3. Show placeholder until visible

---

## Expected Results

### Performance Improvements
- **LCP**: 6s → **~2-3s** (60-70% improvement)
- **Style & Layout**: 1,401ms → **~400ms** (70% reduction)
- **TBT**: Should score now (was unscored due to blocking)

### File Size Reductions
- **Icons**: 45 SVGs (~2-5KB each) → WebP (~1-2KB each)
- **Total savings**: ~100-150KB

---

## Testing Checklist

- [ ] Animations don't start on page load
- [ ] Animations activate on first touch/click
- [ ] No layout shifts after activation
- [ ] Mobile performance score improves
- [ ] Desktop experience still good
- [ ] All icons display correctly (WebP conversion)
- [ ] Diagrams lazy load correctly

---

## Rollback Plan

If performance doesn't improve or breaks functionality:
1. Revert animation changes (keep lazy loading for EpicCard)
2. Keep SVG icons (skip WebP conversion)
3. Keep CSS optimizations (they're safe)

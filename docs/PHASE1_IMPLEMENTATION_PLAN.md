# Phase 1 Implementation Plan - Approved Changes

## ✅ Approved Solutions

### 1. Scroll Restoration Fix ✅
**Approach**: 
- Wait for lazy components to load
- **ONLY restore scroll on navigation** (from another page)
- **NEVER restore scroll on refresh/reload** (let browser handle naturally)

**Implementation**:
- Check `navigation.type === 'reload'` → Clear all scroll flags, return early
- Check `navigation.type === 'back_forward'` → Let browser handle naturally
- Only restore `home:returnSection` for navigation from project/service pages
- Use IntersectionObserver to wait for target element to be loaded

**Risk**: ✅ Low - only affects scroll logic
**Status**: ✅ Implemented in Home.vue

---

### 2. Icon Size Generation (Automated) ✅
**Approach**: 
- Create automated script similar to `convert-svgs-to-webp.js`
- Generate multiple sizes: 42px (1x), 84px (2x) from existing PNG icons
- Create WebP/AVIF versions for each size
- Keep original 512x512px for scalability

**Script**: `scripts/generate-icon-sizes.js`
**Command**: `npm run generate-icon-sizes`

**Output**:
- `icon.png` → Original (keep)
- `icon.png` → 42px version (1x)
- `icon-2x.png` → 84px version (2x)
- Plus WebP/AVIF versions for each

**Next Step**: Update `IconComponent.vue` to use responsive `srcset`

**Risk**: ⚠️ Medium - need to ensure all sizes work correctly
**Status**: ✅ Script created, ready to run

---

### 3. Font Awesome Self-Hosting ✅
**Approach**: 
- Download Font Awesome 6.4.0 fonts via npm
- Copy fonts to `public/assets/fonts/`
- Create custom CSS with `font-display: swap`
- Replace CDN link with local CSS

**Implementation**:
1. Install: `npm install @fortawesome/fontawesome-free@6.4.0 --save-dev`
2. Copy `/webfonts` → `public/assets/fonts/fontawesome/`
3. Copy `/css/all.min.css` → `public/assets/fonts/fontawesome/all.css`
4. Modify CSS to use local font paths and add `font-display: swap`
5. Update `index.html` to use local CSS instead of CDN

**Benefits**:
- `font-display: swap` → 90ms improvement
- Local hosting → Faster load, no CDN dependency
- Better control → Can optimize further

**Risk**: ✅ Low - has CDN fallback
**Status**: Ready to implement

---

### 4. Profile Image Optimization ✅
**Approach**:
- Ensure WebP/AVIF versions exist
- Create responsive sizes (mobile: 400px, desktop: 800px)
- Verify `OptimizedImage` component is using them correctly

**Current**: `waqas-microsoft-profile-optimized.jpg` exists
**Need**: Check if WebP/AVIF versions exist, create if missing

**Risk**: ✅ Low - has JPG fallback
**Status**: Ready to check and optimize

---

## Implementation Order

### Step 1: Fix Scroll Restoration ✅
- [x] Updated `Home.vue` to wait for lazy components
- [x] Clear scroll flags on reload (prevent restoration)
- [x] Use IntersectionObserver to detect when target section loads

### Step 2: Create Icon Size Generation Script ✅
- [x] Created `scripts/generate-icon-sizes.js`
- [x] Added to `package.json` scripts
- [ ] Run script to generate sizes
- [ ] Update `IconComponent.vue` to use responsive `srcset`

### Step 3: Self-Host Font Awesome
- [ ] Install Font Awesome package
- [ ] Copy fonts to `public/assets/fonts/`
- [ ] Create custom CSS with `font-display: swap`
- [ ] Update `index.html` to use local CSS

### Step 4: Optimize Profile Image
- [ ] Check if WebP/AVIF versions exist
- [ ] Create responsive sizes if needed
- [ ] Verify `OptimizedImage` is using them correctly

---

## Expected Results

**After Phase 1**:
- ✅ Scroll restoration: Works correctly (no scroll on refresh)
- ✅ Icon images: ~90% size reduction (512px → 42px/84px)
- ✅ Font Awesome: `font-display: swap` → 90ms improvement
- ✅ Profile image: WebP/AVIF → ~50% size reduction

**Expected LCP**: 5.7s → ~3.5-4.0s (25-40% improvement)

---

## Testing Checklist

After implementation:
- [ ] Test scroll restoration on navigation (should work)
- [ ] Test scroll on refresh (should NOT restore, stays at top)
- [ ] Test icons load correctly (responsive sizes)
- [ ] Test Font Awesome icons display correctly (self-hosted)
- [ ] Test profile image loads correctly (WebP/AVIF)
- [ ] Run PageSpeed Insights to verify improvements

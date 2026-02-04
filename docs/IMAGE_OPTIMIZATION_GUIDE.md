# 🖼️ Image Optimization Guide

## Problem

Currently, portfolio thumbnails and hero image are using full-size images:
- **Portfolio thumbnails:** Using full-size images (84KB-716KB) displayed at ~200px height
- **Hero image:** Using full-size image (104KB) displayed at ~400px width

This wastes bandwidth and slows page load times.

---

## Solution

Create optimized thumbnail versions for portfolio cards and an optimized hero image.

---

## Step 1: Install Sharp (Image Processing Library)

```bash
npm install sharp --save-dev
```

---

## Step 2: Run Image Optimization Script

I've created a script that will:
- Create thumbnail versions of all portfolio images (800x400px, 80% quality)
- Create optimized hero image (800x800px, 85% quality)

**Run the script:**
```bash
node scripts/optimize-images.js
```

**What it creates:**
- `he1-thumb.jpg`, `aa1-thumb.jpg`, `bat1-thumb.jpg`, etc. (portfolio thumbnails)
- `waqas-microsoft-profile-optimized.jpg` (optimized hero image)

**Expected file size reduction:**
- Portfolio thumbnails: ~60-80% reduction (200KB → 40-80KB)
- Hero image: ~40-50% reduction (104KB → 50-60KB)

---

## Step 3: Update Code to Use Optimized Images

### A. Update Portfolio Component

The code is already updated to use thumbnails with fallback:
- If `*-thumb.jpg` exists → use thumbnail
- If not → use full-size image (backward compatible)

**Files updated:**
- `src/components/home/Portfolio.vue` - Uses thumbnail versions
- `src/components/home/Hero.vue` - Uses optimized hero image

### B. Verify Optimized Images Are Used

After running the script, check:
1. Portfolio cards load faster
2. Hero image loads faster
3. No broken images (fallback works)

---

## Manual Image Optimization (Alternative)

If you prefer to optimize images manually:

### Portfolio Thumbnails

**Recommended settings:**
- **Width:** 800px (2x for retina displays)
- **Height:** 400px (2x for retina displays)
- **Quality:** 80%
- **Format:** JPG

**Tools:**
- **Online:** https://squoosh.app/ (free, browser-based)
- **Desktop:** GIMP, Photoshop, ImageMagick
- **CLI:** ImageMagick, Sharp

**Naming convention:**
- Original: `he1.jpg`
- Thumbnail: `he1-thumb.jpg`

### Hero Image Optimization

**Recommended settings:**
- **Width:** 800px (2x for retina displays)
- **Height:** 800px (square crop, adjust if needed)
- **Quality:** 85%
- **Format:** JPG

**Original:** `waqas-microsoft-profile.jpg`  
**Optimized:** `waqas-microsoft-profile-optimized.jpg`

---

## Portfolio Images to Optimize

1. `he1.jpg` → `he1-thumb.jpg` (Heat Exchanger)
2. `aa1.jpg` → `aa1-thumb.jpg` (AirAsia)
3. `bat1.jpg` → `bat1-thumb.jpg` (BAT)
4. `pj1.jpg` → `pj1-thumb.jpg` (Smart City)
5. `sf1.jpg` → `sf1-thumb.jpg` (Gamified Employee)
6. `vp1.jpg` → `vp1-thumb.jpg` (Valet Parking)
7. `gd1.jpg` → `gd1-thumb.jpg` (Mobile Games)
8. `gpc1.jpg` → `gpc1-thumb.jpg` (UK Property)
9. `g51.jpg` → `g51-thumb.jpg` (G5 POS)
10. `in1.jpg` → `in1-thumb.jpg` (Insurance)

---

## After Optimization

1. **Test locally:**
   ```bash
   npm run dev
   ```
   - Check portfolio cards load thumbnails
   - Check hero image uses optimized version
   - Verify no broken images

2. **Check file sizes:**
   - Portfolio thumbnails should be 30-80KB
   - Hero image should be 50-70KB

3. **Test performance:**
   - Network tab should show smaller file sizes
   - Page load should be faster

4. **Deploy:**
   - Commit optimized images
   - Push to GitHub
   - Verify on live site

---

## Benefits

✅ **Faster page load** - Smaller images = faster downloads  
✅ **Better UX** - Images load immediately  
✅ **Lower bandwidth** - Save data for mobile users  
✅ **Better SEO** - Faster pages rank higher  
✅ **Maintained quality** - Still looks great at display size

---

**Note:** The code automatically falls back to full-size images if thumbnails don't exist, so it's safe to deploy even before running the optimization script.

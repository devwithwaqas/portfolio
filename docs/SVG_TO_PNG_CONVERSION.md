# ✅ SVG to PNG/WebP/AVIF Conversion

## Overview

All SVG icons in `public/assets/img/Icons/` are now converted to optimized PNG, WebP, and AVIF formats for better performance and browser compatibility.

## What Gets Converted

- **33 SVG files** in `public/assets/img/Icons/` directory
- Converts to:
  1. **PNG** (primary format, optimized, high quality)
  2. **WebP** (better compression, modern browsers)
  3. **AVIF** (best compression, newest browsers)

## How to Run

```bash
npm run convert-svgs-to-webp
```

Or directly:
```bash
node scripts/convert-svgs-to-webp.js
```

## What It Does

1. **Scans** `public/assets/img/Icons/` for `.svg` files
2. **Converts** each SVG to:
   - `filename.png` (optimized PNG, primary format)
   - `filename-optimized.webp` (WebP version)
   - `filename-optimized.avif` (AVIF version)
3. **Backs up** original SVG as `filename.svg.backup`
4. **Skips** files that are already converted and up-to-date

## Icon Resolver Behavior

The icon resolver now **prefers PNG over SVG**:
- If an icon mapping points to `Angular.svg`, it will try `Angular.png` first
- Browser handles 404 gracefully if PNG doesn't exist yet
- OptimizedImage component automatically uses WebP/AVIF when available

## Files Created

For each SVG file (e.g., `Angular.svg`):
- ✅ `Angular.png` (optimized PNG)
- ✅ `Angular-optimized.webp` (WebP)
- ✅ `Angular-optimized.avif` (AVIF)
- ✅ `Angular.svg.backup` (original SVG backup)

## Quality Settings

- **PNG**: 90% quality, maximum compression, adaptive filtering
- **WebP**: 85% quality, effort level 6
- **AVIF**: 80% quality, effort level 6
- **Max Dimension**: 512px (for icons)

## Benefits

✅ **Better Performance**: PNG/WebP/AVIF are smaller than SVG for icons
✅ **Better Browser Support**: PNG works everywhere
✅ **Modern Formats**: WebP/AVIF for modern browsers
✅ **Optimized**: Maximum compression while maintaining quality
✅ **Backward Compatible**: Original SVGs backed up

## After Conversion

1. ✅ Icon resolver automatically prefers PNG
2. ✅ OptimizedImage uses WebP/AVIF when available
3. ✅ Original SVGs are backed up (`.svg.backup`)
4. ✅ No code changes needed - everything works automatically

## Notes

- **Diagrams**: SVG files in `public/assets/diagrams/` are **NOT** converted (they need to stay as SVG for scalability)
- **Backups**: Original SVGs are kept as `.svg.backup` - you can delete them after verifying everything works
- **Re-running**: Script skips files that are already converted and up-to-date

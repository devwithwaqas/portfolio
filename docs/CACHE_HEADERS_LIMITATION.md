# Cache Headers Limitation on GitHub Pages

## Issue
GitHub Pages sets cache headers to **10 minutes** for static assets, which is shorter than optimal for performance. Ideally:
- **Hashed assets** (files with content hash like `index-D7JnwRdT.js`): Should be cached for **1 year** (immutable)
- **Images/icons**: Should be cached for **6 months**
- **HTML files**: Should be cached for **10 minutes** (with revalidation)

## Why GitHub Pages Limitation
GitHub Pages doesn't support:
- `.htaccess` files (Apache-style headers)
- `_headers` files (Netlify-style headers)
- Custom HTTP headers via GitHub Actions

GitHub Pages controls cache headers server-side, and we cannot override them.

## Current Workaround
We generate a `_headers` file during build (for future use), but **GitHub Pages ignores it**.

## Solutions

### Option 1: Use Cloudflare (Recommended - Free)
Cloudflare offers a free CDN that can sit in front of GitHub Pages and add proper cache headers:

1. Sign up for free Cloudflare account
2. Add your custom domain to Cloudflare
3. Configure Cloudflare to proxy GitHub Pages
4. Set up Page Rules in Cloudflare to add cache headers:
   ```
   Assets: Cache-Control: public, max-age=31536000, immutable
   Images: Cache-Control: public, max-age=15552000
   HTML: Cache-Control: public, max-age=600, must-revalidate
   ```

**Benefits:**
- ✅ Free tier available
- ✅ Better cache control
- ✅ Improved performance (CDN caching)
- ✅ DDoS protection
- ✅ Analytics

### Option 2: Migrate to Netlify/Vercel
These platforms support `_headers` files natively:

- **Netlify**: Automatically reads `_headers` file from `dist` or `public`
- **Vercel**: Supports `vercel.json` for headers configuration

**Migration effort:** Low - mostly configuration changes

### Option 3: Accept GitHub Pages Limitation
For now, the 10-minute cache is acceptable because:
- ✅ Vite generates content hashes for cache busting
- ✅ Files are re-downloaded every 10 minutes (ensures freshness)
- ✅ No additional setup required

**Impact:** Slightly slower repeat visits (files re-downloaded every 10 min vs 1 year), but still acceptable for a portfolio site.

## Files Generated
The build process creates `dist/_headers` file with proper cache configurations for future use when migrating to platforms that support it.

## References
- [GitHub Pages Limitations](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
- [Cloudflare Page Rules](https://developers.cloudflare.com/pages/platform/headers/)
- [Netlify Headers](https://docs.netlify.com/routing/headers/)

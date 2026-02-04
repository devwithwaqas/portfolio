# 🔧 Sitemap Troubleshooting Guide

## Issue: "Couldn't fetch" in Google Search Console

If Google Search Console shows "Couldn't fetch" for your sitemap, try these steps:

---

## Step 1: Verify Sitemap is Accessible

**Test the sitemap URL directly in your browser:**
```
https://devwithwaqas.github.io/portfolio/sitemap.xml
```

**Expected:** You should see XML content with all your pages listed.

**If you see:**
- ❌ **404 Error** → Sitemap isn't being deployed
- ❌ **Redirect to index.html** → GitHub Pages is routing it through SPA
- ❌ **Blank page** → Sitemap exists but has issues
- ✅ **XML content** → Sitemap is working, issue might be with Search Console

---

## Step 2: Check Deployment

1. **Go to:** https://github.com/devwithwaqas/portfolio/actions
2. **Check latest deployment** - Should show "green checkmark"
3. **Click on the deployment** to see build logs
4. **Look for:**
   - `✓ Generated sitemap.xml`
   - `✓ Copied sitemap.xml from public/ to dist/`

---

## Step 3: Verify File is in Repository

1. **Go to:** https://github.com/devwithwaqas/portfolio
2. **Navigate to:** `public/sitemap.xml`
3. **Verify file exists** and has content

---

## Step 4: Try Full URL in Search Console

If entering just `sitemap.xml` doesn't work, try the **full URL**:

1. **In Search Console > Sitemaps**
2. **Enter:**
   ```
   https://devwithwaqas.github.io/portfolio/sitemap.xml
   ```
3. **Click:** "Submit"

---

## Step 5: Wait and Retry

Sometimes Google needs time:
1. **Wait 24-48 hours** after deployment
2. **Try submitting again** in Search Console
3. **Check sitemap URL** is still accessible

---

## Common Issues

### Issue: Sitemap shows as HTML (redirected)
**Cause:** GitHub Pages is routing through 404.html  
**Fix:** Sitemap should be in `dist/` root, not caught by SPA routing

### Issue: 404 Error
**Cause:** Sitemap not in dist folder  
**Fix:** Check build logs, ensure copy script ran

### Issue: "Couldn't fetch" but URL works in browser
**Cause:** Google's crawler might be blocked or timing out  
**Fix:** Wait 24-48 hours, try resubmitting

---

## Manual Test

**Test sitemap with curl:**
```bash
curl -I https://devwithwaqas.github.io/portfolio/sitemap.xml
```

**Should return:**
- Status: `200 OK`
- Content-Type: `application/xml` or `text/xml`

---

**After deployment, test the URL and let me know what you see!** 🔍

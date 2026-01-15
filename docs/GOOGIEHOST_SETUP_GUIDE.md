# GoogieHost Setup Guide - Quick Start

## Step 1: Sign Up

1. **Visit:** https://www.googiehost.com/freephphosting
2. **Click:** "Join Now" or "Start for Free"
3. **Fill out registration form:**
   - Email address
   - Password
   - Choose a subdomain name (e.g., `waqas-analytics`)

## Step 2: Choose Your Subdomain

During registration, you'll be asked to choose a subdomain:

**Options:**
- `yoursite.googiehost.com`
- `yoursite.freewha.com`

**Recommendation:** Choose something like:
- `waqas-analytics.googiehost.com`
- `waqas-api.googiehost.com`
- `waqas-ga4.googiehost.com`

**Your API URL will be:**
```
https://your-chosen-subdomain.googiehost.com/ga4-analytics.php
```

## Step 3: Verify Email

1. Check your email inbox
2. Click the verification link
3. Complete account setup

## Step 4: Access Control Panel

1. Log in to GoogieHost
2. Access **DirectAdmin** control panel
3. Navigate to **File Manager**

## Step 5: Upload Your PHP Files

1. In File Manager, go to `public_html` folder
2. Upload these files:
   - `ga4-analytics.php`
   - `ga4-service-account-key.json`
   - `.htaccess` (optional, for CORS headers)

## Step 6: Set File Permissions

1. Right-click `ga4-service-account-key.json`
2. Set permissions to **600** (owner read/write only)
3. Click Apply

## Step 7: Test Your Endpoint

1. Open browser
2. Visit: `https://your-subdomain.googiehost.com/ga4-analytics.php`
3. **Expected:** Should return JSON (not HTML error)

**Example response:**
```json
{
  "totalViews": 6501,
  "topItems": [...],
  "cached": false
}
```

## Step 8: Test CORS

Open browser console on your GitHub Pages site and run:

```javascript
fetch('https://your-subdomain.googiehost.com/ga4-analytics.php', {
  method: 'OPTIONS',
  headers: {
    'Origin': 'https://devwithwaqas.github.io',
    'Access-Control-Request-Method': 'GET'
  }
}).then(r => {
  console.log('Status:', r.status);
  console.log('CORS Origin:', r.headers.get('Access-Control-Allow-Origin'));
  console.log('CORS Methods:', r.headers.get('Access-Control-Allow-Methods'));
}).catch(e => console.error('CORS Error:', e));
```

**Expected Result:**
- Status: `200 OK`
- CORS Origin: `https://devwithwaqas.github.io` (or `*`)
- CORS Methods: `GET, OPTIONS, POST`

If you see CORS headers, it works! ✅

## Step 9: Update GitHub Secret

1. Go to GitHub repo > **Settings** > **Secrets and variables** > **Actions**
2. Find `VITE_ANALYTICS_API_ENDPOINT`
3. Click **Update**
4. Change value to: `https://your-subdomain.googiehost.com/ga4-analytics.php`
5. Click **Update secret**

## Step 10: Redeploy

1. Push a commit, or
2. Go to **Actions** tab > **Deploy to GitHub Pages** > **Run workflow**

## Step 11: Test on Live Site

1. Visit your GitHub Pages site
2. Check browser console for analytics logs
3. Analytics stats should appear in Hero section! 🎉

---

## Troubleshooting

### Issue: Endpoint returns HTML instead of JSON
**Fix:** Check PHP file is uploaded correctly and file permissions are correct

### Issue: CORS still blocked
**Fix:** 
- Check `.htaccess` file is uploaded
- Verify PHP file has CORS headers
- Try Railway or Fly.io if GoogieHost also blocks CORS

### Issue: Service account key not found
**Fix:** 
- Verify `ga4-service-account-key.json` is in `public_html` folder
- Check file name is exactly `ga4-service-account-key.json` (case-sensitive)
- Verify file permissions are `600`

---

## What You'll Need

- ✅ GoogieHost account (free)
- ✅ Your `ga4-analytics.php` file
- ✅ Your `ga4-service-account-key.json` file
- ✅ Your `.htaccess` file (optional)

That's it! Good luck! 🚀

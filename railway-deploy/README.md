# Railway Deployment - GA4 Analytics Endpoint

## Quick Deploy Steps

1. **Go to Railway:** https://railway.app
2. **Create New Project:**
   - Click "New Project" → "Empty Project"
3. **Add Service:**
   - Click "+ New" → "Empty Service"
4. **Upload Files:**
   - Click "Settings" → "Source" → "Connect GitHub" (recommended)
   - OR drag and drop all files from this folder
5. **Configure Port:**
   - Go to "Settings" → "Networking"
   - Set port to `8080`
6. **Deploy:**
   - Railway will auto-detect Dockerfile and deploy
7. **Get URL:**
   - Go to "Settings" → "Networking"
   - Generate public domain
   - Your API: `https://your-app.railway.app/ga4-analytics.php`

## Files Included

- `Dockerfile` - Docker configuration
- `nginx.conf` - Nginx with CORS headers
- `ga4-analytics.php` - Your PHP endpoint
- `ga4-service-account-key.json` - Google service account key

## Test After Deployment

```javascript
// In browser console on your GitHub Pages site
fetch('https://your-app.railway.app/ga4-analytics.php')
  .then(r => r.json())
  .then(console.log);
```

Should return analytics data without CORS errors! ✅

# Railway Function - GA4 Analytics Endpoint

## Quick Deploy

1. **Go to Railway:** https://railway.app
2. **Create New Project** → **Empty Project**
3. **Add Function:**
   - Click "+ New" → **"Function"** (or look for "Railway Function")
   - Connect GitHub repo OR upload files
4. **Set Root Directory:**
   - If using GitHub, set root to `railway-function`
5. **Set Environment Variables:**
   - Go to service → **Variables** tab
   - Add:
     - `GA4_PROPERTY_ID` = `519885223`
     - `GA4_SERVICE_ACCOUNT_JSON` = (paste full JSON content from service account key file)
6. **Deploy:**
   - Railway will auto-detect TypeScript and deploy
7. **Get URL:**
   - Go to **Settings** → **Networking**
   - Generate public domain
   - Your API: `https://your-function.railway.app`

## Environment Variables

- `GA4_PROPERTY_ID` - Your GA4 Property ID (numeric)
- `GA4_SERVICE_ACCOUNT_JSON` - Full JSON content from service account key file

## Test

```javascript
fetch('https://your-function.railway.app')
  .then(r => r.json())
  .then(console.log);
```

Should return analytics data with CORS headers! ✅

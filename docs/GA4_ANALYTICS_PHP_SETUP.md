# 📊 GA4 Analytics Data PHP Setup Guide

## Quick Setup for ProFreeHost

This guide shows you how to set up the `ga4-analytics.php` endpoint on your ProFreeHost server to fetch analytics stats.

---

## 📋 Step-by-Step Setup

### Step 1: Get GA4 Property ID

⚠️ **IMPORTANT:** 
- This is DIFFERENT from your **Measurement ID** (`G-1HMMJLP7GK`)!
- This is DIFFERENT from your **Account ID** (`380571509`)!

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon, bottom left)
3. Make sure you're in the **Property** column (middle column), NOT Account column
4. Look for **Property Settings** (under Property column)
5. Click on **Property Settings**
6. You'll see **Property ID** (numeric, e.g., `123456789`)
   - It's a **numeric number** (usually 8-9 digits)
   - It's NOT the Account ID you see in Account Settings
   - It's NOT the Measurement ID format (`G-XXXXXXXXXX`)
   - Usually shown as: `Property ID: 123456789`
7. **Copy this Property ID number** - you'll need it in Step 4

**Visual Guide:**
```
GA4 Admin Page Layout:
┌─────────────┬─────────────┬─────────────┐
│   Account   │  Property   │   View      │
│             │             │             │
│ Account ID: │ Property    │ View ID:    │
│ 380571509   │ Settings    │ (not needed)│
│             │    ↓        │             │
│             │ Property ID │             │
│             │ 123456789   │             │
└─────────────┴─────────────┴─────────────┘
         ↑            ↑
    (not this)   (THIS ONE!)
```

---

### Step 2: Create Service Account & Get JSON Key

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Select/Create Project** (or use existing one)
3. **Enable Analytics Data API**:
   - Go to **APIs & Services** > **Library**
   - Search for "Google Analytics Data API"
   - Click **Enable**

4. **Create Service Account**:
   - Go to **IAM & Admin** > **Service Accounts**
   - Click **Create Service Account**
   - Name: `ga4-analytics-reader`
   - Click **Create and Continue**
   - Skip roles (not needed for API access)
   - Click **Done**

5. **Create Key**:
   - Click on your new service account
   - Go to **Keys** tab
   - Click **Add Key** > **Create new key**
   - Select **JSON**
   - Click **Create**
   - **Download the JSON file** (save it securely!)

6. **Grant GA4 Access**:
   - Go back to [Google Analytics](https://analytics.google.com/)
   - Click **Admin** > **Property Access Management**
   - Click **+** button
   - Add your service account email (found in JSON file as `client_email`)
   - Grant **Viewer** permissions
   - Click **Add**

---

### Step 3: Upload Files to ProFreeHost

⚠️ **IMPORTANT:** `ga4-analytics.php` is a **NEW file** - it does NOT replace your existing `ga4-track.php` file. You'll have both files on your server.

1. **Upload `ga4-analytics.php`**:
   - Log into ProFreeHost cPanel
   - Go to **File Manager**
   - Navigate to `public_html` (or your website root) - same location where `ga4-track.php` is
   - Upload `ga4-analytics.php` (keep your existing `ga4-track.php`!)

2. **Upload Service Account Key**:
   - Upload the downloaded JSON key file
   - Rename it to: `ga4-service-account-key.json`
   - Place it in the **same directory** as `ga4-analytics.php` and `ga4-track.php`

3. **Set Permissions**:
   - Right-click `ga4-service-account-key.json`
   - Set permissions to `600` (owner read/write only) for security
   - The PHP file should have `644` permissions

---

### Step 4: Configure Property ID

1. **Edit `ga4-analytics.php`** in File Manager:
   - Find line: `$PROPERTY_ID = 'YOUR_PROPERTY_ID_HERE';`
   - Replace with your actual **numeric Property ID** (from Step 1)
   - Example: `$PROPERTY_ID = '123456789';`
   - ⚠️ Make sure it's numeric, NOT the `G-1HMMJLP7GK` format (that's Measurement ID)

2. **Verify CORS Domain** (if needed):
   - The file is set to: `https://devwithwaqas.github.io` (specific domain, not wildcard)
   - This matches your `.htaccess` settings
   - If your portfolio URL is different, update the CORS header

3. **Verify Service Account Key Path**:
   - Check that line: `$SERVICE_ACCOUNT_KEY_PATH = __DIR__ . '/ga4-service-account-key.json';`
   - This should work if both files are in the same directory
   - If different location, update the path

4. **Save the file**

---

### Step 5: Test the Endpoint

1. **Get your PHP server URL** (e.g., `https://yoursite.profreehost.com`)

2. **Test in browser**:
   ```
   https://yoursite.profreehost.com/ga4-analytics.php
   ```

3. **Expected Response** (if working):
   ```json
   {
     "totalViews": 15234,
     "topItems": [
       {
         "name": "BAT Inhouse App",
         "views": 1245,
         "url": "/projects/bat-inhouse-app",
         "type": "project"
       },
       ...
     ],
     "cached": false
   }
   ```

4. **If you see errors**, check:
   - Property ID is correct
   - Service account key file exists and is readable
   - Service account has access to GA4 property
   - PHP has `curl` and `openssl` extensions enabled (usually enabled by default)

---

### Step 6: Configure Environment Variable

Add your PHP endpoint URL to your portfolio project:

**In `.env` file (for local development):**
```
VITE_ANALYTICS_API_ENDPOINT=https://yoursite.profreehost.com/ga4-analytics.php
```

**Or in GitHub Secrets (for production):**
- Go to GitHub repo > **Settings** > **Secrets and variables** > **Actions**
- Click **New repository secret**
- Name: `VITE_ANALYTICS_API_ENDPOINT`
- Value: `https://yoursite.profreehost.com/ga4-analytics.php`
- Click **Add secret**

---

## ✅ Verification

After deployment:

1. **Visit your portfolio site**
2. **Open browser console** (F12)
3. **Check for analytics data loading**:
   - Should see: `[Analytics] Fetching analytics data...`
   - No errors about API endpoint

4. **Check Hero section**:
   - Analytics stats should appear
   - Total views displayed
   - Top 3 items listed (if you have data)

---

## 🔒 Security Notes

- ✅ Service account key has **read-only** access (Viewer role)
- ✅ Key file should have `600` permissions (owner read/write only)
- ✅ CORS is enabled but API has no authentication (acceptable for public read-only stats)
- ✅ Caching reduces API calls (5 minutes default)

---

## 🐛 Troubleshooting

### Error: "Service account key file not found"
- **Fix**: Ensure `ga4-service-account-key.json` is in the same directory as `ga4-analytics.php`
- Check file name matches exactly (case-sensitive)

### Error: "Failed to get access token"
- **Fix**: Check that JSON key file is valid
- Ensure service account email has access to GA4 property
- Verify `openssl` extension is enabled in PHP

### Error: "Failed to fetch total views: HTTP 403"
- **Fix**: Service account doesn't have access to GA4 property
- Go to GA4 > Admin > Property Access Management
- Add service account email with Viewer permissions

### Error: "GA4 Property ID not configured"
- **Fix**: Edit `ga4-analytics.php` and set `$PROPERTY_ID` to your actual Property ID

### No data showing in frontend
- **Fix**: Check browser console for errors
- Verify `VITE_ANALYTICS_API_ENDPOINT` is set correctly
- Test endpoint URL directly in browser first

---

## 📝 File Structure on Server

```
public_html/
├── ga4-analytics.php              (NEW - analytics data fetcher)
├── ga4-track.php                  (EXISTING - event tracker, keep this!)
├── ga4-service-account-key.json   (NEW - service account credentials)
├── ga4-analytics-cache.json       (auto-generated cache file)
└── .htaccess                      (existing - CORS config)
```

**Note:** You'll have **BOTH** PHP files on your server:
- `ga4-track.php` - Sends events to GA4 (already working)
- `ga4-analytics.php` - Fetches analytics data (NEW - for stats component)

---

## 🎯 Next Steps

Once set up, the analytics stats component will automatically:
- ✅ Fetch total views every 5 minutes
- ✅ Display top 3 most viewed projects/services
- ✅ Cache responses to reduce API calls
- ✅ Show real-time data in Hero section

That's it! Your analytics stats should now be working! 🚀
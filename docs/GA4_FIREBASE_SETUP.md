# 🔧 GA4 Firebase Property Setup Guide

## 📋 What You Need

You've provided:
- ✅ **Measurement ID**: `G-02TG7S6Z2V`
- ✅ **Stream ID**: `13356181588`
- ✅ **Stream URL**: `https://waqasahmad-portfolio.web.app/`

**Now configured:**
- ✅ **Property ID**: `521230752`
- ✅ **API Secret**: `waqasahmad-portfolio-secret` (value configured in Cloud Functions)

---

## 🔍 How to Find Property ID

1. **Go to [Google Analytics](https://analytics.google.com/)**
2. **Select your Firebase property**: "My Portfolio Firebase (waqas ahmad)"
3. **Click Admin** (gear icon, bottom left)
4. **In the Property column**, click **"Property Settings"**
5. **Property ID** is shown at the top (numeric, e.g., `123456789`)

**Alternative:**
- Look at the URL: `https://analytics.google.com/analytics/web/#/p123456789/`
- The number after `/p` is your Property ID

---

## 🔐 How to Create API Secret

1. **In GA4 Admin**, go to **Property Settings**
2. Scroll down to **"Data Streams"**
3. Click on your stream: **"My Portfolio Firebase (waqas ahmad)"**
4. Scroll down to **"Measurement Protocol API secrets"**
5. Click **"Create"**
6. **Name it**: `Firebase Portfolio Secret` (or any name)
7. **Copy the secret** (format: `xxxxxxxxxxxxxxxxxxxx`)

---

## 📊 Current Setup

### GitHub Pages Property (Existing)
- **Property ID**: `519885223`
- **Measurement ID**: `G-1HMMJLP7GK`
- **API Secret**: `p4SbgXEyTKOikyV8ZZACig`
- **URL**: `https://devwithwaqas.github.io/portfolio/`

### Firebase Property
- **Property ID**: `521230752` ✅
- **Measurement ID**: `G-02TG7S6Z2V` ✅
- **API Secret**: `waqasahmad-portfolio-secret` (in Cloud Functions) ✅
- **Stream ID**: `13356181588` ✅
- **URL**: `https://waqasahmad-portfolio.web.app/`

---

## 🔄 What Needs to Be Updated

Once you have Property ID and API Secret, I'll update:

1. **Frontend** (`index.html`, `vite.config.js`):
   - Use `G-02TG7S6Z2V` for Firebase builds
   - Use `G-1HMMJLP7GK` for GitHub Pages builds

2. **Google Cloud Functions** (`gcloud-function/index.js`, `index-read.js`, `index-update.js`):
   - Detect which site is calling (GitHub Pages vs Firebase)
   - Use correct Property ID based on origin
   - Use correct Measurement ID and API Secret

3. **Environment Variables**:
   - Add `VITE_GA4_MEASUREMENT_ID_FIREBASE` for Firebase builds
   - Keep `VITE_GA4_MEASUREMENT_ID` for GitHub Pages

---

## 🔑 Service account access (required after deploy)

The Cloud Functions use service account  
`ga4-analytics-reader-portfolio@robust-builder-484406-b3.iam.gserviceaccount.com`.

**Without Viewer access to the Firebase GA4 property (521230752), the UPDATE function returns `PERMISSION_DENIED`.**

**Manual steps (must be done in GA4 UI):**

1. Open **[Google Analytics](https://analytics.google.com/)**
2. Select property **"My Portfolio Firebase (waqas ahmad)"**
3. **Admin** (gear, bottom left) → **Property access management**
4. **Add users** → paste:
   ```
   ga4-analytics-reader-portfolio@robust-builder-484406-b3.iam.gserviceaccount.com
   ```
5. Role: **Viewer** → **Add**
6. Repeat for the GitHub Pages property if the service account is not already there.

**After granting access**, trigger the update once:
```powershell
Invoke-WebRequest -Uri "https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-update" -UseBasicParsing
```
Or wait for the Cloud Scheduler job (runs every minute).

**Do not** run `npm install @google-analytics/admin` in `gcloud-function`. It is not used; GA4 access is manual only.

---

## 📝 Status

- All code updated to support both GA4 properties (GitHub Pages + Firebase).
- Cloud Functions (`index-read`, `index-update`, unified `index`) use origin-based config.
- Frontend uses `G-02TG7S6Z2V` for Firebase builds, `G-1HMMJLP7GK` for GitHub Pages.

---

## 🎯 Checklist

- [x] Property ID `521230752` configured
- [x] API Secret configured in Cloud Functions
- [x] Frontend and Cloud Functions updated

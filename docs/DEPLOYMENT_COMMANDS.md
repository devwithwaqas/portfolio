# 🚀 Build & Deployment Commands

## 📦 Build Commands

### GitHub Pages Build (Default)
```powershell
npm run build
```
**Output:** `dist/` folder with base path `/portfolio/`  
**URL:** `https://devwithwaqas.github.io/portfolio/`  
**Auto-deploys:** Via GitHub Actions on push to `main` branch

---

### Firebase Hosting Build
```powershell
npm run build:firebase
```
**Output:** `dist/` folder with base path `/`  
**URL:** `https://waqasahmad-portfolio.web.app`  
**Manual deploy required:** See deployment commands below

---

## 🚀 Deployment Commands

### Firebase Hosting - Full Deploy (Build + Deploy)
```powershell
npm run deploy:firebase
```
**What it does:**
1. Builds for Firebase (`npm run build:firebase`)
2. Deploys to Firebase Hosting (`firebase deploy --only hosting --project waqasahmad-portfolio`)

**Result:** Site live at `https://waqasahmad-portfolio.web.app`

---

### Firebase Hosting - Deploy Only (if already built)
```powershell
npm run deploy:firebase:hosting
```
**Use when:** You've already run `npm run build:firebase` and just want to deploy

---

### Firebase Hosting - Manual Commands
```powershell
# Step 1: Build
npm run build:firebase

# Step 2: Deploy
firebase deploy --only hosting --project waqasahmad-portfolio
```

---

## 🔍 Verification Commands

### Check Firebase Project
```powershell
firebase projects:list
firebase use waqasahmad-portfolio
```

### Check Build Output
```powershell
# Count files in dist
Get-ChildItem -Path dist -Recurse -File | Measure-Object | Select-Object -ExpandProperty Count

# Check dist exists
Test-Path dist
```

### Check Firebase Hosting Sites
```powershell
firebase hosting:sites:list --project waqasahmad-portfolio
```

---

## 📋 Quick Reference

| Task | Command |
|------|---------|
| **Build for GitHub Pages** | `npm run build` |
| **Build for Firebase** | `npm run build:firebase` |
| **Deploy to Firebase (full)** | `npm run deploy:firebase` |
| **Deploy to Firebase (hosting only)** | `npm run deploy:firebase:hosting` |
| **Check Firebase project** | `firebase use waqasahmad-portfolio` |
| **List Firebase projects** | `firebase projects:list` |

---

## 🌐 Live URLs

| Deployment | URL |
|------------|-----|
| **GitHub Pages** | https://devwithwaqas.github.io/portfolio/ |
| **Firebase Hosting** | https://waqasahmad-portfolio.web.app |
| **Sitemap (GitHub)** | https://devwithwaqas.github.io/portfolio/sitemap.xml |
| **Sitemap (Firebase)** | https://waqasahmad-portfolio.web.app/sitemap.xml |

---

## ⚠️ Important Notes

1. **GitHub Pages**: Auto-deploys on push to `main` branch (via GitHub Actions)
2. **Firebase Hosting**: Manual deployment required using commands above
3. **Build Mode**: 
   - `npm run build` → GitHub Pages mode (base path `/portfolio/`)
   - `npm run build:firebase` → Firebase mode (base path `/`)
4. **Sitemap**: Generated automatically during build with correct URLs for each deployment

---

## 🐛 Troubleshooting

### Build Fails
```powershell
# Clean and rebuild
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
npm run build:firebase
```

### Deployment Fails
```powershell
# Check Firebase login
firebase login

# Verify project
firebase use waqasahmad-portfolio
firebase projects:list

# Check hosting sites
firebase hosting:sites:list --project waqasahmad-portfolio
```

### CORS Errors
- Make sure Google Cloud Functions are updated with Firebase URL in CORS allowed origins
- See `gcloud-function/index-read.js` and `serverless/sendEmail/index.js`

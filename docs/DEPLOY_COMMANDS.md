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

### Firebase Hosting - Full Deploy (Build + Deploy) ⭐ RECOMMENDED
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

### Firebase Hosting - Manual Step-by-Step
```powershell
# Step 1: Build
npm run build:firebase

# Step 2: Deploy
firebase deploy --only hosting --project waqasahmad-portfolio
```

**Or use the npm script (same as above):**
```powershell
npm run deploy:firebase
```

---

## Step-by-Step with Status Checks

### 1. Clean previous build (optional)
```powershell
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
```

### 2. Build for Firebase
```powershell
npm run build:firebase
```

### 3. Check build output
```powershell
# Count files in dist
Get-ChildItem -Path dist -Recurse -File | Measure-Object | Select-Object -ExpandProperty Count

# Or just verify dist folder exists
Test-Path dist
```

### 4. Deploy to Firebase
```powershell
firebase deploy --only hosting --project waqasahmad-portfolio
```

**Or use the npm script:**
```powershell
npm run deploy:firebase:hosting
```

---

## What Each Command Does

### `npm run build:firebase`
- Builds with `--mode firebase` (base URL = `/`)
- Generates optimized chunks with new code splitting
- Creates service worker with correct paths
- Generates sitemap and other static files
- Output: `dist/` folder

### `firebase deploy --only hosting`
- Deploys only the `dist/` folder to Firebase Hosting
- Uses config from `firebase.json`
- Preserves service worker and rewrites
- Updates live site immediately

---

## Expected Output

After `npm run build:firebase`, you should see:
```
✓ Built in Xs
✓ Generated sw.js with base path: /
✓ All scripts completed
```

After `firebase deploy --only hosting`, you should see:
```
✔ Deploy complete!
Hosting URL: https://waqasahmad-portfolio.web.app
```

---

## Troubleshooting

### If build fails:
```powershell
# Clear node_modules and reinstall (if needed)
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
npm install
npm run build:firebase
```

### If deployment fails:
```powershell
# Check Firebase login
firebase login

# Check current project
firebase projects:list

# Use correct project
firebase use waqasahmad-portfolio

# Verify hosting sites
firebase hosting:sites:list --project waqasahmad-portfolio
```

---

## 📋 Quick Reference Table

| Task | Command |
|------|---------|
| **Build for GitHub Pages** | `npm run build` |
| **Build for Firebase** | `npm run build:firebase` |
| **Deploy to Firebase (full)** | `npm run deploy:firebase` ⭐ |
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

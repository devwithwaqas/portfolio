# 🚀 Firebase Deployment Commands

## Quick Copy-Paste Commands

### Step 1: Build for Firebase
```bash
npm run build:firebase
```

### Step 2: Deploy to Firebase Hosting
```bash
firebase deploy --only hosting
```

### Or Deploy Everything (if you have functions/firestore rules)
```bash
firebase deploy
```

---

## Full Deployment Sequence (Copy All)

```bash
npm run build:firebase && firebase deploy --only hosting
```

---

## Step-by-Step with Status Checks

### 1. Clean previous build (optional)
```bash
rm -rf dist
```

### 2. Build for Firebase
```bash
npm run build:firebase
```

### 3. Check build output
```bash
# Windows PowerShell
Get-ChildItem dist/assets/js | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB,2)}}

# Or just verify dist folder exists
dir dist
```

### 4. Deploy to Firebase
```bash
firebase deploy --only hosting
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
```bash
# Clear node_modules and reinstall (if needed)
rm -rf node_modules package-lock.json
npm install
npm run build:firebase
```

### If deployment fails:
```bash
# Check Firebase login
firebase login

# Check current project
firebase projects:list

# Use correct project
firebase use your-project-id
```

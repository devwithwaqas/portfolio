# 🚀 Firebase Deployment - Copy Paste Commands

## Step 1: Build for Firebase

```powershell
npm run build:firebase
```

This will:
- Build your Vue app with Firebase base path (`/`)
- Generate service worker with correct paths
- Create all necessary files in `dist/` folder
- **Automatically sets SMTP endpoint** (Google Cloud Functions) - no `.env` file needed for SMTP

## Step 2: Deploy to Firebase Hosting

```powershell
firebase deploy --only hosting
```

This will:
- Upload `dist/` folder to Firebase Hosting
- Deploy with the correct rewrite rules (including sw.js fix)
- Make your site live on Firebase

## Full Deployment (Hosting + Functions - if needed)

```powershell
firebase deploy
```

## Verify Deployment

After deployment, check:
1. Your Firebase Hosting URL (shown in terminal)
2. Open browser console and check for `sw.js` errors (should be gone!)
3. Test service worker: Open DevTools > Application > Service Workers

## Troubleshooting

If you get "Firebase not initialized":
```powershell
firebase login
firebase init hosting
```
(Select existing project, use `dist` as public directory)

If build fails:
```powershell
npm install
npm run build:firebase
```

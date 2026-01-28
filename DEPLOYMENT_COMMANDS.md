# Deployment Commands

## 1. Deploy Cloud Functions First

**Deploy all Cloud Functions:**
```powershell
.\scripts\deploy-all-functions.ps1
```

This will:
- Set up secrets (if you choose 'y')
- Deploy all 5 functions:
  - `portfolioAnalyticsAPI`
  - `readPortfolioAnalytics`
  - `updatePortfolioAnalytics`
  - `reportPortfolioError`
  - `sendEmail`
- Update Cloud Scheduler job

**After deployment, note the function URLs:**
- Analytics: `https://us-central1-robust-builder-484406-b3.cloudfunctions.net/readPortfolioAnalytics`
- Email: `https://us-central1-robust-builder-484406-b3.cloudfunctions.net/sendEmail`
- Error Report: `https://us-central1-robust-builder-484406-b3.cloudfunctions.net/reportPortfolioError`

---

## 2. Local Development Setup

**Create `.env.local` file** (copy from `env.local.template`):
```powershell
Copy-Item env.local.template .env.local
```

The `.env.local` file is already configured with the correct Cloud Function URLs.

**Run locally:**
```powershell
npm run dev
```

The frontend will use the Cloud Functions URLs from `.env.local`.

---

## 3. Deploy to Firebase Hosting

### Development Deployment (Firebase Dev)
```powershell
npm run deploy:firebase:dev
```

Or with a custom build number:
```powershell
npm run deploy:firebase:dev -- 12345
```

### Production Deployment (Firebase Prod)
```powershell
npm run deploy:firebase
```

Or with a custom build number:
```powershell
npm run deploy:firebase -- 12345
```

### Deploy Only Hosting (skip build)
```powershell
npm run deploy:firebase:hosting
```

---

## Notes

- **Cloud Functions** are deployed to Google Cloud (not Firebase Functions)
- **Firebase Hosting** is for the frontend only
- The `vite.config.js` automatically sets Cloud Function URLs when building for Firebase
- Build numbers are auto-generated if not provided
- The deployment script shows previous and new build numbers
- **Dev vs prod package count:** The deploy script runs `npm ci` (or `npm install`) with full deps before every build. Dev and prod use the same install, so you get the same package count (~211) for both. Previously, prod could show fewer (~208) if `NODE_ENV=production` or `--omit=dev` skipped devDependencies. Use `--skip-install` to skip the install step (e.g. if `npm ci` fails with esbuild in use, or you already ran install).

---

## Troubleshooting

**If Cloud Functions fail to deploy:**
1. Check logs: `.\scripts\check-functions-simple.ps1`
2. Verify `gcloud` is authenticated: `gcloud auth list`
3. Check function URLs are correct in `vite.config.js`

**If Firebase deployment fails:**
1. Check Firebase login: `firebase login`
2. Verify project: `firebase projects:list`
3. Check build output: `npm run build` (for dev: `npm run build -- --mode firebase-dev`)

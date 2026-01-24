# Firebase Project Setup - waqasahmad-portfolio

## Project Configuration

**Firebase Project Name:** `waqasahmad-portfolio`  
**Firebase Hosting URL:** `https://waqasahmad-portfolio.web.app` (or `https://waqasahmad-portfolio.firebaseapp.com`)

**GitHub Pages URL:** `https://devwithwaqas.github.io/portfolio/`

**Note:** Portfolio is deployed to both GitHub Pages and Firebase Hosting. The code automatically uses the correct URL based on build mode.

## Environment Variables

### For Firebase Builds

Add to your `.env` file or set during build:

```bash
VITE_FIREBASE_SITE_URL=https://waqasahmad-portfolio.web.app
```

Or set it in `vite.config.js` (already configured with default).

## Build Commands

### GitHub Pages Build (default)
```bash
npm run build
```
- Uses: `https://devwithwaqas.github.io/portfolio/`
- Base path: `/portfolio/`

### Firebase Build
```bash
npm run build:firebase
```
- Uses: `https://waqasahmad-portfolio.web.app` (or `VITE_FIREBASE_SITE_URL`)
- Base path: `/`

## Deployment

### Deploy to Firebase
```bash
# 1. Switch to Firebase project
firebase use my-portfolio

# 2. Build for Firebase
npm run build:firebase

# 3. Deploy
firebase deploy --only hosting
```

## What Changed

1. **`src/config/constants.js`**: Added `SITE_URL` export that detects build mode
   - Firebase builds → uses `VITE_FIREBASE_SITE_URL` or default `https://waqasahmad-portfolio.web.app`
   - GitHub Pages builds → uses `https://devwithwaqas.github.io/portfolio/`

2. **`src/utils/seo.js`**: Now imports `SITE_URL` from constants

3. **`src/utils/structuredData.js`**: Now imports `SITE_URL` from constants

4. **`src/router/index.js`**: Now imports `SITE_URL` from constants

5. **`src/views/Home.vue`**: Now imports `SITE_URL` from constants

6. **`scripts/generate-sitemap.js`**: Detects build mode and uses appropriate URL

7. **`scripts/validate-sitemap.js`**: Validates both GitHub Pages and Firebase URLs

8. **`vite.config.js`**: Sets `VITE_FIREBASE_SITE_URL` default for Firebase builds

## Verify Firebase Project URL

To get the exact Firebase Hosting URL:

```bash
firebase projects:list
firebase use waqasahmad-portfolio
firebase hosting:sites:list
```

Or check Firebase Console → Hosting → Your site URL.

## Next Steps

1. **Get exact Firebase URL**: Run `firebase hosting:sites:list` or check Firebase Console
2. **Current URL**: `https://waqasahmad-portfolio.web.app` (already configured)
3. **Deploy**: 
   ```bash
   firebase use waqasahmad-portfolio
   npm run build:firebase
   firebase deploy --only hosting
   ```

## Notes

- **Functions stay the same**: Google Cloud Functions URLs remain unchanged
- **Only URL changes**: Sitemap, SEO, structured data, canonical URLs now use Firebase URL for Firebase builds
- **GitHub Pages unaffected**: Regular `npm run build` still uses GitHub Pages URL

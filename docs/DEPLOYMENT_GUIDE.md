# 🚀 Deployment Guide

Complete guide for deploying this portfolio to various hosting platforms.

## 📋 Pre-Deployment Checklist

- [ ] All environment variables are set in your hosting platform
- [ ] Google Cloud Functions (SMTP) is configured (if using contact form)
- [ ] Build command works locally: `npm run build`
- [ ] Preview works locally: `npm run preview`

## 🌐 GitHub Pages Deployment

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to: **Settings** > **Pages**
3. Under **Source**, select: **GitHub Actions**
4. Save the settings

### Step 2: Set GitHub Secrets

1. Go to: **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Add each variable from `.env.example`:

   **Personal Information:**
   - `VITE_FULL_NAME` - Your full name
   - `VITE_LOCATION` - Your location
   - `VITE_CONTACT_EMAIL` - Your email address
   - `VITE_PHONE` - Your phone number

   **Social Media & Links:**
   - `VITE_LINKEDIN_URL` - Your LinkedIn profile URL
   - `VITE_GITHUB_URL` - Your GitHub profile URL
   - `VITE_WEBSITE_URL` - Your personal website URL
   - `VITE_WHATSAPP_URL` - Your WhatsApp link
   - `VITE_GOOGLE_MAPS_URL` - Google Maps link to your location

   **SMTP Configuration (Google Cloud Functions):**
   - `VITE_SMTP_ENDPOINT` - Google Cloud Function endpoint URL
   - `VITE_SMTP_API_KEY` - API key for SMTP function (optional, for security)

### Step 3: Push to Main Branch

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
1. Build your portfolio with environment variables
2. Deploy to GitHub Pages
3. Make it available at: `https://[username].github.io/[repository-name]`

### Step 4: Configure Custom Domain (Optional)

1. Go to: **Settings** > **Pages**
2. Under **Custom domain**, enter your domain
3. Follow GitHub's DNS configuration instructions

## 🌐 Netlify Deployment

### Step 1: Connect Repository

1. Sign up/login to [Netlify](https://www.netlify.com/)
2. Click **Add new site** > **Import an existing project**
3. Connect your GitHub repository

### Step 2: Configure Build Settings

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18 (or latest LTS)

### Step 3: Set Environment Variables

1. Go to: **Site settings** > **Environment variables**
2. Add all variables from `.env.example`
3. Click **Save**

### Step 4: Deploy

1. Click **Deploy site**
2. Netlify will build and deploy automatically
3. Your site will be available at: `https://[random-name].netlify.app`

### Step 5: Configure Custom Domain (Optional)

1. Go to: **Domain settings**
2. Add your custom domain
3. Follow Netlify's DNS configuration instructions

## 🌐 Vercel Deployment

### Step 1: Connect Repository

1. Sign up/login to [Vercel](https://vercel.com/)
2. Click **Add New Project**
3. Import your GitHub repository

### Step 2: Configure Build Settings

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 3: Set Environment Variables

1. Go to: **Settings** > **Environment Variables**
2. Add all variables from `.env.example`
3. Select environments (Production, Preview, Development)
4. Click **Save**

### Step 4: Deploy

1. Click **Deploy**
2. Vercel will build and deploy automatically
3. Your site will be available at: `https://[project-name].vercel.app`

### Step 5: Configure Custom Domain (Optional)

1. Go to: **Settings** > **Domains**
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

## 🔧 Troubleshooting

### Build Fails

- **Check environment variables:** Make sure all required variables are set
- **Check Node version:** Ensure Node.js 18+ is used
- **Check build logs:** Look for specific error messages

### Environment Variables Not Working

- **Restart build:** Environment variables are injected at build time
- **Check variable names:** Must start with `VITE_` prefix
- **Check secrets:** Verify all secrets are set correctly in hosting platform

### 404 Errors on Routes

- **Check router mode:** Vue Router uses history mode (default)
- **Configure redirects:** Some hosts require redirect rules (see below)

### Redirect Rules for SPA

For hosts that don't support SPA routing natively, create redirect rules:

**Netlify:** Create `public/_redirects`:
```
/*    /index.html   200
```

**Vercel:** Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**GitHub Pages:** The workflow handles this automatically.

## 🔥 Firebase Deployment

### Prerequisites

- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project created and initialized
- Logged in to Firebase: `firebase login`

### Deployment Commands

#### Development Deployment

**Auto build number (from git commit):**
```bash
npm run deploy:firebase:dev
```

**Manual build number:**
```bash
npm run deploy:firebase:dev -- --build v1.2.3
npm run deploy:firebase:dev -- --version custom-build-123
npm run deploy:firebase:dev -- -b release-2024-01
```

#### Production Deployment

**Auto build number (from git commit):**
```bash
npm run deploy:firebase:prod
```

**Manual build number:**
```bash
npm run deploy:firebase:prod -- --build v2.0.0
npm run deploy:firebase:prod -- --version production-2024
npm run deploy:firebase:prod -- -b prod-v1.0.0
```

### Build Number Options

The deployment script automatically generates build numbers from git commit hashes. You can also manually specify build numbers:

**Available flags:**
- `--build <number>` or `-b <number>` - Specify manual build number
- `--version <number>` or `-v <number>` - Alias for --build
- `--dev` or `-d` - Deploy to development environment
- `--help` or `-h` - Show help message

**Examples:**
```bash
# Development with manual build
npm run deploy:firebase:dev -- --build v1.0.0-dev

# Production with manual build
npm run deploy:firebase:prod -- --build v1.0.0

# Using short flags
npm run deploy:firebase:dev -- -b test-123
npm run deploy:firebase:prod -- -v release-2024
```

### Deployment Output

The script shows formatted output with build number tracking:

```
============================================================
Firebase Deployment Script
============================================================

============================================================
Deployment Information
============================================================
   Environment: Development/Production
   Branch: firebase-lcp-optimization
   Git Commit: abc1234
   Commit Message: Your commit message

============================================================
Build Numbers
============================================================
   Previous Build: xyz7890
   Expected New Build: abc1234

[... build and deployment steps ...]

============================================================
Deployment Completed Successfully
============================================================

Build Summary:
   Previous: xyz7890
   Current:  abc1234
```

### Build Number Behavior

- **Auto mode (default):** Build number is generated from git commit hash
- **Manual mode:** Build number is set to your specified value
- **Service Worker:** Build number is used for cache versioning
- **Updates:** Users will get new version when build number changes

## 📝 Post-Deployment

1. **Test all pages:** Navigate through all routes
2. **Test contact form:** Submit a test message
3. **Check mobile responsiveness:** Test on different devices
4. **Check performance:** Use Lighthouse or PageSpeed Insights
5. **Set up custom domain:** If you have one
6. **Verify build number:** Check service worker version in browser DevTools

## 🔒 Security Notes

- SMTP endpoint URL is safe to expose, but keep API key secure
- Personal information in environment variables is only used at build time
- The built bundle contains your information (it's static HTML/JS)
- This is normal for portfolio sites - all content is public anyway

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vue Router Deployment](https://router.vuejs.org/guide/essentials/history-mode.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)

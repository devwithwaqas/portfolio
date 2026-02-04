# 🔐 GitHub Secrets Setup Guide

This guide will help you set up all required environment variables as GitHub Secrets for deployment.

## 📍 Where to Go

1. Go to your GitHub repository
2. Click on **Settings** (top menu)
3. Click on **Secrets and variables** > **Actions** (left sidebar)
4. Click **New repository secret** button

## 📝 Secrets to Add

Add each of the following secrets one by one. Copy the values from your `.env` file.

### Personal Information Secrets

| Secret Name | Value from .env | Example |
|------------|----------------|---------|
| `VITE_FULL_NAME` | `VITE_FULL_NAME=...` | `Waqas Ahmad` |
| `VITE_LOCATION` | `VITE_LOCATION=...` | `Kuala Lumpur, Malaysia` |
| `VITE_CONTACT_EMAIL` | `VITE_CONTACT_EMAIL=...` | `devwithwaqas@gmail.com` |
| `VITE_PHONE` | `VITE_PHONE=...` | `+60146806067` |

### Social Media & Links Secrets

| Secret Name | Value from .env | Example |
|------------|----------------|---------|
| `VITE_LINKEDIN_URL` | `VITE_LINKEDIN_URL=...` | `https://www.linkedin.com/in/waqas1430/` |
| `VITE_GITHUB_URL` | `VITE_GITHUB_URL=...` | `https://github.com/devwithwaqas` |
| `VITE_WEBSITE_URL` | `VITE_WEBSITE_URL=...` | `https://devwithwaqas.github.io/portfolio/` |
| `VITE_WHATSAPP_URL` | `VITE_WHATSAPP_URL=...` | `https://wa.me/60146806067` |
| `VITE_GOOGLE_MAPS_URL` | `VITE_GOOGLE_MAPS_URL=...` | `https://www.google.com/maps/search/?api=1&query=Kuala+Lumpur,+Malaysia` |

### EmailJS Configuration Secrets

| Secret Name | Value from .env | Example |
|------------|----------------|---------|
| `VITE_EMAILJS_PUBLIC_KEY` | `VITE_EMAILJS_PUBLIC_KEY=...` | `HIrGCZA4UsU44mz7S` |
| `VITE_EMAILJS_SERVICE_ID` | `VITE_EMAILJS_SERVICE_ID=...` | `service_t762oxc` |
| `VITE_EMAILJS_TEMPLATE_ID` | `VITE_EMAILJS_TEMPLATE_ID=...` | `template_clfbq4g` |

### Google Analytics 4 (GA4) Secret

| Secret Name | Value from .env | Example | Notes |
|------------|----------------|---------|-------|
| `VITE_GA4_MEASUREMENT_ID` | `VITE_GA4_MEASUREMENT_ID=...` | `G-XXXXXXXXXX` | Optional - Get from [Google Analytics](https://analytics.google.com/) |

## 🚀 Quick Setup Steps

1. **Open your `.env` file** (in the project root)
2. **For each line** that starts with `VITE_`:
   - Copy the variable name (e.g., `VITE_FULL_NAME`)
   - Copy the value (everything after `=`, without quotes)
   - Go to GitHub Secrets page
   - Click **New repository secret**
   - Paste the variable name in **Name** field
   - Paste the value in **Secret** field
   - Click **Add secret**
   - Repeat for all 12 secrets

## ✅ Verification

After adding all secrets, you should see 12 secrets listed:
- VITE_FULL_NAME
- VITE_LOCATION
- VITE_CONTACT_EMAIL
- VITE_PHONE
- VITE_LINKEDIN_URL
- VITE_GITHUB_URL
- VITE_WEBSITE_URL
- VITE_WHATSAPP_URL
- VITE_GOOGLE_MAPS_URL
- VITE_EMAILJS_PUBLIC_KEY
- VITE_EMAILJS_SERVICE_ID
- VITE_EMAILJS_TEMPLATE_ID

## 🔒 Security Note

- Secrets are encrypted and never visible in logs
- Only repository collaborators can see secret names (not values)
- Secrets are only available during GitHub Actions workflows
- Never commit your `.env` file to the repository

## 📚 Next Steps

After setting up all secrets:
1. Enable GitHub Pages (see DEPLOYMENT_GUIDE.md)
2. Push to main branch or manually trigger workflow
3. Check Actions tab for deployment status

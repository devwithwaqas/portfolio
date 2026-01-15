# Railway PHP Setup Guide - GA4 Analytics Endpoint

## Overview

This guide will help you deploy your `ga4-analytics.php` file to Railway, giving you full CORS control and no Cloudflare blocking.

---

## Step 1: Prepare Your Files

Create a new folder structure for Railway deployment:

```
railway-php/
├── ga4-analytics.php
├── ga4-service-account-key.json
├── Dockerfile
├── nginx.conf
└── .railwayignore (optional)
```

---

## Step 2: Create Dockerfile

Create a `Dockerfile` in your Railway project:

```dockerfile
FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    curl \
    openssl \
    && rm -rf /var/cache/apk/*

# Copy PHP files
COPY ga4-analytics.php /var/www/html/
COPY ga4-service-account-key.json /var/www/html/

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod 600 /var/www/html/ga4-service-account-key.json

# Expose port
EXPOSE 8080

# Start Nginx and PHP-FPM
CMD sh -c "php-fpm -D && nginx -g 'daemon off;'"
```

---

## Step 3: Create Nginx Configuration

Create `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 8080;
        server_name _;
        root /var/www/html;
        index index.php;

        # CORS Headers
        add_header 'Access-Control-Allow-Origin' 'https://devwithwaqas.github.io' always;
        add_header 'Access-Control-Allow-Methods' 'GET, OPTIONS, POST' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Accept, Origin, X-Requested-With, Authorization' always;
        add_header 'Access-Control-Allow-Credentials' 'false' always;
        add_header 'Access-Control-Max-Age' '86400' always;

        # Handle OPTIONS preflight
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'https://devwithwaqas.github.io' always;
            add_header 'Access-Control-Allow-Methods' 'GET, OPTIONS, POST' always;
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Accept, Origin, X-Requested-With, Authorization' always;
            add_header 'Access-Control-Max-Age' '86400' always;
            add_header 'Content-Length' '0';
            return 204;
        }

        # PHP handler
        location ~ \.php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }

        # Main endpoint
        location /ga4-analytics.php {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index ga4-analytics.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
    }
}
```

---

## Step 4: Deploy to Railway

### Method 1: Via Railway Dashboard

1. **Log in to Railway:** https://railway.app
2. **Create New Project:**
   - Click "New Project"
   - Select "Empty Project"

3. **Add Service:**
   - Click "+ New" → "GitHub Repo" (if you want to connect GitHub)
   - OR click "+ New" → "Empty Service"

4. **Upload Files:**
   - If using Empty Service, click "Settings" → "Source"
   - Upload your files or connect a GitHub repo

5. **Configure:**
   - Railway will detect the Dockerfile automatically
   - Set port to `8080` in Railway settings

6. **Deploy:**
   - Railway will build and deploy automatically
   - Wait for deployment to complete

### Method 2: Via Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

---

## Step 5: Get Your Railway URL

After deployment:

1. Go to your service in Railway dashboard
2. Click on "Settings" → "Networking"
3. Generate a public domain (or use the provided one)
4. Your API URL will be: `https://your-app.railway.app/ga4-analytics.php`

---

## Step 6: Test Your Endpoint

1. **Test in browser:**
   ```
   https://your-app.railway.app/ga4-analytics.php
   ```
   Should return JSON

2. **Test CORS:**
   Open browser console on your GitHub Pages site:
   ```javascript
   fetch('https://your-app.railway.app/ga4-analytics.php', {
     method: 'OPTIONS',
     headers: {
       'Origin': 'https://devwithwaqas.github.io',
       'Access-Control-Request-Method': 'GET'
     }
   }).then(r => {
     console.log('Status:', r.status);
     console.log('CORS Origin:', r.headers.get('Access-Control-Allow-Origin'));
   });
   ```

---

## Step 7: Update GitHub Secret

1. Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Find `VITE_ANALYTICS_API_ENDPOINT`
3. Update value to: `https://your-app.railway.app/ga4-analytics.php`
4. Save

---

## Step 8: Redeploy Your Site

1. Push a commit, or
2. Go to **Actions** → **Deploy to GitHub Pages** → **Run workflow**

---

## Troubleshooting

### Issue: Build fails
**Fix:** Check Dockerfile syntax and ensure all files are in the project root

### Issue: 502 Bad Gateway
**Fix:** Check Nginx and PHP-FPM are running. Check Railway logs

### Issue: CORS still blocked
**Fix:** Verify Nginx config has CORS headers. Check Railway logs for errors

### Issue: Service account key not found
**Fix:** Ensure `ga4-service-account-key.json` is in the same directory as PHP file

---

## File Structure Summary

```
railway-php/
├── ga4-analytics.php          (your PHP file)
├── ga4-service-account-key.json (your service account key)
├── Dockerfile                  (Docker configuration)
└── nginx.conf                  (Nginx with CORS headers)
```

---

## Quick Start (Simplified)

If you want a simpler approach, Railway also supports PHP directly:

1. Create a `railway.json` or use Railway's PHP template
2. Upload your PHP files
3. Railway will auto-detect PHP and serve it

But the Docker + Nginx approach gives you full CORS control.

---

## Cost

- **Free tier:** $5 credit/month
- **Your usage:** Should be well under $5/month (PHP API is very lightweight)
- **Billing:** Only pay if you exceed $5/month

---

Good luck! 🚀

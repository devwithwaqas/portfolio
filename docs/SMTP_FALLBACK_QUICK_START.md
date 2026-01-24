# SMTP Email Setup - Quick Start Guide

Contact form emails are sent via **Google Cloud Functions** (Gmail SMTP). This guide walks you through setup.

## 📋 What You Need

- Gmail account with 2-Step Verification
- Google Cloud project (for Cloud Functions)
- GitHub repository (for secrets)

## 🚀 Setup Steps

### Step 1: Set Up Gmail App Password

**If "App passwords are not available":** Enable 2-Step Verification first. See `docs/GMAIL_SETUP_ALTERNATIVES.md` for troubleshooting.

1. Go to: https://myaccount.google.com/security → **2-Step Verification** → complete setup
2. Go to: https://myaccount.google.com/apppasswords
3. Select app: **Mail**, device: **Other** → "Portfolio Contact Form"
4. Copy the 16-character password (`xxxx xxxx xxxx xxxx`)

### Step 2: Deploy Google Cloud Function

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

cd serverless/sendEmail
gcloud functions deploy sendEmail \
  --gen2 \
  --runtime=nodejs18 \
  --region=us-central1 \
  --source=. \
  --entry-point=sendEmail \
  --trigger-http \
  --allow-unauthenticated \
  --set-env-vars GMAIL_USER=your_email@gmail.com,GMAIL_APP_PASSWORD=xxxx_xxxx_xxxx_xxxx,TO_EMAIL=your_email@gmail.com
```

### Step 3: Get Function URL

```bash
gcloud functions describe sendEmail --gen2 --region=us-central1 --format="value(serviceConfig.uri)"
```

### Step 4: Test Function

```bash
curl -X POST https://[YOUR_FUNCTION_URL] \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test"}'
```

Check your inbox for the test email.

### Step 5: Add GitHub Secrets

1. **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**:
   - `VITE_SMTP_ENDPOINT` = your function URL (from Step 3)
   - `VITE_SMTP_API_KEY` = optional, if you added API key protection

See `docs/GITHUB_SECRETS_SETUP.md` for the full list.

### Step 6: Deploy

Push to your deploy branch. The workflow builds with `VITE_SMTP_ENDPOINT` and deploys. Test the contact form on the live site.

## 🔄 How It Works

1. User submits contact form → client sends POST to `VITE_SMTP_ENDPOINT`
2. Google Cloud Function receives request → sends email via Gmail SMTP
3. User sees success or error message

## 🛠️ Troubleshooting

| Issue | Check |
|-------|--------|
| "SMTP endpoint not configured" | `VITE_SMTP_ENDPOINT` secret set? |
| "Failed to send email" | Function deployed? Gmail App Password correct? Test with curl. |
| CORS errors | Function allows your domain; see `serverless/sendEmail` and CORS config. |

**Logs:** Google Cloud Console → Cloud Functions → `sendEmail` → Logs.

## 📚 See Also

- **GitHub Secrets**: `docs/GITHUB_SECRETS_SETUP.md`
- **Deployment**: `docs/DEPLOYMENT_GUIDE.md`
- **Serverless function**: `serverless/README.md`
- **Gmail alternatives**: `docs/GMAIL_SETUP_ALTERNATIVES.md`

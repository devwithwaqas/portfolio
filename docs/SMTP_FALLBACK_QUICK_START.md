# SMTP Fallback - Quick Start Guide

## ✅ Implementation Complete

The SMTP fallback system has been implemented and is ready for setup. The feature flag is **OFF by default**, so EmailJS will continue to work as before.

## 📋 What Was Implemented

### Client-Side (Vue.js):
- ✅ `src/utils/emailService.js` - SMTP email service utility
- ✅ `src/config/constants.js` - Added SMTP fallback configuration
- ✅ `src/components/common/ContactForm.vue` - Added fallback logic
- ✅ `.github/workflows/deploy.yml` - Added SMTP environment variables
- ✅ `.env.example` - Added SMTP configuration examples

### Serverless Function:
- ✅ `serverless/sendEmail/index.js` - Google Cloud Function code
- ✅ `serverless/sendEmail/package.json` - Dependencies
- ✅ `serverless/README.md` - Deployment instructions

## 🚀 Next Steps (In Order)

### Step 1: Set Up Gmail App Password

**⚠️ IMPORTANT: If you see "App passwords are not available in your account":**

This usually means **2-Step Verification is not enabled**. See `docs/GMAIL_SETUP_ALTERNATIVES.md` for detailed troubleshooting.

**Quick Fix:**
1. **First, enable 2-Step Verification**:
   - Go to: https://myaccount.google.com/security
   - Scroll to "How you sign in to Google"
   - Click "2-Step Verification"
   - Complete the setup (phone number, verification code)
   - **Wait 24 hours** (Google sometimes requires this)

2. **Then access App Passwords**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other (Custom name)" → Enter "Portfolio Contact Form"
   - Click "Generate"
   - Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)

**If App Passwords still don't work after 24 hours**, see `docs/GMAIL_SETUP_ALTERNATIVES.md` for alternative solutions (SendGrid, Mailgun, OAuth2).

### Step 2: Deploy Serverless Function
Choose one platform:

#### Option A: Google Cloud Functions (Recommended)
```bash
# Install Google Cloud CLI first: https://cloud.google.com/sdk/docs/install
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
  --set-env-vars GMAIL_USER=devwithwaqas@gmail.com,GMAIL_APP_PASSWORD=xxxx_xxxx_xxxx_xxxx,TO_EMAIL=devwithwaqas@gmail.com
```

#### Option B: Netlify/Vercel Functions
See `serverless/README.md` for alternative deployment options.

### Step 3: Get Function URL
After deployment, copy the function URL:
```bash
# For Google Cloud Functions:
gcloud functions describe sendEmail --gen2 --region=us-central1 --format="value(serviceConfig.uri)"
```

### Step 4: Test Function Directly
```bash
curl -X POST https://[YOUR_FUNCTION_URL] \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

Check your email inbox - you should receive the test email.

### Step 5: Add GitHub Secrets (Flag OFF Initially)
```bash
# Feature flag - OFF by default (EmailJS will be used)
gh secret set VITE_SMTP_FALLBACK_ENABLED --body "false"

# Function endpoint (from Step 3)
gh secret set VITE_SMTP_FALLBACK_ENDPOINT --body "https://[region]-[project].cloudfunctions.net/sendEmail"

# Optional: API key (if you set one in function)
gh secret set VITE_SMTP_FALLBACK_API_KEY --body "your_api_key_here"
```

### Step 6: Verify EmailJS Still Works
1. Deploy the updated code (GitHub Actions will run automatically)
2. Test the contact form - should use EmailJS (flag is OFF)
3. Verify email arrives in inbox

### Step 7: Test SMTP Fallback (When Ready)
```bash
# Enable SMTP fallback
gh secret set VITE_SMTP_FALLBACK_ENABLED --body "true"

# Redeploy (or wait for next push)
```

Test the contact form - should now use SMTP instead of EmailJS.

### Step 8: Production Use
- **Keep flag OFF** normally (EmailJS works fine)
- **Enable flag** when:
  - EmailJS hits 200/month limit
  - EmailJS service is down
  - You want to test SMTP

## 🔄 How It Works

### Normal Operation (Flag OFF):
1. User submits contact form
2. System tries EmailJS first
3. If EmailJS succeeds → Done ✅
4. If EmailJS fails → Shows error (SMTP not used)

### With Flag ON:
1. User submits contact form
2. System tries EmailJS first
3. If EmailJS succeeds → Done ✅
4. If EmailJS fails → Automatically tries SMTP fallback
5. If SMTP succeeds → Done ✅
6. If both fail → Shows error

### Automatic Fallback (Flag ON + EmailJS fails):
- EmailJS error is logged
- System automatically tries SMTP
- User sees success if either method works
- User sees error only if both fail

## 📊 Monitoring

### Check EmailJS Usage:
- Login to EmailJS dashboard
- Check monthly email count
- Monitor for approaching 200/month limit

### Check SMTP Function:
- Google Cloud Console → Cloud Functions → Logs
- Monitor for errors or failures
- Check Gmail sent folder for delivered emails

## 🛠️ Troubleshooting

### "SMTP endpoint is not configured"
- Verify `VITE_SMTP_FALLBACK_ENDPOINT` secret is set
- Check GitHub Actions build logs for environment variables

### "Failed to send email via SMTP"
- Verify function is deployed and accessible
- Check function logs in Google Cloud Console
- Verify Gmail App Password is correct
- Test function directly with curl

### "EmailJS Error" but no SMTP fallback
- Check if `VITE_SMTP_FALLBACK_ENABLED` is set to `"true"`
- Verify `VITE_SMTP_FALLBACK_ENDPOINT` is configured
- Check browser console for detailed error messages

## 📝 Notes

- **Feature flag defaults to OFF** - EmailJS continues to work normally
- **SMTP has higher limits** - 500 emails/day vs EmailJS 200/month
- **Both methods use same email template** - Format is identical
- **No user-facing changes** - Success/error messages remain the same
- **Cost**: Effectively $0 (Google Cloud Functions free tier + Gmail free)

## ✅ Checklist

- [ ] Gmail App Password created
- [ ] Serverless function deployed
- [ ] Function URL obtained
- [ ] Function tested directly (curl)
- [ ] GitHub secrets added (flag = `false`)
- [ ] EmailJS still works (flag OFF)
- [ ] SMTP tested (flag ON)
- [ ] Monitoring set up

## 📚 Additional Documentation

- **Full Plan**: `docs/SMTP_FALLBACK_PLAN.md`
- **Serverless Setup**: `serverless/README.md`
- **EmailJS Setup**: `docs/EMAILJS_SETUP.md`

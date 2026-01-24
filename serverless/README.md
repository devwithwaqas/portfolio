# Serverless Email Service

This directory contains the serverless function for sending contact form emails via Gmail SMTP (Google Cloud Functions).

## Overview

The `sendEmail` function is designed to be deployed to **Google Cloud Functions** (or compatible serverless platforms) to handle email sending via Gmail SMTP.

## Setup Instructions

### Prerequisites

1. **Gmail App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Enable 2-Step Verification if not already enabled
   - Generate a new app password for "Mail"
   - Copy the 16-character password

2. **Google Cloud Project** (for Cloud Functions):
   - Create a Google Cloud project (or use existing)
   - Enable Cloud Functions API
   - Set up billing (required, but free tier available)

### Deployment Options

#### Option 1: Google Cloud Functions (Recommended)

1. **Install Google Cloud CLI**:
   ```bash
   # Download and install from: https://cloud.google.com/sdk/docs/install
   ```

2. **Authenticate**:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Deploy Function**:
   ```bash
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

4. **Get Function URL**:
   ```bash
   gcloud functions describe sendEmail --gen2 --region=us-central1 --format="value(serviceConfig.uri)"
   ```

5. **Optional: Set API Key** (for authentication):
   ```bash
   gcloud functions deploy sendEmail \
     --gen2 \
     --runtime=nodejs18 \
     --region=us-central1 \
     --source=. \
     --entry-point=sendEmail \
     --trigger-http \
     --allow-unauthenticated \
     --set-env-vars API_KEY=your_secret_api_key_here
   ```

#### Option 2: Netlify Functions

1. Create `netlify/functions/sendEmail.js`:
   ```javascript
   // Copy content from serverless/sendEmail/index.js
   // Modify exports for Netlify format
   ```

2. Add to `netlify.toml`:
   ```toml
   [build]
     functions = "netlify/functions"
   
   [[redirects]]
     from = "/.netlify/functions/sendEmail"
     to = "/.netlify/functions/sendEmail"
     status = 200
   ```

#### Option 3: Vercel Functions

1. Create `api/sendEmail.js`:
   ```javascript
   // Copy content from serverless/sendEmail/index.js
   // Modify exports for Vercel format
   ```

2. Add environment variables in Vercel dashboard

## Environment Variables

### Required:
- `GMAIL_USER`: Your Gmail address (e.g., `devwithwaqas@gmail.com`)
- `GMAIL_APP_PASSWORD`: Gmail App Password (16-character, format: `xxxx xxxx xxxx xxxx`)
- `TO_EMAIL`: Recipient email address (where contact form emails should be sent)

### Optional:
- `API_KEY`: API key for function authentication (validate via `X-API-Key` header)

## Testing

### Local Testing (before deployment):

```bash
cd serverless/sendEmail
npm install
npm start
```

Then test with curl:
```bash
curl -X POST http://localhost:8080 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

### Production Testing (after deployment):

```bash
curl -X POST https://[region]-[project].cloudfunctions.net/sendEmail \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

With API key (if configured):
```bash
curl -X POST https://[region]-[project].cloudfunctions.net/sendEmail \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your_api_key_here" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

## Email Format

The function sends emails using the contact form payload format:

```
Subject: Portfolio Contact: {subject}

You have received a new message from your portfolio contact form.

---

From: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---

Sent via SMTP Fallback
Timestamp: {iso_timestamp}
```

## Security Notes

1. **Never commit** Gmail App Password to repository
2. **Use environment variables** for all sensitive data
3. **Enable API key authentication** for production (optional but recommended)
4. **Configure CORS** appropriately for your domain
5. **Rate limiting**: Consider implementing rate limiting to prevent abuse

## Troubleshooting

### "Failed to connect to email service"
- Verify Gmail App Password is correct
- Ensure 2-Step Verification is enabled on Gmail account
- Check Gmail account security settings

### "Unauthorized. Invalid API key"
- Verify `X-API-Key` header matches `API_KEY` environment variable
- Or remove API key requirement if not using authentication

### "Missing required environment variables"
- Ensure all required environment variables are set in function configuration
- For Google Cloud Functions, check via: `gcloud functions describe sendEmail --gen2 --region=REGION`

## Cost

- **Google Cloud Functions**: Free tier: 2M invocations/month, 400K GB-seconds
- **Gmail**: Free up to 500 emails/day
- **Total**: Effectively $0 for typical portfolio usage

## Next Steps

After deploying the function:

1. Copy the function URL (see **Testing** above)
2. Add GitHub secrets: `VITE_SMTP_ENDPOINT`, optionally `VITE_SMTP_API_KEY`
3. See `docs/GITHUB_SECRETS_SETUP.md` and `docs/SMTP_FALLBACK_QUICK_START.md` for full setup
4. Deploy your portfolio; the contact form will use this SMTP endpoint

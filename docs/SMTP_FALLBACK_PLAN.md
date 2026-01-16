# SMTP Fallback Implementation Plan

## Overview
Implement a Gmail SMTP fallback system for the contact form that activates when:
1. EmailJS fails (error/network issue)
2. EmailJS hits the 200/month free limit
3. Feature flag is enabled (for testing/manual override)

## Architecture Decision
Since this is a **static site** (Vue.js SPA on GitHub Pages), we cannot directly use SMTP from the browser due to security constraints. We need a **serverless backend** to handle SMTP authentication.

### Recommended Solution: Serverless Function
- **Google Cloud Functions** (preferred - integrates with Gmail)
- **Alternative**: Netlify Functions, Vercel Functions, or AWS Lambda

## Implementation Plan

### Phase 1: Serverless Function Setup (Backend)

#### Option A: Google Cloud Functions (Recommended)
1. **Create a Google Cloud Function** that:
   - Accepts POST requests with email data
   - Authenticates using Gmail App Password or OAuth2
   - Sends email via Gmail SMTP (nodemailer + Gmail transport)
   - Returns success/error response

2. **Function Requirements**:
   - Endpoint: `https://[region]-[project].cloudfunctions.net/sendEmail`
   - Method: POST
   - Authentication: Function-level API key (optional but recommended)
   - Environment variables:
     - `GMAIL_USER`: Your Gmail address
     - `GMAIL_APP_PASSWORD`: Gmail App Password (16-char)
     - `TO_EMAIL`: Recipient email (your email)

3. **Email Template**: Match the EmailJS template format:
   ```
   Subject: Portfolio Contact: {{subject}}
   
   You have received a new message from your portfolio contact form.
   
   ---
   
   From: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   
   ---
   ```

#### Option B: Alternative Serverless Platform
- **Netlify Functions** (if using Netlify)
- **Vercel Functions** (if using Vercel)
- **AWS Lambda** (if using AWS)

### Phase 2: Client-Side Implementation (Vue.js)

#### 1. Feature Flag Configuration
- Add GitHub secret: `VITE_SMTP_FALLBACK_ENABLED` (default: `false` or empty)
- Add to `constants.js`:
  ```javascript
  smtpFallback: {
    enabled: import.meta.env.VITE_SMTP_FALLBACK_ENABLED === 'true',
    endpoint: import.meta.env.VITE_SMTP_FALLBACK_ENDPOINT || '',
    apiKey: import.meta.env.VITE_SMTP_FALLBACK_API_KEY || '' // Optional
  }
  ```

#### 2. Update ContactForm.vue
- Modify `handleSubmit()` to:
  1. Try EmailJS first (if configured)
  2. On EmailJS failure OR if feature flag is ON:
     - Fall back to SMTP endpoint
  3. Error handling for both methods
  4. Success message remains the same

#### 3. New Utility: `src/utils/emailService.js`
Create a new utility file that:
- Exports `sendEmailViaSMTP(data)` function
- Handles API call to serverless function
- Formats email data to match template
- Returns success/error response

### Phase 3: GitHub Secrets Setup

#### Required Secrets (via GitHub CLI)
```bash
# Feature Flag (OFF by default for testing)
gh secret set VITE_SMTP_FALLBACK_ENABLED --body "false"

# SMTP Function Endpoint (when ready)
gh secret set VITE_SMTP_FALLBACK_ENDPOINT --body "https://[region]-[project].cloudfunctions.net/sendEmail"

# Optional: API Key for function authentication
gh secret set VITE_SMTP_FALLBACK_API_KEY --body "your-api-key-here"
```

#### Update `.github/workflows/deploy.yml`
Add to environment variables:
```yaml
VITE_SMTP_FALLBACK_ENABLED: ${{ secrets.VITE_SMTP_FALLBACK_ENABLED }}
VITE_SMTP_FALLBACK_ENDPOINT: ${{ secrets.VITE_SMTP_FALLBACK_ENDPOINT }}
VITE_SMTP_FALLBACK_API_KEY: ${{ secrets.VITE_SMTP_FALLBACK_API_KEY }}
```

### Phase 4: Gmail Setup

#### 1. Create Gmail App Password
1. Go to Google Account Settings → Security
2. Enable 2-Step Verification (if not enabled)
3. Go to "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password (save securely)

#### 2. Gmail Limits
- **Free Gmail**: 500 emails/day (much higher than EmailJS's 200/month)
- **Google Workspace**: 2000 emails/day
- Rate limiting: ~100 emails/100 seconds

### Phase 5: Files to Create/Modify

#### New Files:
1. `src/utils/emailService.js` - SMTP email service utility
2. `serverless/sendEmail/index.js` - Google Cloud Function code (or equivalent)
3. `serverless/package.json` - Dependencies for serverless function
4. `.github/workflows/deploy-smtp-function.yml` - Optional: Deploy function via GitHub Actions

#### Files to Modify:
1. `src/config/constants.js` - Add SMTP fallback config
2. `src/components/common/ContactForm.vue` - Add fallback logic
3. `.github/workflows/deploy.yml` - Add SMTP environment variables
4. `.env.example` - Add SMTP fallback variables (commented)

### Phase 6: Testing Strategy

#### Initial Testing (Flag OFF):
1. Keep `VITE_SMTP_FALLBACK_ENABLED=false`
2. Test EmailJS functionality (should work as before)
3. Manually test SMTP function directly (curl/Postman)
4. Verify email format matches EmailJS template

#### Fallback Testing (Flag ON):
1. Set `VITE_SMTP_FALLBACK_ENABLED=true`
2. Test form submission (should use SMTP)
3. Verify emails arrive in inbox
4. Test error scenarios (invalid endpoint, network failure)

#### Production Testing:
1. Temporarily break EmailJS (wrong service ID)
2. Verify automatic fallback to SMTP
3. Verify success message appears
4. Revert EmailJS config

### Phase 7: Error Handling

#### Error Scenarios:
1. **EmailJS fails, SMTP succeeds**: Show success, log EmailJS error
2. **EmailJS succeeds, SMTP fails** (flag ON): Show success (EmailJS worked)
3. **Both fail**: Show error with fallback instructions
4. **Network timeout**: Retry once, then show error

#### User Experience:
- Success message: Same for both methods
- Error message: "Email service temporarily unavailable. Please try again or email directly at [email]"
- Console logging: Log which method succeeded/failed (for debugging)

## Gmail App Password Setup (Detailed)

### Prerequisites:
- Gmail account
- 2-Step Verification enabled

### Steps:
1. Visit: https://myaccount.google.com/apppasswords
2. Select app: "Mail"
3. Select device: "Other (Custom name)" → Enter "Portfolio Contact Form"
4. Click "Generate"
5. Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)
6. Store in Google Cloud Function environment variable: `GMAIL_APP_PASSWORD`

## Google Cloud Function Implementation (Example)

### Function Code (`serverless/sendEmail/index.js`):
```javascript
const nodemailer = require('nodemailer');
const functions = require('@google-cloud/functions-framework');

functions.http('sendEmail', async (req, res) => {
  // CORS handling
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).send('');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Gmail SMTP configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  // Email template (matches EmailJS format)
  const mailOptions = {
    from: `"${name}" <${email}>`,
    replyTo: email,
    to: process.env.TO_EMAIL,
    subject: `Portfolio Contact: ${subject}`,
    text: `You have received a new message from your portfolio contact form.

---

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});
```

### Dependencies (`serverless/package.json`):
```json
{
  "name": "portfolio-email-service",
  "version": "1.0.0",
  "dependencies": {
    "nodemailer": "^6.9.7",
    "@google-cloud/functions-framework": "^3.3.0"
  }
}
```

## Deployment Checklist

### Initial Setup (Flag OFF):
- [ ] Create Google Cloud Function (or alternative serverless platform)
- [ ] Set up Gmail App Password
- [ ] Configure function environment variables
- [ ] Deploy and test function directly
- [ ] Add GitHub secrets (flag = `false` initially)
- [ ] Update constants.js with SMTP config
- [ ] Create emailService.js utility
- [ ] Update ContactForm.vue with fallback logic
- [ ] Update deploy.yml workflow
- [ ] Test EmailJS still works (flag OFF)

### Testing Phase:
- [ ] Test SMTP function directly (curl/Postman)
- [ ] Verify email format matches EmailJS template
- [ ] Test with flag ON (should use SMTP)
- [ ] Test with flag OFF (should use EmailJS)
- [ ] Test EmailJS failure → SMTP fallback

### Production:
- [ ] Monitor EmailJS usage/limits
- [ ] Set flag to ON if EmailJS limit reached
- [ ] Monitor SMTP function logs
- [ ] Set up alerts for function failures

## Notes

### Security:
- **Gmail App Password**: Never commit to repository, only use in serverless function environment variables
- **API Key**: Optional but recommended for function authentication
- **CORS**: Configure appropriately for your domain

### Cost:
- **Google Cloud Functions**: Free tier: 2M invocations/month, 400K GB-seconds compute time
- **Gmail**: Free up to 500 emails/day
- **Total Cost**: Effectively $0 for typical portfolio usage

### Future Enhancements:
1. Rate limiting (prevent abuse)
2. Email validation/blacklist
3. Spam detection
4. Email templates (HTML version)
5. Analytics tracking for email sends

## Current Status
- [ ] **Phase 1**: Serverless function setup - **PENDING**
- [ ] **Phase 2**: Client-side implementation - **PENDING**
- [ ] **Phase 3**: GitHub secrets setup - **PENDING**
- [ ] **Phase 4**: Gmail setup - **PENDING**
- [ ] **Phase 5**: Files creation/modification - **PENDING**
- [ ] **Phase 6**: Testing - **PENDING**

## Next Steps
1. Review and approve this plan
2. Choose serverless platform (Google Cloud Functions recommended)
3. Set up Gmail App Password
4. Create serverless function
5. Implement client-side changes
6. Test with flag OFF first
7. Enable flag for testing when ready

# EmailJS Setup Instructions for Contact Form

This guide will help you set up EmailJS to enable the contact form to send emails directly to your inbox.

## 📋 Prerequisites

- A free EmailJS account (200 emails/month free tier)
- Your Gmail, Outlook, or other email account

## 🚀 Setup Steps

### Step 1: Sign Up for EmailJS

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service

1. Go to **Email Services** in the EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail is recommended)
4. Follow the instructions to connect your email account
   - For Gmail: You'll need to authorize EmailJS to send emails on your behalf
5. Note down your **Service ID** (e.g., `service_xxxxxxxxx`)

### Step 3: Create Email Template

1. Go to **Email Templates** in the EmailJS dashboard
2. Click **Create New Template**
3. Choose a template or start from scratch
4. Set the following:
   - **To Email**: `devwithwaqas@gmail.com` (your email)
   - **From Name**: `{{from_name}}`
   - **From Email**: `{{from_email}}`
   - **Subject**: `Portfolio Contact: {{subject}}`
   - **Content**: 
     ```
     You have received a new message from your portfolio contact form.
     
     From: {{from_name}}
     Email: {{from_email}}
     Subject: {{subject}}
     
     Message:
     {{message}}
     ```
5. Save the template
6. Note down your **Template ID** (e.g., `template_xxxxxxxxx`)

### Step 4: Get Your Public Key

1. Go to **Account** > **General** in the EmailJS dashboard
2. Find your **Public Key** (also called API Key)
3. Copy the public key (e.g., `xxxxxxxxxxxxxxxx`)

### Step 5: Update Configuration

1. Open `src/config/constants.js`
2. Find the `emailjs` section:
   ```javascript
   emailjs: {
     publicKey: '', // Paste your Public Key here
     serviceId: '', // Paste your Service ID here
     templateId: '' // Paste your Template ID here
   },
   ```
3. Update the values:
   ```javascript
   emailjs: {
     publicKey: 'your-public-key-here',
     serviceId: 'service_xxxxxxxxx',
     templateId: 'template_xxxxxxxxx'
   },
   ```
4. Save the file

### Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the Contact section
3. Fill out the contact form
4. Submit the form
5. Check your email inbox (`devwithwaqas@gmail.com`) for the message

## ✅ That's It!

Your contact form is now configured to send emails directly to your inbox. The form will work entirely client-side, no backend server required!

## 🔒 Security Note

The EmailJS public key is safe to expose in client-side code. EmailJS uses it to identify your account but requires proper service/template configuration to send emails.

## 📧 Free Tier Limits

- **200 emails/month** on the free tier
- Upgrade to paid plans if you need more

## 🆘 Troubleshooting

- **"Email service is not configured"**: Make sure you've updated all three values in `constants.js`
- **Emails not arriving**: Check your spam folder, verify EmailJS service connection
- **Template errors**: Make sure template variables match exactly: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`

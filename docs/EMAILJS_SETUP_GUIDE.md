# 📧 Quick EmailJS Setup Guide - Step by Step

Follow these steps to set up your contact form to send emails. This should take about 5-10 minutes.

## Step 1: Create EmailJS Account (2 minutes)

1. **Go to EmailJS website:**
   - Open your browser and go to: https://www.emailjs.com/
   - Click the **"Sign Up"** button (top right)

2. **Sign up:**
   - Enter your email: `devwithwaqas@gmail.com`
   - Create a password
   - Click "Sign Up"
   - Check your email and verify your account

3. **Login:**
   - After verification, login to EmailJS

---

## Step 2: Add Email Service - Connect Your Gmail (3 minutes)

1. **Go to Email Services:**
   - After login, you'll see the dashboard
   - Click on **"Email Services"** in the left menu (or go to: https://dashboard.emailjs.com/admin/integration)

2. **Add New Service:**
   - Click **"Add New Service"** button
   - Choose **"Gmail"** (recommended) or your email provider
   - Click **"Connect Account"**

3. **Authorize Gmail:**
   - Google will ask for permission
   - Click **"Allow"** to authorize EmailJS to send emails on your behalf
   - You'll see "Service Connected" message

4. **Get Service ID:**
   - After connecting, you'll see your service listed
   - Copy the **Service ID** (looks like: `service_xxxxxxxxx`)
   - **Save this somewhere!** You'll need it later

---

## Step 3: Create Email Template (2 minutes)

1. **Go to Email Templates:**
   - Click **"Email Templates"** in the left menu (or go to: https://dashboard.emailjs.com/admin/template)
   - Click **"Create New Template"**

2. **Configure Template:**
   - **Template Name:** `Portfolio Contact Form` (or any name)
   - **To Email:** `devwithwaqas@gmail.com`
   - **From Name:** `{{from_name}}` (this is a variable - keep the curly braces!)
   - **From Email:** `{{from_email}}`
   - **Reply To:** `{{from_email}}`
   - **Subject:** `Portfolio Contact: {{subject}}`

3. **Email Content (Body):**
   Copy and paste this:

   ```
   You have received a new message from your portfolio contact form.
   
   ---
   
   From: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   
   ---
   ```

4. **Save Template:**
   - Click **"Save"** button
   - Copy the **Template ID** (looks like: `template_xxxxxxxxx`)
   - **Save this somewhere!** You'll need it later

---

## Step 4: Get Your Public Key (1 minute)

1. **Go to Account Settings:**
   - Click **"Account"** in the left menu (or go to: https://dashboard.emailjs.com/admin/account)
   - Click on **"General"** tab

2. **Find Public Key:**
   - Look for **"Public Key"** or **"API Keys"**
   - Copy the Public Key (it's a long string, looks like: `xxxxxxxxxxxxxxxx`)
   - **Save this somewhere!** You'll need it later

---

## Step 5: Update Your Code (2 minutes)

1. **Open constants.js:**
   - Open the file: `src/config/constants.js`
   - Find the `emailjs` section (around line 18-22)

2. **Paste Your Keys:**
   Replace the empty values with your actual keys:

   ```javascript
   emailjs: {
     publicKey: 'PASTE_YOUR_PUBLIC_KEY_HERE',        // From Step 4
     serviceId: 'service_xxxxxxxxx',                 // From Step 2
     templateId: 'template_xxxxxxxxx'                // From Step 3
   },
   ```

   **Example:**
   ```javascript
   emailjs: {
     publicKey: 'abcdefghijklmnopqrstuvwxyz123456',
     serviceId: 'service_gmail123',
     templateId: 'template_portfolio456'
   },
   ```

3. **Save the file**

---

## Step 6: Test the Form (1 minute)

1. **Start your server:**
   ```bash
   npm run dev
   ```

2. **Test the form:**
   - Go to your contact page
   - Fill out the form with test data
   - Click "Send Message"
   - Check your email inbox (`devwithwaqas@gmail.com`)
   - You should receive the email!

---

## ✅ That's It!

Your contact form should now send emails directly to your inbox!

---

## 🆘 Troubleshooting

**Problem: Form shows "Email service is not configured"**
- Make sure you updated all three values in `constants.js`
- Check that there are no extra spaces in the keys

**Problem: Emails not arriving**
- Check your spam/junk folder
- Verify your Gmail service is connected in EmailJS dashboard
- Check EmailJS dashboard for any error messages

**Problem: Template variables not working**
- Make sure template variables use double curly braces: `{{from_name}}`
- Variable names must match exactly (case-sensitive)

**Need Help?**
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

---

## 📝 Quick Checklist

- [ ] Step 1: Created EmailJS account
- [ ] Step 2: Connected Gmail service (got Service ID)
- [ ] Step 3: Created email template (got Template ID)
- [ ] Step 4: Got Public Key
- [ ] Step 5: Updated `constants.js` with all three keys
- [ ] Step 6: Tested the form - received email!

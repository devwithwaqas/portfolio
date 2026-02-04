# 🔐 Service Account Setup Guide - Step by Step

## ✅ Is It Free?

**YES!** Google Cloud service accounts are **100% FREE**. There are no charges for:
- Creating service accounts
- Using Analytics Data API (for reasonable usage)
- Storing credentials

---

## 📋 Step-by-Step Guide

### Step 1: Go to Google Cloud Console

1. **Visit:** https://console.cloud.google.com/
2. **Sign in** with the same Google account you use for Google Analytics

---

### Step 2: Select or Create a Project

**Option A: Use Existing Project**
- If you already have a Google Cloud project, select it from the project dropdown (top bar)
- Skip to Step 3

**Option B: Create New Project** (if you don't have one)
1. Click the **project dropdown** (top bar, shows project name or "Select a project")
2. Click **"New Project"** button
3. **Project name:** `Waqas Portfolio Analytics` (or any name you like)
4. **Organization:** Leave as default (if shown)
5. Click **"Create"**
6. Wait a few seconds for project creation
7. **Select your new project** from the dropdown

---

### Step 3: Enable Analytics Data API

1. In the Google Cloud Console, click the **hamburger menu** (☰) on the top left
2. Navigate to: **APIs & Services** > **Library**
3. In the search box, type: **"Google Analytics Data API"**
4. Click on **"Google Analytics Data API"** from the results
5. Click the **"Enable"** button
6. Wait for it to enable (shows a green checkmark when done)

**Why this step?** This API allows your service account to read analytics data.

---

### Step 4: Create Service Account

1. Click the **hamburger menu** (☰) again
2. Navigate to: **IAM & Admin** > **Service Accounts**
3. Click the **"+ Create Service Account"** button (top of page)
4. **Fill in the form:**
   - **Service account name:** `ga4-analytics-reader`
   - **Service account ID:** (auto-filled, leave as is)
   - **Description:** `Read-only access to GA4 analytics data for portfolio stats`
5. Click **"Create and Continue"**

---

### Step 5: Skip Roles (Not Needed)

1. **You'll see "Grant this service account access to project"**
2. **Leave it empty** - we don't need to grant roles here
3. Click **"Continue"**

**Why skip?** API access is granted directly in Google Analytics, not through IAM roles.

---

### Step 6: Finish Service Account Creation

1. **You'll see "Grant users access to this service account"**
2. **Skip this step** - not needed for our use case
3. Click **"Done"**

**You should now see your service account listed!**

---

### Step 7: Create JSON Key (Download Credentials)

1. **Click on your service account** (`ga4-analytics-reader`) in the list
2. Go to the **"Keys"** tab (top menu)
3. Click **"Add Key"** > **"Create new key"**
4. **Select key type:** Choose **"JSON"**
5. Click **"Create"**
6. **A JSON file will download automatically** (e.g., `your-project-name-xxxxx.json`)
7. **Save this file securely!** You'll upload it to your server next

⚠️ **Important:** Keep this file safe! It contains credentials for accessing your analytics data.

**File location:** Usually downloads to your `Downloads` folder.

**File name format:** Something like `waqas-portfolio-analytics-xxxxx-xxxxx.json`

---

### Step 8: Grant Service Account Access to GA4

1. **Open the downloaded JSON file** in a text editor (Notepad, VS Code, etc.)
2. **Find the `client_email` field** (looks like: `"client_email": "ga4-analytics-reader@your-project.iam.gserviceaccount.com"`)
3. **Copy the entire email address** (everything inside the quotes)

4. **Go to Google Analytics:**
   - Visit: https://analytics.google.com/
   - Sign in with the same Google account

5. **Navigate to Admin:**
   - Click **Admin** (gear icon, bottom left)
   - Make sure you're in the **Property** column (middle column)
   - Your property should be: **"Waqas Ahmad Portfolio"**

6. **Add Service Account:**
   - Under Property column, click **"Property Access Management"**
   - Click the **"+"** button (top right, may say "Add users")
   - Click **"Add users"**
   - In the **Email** field, paste the service account email you copied
   - **Role:** Select **"Viewer"** (read-only access)
   - Click **"Add"**

**You should see the service account email appear in the list with "Viewer" role.**

---

### Step 9: Rename and Upload JSON Key to Server

1. **Rename the JSON file:**
   - Rename it to: `ga4-service-account-key.json`
   - (Remove the long project ID part)

2. **Upload to ProFreeHost:**
   - Log into ProFreeHost cPanel
   - Go to **File Manager**
   - Navigate to `public_html` (same folder where `ga4-analytics.php` is)
   - **Upload** `ga4-service-account-key.json`

3. **Set Permissions:**
   - Right-click the file
   - Click **"Change Permissions"** (or "File Permissions")
   - Set to: **600** (owner read/write only)
   - Click **"Change Permissions"** or **"Apply"**

**This ensures only the server can read the file (security).**

---

## ✅ Verification Checklist

- [ ] Google Cloud project created/selected
- [ ] Analytics Data API enabled
- [ ] Service account created (`ga4-analytics-reader`)
- [ ] JSON key downloaded
- [ ] Service account email copied from JSON file
- [ ] Service account added to GA4 Property Access Management with "Viewer" role
- [ ] JSON key renamed to `ga4-service-account-key.json`
- [ ] JSON key uploaded to ProFreeHost `public_html` folder
- [ ] File permissions set to `600`

---

## 🎯 Next Steps

Once the service account is set up:

1. **Test the endpoint:**
   ```
   https://waqas.unaux.com/ga4-analytics.php
   ```
   Should return analytics data (not errors about missing key)

2. **Add to GitHub Secrets:**
   - Go to your GitHub repo > **Settings** > **Secrets and variables** > **Actions**
   - Click **"New repository secret"**
   - Name: `VITE_ANALYTICS_API_ENDPOINT`
   - Value: `https://waqas.unaux.com/ga4-analytics.php`
   - Click **"Add secret"**

3. **Your analytics stats will automatically appear in the Hero section!**

---

## 🐛 Troubleshooting

### Error: "Service account key file not found"
- **Fix:** Make sure `ga4-service-account-key.json` is in the same folder as `ga4-analytics.php`
- Check file name is exactly `ga4-service-account-key.json` (case-sensitive)

### Error: "Failed to get access token"
- **Fix:** Check JSON file is valid (open it, should have `client_email` and `private_key` fields)
- Make sure file permissions are `600`

### Error: "Failed to fetch total views: HTTP 403"
- **Fix:** Service account doesn't have access to GA4
- Go back to GA4 > Admin > Property Access Management
- Verify service account email is listed with "Viewer" role
- Make sure you granted access to the correct property (Property ID: 519885223)

---

## 🔒 Security Notes

✅ **Service account is read-only** - Can only view data, cannot modify anything  
✅ **Free forever** - No charges for service accounts or API usage  
✅ **File permissions** - Set to 600 so only server can read it  
✅ **Kept on server** - JSON key stays on your PHP server, never exposed to frontend

That's it! Your service account setup is complete! 🚀
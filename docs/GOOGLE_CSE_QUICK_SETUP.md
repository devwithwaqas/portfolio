# Google Custom Search API - Quick Setup (5 minutes)

## ✅ Free Tier: 100 queries/day

---

## Step 1: Create Custom Search Engine (2 minutes)

1. Go to: **https://cse.google.com/cse/all**
2. Click **"Add"** button (top left)
3. Fill in:
   - **Sites to search:** Leave **EMPTY** (this searches the entire web, not just your site)
   - **Name:** `Portfolio Keyword Test` (or any name)
4. Click **"Create"**
5. **Copy the Search Engine ID** (CSE ID)
   - Looks like: `017576662512468239146:omuauf_lfve`
   - You'll see it in the "Overview" page after creation

---

## Step 2: Get API Key (2 minutes)

1. Go to: **https://console.cloud.google.com/apis/credentials**
2. Make sure you're in the correct project (your Firebase project)
3. Click **"+ CREATE CREDENTIALS"** > **"API Key"**
4. **Copy the API key** (looks like: `AIzaSyD...`)
5. **(Optional but recommended)** Click **"RESTRICT KEY"**:
   - Under "API restrictions", select **"Restrict key"**
   - Choose **"Custom Search API"**
   - Click **"SAVE"**

---

## Step 3: Enable Custom Search API (1 minute)

1. Go to: **https://console.cloud.google.com/apis/library/customsearch.googleapis.com**
2. Make sure you're in the correct project
3. Click **"ENABLE"** button

---

## Step 4: Set Environment Variables & Test

**Windows PowerShell:**
```powershell
$env:GOOGLE_CSE_ID="paste-your-cse-id-here"
$env:GOOGLE_API_KEY="paste-your-api-key-here"
npm run test:rankings
```

**Windows Command Prompt:**
```cmd
set GOOGLE_CSE_ID=paste-your-cse-id-here
set GOOGLE_API_KEY=paste-your-api-key-here
npm run test:rankings
```

**Linux/Mac:**
```bash
export GOOGLE_CSE_ID="paste-your-cse-id-here"
export GOOGLE_API_KEY="paste-your-api-key-here"
npm run test:rankings
```

---

## ✅ Done!

The script will now automatically test keywords using Google Custom Search API.

**Note:** Free tier = 100 queries/day. After that, wait 24 hours or upgrade to paid tier.

---

## 🔍 Quick Verification

After setting env vars, you can verify they're set:
```powershell
# PowerShell
echo $env:GOOGLE_CSE_ID
echo $env:GOOGLE_API_KEY

# CMD
echo %GOOGLE_CSE_ID%
echo %GOOGLE_API_KEY%
```

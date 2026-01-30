# Google Custom Search API Setup - Complete ✅

**Date:** 2026-01-29  
**Status:** Setup Complete, Billing/Configuration Required

---

## ✅ What's Been Set Up

1. **Custom Search API Enabled** ✅
   - API enabled in project: `robust-builder-484406-b3`
   - Verified via: `gcloud services enable customsearch.googleapis.com`

2. **API Key Created** ✅
   - Key: (stored in .env.local only; **never commit** — see docs/GOOGLE_API_KEY_SECURITY.md)
   - Name: "Portfolio Keyword Test"
   - Restrictions: Cleared (unrestricted)
   - Created via: `gcloud services api-keys create`

3. **Custom Search Engine Created** ✅
   - CSE ID: `142cf7cf7eb2f44ef`
   - Name: "Portfolio Keyword Test"
   - Created via: https://programmablesearchengine.google.com/controlpanel/create

4. **Environment Variables** ✅
   - Saved to: `.env.local` (do not commit)
   - CSE ID: `142cf7cf7eb2f44ef`
   - API Key: (in .env.local only; never in repo)

---

## ⚠️ Current Issue

**Error:** `403 Forbidden - This project does not have the access to Custom Search JSON API`

**Possible Causes:**
1. **Billing Account Required** - Even for free tier (100 queries/day), Google may require a billing account to be linked
2. **CSE Configuration** - The Custom Search Engine might need to be configured to search the entire web
3. **API Quota** - Daily quota might be exhausted (100 free queries/day)

---

## 🔧 How to Fix

### Option 1: Enable Billing (Recommended)

1. Go to: https://console.cloud.google.com/billing
2. Link a billing account to project: `robust-builder-484406-b3`
3. **Note:** Free tier (100 queries/day) is still free - billing is just required to be linked

### Option 2: Verify CSE Configuration

1. Go to: https://programmablesearchengine.google.com/controlpanel/all
2. Click on "Portfolio Keyword Test"
3. Go to "Setup" > "Basics"
4. Ensure "Search the entire web" is enabled
5. If "Sites to search" has any URLs, remove them (leave empty)

### Option 3: Check API Quota

1. Go to: https://console.cloud.google.com/apis/api/customsearch.googleapis.com/quotas
2. Check if daily quota (100 queries) is exhausted
3. Wait 24 hours for quota reset, or upgrade to paid tier

---

## 🧪 Test After Fix

Once billing is enabled or CSE is configured:

```powershell
# Set environment variables (never paste real keys into docs or scripts)
$env:GOOGLE_CSE_ID = "142cf7cf7eb2f44ef"
$env:GOOGLE_API_KEY = "your-key-from-console"

# Run test
npm run test:rankings
```

Or use the finalize script:
```powershell
npm run setup:cse-finalize
```

---

## 📊 Expected Results

After fixing the issue, the script should:
- ✅ Successfully query Google Custom Search API
- ✅ Find your portfolio in search results for relevant keywords
- ✅ Report position, page number, and statistics
- ✅ Save detailed JSON report to `scripts/.cache/keyword-rankings-report.json`

---

## 💡 Quick Commands

**Set environment variables:** (use your key from GCP Console; never commit)
```powershell
$env:GOOGLE_CSE_ID = "142cf7cf7eb2f44ef"
$env:GOOGLE_API_KEY = "your-key"
```

**Run test:**
```powershell
npm run test:rankings
```

**Finalize setup (saves to .env.local and runs test):**
```powershell
npm run setup:cse-finalize
```

---

## 📝 Files Created

- `scripts/test-keyword-rankings.js` - Main test script
- `scripts/finalize-setup.ps1` - Setup finalization script
- `scripts/complete-setup.ps1` - Interactive setup script
- `.env.local` - Environment variables (credentials)

---

## ✅ Summary

**Setup Status:** Complete ✅  
**API Status:** Enabled ✅  
**Credentials:** Saved ✅  
**Issue:** Billing/Configuration Required ⚠️  

**Next Step:** Enable billing account or verify CSE configuration, then run `npm run test:rankings`

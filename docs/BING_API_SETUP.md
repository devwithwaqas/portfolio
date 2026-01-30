# Bing Web Search API Setup - Recommended Solution

**Date:** 2026-01-29  
**Status:** ✅ Recommended Alternative to Google CSE

---

## 🎯 Why Bing API?

Google Custom Search Engine's "Search entire web" feature is **deprecated** and can no longer be enabled. This makes Google CSE unsuitable for keyword ranking tests.

**Bing Web Search API Advantages:**
- ✅ **No "search entire web" limitation** - searches the entire web by default
- ✅ **Higher free tier**: 1,000 queries/month (vs Google's 100/day)
- ✅ **Works immediately** - no billing account required for free tier
- ✅ **Better for keyword ranking tests** - searches actual web results

---

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)

```powershell
npm run setup:bing-api
```

This will:
1. Guide you through getting a Bing API key
2. Set environment variables
3. Save to `.env.local`
4. Run a test automatically

### Option 2: Manual Setup

#### Step 1: Get Bing API Key

1. Go to: **https://www.microsoft.com/en-us/bing/apis/bing-web-search-api**
2. Click **"Try now"** or **"Get started"**
3. Sign in with Microsoft account
4. Create a resource:
   - Choose **"Free"** tier (1,000 queries/month)
   - Select a region (any is fine)
   - Click **"Create"**
5. Copy the **Subscription Key** (API Key)

#### Step 2: Set Environment Variable

**Windows PowerShell:**
```powershell
$env:BING_API_KEY="your-bing-api-key-here"
npm run test:rankings
```

**Windows Command Prompt:**
```cmd
set BING_API_KEY=your-bing-api-key-here
npm run test:rankings
```

**Linux/Mac:**
```bash
export BING_API_KEY="your-bing-api-key-here"
npm run test:rankings
```

#### Step 3: Save to .env.local (Optional)

Add to `.env.local`:
```
BING_API_KEY=your-bing-api-key-here
```

---

## 🧪 Test It

After setting the API key:

```powershell
npm run test:rankings
```

The script will automatically use Bing API if available.

---

## 📊 Expected Results

```
✅ API Mode: Bing Web Search (Recommended)

📝 Extracting keywords...
   Total unique keywords: 146

🎲 Testing 10 random keywords...

[1/10] Testing: "Waqas Ahmad consultant"...
   ✅ Found at position #3 (Page 1)

📊 KEYWORD RANKING TEST REPORT
================================================================================

📈 Summary:
   Total Keywords Tested: 10
   ✅ Found: 4 (40.0%)
   ❌ Not Found: 6

✅ FOUND KEYWORDS:
1. "Waqas Ahmad consultant"
   Position: #3 (Page 1)
   Total Results: 1,250
   Snippet: Waqas Ahmad - Software Engineering Consultant...
   Link: https://waqasahmad-portfolio.web.app/
```

---

## 💡 Benefits Over Google CSE

| Feature | Google CSE | Bing Web Search API |
|---------|-----------|---------------------|
| **Search Entire Web** | ❌ Deprecated | ✅ Yes (default) |
| **Free Tier** | 100 queries/day | 1,000 queries/month |
| **Billing Required** | ✅ Yes (even for free) | ❌ No (free tier) |
| **Setup Complexity** | Medium | Easy |
| **Best For** | Site-specific search | Web-wide ranking tests |

---

## 🔄 Switching from Google CSE

If you already set up Google CSE, you can use both:

1. **Bing API** (recommended) - for keyword ranking tests
2. **Google CSE** (optional) - for site-specific search only

The test script will automatically use Bing if available, falling back to Google CSE if needed.

---

## 📝 Files

- `scripts/setup-bing-api.ps1` - Automated setup script
- `scripts/test-keyword-rankings.js` - Test script (supports both APIs)
- `.env.local` - Credentials storage

---

## ✅ Summary

**Recommended:** Use Bing Web Search API for keyword ranking tests.

**Command:**
```powershell
npm run setup:bing-api
```

Then run:
```powershell
npm run test:rankings
```

**Done!** 🎉

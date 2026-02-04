# Keyword Ranking Test Script - Setup Guide

**Script:** `scripts/test-keyword-rankings.js`  
**Command:** `npm run test:rankings`

This script tests if your portfolio appears in search results for random keywords from your SEO keyword list.

---

## 🎯 What It Does

1. **Extracts keywords** from `index.html` and `src/utils/seo.js`
2. **Randomly selects** a subset of keywords (default: 10)
3. **Queries search APIs** (Google or Bing) for each keyword
4. **Checks if your site** (`waqasahmad-portfolio.web.app`) appears in results
5. **Reports:**
   - Which keywords found your site
   - Position in search results (e.g., #3)
   - Page number (e.g., Page 1)
   - Total results for the keyword
   - Snippet preview
   - Statistics (average position, best/worst)

---

## 🚀 Quick Start (Manual Mode - No Setup Required)

**No API keys needed!** Just run:

```bash
npm run test:rankings
```

This will:
- Extract all keywords from your SEO files
- Generate Google and Bing search URLs for random keywords
- Print URLs you can copy-paste into your browser to test manually

**Example output:**
```
1. "Waqas Ahmad consultant"
   Google: https://www.google.com/search?q=Waqas%20Ahmad%20consultant
   Bing:   https://www.bing.com/search?q=Waqas%20Ahmad%20consultant
```

---

## 🔧 API Mode Setup (Automated Testing)

For automated testing with real-time results, you need API keys.

### Option 1: Google Custom Search API (Recommended)

**Free Tier:** 100 queries/day

#### Step 1: Create Custom Search Engine

1. Go to: https://cse.google.com/cse/all
2. Click **"Add"** to create a new search engine
3. **Sites to search:** Leave empty (or add `waqasahmad-portfolio.web.app`)
4. **Name:** "Portfolio Keyword Test" (or any name)
5. Click **"Create"**
6. **Copy the Search Engine ID** (CSE ID) - looks like: `017576662512468239146:omuauf_lfve`

#### Step 2: Get API Key

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click **"Create Credentials"** > **"API Key"**
3. Copy the API key
4. (Optional) Restrict the key to "Custom Search API" for security

#### Step 3: Set Environment Variables

**Windows (PowerShell):**
```powershell
$env:GOOGLE_CSE_ID="your-cse-id-here"
$env:GOOGLE_API_KEY="your-api-key-here"
npm run test:rankings
```

**Windows (Command Prompt):**
```cmd
set GOOGLE_CSE_ID=your-cse-id-here
set GOOGLE_API_KEY=your-api-key-here
npm run test:rankings
```

**Linux/Mac:**
```bash
export GOOGLE_CSE_ID="your-cse-id-here"
export GOOGLE_API_KEY="your-api-key-here"
npm run test:rankings
```

**Or create `.env.local` file** (add to `.gitignore`):
```
GOOGLE_CSE_ID=your-cse-id-here
GOOGLE_API_KEY=your-api-key-here
```

Then load it before running:
```bash
# Windows PowerShell
Get-Content .env.local | ForEach-Object { if ($_ -match '^([^=]+)=(.*)$') { [Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process') } }
npm run test:rankings

# Linux/Mac
export $(cat .env.local | xargs)
npm run test:rankings
```

---

### Option 2: Bing Web Search API (Alternative)

**Free Tier:** 1,000 queries/month

#### Step 1: Get API Key

1. Go to: https://www.microsoft.com/en-us/bing/apis/bing-web-search-api
2. Click **"Try now"** or **"Get started"**
3. Sign in with Microsoft account
4. Create a resource (choose "Free" tier)
5. Copy the **Subscription Key** (API Key)

#### Step 2: Set Environment Variable

**Windows (PowerShell):**
```powershell
$env:BING_API_KEY="your-bing-api-key-here"
npm run test:rankings
```

**Linux/Mac:**
```bash
export BING_API_KEY="your-bing-api-key-here"
npm run test:rankings
```

---

## 📊 Usage Examples

### Test 10 random keywords (default):
```bash
npm run test:rankings
```

### Test 20 random keywords:
```bash
npm run test:rankings:20
```

### Test custom number:
```bash
node scripts/test-keyword-rankings.js 15
```

---

## 📋 Output Example

```
🔍 Keyword Ranking Test Script
================================================================================

✅ API Mode: Google Custom Search

📝 Extracting keywords...
   Total unique keywords: 750

🎲 Testing 10 random keywords...
   Keywords: "Waqas Ahmad consultant", "Azure developer Waqas", ...

[1/10] Testing: "Waqas Ahmad consultant"...
   ✅ Found at position #3 (Page 1)
[2/10] Testing: "Azure developer Waqas"...
   ❌ Not found in top results
...

================================================================================
📊 KEYWORD RANKING TEST REPORT
================================================================================

📈 Summary:
   Total Keywords Tested: 10
   ✅ Found: 4 (40.0%)
   ❌ Not Found: 6

✅ FOUND KEYWORDS:
--------------------------------------------------------------------------------

1. "Waqas Ahmad consultant"
   Position: #3 (Page 1)
   Total Results: 1,250
   Snippet: Waqas Ahmad - Software Engineering Consultant & Specialist with 17+ years...
   Link: https://waqasahmad-portfolio.web.app/

📊 Position Statistics:
   Average Position: 4.5
   Best Position: #2
   Worst Position: #8

❌ NOT FOUND KEYWORDS (6):
--------------------------------------------------------------------------------
1. "Azure developer Waqas"
2. "remote consultant Malaysia"
...

💾 Report saved to: scripts/.cache/keyword-rankings-report.json
```

---

## 📁 Report File

The script saves a detailed JSON report to:
```
scripts/.cache/keyword-rankings-report.json
```

**Format:**
```json
{
  "timestamp": "2026-01-26T10:30:00.000Z",
  "targetSite": "waqasahmad-portfolio.web.app",
  "totalKeywords": 750,
  "testedKeywords": 10,
  "results": [
    {
      "keyword": "Waqas Ahmad consultant",
      "found": true,
      "position": 3,
      "pageNumber": 1,
      "totalResults": "1250",
      "snippet": "...",
      "link": "https://waqasahmad-portfolio.web.app/"
    }
  ]
}
```

---

## ⚠️ Important Notes

### Rate Limiting
- **Google Custom Search:** 100 free queries/day
- **Bing Web Search:** 1,000 free queries/month
- Script adds 1-second delay between requests to avoid hitting limits

### API Quotas
- If you hit quota limits, the script will show errors
- Wait 24 hours (Google) or until next month (Bing) for quota reset
- Or upgrade to paid tier for higher limits

### Manual Testing
- If no API keys are set, script runs in **manual mode**
- Generates search URLs you can test in browser
- Useful for one-off tests or when API quotas are exhausted

### Accuracy
- Results reflect **current** search rankings
- Rankings change frequently based on:
  - Freshness of content
  - Competitor activity
  - Google algorithm updates
  - Indexing status

---

## 🔍 Troubleshooting

### "No API keys configured"
- **Solution:** Run in manual mode (no setup needed) or set API keys (see setup above)

### "API request failed" / "Quota exceeded"
- **Solution:** Wait for quota reset or upgrade API tier

### "Could not find keywords in index.html"
- **Solution:** Ensure `index.html` has `<meta name="keywords">` tag

### Results seem inaccurate
- **Note:** API results may differ from actual Google.com results
- Google Custom Search uses a subset of Google's index
- For most accurate results, use manual testing mode

---

## 🎯 Best Practices

1. **Test regularly** (weekly/monthly) to track ranking changes
2. **Test high-priority keywords** first (your name, main services)
3. **Compare results over time** using saved JSON reports
4. **Use manual mode** for critical keywords when API quotas are low
5. **Focus on keywords where you're NOT ranking** to improve SEO

---

## 📚 Related Documentation

- `docs/AI_SEO_AUDIT_PLAN.md` - AI SEO optimization guide
- `docs/DEEP_KEYWORD_EXPANSION_SUMMARY.md` - Keyword strategy
- `docs/PERSONAL_INFO_SEO_VERIFICATION.md` - Personal info verification

---

## ✅ Quick Checklist

- [ ] Run `npm run test:rankings` (manual mode - no setup)
- [ ] (Optional) Set up Google Custom Search API for automated testing
- [ ] (Optional) Set up Bing Web Search API as alternative
- [ ] Review results and focus on keywords where you're not ranking
- [ ] Re-test monthly to track improvements

---

**Ready to test!** Run `npm run test:rankings` to get started. 🚀

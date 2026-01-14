# 🚨 GA4: No "collect" Requests in Network Tab

## Problem
Console shows tracking logs (`[GA4] Page view tracked`), but Network tab shows **NO requests** to `google-analytics.com/g/collect` when filtering by "collect".

## Root Cause
This means the **`gtag.js` script is not loading** or is **blocked**. Without the Google script, tracking calls are queued in `dataLayer` but never sent to Google's servers.

---

## ✅ Immediate Checks

### Step 1: Check if Script is Being Requested

1. Open **Network tab** (F12 > Network)
2. **Clear** the filter (remove "collect")
3. **Refresh** the page (F5)
4. **Filter by:** `gtag` or `googletagmanager`

**What to look for:**
- ✅ **GOOD:** Request to `googletagmanager.com/gtag/js?id=G-1HMMJLP7GK` with Status `200`
- ❌ **BAD:** Request shows `(blocked)` or `ERR_BLOCKED_BY_CLIENT`
- ❌ **BAD:** No request appears at all

### Step 2: Run Diagnostic

In browser console, type:
```javascript
window.checkGA4Setup()
```

**Look for:**
- `5. Google gtag.js loaded: ✅ YES` = Script loaded correctly
- `5. Google gtag.js loaded: ❌ NO` = Script blocked or failed

### Step 3: Check Console for Errors

Look for:
- `[GA4] ❌ Failed to load gtag.js script` = Script blocked
- `[GA4] ⚠️ Script may not have loaded properly after 5 seconds` = Script timeout

---

## 🔧 Solutions

### Solution 1: Disable Ad Blockers (Most Common)

**Chrome/Edge:**
1. Click extension icon (puzzle piece)
2. Disable: uBlock Origin, AdBlock Plus, Privacy Badger, etc.
3. Refresh page
4. Check Network tab again

**Firefox:**
1. Click extension icon
2. Disable ad blockers
3. Refresh page

**Safari:**
1. Safari > Settings > Extensions
2. Disable ad blockers
3. Refresh page

### Solution 2: Test in Incognito/Private Mode

1. Open **Incognito/Private** window
2. Visit: `https://devwithwaqas.github.io/portfolio/`
3. Open Network tab
4. Check for `gtag` requests

**If it works in Incognito:** An extension is blocking it in normal mode.

### Solution 3: Check Browser Privacy Settings

**Chrome:**
- Settings > Privacy and security > Site Settings > Cookies
- Set to: **Allow all cookies**

**Firefox:**
- Settings > Privacy & Security > Enhanced Tracking Protection
- Set to: **Standard** (or **Off** for testing)

**Safari:**
- Preferences > Privacy
- Uncheck: **Prevent cross-site tracking**

### Solution 4: Check Network/Firewall

If you're on:
- **Corporate network:** May block `googletagmanager.com`
- **VPN:** May block analytics domains
- **Public WiFi:** May have content filters

**Test:** Use mobile data or different network.

---

## 🧪 Verification After Fix

After disabling blockers:

1. **Refresh page** (F5)
2. **Network tab** > Filter: `gtag`
3. **Should see:**
   - `googletagmanager.com/gtag/js?id=G-1HMMJLP7GK` (Status: 200)
4. **Network tab** > Filter: `collect`
5. **Should see:**
   - `google-analytics.com/g/collect?...` (Status: 200 or 204)

6. **Console:** Run `window.checkGA4Setup()`
7. **Should show:** `5. Google gtag.js loaded: ✅ YES`

8. **GA4 Realtime:** Should show your visit within 30 seconds

---

## 📊 Expected Network Requests

After page load, you should see:

1. **Script Load:**
   ```
   googletagmanager.com/gtag/js?id=G-1HMMJLP7GK
   Type: script
   Status: 200
   ```

2. **Page View:**
   ```
   google-analytics.com/g/collect?tid=G-1HMMJLP7GK&en=page_view&...
   Type: xhr or fetch
   Status: 200 or 204
   ```

3. **Events (when triggered):**
   ```
   google-analytics.com/g/collect?tid=G-1HMMJLP7GK&en=contact_form_submit&...
   Type: xhr or fetch
   Status: 200 or 204
   ```

---

## 🆘 Still Not Working?

If you've tried all solutions and still see no requests:

1. **Check Page Source:**
   - View Page Source (Ctrl+U)
   - Search for: `G-1HMMJLP7GK`
   - Should see actual ID (not placeholder)

2. **Check GitHub Secrets:**
   - Go to: Repository > Settings > Secrets and variables > Actions
   - Verify: `VITE_GA4_MEASUREMENT_ID` = `G-1HMMJLP7GK`

3. **Check Deployment:**
   - Go to: Repository > Actions
   - Verify latest deployment completed successfully

4. **Share Diagnostic Output:**
   - Run: `window.checkGA4Setup()`
   - Copy the full output
   - Share with me

---

## 💡 Why This Happens

**The Flow:**
1. Our code loads `gtag.js` from Google
2. Google's script processes `dataLayer` queue
3. Google's script sends requests to `google-analytics.com/g/collect`

**If Step 1 fails (script blocked):**
- Steps 2-3 never happen
- No `collect` requests
- Console logs show tracking (local queue only)
- GA4 shows 0 users

**This is why disabling ad blockers fixes it!**

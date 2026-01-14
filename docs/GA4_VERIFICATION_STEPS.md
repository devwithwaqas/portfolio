# 🔍 GA4 Verification Steps - Check if Tracking is Working

## After Deployment Completes (2-3 minutes)

### Step 1: Check Browser Console

1. **Visit your site:** `https://devwithwaqas.github.io/portfolio/`
2. **Open Console:** Press `F12` > **Console** tab
3. **Look for these messages:**
   - ✅ `[GA4] Initialized with Measurement ID: G-1HMMJLP7GK`
   - ✅ `[GA4] Ready - gtag and dataLayer available`
   - ✅ `[GA4] Page view tracked: /portfolio/ Home Page Title`

**If you see these:** GA4 is working! ✅

**If you DON'T see these:** There's an issue. Check:
- ❌ `[GA4] Measurement ID not configured or invalid` → Secret not set correctly
- ❌ `[GA4] Cannot track page view - GA4 not configured` → Script not loading

---

### Step 2: Check Network Tab

1. **Open Network tab:** Press `F12` > **Network** tab
2. **Refresh page:** Press `F5` or `Ctrl+R`
3. **Filter by:** Type `gtag` or `analytics` in the filter box
4. **Look for:**
   - ✅ Request to: `googletagmanager.com/gtag/js?id=G-1HMMJLP7GK` (Status: 200)
   - ✅ Request to: `google-analytics.com/g/collect?...` (Status: 200 or 204)

**If you see these requests:** GA4 is sending data! ✅

**If you DON'T see these:** Script isn't loading or tracking isn't firing.

---

### Step 3: Check dataLayer

1. **Open Console:** Press `F12` > **Console** tab
2. **Type:** `window.dataLayer`
3. **Press Enter**
4. **You should see:** An array with GA4 configuration objects

**Example:**
```javascript
[
  ['js', Date],
  ['config', 'G-1HMMJLP7GK', { page_path: '/portfolio/', send_page_view: true }],
  ['config', 'G-1HMMJLP7GK', { page_path: '/portfolio/', page_title: '...' }]
]
```

**If you see this:** dataLayer is working! ✅

**If you see `[]` or `undefined`:** GA4 isn't initializing.

---

### Step 4: Check gtag Function

1. **Open Console:** Press `F12` > **Console** tab
2. **Type:** `window.gtag`
3. **Press Enter**
4. **You should see:** `ƒ gtag() { ... }` (a function)

**If you see a function:** gtag is available! ✅

**If you see `undefined`:** Script didn't load.

---

### Step 5: Manually Test Tracking

1. **Open Console:** Press `F12` > **Console** tab
2. **Type:** `window.gtag('event', 'test_event', { test: true })`
3. **Press Enter**
4. **Check Network tab:** Should see a new request to `google-analytics.com/g/collect`

**If you see the request:** Tracking is working! ✅

**If you get an error:** gtag isn't working properly.

---

### Step 6: Check GA4 Realtime

1. **Go to Google Analytics:** [analytics.google.com](https://analytics.google.com)
2. **Click:** **Reports** > **Realtime**
3. **Wait 30 seconds to 2 minutes** after visiting your site
4. **You should see:**
   - ✅ **Active users:** 1 (or more)
   - ✅ **Page views:** 1 (or more)
   - ✅ **Your location** in the map

**If you see data:** GA4 is working perfectly! ✅

**If you still see 0:** 
- Wait another 2-3 minutes (sometimes there's a delay)
- Check if you have ad blockers enabled
- Try from a different browser/device
- Check the console for errors

---

## 🐛 Common Issues & Fixes

### Issue 1: "Measurement ID not configured"

**Fix:**
- Check GitHub Secrets: `VITE_GA4_MEASUREMENT_ID` should be `G-1HMMJLP7GK`
- Trigger a new deployment after adding/updating the secret

### Issue 2: "gtag is not defined"

**Fix:**
- Check if the script is loading in Network tab
- Check if there are JavaScript errors in Console
- Make sure the Measurement ID is correct in page source

### Issue 3: "No network requests to google-analytics.com"

**Fix:**
- Check if ad blockers are enabled (disable temporarily)
- Check if privacy extensions are blocking tracking
- Try in incognito/private mode
- Check browser console for errors

### Issue 4: "Console shows tracking but GA4 shows 0"

**Fix:**
- Wait 2-3 minutes (GA4 can have delays)
- Check if you're looking at the correct GA4 property
- Verify the Measurement ID matches in GA4
- Try from a different device/browser

---

## ✅ Success Checklist

After deployment, verify:

- [ ] Console shows: `[GA4] Initialized with Measurement ID: G-1HMMJLP7GK`
- [ ] Console shows: `[GA4] Page view tracked: ...`
- [ ] Network tab shows request to `googletagmanager.com/gtag/js`
- [ ] Network tab shows request to `google-analytics.com/g/collect`
- [ ] `window.gtag` is a function (not undefined)
- [ ] `window.dataLayer` contains GA4 config objects
- [ ] GA4 Realtime shows your visit within 2-3 minutes

**If all checked:** GA4 is working perfectly! 🎉

**If any unchecked:** Share what you see and I'll help fix it!

---

**After checking these, let me know what you find!** 🔍

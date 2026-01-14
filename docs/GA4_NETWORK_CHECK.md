# 🔍 GA4 Network Check - Verify Requests Are Being Sent

## Critical Check: Network Tab

**The console shows tracking, but if GA4 shows 0, the requests might not be reaching Google.**

### Step 1: Check Network Requests

1. **Open your site:** `https://devwithwaqas.github.io/portfolio/`
2. **Open DevTools:** Press `F12`
3. **Go to Network tab**
4. **Clear network log:** Click the 🚫 icon (or press `Ctrl+Shift+R` to hard refresh)
5. **Refresh the page:** Press `F5`
6. **Filter by:** Type `collect` in the filter box

### What You Should See:

✅ **GOOD - Requests are being sent:**
- Request to: `google-analytics.com/g/collect?...` 
- Status: `200` or `204`
- Multiple requests (one per page view/event)

❌ **BAD - No requests:**
- No requests to `google-analytics.com`
- Only see `gtag/js` but no `collect` requests
- Requests are blocked (red/blocked status)

---

## Step 2: Check gtag.js Script Load

1. **In Network tab, filter by:** `gtag`
2. **Look for:**
   - ✅ Request to: `googletagmanager.com/gtag/js?id=G-1HMMJLP7GK`
   - Status: `200`
   - Size: ~50-100 KB

**If missing:** Script isn't loading → Check Measurement ID in page source

---

## Step 3: Manual Test in Console

1. **Open Console:** Press `F12` > **Console** tab
2. **Type this exactly:**
   ```javascript
   window.gtag('event', 'manual_test', { test_param: 'test_value' })
   ```
3. **Press Enter**
4. **Go to Network tab** (keep it open)
5. **Filter by:** `collect`
6. **You should see:** A new request to `google-analytics.com/g/collect`

**If you see the request:** Tracking is working! ✅
**If you DON'T see the request:** gtag isn't sending data → Check ad blockers

---

## Step 4: Check dataLayer

1. **Open Console:** Press `F12` > **Console** tab
2. **Type:** `window.dataLayer`
3. **Press Enter**
4. **Look for entries like:**
   ```javascript
   [
     ['js', Date],
     ['config', 'G-1HMMJLP7GK', {...}],
     ['event', 'page_view', {...}],
     ['event', 'manual_test', {...}]
   ]
   ```

**If you see config and event entries:** dataLayer is working ✅
**If dataLayer is empty or only has 'js':** Events aren't being added

---

## Step 5: Check for Blockers

### Ad Blockers:
- **uBlock Origin, AdBlock Plus, etc.** → Disable temporarily
- **Privacy Badger** → May block GA4
- **Brave Browser** → Has built-in ad blocking

### Browser Settings:
- **Firefox Enhanced Tracking Protection** → May block GA4
- **Safari Intelligent Tracking Prevention** → May block GA4
- **Chrome Privacy Sandbox** → Usually allows GA4

### Test in Incognito:
- **Chrome:** `Ctrl+Shift+N`
- **Firefox:** `Ctrl+Shift+P`
- **Edge:** `Ctrl+Shift+N`
- Disable extensions in incognito and test

---

## Step 6: Verify Measurement ID

1. **View Page Source:** Right-click > **View Page Source**
2. **Search for:** `G-1HMMJLP7GK`
3. **Should find:** Your Measurement ID in the script
4. **Check:** Is it `G-1HMMJLP7GK` exactly? (no extra spaces, correct format)

---

## 🐛 Common Issues

### Issue: "Console shows tracking but Network shows no requests"

**Causes:**
1. **Ad blocker blocking requests** → Disable and test
2. **Privacy extension blocking** → Disable and test
3. **Browser privacy settings** → Check browser settings
4. **Corporate firewall** → May block analytics

**Fix:** Test in incognito with extensions disabled

---

### Issue: "Network shows requests but GA4 shows 0"

**Causes:**
1. **Wrong Measurement ID** → Check GA4 property matches
2. **GA4 delay** → Wait 5-10 minutes
3. **Wrong GA4 property** → Make sure you're looking at the right property
4. **Data processing delay** → Can take up to 24 hours for some reports

**Fix:** 
- Verify Measurement ID in GA4 matches your site
- Check Realtime report (should show within 2-3 minutes)
- Wait and check again

---

### Issue: "gtag.js loads but no collect requests"

**Causes:**
1. **Measurement ID not initialized** → Check console for errors
2. **gtag function not working** → Check `window.gtag` is a function
3. **dataLayer not initialized** → Check `window.dataLayer` exists

**Fix:** Check console for `[GA4]` messages and errors

---

## ✅ Success Checklist

After checking Network tab:

- [ ] `gtag/js?id=G-1HMMJLP7GK` request exists (Status: 200)
- [ ] `google-analytics.com/g/collect` requests exist (Status: 200/204)
- [ ] Multiple collect requests (one per page view/event)
- [ ] Manual test in console creates new collect request
- [ ] `window.dataLayer` contains event entries
- [ ] No ad blockers enabled (or GA4 whitelisted)
- [ ] Measurement ID correct in page source

**If all checked:** Requests are being sent! If GA4 still shows 0, it's a GA4 delay or wrong property.

**If any unchecked:** That's the issue - fix it and test again.

---

**After checking Network tab, tell me:**
1. Do you see requests to `google-analytics.com/g/collect`?
2. What status codes? (200, 204, or blocked?)
3. How many collect requests? (should be multiple)
4. Does manual test in console create a request?

This will tell us exactly what's wrong! 🔍

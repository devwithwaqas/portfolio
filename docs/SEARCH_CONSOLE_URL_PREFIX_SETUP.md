# 🔍 Google Search Console - URL Prefix Setup (For GitHub Pages)

## Why URL Prefix Instead of Domain?

GitHub Pages doesn't allow DNS changes for `github.io` domains, so we need to use **URL Prefix** property instead, which allows HTML tag verification.

---

## Step-by-Step Guide

### Step 1: Add URL Prefix Property

1. **Go to:** https://search.google.com/search-console
2. **Click:** "Add Property" (or the dropdown if you see it)
3. **Select:** "URL prefix" (NOT "Domain")
4. **Enter:** `https://devwithwaqas.github.io/portfolio/`
   - ⚠️ **Important:** Include the trailing slash `/`
5. **Click:** "Continue"

---

### Step 2: Choose HTML Tag Verification

1. **You'll see verification options:**
   - HTML tag ✅ (Choose this)
   - HTML file
   - Google Analytics
   - Google Tag Manager
   - DNS record (won't work for GitHub Pages)

2. **Click:** "HTML tag" method

3. **Copy the verification code:**
   - You'll see something like:
     ```html
     <meta name="google-site-verification" content="PIPXfEP070w4ExV_Zg72znVbc-EEBHD794S7vurPtFY" />
     ```
   - **Copy the `content` value** (the long string after `content="`)

---

### Step 3: Add Verification Tag to Your Site

Once you have the verification code, I'll add it to your `index.html` file.

**Just share the verification code with me** (the string inside `content="..."`), and I'll:
1. Add it to `index.html`
2. Commit and push
3. Trigger deployment

---

### Step 4: Verify Ownership

1. **Wait for deployment** (2-3 minutes after I push the code)
2. **Go back to Search Console**
3. **Click:** "Verify" button
4. **Should see:** ✅ "Ownership verified"

---

### Step 5: Submit Sitemap

1. **Go to:** "Sitemaps" in left menu
2. **Enter:** `sitemap.xml`
   - (Just `sitemap.xml` - Search Console adds the domain)
3. **Click:** "Submit"
4. **Wait for processing** (few minutes to hours)

---

## Quick Checklist

- [ ] Added URL Prefix property: `https://devwithwaqas.github.io/portfolio/`
- [ ] Chose HTML tag verification method
- [ ] Copied verification code
- [ ] Shared verification code with me
- [ ] Waited for deployment
- [ ] Clicked "Verify" in Search Console
- [ ] Submitted sitemap: `sitemap.xml`

---

## Troubleshooting

### Issue: "Can't verify via Domain name provider?"
**Solution:** You're seeing this because you selected "Domain" instead of "URL prefix". Go back and select "URL prefix" property type.

### Issue: "Verification failed"
**Fix:**
- Make sure meta tag is in `<head>` section
- Ensure deployment completed (wait 2-3 minutes)
- Try refreshing the verification page

### Issue: "Property already exists"
**Fix:**
- If you already added it as Domain property, you can:
  - Delete it and add as URL prefix, OR
  - Keep both (they track the same site)

---

**Ready?** Go to Search Console and add the URL prefix property, then share the verification code with me! 🚀

# Domain Migration Guide - Moving Your Portfolio to a New Domain

## ✅ **Changing Your Domain is PERFECTLY FINE**

**Short answer:** No, changing your domain will NOT prevent indexing. Google fully supports domain migrations. Your content being the same is expected - it's the same site, just moved to a new domain.

---

## 🔄 **What Happens When You Change Domains**

### **Current Domain:**
- `https://devwithwaqas.github.io/portfolio/`

### **Future Domain (Example):**
- `https://devwithwaqas.github.io/portfolio/` (GitHub Pages)

**Google's Perspective:** This is a **site migration**, not duplicate content. Google understands that businesses move domains all the time.

---

## ✅ **Steps for Successful Domain Migration**

### **Step 1: Set Up 301 Redirects (CRITICAL)**

**What:** Redirect all old URLs to new domain  
**Why:** Tells Google the site has moved permanently  
**How:** Configure in your hosting/server

**Example:**
```
Old: https://devwithwaqas.github.io/portfolio/services/full-stack-development
New: https://devwithwaqas.github.io/portfolio/services/full-stack-development
```

**301 Redirect tells Google:**
- "This page has permanently moved"
- "Transfer all SEO value to the new URL"
- "The new URL is now the canonical version"

---

### **Step 2: Update Canonical Tags**

**Current Code Location:** `src/utils/seo.js` (line 8-10)

**Current:**
```javascript
const SITE_URL = 'https://devwithwaqas.github.io/portfolio/'
```

**After Migration:**
```javascript
const SITE_URL = 'https://devwithwaqas.github.io/portfolio/'  // GitHub Pages URL
```

**What this does:**
- Updates all canonical tags to point to new domain
- Tells Google the new domain is the official version
- Prevents duplicate content issues

---

### **Step 3: Update All Internal Links**

**Current Code Location:** `src/router/index.js`, `index.html`, etc.

**What to update:**
- Base URL in router
- Meta tags in `index.html`
- Any hardcoded URLs in components
- Sitemap URLs
- robots.txt sitemap reference

**Search for:** `devwithwaqas.github.io` in your codebase and replace with new domain

---

### **Step 4: Use Google Search Console "Change of Address" Tool**

**Location:** Google Search Console → Settings → Change of Address

**What it does:**
- Officially tells Google you're moving domains
- Transfers search rankings to new domain
- Helps Google understand it's the same site

**Steps:**
1. Add new domain to Google Search Console
2. Verify ownership of new domain
3. Go to Settings → Change of Address
4. Select old domain → Select new domain
5. Submit

---

### **Step 5: Submit New Sitemap**

**After migration:**
1. Update `sitemap.xml` with new domain URLs
2. Submit new sitemap in Google Search Console (new domain property)
3. Keep old sitemap submitted for a while (Google will follow redirects)

---

### **Step 6: Update robots.txt**

**Current:** `public/robots.txt`

**Update:**
```
Sitemap: https://waqasahmad.com/sitemap.xml
```

---

## 🎯 **Why This Works (Not Duplicate Content)**

### **Google's Understanding:**

1. **301 Redirects = Permanent Move**
   - Google sees 301 redirects and understands: "Site moved, not duplicated"
   - All SEO value transfers to new domain
   - Old domain rankings gradually transfer to new domain

2. **Same Content is Expected**
   - It's the SAME site, just different domain
   - Google expects content to be identical
   - This is NOT duplicate content - it's a migration

3. **Canonical Tags Point to New Domain**
   - New canonical tags tell Google: "This is the official version"
   - Old domain redirects tell Google: "Old version is deprecated"
   - No confusion for Google

---

## ⚠️ **What NOT to Do (Avoid These Mistakes)**

### ❌ **DON'T:**
1. **Run both domains simultaneously without redirects**
   - This WOULD create duplicate content issues
   - Always redirect old domain to new

2. **Forget to update canonical tags**
   - Canonical tags must point to NEW domain
   - Otherwise Google might get confused

3. **Remove old domain immediately**
   - Keep redirects active for at least 6-12 months
   - Google needs time to process the migration

4. **Change content structure during migration**
   - Keep URLs the same structure (just domain changes)
   - Example: `/services/full-stack-development` stays the same path

---

## 📋 **Migration Checklist**

### **Before Migration:**
- [ ] Choose new domain
- [ ] Set up hosting for new domain
- [ ] Prepare codebase with new domain (update SITE_URL)
- [ ] Test new domain works correctly

### **During Migration:**
- [ ] Deploy site to new domain
- [ ] Set up 301 redirects (old → new)
- [ ] Update canonical tags in code
- [ ] Update sitemap.xml
- [ ] Update robots.txt
- [ ] Submit new sitemap to Google Search Console

### **After Migration:**
- [ ] Use "Change of Address" tool in Google Search Console
- [ ] Monitor both domains in Search Console
- [ ] Check redirects are working (use redirect checker tool)
- [ ] Monitor search rankings (may dip temporarily, then recover)
- [ ] Keep redirects active for 6-12 months minimum

---

## 🔍 **How to Update Your Code for Domain Migration**

### **1. Update SEO Utility (`src/utils/seo.js`):**

**Find:**
```javascript
const SITE_URL = 'https://devwithwaqas.github.io/portfolio/'
```

**Replace with:**
```javascript
const SITE_URL = 'https://devwithwaqas.github.io/portfolio/'  // GitHub Pages URL
```

### **2. Update Router (`src/router/index.js`):**

**Find:**
```javascript
const SITE_URL = 'https://devwithwaqas.github.io/portfolio/'
```

**Replace with:**
```javascript
const SITE_URL = 'https://devwithwaqas.github.io/portfolio/'  // GitHub Pages URL
```

### **3. Update index.html:**

**Find:**
```html
<meta property="og:url" content="https://devwithwaqas.github.io/portfolio/">
```

**Replace with:**
```html
<meta property="og:url" content="https://devwithwaqas.github.io/portfolio/">
```

### **4. Update robots.txt:**

**Find:**
```
Sitemap: https://devwithwaqas.github.io/portfolio/sitemap.xml
```

**Replace with:**
```
Sitemap: https://waqasahmad.com/sitemap.xml
```

### **5. Search Entire Codebase:**

Use your IDE's "Find and Replace" to search for:
- `devwithwaqas.github.io`
- `https://devwithwaqas.github.io/portfolio/`

Replace with your new domain.

---

## 📊 **Timeline Expectations**

### **Week 1-2:**
- Google discovers new domain
- Starts following redirects
- Begins indexing new domain

### **Week 3-4:**
- Rankings may dip temporarily (normal)
- Google processes redirects
- New domain starts ranking

### **Month 2-3:**
- Rankings stabilize
- New domain fully indexed
- Old domain still redirects (keep it!)

### **Month 6-12:**
- Full migration complete
- Old domain can be kept for redirects indefinitely
- Or gradually phase out (but keep redirects)

---

## ✅ **Final Answer to Your Question**

**Q: "If I change my domain, will it be considered duplicate content and not indexed?"**

**A: NO!** As long as you:
1. ✅ Set up 301 redirects (old → new)
2. ✅ Update canonical tags to new domain
3. ✅ Use Google Search Console "Change of Address" tool
4. ✅ Keep redirects active

**Google will:**
- ✅ Index your new domain
- ✅ Transfer SEO value from old to new
- ✅ Understand it's a migration, not duplicate content
- ✅ Eventually rank the new domain as well as (or better than) the old one

**Your content being the same is EXPECTED and FINE** - it's the same site, just moved! 🎉

---

## 🔗 **Additional Resources**

- [Google's Official Guide: Moving Your Site](https://developers.google.com/search/docs/crawling-indexing/move-site)
- [301 Redirects Explained](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Google Search Console: Change of Address](https://support.google.com/webmasters/answer/9370220)

---

**Bottom line:** Domain migrations are common and fully supported by Google. Follow the steps above, and your new domain will be indexed just fine! ✅

# 📍 How to Submit Sitemap in Google Search Console

## What to Enter

When you're in Google Search Console and adding a sitemap, you need to enter:

### For URL Prefix Property: `https://devwithwaqas.github.io/portfolio/`

**Enter just:**
```
sitemap.xml
```

**NOT the full URL!** Search Console automatically adds your property URL.

---

## Step-by-Step

1. **Go to:** https://search.google.com/search-console
2. **Select your property:** `https://devwithwaqas.github.io/portfolio/`
3. **Click:** "Sitemaps" in the left menu
4. **Click:** "Add a new sitemap" (or "Submit sitemap")
5. **In the text field, enter:**
   ```
   sitemap.xml
   ```
   (Just `sitemap.xml` - nothing else!)
6. **Click:** "Submit"

---

## What Search Console Does

Search Console will automatically combine:
- Your property URL: `https://devwithwaqas.github.io/portfolio/`
- Your sitemap path: `sitemap.xml`
- **Result:** `https://devwithwaqas.github.io/portfolio/sitemap.xml`

---

## Alternative: Full URL (If Relative Doesn't Work)

If entering just `sitemap.xml` doesn't work, try the **full URL**:
```
https://devwithwaqas.github.io/portfolio/sitemap.xml
```

But usually, just `sitemap.xml` is enough!

---

## Verify Sitemap is Accessible

Before submitting, test the sitemap URL:
```
https://devwithwaqas.github.io/portfolio/sitemap.xml
```

You should see XML content with all your pages listed.

---

## After Submission

1. **Status will show:** "Pending" or "Couldn't fetch" initially
2. **Wait a few minutes** (can take up to a few hours)
3. **Check back** - Status should change to "Success"
4. **You'll see:**
   - Submitted: 18 (number of URLs in sitemap)
   - Indexed: Will show how many are indexed (may take time)

---

**That's it! Just enter `sitemap.xml` in the sitemap field.** 🚀

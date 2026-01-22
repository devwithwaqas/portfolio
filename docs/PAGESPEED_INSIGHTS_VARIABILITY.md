# PageSpeed Insights Variability: Why First Test Differs from Subsequent Tests

## The Phenomenon You're Experiencing

You're observing that:
- **First test**: Worse scores (lower performance, higher LCP, higher CLS)
- **Second test**: Better scores
- **Third test**: Even better/more stable scores

This is **completely normal and expected**. Here's why:

---

## Why This Happens: Technical Reasons

### 1. **Service Worker Registration & Caching** ⚡
**First Test:**
- Service worker (`sw.js`) is not yet registered
- No cached assets available
- All resources must be fetched from network
- Service worker registration adds ~100-300ms overhead

**Subsequent Tests:**
- Service worker is already registered
- Assets are cached in browser cache + service worker cache
- Resources load from cache (near-instant)
- Your current SW caches: `index.html`, core assets, and all fetched resources

**Impact:** LCP can improve by 2-4 seconds, FCP by 1-2 seconds

---

### 2. **Browser Cache (HTTP Cache)** 📦
**First Test:**
- Empty browser cache
- All CSS, JS, images, fonts must be downloaded
- DNS lookups, TCP handshakes, TLS negotiation for each domain

**Subsequent Tests:**
- Browser cache is populated
- CSS/JS/images served from memory/disk cache
- Only changed resources are re-fetched

**Impact:** FCP improves by 1-3 seconds, TBT reduces significantly

---

### 3. **Font Loading** 🔤
**First Test:**
- Google Fonts (Roboto, Poppins, Raleway) must be downloaded
- Font files are large (100-300KB total)
- Font loading causes layout shifts (CLS)
- Text renders with fallback fonts first, then shifts when custom fonts load

**Subsequent Tests:**
- Fonts are cached
- Fonts load instantly from cache
- No layout shifts from font loading
- Text renders correctly immediately

**Impact:** CLS can improve from 0.2-1.0 to <0.1, LCP improves by 0.5-1s

---

### 4. **CDN Edge Caching** 🌐
**First Test:**
- CDN edge servers don't have your assets cached
- Request may need to go to origin server
- Cold cache = slower response times

**Subsequent Tests:**
- CDN edge servers have cached your assets
- Assets served from nearest edge location
- Much faster response times

**Impact:** Network latency reduces by 50-200ms per resource

---

### 5. **DNS & TCP/TLS Overhead** 🔌
**First Test:**
- DNS lookup for each domain (fonts.gstatic.com, cdn.jsdelivr.net, etc.)
- TCP handshake (3-way handshake)
- TLS negotiation (TLS 1.3 handshake)
- Each connection adds 100-300ms overhead

**Subsequent Tests:**
- DNS cached
- TCP connections reused (HTTP/2 multiplexing)
- TLS sessions cached
- Minimal connection overhead

**Impact:** Reduces initial connection time by 200-500ms total

---

### 6. **Resource Hints (Preconnect/Prefetch)** 🎯
**First Test:**
- Preconnect hints establish connections, but resources still need to be fetched
- Prefetch hints may not have completed yet

**Subsequent Tests:**
- Preconnect connections are already established
- Prefetched resources are in cache
- Immediate resource availability

**Impact:** Saves 50-150ms per external domain

---

### 7. **Lighthouse Variability** 📊
**Inherent Measurement Variability:**
- Lighthouse uses CPU throttling simulation (4x slowdown)
- Network throttling simulation (Slow 4G)
- These are **simulations**, not real network conditions
- Small variations in timing are normal (±200-500ms)

**Impact:** Scores can vary by 2-5 points between runs

---

## Which Metrics Should You Trust?

### ✅ **Trust the 2nd-3rd Test (Repeat Visitor Experience)**
**Why:**
- Represents **real user experience** for returning visitors
- Most users visit your site multiple times
- Better reflects actual performance after caching
- More accurate for SEO rankings (Google considers repeat visits)

**Focus on:**
- LCP < 2.5s (after cache)
- CLS < 0.1 (after fonts cached)
- FCP < 1.8s (after cache)
- TBT < 200ms (after JS cached)

---

### ⚠️ **First Test (Cold Cache) Still Matters**
**Why:**
- Represents **first-time visitor experience**
- Important for SEO (Googlebot typically has cold cache)
- Important for social media previews (first load)
- Important for users who clear cache or use incognito

**Focus on:**
- LCP < 4.0s (cold cache is acceptable)
- CLS < 0.25 (some font shift is acceptable on first load)
- FCP < 3.0s (cold cache is acceptable)

---

## Best Practices for Testing

### 1. **Always Test Multiple Times**
```
Test 1: Cold cache (baseline)
Test 2: Warm cache (realistic)
Test 3: Warm cache (confirmation)
```

### 2. **Use "Incognito Mode" for First Test**
- Simulates true first-time visitor
- No browser cache interference
- More accurate cold cache metrics

### 3. **Wait 5-10 Minutes Between Tests**
- Allows CDN cache to populate
- Ensures service worker is registered
- More realistic test conditions

### 4. **Focus on Trends, Not Single Scores**
- Look for **improvements over time**
- Compare against your previous scores
- Don't obsess over 1-2 point differences

---

## Your Current Setup Analysis

### ✅ **What's Working Well:**
1. **Service Worker**: Caching core assets and fetched resources
2. **Font Strategy**: Using `display=optional` to prevent blocking
3. **Resource Hints**: Preconnect to external domains
4. **Image Optimization**: WebP/AVIF formats, responsive images

### 🔧 **Potential Improvements:**
1. **Preload Critical Fonts**: Add `<link rel="preload">` for critical font files
2. **Aggressive Caching**: Extend service worker cache to include more assets
3. **Font Subsetting**: Only load font weights you actually use
4. **Critical CSS**: Inline critical CSS in `<head>` for faster FCP

---

## Real-World Impact

### **First-Time Visitor (Cold Cache):**
- LCP: 4.5-6.0s (acceptable for cold cache)
- CLS: 0.1-0.3 (some font shift expected)
- FCP: 3.0-4.5s (acceptable for cold cache)

### **Returning Visitor (Warm Cache):**
- LCP: 1.5-2.5s (excellent!)
- CLS: <0.1 (excellent!)
- FCP: 1.0-1.8s (excellent!)

---

## Conclusion

**Yes, you can trust PageSpeed Insights**, but:

1. **First test** = Worst-case scenario (cold cache, no SW)
2. **Second test** = Realistic returning visitor
3. **Third test** = Confirmed stable performance

**Focus on the 2nd-3rd test results** as they represent real user experience. The first test is useful for identifying optimization opportunities, but the repeat visitor experience is what matters most for SEO and user satisfaction.

---

## Quick Reference: Expected Score Ranges

| Metric | Cold Cache (1st Test) | Warm Cache (2nd+ Test) | Target |
|--------|----------------------|------------------------|--------|
| **Performance** | 50-70 | 80-95 | >90 |
| **LCP** | 4.0-6.0s | 1.5-2.5s | <2.5s |
| **FCP** | 3.0-4.5s | 1.0-1.8s | <1.8s |
| **CLS** | 0.1-0.3 | <0.1 | <0.1 |
| **TBT** | 200-500ms | 50-200ms | <200ms |
| **SI** | 4.0-6.0s | 2.0-3.5s | <3.4s |

---

**Bottom Line:** The variability you're seeing is **normal and expected**. Trust the 2nd-3rd test results as they represent real user experience. The first test is valuable for identifying optimization opportunities, but don't let it stress you out! 🚀

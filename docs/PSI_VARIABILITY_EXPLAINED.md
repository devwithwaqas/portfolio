# PageSpeed Insights Variability Explained

## Why PSI Results Vary (4x Differences)

PageSpeed Insights uses **simulated throttling** which introduces natural variability. Here's what causes the differences:

### 1. **Network Throttling Variability** (Biggest Factor)
- PSI uses **Slow 4G throttling** (1.6 Mbps down, 750 Kbps up, 150ms RTT)
- Network conditions are **simulated**, not real, so timing varies
- **Impact**: Can cause 2-4x differences in load times
- **Your external resources**:
  - Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`)
  - Google Analytics (`googletagmanager.com`)
  - CDN resources (`cdn.jsdelivr.net`, `cdnjs.cloudflare.com`)
  - Firebase Functions (`us-central1-robust-builder-484406-b3.cloudfunctions.net`)

### 2. **CPU Throttling**
- PSI throttles CPU to **4x slower** than normal
- JavaScript execution time varies based on:
  - When scripts load
  - When fonts finish loading
  - When third-party scripts execute
- **Impact**: TBT (Total Blocking Time) can vary 3-5x

### 3. **Third-Party Resource Timing**
Your site loads several external resources that have variable response times:

#### High Variability Sources:
1. **Google Analytics** (`googletagmanager.com/gtag/js`)
   - Loads async, but timing varies
   - Can block main thread during initialization
   - **Current**: Deferred 3s on mobile (good!)

2. **Google Fonts** (`fonts.googleapis.com`, `fonts.gstatic.com`)
   - Font files load at different times
   - Font loading can cause layout shifts
   - **Current**: Using `display=optional` (good!)

3. **Devicon CDN** (`cdn.jsdelivr.net`)
   - CDN response times vary by location
   - Cache hit/miss affects load time
   - **Current**: Deferred with preload (good!)

4. **Firebase Functions** (Analytics endpoint)
   - Server response time varies
   - Cold start vs warm instances
   - **Impact**: Can add 100-500ms variability

### 4. **Cache State**
- **First visit**: All resources load from network
- **Repeat visit**: Some resources cached
- **Impact**: 2-3x difference in load times

### 5. **Font Loading Timing**
- Fonts load asynchronously
- `font-display: optional` means fonts may not load
- Layout shifts occur when fonts swap
- **Impact**: CLS and TBT vary based on font load timing

### 6. **Service Worker State**
- First visit: No SW cache
- Repeat visit: SW serves cached resources
- **Impact**: Can reduce load time by 50-70%

### 7. **JavaScript Execution Order**
- Non-deterministic async operations
- Event listeners fire at different times
- Animation initialization timing
- **Impact**: TBT varies 2-4x

## Why Your Results Vary Specifically

### External Resources (High Variability):
```html
<!-- These have variable response times -->
- Google Fonts (3 font families, multiple weights)
- Google Analytics (gtag.js)
- Devicon CDN (jsdelivr.net)
- Firebase Functions (analytics endpoint)
```

### Current Optimizations (Good):
✅ GA4 deferred 3s on mobile  
✅ Fonts use `display=optional`  
✅ Devicon CSS deferred  
✅ Critical CSS loaded first  
✅ Images preloaded with `fetchpriority="high"`  

### Remaining Variability Sources:
1. **Google Fonts** - Still external, variable load times
2. **GA4 Script** - Even deferred, timing varies
3. **CDN Resources** - Network-dependent
4. **Firebase Functions** - Server response time

## How to Get More Consistent Results

### 1. **Run Multiple Tests**
- PSI recommends **3-5 runs** and average them
- First run is often worst (cold cache)
- Subsequent runs more consistent

### 2. **Use Lab Data, Not Field Data**
- Lab data (PSI) is more consistent
- Field data (CrUX) varies by user location/device
- Focus on **lab data trends**, not single runs

### 3. **Self-Host More Resources**
Reduce external dependencies:
- ✅ Font Awesome: Already self-hosted
- ❌ Google Fonts: Still external (high variability)
- ❌ Devicon: Still from CDN (medium variability)
- ❌ GA4: Must be external (but deferred)

### 4. **Monitor Trends, Not Single Values**
- Look at **trends over time**
- Single bad run doesn't mean regression
- Focus on **median/percentile** values

### 5. **Use Lighthouse CI**
- Run automated tests
- Track metrics over time
- Get alerts on regressions

## Expected Variability Ranges

### Normal Variability (Your Site):
- **FCP**: ±20-30% (2.5s - 4.5s range)
- **LCP**: ±25-35% (4.5s - 7.5s range)
- **TBT**: ±40-60% (50ms - 400ms range) ⚠️ **High variability**
- **CLS**: ±10-20% (0.01 - 0.02 range)

### TBT Specifically (Why It Varies Most):
TBT measures **main thread blocking**:
- JavaScript execution
- Style recalculation
- Layout shifts
- Font loading
- Third-party script execution

**Your TBT variability sources:**
1. GA4 script execution timing
2. Font loading (3 font families)
3. Devicon CSS parsing
4. Vue.js component initialization
5. Animation registration (EpicCard)

## Recommendations

### Short Term:
1. **Run 3-5 PSI tests** and average results
2. **Focus on trends**, not single values
3. **Document baseline** (current best/worst)

### Medium Term:
1. **Self-host Google Fonts** (biggest impact)
2. **Self-host Devicon CSS** (medium impact)
3. **Further defer GA4** (already good, but can improve)

### Long Term:
1. **Set up Lighthouse CI** for automated testing
2. **Monitor CrUX data** (real user metrics)
3. **A/B test optimizations** before deploying

## Understanding Your Specific Case

### Why TBT Varies 4x:
1. **First run**: All resources load, fonts swap, GA4 initializes → High TBT
2. **Subsequent runs**: Cache hits, fonts cached, GA4 cached → Low TBT
3. **Network conditions**: Simulated throttling varies
4. **Third-party timing**: External resources load at different times

### What's Normal:
- **2-3x variability** is normal for TBT
- **4x variability** suggests high external dependency
- **Your site** has 4 external domains (fonts, GA, CDN, Firebase)

### What You Can Do:
1. ✅ **Already doing**: Deferring non-critical scripts
2. ✅ **Already doing**: Using `display=optional` for fonts
3. 🔄 **Can improve**: Self-host Google Fonts
4. 🔄 **Can improve**: Self-host Devicon CSS
5. ✅ **Already doing**: Preloading critical resources

## Conclusion

**4x variability is normal** for sites with multiple external dependencies. Your optimizations are good, but external resources (fonts, GA, CDN) will always introduce variability.

**Focus on:**
- Trends over time (not single runs)
- Median values (not extremes)
- Real user metrics (CrUX) when available
- Consistent improvements (not perfect scores)

# Test PHP Endpoint

## Quick Test

Open this URL in your browser:
```
https://waqas.unaux.com/ga4-track.php
```

**Expected:** `{"error":"Invalid JSON data"}`

If you see this, PHP is working but CORS headers might not be sent.

---

## Test CORS Headers

Open browser console and run:

```javascript
fetch('https://waqas.unaux.com/ga4-track.php', {
  method: 'OPTIONS',
  headers: {
    'Origin': 'https://devwithwaqas.github.io',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'Content-Type'
  }
}).then(r => {
  console.log('Status:', r.status);
  console.log('CORS Header:', r.headers.get('Access-Control-Allow-Origin'));
  r.headers.forEach((v, k) => console.log(k + ':', v));
});
```

**Expected:** Should show `Access-Control-Allow-Origin: https://devwithwaqas.github.io`

---

## If CORS Still Fails

Your hosting provider might not support CORS headers. Options:

1. **Use a different hosting provider** (ProFreeHost, GoogieHost)
2. **Use a CORS proxy** (temporary solution)
3. **Contact hosting support** to enable CORS/mod_headers

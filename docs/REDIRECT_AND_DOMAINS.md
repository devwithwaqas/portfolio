# Redirect and domains

## Main site (no redirect)

**waqas.ragnorx.com** = main site (canonical).

- Served by Firebase project **ragnorx-waqas**.
- Custom domain **waqas.ragnorx.com** is a CNAME in Firebase for this project → same hosting, same content as **ragnorx-waqas.web.app**. No 301 between these two; they are the same site.

## 301 redirect (other project only)

**waqasahmad-portfolio.web.app** = 301 redirect only → **https://waqas.ragnorx.com/** (same path).

- Served by Firebase project **waqasahmad-portfolio**.
- That project’s hosting uses `firebase.waqas-redirect.json` so every request returns 301 to waqas.ragnorx.com.

## Verify

```powershell
# 1) Main site returns 200 and HTML
curl -sI https://waqas.ragnorx.com/
# Expect: HTTP/2 200, content-type text/html

# 2) waqasahmad-portfolio returns 301 to waqas.ragnorx.com
curl -sI https://waqasahmad-portfolio.web.app/
# Expect: HTTP/2 301, location: https://waqas.ragnorx.com/

# 3) Path preserved
curl -sI https://waqasahmad-portfolio.web.app/blog
# Expect: HTTP/2 301, location: https://waqas.ragnorx.com/blog
```

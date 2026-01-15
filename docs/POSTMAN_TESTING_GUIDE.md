# Postman Testing Guide for GA4 Analytics Endpoint

## Quick Setup

### 1. Test GET Request (Main Request)

**Method:** `GET`  
**URL:** `https://waqas.unaux.com/ga4-analytics.php`

**Headers:** (None required, but you can add)
- `Content-Type: application/json`

**What to Check:**
- Status Code (should be 200)
- Response Body (should be JSON)
- Response Headers (check for CORS headers)

---

### 2. Test OPTIONS Request (Preflight)

**Method:** `OPTIONS`  
**URL:** `https://waqas.unaux.com/ga4-analytics.php`

**Headers:**
- `Origin: https://devwithwaqas.github.io`
- `Access-Control-Request-Method: GET`
- `Access-Control-Request-Headers: Content-Type`

**What to Check:**
- Status Code (should be 200)
- Response Headers:
  - `Access-Control-Allow-Origin: https://devwithwaqas.github.io`
  - `Access-Control-Allow-Methods: GET, OPTIONS, POST`
  - `Access-Control-Allow-Headers: Content-Type, Accept, Origin, X-Requested-With, Authorization`
- Response Body (should be empty or minimal)

---

## Step-by-Step Postman Setup

### Step 1: Create New Request
1. Open Postman
2. Click **"New"** → **"HTTP Request"**
3. Name it: `GA4 Analytics - GET`

### Step 2: Configure GET Request
1. **Method:** Select `GET` from dropdown
2. **URL:** Enter `https://waqas.unaux.com/ga4-analytics.php`
3. Click **"Send"**

### Step 3: Check Response

**Expected Success Response:**
```json
{
  "totalViews": 6234,
  "topItems": [
    {
      "name": "Project Name",
      "views": 2435,
      "url": "/projects/...",
      "type": "project"
    }
  ],
  "cached": false
}
```

**Possible Error Responses:**

1. **HTML Error Page:**
   - Means PHP file has an error or isn't executing
   - Check: Is the file uploaded? Is PHP enabled?

2. **JSON Error:**
   ```json
   {
     "error": "Service account key file not found",
     "message": "Please upload ga4-service-account-key.json to your server"
   }
   ```
   - Missing service account key file

3. **JSON Error:**
   ```json
   {
     "error": "Failed to fetch analytics data",
     "message": "Failed to get access token: HTTP 403..."
   }
   ```
   - Google Cloud API issue

---

### Step 4: Test OPTIONS (Preflight)

1. Create another request
2. **Method:** Select `OPTIONS`
3. **URL:** `https://waqas.unaux.com/ga4-analytics.php`
4. **Headers Tab:**
   - Key: `Origin`, Value: `https://devwithwaqas.github.io`
   - Key: `Access-Control-Request-Method`, Value: `GET`
5. Click **"Send"**

**Expected:**
- Status: `200 OK`
- Headers include CORS headers
- Body: Empty or minimal

---

## Common Issues & Solutions

### Issue 1: HTML Response Instead of JSON
**Symptom:** Response is HTML (error page)  
**Cause:** PHP file not executing or has syntax error  
**Fix:** 
- Verify file is uploaded correctly
- Check file permissions (should be 644 or 755)
- Test PHP is working: Create `test.php` with `<?php phpinfo(); ?>`

### Issue 2: 404 Not Found
**Symptom:** `404 Not Found`  
**Cause:** File not in correct location  
**Fix:** 
- Verify file path: Should be in root or public_html
- Check URL matches file location

### Issue 3: 500 Internal Server Error
**Symptom:** `500 Internal Server Error`  
**Cause:** PHP error (check error logs)  
**Fix:**
- Enable error reporting temporarily in PHP file
- Check server error logs
- Verify service account key file exists

### Issue 4: No CORS Headers
**Symptom:** Response works in Postman but fails in browser  
**Cause:** CORS headers not being sent  
**Fix:**
- Check response headers in Postman
- Verify `.htaccess` is uploaded
- Parent `.htaccess` might be blocking (use CORS proxy as workaround)

---

## Testing Checklist

- [ ] GET request returns JSON (not HTML)
- [ ] GET request status is 200
- [ ] Response contains `totalViews` and `topItems`
- [ ] OPTIONS request returns 200
- [ ] OPTIONS response includes CORS headers
- [ ] Service account key file exists on server
- [ ] PHP file has correct permissions

---

## Share Results

After testing, share:
1. **GET Request:**
   - Status Code
   - Response Body (first 500 chars)
   - Response Headers (screenshot or list)

2. **OPTIONS Request:**
   - Status Code
   - Response Headers (especially CORS headers)

This will help identify the exact issue!

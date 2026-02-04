# Google Cloud Function Deployment Commands

## 📋 Prerequisites

1. ✅ Google Cloud Project is created
2. ✅ Google Cloud CLI is installed: https://cloud.google.com/sdk/docs/install
3. ✅ You're authenticated: `gcloud auth login`
4. ✅ Project is set: `gcloud config set project YOUR_PROJECT_ID`

## 🚀 Deployment Command (Windows PowerShell)

### Full Command with Navigation:

```powershell
cd C:\portfolio\serverless\sendEmail; gcloud functions deploy sendEmail --gen2 --runtime=nodejs20 --region=us-central1 --source=. --entry-point=sendEmail --trigger-http --allow-unauthenticated --set-env-vars GMAIL_USER=devwithwaqas@gmail.com,GMAIL_APP_PASSWORD=YOUR_APP_PASSWORD_HERE,TO_EMAIL=devwithwaqas@gmail.com
```

### Step-by-Step (Better for First Time):

#### Step 1: Navigate to Function Directory
```powershell
cd C:\portfolio\serverless\sendEmail
```

#### Step 2: Verify Files Are Present
```powershell
dir
# Should show: index.js and package.json
```

#### Step 3: Deploy the Function
```powershell
gcloud functions deploy sendEmail `
  --gen2 `
  --runtime=nodejs20 `
  --region=us-central1 `
  --source=. `
  --entry-point=sendEmail `
  --trigger-http `
  --allow-unauthenticated `
  --set-env-vars GMAIL_USER=devwithwaqas@gmail.com,GMAIL_APP_PASSWORD=xdxv dfps iscb svve,TO_EMAIL=devwithwaqas@gmail.com
```

**✅ App Password included - ready to deploy!**

**⚠️ IMPORTANT**: Replace `YOUR_16_CHAR_APP_PASSWORD` with your actual Gmail App Password (16 characters, format: `xxxx xxxx xxxx xxxx` - remove spaces or keep them, both work).

### Example with Real App Password (if you have it):
```powershell
gcloud functions deploy sendEmail `
  --gen2 `
  --runtime=nodejs20 `
  --region=us-central1 `
  --source=. `
  --entry-point=sendEmail `
  --trigger-http `
  --allow-unauthenticated `
  --set-env-vars GMAIL_USER=devwithwaqas@gmail.com,GMAIL_APP_PASSWORD=abcd efgh ijkl mnop,TO_EMAIL=devwithwaqas@gmail.com
```

## 📝 Get Function URL After Deployment

After deployment succeeds, get your function URL:

```powershell
gcloud functions describe sendEmail --gen2 --region=us-central1 --format="value(serviceConfig.uri)"
```

This will output something like:
```
https://sendemail-xxxxx-xx.a.run.app
```

## 🧪 Test the Function

After deployment, test it with PowerShell:

```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    subject = "Test Subject"
    message = "Test message"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://[YOUR_FUNCTION_URL]" -Method POST -Body $body -ContentType "application/json"
```

Or use curl (if installed):
```powershell
curl -X POST https://[YOUR_FUNCTION_URL] -H "Content-Type: application/json" -d '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"subject\":\"Test Subject\",\"message\":\"Test message\"}'
```

## 🔧 Alternative: Deploy Without App Password First (Test Structure)

If you don't have the App Password yet but want to test the deployment:

```powershell
cd C:\portfolio\serverless\sendEmail

gcloud functions deploy sendEmail `
  --gen2 `
  --runtime=nodejs20 `
  --region=us-central1 `
  --source=. `
  --entry-point=sendEmail `
  --trigger-http `
  --allow-unauthenticated `
  --set-env-vars GMAIL_USER=devwithwaqas@gmail.com,GMAIL_APP_PASSWORD=placeholder,TO_EMAIL=devwithwaqas@gmail.com
```

Then update the environment variable later:
```powershell
gcloud functions deploy sendEmail `
  --gen2 `
  --runtime=nodejs20 `
  --region=us-central1 `
  --update-env-vars GMAIL_APP_PASSWORD=YOUR_ACTUAL_APP_PASSWORD
```

## 📋 Complete Deployment Checklist

- [ ] Navigate to: `C:\portfolio\serverless\sendEmail`
- [ ] Verify `index.js` and `package.json` exist
- [ ] Get Gmail App Password (or use placeholder)
- [ ] Run deployment command
- [ ] Note the function URL from output
- [ ] Test function with curl/PowerShell
- [ ] Check email inbox for test message

## 🆘 Troubleshooting

### "Permission denied" or "Project not found"
```powershell
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### "Function already exists"
The function will be updated. This is normal.

### "Invalid runtime"
Make sure you're using `--runtime=nodejs20` (Node.js 18)

### "Authentication failed"
Check your Gmail App Password format - it should be 16 characters (spaces optional)

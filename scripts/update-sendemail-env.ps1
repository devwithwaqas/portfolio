# Update sendEmail Cloud Function environment variables
# Usage: .\scripts\update-sendemail-env.ps1
# You will be prompted for Gmail credentials

$ErrorActionPreference = "Stop"
$PROJECT_ID = "robust-builder-484406-b3"
$REGION = "us-central1"
$FUNCTION_NAME = "sendEmail"

Write-Host "=== Update sendEmail Cloud Function Environment Variables ===" -ForegroundColor Cyan
Write-Host ""

# Get API_KEY from Secret Manager
Write-Host "Retrieving API_KEY from Secret Manager..." -ForegroundColor Yellow
$API_KEY = gcloud secrets versions access latest --secret="api-key" --project=$PROJECT_ID 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Could not retrieve api-key secret. API_KEY will not be set." -ForegroundColor Yellow
    $API_KEY = ""
}

# Prompt for Gmail credentials
Write-Host ""
Write-Host "Enter Gmail credentials for sending contact form emails:" -ForegroundColor Cyan
Write-Host "(Get an App Password from: https://myaccount.google.com/apppasswords)" -ForegroundColor Gray
Write-Host ""

$GMAIL_USER = Read-Host "Gmail address (e.g., devwithwaqas@gmail.com)"
$GMAIL_APP_PASSWORD = Read-Host "Gmail App Password (16-char code from Google)"
$TO_EMAIL = Read-Host "Recipient email for contact form (e.g., devwithwaqas@gmail.com)"

# Validate inputs
if (-not $GMAIL_USER -or -not $GMAIL_APP_PASSWORD -or -not $TO_EMAIL) {
    Write-Host "ERROR: All fields are required." -ForegroundColor Red
    exit 1
}

# Build env vars string
$ENV_VARS = "GMAIL_USER=$GMAIL_USER,GMAIL_APP_PASSWORD=$GMAIL_APP_PASSWORD,TO_EMAIL=$TO_EMAIL,LOG_EXECUTION_ID=true"
if ($API_KEY) {
    $ENV_VARS += ",API_KEY=$API_KEY"
}

Write-Host ""
Write-Host "Updating sendEmail function with:" -ForegroundColor Yellow
Write-Host "  - GMAIL_USER: $GMAIL_USER" -ForegroundColor Gray
Write-Host "  - GMAIL_APP_PASSWORD: ****" -ForegroundColor Gray
Write-Host "  - TO_EMAIL: $TO_EMAIL" -ForegroundColor Gray
if ($API_KEY) {
    Write-Host "  - API_KEY: (from Secret Manager)" -ForegroundColor Gray
}
Write-Host ""

# Update the function
Write-Host "Deploying update to Cloud Function..." -ForegroundColor Yellow
gcloud functions deploy $FUNCTION_NAME `
    --gen2 `
    --region=$REGION `
    --project=$PROJECT_ID `
    --source="$PSScriptRoot\..\serverless\sendEmail" `
    --entry-point=sendEmail `
    --runtime=nodejs20 `
    --trigger-http `
    --allow-unauthenticated `
    --update-env-vars="$ENV_VARS"

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to update function" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Done ===" -ForegroundColor Green
Write-Host "sendEmail function updated with Gmail credentials and API_KEY." -ForegroundColor Green
Write-Host ""
Write-Host "Test it by submitting the contact form on your site!" -ForegroundColor Cyan

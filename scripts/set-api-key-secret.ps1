# Create or update the api-key secret in Google Cloud Secret Manager
# Usage: .\scripts\set-api-key-secret.ps1 [api-key-value]
# Or: $env:API_KEY="your-key"; .\scripts\set-api-key-secret.ps1

$ErrorActionPreference = "Stop"
$PROJECT_ID = "robust-builder-484406-b3"
$SECRET_NAME = "api-key"

# Get API key from argument or environment variable
if ($args.Count -gt 0) {
    $API_KEY = $args[0]
} elseif ($env:API_KEY) {
    $API_KEY = $env:API_KEY
} else {
    Write-Host "ERROR: No API key provided." -ForegroundColor Red
    Write-Host "Usage: .\scripts\set-api-key-secret.ps1 [api-key-value]" -ForegroundColor Yellow
    Write-Host "   Or: `$env:API_KEY='your-key'; .\scripts\set-api-key-secret.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host "=== Setting api-key secret in Google Cloud Secret Manager ===" -ForegroundColor Cyan

# Check if secret exists
$ErrorActionPreference = "Continue"
$null = gcloud secrets describe $SECRET_NAME --project=$PROJECT_ID 2>&1
$exists = ($LASTEXITCODE -eq 0)
$ErrorActionPreference = "Stop"

if ($exists) {
    Write-Host "Updating existing secret: $SECRET_NAME..." -ForegroundColor Yellow
    $API_KEY | gcloud secrets versions add $SECRET_NAME --project=$PROJECT_ID --data-file=-
} else {
    Write-Host "Creating new secret: $SECRET_NAME..." -ForegroundColor Green
    $API_KEY | gcloud secrets create $SECRET_NAME --project=$PROJECT_ID --data-file=-
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to create/update secret" -ForegroundColor Red
    exit 1
}

Write-Host "`n=== Done ===" -ForegroundColor Green
Write-Host "Secret '$SECRET_NAME' has been set." -ForegroundColor Green
Write-Host "`nNow run: .\scripts\get-secrets-for-local.ps1" -ForegroundColor Yellow
Write-Host "This will update your .env.local with VITE_SMTP_API_KEY" -ForegroundColor Yellow

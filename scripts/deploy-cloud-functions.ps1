# Deploy all Cloud Functions with security settings
# Automatically sets env vars and secrets

$ErrorActionPreference = "Stop"
$PROJECT_ID = "robust-builder-484406-b3"
$REGION = "us-central1"

Write-Host "=== Deploying Portfolio Cloud Functions ===" -ForegroundColor Cyan

# Generate scheduler secret if not set
if (-not $env:SCHEDULER_SECRET) {
    $SCHEDULER_SECRET = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
    Write-Host "Generated SCHEDULER_SECRET (save this!): $SCHEDULER_SECRET" -ForegroundColor Yellow
} else {
    $SCHEDULER_SECRET = $env:SCHEDULER_SECRET
}

# Set GA4 secrets (optional - uses fallback if not set)
$GA4_FIREBASE_ID = if ($env:GA4_MEASUREMENT_ID_FIREBASE) { $env:GA4_MEASUREMENT_ID_FIREBASE } else { "G-02TG7S6Z2V" }
$GA4_FIREBASE_SECRET = if ($env:GA4_API_SECRET_FIREBASE) { $env:GA4_API_SECRET_FIREBASE } else { "CI49dz3qSHylJ1pHmOzLOg" }
$GA4_GITHUB_ID = if ($env:GA4_MEASUREMENT_ID_GITHUB) { $env:GA4_MEASUREMENT_ID_GITHUB } else { "G-1HMMJLP7GK" }
$GA4_GITHUB_SECRET = if ($env:GA4_API_SECRET_GITHUB) { $env:GA4_API_SECRET_GITHUB } else { "p4SbgXEyTKOikyV8ZZACig" }

Write-Host "`n1. Deploying portfolioAnalyticsAPI (index.js)..." -ForegroundColor Green
Push-Location "$PSScriptRoot\..\gcloud-function"
gcloud functions deploy portfolioAnalyticsAPI `
    --gen2 `
    --runtime=nodejs20 `
    --region=$REGION `
    --source=. `
    --entry-point=portfolioAnalyticsAPI `
    --trigger-http `
    --allow-unauthenticated `
    --set-env-vars="GA4_MEASUREMENT_ID_FIREBASE=$GA4_FIREBASE_ID,GA4_API_SECRET_FIREBASE=$GA4_FIREBASE_SECRET,GA4_MEASUREMENT_ID_GITHUB=$GA4_GITHUB_ID,GA4_API_SECRET_GITHUB=$GA4_GITHUB_SECRET" `
    --project=$PROJECT_ID
Pop-Location

Write-Host "`n2. Deploying readPortfolioAnalytics (index-read.js)..." -ForegroundColor Green
Push-Location "$PSScriptRoot\..\gcloud-function"
gcloud functions deploy readPortfolioAnalytics `
    --gen2 `
    --runtime=nodejs20 `
    --region=$REGION `
    --source=. `
    --entry-point=readPortfolioAnalytics `
    --trigger-http `
    --allow-unauthenticated `
    --set-env-vars="GA4_MEASUREMENT_ID_FIREBASE=$GA4_FIREBASE_ID,GA4_API_SECRET_FIREBASE=$GA4_FIREBASE_SECRET,GA4_MEASUREMENT_ID_GITHUB=$GA4_GITHUB_ID,GA4_API_SECRET_GITHUB=$GA4_GITHUB_SECRET" `
    --project=$PROJECT_ID
Pop-Location

Write-Host "`n3. Deploying updatePortfolioAnalytics (index-update.js)..." -ForegroundColor Green
Push-Location "$PSScriptRoot\..\gcloud-function"
gcloud functions deploy updatePortfolioAnalytics `
    --gen2 `
    --runtime=nodejs20 `
    --region=$REGION `
    --source=. `
    --entry-point=updatePortfolioAnalytics `
    --trigger-http `
    --allow-unauthenticated `
    --set-env-vars="SCHEDULER_SECRET=$SCHEDULER_SECRET" `
    --project=$PROJECT_ID
Pop-Location

Write-Host "`n4. Deploying reportPortfolioError (index-error-report.js)..." -ForegroundColor Green
Push-Location "$PSScriptRoot\..\gcloud-function"
gcloud functions deploy reportPortfolioError `
    --gen2 `
    --runtime=nodejs20 `
    --region=$REGION `
    --source=. `
    --entry-point=reportPortfolioError `
    --trigger-http `
    --allow-unauthenticated `
    --project=$PROJECT_ID
Pop-Location

Write-Host "`n5. Deploying sendEmail..." -ForegroundColor Green
Push-Location "$PSScriptRoot\..\serverless\sendEmail"
$GMAIL_USER = $env:GMAIL_USER
$GMAIL_PASS = $env:GMAIL_APP_PASSWORD
$TO_EMAIL = $env:TO_EMAIL
$API_KEY = $env:API_KEY

# Build env vars - only include non-empty values to preserve existing ones
$envParts = @()
if ($GMAIL_USER) { $envParts += "GMAIL_USER=$GMAIL_USER" }
if ($GMAIL_PASS) { $envParts += "GMAIL_APP_PASSWORD=$GMAIL_PASS" }
if ($TO_EMAIL) { $envParts += "TO_EMAIL=$TO_EMAIL" }
if ($API_KEY) { $envParts += "API_KEY=$API_KEY" }

if ($envParts.Count -eq 0) {
    Write-Host "INFO: No email env vars provided. Existing credentials will be preserved." -ForegroundColor Cyan
    # Deploy without changing env vars
    gcloud functions deploy sendEmail `
        --gen2 `
        --runtime=nodejs20 `
        --region=$REGION `
        --source=. `
        --entry-point=sendEmail `
        --trigger-http `
        --allow-unauthenticated `
        --project=$PROJECT_ID
} else {
    $ENV_VARS = $envParts -join ","
    Write-Host "Updating env vars: $($envParts.Count) variable(s)" -ForegroundColor Gray
    # Use --update-env-vars to preserve existing values
    gcloud functions deploy sendEmail `
        --gen2 `
        --runtime=nodejs20 `
        --region=$REGION `
        --source=. `
        --entry-point=sendEmail `
        --trigger-http `
        --allow-unauthenticated `
        --update-env-vars=$ENV_VARS `
        --project=$PROJECT_ID
}
Pop-Location

Write-Host "`n6. Updating Cloud Scheduler job..." -ForegroundColor Green
$SCHEDULER_JOB = "update-portfolio-analytics"
$FUNCTION_URL = "https://$REGION-$PROJECT_ID.cloudfunctions.net/updatePortfolioAnalytics"

$errPrev = $ErrorActionPreference
$ErrorActionPreference = "Continue"
$null = gcloud scheduler jobs describe $SCHEDULER_JOB --location=$REGION --project=$PROJECT_ID 2>&1
$jobExists = ($LASTEXITCODE -eq 0)
$ErrorActionPreference = $errPrev

if ($jobExists) {
    Write-Host "Updating existing scheduler job..." -ForegroundColor Yellow
    gcloud scheduler jobs update http $SCHEDULER_JOB `
        --location=$REGION `
        --uri=$FUNCTION_URL `
        --http-method=GET `
        --update-headers="X-Scheduler-Secret=$SCHEDULER_SECRET" `
        --project=$PROJECT_ID
} else {
    Write-Host "Creating new scheduler job..." -ForegroundColor Yellow
    gcloud scheduler jobs create http $SCHEDULER_JOB `
        --location=$REGION `
        --schedule="0 * * * *" `
        --uri=$FUNCTION_URL `
        --http-method=GET `
        --headers="X-Scheduler-Secret=$SCHEDULER_SECRET" `
        --project=$PROJECT_ID
}

Write-Host "`n=== Deployment Complete ===" -ForegroundColor Cyan
Write-Host "SCHEDULER_SECRET: $SCHEDULER_SECRET" -ForegroundColor Yellow
Write-Host "Save this secret for future deployments!" -ForegroundColor Yellow

# Set secrets in Secret Manager (more secure than env vars)
# Run this first, then deploy-cloud-functions.ps1 will use secrets

$ErrorActionPreference = "Stop"
$PROJECT_ID = "robust-builder-484406-b3"

Write-Host "=== Setting up Secret Manager secrets ===" -ForegroundColor Cyan

# Enable Secret Manager API (required first time)
Write-Host "Enabling Secret Manager API..." -ForegroundColor Yellow
gcloud services enable secretmanager.googleapis.com --project=$PROJECT_ID
Write-Host "Secret Manager API enabled." -ForegroundColor Green

# Generate secrets if not provided
if (-not $env:SCHEDULER_SECRET) {
    $SCHEDULER_SECRET = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
    Write-Host "Generated SCHEDULER_SECRET: $SCHEDULER_SECRET" -ForegroundColor Yellow
} else {
    $SCHEDULER_SECRET = $env:SCHEDULER_SECRET
}

# Create or update secrets
$GA4_FIREBASE_ID = if ($env:GA4_MEASUREMENT_ID_FIREBASE) { $env:GA4_MEASUREMENT_ID_FIREBASE } else { "G-02TG7S6Z2V" }
$GA4_FIREBASE_SECRET = if ($env:GA4_API_SECRET_FIREBASE) { $env:GA4_API_SECRET_FIREBASE } else { "CI49dz3qSHylJ1pHmOzLOg" }
$GA4_GITHUB_ID = if ($env:GA4_MEASUREMENT_ID_GITHUB) { $env:GA4_MEASUREMENT_ID_GITHUB } else { "G-1HMMJLP7GK" }
$GA4_GITHUB_SECRET = if ($env:GA4_API_SECRET_GITHUB) { $env:GA4_API_SECRET_GITHUB } else { "p4SbgXEyTKOikyV8ZZACig" }

$SECRETS = @(
    @{Name="scheduler-secret"; Value=$SCHEDULER_SECRET},
    @{Name="ga4-measurement-id-firebase"; Value=$GA4_FIREBASE_ID},
    @{Name="ga4-api-secret-firebase"; Value=$GA4_FIREBASE_SECRET},
    @{Name="ga4-measurement-id-github"; Value=$GA4_GITHUB_ID},
    @{Name="ga4-api-secret-github"; Value=$GA4_GITHUB_SECRET},
    @{Name="gmail-user"; Value=$env:GMAIL_USER},
    @{Name="gmail-app-password"; Value=$env:GMAIL_APP_PASSWORD},
    @{Name="to-email"; Value=$env:TO_EMAIL},
    @{Name="api-key"; Value=$env:API_KEY}
)

foreach ($secret in $SECRETS) {
    if (-not $secret.Value) {
        Write-Host "Skipping $($secret.Name) (not set)" -ForegroundColor Gray
        continue
    }

    $errPrev = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    $null = gcloud secrets describe $secret.Name --project=$PROJECT_ID 2>&1
    $exists = ($LASTEXITCODE -eq 0)
    $ErrorActionPreference = $errPrev

    if ($exists) {
        Write-Host "Updating secret: $($secret.Name)..." -ForegroundColor Yellow
        $secret.Value | gcloud secrets versions add $secret.Name --project=$PROJECT_ID --data-file=-
    } else {
        Write-Host "Creating secret: $($secret.Name)..." -ForegroundColor Green
        $secret.Value | gcloud secrets create $secret.Name --project=$PROJECT_ID --data-file=-
    }
    if ($LASTEXITCODE -ne 0) { throw "Failed to create/update secret: $($secret.Name)" }
}

Write-Host "`n=== Secrets configured ===" -ForegroundColor Cyan
Write-Host "SCHEDULER_SECRET: $SCHEDULER_SECRET" -ForegroundColor Yellow
$env:SCHEDULER_SECRET = $SCHEDULER_SECRET

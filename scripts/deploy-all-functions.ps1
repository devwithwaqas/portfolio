# One-command deployment: sets secrets and deploys all functions
# Usage: .\scripts\deploy-all-functions.ps1

$ErrorActionPreference = "Stop"

Write-Host "=== Full Cloud Functions Deployment ===" -ForegroundColor Cyan

# Step 1: Set up secrets (optional, can skip if already done)
$USE_SECRETS = Read-Host "Use Secret Manager? (y/n, default: n)"
if ($USE_SECRETS -eq "y") {
    Write-Host "`nSetting up secrets..." -ForegroundColor Green
    & "$PSScriptRoot\deploy-cloud-functions-secrets.ps1"
}

# Step 2: Deploy all functions
Write-Host "`nDeploying all functions..." -ForegroundColor Green
& "$PSScriptRoot\deploy-cloud-functions.ps1"

Write-Host "`n=== All Done ===" -ForegroundColor Cyan

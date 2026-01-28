# Retrieve secrets from Google Cloud Secret Manager and populate .env.local
# Usage: .\scripts\get-secrets-for-local.ps1

$ErrorActionPreference = "Stop"
$PROJECT_ID = "robust-builder-484406-b3"
$ENV_FILE = ".env.local"

Write-Host "=== Retrieving secrets from Google Cloud Secret Manager ===" -ForegroundColor Cyan

# Check if gcloud is authenticated
$null = gcloud config get-value project 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: gcloud not authenticated. Run: gcloud auth login" -ForegroundColor Red
    exit 1
}

# Function to get secret value
function Get-SecretValue {
    param([string]$SecretName)
    
    try {
        $ErrorActionPreference = "Continue"
        $value = gcloud secrets versions access latest --secret=$SecretName --project=$PROJECT_ID 2>&1
        $ErrorActionPreference = "Stop"
        
        if ($LASTEXITCODE -eq 0) {
            return $value.Trim()
        } else {
            Write-Host "  WARNING: Secret '$SecretName' not found (skipping)" -ForegroundColor Yellow
            return $null
        }
    } catch {
        Write-Host "  WARNING: Failed to retrieve '$SecretName': $_" -ForegroundColor Yellow
        return $null
    }
}

# Retrieve secrets
Write-Host "`nRetrieving secrets..." -ForegroundColor Yellow

$secrets = @{
    "api-key" = "VITE_SMTP_API_KEY"
    "gmail-user" = "GMAIL_USER"
    "gmail-app-password" = "GMAIL_APP_PASSWORD"
    "to-email" = "TO_EMAIL"
    "scheduler-secret" = "SCHEDULER_SECRET"
    "ga4-measurement-id-firebase" = "VITE_GA4_MEASUREMENT_ID"
    "ga4-api-secret-firebase" = "GA4_API_SECRET_FIREBASE"
}

$envVars = @{}

foreach ($secretPair in $secrets.GetEnumerator()) {
    $secretName = $secretPair.Key
    $envVarName = $secretPair.Value
    
    Write-Host "  Retrieving: $secretName..." -ForegroundColor Gray
    $value = Get-SecretValue -SecretName $secretName
    
    if ($value) {
        $envVars[$envVarName] = $value
        Write-Host "    Retrieved: $envVarName" -ForegroundColor Green
    }
}

# Read existing .env.local if it exists
$existingContent = @{}
if (Test-Path $ENV_FILE) {
    Write-Host "`nReading existing $ENV_FILE..." -ForegroundColor Yellow
    Get-Content $ENV_FILE | ForEach-Object {
        if ($_ -match '^\s*([^#=]+?)\s*=\s*(.+)$') {
            $key = $matches[1].Trim()
            $val = $matches[2].Trim()
            $existingContent[$key] = $val
        }
    }
}

# Merge: secrets override existing, but keep other existing vars
Write-Host "`nMerging with existing values..." -ForegroundColor Yellow

# Start with existing content
$finalContent = $existingContent.Clone()

# Override with retrieved secrets
foreach ($envVar in $envVars.GetEnumerator()) {
    $finalContent[$envVar.Key] = $envVar.Value
}

# Read template to get structure and comments
$templateLines = @()
if (Test-Path "env.local.template") {
    $templateLines = Get-Content "env.local.template"
}

# Build output: start with template structure, then add/update values
$output = @()
$seenVars = @{}

# First, add template structure (comments and existing vars)
foreach ($line in $templateLines) {
    if ($line -match '^\s*#') {
        # Comment line - keep it
        $output += $line
    } elseif ($line -match '^\s*([^#=]+?)\s*=\s*(.+)$') {
        $key = $matches[1].Trim()
        $seenVars[$key] = $true
        
        # Use final value if we have it, otherwise keep template value
        if ($finalContent.ContainsKey($key)) {
            $output += "$key=$($finalContent[$key])"
        } else {
            $output += $line
        }
    } elseif ($line.Trim() -eq '') {
        # Empty line
        $output += $line
    } else {
        $output += $line
    }
}

# Add any secrets that weren't in template
$output += ""
$output += "# Secrets retrieved from Google Cloud Secret Manager"
foreach ($envVar in $envVars.GetEnumerator()) {
    if (-not $seenVars.ContainsKey($envVar.Key)) {
        $output += "$($envVar.Key)=$($envVar.Value)"
        $seenVars[$envVar.Key] = $true
    }
}

# Add any other existing vars that weren't in template or secrets
foreach ($existingVar in $existingContent.GetEnumerator()) {
    if (-not $seenVars.ContainsKey($existingVar.Key)) {
        $output += "$($existingVar.Key)=$($existingVar.Value)"
    }
}

# Write to file
Write-Host "`nWriting to $ENV_FILE..." -ForegroundColor Yellow
$output -join "`r`n" | Out-File -FilePath $ENV_FILE -Encoding utf8

Write-Host "`n=== Done ===" -ForegroundColor Green
Write-Host "Updated $ENV_FILE with secrets from Google Cloud Secret Manager" -ForegroundColor Green
Write-Host "`nRetrieved secrets:" -ForegroundColor Cyan
foreach ($envVar in $envVars.GetEnumerator()) {
    $masked = if ($envVar.Value.Length -gt 8) { 
        $envVar.Value.Substring(0, 4) + "..." + $envVar.Value.Substring($envVar.Value.Length - 4)
    } else {
        "***"
    }
    Write-Host "  - $($envVar.Key): $masked" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Note: VITE_SMTP_API_KEY is set for local development." -ForegroundColor Yellow
Write-Host "Make sure your sendEmail Cloud Function has API_KEY env var set to match." -ForegroundColor Yellow

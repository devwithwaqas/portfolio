# Google Custom Search API Setup Script
# Automates enabling API, creating credentials, and setting up environment

Write-Host "Google Custom Search API Setup" -ForegroundColor Cyan
Write-Host ("=" * 80) -ForegroundColor Cyan

# Check if gcloud CLI is installed
$gcloudInstalled = $false
$projectId = $null

$gcloudCheck = & gcloud --version 2>&1
if ($LASTEXITCODE -eq 0) {
    $gcloudInstalled = $true
    Write-Host "[OK] gcloud CLI found" -ForegroundColor Green
    
    # Get current project
    $projectOutput = & gcloud config get-value project 2>&1
    if ($LASTEXITCODE -eq 0 -and $projectOutput -and $projectOutput.ToString().Trim().Length -gt 0) {
        $projectId = $projectOutput.ToString().Trim()
        Write-Host "[INFO] Current project: $projectId" -ForegroundColor Green
    } else {
        Write-Host "[WARN] No default project set" -ForegroundColor Yellow
        $projectInput = Read-Host "Enter your Google Cloud project ID (or press Enter to skip)"
        if ($projectInput -and $projectInput.Trim().Length -gt 0) {
            $projectId = $projectInput.Trim()
        }
    }
} else {
    Write-Host "[WARN] gcloud CLI not found" -ForegroundColor Yellow
}

# Step 1: Enable Custom Search API
Write-Host ""
Write-Host "Step 1: Enabling Custom Search API..." -ForegroundColor Cyan

if ($gcloudInstalled -and $projectId) {
    Write-Host "   Enabling API via gcloud..." -ForegroundColor Gray
    $null = & gcloud services enable customsearch.googleapis.com --project=$projectId 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   [OK] Custom Search API enabled" -ForegroundColor Green
    } else {
        Write-Host "   [WARN] Could not enable via CLI. Please enable manually:" -ForegroundColor Yellow
        Write-Host "   https://console.cloud.google.com/apis/library/customsearch.googleapis.com" -ForegroundColor Yellow
        $continue = Read-Host "   Press Enter after enabling the API..."
    }
} else {
    Write-Host "   [WARN] gcloud CLI not available. Please enable manually:" -ForegroundColor Yellow
    Write-Host "   https://console.cloud.google.com/apis/library/customsearch.googleapis.com" -ForegroundColor Yellow
    Write-Host "   Click 'ENABLE' button" -ForegroundColor Yellow
    $continue = Read-Host "   Press Enter after enabling the API..."
}

# Step 2: Create API Key
Write-Host ""
Write-Host "Step 2: Creating API Key..." -ForegroundColor Cyan

$apiKey = $null

if ($gcloudInstalled -and $projectId) {
    Write-Host "   Attempting to create API key via gcloud..." -ForegroundColor Gray
    
    $keyOutput = & gcloud alpha services api-keys create --display-name="Portfolio Keyword Test" --api-target=service=customsearch.googleapis.com --project=$projectId 2>&1 | Out-String
    
    if ($LASTEXITCODE -eq 0) {
        # Try to extract key from various output formats
        if ($keyOutput -match "keyString[:\s]+([A-Za-z0-9_-]{39})") {
            $apiKey = $matches[1]
        } elseif ($keyOutput -match "([A-Za-z0-9_-]{39})") {
            $apiKey = $matches[1]
        }
        
        if ($apiKey -and $apiKey.Length -gt 30) {
            Write-Host "   [OK] API Key created: $($apiKey.Substring(0, 10))..." -ForegroundColor Green
        } else {
            Write-Host "   [WARN] Key created but could not extract. Please get it manually:" -ForegroundColor Yellow
            Write-Host "   https://console.cloud.google.com/apis/credentials" -ForegroundColor Yellow
            $apiKey = Read-Host "   Paste your API key here"
        }
    } else {
        Write-Host "   [WARN] Could not create via CLI. Please create manually:" -ForegroundColor Yellow
        Write-Host "   https://console.cloud.google.com/apis/credentials" -ForegroundColor Yellow
        Write-Host "   Click '+ CREATE CREDENTIALS' > 'API Key'" -ForegroundColor Yellow
        $apiKey = Read-Host "   Paste your API key here"
    }
} else {
    Write-Host "   [WARN] gcloud CLI not available. Please create API key manually:" -ForegroundColor Yellow
    Write-Host "   https://console.cloud.google.com/apis/credentials" -ForegroundColor Yellow
    Write-Host "   Click '+ CREATE CREDENTIALS' > 'API Key'" -ForegroundColor Yellow
    $apiKey = Read-Host "   Paste your API key here"
}

if (-not $apiKey -or $apiKey.Trim().Length -eq 0) {
    Write-Host ""
    Write-Host "[ERROR] API key is required. Exiting." -ForegroundColor Red
    exit 1
}

# Step 3: Create Custom Search Engine (Web-based, manual step)
Write-Host ""
Write-Host "Step 3: Create Custom Search Engine (Web-based)" -ForegroundColor Cyan
Write-Host "   This must be done via web interface:" -ForegroundColor Yellow
Write-Host "   1. Go to: https://cse.google.com/cse/all" -ForegroundColor White
Write-Host "   2. Click 'Add' button" -ForegroundColor White
Write-Host "   3. Leave 'Sites to search' EMPTY (searches entire web)" -ForegroundColor White
Write-Host "   4. Name: Portfolio Keyword Test" -ForegroundColor White
Write-Host "   5. Click 'Create'" -ForegroundColor White
Write-Host "   6. Copy the Search Engine ID (CSE ID)" -ForegroundColor White
Write-Host "      (Looks like: 017576662512468239146:omuauf_lfve)" -ForegroundColor Gray

$cseId = Read-Host "   Paste your CSE ID here"

if (-not $cseId -or $cseId.Trim().Length -eq 0) {
    Write-Host ""
    Write-Host "[ERROR] CSE ID is required. Exiting." -ForegroundColor Red
    exit 1
}

# Step 4: Set Environment Variables
Write-Host ""
Write-Host "Step 4: Setting Environment Variables..." -ForegroundColor Cyan

$env:GOOGLE_CSE_ID = $cseId.Trim()
$env:GOOGLE_API_KEY = $apiKey.Trim()

Write-Host "   [OK] Environment variables set for current session" -ForegroundColor Green
Write-Host "   GOOGLE_CSE_ID = $cseId" -ForegroundColor Gray
Write-Host "   GOOGLE_API_KEY = $($apiKey.Substring(0, 10))..." -ForegroundColor Gray

# Step 5: Save to .env.local (optional)
Write-Host ""
Write-Host "Step 5: Saving to .env.local (optional)..." -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$envFile = Join-Path $scriptDir ".." ".env.local"
$saveToFile = Read-Host "   Save credentials to .env.local? (y/n)"

if ($saveToFile -eq "y" -or $saveToFile -eq "Y") {
    $envContent = @"
# Google Custom Search API (for keyword ranking tests)
GOOGLE_CSE_ID=$cseId
GOOGLE_API_KEY=$apiKey
"@
    
    Add-Content -Path $envFile -Value $envContent -Force
    Write-Host "   [OK] Saved to .env.local" -ForegroundColor Green
    Write-Host "   [WARN] Note: Add .env.local to .gitignore if not already" -ForegroundColor Yellow
} else {
    Write-Host "   [SKIP] Skipped" -ForegroundColor Gray
}

# Step 6: Test the setup
Write-Host ""
Write-Host "Step 6: Testing the setup..." -ForegroundColor Cyan

Write-Host ""
Write-Host "[OK] Setup complete! Running test..." -ForegroundColor Green
Write-Host ("=" * 80) -ForegroundColor Cyan

# Run the test script
npm run test:rankings

Write-Host ""
Write-Host "TIP: To use in future sessions, set environment variables:" -ForegroundColor Cyan
Write-Host "   `$env:GOOGLE_CSE_ID = '$cseId'" -ForegroundColor White
Write-Host "   `$env:GOOGLE_API_KEY = '$apiKey'" -ForegroundColor White
Write-Host "   npm run test:rankings" -ForegroundColor White

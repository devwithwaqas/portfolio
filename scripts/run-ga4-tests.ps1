# GA4 Cloud Functions - Run tests and write output to command-outputs/
# Run from project root: .\scripts\run-ga4-tests.ps1

$ErrorActionPreference = "Continue"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$outputDir = "command-outputs"
$outputFile = "$outputDir\ga4-test-$timestamp.txt"

if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

function Write-Both {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
    $Message | Out-File -FilePath $outputFile -Encoding UTF8 -Append
}

Write-Both "========================================" "Cyan"
Write-Both "GA4 Cloud Functions - Test Run" "Cyan"
Write-Both "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" "Cyan"
Write-Both "Output: $outputFile" "Yellow"
Write-Both "========================================`n" "Cyan"

# Ensure we're in project root
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Resolve-Path (Join-Path $scriptDir "..")
Set-Location $projectRoot
Write-Both "Working directory: $projectRoot`n" "Gray"

# --- Step 1: Cleanup gcloud-function ---
Write-Both "--- Step 1: Cleanup gcloud-function ---" "Yellow"
$gcf = "gcloud-function"
try {
    if (Test-Path "$gcf\node_modules") {
        Remove-Item -Recurse -Force "$gcf\node_modules" -ErrorAction SilentlyContinue
        Write-Both "  Removed gcloud-function\node_modules" "Green"
    } else {
        Write-Both "  node_modules not present, skip" "Gray"
    }
    Copy-Item "$gcf\package-read.json" "$gcf\package.json" -Force
    Write-Both "  Restored package.json from package-read.json`n" "Green"
} catch {
    Write-Both "  Cleanup error: $($_.Exception.Message)`n" "Red"
}

# --- Step 2: Test UPDATE function ---
Write-Both "--- Step 2: Test UPDATE function ---" "Yellow"
$updateUrl = "https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-update"
try {
    $r = Invoke-WebRequest -Uri $updateUrl -UseBasicParsing -ErrorAction Stop
    Write-Both "  StatusCode: $($r.StatusCode)" "Green"
    Write-Both "  Content: $($r.Content)`n" "Gray"
} catch {
    $err = $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $err = $reader.ReadToEnd()
    }
    Write-Both "  Error: $err`n" "Red"
}

# --- Step 3: Test READ function ---
Write-Both "--- Step 3: Test READ function ---" "Yellow"
$readUrl = "https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-read"
try {
    $r = Invoke-WebRequest -Uri $readUrl -UseBasicParsing -ErrorAction Stop
    Write-Both "  StatusCode: $($r.StatusCode)" "Green"
    Write-Both "  Content: $($r.Content)`n" "Gray"
} catch {
    Write-Both "  Error: $($_.Exception.Message)`n" "Red"
}

# --- Step 4: List Cloud Functions ---
Write-Both "--- Step 4: List Cloud Functions ---" "Yellow"
try {
    $list = gcloud functions list --regions us-central1 --project robust-builder-484406-b3 2>&1
    Write-Both $list "Gray"
    Write-Both "" "Gray"
} catch {
    Write-Both "  Error: $($_.Exception.Message)`n" "Red"
}

# --- Step 5: gcloud config ---
Write-Both "--- Step 5: gcloud config ---" "Yellow"
try {
    $config = gcloud config get-value project 2>&1
    Write-Both "  Project: $config`n" "Gray"
} catch {
    Write-Both "  Error: $($_.Exception.Message)`n" "Red"
}

Write-Both "========================================" "Cyan"
Write-Both "Done. Full output saved to: $outputFile" "Green"
Write-Both "========================================" "Cyan"

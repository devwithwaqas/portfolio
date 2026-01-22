# PowerShell script to diagnose and fix MIME type error on Firebase
# Run: .\scripts\fix-mime-error.ps1

Write-Host "=== MIME TYPE ERROR FIX SCRIPT ===" -ForegroundColor Cyan
Write-Host ""

# Change to project directory
Set-Location $PSScriptRoot\..
$projectRoot = Get-Location

Write-Host "Current directory: $projectRoot" -ForegroundColor Gray
Write-Host ""

# STEP 1: Check current build output
Write-Host "STEP 1: Checking current build output..." -ForegroundColor Yellow
if (Test-Path "dist/assets") {
    $jsFiles = Get-ChildItem "dist/assets/*.js" -ErrorAction SilentlyContinue
    if ($jsFiles) {
        Write-Host "  Found $($jsFiles.Count) JS files:" -ForegroundColor Green
        $jsFiles | Select-Object -First 3 | ForEach-Object {
            Write-Host "    - $($_.Name)" -ForegroundColor White
        }
    } else {
        Write-Host "  No JS files found in dist/assets/" -ForegroundColor Red
    }
} else {
    Write-Host "  dist/assets/ directory does not exist" -ForegroundColor Red
}
Write-Host ""

# STEP 2: Check HTML script paths
Write-Host "STEP 2: Checking HTML script paths..." -ForegroundColor Yellow
if (Test-Path "dist/index.html") {
    $scriptTags = Select-String -Path "dist/index.html" -Pattern 'src=.*assets.*\.js'
    if ($scriptTags) {
        Write-Host "  Found script tags in HTML:" -ForegroundColor Green
        $scriptTags | Select-Object -First 3 | ForEach-Object {
            Write-Host "    $($_.Line.Trim())" -ForegroundColor White
        }
    } else {
        Write-Host "  No script tags found in HTML" -ForegroundColor Red
    }
} else {
    Write-Host "  dist/index.html does not exist" -ForegroundColor Red
}
Write-Host ""

# STEP 3: Rebuild for Firebase
Write-Host "STEP 3: Rebuilding for Firebase..." -ForegroundColor Yellow
Write-Host "  Running: npm run build:firebase" -ForegroundColor Gray
$buildResult = & npm run build:firebase 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Build completed successfully!" -ForegroundColor Green
} else {
    Write-Host "  Build failed with exit code: $LASTEXITCODE" -ForegroundColor Red
    Write-Host "  Build output:" -ForegroundColor Red
    $buildResult | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
    Write-Host ""
    Write-Host "Stopping script due to build failure." -ForegroundColor Red
    exit 1
}
Write-Host ""

# STEP 4: Verify files after build
Write-Host "STEP 4: Verifying files after build..." -ForegroundColor Yellow
if (Test-Path "dist/assets") {
    $jsFiles = Get-ChildItem "dist/assets/*.js" -ErrorAction SilentlyContinue
    if ($jsFiles) {
        Write-Host "  Found $($jsFiles.Count) JS files:" -ForegroundColor Green
        $jsFiles | Select-Object -First 5 | ForEach-Object {
            Write-Host "    - $($_.Name) ($([math]::Round($_.Length/1KB, 2)) KB)" -ForegroundColor White
        }
    } else {
        Write-Host "  ERROR: No JS files found after build!" -ForegroundColor Red
        Write-Host "  This is likely the root cause of the MIME error." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "  ERROR: dist/assets/ directory does not exist after build!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# STEP 5: Check HTML paths again
Write-Host "STEP 5: Checking HTML paths after build..." -ForegroundColor Yellow
if (Test-Path "dist/index.html") {
    $scriptTags = Select-String -Path "dist/index.html" -Pattern 'src=.*assets'
    if ($scriptTags) {
        Write-Host "  Script paths in HTML:" -ForegroundColor Green
        $scriptTags | Select-Object -First 3 | ForEach-Object {
            $line = $_.Line.Trim()
            # Extract just the src attribute
            if ($line -match 'src="([^"]+)"') {
                Write-Host "    $($matches[1])" -ForegroundColor White
            } else {
                Write-Host "    $line" -ForegroundColor White
            }
        }
        
        # Check if paths start with / (Firebase root) or /portfolio/ (wrong)
        $wrongPaths = $scriptTags | Where-Object { $_.Line -match 'src="/portfolio/' }
        if ($wrongPaths) {
            Write-Host "  WARNING: Found paths starting with /portfolio/ (should be / for Firebase)" -ForegroundColor Red
        } else {
            Write-Host "  Paths look correct (starting with /)" -ForegroundColor Green
        }
    } else {
        Write-Host "  No script tags found in HTML" -ForegroundColor Red
    }
} else {
    Write-Host "  dist/index.html does not exist" -ForegroundColor Red
}
Write-Host ""

# STEP 6: Deploy
Write-Host "STEP 6: Deploying to Firebase..." -ForegroundColor Yellow
Write-Host "  Running: firebase deploy --only hosting" -ForegroundColor Gray
Write-Host "  (This may take a few minutes...)" -ForegroundColor Gray
Write-Host ""
$deployResult = & firebase deploy --only hosting 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "  Deployment completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "=== NEXT STEPS ===" -ForegroundColor Cyan
    Write-Host "1. Visit your Firebase site URL" -ForegroundColor White
    Write-Host "2. Open browser DevTools > Network tab" -ForegroundColor White
    Write-Host "3. Hard refresh (Ctrl+Shift+R)" -ForegroundColor White
    Write-Host "4. Check if JS files load with correct MIME type (application/javascript)" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "  Deployment failed with exit code: $LASTEXITCODE" -ForegroundColor Red
    Write-Host "  Deployment output:" -ForegroundColor Red
    $deployResult | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
    Write-Host ""
    exit 1
}

Write-Host "=== SCRIPT COMPLETED ===" -ForegroundColor Cyan

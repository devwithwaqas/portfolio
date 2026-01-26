# PowerShell Script to Convert All 6 Resume Types to PDF
# Converts 3 full resumes (Malaysia, Global, Remote) and 3 one-page versions

$ErrorActionPreference = "Stop"

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

$resumes = @(
    @{ Name = "Malaysia (Full)"; File = "Waqas_Ahmad_Resume_myf.html"; Output = "Waqas_Ahmad_Resume_myf.pdf" },
    @{ Name = "Global (Full)"; File = "Waqas_Ahmad_Resume_glf.html"; Output = "Waqas_Ahmad_Resume_glf.pdf" },
    @{ Name = "Remote (Full)"; File = "Waqas_Ahmad_Resume_rmf.html"; Output = "Waqas_Ahmad_Resume_rmf.pdf" },
    @{ Name = "Malaysia (1-Page)"; File = "Waqas_Ahmad_Resume_myf1.html"; Output = "Waqas_Ahmad_Resume_myf1.pdf" },
    @{ Name = "Global (1-Page)"; File = "Waqas_Ahmad_Resume_gl1.html"; Output = "Waqas_Ahmad_Resume_gl1.pdf" },
    @{ Name = "Remote (1-Page)"; File = "Waqas_Ahmad_Resume_rm1.html"; Output = "Waqas_Ahmad_Resume_rm1.pdf" }
)

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "[CONVERT] All 6 Resumes to PDF" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Find Chrome or Edge browser
$chromePath = $null
$edgePath = $null

$chromePaths = @(
    "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe"
)

foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        $chromePath = $path
        break
    }
}

$edgePaths = @(
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "${env:ProgramFiles}\Microsoft\Edge\Application\msedge.exe"
)

foreach ($path in $edgePaths) {
    if (Test-Path $path) {
        $edgePath = $path
        break
    }
}

$browserPath = $null
$browserName = ""

if ($chromePath) {
    $browserPath = $chromePath
    $browserName = "Chrome"
    Write-Host "[OK] Google Chrome detected" -ForegroundColor Green
} elseif ($edgePath) {
    $browserPath = $edgePath
    $browserName = "Microsoft Edge"
    Write-Host "[OK] Microsoft Edge detected" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Neither Chrome nor Edge found" -ForegroundColor Red
    Write-Host "[INFO] Please install Google Chrome or Microsoft Edge" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

$successCount = 0
$failCount = 0

foreach ($resume in $resumes) {
    $htmlFile = Join-Path $scriptPath $resume.File
    $pdfFile = Join-Path $scriptPath $resume.Output
    
    Write-Host "[CONVERT] Converting $($resume.Name) resume..." -ForegroundColor Yellow
    
    if (-not (Test-Path $htmlFile)) {
        Write-Host "[ERROR] HTML file not found: $htmlFile" -ForegroundColor Red
        $failCount++
        continue
    }
    
    try {
        $htmlUri = [System.Uri]::new((Resolve-Path $htmlFile).Path).AbsoluteUri
        
        $arguments = @(
            "--headless",
            "--disable-gpu",
            "--no-pdf-header-footer",
            "--print-to-pdf=`"$pdfFile`"",
            "--print-to-pdf-no-header",
            $htmlUri
        )
        
        $process = Start-Process -FilePath $browserPath -ArgumentList $arguments -Wait -PassThru -NoNewWindow
        
        if (Test-Path $pdfFile) {
            $fileSize = (Get-Item $pdfFile).Length / 1KB
            Write-Host "[OK] $($resume.Name) PDF created: $([math]::Round($fileSize, 2)) KB" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "[WARN] $($resume.Name) PDF not created, trying alternative method..." -ForegroundColor Yellow
            
            $arguments2 = @(
                "--headless",
                "--disable-gpu",
                "--run-all-compositor-stages-before-draw",
                "--virtual-time-budget=2000",
                "--print-to-pdf=`"$pdfFile`"",
                $htmlUri
            )
            
            $process2 = Start-Process -FilePath $browserPath -ArgumentList $arguments2 -Wait -PassThru -NoNewWindow
            
            if (Test-Path $pdfFile) {
                $fileSize = (Get-Item $pdfFile).Length / 1KB
                Write-Host "[OK] $($resume.Name) PDF created (alternative method): $([math]::Round($fileSize, 2)) KB" -ForegroundColor Green
                $successCount++
            } else {
                Write-Host "[ERROR] $($resume.Name) PDF conversion failed" -ForegroundColor Red
                $failCount++
            }
        }
    } catch {
        Write-Host "[ERROR] $($resume.Name) conversion failed: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
    
    Write-Host ""
}

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "[SUMMARY] Conversion Complete" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "[OK] Successfully converted: $successCount" -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host "[ERROR] Failed: $failCount" -ForegroundColor Red
}
Write-Host ""

if ($successCount -gt 0) {
    Write-Host "[FILES] Generated PDF files:" -ForegroundColor Yellow
    foreach ($resume in $resumes) {
        $pdfFile = Join-Path $scriptPath $resume.Output
        if (Test-Path $pdfFile) {
            Write-Host "  - $($resume.Output)" -ForegroundColor White
        }
    }
}

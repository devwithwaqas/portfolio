# Run verify-urls, submit-bing, analyze; write output to command-outputs/ (gitignored).
# Usage: .\scripts\run-checks.ps1   or   npm run run-checks
# Then check: command-outputs\verify-urls.txt, submit-bing.txt, analyze.txt

$ErrorActionPreference = "Continue"
$repoRoot = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $repoRoot "command-outputs"

if (-not (Test-Path $outDir)) {
  New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

$ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Push-Location $repoRoot | Out-Null
try {
  Write-Host "Run checks -> command-outputs/ ($ts)"
  Write-Host ""

  Write-Host "[1/3] verify-urls..."
  & node scripts/verify-urls-indexing.js *>&1 | Out-File -FilePath (Join-Path $outDir "verify-urls.txt") -Encoding utf8
  Write-Host "      -> command-outputs/verify-urls.txt"

  Write-Host "[2/3] submit-bing..."
  & node scripts/submit-bing-indexnow.js *>&1 | Out-File -FilePath (Join-Path $outDir "submit-bing.txt") -Encoding utf8
  Write-Host "      -> command-outputs/submit-bing.txt"

  Write-Host "[3/3] analyze..."
  & node scripts/analyze-seo.js *>&1 | Out-File -FilePath (Join-Path $outDir "analyze.txt") -Encoding utf8
  Write-Host "      -> command-outputs/analyze.txt"

  Write-Host ""
  Write-Host "Done. Check command-outputs\*.txt"
}
finally {
  Pop-Location | Out-Null
}

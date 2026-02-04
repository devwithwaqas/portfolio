# Run a command and write stdout/stderr to script-output/ (gitignored).
# Use when PowerShell fails (e.g. && not supported) or when you need to capture output.
# Usage: .\run-with-output.ps1 -Command "npm run build" -LogName "build.log"
# Or:    .\run-with-output.ps1 -Command "cd c:\portfolio; npm run build" -LogName "build.log"

param(
    [Parameter(Mandatory = $true)]
    [string]$Command,
    [string]$LogName = "output.log",
    [int]$TimeoutSeconds = 300
)

$outDir = "script-output"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir | Out-Null
}
$logPath = Join-Path $outDir $LogName

"=== $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ===`n$Command`n" | Out-File -FilePath $logPath -Encoding utf8
try {
    $job = Start-Job -ScriptBlock { Invoke-Expression $using:Command } -ErrorAction Stop
    $completed = Wait-Job $job -Timeout $TimeoutSeconds
    if ($completed) {
        Receive-Job $job | Tee-Object -FilePath $logPath -Append
        $job | Remove-Job -Force
    } else {
        "TIMEOUT after $TimeoutSeconds seconds" | Out-File -FilePath $logPath -Append
        $job | Stop-Job; $job | Remove-Job -Force
    }
} catch {
    $_.Exception.Message | Out-File -FilePath $logPath -Append
}
Write-Host "Output written to $logPath"

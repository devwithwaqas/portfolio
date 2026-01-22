# Run all iconResolver.js diagnostic checks
cd c:\portfolio

# 1. Current file line count
Get-Content "src\utils\iconResolver.js" | Measure-Object -Line | Select-Object -ExpandProperty Lines | Out-File "command-outputs\01-current-line-count.txt" -NoNewline

# 2. Backup file line count
if (Test-Path "src\utils\iconResolver.js.backup") { 
    Get-Content "src\utils\iconResolver.js.backup" | Measure-Object -Line | Select-Object -ExpandProperty Lines | Out-File "command-outputs\02-backup-line-count.txt" -NoNewline
} else { 
    "NO BACKUP FOUND" | Out-File "command-outputs\02-backup-line-count.txt" -NoNewline
}

# 3. Current file exports
Select-String -Path "src\utils\iconResolver.js" -Pattern "^export\s+(function|const|let)" | Out-File "command-outputs\03-current-exports.txt"

# 4. Backup file exports
if (Test-Path "src\utils\iconResolver.js.backup") { 
    Select-String -Path "src\utils\iconResolver.js.backup" -Pattern "^export\s+(function|const|let)" | Out-File "command-outputs\04-backup-exports.txt"
} else { 
    "NO BACKUP FOUND" | Out-File "command-outputs\04-backup-exports.txt"
}

# 5. calculateSimilarity function check
Select-String -Path "src\utils\iconResolver.js" -Pattern "calculateSimilarity" -Context 2,2 | Out-File "command-outputs\05-calculateSimilarity-check.txt"

# 6. Git status
git --no-pager branch --show-current | Out-File "command-outputs\06-current-branch.txt" -NoNewline
git --no-pager status --short | Out-File "command-outputs\06-git-status.txt"

# 7. Main branch line count
git --no-pager show main:src/utils/iconResolver.js 2>&1 | Measure-Object -Line | Select-Object -ExpandProperty Lines | Out-File "command-outputs\07-main-branch-line-count.txt" -NoNewline

# 8. Main branch exports
git --no-pager show main:src/utils/iconResolver.js 2>&1 | Select-String -Pattern "^export\s+(function|const|let)" | Out-File "command-outputs\08-main-branch-exports.txt"

# 9. All functions in current file
Select-String -Path "src\utils\iconResolver.js" -Pattern "^\s*(export\s+)?(function|const|let|var)\s+\w+" | Select-Object -First 50 | Out-File "command-outputs\09-all-functions.txt"

# 10. Key functions check
Select-String -Path "src\utils\iconResolver.js" -Pattern "resolveIcon|findBestLocalIcon|calculateSimilarity|normalizeString|findTechnologySpecificIcon" | Out-File "command-outputs\10-key-functions.txt"

# 11. Compare current vs backup (if backup exists)
if (Test-Path "src\utils\iconResolver.js.backup") {
    $current = Get-Content "src\utils\iconResolver.js" -Raw
    $backup = Get-Content "src\utils\iconResolver.js.backup" -Raw
    if ($current -eq $backup) {
        "FILES ARE IDENTICAL" | Out-File "command-outputs\11-file-comparison.txt"
    } else {
        "FILES ARE DIFFERENT" | Out-File "command-outputs\11-file-comparison.txt"
        "Current file size: $($current.Length) bytes" | Out-File "command-outputs\11-file-comparison.txt" -Append
        "Backup file size: $($backup.Length) bytes" | Out-File "command-outputs\11-file-comparison.txt" -Append
    }
} else {
    "NO BACKUP TO COMPARE" | Out-File "command-outputs\11-file-comparison.txt"
}

# 12. Check for OptimizedImage related code
Select-String -Path "src\utils\iconResolver.js" -Pattern "optimized|OptimizedImage|-optimized" -Context 1,1 | Out-File "command-outputs\12-optimization-code.txt"

Write-Host "✅ All checks completed! Results saved in command-outputs\ directory"

# PowerShell script to analyze and clean up hx-inline.js
# Uses hash tables and line number tracking for systematic cleanup

param(
    [string]$FilePath = "public/assets/js/hx-inline.js",
    [switch]$DryRun = $false,
    [switch]$Verbose = $false
)

Write-Host "🧹 HX-Inline Cleanup Tool" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

# Read the file
if (-not (Test-Path $FilePath)) {
    Write-Error "File not found: $FilePath"
    exit 1
}

$content = Get-Content $FilePath -Raw
$lines = Get-Content $FilePath
$totalLines = $lines.Count

Write-Host "📊 Initial Analysis:" -ForegroundColor Yellow
Write-Host "   Total lines: $totalLines" -ForegroundColor White
Write-Host "   File size: $([math]::Round($content.Length / 1KB, 2)) KB" -ForegroundColor White

# Hash table to store function/block information
$codeBlocks = @{}
$unusedBlocks = @()
$usedFunctions = @()

# Patterns to identify different types of code blocks
$patterns = @{
    "IIFE" = @{
        "start" = "\(function \(\) \{"
        "end" = "^\}\)\("
        "description" = "Immediately Invoked Function Expression"
    }
    "Function" = @{
        "start" = "function\s+\w+\s*\("
        "end" = "^\}"
        "description" = "Function Declaration"
    }
    "Class" = @{
        "start" = "class\s+\w+"
        "end" = "^\}"
        "description" = "Class Declaration"
    }
    "Comment" = @{
        "start" = "/\*.*\*/"
        "end" = ""
        "description" = "Comment Block"
    }
    "CSS" = @{
        "start" = "var css = '"
        "end" = "';"
        "description" = "CSS String"
    }
    "Config" = @{
        "start" = "var \w+Config = \{"
        "end" = "^\};"
        "description" = "Configuration Object"
    }
}

# Function to find code blocks
function Find-CodeBlocks {
    param($content, $lines)
    
    $blocks = @()
    $currentBlock = $null
    $braceCount = 0
    $inString = $false
    $stringChar = ""
    
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]
        $lineNumber = $i + 1
        
        # Skip empty lines and simple comments
        if ($line.Trim() -eq "" -or $line.Trim().StartsWith("//")) {
            continue
        }
        
        # Detect start of significant blocks
        if ($line -match "\(function \(\) \{" -and $currentBlock -eq $null) {
            $currentBlock = @{
                Type = "IIFE"
                StartLine = $lineNumber
                EndLine = $null
                Content = @($line)
                Description = "IIFE Block"
            }
            $braceCount = 1
        }
        elseif ($line -match "function\s+\w+\s*\(" -and $currentBlock -eq $null) {
            $currentBlock = @{
                Type = "Function"
                StartLine = $lineNumber
                EndLine = $null
                Content = @($line)
                Description = "Function: $($matches[0])"
            }
            $braceCount = 1
        }
        elseif ($line -match "var \w+Config = \{" -and $currentBlock -eq $null) {
            $currentBlock = @{
                Type = "Config"
                StartLine = $lineNumber
                EndLine = $null
                Content = @($line)
                Description = "Config: $($matches[0])"
            }
            $braceCount = 1
        }
        elseif ($currentBlock -ne $null) {
            $currentBlock.Content += $line
            
            # Count braces to find end of block
            $chars = $line.ToCharArray()
            foreach ($char in $chars) {
                if ($char -eq '"' -or $char -eq "'") {
                    if (-not $inString) {
                        $inString = $true
                        $stringChar = $char
                    } elseif ($char -eq $stringChar) {
                        $inString = $false
                    }
                } elseif (-not $inString) {
                    if ($char -eq '{') { $braceCount++ }
                    elseif ($char -eq '}') { $braceCount-- }
                }
            }
            
            # Check if block is complete
            if ($braceCount -eq 0) {
                $currentBlock.EndLine = $lineNumber
                $blocks += $currentBlock
                $currentBlock = $null
            }
        }
    }
    
    return $blocks
}

# Function to analyze block usage
function Analyze-BlockUsage {
    param($blocks, $content)
    
    $analysis = @{
        Used = @()
        Unused = @()
        PotentiallyUnused = @()
    }
    
    foreach ($block in $blocks) {
        $blockContent = $block.Content -join "`n"
        $isUsed = $false
        
        # Check for common usage patterns
        $usagePatterns = @(
            "window\.hxNarratorPro",
            "hxNarratorPro\.",
            "\.start\(",
            "\.stop\(",
            "\.pause\(",
            "\.resume\(",
            "document\.addEventListener",
            "window\.addEventListener",
            "console\.log",
            "console\.warn",
            "console\.error"
        )
        
        foreach ($pattern in $usagePatterns) {
            if ($blockContent -match $pattern) {
                $isUsed = $true
                break
            }
        }
        
        # Special cases for known used blocks
        if ($block.Description -match "Diagram Narrator Pro" -or 
            $block.Description -match "Icon Engine" -or
            $block.Description -match "Template Loader") {
            $isUsed = $true
        }
        
        if ($isUsed) {
            $analysis.Used += $block
        } else {
            $analysis.Unused += $block
        }
    }
    
    return $analysis
}

# Function to generate cleanup report
function Generate-CleanupReport {
    param($analysis, $totalLines)
    
    $report = @"
🧹 HX-Inline Cleanup Report
==========================

📊 Current State:
   Total Lines: $totalLines
   Total Blocks: $($analysis.Used.Count + $analysis.Unused.Count)
   Used Blocks: $($analysis.Used.Count)
   Unused Blocks: $($analysis.Unused.Count)

🗑️ Blocks to Remove:
"@
    
    $linesToRemove = 0
    foreach ($block in $analysis.Unused) {
        $blockLines = $block.EndLine - $block.StartLine + 1
        $linesToRemove += $blockLines
        $report += "`n   Lines $($block.StartLine)-$($block.EndLine): $($block.Description) ($blockLines lines)"
    }
    
    $report += "`n`n📈 Cleanup Impact:"
    $report += "`n   Lines to remove: $linesToRemove"
    $report += "`n   Remaining lines: $($totalLines - $linesToRemove)"
    $report += "`n   Size reduction: $([math]::Round(($linesToRemove / $totalLines) * 100, 1))%"
    
    return $report
}

# Function to perform cleanup
function Remove-UnusedBlocks {
    param($analysis, $lines, $outputPath)
    
    $newLines = @()
    $skipUntil = 0
    
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $lineNumber = $i + 1
        
        # Check if we should skip this line
        $shouldSkip = $false
        foreach ($block in $analysis.Unused) {
            if ($lineNumber -ge $block.StartLine -and $lineNumber -le $block.EndLine) {
                $shouldSkip = $true
                break
            }
        }
        
        if (-not $shouldSkip) {
            $newLines += $lines[$i]
        }
    }
    
    # Write cleaned file
    $newLines | Out-File -FilePath $outputPath -Encoding UTF8
    return $newLines.Count
}

# Main execution
Write-Host "🔍 Analyzing code blocks..." -ForegroundColor Yellow

$blocks = Find-CodeBlocks -content $content -lines $lines
Write-Host "   Found $($blocks.Count) code blocks" -ForegroundColor White

Write-Host "📋 Analyzing block usage..." -ForegroundColor Yellow
$analysis = Analyze-BlockUsage -blocks $blocks -content $content

Write-Host "📊 Generating cleanup report..." -ForegroundColor Yellow
$report = Generate-CleanupReport -analysis $analysis -totalLines $totalLines

Write-Host "`n$report" -ForegroundColor White

if ($DryRun) {
    Write-Host "`n🔍 DRY RUN - No changes made" -ForegroundColor Green
    Write-Host "Use -DryRun:`$false to perform actual cleanup" -ForegroundColor Yellow
} else {
    Write-Host "`n🧹 Performing cleanup..." -ForegroundColor Yellow
    
    $backupPath = $FilePath + ".backup"
    Copy-Item $FilePath $backupPath
    Write-Host "   Backup created: $backupPath" -ForegroundColor Green
    
    $newLineCount = Remove-UnusedBlocks -analysis $analysis -lines $lines -outputPath $FilePath
    Write-Host "   Cleanup completed!" -ForegroundColor Green
    Write-Host "   New line count: $newLineCount" -ForegroundColor White
    Write-Host "   Lines removed: $($totalLines - $newLineCount)" -ForegroundColor White
}

Write-Host "`n✅ Analysis complete!" -ForegroundColor Green

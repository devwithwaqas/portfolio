$ErrorActionPreference = "Stop"
Write-Host "ðŸ”„ Committing changes..." -ForegroundColor Cyan
git add .
git commit -m "Fix: Disable debug logs, fix CSS syntax errors, optimize service images, fix HMR config"
Write-Host "ðŸ“¤ Pushing to remote..." -ForegroundColor Cyan
git push
Write-Host "ðŸ”„ Merging with waqas branch..." -ForegroundColor Cyan
git checkout waqas
git merge firebase-lcp-optimization
git push
Write-Host "âœ… Switching back to firebase-lcp-optimization branch..." -ForegroundColor Green
git checkout firebase-lcp-optimization
Write-Host "âœ… Done! Changes committed, pushed, and merged with waqas branch." -ForegroundColor Green
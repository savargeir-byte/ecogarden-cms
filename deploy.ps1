# Deploy script - pushes to both main and master
Write-Host "🚀 Starting deployment..." -ForegroundColor Green

# Make sure we're on main
git checkout main

# Add and commit
Write-Host "📦 Committing changes..." -ForegroundColor Yellow
git add .
$message = Read-Host "Commit message"
git commit -m "$message"

# Push to main
Write-Host "⬆️  Pushing to main..." -ForegroundColor Cyan
git push origin main

# Switch to master and merge
Write-Host "🔀 Merging to master..." -ForegroundColor Magenta
git checkout master
git merge main

# Push to master (triggers Vercel)
Write-Host "🚀 Pushing to master (Vercel will deploy)..." -ForegroundColor Green
git push origin master

# Back to main
git checkout main

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "Check Vercel dashboard for build status" -ForegroundColor Gray

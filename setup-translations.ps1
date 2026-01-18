# Setup English Translations
# This script helps you add English translations to your Supabase database

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Eco Garden - English Translation Setup" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "❌ Error: .env.local file not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please create .env.local with your Supabase credentials:" -ForegroundColor Yellow
    Write-Host "NEXT_PUBLIC_SUPABASE_URL=your_supabase_url" -ForegroundColor Gray
    Write-Host "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key" -ForegroundColor Gray
    Write-Host "SUPABASE_SERVICE_ROLE_KEY=your_service_role_key" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Found .env.local file" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Instructions:" -ForegroundColor Yellow
Write-Host "1. Open your Supabase Dashboard" -ForegroundColor White
Write-Host "2. Go to SQL Editor" -ForegroundColor White
Write-Host "3. Create a new query" -ForegroundColor White
Write-Host "4. Copy and paste the contents of:" -ForegroundColor White
Write-Host "   add-english-translations.sql" -ForegroundColor Cyan
Write-Host "5. Run the query" -ForegroundColor White
Write-Host ""

Write-Host "📂 Opening SQL file..." -ForegroundColor Yellow
if (Test-Path "add-english-translations.sql") {
    # Open in default text editor
    Start-Process "add-english-translations.sql"
    Write-Host "✅ SQL file opened in your default editor" -ForegroundColor Green
} else {
    Write-Host "❌ Error: add-english-translations.sql not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🌐 Alternative: Use Supabase CLI" -ForegroundColor Yellow
Write-Host "If you have Supabase CLI installed, run:" -ForegroundColor White
Write-Host "supabase db reset" -ForegroundColor Cyan
Write-Host "Or:" -ForegroundColor White
Write-Host "supabase db push" -ForegroundColor Cyan
Write-Host ""

Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "For more details, see TRANSLATIONS.md" -ForegroundColor White
Write-Host ""

Write-Host "✨ After running the SQL script:" -ForegroundColor Green
Write-Host "1. Refresh your website" -ForegroundColor White
Write-Host "2. Click the language switcher (IS/EN)" -ForegroundColor White
Write-Host "3. Verify all content is translated" -ForegroundColor White
Write-Host ""

$response = Read-Host "Have you run the SQL script? (y/n)"
if ($response -eq 'y' -or $response -eq 'Y') {
    Write-Host ""
    Write-Host "🎉 Great! Your site now supports English translations!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "- Test the language switcher on your site" -ForegroundColor White
    Write-Host "- Review TRANSLATIONS.md for usage guide" -ForegroundColor White
    Write-Host "- Add more translations as needed" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "⏸️  No problem! Run the SQL script when you're ready." -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor White
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

# DEPENDENCIES:
# 1. Git (https://git-scm.com/downloads)
# 2. Vercel CLI (npm i -g vercel)
# 3. Node.js (https://nodejs.org/)

# STEP 1: Setup Git Remote
Write-Host "🔁 Setting Git Remote..." -ForegroundColor Green
git remote remove origin 2> $null
git remote add origin https://github.com/yusufaimxn/octomationscrm2.git
git branch -M main
git add .
git commit -m "🚀 Update & Deploy OctomationsCRM MVP"
git push -u origin main

# STEP 2: Vercel Login
Write-Host "🔐 Logging in to Vercel..." -ForegroundColor Green
vercel login

# STEP 3: Link Vercel Project
Write-Host "🔗 Linking to Vercel Project..." -ForegroundColor Green
vercel link

# STEP 4: Add Supabase ENV
Write-Host "🔧 Setting Supabase ENV..." -ForegroundColor Green
"https://ixjnxmgacktrztdirhqw.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4am54bWdhY2t0cnp0ZGlyaHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDQ4NzYsImV4cCI6MjA1OTQ4MDg3Nn0.v8ioeOlvO7fD53rpnWtJRehwq8LKykT5fovwBpRtecg" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# STEP 5: Deploy
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Green
vercel --prod 
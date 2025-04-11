#!/bin/bash

# DEPENDENCIES:
# 1. Git (https://git-scm.com/downloads)
# 2. Vercel CLI (npm i -g vercel)
# 3. Node.js (https://nodejs.org/)

# STEP 1: Setup Git Remote
echo "🔁 Setting Git Remote..."
git remote remove origin 2> /dev/null
git remote add origin https://github.com/yusufaimxn/octomationscrm2.git
git branch -M main
git add .
git commit -m "🚀 Update & Deploy OctomationsCRM MVP"
git push -u origin main

# STEP 2: Vercel Login
echo "🔐 Logging in to Vercel..."
vercel login

# STEP 3: Link Vercel Project
echo "🔗 Linking to Vercel Project..."
vercel link

# STEP 4: Add Supabase ENV
echo "🔧 Setting Supabase ENV..."
# For PowerShell: echo "https://ixjnxmgacktrztdirhqw.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production
# For bash: vercel env add NEXT_PUBLIC_SUPABASE_URL production < <(echo "https://ixjnxmgacktrztdirhqw.supabase.co")
echo "https://ixjnxmgacktrztdirhqw.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production

# For PowerShell: echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4am54bWdhY2t0cnp0ZGlyaHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDQ4NzYsImV4cCI6MjA1OTQ4MDg3Nn0.v8ioeOlvO7fD53rpnWtJRehwq8LKykT5fovwBpRtecg" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# For bash: vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production < <(echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4am54bWdhY2t0cnp0ZGlyaHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDQ4NzYsImV4cCI6MjA1OTQ4MDg3Nn0.v8ioeOlvO7fD53rpnWtJRehwq8LKykT5fovwBpRtecg")
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4am54bWdhY2t0cnp0ZGlyaHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDQ4NzYsImV4cCI6MjA1OTQ4MDg3Nn0.v8ioeOlvO7fD53rpnWtJRehwq8LKykT5fovwBpRtecg" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# STEP 5: Deploy
echo "🚀 Deploying to Vercel..."
vercel --prod 
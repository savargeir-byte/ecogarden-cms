-- Create Admin User Script
-- Follow these steps in order:

-- ============================================
-- STEP 1: Check existing users
-- ============================================
-- Run this to see all users and find your user ID:

SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC;

-- ============================================
-- STEP 2: Create admin profile
-- ============================================
-- Copy the user ID from Step 1 and replace 'YOUR_USER_ID_HERE' below

INSERT INTO profiles (id, role, created_at)
VALUES (
  'YOUR_USER_ID_HERE',  -- ⚠️ REPLACE THIS with user ID from auth.users
  'admin',
  NOW()
)
ON CONFLICT (id) DO UPDATE 
SET role = 'admin';

-- ============================================
-- STEP 3: Verify admin was created
-- ============================================

SELECT 
  p.id,
  u.email,
  p.role,
  p.created_at
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.role = 'admin';

-- ============================================
-- IF YOU DON'T HAVE A USER YET:
-- ============================================

-- Option 1: Use Magic Link (RECOMMENDED)
-- 1. Go to http://localhost:3000/login
-- 2. Click "✨ Magic Link" tab
-- 3. Enter your email (e.g. admin@ecogarden.is)
-- 4. Click "Send Magic Link"
-- 5. Check your email and click the link
-- 6. Come back here and run STEP 1 & 2 above

-- Option 2: Create user in Supabase Dashboard
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Click "Add user" → "Create new user"
-- 3. Enter email and password
-- 4. Make sure "Auto Confirm User" is checked
-- 5. Click "Create user"
-- 6. Come back here and run STEP 1 & 2 above

-- ============================================
-- TROUBLESHOOTING
-- ============================================

-- Check if profiles table exists:
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'profiles';

-- Check profiles table structure:
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles';

-- See all profiles:
SELECT * FROM profiles;

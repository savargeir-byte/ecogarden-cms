-- Setup Admin User: iceveflausnir@gmail.com
-- Run this script in Supabase SQL Editor

-- Step 1: Create user with email and password
-- Check if user exists and create/update accordingly
DO $$
DECLARE
  user_exists boolean;
  user_id uuid;
BEGIN
  -- Check if user exists
  SELECT EXISTS(SELECT 1 FROM auth.users WHERE email = 'iceveflausnir@gmail.com') INTO user_exists;
  
  IF user_exists THEN
    -- Update existing user
    UPDATE auth.users 
    SET 
      email_confirmed_at = NOW(),
      encrypted_password = crypt('admin123', gen_salt('bf'))
    WHERE email = 'iceveflausnir@gmail.com';
    
    RAISE NOTICE 'User updated with new password';
  ELSE
    -- Create new user
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      email_confirmed_at,
      encrypted_password,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'iceveflausnir@gmail.com',
      NOW(),
      crypt('admin123', gen_salt('bf')),
      '{"provider":"email","providers":["email"]}',
      '{}',
      NOW(),
      NOW(),
      '',
      ''
    );
    
    RAISE NOTICE 'User created successfully';
  END IF;
END $$;

-- Step 2: Create admin profile
-- First get the user ID
DO $$
DECLARE
  user_id uuid;
  profile_exists boolean;
BEGIN
  -- Get user ID
  SELECT id INTO user_id 
  FROM auth.users 
  WHERE email = 'iceveflausnir@gmail.com';
  
  -- Check if profile exists
  SELECT EXISTS(SELECT 1 FROM profiles WHERE id = user_id) INTO profile_exists;
  
  IF profile_exists THEN
    -- Update existing profile
    UPDATE profiles SET role = 'admin' WHERE id = user_id;
    RAISE NOTICE 'Admin profile updated!';
  ELSE
    -- Create new profile
    INSERT INTO profiles (id, role, created_at)
    VALUES (user_id, 'admin', NOW());
    RAISE NOTICE 'Admin profile created!';
  END IF;
  
  -- Show success message
  RAISE NOTICE 'Email: iceveflausnir@gmail.com';
  RAISE NOTICE 'Temporary Password: admin123';
  RAISE NOTICE 'IMPORTANT: Change password after first login!';
END $$;

-- Step 3: Verify setup
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  p.role,
  u.created_at
FROM auth.users u
LEFT JOIN profiles p ON p.id = u.id
WHERE u.email = 'iceveflausnir@gmail.com';

-- ============================================
-- TO CHANGE PASSWORD:
-- ============================================

-- Option 1: Update password directly in SQL
-- (Replace 'YourNewPassword123' with your desired password)
/*
UPDATE auth.users 
SET encrypted_password = crypt('YourNewPassword123', gen_salt('bf'))
WHERE email = 'iceveflausnir@gmail.com';
*/

-- Option 2: Use password reset flow
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Find user: iceveflausnir@gmail.com
-- 3. Click "..." → "Send password recovery"
-- 4. Check email and set new password

-- ============================================
-- LOGIN INSTRUCTIONS:
-- ============================================
-- 1. Go to http://localhost:3000/login
-- 2. Click "🔑 Password" tab
-- 3. Email: iceveflausnir@gmail.com
-- 4. Password: admin123 (temporary)
-- 5. After login, change password in Supabase Dashboard

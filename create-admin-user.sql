-- Quick dev admin setup
-- Run this in Supabase SQL Editor

-- Create a test admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@ecogarden.is',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"admin"}',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE
SET raw_user_meta_data = '{"role":"admin"}',
    email_confirmed_at = NOW();

-- Verify user was created
SELECT email, raw_user_meta_data, email_confirmed_at 
FROM auth.users 
WHERE email = 'admin@ecogarden.is';

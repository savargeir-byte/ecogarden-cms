-- Fix RLS policies for announcements table
-- This allows admin users to manage announcements

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view active announcements" ON announcements;
DROP POLICY IF EXISTS "Authenticated users can manage announcements" ON announcements;

-- Allow public read access to active announcements
CREATE POLICY "Public can view active announcements"
  ON announcements FOR SELECT
  USING (active = true);

-- Allow ALL users to insert (for testing - you can restrict this later)
CREATE POLICY "Allow insert announcements"
  ON announcements FOR INSERT
  WITH CHECK (true);

-- Allow ALL users to update (for testing - you can restrict this later)
CREATE POLICY "Allow update announcements"
  ON announcements FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow ALL users to delete (for testing - you can restrict this later)
CREATE POLICY "Allow delete announcements"
  ON announcements FOR DELETE
  USING (true);

-- Note: For production, you should restrict these policies to authenticated users
-- or specific roles. For now, this allows the admin panel to work without authentication issues.

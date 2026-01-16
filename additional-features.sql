-- Media table for media library
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  name text NOT NULL,
  size int,
  mime_type text,
  created_at timestamptz DEFAULT now()
);

-- Add locale support to pages
ALTER TABLE pages ADD COLUMN IF NOT EXISTS locale text DEFAULT 'is';

-- Add specs to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS specs jsonb DEFAULT '[]';

-- Enable RLS on media (if not already enabled)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'media' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE media ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Media policies (drop first if exists to avoid conflicts)
DROP POLICY IF EXISTS "Allow public media select" ON media;
DROP POLICY IF EXISTS "Allow authenticated media all" ON media;

CREATE POLICY "Allow public media select" ON media
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow authenticated media all" ON media
  FOR ALL TO authenticated USING (true);

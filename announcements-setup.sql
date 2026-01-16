-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('info', 'warning', 'success', 'error')),
  active BOOLEAN DEFAULT true,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for active announcements
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(active);

-- Enable RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active announcements
CREATE POLICY "Public can view active announcements"
  ON announcements FOR SELECT
  USING (active = true);

-- Allow authenticated users to manage announcements
CREATE POLICY "Authenticated users can manage announcements"
  ON announcements FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert a sample announcement
INSERT INTO announcements (message, type, active, start_date, end_date)
VALUES 
  ('🎉 Velkomin á nýju vefsíðuna okkar!', 'success', true, NOW(), NOW() + INTERVAL '7 days');

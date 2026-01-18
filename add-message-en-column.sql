-- Add message_en column to announcements table for English translations

-- Add the column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'announcements' AND column_name = 'message_en'
  ) THEN
    ALTER TABLE announcements ADD COLUMN message_en text;
    RAISE NOTICE '✅ Column message_en added to announcements table';
  ELSE
    RAISE NOTICE 'ℹ️  Column message_en already exists';
  END IF;
END $$;

-- Update existing announcements with English translations (if any exist)
-- You can customize these translations as needed
UPDATE announcements 
SET message_en = 'Special offer on garden products - Contact us for details!'
WHERE message LIKE '%tilboð%' AND message_en IS NULL;

UPDATE announcements 
SET message_en = 'New products available - Check out our latest arrivals'
WHERE message LIKE '%nýjar vörur%' AND message_en IS NULL;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Announcements table updated with English translation support!';
  RAISE NOTICE '';
  RAISE NOTICE 'To add English translations to announcements:';
  RAISE NOTICE '1. Go to /admin/announcements';
  RAISE NOTICE '2. Edit existing announcements';
  RAISE NOTICE '3. Add English text in the message_en field';
END $$;

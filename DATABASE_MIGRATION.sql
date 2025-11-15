-- ==========================================
-- TellUs - Database Migration for Category Features
-- Run this SQL in your Supabase SQL Editor
-- ==========================================

-- Add category and subcategory columns to complaint_boxes table
ALTER TABLE complaint_boxes
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Other',
ADD COLUMN IF NOT EXISTS subcategory TEXT;

-- Add complaint_category column to complaints table
ALTER TABLE complaints
ADD COLUMN IF NOT EXISTS complaint_category TEXT NOT NULL DEFAULT 'General';

-- Update existing boxes to have default category
UPDATE complaint_boxes 
SET category = 'Other' 
WHERE category IS NULL;

-- Make category NOT NULL after setting defaults
ALTER TABLE complaint_boxes
ALTER COLUMN category SET NOT NULL;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_complaint_boxes_category ON complaint_boxes(category);
CREATE INDEX IF NOT EXISTS idx_complaints_category ON complaints(complaint_category);

-- Add comments for documentation
COMMENT ON COLUMN complaint_boxes.category IS 'Main department/field category for the complaint box';
COMMENT ON COLUMN complaint_boxes.subcategory IS 'Optional custom subcategory when category is Other';
COMMENT ON COLUMN complaints.complaint_category IS 'Type/subcategory of the complaint within the box category';

-- ==========================================
-- Migration Complete
-- ==========================================
-- After running this, regenerate your TypeScript types:
-- Go to Supabase Dashboard > API Docs > Generate Types
-- Or wait for Lovable to auto-update types
-- ==========================================

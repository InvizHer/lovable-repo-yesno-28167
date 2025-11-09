
-- Migration: 20251107191542

-- Migration: 20251107160839

-- Migration: 20251106190211

-- Migration: 20251106174139

-- Migration: 20251106165001
-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create complaint_boxes table
CREATE TABLE public.complaint_boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  password TEXT,
  token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.complaint_boxes ENABLE ROW LEVEL SECURITY;

-- Complaint boxes policies
CREATE POLICY "Admins can view their own complaint boxes"
  ON public.complaint_boxes FOR SELECT
  USING (auth.uid() = admin_id);

CREATE POLICY "Admins can insert their own complaint boxes"
  ON public.complaint_boxes FOR INSERT
  WITH CHECK (auth.uid() = admin_id);

CREATE POLICY "Admins can update their own complaint boxes"
  ON public.complaint_boxes FOR UPDATE
  USING (auth.uid() = admin_id);

CREATE POLICY "Admins can delete their own complaint boxes"
  ON public.complaint_boxes FOR DELETE
  USING (auth.uid() = admin_id);

-- Allow anonymous users to read complaint boxes by token (for accessing the box)
CREATE POLICY "Anyone can view complaint boxes by token"
  ON public.complaint_boxes FOR SELECT
  USING (true);

-- Create complaints table
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  box_id UUID NOT NULL REFERENCES public.complaint_boxes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'received' NOT NULL CHECK (status IN ('received', 'under_review', 'solved')),
  token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Complaints policies
-- Admins can view complaints in their boxes
CREATE POLICY "Admins can view complaints in their boxes"
  ON public.complaints FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.complaint_boxes
      WHERE complaint_boxes.id = complaints.box_id
      AND complaint_boxes.admin_id = auth.uid()
    )
  );

-- Admins can update complaints in their boxes
CREATE POLICY "Admins can update complaints in their boxes"
  ON public.complaints FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.complaint_boxes
      WHERE complaint_boxes.id = complaints.box_id
      AND complaint_boxes.admin_id = auth.uid()
    )
  );

-- Admins can delete complaints in their boxes
CREATE POLICY "Admins can delete complaints in their boxes"
  ON public.complaints FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.complaint_boxes
      WHERE complaint_boxes.id = complaints.box_id
      AND complaint_boxes.admin_id = auth.uid()
    )
  );

-- Anyone can insert complaints (anonymous submission)
CREATE POLICY "Anyone can insert complaints"
  ON public.complaints FOR INSERT
  WITH CHECK (true);

-- Anyone can view complaints by token (for status tracking)
CREATE POLICY "Anyone can view complaints by token"
  ON public.complaints FOR SELECT
  USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_complaint_boxes_updated_at
  BEFORE UPDATE ON public.complaint_boxes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON public.complaints
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Migration: 20251106171737
-- Add admin reply functionality to complaints table
ALTER TABLE public.complaints 
ADD COLUMN admin_reply text,
ADD COLUMN replied_at timestamp with time zone;


-- Migration: 20251106180038
-- Ensure proper cascade deletes for account deletion
-- Drop existing foreign key constraints if they exist and recreate with CASCADE

-- First, let's check and fix complaint_boxes foreign key
ALTER TABLE public.complaint_boxes
DROP CONSTRAINT IF EXISTS complaint_boxes_admin_id_fkey;

ALTER TABLE public.complaint_boxes
ADD CONSTRAINT complaint_boxes_admin_id_fkey 
FOREIGN KEY (admin_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Ensure complaints cascade delete when box is deleted
ALTER TABLE public.complaints
DROP CONSTRAINT IF EXISTS complaints_box_id_fkey;

ALTER TABLE public.complaints
ADD CONSTRAINT complaints_box_id_fkey 
FOREIGN KEY (box_id) 
REFERENCES public.complaint_boxes(id) 
ON DELETE CASCADE;

-- Ensure profiles cascade delete with auth.users
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_id_fkey 
FOREIGN KEY (id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;


-- Migration: 20251106191044
-- Create storage bucket for complaint attachments
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'complaint-attachments',
  'complaint-attachments',
  false,
  5242880, -- 5MB limit
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
);

-- RLS Policies for complaint-attachments bucket
CREATE POLICY "Anyone can upload complaint attachments"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'complaint-attachments');

CREATE POLICY "Anyone can view complaint attachments"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'complaint-attachments');

CREATE POLICY "Admins can delete attachments from their complaint boxes"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'complaint-attachments' AND
  EXISTS (
    SELECT 1 FROM complaints c
    INNER JOIN complaint_boxes cb ON c.box_id = cb.id
    WHERE c.id::text = (storage.foldername(name))[1]
    AND cb.admin_id = auth.uid()
  )
);

-- Add attachment columns to complaints table
ALTER TABLE complaints 
ADD COLUMN attachment_url TEXT,
ADD COLUMN attachment_name TEXT,
ADD COLUMN attachment_type TEXT;


-- Migration: 20251107183942
-- =====================================================
-- TellUs - Feedback and Analytics Tables
-- =====================================================

-- Create feedbacks table
CREATE TABLE IF NOT EXISTS public.feedbacks (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  box_id UUID NOT NULL REFERENCES public.complaint_boxes(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  box_id UUID NOT NULL REFERENCES public.complaint_boxes(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_complaints INTEGER NOT NULL DEFAULT 0,
  received_count INTEGER NOT NULL DEFAULT 0,
  in_progress_count INTEGER NOT NULL DEFAULT 0,
  resolved_count INTEGER NOT NULL DEFAULT 0,
  rejected_count INTEGER NOT NULL DEFAULT 0,
  avg_rating DECIMAL(3,2),
  total_feedbacks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(box_id, date)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_feedbacks_box_id ON public.feedbacks(box_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_created_at ON public.feedbacks(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_box_id ON public.analytics(box_id);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON public.analytics(date);
CREATE INDEX IF NOT EXISTS idx_analytics_box_date ON public.analytics(box_id, date);

-- Enable RLS
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for feedbacks
-- Anyone can view feedbacks
DROP POLICY IF EXISTS "Anyone can view feedbacks" ON public.feedbacks;
CREATE POLICY "Anyone can view feedbacks"
  ON public.feedbacks
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can insert feedbacks
DROP POLICY IF EXISTS "Anyone can insert feedbacks" ON public.feedbacks;
CREATE POLICY "Anyone can insert feedbacks"
  ON public.feedbacks
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admins can delete feedbacks for their boxes
DROP POLICY IF EXISTS "Admins can delete feedbacks in their boxes" ON public.feedbacks;
CREATE POLICY "Admins can delete feedbacks in their boxes"
  ON public.feedbacks
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM complaint_boxes
      WHERE complaint_boxes.id = feedbacks.box_id
      AND complaint_boxes.admin_id = auth.uid()
    )
  );

-- RLS Policies for analytics
-- Admins can view analytics for their boxes
DROP POLICY IF EXISTS "Admins can view analytics for their boxes" ON public.analytics;
CREATE POLICY "Admins can view analytics for their boxes"
  ON public.analytics
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM complaint_boxes
      WHERE complaint_boxes.id = analytics.box_id
      AND complaint_boxes.admin_id = auth.uid()
    )
  );

-- System can insert/update analytics (we'll use service role for this)
DROP POLICY IF EXISTS "Service role can manage analytics" ON public.analytics;
CREATE POLICY "Service role can manage analytics"
  ON public.analytics
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM complaint_boxes
      WHERE complaint_boxes.id = analytics.box_id
      AND complaint_boxes.admin_id = auth.uid()
    )
  );

-- Trigger for updating analytics updated_at
DROP TRIGGER IF EXISTS update_analytics_updated_at ON public.analytics;
CREATE TRIGGER update_analytics_updated_at
  BEFORE UPDATE ON public.analytics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update analytics when complaints change
CREATE OR REPLACE FUNCTION public.update_box_analytics()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_date DATE := CURRENT_DATE;
  v_box_id UUID;
BEGIN
  -- Get box_id from NEW or OLD
  v_box_id := COALESCE(NEW.box_id, OLD.box_id);
  
  -- Insert or update analytics for today
  INSERT INTO public.analytics (box_id, date, total_complaints, received_count, in_progress_count, resolved_count, rejected_count)
  SELECT 
    v_box_id,
    v_date,
    COUNT(*),
    COUNT(*) FILTER (WHERE status = 'received'),
    COUNT(*) FILTER (WHERE status = 'in_progress'),
    COUNT(*) FILTER (WHERE status = 'resolved'),
    COUNT(*) FILTER (WHERE status = 'rejected')
  FROM public.complaints
  WHERE box_id = v_box_id
  ON CONFLICT (box_id, date) 
  DO UPDATE SET
    total_complaints = EXCLUDED.total_complaints,
    received_count = EXCLUDED.received_count,
    in_progress_count = EXCLUDED.in_progress_count,
    resolved_count = EXCLUDED.resolved_count,
    rejected_count = EXCLUDED.rejected_count,
    updated_at = now();
    
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Function to update analytics when feedbacks change
CREATE OR REPLACE FUNCTION public.update_feedback_analytics()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_date DATE := CURRENT_DATE;
  v_box_id UUID;
BEGIN
  -- Get box_id from NEW or OLD
  v_box_id := COALESCE(NEW.box_id, OLD.box_id);
  
  -- Update analytics with feedback data
  INSERT INTO public.analytics (box_id, date, total_feedbacks, avg_rating)
  SELECT 
    v_box_id,
    v_date,
    COUNT(*),
    AVG(rating)::DECIMAL(3,2)
  FROM public.feedbacks
  WHERE box_id = v_box_id
  ON CONFLICT (box_id, date) 
  DO UPDATE SET
    total_feedbacks = EXCLUDED.total_feedbacks,
    avg_rating = EXCLUDED.avg_rating,
    updated_at = now();
    
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Triggers for analytics updates
DROP TRIGGER IF EXISTS trigger_update_analytics_on_complaint ON public.complaints;
CREATE TRIGGER trigger_update_analytics_on_complaint
  AFTER INSERT OR UPDATE OR DELETE ON public.complaints
  FOR EACH ROW
  EXECUTE FUNCTION public.update_box_analytics();

DROP TRIGGER IF EXISTS trigger_update_analytics_on_feedback ON public.feedbacks;
CREATE TRIGGER trigger_update_analytics_on_feedback
  AFTER INSERT OR UPDATE OR DELETE ON public.feedbacks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_feedback_analytics();


-- Migration: 20251107192220
-- Make complaint-attachments bucket public so files can be viewed
UPDATE storage.buckets 
SET public = true 
WHERE id = 'complaint-attachments';


-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create posts table for notices, IR, press releases
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('notice', 'ir', 'press')),
  title TEXT NOT NULL,
  content TEXT,
  file_url TEXT,
  is_popup BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Public can read all posts
CREATE POLICY "Anyone can read posts" ON public.posts FOR SELECT USING (true);

-- Only authenticated users (admins) can insert/update/delete
CREATE POLICY "Authenticated users can insert posts" ON public.posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update posts" ON public.posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete posts" ON public.posts FOR DELETE TO authenticated USING (true);

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create inquiries table for contact form
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an inquiry
CREATE POLICY "Anyone can insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
-- Only authenticated can read inquiries
CREATE POLICY "Authenticated can read inquiries" ON public.inquiries FOR SELECT TO authenticated USING (true);

-- Storage bucket for IR documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true);

CREATE POLICY "Anyone can read documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
CREATE POLICY "Authenticated can upload documents" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'documents');
CREATE POLICY "Authenticated can delete documents" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'documents');

-- 1. Create the 'leads' table
CREATE TABLE public.leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  messenger_id text,
  platform text DEFAULT 'Messenger',
  status text DEFAULT 'new',
  plan text DEFAULT 'Not Specified',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for 'leads'
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert leads (from the landing page lead form)
CREATE POLICY "Allow anonymous to insert leads" 
  ON public.leads FOR INSERT 
  TO public 
  WITH CHECK (true);

-- Allow authenticated admins to view and update leads
CREATE POLICY "Allow authenticated users to read leads" 
  ON public.leads FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users to update leads" 
  ON public.leads FOR UPDATE 
  TO authenticated 
  USING (true);


-- 2. Create the 'site_content' table
CREATE TABLE public.site_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section text NOT NULL UNIQUE,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for 'site_content'
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read site_content (for the public landing page)
CREATE POLICY "Allow public read access to site_content" 
  ON public.site_content FOR SELECT 
  TO public 
  USING (true);

-- Allow authenticated admins to update site_content (from the dashboard CMS)
CREATE POLICY "Allow authenticated users to update site_content" 
  ON public.site_content FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users to insert site_content" 
  ON public.site_content FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Insert initial placeholder data for the hero section
INSERT INTO public.site_content (section, content) VALUES (
  'hero',
  '{
    "headline": "Turn Conversations Into Customers — Automatically",
    "subheadline": "SystemicChat helps you capture leads, automate replies, and close sales on Messenger 24/7.",
    "primary_cta": "Start Automating Now",
    "secondary_cta": "Book a Demo"
  }'::jsonb
) ON CONFLICT (section) DO NOTHING;

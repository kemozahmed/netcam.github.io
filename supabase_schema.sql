-- Drop table if it already exists
DROP TABLE IF EXISTS public.leads;

-- Create the leads table
CREATE TABLE public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_type TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow public insert access
CREATE POLICY "Allow public insert to leads"
ON public.leads
FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users to view leads
CREATE POLICY "Allow authenticated users to select leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

-- Drop table if it already exists
DROP TABLE IF EXISTS public.site_settings;

-- Create site_settings table
CREATE TABLE public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to settings
CREATE POLICY "Allow public select on site_settings"
ON public.site_settings
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to manage everything
CREATE POLICY "Allow authenticated users all access to site_settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Also give ALL access to authenticated users on leads table
CREATE POLICY "Allow authenticated users all access to leads"
ON public.leads
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Drop table if it already exists
DROP TABLE IF EXISTS public.contributors;

-- Create contributors table
CREATE TABLE public.contributors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    skills TEXT[] NOT NULL,
    experience_level TEXT NOT NULL,
    cv_url TEXT NOT NULL,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.contributors ENABLE ROW LEVEL SECURITY;

-- Allow public insert access
CREATE POLICY "Allow public insert to contributors"
ON public.contributors
FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users to manage everything
CREATE POLICY "Allow authenticated users all access to contributors"
ON public.contributors
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

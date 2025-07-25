-- Fix admin access for floodoutx@gmail.com
UPDATE public.user_roles 
SET role = 'network-admin' 
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'floodoutx@gmail.com'
);

-- Create table for custom navigation items
CREATE TABLE public.navigation_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  is_custom BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on navigation_items
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;

-- Create policies for navigation_items
CREATE POLICY "Navigation items are viewable by everyone" 
ON public.navigation_items 
FOR SELECT 
USING (visible = true);

CREATE POLICY "Admins can manage navigation items" 
ON public.navigation_items 
FOR ALL 
USING (has_role(auth.uid(), 'network-admin'::app_role) OR has_role(auth.uid(), 'project-lead'::app_role));

-- Create table for custom pages
CREATE TABLE public.custom_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  meta_description TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  author_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on custom_pages
ALTER TABLE public.custom_pages ENABLE ROW LEVEL SECURITY;

-- Create policies for custom_pages
CREATE POLICY "Published pages are viewable by everyone" 
ON public.custom_pages 
FOR SELECT 
USING (published = true);

CREATE POLICY "Authors can view their own pages" 
ON public.custom_pages 
FOR SELECT 
USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all pages" 
ON public.custom_pages 
FOR ALL 
USING (has_role(auth.uid(), 'network-admin'::app_role) OR has_role(auth.uid(), 'project-lead'::app_role));

CREATE POLICY "Authors can create pages" 
ON public.custom_pages 
FOR INSERT 
WITH CHECK (auth.uid() = author_id AND (has_role(auth.uid(), 'network-admin'::app_role) OR has_role(auth.uid(), 'project-lead'::app_role)));

CREATE POLICY "Authors can update their own pages" 
ON public.custom_pages 
FOR UPDATE 
USING (auth.uid() = author_id AND (has_role(auth.uid(), 'network-admin'::app_role) OR has_role(auth.uid(), 'project-lead'::app_role)));

-- Create trigger for automatic timestamp updates on navigation_items
CREATE TRIGGER update_navigation_items_updated_at
BEFORE UPDATE ON public.navigation_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on custom_pages
CREATE TRIGGER update_custom_pages_updated_at
BEFORE UPDATE ON public.custom_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default navigation items
INSERT INTO public.navigation_items (title, url, icon, position, visible, is_custom) VALUES
('Home', '/', 'Home', 1, true, false),
('About', '/about', 'Info', 2, true, false),
('Projects', '/projects', 'FolderOpen', 3, true, false),
('Portfolio', '/portfolio', 'Briefcase', 4, true, false),
('Ethos', '/ethos', 'Target', 5, true, false),
('Team', '/team', 'Users', 6, true, false),
('Community', '/community', 'MessageSquare', 7, true, false),
('Contact', '/contact', 'Mail', 8, true, false);
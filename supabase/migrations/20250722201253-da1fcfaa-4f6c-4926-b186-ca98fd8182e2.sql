
-- Create site_content table for managing front page content
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  content JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Create policies for site_content
CREATE POLICY "Site content is viewable by everyone" 
ON public.site_content 
FOR SELECT 
USING (true);

CREATE POLICY "Project leads can manage site content" 
ON public.site_content 
FOR ALL 
USING (has_role(auth.uid(), 'project-lead'::app_role) OR has_role(auth.uid(), 'network-admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial site content data
INSERT INTO public.site_content (section_key, title, subtitle, description, content) VALUES
(
  'hero', 
  'RE:DO NETWORK', 
  'We are a second chance space.',
  'For projects. For people. For possibilities.',
  '{"buttons": [{"text": "Explore Projects", "variant": "hero"}, {"text": "Join Community", "variant": "glass"}]}'
),
(
  'philosophy',
  'Building with Care',
  'We uplift process over perfection. Human-sized spaces and emotional safety come first.',
  '',
  '{
    "values": [
      {
        "icon": "Heart",
        "title": "Intentionality", 
        "description": "We build slowly, deliberately, and without pressure to perform. Every feature exists on purpose."
      },
      {
        "icon": "Users",
        "title": "Mutuality",
        "description": "This isn''t an audience—it''s a collaboration. Everyone''s voice matters, and no one builds alone here."
      },
      {
        "icon": "Sprout", 
        "title": "Gentle Accountability",
        "description": "We hold each other with kindness, not pressure. You''re allowed to rest. You''re allowed to try again."
      }
    ]
  }'
),
(
  'projects',
  'Featured Projects', 
  'This is not content. This is connection. We''re here to re:connect, re:build, and re:do—together.',
  '',
  '{"featured_project_ids": [], "show_all_button": true, "show_all_text": "View All Projects"}'
);

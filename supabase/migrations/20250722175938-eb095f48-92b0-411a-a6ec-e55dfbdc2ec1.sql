-- Extend profiles table for rich content and social features
ALTER TABLE public.profiles 
ADD COLUMN username TEXT UNIQUE,
ADD COLUMN bio TEXT,
ADD COLUMN job_title TEXT,
ADD COLUMN skills TEXT[],
ADD COLUMN page_content JSONB DEFAULT '{}',
ADD COLUMN page_slug TEXT UNIQUE,
ADD COLUMN show_on_team BOOLEAN DEFAULT false,
ADD COLUMN public_profile BOOLEAN DEFAULT true,
ADD COLUMN soundcloud_url TEXT,
ADD COLUMN youtube_url TEXT,
ADD COLUMN twitter_url TEXT,
ADD COLUMN instagram_url TEXT,
ADD COLUMN portfolio_url TEXT,
ADD COLUMN github_url TEXT,
ADD COLUMN page_published BOOLEAN DEFAULT false,
ADD COLUMN page_views INTEGER DEFAULT 0;

-- Create storage bucket for user uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('user-content', 'user-content', true);

-- Create storage policies for user content
CREATE POLICY "Users can upload their own content" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'user-content' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own content" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'user-content' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public content is viewable by everyone" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'user-content');

CREATE POLICY "Users can update their own content" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'user-content' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own content" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'user-content' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create project_members table for linking users to projects
CREATE TABLE public.project_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'contributor',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Enable RLS on project_members
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;

-- Create policies for project_members
CREATE POLICY "Project members are viewable by everyone" 
ON public.project_members 
FOR SELECT 
USING (true);

CREATE POLICY "Contributors can manage project members" 
ON public.project_members 
FOR ALL 
USING (has_role(auth.uid(), 'contributor'::app_role) OR has_role(auth.uid(), 'project-lead'::app_role) OR has_role(auth.uid(), 'network-admin'::app_role));
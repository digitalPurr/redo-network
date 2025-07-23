-- Create portfolio_projects table for user portfolio items
CREATE TABLE public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  rich_content JSONB DEFAULT '{}'::jsonb,
  project_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  published BOOLEAN DEFAULT false,
  tags JSONB DEFAULT '[]'::jsonb,
  start_date DATE,
  end_date DATE,
  category TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolio projects
CREATE POLICY "Users can view their own portfolio items" 
ON public.portfolio_projects 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own portfolio items" 
ON public.portfolio_projects 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio items" 
ON public.portfolio_projects 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolio items" 
ON public.portfolio_projects 
FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Public can view approved and published portfolio items" 
ON public.portfolio_projects 
FOR SELECT 
USING (approval_status = 'approved' AND published = true);

CREATE POLICY "Admins can manage all portfolio items" 
ON public.portfolio_projects 
FOR ALL 
USING (has_role(auth.uid(), 'network-admin'::app_role) OR has_role(auth.uid(), 'project-lead'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_portfolio_projects_updated_at
BEFORE UPDATE ON public.portfolio_projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
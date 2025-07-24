-- Add missing fields to portfolio_projects table
ALTER TABLE public.portfolio_projects 
ADD COLUMN IF NOT EXISTS rich_content JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE,
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected'));

-- Add display_name to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Create portfolio_likes table
CREATE TABLE IF NOT EXISTS public.portfolio_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_project_id UUID NOT NULL REFERENCES public.portfolio_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(portfolio_project_id, user_id)
);

-- Enable RLS on portfolio_likes
ALTER TABLE public.portfolio_likes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for portfolio_likes
CREATE POLICY "Anyone can view portfolio likes" 
ON public.portfolio_likes
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own likes" 
ON public.portfolio_likes
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes" 
ON public.portfolio_likes
FOR DELETE 
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_portfolio_likes_project ON public.portfolio_likes(portfolio_project_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_likes_user ON public.portfolio_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_approval_status ON public.portfolio_projects(approval_status);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured ON public.portfolio_projects(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_created_at ON public.portfolio_projects(created_at);

-- Trigger to update likes count on portfolio_projects
CREATE OR REPLACE FUNCTION public.update_portfolio_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.portfolio_projects 
    SET likes = likes + 1 
    WHERE id = NEW.portfolio_project_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.portfolio_projects 
    SET likes = GREATEST(likes - 1, 0)
    WHERE id = OLD.portfolio_project_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER IF NOT EXISTS portfolio_likes_count_trigger
  AFTER INSERT OR DELETE ON public.portfolio_likes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_portfolio_likes_count();
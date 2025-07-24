-- ========================================
-- CONTACT FORM SYSTEM IMPLEMENTATION
-- ========================================

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (length(trim(name)) >= 2 AND length(trim(name)) <= 100),
  email TEXT NOT NULL CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  subject TEXT NOT NULL CHECK (length(trim(subject)) >= 5 AND length(trim(subject)) <= 200),
  message TEXT NOT NULL CHECK (length(trim(message)) >= 10 AND length(trim(message)) <= 2000),
  type TEXT NOT NULL DEFAULT 'general' CHECK (type IN ('general', 'technical', 'collaboration', 'partnership', 'feedback')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  user_id UUID NULL,
  admin_notes TEXT NULL,
  resolved_at TIMESTAMP WITH TIME ZONE NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create security_events table for audit logging
CREATE TABLE public.security_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_id UUID NULL,
  details JSONB NOT NULL DEFAULT '{}',
  severity TEXT NOT NULL DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  ip_address INET NULL,
  user_agent TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contact_submissions
CREATE POLICY "Admins can manage all contact submissions"
ON public.contact_submissions
FOR ALL
USING (
  has_role(auth.uid(), 'network-admin'::app_role) OR 
  has_role(auth.uid(), 'project-lead'::app_role)
);

CREATE POLICY "Users can view their own contact submissions"
ON public.contact_submissions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create contact submissions"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

-- RLS Policies for security_events
CREATE POLICY "Admins can view all security events"
ON public.security_events
FOR SELECT
USING (
  has_role(auth.uid(), 'network-admin'::app_role) OR 
  has_role(auth.uid(), 'project-lead'::app_role)
);

CREATE POLICY "System can insert security events"
ON public.security_events
FOR INSERT
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_contact_submissions_email ON public.contact_submissions(email);
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX idx_contact_submissions_user_id ON public.contact_submissions(user_id);
CREATE INDEX idx_contact_submissions_type ON public.contact_submissions(type);

CREATE INDEX idx_security_events_event_type ON public.security_events(event_type);
CREATE INDEX idx_security_events_created_at ON public.security_events(created_at);
CREATE INDEX idx_security_events_severity ON public.security_events(severity);
CREATE INDEX idx_security_events_user_id ON public.security_events(user_id);

-- Create function to handle rate limiting
CREATE OR REPLACE FUNCTION public.check_contact_rate_limit(user_email TEXT, user_id_param UUID DEFAULT NULL)
RETURNS BOOLEAN AS $$
DECLARE
  submission_count INTEGER;
  one_hour_ago TIMESTAMP WITH TIME ZONE;
BEGIN
  one_hour_ago := now() - INTERVAL '1 hour';
  
  SELECT COUNT(*)
  INTO submission_count
  FROM public.contact_submissions
  WHERE created_at >= one_hour_ago
    AND (
      email = user_email OR 
      (user_id_param IS NOT NULL AND user_id = user_id_param)
    );
  
  RETURN submission_count < 3;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Grant permissions
GRANT SELECT, INSERT ON public.contact_submissions TO anon, authenticated;
GRANT SELECT, INSERT ON public.security_events TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_contact_rate_limit(TEXT, UUID) TO anon, authenticated;
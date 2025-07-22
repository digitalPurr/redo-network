-- Fix function search path security issue
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';

-- Properly specify schema references in the function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';
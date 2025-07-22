
-- Add new fields to profiles table for personal page front page integration
ALTER TABLE public.profiles 
ADD COLUMN page_header_image TEXT,
ADD COLUMN page_description TEXT;

-- Update storage policies to allow header image uploads
CREATE POLICY "Users can upload header images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'user-content' AND auth.uid()::text = (storage.foldername(name))[1] AND (storage.foldername(name))[2] = 'headers');

CREATE POLICY "Users can update header images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'user-content' AND auth.uid()::text = (storage.foldername(name))[1] AND (storage.foldername(name))[2] = 'headers');

CREATE POLICY "Users can delete header images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'user-content' AND auth.uid()::text = (storage.foldername(name))[1] AND (storage.foldername(name))[2] = 'headers');


import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UseAutoSaveProps {
  content: string;
  profileId?: string;
  enabled?: boolean;
  interval?: number;
}

export const useAutoSave = ({ 
  content, 
  profileId, 
  enabled = true, 
  interval = 30000 
}: UseAutoSaveProps) => {
  const { user } = useAuth();
  const lastSavedContent = useRef(content);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled || !user || !profileId || content === lastSavedContent.current) {
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(async () => {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ page_content: content })
          .eq('id', profileId);

        if (error) throw error;

        lastSavedContent.current = content;
        
        // Show subtle success notification
        toast({
          title: "Auto-saved",
          description: "Your changes have been saved automatically.",
          duration: 2000,
        });
      } catch (error) {
        console.error('Auto-save failed:', error);
        toast({
          title: "Auto-save failed",
          description: "There was an error saving your changes.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }, interval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content, user, profileId, enabled, interval]);

  return {
    hasUnsavedChanges: content !== lastSavedContent.current,
  };
};

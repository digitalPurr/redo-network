
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const AdminSetup: React.FC = () => {
  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    createAdminAccount();
  }, []);

  const createAdminAccount = async () => {
    try {
      // Check if admin already exists
      const { data: existingAdmin } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'network-admin')
        .single();

      if (existingAdmin) {
        console.log('Admin account already exists');
        setSetupComplete(true);
        return;
      }

      // Create admin user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: 'admin@redonetwork.dev',
        password: 'Blizzardcore2312!',
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: 'Network',
            last_name: 'Admin'
          }
        }
      });

      if (authError) {
        console.error('Error creating admin user:', authError);
        return;
      }

      if (authData.user) {
        // Wait a moment for the trigger to create the profile
        setTimeout(async () => {
          try {
            // Update the user role to network-admin
            const { error: roleError } = await supabase
              .from('user_roles')
              .update({ role: 'network-admin' })
              .eq('user_id', authData.user.id);

            if (roleError) {
              console.error('Error setting admin role:', roleError);
            } else {
              console.log('Admin account created successfully');
              toast({
                title: "Admin account created",
                description: "Admin account has been set up with email: admin@redonetwork.dev",
              });
            }
          } catch (error) {
            console.error('Error in admin setup:', error);
          }
        }, 2000);
      }

      setSetupComplete(true);
    } catch (error) {
      console.error('Error in admin setup:', error);
      setSetupComplete(true);
    }
  };

  return null; // This component doesn't render anything
};

export default AdminSetup;

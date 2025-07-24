-- ========================================
-- CRITICAL SECURITY FIXES FOR RE:DO NETWORK
-- ========================================

-- 1. FIX MISSING FOREIGN KEY CONSTRAINTS
-- Current issue: tasks.assigned_to uses text instead of UUID reference

-- Fix tasks table data type and add proper foreign key
ALTER TABLE tasks 
ALTER COLUMN assigned_to TYPE UUID USING assigned_to::uuid;

ALTER TABLE tasks 
ADD CONSTRAINT fk_tasks_assigned_to 
FOREIGN KEY (assigned_to) REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE tasks 
ADD CONSTRAINT fk_tasks_project_id 
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

-- Add missing foreign keys for project_members
ALTER TABLE project_members 
ADD CONSTRAINT fk_project_members_project_id 
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

ALTER TABLE project_members 
ADD CONSTRAINT fk_project_members_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add foreign key for portfolio_projects
ALTER TABLE portfolio_projects 
ADD CONSTRAINT fk_portfolio_projects_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add foreign key for profiles
ALTER TABLE profiles 
ADD CONSTRAINT fk_profiles_user_id 
FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add foreign key for user_roles
ALTER TABLE user_roles 
ADD CONSTRAINT fk_user_roles_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add foreign key for discord_config
ALTER TABLE discord_config 
ADD CONSTRAINT fk_discord_config_project_id 
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

-- ========================================
-- 2. TIGHTEN ROW LEVEL SECURITY POLICIES
-- ========================================

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;
DROP POLICY IF EXISTS "Enable update for users based on email" ON profiles;

-- Create secure RLS policies for profiles
DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;
CREATE POLICY "profiles_select_policy" ON profiles
FOR SELECT USING (
  -- Users can see their own profile or public profiles
  auth.uid() = id OR 
  (public_profile = true)
);

DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles;
CREATE POLICY "profiles_insert_policy" ON profiles
FOR INSERT WITH CHECK (
  -- Users can only create their own profile
  auth.uid() = id
);

DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;
CREATE POLICY "profiles_update_policy" ON profiles
FOR UPDATE USING (
  -- Users can only update their own profile
  auth.uid() = id
);

DROP POLICY IF EXISTS "profiles_delete_policy" ON profiles;
CREATE POLICY "profiles_delete_policy" ON profiles
FOR DELETE USING (
  -- Users can only delete their own profile
  auth.uid() = id
);

-- Secure project policies
DROP POLICY IF EXISTS "Enable read access for all users" ON projects;
DROP POLICY IF EXISTS "projects_select_policy" ON projects;

CREATE POLICY "projects_select_policy" ON projects
FOR SELECT USING (
  -- Public projects OR user is a project member OR user is admin/project-lead
  TRUE = TRUE OR -- For now, keep projects public (can be refined)
  EXISTS (
    SELECT 1 FROM project_members 
    WHERE project_id = projects.id AND user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('network-admin', 'project-lead')
  )
);

DROP POLICY IF EXISTS "projects_insert_policy" ON projects;
CREATE POLICY "projects_insert_policy" ON projects
FOR INSERT WITH CHECK (
  -- Only contributors and above can create projects
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('contributor', 'project-lead', 'network-admin')
  )
);

DROP POLICY IF EXISTS "projects_update_policy" ON projects;
CREATE POLICY "projects_update_policy" ON projects
FOR UPDATE USING (
  -- Only project leads/members or admins can update
  EXISTS (
    SELECT 1 FROM project_members 
    WHERE project_id = projects.id 
    AND user_id = auth.uid() 
    AND role = 'lead'
  ) OR
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('network-admin', 'project-lead')
  )
);

-- Secure portfolio policies
DROP POLICY IF EXISTS "portfolio_select_policy" ON portfolio_projects;
CREATE POLICY "portfolio_select_policy" ON portfolio_projects
FOR SELECT USING (
  -- Users can see their own portfolio or approved public ones
  auth.uid() = user_id OR 
  approval_status = 'approved'
);

DROP POLICY IF EXISTS "portfolio_insert_policy" ON portfolio_projects;
CREATE POLICY "portfolio_insert_policy" ON portfolio_projects
FOR INSERT WITH CHECK (
  -- Users can only create their own portfolio items
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('contributor', 'project-lead', 'network-admin')
  )
);

DROP POLICY IF EXISTS "portfolio_update_policy" ON portfolio_projects;
CREATE POLICY "portfolio_update_policy" ON portfolio_projects
FOR UPDATE USING (
  -- Users can update their own portfolio OR admins can approve
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('network-admin', 'project-lead')
  )
);

-- Secure task policies
DROP POLICY IF EXISTS "tasks_select_policy" ON tasks;
CREATE POLICY "tasks_select_policy" ON tasks
FOR SELECT USING (
  -- Users can see tasks in projects they're members of
  EXISTS (
    SELECT 1 FROM project_members 
    WHERE project_id = tasks.project_id AND user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('network-admin', 'project-lead')
  )
);

DROP POLICY IF EXISTS "tasks_insert_policy" ON tasks;
CREATE POLICY "tasks_insert_policy" ON tasks
FOR INSERT WITH CHECK (
  -- Only project members can create tasks
  EXISTS (
    SELECT 1 FROM project_members 
    WHERE project_id = tasks.project_id AND user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "tasks_update_policy" ON tasks;
CREATE POLICY "tasks_update_policy" ON tasks
FOR UPDATE USING (
  -- Project members and assigned users can update tasks
  EXISTS (
    SELECT 1 FROM project_members 
    WHERE project_id = tasks.project_id AND user_id = auth.uid()
  ) OR
  auth.uid() = assigned_to
);

-- ========================================
-- 3. ADD DATA VALIDATION CONSTRAINTS
-- ========================================

-- Add URL validation for profiles
ALTER TABLE profiles 
ADD CONSTRAINT valid_github_format 
CHECK (
  github_url IS NULL OR github_url ~* '^https?://.*github\.com/.*$' OR github_url = ''
);

ALTER TABLE profiles 
ADD CONSTRAINT valid_twitter_format 
CHECK (
  twitter_url IS NULL OR twitter_url ~* '^https?://.*(twitter\.com|x\.com)/.*$' OR twitter_url = ''
);

-- Add project status validation
ALTER TABLE projects 
ADD CONSTRAINT valid_project_status 
CHECK (status IN ('active', 'paused', 'completed', 'archived', 'planning'));

-- Add portfolio status validation
ALTER TABLE portfolio_projects 
ADD CONSTRAINT valid_portfolio_status 
CHECK (approval_status IN ('pending', 'approved', 'rejected'));

-- Add task status validation
ALTER TABLE tasks 
ADD CONSTRAINT valid_task_status 
CHECK (status IN ('todo', 'in_progress', 'completed', 'cancelled'));

-- Add length constraints to prevent abuse
ALTER TABLE profiles 
ADD CONSTRAINT reasonable_bio_length 
CHECK (char_length(bio) <= 1000);

ALTER TABLE profiles 
ADD CONSTRAINT reasonable_name_length 
CHECK (
  char_length(first_name) <= 50 AND 
  char_length(last_name) <= 50
);

ALTER TABLE projects 
ADD CONSTRAINT reasonable_project_title 
CHECK (char_length(title) <= 200);

ALTER TABLE tasks 
ADD CONSTRAINT reasonable_task_title 
CHECK (char_length(title) <= 200);

-- ========================================
-- 4. ADD INDEXES FOR PERFORMANCE
-- ========================================

-- Index for profile lookups
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(id);
CREATE INDEX IF NOT EXISTS idx_profiles_slug ON profiles(page_slug) WHERE page_slug IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_profiles_public ON profiles(public_profile) WHERE public_profile = true;

-- Index for project lookups
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category) WHERE category IS NOT NULL;

-- Index for project members
CREATE INDEX IF NOT EXISTS idx_project_members_project ON project_members(project_id);
CREATE INDEX IF NOT EXISTS idx_project_members_user ON project_members(user_id);
CREATE INDEX IF NOT EXISTS idx_project_members_role ON project_members(role);

-- Index for portfolio projects
CREATE INDEX IF NOT EXISTS idx_portfolio_user ON portfolio_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON portfolio_projects(approval_status);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_projects(featured) WHERE featured = true;

-- Index for tasks
CREATE INDEX IF NOT EXISTS idx_tasks_project ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON tasks(assigned_to) WHERE assigned_to IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date) WHERE due_date IS NOT NULL;

-- Index for user roles (frequently queried)
CREATE INDEX IF NOT EXISTS idx_user_roles_user ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);

-- ========================================
-- 5. CREATE AUDIT LOGGING TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
  user_id UUID REFERENCES auth.users(id),
  old_data JSONB,
  new_data JSONB,
  changed_fields TEXT[],
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for audit log queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_table ON audit_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);

-- Enable RLS on audit logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "audit_logs_select_policy" ON audit_logs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'network-admin'
  )
);

-- ========================================
-- 6. CREATE SECURITY EVENT LOGGING
-- ========================================

CREATE TABLE IF NOT EXISTS security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index for security event queries
CREATE INDEX IF NOT EXISTS idx_security_events_type ON security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_events_user ON security_events(user_id);
CREATE INDEX IF NOT EXISTS idx_security_events_severity ON security_events(severity);
CREATE INDEX IF NOT EXISTS idx_security_events_unresolved ON security_events(resolved) WHERE resolved = false;

-- Enable RLS on security events
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;

-- Only admins can view security events
CREATE POLICY "security_events_select_policy" ON security_events
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'network-admin'
  )
);

-- ========================================
-- 7. ADD RATE LIMITING TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action_type TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, action_type, window_start)
);

-- Index for rate limit lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_user_action ON rate_limits(user_id, action_type);
CREATE INDEX IF NOT EXISTS idx_rate_limits_window ON rate_limits(window_start);

-- Clean up old rate limit entries (older than 24 hours)
CREATE OR REPLACE FUNCTION cleanup_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits 
  WHERE window_start < now() - interval '24 hours';
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- 8. CREATE NOTIFICATION SYSTEM
-- ========================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('project_invite', 'portfolio_approved', 'portfolio_rejected', 'task_assigned', 'project_update', 'system_announcement')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index for notification queries
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, read) WHERE read = false;
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);

-- Enable RLS on notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can only see their own notifications
CREATE POLICY "notifications_select_policy" ON notifications
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "notifications_update_policy" ON notifications
FOR UPDATE USING (auth.uid() = user_id);

-- ========================================
-- 9. ENABLE RLS ON ALL TABLES
-- ========================================

-- Ensure RLS is enabled on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE discord_config ENABLE ROW LEVEL SECURITY;

-- Site content policy (only admins can edit)
DROP POLICY IF EXISTS "site_content_select_policy" ON site_content;
CREATE POLICY "site_content_select_policy" ON site_content
FOR SELECT USING (true); -- Public read access

DROP POLICY IF EXISTS "site_content_insert_policy" ON site_content;
CREATE POLICY "site_content_insert_policy" ON site_content
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'network-admin'
  )
);

DROP POLICY IF EXISTS "site_content_update_policy" ON site_content;
CREATE POLICY "site_content_update_policy" ON site_content
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'network-admin'
  )
);

-- Discord config policy (project members and admins)
DROP POLICY IF EXISTS "discord_config_select_policy" ON discord_config;
CREATE POLICY "discord_config_select_policy" ON discord_config
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM project_members 
    WHERE project_id = discord_config.project_id AND user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('network-admin', 'project-lead')
  )
);

DROP POLICY IF EXISTS "discord_config_insert_policy" ON discord_config;
CREATE POLICY "discord_config_insert_policy" ON discord_config
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM project_members 
    WHERE project_id = discord_config.project_id 
    AND user_id = auth.uid() 
    AND role = 'lead'
  ) OR
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('network-admin', 'project-lead')
  )
);

DROP POLICY IF EXISTS "discord_config_update_policy" ON discord_config;
CREATE POLICY "discord_config_update_policy" ON discord_config
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM project_members 
    WHERE project_id = discord_config.project_id 
    AND user_id = auth.uid() 
    AND role = 'lead'
  ) OR
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('network-admin', 'project-lead')
  )
);

-- ========================================
-- 10. CREATE FUNCTIONS FOR COMMON OPERATIONS
-- ========================================

-- Function to safely get user role
CREATE OR REPLACE FUNCTION get_user_role(target_user_id UUID)
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role 
  FROM user_roles 
  WHERE user_id = target_user_id;
  
  RETURN COALESCE(user_role, 'viewer');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can manage project
CREATE OR REPLACE FUNCTION can_manage_project(project_id_param UUID, user_id_param UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM project_members 
    WHERE project_id = project_id_param 
    AND user_id = user_id_param 
    AND role = 'lead'
  ) OR EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = user_id_param 
    AND role IN ('network-admin', 'project-lead')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
  target_user_id UUID,
  notification_type TEXT,
  notification_title TEXT,
  notification_message TEXT,
  notification_data JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  notification_id UUID;
BEGIN
  INSERT INTO notifications (user_id, type, title, message, data)
  VALUES (target_user_id, notification_type, notification_title, notification_message, notification_data)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
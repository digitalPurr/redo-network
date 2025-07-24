-- ========================================
-- CRITICAL SECURITY FIXES FOR RE:DO NETWORK (PART 2)
-- ========================================

-- Add the Twitter URL validation constraint now that data is fixed
ALTER TABLE profiles 
ADD CONSTRAINT valid_twitter_format 
CHECK (
  twitter_url IS NULL OR twitter_url ~* '^https?://.*(twitter\.com|x\.com)/.*$' OR twitter_url = ''
);

-- ========================================
-- COMPLETE SECURITY MIGRATION
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
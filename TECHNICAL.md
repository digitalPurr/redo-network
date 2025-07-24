# RE:DO Network - Technical Documentation

## Architecture Overview

**RE:DO Network** is built as a modern, scalable web application using React and Supabase, designed for collaborative multimedia work and community building.

## Technology Stack

### Frontend
- **React 18.3.1** with TypeScript for type safety
- **Vite 5.4.1** for fast development and optimized builds
- **Tailwind CSS** with custom design system and shadcn/ui components
- **React Router DOM** for client-side routing
- **React Query (@tanstack/react-query)** for server state management
- **next-themes** for dark/light mode support

### Backend & Services
- **Supabase** (PostgreSQL + Authentication + Storage)
- **Supabase Edge Functions** for serverless computing
- **Discord API Integration** for community bridge functionality

### Rich Text & Media
- **TipTap Editor** with custom extensions
- **lowlight** for syntax highlighting
- **Embedded media support** (YouTube, SoundCloud, images, video, audio)

### UI Framework
- **Radix UI primitives** for accessible components
- **Lucide React** for consistent iconography
- **Sonner** for toast notifications
- **Recharts** for data visualization

## Database Schema

### Core Tables

#### `profiles`
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  first_name TEXT,
  last_name TEXT,
  display_name TEXT,
  bio TEXT,
  job_title TEXT,
  avatar_url TEXT,
  page_content JSONB,
  page_slug TEXT UNIQUE,
  page_description TEXT,
  is_public BOOLEAN DEFAULT false,
  github_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### `projects`
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  status TEXT DEFAULT 'active',
  demo_url TEXT,
  project_url TEXT,
  is_interactive BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### `project_members`
```sql
CREATE TABLE project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users NOT NULL,
  role TEXT DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### `portfolio_projects`
```sql
CREATE TABLE portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB,
  status TEXT DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### `user_roles`
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### `tasks`
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES auth.users,
  status TEXT DEFAULT 'pending',
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### `site_content`
```sql
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  content JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### `discord_config`
```sql
CREATE TABLE discord_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  webhook_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Authentication & Authorization

### Role Hierarchy
1. **network-admin**: Full system administration
2. **project-lead**: Project management and team oversight
3. **contributor**: Content creation and collaboration
4. **viewer**: Basic read access

### Row Level Security (RLS)
All tables implement RLS policies to ensure data security:
- Users can only access their own profile data
- Project members can view project-related data
- Portfolio items are user-scoped with public visibility controls
- Admin functions require appropriate role permissions

### Authentication Flow
```typescript
// Supabase client configuration
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ymymenejrasmnhcblsgp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
)

// Authentication hook usage
const { user, session, signIn, signOut, userRole } = useAuth()
```

## Component Architecture

### Core Components

#### `AdminLayout`
- Layout wrapper for administrative pages
- Navigation sidebar with role-based menu items
- Responsive design with mobile optimization

#### `RichTextEditor`
- TipTap-based editor with extensive customization
- Custom extensions for multimedia content
- Auto-save functionality with toast feedback

#### `ProjectCard` & `PersonalPageCard`
- Reusable card components for content display
- Consistent styling with hover animations
- Action buttons with role-based visibility

### Custom TipTap Extensions

#### `AudioExtension`
```typescript
// Audio embedding with playback controls
Node.create({
  name: 'audio',
  content: 'inline*',
  marks: '',
  group: 'block',
  defining: true,
  // Implementation details...
})
```

#### `VideoExtension`
```typescript
// Video embedding with responsive sizing
Node.create({
  name: 'video',
  content: 'inline*',
  marks: '',
  group: 'block',
  defining: true,
  // Implementation details...
})
```

#### `CalloutExtension`
```typescript
// Styled callout boxes with different variants
Node.create({
  name: 'callout',
  content: 'block+',
  group: 'block',
  defining: true,
  // Implementation details...
})
```

## API Integration

### Supabase Client
```typescript
// Database operations
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('user_id', user.id)

// Real-time subscriptions
const subscription = supabase
  .channel('profiles')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'profiles' },
    (payload) => console.log('Change received!', payload)
  )
  .subscribe()
```

### Discord Integration
```typescript
// Edge function for Discord webhooks
const webhookPayload = {
  embeds: [{
    title: "Project Update",
    description: projectDescription,
    color: 0x5865F2,
    timestamp: new Date().toISOString()
  }]
}

await fetch(webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(webhookPayload)
})
```

## Performance Optimizations

### Code Splitting
- Route-based code splitting with React.lazy
- Component-level splitting for large feature sets
- Dynamic imports for non-critical functionality

### State Management
- React Query for server state caching
- Local state for UI interactions
- Optimistic updates for better UX

### Asset Optimization
- Image optimization through Supabase Storage
- Lazy loading for media content
- Progressive enhancement for rich features

## Development Workflow

### File Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── dashboard/      # Dashboard-specific components
│   └── ethos/          # Ethos page components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── integrations/       # External service integrations
└── assets/             # Static assets
```

### TypeScript Configuration
- Strict type checking enabled
- Path aliases for clean imports
- Type definitions for Supabase schemas

### Build Configuration
```javascript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
})
```

## Deployment & Infrastructure

### Supabase Configuration
- Project ID: `ymymenejrasmnhcblsgp`
- Database: PostgreSQL with extensions
- Authentication: Email/password with verification
- Storage: Configured buckets for user content

### Edge Functions
- Deployed automatically via Supabase CLI
- TypeScript-based serverless functions
- Integration with Discord API and other services

### Environment Variables
- No client-side environment variables used
- Configuration managed through Supabase dashboard
- Secrets handled via Supabase Edge Function secrets
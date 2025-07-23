## RE:DO Network - Application Documentation

### Overview

**RE:DO** is a collaborative multimedia platform designed as a modern, intentional alternative to traditional social media. Built on React with Supabase backend, it provides a space for creative professionals and digital innovators to collaborate, share work, and build meaningful connections through iterative creation.

### Philosophy & Mission

RE:DO operates under the principle of "compassionate iteration" - every project, connection, and collaboration is seen as an opportunity to re:connect, re:flect, and re:imagine. The platform emphasizes:

- **Intentionality**: Building slowly and deliberately without performance pressure
- **Mutuality**: Collaborative rather than audience-based interactions
- **Transparency**: Open communication about changes and decisions
- **Non-Extractive Culture**: Genuine connections over clout-farming
- **Gentle Accountability**: Kindness before performance, allowing space for rest and iteration
- **Second-Chance Spaces**: Supporting projects, people, and possibilities

---

## Technical Architecture

### Technology Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.1
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router DOM
- **Rich Text**: TipTap Editor with custom extensions
- **UI Framework**: Radix UI primitives
- **Theme**: next-themes for dark/light mode

### Database Schema

#### Core Tables

**profiles** - User profile information
- Personal details (name, bio, job title)
- Social media links (GitHub, Twitter, Instagram, etc.)
- Rich page content (JSONB)
- Public visibility settings
- Custom page slugs and descriptions

**projects** - Collaborative projects
- Title, description, category
- Status tracking (active, paused, completed, archived)
- Demo and project URLs
- Interactive project flags

**project_members** - Project team management
- User-project relationships
- Role assignments (lead, member)

**portfolio_projects** - Individual portfolio items
- Rich content support (JSONB)
- Approval workflow system
- Publication status and featured flags
- View and like tracking

**user_roles** - Role-based access control
- Four role types: network-admin, project-lead, contributor, viewer
- Hierarchical permission system

**tasks** - Project task management
- Assignment and due date tracking
- Status management

**site_content** - Dynamic site content management
- JSONB content storage for flexible layouts

**discord_config** - Discord integration
- Webhook configuration for project updates

---

## Feature Overview

### 🏠 Public Pages

#### Landing Page (`/`)
- Hero section with gradient branding
- Feature highlights emphasizing platform values
- Call-to-action for exploration and sign-up

#### About Page (`/about`)
- Mission statement and core values
- Team philosophy and beliefs
- Visual design showcasing the platform's aesthetic

#### Ethos Page (`/ethos`)
- Comprehensive community guidelines
- "Living Code" for intentional connection
- Active protocols for social responsibility and collective wellbeing
- System philosophy with technical aesthetic

#### Projects Page (`/projects`)
- Public project showcase
- Category filtering and search
- Interactive project browsing

#### Team Page (`/team`)
- Public team member profiles
- Individual member pages (`/team/:username`)
- Skills and bio information

#### Portfolio Page (`/portfolio`)
- Curated portfolio project showcase
- Featured project highlighting

#### Contact & Community Pages
- Community guidelines and connection points
- Contact information and support channels

### 🔐 Authentication System

#### Multi-Role Access Control
- **Viewer**: Basic access to public content
- **Contributor**: Can create and manage own content
- **Project Lead**: Can manage projects and team members
- **Network Admin**: Full system administration access

#### Protected Routes
- Authentication required for dashboard and profile management
- Role-based access to admin functions
- Automatic redirect handling for unauthorized access

### 🎛️ Dashboard System (`/dashboard`)

#### Personal Page Editor
- **Rich Text Editor** with advanced features:
  - Standard formatting (bold, italic, underline, strikethrough)
  - Text alignment and color customization
  - Code blocks with syntax highlighting
  - Table creation and editing
  - Image, video, and audio embedding
  - YouTube and SoundCloud integration
  - Custom callouts and collapsible sections
  - Button creation and dividers
- **Auto-save functionality** (30-second intervals)
- **Profile customization**:
  - Avatar upload
  - Bio and job title editing
  - Social media link management
  - Public visibility controls
- **Page publishing system** with custom slugs

#### Project Management
- **Project Creation**: Title, description, category selection
- **Team Management**: Member roles and assignments
- **Status Tracking**: Active, paused, completed, archived
- **Collaboration Tools**: Integrated with task management

#### Portfolio Management
- **Rich Content Creation**: Advanced editor for project documentation
- **Approval Workflow**: Submit for review, track approval status
- **Publication Control**: Manage public visibility
- **Analytics**: View and like tracking
- **Project Categorization**: Organize by type and tags

#### Analytics Dashboard
- Project performance metrics
- Portfolio engagement tracking
- User activity insights

### 🛠️ Administrative Tools

#### Admin Panel (`/admin`)
- **Network Administration**: Full system oversight (network-admin only)
- **Project Administration**: Project and team management (project-lead+)
- **Portfolio Administration**: Review and approve portfolio submissions
- **Site Content Management**: Dynamic content editing
- **Team Management**: User role assignment and profile oversight

#### Site Content Management
- **Dynamic Content Editing**: Rich text editor for site sections
- **Multi-section Management**: Different content areas with unique keys
- **Real-time Preview**: See changes before publishing
- **JSONB Storage**: Flexible content structure

### 🎨 Rich Text Editor Features

#### Core Formatting
- **Typography**: Bold, italic, underline, strikethrough
- **Text Alignment**: Left, center, right, justify
- **Color Support**: Text and highlight colors
- **Font Families**: Multiple typeface options

#### Advanced Features
- **Code Integration**: Inline code and syntax-highlighted blocks
- **Tables**: Full table creation and editing with resizable columns
- **Media Embedding**: 
  - Image uploads with drag-and-drop
  - Video embedding (YouTube and direct uploads)
  - Audio player integration
  - SoundCloud embedding
- **Interactive Elements**:
  - Custom button creation
  - Collapsible content sections
  - Callout boxes with different styles
  - Horizontal dividers

#### Productivity Features
- **Auto-save**: Automatic content saving every 30 seconds
- **Word Count**: Real-time word and character counting
- **Keyboard Shortcuts**: Full shortcut support with help panel
- **Undo/Redo**: Comprehensive edit history

### 🔗 Integrations

#### Discord Integration
- Project update notifications
- Webhook configuration per project
- Community bridge functionality

#### Supabase Storage
- **user-content bucket**: File uploads for profiles and projects
- Image optimization and serving
- Secure file access controls

---

## User Workflows

### 🚀 Getting Started

1. **Sign Up**: Email/password authentication via `/auth`
2. **Profile Setup**: Complete profile in dashboard personal editor
3. **Role Assignment**: Default viewer role, can be upgraded by admins
4. **Content Creation**: Start building personal page or join projects

### 👤 Profile Management

1. **Personal Page Creation**:
   - Access dashboard personal editor
   - Use rich text editor to create content
   - Add social media links and professional information
   - Set public visibility and custom slug
   - Publish for public viewing

2. **Portfolio Development**:
   - Create portfolio projects with rich documentation
   - Submit for approval workflow
   - Track views and engagement
   - Feature best work

### 🤝 Project Collaboration

1. **Project Creation**:
   - Create new project from dashboard
   - Set category and initial description
   - Invite team members
   - Assign roles and responsibilities

2. **Team Participation**:
   - Join existing projects
   - Contribute to project goals
   - Manage tasks and deadlines
   - Collaborate on deliverables

### 👑 Administrative Functions

1. **Content Moderation**:
   - Review portfolio submissions
   - Approve/reject with feedback
   - Manage featured content

2. **User Management**:
   - Assign and modify user roles
   - Moderate user-generated content
   - Handle community guidelines enforcement

3. **Site Management**:
   - Edit dynamic site content
   - Manage project showcases
   - Update community guidelines

---

## Design System

### Visual Hierarchy
- **Primary Gradient**: Blue to purple gradient for hero elements
- **Card-based Layout**: Consistent card patterns with backdrop blur
- **Glassmorphism**: Subtle transparency and blur effects
- **Typography**: Monospace fonts for technical elements, clean sans-serif for content

### Interactive Elements
- **Hover Animations**: Subtle scale and glow effects
- **Loading States**: Consistent spinner animations
- **Toast Notifications**: Success/error feedback system
- **Modal Dialogs**: Form interactions and confirmations

### Accessibility
- **Dark/Light Theme**: System preference detection with manual toggle
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color combinations

---

## Development Setup

### Prerequisites
- Node.js 18+ with npm
- Supabase account and project

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd redo-network

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration
- Supabase project configured with project ID: `ymymenejrasmnhcblsgp`
- Authentication and storage buckets pre-configured
- Database migrations handled through Supabase CLI

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Production build
- `npm run build:dev`: Development build
- `npm run lint`: ESLint checking
- `npm run preview`: Preview production build

---

## Security & Privacy

### Authentication Security
- Supabase Auth with email verification
- Row Level Security (RLS) on all tables
- Role-based access control with hierarchical permissions

### Data Protection
- User data isolated by user ID
- Public/private content controls
- Secure file storage with access controls

### Content Moderation
- Approval workflows for public content
- Community guidelines enforcement
- Administrative oversight capabilities

---

This documentation provides a comprehensive overview of the RE:DO Network platform, covering its philosophy, technical architecture, features, and user workflows. The platform represents a thoughtful approach to digital collaboration, emphasizing intentional community building over traditional social media engagement patterns.

Based on my comprehensive analysis of your RE:DO application, I can create complete documentation that covers:

**1. Executive Overview & Philosophy**
- Platform mission and core values from the Ethos page
- Technical architecture and technology stack
- Community principles and design philosophy

**2. Technical Documentation**
- Complete database schema with all 8 tables
- Authentication system with 4-tier role hierarchy
- Rich text editor capabilities and extensions
- Supabase integration details

**3. Feature Documentation**
- Public pages (landing, about, ethos, projects, team, portfolio)
- Protected dashboard system with personal page editor
- Project management and collaboration tools
- Portfolio management with approval workflows
- Administrative tools and content management

**4. User Guides**
- Getting started workflows
- Profile and portfolio creation
- Project collaboration processes
- Administrative functions

**5. Developer Documentation**
- Setup and installation instructions
- API documentation and database schema
- Component architecture and design system
- Security and privacy considerations

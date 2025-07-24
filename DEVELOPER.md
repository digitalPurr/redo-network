# RE:DO Network - Developer Documentation

## Development Setup

### Prerequisites

**Required Software**
- Node.js 18+ (LTS recommended)
- npm or yarn package manager
- Git for version control

**Recommended Tools**
- VS Code with TypeScript extension
- Supabase CLI for database management
- Postman or similar for API testing

### Installation

1. **Clone Repository**
```bash
git clone [repository-url]
cd redo-network
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
```bash
# No .env file needed - Supabase configuration is embedded
# Project ID: ymymenejrasmnhcblsgp
# Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. **Start Development Server**
```bash
npm run dev
# Application will be available at http://localhost:8080
```

### Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Create production build
npm run build:dev    # Create development build
npm run lint         # Run ESLint for code quality
npm run preview      # Preview production build locally
```

## Project Structure

### Directory Organization

```
src/
├── components/              # Reusable UI components
│   ├── ui/                 # shadcn/ui base components
│   │   ├── button.tsx      # Button variants and styling
│   │   ├── card.tsx        # Card layouts
│   │   ├── dialog.tsx      # Modal dialogs
│   │   └── ...             # Other UI primitives
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── PersonalPageEditor.tsx
│   │   ├── ProjectManagement.tsx
│   │   └── PortfolioManagement.tsx
│   ├── ethos/              # Ethos page components
│   │   ├── CoreValueCard.tsx
│   │   ├── ManifestoCard.tsx
│   │   └── ProtocolCard.tsx
│   ├── RichTextEditor/     # TipTap editor implementation
│   │   ├── components/     # Editor UI components
│   │   ├── extensions/     # Custom TipTap extensions
│   │   └── hooks/          # Editor-specific hooks
│   └── ...                 # Other component categories
├── pages/                  # Route components
│   ├── Index.tsx          # Landing page
│   ├── Dashboard.tsx      # Main dashboard
│   ├── Admin.tsx          # Admin panel
│   └── ...                # Other pages
├── hooks/                  # Custom React hooks
│   ├── use-auth.tsx       # Authentication logic
│   ├── use-mobile.tsx     # Mobile detection
│   └── use-toast.ts       # Toast notifications
├── lib/                    # Utility functions
│   ├── utils.ts           # General utilities
│   └── discord-bridge.ts  # Discord integration
├── integrations/           # External service integrations
│   └── supabase/          # Supabase client and types
└── assets/                # Static assets
```

### Component Architecture

**Design Principles**
- Single responsibility principle
- Composition over inheritance
- Props interface documentation
- Consistent naming conventions

**Component Categories**
1. **UI Components** (`src/components/ui/`): Base shadcn/ui components
2. **Feature Components** (`src/components/dashboard/`): Feature-specific logic
3. **Layout Components** (`src/components/`): Page structure and navigation
4. **Page Components** (`src/pages/`): Route-level components

## Supabase Integration

### Database Connection

```typescript
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://ymymenejrasmnhcblsgp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
)
```

### Authentication Implementation

```typescript
// src/hooks/use-auth.tsx
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  // Auth state management
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserRole(session.user.id)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchUserRole(session.user.id)
        } else {
          setUserRole(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Authentication methods
  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    // Implementation details...
  }

  const signIn = async (email: string, password: string) => {
    // Implementation details...
  }

  const signOut = async () => {
    // Implementation details...
  }

  return { user, session, loading, userRole, signUp, signIn, signOut }
}
```

### Database Operations

**Basic CRUD Operations**
```typescript
// Create
const { data, error } = await supabase
  .from('profiles')
  .insert({
    user_id: user.id,
    first_name: 'John',
    last_name: 'Doe'
  })

// Read
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('user_id', user.id)
  .single()

// Update
const { data, error } = await supabase
  .from('profiles')
  .update({ bio: 'Updated bio' })
  .eq('user_id', user.id)

// Delete
const { data, error } = await supabase
  .from('profiles')
  .delete()
  .eq('id', profileId)
```

**Complex Queries with Joins**
```typescript
const { data, error } = await supabase
  .from('project_members')
  .select(`
    *,
    projects:project_id (*),
    profiles:user_id (*)
  `)
  .eq('user_id', user.id)
```

### Real-time Subscriptions

```typescript
// Subscribe to table changes
const subscription = supabase
  .channel('profiles')
  .on('postgres_changes', 
    { 
      event: '*', 
      schema: 'public', 
      table: 'profiles',
      filter: `user_id=eq.${user.id}`
    },
    (payload) => {
      console.log('Profile updated:', payload)
      // Update local state
    }
  )
  .subscribe()

// Cleanup
return () => subscription.unsubscribe()
```

## Rich Text Editor Development

### TipTap Configuration

```typescript
// src/components/RichTextEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  extensions: [
    StarterKit,
    // Custom extensions
    AudioExtension,
    VideoExtension,
    CalloutExtension,
    // ... other extensions
  ],
  content: initialContent,
  onUpdate: ({ editor }) => {
    // Auto-save logic
    const content = editor.getJSON()
    debouncedSave(content)
  }
})
```

### Creating Custom Extensions

```typescript
// src/components/RichTextEditor/extensions/CalloutExtension.ts
import { Node, mergeAttributes } from '@tiptap/core'

export const CalloutExtension = Node.create({
  name: 'callout',
  
  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  content: 'block+',
  group: 'block',
  defining: true,

  addAttributes() {
    return {
      type: {
        default: 'info',
        parseHTML: element => element.getAttribute('data-type'),
        renderHTML: attributes => {
          if (!attributes.type) return {}
          return { 'data-type': attributes.type }
        },
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type=\\\"callout\\\"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      'data-type': 'callout',
      class: 'callout'
    }), 0]
  },

  addCommands() {
    return {
      setCallout: (attributes) => ({ commands }) => {
        return commands.setNode(this.name, attributes)
      },
    }
  },
})
```

### Auto-save Implementation

```typescript
// src/components/RichTextEditor/hooks/useAutoSave.ts
import { useCallback } from 'react'
import { debounce } from 'lodash'
import { toast } from 'sonner'

export const useAutoSave = (saveFunction: (content: any) => Promise<void>) => {
  const debouncedSave = useCallback(
    debounce(async (content: any) => {
      try {
        await saveFunction(content)
        toast.success('Content saved automatically')
      } catch (error) {
        toast.error('Failed to save content')
        console.error('Auto-save error:', error)
      }
    }, 30000), // 30 seconds
    [saveFunction]
  )

  return { debouncedSave }
}
```

## State Management

### React Query Implementation

```typescript
// Query configuration
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Fetch user profile
export const useProfile = (userId: string) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (error) throw error
      return data
    },
    enabled: !!userId,
  })
}

// Update profile mutation
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (profileData: ProfileUpdate) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('user_id', profileData.user_id)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ['profile', data.user_id] })
      toast.success('Profile updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update profile')
      console.error('Update error:', error)
    }
  })
}
```

### Local State Patterns

```typescript
// Component state management
const [formData, setFormData] = useState({
  title: '',
  description: '',
  category: ''
})

// Update specific field
const updateField = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }))
}

// Form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    await updateProfileMutation.mutateAsync(formData)
    // Success handling
  } catch (error) {
    // Error handling
  }
}
```

## UI Component Development

### Design System Usage

```typescript
// src/components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
```

### Responsive Design Patterns

```typescript
// Mobile-responsive component
import { useIsMobile } from '@/hooks/use-mobile'

export const ResponsiveLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile()

  return (
    <div className={cn(
      "container mx-auto p-4",
      isMobile ? "px-2" : "px-8"
    )}>
      {isMobile ? (
        <MobileLayout>{children}</MobileLayout>
      ) : (
        <DesktopLayout>{children}</DesktopLayout>
      )}
    </div>
  )
}
```

## Testing Strategies

### Component Testing

```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant styles', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByText('Delete')
    expect(button).toHaveClass('bg-destructive')
  })
})
```

### Integration Testing

```typescript
// Integration test for authentication flow
import { renderWithProviders } from '@/test-utils'
import { AuthProvider } from '@/hooks/use-auth'
import { LoginForm } from '@/components/LoginForm'

describe('Authentication Flow', () => {
  it('completes sign-in process', async () => {
    const { user } = renderWithProviders(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    )

    // Fill in form
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    
    // Assert success
    await screen.findByText(/welcome back/i)
  })
})
```

## Performance Optimization

### Code Splitting

```typescript
// Route-based code splitting
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const AdminPanel = lazy(() => import('@/pages/Admin'))

// Usage in router
<Route 
  path="/dashboard" 
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  } 
/>
```

### Memoization Strategies

```typescript
// Component memoization
const ProjectCard = React.memo(({ project }: { project: Project }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{project.description}</p>
      </CardContent>
    </Card>
  )
})

// Callback memoization
const ProjectList = ({ projects }: { projects: Project[] }) => {
  const handleProjectClick = useCallback((projectId: string) => {
    // Navigation logic
  }, [])

  return (
    <div>
      {projects.map(project => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onClick={handleProjectClick}
        />
      ))
    </div>
  )
}
```

### Image Optimization

```typescript
// Lazy loading images
const LazyImage = ({ src, alt, className }: ImageProps) => {
  const [imageRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <div ref={imageRef} className={className}>
      {inView && (
        <img 
          src={src} 
          alt={alt} 
          loading="lazy"
          className="w-full h-auto"
        />
      )}
    </div>
  )
}
```

## Deployment Process

### Build Configuration

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          editor: ['@tiptap/react', '@tiptap/starter-kit']
        }
      }
    }
  },
  server: {
    host: "::",
    port: 8080,
  },
})
```

### Environment Management

```typescript
// No environment variables needed for basic setup
// Supabase configuration is embedded in the application
// For production deployment, consider:
// - Custom domain configuration
// - CDN setup for static assets
// - Performance monitoring
```

## Contribution Guidelines

### Code Standards

1. **TypeScript**: All new code must be written in TypeScript
2. **ESLint**: Follow the configured ESLint rules
3. **Prettier**: Use Prettier for consistent formatting
4. **Component Props**: Always define interfaces for component props
5. **Error Handling**: Implement proper error boundaries and try-catch blocks

### Git Workflow

```bash
# Feature development
git checkout -b feature/new-feature-name
git add .
git commit -m "feat: add new feature description"
git push origin feature/new-feature-name

# Create pull request for review
```

### Pull Request Process

1. **Branch Naming**: Use descriptive names (feature/, fix/, refactor/)
2. **Commit Messages**: Follow conventional commit format
3. **Code Review**: All changes require review before merging
4. **Testing**: Ensure all tests pass before submission
5. **Documentation**: Update relevant documentation for new features

### Development Workflow

1. **Local Development**: Use `npm run dev` for hot reloading
2. **Testing**: Run tests frequently during development
3. **Linting**: Fix ESLint errors before committing
4. **Build Verification**: Test production build with `npm run build && npm run preview`

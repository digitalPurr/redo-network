
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/hooks/use-auth';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
  showAdminAccess?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  showAdminAccess = false 
}) => {
  const { user, signOut, userRole } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const canAccessAdmin = userRole && ['network-admin', 'project-lead', 'contributor'].includes(userRole);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ⌈RE⁝DO⌋
                </h1>
                <p className="text-xs text-muted-foreground -mt-1 tracking-[0.3em]">
                  N E T W O R K
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/about" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              About
            </Link>
            <Link 
              to="/ethos" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              Ethos
            </Link>
            <Link 
              to="/team" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              Team
            </Link>
            <Link 
              to="/portfolio" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              Portfolio
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {user ? (
              <>
                {canAccessAdmin && (
                  <Button asChild variant="outline" size="sm">
                    <Link to="/admin">Admin Panel</Link>
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <User size={16} />
                      <span className="hidden sm:inline">{user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center space-x-2">
                        <LayoutDashboard size={16} />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center space-x-2">
                        <Settings size={16} />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="flex items-center space-x-2 text-destructive">
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </Link>
                  </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

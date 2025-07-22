import React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { Menu, Settings, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
  showAdminAccess?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  showAdminAccess = false 
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-4">
            {onMenuClick && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <div className="w-4 h-4 rounded-sm bg-white/90" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  RE:DO
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">NETWORK</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="/projects" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              Projects
            </a>
            <a 
              href="/about" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              About
            </a>
            <a 
              href="/team" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              Team
            </a>
            <a 
              href="/contact" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {showAdminAccess && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  <User className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                >
                  <Settings className="h-4 w-4" />
                  Admin
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen,
  FileText,
  History
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const { userRole } = useAuth();

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      roles: ['network-admin', 'project-lead', 'contributor']
    },
    {
      title: 'Projects',
      href: '/admin/projects',
      icon: FolderOpen,
      roles: ['network-admin', 'project-lead']
    },
    {
      title: 'Portfolio',
      href: '/admin/portfolio',
      icon: History,
      roles: ['network-admin', 'project-lead']
    },
    {
      title: 'Team',
      href: '/admin/team',
      icon: Users,
      roles: ['network-admin', 'project-lead']
    },
    {
      title: 'Site Content',
      href: '/admin/site-content',
      icon: FileText,
      roles: ['network-admin', 'project-lead']
    }
  ];

  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(userRole || '')
  );

  return (
    <aside className="w-64 bg-card/80 border-r border-primary/30 h-screen sticky top-20">
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-lg font-bold text-primary font-mono">
            【ADMIN PANEL】
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Network Control Center
          </p>
        </div>
        
        <nav className="space-y-2">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground font-medium shadow-md" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;

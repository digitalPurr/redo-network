
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen,
  Settings,
  FileText
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
      title: 'Team',
      href: '/admin/team',
      icon: Users,
      roles: ['network-admin', 'project-lead']
    },
    {
      title: 'Site Content',
      href: '/admin/content',
      icon: FileText,
      roles: ['network-admin', 'project-lead']
    }
  ];

  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(userRole || '')
  );

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-20">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Admin Panel</h2>
        
        <nav className="space-y-2">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
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

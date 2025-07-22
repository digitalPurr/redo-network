import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Users, 
  Settings,
  UserPlus,
  FileText
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const { userRole } = useAuth();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/admin',
      roles: ['network-admin', 'project-lead', 'contributor']
    },
    {
      icon: FolderOpen,
      label: 'Projects',
      href: '/admin/projects',
      roles: ['network-admin', 'project-lead', 'contributor']
    },
    {
      icon: CheckSquare,
      label: 'Tasks',
      href: '/admin/tasks',
      roles: ['network-admin', 'project-lead', 'contributor']
    },
    {
      icon: Users,
      label: 'Team',
      href: '/admin/team',
      roles: ['network-admin', 'project-lead']
    },
    {
      icon: UserPlus,
      label: 'User Management',
      href: '/admin/users',
      roles: ['network-admin']
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/admin/settings',
      roles: ['network-admin', 'project-lead']
    },
    {
      icon: FileText,
      label: 'Site Content',
      href: '/admin/site-content',
      roles: ['network-admin', 'project-lead']
    }
  ];

  const filteredItems = menuItems.filter(item => 
    item.roles.includes(userRole || '')
  );

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen">
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
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, CheckSquare, Users, Activity } from 'lucide-react';

const Admin = () => {
  const { user, userRole } = useAuth();

  const stats = [
    {
      title: 'Active Projects',
      value: '4',
      icon: FolderOpen,
      description: 'Currently in progress'
    },
    {
      title: 'Open Tasks',
      value: '12',
      icon: CheckSquare,
      description: 'Awaiting completion'
    },
    {
      title: 'Team Members',
      value: '8',
      icon: Users,
      description: 'Across all projects'
    },
    {
      title: 'Activity Score',
      value: '94%',
      icon: Activity,
      description: 'Team engagement rate'
    }
  ];

  return (
    <AdminLayout 
      title="Dashboard Overview" 
      description="Monitor project progress and team activity"
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Welcome back, {user?.email}</span>
              <Badge variant="secondary" className="capitalize">
                {userRole}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You have access to {userRole === 'network-admin' ? 'all administrative features' : 
                userRole === 'project-lead' ? 'project and team management' : 
                'task management and collaboration tools'}.
            </p>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">New task created in Neural Synthesis</span>
                  <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Quantum Interface milestone completed</span>
                  <span className="text-xs text-muted-foreground ml-auto">4h ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Team member added to Spatial Computing</span>
                  <span className="text-xs text-muted-foreground ml-auto">1d ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">UI/UX Review - Quantum Interface</span>
                  <Badge variant="destructive" className="text-xs">Due Today</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Beta Testing - Neural Synthesis</span>
                  <Badge variant="outline" className="text-xs">2 days</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Documentation Update</span>
                  <Badge variant="outline" className="text-xs">1 week</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
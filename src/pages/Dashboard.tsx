
import React, { useState } from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { 
  FolderOpen, 
  User, 
  History, 
  BarChart3, 
  Plus,
  Settings,
  Eye,
  Users,
  Calendar
} from 'lucide-react';
import ProjectManagement from '@/components/dashboard/ProjectManagement';
import PersonalPageEditor from '@/components/dashboard/PersonalPageEditor';
import PortfolioManagement from '@/components/dashboard/PortfolioManagement';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';

const Dashboard = () => {
  const { user, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const canManageProjects = userRole && ['network-admin', 'project-lead', 'contributor'].includes(userRole);

  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <Header />
      
      <main className="pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your projects, personal pages, and portfolio
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Page
              </TabsTrigger>
              {canManageProjects && (
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  Projects
                </TabsTrigger>
              )}
              <TabsTrigger value="portfolio" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Portfolio
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Personal Page Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>

                {canManageProjects && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                      <FolderOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">
                        2 as lead, 1 as contributor
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Portfolio Items</CardTitle>
                    <History className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">
                      2 pending approval
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Collaborations</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      Across all projects
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest updates and contributions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Updated personal page</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Submitted portfolio item</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Joined new project</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Portfolio Item
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Personal Page
                    </Button>
                    {canManageProjects && (
                      <Button className="w-full justify-start" variant="outline">
                        <FolderOpen className="h-4 w-4 mr-2" />
                        Create New Project
                      </Button>
                    )}
                    <Button className="w-full justify-start" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Public Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="personal">
              <PersonalPageEditor />
            </TabsContent>

            {canManageProjects && (
              <TabsContent value="projects">
                <ProjectManagement />
              </TabsContent>
            )}

            <TabsContent value="portfolio">
              <PortfolioManagement />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

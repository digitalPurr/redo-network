
import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/use-auth';
import PersonalPageEditor from '@/components/dashboard/PersonalPageEditor';
import ProjectManagement from '@/components/dashboard/ProjectManagement';
import PortfolioManagement from '@/components/dashboard/PortfolioManagement';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, BarChart3, FolderOpen } from 'lucide-react';

const Dashboard = () => {
  const { user, userRole } = useAuth();

  if (!user) {
    return null; // This shouldn't happen due to ProtectedRoute, but good safety check
  }

  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <Card className="bg-card/80 border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    Welcome to 「RE:DO NETWORK」
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    {user.email} • Dashboard Control Center
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="capitalize text-sm">
                  {userRole}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-card/50">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Portfolio
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <PersonalPageEditor />
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <ProjectManagement />
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6">
              <PortfolioManagement />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

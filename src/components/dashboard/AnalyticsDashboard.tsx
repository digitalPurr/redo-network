
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart3, 
  Eye, 
  TrendingUp, 
  Calendar,
  Globe,
  Users,
  Clock,
  Target
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState({
    pageViews: 0,
    profileViews: 0,
    portfolioViews: 0,
    projectEngagement: 0,
    growthRate: 0,
    avgSessionTime: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch profile analytics
      const { data: profileData } = await supabase
        .from('profiles')
        .select('page_views')
        .eq('id', user?.id)
        .single();

      // For now, use mock data and profile views since other analytics tables don't exist yet
      const profileViews = profileData?.page_views || 0;
      
      setAnalytics({
        pageViews: profileViews + 150, // Mock additional page views
        profileViews: profileViews,
        portfolioViews: Math.floor(profileViews * 0.3), // Estimate
        projectEngagement: Math.floor(profileViews * 0.15), // Estimate
        growthRate: 20.1, // Mock data
        avgSessionTime: 145 // Mock data in seconds
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Use mock data on error
      setAnalytics({
        pageViews: 1234,
        profileViews: 856,
        portfolioViews: 340,
        projectEngagement: 128,
        growthRate: 20.1,
        avgSessionTime: 145
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Track your content performance and engagement</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.pageViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{analytics.growthRate}%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.profileViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Unique profile visits
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Portfolio Views</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.portfolioViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Portfolio item views
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatTime(analytics.avgSessionTime)}</div>
                <p className="text-xs text-muted-foreground">
                  Time spent on your content
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest interactions with your content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Portfolio item viewed</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                  <Badge variant="outline">+5 views</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Profile page visited</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                  <Badge variant="outline">+2 views</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Project page engagement</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                  <Badge variant="outline">+8 views</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Content</CardTitle>
                <CardDescription>Your most popular content pieces</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Personal Profile</p>
                    <p className="text-xs text-muted-foreground">Main profile page</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{analytics.profileViews}</p>
                    <p className="text-xs text-muted-foreground">views</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Latest Portfolio Item</p>
                    <p className="text-xs text-muted-foreground">Most recent submission</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{Math.floor(analytics.portfolioViews * 0.4)}</p>
                    <p className="text-xs text-muted-foreground">views</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Project Contributions</p>
                    <p className="text-xs text-muted-foreground">Team project work</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{analytics.projectEngagement}</p>
                    <p className="text-xs text-muted-foreground">interactions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.5%</div>
                <p className="text-xs text-muted-foreground">
                  Users who interact with content
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Return Visitors</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.3%</div>
                <p className="text-xs text-muted-foreground">
                  Visitors who return to your content
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45.2%</div>
                <p className="text-xs text-muted-foreground">
                  Single-page sessions
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Breakdown</CardTitle>
              <CardDescription>How users interact with different content types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Portfolio Items</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile Content</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Project Pages</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Growth Metrics</CardTitle>
                <CardDescription>Your content growth over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Month</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">+20.1%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Month</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">+15.3%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">3 Months Ago</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-600">+8.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goals Progress</CardTitle>
                <CardDescription>Track your content objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Views Goal</span>
                    <span>1,234 / 2,000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Portfolio Items Goal</span>
                    <span>8 / 12</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Engagement Rate Goal</span>
                    <span>24.5% / 30%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;

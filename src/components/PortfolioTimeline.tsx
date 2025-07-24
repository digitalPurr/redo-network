import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Calendar, 
  Eye, 
  Heart, 
  ExternalLink, 
  Search, 
  Clock,
  Star,
  User,
  ArrowUpRight,
  Grid3X3,
  List
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  rich_content: any;
  approval_status: string;
  featured: boolean;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  profiles: {
    id: string;
    display_name: string | null;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    job_title: string | null;
  } | null;
}

interface TimelineFilters {
  search: string;
  category: string;
  sortBy: 'newest' | 'oldest' | 'most_viewed' | 'most_liked';
  viewMode: 'grid' | 'list' | 'timeline';
  showFeaturedOnly: boolean;
}

const PortfolioTimeline: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());
  
  const [filters, setFilters] = useState<TimelineFilters>({
    search: '',
    category: 'all',
    sortBy: 'newest',
    viewMode: 'grid',
    showFeaturedOnly: false
  });

  useEffect(() => {
    loadPortfolioProjects();
    if (user) {
      loadUserLikes();
    }
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [projects, filters]);

  const loadPortfolioProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select(`
          id,
          title,
          description,
          rich_content,
          approval_status,
          featured,
          views,
          likes,
          created_at,
          updated_at,
          user_id
        `)
        .eq('approval_status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch profiles separately to avoid join issues
      const userIds = [...new Set(data?.map(p => p.user_id).filter(Boolean) || [])];
      let profilesData: any[] = [];
      
      if (userIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, display_name, first_name, last_name, avatar_url, job_title')
          .in('id', userIds);
        
        if (profilesError) {
          console.error('Error loading profiles:', profilesError);
        } else {
          profilesData = profiles || [];
        }
      }

      const formattedData = (data || []).map(item => {
        const profile = profilesData.find(p => p.id === item.user_id) || {
          id: '',
          display_name: null,
          first_name: null,
          last_name: null,
          avatar_url: null,
          job_title: null
        };
        
        return {
          ...item,
          profiles: profile
        };
      });

      setProjects(formattedData);
      
      const uniqueCategories = [...new Set(
        formattedData.map(p => extractCategoryFromContent(p.rich_content)).filter(Boolean)
      )];
      setCategories(uniqueCategories);

    } catch (error) {
      console.error('Error loading portfolio projects:', error);
      toast.error('Failed to load portfolio projects');
    } finally {
      setLoading(false);
    }
  };

  const loadUserLikes = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('portfolio_likes')
        .select('portfolio_project_id')
        .eq('user_id', user.id);

      if (error) throw error;

      setLikedProjects(new Set(data?.map(like => like.portfolio_project_id) || []));
    } catch (error) {
      console.error('Error loading user likes:', error);
    }
  };

  const extractCategoryFromContent = (content: any): string | null => {
    if (content?.category) return content.category;
    if (content?.attrs?.category) return content.attrs.category;
    return null;
  };

  const applyFilters = () => {
    let filtered = [...projects];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description?.toLowerCase().includes(searchLower) ||
        project.profiles?.display_name?.toLowerCase().includes(searchLower) ||
        `${project.profiles?.first_name || ''} ${project.profiles?.last_name || ''}`.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(project => 
        extractCategoryFromContent(project.rich_content) === filters.category
      );
    }

    if (filters.showFeaturedOnly) {
      filtered = filtered.filter(project => project.featured);
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'most_viewed':
          return b.views - a.views;
        case 'most_liked':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  };

  const handleLike = async (projectId: string) => {
    if (!user) {
      toast.error('Please sign in to like projects');
      return;
    }

    try {
      const isLiked = likedProjects.has(projectId);

      if (isLiked) {
        const { error } = await supabase
          .from('portfolio_likes')
          .delete()
          .eq('portfolio_project_id', projectId)
          .eq('user_id', user.id);

        if (error) throw error;

        const newLikedProjects = new Set(likedProjects);
        newLikedProjects.delete(projectId);
        setLikedProjects(newLikedProjects);

        setProjects(prev => prev.map(p => 
          p.id === projectId ? { ...p, likes: p.likes - 1 } : p
        ));
      } else {
        const { error } = await supabase
          .from('portfolio_likes')
          .insert({
            portfolio_project_id: projectId,
            user_id: user.id
          });

        if (error) throw error;

        const newLikedProjects = new Set(likedProjects);
        newLikedProjects.add(projectId);
        setLikedProjects(newLikedProjects);

        setProjects(prev => prev.map(p => 
          p.id === projectId ? { ...p, likes: p.likes + 1 } : p
        ));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  const incrementViews = async (projectId: string) => {
    try {
      const project = filteredProjects.find(p => p.id === projectId);
      if (!project) return;

      const { error } = await supabase
        .from('portfolio_projects')
        .update({ views: project.views + 1 })
        .eq('id', projectId);

      if (error) throw error;

      setProjects(prev => prev.map(p => 
        p.id === projectId ? { ...p, views: p.views + 1 } : p
      ));
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const renderProjectCard = (project: PortfolioProject) => {
    const isLiked = likedProjects.has(project.id);
    const authorName = project.profiles?.display_name || 
                     `${project.profiles?.first_name || ''} ${project.profiles?.last_name || ''}`.trim() || 'Unknown Author';

    return (
      <Card 
        key={project.id}
        className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        onClick={() => incrementViews(project.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {project.profiles?.avatar_url ? (
                  <img 
                    src={project.profiles.avatar_url} 
                    alt={authorName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <User className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                <span className="text-sm text-muted-foreground">{authorName}</span>
                {project.profiles?.job_title && (
                  <Badge variant="outline" className="text-xs">
                    {project.profiles.job_title}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {project.title}
                {project.featured && (
                  <Star className="inline w-4 h-4 ml-2 text-yellow-500 fill-current" />
                )}
              </CardTitle>
              <CardDescription className="mt-2 line-clamp-2">
                {project.description}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{project.views}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(project.id);
                }}
                className={`flex items-center gap-1 transition-colors ${
                  isLiked ? 'text-red-500' : 'hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{project.likes}</span>
              </button>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{new Date(project.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {extractCategoryFromContent(project.rich_content) && (
            <div className="mt-3">
              <Badge variant="secondary" className="text-xs">
                {extractCategoryFromContent(project.rich_content)}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderTimelineView = () => {
    const groupedByMonth = filteredProjects.reduce((acc, project) => {
      const month = new Date(project.created_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
      if (!acc[month]) acc[month] = [];
      acc[month].push(project);
      return acc;
    }, {} as Record<string, PortfolioProject[]>);

    return (
      <div className="space-y-8">
        {Object.entries(groupedByMonth).map(([month, monthProjects]) => (
          <div key={month} className="relative">
            <div className="sticky top-4 z-10 mb-4">
              <Badge variant="outline" className="bg-background">
                {month} ({monthProjects.length} projects)
              </Badge>
            </div>
            <div className="relative pl-6 border-l-2 border-border">
              <div className="space-y-6">
                {monthProjects.map((project) => (
                  <div key={project.id} className="relative">
                    <div className="absolute -left-8 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                    {renderProjectCard(project)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderListView = () => (
    <div className="space-y-4">
      {filteredProjects.map((project) => (
        <Card key={project.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {project.profiles?.avatar_url ? (
                    <img 
                      src={project.profiles.avatar_url} 
                      alt={project.profiles?.display_name || 'Unknown Author'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      by {project.profiles?.display_name || 
                          `${project.profiles?.first_name || ''} ${project.profiles?.last_name || ''}`.trim() || 'Unknown Author'}
                    </p>
                  </div>
                  {project.featured && (
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  )}
                </div>
                <p className="text-muted-foreground mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{project.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{project.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project) => renderProjectCard(project))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Portfolio Timeline
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover amazing projects from our creative community
          </p>
        </div>
        
        <Button
          variant={filters.showFeaturedOnly ? "default" : "outline"}
          onClick={() => setFilters(prev => ({ ...prev, showFeaturedOnly: !prev.showFeaturedOnly }))}
          className="self-start sm:self-auto"
        >
          <Star className="w-4 h-4 mr-2" />
          {filters.showFeaturedOnly ? 'Show All' : 'Featured Only'}
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects, authors, or descriptions..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <Select
              value={filters.category}
              onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.sortBy}
              onValueChange={(value: TimelineFilters['sortBy']) => 
                setFilters(prev => ({ ...prev, sortBy: value }))
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="most_viewed">Most Viewed</SelectItem>
                <SelectItem value="most_liked">Most Liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs 
        value={filters.viewMode} 
        onValueChange={(value: TimelineFilters['viewMode']) => 
          setFilters(prev => ({ ...prev, viewMode: value }))
        }
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center gap-2">
              <Grid3X3 className="w-4 h-4" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              List
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Timeline
            </TabsTrigger>
          </TabsList>
          
          <Badge variant="secondary">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        <TabsContent value="grid" className="mt-6">
          {filteredProjects.length > 0 ? renderGridView() : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          {filteredProjects.length > 0 ? renderListView() : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          {filteredProjects.length > 0 ? renderTimelineView() : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioTimeline;
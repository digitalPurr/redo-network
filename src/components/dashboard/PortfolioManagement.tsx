
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Plus, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle,
  Calendar,
  ExternalLink,
  Upload
} from 'lucide-react';

const PortfolioManagement = () => {
  const { user } = useAuth();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    project_url: '',
    demo_url: '',
    image_url: '',
    tags: '',
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolioItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      toast({
        title: "Error",
        description: "Failed to load portfolio items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async () => {
    try {
      const portfolioData = {
        ...newItem,
        user_id: user?.id,
        tags: newItem.tags ? newItem.tags.split(',').map(tag => tag.trim()) : []
      };

      const { error } = await supabase
        .from('portfolio_projects')
        .insert([portfolioData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Portfolio item submitted for review",
      });

      setCreateDialogOpen(false);
      setNewItem({
        title: '',
        description: '',
        project_url: '',
        demo_url: '',
        image_url: '',
        tags: '',
        start_date: '',
        end_date: ''
      });
      fetchPortfolioItems();
    } catch (error) {
      console.error('Error creating portfolio item:', error);
      toast({
        title: "Error",
        description: "Failed to create portfolio item",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Management</h2>
          <p className="text-muted-foreground">Manage your portfolio submissions and showcase your work</p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Portfolio Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Submit Portfolio Item</DialogTitle>
              <DialogDescription>
                Submit your completed work for review and inclusion in the public portfolio.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={newItem.title}
                  onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter project title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your project and its impact"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={newItem.start_date}
                    onChange={(e) => setNewItem(prev => ({ ...prev, start_date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={newItem.end_date}
                    onChange={(e) => setNewItem(prev => ({ ...prev, end_date: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_url">Project URL</Label>
                <Input
                  id="project_url"
                  value={newItem.project_url}
                  onChange={(e) => setNewItem(prev => ({ ...prev, project_url: e.target.value }))}
                  placeholder="https://github.com/username/project"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo_url">Demo URL</Label>
                <Input
                  id="demo_url"
                  value={newItem.demo_url}
                  onChange={(e) => setNewItem(prev => ({ ...prev, demo_url: e.target.value }))}
                  placeholder="https://demo.project.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Cover Image URL</Label>
                <Input
                  id="image_url"
                  value={newItem.image_url}
                  onChange={(e) => setNewItem(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newItem.tags}
                  onChange={(e) => setNewItem(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="web development, react, design"
                />
              </div>

              <Button onClick={handleCreateItem} className="w-full">
                Submit for Review
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioItems.map((item: any) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.approval_status)}
                    <Badge className={getStatusColor(item.approval_status)}>
                      {item.approval_status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {item.image_url && (
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <p className="text-sm text-muted-foreground line-clamp-3">
                {item.description}
              </p>
              
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {item.start_date && new Date(item.start_date).toLocaleDateString()} - 
                    {item.end_date && new Date(item.end_date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {item.project_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={item.project_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}
                {item.demo_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={item.demo_url} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>

              {item.approval_status === 'rejected' && item.rejection_reason && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">
                    <strong>Rejection Reason:</strong> {item.rejection_reason}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {portfolioItems.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Portfolio Items</h3>
              <p className="text-muted-foreground mb-4">
                Submit your completed projects to showcase your work in the public portfolio.
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Submit First Item
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PortfolioManagement;

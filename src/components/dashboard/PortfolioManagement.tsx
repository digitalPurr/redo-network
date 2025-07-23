
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import RichTextEditor from '@/components/RichTextEditor';
import { 
  Plus, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle,
  Calendar,
  ExternalLink,
  Upload,
  Info
} from 'lucide-react';

const PortfolioManagement = () => {
  const { user } = useAuth();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    rich_content: '',
    project_url: '',
    demo_url: '',
    image_url: '',
    tags: '',
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    // For now, load mock data since portfolio_projects table isn't in types yet
    setTimeout(() => {
      setPortfolioItems([
        {
          id: '1',
          title: 'Sample Portfolio Project',
          description: 'This is a sample portfolio project showcasing the interface.',
          rich_content: '<h2>Project Overview</h2><p>This project demonstrates the enhanced portfolio management system with rich content editing capabilities.</p>',
          approval_status: 'pending',
          project_url: 'https://github.com/example/project',
          demo_url: 'https://demo.example.com',
          image_url: '/placeholder.svg',
          tags: ['web development', 'react', 'design'],
          start_date: '2024-01-01',
          end_date: '2024-02-01',
          created_at: new Date().toISOString()
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateItem = async () => {
    try {
      // Mock creation for now - will implement actual database integration once types are updated
      const mockItem = {
        id: Date.now().toString(),
        ...newItem,
        user_id: user?.id,
        approval_status: 'pending',
        tags: newItem.tags ? newItem.tags.split(',').map(tag => tag.trim()) : [],
        created_at: new Date().toISOString()
      };

      setPortfolioItems(prev => [mockItem, ...prev]);

      toast({
        title: "Success",
        description: "Portfolio item submitted for review",
      });

      setCreateDialogOpen(false);
      setNewItem({
        title: '',
        description: '',
        rich_content: '',
        project_url: '',
        demo_url: '',
        image_url: '',
        tags: '',
        start_date: '',
        end_date: ''
      });
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

  const TooltipField = ({ 
    children, 
    tooltip 
  }: { 
    children: React.ReactNode; 
    tooltip: string; 
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{children}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Portfolio Management</h2>
            <p className="text-muted-foreground">Create rich, multimedia portfolio items to showcase your completed work</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Portfolio Item
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new portfolio item with rich content</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Submit Portfolio Item
                </DialogTitle>
                <DialogDescription>
                  Create a rich, multimedia presentation of your completed work for review and inclusion in the public portfolio.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <TooltipField tooltip="A clear, descriptive title for your project">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="flex items-center gap-2">
                      Project Title
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </Label>
                    <Input
                      id="title"
                      value={newItem.title}
                      onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter a compelling project title"
                    />
                  </div>
                </TooltipField>
                
                <TooltipField tooltip="Brief summary for previews and search results">
                  <div className="space-y-2">
                    <Label htmlFor="description" className="flex items-center gap-2">
                      Short Description
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </Label>
                    <Input
                      id="description"
                      value={newItem.description}
                      onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief summary of your project"
                    />
                  </div>
                </TooltipField>

                <TooltipField tooltip="Create detailed documentation with rich formatting, media, and interactive elements">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      Rich Content Documentation
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </Label>
                    <div className="border rounded-lg">
                      <RichTextEditor
                        content={newItem.rich_content}
                        onChange={(content) => setNewItem(prev => ({ ...prev, rich_content: content }))}
                        placeholder="Document your project with rich formatting, images, videos, code examples, and more..."
                      />
                    </div>
                  </div>
                </TooltipField>

                <div className="grid grid-cols-2 gap-4">
                  <TooltipField tooltip="When did you start working on this project?">
                    <div className="space-y-2">
                      <Label htmlFor="start_date" className="flex items-center gap-2">
                        Start Date
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </Label>
                      <Input
                        id="start_date"
                        type="date"
                        value={newItem.start_date}
                        onChange={(e) => setNewItem(prev => ({ ...prev, start_date: e.target.value }))}
                      />
                    </div>
                  </TooltipField>
                  <TooltipField tooltip="When was this project completed?">
                    <div className="space-y-2">
                      <Label htmlFor="end_date" className="flex items-center gap-2">
                        End Date
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </Label>
                      <Input
                        id="end_date"
                        type="date"
                        value={newItem.end_date}
                        onChange={(e) => setNewItem(prev => ({ ...prev, end_date: e.target.value }))}
                      />
                    </div>
                  </TooltipField>
                </div>

                <TooltipField tooltip="Link to source code repository (GitHub, GitLab, etc.)">
                  <div className="space-y-2">
                    <Label htmlFor="project_url" className="flex items-center gap-2">
                      Project URL
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </Label>
                    <Input
                      id="project_url"
                      value={newItem.project_url}
                      onChange={(e) => setNewItem(prev => ({ ...prev, project_url: e.target.value }))}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </TooltipField>

                <TooltipField tooltip="Link to live demo or deployed version">
                  <div className="space-y-2">
                    <Label htmlFor="demo_url" className="flex items-center gap-2">
                      Demo URL
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </Label>
                    <Input
                      id="demo_url"
                      value={newItem.demo_url}
                      onChange={(e) => setNewItem(prev => ({ ...prev, demo_url: e.target.value }))}
                      placeholder="https://demo.project.com"
                    />
                  </div>
                </TooltipField>

                <TooltipField tooltip="Main cover image for portfolio previews">
                  <div className="space-y-2">
                    <Label htmlFor="image_url" className="flex items-center gap-2">
                      Cover Image URL
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </Label>
                    <Input
                      id="image_url"
                      value={newItem.image_url}
                      onChange={(e) => setNewItem(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="https://example.com/project-cover.jpg"
                    />
                  </div>
                </TooltipField>

                <TooltipField tooltip="Keywords and technologies used (separate with commas)">
                  <div className="space-y-2">
                    <Label htmlFor="tags" className="flex items-center gap-2">
                      Tags & Technologies
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </Label>
                    <Input
                      id="tags"
                      value={newItem.tags}
                      onChange={(e) => setNewItem(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="web development, react, typescript, design"
                    />
                  </div>
                </TooltipField>

                <Button onClick={handleCreateItem} className="w-full" size="lg">
                  <Upload className="h-4 w-4 mr-2" />
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

                {/* Rich content preview */}
                {item.rich_content && (
                  <div className="border-t pt-4">
                    <div 
                      className="prose prose-sm max-w-none line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: item.rich_content }}
                    />
                  </div>
                )}
                
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" asChild>
                          <a href={item.project_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View source code</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {item.demo_url && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" asChild>
                          <a href={item.demo_url} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View live demo</p>
                      </TooltipContent>
                    </Tooltip>
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
                <p className="text-muted-foreground mb-4 max-w-md">
                  Create rich, multimedia portfolio items to showcase your completed projects with enhanced documentation, media galleries, and interactive content.
                </p>
                <Button onClick={() => setCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Portfolio Item
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PortfolioManagement;

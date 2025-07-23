import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Info,
  Edit,
  Trash2,
  Tag,
  Image as ImageIcon,
  Link
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  user_id: string;
  title: string;
  description: string;
  rich_content: string | null;
  project_url?: string;
  demo_url?: string;
  image_url?: string;
  approval_status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  published: boolean;
  tags: string[];
  start_date?: string;
  end_date?: string;
  category?: string;
  views: number;
  likes: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const PortfolioManagement = () => {
  const { user } = useAuth();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    rich_content: '',
    project_url: '',
    demo_url: '',
    image_url: '',
    tags: '',
    start_date: '',
    end_date: '',
    category: ''
  });

  useEffect(() => {
    if (user) {
      fetchPortfolioItems();
    }
  }, [user]);

  const fetchPortfolioItems = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolioItems(data?.map(item => ({
        ...item,
        rich_content: typeof item.rich_content === 'string' ? item.rich_content : JSON.stringify(item.rich_content || ''),
        tags: Array.isArray(item.tags) ? item.tags : []
      })) || []);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      toast({
        title: "Error",
        description: "Failed to load portfolio items.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async () => {
    if (!user || !newItem.title) {
      toast({
        title: "Error",
        description: "Title is required.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .insert([
          {
            user_id: user.id,
            title: newItem.title,
            description: newItem.description,
            rich_content: newItem.rich_content,
            project_url: newItem.project_url || null,
            demo_url: newItem.demo_url || null,
            image_url: newItem.image_url || null,
            category: newItem.category || null,
            tags: newItem.tags ? newItem.tags.split(',').map(tag => tag.trim()) : [],
            start_date: newItem.start_date || null,
            end_date: newItem.end_date || null,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Portfolio item submitted for review",
      });

      setCreateDialogOpen(false);
      resetForm();
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

  const handleUpdateItem = async () => {
    if (!editingItem || !newItem.title) {
      toast({
        title: "Error",
        description: "Title is required.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .update({
          title: newItem.title,
          description: newItem.description,
          rich_content: newItem.rich_content,
          project_url: newItem.project_url || null,
          demo_url: newItem.demo_url || null,
          image_url: newItem.image_url || null,
          category: newItem.category || null,
          tags: newItem.tags ? newItem.tags.split(',').map(tag => tag.trim()) : [],
          start_date: newItem.start_date || null,
          end_date: newItem.end_date || null,
        })
        .eq('id', editingItem.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Portfolio item updated successfully",
      });

      setEditingItem(null);
      resetForm();
      fetchPortfolioItems();
    } catch (error) {
      console.error('Error updating portfolio item:', error);
      toast({
        title: "Error",
        description: "Failed to update portfolio item",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Portfolio item deleted successfully",
      });

      fetchPortfolioItems();
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      toast({
        title: "Error",
        description: "Failed to delete portfolio item",
        variant: "destructive",
      });
    }
  };

  const startEditing = (item: PortfolioItem) => {
    setEditingItem(item);
    setNewItem({
      title: item.title,
      description: item.description || '',
      rich_content: item.rich_content || '',
      project_url: item.project_url || '',
      demo_url: item.demo_url || '',
      image_url: item.image_url || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      category: item.category || ''
    });
    setCreateDialogOpen(true);
  };

  const resetForm = () => {
    setNewItem({
      title: '',
      description: '',
      rich_content: '',
      project_url: '',
      demo_url: '',
      image_url: '',
      tags: '',
      start_date: '',
      end_date: '',
      category: ''
    });
  };

  const uploadCoverImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `portfolio-cover-${Date.now()}.${fileExt}`;
      const filePath = `${user?.id}/portfolio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('user-content')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('user-content')
        .getPublicUrl(filePath);

      setNewItem(prev => ({ ...prev, image_url: data.publicUrl }));

      toast({
        title: "Success",
        description: "Cover image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading cover image:', error);
      toast({
        title: "Error",
        description: "Failed to upload cover image",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const TooltipField = ({ tooltip, children }: { tooltip: string; children: React.ReactNode }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Portfolio Management</h2>
          <p className="text-muted-foreground">
            Create and manage your portfolio items for public showcase
          </p>
        </div>

        <Dialog open={createDialogOpen} onOpenChange={(open) => {
          setCreateDialogOpen(open);
          if (!open) {
            setEditingItem(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Portfolio Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Portfolio Item' : 'Create New Portfolio Item'}
              </DialogTitle>
              <DialogDescription>
                {editingItem 
                  ? 'Update your portfolio item details and content.'
                  : 'Add a new portfolio item to showcase your work. Items require approval before being displayed publicly.'
                }
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Rich Content</TabsTrigger>
                <TabsTrigger value="details">Details & Media</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <TooltipField tooltip="Enter a clear, descriptive title for your portfolio item">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={newItem.title}
                          onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="My Amazing Project"
                        />
                      </div>
                    </TooltipField>
                  </div>
                  <div className="space-y-2">
                    <TooltipField tooltip="Select the category that best describes your project">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={newItem.category} onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="web-development">Web Development</SelectItem>
                            <SelectItem value="mobile-app">Mobile App</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="music">Music</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="writing">Writing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TooltipField>
                  </div>
                </div>

                <div className="space-y-2">
                  <TooltipField tooltip="Provide a brief description of your project (this will be shown in card previews)">
                    <div>
                      <Label htmlFor="description">Brief Description</Label>
                      <Textarea
                        id="description"
                        value={newItem.description}
                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="A brief description of your project..."
                        rows={3}
                      />
                    </div>
                  </TooltipField>
                </div>

                <div className="space-y-2">
                  <TooltipField tooltip="Add relevant tags separated by commas (e.g., React, TypeScript, Design)">
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={newItem.tags}
                        onChange={(e) => setNewItem(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="React, TypeScript, Design, API"
                      />
                    </div>
                  </TooltipField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <TooltipField tooltip="When did you start working on this project?">
                      <div>
                        <Label htmlFor="start_date">Start Date</Label>
                        <Input
                          id="start_date"
                          type="date"
                          value={newItem.start_date}
                          onChange={(e) => setNewItem(prev => ({ ...prev, start_date: e.target.value }))}
                        />
                      </div>
                    </TooltipField>
                  </div>
                  <div className="space-y-2">
                    <TooltipField tooltip="When did you complete this project? (leave empty if ongoing)">
                      <div>
                        <Label htmlFor="end_date">End Date</Label>
                        <Input
                          id="end_date"
                          type="date"
                          value={newItem.end_date}
                          onChange={(e) => setNewItem(prev => ({ ...prev, end_date: e.target.value }))}
                        />
                      </div>
                    </TooltipField>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div className="space-y-2">
                  <Label>Rich Content</Label>
                  <p className="text-sm text-muted-foreground">
                    Use the rich text editor to create detailed documentation, add images, videos, code snippets, and more.
                  </p>
                  <RichTextEditor
                    content={newItem.rich_content}
                    onChange={(content) => setNewItem(prev => ({ ...prev, rich_content: content }))}
                    placeholder="Write detailed project documentation, add images, code examples, and more..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <TooltipField tooltip="Upload a cover image for your portfolio item">
                      <div>
                        <Label>Cover Image</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadCoverImage(file);
                            }}
                          />
                          {newItem.image_url && (
                            <img 
                              src={newItem.image_url} 
                              alt="Cover preview" 
                              className="h-16 w-16 object-cover rounded border"
                            />
                          )}
                        </div>
                      </div>
                    </TooltipField>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <TooltipField tooltip="Link to the project repository or source code">
                        <div>
                          <Label htmlFor="project_url">Project URL</Label>
                          <Input
                            id="project_url"
                            value={newItem.project_url}
                            onChange={(e) => setNewItem(prev => ({ ...prev, project_url: e.target.value }))}
                            placeholder="https://github.com/username/project"
                          />
                        </div>
                      </TooltipField>
                    </div>
                    <div className="space-y-2">
                      <TooltipField tooltip="Link to the live demo or deployed version">
                        <div>
                          <Label htmlFor="demo_url">Demo URL</Label>
                          <Input
                            id="demo_url"
                            value={newItem.demo_url}
                            onChange={(e) => setNewItem(prev => ({ ...prev, demo_url: e.target.value }))}
                            placeholder="https://myproject.vercel.app"
                          />
                        </div>
                      </TooltipField>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => {
                  setCreateDialogOpen(false);
                  setEditingItem(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button onClick={editingItem ? handleUpdateItem : handleCreateItem}>
                {editingItem ? 'Update' : 'Create'} Portfolio Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {portfolioItems.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Eye className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No portfolio items yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first portfolio item to showcase your work to the community.
            </p>
            <Button onClick={() => setCreateDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Portfolio Item
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getStatusColor(item.approval_status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(item.approval_status)}
                        {item.approval_status}
                      </div>
                    </Badge>
                  </div>
                </div>
                {item.category && (
                  <Badge variant="outline" className="w-fit text-xs">
                    {item.category}
                  </Badge>
                )}
              </CardHeader>
              
              {item.image_url && (
                <div className="px-6 pb-3">
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-32 object-cover rounded border"
                  />
                </div>
              )}

              <CardContent className="flex-1 pt-0">
                {item.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                    {item.description}
                  </p>
                )}

                {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{item.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {item.views} views
                  </div>
                </div>

                {item.approval_status === 'rejected' && item.rejection_reason && (
                  <div className="bg-red-50 border border-red-200 rounded p-2 mb-3">
                    <p className="text-xs text-red-700">
                      <strong>Rejection reason:</strong> {item.rejection_reason}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    {item.project_url && (
                      <TooltipField tooltip="View source code">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a href={item.project_url} target="_blank" rel="noopener noreferrer">
                            <Link className="h-3 w-3" />
                          </a>
                        </Button>
                      </TooltipField>
                    )}
                    {item.demo_url && (
                      <TooltipField tooltip="View live demo">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a href={item.demo_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </TooltipField>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <TooltipField tooltip="Edit portfolio item">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(item)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </TooltipField>
                    <TooltipField tooltip="Delete portfolio item">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </TooltipField>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioManagement;
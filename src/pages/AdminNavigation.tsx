import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Plus, Eye, EyeOff, GripVertical, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import RichTextEditor from '@/components/RichTextEditor';

interface NavigationItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  position: number;
  visible: boolean;
  is_custom: boolean;
}

interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: any;
  meta_description: string | null;
  published: boolean;
  author_id: string;
  created_at: string;
  updated_at: string;
}

const AdminNavigation = () => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<CustomPage | null>(null);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageDescription, setNewPageDescription] = useState('');
  const [newPageContent, setNewPageContent] = useState('');
  const { toast } = useToast();

  const iconOptions = [
    'Home', 'Info', 'FolderOpen', 'Briefcase', 'Target', 'Users', 'MessageSquare', 'Mail',
    'FileText', 'Settings', 'Star', 'Heart', 'Bookmark', 'Calendar', 'Clock'
  ];

  useEffect(() => {
    fetchNavigationItems();
    fetchCustomPages();
  }, []);

  const fetchNavigationItems = async () => {
    try {
      const { data, error } = await supabase
        .from('navigation_items')
        .select('*')
        .order('position');

      if (error) throw error;
      setNavigationItems(data || []);
    } catch (error) {
      console.error('Error fetching navigation items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch navigation items",
        variant: "destructive",
      });
    }
  };

  const fetchCustomPages = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomPages(data || []);
    } catch (error) {
      console.error('Error fetching custom pages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch custom pages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleItemVisibility = async (id: string, visible: boolean) => {
    try {
      const { error } = await supabase
        .from('navigation_items')
        .update({ visible })
        .eq('id', id);

      if (error) throw error;
      
      setNavigationItems(items =>
        items.map(item => item.id === id ? { ...item, visible } : item)
      );

      toast({
        title: "Success",
        description: `Navigation item ${visible ? 'shown' : 'hidden'}`,
      });
    } catch (error) {
      console.error('Error updating navigation item:', error);
      toast({
        title: "Error",
        description: "Failed to update navigation item",
        variant: "destructive",
      });
    }
  };

  const createCustomPage = async () => {
    if (!newPageTitle || !newPageSlug) {
      toast({
        title: "Error",
        description: "Title and slug are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      // Create the custom page
      const { data: page, error: pageError } = await supabase
        .from('custom_pages')
        .insert({
          title: newPageTitle,
          slug: newPageSlug,
          content: { html: newPageContent },
          meta_description: newPageDescription,
          author_id: user.user.id,
          published: true
        })
        .select()
        .single();

      if (pageError) throw pageError;

      // Create navigation item for the page
      const { error: navError } = await supabase
        .from('navigation_items')
        .insert({
          title: newPageTitle,
          url: `/page/${newPageSlug}`,
          icon: 'FileText',
          position: navigationItems.length + 1,
          visible: true,
          is_custom: true
        });

      if (navError) throw navError;

      toast({
        title: "Success",
        description: "Custom page created successfully",
      });

      setIsCreateDialogOpen(false);
      setNewPageTitle('');
      setNewPageSlug('');
      setNewPageDescription('');
      setNewPageContent('');
      fetchNavigationItems();
      fetchCustomPages();
    } catch (error) {
      console.error('Error creating custom page:', error);
      toast({
        title: "Error",
        description: "Failed to create custom page",
        variant: "destructive",
      });
    }
  };

  const deleteCustomPage = async (pageId: string, slug: string) => {
    try {
      // Delete the navigation item
      await supabase
        .from('navigation_items')
        .delete()
        .eq('url', `/page/${slug}`);

      // Delete the page
      const { error } = await supabase
        .from('custom_pages')
        .delete()
        .eq('id', pageId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Custom page deleted successfully",
      });

      fetchNavigationItems();
      fetchCustomPages();
    } catch (error) {
      console.error('Error deleting custom page:', error);
      toast({
        title: "Error",
        description: "Failed to delete custom page",
        variant: "destructive",
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  if (loading) {
    return (
      <AdminLayout title="Navigation Management" description="Manage site navigation and create custom pages">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Navigation Management" description="Manage site navigation and create custom pages">
      <div className="space-y-8">
        {/* Navigation Items */}
        <Card>
          <CardHeader>
            <CardTitle>Navigation Items</CardTitle>
            <CardDescription>
              Control which navigation items are visible in the main navigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {navigationItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`visible-${item.id}`} className="text-sm">
                        {item.visible ? 'Visible' : 'Hidden'}
                      </Label>
                      <Switch
                        id={`visible-${item.id}`}
                        checked={item.visible}
                        onCheckedChange={(checked) => toggleItemVisibility(item.id, checked)}
                      />
                    </div>
                    {item.visible ? (
                      <Eye className="h-4 w-4 text-green-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-red-500" />
                    )}
                    {item.is_custom && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCustomPage(item.id, item.url.replace('/page/', ''))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Pages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Custom Pages</CardTitle>
              <CardDescription>
                Create and manage custom pages with rich content
              </CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Page
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Create Custom Page</DialogTitle>
                  <DialogDescription>
                    Create a new custom page with rich content
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="page-title">Page Title</Label>
                      <Input
                        id="page-title"
                        value={newPageTitle}
                        onChange={(e) => {
                          setNewPageTitle(e.target.value);
                          setNewPageSlug(generateSlug(e.target.value));
                        }}
                        placeholder="Enter page title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="page-slug">URL Slug</Label>
                      <Input
                        id="page-slug"
                        value={newPageSlug}
                        onChange={(e) => setNewPageSlug(e.target.value)}
                        placeholder="page-url-slug"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="page-description">Meta Description</Label>
                    <Input
                      id="page-description"
                      value={newPageDescription}
                      onChange={(e) => setNewPageDescription(e.target.value)}
                      placeholder="Brief description for SEO"
                    />
                  </div>
                  <div>
                    <Label>Page Content</Label>
                    <div className="mt-2">
                      <RichTextEditor
                        content={newPageContent}
                        onChange={setNewPageContent}
                        placeholder="Write your page content here..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={createCustomPage}>
                      Create Page
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customPages.map((page) => (
                <div key={page.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{page.title}</p>
                    <p className="text-sm text-muted-foreground">/page/{page.slug}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Created: {new Date(page.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      page.published 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {page.published ? 'Published' : 'Draft'}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCustomPage(page.id, page.slug)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {customPages.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No custom pages created yet. Create your first page to get started.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminNavigation;
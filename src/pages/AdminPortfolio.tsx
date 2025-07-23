
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { 
  Search, 
  Eye, 
  EyeOff,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  StarOff,
  ExternalLink,
  Link,
  Calendar,
  User,
  Tag,
  Filter,
  MoreVertical,
  Trash2
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface PortfolioItem {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  rich_content: any;
  project_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  approval_status: string | null;
  rejection_reason: string | null;
  published: boolean | null;
  tags: string[] | null;
  start_date: string | null;
  end_date: string | null;
  category: string | null;
  views: number | null;
  likes: number | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
    username: string | null;
    avatar_url: string | null;
    email: string;
  };
}

const AdminPortfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [featuredFilter, setFeaturedFilter] = useState<string>('all');
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [actionDialog, setActionDialog] = useState<'approve' | 'reject' | null>(null);

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select(`
          *,
          profiles!inner(
            first_name,
            last_name,
            username,
            avatar_url,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const transformedData = data?.map(item => ({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags as string[] : [],
        approval_status: item.approval_status || 'pending',
        views: item.views || 0,
        likes: item.likes || 0,
        featured: item.featured || false,
        published: item.published || false,
        profiles: Array.isArray(item.profiles) ? item.profiles[0] : item.profiles
      })) || [];
      
      setPortfolioItems(transformedData);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      toast({
        title: "Error loading portfolio",
        description: "There was an error loading the portfolio items.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateItemStatus = async (itemId: string, status: 'approved' | 'rejected', reason?: string) => {
    try {
      const updates: any = { 
        approval_status: status,
        published: status === 'approved'
      };
      
      if (status === 'rejected' && reason) {
        updates.rejection_reason = reason;
      } else if (status === 'approved') {
        updates.rejection_reason = null;
      }

      const { error } = await supabase
        .from('portfolio_projects')
        .update(updates)
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Portfolio item has been ${status}.`,
      });

      fetchPortfolioItems();
      setActionDialog(null);
      setRejectionReason('');
      setSelectedItem(null);
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Update failed",
        description: "There was an error updating the portfolio item.",
        variant: "destructive",
      });
    }
  };

  const toggleFeatured = async (itemId: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .update({ featured })
        .eq('id', itemId);

      if (error) throw error;

      setPortfolioItems(prev => 
        prev.map(item => 
          item.id === itemId 
            ? { ...item, featured }
            : item
        )
      );

      toast({
        title: featured ? "Item featured" : "Item unfeatured",
        description: `Portfolio item has been ${featured ? 'added to' : 'removed from'} featured items.`,
      });
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast({
        title: "Update failed",
        description: "There was an error updating the featured status.",
        variant: "destructive",
      });
    }
  };

  const togglePublished = async (itemId: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .update({ published })
        .eq('id', itemId);

      if (error) throw error;

      setPortfolioItems(prev => 
        prev.map(item => 
          item.id === itemId 
            ? { ...item, published }
            : item
        )
      );

      toast({
        title: published ? "Item published" : "Item unpublished",
        description: `Portfolio item is now ${published ? 'visible' : 'hidden'} on the public portfolio.`,
      });
    } catch (error) {
      console.error('Error updating published status:', error);
      toast({
        title: "Update failed",
        description: "There was an error updating the published status.",
        variant: "destructive",
      });
    }
  };

  const deleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Item deleted",
        description: "Portfolio item has been permanently deleted.",
      });

      fetchPortfolioItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting the portfolio item.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.profiles?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.profiles?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.profiles?.username?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.approval_status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesFeatured = featuredFilter === 'all' || 
      (featuredFilter === 'featured' && item.featured) ||
      (featuredFilter === 'not-featured' && !item.featured);

    return matchesSearch && matchesStatus && matchesCategory && matchesFeatured;
  });

  const stats = {
    total: portfolioItems.length,
    pending: portfolioItems.filter(item => item.approval_status === 'pending').length,
    approved: portfolioItems.filter(item => item.approval_status === 'approved').length,
    rejected: portfolioItems.filter(item => item.approval_status === 'rejected').length,
    featured: portfolioItems.filter(item => item.featured).length,
    published: portfolioItems.filter(item => item.published).length,
  };

  if (loading) {
    return (
      <AdminLayout title="Portfolio Management" description="Manage and curate all portfolio submissions">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Portfolio Management" description="Manage and curate all portfolio submissions">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Items</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              <p className="text-xs text-muted-foreground">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.featured}</p>
              <p className="text-xs text-muted-foreground">Featured</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.published}</p>
              <p className="text-xs text-muted-foreground">Published</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="mobile-app">Mobile App</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="featured">Featured Only</SelectItem>
                <SelectItem value="not-featured">Not Featured</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={fetchPortfolioItems}>
              <Filter className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.profiles?.avatar_url || ''} />
                    <AvatarFallback>
                      {item.profiles?.first_name?.[0]}{item.profiles?.last_name?.[0] || item.profiles?.username?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      by {item.profiles?.first_name || item.profiles?.last_name 
                        ? `${item.profiles.first_name || ''} ${item.profiles.last_name || ''}`.trim()
                        : item.profiles?.username || 'Unknown User'
                      }
                    </p>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => deleteItem(item.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Item
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`text-xs ${getStatusColor(item.approval_status)}`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(item.approval_status)}
                    {item.approval_status}
                  </div>
                </Badge>
                
                {item.category && (
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                )}
                
                {item.featured && (
                  <Badge className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
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

            <CardContent className="space-y-4">
              {item.description && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {item.description}
                </p>
              )}

              {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
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

              {item.approval_status === 'rejected' && item.rejection_reason && (
                <div className="bg-red-50 border border-red-200 rounded p-2">
                  <p className="text-xs text-red-700">
                    <strong>Rejection reason:</strong> {item.rejection_reason}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {item.views} views
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t">
                {/* Quick Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.project_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={item.project_url} target="_blank" rel="noopener noreferrer">
                          <Link className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {item.demo_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={item.demo_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFeatured(item.id, !item.featured)}
                    >
                      {item.featured ? <StarOff className="h-3 w-3" /> : <Star className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>

                {/* Status Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={item.published}
                      onCheckedChange={(checked) => togglePublished(item.id, checked)}
                    />
                    <label className="text-xs font-medium">Published</label>
                  </div>
                </div>

                {/* Approval Actions */}
                {item.approval_status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateItemStatus(item.id, 'approved')}
                      className="flex-1"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedItem(item);
                        setActionDialog('reject');
                      }}
                      className="flex-1"
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}

                {item.approval_status !== 'pending' && (
                  <div className="flex gap-2">
                    {item.approval_status === 'rejected' && (
                      <Button
                        size="sm"
                        onClick={() => updateItemStatus(item.id, 'approved')}
                        className="flex-1"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                    )}
                    {item.approval_status === 'approved' && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedItem(item);
                          setActionDialog('reject');
                        }}
                        className="flex-1"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No portfolio items found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find portfolio items.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Rejection Dialog */}
      <Dialog open={actionDialog === 'reject'} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Portfolio Item</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this portfolio item. This will help the user understand what needs to be improved.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="rejection-reason">Rejection Reason</Label>
              <Textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please explain why this item is being rejected..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedItem && rejectionReason.trim()) {
                  updateItemStatus(selectedItem.id, 'rejected', rejectionReason);
                }
              }}
              disabled={!rejectionReason.trim()}
            >
              Reject Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPortfolio;

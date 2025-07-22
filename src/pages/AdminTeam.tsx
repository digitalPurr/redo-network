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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  Users,
  Eye,
  EyeOff,
  Crown,
  Shield,
  User,
  UserPlus
} from 'lucide-react';

interface TeamMember {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  bio?: string;
  job_title?: string;
  skills?: string[];
  avatar_url?: string;
  show_on_team: boolean;
  public_profile: boolean;
  page_published: boolean;
  created_at: string;
  user_roles?: { role: string }[];
}

const AdminTeam: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showOnlyTeamVisible, setShowOnlyTeamVisible] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles(role)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: "Error loading team",
        description: "There was an error loading the team members.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMemberRole = async (memberId: string, newRole: string) => {
    try {
      // First, remove existing roles for this user
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', memberId);

      // Then add the new role
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: memberId,
          role: newRole as any
        });

      if (error) throw error;

      toast({
        title: "Role updated",
        description: "Team member role has been updated successfully.",
      });

      fetchTeamMembers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Update failed",
        description: "There was an error updating the team member role.",
        variant: "destructive",
      });
    }
  };

  const updateMemberVisibility = async (memberId: string, field: 'show_on_team' | 'public_profile', value: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ [field]: value })
        .eq('id', memberId);

      if (error) throw error;

      setTeamMembers(prev => 
        prev.map(member => 
          member.id === memberId 
            ? { ...member, [field]: value }
            : member
        )
      );

      toast({
        title: "Settings updated",
        description: "Team member settings have been updated.",
      });
    } catch (error) {
      console.error('Error updating visibility:', error);
      toast({
        title: "Update failed",
        description: "There was an error updating the settings.",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (roles: { role: string }[] = []) => {
    if (roles.some(r => r.role === 'network-admin')) return Crown;
    if (roles.some(r => r.role === 'project-lead')) return Shield;
    if (roles.some(r => r.role === 'contributor')) return User;
    return UserPlus;
  };

  const getRoleColor = (roles: { role: string }[] = []) => {
    if (roles.some(r => r.role === 'network-admin')) return 'bg-yellow-500';
    if (roles.some(r => r.role === 'project-lead')) return 'bg-blue-500';
    if (roles.some(r => r.role === 'contributor')) return 'bg-green-500';
    return 'bg-gray-500';
  };

  const getPrimaryRole = (roles: { role: string }[] = []) => {
    if (roles.some(r => r.role === 'network-admin')) return 'network-admin';
    if (roles.some(r => r.role === 'project-lead')) return 'project-lead';
    if (roles.some(r => r.role === 'contributor')) return 'contributor';
    return 'viewer';
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${member.first_name || ''} ${member.last_name || ''}`.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || 
      member.user_roles?.some(r => r.role === roleFilter);

    const matchesVisibility = !showOnlyTeamVisible || member.show_on_team;

    return matchesSearch && matchesRole && matchesVisibility;
  });

  if (loading) {
    return (
      <AdminLayout title="Team Management" description="Manage team members, roles, and permissions">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Team Management" description="Manage team members, roles, and permissions">
      {/* Filters and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{teamMembers.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Public Profiles</p>
                <p className="text-2xl font-bold">
                  {teamMembers.filter(m => m.public_profile).length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Page</p>
                <p className="text-2xl font-bold">
                  {teamMembers.filter(m => m.show_on_team).length}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published Pages</p>
                <p className="text-2xl font-bold">
                  {teamMembers.filter(m => m.page_published).length}
                </p>
              </div>
              <Edit className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="network-admin">Network Admin</SelectItem>
                <SelectItem value="project-lead">Project Lead</SelectItem>
                <SelectItem value="contributor">Contributor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Switch
                checked={showOnlyTeamVisible}
                onCheckedChange={setShowOnlyTeamVisible}
              />
              <label className="text-sm">Show on team only</label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMembers.map((member) => {
          const RoleIcon = getRoleIcon(member.user_roles);
          const primaryRole = getPrimaryRole(member.user_roles);
          
          return (
            <Card key={member.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar_url} />
                        <AvatarFallback>
                          {member.first_name?.[0]}{member.last_name?.[0] || member.username?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getRoleColor(member.user_roles)} flex items-center justify-center`}>
                        <RoleIcon className="h-2.5 w-2.5 text-white" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {member.first_name || member.last_name 
                          ? `${member.first_name || ''} ${member.last_name || ''}`.trim()
                          : member.username || 'Unnamed User'
                        }
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                      {member.job_title && (
                        <p className="text-sm text-primary">{member.job_title}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {member.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{member.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <Select
                      value={primaryRole}
                      onValueChange={(value) => updateMemberRole(member.id, value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Viewer</SelectItem>
                        <SelectItem value="contributor">Contributor</SelectItem>
                        <SelectItem value="project-lead">Project Lead</SelectItem>
                        <SelectItem value="network-admin">Network Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Show on Team</label>
                    <Switch
                      checked={member.show_on_team}
                      onCheckedChange={(checked) => 
                        updateMemberVisibility(member.id, 'show_on_team', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Public Profile</label>
                    <Switch
                      checked={member.public_profile}
                      onCheckedChange={(checked) => 
                        updateMemberVisibility(member.id, 'public_profile', checked)
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-2">
                    {member.page_published ? (
                      <Eye className="h-4 w-4 text-green-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {member.page_published ? 'Page Published' : 'Page Draft'}
                    </span>
                  </div>
                  
                  {member.username && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a
                        href={`/team/${member.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Page
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No members found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find team members.
            </p>
          </CardContent>
        </Card>
      )}
    </AdminLayout>
  );
};

export default AdminTeam;
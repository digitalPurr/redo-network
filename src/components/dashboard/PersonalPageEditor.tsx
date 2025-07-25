import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import RichTextEditor from '@/components/RichTextEditor';
import { 
  Github, 
  Twitter, 
  Instagram, 
  Youtube, 
  Music, 
  Globe, 
  Plus, 
  X,
  Save,
  Eye,
  EyeOff,
  Upload,
  User,
  Link as LinkIcon,
  Shield
} from 'lucide-react';

interface Profile {
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
  page_content?: any;
  page_slug?: string;
  page_published: boolean;
  github_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  soundcloud_url?: string;
  portfolio_url?: string;
  page_header_image?: string;
  page_description?: string;
}

const PersonalPageEditor = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingHeader, setUploadingHeader] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setPageContent(typeof data.page_content === 'string' ? data.page_content : '');
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error loading profile",
        description: "There was an error loading your profile data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkUsernameAvailability = async (username: string) => {
    if (!username || username === profile?.username) {
      setUsernameAvailable(null);
      return;
    }

    setCheckingUsername(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();

      setUsernameAvailable(!data);
    } catch (error) {
      setUsernameAvailable(true);
    } finally {
      setCheckingUsername(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return;

    setUploadingAvatar(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('user-content')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('user-content')
        .getPublicUrl(filePath);

      await updateProfile({ avatar_url: data.publicUrl });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your avatar.",
        variant: "destructive",
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const uploadHeaderImage = async (file: File) => {
    if (!user) return;

    setUploadingHeader(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `header-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/headers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('user-content')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('user-content')
        .getPublicUrl(filePath);

      await updateProfile({ page_header_image: data.publicUrl });
    } catch (error) {
      console.error('Error uploading header image:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your header image.",
        variant: "destructive",
      });
    } finally {
      setUploadingHeader(false);
    }
  };

  const handleFileUpload = (type: 'avatar' | 'header') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (type === 'avatar') {
          uploadAvatar(file);
        } else {
          uploadHeaderImage(file);
        }
      }
    };
    input.click();
  };

  const addSkill = () => {
    if (newSkill.trim() && profile) {
      const updatedSkills = [...(profile.skills || []), newSkill.trim()];
      updateProfile({ skills: updatedSkills });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    if (profile) {
      const updatedSkills = profile.skills?.filter(skill => skill !== skillToRemove) || [];
      updateProfile({ skills: updatedSkills });
    }
  };

  const savePageContent = () => {
    updateProfile({ page_content: pageContent });
  };

  const generateSlug = (username?: string) => {
    if (username && username !== profile?.page_slug) {
      updateProfile({ page_slug: username.toLowerCase().replace(/[^a-z0-9]/g, '-') });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Personal Page Editor</h2>
        <p className="text-muted-foreground">
          Create and customize your personal page with rich content and media
        </p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            Social Links
          </TabsTrigger>
          <TabsTrigger value="page" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Page Content
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Update your personal details and skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback>
                    {profile.first_name?.[0]}{profile.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="outline" 
                  onClick={() => handleFileUpload('avatar')}
                  disabled={uploadingAvatar}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploadingAvatar ? 'Uploading...' : 'Change Avatar'}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username *</Label>
                  <div className="relative">
                    <Input
                      id="username"
                      value={profile.username || ''}
                      onChange={(e) => {
                        setProfile(prev => prev ? {...prev, username: e.target.value} : null);
                        checkUsernameAvailability(e.target.value);
                      }}
                      onBlur={() => {
                        if (profile.username) {
                          updateProfile({ username: profile.username });
                          generateSlug(profile.username);
                        }
                      }}
                      placeholder="your-username"
                    />
                    {checkingUsername && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      </div>
                    )}
                  </div>
                  {usernameAvailable === false && (
                    <p className="text-sm text-destructive mt-1">Username is already taken</p>
                  )}
                  {usernameAvailable === true && (
                    <p className="text-sm text-green-600 mt-1">Username is available</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="job_title">Job Title</Label>
                  <Input
                    id="job_title"
                    value={profile.job_title || ''}
                    onChange={(e) => setProfile(prev => prev ? {...prev, job_title: e.target.value} : null)}
                    onBlur={() => updateProfile({ job_title: profile.job_title })}
                    placeholder="Your role or profession"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={profile.first_name || ''}
                    onChange={(e) => setProfile(prev => prev ? {...prev, first_name: e.target.value} : null)}
                    onBlur={() => updateProfile({ first_name: profile.first_name })}
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={profile.last_name || ''}
                    onChange={(e) => setProfile(prev => prev ? {...prev, last_name: e.target.value} : null)}
                    onBlur={() => updateProfile({ last_name: profile.last_name })}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio || ''}
                  onChange={(e) => setProfile(prev => prev ? {...prev, bio: e.target.value} : null)}
                  onBlur={() => updateProfile({ bio: profile.bio })}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>
                Connect your social media and portfolio links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="github_url" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Label>
                  <Input
                    id="github_url"
                    value={profile.github_url || ''}
                    onChange={(e) => setProfile(prev => prev ? {...prev, github_url: e.target.value} : null)}
                    onBlur={() => updateProfile({ github_url: profile.github_url })}
                    placeholder="https://github.com/username"
                  />
                </div>

                <div>
                  <Label htmlFor="twitter_url" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    Twitter/X
                  </Label>
                  <Input
                    id="twitter_url"
                    value={profile.twitter_url || ''}
                    onChange={(e) => setProfile(prev => prev ? {...prev, twitter_url: e.target.value} : null)}
                    onBlur={() => updateProfile({ twitter_url: profile.twitter_url })}
                    placeholder="https://twitter.com/username"
                  />
                </div>

                <div>
                  <Label htmlFor="youtube_url" className="flex items-center gap-2">
                    <Youtube className="h-4 w-4" />
                    YouTube
                  </Label>
                  <Input
                    id="youtube_url"
                    value={profile.youtube_url || ''}
                    onChange={(e) => setProfile(prev => prev ? {...prev, youtube_url: e.target.value} : null)}
                    onBlur={() => updateProfile({ youtube_url: profile.youtube_url })}
                    placeholder="https://youtube.com/c/channel"
                  />
                </div>

                <div>
                  <Label htmlFor="soundcloud_url" className="flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    SoundCloud
                  </Label>
                  <Input
                    id="soundcloud_url"
                    value={profile.soundcloud_url || ''}
                    onChange={(e) => setProfile(prev => prev ? {...prev, soundcloud_url: e.target.value} : null)}
                    onBlur={() => updateProfile({ soundcloud_url: profile.soundcloud_url })}
                    placeholder="https://soundcloud.com/username"
                  />
                </div>

                <div>
                  <Label htmlFor="instagram_url" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram_url"
                    value={profile.instagram_url || ''}
                    onChange={(e) => setProfile(prev => prev ? {...prev, instagram_url: e.target.value} : null)}
                    onBlur={() => updateProfile({ instagram_url: profile.instagram_url })}
                    placeholder="https://instagram.com/username"
                  />
                </div>

                <div>
                  <Label htmlFor="portfolio_url" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Portfolio/Website
                  </Label>
                  <Input
                    id="portfolio_url"
                    value={profile.portfolio_url || ''}
                    onChange={(e) => setProfile(prev => prev ? {...prev, portfolio_url: e.target.value} : null)}
                    onBlur={() => updateProfile({ portfolio_url: profile.portfolio_url })}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="page">
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
              <CardDescription>
                Create your personal page with rich content, images, and embeds. Changes are auto-saved.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Page URL</Label>
                  <p className="text-sm text-muted-foreground">
                    {window.location.origin}/team/{profile.page_slug || profile.username || 'your-username'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={profile.page_published}
                    onCheckedChange={(checked) => updateProfile({ page_published: checked })}
                  />
                  <Label className="flex items-center gap-2">
                    {profile.page_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    {profile.page_published ? 'Published' : 'Draft'}
                  </Label>
                </div>
              </div>

              <div>
                <Label>Header Image</Label>
                <div className="flex items-center space-x-4">
                  {profile.page_header_image && (
                    <div className="w-32 h-20 rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={profile.page_header_image} 
                        alt="Page header" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={() => handleFileUpload('header')}
                    disabled={uploadingHeader}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadingHeader ? 'Uploading...' : 'Upload Header Image'}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="page_description">Page Description</Label>
                <Textarea
                  id="page_description"
                  value={profile.page_description || ''}
                  onChange={(e) => setProfile(prev => prev ? {...prev, page_description: e.target.value} : null)}
                  onBlur={() => updateProfile({ page_description: profile.page_description })}
                  placeholder="A short description of your personal page"
                  rows={3}
                />
              </div>

              <div>
                <Label>Page Content</Label>
                <RichTextEditor
                  content={pageContent}
                  onChange={setPageContent}
                  placeholder="Create your personal page with rich content, images, videos, and more..."
                  enableAutoSave={true}
                  profileId={profile.id}
                />
              </div>

              <Button onClick={savePageContent} disabled={saving} variant="outline">
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Now'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control who can see your profile and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show on Team Page</Label>
                  <p className="text-sm text-muted-foreground">
                    Display your profile on the public team page
                  </p>
                </div>
                <Switch
                  checked={profile.show_on_team}
                  onCheckedChange={(checked) => updateProfile({ show_on_team: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Public Profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your profile accessible to everyone
                  </p>
                </div>
                <Switch
                  checked={profile.public_profile}
                  onCheckedChange={(checked) => updateProfile({ public_profile: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonalPageEditor;

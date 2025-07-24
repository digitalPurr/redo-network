import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Github, 
  Twitter, 
  Instagram, 
  Youtube, 
  Music, 
  Globe,
  Eye,
  Calendar
} from 'lucide-react';

interface UserProfile {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  job_title?: string;
  skills?: string[];
  avatar_url?: string;
  page_content?: any;
  page_published: boolean;
  github_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  soundcloud_url?: string;
  portfolio_url?: string;
  created_at: string;
  page_header_image?: string;
  page_description?: string;
}

interface Project {
  id: string;
  title: string;
  description?: string;
  category?: string;
  status: string;
  image_url?: string;
  demo_url?: string;
  project_url?: string;
}

const UserPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (username) {
      fetchUserProfile();
      incrementPageViews();
    }
  }, [username]);

  const fetchUserProfile = async () => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .or(`username.eq.${username},page_slug.eq.${username}`)
        .eq('public_profile', true)
        .eq('page_published', true)
        .single();

      if (profileError) throw profileError;

      setProfile(profileData);
      setViews(profileData.page_views || 0);

      // Fetch user's projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('project_members')
        .select(`
          projects (
            id,
            title,
            description,
            category,
            status,
            image_url,
            demo_url,
            project_url
          )
        `)
        .eq('user_id', profileData.id);

      if (!projectsError && projectsData) {
        const userProjects = projectsData
          .map(pm => pm.projects)
          .filter(Boolean) as any[];
        setProjects(userProjects);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementPageViews = async () => {
    try {
      // Simple update to increment page views
      const { error } = await supabase
        .from('profiles')
        .update({ page_views: (views || 0) + 1 })
        .or(`username.eq.${username},page_slug.eq.${username}`);

      if (error) {
        console.error('Error updating page views:', error);
      }
    } catch (error) {
      console.error('Error incrementing page views:', error);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github': return Github;
      case 'twitter': return Twitter;
      case 'instagram': return Instagram;
      case 'youtube': return Youtube;
      case 'soundcloud': return Music;
      case 'portfolio': return Globe;
      default: return Globe;
    }
  };

  const renderPageContent = (content: any) => {
    if (!content || typeof content !== 'string') return null;
    
    return (
      <div 
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen relative">
        <GenerativeBackground />
        <Header />
        <main className="pt-20 p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">User Not Found</h1>
            <p className="text-muted-foreground">
              The user page you're looking for doesn't exist or is not public.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const socialLinks = [
    { platform: 'github', url: profile.github_url },
    { platform: 'twitter', url: profile.twitter_url },
    { platform: 'youtube', url: profile.youtube_url },
    { platform: 'soundcloud', url: profile.soundcloud_url },
    { platform: 'instagram', url: profile.instagram_url },
    { platform: 'portfolio', url: profile.portfolio_url },
  ].filter(link => link.url);

  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <Header />
      
      <main className="pt-20 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="mb-8">
            <Card className="overflow-hidden">
              {/* Header Image */}
              {profile.page_header_image && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={profile.page_header_image} 
                    alt={`${profile.username}'s header`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              )}
              
              <CardContent className={`p-8 ${profile.page_header_image ? '-mt-12 relative z-10' : ''}`}>
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar_url} />
                    <AvatarFallback className="text-lg">
                      {profile.first_name?.[0]}{profile.last_name?.[0] || profile.username?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="mb-4">
                      <h1 className="text-3xl font-bold text-foreground mb-2">
                        {profile.first_name || profile.last_name 
                          ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
                          : `@${profile.username}`
                        }
                      </h1>
                      {(profile.first_name || profile.last_name) && (
                        <p className="text-lg text-muted-foreground">@{profile.username}</p>
                      )}
                      {profile.job_title && (
                        <p className="text-primary font-medium">{profile.job_title}</p>
                      )}
                    </div>

                    {profile.bio && (
                      <p className="text-muted-foreground mb-4">{profile.bio}</p>
                    )}

                    {profile.page_description && (
                      <p className="text-sm text-muted-foreground mb-4 italic">{profile.page_description}</p>
                    )}

                    {profile.skills && profile.skills.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {new Date(profile.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {views} views
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map(({ platform, url }) => {
                        const Icon = getSocialIcon(platform);
                        return (
                          <Button
                            key={platform}
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Icon className="h-4 w-4" />
                              {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </a>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      {project.image_url && (
                        <div className="mb-4">
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        {project.category && (
                          <Badge variant="outline">{project.category}</Badge>
                        )}
                        <div className="flex gap-2">
                          {project.demo_url && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                                Demo
                              </a>
                            </Button>
                          )}
                          {project.project_url && (
                            <Button size="sm" asChild>
                              <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                                View Project
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Custom Page Content */}
          {profile.page_content && (
            <div className="mb-8">
              <Card>
                <CardContent className="p-8">
                  {renderPageContent(profile.page_content)}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserPage;
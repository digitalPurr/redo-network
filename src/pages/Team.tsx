import React, { useEffect, useState } from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Globe, Loader2, ExternalLink, Youtube, Instagram, Music } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimatedWavesTopOne } from '@/components/waves/AnimatedWavesTopOne';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  bio: string | null;
  job_title: string | null;
  avatar_url: string | null;
  skills: string[] | null;
  github_url: string | null;
  twitter_url: string | null;
  portfolio_url: string | null;
  page_slug: string | null;
  page_published: boolean | null;
  youtube_url: string | null;
  instagram_url: string | null;
  soundcloud_url: string | null;
}

const Team = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('show_on_team', true)
        .eq('public_profile', true)
        .order('created_at');

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDisplayName = (profile: Profile) => {
    if (profile.first_name || profile.last_name) {
      return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    }
    return profile.username || 'Anonymous';
  };

  const getInitials = (profile: Profile) => {
    const name = getDisplayName(profile);
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <GenerativeBackground />
        <Header />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <div className="fixed top-0 left-0 right-0 overflow-hidden pointer-events-none z-0">
        <AnimatedWavesTopOne />
      </div>
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">Our Network</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the talented individuals who make RE:DO NETWORK a space for connection, 
              creativity, and collaborative growth.
            </p>
          </div>

          {profiles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No team members are currently showcased. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profiles.map((profile) => (
                <Card key={profile.id} className="bg-card/50 backdrop-blur-sm border-border/20 hover:bg-card/70 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={profile.avatar_url || undefined} />
                        <AvatarFallback className="text-lg font-semibold">
                          {getInitials(profile)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {getDisplayName(profile)}
                      </h3>
                      
                      {profile.job_title && (
                        <p className="text-sm text-primary font-medium mb-3">
                          {profile.job_title}
                        </p>
                      )}
                      
                      {profile.bio && (
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                          {profile.bio}
                        </p>
                      )}
                      
                      {profile.skills && profile.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4 justify-center">
                          {profile.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {profile.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{profile.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      {/* Personal Page Link */}
                      {profile.page_published && (profile.page_slug || profile.username) && (
                        <div className="mb-4 w-full">
                          <Button 
                            asChild 
                            variant="outline" 
                            size="sm" 
                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          >
                            <a href={`/team/${profile.page_slug || profile.username}`}>
                              <ExternalLink size={14} className="mr-2" />
                              View Profile
                            </a>
                          </Button>
                        </div>
                      )}
                      
                      {/* Social Links */}
                      <div className="flex flex-wrap gap-3 justify-center">
                        {profile.github_url && (
                          <a
                            href={profile.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-md"
                            title="GitHub"
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {profile.twitter_url && (
                          <a
                            href={profile.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-md"
                            title="Twitter"
                          >
                            <Twitter size={18} />
                          </a>
                        )}
                        {profile.portfolio_url && (
                          <a
                            href={profile.portfolio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-md"
                            title="Portfolio"
                          >
                            <Globe size={18} />
                          </a>
                        )}
                        {profile.youtube_url && (
                          <a
                            href={profile.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-md"
                            title="YouTube"
                          >
                            <Youtube size={18} />
                          </a>
                        )}
                        {profile.instagram_url && (
                          <a
                            href={profile.instagram_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-md"
                            title="Instagram"
                          >
                            <Instagram size={18} />
                          </a>
                        )}
                        {profile.soundcloud_url && (
                          <a
                            href={profile.soundcloud_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-md"
                            title="SoundCloud"
                          >
                            <Music size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;

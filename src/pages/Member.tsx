import React, { useEffect, useState } from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Twitter, Globe, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
}

const Member = () => {
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
                <Card key={profile.id} className="bg-card/50 backdrop-blur-sm border-border/20 hover:bg-card/70 transition-all duration-300">
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
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {profile.bio}
                        </p>
                      )}
                      
                      {profile.skills && profile.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {profile.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {profile.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{profile.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      <div className="flex space-x-3">
                        {profile.github_url && (
                          <a
                            href={profile.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Github size={20} />
                          </a>
                        )}
                        {profile.twitter_url && (
                          <a
                            href={profile.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Twitter size={20} />
                          </a>
                        )}
                        {profile.portfolio_url && (
                          <a
                            href={profile.portfolio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Globe size={20} />
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

export default Member;
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Youtube, Music, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface PersonalPageCardProps {
  username: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  pageDescription?: string;
  pageHeaderImage?: string;
  avatarUrl?: string;
  skills?: string[];
  githubUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  soundcloudUrl?: string;
  portfolioUrl?: string;
  animationDelay?: number;
}

const PersonalPageCard: React.FC<PersonalPageCardProps> = ({
  username,
  firstName,
  lastName,
  jobTitle,
  pageDescription,
  pageHeaderImage,
  avatarUrl,
  skills = [],
  githubUrl,
  twitterUrl,
  instagramUrl,
  youtubeUrl,
  soundcloudUrl,
  portfolioUrl,
  animationDelay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), animationDelay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [animationDelay]);

  const displayName = firstName && lastName ? `${firstName} ${lastName}` : username;
  const socialLinks = [
    { url: githubUrl, icon: Github, label: 'GitHub' },
    { url: twitterUrl, icon: Twitter, label: 'Twitter' },
    { url: instagramUrl, icon: Instagram, label: 'Instagram' },
    { url: youtubeUrl, icon: Youtube, label: 'YouTube' },
    { url: soundcloudUrl, icon: Music, label: 'SoundCloud' },
    { url: portfolioUrl, icon: Globe, label: 'Portfolio' },
  ].filter(link => link.url);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <Link to={`/team/${username}`}>
        <Card 
          className={`group cursor-pointer overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 ${
            isHovered ? 'transform scale-[1.02] shadow-lg shadow-primary/10' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Header Image */}
          <div className="relative h-32 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
            {pageHeaderImage ? (
              <img 
                src={pageHeaderImage} 
                alt={`${displayName}'s page header`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          <CardContent className="p-6 -mt-6 relative z-10">
            {/* Avatar and Basic Info */}
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-16 w-16 ring-4 ring-background">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {firstName?.[0]}{lastName?.[0] || username?.[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                  {displayName}
                </h3>
                {jobTitle && (
                  <p className="text-sm text-muted-foreground mb-1">{jobTitle}</p>
                )}
                <p className="text-xs text-muted-foreground">@{username}</p>
              </div>
            </div>

            {/* Description */}
            {pageDescription && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {pageDescription}
              </p>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {skills.slice(0, 3).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs px-2 py-1"
                  >
                    {skill}
                  </Badge>
                ))}
                {skills.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    +{skills.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3 pt-2 border-t border-border/50">
                {socialLinks.slice(0, 4).map(({ icon: Icon, url, label }, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    aria-label={label}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
                {socialLinks.length > 4 && (
                  <span className="text-xs text-muted-foreground">
                    +{socialLinks.length - 4}
                  </span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default PersonalPageCard;
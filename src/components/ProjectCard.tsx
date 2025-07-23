import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Play, Pause } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  demoUrl?: string;
  projectUrl?: string;
  interactive?: boolean;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  category,
  imageUrl,
  demoUrl,
  projectUrl,
  interactive = false,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInteraction = () => {
    if (interactive) {
      setIsPlaying(!isPlaying);
      
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(15);
      }
    }
  };

  const handleHover = (hovered: boolean) => {
    setIsHovered(hovered);
    
    // Subtle haptic feedback on hover
    if (hovered && 'vibrate' in navigator) {
      navigator.vibrate(5);
    }
  };

  return (
    <Card 
      ref={cardRef}
      className={`
        group relative overflow-hidden bg-gradient-card border-border/50 
        transition-all duration-500 ease-spring hover:shadow-card hover:scale-[1.02]
        ${isInView ? '' : ''}
        ${className}
      `}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Interactive Demo Area */}
      <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted/50">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary/40" />
              </div>
              <p className="text-sm text-muted-foreground">{category}</p>
            </div>
          </div>
        )}
        
        {/* Interactive Play Button */}
        {interactive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="hero"
              size="icon"
              onClick={handleInteraction}
              className={`
                transition-all duration-300 
                ${isHovered ? 'scale-110 opacity-100' : 'scale-90 opacity-70'}
                ${isPlaying ? 'bg-accent text-accent-foreground' : ''}
              `}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <div className="px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-xs font-medium">
            {category}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {demoUrl && (
            <Button 
              variant="creative" 
              size="sm"
              className="flex-1"
              onClick={() => window.open(demoUrl, '_blank')}
            >
              <Play className="h-4 w-4" />
              Demo
            </Button>
          )}
          {projectUrl && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1"
              onClick={() => window.open(projectUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              View Project
            </Button>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={`
        absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
        transition-opacity duration-500 pointer-events-none
        bg-gradient-to-r from-primary/10 via-transparent to-accent/10
      `} />
    </Card>
  );
};
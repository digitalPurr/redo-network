import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Twitter } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: "dirtnoise",
      role: "Creative Director & Lead Developer",
      bio: "Visionary technologist pushing the boundaries of digital art and collaborative creation.",
      skills: ["Creative Direction", "Full-Stack Development", "AI Integration", "WebGL"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      links: {
        github: "#",
        twitter: "#",
        portfolio: "#"
      }
  ];

  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <Header />
      
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Our Team
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meet the creative minds behind 「RE:DO NETWORK」—a diverse collective 
              of technologists, artists, and visionaries.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className={`
                  group p-6 bg-gradient-card border-border/50 hover:shadow-card 
                  transition-all duration-500 hover:scale-105
                  animate-in slide-in-from-bottom-8 duration-700 [animation-delay:${index * 100}ms]
                `}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-primary p-1">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <a
                      href={member.links.github}
                      className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href={member.links.twitter}
                      className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href={member.links.portfolio}
                      className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Team;
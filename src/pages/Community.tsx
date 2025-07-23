import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { AnimatedWavesBlue } from '@/components/waves/AnimatedWavesBlue';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedWavesPurple } from '@/components/waves/AnimatedWavesPurple';
import { CornerWaves } from '@/components/CornerWaves';
import { Heart, Users, Eye, Shield, Sprout, MessageCircle, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Community = () => {
  const values = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Intentionality",
      description: "We build slowly, deliberately, and without pressure to perform. Every channel, every post, every feature exists on purpose."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Mutuality", 
      description: "This isn't an audience—it's a collaboration. Everyone's voice matters, and no one builds alone here."
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Transparency",
      description: "We share how we work. We talk about what's changing. No behind-the-curtain nonsense."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Non-Extractive Culture",
      description: "This space isn't for clout-farming or recruiting people into unpaid labor. We connect because we want to, not because we need something."
    },
    {
      icon: <Sprout className="h-6 w-6" />,
      title: "Gentle Accountability",
      description: "We hold each other with kindness, not pressure. You're allowed to rest. You're allowed to try again."
    }
  ];

  const beliefs = [
    "Everyone deserves another shot.",
    "We uplift process over perfection.",
    "Emotional safety and human-sized spaces come first.",
    "Conflict happens. We hold space for dialogue, not debate.",
    "Creativity is healing, not a hustle.",
    "This is not content. This is connection."
  ];

  const communityChannels = [
    {
      name: "#introductions",
      description: "Share who you are, what you're working on, and what brought you here",
      activity: "high"
    },
    {
      name: "#creative-process",
      description: "Behind-the-scenes glimpses, work-in-progress shares, and process discussion",
      activity: "medium"
    },
    {
      name: "#collaboration-corner",
      description: "Find collaborators, share opportunities, and coordinate projects",
      activity: "medium"
    },
    {
      name: "#resource-sharing",
      description: "Tools, tutorials, inspiration, and helpful links for creators",
      activity: "low"
    },
    {
      name: "#reflection-space",
      description: "Thoughtful discussion about creativity, community, and digital culture",
      activity: "low"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <div className="fixed bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <AnimatedWavesPurple rotation={270} />
      </div>
      <CornerWaves position="top-right" variant="purple-teal" size="small" />
      <AnimatedWavesBlue />
      <Header />
      
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-20">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Community
              </span>
              <br />
              <span className="text-foreground">Ethos</span>
            </h1>
            <div className="space-y-4">
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                We are a second chance space.
              </p>
              <p className="text-lg text-muted-foreground italic">
                For projects. For people. For possibilities.
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mb-20">
            <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                We are building the internet we actually want—inspired by the web of yesterday, 
                forged by us today. A living code rooted in reflection and reborn through action.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We're not just here to rebuild what we lost. We're here to imagine something better.
                A foundation for human-sized spaces where creativity is healing, not a hustle.
              </p>
            </Card>
          </div>

          {/* Values Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="p-6 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500 hover:scale-105"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Channels */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Community Spaces
            </h2>
            <div className="space-y-4">
              {communityChannels.map((channel, index) => (
                <Card key={index} className="p-6 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">{channel.name}</h3>
                        <Badge variant={channel.activity === 'high' ? 'default' : channel.activity === 'medium' ? 'secondary' : 'outline'}>
                          {channel.activity} activity
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* What We Believe */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              What We Believe
            </h2>
            <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500">
              <div className="space-y-4">
                {beliefs.map((belief, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <p className="text-foreground leading-relaxed">{belief}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Join Community CTA */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Ready to Join Our Community?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Connect with like-minded creators in our Discord server. 
                Share your work, find collaborators, and be part of building the internet we actually want.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white">
                  <LinkIcon className="mr-2 h-5 w-5" />
                  Join Discord Server
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/team">
                    Meet the Team
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;

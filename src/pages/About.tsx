
import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Heart, Users, Eye, Shield, Seedling } from 'lucide-react';

const About = () => {
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
      icon: <Seedling className="h-6 w-6" />,
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

  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <Header />
      
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-20">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                About
              </span>
              <br />
              <span className="text-foreground">RE:DO NETWORK</span>
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
                  className={`
                    p-6 bg-gradient-card border-border/50 hover:shadow-card 
                    transition-all duration-500 hover:scale-105
                    animate-in slide-in-from-bottom-8 duration-700 [animation-delay:${index * 100}ms]
                  `}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground mb-4 group-hover:shadow-glow transition-all duration-300">
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

          {/* Philosophy */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                The RE:DO Philosophy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                "RE:DO" represents our commitment to gentle iteration. Every project, 
                every collaboration, every creative endeavor is an opportunity to reflect, 
                reconnect, and reimagine.
              </p>
              <p className="text-muted-foreground leading-relaxed italic">
                This isn't the internet we were handed. This is the one we're making—with care.
                You're not late. You're right on time.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;

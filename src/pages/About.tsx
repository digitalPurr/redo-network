import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { SimpleBottomWave } from '@/components/waves/SimpleBottomWave';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProtocolHeader } from '@/components/ethos/ProtocolHeader';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// About page - redesigned for unique content and improved UX
const About = () => {
  const navigate = useNavigate();
  
  const platformFeatures = [
    { icon: "◆", title: "Collaborative Multimedia Platform", desc: "Create, share, and iterate on multimedia projects together" },
    { icon: "◇", title: "Discord Integration", desc: "Real-time communication and community building" },
    { icon: "◆", title: "Portfolio Showcase", desc: "Curated project galleries and personal creative spaces" },
    { icon: "◇", title: "Rich Content Editor", desc: "Advanced tools for multimedia storytelling" },
    { icon: "◆", title: "Second-Chance Philosophy", desc: "A space where projects and people get another shot" },
    { icon: "◇", title: "Human-Sized Community", desc: "Intentional connection over performative metrics" }
  ];

  const milestones = [
    { year: "2024", event: "⌈RE⁝DO⌋ Network Foundation", detail: "Born from the ashes of digital burnout" },
    { year: "2024", event: "Community Ethos Established", detail: "Living code for intentional connection" },
    { year: "2024", event: "Platform Alpha Launch", detail: "First collaborative multimedia experiments" },
    { year: "Present", event: "Growing Collective", detail: "Building the web we actually want" }
  ];

  const communityStats = [
    { label: "Active Creators", value: "Growing", icon: "◆" },
    { label: "Projects RE:DONE", value: "∞", icon: "◇" },
    { label: "Community Focus", value: "Human-Sized", icon: "◆" },
    { label: "Philosophy", value: "Second Chances", icon: "◇" }
  ];

  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <div className="fixed bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <SimpleBottomWave />
      </div>
      <Header />
      
      <main className="relative z-10 pt-20 px-4 max-w-6xl mx-auto pb-20">
          
        {/* System Log Header */}
        <Card className="mb-8 bg-gradient-to-r from-card/90 to-card/70 backdrop-blur-sm border-2 border-primary/30 shadow-glow">
          <div className="p-6 font-mono text-sm">
            <div className="text-primary/80 mb-4">
              <div className="flex items-center justify-end gap-2 mb-2">
                <span className="text-accent">⇱</span>
                <span>COLLABORATIVE MULTIMEDIA PLATFORM</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-accent">⇲</span>
                <span>SYSTEM OVERVIEW ⌈RE⁝DO⌋ NETWORK</span>
              </div>
            </div>
            
            <Separator className="my-6 bg-primary/20" />
            
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                ABOUT ⌈RE⁝DO⌋ NETWORK
              </h1>
              <p className="text-xl text-accent italic">
                【A Second-Chance Space for Digital Creators】
              </p>
              <p className="text-muted-foreground">
                ⩤ Where Projects, People & Possibilities Get Another Shot ⩥
              </p>
            </div>
          </div>
        </Card>

        {/* Origin Story Card */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-l-4 border-l-primary">
          <div className="p-8">
            <ProtocolHeader 
              title="ORIGIN STORY ≣ WHY WE EXIST"
              subtitle="Born from digital burnout, built for human connection"
            />
            
            <div className="space-y-6 text-center max-w-4xl mx-auto">
              <div className="space-y-4">
                <p className="text-lg">
                  <span className="text-accent">◆</span>
                  <span className="ml-2">We started with a simple question: What if the internet felt human again?</span>
                </p>
                <p className="text-lg">
                  <span className="text-accent">◇</span>
                  <span className="ml-2">After years of social media fatigue and performative networking, we chose to build something different.</span>
                </p>
                <p className="text-lg font-medium">
                  <span className="text-accent">◆</span>
                  <span className="ml-2">⌈RE⁝DO⌋ Network is our answer—a collaborative multimedia platform where creativity thrives without competition.</span>
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Platform Features Card */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-l-4 border-l-accent">
          <div className="p-8">
            <ProtocolHeader 
              title="PLATFORM FEATURES ≣ WHAT WE OFFER"
              subtitle="Tools for intentional creation and connection"
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              {platformFeatures.map((feature, index) => (
                <div key={index} className="bg-card/60 p-6 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-3">
                    <span className="text-accent text-xl font-bold mt-1">{feature.icon}</span>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Community Overview Card */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border border-primary/30">
          <div className="p-8">
            <ProtocolHeader 
              title="COMMUNITY OVERVIEW ≣ OUR COLLECTIVE"
              subtitle="Human-sized spaces for meaningful collaboration"
            />
            
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    <span className="text-accent mr-1">{stat.icon}</span>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-8 bg-primary/20" />
            
            <div className="text-center space-y-4">
              <p className="text-lg">
                <span className="text-accent">◆</span>
                <span className="ml-2">We're not building for scale—we're building for connection.</span>
              </p>
              <p className="text-lg">
                <span className="text-accent">◇</span>
                <span className="ml-2">Every creator matters. Every project deserves a second chance.</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Timeline Card */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-l-4 border-l-primary">
          <div className="p-8">
            <ProtocolHeader 
              title="TIMELINE ≣ OUR JOURNEY"
              subtitle="Key moments in building the web we want"
            />
            
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-4 text-center md:text-left">
                  <div className="flex-shrink-0 w-20 text-accent font-bold font-mono">
                    {milestone.year}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-primary mb-1">{milestone.event}</h3>
                    <p className="text-muted-foreground text-sm">{milestone.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Getting Started Card */}
        <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/40 shadow-glow">
          <div className="p-8">
            <ProtocolHeader 
              title="GET STARTED ≣ JOIN THE COLLECTIVE"
              subtitle="Your journey begins here"
            />
            
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <p className="text-lg">
                  <span className="text-accent">◆</span>
                  <span className="ml-2">Ready to be part of something different?</span>
                </p>
                <p className="text-lg">
                  <span className="text-accent">◇</span>
                  <span className="ml-2">Start by exploring our community ethos and guidelines.</span>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={() => navigate('/ethos')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Read Our Ethos →
                </Button>
                <Button 
                  onClick={() => navigate('/community')}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Join the Community
                </Button>
              </div>
              
              <div className="border-t border-primary/20 pt-6 mt-8">
                <div className="font-mono text-primary mb-4">【WELCOME ↺ PROTOCOL】</div>
                <div className="space-y-2 text-lg">
                  <p className="font-medium">「You're not late. You're right on time.」</p>
                  <div className="flex items-center justify-center gap-3 text-accent">
                    <span>◆</span>
                    <span className="font-bold text-primary">Welcome to ⌈RE⁝DO⌋.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default About;

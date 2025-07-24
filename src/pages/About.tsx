import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProtocolHeader } from '@/components/ethos/ProtocolHeader';

const About = () => {
  const coreValues = [
    { symbol: "◆", text: "Intentionality → We build slowly, deliberately, without pressure to perform", isHighlighted: true },
    { symbol: "◇", text: "Every channel, post, and feature exists on purpose" },
    { symbol: "◆", text: "Mutuality → This isn't an audience—it's a collaboration", isHighlighted: true },
    { symbol: "◇", text: "Everyone's voice matters, and no one builds alone here" },
    { symbol: "◆", text: "Transparency → We share how we work and what's changing", isHighlighted: true },
    { symbol: "◇", text: "No behind-the-curtain nonsense" },
    { symbol: "◆", text: "Non-Extractive Culture → No clout-farming or unpaid labor", isHighlighted: true },
    { symbol: "◇", text: "We connect because we want to, not because we need something" },
    { symbol: "◆", text: "Gentle Accountability → Kindness before performance", isHighlighted: true },
    { symbol: "◇", text: "You're allowed to rest. You're allowed to RE⁝DO" },
    { symbol: "◆", text: "Second-Chance Space → For projects, people, and possibilities", isHighlighted: true },
    { symbol: "◇", text: "Everyone deserves another shot" }
  ];

  const beliefs = [
    { symbol: "◆", text: "Process > Perfection" },
    { symbol: "◇", text: "Emotional safety and human-sized spaces come first" },
    { symbol: "◆", text: "Conflict happens—we hold space for dialogue, not debate" },
    { symbol: "◇", text: "Creativity is healing, not a hustle" },
    { symbol: "◆", text: "This is connection—not content" },
    { symbol: "◇", text: "We're engineering the future we actually want" }
  ];

  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <Header />
      
      <main className="relative pt-20 px-4 max-w-6xl mx-auto pb-20">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-20 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-foreground">⌈RE⁝DO⌋ NETWORK</span>
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

        {/* Single Card with All Content */}
        <Card className="bg-card/80 backdrop-blur-sm border-l-4 border-l-primary shadow-glow">
          <div className="p-8">
            <ProtocolHeader 
              title="OUR CORE VALUES"
              subtitle="A foundation for intentional connection"
            />
            
            <Separator className="my-8 bg-primary/20" />
            
            {/* Mission Statement */}
            <div className="mb-8 text-center">
              <div className="space-y-4">
                <p className="text-lg">
                  <span className="text-accent">◆</span>
                  <span className="ml-2">We are building the internet we actually want—inspired by the web of yesterday, forged by us today.</span>
                </p>
                <p className="text-lg">
                  <span className="text-accent">◇</span>
                  <span className="ml-2">A living code rooted in reflection and reborn through action.</span>
                </p>
                <p className="text-lg font-medium">
                  <span className="text-accent">◆</span>
                  <span className="ml-2">We're not recreating nostalgia—we're engineering the future we actually want.</span>
                </p>
              </div>
            </div>

            <Separator className="my-8 bg-primary/20" />

            {/* Core Values */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-primary">FOUNDATIONAL PRINCIPLES</h3>
              </div>
              <div className="space-y-2 text-center">
                {coreValues.map((value, index) => (
                  <p 
                    key={index} 
                    className={`font-mono ${value.isHighlighted ? 'text-foreground font-bold' : 'text-muted-foreground'}`}
                  >
                    <span className="text-accent font-bold">{value.symbol}</span> {value.text}
                  </p>
                ))}
              </div>
            </div>

            <Separator className="my-8 bg-primary/20" />

            {/* What We Believe */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-primary">WHAT WE BELIEVE</h3>
              </div>
              <div className="space-y-2 text-center">
                {beliefs.map((belief, index) => (
                  <p key={index} className="font-mono text-muted-foreground">
                    <span className="text-accent font-bold">{belief.symbol}</span> {belief.text}
                  </p>
                ))}
              </div>
            </div>

            <Separator className="my-8 bg-primary/20" />

            {/* Philosophy */}
            <div className="text-center">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-primary">THE ⌈RE⁝DO⌋ PHILOSOPHY</h3>
              </div>
              <div className="space-y-4">
                <p className="text-lg">
                  <span className="text-accent">◆</span>
                  <span className="ml-2">⌈↺ RE⁝DO is our code for compassionate iteration. ⌋</span>
                </p>
                <div className="text-center text-muted-foreground">
                  <span className="text-accent">⇉</span>
                  <span>Every collaboration</span>
                  <span className="text-accent">⇉</span>
                  <span>re:connection</span>
                  <span className="text-accent">⇉</span>
                  <span>re:flection</span>
                  <span className="text-accent">⇉</span>
                  <span>re:imagination.</span>
                </div>
                <div className="space-y-2 mt-6">
                  <p className="text-lg font-medium">
                    <span className="text-accent">◆</span>
                    <span className="ml-2">「This isn't the web we were handed.」</span>
                  </p>
                  <p className="text-lg font-medium">
                    <span className="text-accent">◇</span>
                    <span className="ml-2">「It's the one we're making—with care.」</span>
                  </p>
                  <p className="text-lg font-bold text-primary">
                    <span className="text-accent">◆</span>
                    <span className="ml-2">You're not late. You're right on time.</span>
                  </p>
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

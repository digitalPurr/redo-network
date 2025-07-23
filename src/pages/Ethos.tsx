import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { SimpleBottomWave } from '@/components/waves/SimpleBottomWave';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CoreValueCard } from '@/components/ethos/CoreValueCard';
import { ProtocolSection } from '@/components/ethos/ProtocolSection';
import { ProtocolHeader } from '@/components/ethos/ProtocolHeader';

const Ethos = () => {
  const coreValues = [
    {
      title: "Intentionality",
      points: [
        "We build slowly, deliberately, without pressure to perform.",
        "Every post, channel, and feature exists on purpose."
      ]
    },
    {
      title: "Mutuality",
      points: [
        "This isn't an audience—it's a collaboration.",
        "Everyone contributes. No one builds alone."
      ]
    },
    {
      title: "Transparency",
      points: [
        "We talk openly about how and why things change.",
        "No \"behind the curtain\" nonsense."
      ]
    },
    {
      title: "Non-Extractive Culture",
      points: [
        "No clout-farming. No recruiting into unpaid labor.",
        "We connect because we want to."
      ]
    },
    {
      title: "Gentle Accountability",
      points: [
        "Kindness before performance.",
        "You're allowed to rest. You're allowed to RE⁝DO."
      ]
    },
    {
      title: "Second-Chance Space",
      points: [
        "We are a second-chance space.",
        "For projects. For people. For possibilities."
      ]
    }
  ];

  const beliefCorePoints = [
    { symbol: "◆", text: "Everyone deserves another shot", isHighlighted: true },
    { symbol: "◇", text: "Process > Perfection" },
    { symbol: "◆", text: "Emotional safety comes first" },
    { symbol: "◇", text: "Conflict happens—we hold space, not debates" },
    { symbol: "◆", text: "Creativity heals—it isn't hustle" },
    { symbol: "◇", text: "This is connection—not content" }
  ];

  const socialResponsibilityPoints = [
    { symbol: "◆", text: "We side with the marginalized—always." },
    { symbol: "◇", text: "Harmful ideologies aren't welcome." },
    { symbol: "◆", text: "We investigate harm with empathy." },
    { symbol: "◇", text: "Ignorance is met with teaching." },
    { symbol: "◇", text: "Malice is met with removal." },
    { symbol: "◇", text: "Safety is not censorship—it's fertile soil." },
    { symbol: "◆", text: "We are not apolitical. We are intentionally just." }
  ];

  const collectiveWellbeingPoints = [
    { symbol: "◆", text: "Sustainable selflessness → Help when you can" },
    { symbol: "◆", text: "Compassionate presence → Showing up is enough" },
    { symbol: "◆", text: "Emotional labor → Pause, listen, reflect" },
    { symbol: "◆", text: "Creative optimism → Build toward, not just against" },
    { symbol: "", text: "Growth is nonlinear. Belonging starts with intention." }
  ];

  const rehumanizationPoints = [
    { symbol: "◇", text: "We are not brands." },
    { symbol: "◇", text: "We are not content streams." },
    { symbol: "⇲", text: "Unlearn → extraction, objectification, performance" },
    { symbol: "⇲", text: "Relearn → consent, equity, emotional permission" },
    { symbol: "↺", text: "Shift: shape spaces that shape behaviour" }
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
                <span>DESTINY LIVING NOSTALGIA</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-accent">⇲</span>
                <span>ORIGIN ⌈RE⁝DO⌋ NETWORK CORE</span>
              </div>
            </div>
            
            <Separator className="my-6 bg-primary/20" />
            
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                ⌈RE⁝DO⌋ COMMUNITY ETHOS
              </h1>
              <p className="text-xl text-accent italic">
                【Inspired by the Web of Yesterday—Forged by Us】
              </p>
              <p className="text-muted-foreground">
                ⩤ A Living Code for Intentional Connection ⩥
              </p>
            </div>
          </div>
        </Card>

        {/* Core Values Card */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-l-4 border-l-primary">
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <CoreValueCard key={index} title={value.title} points={value.points} />
              ))}
            </div>
          </div>
        </Card>

        {/* System Intent Card */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-l-4 border-l-accent">
          <div className="p-8">
            <div className="text-center">
              <ProtocolHeader 
                title="SYSTEM INTENT ≣ ⌈RE⁝DO⌋ PHILOSOPHY"
              />
              <div className="space-y-4">
                <p className="text-lg text-center">
                  ⌈↺ RE⁝DO is our code for compassionate iteration. ⌋
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
                <div className="space-y-2 mt-6 text-center">
                  <div className="text-lg">
                    <span className="text-accent">◆</span>
                    <span className="ml-2">We're not recreating nostalgia.</span>
                  </div>
                  <div className="text-lg">
                    <span className="text-accent">◇</span>
                    <span className="ml-2">We're engineering the future we actually want.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Protocols Card */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border border-primary/30">
          <div className="p-8">
            <div className="space-y-8">
              {/* Belief Core */}
              <div>
                <ProtocolHeader 
                  title="BELIEF CORE ≣ FOUNDATIONAL PRINCIPLES"
                  logId="CORE"
                />
                <div className="space-y-2 text-center">
                  {beliefCorePoints.map((point, index) => (
                    <p 
                      key={index} 
                      className={`font-mono ${point.isHighlighted ? 'text-foreground font-bold' : 'text-muted-foreground'}`}
                    >
                      <span className="text-accent font-bold">{point.symbol}</span> {point.text}
                    </p>
                  ))}
                </div>
              </div>

              {/* Protocol I */}
              <ProtocolSection
                title="ACTIVE PROTOCOL ≣ SOCIAL RESPONSIBILITY"
                logId="I"
                subtitle="This space is not neutral."
                points={socialResponsibilityPoints}
              />

              {/* Protocol II */}
              <ProtocolSection
                title="ACTIVE PROTOCOL ≣ COLLECTIVE WELLBEING"
                logId="II"
                subtitle="Build the culture you want to inhabit."
                points={collectiveWellbeingPoints}
              />

              {/* Protocol III */}
              <div className="border-t border-primary/20 pt-8">
                <ProtocolHeader 
                  title="ACTIVE PROTOCOL ≣ REHUMANIZATION"
                  logId="III"
                />
                <div className="space-y-2 text-center">
                  <div className="mt-3 text-lg font-medium">
                    <span className="text-accent font-bold">◆</span> We are people—co-creating human space.
                  </div>
                  {rehumanizationPoints.map((point, index) => (
                    <p key={index} className="text-muted-foreground font-mono">
                      <span className="text-accent font-bold">{point.symbol}</span> {point.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Final Heartbeat Card */}
        <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/40 shadow-glow">
          <div className="p-8">
            <div className="space-y-8">
              {/* Social Etiquette */}
              <div>
                <ProtocolHeader 
                  title="SOCIAL ETIQUETTE ≣ SHARED PRACTICES"
                />
                <div className="space-y-4 mb-6 text-center">
                  <div className="text-center">
                    <span className="text-accent">◆</span>
                    <span className="ml-2">Engage in good faith</span>
                  </div>
                  <div className="text-center">
                    <span className="text-accent">◆</span>
                    <span className="ml-2">Embrace constructive conflict</span>
                  </div>
                  <div className="text-center">
                    <span className="text-accent">◆</span>
                    <span className="ml-2">Share the space generously</span>
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-accent font-bold">◆</span>
                    <span>We aren't here to argue.</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-accent font-bold">◆</span>
                    <span>We're here to build connection.</span>
                  </div>
                </div>
              </div>

              {/* Final Heartbeat */}
              <div className="border-t border-primary/20 pt-8 text-center">
                <div className="font-mono text-primary mb-4">【FINAL ↺ HEARTBEAT】</div>
                <div className="space-y-4 text-lg">
                  <div className="space-y-2">
                    <p className="font-medium">「This isn't the web we were handed.」</p>
                    <p className="font-medium">「It's the one we're making—together.」</p>
                  </div>
                  <div className="space-y-1 text-accent">
                    <div className="flex items-center justify-center gap-3">
                      <span>◆</span>
                      <span>You're not late. You're right on time.</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span>◆</span>
                      <span className="font-bold text-primary">Welcome to ⌈RE⁝DO⌋.</span>
                    </div>
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

export default Ethos;
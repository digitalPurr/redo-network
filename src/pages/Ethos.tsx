
import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { AnimatedWavesPurple } from '@/components/waves/AnimatedWavesPurple';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Ethos = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <GenerativeBackground />
      <div className="fixed bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <AnimatedWavesPurple rotation={0} />
      </div>
      <Header />
      
      <main className="relative z-10 pt-20 px-4 max-w-4xl mx-auto pb-20">
          
        {/* System Log Header */}
        <Card className="mb-8 bg-gradient-to-r from-card/90 to-card/70 backdrop-blur-sm border-2 border-primary/30 shadow-glow">
          <div className="p-6 font-mono text-sm">
            <div className="text-primary/80 mb-4">
              <div className="flex items-center gap-2 mb-2">
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
            <div className="space-y-8">
              {/* Core Values */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-2 border-primary/30 pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl text-accent">⩤</span>
                    <h3 className="text-lg font-semibold text-primary">Intentionality</h3>
                    <span className="text-xl text-accent">⩥</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1">⇀</span>
                      <p className="text-muted-foreground text-sm">We build slowly, deliberately, without pressure to perform.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1">⇀</span>
                      <p className="text-muted-foreground text-sm">Every post, channel, and feature exists on purpose.</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-2 border-primary/30 pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl text-accent">⩤</span>
                    <h3 className="text-lg font-semibold text-primary">Mutuality</h3>
                    <span className="text-xl text-accent">⩥</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1">⇀</span>
                      <p className="text-muted-foreground text-sm">This isn't an audience—it's a collaboration.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1">⇀</span>
                      <p className="text-muted-foreground text-sm">Everyone contributes. No one builds alone.</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-2 border-primary/30 pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl text-accent">⩤</span>
                    <h3 className="text-lg font-semibold text-primary">Transparency</h3>
                    <span className="text-xl text-accent">⩥</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1">⇀</span>
                      <p className="text-muted-foreground text-sm">We talk openly about how and why things change.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1">⇀</span>
                      <p className="text-muted-foreground text-sm">No "behind the curtain" nonsense.</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-2 border-primary/30 pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl text-accent">⩤</span>
                    <h3 className="text-lg font-semibold text-primary">Non-Extractive Culture</h3>
                    <span className="text-xl text-accent">⩥</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1">⇀</span>
                      <p className="text-muted-foreground text-sm">No clout-farming. No recruiting into unpaid labor.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1">⇀</span>
                      <p className="text-muted-foreground text-sm">We connect because we want to.</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 border-l-2 border-primary/30 pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl text-accent">⩤</span>
                    <h3 className="text-lg font-semibold text-primary">Gentle Accountability</h3>
                    <span className="text-xl text-accent">⩥</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1">⇀</span>
                      <p className="text-muted-foreground text-sm">Kindness before performance.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1">⇀</span>
                      <p className="text-muted-foreground text-sm">You're allowed to rest. You're allowed to RE⁝DO.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Directives */}
              <div className="border-t border-primary/20 pt-8">
                <div className="text-center mb-6">
                  <div className="font-mono text-primary mb-4">⟦⟦ CORE DIRECTIVES ⟧⟧</div>
                </div>
                <div className="space-y-3 text-center">
                  <div className="flex items-center justify-center gap-3 text-lg">
                    <span className="text-accent">◆</span>
                    <span>We are a second-chance space.</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-lg">
                    <span className="text-accent">◇</span>
                    <span>For projects. For people. For possibilities.</span>
                  </div>
                </div>
              </div>

              {/* Belief Core */}
              <div className="border-t border-primary/20 pt-8">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <p className="text-foreground">Everyone deserves another shot</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <p className="text-foreground">Process &gt; Perfection</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <p className="text-foreground">Emotional safety comes first</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <p className="text-foreground">Conflict happens—we hold space, not debates</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <p className="text-foreground">Creativity heals—it isn't hustle</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <p className="text-foreground">This is connection—not content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* System Intent Card */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-l-4 border-l-accent">
          <div className="p-8">
            <h2 className="text-2xl font-bold font-mono text-primary mb-4">⟦⟦ SYSTEM INTENT: ⌈RE⁝DO⌋ PHILOSOPHY ⟧⟧</h2>
            <div className="space-y-4">
              <p className="text-lg">
                "RE⁝DO" is our code for compassionate iteration.
              </p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-accent">⇉</span>
                <span>Every collaboration</span>
                <span className="text-accent">⇉</span>
                <span>re:connection</span>
                <span className="text-accent">⇉</span>
                <span>reflection</span>
                <span className="text-accent">⇉</span>
                <span>reimagination.</span>
              </div>
              <div className="space-y-2 mt-6">
                <div className="flex items-start gap-3">
                  <span className="text-accent">⇲</span>
                  <span>We're not recreating nostalgia.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent">⇲</span>
                  <span>We're engineering the future we actually want.</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Protocols Card */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border border-primary/30">
          <div className="p-8">
            <div className="space-y-8">
              {/* Protocol I */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl text-accent">⌈↺</span>
                    <span className="font-mono text-primary">ACTIVE PROTOCOL⁝ SOCIAL RESPONSIBILITY</span>
                    <span className="text-xl text-accent">⌋</span>
                  </div>
                  <div className="font-mono text-sm text-muted-foreground">【COMM LOG: I】</div>
                  <div className="mt-3 text-lg font-medium">
                    <span className="text-accent">◆</span> This space is not neutral.
                  </div>
                </div>
                
                <div className="space-y-2 ml-4">
                  <p className="text-muted-foreground font-mono">◆ We side with the marginalized—always.</p>
                  <p className="text-muted-foreground font-mono">• Harmful ideologies aren't welcome.</p>
                  <p className="text-muted-foreground font-mono">• We investigate harm with empathy.</p>
                  <p className="text-muted-foreground font-mono">• Ignorance is met with teaching.</p>
                  <p className="text-muted-foreground font-mono">• Malice is met with removal.</p>
                  <p className="text-muted-foreground font-mono">• Safety is not censorship—it's fertile soil.</p>
                  <p className="text-muted-foreground font-mono">• We are not apolitical. We are intentionally just.</p>
                </div>
              </div>

              {/* Protocol II */}
              <div className="border-t border-primary/20 pt-8">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl text-accent">⌈↺</span>
                    <span className="font-mono text-primary">ACTIVE PROTOCOL ≣ COLLECTIVE WELLBEING</span>
                    <span className="text-xl text-accent">⌋</span>
                  </div>
                  <div className="font-mono text-sm text-muted-foreground">【COMM LOG: II】</div>
                  <div className="mt-3 text-lg font-medium">
                    <span className="text-accent">◆</span> Build the culture you want to inhabit.
                  </div>
                </div>
                
                <div className="space-y-2 ml-4">
                  <p className="text-muted-foreground font-mono">• Sustainable selflessness → Help when you can</p>
                  <p className="text-muted-foreground font-mono">• Compassionate presence → Showing up is enough</p>
                  <p className="text-muted-foreground font-mono">• Emotional labor → Pause, listen, reflect</p>
                  <p className="text-muted-foreground font-mono">• Creative optimism → Build toward, not just against</p>
                  <p className="text-muted-foreground font-mono">• Growth is nonlinear. Belonging starts with intention.</p>
                </div>
              </div>

              {/* Protocol III */}
              <div className="border-t border-primary/20 pt-8">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl text-accent">⌈↺</span>
                    <span className="font-mono text-primary">ACTIVE PROTOCOL REHUMANIZATION</span>
                    <span className="text-xl text-accent">⌋</span>
                  </div>
                  <div className="font-mono text-sm text-muted-foreground">【COMM LOG: III】</div>
                </div>
                
                <div className="space-y-2 ml-4">
                  <p className="text-muted-foreground font-mono">⇲ We are people—co-creating human space.</p>
                  <p className="text-muted-foreground font-mono">⇲ We are not brands.</p>
                  <p className="text-muted-foreground font-mono">⇲ We are not content streams.</p>
                  <p className="text-muted-foreground font-mono">⇲ We are people—co-creating human space.</p>
                  <p className="text-muted-foreground font-mono">⇲ Unlearn: extraction, objectification, performance</p>
                  <p className="text-muted-foreground font-mono">⇲ Relearn: consent, equity, emotional permission</p>
                  <p className="text-muted-foreground font-mono">⇲ Shift: shape spaces that shape behaviour</p>
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
                <h2 className="text-2xl font-bold font-mono text-primary mb-4">【SOCIAL ETIQUETTE // SHARED PRACTICES】</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-accent">◇</span>
                    <span className="text-foreground">Engage in good faith</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent">◇</span>
                    <span className="text-foreground">Embrace constructive conflict</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent">◇</span>
                    <span className="text-foreground">Share the space generously</span>
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-accent">◆</span>
                    <span>We aren't here to argue.</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-accent">◆</span>
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

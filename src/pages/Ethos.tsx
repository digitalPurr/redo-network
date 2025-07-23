
import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { SimpleBottomWave } from '@/components/waves/SimpleBottomWave';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Ethos = () => {
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
            <div className="space-y-8">
              {/* Core Values - 3 columns with consistent card design */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Intentionality */}
                <Card className="bg-card/50 border-primary/30 p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-xl text-accent">⩤</span>
                    <h3 className="text-lg font-semibold text-primary">Intentionality</h3>
                    <span className="text-xl text-accent">⩥</span>
                  </div>
                  <div className="space-y-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">⇀</span>
                      <p className="text-muted-foreground text-sm">We build slowly, deliberately, without pressure to perform.</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">⇀</span>
                      <p className="text-muted-foreground text-sm">Every post, channel, and feature exists on purpose.</p>
                    </div>
                  </div>
                </Card>

                {/* Mutuality */}
                <Card className="bg-card/50 border-primary/30 p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-xl text-accent">⩤</span>
                    <h3 className="text-lg font-semibold text-primary">Mutuality</h3>
                    <span className="text-xl text-accent">⩥</span>
                  </div>
                  <div className="space-y-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">⇀</span>
                      <p className="text-muted-foreground text-sm">This isn't an audience—it's a collaboration.</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">⇀</span>
                      <p className="text-muted-foreground text-sm">Everyone contributes. No one builds alone.</p>
                    </div>
                  </div>
                </Card>

                {/* Transparency */}
                <Card className="bg-card/50 border-primary/30 p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-xl text-accent">⩤</span>
                    <h3 className="text-lg font-semibold text-primary">Transparency</h3>
                    <span className="text-xl text-accent">⩥</span>
                  </div>
                  <div className="space-y-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">⇀</span>
                      <p className="text-muted-foreground text-sm">We talk openly about how and why things change.</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">⇀</span>
                      <p className="text-muted-foreground text-sm">No "behind the curtain" nonsense.</p>
                    </div>
                  </div>
                </Card>

                {/* Non-Extractive Culture */}
                <Card className="bg-card/50 border-primary/30 p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-xl text-accent">⩤</span>
                    <h3 className="text-lg font-semibold text-primary">Non-Extractive Culture</h3>
                    <span className="text-xl text-accent">⩥</span>
                  </div>
                  <div className="space-y-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">⇀</span>
                      <p className="text-muted-foreground text-sm">No clout-farming. No recruiting into unpaid labor.</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">⇀</span>
                      <p className="text-muted-foreground text-sm">We connect because we want to.</p>
                    </div>
                  </div>
                </Card>

                {/* Gentle Accountability */}
                <Card className="bg-card/50 border-primary/30 p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-xl text-accent">⩤</span>
                    <h3 className="text-lg font-semibold text-primary">Gentle Accountability</h3>
                    <span className="text-xl text-accent">⩥</span>
                  </div>
                  <div className="space-y-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">⇀</span>
                      <p className="text-muted-foreground text-sm">Kindness before performance.</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">⇀</span>
                      <p className="text-muted-foreground text-sm">You're allowed to rest. You're allowed to RE⁝DO.</p>
                    </div>
                  </div>
                </Card>

                {/* Second-Chance Space */}
                <Card className="bg-card/50 border-primary/30 p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-xl text-accent">⩤</span>
                    <h3 className="text-lg font-semibold text-primary">Second-Chance Space</h3>
                    <span className="text-xl text-accent">⩥</span>
                  </div>
                  <div className="space-y-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">◆</span>
                      <p className="text-muted-foreground text-sm">We are a second-chance space.</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">◇</span>
                      <p className="text-muted-foreground text-sm">For projects. For people. For possibilities.</p>
                    </div>
                  </div>
                </Card>
              </div>

            </div>
          </div>
        </Card>

        {/* System Intent Card */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-l-4 border-l-accent">
          <div className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold font-mono text-primary mb-4 text-center">⌈ SYSTEM INTENT ≣ ⌈RE⁝DO⌋ PHILOSOPHY ⌋</h2>
            </div>
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
        </Card>

        {/* Active Protocols Card */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border border-primary/30">
          <div className="p-8">
            <div className="space-y-8">
              {/* Belief Core */}
              <div>
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-xl text-accent">⌈↺</span>
                    <span className="font-mono text-primary text-center">BELIEF CORE ≣ FOUNDATIONAL PRINCIPLES</span>
                    <span className="text-xl text-accent">⌋</span>
                  </div>
                  <div className="font-mono text-sm text-muted-foreground">【COMM LOG: CORE】</div>
                </div>
                
                <div className="space-y-2 text-center">
                  <p className="text-foreground font-mono font-bold"><span className="text-accent font-bold">◆</span> Everyone deserves another shot</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◇</span> Process &gt; Perfection</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◆</span> Emotional safety comes first</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◇</span> Conflict happens—we hold space, not debates</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◆</span> Creativity heals—it isn't hustle</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◇</span> This is connection—not content</p>
                </div>
              </div>

              {/* Protocol I */}
              <div className="border-t border-primary/20 pt-8">
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-xl text-accent">⌈↺</span>
                    <span className="font-mono text-primary text-center">ACTIVE PROTOCOL ≣ SOCIAL RESPONSIBILITY</span>
                    <span className="text-xl text-accent">⌋</span>
                  </div>
                  <div className="font-mono text-sm text-muted-foreground">【COMM LOG: I】</div>
                  <div className="mt-3 text-lg font-medium">
                    <span className="text-accent">◆</span> This space is not neutral.
                  </div>
                </div>
                
                <div className="space-y-2 text-center">
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◆</span> We side with the marginalized—always.</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◇</span> Harmful ideologies aren't welcome.</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◆</span> We investigate harm with empathy.</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◇</span> Ignorance is met with teaching.</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◇</span> Malice is met with removal.</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◇</span> Safety is not censorship—it's fertile soil.</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◆</span> We are not apolitical. We are intentionally just.</p>
                </div>
              </div>

              {/* Protocol II */}
              <div className="border-t border-primary/20 pt-8">
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-xl text-accent">⌈↺</span>
                    <span className="font-mono text-primary text-center">ACTIVE PROTOCOL ≣ COLLECTIVE WELLBEING</span>
                    <span className="text-xl text-accent">⌋</span>
                  </div>
                  <div className="font-mono text-sm text-muted-foreground">【COMM LOG: II】</div>
                  <div className="mt-3 text-lg font-medium">
                    <span className="text-accent">◆</span> Build the culture you want to inhabit.
                  </div>
                </div>
                
                <div className="space-y-2 text-center">
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold"><span className="text-accent font-bold">◆</span> Sustainable selflessness <span className="text-accent">→</span></span> Help when you can</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold"><span className="text-accent font-bold">◆</span> Compassionate presence <span className="text-accent">→</span></span> Showing up is enough</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold"><span className="text-accent font-bold">◆</span> Emotional labor <span className="text-accent">→</span></span> Pause, listen, reflect</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold"><span className="text-accent font-bold">◆</span> Creative optimism <span className="text-accent">→</span></span> Build toward, not just against</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold"></span> Growth is nonlinear. Belonging starts with intention.</p>
                </div>
              </div>

              {/* Protocol III */}
              <div className="border-t border-primary/20 pt-8">
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-xl text-accent">⌈↺</span>
                    <span className="font-mono text-primary text-center">ACTIVE PROTOCOL ≣ REHUMANIZATION</span>
                    <span className="text-xl text-accent">⌋</span>
                  </div>
                  <div className="font-mono text-sm text-muted-foreground">【COMM LOG: III】</div>
                </div>
                
                <div className="space-y-2 text-center">
                  <div className="mt-3 text-lg font-medium">
                    <span className="text-accent font-bold">◆</span> We are people—co-creating human space.
                  </div>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◇</span> We are not brands.</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">◇</span> We are not content streams.</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">⇲</span> Unlearn → extraction, objectification, performance</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">⇲</span> Relearn → consent, equity, emotional permission</p>
                  <p className="text-muted-foreground font-mono"><span className="text-accent font-bold">↺</span> Shift: shape spaces that shape behaviour</p>
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
              <span className="text-xl text-accent">⌈↺</span>
                <h2 className="font-mono text-primary text-center">SOCIAL ETIQUETTE ≣ SHARED PRACTICES</h2>
              <span className="text-xl text-accent">⌋</span>
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

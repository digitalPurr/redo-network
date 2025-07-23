
import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { AnimatedWavesPurple } from '@/components/waves/AnimatedWavesPurple';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CornerWaves } from '@/components/CornerWaves';

const Ethos = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <GenerativeBackground />
      <div className="fixed bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <AnimatedWavesPurple />
      </div>
      <CornerWaves position="bottom-right" variant="purple-silver" size="medium" />
      <Header />
      
      <main className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          
          {/* Header Card */}
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
                  「⌈RE⁝DO⌋ COMMUNITY ETHOS」
                </h1>
                <p className="text-xl text-accent">
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
              <div className="space-y-6">
                {/* Core Values */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
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
                  </div>

                  <div className="space-y-4">
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

                    <div className="border-l-2 border-primary/30 pl-6">
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
                </div>

                <Separator className="my-6 bg-primary/20" />

                {/* Core Directives */}
                <div className="text-center space-y-4">
                  <div className="font-mono text-primary mb-4">⟦⟦ CORE DIRECTIVES ⟧⟧</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">◆</span>
                      <span>We are a second-chance space.</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">◇</span>
                      <span>For projects. For people. For possibilities.</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-primary/20" />

                {/* Belief Core */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <p className="text-foreground">Everyone deserves another shot</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <p className="text-foreground">Process > Perfection</p>
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
          </Card>

          {/* System Intent Card */}
          <Card className="mb-8 bg-card/80 backdrop-blur-sm border-l-4 border-l-accent">
            <div className="p-8">
              <h2 className="text-2xl font-bold font-mono text-primary mb-4">⟦⟦ SYSTEM INTENT: ⌈RE⁝DO⌋ PHILOSOPHY ⟧⟧</h2>
              <div className="space-y-4">
                <p className="text-lg">
                  "RE⁝DO" is our code for compassionate iteration.
                </p>
                <div className="flex items-center gap-3">
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
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl text-accent">⌈↺</span>
                      <span className="font-mono text-primary">ACTIVE PROTOCOL⁝ SOCIAL RESPONSIBILITY</span>
                      <span className="text-xl text-accent">⌋</span>
                    </div>
                    <div className="font-mono text-sm text-muted-foreground">【COMM LOG: I】</div>
                  </div>
                  <div className="space-y-2 ml-4">
                    <div className="flex items-start gap-3">
                      <span className="text-accent">◆</span>
                      <span className="font-medium">This space is not neutral.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent">◆</span>
                      <span className="font-medium">We side with the marginalized—always.</span>
                    </div>
                    <div className="space-y-1 ml-6 text-muted-foreground">
                      <p>• Harmful ideologies aren't welcome.</p>
                      <p>• We investigate harm with empathy.</p>
                      <p>• Ignorance is met with teaching.</p>
                      <p>• Malice is met with removal.</p>
                      <p>• Safety is not censorship—it's fertile soil.</p>
                      <p>• We are not apolitical. We are intentionally just.</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-primary/20" />

                {/* Protocol II */}
                <div>
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl text-accent">⌈↺</span>
                      <span className="font-mono text-primary">ACTIVE PROTOCOL ≣ COLLECTIVE WELLBEING</span>
                      <span className="text-xl text-accent">⌋</span>
                    </div>
                    <div className="font-mono text-sm text-muted-foreground">【COMM LOG: II】</div>
                  </div>
                  <div className="space-y-2 ml-4">
                    <div className="flex items-start gap-3">
                      <span className="text-accent">◆</span>
                      <span className="font-medium">Build the culture you want to inhabit.</span>
                    </div>
                    <div className="space-y-1 ml-6 text-muted-foreground">
                      <p>• Sustainable selflessness → Help when you can</p>
                      <p>• Compassionate presence → Showing up is enough</p>
                      <p>• Emotional labor → Pause, listen, reflect</p>
                      <p>• Creative optimism → Build toward, not just against</p>
                      <p>• Growth is nonlinear. Belonging starts with intention.</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-primary/20" />

                {/* Protocol III */}
                <div>
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl text-accent">⌈↺</span>
                      <span className="font-mono text-primary">ACTIVE PROTOCOL REHUMANIZATION</span>
                      <span className="text-xl text-accent">⌋</span>
                    </div>
                    <div className="font-mono text-sm text-muted-foreground">【COMM LOG: III】</div>
                  </div>
                  <div className="space-y-2 ml-4">
                    <div className="space-y-1 text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <span className="text-accent">⇲</span>
                        <span>We are people—co-creating human space.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-accent">⇲</span>
                        <span>We are not brands.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-accent">⇲</span>
                        <span>We are not content streams.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-accent">⇲</span>
                        <span>Unlearn: extraction, objectification, performance</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-accent">⇲</span>
                        <span>Relearn: consent, equity, emotional permission</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-accent">⇲</span>
                        <span>Shift: shape spaces that shape behaviour</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Final Heartbeat Card */}
          <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/40 shadow-glow">
            <div className="p-8">
              <div className="space-y-6">
                {/* Social Etiquette */}
                <div>
                  <h2 className="text-xl font-bold font-mono text-primary mb-4">【SOCIAL ETIQUETTE // SHARED PRACTICES】</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-accent">◇</span>
                      <span>Engage in good faith</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent">◇</span>
                      <span>Embrace constructive conflict</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent">◇</span>
                      <span>Share the space generously</span>
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

                <Separator className="bg-primary/20" />

                {/* Final Heartbeat */}
                <div className="text-center space-y-4">
                  <div className="font-mono text-primary mb-4">【FINAL ↺ HEARTBEAT】</div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">「This isn't the web we were handed.」</p>
                    <p className="text-lg font-medium">「It's the one we're making—together.」</p>
                  </div>
                  <div className="space-y-2 text-accent mt-6">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">◆</span>
                      <span>You're not late. You're right on time.</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-accent">◆</span>
                      <span className="font-bold text-primary">Welcome to ⌈RE⁝DO⌋.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Ethos;

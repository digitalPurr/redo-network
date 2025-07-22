
import { GenerativeBackground } from "@/components/GenerativeBackground";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Community = () => {
  const coreValues = [
    {
      symbol: "⩤",
      title: "Intentionality",
      closeSymbol: "⩥",
      points: [
        "We build slowly, deliberately, without pressure to perform.",
        "Every post, channel, and feature exists *on purpose*."
      ]
    },
    {
      symbol: "⩤",
      title: "Mutuality",
      closeSymbol: "⩥",
      points: [
        "This isn't an audience—it's a collaboration.",
        "Everyone contributes. No one builds alone."
      ]
    },
    {
      symbol: "⩤",
      title: "Transparency",
      closeSymbol: "⩥",
      points: [
        "We talk openly about how and why things change.",
        "No \"behind the curtain\" nonsense."
      ]
    },
    {
      symbol: "⩤",
      title: "Non-Extractive Culture",
      closeSymbol: "⩥",
      points: [
        "No clout-farming. No recruiting into unpaid labor.",
        "We connect *because we want to*."
      ]
    },
    {
      symbol: "⩤",
      title: "Gentle Accountability",
      closeSymbol: "⩥",
      points: [
        "Kindness before performance.",
        "You're allowed to rest. You're allowed to re:do."
      ]
    }
  ];

  const beliefCore = [
    "Everyone deserves another shot",
    "Process > perfection",
    "Emotional safety comes first",
    "Conflict happens—we hold space, not debates",
    "Creativity heals—it isn't hustle",
    "This is connection—not content"
  ];

  const activeProtocols = [
    {
      id: "I",
      title: "SOCIAL RESPONSIBILITY",
      directive: "This space is not neutral.",
      content: [
        "◆ We side with the marginalized—always.",
        "",
        "• Harmful ideologies aren't welcome.",
        "• We investigate harm with empathy.",
        "• Ignorance is met with teaching.",
        "• Malice is met with removal.",
        "• Safety is not censorship—it's fertile soil.",
        "",
        "⌁ We are not apolitical. We are intentionally just."
      ]
    },
    {
      id: "II",
      title: "COLLECTIVE WELLBEING",
      directive: "Build the culture you want to inhabit.",
      content: [
        "• Sustainable selflessness → Help when you can",
        "• Compassionate presence → Showing up *is* enough",
        "• Emotional labor → Pause, listen, reflect",
        "• Creative optimism → Build toward, not just against",
        "",
        "⟬ Growth is nonlinear. Belonging starts with intention. ⟭"
      ]
    },
    {
      id: "III",
      title: "REHUMANIZATION",
      directive: "We are people—co-creating human space.",
      content: [
        "⇲ We are not brands.",
        "⇲ We are not content streams.",
        "⇲ We are people—co-creating human space.",
        "",
        "• Unlearn: extraction, objectification, performance",
        "• Relearn: consent, equity, emotional permission",
        "• Shift: shape spaces that shape behavior"
      ]
    }
  ];

  const socialEtiquette = [
    {
      title: "Engage in good faith",
      symbol: "◇"
    },
    {
      title: "Embrace constructive conflict",
      symbol: "◇"
    },
    {
      title: "Share the space generously",
      symbol: "◇"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <GenerativeBackground />
      <Header />
      
      <main className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          
          {/* System Log Header */}
          <Card className="mb-8 bg-gradient-to-r from-card/90 to-card/70 backdrop-blur-sm border-2 border-primary/30 shadow-glow">
            <div className="p-6 font-mono text-sm">
              <div className="text-primary/80 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent">⌈</span>
                  <span>FILE №⟦RD-00.01⟧ ∷ SYSTEM LOG</span>
                  <span className="text-accent">⌋</span>
                </div>
                <div className="space-y-1 text-muted-foreground ml-4">
                  <div>⇲ ORIGIN: RE:DO NETWORK CORE</div>
                  <div>⇱ TYPE: COMMUNITY ETHOS / LIVING CODE</div>
                  <div>∞ STATUS: <span className="text-accent animate-pulse">ACTIVE</span></div>
                  <div>⌁ SYNCING VALUES TO NODE MEMORY…</div>
                </div>
              </div>
              
              <Separator className="my-6 bg-primary/20" />
              
              <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-primary">
                  「RE:DO COMMUNITY ETHOS」
                </h1>
                <p className="text-xl text-accent italic">
                  【Inspired by the{' '}
                  <a 
                    href="https://yesterweb.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-primary transition-colors"
                  >
                    Web of Yesterday
                  </a>
                  —Forged by Us】
                </p>
                <p className="text-muted-foreground">
                  ⁝ A Living Code for Intentional Connection ⁝
                </p>
              </div>
            </div>
          </Card>

          {/* Combined Core Values and Directives */}
          <section className="mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-l-4 border-l-primary">
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold font-mono text-primary mb-2">【⌁ CORE VALUES ⌁】</h2>
                </div>
                
                {/* Core Values Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {coreValues.map((value, index) => (
                    <div key={index} className="border-l-2 border-primary/30 pl-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xl text-accent">{value.symbol}</span>
                        <h3 className="text-lg font-semibold text-primary">{value.title}</h3>
                        <span className="text-xl text-accent">{value.closeSymbol}</span>
                      </div>
                      <div className="space-y-2">
                        {value.points.map((point, pointIndex) => (
                          <div key={pointIndex} className="flex items-start gap-3">
                            <span className="text-accent mt-1">⇀</span>
                            <p className="text-muted-foreground text-sm">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
              </div>
            </Card>
          </section>

          {/* Belief Core */}
          <Card className="mb-12 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold font-mono text-primary mb-2">「⁜ BELIEF CORE ⁜」</h2>
                <div className="text-sm font-mono text-muted-foreground">⌈ UPLINKING CORE PHILOSOPHY ⌋</div>
              </div>
              
              <div className="space-y-3">
                {beliefCore.map((belief, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <p className="text-foreground">{belief}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* System Intent */}
          <Card className="mb-12 bg-card/80 backdrop-blur-sm border-l-4 border-l-accent">
            <div className="p-8">
              <h2 className="text-2xl font-bold font-mono text-primary mb-4">【SYSTEM INTENT: RE:DO PHILOSOPHY】</h2>
              <div className="space-y-4">
                <p className="text-lg">
                  "RE:DO" is our code for compassionate iteration.
                </p>
                <p className="text-muted-foreground">
                  ⇉ Every collaboration = re:connection + reflection + reimagination.
                </p>
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

          {/* Active Protocols */}
          <section className="mb-12">
            <div className="space-y-8">
              {activeProtocols.map((protocol, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border border-primary/30">
                  <div className="p-8">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl text-accent">⌈↺</span>
                        <span className="font-mono text-primary">ACTIVE PROTOCOL: {protocol.title}</span>
                        <span className="text-xl text-accent">⌋</span>
                      </div>
                      <div className="font-mono text-sm text-muted-foreground">【COMM LOG: {protocol.id}】</div>
                      <div className="mt-3 text-lg font-medium">
                        <span className="text-accent">◆</span> {protocol.directive}
                      </div>
                    </div>
                    
                    <div className="space-y-2 ml-4">
                      {protocol.content.map((item, itemIndex) => (
                        <p key={itemIndex} className="text-muted-foreground font-mono">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Social Etiquette */}
          <Card className="mb-12 bg-card/80 backdrop-blur-sm border-l-4 border-l-primary">
            <div className="p-8">
              <h2 className="text-2xl font-bold font-mono text-primary mb-4">【💬 SOCIAL ETIQUETTE // SHARED PRACTICES】</h2>
              <div className="space-y-4 mb-6">
                {socialEtiquette.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-accent">•</span>
                    <span className="text-accent">{item.symbol}</span>
                    <span className="text-foreground">{item.title}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground font-mono">
                ⁝ We aren't here to argue. We're here to build connection.
              </p>
            </div>
          </Card>

          {/* Final Note */}
          <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/40 shadow-glow">
            <div className="p-8 text-center">
              <div className="font-mono text-primary mb-4">⌁ FINAL NOTE // SYSTEM HEARTBEAT ⌁</div>
              <div className="space-y-4 text-lg">
                <div className="space-y-2">
                  <p className="font-medium">「This isn't the web we were handed.」</p>
                  <p className="font-medium">「It's the one we're making—together.」</p>
                </div>
                <div className="space-y-1 text-accent">
                  <div className="flex items-center justify-center gap-3">
                    <span>⇲</span>
                    <span>You're not late. You're right on time.</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span>⇲</span>
                    <span className="font-bold text-primary">Welcome to RE:DO.</span>
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

export default Community;

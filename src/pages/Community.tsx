import { GenerativeBackground } from "@/components/GenerativeBackground";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Community = () => {
  const coreValues = [
    {
      title: "Intentionality",
      description: "We build slowly, deliberately, and without pressure to perform. Every channel, every post, every feature exists on purpose."
    },
    {
      title: "Mutuality", 
      description: "This isn't an audience—it's a collaboration. Everyone's voice matters, and no one builds alone here."
    },
    {
      title: "Transparency",
      description: "We share how we work. We talk about what's changing. No behind-the-curtain nonsense."
    },
    {
      title: "Non-Extractive Culture",
      description: "This space isn't for clout-farming or recruiting people into unpaid labor. We connect because we want to, not because we need something."
    },
    {
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
    "This is not content. This is connection.",
    "We're here to re:connect, re:build, and re:do—together."
  ];

  const commitments = [
    {
      title: "I. Commitment to Social Responsibility",
      subtitle: "This space is not neutral.",
      content: [
        "We recognize that you can't include everyone in one community—and you shouldn't try.",
        "There are beliefs that hurt. There are systems that silence.",
        "We take the side of the marginalized, always.",
        "Oppressive behavior is not tolerated—whether rooted in race, gender, class, disability, orientation, or otherwise.",
        "When harm occurs, we investigate with empathy. If someone acts in ignorance, we teach. If they act with malice, we remove.",
        "Safety is not censorship. It's the soil that lets creativity grow.",
        "We are not apolitical. We are intentionally just."
      ]
    },
    {
      title: "II. Commitment to Collective Well-Being and Growth",
      subtitle: "This place only works if we all care for it—and each other.",
      content: [
        "Sustainable selflessness: Help others when you can.",
        "Compassionate presence: Sometimes just showing up is enough.",
        "Emotional labor: Listening. Hearing. Pausing. Reflecting and asking for a moment before reacting.",
        "Creative optimism: Build towards something—not just in opposition.",
        "Growth isn't a linear path, and you don't have to be perfect.",
        "Just show up with the intention to learn, and you belong here."
      ]
    },
    {
      title: "III. Commitment to Rehumanizing Our Connections",
      subtitle: "We are not brands. We are not followers. We are not algorithms.",
      content: [
        "We are people—building things for each other, not for metrics.",
        "Treating others as assets, followers, or attention sources",
        "Treating people as romantic or sexual objects without consent",
        "Shaming rest, imperfection, or emotional vulnerability",
        "Instead, we learn to relate as equals, consent to the space we enter, and recognize that the way we behave is shaped by the spaces we're in.",
        "We are here to build better spaces, so we can become better people."
      ]
    }
  ];

  const etiquette = [
    {
      title: "Engage in Good Faith",
      description: "Assume honesty. Ask before judging. Clarify before reacting. We're here to understand each other—not win arguments."
    },
    {
      title: "Embrace Constructive Conflict", 
      description: "Disagreements aren't bad. They help us grow. Approach differences with curiosity, not combat. Debates divide—dialogue connects."
    },
    {
      title: "Share the Space",
      description: "Let others speak. Don't dominate conversations. Keep things on-topic when needed. Remember: we're all guests in this space."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <GenerativeBackground />
      <Header />
      
      <main className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-2xl">🌱</span>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                RE:DO Community Ethos
              </h1>
            </div>
            <p className="text-xl text-muted-foreground italic mb-8">
              Inspired by the web of yesterday. Forged by us. A living code.
            </p>
            <Card className="p-8 border-l-4 border-l-primary bg-card/50 backdrop-blur-sm">
              <blockquote className="text-xl font-medium text-foreground">
                We are a second chance space.<br />
                For projects. For people. For possibilities.
              </blockquote>
            </Card>
          </div>

          {/* Core Values */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">🧭</span>
              <h2 className="text-3xl font-bold">Core Values</h2>
            </div>
            <div className="grid gap-6">
              {coreValues.map((value, index) => (
                <Card key={index} className="p-6 bg-card/30 backdrop-blur-sm border-l-4 border-l-accent hover:bg-card/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3 text-primary">• {value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="my-12" />

          {/* What We Believe */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">✨</span>
              <h2 className="text-3xl font-bold">What We Believe</h2>
            </div>
            <Card className="p-8 bg-card/30 backdrop-blur-sm">
              <div className="space-y-4">
                {beliefs.map((belief, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-primary mt-1">-</span>
                    <p className="text-foreground leading-relaxed">{belief}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Inspirational Quote */}
          <Card className="p-8 mb-16 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
            <div className="text-center space-y-4">
              <p className="text-lg text-muted-foreground flex items-center justify-center gap-2">
                <span>🪴</span>
                <em>This isn't the internet we were handed. This is the one we're making—with care.</em>
              </p>
              <p className="text-lg font-medium text-foreground">
                You're not late. You're right on time.
              </p>
            </div>
          </Card>

          {/* Foundation Statement */}
          <Card className="p-8 mb-16 bg-card/30 backdrop-blur-sm">
            <p className="text-center text-lg italic text-muted-foreground mb-4">
              A foundation for building the internet we actually want.
            </p>
            <p className="text-center text-foreground leading-relaxed">
              Inspired by the web of yesterday, AND{" "}
              <a href="https://yesterweb.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline">
                The Yesterweb
              </a>
              . In honor of the ones who came before us. Rooted in reflection—and reborn through action.
            </p>
            <p className="text-center text-foreground mt-4 font-medium">
              We're not just here to rebuild what we lost. We're here to imagine something better.
            </p>
          </Card>

          {/* Commitments */}
          <section className="mb-16">
            <div className="space-y-12">
              {commitments.map((commitment, index) => (
                <Card key={index} className="p-8 bg-card/30 backdrop-blur-sm">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl text-primary">🔻</span>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">{commitment.title}</h3>
                      <p className="text-lg text-foreground font-medium">{commitment.subtitle}</p>
                    </div>
                  </div>
                  <div className="ml-8 space-y-3">
                    {commitment.content.map((item, itemIndex) => (
                      <p key={itemIndex} className="text-muted-foreground leading-relaxed">
                        {itemIndex < 3 || commitment.title.includes("III") ? "• " : ""}{item}
                      </p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Social Etiquette */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">💬</span>
              <h2 className="text-3xl font-bold">RE:DO Social Etiquette</h2>
            </div>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              These are shared behaviors—not rules—that help make the space work for everyone.
            </p>
            <div className="grid gap-6">
              {etiquette.map((item, index) => (
                <Card key={index} className="p-6 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-3 text-primary">• {item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Closing Statement */}
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
            <div className="text-center space-y-6">
              <p className="text-lg text-muted-foreground italic">
                💡 The Yesterweb showed us what's possible. RE:DO NETWORK exists to keep that spirit alive—while moving forward with purpose, protection, and people at the center.
              </p>
              <div className="space-y-2">
                <p className="text-xl font-bold text-foreground">This is not nostalgia.</p>
                <p className="text-xl font-bold text-foreground">This is a blueprint.</p>
                <p className="text-xl font-bold text-primary">This is RE:DO.</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Community;

import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { ProtocolCard } from '@/components/ethos/ProtocolCard';
import { ManifestoCard } from '@/components/ethos/ManifestoCard';
import { CoreValueCard } from '@/components/ethos/CoreValueCard';

const Ethos = () => {
  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-3xl text-accent">⌈</span>
              <h1 className="text-4xl font-bold font-mono text-primary">
                「RE:DO NETWORK」ETHOS
              </h1>
              <span className="text-3xl text-accent">⌋</span>
            </div>
            <p className="text-xl text-muted-foreground font-mono">
              【OPERATIONAL PROTOCOLS & NETWORK MANIFESTO】
            </p>
          </div>

          {/* Manifesto Section */}
          <ManifestoCard
            title="NETWORK MANIFESTO"
            content={
              <div className="space-y-6">
                <p className="text-lg font-mono text-foreground">
                  「RE:DO NETWORK」operates as a <strong className="text-primary">creative-technical collective</strong>, 
                  where multimedia artistry converges with cutting-edge development practices.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                      <span className="text-accent">◆</span> Creative Excellence
                    </h3>
                    <p className="text-muted-foreground">
                      We push boundaries in multimedia expression, blending traditional artistry with digital innovation.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                      <span className="text-accent">◆</span> Technical Mastery
                    </h3>
                    <p className="text-muted-foreground">
                      Our development practices embrace both proven methodologies and experimental approaches.
                    </p>
                  </div>
                </div>
              </div>
            }
          />

          {/* Protocol I */}
          <ProtocolCard
            title="PROTOCOL I: ITERATIVE REFINEMENT"
            logId="PROTO-001"
            subtitle="Continuous Evolution Through Structured Experimentation"
            points={[
              { symbol: "◇", text: "Every project undergoes systematic iteration cycles" },
              { symbol: "◇", text: "Feedback loops integrate both technical and creative perspectives" },
              { symbol: "◇", text: "Version control maintains historical context for all creative decisions" },
              { symbol: "◇", text: "Regular retrospectives guide strategic pivots and improvements", isHighlighted: true },
              { symbol: "◇", text: "Documentation preserves the reasoning behind each iteration" }
            ]}
          />

          {/* Protocol II */}
          <ProtocolCard
            title="PROTOCOL II: COLLABORATIVE SYNTHESIS"
            logId="PROTO-002"
            subtitle="Harmonizing Individual Expertise Within Collective Vision"
            points={[
              { symbol: "◇", text: "Cross-disciplinary collaboration drives innovation beyond individual capabilities" },
              { symbol: "◇", text: "Shared knowledge repositories accelerate collective learning" },
              { symbol: "◇", text: "Regular sync sessions maintain alignment across diverse skill sets", isHighlighted: true },
              { symbol: "◇", text: "Peer review processes ensure quality while fostering knowledge transfer" },
              { symbol: "◇", text: "Open communication channels support both synchronous and asynchronous collaboration" }
            ]}
          />

          {/* Protocol III */}
          <ProtocolCard
            title="PROTOCOL III: REHUMANIZATION"
            logId="PROTO-003"
            subtitle="Technology Serving Human Expression & Connection"
            points={[
              { symbol: "◇", text: "Technology amplifies rather than replaces human creativity" },
              { symbol: "◇", text: "User experience prioritizes emotional resonance over pure functionality" },
              { symbol: "◇", text: "Accessibility ensures inclusive participation across diverse communities", isHighlighted: true },
              { symbol: "◇", text: "Ethical considerations guide all technical and creative decisions" },
              { symbol: "◇", text: "Human agency remains central in all automated processes" }
            ]}
          />

          {/* Core Values */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <CoreValueCard
              title="EXPERIMENTAL MINDSET"
              points={[
                "Embrace controlled risk-taking in creative and technical domains",
                "Learn rapidly from both successes and failures",
                "Maintain curiosity about emerging technologies and methodologies"
              ]}
            />
            
            <CoreValueCard
              title="CRAFT EXCELLENCE"
              points={[
                "Pursue mastery in chosen disciplines while remaining adaptable",
                "Balance perfectionism with pragmatic delivery timelines",
                "Celebrate both technical precision and creative innovation"
              ]}
            />
            
            <CoreValueCard
              title="COLLECTIVE GROWTH"
              points={[
                "Prioritize knowledge sharing and mentorship within the network",
                "Support individual development paths while strengthening team cohesion",
                "Recognize contributions across all skill levels and experience ranges"
              ]}
            />
            
            <CoreValueCard
              title="SUSTAINABLE IMPACT"
              points={[
                "Build projects with long-term viability and positive social impact",
                "Maintain work-life integration that supports sustained creativity",
                "Consider environmental and social implications of technical choices"
              ]}
            />
          </div>

          {/* Closing Statement */}
          <div className="mt-16 text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl text-accent">⟨</span>
              <p className="text-lg font-mono text-primary">
                【NETWORK STATUS: OPERATIONAL】
              </p>
              <span className="text-2xl text-accent">⟩</span>
            </div>
            <p className="text-muted-foreground font-mono">
              These protocols guide our collective evolution as we RE:DO the landscape of creative technology.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ethos;

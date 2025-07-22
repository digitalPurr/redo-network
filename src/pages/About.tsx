import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Zap, Users, Rocket, Globe, Brain, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Innovation First",
      description: "We push boundaries through experimental approaches and cutting-edge technologies."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaborative Spirit",
      description: "Every project is a collective effort, amplifying individual creativity through teamwork."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Impact",
      description: "Creating digital experiences that transcend borders and connect diverse communities."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Rapid Iteration",
      description: "Embracing the RE:DO philosophy of continuous improvement and fearless experimentation."
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Future-Forward",
      description: "Building for tomorrow while solving today's creative and technological challenges."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Human-Centered",
      description: "Technology serves humanity, enhancing rather than replacing human creativity and connection."
    }
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
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are a collective of digital creators, technologists, and visionaries 
              working at the intersection of art, technology, and human experience.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mb-20">
            <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                「RE:DO NETWORK」 exists to amplify human creativity through collaborative 
                digital experiences. We believe that the most profound innovations emerge 
                when diverse minds unite around shared visions, leveraging cutting-edge 
                technology as a canvas for collective expression.
              </p>
            </Card>
          </div>

          {/* Values Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Our Values
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

          {/* Philosophy */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                The RE:DO Philosophy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                "RE:DO" represents our commitment to iterative excellence. Every project, 
                every collaboration, every creative endeavor is an opportunity to refine, 
                reimagine, and revolutionize. We don't just create—we continuously recreate, 
                ensuring that our work evolves with the rapidly changing landscape of 
                technology and human expression.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
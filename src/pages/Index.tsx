import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Users, Rocket } from 'lucide-react';

const Index = () => {
  // Sample projects data - would come from backend in real implementation
  const projects = [
    {
      title: "Neural Synthesis",
      description: "AI-powered generative art system that creates dynamic visual experiences through machine learning algorithms.",
      category: "AI • VISUALS",
      interactive: true,
      demoUrl: "#",
      projectUrl: "#"
    },
    {
      title: "Quantum Interface",
      description: "Revolutionary user interface design exploring quantum computing principles in human-computer interaction.",
      category: "UI/UX • TECH",
      interactive: true,
      demoUrl: "#",
      projectUrl: "#"
    },
    {
      title: "Biometric Harmony",
      description: "Real-time biometric data visualization creating immersive audio-visual experiences from human physiology.",
      category: "DATA • AUDIO",
      interactive: false,
      demoUrl: "#",
      projectUrl: "#"
    },
    {
      title: "Spatial Computing",
      description: "Next-generation spatial computing platform enabling collaborative creation in mixed reality environments.",
      category: "AR/VR • COLLAB",
      interactive: true,
      demoUrl: "#",
      projectUrl: "#"
    }
  ];

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Collaboration",
      description: "Work together seamlessly with advanced real-time tools and communication systems."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Creative Network",
      description: "Connect with like-minded creators and build meaningful collaborative relationships."
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Cutting-edge Tech",
      description: "Leverage the latest technologies to push the boundaries of creative expression."
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Generative Background */}
      <GenerativeBackground />
      
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                RE:DO
              </span>
              <br />
              <span className="text-foreground">NETWORK</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A collaborative platform for digital creators pushing the boundaries of 
              technology, art, and human experience.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="hero" className="group">
              Explore Projects
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button variant="glass" size="hero">
              Join Network
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Collaborative Creation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for creators who believe in the power of collaboration and shared innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-xl bg-gradient-card border border-border/50 hover:shadow-card transition-all duration-500 hover:scale-105"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground mb-6 group-hover:shadow-glow transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest collaborative creations spanning AI, spatial computing, 
              and interactive experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                className={`animate-in slide-in-from-bottom-8 duration-700 [animation-delay:${index * 150}ms]`}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="creative" size="lg">
              View All Projects
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <div className="w-4 h-4 rounded-sm bg-white/90" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              RE:DO NETWORK
            </span>
          </div>
          <p className="text-muted-foreground mb-6">
            Building the future of collaborative digital creation.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors duration-300">About</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Projects</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Team</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Contact</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
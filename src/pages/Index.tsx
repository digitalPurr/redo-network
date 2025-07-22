
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Users, Globe } from 'lucide-react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { AnimatedWaves } from '@/components/AnimatedWaves';
import { Header } from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <GenerativeBackground />
      <AnimatedWaves />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent drop-shadow-glow">
                RE:DO
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in animation-delay-200">
              A collaborative multimedia platform where digital avant-garde meets iterative creation. 
              Join the network reshaping creative expression.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-400">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 text-white border-0 hover-scale shadow-glow">
              <Link to="/projects">
                Explore Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover-scale border-primary/20 backdrop-blur-sm">
              <Link to="/team">Join the Network</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why 「RE:DO NETWORK」?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A new paradigm for collaborative digital creation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover-scale shadow-card">
              <div className="w-16 h-16 rounded-full bg-gradient-primary/20 flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Iterative by Design</h3>
              <p className="text-muted-foreground">
                Embrace continuous refinement and experimental approaches to digital art and development.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover-scale shadow-card">
              <div className="w-16 h-16 rounded-full bg-gradient-primary/20 flex items-center justify-center mx-auto mb-4 shadow-accent">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
              <p className="text-muted-foreground">
                Connect with like-minded creators and build something extraordinary together.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover-scale shadow-card">
              <div className="w-16 h-16 rounded-full bg-gradient-accent/20 flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Digital Avant-Garde</h3>
              <p className="text-muted-foreground">
                Push boundaries with cutting-edge tools and experimental multimedia approaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join the Network?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start your journey with collaborative multimedia creation
          </p>
          <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 text-white border-0 hover-scale shadow-glow">
            <Link to="/auth">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;


import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { AnimatedWavesBottomTwo } from '@/components/waves/AnimatedWavesBottomTwo';
import { Card } from '@/components/ui/card';

const Ethos = () => {
  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <div className="fixed bottom-0 left-0 right-0 overflow-hidden pointer-events-none z-0">
        <AnimatedWavesBottomTwo />
      </div>
      <Header />
      
      <main className="relative pt-32 pb-20 px-4">
        <div className="w-full max-w-none px-4">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-20 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Our
              </span>
              <br />
              <span className="text-foreground">⌈RE⁝DO⌋ ETHOS</span>
            </h1>
            <div className="space-y-4">
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                The principles that guide our network and community.
              </p>
            </div>
          </div>

          {/* Ethos Content */}
          <div className="text-center max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Coming Soon
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our comprehensive ethos and community guidelines are being thoughtfully crafted.
                This space will outline the values, principles, and practices that define our network.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ethos;

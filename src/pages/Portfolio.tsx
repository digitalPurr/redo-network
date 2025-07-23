
import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';


const Portfolio = () => {
  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <Header />
      
      <main className="pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">⌈RE⁝DO⌋ Portfolio</h1>
            <p className="text-muted-foreground mt-2">
              Explore our timeline of completed projects and creative works
            </p>
          </div>
          
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">Portfolio Timeline Coming Soon</h2>
            <p className="text-muted-foreground">
              The portfolio timeline showcasing historic and finished projects is under development.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;


import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import PortfolioTimeline from '@/components/PortfolioTimeline';

const Portfolio = () => {
  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <Header />
      
      <main className="pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          <PortfolioTimeline />
        </div>
      </main>
    </div>
  );
};

export default Portfolio;

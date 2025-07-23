
import React from 'react';
import { Card } from '@/components/ui/card';

interface CoreValueProps {
  title: string;
  points: string[];
}

export const CoreValueCard: React.FC<CoreValueProps> = ({ title, points }) => {
  return (
    <Card className="bg-card/50 border-primary/30 p-6 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-xl text-accent">⩤</span>
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <span className="text-xl text-accent">⩥</span>
      </div>
      <div className="space-y-3 text-center">
        {points.map((point, index) => (
          <div key={index} className="flex items-center justify-center gap-3">
            <span className="text-accent">⇀</span>
            <p className="text-muted-foreground text-sm">{point}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

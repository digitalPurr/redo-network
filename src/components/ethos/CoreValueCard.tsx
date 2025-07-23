
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CoreValueProps {
  title: string;
  points: string[];
}

export const CoreValueCard: React.FC<CoreValueProps> = ({ title, points }) => {
  return (
    <Card className="bg-card/80 border-primary/30 h-full">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-3">
          <span className="text-xl text-accent">⩤</span>
          <span className="text-lg font-semibold text-primary">{title}</span>
          <span className="text-xl text-accent">⩥</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {points.map((point, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="text-accent font-bold mt-1 flex-shrink-0">⇀</span>
            <p className="text-muted-foreground text-sm leading-relaxed">{point}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

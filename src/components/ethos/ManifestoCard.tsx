
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ManifestoCardProps {
  title: string;
  content: React.ReactNode;
  className?: string;
}

export const ManifestoCard: React.FC<ManifestoCardProps> = ({ 
  title, 
  content, 
  className = "" 
}) => {
  return (
    <Card className={`bg-card/80 border-primary/30 ${className}`}>
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-3">
          <span className="text-xl text-accent">⟨</span>
          <h2 className="text-2xl font-bold font-mono text-primary">{title}</h2>
          <span className="text-xl text-accent">⟩</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 text-center">
        {content}
      </CardContent>
    </Card>
  );
};

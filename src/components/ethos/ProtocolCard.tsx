
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ProtocolHeader } from './ProtocolHeader';

interface ProtocolPoint {
  symbol: string;
  text: string;
  isHighlighted?: boolean;
}

interface ProtocolCardProps {
  title: string;
  logId?: string;
  subtitle?: string;
  points: ProtocolPoint[];
  className?: string;
}

export const ProtocolCard: React.FC<ProtocolCardProps> = ({ 
  title, 
  logId, 
  subtitle, 
  points, 
  className = "" 
}) => {
  return (
    <Card className={`bg-card/80 border-primary/30 ${className}`}>
      <CardHeader>
        <ProtocolHeader title={title} logId={logId} subtitle={subtitle} />
      </CardHeader>
      
      <CardContent className="space-y-3">
        {points.map((point, index) => (
          <p 
            key={index} 
            className={`font-mono text-center ${point.isHighlighted ? 'text-foreground font-bold' : 'text-muted-foreground'}`}
          >
            <span className="text-accent font-bold">{point.symbol}</span> {point.text}
          </p>
        ))}
      </CardContent>
    </Card>
  );
};

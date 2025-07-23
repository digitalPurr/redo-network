
import React from 'react';
import { Card } from '@/components/ui/card';
import { ProtocolHeader } from './ProtocolHeader';

interface ProtocolPoint {
  symbol: string;
  text: string;
  isHighlighted?: boolean;
}

interface ProtocolSectionProps {
  title: string;
  logId?: string;
  subtitle?: string;
  points: ProtocolPoint[];
  className?: string;
}

export const ProtocolSection: React.FC<ProtocolSectionProps> = ({ 
  title, 
  logId, 
  subtitle, 
  points, 
  className = "" 
}) => {
  return (
    <div className={`border-t border-primary/20 pt-8 ${className}`}>
      <ProtocolHeader title={title} logId={logId} subtitle={subtitle} />
      
      <div className="space-y-2 text-center">
        {points.map((point, index) => (
          <p 
            key={index} 
            className={`font-mono ${point.isHighlighted ? 'text-foreground font-bold' : 'text-muted-foreground'}`}
          >
            <span className="text-accent font-bold">{point.symbol}</span> {point.text}
          </p>
        ))}
      </div>
    </div>
  );
};

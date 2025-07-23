
import React from 'react';

interface ProtocolHeaderProps {
  title: string;
  logId?: string;
  subtitle?: string;
}

export const ProtocolHeader: React.FC<ProtocolHeaderProps> = ({ title, logId, subtitle }) => {
  return (
    <div className="mb-6 text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="text-xl text-accent">⌈↺</span>
        <span className="font-mono text-primary text-center">{title}</span>
        <span className="text-xl text-accent">⌋</span>
      </div>
      {logId && (
        <div className="font-mono text-sm text-muted-foreground">【COMM LOG: {logId}】</div>
      )}
      {subtitle && (
        <div className="mt-3 text-lg font-medium">
          <span className="text-accent">◆</span> {subtitle}
        </div>
      )}
    </div>
  );
};

import React from 'react';

export const SimpleBottomWave: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1440 320"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="simpleWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          fill="url(#simpleWaveGradient)"
          d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,186.7C672,181,768,171,864,154.7C960,139,1056,117,1152,112C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
};
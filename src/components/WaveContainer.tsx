import React, { useState, useEffect } from 'react';
import { AnimatedWaves } from '@/components/AnimatedWaves';
import { AnimatedWavesBlue } from '@/components/waves/AnimatedWavesBlue';
import { AnimatedWavesRed } from '@/components/waves/AnimatedWavesRed';
import { AnimatedWavesPurple } from '@/components/waves/AnimatedWavesPurple';
import { AnimatedWavesSilver } from '@/components/waves/AnimatedWavesSilver';

interface WaveContainerProps {
  variant?: 'random' | 'purple' | 'blue' | 'red' | 'silver' | 'default';
  opacity?: number;
  height?: number;
  fixed?: boolean;
}

export const WaveContainer: React.FC<WaveContainerProps> = ({
  variant = 'random',
  opacity = 1,
  height = 100,
  fixed = true
}) => {
  const [selectedWave, setSelectedWave] = useState<string>('default');

  const waves = {
    default: AnimatedWaves,
    purple: AnimatedWavesPurple,
    blue: AnimatedWavesBlue,
    red: AnimatedWavesRed,
    silver: AnimatedWavesSilver
  };

  useEffect(() => {
    if (variant === 'random') {
      const waveOptions = ['default', 'purple', 'blue', 'red', 'silver'];
      const randomWave = waveOptions[Math.floor(Math.random() * waveOptions.length)];
      setSelectedWave(randomWave);
    } else {
      setSelectedWave(variant);
    }
  }, [variant]);

  const WaveComponent = waves[selectedWave as keyof typeof waves] || waves.default;

  return (
    <div 
      className={`${fixed ? 'fixed' : 'absolute'} inset-0 overflow-hidden pointer-events-none`}
      style={{
        opacity,
        height: `${height}%`,
        bottom: fixed ? 0 : 'auto'
      }}
    >
      <WaveComponent />
    </div>
  );
};
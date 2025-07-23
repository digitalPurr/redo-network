
import React from 'react';

export const AnimatedWavesTopTwo: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 590"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="topTwoGradient1" x1="18%" y1="12%" x2="82%" y2="88%">
            <stop offset="5%" stopColor="#0099ff" />
            <stop offset="95%" stopColor="#ff69b4" />
          </linearGradient>
          <linearGradient id="topTwoGradient2" x1="25%" y1="20%" x2="75%" y2="80%">
            <stop offset="0%" stopColor="#ff69b4" />
            <stop offset="100%" stopColor="#0099ff" />
          </linearGradient>
        </defs>

        <style>
          {`
            .top-two-wave-path-1 {
              animation: topTwoWaveAnim1 7s ease-in-out infinite;
              transform-origin: center;
            }
            .top-two-wave-path-2 {
              animation: topTwoWaveAnim2 9s ease-in-out infinite reverse;
              transform-origin: center;
            }

            @keyframes topTwoWaveAnim1 {
              0%, 100% {
                d: path("M 0,600 L 0,200 C 80,180 160,160 240,170 C 320,180 400,220 480,240 C 560,260 640,260 720,250 C 800,240 880,220 960,210 C 1040,200 1120,200 1200,210 C 1280,220 1360,240 1440,260 L 1440,600 L 0,600 Z");
              }
              25% {
                d: path("M 0,600 L 0,220 C 72,200 144,180 216,190 C 288,200 360,240 432,260 C 504,280 576,280 648,270 C 720,260 792,240 864,230 C 936,220 1008,220 1080,230 C 1152,240 1224,260 1296,280 C 1368,300 1404,320 1440,340 L 1440,600 L 0,600 Z");
              }
              50% {
                d: path("M 0,600 L 0,180 C 96,160 192,140 288,150 C 384,160 480,200 576,220 C 672,240 768,240 864,230 C 960,220 1056,200 1152,190 C 1248,180 1344,180 1440,180 L 1440,600 L 0,600 Z");
              }
              75% {
                d: path("M 0,600 L 0,240 C 60,220 120,200 180,210 C 240,220 300,260 360,280 C 420,300 480,300 540,290 C 600,280 660,260 720,250 C 780,240 840,240 900,250 C 960,260 1020,280 1080,290 C 1140,300 1200,300 1260,310 C 1320,320 1380,340 1440,360 L 1440,600 L 0,600 Z");
              }
            }

            @keyframes topTwoWaveAnim2 {
              0%, 100% {
                d: path("M 0,600 L 0,350 C 90,330 180,310 270,320 C 360,330 450,370 540,390 C 630,410 720,410 810,400 C 900,390 990,370 1080,360 C 1170,350 1260,350 1350,360 C 1440,370 1440,390 1440,410 L 1440,600 L 0,600 Z");
              }
              25% {
                d: path("M 0,600 L 0,370 C 108,350 216,330 324,340 C 432,350 540,390 648,410 C 756,430 864,430 972,420 C 1080,410 1188,390 1296,380 C 1404,370 1440,370 1440,370 L 1440,600 L 0,600 Z");
              }
              50% {
                d: path("M 0,600 L 0,330 C 120,310 240,290 360,300 C 480,310 600,350 720,370 C 840,390 960,390 1080,380 C 1200,370 1320,350 1440,330 L 1440,600 L 0,600 Z");
              }
              75% {
                d: path("M 0,600 L 0,390 C 72,370 144,350 216,360 C 288,370 360,410 432,430 C 504,450 576,450 648,440 C 720,430 792,410 864,400 C 936,390 1008,390 1080,400 C 1152,410 1224,430 1296,440 C 1368,450 1404,450 1440,450 L 1440,600 L 0,600 Z");
              }
            }
          `}
        </style>

        {/* Second wave layer - bottom */}
        <path
          className="top-two-wave-path-2"
          fill="url(#topTwoGradient2)"
          fillOpacity="0.4"
          d="M 0,600 L 0,350 C 90,330 180,310 270,320 C 360,330 450,370 540,390 C 630,410 720,410 810,400 C 900,390 990,370 1080,360 C 1170,350 1260,350 1350,360 C 1440,370 1440,390 1440,410 L 1440,600 L 0,600 Z"
          transform="rotate(180 720 300)"
        />

        {/* First wave layer - top */}
        <path
          className="top-two-wave-path-1"
          fill="url(#topTwoGradient1)"
          fillOpacity="0.5"
          d="M 0,600 L 0,200 C 80,180 160,160 240,170 C 320,180 400,220 480,240 C 560,260 640,260 720,250 C 800,240 880,220 960,210 C 1040,200 1120,200 1200,210 C 1280,220 1360,240 1440,260 L 1440,600 L 0,600 Z"
          transform="rotate(180 720 300)"
        />
      </svg>
    </div>
  );
};

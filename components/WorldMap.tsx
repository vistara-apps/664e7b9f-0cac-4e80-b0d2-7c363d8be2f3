'use client';

import { MapPin } from 'lucide-react';

export function WorldMap() {
  const deliveryPoints = [
    { id: 1, x: '25%', y: '35%', count: 12 },
    { id: 2, x: '45%', y: '28%', count: 8 },
    { id: 3, x: '65%', y: '42%', count: 15 },
    { id: 4, x: '35%', y: '55%', count: 6 },
    { id: 5, x: '55%', y: '38%', count: 20 },
  ];

  return (
    <div className="relative w-full h-64 glass-card p-6 overflow-hidden">
      {/* World Map Background */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1000 500" className="w-full h-full">
          {/* Simplified world map paths */}
          <path
            d="M150,200 Q200,180 250,200 L300,190 Q350,200 400,210 L450,200 Q500,190 550,200 L600,195 Q650,200 700,205 L750,200"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M100,250 Q150,240 200,250 L250,245 Q300,250 350,255 L400,250 Q450,245 500,250 L550,248 Q600,250 650,252 L700,250"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M200,300 Q250,290 300,300 L350,295 Q400,300 450,305 L500,300 Q550,295 600,300 L650,298"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Delivery Points */}
      {deliveryPoints.map((point) => (
        <div
          key={point.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
          style={{ left: point.x, top: point.y }}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping absolute"></div>
            <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
              <MapPin className="w-2 h-2 text-white" />
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {point.count} deliveries
            </div>
          </div>
        </div>
      ))}

      {/* Animated Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(249,115,22,0)" />
            <stop offset="50%" stopColor="rgba(249,115,22,0.8)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0)" />
          </linearGradient>
        </defs>
        
        {/* Animated delivery routes */}
        <path
          d="M250,175 Q400,150 550,175"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M350,275 Q500,250 650,275"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-sm text-white text-opacity-70">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span>Active Deliveries</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 border border-orange-500 rounded-full"></div>
          <span>Delivery Zones</span>
        </div>
      </div>
    </div>
  );
}

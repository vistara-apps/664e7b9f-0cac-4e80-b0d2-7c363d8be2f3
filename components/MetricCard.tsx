'use client';

import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  subtitle?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  subtitle 
}: MetricCardProps) {
  const changeColors = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-gray-400',
  };

  return (
    <div className="metric-card animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-white text-opacity-70 text-sm font-medium mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-white mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-white text-opacity-50 text-xs">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-12 h-12 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-orange-400" />
          </div>
        )}
      </div>
      
      {change && (
        <div className="mt-4 pt-4 border-t border-white border-opacity-10">
          <span className={`text-sm font-medium ${changeColors[changeType]}`}>
            {changeType === 'positive' ? '↗' : changeType === 'negative' ? '↘' : '→'} {change}
          </span>
          <span className="text-white text-opacity-50 text-sm ml-2">
            vs last period
          </span>
        </div>
      )}
    </div>
  );
}

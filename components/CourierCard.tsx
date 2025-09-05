'use client';

import { Courier } from '@/lib/types';
import { VEHICLE_TYPES } from '@/lib/constants';
import { formatAddress } from '@/lib/utils';
import { Star, MapPin, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface CourierCardProps {
  courier: Courier;
  variant?: 'courier' | 'business';
  showActions?: boolean;
  onViewProfile?: (courierId: string) => void;
  onAssignDelivery?: (courierId: string) => void;
}

export function CourierCard({ 
  courier, 
  variant = 'courier',
  showActions = true,
  onViewProfile,
  onAssignDelivery 
}: CourierCardProps) {
  const verificationIcons = {
    verified: <CheckCircle className="w-4 h-4 text-green-400" />,
    pending: <Clock className="w-4 h-4 text-yellow-400" />,
    unverified: <AlertCircle className="w-4 h-4 text-red-400" />,
  };

  const verificationColors = {
    verified: 'text-green-400 bg-green-500',
    pending: 'text-yellow-400 bg-yellow-500',
    unverified: 'text-red-400 bg-red-500',
  };

  return (
    <div className="glass-card p-6 hover:bg-opacity-15 transition-all duration-200 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-lg">{courier.avatar || '👤'}</span>
          </div>
          <div>
            <h3 className="font-semibold text-white">{courier.name}</h3>
            <p className="text-white text-opacity-70 text-sm">
              {formatAddress(courier.walletAddress)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${verificationColors[courier.verificationStatus]} bg-opacity-20`}>
            <div className="flex items-center space-x-1">
              {verificationIcons[courier.verificationStatus]}
              <span className="capitalize">{courier.verificationStatus}</span>
            </div>
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-white bg-opacity-5 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-lg font-bold text-white">{courier.reputationScore}</span>
          </div>
          <p className="text-white text-opacity-70 text-xs">Rating</p>
        </div>
        
        <div className="text-center p-3 bg-white bg-opacity-5 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Truck className="w-4 h-4 text-blue-400" />
            <span className="text-lg font-bold text-white">
              {VEHICLE_TYPES[courier.vehicleType].icon}
            </span>
          </div>
          <p className="text-white text-opacity-70 text-xs">
            {VEHICLE_TYPES[courier.vehicleType].label}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-white text-opacity-70">
          <MapPin className="w-4 h-4" />
          <span>Available in Downtown area</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-white text-opacity-70">
          <Clock className="w-4 h-4" />
          <span>Last active 2 hours ago</span>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex space-x-3">
          <button
            onClick={() => onViewProfile?.(courier.courierId)}
            className="btn-outline flex-1"
          >
            View Profile
          </button>
          
          {courier.verificationStatus === 'verified' && onAssignDelivery && (
            <button
              onClick={() => onAssignDelivery(courier.courierId)}
              className="btn-primary flex-1"
            >
              Assign Delivery
            </button>
          )}
        </div>
      )}
    </div>
  );
}

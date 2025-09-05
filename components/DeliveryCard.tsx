'use client';

import { DeliveryRequest, Courier } from '@/lib/types';
import { URGENCY_LEVELS, DELIVERY_STATUS, VEHICLE_TYPES } from '@/lib/constants';
import { formatCurrency, formatDistance, getTimeAgo } from '@/lib/utils';
import { MapPin, Clock, User, Package } from 'lucide-react';

interface DeliveryCardProps {
  delivery: DeliveryRequest;
  courier?: Courier;
  variant?: 'deliveryRequest' | 'compact';
  onAccept?: (deliveryId: string) => void;
  onViewDetails?: (deliveryId: string) => void;
}

export function DeliveryCard({ 
  delivery, 
  courier, 
  variant = 'deliveryRequest',
  onAccept,
  onViewDetails 
}: DeliveryCardProps) {
  const urgencyConfig = URGENCY_LEVELS[delivery.urgency];
  const statusConfig = DELIVERY_STATUS[delivery.status];
  
  return (
    <div className="glass-card p-6 hover:bg-opacity-15 transition-all duration-200 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{delivery.itemDescription}</h3>
            <p className="text-white text-opacity-70 text-sm">
              {getTimeAgo(delivery.createdAt)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyConfig.color} bg-white bg-opacity-10`}>
            {urgencyConfig.label}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color} bg-white bg-opacity-10`}>
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Locations */}
      <div className="space-y-3 mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <div>
            <p className="text-white text-opacity-70 text-xs">Pickup</p>
            <p className="text-white text-sm">{delivery.pickupAddress}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
            <MapPin className="w-3 h-3 text-white" />
          </div>
          <div>
            <p className="text-white text-opacity-70 text-xs">Drop-off</p>
            <p className="text-white text-sm">{delivery.dropoffAddress}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-white text-opacity-70">
          {delivery.estimatedDistance && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{formatDistance(delivery.estimatedDistance)}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>~30 min</span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold text-gradient">
            {formatCurrency(delivery.offeredBountyUSD)}
          </p>
          <p className="text-white text-opacity-70 text-xs">Bounty</p>
        </div>
      </div>

      {/* Courier Info (if assigned) */}
      {courier && (
        <div className="flex items-center space-x-3 mb-4 p-3 bg-white bg-opacity-5 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-sm">{courier.avatar || '👤'}</span>
          </div>
          <div className="flex-1">
            <p className="text-white font-medium text-sm">{courier.name}</p>
            <div className="flex items-center space-x-2 text-xs text-white text-opacity-70">
              <span>⭐ {courier.reputationScore}</span>
              <span>•</span>
              <span>{VEHICLE_TYPES[courier.vehicleType].icon} {VEHICLE_TYPES[courier.vehicleType].label}</span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3">
        {delivery.status === 'pending' && onAccept && (
          <button
            onClick={() => onAccept(delivery.requestId)}
            className="btn-primary flex-1"
          >
            Accept Bounty
          </button>
        )}
        
        <button
          onClick={() => onViewDetails?.(delivery.requestId)}
          className="btn-outline flex-1"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

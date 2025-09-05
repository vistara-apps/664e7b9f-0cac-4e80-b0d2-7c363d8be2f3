export interface Business {
  businessId: string;
  name: string;
  contactInfo: string;
  walletAddress: string;
  reputationScore: number;
}

export interface Courier {
  courierId: string;
  name: string;
  walletAddress: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  reputationScore: number;
  vehicleType: 'bike' | 'car' | 'motorcycle' | 'van';
  avatar?: string;
}

export interface DeliveryRequest {
  requestId: string;
  businessId: string;
  pickupAddress: string;
  dropoffAddress: string;
  itemDescription: string;
  offeredBountyUSD: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  acceptedByCourierId?: string;
  estimatedDistance?: number;
  urgency: 'low' | 'medium' | 'high';
}

export interface DeliveryTransaction {
  transactionId: string;
  requestId: string;
  courierId: string;
  amountUSD: number;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
}

export interface DeliveryMetrics {
  totalDeliveries: number;
  completionRate: number;
  averageRating: number;
  totalEarnings: number;
}

export interface DashboardStats {
  totalRequests: number;
  activeDeliveries: number;
  completedDeliveries: number;
  totalRevenue: number;
  growthRate: number;
}

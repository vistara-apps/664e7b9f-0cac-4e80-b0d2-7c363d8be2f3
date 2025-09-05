export const VEHICLE_TYPES = {
  bike: { label: 'Bike', icon: '🚲' },
  car: { label: 'Car', icon: '🚗' },
  motorcycle: { label: 'Motorcycle', icon: '🏍️' },
  van: { label: 'Van', icon: '🚐' },
} as const;

export const URGENCY_LEVELS = {
  low: { label: 'Standard', color: 'text-green-400', bgColor: 'bg-green-500' },
  medium: { label: 'Priority', color: 'text-yellow-400', bgColor: 'bg-yellow-500' },
  high: { label: 'Urgent', color: 'text-red-400', bgColor: 'bg-red-500' },
} as const;

export const DELIVERY_STATUS = {
  pending: { label: 'Available', color: 'text-blue-400', bgColor: 'bg-blue-500' },
  accepted: { label: 'Accepted', color: 'text-orange-400', bgColor: 'bg-orange-500' },
  in_progress: { label: 'In Progress', color: 'text-purple-400', bgColor: 'bg-purple-500' },
  completed: { label: 'Completed', color: 'text-green-400', bgColor: 'bg-green-500' },
  cancelled: { label: 'Cancelled', color: 'text-red-400', bgColor: 'bg-red-500' },
} as const;

export const MOCK_COURIERS = [
  {
    courierId: '1',
    name: 'Alex Chen',
    walletAddress: '0x1234...5678',
    verificationStatus: 'verified' as const,
    reputationScore: 4.8,
    vehicleType: 'bike' as const,
    avatar: '👨‍💼',
  },
  {
    courierId: '2',
    name: 'Sarah Johnson',
    walletAddress: '0x2345...6789',
    verificationStatus: 'verified' as const,
    reputationScore: 4.9,
    vehicleType: 'car' as const,
    avatar: '👩‍💼',
  },
  {
    courierId: '3',
    name: 'Mike Rodriguez',
    walletAddress: '0x3456...7890',
    verificationStatus: 'pending' as const,
    reputationScore: 4.6,
    vehicleType: 'motorcycle' as const,
    avatar: '👨‍🔧',
  },
];

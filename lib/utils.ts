export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatAddress(address: string): string {
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export function generateMockData() {
  const deliveryRequests = [
    {
      requestId: '1',
      businessId: 'biz1',
      pickupAddress: '123 Main St, Downtown',
      dropoffAddress: '456 Oak Ave, Uptown',
      itemDescription: 'Restaurant order - 2 meals',
      offeredBountyUSD: 15,
      status: 'pending' as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      estimatedDistance: 2.3,
      urgency: 'medium' as const,
    },
    {
      requestId: '2',
      businessId: 'biz2',
      pickupAddress: '789 Pine St, Midtown',
      dropoffAddress: '321 Elm Dr, Westside',
      itemDescription: 'Pharmacy prescription',
      offeredBountyUSD: 25,
      status: 'accepted' as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      acceptedByCourierId: '1',
      estimatedDistance: 4.1,
      urgency: 'high' as const,
    },
    {
      requestId: '3',
      businessId: 'biz3',
      pickupAddress: '555 Cedar Blvd, Eastside',
      dropoffAddress: '777 Maple Ln, Southside',
      itemDescription: 'Office supplies package',
      offeredBountyUSD: 12,
      status: 'completed' as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      acceptedByCourierId: '2',
      estimatedDistance: 1.8,
      urgency: 'low' as const,
    },
  ];

  return { deliveryRequests };
}

'use client';

import { useEffect, useState } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { MetricCard } from '@/components/MetricCard';
import { DeliveryCard } from '@/components/DeliveryCard';
import { CourierCard } from '@/components/CourierCard';
import { DeliveryChart } from '@/components/DeliveryChart';
import { WorldMap } from '@/components/WorldMap';
import { generateMockData } from '@/lib/utils';
import { MOCK_COURIERS } from '@/lib/constants';
import { 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star
} from 'lucide-react';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [mockData, setMockData] = useState(generateMockData());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFrameReady();
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [setFrameReady]);

  const handleAcceptDelivery = (deliveryId: string) => {
    console.log('Accepting delivery:', deliveryId);
    // Here you would integrate with smart contracts
  };

  const handleViewDetails = (deliveryId: string) => {
    console.log('Viewing delivery details:', deliveryId);
  };

  const handleViewProfile = (courierId: string) => {
    console.log('Viewing courier profile:', courierId);
  };

  const handleAssignDelivery = (courierId: string) => {
    console.log('Assigning delivery to courier:', courierId);
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </AppShell>
    );
  }

  const completedDeliveries = mockData.deliveryRequests.filter(d => d.status === 'completed').length;
  const activeDeliveries = mockData.deliveryRequests.filter(d => d.status === 'accepted').length;
  const totalRevenue = mockData.deliveryRequests
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + d.offeredBountyUSD, 0);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Ship & Earn Guild</h1>
          <p className="text-white text-opacity-70 text-lg max-w-2xl mx-auto">
            On-demand deliveries, on-chain rewards. Connect businesses with couriers for efficient service on the Base network.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Deliveries"
            value="2,550"
            change="+12.5%"
            changeType="positive"
            icon={Package}
            subtitle="This month"
          />
          <MetricCard
            title="Completion Rate"
            value="96.2%"
            change="+2.1%"
            changeType="positive"
            icon={CheckCircle}
            subtitle="Success rate"
          />
          <MetricCard
            title="Active Couriers"
            value={MOCK_COURIERS.length}
            change="+5"
            changeType="positive"
            icon={Users}
            subtitle="Online now"
          />
          <MetricCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            change="+18.7%"
            changeType="positive"
            icon={DollarSign}
            subtitle="USDC earned"
          />
        </div>

        {/* World Map Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Delivery Network</h2>
          <WorldMap />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Daily Deliveries</h3>
            <DeliveryChart type="bar" dataKey="deliveries" />
          </div>
          
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Earnings Trend</h3>
            <DeliveryChart type="line" dataKey="earnings" />
          </div>
        </div>

        {/* Active Deliveries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Active Deliveries</h2>
            <button className="btn-primary">
              Post New Delivery
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockData.deliveryRequests.slice(0, 4).map((delivery) => {
              const courier = delivery.acceptedByCourierId 
                ? MOCK_COURIERS.find(c => c.courierId === delivery.acceptedByCourierId)
                : undefined;
              
              return (
                <DeliveryCard
                  key={delivery.requestId}
                  delivery={delivery}
                  courier={courier}
                  onAccept={handleAcceptDelivery}
                  onViewDetails={handleViewDetails}
                />
              );
            })}
          </div>
        </div>

        {/* Top Couriers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Top Couriers</h2>
            <button className="btn-outline">
              View All Couriers
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_COURIERS.map((courier) => (
              <CourierCard
                key={courier.courierId}
                courier={courier}
                onViewProfile={handleViewProfile}
                onAssignDelivery={handleAssignDelivery}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Average Delivery Time</h3>
            <p className="text-3xl font-bold text-blue-400">28 min</p>
            <p className="text-white text-opacity-70 text-sm">2 min faster than last week</p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Average Rating</h3>
            <p className="text-3xl font-bold text-green-400">4.8</p>
            <p className="text-white text-opacity-70 text-sm">Based on 1,247 reviews</p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Growth Rate</h3>
            <p className="text-3xl font-bold text-purple-400">+24%</p>
            <p className="text-white text-opacity-70 text-sm">Month over month</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

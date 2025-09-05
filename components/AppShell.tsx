'use client';

import { useState } from 'react';
import { 
  Package, 
  Users, 
  TrendingUp, 
  MapPin, 
  Settings2, 
  Menu, 
  X,
  Home,
  Truck,
  DollarSign,
  Star
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'embeddedInFrame' | 'fullscreen';
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'deliveries', label: 'Deliveries', icon: Package },
  { id: 'couriers', label: 'Couriers', icon: Users },
  { id: 'earnings', label: 'Earnings', icon: DollarSign },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'locations', label: 'Locations', icon: MapPin },
  { id: 'reputation', label: 'Reputation', icon: Star },
  { id: 'fleet', label: 'Fleet Status', icon: Truck },
  { id: 'settings', label: 'Settings', icon: Settings2 },
];

export function AppShell({ children, variant = 'fullscreen' }: AppShellProps) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isEmbedded = variant === 'embeddedInFrame';

  return (
    <div className={`flex h-screen ${isEmbedded ? 'max-w-screen-sm mx-auto' : ''}`}>
      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50
        w-64 glass-card transition-transform duration-200 ease-in-out
        ${isEmbedded ? 'hidden lg:block lg:w-48' : ''}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-white border-opacity-20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gradient">Ship & Guild</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`sidebar-item w-full ${
                  activeItem === item.id ? 'active' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className={isEmbedded ? 'hidden xl:block' : ''}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="glass-card p-4 flex items-center justify-between border-b border-white border-opacity-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-white">Ship & Earn Guild</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="btn-outline text-sm px-4 py-2">
              Connect Wallet
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

const deliveryData = [
  { name: 'Mon', deliveries: 24, earnings: 320 },
  { name: 'Tue', deliveries: 32, earnings: 450 },
  { name: 'Wed', deliveries: 28, earnings: 380 },
  { name: 'Thu', deliveries: 45, earnings: 620 },
  { name: 'Fri', deliveries: 52, earnings: 720 },
  { name: 'Sat', deliveries: 38, earnings: 510 },
  { name: 'Sun', deliveries: 29, earnings: 390 },
];

interface DeliveryChartProps {
  type?: 'bar' | 'line';
  dataKey?: 'deliveries' | 'earnings';
}

export function DeliveryChart({ type = 'bar', dataKey = 'deliveries' }: DeliveryChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-white border-opacity-20">
          <p className="text-white font-medium">{label}</p>
          <p className="text-orange-400">
            {dataKey === 'deliveries' ? 'Deliveries' : 'Earnings'}: {payload[0].value}
            {dataKey === 'earnings' ? ' USDC' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'bar' ? (
          <BarChart data={deliveryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            />
            <Bar 
              dataKey={dataKey} 
              fill="url(#gradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
            <CustomTooltip />
          </BarChart>
        ) : (
          <LineChart data={deliveryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke="#f97316"
              strokeWidth={3}
              dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
            />
            <CustomTooltip />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

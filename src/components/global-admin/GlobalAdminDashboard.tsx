
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import AnalyticsWidgets from './analytics/AnalyticsWidgets';
import SystemMetrics from './analytics/SystemMetrics';
import RecentActivityFeed from './analytics/RecentActivityFeed';

interface GlobalAdminDashboardProps {
  isSidebarCollapsed?: boolean;
}

const GlobalAdminDashboard: React.FC<GlobalAdminDashboardProps> = ({ isSidebarCollapsed = false }) => {
  // Mock analytics data
  const analyticsData = {
    totalOrganizations: 142,
    totalUsers: 8456,
    totalBookings: 25678,
    activeOrganizations: 128,
    revenue: 125000,
    averageBookingDuration: 4.5,
    topLocation: 'Lagos, Nigeria',
    growth: {
      organizations: 12,
      users: 18,
      bookings: 8,
      revenue: 15
    }
  };

  const usageData = [
    { month: 'Jan', bookings: 1800, revenue: 85000 },
    { month: 'Feb', bookings: 2100, revenue: 92000 },
    { month: 'Mar', bookings: 2400, revenue: 105000 },
    { month: 'Apr', bookings: 2200, revenue: 98000 },
    { month: 'May', bookings: 2800, revenue: 125000 },
    { month: 'Jun', bookings: 2600, revenue: 118000 },
  ];

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Enhanced KPI Widgets */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">Platform Overview</h2>
        <AnalyticsWidgets data={analyticsData} />
      </div>

      {/* Charts and Metrics Grid */}
      <div className={`grid gap-4 ${
        isSidebarCollapsed 
          ? 'grid-cols-1 xl:grid-cols-3' 
          : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
      }`}>
        {/* Booking Trends Chart */}
        <Card className="xl:col-span-2">
          <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
            <CardTitle className="text-sm md:text-lg">Booking Trends</CardTitle>
            <CardDescription className="text-xs md:text-sm">Monthly booking volume over time</CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            <div className="w-full h-[200px] md:h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    fontSize={9}
                    tick={{ fontSize: 9 }}
                  />
                  <YAxis 
                    fontSize={9}
                    tick={{ fontSize: 9 }}
                    width={30}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="bookings" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* System Metrics */}
        <SystemMetrics />
      </div>

      {/* Revenue Chart and Activity Feed */}
      <div className={`grid gap-4 ${
        isSidebarCollapsed 
          ? 'grid-cols-1 xl:grid-cols-2' 
          : 'grid-cols-1 lg:grid-cols-2'
      }`}>
        {/* Revenue Chart */}
        <Card>
          <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
            <CardTitle className="text-sm md:text-lg">Revenue Trends</CardTitle>
            <CardDescription className="text-xs md:text-sm">Monthly revenue growth</CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            <div className="w-full h-[200px] md:h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    fontSize={9}
                    tick={{ fontSize: 9 }}
                  />
                  <YAxis 
                    fontSize={9}
                    tick={{ fontSize: 9 }}
                    width={30}
                  />
                  <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <RecentActivityFeed />
      </div>
    </div>
  );
};

export default GlobalAdminDashboard;

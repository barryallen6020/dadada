import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface GlobalAdminDashboardProps {
  isSidebarCollapsed?: boolean;
}

const GlobalAdminDashboard: React.FC<GlobalAdminDashboardProps> = ({ isSidebarCollapsed = false }) => {
  // Mock data for demonstration
  const kpiData = {
    totalOrganizations: 142,
    totalUsers: 8456,
    totalBookings: 25678,
    monthlyRevenue: 125000,
    systemHealth: 99.2
  };

  const usageData = [
    { month: 'Jan', bookings: 1800, revenue: 85000 },
    { month: 'Feb', bookings: 2100, revenue: 92000 },
    { month: 'Mar', bookings: 2400, revenue: 105000 },
    { month: 'Apr', bookings: 2200, revenue: 98000 },
    { month: 'May', bookings: 2800, revenue: 125000 },
    { month: 'Jun', bookings: 2600, revenue: 118000 },
  ];

  const alerts = [
    { type: 'warning', message: '3 organizations pending verification', count: 3 },
    { type: 'error', message: '12 failed login attempts in last hour', count: 12 },
    { type: 'info', message: 'System maintenance scheduled for tonight', count: 1 },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-3 md:space-y-4 max-w-full overflow-hidden">
      {/* KPI Cards - More responsive grid */}
      <div className={`grid gap-2 md:gap-3 ${
        isSidebarCollapsed 
          ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
      }`}>
        <Card className="p-3 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
            <CardTitle className="text-xs md:text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-1 md:pt-2">
            <div className="text-lg md:text-2xl font-bold">{kpiData.totalOrganizations}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="p-3 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
            <CardTitle className="text-xs md:text-sm font-medium">Total Users</CardTitle>
            <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-1 md:pt-2">
            <div className="text-lg md:text-2xl font-bold">{kpiData.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card className="p-3 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
            <CardTitle className="text-xs md:text-sm font-medium">Bookings</CardTitle>
            <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-1 md:pt-2">
            <div className="text-lg md:text-2xl font-bold">{kpiData.totalBookings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="p-3 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
            <CardTitle className="text-xs md:text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-1 md:pt-2">
            <div className="text-lg md:text-2xl font-bold">₦{kpiData.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="p-3 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
            <CardTitle className="text-xs md:text-sm font-medium">System Health</CardTitle>
            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
          </CardHeader>
          <CardContent className="p-0 pt-1 md:pt-2">
            <div className="text-lg md:text-2xl font-bold">{kpiData.systemHealth}%</div>
            <p className="text-xs text-green-600">Excellent</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts - Responsive layout based on sidebar state */}
      <div className={`grid gap-3 md:gap-4 ${
        isSidebarCollapsed 
          ? 'grid-cols-1 xl:grid-cols-2' 
          : 'grid-cols-1 lg:grid-cols-2'
      }`}>
        <Card>
          <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
            <CardTitle className="text-sm md:text-lg">Booking Trends</CardTitle>
            <CardDescription className="text-xs md:text-sm">Monthly booking volume over time</CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            <div className="w-full h-[150px] sm:h-[200px] md:h-[250px]">
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

        <Card>
          <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
            <CardTitle className="text-sm md:text-lg">Revenue Trends</CardTitle>
            <CardDescription className="text-xs md:text-sm">Monthly revenue growth</CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            <div className="w-full h-[150px] sm:h-[200px] md:h-[250px]">
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
      </div>

      {/* Alerts - Compact design */}
      <Card>
        <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
          <CardTitle className="text-sm md:text-lg">System Alerts</CardTitle>
          <CardDescription className="text-xs md:text-sm">Recent alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-4 pt-0">
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <Alert key={index} className="p-2 md:p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {getAlertIcon(alert.type)}
                    <AlertDescription className="text-xs md:text-sm truncate">{alert.message}</AlertDescription>
                  </div>
                  <Badge 
                    variant={alert.type === 'error' ? 'destructive' : alert.type === 'warning' ? 'secondary' : 'default'}
                    className="flex-shrink-0 ml-2 text-xs"
                  >
                    {alert.count}
                  </Badge>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalAdminDashboard;

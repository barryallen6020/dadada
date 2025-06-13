
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp, 
  Plus, 
  FileText,
  AlertTriangle,
  Building2
} from 'lucide-react';
import { RevenueWidget } from './widgets/RevenueWidget';
import { OccupancyWidget } from './widgets/OccupancyWidget';
import { RecentBookingsList } from './widgets/RecentBookingsList';
import { PendingInvitesList } from './widgets/PendingInvitesList';
import { QuickActionTiles } from './widgets/QuickActionTiles';

const OwnerDashboard = () => {
  const stats = {
    totalRevenue: 45678.90,
    revenueChange: +12.5,
    occupancyRate: 78.5,
    occupancyChange: +5.2,
    totalBookings: 234,
    bookingsChange: +8.1,
    activeUsers: 156,
    usersChange: +15.3
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{stats.revenueChange}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{stats.occupancyChange}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{stats.bookingsChange}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{stats.usersChange}%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <QuickActionTiles />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <RevenueWidget />
          <PendingInvitesList />
        </div>
        
        <div className="space-y-6">
          <OccupancyWidget />
          <RecentBookingsList />
        </div>
      </div>

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
            System Alerts
          </CardTitle>
          <CardDescription>Important notifications requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div>
                <p className="font-medium text-amber-800">Payment method expiring soon</p>
                <p className="text-sm text-amber-600">Your credit card ending in 4242 expires in 5 days</p>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="font-medium text-blue-800">New workspace manager pending approval</p>
                <p className="text-sm text-blue-600">John Doe has requested manager access to Downtown Hub</p>
              </div>
              <Button variant="outline" size="sm">Review</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerDashboard;

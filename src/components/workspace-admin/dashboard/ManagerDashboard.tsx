
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Settings, 
  BarChart3,
  Plus
} from 'lucide-react';
import { RecentBookingsList } from './widgets/RecentBookingsList';
import { OccupancyWidget } from './widgets/OccupancyWidget';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
  const navigate = useNavigate();

  const stats = {
    todayBookings: 42,
    occupancyRate: 78.5,
    availableSeats: 23,
    maintenanceAlerts: 2
  };

  const quickActions = [
    {
      title: 'Manage Bookings',
      description: 'View and manage workspace bookings',
      icon: Calendar,
      action: () => navigate('/admin/workspace/bookings')
    },
    {
      title: 'Room Setup',
      description: 'Configure rooms and seating',
      icon: MapPin,
      action: () => navigate('/admin/workspace/rooms')
    },
    {
      title: 'Floor Plan',
      description: 'Edit workspace layout',
      icon: Settings,
      action: () => navigate('/admin/workspace/floor-map')
    },
    {
      title: 'Pricing',
      description: 'Manage pricing and promotions',
      icon: BarChart3,
      action: () => navigate('/admin/workspace/pricing')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayBookings}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Seats</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableSeats}</div>
            <p className="text-xs text-muted-foreground">
              Out of 120 total seats
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.maintenanceAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Maintenance required
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used workspace management tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-24 flex-col space-y-2"
                onClick={action.action}
              >
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <p className="text-sm font-medium">{action.title}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OccupancyWidget />
        <RecentBookingsList />
      </div>
    </div>
  );
};

export default ManagerDashboard;

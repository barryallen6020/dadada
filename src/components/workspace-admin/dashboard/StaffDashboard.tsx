
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  Clock,
  CheckCircle
} from 'lucide-react';
import { RecentBookingsList } from './widgets/RecentBookingsList';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const navigate = useNavigate();

  const stats = {
    checkInsToday: 28,
    currentOccupants: 45,
    pendingCheckIns: 5,
    completedTasks: 12
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Check-ins Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.checkInsToday}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Occupants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentOccupants}</div>
            <p className="text-xs text-muted-foreground">
              Active in workspace
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Check-ins</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingCheckIns}</div>
            <p className="text-xs text-muted-foreground">
              Require assistance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              Today's progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Staff Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Actions</CardTitle>
          <CardDescription>Common tasks and operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              className="h-16 flex flex-col space-y-1"
              onClick={() => navigate('/admin/workspace/bookings')}
            >
              <Calendar className="h-5 w-5" />
              <span>View Bookings</span>
            </Button>
            <Button 
              className="h-16 flex flex-col space-y-1"
              variant="outline"
              onClick={() => navigate('/admin/check-in')}
            >
              <Users className="h-5 w-5" />
              <span>Check-in Users</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <RecentBookingsList />
    </div>
  );
};

export default StaffDashboard;

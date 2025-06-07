
import React, { useState, useEffect } from 'react';
import HubManagerLayout from '@/components/layout/HubManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Building2, 
  Users, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign,
  Activity,
  Eye,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HubManagerDashboard = () => {
  const navigate = useNavigate();

  // Mock data for dashboard
  const hubStats = {
    totalWorkspaces: 4,
    totalCapacity: 80,
    currentOccupancy: 54,
    todayBookings: 87,
    monthlyRevenue: 157000,
    pendingApprovals: 12,
    maintenanceScheduled: 2,
    supportTickets: 5
  };

  const recentActivity = [
    { time: '10:30 AM', action: 'New booking approved', user: 'John Doe', workspace: 'Creative Studio' },
    { time: '10:15 AM', action: 'Check-in completed', user: 'Sarah Wilson', workspace: 'Tech Hub' },
    { time: '09:45 AM', action: 'Maintenance scheduled', workspace: 'Meeting Room Alpha', note: 'Chair replacement' },
    { time: '09:30 AM', action: 'Support ticket resolved', user: 'Mike Johnson', issue: 'Wi-Fi connectivity' },
    { time: '09:00 AM', action: 'Workspace availability updated', workspace: 'Quiet Zone', status: 'Active' }
  ];

  const occupancyData = [
    { time: '08:00', occupancy: 15 },
    { time: '09:00', occupancy: 35 },
    { time: '10:00', occupancy: 58 },
    { time: '11:00', occupancy: 72 },
    { time: '12:00', occupancy: 45 },
    { time: '13:00', occupancy: 38 },
    { time: '14:00', occupancy: 65 },
    { time: '15:00', occupancy: 68 },
    { time: '16:00', occupancy: 52 },
    { time: '17:00', occupancy: 28 }
  ];

  const revenueData = [
    { day: 'Mon', revenue: 18500 },
    { day: 'Tue', revenue: 22300 },
    { day: 'Wed', revenue: 19800 },
    { day: 'Thu', revenue: 25600 },
    { day: 'Fri', revenue: 28900 },
    { day: 'Sat', revenue: 15200 },
    { day: 'Sun', revenue: 12400 }
  ];

  const alerts = [
    { 
      type: 'urgent', 
      title: 'AC System Maintenance Required', 
      description: 'Meeting Room Alpha requires immediate attention',
      time: '30 minutes ago'
    },
    { 
      type: 'warning', 
      title: '12 Pending Booking Approvals', 
      description: 'Multiple bookings awaiting manager approval',
      time: '1 hour ago'
    },
    { 
      type: 'info', 
      title: 'Peak Capacity Reached', 
      description: 'Creative Studio at 95% capacity',
      time: '2 hours ago'
    }
  ];

  const workspaceStatus = [
    { name: 'Creative Studio', capacity: 24, current: 18, status: 'active', revenue: 45000 },
    { name: 'Tech Hub', capacity: 32, current: 24, status: 'active', revenue: 62000 },
    { name: 'Meeting Room Alpha', capacity: 8, current: 0, status: 'maintenance', revenue: 18000 },
    { name: 'Quiet Zone', capacity: 16, current: 12, status: 'active', revenue: 32000 }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'maintenance': return 'text-yellow-600 bg-yellow-50';
      case 'inactive': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const calculateOccupancyRate = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  return (
    <HubManagerLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-deskhive-navy">Hub Dashboard</h1>
            <p className="text-deskhive-darkgray">Overview of your workspace hub performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-deskhive-navy text-deskhive-navy">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
            <Button 
              className="bg-deskhive-orange hover:bg-deskhive-orange/90"
              onClick={() => navigate('/hubmanager/reports')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Full Reports
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-nav border-white/20 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate('/hubmanager/workspaces')}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Total Workspaces</p>
                  <p className="text-2xl font-bold text-deskhive-navy">{hubStats.totalWorkspaces}</p>
                  <p className="text-xs text-deskhive-darkgray">Capacity: {hubStats.totalCapacity}</p>
                </div>
                <Building2 className="h-8 w-8 text-deskhive-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate('/hubmanager/workspaces')}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Current Occupancy</p>
                  <p className="text-2xl font-bold text-deskhive-navy">{hubStats.currentOccupancy}</p>
                  <p className="text-xs text-green-600">
                    {calculateOccupancyRate(hubStats.currentOccupancy, hubStats.totalCapacity)}% capacity
                  </p>
                </div>
                <Users className="h-8 w-8 text-deskhive-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate('/hubmanager/bookings')}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Today's Bookings</p>
                  <p className="text-2xl font-bold text-deskhive-navy">{hubStats.todayBookings}</p>
                  <p className="text-xs text-yellow-600">{hubStats.pendingApprovals} pending approval</p>
                </div>
                <Calendar className="h-8 w-8 text-deskhive-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate('/hubmanager/reports')}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-deskhive-navy">₦{hubStats.monthlyRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </div>
                <DollarSign className="h-8 w-8 text-deskhive-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <Card className="glass-nav border-white/20">
            <CardHeader>
              <CardTitle className="text-deskhive-navy flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Priority Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <Alert key={index} className="border-white/20">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getAlertIcon(alert.type)}
                        <div>
                          <h4 className="font-medium text-deskhive-navy">{alert.title}</h4>
                          <p className="text-sm text-deskhive-darkgray">{alert.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-deskhive-darkgray">{alert.time}</span>
                        <Button size="sm" variant="outline" className="border-deskhive-orange text-deskhive-orange">
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-nav border-white/20">
            <CardHeader>
              <CardTitle className="text-deskhive-navy">Today's Occupancy</CardTitle>
              <CardDescription>Real-time occupancy throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="occupancy" stroke="#FF6B35" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardHeader>
              <CardTitle className="text-deskhive-navy">Weekly Revenue</CardTitle>
              <CardDescription>Daily revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#FF6B35" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workspace Status and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-nav border-white/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-deskhive-navy">Workspace Status</CardTitle>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-deskhive-navy text-deskhive-navy"
                  onClick={() => navigate('/hubmanager/workspaces')}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workspaceStatus.map((workspace, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-white/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-deskhive-orange/10">
                        <Building2 className="h-5 w-5 text-deskhive-orange" />
                      </div>
                      <div>
                        <h4 className="font-medium text-deskhive-navy">{workspace.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-deskhive-darkgray">
                            {workspace.current}/{workspace.capacity}
                          </span>
                          <Badge className={`${getStatusColor(workspace.status)} text-xs`}>
                            {workspace.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-deskhive-navy">
                        {calculateOccupancyRate(workspace.current, workspace.capacity)}%
                      </p>
                      <p className="text-xs text-deskhive-darkgray">
                        ₦{workspace.revenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardHeader>
              <CardTitle className="text-deskhive-navy">Recent Activity</CardTitle>
              <CardDescription>Latest updates across your hub</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-white/20 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-deskhive-orange/10 flex-shrink-0">
                      <Activity className="h-4 w-4 text-deskhive-orange" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-deskhive-navy">{activity.action}</p>
                      <div className="text-xs text-deskhive-darkgray">
                        {activity.user && <span>User: {activity.user}</span>}
                        {activity.workspace && <span> • {activity.workspace}</span>}
                        {activity.issue && <span> • {activity.issue}</span>}
                        {activity.note && <span> • {activity.note}</span>}
                      </div>
                    </div>
                    <span className="text-xs text-deskhive-darkgray flex-shrink-0">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="glass-nav border-white/20">
          <CardHeader>
            <CardTitle className="text-deskhive-navy">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-16 border-deskhive-orange text-deskhive-orange hover:bg-deskhive-orange hover:text-white"
                onClick={() => navigate('/hubmanager/bookings')}
              >
                <div className="text-center">
                  <Calendar className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm">Review Bookings</span>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-16 border-deskhive-orange text-deskhive-orange hover:bg-deskhive-orange hover:text-white"
                onClick={() => navigate('/hubmanager/check-in')}
              >
                <div className="text-center">
                  <CheckCircle className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm">Check-In Users</span>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-16 border-deskhive-orange text-deskhive-orange hover:bg-deskhive-orange hover:text-white"
                onClick={() => navigate('/hubmanager/maintenance')}
              >
                <div className="text-center">
                  <Clock className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm">Schedule Maintenance</span>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-16 border-deskhive-orange text-deskhive-orange hover:bg-deskhive-orange hover:text-white"
                onClick={() => navigate('/hubmanager/users')}
              >
                <div className="text-center">
                  <Users className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm">Manage Staff</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </HubManagerLayout>
  );
};

export default HubManagerDashboard;

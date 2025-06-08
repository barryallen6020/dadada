
import React, { useState } from 'react';
import HubManagerLayout from '@/components/layout/HubManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  Calendar, 
  Activity, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin
} from 'lucide-react';

const HubManagerWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([
    {
      id: 1,
      name: 'Creative Studio',
      location: 'Floor 1, Room A',
      capacity: 24,
      currentOccupancy: 18,
      todayBookings: 28,
      checkedIn: 16,
      status: 'active',
      revenue: 45000,
      type: 'Open Desk'
    },
    {
      id: 2,
      name: 'Tech Hub',
      location: 'Floor 2, Room B',
      capacity: 32,
      currentOccupancy: 24,
      todayBookings: 35,
      checkedIn: 22,
      status: 'active',
      revenue: 62000,
      type: 'Hot Desk'
    },
    {
      id: 3,
      name: 'Meeting Room Alpha',
      location: 'Floor 1, Room C',
      capacity: 8,
      currentOccupancy: 0,
      todayBookings: 6,
      checkedIn: 0,
      status: 'maintenance',
      revenue: 18000,
      type: 'Meeting Room'
    },
    {
      id: 4,
      name: 'Quiet Zone',
      location: 'Floor 3, Room A',
      capacity: 16,
      currentOccupancy: 12,
      todayBookings: 18,
      checkedIn: 10,
      status: 'active',
      revenue: 32000,
      type: 'Focus Area'
    }
  ]);

  const toggleWorkspaceStatus = (id: number) => {
    setWorkspaces(prev => prev.map(workspace => 
      workspace.id === id 
        ? { ...workspace, status: workspace.status === 'active' ? 'inactive' : 'active' }
        : workspace
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'maintenance': return 'text-yellow-600 bg-yellow-50';
      case 'inactive': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />;
      case 'maintenance': return <AlertTriangle className="h-3 w-3 md:h-4 md:w-4" />;
      case 'inactive': return <Clock className="h-3 w-3 md:h-4 md:w-4" />;
      default: return <Activity className="h-3 w-3 md:h-4 md:w-4" />;
    }
  };

  const calculateOccupancyRate = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  return (
    <HubManagerLayout>
      <div className="space-y-4 md:space-y-6 px-2 sm:px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 md:gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-deskhive-navy">Workspace Management</h1>
            <p className="text-xs md:text-sm text-deskhive-darkgray">Monitor and control all workspaces in your hub</p>
          </div>
          <Button className="bg-deskhive-orange hover:bg-deskhive-orange/90 text-xs md:text-sm" size="sm">
            <Settings className="h-3 w-3 md:h-4 md:w-4 mr-2" />
            Hub Settings
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="glass-nav border-white/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-deskhive-darkgray">Total Workspaces</p>
                  <p className="text-lg md:text-2xl font-bold text-deskhive-navy">{workspaces.length}</p>
                </div>
                <Building2 className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-deskhive-darkgray">Total Capacity</p>
                  <p className="text-lg md:text-2xl font-bold text-deskhive-navy">
                    {workspaces.reduce((sum, w) => sum + w.capacity, 0)}
                  </p>
                </div>
                <Users className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-deskhive-darkgray">Current Occupancy</p>
                  <p className="text-lg md:text-2xl font-bold text-deskhive-navy">
                    {workspaces.reduce((sum, w) => sum + w.currentOccupancy, 0)}
                  </p>
                </div>
                <Activity className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-deskhive-darkgray">Today's Bookings</p>
                  <p className="text-lg md:text-2xl font-bold text-deskhive-navy">
                    {workspaces.reduce((sum, w) => sum + w.todayBookings, 0)}
                  </p>
                </div>
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workspace List */}
        <Tabs defaultValue="grid" className="space-y-3 md:space-y-4">
          <TabsList className="glass-nav border-white/20 text-xs md:text-sm">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-3 md:space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {workspaces.map((workspace) => (
                <Card key={workspace.id} className="glass-nav border-white/20 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2 md:pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-base md:text-lg text-deskhive-navy truncate">{workspace.name}</CardTitle>
                        <div className="flex items-center gap-1 text-xs md:text-sm text-deskhive-darkgray mt-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{workspace.location}</span>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(workspace.status)} border-0 text-xs ml-2`}>
                        {getStatusIcon(workspace.status)}
                        <span className="ml-1 capitalize hidden sm:inline">{workspace.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3 md:space-y-4">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-deskhive-darkgray">Type:</span>
                      <span className="font-medium text-deskhive-navy">{workspace.type}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-deskhive-darkgray">Occupancy:</span>
                        <span className="font-medium text-deskhive-navy">
                          {workspace.currentOccupancy}/{workspace.capacity} 
                          ({calculateOccupancyRate(workspace.currentOccupancy, workspace.capacity)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-deskhive-orange h-2 rounded-full transition-all" 
                          style={{ width: `${calculateOccupancyRate(workspace.currentOccupancy, workspace.capacity)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                      <div>
                        <span className="text-deskhive-darkgray">Bookings:</span>
                        <p className="font-medium text-deskhive-navy">{workspace.todayBookings}</p>
                      </div>
                      <div>
                        <span className="text-deskhive-darkgray">Checked In:</span>
                        <p className="font-medium text-deskhive-navy">{workspace.checkedIn}</p>
                      </div>
                    </div>

                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-deskhive-darkgray">Monthly Revenue:</span>
                      <span className="font-medium text-deskhive-navy">₦{workspace.revenue.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/20">
                      <div className="flex items-center gap-2">
                        <span className="text-xs md:text-sm text-deskhive-darkgray">Available:</span>
                        <Switch 
                          checked={workspace.status === 'active'}
                          onCheckedChange={() => toggleWorkspaceStatus(workspace.id)}
                        />
                      </div>
                      <Button variant="outline" size="sm" className="border-deskhive-orange text-deskhive-orange hover:bg-deskhive-orange hover:text-white text-xs">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-3 md:space-y-4">
            <Card className="glass-nav border-white/20">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="text-deskhive-navy text-base md:text-lg">Workspace Overview</CardTitle>
                <CardDescription className="text-xs md:text-sm">Detailed list view of all workspaces</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {workspaces.map((workspace) => (
                    <div key={workspace.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 border border-white/20 rounded-lg gap-3">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-deskhive-navy text-sm md:text-base">{workspace.name}</h3>
                          <p className="text-xs md:text-sm text-deskhive-darkgray">{workspace.location} • {workspace.type}</p>
                        </div>
                        <Badge className={`${getStatusColor(workspace.status)} border-0 text-xs`}>
                          {getStatusIcon(workspace.status)}
                          <span className="ml-1 capitalize">{workspace.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-4 md:gap-6 text-xs md:text-sm">
                        <div className="text-center">
                          <p className="text-deskhive-darkgray">Occupancy</p>
                          <p className="font-medium text-deskhive-navy">
                            {workspace.currentOccupancy}/{workspace.capacity}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-deskhive-darkgray">Bookings</p>
                          <p className="font-medium text-deskhive-navy">{workspace.todayBookings}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-deskhive-darkgray">Revenue</p>
                          <p className="font-medium text-deskhive-navy">₦{workspace.revenue.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3">
                          <Switch 
                            checked={workspace.status === 'active'}
                            onCheckedChange={() => toggleWorkspaceStatus(workspace.id)}
                          />
                          <Button variant="outline" size="sm" className="border-deskhive-orange text-deskhive-orange hover:bg-deskhive-orange hover:text-white text-xs">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </HubManagerLayout>
  );
};

export default HubManagerWorkspaces;

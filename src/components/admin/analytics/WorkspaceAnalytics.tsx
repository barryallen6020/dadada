
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface WorkspaceAnalyticsProps {
  isSidebarCollapsed?: boolean;
}

const WorkspaceAnalytics: React.FC<WorkspaceAnalyticsProps> = ({ isSidebarCollapsed = false }) => {
  const occupancyData = [
    { name: 'Mon', occupancy: 85, capacity: 100 },
    { name: 'Tue', occupancy: 92, capacity: 100 },
    { name: 'Wed', occupancy: 78, capacity: 100 },
    { name: 'Thu', occupancy: 95, capacity: 100 },
    { name: 'Fri', occupancy: 88, capacity: 100 },
    { name: 'Sat', occupancy: 65, capacity: 100 },
    { name: 'Sun', occupancy: 45, capacity: 100 }
  ];

  const utilizationData = [
    { name: 'Meeting Rooms', value: 35, color: '#8884d8' },
    { name: 'Hot Desks', value: 45, color: '#82ca9d' },
    { name: 'Private Offices', value: 20, color: '#ffc658' }
  ];

  const workspaceStats = [
    { name: 'Lagos Hub', occupancy: 92, revenue: '₦450,000', bookings: 156 },
    { name: 'Abuja Center', occupancy: 78, revenue: '₦320,000', bookings: 98 },
    { name: 'Port Harcourt', occupancy: 85, revenue: '₦380,000', bookings: 124 },
    { name: 'Ibadan Office', occupancy: 69, revenue: '₦240,000', bookings: 87 }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Workspace Analytics</h2>
      
      <div className={`grid gap-4 ${
        isSidebarCollapsed 
          ? 'grid-cols-1 xl:grid-cols-2' 
          : 'grid-cols-1 lg:grid-cols-2'
      }`}>
        {/* Occupancy Trends */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Occupancy Trends</CardTitle>
            <CardDescription>Average occupancy rate across all workspaces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Occupancy']} />
                  <Bar dataKey="occupancy" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Space Utilization */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Space Utilization</CardTitle>
            <CardDescription>Breakdown by workspace type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={utilizationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {utilizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {utilizationData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Workspace Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Workspace Performance</CardTitle>
          <CardDescription>Individual workspace metrics and revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workspaceStats.map((workspace, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{workspace.name}</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Occupancy:</span>
                      <Progress value={workspace.occupancy} className="w-20 h-2" />
                      <span className="text-sm font-medium">{workspace.occupancy}%</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {workspace.bookings} bookings
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    {workspace.revenue}
                  </div>
                  <div className="text-sm text-gray-500">This month</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceAnalytics;


import React, { useState } from 'react';
import HubManagerLayout from '@/components/layout/HubManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  FileText,
  Filter,
  RefreshCw
} from 'lucide-react';

const HubManagerReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedWorkspace, setSelectedWorkspace] = useState('all');

  // Mock data for charts
  const occupancyData = [
    { date: '2024-06-01', 'Creative Studio': 75, 'Tech Hub': 82, 'Meeting Room': 45, 'Quiet Zone': 68 },
    { date: '2024-06-02', 'Creative Studio': 78, 'Tech Hub': 85, 'Meeting Room': 52, 'Quiet Zone': 71 },
    { date: '2024-06-03', 'Creative Studio': 82, 'Tech Hub': 88, 'Meeting Room': 48, 'Quiet Zone': 74 },
    { date: '2024-06-04', 'Creative Studio': 79, 'Tech Hub': 90, 'Meeting Room': 55, 'Quiet Zone': 69 },
    { date: '2024-06-05', 'Creative Studio': 85, 'Tech Hub': 92, 'Meeting Room': 60, 'Quiet Zone': 76 },
    { date: '2024-06-06', 'Creative Studio': 88, 'Tech Hub': 89, 'Meeting Room': 58, 'Quiet Zone': 78 },
    { date: '2024-06-07', 'Creative Studio': 84, 'Tech Hub': 87, 'Meeting Room': 62, 'Quiet Zone': 73 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 450000, bookings: 234 },
    { month: 'Feb', revenue: 520000, bookings: 267 },
    { month: 'Mar', revenue: 480000, bookings: 243 },
    { month: 'Apr', revenue: 610000, bookings: 289 },
    { month: 'May', revenue: 580000, bookings: 276 },
    { month: 'Jun', revenue: 650000, bookings: 312 }
  ];

  const workspaceUsage = [
    { name: 'Creative Studio', value: 35, bookings: 145, revenue: 285000 },
    { name: 'Tech Hub', value: 28, bookings: 118, revenue: 234000 },
    { name: 'Meeting Room Alpha', value: 22, bookings: 89, revenue: 178000 },
    { name: 'Quiet Zone', value: 15, bookings: 67, revenue: 132000 }
  ];

  const peakHours = [
    { hour: '08:00', occupancy: 25 },
    { hour: '09:00', occupancy: 65 },
    { hour: '10:00', occupancy: 85 },
    { hour: '11:00', occupancy: 90 },
    { hour: '12:00', occupancy: 70 },
    { hour: '13:00', occupancy: 45 },
    { hour: '14:00', occupancy: 80 },
    { hour: '15:00', occupancy: 88 },
    { hour: '16:00', occupancy: 75 },
    { hour: '17:00', occupancy: 60 },
    { hour: '18:00', occupancy: 30 }
  ];

  const COLORS = ['#FF6B35', '#F7941D', '#2E86AB', '#A23B72'];

  const handleExportReport = (type: string) => {
    console.log(`Exporting ${type} report...`);
    // Implementation for report export
  };

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalBookings = revenueData.reduce((sum, item) => sum + item.bookings, 0);
  const avgOccupancy = 78; // Mock average occupancy
  const peakOccupancy = Math.max(...peakHours.map(h => h.occupancy));

  return (
    <HubManagerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-deskhive-navy">Reports & Analytics</h1>
            <p className="text-deskhive-darkgray">Hub performance insights and data exports</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-deskhive-navy text-deskhive-navy">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button className="bg-deskhive-orange hover:bg-deskhive-orange/90">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Total Revenue</p>
                  <p className="text-2xl font-bold text-deskhive-navy">₦{totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+12% from last period</p>
                </div>
                <DollarSign className="h-8 w-8 text-deskhive-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Total Bookings</p>
                  <p className="text-2xl font-bold text-deskhive-navy">{totalBookings}</p>
                  <p className="text-xs text-green-600">+8% from last period</p>
                </div>
                <Calendar className="h-8 w-8 text-deskhive-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Avg. Occupancy</p>
                  <p className="text-2xl font-bold text-deskhive-navy">{avgOccupancy}%</p>
                  <p className="text-xs text-green-600">+5% from last period</p>
                </div>
                <Users className="h-8 w-8 text-deskhive-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Peak Occupancy</p>
                  <p className="text-2xl font-bold text-deskhive-navy">{peakOccupancy}%</p>
                  <p className="text-xs text-deskhive-darkgray">at 11:00 AM</p>
                </div>
                <TrendingUp className="h-8 w-8 text-deskhive-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <Tabs defaultValue="occupancy" className="space-y-4">
          <TabsList className="glass-nav border-white/20">
            <TabsTrigger value="occupancy">Occupancy Trends</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
            <TabsTrigger value="usage">Workspace Usage</TabsTrigger>
            <TabsTrigger value="reports">Export Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="occupancy" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-nav border-white/20">
                <CardHeader>
                  <CardTitle className="text-deskhive-navy">Daily Occupancy Trends</CardTitle>
                  <CardDescription>Workspace occupancy over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={occupancyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="Creative Studio" stroke="#FF6B35" strokeWidth={2} />
                        <Line type="monotone" dataKey="Tech Hub" stroke="#F7941D" strokeWidth={2} />
                        <Line type="monotone" dataKey="Meeting Room" stroke="#2E86AB" strokeWidth={2} />
                        <Line type="monotone" dataKey="Quiet Zone" stroke="#A23B72" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-nav border-white/20">
                <CardHeader>
                  <CardTitle className="text-deskhive-navy">Peak Hours Analysis</CardTitle>
                  <CardDescription>Occupancy patterns throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={peakHours}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Area type="monotone" dataKey="occupancy" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-nav border-white/20">
                <CardHeader>
                  <CardTitle className="text-deskhive-navy">Monthly Revenue Trends</CardTitle>
                  <CardDescription>Revenue growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, 'Revenue']} />
                        <Bar dataKey="revenue" fill="#FF6B35" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-nav border-white/20">
                <CardHeader>
                  <CardTitle className="text-deskhive-navy">Booking Volume</CardTitle>
                  <CardDescription>Monthly booking trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="bookings" stroke="#2E86AB" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-nav border-white/20">
                <CardHeader>
                  <CardTitle className="text-deskhive-navy">Workspace Distribution</CardTitle>
                  <CardDescription>Usage breakdown by workspace</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={workspaceUsage}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {workspaceUsage.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-nav border-white/20">
                <CardHeader>
                  <CardTitle className="text-deskhive-navy">Workspace Performance</CardTitle>
                  <CardDescription>Detailed metrics by workspace</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workspaceUsage.map((workspace, index) => (
                      <div key={workspace.name} className="flex items-center justify-between p-3 border border-white/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <div>
                            <h4 className="font-medium text-deskhive-navy">{workspace.name}</h4>
                            <p className="text-sm text-deskhive-darkgray">{workspace.bookings} bookings</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-deskhive-navy">₦{workspace.revenue.toLocaleString()}</p>
                          <p className="text-sm text-deskhive-darkgray">{workspace.value}% of total</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-nav border-white/20">
                <CardHeader>
                  <CardTitle className="text-deskhive-navy flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Occupancy Report
                  </CardTitle>
                  <CardDescription>Detailed occupancy analytics and trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-deskhive-darkgray">
                    <p>• Daily, weekly, monthly occupancy rates</p>
                    <p>• Peak hours analysis</p>
                    <p>• Workspace utilization breakdown</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-deskhive-navy text-deskhive-navy"
                      onClick={() => handleExportReport('occupancy-csv')}
                    >
                      CSV
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-deskhive-navy text-deskhive-navy"
                      onClick={() => handleExportReport('occupancy-xlsx')}
                    >
                      Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-nav border-white/20">
                <CardHeader>
                  <CardTitle className="text-deskhive-navy flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Revenue Report
                  </CardTitle>
                  <CardDescription>Financial performance and revenue analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-deskhive-darkgray">
                    <p>• Revenue by workspace</p>
                    <p>• Monthly/quarterly trends</p>
                    <p>• Payment and booking details</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-deskhive-navy text-deskhive-navy"
                      onClick={() => handleExportReport('revenue-csv')}
                    >
                      CSV
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-deskhive-navy text-deskhive-navy"
                      onClick={() => handleExportReport('revenue-xlsx')}
                    >
                      Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-nav border-white/20">
                <CardHeader>
                  <CardTitle className="text-deskhive-navy flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Activity Report
                  </CardTitle>
                  <CardDescription>User engagement and activity metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-deskhive-darkgray">
                    <p>• User check-in/check-out logs</p>
                    <p>• Booking patterns</p>
                    <p>• User satisfaction metrics</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-deskhive-navy text-deskhive-navy"
                      onClick={() => handleExportReport('users-csv')}
                    >
                      CSV
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-deskhive-navy text-deskhive-navy"
                      onClick={() => handleExportReport('users-xlsx')}
                    >
                      Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-nav border-white/20">
                <CardHeader>
                  <CardTitle className="text-deskhive-navy flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Maintenance Report
                  </CardTitle>
                  <CardDescription>Maintenance activities and downtime</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-deskhive-darkgray">
                    <p>• Maintenance schedules</p>
                    <p>• Downtime analysis</p>
                    <p>• Equipment status</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-deskhive-navy text-deskhive-navy"
                      onClick={() => handleExportReport('maintenance-csv')}
                    >
                      CSV
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-deskhive-navy text-deskhive-navy"
                      onClick={() => handleExportReport('maintenance-xlsx')}
                    >
                      Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-nav border-white/20">
                <CardHeader>
                  <CardTitle className="text-deskhive-navy flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Booking Report
                  </CardTitle>
                  <CardDescription>Booking trends and patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-deskhive-darkgray">
                    <p>• Booking success rates</p>
                    <p>• Popular time slots</p>
                    <p>• Cancellation patterns</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-deskhive-navy text-deskhive-navy"
                      onClick={() => handleExportReport('bookings-csv')}
                    >
                      CSV
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-deskhive-navy text-deskhive-navy"
                      onClick={() => handleExportReport('bookings-xlsx')}
                    >
                      Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-nav border-white/20">
                <CardHeader>
                  <CardTitle className="text-deskhive-navy flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Summary
                  </CardTitle>
                  <CardDescription>Comprehensive hub performance overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-deskhive-darkgray">
                    <p>• Key performance indicators</p>
                    <p>• Comparative analysis</p>
                    <p>• Executive summary</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-deskhive-navy text-deskhive-navy"
                      onClick={() => handleExportReport('summary-csv')}
                    >
                      CSV
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-deskhive-navy text-deskhive-navy"
                      onClick={() => handleExportReport('summary-xlsx')}
                    >
                      Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </HubManagerLayout>
  );
};

export default HubManagerReports;

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Users, Map, Clock, ArrowUpRight, TrendingUp, BarChart3, PieChart, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { bookings } from "@/data/bookings";
import { workspaces } from "@/data/workspaces";
import { ChartContainer } from "@/components/ui/chart"; // Changed from Chart to ChartContainer
import WorkspaceUsageChart from "@/components/admin/WorkspaceUsageChart";
import OccupancyRateChart from "@/components/admin/OccupancyRateChart";
import BookingTimesChart from "@/components/admin/BookingTimesChart";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("analytics");
  
  // Get some stats for the dashboard
  const totalBookings = bookings.length;
  const totalWorkspaces = workspaces.length;
  const totalLocations = [...new Set(workspaces.map(w => w.location))].length;
  
  // Calculate average booking duration
  const calculateAverageDuration = () => {
    let totalMinutes = 0;
    bookings.forEach(booking => {
      const startHour = parseInt(booking.startTime.split(':')[0]);
      const endHour = parseInt(booking.endTime.split(':')[0]);
      const durationHours = endHour - startHour;
      totalMinutes += durationHours * 60;
    });
    
    return Math.round(totalMinutes / bookings.length / 60 * 10) / 10; // Average in hours, rounded to 1 decimal
  };
  
  const averageBookingDuration = calculateAverageDuration();
  
  // Calculate peak days (simplified)
  const getPeakDay = () => {
    const dayCounts: Record<string, number> = {};
    bookings.forEach(booking => {
      const date = new Date(booking.date);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    
    let maxDay = '';
    let maxCount = 0;
    
    Object.entries(dayCounts).forEach(([day, count]) => {
      if (count > maxCount) {
        maxDay = day;
        maxCount = count;
      }
    });
    
    return maxDay;
  };
  
  const peakDay = getPeakDay();
  
  // Generate insights based on the data
  const insights = [
    {
      title: "Meeting rooms are most booked on Tuesdays",
      description: "Consider adding more meeting room capacity on Tuesdays to meet demand.",
    },
    {
      title: "Lagos office has the highest occupancy rate",
      description: "Current occupancy is at 87%, consider expanding workspace capacity in Lagos office.",
    },
    {
      title: "Underutilized spaces in Abuja office",
      description: "Private offices in Abuja have only 45% utilization. Consider repurposing some spaces.",
    },
    {
      title: "Peak booking times: 10 AM - 2 PM",
      description: "Encourage flexible work schedules to improve workspace availability throughout the day.",
    }
  ];

  const handleGenerateReport = () => {
    toast({
      title: "Report generation started",
      description: "Your report will be available for download shortly.",
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-full overflow-hidden">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Admin Dashboard</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Monitor hub usage, analyze booking patterns, and optimize space management.
          </p>
        </div>

        <div className="space-y-6">
          {/* Key metrics cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <Card className="p-2 md:p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 md:pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Total Bookings</CardTitle>
                <CalendarIcon className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <div className="text-lg md:text-2xl font-bold">{totalBookings}</div>
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-2 md:p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 md:pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Hubs</CardTitle>
                <Map className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <div className="text-lg md:text-2xl font-bold">{totalWorkspaces}</div>
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  {totalLocations} locations
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-2 md:p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 md:pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Avg. Duration</CardTitle>
                <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <div className="text-lg md:text-2xl font-bold">{averageBookingDuration} hrs</div>
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  Per booking
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-2 md:p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 md:pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Peak Day</CardTitle>
                <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <div className="text-lg md:text-2xl font-bold">{peakDay}</div>
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  Highest booking volume
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Workspace Usage Chart */}
            <Card className="col-span-1 overflow-hidden">
              <CardHeader className="p-3 md:p-4">
                <CardTitle className="text-sm md:text-lg">Hub Usage</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Bookings by hub type
                </CardDescription>
              </CardHeader>
              <CardContent className="h-60 md:h-80 p-0 md:p-0">
                <WorkspaceUsageChart />
              </CardContent>
            </Card>
            
            {/* Occupancy Rate Chart */}
            <Card className="col-span-1 overflow-hidden">
              <CardHeader className="p-3 md:p-4">
                <CardTitle className="text-sm md:text-lg">Occupancy Rates</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Average occupancy by location
                </CardDescription>
              </CardHeader>
              <CardContent className="h-60 md:h-80 p-0 md:p-0">
                <OccupancyRateChart />
              </CardContent>
            </Card>
            
            {/* Peak Booking Times */}
            <Card className="col-span-1 lg:col-span-2 overflow-hidden">
              <CardHeader className="p-3 md:p-4">
                <CardTitle className="text-sm md:text-lg">Peak Booking Times</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Most popular hours and days
                </CardDescription>
              </CardHeader>
              <CardContent className="h-60 md:h-80 p-0 md:p-0">
                <BookingTimesChart />
              </CardContent>
            </Card>
          </div>

          {/* Insights and Recommendations */}
          <Card className="overflow-hidden">
            <CardHeader className="p-3 md:p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <CardTitle className="text-sm md:text-lg">Insights & Recommendations</CardTitle>
                <Button size="sm" onClick={handleGenerateReport} className="w-full md:w-auto text-xs md:text-sm">
                  Generate Report
                </Button>
              </div>
              <CardDescription className="text-xs md:text-sm">
                AI-powered insights to optimize hub management
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.map((insight, index) => (
                  <div key={index} className="border rounded-lg p-3 md:p-4 bg-deskhive-skyblue/50">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-1 md:p-1.5 bg-deskhive-orange/20 rounded-full text-deskhive-orange">
                        <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs md:text-sm font-medium text-deskhive-navy mb-1">{insight.title}</h4>
                        <p className="text-[10px] md:text-xs text-deskhive-darkgray/80">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Admin;


import React, { useState } from 'react';
import HubManagerLayout from "@/components/layout/HubManagerLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Download, Filter, UserCheck, Users, ArrowUpDown, Activity, BarChart, Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, subDays } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { checkIns } from "@/data/workspaces";

const HubManagerActivity = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("daily");
  const [selectedHub, setSelectedHub] = useState("all");
  const [dateRange, setDateRange] = useState("7days");
  
  // Mock data for the activity metrics
  const metrics = {
    totalCheckIns: 187,
    uniqueLearners: 64,
    averageDuration: "3.5 hours",
    peakTime: "10:00 AM - 2:00 PM",
    utilization: "72%"
  };
  
  // Generate sample data for each day of the week
  const generateDailyData = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      days.push({
        date: format(date, "yyyy-MM-dd"),
        displayDate: format(date, "EEE, MMM d"),
        checkIns: Math.floor(Math.random() * 40) + 10,
        uniqueLearners: Math.floor(Math.random() * 20) + 5,
        utilization: Math.floor(Math.random() * 30) + 50
      });
    }
    return days;
  };
  
  const dailyData = generateDailyData();
  
  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Your data is being exported. It will be available for download shortly.",
    });
  };
  
  return (
    <HubManagerLayout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Hub Activity</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Track learner attendance and hub usage metrics
          </p>
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Select value={selectedHub} onValueChange={setSelectedHub}>
                  <SelectTrigger id="hub-filter">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by hub" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Hubs</SelectItem>
                    <SelectItem value="lagos">Lagos</SelectItem>
                    <SelectItem value="abuja">Abuja</SelectItem>
                    <SelectItem value="phc">Port Harcourt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger id="date-range">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="relative">
                <Input 
                  placeholder="Search by learner name" 
                  className="pl-10"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500"
                  >
                    <path
                      d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <Button onClick={handleExportData} className="whitespace-nowrap">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Total Check-ins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-deskhive-orange mr-3" />
                <div className="text-2xl font-bold">{metrics.totalCheckIns}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Unique Learners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-deskhive-navy mr-3" />
                <div className="text-2xl font-bold">{metrics.uniqueLearners}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Avg. Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-600 mr-3" />
                <div className="text-2xl font-bold">{metrics.averageDuration}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Peak Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-blue-600 mr-3" />
                <div className="text-2xl font-bold">{metrics.peakTime}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart className="h-8 w-8 text-purple-600 mr-3" />
                <div className="text-2xl font-bold">{metrics.utilization}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="daily">Daily Activity</TabsTrigger>
            <TabsTrigger value="learners">Learner Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Daily Hub Activity</CardTitle>
                <CardDescription>
                  Check-ins and utilization by day for the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <table className="min-w-full divide-y">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            Check-ins
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            Unique Learners
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            Utilization
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y">
                      {dailyData.map((day) => (
                        <tr key={day.date} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{day.displayDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{day.checkIns}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{day.uniqueLearners}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              variant="outline" 
                              className={
                                day.utilization >= 75 ? "bg-green-100 text-green-800 border-green-200" :
                                day.utilization >= 50 ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                                "bg-red-100 text-red-800 border-red-200"
                              }
                            >
                              {day.utilization}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="text-sm text-gray-500">
                  Showing 7 days of data
                </div>
                <Button variant="outline" size="sm">View Full Report</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="learners">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Learner Activity</CardTitle>
                <CardDescription>
                  Individual learner check-in history and usage patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <table className="min-w-full divide-y">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Learner
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Check-in
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Visits
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Avg. Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Preferred Hub
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y">
                      {checkIns.slice(0, 5).map((checkIn, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-start">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{checkIn.learnerName}</div>
                                <div className="text-sm text-gray-500">{checkIn.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {format(new Date(checkIn.checkInTime), "MMM d, yyyy")}
                            </div>
                            <div className="text-xs text-gray-500">
                              {format(new Date(checkIn.checkInTime), "h:mm a")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{Math.floor(Math.random() * 15) + 1}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {Math.floor(Math.random() * 4) + 2} hours
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                              {checkIn.hub}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="text-sm text-gray-500">
                  Showing 5 of {checkIns.length} learners
                </div>
                <Button variant="outline" size="sm">View All Learners</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </HubManagerLayout>
  );
};

export default HubManagerActivity;

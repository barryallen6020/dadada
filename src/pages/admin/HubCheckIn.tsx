
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Search, QrCode, Calendar, Clock, UserCheck, UserX, Check, X } from "lucide-react";
import { workspaces } from "@/data/workspaces";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

const HubCheckIn = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [selectedHub, setSelectedHub] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  
  // Mock check-in history
  const checkInHistory = [
    { 
      id: "check-1", 
      learnerName: "John Doe", 
      email: "john.doe@example.com", 
      hub: "RALNO HUB AKOWONJO", 
      checkInTime: new Date(2023, 9, 15, 9, 30), 
      checkOutTime: new Date(2023, 9, 15, 16, 45),
      status: "completed"
    },
    { 
      id: "check-2", 
      learnerName: "Jane Smith", 
      email: "jane.smith@example.com", 
      hub: "Workbay Ajah", 
      checkInTime: new Date(2023, 9, 15, 10, 15), 
      status: "active"
    },
    { 
      id: "check-3", 
      learnerName: "David Wilson", 
      email: "david.wilson@example.com", 
      hub: "Costain Hub 4th Floor (n)", 
      checkInTime: new Date(2023, 9, 14, 13, 0), 
      checkOutTime: new Date(2023, 9, 14, 17, 30),
      status: "completed"
    }
  ];

  const handleSearch = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter a learner's email address to check them in.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedHub) {
      toast({
        title: "Hub selection required",
        description: "Please select a hub to check the learner into.",
        variant: "destructive",
      });
      return;
    }

    setSearchPerformed(true);
    
    // In a real app, this would search through a database
    // For now, let's show a success message
    toast({
      title: "Learner found",
      description: "Learner with this email has an active booking for today.",
    });
  };

  const handleCheckIn = () => {
    toast({
      title: "Check-in successful",
      description: `Learner with email ${email} has been checked in to ${workspaces.find(w => w.id === selectedHub)?.name}.`,
    });
    
    setEmail("");
    setSelectedHub("");
    setSearchPerformed(false);
  };

  const handleCheckOut = (id: string) => {
    toast({
      title: "Check-out successful",
      description: "Learner has been checked out from the hub.",
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto pb-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Hub Check-In Dashboard</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Check learners in and out of hubs to track attendance
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
              <CardHeader>
                <CardTitle className="text-xl">Check-In Learner</CardTitle>
                <CardDescription>
                  Verify and check in learners to the hub
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">Email Check-In</TabsTrigger>
                    <TabsTrigger value="qr" disabled>
                      <QrCode className="h-4 w-4 mr-2" />
                      QR Code (Coming Soon)
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="email" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="hub-select">Select Hub</Label>
                      <Select value={selectedHub} onValueChange={setSelectedHub}>
                        <SelectTrigger id="hub-select" className="bg-white/30 backdrop-blur-sm border-white/30">
                          <SelectValue placeholder="Select hub" />
                        </SelectTrigger>
                        <SelectContent>
                          {workspaces.map((hub) => (
                            <SelectItem key={hub.id} value={hub.id}>
                              {hub.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="learner-email">Learner Email</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deskhive-darkgray/70 h-4 w-4" />
                        <Input
                          id="learner-email"
                          type="email"
                          placeholder="Enter learner's email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-white/30 backdrop-blur-sm border-white/30"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleSearch} 
                      className="w-full bg-deskhive-navy hover:bg-deskhive-navy/90"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search Booking
                    </Button>
                    
                    {searchPerformed && (
                      <div className="mt-6 space-y-4">
                        <Alert className="bg-green-50 border-green-200">
                          <Check className="h-4 w-4 text-green-600" />
                          <AlertTitle className="text-green-800">Booking Found</AlertTitle>
                          <AlertDescription className="text-green-700">
                            Learner has an active booking for today at this hub.
                          </AlertDescription>
                        </Alert>
                        
                        <div className="border rounded-md p-4 bg-white">
                          <h3 className="font-medium mb-2">Booking Details</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-deskhive-orange" />
                              <span>Today, {format(new Date(), "MMMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-deskhive-orange" />
                              <span>9:00 AM - 5:00 PM</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleCheckIn} 
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <UserCheck className="h-4 w-4 mr-2" />
                          Confirm Check-In
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="qr">
                    <div className="py-8 text-center">
                      <QrCode className="h-16 w-16 mx-auto text-deskhive-darkgray/40 mb-4" />
                      <h3 className="text-lg font-medium text-deskhive-navy mb-2">QR Code Check-In</h3>
                      <p className="text-deskhive-darkgray/80 mb-4">
                        This feature is coming soon. Learners will be able to scan a QR code to check in.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
              <CardHeader>
                <CardTitle className="text-xl">Today's Check-Ins</CardTitle>
                <CardDescription>
                  View and manage today's hub check-ins
                </CardDescription>
              </CardHeader>
              <CardContent>
                {checkInHistory.length > 0 ? (
                  <div className="rounded-md border overflow-hidden">
                    <table className="min-w-full divide-y">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Learner</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hub</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y">
                        {checkInHistory.map((record) => (
                          <tr key={record.id}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-deskhive-navy">{record.learnerName}</div>
                                <div className="text-xs text-deskhive-darkgray/70">{record.email}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">{record.hub}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {format(record.checkInTime, "h:mm a")}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {record.status === "active" ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  Completed
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                              {record.status === "active" ? (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => handleCheckOut(record.id)}
                                  className="h-8 text-xs"
                                >
                                  <UserX className="h-3 w-3 mr-1" />
                                  Check Out
                                </Button>
                              ) : (
                                <span className="text-gray-400 text-xs">
                                  Checked out at {format(record.checkOutTime!, "h:mm a")}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <UserCheck className="h-12 w-12 mx-auto text-deskhive-darkgray/40 mb-4" />
                    <h3 className="text-xl font-medium text-deskhive-navy mb-2">No check-ins yet</h3>
                    <p className="text-deskhive-darkgray/80 mb-6 max-w-md mx-auto">
                      No learners have checked in today. Use the form on the left to check in learners.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HubCheckIn;

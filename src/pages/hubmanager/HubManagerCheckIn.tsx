
import React, { useState } from 'react';
import HubManagerLayout from "@/components/layout/HubManagerLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, QrCode, Calendar, Clock, User, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format } from "date-fns";
import { workspaces } from "@/data/workspaces";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HubManagerCheckIn = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedHub, setSelectedHub] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [activeTab, setActiveTab] = useState("email");

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
    toast({
      title: "Learner found",
      description: "Learner with this email has an active booking for today.",
    });
  };

  const handleManualEntry = () => {
    setIsManualEntry(true);
  };

  const handleCheckIn = () => {
    if (isManualEntry && !fullName) {
      toast({
        title: "Name required",
        description: "Please enter the learner's full name.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Check-in successful",
      description: `Learner has been checked in to ${workspaces.find(w => w.id === selectedHub)?.name}.`,
    });
    
    setEmail("");
    setFullName("");
    setSelectedHub("");
    setSearchPerformed(false);
    setIsManualEntry(false);
  };

  return (
    <HubManagerLayout>
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Check-In Learners</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Verify and check in learners at your hub
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Learner Check-In</CardTitle>
              <CardDescription>
                Check in learners to track attendance and hub usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="email">Email Check-In</TabsTrigger>
                  <TabsTrigger value="qr" disabled>
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Code (Coming Soon)
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hub-select">Select Hub</Label>
                      <Select value={selectedHub} onValueChange={setSelectedHub}>
                        <SelectTrigger id="hub-select">
                          <SelectValue placeholder="Select hub" />
                        </SelectTrigger>
                        <SelectContent>
                          {workspaces.map((hub) => (
                            <SelectItem key={hub.id} value={hub.id}>
                              {hub.name} ({hub.location})
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
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    {isManualEntry && (
                      <div className="space-y-2">
                        <Label htmlFor="learner-name">Learner Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deskhive-darkgray/70 h-4 w-4" />
                          <Input
                            id="learner-name"
                            type="text"
                            placeholder="Enter learner's full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-3">
                      <Button 
                        onClick={handleSearch} 
                        className="flex-1 bg-deskhive-navy hover:bg-deskhive-navy/90"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Search Booking
                      </Button>
                      
                      {!isManualEntry && (
                        <Button 
                          onClick={handleManualEntry} 
                          variant="outline"
                          className="flex-1"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Manual Entry
                        </Button>
                      )}
                    </div>
                    
                    {searchPerformed && (
                      <div className="mt-6 space-y-4">
                        <Alert className="bg-green-50 border-green-200">
                          <UserCheck className="h-4 w-4 text-green-600" />
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
                    
                    {isManualEntry && !searchPerformed && (
                      <div className="mt-6">
                        <Button 
                          onClick={handleCheckIn} 
                          className="w-full bg-amber-600 hover:bg-amber-700"
                          disabled={!selectedHub || !fullName}
                        >
                          <UserCheck className="h-4 w-4 mr-2" />
                          Manual Check-In
                        </Button>
                        <p className="text-amber-600 text-xs mt-2">
                          Note: Manual check-ins are for walk-in learners without prior bookings.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="qr">
                  <div className="py-12 text-center">
                    <QrCode className="h-24 w-24 mx-auto text-deskhive-darkgray/40 mb-4" />
                    <h3 className="text-lg font-medium text-deskhive-navy mb-2">QR Code Check-In</h3>
                    <p className="text-deskhive-darkgray/80 mb-4 max-w-md mx-auto">
                      This feature is coming soon. Learners will be able to scan a QR code to check in automatically.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Check-In Instructions</CardTitle>
              <CardDescription>
                How to check in learners at your hub
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <span className="bg-deskhive-navy text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
                  Verify Learner Identity
                </h3>
                <p className="text-sm text-deskhive-darkgray/80 pl-7">
                  Check the learner's ID or other identification to confirm their identity.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <span className="bg-deskhive-navy text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">2</span>
                  Check Booking Status
                </h3>
                <p className="text-sm text-deskhive-darkgray/80 pl-7">
                  Enter the learner's email to verify they have an active booking for today.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <span className="bg-deskhive-navy text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">3</span>
                  Complete Check-In
                </h3>
                <p className="text-sm text-deskhive-darkgray/80 pl-7">
                  Once verified, complete the check-in process and provide any necessary hub information.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <span className="bg-deskhive-navy text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">4</span>
                  For Walk-ins
                </h3>
                <p className="text-sm text-deskhive-darkgray/80 pl-7">
                  Use the Manual Entry option for walk-in learners who don't have a prior booking.
                </p>
              </div>
              
              <Alert className="mt-6 bg-blue-50 border-blue-200">
                <AlertTitle className="text-blue-800">Hub Manager Tip</AlertTitle>
                <AlertDescription className="text-blue-700 text-sm">
                  Always remind learners to check out when they leave the hub to maintain accurate usage statistics.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </HubManagerLayout>
  );
};

export default HubManagerCheckIn;

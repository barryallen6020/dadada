
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
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-deskhive-navy mb-1 md:mb-2">Check-In Learners</h1>
          <p className="text-xs sm:text-sm md:text-base text-deskhive-darkgray/80">
            Verify and check in learners at your hub
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-lg md:text-xl">Learner Check-In</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Check in learners to track attendance and hub usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-4 md:mb-6 text-xs md:text-sm">
                  <TabsTrigger value="email">Email Check-In</TabsTrigger>
                  <TabsTrigger value="qr" disabled>
                    <QrCode className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    <span className="hidden sm:inline">QR Code (Coming Soon)</span>
                    <span className="sm:hidden">QR</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
                  <div className="space-y-3 md:space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hub-select" className="text-xs md:text-sm">Select Hub</Label>
                      <Select value={selectedHub} onValueChange={setSelectedHub}>
                        <SelectTrigger id="hub-select" className="text-xs md:text-sm">
                          <SelectValue placeholder="Select hub" />
                        </SelectTrigger>
                        <SelectContent>
                          {workspaces.map((hub) => (
                            <SelectItem key={hub.id} value={hub.id} className="text-xs md:text-sm">
                              {hub.name} ({hub.location})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="learner-email" className="text-xs md:text-sm">Learner Email</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deskhive-darkgray/70 h-3 w-3 md:h-4 md:w-4" />
                        <Input
                          id="learner-email"
                          type="email"
                          placeholder="Enter learner's email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-8 md:pl-10 text-xs md:text-sm"
                        />
                      </div>
                    </div>
                    
                    {isManualEntry && (
                      <div className="space-y-2">
                        <Label htmlFor="learner-name" className="text-xs md:text-sm">Learner Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deskhive-darkgray/70 h-3 w-3 md:h-4 md:w-4" />
                          <Input
                            id="learner-name"
                            type="text"
                            placeholder="Enter learner's full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="pl-8 md:pl-10 text-xs md:text-sm"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <Button 
                        onClick={handleSearch} 
                        className="flex-1 bg-deskhive-navy hover:bg-deskhive-navy/90 text-xs md:text-sm"
                        size="sm"
                      >
                        <Search className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                        Search Booking
                      </Button>
                      
                      {!isManualEntry && (
                        <Button 
                          onClick={handleManualEntry} 
                          variant="outline"
                          className="flex-1 text-xs md:text-sm"
                          size="sm"
                        >
                          <User className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                          Manual Entry
                        </Button>
                      )}
                    </div>
                    
                    {searchPerformed && (
                      <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
                        <Alert className="bg-green-50 border-green-200">
                          <UserCheck className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                          <AlertTitle className="text-green-800 text-sm md:text-base">Booking Found</AlertTitle>
                          <AlertDescription className="text-green-700 text-xs md:text-sm">
                            Learner has an active booking for today at this hub.
                          </AlertDescription>
                        </Alert>
                        
                        <div className="border rounded-md p-3 md:p-4 bg-white">
                          <h3 className="font-medium mb-2 text-sm md:text-base">Booking Details</h3>
                          <div className="space-y-2 text-xs md:text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2 text-deskhive-orange" />
                              <span>Today, {format(new Date(), "MMMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 md:h-4 md:w-4 mr-2 text-deskhive-orange" />
                              <span>9:00 AM - 5:00 PM</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleCheckIn} 
                          className="w-full bg-green-600 hover:bg-green-700 text-xs md:text-sm"
                          size="sm"
                        >
                          <UserCheck className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                          Confirm Check-In
                        </Button>
                      </div>
                    )}
                    
                    {isManualEntry && !searchPerformed && (
                      <div className="mt-4 md:mt-6">
                        <Button 
                          onClick={handleCheckIn} 
                          className="w-full bg-amber-600 hover:bg-amber-700 text-xs md:text-sm"
                          disabled={!selectedHub || !fullName}
                          size="sm"
                        >
                          <UserCheck className="h-3 w-3 md:h-4 md:w-4 mr-2" />
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
                  <div className="py-8 md:py-12 text-center">
                    <QrCode className="h-16 w-16 md:h-24 md:w-24 mx-auto text-deskhive-darkgray/40 mb-3 md:mb-4" />
                    <h3 className="text-base md:text-lg font-medium text-deskhive-navy mb-2">QR Code Check-In</h3>
                    <p className="text-deskhive-darkgray/80 mb-4 max-w-md mx-auto text-xs md:text-sm px-4">
                      This feature is coming soon. Learners will be able to scan a QR code to check in automatically.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-lg md:text-xl">Check-In Instructions</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                How to check in learners at your hub
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center text-sm md:text-base">
                  <span className="bg-deskhive-navy text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-xs mr-2">1</span>
                  Verify Learner Identity
                </h3>
                <p className="text-xs md:text-sm text-deskhive-darkgray/80 pl-6 md:pl-7">
                  Check the learner's ID or other identification to confirm their identity.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center text-sm md:text-base">
                  <span className="bg-deskhive-navy text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-xs mr-2">2</span>
                  Check Booking Status
                </h3>
                <p className="text-xs md:text-sm text-deskhive-darkgray/80 pl-6 md:pl-7">
                  Enter the learner's email to verify they have an active booking for today.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center text-sm md:text-base">
                  <span className="bg-deskhive-navy text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-xs mr-2">3</span>
                  Complete Check-In
                </h3>
                <p className="text-xs md:text-sm text-deskhive-darkgray/80 pl-6 md:pl-7">
                  Once verified, complete the check-in process and provide any necessary hub information.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center text-sm md:text-base">
                  <span className="bg-deskhive-navy text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-xs mr-2">4</span>
                  For Walk-ins
                </h3>
                <p className="text-xs md:text-sm text-deskhive-darkgray/80 pl-6 md:pl-7">
                  Use the Manual Entry option for walk-in learners who don't have a prior booking.
                </p>
              </div>
              
              <Alert className="mt-4 md:mt-6 bg-blue-50 border-blue-200">
                <AlertTitle className="text-blue-800 text-sm md:text-base">Hub Manager Tip</AlertTitle>
                <AlertDescription className="text-blue-700 text-xs md:text-sm">
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

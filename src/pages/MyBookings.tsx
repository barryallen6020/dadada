
import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar, Clock, MapPin, Building2, Tag, Users, AlertTriangle, Search, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { bookings } from "@/data/bookings";
import { workspaces } from "@/data/workspaces";
import { organizations } from "@/data/workspaces";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Enhance the bookings data with organization information
const enhancedBookings = bookings.map(booking => {
  const workspace = workspaces.find(w => w.id === booking.workspaceId);
  const organization = workspace ? organizations.find(org => org.id === workspace.organizationId) : null;
  
  return {
    ...booking,
    workspace: workspace || booking.workspace,
    organization: organization || { name: "Unknown Organization" }
  };
});

const MyBookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Filter bookings based on search query
  const filteredBookings = enhancedBookings.filter(booking => 
    booking.workspace?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.organization?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.date.includes(searchQuery)
  );
  
  // Split bookings into upcoming and past
  const today = new Date().toISOString().split("T")[0];
  const upcomingBookings = filteredBookings.filter(booking => 
    booking.date >= today && booking.status !== "cancelled"
  );
  const pastBookings = filteredBookings.filter(booking => 
    booking.date < today || booking.status === "cancelled"
  );
  
  const handleCancelBooking = (bookingId) => {
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully."
    });
    
    // In a real app, you would send a request to your backend to cancel the booking
    console.log("Cancelling booking:", bookingId);
  };
  
  const renderBookingCard = (booking) => {
    const isUpcoming = booking.date >= today && booking.status !== "cancelled";
    
    return (
      <div 
        key={booking.id} 
        className={cn(
          "border rounded-lg overflow-hidden transition-all hover:shadow-md",
          booking.status === "cancelled" ? "opacity-70" : ""
        )}
      >
        <div className="p-4 flex flex-col md:flex-row gap-4">
          {/* Booking info */}
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{booking.workspace?.name || "Unknown Workspace"}</h3>
              <Badge variant={booking.status === "confirmed" ? "default" : "destructive"}>
                {booking.status === "confirmed" ? "Confirmed" : "Cancelled"}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-2 text-deskhive-navy" />
                {booking.organization?.name}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-deskhive-navy" />
                {format(parseISO(booking.date), "MMMM d, yyyy")}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-deskhive-navy" />
                {booking.startTime} - {booking.endTime}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-deskhive-navy" />
                {booking.workspace?.location || "Unknown Location"}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-deskhive-navy" />
                {booking.workspace?.type || "Unknown Type"}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-deskhive-navy" />
                {booking.participants} {booking.participants === 1 ? "participant" : "participants"}
              </div>
            </div>
            
            {booking.notes && (
              <div className="mt-3 text-sm">
                <p className="font-medium">Notes:</p>
                <p className="text-gray-600">{booking.notes}</p>
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex flex-row md:flex-col gap-2 justify-end">
            {isUpcoming ? (
              <>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50" size="sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Reschedule
                </Button>
                <Button 
                  variant="outline" 
                  className="text-red-600 border-red-600 hover:bg-red-50" 
                  size="sm"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm">
                <Check className="h-4 w-4 mr-1" />
                Book Again
              </Button>
            )}
          </div>
        </div>
        
        {booking.status === "cancelled" && (
          <div className="bg-red-50 p-2 border-t flex items-center justify-center text-red-600 text-sm">
            <AlertTriangle className="h-4 w-4 mr-1" />
            This booking has been cancelled
          </div>
        )}
      </div>
    );
  };
  
  return (
    <DashboardLayout>
      <div className="w-full max-w-5xl mx-auto pb-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">My Bookings</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            View and manage all your workspace bookings
          </p>
        </div>
        
        <div className="mb-6 relative">
          <Input
            placeholder="Search by workspace, organization or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-deskhive-darkgray/70" />
        </div>
        
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastBookings.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(renderBookingCard)
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">No upcoming bookings</h3>
                <p className="text-gray-600 mb-4">You don't have any workspace bookings scheduled.</p>
                <Button asChild>
                  <a href="/dashboard">Book a Workspace</a>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastBookings.length > 0 ? (
              pastBookings.map(renderBookingCard)
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">No past bookings</h3>
                <p className="text-gray-600">You don't have any past workspace bookings.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MyBookings;

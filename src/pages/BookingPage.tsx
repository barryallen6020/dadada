
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { format, addDays, parseISO } from "date-fns";
import { Calendar as CalendarIcon, Clock, Users, ArrowLeft, Tag, Repeat, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { workspaces } from "@/data/workspaces";
import { bookings } from "@/data/bookings";
import { cn } from "@/lib/utils";
import SeatMap from "@/components/booking/SeatMap";
import SeatList from "@/components/booking/SeatList";
import TimelineDisplay from "@/components/booking/TimelineDisplay";
import { useOrganization } from "@/contexts/OrganizationContext";

// Define seat types
const seatTypes = ["Desk", "Meeting Room", "Conference Room", "Phone Booth", "Lounge Area"];

// Define time slots
const timeSlots = [
  { id: "9-10", label: "9:00 - 10:00", value: { start: "09:00", end: "10:00" } },
  { id: "10-11", label: "10:00 - 11:00", value: { start: "10:00", end: "11:00" } },
  { id: "11-12", label: "11:00 - 12:00", value: { start: "11:00", end: "12:00" } },
  { id: "12-13", label: "12:00 - 13:00", value: { start: "12:00", end: "13:00" } },
  { id: "13-14", label: "13:00 - 14:00", value: { start: "13:00", end: "14:00" } },
  { id: "14-15", label: "14:00 - 15:00", value: { start: "14:00", end: "15:00" } },
  { id: "15-16", label: "15:00 - 16:00", value: { start: "15:00", end: "16:00" } },
  { id: "16-17", label: "16:00 - 17:00", value: { start: "16:00", end: "17:00" } },
];

// Define seats (this would normally come from an API)
const generateSeats = (type, count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${type.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
    name: `${type} ${i + 1}`,
    type,
    available: Math.random() > 0.3 // Randomly set availability
  }));
};

const BookingPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { currentOrganization } = useOrganization();
  
  const [date, setDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [recurringType, setRecurringType] = useState("none");
  const [recurringEndDate, setRecurringEndDate] = useState(addDays(new Date(), 30));
  const [notes, setNotes] = useState("");
  const [participants, setParticipants] = useState(1);
  const [view, setView] = useState("list");
  
  const [seats, setSeats] = useState([]);
  const [filteredSeats, setFilteredSeats] = useState([]);
  const [selectedSeatType, setSelectedSeatType] = useState("All");
  
  const workspace = workspaces.find(ws => ws.id === id);
  
  useEffect(() => {
    // Generate seats based on workspace type
    if (workspace) {
      const generatedSeats = [];
      if (workspace.type === "Meeting Room") {
        generatedSeats.push(...generateSeats("Meeting Room", 5));
      } else if (workspace.type === "Event Space") {
        generatedSeats.push(...generateSeats("Conference Room", 2));
        generatedSeats.push(...generateSeats("Lounge Area", 3));
      } else if (workspace.type === "Hot Desk") {
        generatedSeats.push(...generateSeats("Desk", 15));
        generatedSeats.push(...generateSeats("Phone Booth", 3));
      } else if (workspace.type === "Private Office") {
        generatedSeats.push(...generateSeats("Desk", 4));
        generatedSeats.push(...generateSeats("Meeting Room", 1));
      }
      setSeats(generatedSeats);
      setFilteredSeats(generatedSeats);
    }
  }, [workspace]);
  
  // Filter seats based on selected type
  useEffect(() => {
    if (selectedSeatType === "All") {
      setFilteredSeats(seats);
    } else {
      setFilteredSeats(seats.filter(seat => seat.type === selectedSeatType));
    }
  }, [selectedSeatType, seats]);
  
  // Check existing bookings for the selected date
  useEffect(() => {
    if (date && seats.length > 0) {
      const dateStr = format(date, "yyyy-MM-dd");
      
      // Get all bookings for the selected date
      const dayBookings = bookings.filter(booking => booking.date === dateStr);
      
      // Update seat availability based on bookings
      const updatedSeats = seats.map(seat => {
        const seatBookings = dayBookings.filter(booking => 
          booking.workspaceId === id && 
          booking.status === "confirmed"
        );
        
        // Simple logic - if there's any booking for this seat on this date, mark as unavailable
        // In a real app, you'd check specific time slots
        const isBooked = seatBookings.length > 0;
        
        return {
          ...seat,
          available: !isBooked
        };
      });
      
      setSeats(updatedSeats);
      
      // Also update filtered seats
      if (selectedSeatType === "All") {
        setFilteredSeats(updatedSeats);
      } else {
        setFilteredSeats(updatedSeats.filter(seat => seat.type === selectedSeatType));
      }
    }
  }, [date, id, selectedSeatType]);
  
  const handleBooking = () => {
    if (!selectedSeat) {
      toast({
        title: "No seat selected",
        description: "Please select a seat to book",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedTimeSlot) {
      toast({
        title: "No time slot selected",
        description: "Please select a time slot for your booking",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would send this data to your backend
    const bookingData = {
      workspaceId: id,
      workspaceName: workspace?.name,
      organizationId: workspace?.organizationId,
      organizationName: currentOrganization.name,
      seatId: selectedSeat.id,
      seatName: selectedSeat.name,
      date: format(date, "yyyy-MM-dd"),
      startTime: selectedTimeSlot.value.start,
      endTime: selectedTimeSlot.value.end,
      recurring: recurringType,
      recurringEndDate: recurringType !== "none" ? format(recurringEndDate, "yyyy-MM-dd") : null,
      participants,
      notes,
    };
    
    console.log("Booking data:", bookingData);
    
    // Show success toast
    toast({
      title: "Booking successful!",
      description: `You've booked ${selectedSeat.name} at ${workspace?.name} for ${format(date, "MMMM d, yyyy")} from ${selectedTimeSlot.value.start} to ${selectedTimeSlot.value.end}`,
    });
    
    // In a real app, you would redirect to a confirmation page or the bookings list
    setTimeout(() => {
      window.location.href = "/bookings";
    }, 2000);
  };
  
  if (!workspace) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Workspace not found</h1>
            <p className="mt-2 text-gray-600">The workspace you're looking for doesn't exist or has been removed.</p>
            <Link to="/dashboard">
              <Button className="mt-4">Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/dashboard" className="text-deskhive-navy hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mt-4">{workspace.name}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-deskhive-darkgray/80">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {workspace.location}
            </div>
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              {currentOrganization.name}
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              {workspace.type}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Capacity: {workspace.capacity}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select a Seat</CardTitle>
                <CardDescription>Choose a seat type and view available seats</CardDescription>
                
                <div className="flex justify-between mt-4">
                  <div>
                    <Select value={selectedSeatType} onValueChange={setSelectedSeatType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by seat type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Seats</SelectItem>
                        {seatTypes.filter(type => seats.some(seat => seat.type === type)).map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <TabsList>
                      <TabsTrigger value="list" onClick={() => setView("list")}>List</TabsTrigger>
                      <TabsTrigger value="map" onClick={() => setView("map")}>Map</TabsTrigger>
                    </TabsList>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                        <span className="text-sm">Available</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                        <span className="text-sm">Unavailable</span>
                      </div>
                    </div>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {format(date, "MMMM d, yyyy")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => date && setDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                {view === "list" ? (
                  <SeatList 
                    seats={filteredSeats} 
                    selectedSeat={selectedSeat} 
                    onSelectSeat={setSelectedSeat} 
                  />
                ) : (
                  <SeatMap 
                    seats={filteredSeats} 
                    selectedSeat={selectedSeat} 
                    onSelectSeat={setSelectedSeat} 
                  />
                )}
                
                {selectedSeat && (
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Seat Timeline</h3>
                    <TimelineDisplay 
                      timeSlots={timeSlots} 
                      selectedSeat={selectedSeat}
                      date={date}
                      selectedTimeSlot={selectedTimeSlot}
                      onSelectTimeSlot={setSelectedTimeSlot}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Complete your reservation</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <div className="flex items-center mt-1 p-3 border rounded-md">
                    <CalendarIcon className="h-4 w-4 mr-2 text-deskhive-navy" />
                    {format(date, "MMMM d, yyyy")}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="seat">Selected Seat</Label>
                  <div className="flex items-center mt-1 p-3 border rounded-md">
                    {selectedSeat ? (
                      <>
                        <div className={cn(
                          "w-3 h-3 rounded-full mr-2",
                          selectedSeat.available ? "bg-green-500" : "bg-red-500"
                        )}></div>
                        {selectedSeat.name}
                      </>
                    ) : (
                      <span className="text-gray-400">No seat selected</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="time">Time Slot</Label>
                  <div className="flex items-center mt-1 p-3 border rounded-md">
                    <Clock className="h-4 w-4 mr-2 text-deskhive-navy" />
                    {selectedTimeSlot ? (
                      <span>{selectedTimeSlot.label}</span>
                    ) : (
                      <span className="text-gray-400">No time slot selected</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="participants">Number of Participants</Label>
                  <Select value={participants.toString()} onValueChange={(value) => setParticipants(parseInt(value))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select number of participants" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "person" : "people"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="recurring">Recurring Booking</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
                          <Label htmlFor="recurring" className="cursor-pointer">Recurring Booking</Label>
                          <Repeat className="h-4 w-4 ml-1 text-deskhive-darkgray/60" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Set up a recurring schedule for this booking</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <RadioGroup value={recurringType} onValueChange={setRecurringType} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">One-time booking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily">Daily</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly">Weekly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Monthly</Label>
                    </div>
                  </RadioGroup>
                  
                  {recurringType !== "none" && (
                    <div className="mt-2">
                      <Label htmlFor="recurringEndDate">End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {format(recurringEndDate, "MMMM d, yyyy")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={recurringEndDate}
                            onSelect={(date) => date && setRecurringEndDate(date)}
                            initialFocus
                            disabled={(date) => date < new Date() || date <= new Date(date)}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any special requirements or notes for your booking"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button onClick={handleBooking} className="w-full" disabled={!selectedSeat || !selectedTimeSlot}>
                  Complete Booking
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookingPage;


import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { workspaces } from '@/data/workspaces';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import BookingModal from '@/components/dashboard/BookingModal';
import SeatMap from '@/components/booking/SeatMap';
import { cn } from '@/lib/utils';

const BookingPage = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const [searchParams] = useSearchParams();
  const bookingType = searchParams.get('type') || 'room';
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<any>(null);

  const workspace = workspaces.find(w => w.id === workspaceId);

  if (!workspace) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-deskhive-navy mb-4">Workspace Not Found</h1>
          <Button onClick={() => navigate('/dashboard')} className="bg-deskhive-navy">
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleBookRoom = () => {
    setIsBookingModalOpen(true);
  };

  // Generate demo seat data for shared workspaces
  const generateSeatData = (workspaceId: string) => {
    const seats = [];
    
    // Generate desks
    for (let i = 1; i <= 16; i++) {
      seats.push({
        id: `${workspaceId}-desk-${i}`,
        name: `Desk ${i}`,
        type: 'Desk',
        available: Math.random() > 0.3 // 70% availability
      });
    }
    
    // Generate phone booths
    for (let i = 1; i <= 4; i++) {
      seats.push({
        id: `${workspaceId}-booth-${i}`,
        name: `Booth ${i}`,
        type: 'Phone Booth',
        available: Math.random() > 0.4 // 60% availability
      });
    }
    
    // Generate meeting rooms
    for (let i = 1; i <= 4; i++) {
      seats.push({
        id: `${workspaceId}-meeting-${i}`,
        name: `Meeting ${i}`,
        type: 'Meeting Room',
        available: Math.random() > 0.5 // 50% availability
      });
    }
    
    // Generate conference rooms
    for (let i = 1; i <= 2; i++) {
      seats.push({
        id: `${workspaceId}-conf-${i}`,
        name: `Conference ${i}`,
        type: 'Conference Room',
        available: Math.random() > 0.6 // 40% availability
      });
    }
    
    return seats;
  };

  const seatData = workspace ? generateSeatData(workspace.id) : [];

  const handleSeatSelection = (seat: any) => {
    setSelectedSeat(seat);
  };

  const handleBookSeat = () => {
    if (selectedSeat) {
      setIsBookingModalOpen(true);
    }
  };

  const renderRoomBooking = () => (
    <div className="space-y-4 md:space-y-6">
      <Card className="glass-nav border-white/20">
        <CardHeader className="pb-3 md:pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg md:text-xl lg:text-2xl text-deskhive-navy truncate">{workspace.name}</CardTitle>
              <CardDescription className="text-sm md:text-base line-clamp-2">{workspace.description}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-deskhive-skyblue/50 text-deskhive-navy self-start">
              {workspace.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center text-deskhive-darkgray text-sm">
                <MapPin className="h-4 w-4 mr-2 text-deskhive-orange flex-shrink-0" />
                <span className="truncate">{workspace.location}</span>
              </div>
              <div className="flex items-center text-deskhive-darkgray text-sm">
                <Users className="h-4 w-4 mr-2 text-deskhive-orange flex-shrink-0" />
                <span>Capacity: {workspace.seatingCapacity} people</span>
              </div>
              <div className="flex items-center text-deskhive-darkgray text-sm">
                <Clock className="h-4 w-4 mr-2 text-deskhive-orange flex-shrink-0" />
                <span>{workspace.openingTime} - {workspace.closingTime}</span>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-deskhive-navy text-sm">Amenities</h4>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {workspace.amenities.map((amenity, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-deskhive-skyblue/30 border-none text-deskhive-darkgray/90 text-xs"
                    >
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <div 
                className="h-32 md:h-48 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${workspace.image})` }}
              />
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-deskhive-navy mb-2">
                  ₦{workspace.pricePerBooking.toLocaleString()}/hour
                </div>
                <Button 
                  className="bg-deskhive-orange hover:bg-deskhive-orange/90 w-full text-sm"
                  onClick={handleBookRoom}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Book This {workspace.type}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSeatBooking = () => (
    <div className="space-y-4 md:space-y-6">
      <Card className="glass-nav border-white/20">
        <CardHeader className="pb-3 md:pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg md:text-xl lg:text-2xl text-deskhive-navy truncate">{workspace.name}</CardTitle>
              <CardDescription className="text-sm">Select your seat from the floor plan</CardDescription>
            </div>
            <Badge variant="outline" className="bg-deskhive-skyblue/50 text-deskhive-navy self-start">
              Shared Workspace
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <SeatMap 
                seats={seatData}
                onSelectSeat={handleSeatSelection}
                selectedSeat={selectedSeat}
              />
            </div>
            
            <div className="space-y-3 md:space-y-4 order-1 lg:order-2">
              <div className="space-y-2">
                <h4 className="font-medium text-deskhive-navy text-sm">Workspace Details</h4>
                <div className="flex items-center text-deskhive-darkgray text-xs">
                  <MapPin className="h-3 w-3 mr-2 text-deskhive-orange flex-shrink-0" />
                  <span className="truncate">{workspace.location}</span>
                </div>
                <div className="flex items-center text-deskhive-darkgray text-xs">
                  <Clock className="h-3 w-3 mr-2 text-deskhive-orange flex-shrink-0" />
                  <span>{workspace.openingTime} - {workspace.closingTime}</span>
                </div>
              </div>

              {selectedSeat && (
                <Card className="border-deskhive-orange/20 bg-deskhive-orange/5">
                  <CardContent className="p-3">
                    <h4 className="font-medium text-deskhive-navy mb-2 text-sm">Selected Seat</h4>
                    <p className="text-xs text-deskhive-darkgray mb-1">
                      Seat: {selectedSeat.name}
                    </p>
                    <p className="text-xs text-deskhive-darkgray mb-3">
                      Type: {selectedSeat.type}
                    </p>
                    <div className="text-sm md:text-base font-bold text-deskhive-navy mb-3">
                      ₦{workspace.pricePerBooking.toLocaleString()}/hour
                    </div>
                    <Button 
                      className="bg-deskhive-orange hover:bg-deskhive-orange/90 w-full text-sm"
                      onClick={handleBookSeat}
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Book This Seat
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                <h4 className="font-medium text-deskhive-navy text-sm">Amenities</h4>
                <div className="flex flex-wrap gap-1">
                  {workspace.amenities.map((amenity, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-deskhive-skyblue/30 border-none text-deskhive-darkgray/90 text-xs"
                    >
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 md:mb-6 flex items-center gap-2 md:gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="p-2 text-deskhive-darkgray hover:text-deskhive-navy"
            size="sm"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-deskhive-navy">
              Book Workspace
            </h1>
            <p className="text-sm text-deskhive-darkgray/80 hidden sm:block">
              {bookingType === 'seat' ? 'Select your seat and book' : 'Reserve this space for your team'}
            </p>
          </div>
        </div>

        {bookingType === 'seat' ? renderSeatBooking() : renderRoomBooking()}

        <BookingModal
          workspace={workspace}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          selectedDate={selectedDate}
        />
      </div>
    </DashboardLayout>
  );
};

export default BookingPage;

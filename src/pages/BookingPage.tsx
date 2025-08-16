
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

  const handleSeatSelection = (seat: any) => {
    setSelectedSeat(seat);
  };

  const handleBookSeat = () => {
    if (selectedSeat) {
      setIsBookingModalOpen(true);
    }
  };

  const renderRoomBooking = () => (
    <div className="space-y-6">
      <Card className="glass-nav border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-deskhive-navy">{workspace.name}</CardTitle>
              <CardDescription className="text-lg">{workspace.description}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-deskhive-skyblue/50 text-deskhive-navy">
              {workspace.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center text-deskhive-darkgray">
                <MapPin className="h-5 w-5 mr-2 text-deskhive-orange" />
                <span>{workspace.location}</span>
              </div>
              <div className="flex items-center text-deskhive-darkgray">
                <Users className="h-5 w-5 mr-2 text-deskhive-orange" />
                <span>Capacity: {workspace.seatingCapacity} people</span>
              </div>
              <div className="flex items-center text-deskhive-darkgray">
                <Clock className="h-5 w-5 mr-2 text-deskhive-orange" />
                <span>{workspace.openingTime} - {workspace.closingTime}</span>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-deskhive-navy">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {workspace.amenities.map((amenity, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-deskhive-skyblue/30 border-none text-deskhive-darkgray/90"
                    >
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div 
                className="h-48 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${workspace.image})` }}
              />
              <div className="text-center">
                <div className="text-2xl font-bold text-deskhive-navy mb-2">
                  ₦{workspace.pricePerBooking.toLocaleString()}/hour
                </div>
                <Button 
                  className="bg-deskhive-orange hover:bg-deskhive-orange/90 w-full"
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
    <div className="space-y-6">
      <Card className="glass-nav border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-deskhive-navy">{workspace.name}</CardTitle>
              <CardDescription>Select your seat from the floor plan</CardDescription>
            </div>
            <Badge variant="outline" className="bg-deskhive-skyblue/50 text-deskhive-navy">
              Shared Workspace
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SeatMap 
                workspaceId={workspace.id}
                onSeatSelect={handleSeatSelection}
                selectedSeat={selectedSeat}
              />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-deskhive-navy">Workspace Details</h4>
                <div className="flex items-center text-deskhive-darkgray text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-deskhive-orange" />
                  <span>{workspace.location}</span>
                </div>
                <div className="flex items-center text-deskhive-darkgray text-sm">
                  <Clock className="h-4 w-4 mr-2 text-deskhive-orange" />
                  <span>{workspace.openingTime} - {workspace.closingTime}</span>
                </div>
              </div>

              {selectedSeat && (
                <Card className="border-deskhive-orange/20 bg-deskhive-orange/5">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-deskhive-navy mb-2">Selected Seat</h4>
                    <p className="text-sm text-deskhive-darkgray mb-1">
                      Seat: {selectedSeat.name}
                    </p>
                    <p className="text-sm text-deskhive-darkgray mb-3">
                      Type: {selectedSeat.type}
                    </p>
                    <div className="text-lg font-bold text-deskhive-navy mb-3">
                      ₦{workspace.pricePerBooking.toLocaleString()}/hour
                    </div>
                    <Button 
                      className="bg-deskhive-orange hover:bg-deskhive-orange/90 w-full"
                      onClick={handleBookSeat}
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Book This Seat
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                <h4 className="font-medium text-deskhive-navy">Amenities</h4>
                <div className="flex flex-wrap gap-2">
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
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mr-4 text-deskhive-darkgray hover:text-deskhive-navy"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy">
              Book Workspace
            </h1>
            <p className="text-deskhive-darkgray/80">
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

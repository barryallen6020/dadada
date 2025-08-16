
import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays, differenceInDays } from "date-fns";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  workspace: any;
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
}

const BookingModal: React.FC<BookingModalProps> = ({ workspace, isOpen, onClose, selectedDate }) => {
  const { toast } = useToast();
  const [bookingType, setBookingType] = useState<'hourly' | 'daily' | 'weekly'>('hourly');
  const [startDate, setStartDate] = useState<Date | undefined>(selectedDate || new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(selectedDate || new Date());
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("10:00");
  const [notes, setNotes] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Get workspace details safely with fallbacks
  const workspaceName = workspace?.name || "this workspace";
  const workspaceLocation = workspace?.location || "Unknown location";
  const hourlyRate = workspace?.pricePerHour || workspace?.pricePerBooking || 0;

  // Calculate total cost based on booking type
  const totalCost = useMemo(() => {
    if (!startDate) return 0;
    
    switch (bookingType) {
      case 'hourly':
        const startHour = parseInt(startTime.split(':')[0]);
        const endHour = parseInt(endTime.split(':')[0]);
        const hours = Math.max(1, endHour - startHour);
        return hours * hourlyRate;
      
      case 'daily':
        const days = endDate ? Math.max(1, differenceInDays(endDate, startDate) + 1) : 1;
        return days * hourlyRate * 8; // 8 hours per day
      
      case 'weekly':
        const weeks = endDate ? Math.max(1, Math.ceil(differenceInDays(endDate, startDate) / 7)) : 1;
        return weeks * hourlyRate * 40; // 40 hours per week
      
      default:
        return 0;
    }
  }, [bookingType, startDate, endDate, startTime, endTime, hourlyRate]);

  const getDurationText = () => {
    if (!startDate) return "";
    
    switch (bookingType) {
      case 'hourly':
        return `${startTime} - ${endTime}`;
      case 'daily':
        if (endDate && differenceInDays(endDate, startDate) > 0) {
          return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`;
        }
        return format(startDate, "MMM d, yyyy");
      case 'weekly':
        if (endDate && differenceInDays(endDate, startDate) > 6) {
          return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`;
        }
        return `Week of ${format(startDate, "MMM d, yyyy")}`;
      default:
        return "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate) {
      toast({
        title: "Missing date",
        description: "Please select a start date for your booking.",
        variant: "destructive",
      });
      return;
    }
    
    // Validation based on booking type
    if (bookingType === 'hourly') {
      const startHour = parseInt(startTime.split(':')[0]);
      const endHour = parseInt(endTime.split(':')[0]);
      
      if (endHour <= startHour) {
        toast({
          title: "Invalid time selection",
          description: "The end time must be after the start time.",
          variant: "destructive",
        });
        return;
      }
    } else if ((bookingType === 'daily' || bookingType === 'weekly') && !endDate) {
      toast({
        title: "Missing end date",
        description: `Please select an end date for your ${bookingType} booking.`,
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      const durationText = getDurationText();
      toast({
        title: "Booking confirmed",
        description: `Your ${bookingType} booking for ${workspaceName} ${durationText} has been confirmed. Total cost: ₦${totalCost.toLocaleString()}`,
      });
      
      // Send booking confirmation email (simulated)
      toast({
        title: "Email notification sent",
        description: "A booking confirmation has been sent to your email.",
      });
      
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  // Generate time options from 8am to 6pm
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 18; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      options.push(`${formattedHour}:00`);
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white border rounded-2xl p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg">Book {workspaceName}</DialogTitle>
          <DialogDescription className="text-sm">
            Choose your booking duration and complete the details below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[70vh]">
          <div className="grid gap-4 py-2">
            {/* Booking Type Selector */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Booking Duration</Label>
              <Tabs value={bookingType} onValueChange={(value) => setBookingType(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="hourly" className="text-xs">Hourly</TabsTrigger>
                  <TabsTrigger value="daily" className="text-xs">Daily</TabsTrigger>
                  <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
                </TabsList>
                
                <TabsContent value="hourly" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal text-sm h-9"
                          id="date"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="startTime" className="text-sm">Start Time</Label>
                      <Select value={startTime} onValueChange={setStartTime}>
                        <SelectTrigger id="startTime" className="h-9 text-sm">
                          <SelectValue placeholder="Start" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={time} value={time} className="text-sm">
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime" className="text-sm">End Time</Label>
                      <Select value={endTime} onValueChange={setEndTime}>
                        <SelectTrigger id="endTime" className="h-9 text-sm">
                          <SelectValue placeholder="End" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={time} value={time} className="text-sm">
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="daily" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal text-sm h-9"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "MMM d") : <span>Start</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal text-sm h-9"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "MMM d") : <span>End</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                            disabled={(date) => !startDate || date < startDate}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="weekly" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm">Week Start</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal text-sm h-9"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "MMM d") : <span>Start</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={(date) => {
                              setStartDate(date);
                              if (date) {
                                setEndDate(addDays(date, 6)); // Set end date to end of week
                              }
                            }}
                            initialFocus
                            disabled={(date) => date < new Date()}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Week End</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal text-sm h-9"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "MMM d") : <span>End</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                            disabled={(date) => !startDate || date < addDays(startDate, 6)}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any special requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[60px] text-sm"
              />
            </div>

            {/* Booking Summary */}
            <div className="border rounded-lg p-3 bg-gray-50/50">
              <h4 className="text-sm font-medium text-deskhive-navy mb-2">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-deskhive-orange flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{workspaceName}</p>
                    <p className="text-gray-500 text-xs truncate">{workspaceLocation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-deskhive-orange flex-shrink-0" />
                  <p className="text-xs">{getDurationText()}</p>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Total Cost:</span>
                    <span className="font-bold text-deskhive-navy">₦{totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-4 gap-2 flex-col sm:flex-row">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading} className="w-full sm:w-auto order-2 sm:order-1">
              Cancel
            </Button>
            <Button type="submit" className="bg-deskhive-orange hover:bg-deskhive-orange/90 w-full sm:w-auto order-1 sm:order-2" disabled={isLoading}>
              {isLoading ? "Confirming..." : `Confirm Booking (₦${totalCost.toLocaleString()})`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;

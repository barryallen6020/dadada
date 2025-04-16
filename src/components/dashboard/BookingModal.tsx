
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface BookingModalProps {
  workspace: any;
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
}

const BookingModal: React.FC<BookingModalProps> = ({ workspace, isOpen, onClose, selectedDate }) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(selectedDate || new Date());
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("10:00");
  const [notes, setNotes] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Get workspace details safely with fallbacks
  const workspaceName = workspace?.name || "this workspace";
  const workspaceLocation = workspace?.location || "Unknown location";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Missing date",
        description: "Please select a date for your booking.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if end time is after start time
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
    
    setIsLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      toast({
        title: "Booking confirmed",
        description: `Your booking for ${workspaceName} on ${format(date, 'MMMM d, yyyy')} from ${startTime} to ${endTime} has been confirmed.`,
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
          <DialogTitle>Book Hub</DialogTitle>
          <DialogDescription>
            Complete the form below to book {workspaceName}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[70vh]">
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="date">Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Select
                  value={startTime}
                  onValueChange={(value) => setStartTime(value)}
                >
                  <SelectTrigger id="startTime">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Select
                  value={endTime}
                  onValueChange={(value) => setEndTime(value)}
                >
                  <SelectTrigger id="endTime">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any special requirements or notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[80px] md:min-h-[100px]"
              />
            </div>

            <div className="border rounded-md p-3 md:p-4 bg-gray-50">
              <h4 className="text-sm font-medium text-deskhive-navy mb-2">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <MapPin className="mr-2 h-4 w-4 mt-0.5 text-deskhive-orange" />
                  <div>
                    <p className="font-medium">{workspaceName}</p>
                    <p className="text-gray-500">{workspaceLocation}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-deskhive-orange" />
                  <p>{date ? format(date, "PPP") : "Select a date"}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-deskhive-orange" />
                  <p>{startTime} - {endTime}</p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-4 gap-2 flex-row-reverse sm:flex-row-reverse">
            <Button type="submit" className="btn-primary w-full sm:w-auto" disabled={isLoading}>
              {isLoading ? "Confirming..." : "Confirm Booking"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading} className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;

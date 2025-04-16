
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { bookings } from "@/data/bookings";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TimeSlot {
  id: string;
  label: string;
  value: {
    start: string;
    end: string;
  };
}

interface Seat {
  id: string;
  name: string;
  type: string;
  available: boolean;
}

interface TimelineDisplayProps {
  timeSlots: TimeSlot[];
  selectedSeat: Seat | null;
  date: Date;
  selectedTimeSlot: TimeSlot | null;
  onSelectTimeSlot: (timeSlot: TimeSlot) => void;
}

const TimelineDisplay: React.FC<TimelineDisplayProps> = ({
  timeSlots,
  selectedSeat,
  date,
  selectedTimeSlot,
  onSelectTimeSlot,
}) => {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  
  useEffect(() => {
    if (selectedSeat && date) {
      const dateStr = format(date, "yyyy-MM-dd");
      
      // Get all bookings for the selected date
      const dayBookings = bookings.filter(booking => booking.date === dateStr);
      
      // Find booked time slots
      const booked: string[] = [];
      
      // Simulate booked slots (in a real app, you'd match against actual booking data)
      dayBookings.forEach(booking => {
        timeSlots.forEach(slot => {
          if (
            (booking.startTime <= slot.value.start && booking.endTime > slot.value.start) ||
            (booking.startTime >= slot.value.start && booking.startTime < slot.value.end)
          ) {
            booked.push(slot.id);
          }
        });
      });
      
      // Add some random bookings for demonstration
      const randomBookings = timeSlots
        .filter(() => Math.random() > 0.7)
        .map(slot => slot.id);
      
      setBookedSlots([...booked, ...randomBookings]);
    }
  }, [selectedSeat, date, timeSlots]);
  
  if (!selectedSeat) {
    return null;
  }
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">9:00</div>
        <div className="text-sm font-medium">12:00</div>
        <div className="text-sm font-medium">15:00</div>
        <div className="text-sm font-medium">17:00</div>
      </div>
      
      <div className="bg-gray-100 h-12 w-full rounded-md relative">
        {timeSlots.map((slot, index) => {
          const isBooked = bookedSlots.includes(slot.id);
          const width = `${100 / timeSlots.length}%`;
          const left = `${(index * 100) / timeSlots.length}%`;
          
          return (
            <TooltipProvider key={slot.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      "absolute top-0 bottom-0 transition-all",
                      isBooked
                        ? "bg-red-200 cursor-not-allowed"
                        : "bg-green-200 hover:bg-green-300 cursor-pointer",
                      selectedTimeSlot?.id === slot.id && "ring-2 ring-deskhive-navy"
                    )}
                    style={{ width, left }}
                    onClick={() => !isBooked && onSelectTimeSlot(slot)}
                    disabled={isBooked}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <p className="font-medium">{slot.label}</p>
                    <p className={cn(
                      "text-xs",
                      isBooked ? "text-red-600" : "text-green-600"
                    )}>
                      {isBooked ? "Booked" : "Available"}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      
      <div className="text-center mt-2">
        {selectedTimeSlot ? (
          <p className="text-sm">Selected time: <span className="font-medium">{selectedTimeSlot.label}</span></p>
        ) : (
          <p className="text-sm text-gray-500">Click on an available time slot to select it</p>
        )}
      </div>
    </div>
  );
};

export default TimelineDisplay;

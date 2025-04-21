
import React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Seat {
  id: string;
  name: string;
  type: string;
  available: boolean;
}

interface SeatListProps {
  seats: Seat[];
  selectedSeat: Seat | null;
  onSelectSeat: (seat: Seat) => void;
}

const SeatList: React.FC<SeatListProps> = ({ seats, selectedSeat, onSelectSeat }) => {
  // Group seats by type
  const seatsByType = seats.reduce((acc, seat) => {
    if (!acc[seat.type]) {
      acc[seat.type] = [];
    }
    acc[seat.type].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  if (seats.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-deskhive-darkgray/80">No seats available for the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(seatsByType).map(([type, typeSeats]) => (
        <div key={type} className="mb-4">
          <h3 className="font-medium text-sm mb-2">{type}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {typeSeats.map((seat) => (
              <TooltipProvider key={seat.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => seat.available && onSelectSeat(seat)}
                      className={cn(
                        "flex items-center p-3 rounded-md border transition-all",
                        seat.available 
                          ? "border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer" 
                          : "border-red-200 bg-red-50 cursor-not-allowed opacity-60",
                        selectedSeat?.id === seat.id && "ring-2 ring-deskhive-navy"
                      )}
                      disabled={!seat.available}>
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full mr-2",
                          seat.available ? "bg-green-500" : "bg-red-500"
                        )}
                      ></div>
                      <span className="truncate">{seat.name}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>
                      <p className="font-medium">{seat.name}</p>
                      <p className="text-xs">{seat.type}</p>
                      <p className={cn(
                        "text-xs mt-1",
                        seat.available ? "text-green-600" : "text-red-600"
                      )}>
                        {seat.available ? "Available" : "Unavailable"}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeatList;

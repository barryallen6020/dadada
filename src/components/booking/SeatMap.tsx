
import React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Seat {
  id: string;
  name: string;
  type: string;
  available: boolean;
}

interface SeatMapProps {
  seats: Seat[];
  selectedSeat: Seat | null;
  onSelectSeat: (seat: Seat) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ seats, selectedSeat, onSelectSeat }) => {
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
    <div className="relative border rounded-md p-4 h-[500px] bg-gray-50">
      {/* Simple visualization - in a real app, this would be a proper floor plan */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col">
        {/* Virtual office sketch with dividers */}
        <div className="flex-1 flex border-b border-dashed border-gray-300">
          {/* Left side - usually desks */}
          <div className="w-2/3 border-r border-dashed border-gray-300 p-4">
            <h3 className="text-sm font-medium mb-2">Open Workspace</h3>
            <div className="grid grid-cols-4 gap-2">
              {(seatsByType["Desk"] || []).map((seat) => (
                <TooltipProvider key={seat.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => seat.available && onSelectSeat(seat)}
                        className={cn(
                          "h-14 w-14 rounded-md border flex items-center justify-center transition-all",
                          seat.available 
                            ? "border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer" 
                            : "border-red-200 bg-red-50 cursor-not-allowed opacity-60",
                          selectedSeat?.id === seat.id && "ring-2 ring-deskhive-navy"
                        )}
                        disabled={!seat.available}
                      >
                        <div
                          className={cn(
                            "w-10 h-6 rounded-sm flex items-center justify-center text-xs",
                            seat.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                          )}
                        >
                          {seat.name.split(" ")[1]}
                        </div>
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
          
          {/* Right side - phone booths */}
          <div className="w-1/3 p-4">
            <h3 className="text-sm font-medium mb-2">Phone Booths</h3>
            <div className="flex flex-col space-y-2">
              {(seatsByType["Phone Booth"] || []).map((seat) => (
                <TooltipProvider key={seat.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => seat.available && onSelectSeat(seat)}
                        className={cn(
                          "h-14 w-full rounded-md border flex items-center justify-center transition-all",
                          seat.available 
                            ? "border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer" 
                            : "border-red-200 bg-red-50 cursor-not-allowed opacity-60",
                          selectedSeat?.id === seat.id && "ring-2 ring-deskhive-navy"
                        )}
                        disabled={!seat.available}
                      >
                        <div
                          className={cn(
                            "w-full h-10 rounded-sm flex items-center justify-center text-xs",
                            seat.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                          )}
                        >
                          {seat.name}
                        </div>
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
        </div>
        
        {/* Bottom section - meeting rooms and conference rooms */}
        <div className="h-1/3 flex">
          {/* Meeting Rooms */}
          <div className="w-1/2 border-r border-dashed border-gray-300 p-4">
            <h3 className="text-sm font-medium mb-2">Meeting Rooms</h3>
            <div className="grid grid-cols-2 gap-2">
              {(seatsByType["Meeting Room"] || []).map((seat) => (
                <TooltipProvider key={seat.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => seat.available && onSelectSeat(seat)}
                        className={cn(
                          "h-20 rounded-md border flex items-center justify-center transition-all",
                          seat.available 
                            ? "border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer" 
                            : "border-red-200 bg-red-50 cursor-not-allowed opacity-60",
                          selectedSeat?.id === seat.id && "ring-2 ring-deskhive-navy"
                        )}
                        disabled={!seat.available}
                      >
                        <div
                          className={cn(
                            "w-full h-14 rounded-sm flex items-center justify-center text-xs",
                            seat.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                          )}
                        >
                          {seat.name}
                        </div>
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
          
          {/* Conference Rooms */}
          <div className="w-1/2 p-4">
            <h3 className="text-sm font-medium mb-2">Conference Rooms</h3>
            <div className="grid grid-cols-1 gap-2">
              {(seatsByType["Conference Room"] || []).map((seat) => (
                <TooltipProvider key={seat.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => seat.available && onSelectSeat(seat)}
                        className={cn(
                          "h-20 rounded-md border flex items-center justify-center transition-all",
                          seat.available 
                            ? "border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer" 
                            : "border-red-200 bg-red-50 cursor-not-allowed opacity-60",
                          selectedSeat?.id === seat.id && "ring-2 ring-deskhive-navy"
                        )}
                        disabled={!seat.available}
                      >
                        <div
                          className={cn(
                            "w-full h-14 rounded-sm flex items-center justify-center text-xs",
                            seat.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                          )}
                        >
                          {seat.name}
                        </div>
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
        </div>
      </div>
    </div>
  );
};

export default SeatMap;

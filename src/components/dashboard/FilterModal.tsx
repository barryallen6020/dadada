
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [location, setLocation] = React.useState<string>("");
  const [capacity, setCapacity] = React.useState([1]);
  const [type, setType] = React.useState<string>("");
  const [maxPrice, setMaxPrice] = React.useState([5000]);
  const [isAvailableOnly, setIsAvailableOnly] = React.useState(false);

  const handleApplyFilters = () => {
    const filters = {
      date,
      location,
      capacity: capacity[0],
      type,
      maxPrice: maxPrice[0],
      isAvailableOnly,
    };
    
    onApplyFilters(filters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border rounded-lg shadow-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Workspaces</DialogTitle>
          <DialogDescription>
            Set your preferences to find the perfect workspace.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-1">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="date">Date</Label>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  id="date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Abuja">Abuja</SelectItem>
                <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
                <SelectItem value="Ibadan">Ibadan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Workspace Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Meeting Room">Meeting Room</SelectItem>
                <SelectItem value="Private Office">Private Office</SelectItem>
                <SelectItem value="Hot Desk">Hot Desk</SelectItem>
                <SelectItem value="Conference Room">Conference Room</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="capacity">Minimum Capacity ({capacity})</Label>
            <Slider
              id="capacity"
              defaultValue={capacity}
              max={10}
              min={1}
              step={1}
              onValueChange={setCapacity}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Max Price (₦{maxPrice.toLocaleString()})</Label>
            <Slider
              id="price"
              defaultValue={maxPrice}
              max={10000}
              min={1000}
              step={500}
              onValueChange={setMaxPrice}
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="available-only"
              checked={isAvailableOnly}
              onCheckedChange={setIsAvailableOnly}
            />
            <Label htmlFor="available-only">Show only available workspaces</Label>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button type="button" variant="outline" onClick={onClose} className="sm:w-1/2">
            Reset
          </Button>
          <Button type="button" onClick={handleApplyFilters} className="btn-primary sm:w-1/2">
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;

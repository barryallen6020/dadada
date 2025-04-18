
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { 
  Building, 
  ChevronDown, 
  Plus, 
  Pencil, 
  Trash2,
  Check,
  X
} from "lucide-react";
import { FloorData } from './hooks/useCanvas';

interface FloorControlsProps {
  floors: FloorData[];
  activeFloor: string;
  onAddFloor: () => void;
  onSwitchFloor: (floorId: string) => void;
  onDeleteFloor: (floorId: string) => void;
  onRenameFloor: (floorId: string, newName: string) => void;
}

export const FloorControls: React.FC<FloorControlsProps> = ({
  floors,
  activeFloor,
  onAddFloor,
  onSwitchFloor,
  onDeleteFloor,
  onRenameFloor
}) => {
  const [editingFloorId, setEditingFloorId] = useState<string | null>(null);
  const [newFloorName, setNewFloorName] = useState<string>("");
  
  const currentFloor = floors.find(f => f.id === activeFloor);
  
  const handleStartRenaming = (floor: FloorData) => {
    setEditingFloorId(floor.id);
    setNewFloorName(floor.name);
  };
  
  const handleSaveRename = () => {
    if (editingFloorId && newFloorName.trim()) {
      onRenameFloor(editingFloorId, newFloorName.trim());
      setEditingFloorId(null);
    }
  };
  
  const handleCancelRename = () => {
    setEditingFloorId(null);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md border">
        <Building className="h-4 w-4 text-slate-600" />
        <span className="text-sm font-medium">
          {currentFloor ? currentFloor.name : "No Floor Selected"}
        </span>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Switch Floor <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {floors.map(floor => (
            <DropdownMenuItem 
              key={floor.id}
              onClick={() => onSwitchFloor(floor.id)}
              className={floor.id === activeFloor ? "bg-slate-100" : ""}
            >
              <div className="flex items-center justify-between w-full">
                <span>{floor.name}</span>
                {floor.id === activeFloor && (
                  <Check className="h-4 w-4 text-green-500" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onAddFloor}
        title="Add New Floor"
      >
        <Plus className="h-4 w-4" />
      </Button>
      
      {currentFloor && (
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              title="Manage Current Floor"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Manage Floor: {currentFloor.name}</h4>
              
              {editingFloorId === currentFloor.id ? (
                <div className="flex gap-2">
                  <Input
                    value={newFloorName}
                    onChange={(e) => setNewFloorName(e.target.value)}
                    className="flex-1"
                    autoFocus
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={handleSaveRename}
                    className="h-8 w-8"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={handleCancelRename}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStartRenaming(currentFloor)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename Floor
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteFloor(currentFloor.id)}
                    disabled={floors.length <= 1}
                    className="text-red-500 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Floor
                  </Button>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

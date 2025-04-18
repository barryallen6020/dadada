
import { useState } from 'react';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

export interface FloorData {
  id: string;
  name: string;
  canvasJson: string;
  level: number;
}

interface UseFloorManagementProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
  onChange: (data: any) => void;
  ensureGridIsOnBottom: () => void;
  initHistory: () => void;
  saveState: () => void;
}

export const useFloorManagement = ({
  fabricCanvasRef,
  onChange,
  ensureGridIsOnBottom,
  initHistory,
  saveState
}: UseFloorManagementProps) => {
  const [floors, setFloors] = useState<FloorData[]>([]);
  const [activeFloor, setActiveFloor] = useState<string>("");

  const addFloor = () => {
    const newFloorNumber = floors.length > 0 ? 
      Math.max(...floors.map(f => f.level)) + 1 : 
      1;
    
    const newFloor = {
      id: uuidv4(),
      name: `Floor ${newFloorNumber}`,
      canvasJson: "",
      level: newFloorNumber
    };
    
    const updatedFloors = [...floors, newFloor];
    setFloors(updatedFloors);
    
    // Save current floor before switching
    saveState();
    
    // Switch to the new floor
    switchFloor(newFloor.id);
  };

  const switchFloor = (floorId: string) => {
    // Save current floor state first
    saveState();
    
    setActiveFloor(floorId);
    
    // Clear the canvas and load the selected floor
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      
      // Remove all non-grid objects
      canvas.getObjects().forEach(obj => {
        if (!obj.data || obj.data.type !== "grid") {
          canvas.remove(obj);
        }
      });
      
      const floor = floors.find(f => f.id === floorId);
      if (floor && floor.canvasJson) {
        canvas.loadFromJSON(floor.canvasJson, () => {
          canvas.renderAll();
          ensureGridIsOnBottom();
        });
      } else {
        canvas.renderAll();
      }
      
      // Reset history for the new floor
      initHistory();
    }
  };

  const deleteFloor = (floorId: string) => {
    const updatedFloors = floors.filter(f => f.id !== floorId);
    setFloors(updatedFloors);
    
    // If we deleted the active floor, switch to another one
    if (floorId === activeFloor && updatedFloors.length > 0) {
      switchFloor(updatedFloors[0].id);
    }
    
    onChange({ floors: updatedFloors, activeFloor });
  };

  const renameFloor = (floorId: string, newName: string) => {
    const updatedFloors = floors.map(floor => {
      if (floor.id === floorId) {
        return { ...floor, name: newName };
      }
      return floor;
    });
    
    setFloors(updatedFloors);
    onChange({ floors: updatedFloors, activeFloor });
  };

  return {
    floors,
    setFloors,
    activeFloor,
    setActiveFloor,
    addFloor,
    switchFloor,
    deleteFloor,
    renameFloor
  };
};

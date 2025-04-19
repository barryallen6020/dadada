
import { useState } from 'react';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

export interface FloorData {
  id: string;
  name: string;
  canvasJson: string;
  level: number;
  objects?: any[]; // Add objects property to fix the type error
}

export interface UseFloorManagementProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
  onChange?: (data: any) => void;
  ensureGridIsOnBottom?: () => void;
  initHistory?: () => void;
  saveState?: () => void;
  toast?: any; // Add toast property to fix the type error
}

export const useFloorManagement = ({
  fabricCanvasRef,
  onChange = () => {},
  ensureGridIsOnBottom = () => {},
  initHistory = () => {},
  saveState = () => {},
  toast
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
      level: newFloorNumber,
      objects: [] // Initialize objects as an empty array
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

  // Add exportFloorMap function to fix the missing property error
  const exportFloorMap = () => {
    if (floors.length === 0) return;
    
    const exportData = {
      floors: floors.map(floor => ({
        id: floor.id,
        name: floor.name,
        level: floor.level,
        canvasJson: floor.canvasJson,
        objects: floor.objects || []
      })),
      activeFloorId: activeFloor
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'floor-map.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    if (toast) {
      toast({
        title: "Export Successful",
        description: "Floor map data has been exported successfully.",
      });
    }
  };

  // Add importFloorMap function to fix the missing property error
  const importFloorMap = (event: any) => {
    const file = event.target?.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const importedData = JSON.parse(result);
          
          if (importedData.floors && Array.isArray(importedData.floors)) {
            setFloors(importedData.floors);
            
            if (importedData.activeFloorId && importedData.floors.some((f: any) => f.id === importedData.activeFloorId)) {
              switchFloor(importedData.activeFloorId);
            } else if (importedData.floors.length > 0) {
              switchFloor(importedData.floors[0].id);
            }
            
            if (toast) {
              toast({
                title: "Import Successful",
                description: `Imported ${importedData.floors.length} floor(s).`,
              });
            }
          } else {
            if (toast) {
              toast({
                title: "Import Failed",
                description: "Invalid floor map data format.",
                variant: "destructive",
              });
            }
          }
        }
      } catch (error) {
        if (toast) {
          toast({
            title: "Import Failed",
            description: "Could not parse floor map data.",
            variant: "destructive",
          });
        }
      }
    };
    
    reader.readAsText(file);
    
    // Reset the file input so the same file can be selected again if needed
    event.target.value = null;
  };

  return {
    floors,
    setFloors,
    activeFloor,
    setActiveFloor,
    addFloor,
    switchFloor,
    deleteFloor,
    renameFloor,
    exportFloorMap,
    importFloorMap
  };
};

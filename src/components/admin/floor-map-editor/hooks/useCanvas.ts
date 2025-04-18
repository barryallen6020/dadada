import { useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';
import { useGrid } from './useGrid';
import { useDrawingTools } from './useDrawingTools';
import { useFloorManagement, FloorData } from './useFloorManagement';
import { useHistory } from './useHistory';
import { useMouseHandlers } from './useMouseHandlers';

export interface UseCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  initialData?: any;
  onChange: (data: any) => void;
  toast: any;
}

export const useCanvas = ({ canvasRef, initialData, onChange, toast }: UseCanvasProps) => {
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  // Initialize grid hook
  const {
    gridSize,
    setGridSize,
    snapToGrid,
    setSnapToGrid,
    showGrid,
    setShowGrid,
    drawGrid,
    ensureGridIsOnBottom,
    snapObjectToGrid,
    isGridObject
  } = useGrid({ fabricCanvasRef });

  // Initialize floor management hook
  const {
    floors,
    setFloors,
    activeFloor,
    setActiveFloor,
    addFloor,
    switchFloor,
    deleteFloor,
    renameFloor
  } = useFloorManagement({
    fabricCanvasRef,
    onChange,
    ensureGridIsOnBottom,
    initHistory: () => {}, // Will be properly set after useHistory is initialized
    saveState: () => {}    // Will be properly set after useHistory is initialized
  });

  // Initialize history hook
  const {
    history,
    historyIndex,
    canUndo,
    canRedo,
    initHistory,
    saveState,
    undo,
    redo
  } = useHistory({
    fabricCanvasRef,
    ensureGridIsOnBottom,
    floors,
    activeFloor,
    setFloors,
    onChange
  });

  // Update floor management functions with actual history functions
  useEffect(() => {
    useFloorManagement({
      fabricCanvasRef,
      onChange,
      ensureGridIsOnBottom,
      initHistory,
      saveState
    });
  }, [initHistory, saveState]);

  // Initialize drawing tools hook
  const {
    activeTool,
    selectedObject,
    isDrawingLine,
    linePoints,
    tempLine,
    handleToolClick,
    setActiveTool,
    setSelectedObject,
    setIsDrawingLine,
    setLinePoints,
    setTempLine,
    addShape,
    addSeat,
    addText,
    deleteSelected,
    clearCanvas
  } = useDrawingTools({
    fabricCanvasRef,
    snapToGrid,
    snapObjectToGrid,
    isGridObject,
    saveState
  });

  // Initialize mouse handlers hook
  const {
    handleMouseDown,
    handleMouseMove,
    handleSelectionCreated,
    handleSelectionCleared,
    finishLine
  } = useMouseHandlers({
    fabricCanvasRef,
    activeTool,
    isDrawingLine,
    linePoints,
    tempLine,
    setIsDrawingLine,
    setLinePoints,
    setTempLine,
    setSelectedObject,
    isGridObject,
    saveState
  });

  // Export and import functions
  const exportFloorMap = () => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const json = JSON.stringify({
      floors: floors,
      activeFloor: activeFloor,
      currentCanvas: canvas.toJSON(['data'])
    });
    
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'floor-map.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importFloorMap = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !fabricCanvasRef.current) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (!event.target || !fabricCanvasRef.current) return;
      
      try {
        const data = JSON.parse(event.target.result as string);
        setFloors(data.floors || []);
        
        if (data.activeFloor) {
          setActiveFloor(data.activeFloor);
          const floor = data.floors.find((f: FloorData) => f.id === data.activeFloor);
          
          if (floor && floor.canvasJson) {
            fabricCanvasRef.current.loadFromJSON(floor.canvasJson, () => {
              fabricCanvasRef.current?.renderAll();
              ensureGridIsOnBottom();
            });
          }
        }
        
        toast({
          title: "Import Successful",
          description: "Floor map has been imported successfully.",
        });
      } catch (error) {
        console.error("Error importing floor map:", error);
        toast({
          title: "Import Failed",
          description: "Failed to import floor map. The file may be corrupted.",
          variant: "destructive",
        });
      }
    };
    
    reader.readAsText(file);
  };

  // Initialize Canvas
  useEffect(() => {
    if (!canvasRef.current || fabricCanvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#f8f9fa",
      selection: true,
    });
    
    fabricCanvasRef.current = canvas;
    canvas.seatCategories = [];
    canvas.selectedSeatCategory = "standard";

    canvas.on("object:modified", saveState);
    canvas.on("object:added", (e) => {
      if (e.target && (!e.target.data || e.target.data.type !== "grid")) {
        saveState();
      }
    });
    canvas.on("object:removed", (e) => {
      if (e.target && (!e.target.data || e.target.data.type !== "grid")) {
        saveState();
      }
    });
    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:updated", handleSelectionCreated);
    canvas.on("selection:cleared", handleSelectionCleared);
    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);

    drawGrid();
    initHistory();

    if (initialData) {
      try {
        canvas.loadFromJSON(initialData, canvas.renderAll.bind(canvas));
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    }

    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, []);

  // Handle snap to grid effect
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    const handleObjectMoving = (e: any) => {
      if (snapToGrid && e.target && !isGridObject(e.target)) {
        snapObjectToGrid(e.target);
      }
    };
    
    canvas.on("object:moving", handleObjectMoving);
    
    return () => {
      canvas.off("object:moving", handleObjectMoving);
    };
  }, [snapToGrid, gridSize]);

  // Update grid when settings change
  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    drawGrid();
  }, [gridSize, showGrid]);

  // Initialize with a default floor
  useEffect(() => {
    if (floors.length === 0) {
      const defaultFloor = {
        id: uuidv4(),
        name: "Ground Floor",
        canvasJson: "",
        level: 0
      };
      
      setFloors([defaultFloor]);
      setActiveFloor(defaultFloor.id);
    }
  }, []);

  // Update canvas when switching floors
  useEffect(() => {
    if (!fabricCanvasRef.current || !activeFloor) return;
    
    const floor = floors.find(f => f.id === activeFloor);
    if (floor && floor.canvasJson) {
      fabricCanvasRef.current.loadFromJSON(floor.canvasJson, () => {
        fabricCanvasRef.current?.renderAll();
        ensureGridIsOnBottom();
      });
    }
  }, [activeFloor]);

  return {
    fabricCanvasRef,
    gridSize,
    setGridSize,
    snapToGrid,
    setSnapToGrid,
    activeTool,
    setActiveTool,
    showGrid,
    setShowGrid,
    selectedObject,
    isDrawingLine,
    linePoints,
    canUndo,
    canRedo,
    floors,
    activeFloor,
    handleToolClick,
    addShape,
    addSeat,
    addText,
    deleteSelected,
    clearCanvas,
    undo,
    redo,
    exportFloorMap,
    importFloorMap,
    finishLine,
    drawGrid,
    addFloor,
    switchFloor,
    deleteFloor,
    renameFloor
  };
};

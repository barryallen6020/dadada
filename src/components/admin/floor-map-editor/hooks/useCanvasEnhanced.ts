
import { useRef, useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';
import { useGrid } from './useGrid';
import { useDrawingTools } from './useDrawingTools';
import { useMouseHandlers } from './useMouseHandlers';
import { useHistory } from './useHistory';
import { useFloorManagement, FloorData } from './useFloorManagement';

export interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  initialData?: any;
  onChange: (data: any) => void;
  toast: any;
}

export const useCanvasEnhanced = ({ 
  canvasRef, 
  initialData, 
  onChange, 
  toast 
}: CanvasProps) => {
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  
  // Initialize all the hooks we need
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
  
  // Create a state for floors to pass to other hooks
  const [floors, setFloors] = useState<FloorData[]>([]);
  const [activeFloor, setActiveFloor] = useState<string>("");
  
  // Initialize history hook with required props
  const { 
    canUndo, 
    canRedo, 
    saveState, 
    undo, 
    redo,
    initHistory
  } = useHistory({ 
    fabricCanvasRef,
    ensureGridIsOnBottom,
    floors,
    activeFloor,
    setFloors,
    onChange
  });
  
  // Initialize floor management with required props
  const {
    addFloor,
    switchFloor,
    deleteFloor,
    renameFloor,
    exportFloorMap,
    importFloorMap
  } = useFloorManagement({ 
    fabricCanvasRef, 
    onChange,
    ensureGridIsOnBottom,
    initHistory,
    saveState,
    toast
  });
  
  const {
    activeTool,
    setActiveTool,
    selectedObject,
    isDrawingLine,
    linePoints,
    tempLine,
    handleToolClick,
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
  
  // Initialize the mouse handlers
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
    saveState,
    snapToGrid,
    snapObjectToGrid,
    gridSize
  });
  
  // Initialize the canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#f0f0f0',
      preserveObjectStacking: true
    });
    
    fabricCanvasRef.current = canvas;
    
    // Initialize the canvas with event listeners
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('selection:created', handleSelectionCreated);
    canvas.on('selection:updated', handleSelectionCreated);
    canvas.on('selection:cleared', handleSelectionCleared);
    
    // Initialize with grid
    drawGrid();
    
    // Handle object moving end to snap to grid
    canvas.on('object:modified', (options) => {
      const obj = options.target;
      if (!obj || isGridObject(obj)) return;
      
      if (snapToGrid) {
        snapObjectToGrid(obj);
        canvas.renderAll();
      }
      
      saveState();
    });
    
    // Handle importing initial data if present
    if (initialData) {
      importFloorMap({ target: { result: JSON.stringify(initialData) } });
    } else {
      // Initialize with at least one floor
      addFloor();
    }
    
    // Cleanup function
    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('selection:created', handleSelectionCreated);
      canvas.off('selection:updated', handleSelectionCreated);
      canvas.off('selection:cleared', handleSelectionCleared);
      canvas.dispose();
    };
  }, []);
  
  // Update grid when grid settings change
  useEffect(() => {
    drawGrid();
    ensureGridIsOnBottom();
  }, [showGrid, gridSize]);
  
  // When the canvas changes, notify parent component
  useEffect(() => {
    if (onChange && fabricCanvasRef.current) {
      const exportData = () => {
        const canvasData = {
          floors: floors.map(floor => ({
            id: floor.id,
            name: floor.name,
            // Use canvasJson instead of objects to fix the property error
            canvasJson: floor.canvasJson 
          })),
          activeFloorId: activeFloor
        };
        onChange(canvasData);
      };
      
      // Only export when we actually have a valid canvas with data
      if (floors.length > 0) {
        exportData();
      }
    }
  }, [floors, activeFloor, onChange]);

  // Return everything needed by the component
  return {
    fabricCanvasRef,
    gridSize,
    setGridSize,
    snapToGrid,
    setSnapToGrid,
    showGrid,
    setShowGrid,
    activeTool,
    setActiveTool,
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

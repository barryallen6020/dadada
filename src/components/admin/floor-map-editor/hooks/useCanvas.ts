
import { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

export interface FloorData {
  id: string;
  name: string;
  canvasJson: string;
  level: number;
}

export const useCanvas = ({ canvasRef, initialData, onChange, toast }: any) => {
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [gridSize, setGridSize] = useState<number>(20);
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true);
  const [activeTool, setActiveTool] = useState<string>("select");
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [isDrawingLine, setIsDrawingLine] = useState<boolean>(false);
  const [linePoints, setLinePoints] = useState<{x: number, y: number}[]>([]);
  const [tempLine, setTempLine] = useState<fabric.Line | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  
  // Multi-floor support
  const [floors, setFloors] = useState<FloorData[]>([]);
  const [activeFloor, setActiveFloor] = useState<string>("");

  // Initialize with a default floor if no data
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

  useEffect(() => {
    if (!canvasRef.current || fabricCanvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#f8f9fa",
      selection: true,
    });
    
    fabricCanvasRef.current = canvas;
    
    // Set default seatCategories property to prevent errors
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
    canvas.on("mouse:up", handleMouseUp);

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

  const isGridObject = (obj: fabric.Object): boolean => {
    return obj.data && obj.data.type === "grid";
  };

  const handleMouseDown = (options: any) => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const pointer = canvas.getPointer(options.e);
    
    if (activeTool === "eraser" && options.target && !isGridObject(options.target)) {
      canvas.remove(options.target);
      return;
    }
    
    if (activeTool === "line") {
      if (!isDrawingLine) {
        setIsDrawingLine(true);
        setLinePoints([{ x: pointer.x, y: pointer.y }]);
        
        const line = new fabric.Line(
          [pointer.x, pointer.y, pointer.x, pointer.y],
          {
            strokeWidth: 2,
            stroke: '#000',
            selectable: false,
            evented: false
          }
        );
        
        canvas.add(line);
        setTempLine(line);
      } else {
        const lastPoint = linePoints[linePoints.length - 1];
        
        // Add a permanent line segment
        const line = new fabric.Line(
          [lastPoint.x, lastPoint.y, pointer.x, pointer.y],
          {
            strokeWidth: 2,
            stroke: '#000',
            data: { type: 'wall' }
          }
        );
        
        canvas.add(line);
        
        // Remove the temporary line and create a new one
        if (tempLine) {
          canvas.remove(tempLine);
        }
        
        const newTempLine = new fabric.Line(
          [pointer.x, pointer.y, pointer.x, pointer.y],
          {
            strokeWidth: 2,
            stroke: '#000',
            selectable: false,
            evented: false
          }
        );
        
        canvas.add(newTempLine);
        setTempLine(newTempLine);
        
        setLinePoints([...linePoints, { x: pointer.x, y: pointer.y }]);
      }
    }
  };

  const handleMouseMove = (options: any) => {
    if (!isDrawingLine || !tempLine || !fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const pointer = canvas.getPointer(options.e);
    const lastPoint = linePoints[linePoints.length - 1];
    
    // Update the temporary line to follow the mouse
    tempLine.set({
      x2: pointer.x,
      y2: pointer.y
    });
    
    canvas.renderAll();
  };

  const handleMouseUp = (options: any) => {
    // No specific handling needed for mouse up events currently
  };

  const finishLine = () => {
    if (!isDrawingLine || linePoints.length < 2 || !fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    
    // Remove the temporary line
    if (tempLine) {
      canvas.remove(tempLine);
      setTempLine(null);
    }
    
    setIsDrawingLine(false);
    setLinePoints([]);
    saveState();
  };

  const drawGrid = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // Remove all existing grid objects
    canvas.getObjects().forEach(obj => {
      if (obj.data && obj.data.type === "grid") {
        canvas.remove(obj);
      }
    });

    if (!showGrid) {
      canvas.renderAll();
      return;
    }

    const width = canvas.width || 800;
    const height = canvas.height || 600;

    // Draw grid as dots instead of lines
    for (let x = 0; x <= width; x += gridSize) {
      for (let y = 0; y <= height; y += gridSize) {
        const dot = new fabric.Circle({
          left: x - 1,
          top: y - 1,
          radius: 1,
          fill: "#c0c0c0",
          stroke: "none",
          selectable: false,
          evented: false,
          data: { type: "grid" }
        });
        
        canvas.add(dot);
        dot.sendToBack();
      }
    }

    canvas.renderAll();
  };

  // Make sure grid is always at the bottom
  const ensureGridIsOnBottom = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    canvas.getObjects().forEach(obj => {
      if (obj.data && obj.data.type === "grid") {
        obj.sendToBack();
      }
    });
  };

  const initHistory = () => {
    if (!fabricCanvasRef.current) return;
    
    const json = JSON.stringify(fabricCanvasRef.current.toJSON(['data']));
    setHistory([json]);
    setHistoryIndex(0);
    setCanUndo(false);
    setCanRedo(false);
  };

  const saveState = () => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const json = JSON.stringify(canvas.toJSON(['data']));
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(json);
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCanUndo(newHistory.length > 1);
    setCanRedo(false);
    
    // Update the current floor's canvas data
    if (activeFloor) {
      const updatedFloors = floors.map(floor => {
        if (floor.id === activeFloor) {
          return { ...floor, canvasJson: json };
        }
        return floor;
      });
      
      setFloors(updatedFloors);
      onChange({ floors: updatedFloors, activeFloor });
    }
  };

  const undo = () => {
    if (historyIndex <= 0 || !fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const newIndex = historyIndex - 1;
    
    canvas.loadFromJSON(history[newIndex], () => {
      canvas.renderAll();
      ensureGridIsOnBottom();
    });
    
    setHistoryIndex(newIndex);
    setCanUndo(newIndex > 0);
    setCanRedo(true);
  };

  const redo = () => {
    if (historyIndex >= history.length - 1 || !fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const newIndex = historyIndex + 1;
    
    canvas.loadFromJSON(history[newIndex], () => {
      canvas.renderAll();
      ensureGridIsOnBottom();
    });
    
    setHistoryIndex(newIndex);
    setCanUndo(true);
    setCanRedo(newIndex < history.length - 1);
  };

  const handleSelectionCreated = (options: any) => {
    const selection = options.selected?.[0] || options.target;
    if (selection && !isGridObject(selection)) {
      setSelectedObject(selection);
    }
  };

  const handleSelectionCleared = () => {
    setSelectedObject(null);
  };

  const handleToolClick = (tool: string) => {
    setActiveTool(tool);
    
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // Clean up line drawing if switching tools
    if (isDrawingLine && tool !== "line") {
      if (tempLine) {
        canvas.remove(tempLine);
        setTempLine(null);
      }
      setIsDrawingLine(false);
      setLinePoints([]);
    }

    // Set selection mode based on tool
    const selectable = tool === "select";
    const isEraserOrLine = tool === "eraser" || tool === "line";
    
    canvas.selection = selectable;
    
    canvas.getObjects().forEach(obj => {
      if (!isGridObject(obj)) {
        obj.selectable = selectable;
      } else {
        obj.selectable = false; // Grid is never selectable
      }
    });
    
    // Update cursor based on the tool
    if (tool === "hand") {
      canvas.defaultCursor = "grab";
      canvas.hoverCursor = "grab";
    } else if (tool === "eraser") {
      canvas.defaultCursor = "not-allowed";
      canvas.hoverCursor = "not-allowed";
    } else if (tool === "line") {
      canvas.defaultCursor = "crosshair";
      canvas.hoverCursor = "crosshair";
    } else {
      canvas.defaultCursor = "default";
      canvas.hoverCursor = "move";
    }
    
    // Special mode for pan tool
    if (tool === "hand") {
      canvas.on('mouse:down', enablePanning);
      canvas.on('mouse:up', disablePanning);
    } else {
      canvas.off('mouse:down', enablePanning);
      canvas.off('mouse:up', disablePanning);
    }
  };
  
  const enablePanning = (event: any) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    canvas.isDragging = true;
    canvas.selection = false;
    canvas.lastPosX = event.e.clientX;
    canvas.lastPosY = event.e.clientY;
  };

  const disablePanning = (event: any) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    canvas.setViewportTransform(canvas.viewportTransform);
    canvas.isDragging = false;
    canvas.selection = activeTool === "select";
  };

  // Handle panning when the hand tool is active
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    const handleDragging = (event: any) => {
      if (activeTool !== "hand" || !canvas.isDragging) return;
      
      const e = event.e;
      const vpt = canvas.viewportTransform;
      if (!vpt) return;
      
      vpt[4] += e.clientX - canvas.lastPosX;
      vpt[5] += e.clientY - canvas.lastPosY;
      
      canvas.requestRenderAll();
      canvas.lastPosX = e.clientX;
      canvas.lastPosY = e.clientY;
    };
    
    canvas.on('mouse:move', handleDragging);
    
    return () => {
      canvas.off('mouse:move', handleDragging);
    };
  }, [activeTool]);

  const snapObjectToGrid = (obj: fabric.Object) => {
    if (!snapToGrid || !obj) return;
    
    const gridSnapSize = gridSize;
    const left = Math.round(obj.left! / gridSnapSize) * gridSnapSize;
    const top = Math.round(obj.top! / gridSnapSize) * gridSnapSize;
    
    obj.set({
      left: left,
      top: top
    });
    
    obj.setCoords();
  };

  const addShape = (shape: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    let object;
    
    switch (shape) {
      case "square":
        object = new fabric.Rect({
          left: 100,
          top: 100,
          width: 80,
          height: 80,
          fill: "#d3d3d3",
          stroke: "#999",
          strokeWidth: 1,
          data: { type: "table" }
        });
        break;
      case "circle":
        object = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: "#d3d3d3",
          stroke: "#999",
          strokeWidth: 1,
          data: { type: "table" }
        });
        break;
      default:
        return;
    }
    
    canvas.add(object);
    canvas.setActiveObject(object);
    
    if (snapToGrid) {
      snapObjectToGrid(object);
    }
    
    saveState();
  };

  const addSeat = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    // Make sure we have the seatCategories property on the canvas
    if (!canvas.seatCategories) {
      canvas.seatCategories = [];
    }
    
    const seatCategories = canvas.seatCategories || [];
    const selectedSeatCategory = canvas.selectedSeatCategory || "standard";
    
    // Find the category or use a default color
    let categoryColor = "#10B981"; // Default green color
    if (seatCategories.length > 0) {
      const category = seatCategories.find(c => c.id === selectedSeatCategory);
      if (category) {
        categoryColor = category.color;
      }
    }
    
    const seatCount = canvas.getObjects().filter(obj => obj.data && obj.data.type === "seat").length + 1;
    const radius = 15;
    
    // Create the seat circle
    const seat = new fabric.Circle({
      radius: radius,
      fill: categoryColor,
      stroke: "#000",
      strokeWidth: 1,
      originX: 'center',
      originY: 'center',
      data: {
        type: "seat",
        available: true,
        categoryId: selectedSeatCategory,
        seatNumber: seatCount
      }
    });
    
    // Create the text with proper centering
    const text = new fabric.Text(seatCount.toString(), {
      fontSize: 12,
      fill: '#fff',
      fontWeight: 'bold',
      originX: 'center',
      originY: 'center',
      data: { 
        type: "seat-label",
        seatNumber: seatCount
      }
    });
    
    // Create a group with the seat and centered text
    const group = new fabric.Group([seat, text], {
      left: 150,
      top: 150,
      data: {
        type: "seat", 
        available: true,
        seatNumber: seatCount,
        categoryId: selectedSeatCategory
      }
    });
    
    canvas.add(group);
    canvas.setActiveObject(group);
    
    if (snapToGrid) {
      snapObjectToGrid(group);
    }
    
    saveState();
  };

  const addText = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    const text = new fabric.IText("Double-click to edit", {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: "#333",
      data: { type: "text" }
    });
    
    canvas.add(text);
    canvas.setActiveObject(text);
    saveState();
  };

  const deleteSelected = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !canvas.getActiveObject()) return;
    
    const activeObject = canvas.getActiveObject();
    canvas.remove(activeObject);
    canvas.renderAll();
    saveState();
  };

  const clearCanvas = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    canvas.getObjects().forEach(obj => {
      if (!obj.data || obj.data.type !== "grid") {
        canvas.remove(obj);
      }
    });
    
    canvas.renderAll();
    saveState();
    
    toast({
      title: "Canvas cleared",
      description: "All elements have been removed from the floor map.",
    });
  };

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
    if (floors.length <= 1) {
      toast({
        title: "Cannot delete floor",
        description: "You must have at least one floor in your workspace.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedFloors = floors.filter(f => f.id !== floorId);
    setFloors(updatedFloors);
    
    // If we deleted the active floor, switch to another one
    if (floorId === activeFloor) {
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

  const exportFloorMap = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    // Export all floor data
    const exportData = {
      floors: floors,
      activeFloor: activeFloor
    };
    
    const json = JSON.stringify(exportData);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'floor-map.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importFloorMap = (e: React.ChangeEvent<HTMLInputElement>) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const importData = JSON.parse(result);
          
          // Check if it's a single canvas or multi-floor data
          if (importData.floors && Array.isArray(importData.floors)) {
            setFloors(importData.floors);
            
            const newActiveFloor = importData.activeFloor || importData.floors[0].id;
            setActiveFloor(newActiveFloor);
            
            // Load the active floor
            const activeFloorData = importData.floors.find((f: FloorData) => f.id === newActiveFloor);
            if (activeFloorData && activeFloorData.canvasJson) {
              canvas.loadFromJSON(activeFloorData.canvasJson, () => {
                canvas.renderAll();
                ensureGridIsOnBottom();
                initHistory();
              });
            }
            
            toast({
              title: "Floor map imported",
              description: `Imported ${importData.floors.length} floor(s).`,
            });
          } else {
            // Backward compatibility - treat as single canvas
            canvas.loadFromJSON(result, () => {
              canvas.renderAll();
              ensureGridIsOnBottom();
              
              // Convert to new format
              const defaultFloor = {
                id: uuidv4(),
                name: "Ground Floor",
                canvasJson: result,
                level: 0
              };
              
              setFloors([defaultFloor]);
              setActiveFloor(defaultFloor.id);
              initHistory();
              
              toast({
                title: "Floor map imported",
                description: "The floor map has been successfully imported.",
              });
            });
          }
        }
      } catch (error) {
        console.error("Error importing floor map:", error);
        toast({
          title: "Import failed",
          description: "Failed to import the floor map. The file may be corrupted or in an invalid format.",
          variant: "destructive",
        });
      }
    };
    
    reader.readAsText(file);
    e.target.value = '';
  };

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

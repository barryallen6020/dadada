
import { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';

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
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current || fabricCanvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#f8f9fa",
      selection: true,
    });
    
    fabricCanvasRef.current = canvas;

    // Draw grid
    drawGrid();

    // Load initial data if provided
    if (initialData) {
      try {
        canvas.loadFromJSON(initialData, canvas.renderAll.bind(canvas));
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    }

    // Event listeners
    canvas.on("object:modified", saveState);
    canvas.on("object:added", saveState);
    canvas.on("object:removed", saveState);
    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:updated", handleSelectionCreated);
    canvas.on("selection:cleared", handleSelectionCleared);
    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);
    canvas.on("mouse:up", handleMouseUp);

    // Set up history
    initHistory();

    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, []);

  // Object movement handler with grid snapping
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    // Add event listener for object movement
    const handleObjectMoving = (e: any) => {
      if (snapToGrid && e.target) {
        snapObjectToGrid(e.target);
      }
    };
    
    canvas.on("object:moving", handleObjectMoving);
    
    return () => {
      canvas.off("object:moving", handleObjectMoving);
    };
  }, [snapToGrid, gridSize]);

  // Drawing line related handlers
  const handleMouseDown = (options: any) => {
    if (activeTool !== "line" || !fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const pointer = canvas.getPointer(options.e);
    
    if (!isDrawingLine) {
      setIsDrawingLine(true);
      setLinePoints([{ x: pointer.x, y: pointer.y }]);
      
      // Start the polyline with just the first point
      const line = new fabric.Line(
        [pointer.x, pointer.y, pointer.x, pointer.y],
        {
          strokeWidth: 2,
          stroke: '#000',
          selectable: false
        }
      );
      
      canvas.add(line);
      canvas.requestRenderAll();
    } else {
      // Add a new point
      const lastPoint = linePoints[linePoints.length - 1];
      
      // Create a line from the last point to the current point
      const line = new fabric.Line(
        [lastPoint.x, lastPoint.y, pointer.x, pointer.y],
        {
          strokeWidth: 2,
          stroke: '#000'
        }
      );
      
      canvas.add(line);
      setLinePoints([...linePoints, { x: pointer.x, y: pointer.y }]);
      canvas.requestRenderAll();
    }
  };
  
  const handleMouseMove = (options: any) => {
    if (!isDrawingLine || !fabricCanvasRef.current) return;
    
    // We could implement a preview line here if needed
  };
  
  const handleMouseUp = (options: any) => {
    // Line drawing continues until the user clicks "finish line" or selects another tool
  };

  const finishLine = () => {
    if (!isDrawingLine || linePoints.length < 2 || !fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    
    // Create a polyline with all points
    const pathData = linePoints.map((point, i) => 
      (i === 0 ? 'M' : 'L') + point.x + ' ' + point.y
    ).join(' ');
    
    const polyline = new fabric.Path(pathData, {
      fill: '',
      stroke: '#000',
      strokeWidth: 2,
      data: { type: 'wall' }
    });
    
    // Remove the temporary lines
    canvas.getObjects('line').forEach(obj => {
      if (!obj.data || !obj.data.type) {
        canvas.remove(obj);
      }
    });
    
    canvas.add(polyline);
    canvas.requestRenderAll();
    
    // Reset drawing state
    setIsDrawingLine(false);
    setLinePoints([]);
    saveState();
  };

  // Draw grid lines
  const drawGrid = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // Clear existing grid
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

    // Draw vertical grid lines
    for (let i = 0; i <= width; i += gridSize) {
      const line = new fabric.Line([i, 0, i, height], {
        stroke: "#e5e5e5",
        selectable: false,
        evented: false,
        data: { type: "grid" }
      });
      canvas.add(line);
      line.sendToBack();
    }

    // Draw horizontal grid lines
    for (let i = 0; i <= height; i += gridSize) {
      const line = new fabric.Line([0, i, width, i], {
        stroke: "#e5e5e5",
        selectable: false,
        evented: false,
        data: { type: "grid" }
      });
      canvas.add(line);
      line.sendToBack();
    }

    canvas.renderAll();
  };

  // History management
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
    
    // Save to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(json);
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCanUndo(newHistory.length > 1);
    setCanRedo(false);
    
    // Notify parent component of change
    onChange(json);
  };

  const undo = () => {
    if (historyIndex <= 0 || !fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const newIndex = historyIndex - 1;
    canvas.loadFromJSON(history[newIndex], canvas.renderAll.bind(canvas));
    
    setHistoryIndex(newIndex);
    setCanUndo(newIndex > 0);
    setCanRedo(true);
  };

  const redo = () => {
    if (historyIndex >= history.length - 1 || !fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const newIndex = historyIndex + 1;
    canvas.loadFromJSON(history[newIndex], canvas.renderAll.bind(canvas));
    
    setHistoryIndex(newIndex);
    setCanUndo(true);
    setCanRedo(newIndex < history.length - 1);
  };

  // Selection handlers
  const handleSelectionCreated = (options: any) => {
    const selection = options.selected?.[0] || options.target;
    setSelectedObject(selection);
  };

  const handleSelectionCleared = () => {
    setSelectedObject(null);
  };

  // Tool handlers
  const handleToolClick = (tool: string) => {
    setActiveTool(tool);
    
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // If we were drawing a line, finish it when switching tools
    if (isDrawingLine && tool !== "line") {
      finishLine();
    }

    // Disable drawing mode for all tools except drawing
    canvas.isDrawingMode = tool === "draw";
    
    // Enable/disable selection based on the tool
    const selectable = tool === "select" || tool === "hand";
    canvas.selection = selectable;
    canvas.getObjects().forEach(obj => {
      obj.selectable = selectable;
    });
  };

  // Snap to grid functionality
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
    
    // Add the object to canvas
    canvas.add(object);
    canvas.setActiveObject(object);
    
    // Apply snap to grid if enabled
    if (snapToGrid) {
      snapObjectToGrid(object);
    }
    
    saveState();
  };

  const addSeat = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    const seatCategories = canvas.seatCategories || [];
    const selectedSeatCategory = canvas.selectedSeatCategory || "standard";
    const category = seatCategories.find((c: any) => c.id === selectedSeatCategory) || { 
      id: "standard", 
      name: "Standard", 
      color: "#10B981", 
      price: 0 
    };
    
    // Create a seat marker (circle)
    const seat = new fabric.Circle({
      left: 150,
      top: 150,
      radius: 15,
      fill: category.color,
      stroke: "#000",
      strokeWidth: 1,
      data: {
        type: "seat",
        available: true,
        categoryId: category.id,
        categoryName: category.name,
        price: category.price
      }
    });
    
    // Add a label with the seat number
    const seatCount = canvas.getObjects().filter((obj: any) => obj.data && obj.data.type === "seat").length + 1;
    const text = new fabric.Text(seatCount.toString(), {
      fontSize: 12,
      fill: '#fff',
      fontWeight: 'bold',
      left: 150 + 15/2,
      top: 150 + 15/2,
      originX: 'center',
      originY: 'center',
      selectable: false,
      data: { 
        type: "seat-label",
        seatNumber: seatCount
      }
    });
    
    // Group the seat and label together
    const group = new fabric.Group([seat, text], {
      left: 150,
      top: 150,
      data: {
        type: "seat", 
        available: true,
        seatNumber: seatCount,
        categoryId: category.id,
        categoryName: category.name,
        price: category.price
      }
    });
    
    canvas.add(group);
    canvas.setActiveObject(group);
    
    // Apply snap to grid if enabled
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
    
    // Remove all objects except grid
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

  // Import/Export functionality
  const exportFloorMap = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    const json = JSON.stringify(canvas.toJSON(['data']));
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
          canvas.loadFromJSON(result, () => {
            canvas.renderAll();
            saveState();
            
            toast({
              title: "Floor map imported",
              description: "The floor map has been successfully imported.",
            });
          });
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
    
    // Reset the input value so the same file can be uploaded again if needed
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
    drawGrid
  };
};

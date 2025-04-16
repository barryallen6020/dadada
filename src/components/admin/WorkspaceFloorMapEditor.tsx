import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Square,
  Circle,
  Eraser,
  Hand,
  ChevronDown,
  Save,
  FileUp,
  FileDown,
  Trash2,
  Undo,
  Redo,
  Grid,
  Move,
  Type,
  Check,
  HelpCircle,
  Minus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface WorkspaceFloorMapEditorProps {
  initialData?: any;
  onChange: (data: any) => void;
}

const WorkspaceFloorMapEditor: React.FC<WorkspaceFloorMapEditorProps> = ({ initialData, onChange }) => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [activeTab, setActiveTab] = useState<string>("draw");
  const [gridSize, setGridSize] = useState<number>(20);
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true);
  const [activeTool, setActiveTool] = useState<string>("select");
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [selectedSeatCategory, setSelectedSeatCategory] = useState<string>("standard");
  const [seatCategories, setSeatCategories] = useState<Array<{id: string, name: string, color: string, price: number}>>([
    { id: "standard", name: "Standard", color: "#10B981", price: 0 }, // Default green
    { id: "premium", name: "Premium", color: "#3B82F6", price: 1000 },
    { id: "vip", name: "VIP", color: "#8B5CF6", price: 2000 }
  ]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "#000000",
    price: 0
  });
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [isDrawingLine, setIsDrawingLine] = useState<boolean>(false);
  const [linePoints, setLinePoints] = useState<{x: number, y: number}[]>([]);

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

  // Update grid when grid settings change
  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    drawGrid();
  }, [gridSize, showGrid]);

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
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

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

  const addShape = (shape: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    let object;
    
    switch (shape) {
      case "rect":
        object = new fabric.Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: "#d3d3d3",
          stroke: "#999",
          strokeWidth: 1,
          data: { type: "table" }
        });
        break;
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
    
    const category = seatCategories.find(c => c.id === selectedSeatCategory) || seatCategories[0];
    
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
    const seatCount = canvas.getObjects().filter(obj => obj.data && obj.data.type === "seat").length + 1;
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

  // Category management
  const addCategory = () => {
    if (!newCategory.name || !newCategory.color) {
      toast({
        title: "Invalid category",
        description: "Please provide a name and color for the category.",
        variant: "destructive",
      });
      return;
    }
    
    const id = newCategory.name.toLowerCase().replace(/\s+/g, '-');
    
    // Check if category with this ID already exists
    if (seatCategories.some(c => c.id === id)) {
      toast({
        title: "Category exists",
        description: "A category with this name already exists.",
        variant: "destructive",
      });
      return;
    }
    
    const newCategories = [
      ...seatCategories, 
      { 
        id, 
        name: newCategory.name, 
        color: newCategory.color,
        price: newCategory.price 
      }
    ];
    
    setSeatCategories(newCategories);
    setNewCategory({ name: "", color: "#000000", price: 0 });
    
    toast({
      title: "Category added",
      description: `${newCategory.name} category has been added.`,
    });
  };

  const deleteCategory = (id: string) => {
    // Don't allow deletion of the standard category
    if (id === "standard") {
      toast({
        title: "Cannot delete",
        description: "The standard category cannot be deleted.",
        variant: "destructive",
      });
      return;
    }
    
    setSeatCategories(seatCategories.filter(category => category.id !== id));
    
    // Reset selected category to standard if the deleted one was selected
    if (selectedSeatCategory === id) {
      setSelectedSeatCategory("standard");
    }
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

  // Tutorial content
  const tutorialSteps = [
    {
      title: "Getting Started with the Floor Map Editor",
      content: "Welcome to the Floor Map Editor! This tutorial will guide you through creating an interactive floor plan for your workspace."
    },
    {
      title: "Step 1: Outline Your Hub",
      content: "Start by outlining the perimeter of your hub. Select the Line tool and click on the canvas to create points for your outline. Click multiple times to create a polygon shape that represents your workspace boundaries."
    },
    {
      title: "Step 2: Add Internal Walls and Partitions",
      content: "Use the Line tool again to create internal walls and room dividers. This will help define separate areas within your workspace."
    },
    {
      title: "Step 3: Add Tables and Furniture",
      content: "Use the Square, Rectangle, and Circle tools to add tables and other furniture. Position them according to your actual workspace layout."
    },
    {
      title: "Step 4: Add Seats",
      content: "Click the 'Add Seat' button and place seats on or around tables. These will be the bookable positions in your workspace."
    },
    {
      title: "Step 5: Configure Seat Categories",
      content: "Go to the 'Seat Categories' tab to create different types of seats with varying prices. Then select seats and assign them to these categories."
    },
    {
      title: "Step 6: Adjust Grid Settings",
      content: "In the 'Settings' tab, you can adjust the grid size and toggle snap-to-grid functionality to help with precise placement."
    },
    {
      title: "Step 7: Save Your Work",
      content: "Use the Save/Load dropdown to export your floor map or save it to the workspace. Your floor map will then be available for users to book seats."
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="draw">Drawing Tools</TabsTrigger>
            <TabsTrigger value="seats">Seat Categories</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="draw" className="space-y-4 mt-2">
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={activeTool === "select" ? "default" : "outline"}
                size="sm"
                onClick={() => handleToolClick("select")}
                title="Select Tool"
              >
                <Move className="h-4 w-4 mr-1" />
                Select
              </Button>
              <Button
                type="button"
                variant={activeTool === "hand" ? "default" : "outline"}
                size="sm"
                onClick={() => handleToolClick("hand")}
                title="Pan Tool"
              >
                <Hand className="h-4 w-4 mr-1" />
                Pan
              </Button>
              <Button
                type="button"
                variant={activeTool === "line" ? "default" : "outline"}
                size="sm"
                onClick={() => handleToolClick("line")}
                title="Line Tool"
              >
                <Minus className="h-4 w-4 mr-1" />
                Line
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addShape("square")}
                title="Add Square"
              >
                <Square className="h-4 w-4 mr-1" />
                Square
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addShape("circle")}
                title="Add Circle"
              >
                <Circle className="h-4 w-4 mr-1" />
                Circle
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSeat}
                title="Add Seat"
                className="bg-gray-100"
              >
                <Circle className="h-4 w-4 mr-1" style={{ fill: seatCategories.find(c => c.id === selectedSeatCategory)?.color || "#10B981" }} />
                Add Seat
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addText}
                title="Add Text"
              >
                <Type className="h-4 w-4 mr-1" />
                Text
              </Button>
              <Button
                type="button"
                variant={activeTool === "eraser" ? "default" : "outline"}
                size="sm"
                onClick={() => handleToolClick("eraser")}
                title="Eraser"
              >
                <Eraser className="h-4 w-4 mr-1" />
                Eraser
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowTutorial(true)}
                className="bg-yellow-100 hover:bg-yellow-200"
                title="Show Tutorial"
              >
                <HelpCircle className="h-4 w-4 mr-1" />
                Tutorial
              </Button>
            </div>
            
            {/* Line tool actions - only shown when line tool is active */}
            {activeTool === "line" && (
              <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-md">
                <span className="text-sm text-blue-700 flex-grow">
                  {isDrawingLine 
                    ? `Drawing line: ${linePoints.length} points (click to add more points)` 
                    : "Click on canvas to start drawing a line"}
                </span>
                {isDrawingLine && (
                  <Button
                    type="button"
                    size="sm"
                    onClick={finishLine}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Finish Line
                  </Button>
                )}
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={!canUndo}
                title="Undo"
              >
                <Undo className="h-4 w-4 mr-1" />
                Undo
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
                title="Redo"
              >
                <Redo className="h-4 w-4 mr-1" />
                Redo
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={deleteSelected}
                disabled={!selectedObject}
                className={selectedObject ? "border-red-300 text-red-500 hover:bg-red-50" : ""}
                title="Delete Selected"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearCanvas}
                className="border-red-300 text-red-500 hover:bg-red-50"
                title="Clear All"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
              <div className="ml-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      title="Import/Export"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save/Load <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60" align="end">
                    <div className="space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={exportFloorMap}
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Export Floor Map
                      </Button>
                      <div className="relative">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => document.getElementById('import-floor-map')?.click()}
                        >
                          <FileUp className="h-4 w-4 mr-2" />
                          Import Floor Map
                        </Button>
                        <input
                          id="import-floor-map"
                          type="file"
                          accept=".json"
                          className="hidden"
                          onChange={importFloorMap}
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="seats" className="space-y-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Seat Categories</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-2">
                  {seatCategories.map((category) => (
                    <div 
                      key={category.id}
                      className={`flex items-center justify-between p-2 rounded-md ${
                        selectedSeatCategory === category.id ? "bg-gray-100" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span>{category.name}</span>
                        <span className="text-xs text-gray-500">₦{category.price}</span>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => setSelectedSeatCategory(category.id)}
                        >
                          {selectedSeatCategory === category.id ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Circle className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-500"
                          onClick={() => deleteCategory(category.id)}
                          disabled={category.id === "standard"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Add New Category</h3>
                <div className="space-y-3 border rounded-md p-3">
                  <div className="space-y-1">
                    <Label htmlFor="category-name">Category Name</Label>
                    <Input
                      id="category-name"
                      placeholder="e.g., Executive"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({...newCategory, name: e.

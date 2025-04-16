
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
  RectangleHorizontal,
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
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
                onClick={() => addShape("rect")}
                title="Add Rectangle"
              >
                <RectangleHorizontal className="h-4 w-4 mr-1" />
                Rectangle
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
            </div>
            
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
                      onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="category-color">Color</Label>
                    <div className="flex space-x-2">
                      <div 
                        className="w-8 h-8 border rounded-md" 
                        style={{ backgroundColor: newCategory.color }}
                      />
                      <Input
                        id="category-color"
                        type="color"
                        value={newCategory.color}
                        onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="category-price">Additional Price (₦)</Label>
                    <Input
                      id="category-price"
                      type="number"
                      placeholder="0"
                      value={newCategory.price.toString()}
                      onChange={(e) => setNewCategory({...newCategory, price: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  
                  <Button
                    type="button"
                    onClick={addCategory}
                    size="sm"
                    className="w-full"
                  >
                    Add Category
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="grid-size">Grid Size</Label>
                    <span className="text-sm text-gray-500">{gridSize}px</span>
                  </div>
                  <Slider
                    id="grid-size"
                    min={5}
                    max={50}
                    step={5}
                    value={[gridSize]}
                    onValueChange={(value) => setGridSize(value[0])}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="snap-grid"
                    checked={snapToGrid}
                    onCheckedChange={setSnapToGrid}
                  />
                  <Label htmlFor="snap-grid">Snap to Grid</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-grid"
                    checked={showGrid}
                    onCheckedChange={setShowGrid}
                  />
                  <Label htmlFor="show-grid">Show Grid</Label>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Canvas Size</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="canvas-width" className="text-xs">Width (px)</Label>
                      <Input
                        id="canvas-width"
                        type="number"
                        value={fabricCanvasRef.current?.width || 800}
                        onChange={(e) => {
                          const width = parseInt(e.target.value) || 800;
                          if (fabricCanvasRef.current) {
                            fabricCanvasRef.current.setWidth(width);
                            drawGrid();
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="canvas-height" className="text-xs">Height (px)</Label>
                      <Input
                        id="canvas-height"
                        type="number"
                        value={fabricCanvasRef.current?.height || 600}
                        onChange={(e) => {
                          const height = parseInt(e.target.value) || 600;
                          if (fabricCanvasRef.current) {
                            fabricCanvasRef.current.setHeight(height);
                            drawGrid();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="canvas-bg">Canvas Background</Label>
                  <Input
                    id="canvas-bg"
                    type="color"
                    value="#f8f9fa"
                    onChange={(e) => {
                      if (fabricCanvasRef.current) {
                        fabricCanvasRef.current.setBackgroundColor(e.target.value, () => {
                          fabricCanvasRef.current?.renderAll();
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="border rounded-md p-1 bg-gray-50">
        <div className="relative border bg-white">
          <canvas ref={canvasRef} className="w-full max-w-full" />
          
          {/* Canvas overlay with info text */}
          {!fabricCanvasRef.current && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <p className="text-gray-500">Loading canvas...</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Property panel for selected object */}
      {selectedObject && (
        <div className="border rounded-md p-4 bg-gray-50">
          <h3 className="text-sm font-medium mb-2">Selected Object Properties</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="object-left" className="text-xs">X Position</Label>
              <Input
                id="object-left"
                type="number"
                value={Math.round(selectedObject.left || 0)}
                onChange={(e) => {
                  selectedObject.set({ left: parseInt(e.target.value) || 0 });
                  fabricCanvasRef.current?.renderAll();
                }}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="object-top" className="text-xs">Y Position</Label>
              <Input
                id="object-top"
                type="number"
                value={Math.round(selectedObject.top || 0)}
                onChange={(e) => {
                  selectedObject.set({ top: parseInt(e.target.value) || 0 });
                  fabricCanvasRef.current?.renderAll();
                }}
              />
            </div>
            
            {/* Special properties for seat objects */}
            {selectedObject.data?.type === "seat" && (
              <div className="col-span-2 space-y-2">
                <Label htmlFor="seat-category" className="text-xs">Seat Category</Label>
                <Select
                  value={selectedObject.data.categoryId || "standard"}
                  onValueChange={(value) => {
                    const category = seatCategories.find(c => c.id === value);
                    if (category && selectedObject instanceof fabric.Group) {
                      // Update the seat color based on the category
                      const seat = selectedObject.getObjects()[0];
                      if (seat instanceof fabric.Circle) {
                        seat.set({ fill: category.color });
                      }
                      
                      // Update the seat data
                      selectedObject.data = {
                        ...selectedObject.data,
                        categoryId: category.id,
                        categoryName: category.name,
                        price: category.price
                      };
                      
                      fabricCanvasRef.current?.renderAll();
                      saveState();
                    }
                  }}
                >
                  <SelectTrigger id="seat-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {seatCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: category.color }}
                          />
                          {category.name} (₦{category.price})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceFloorMapEditor;

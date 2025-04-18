import { useState } from 'react';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

interface UseDrawingToolsProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
  snapToGrid: boolean;
  snapObjectToGrid: (obj: fabric.Object) => void;
  isGridObject: (obj: fabric.Object) => boolean;
  saveState: () => void;
}

export const useDrawingTools = ({
  fabricCanvasRef,
  snapToGrid,
  snapObjectToGrid,
  isGridObject,
  saveState
}: UseDrawingToolsProps) => {
  const [activeTool, setActiveTool] = useState<string>("select");
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [isDrawingLine, setIsDrawingLine] = useState<boolean>(false);
  const [linePoints, setLinePoints] = useState<{x: number, y: number}[]>([]);
  const [tempLine, setTempLine] = useState<fabric.Line | null>(null);

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
    
    if (!canvas.seatCategories) {
      canvas.seatCategories = [];
    }
    
    const seatCategories = canvas.seatCategories || [];
    const selectedSeatCategory = canvas.selectedSeatCategory || "standard";
    
    let categoryColor = "#10B981";
    if (seatCategories.length > 0) {
      const category = seatCategories.find(c => c.id === selectedSeatCategory);
      if (category) {
        categoryColor = category.color;
      }
    }
    
    const seatCount = canvas.getObjects().filter(obj => obj.data && obj.data.type === "seat").length + 1;
    const radius = 15;
    
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
  };

  return {
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
  };
};

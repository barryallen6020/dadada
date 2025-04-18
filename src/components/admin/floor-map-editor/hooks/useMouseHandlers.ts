
import { fabric } from 'fabric';

interface UseMouseHandlersProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
  activeTool: string;
  isDrawingLine: boolean;
  linePoints: {x: number, y: number}[];
  tempLine: fabric.Line | null;
  setIsDrawingLine: (isDrawing: boolean) => void;
  setLinePoints: (points: {x: number, y: number}[]) => void;
  setTempLine: (line: fabric.Line | null) => void;
  setSelectedObject: (obj: fabric.Object | null) => void;
  isGridObject: (obj: fabric.Object) => boolean;
  saveState: () => void;
}

export const useMouseHandlers = ({
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
}: UseMouseHandlersProps) => {
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

  const handleSelectionCreated = (options: any) => {
    const selection = options.selected?.[0] || options.target;
    if (selection && !isGridObject(selection)) {
      setSelectedObject(selection);
    }
  };

  const handleSelectionCleared = () => {
    setSelectedObject(null);
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

  return {
    handleMouseDown,
    handleMouseMove,
    handleSelectionCreated,
    handleSelectionCleared,
    finishLine
  };
};


import { useState, useEffect } from 'react';
import { fabric } from 'fabric';

interface UseGridProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

export const useGrid = ({ fabricCanvasRef }: UseGridProps) => {
  const [gridSize, setGridSize] = useState<number>(20);
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);

  const isGridObject = (obj: fabric.Object): boolean => {
    return obj.data && obj.data.type === "grid";
  };

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

  const ensureGridIsOnBottom = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    canvas.getObjects().forEach(obj => {
      if (obj.data && obj.data.type === "grid") {
        obj.sendToBack();
      }
    });
  };

  return {
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
  };
};

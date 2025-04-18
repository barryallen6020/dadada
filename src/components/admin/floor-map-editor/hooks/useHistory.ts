
import { useState } from 'react';
import { fabric } from 'fabric';

interface UseHistoryProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
  ensureGridIsOnBottom: () => void;
  floors: any[];
  activeFloor: string;
  setFloors: (floors: any[]) => void;
  onChange: (data: any) => void;
}

export const useHistory = ({
  fabricCanvasRef,
  ensureGridIsOnBottom,
  floors,
  activeFloor,
  setFloors,
  onChange
}: UseHistoryProps) => {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);

  // Create a history object that can be updated from outside
  const historyObject = {
    floors,
    activeFloor,
    setFloors
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
    if (historyObject.activeFloor) {
      const updatedFloors = historyObject.floors.map(floor => {
        if (floor.id === historyObject.activeFloor) {
          return { ...floor, canvasJson: json };
        }
        return floor;
      });
      
      historyObject.setFloors(updatedFloors);
      onChange({ floors: updatedFloors, activeFloor: historyObject.activeFloor });
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

  return {
    history: historyObject,
    historyIndex,
    canUndo,
    canRedo,
    initHistory,
    saveState,
    undo,
    redo
  };
};

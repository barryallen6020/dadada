
import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useToast } from "@/hooks/use-toast";
import { DrawingTools } from "./DrawingTools";
import { SeatCategories } from "./SeatCategories";
import { EditorSettings } from "./EditorSettings";
import { TutorialDialog } from "./TutorialDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCanvas } from "./hooks/useCanvas";
import { useSeatCategories } from "./hooks/useSeatCategories";
import { TUTORIAL_STEPS } from "./constants";

interface WorkspaceFloorMapEditorProps {
  initialData?: any;
  onChange: (data: any) => void;
}

export const WorkspaceFloorMapEditor: React.FC<WorkspaceFloorMapEditorProps> = ({ initialData, onChange }) => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState<string>("draw");
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  
  const {
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
  } = useCanvas({
    canvasRef,
    initialData,
    onChange,
    toast
  });
  
  const {
    seatCategories,
    selectedSeatCategory,
    setSelectedSeatCategory,
    newCategory,
    setNewCategory,
    addCategory,
    deleteCategory
  } = useSeatCategories({ toast });

  // Update grid when grid settings change
  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    drawGrid();
  }, [gridSize, showGrid]);

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
            <DrawingTools
              activeTool={activeTool}
              handleToolClick={handleToolClick}
              addShape={addShape}
              addSeat={addSeat}
              addText={addText}
              setShowTutorial={setShowTutorial}
              seatCategories={seatCategories}
              selectedSeatCategory={selectedSeatCategory}
              isDrawingLine={isDrawingLine}
              linePoints={linePoints}
              finishLine={finishLine}
              canUndo={canUndo}
              canRedo={canRedo}
              selectedObject={selectedObject}
              undo={undo}
              redo={redo}
              deleteSelected={deleteSelected}
              clearCanvas={clearCanvas}
              exportFloorMap={exportFloorMap}
              importFloorMap={importFloorMap}
            />
          </TabsContent>
          
          <TabsContent value="seats" className="space-y-4 mt-2">
            <SeatCategories
              seatCategories={seatCategories}
              selectedSeatCategory={selectedSeatCategory}
              setSelectedSeatCategory={setSelectedSeatCategory}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              addCategory={addCategory}
              deleteCategory={deleteCategory}
            />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4 mt-2">
            <EditorSettings
              gridSize={gridSize}
              setGridSize={setGridSize}
              showGrid={showGrid}
              setShowGrid={setShowGrid}
              snapToGrid={snapToGrid}
              setSnapToGrid={setSnapToGrid}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="border border-gray-200 rounded-md p-2">
        <canvas ref={canvasRef} className="w-full" />
      </div>
      
      {showTutorial && (
        <TutorialDialog 
          open={showTutorial}
          onOpenChange={setShowTutorial}
          steps={TUTORIAL_STEPS}
        />
      )}
    </div>
  );
};

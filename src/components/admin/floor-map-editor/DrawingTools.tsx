
import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  Move,
  Type,
  Check,
  HelpCircle,
  Minus
} from "lucide-react";
import { SeatCategory } from './hooks/useSeatCategories';

interface DrawingToolsProps {
  activeTool: string;
  handleToolClick: (tool: string) => void;
  addShape: (shape: string) => void;
  addSeat: () => void;
  addText: () => void;
  setShowTutorial: (show: boolean) => void;
  seatCategories: SeatCategory[];
  selectedSeatCategory: string;
  isDrawingLine: boolean;
  linePoints: {x: number, y: number}[];
  finishLine: () => void;
  canUndo: boolean;
  canRedo: boolean;
  selectedObject: any;
  undo: () => void;
  redo: () => void;
  deleteSelected: () => void;
  clearCanvas: () => void;
  exportFloorMap: () => void;
  importFloorMap: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DrawingTools: React.FC<DrawingToolsProps> = ({
  activeTool,
  handleToolClick,
  addShape,
  addSeat,
  addText,
  setShowTutorial,
  seatCategories,
  selectedSeatCategory,
  isDrawingLine,
  linePoints,
  finishLine,
  canUndo,
  canRedo,
  selectedObject,
  undo,
  redo,
  deleteSelected,
  clearCanvas,
  exportFloorMap,
  importFloorMap
}) => {
  return (
    <>
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
          <Circle 
            className="h-4 w-4 mr-1" 
            style={{ 
              fill: seatCategories.find(c => c.id === selectedSeatCategory)?.color || "#10B981" 
            }} 
          />
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
    </>
  );
};

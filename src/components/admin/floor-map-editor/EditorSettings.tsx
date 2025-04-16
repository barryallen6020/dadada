
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface EditorSettingsProps {
  gridSize: number;
  setGridSize: (size: number) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  snapToGrid: boolean;
  setSnapToGrid: (snap: boolean) => void;
}

export const EditorSettings: React.FC<EditorSettingsProps> = ({
  gridSize,
  setGridSize,
  showGrid,
  setShowGrid,
  snapToGrid,
  setSnapToGrid
}) => {
  return (
    <div className="space-y-6 p-2">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="grid-size" className="text-sm">Grid Size: {gridSize}px</Label>
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
          id="show-grid"
          checked={showGrid}
          onCheckedChange={setShowGrid}
        />
        <Label htmlFor="show-grid">Show Grid</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="snap-to-grid"
          checked={snapToGrid}
          onCheckedChange={setSnapToGrid}
        />
        <Label htmlFor="snap-to-grid">Snap to Grid</Label>
      </div>
    </div>
  );
};

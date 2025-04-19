
import React from 'react';
import { WorkspaceFloorMapEditor as FloorMapEditor } from './floor-map-editor';

interface WorkspaceFloorMapEditorProps {
  onChange?: (data: any) => void;
}

const WorkspaceFloorMapEditor: React.FC<WorkspaceFloorMapEditorProps> = ({ onChange }) => {
  const handleFloorMapChange = (data: any) => {
    console.log("Floor map data changed:", data);
    onChange?.(data);
  };

  return <FloorMapEditor onChange={handleFloorMapChange} />;
};

export default WorkspaceFloorMapEditor;

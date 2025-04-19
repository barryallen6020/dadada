
import React from 'react';
import { WorkspaceFloorMapEditor as FloorMapEditor } from './floor-map-editor';

const WorkspaceFloorMapEditor = () => {
  // Create a dummy onChange handler since it's required by the component
  const handleFloorMapChange = (data: any) => {
    console.log("Floor map data changed:", data);
    // This is a placeholder. In a real implementation, you would pass this data to the parent component
  };

  return <FloorMapEditor onChange={handleFloorMapChange} />;
};

export default WorkspaceFloorMapEditor;

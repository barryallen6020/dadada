
import React from 'react';
import { SeatCategory } from './hooks/useSeatCategories';

interface CategoryPreviewProps {
  seatCategories: SeatCategory[];
  selectedSeatCategory: string;
}

export const CategoryPreview: React.FC<CategoryPreviewProps> = ({
  seatCategories,
  selectedSeatCategory
}) => {
  const selectedCategory = seatCategories.find(c => c.id === selectedSeatCategory);
  
  if (!selectedCategory) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-md">
      <div 
        className="w-6 h-6 rounded-full" 
        style={{ backgroundColor: selectedCategory.color }}
      />
      <div className="text-sm">
        <div className="font-medium">Category: {selectedCategory.name}</div>
        <div className="text-muted-foreground text-xs">
          Price: ${selectedCategory.price}
        </div>
      </div>
    </div>
  );
};

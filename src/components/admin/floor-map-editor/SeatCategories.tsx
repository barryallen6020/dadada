
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Circle, Trash2 } from "lucide-react";
import { SeatCategory } from './hooks/useSeatCategories';

interface SeatCategoriesProps {
  seatCategories: SeatCategory[];
  selectedSeatCategory: string;
  setSelectedSeatCategory: (id: string) => void;
  newCategory: {
    name: string;
    color: string;
    price: number;
  };
  setNewCategory: (category: {
    name: string;
    color: string;
    price: number;
  }) => void;
  addCategory: () => void;
  deleteCategory: (id: string) => void;
}

export const SeatCategories: React.FC<SeatCategoriesProps> = ({
  seatCategories,
  selectedSeatCategory,
  setSelectedSeatCategory,
  newCategory,
  setNewCategory,
  addCategory,
  deleteCategory
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Seat Categories</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-2">
          {seatCategories.map((category) => (
            <div 
              key={category.id}
              className={`flex items-center justify-between p-2 rounded-md ${
                selectedSeatCategory === category.id ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span>{category.name}</span>
                <span className="text-xs text-gray-500">₦{category.price}</span>
              </div>
              <div className="flex space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setSelectedSeatCategory(category.id)}
                >
                  {selectedSeatCategory === category.id ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-red-500"
                  onClick={() => deleteCategory(category.id)}
                  disabled={category.id === "standard"}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Add New Category</h3>
        <div className="space-y-3 border rounded-md p-3">
          <div className="space-y-1">
            <Label htmlFor="category-name">Category Name</Label>
            <Input
              id="category-name"
              placeholder="e.g., Executive"
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="category-color">Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="category-color"
                type="color"
                value={newCategory.color}
                onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                className="w-16 p-1 h-9"
              />
              <div 
                className="w-9 h-9 rounded-md border" 
                style={{ backgroundColor: newCategory.color }}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="category-price">Price (₦)</Label>
            <Input
              id="category-price"
              type="number"
              placeholder="0"
              value={newCategory.price}
              onChange={(e) => setNewCategory({...newCategory, price: Number(e.target.value)})}
            />
          </div>
          <Button 
            type="button" 
            onClick={addCategory}
            className="w-full mt-2"
          >
            Add Category
          </Button>
        </div>
      </div>
    </div>
  );
};

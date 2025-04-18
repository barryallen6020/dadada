
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Circle, Eye, Trash2 } from "lucide-react";

interface SeatCategory {
  id: string;
  name: string;
  color: string;
  price: number;
}

interface SeatCategoriesProps {
  seatCategories: SeatCategory[];
  selectedSeatCategory: string;
  setSelectedSeatCategory: (id: string) => void;
  newCategory: {
    name: string;
    color: string;
    price: number;
  };
  setNewCategory: (category: { name: string; color: string; price: number }) => void;
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
  const [previewCategory, setPreviewCategory] = React.useState<string | null>(null);

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
              onMouseEnter={() => setPreviewCategory(category.id)}
              onMouseLeave={() => setPreviewCategory(null)}
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

      {/* Preview section */}
      <div>
        <h3 className="text-sm font-medium mb-2">Category Preview</h3>
        <div className="border rounded-md p-4 h-60 flex items-center justify-center bg-gray-50">
          {previewCategory ? (
            <div className="text-center space-y-2">
              <div 
                className="w-20 h-20 rounded-full mx-auto" 
                style={{ 
                  backgroundColor: seatCategories.find(c => c.id === previewCategory)?.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  border: '2px solid black'
                }}
              >
                1
              </div>
              <p className="text-sm font-medium">
                {seatCategories.find(c => c.id === previewCategory)?.name}
              </p>
              <p className="text-xs text-gray-500">
                ₦{seatCategories.find(c => c.id === previewCategory)?.price}
              </p>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <Eye className="h-8 w-8 mx-auto mb-2" />
              <p>Hover over a category to preview</p>
            </div>
          )}
        </div>
      </div>

      {/* Add New Category section */}
      <div className="md:col-span-2">
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

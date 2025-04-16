
import { useState } from 'react';

export interface SeatCategory {
  id: string;
  name: string;
  color: string;
  price: number;
}

interface NewCategory {
  name: string;
  color: string;
  price: number;
}

export const useSeatCategories = ({ toast }: any) => {
  const [seatCategories, setSeatCategories] = useState<SeatCategory[]>([
    { id: "standard", name: "Standard", color: "#10B981", price: 0 }, // Default green
    { id: "premium", name: "Premium", color: "#3B82F6", price: 1000 },
    { id: "vip", name: "VIP", color: "#8B5CF6", price: 2000 }
  ]);

  const [selectedSeatCategory, setSelectedSeatCategory] = useState<string>("standard");
  const [newCategory, setNewCategory] = useState<NewCategory>({
    name: "",
    color: "#000000",
    price: 0
  });

  const addCategory = () => {
    if (!newCategory.name || !newCategory.color) {
      toast({
        title: "Invalid category",
        description: "Please provide a name and color for the category.",
        variant: "destructive",
      });
      return;
    }
    
    const id = newCategory.name.toLowerCase().replace(/\s+/g, '-');
    
    // Check if category with this ID already exists
    if (seatCategories.some(c => c.id === id)) {
      toast({
        title: "Category exists",
        description: "A category with this name already exists.",
        variant: "destructive",
      });
      return;
    }
    
    const newCategories = [
      ...seatCategories, 
      { 
        id, 
        name: newCategory.name, 
        color: newCategory.color,
        price: newCategory.price 
      }
    ];
    
    setSeatCategories(newCategories);
    setNewCategory({ name: "", color: "#000000", price: 0 });
    
    toast({
      title: "Category added",
      description: `${newCategory.name} category has been added.`,
    });
  };

  const deleteCategory = (id: string) => {
    // Don't allow deletion of the standard category
    if (id === "standard") {
      toast({
        title: "Cannot delete",
        description: "The standard category cannot be deleted.",
        variant: "destructive",
      });
      return;
    }
    
    setSeatCategories(seatCategories.filter(category => category.id !== id));
    
    // Reset selected category to standard if the deleted one was selected
    if (selectedSeatCategory === id) {
      setSelectedSeatCategory("standard");
    }
  };

  return {
    seatCategories,
    selectedSeatCategory,
    setSelectedSeatCategory,
    newCategory,
    setNewCategory,
    addCategory,
    deleteCategory
  };
};

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, MapPin, Users, Building2, Star, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { organizations } from "@/data/workspaces";

interface WorkspaceCardProps {
  workspace: {
    id: string;
    name: string;
    type: string;
    location: string;
    capacity: number;
    description: string;
    features: string[];
    pricePerHour: number;
    image: string;
    availability: string;
    enabled?: boolean;
    organizationId: string;
    rating?: number;
    isFavorite?: boolean;
  };
  onBook: () => void;
  onToggleFavorite?: (id: string) => void;
  onRate?: (id: string, rating: number) => void;
}

const WorkspaceCard: React.FC<any> = ({ 
  workspace, 
  onBook, 
  onToggleFavorite,
  onRate 
}) => {
  if (!workspace || workspace.enabled === false) {
    return null;
  }
  
  const organization = organizations.find(org => org.id === workspace.organizationId);
  
  const currencySymbol = organization?.currency || "₦";
  
  const imageUrl = workspace.image
  
  const [formattedLocation, setFormatedLocation] = useState(workspace.location || '')
  
  const renderStars = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-4 w-4 cursor-pointer transition-colors",
              star <= (workspace?.rating || 0)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            )}
            onClick={() => onRate?.(workspace?.id, star)}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="glass-card overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/20 backdrop-blur-lg border border-white/30">
      <div 
        className="h-48 relative bg-cover bg-center" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex justify-between items-start mb-2">
            <Badge 
              className={cn(
                "mb-2",
                workspace.availability === "High" 
                  ? "bg-green-100 text-green-800 hover:bg-green-100" 
                  : workspace.availability === "Medium" 
                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" 
                  : "bg-red-100 text-red-800 hover:bg-red-100"
              )}
            >
              {workspace.availability} Availability
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-red-500 transition-colors"
              onClick={() => onToggleFavorite?.(workspace.id)}
            >
              <Heart 
                className={cn(
                  "h-5 w-5",
                  workspace.isFavorite ? "fill-red-500 text-red-500" : ""
                )} 
              />
            </Button>
          </div>
          <h3 className="text-white text-xl font-bold">{workspace?.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-deskhive-darkgray/80">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {formattedLocation}
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                {workspace?.capacity} {workspace?.capacity === 1 ? "person" : "people"}
              </div>
              {organization && (
                <div className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4" />
                  {organization.name}
                </div>
              )}
            </div>
          </div>
          <Badge variant="outline" className="bg-deskhive-skyblue/50 text-deskhive-navy font-normal">
            {workspace.type}
          </Badge>
        </div>
        
        <p className="text-deskhive-darkgray/80 text-sm mb-4">
          {workspace.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {workspace?.features?.map((feature, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="bg-deskhive-skyblue/30 border-none text-deskhive-darkgray/90"
            >
              {feature}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="text-deskhive-navy font-semibold">
              {currencySymbol}{workspace?.pricePerHour?.toLocaleString()} / hour
            </div>
            {renderStars()}
          </div>
          <Button onClick={onBook} className="btn-primary">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;

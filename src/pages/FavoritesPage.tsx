
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { workspaces } from "@/data/workspaces";
import { useNavigate } from "react-router-dom";
import { useOrganization } from "@/contexts/OrganizationContext";
import { useToast } from "@/hooks/use-toast";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const { currentOrganization } = useOrganization();
  
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteHubs");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    const savedRatings = localStorage.getItem("hubRatings");
    if (savedRatings) {
      setRatings(JSON.parse(savedRatings));
    }
  }, []);

  // Get all workspaces from the current organization
  const organizationWorkspaces = workspaces
    .filter(workspace => workspace.enabled !== false && workspace.organizationId === currentOrganization.id)
    .map(workspace => ({
      ...workspace,
      isFavorite: favorites.includes(workspace.id),
      rating: ratings[workspace.id]
    }));
  
  // Filter to only favorited workspaces
  const favoriteWorkspaces = organizationWorkspaces.filter(
    workspace => favorites.includes(workspace.id)
  );
  
  // Apply search filter
  const filteredFavorites = favoriteWorkspaces.filter(
    (workspace) =>
      workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workspace.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workspace.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleFavorite = (workspaceId: string) => {
    const newFavorites = favorites.includes(workspaceId)
      ? favorites.filter(id => id !== workspaceId)
      : [...favorites, workspaceId];
    
    setFavorites(newFavorites);
    localStorage.setItem("favoriteHubs", JSON.stringify(newFavorites));
    
    toast({
      title: favorites.includes(workspaceId) ? "Removed from favorites" : "Added to favorites",
      description: favorites.includes(workspaceId) 
        ? "The hub has been removed from your favorites" 
        : "The hub has been added to your favorites",
    });
  };

  const handleRate = (workspaceId: string, rating: number) => {
    const newRatings = { ...ratings, [workspaceId]: rating };
    setRatings(newRatings);
    localStorage.setItem("hubRatings", JSON.stringify(newRatings));
    
    toast({
      title: "Rating updated",
      description: `You've rated this hub ${rating} stars`,
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">
            Favorite Hubs
          </h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Your bookmarked workspaces for easy access
          </p>
        </div>
        
        <div className="mb-6 relative w-full">
          <div className="relative w-full">
            <Input
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Heart className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-deskhive-orange" />
          </div>
        </div>
        
        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace}
                onBook={() => navigate(`/book/${workspace.id}`)}
                onToggleFavorite={handleToggleFavorite}
                onRate={handleRate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Heart className="h-16 w-16 text-deskhive-darkgray/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-deskhive-darkgray/70 mb-4">
              Start adding workspaces to your favorites from the dashboard
            </p>
            <Button 
              onClick={() => navigate("/dashboard")} 
              className="bg-deskhive-navy hover:bg-deskhive-navy/90"
            >
              Go to Dashboard
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FavoritesPage;

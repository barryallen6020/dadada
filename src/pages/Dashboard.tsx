import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, SlidersHorizontal, MapPin, Building2, UserCheck, Star } from "lucide-react";
import { workspaces } from "@/data/workspaces";
import FilterModal from "@/components/dashboard/FilterModal";
import CheckInStatus from "@/components/dashboard/CheckInStatus";
import { Link, useNavigate } from "react-router-dom";
import { useOrganization } from "@/contexts/OrganizationContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Workspace } from "@/types/workspace";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState("all");
  
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

  const organizationWorkspaces = workspaces
    .filter(workspace => workspace.enabled !== false && workspace.organizationId === currentOrganization.id)
    .map(workspace => ({
      ...workspace,
      isFavorite: favorites.includes(workspace.id),
      rating: ratings[workspace.id]
    }));
  
  const filteredWorkspaces = organizationWorkspaces.filter(
    (workspace) =>
      workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workspace.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workspace.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteWorkspaces = filteredWorkspaces.filter(
    workspace => favorites.includes(workspace.id)
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

  const userStr = localStorage.getItem("user");
  const defaultUser = {name: "Guest User", email: "guest@example.com"};
  const user = userStr ? JSON.parse(userStr) : defaultUser;

  const userName = user?.name ? user.name.split(' ')[0] : 'Guest';
  const userEmail = user?.email || '';

  const handleApplyFilters = (filters: any) => {
    console.log("Filters applied:", filters);
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">
            Welcome back, {userName}
          </h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Find and book the perfect workspace for your needs
          </p>
        </div>
        
        <div className="mb-6">
          <CheckInStatus userEmail={userEmail} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-deskhive-orange" />
                Upcoming Bookings
              </CardTitle>
              <CardDescription>Your scheduled workspaces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center">
                <p className="text-deskhive-darkgray">You have no upcoming bookings</p>
                <Link to="/bookings">
                  <Button className="mt-3 bg-deskhive-navy hover:bg-deskhive-navy/90" size="sm">
                    View All Bookings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-deskhive-orange" />
                Featured Hubs
              </CardTitle>
              <CardDescription>Popular workspaces in {currentOrganization.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {organizationWorkspaces.slice(0, 2).map((workspace) => (
                  <div key={workspace.id} className="p-2 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">{workspace.name}</p>
                      <div className="flex items-center text-xs text-deskhive-darkgray/70">
                        <MapPin className="h-3 w-3 mr-1" />
                        {workspace.location}
                      </div>
                    </div>
                    <Link to={`/book/${workspace.id}`}>
                      <Button size="sm" className="bg-deskhive-navy">
                        Book
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList>
            <TabsTrigger value="all">All Hubs</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="mb-6 relative w-full">
          <div className="relative w-full">
            <Input
              placeholder="Search by name, type, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-deskhive-darkgray/70" />
            <Button 
              variant="ghost" 
              onClick={() => setIsFilterModalOpen(true)} 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            >
              <SlidersHorizontal className="h-4 w-4 text-deskhive-darkgray/70" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === "all" ? filteredWorkspaces : favoriteWorkspaces).map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              onBook={() => navigate(`/book/${workspace.id}`)}
              onToggleFavorite={handleToggleFavorite}
              onRate={handleRate}
            />
          ))}
        </div>
        
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilters={handleApplyFilters}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

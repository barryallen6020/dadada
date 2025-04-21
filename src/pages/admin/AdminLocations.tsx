
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Map, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin, 
  Building2,
  Check,
  X,
  Globe,
  PlusCircle
} from "lucide-react";

// Sample data for locations
const locationsData = [
  {
    id: "loc-001",
    name: "Lagos",
    code: "LAG",
    country: "Nigeria",
    address: "23 Akowonjo Road, Akowonjo, Lagos",
    status: "active",
    hubs: ["RALNO HUB AKOWONJO", "Workbay Ajah"],
    coordinates: "6.5244° N, 3.3792° E"
  },
  {
    id: "loc-002",
    name: "Costain",
    code: "CST",
    country: "Nigeria",
    address: "10 Costain Avenue, Surulere, Lagos",
    status: "active",
    hubs: ["Costain Hub 4th Floor (n)", "Costain Hub 5th Floor"],
    coordinates: "6.4698° N, 3.3805° E"
  },
  {
    id: "loc-003",
    name: "Abuja",
    code: "ABJ",
    country: "Nigeria",
    address: "5 Maitama District, Abuja",
    status: "inactive",
    hubs: [],
    coordinates: "9.0765° N, 7.3986° E"
  },
  {
    id: "loc-004",
    name: "Port Harcourt",
    code: "PHC",
    country: "Nigeria",
    address: "12 Aba Road, Port Harcourt",
    status: "planning",
    hubs: [],
    coordinates: "4.8156° N, 7.0498° E"
  }
];

const AdminLocations = () => {
  const { toast } = useToast();
  const [locations, setLocations] = useState(locationsData);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredLocations = locations.filter(location => 
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.country.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddLocation = () => {
    toast({
      title: "Add new location",
      description: "Opening location creation form...",
    });
    // In a real app, this would open a form to create a new location
  };
  
  const handleEditLocation = (id: string) => {
    toast({
      title: "Edit location",
      description: `Opening editor for location ${id}...`,
    });
    // In a real app, this would open a form to edit the location
  };
  
  const handleDeleteLocation = (id: string) => {
    // In a real app, you would show a confirmation dialog first
    setLocations(locations.filter(location => location.id !== id));
    
    toast({
      title: "Location deleted",
      description: "Location has been removed successfully.",
    });
  };
  
  const handleToggleStatus = (id: string) => {
    setLocations(locations.map(location => 
      location.id === id
        ? { 
            ...location, 
            status: location.status === 'active' ? 'inactive' : 'active'
          }
        : location
    ));
    
    toast({
      title: "Status updated",
      description: "Location status has been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto pb-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Location Management</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Manage geographical locations where hubs are located
          </p>
        </div>
        
        <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deskhive-darkgray/70 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/30 backdrop-blur-sm border-white/30 focus-visible:ring-deskhive-navy w-full"
              />
            </div>
            <Button onClick={handleAddLocation} className="bg-deskhive-navy hover:bg-deskhive-navy/90 w-full sm:w-auto">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <MapPin className="h-10 w-10 text-deskhive-orange p-2 bg-deskhive-orange/20 rounded-full mr-3" />
                <div>
                  <div className="text-3xl font-bold text-deskhive-navy">{locations.length}</div>
                  <p className="text-sm text-deskhive-darkgray/70">
                    {locations.filter(l => l.status === 'active').length} active locations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Hubs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Building2 className="h-10 w-10 text-green-500 p-2 bg-green-500/20 rounded-full mr-3" />
                <div>
                  <div className="text-3xl font-bold text-deskhive-navy">
                    {locations.reduce((sum, location) => sum + location.hubs.length, 0)}
                  </div>
                  <p className="text-sm text-deskhive-darkgray/70">
                    Across all locations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Globe className="h-10 w-10 text-blue-500 p-2 bg-blue-500/20 rounded-full mr-3" />
                <div>
                  <div className="text-3xl font-bold text-deskhive-navy">
                    {new Set(locations.map(l => l.country)).size}
                  </div>
                  <p className="text-sm text-deskhive-darkgray/70">
                    Global presence
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30 overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center">
              <Map className="h-5 w-5 mr-2" />
              All Locations
            </CardTitle>
            <CardDescription>
              Manage locations where DeskHive hubs are situated
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/10 hover:bg-white/20">
                    <TableHead>Location Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Hubs</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLocations.map((location) => (
                    <TableRow key={location.id} className="hover:bg-white/10">
                      <TableCell className="font-medium">{location.name}</TableCell>
                      <TableCell>{location.code}</TableCell>
                      <TableCell>{location.country}</TableCell>
                      <TableCell className="max-w-xs truncate">{location.address}</TableCell>
                      <TableCell>{location.hubs.length}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            location.status === 'active' ? 'default' : 
                            location.status === 'planning' ? 'outline' : 'secondary'
                          }
                          className="capitalize"
                        >
                          {location.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleEditLocation(location.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleToggleStatus(location.id)}
                          >
                            {location.status === 'active' ? 
                              <X className="h-4 w-4 text-red-500" /> : 
                              <Check className="h-4 w-4 text-green-500" />
                            }
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleDeleteLocation(location.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminLocations;

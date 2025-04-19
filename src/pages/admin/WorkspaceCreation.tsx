
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  ChevronLeft,
  Upload,
  Save,
  Users,
  MapPin,
  Tag,
  Info,
  FileText,
  Grid3X3,
  Maximize2,
  Minimize2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WorkspaceFloorMapEditor from "@/components/admin/WorkspaceFloorMapEditor";
import WorkspaceImageUpload from "@/components/admin/WorkspaceImageUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WorkspaceCreation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for workspace details
  const [workspaceDetails, setWorkspaceDetails] = useState({
    name: "",
    type: "",
    location: "",
    address: "",
    capacity: "",
    pricePerHour: "",
    description: "",
    features: "",
    availability: "High",
    enabled: true
  });
  
  // State for uploaded images
  const [images, setImages] = useState<string[]>([]);
  
  // State for floor map
  const [floorMapData, setFloorMapData] = useState<any>(null);
  
  // Handle form input changes
  const handleInputChange = (field: string, value: any) => {
    setWorkspaceDetails({
      ...workspaceDetails,
      [field]: value
    });
  };
  
  // Handle image upload
  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
  };
  
  // Handle floor map data change
  const handleFloorMapDataChange = (data: any) => {
    setFloorMapData(data);
    console.log("Floor map data updated:", data);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!workspaceDetails.name || !workspaceDetails.type || !workspaceDetails.location || 
        !workspaceDetails.address || !workspaceDetails.capacity || !workspaceDetails.pricePerHour) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would save to a database
    // For now, we'll just show a success toast and redirect
    const newWorkspace = {
      ...workspaceDetails,
      id: `ws-${Date.now()}`,
      images,
      floorMap: floorMapData,
      capacity: parseInt(workspaceDetails.capacity),
      pricePerHour: parseInt(workspaceDetails.pricePerHour),
      features: workspaceDetails.features.split(',').map(f => f.trim()),
    };
    
    console.log("Saving workspace:", newWorkspace);
    
    toast({
      title: "Workspace created",
      description: `${workspaceDetails.name} has been created successfully.`,
    });
    
    // Navigate back to hub management
    navigate("/admin/hubs");
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto pb-10">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin/hubs")}
            className="mr-4"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-1">Create New Workspace</h1>
            <p className="text-sm md:text-base text-deskhive-darkgray/80">
              Add details and design the floor plan for a new workspace
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="details">Workspace Details</TabsTrigger>
            <TabsTrigger value="floorMap">Floor Map</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Workspace Images */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Upload className="h-5 w-5 mr-2" />
                      Workspace Images
                    </CardTitle>
                    <CardDescription>
                      Upload images of the workspace (max 5 images)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WorkspaceImageUpload 
                      images={images}
                      onChange={handleImagesChange}
                      maxImages={5}
                    />
                  </CardContent>
                </Card>
                
                {/* Basic Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Basic Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Workspace Name *</Label>
                      <Input
                        id="name"
                        placeholder="Executive Meeting Room"
                        value={workspaceDetails.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Type *</Label>
                      <Select 
                        value={workspaceDetails.type} 
                        onValueChange={(value) => handleInputChange("type", value)}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select workspace type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hot Desk">Hot Desk</SelectItem>
                          <SelectItem value="Meeting Room">Meeting Room</SelectItem>
                          <SelectItem value="Private Office">Private Office</SelectItem>
                          <SelectItem value="Event Space">Event Space</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Select 
                        value={workspaceDetails.location} 
                        onValueChange={(value) => handleInputChange("location", value)}
                      >
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Lagos">Lagos</SelectItem>
                          <SelectItem value="Abuja">Abuja</SelectItem>
                          <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
                          <SelectItem value="Ibadan">Ibadan</SelectItem>
                          <SelectItem value="Kano">Kano</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Select 
                        value={workspaceDetails.availability} 
                        onValueChange={(value) => handleInputChange("availability", value)}
                      >
                        <SelectTrigger id="availability">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enabled"
                        checked={workspaceDetails.enabled}
                        onCheckedChange={(checked) => handleInputChange("enabled", checked)}
                      />
                      <Label htmlFor="enabled">Enable workspace for bookings</Label>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Additional Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Info className="h-5 w-5 mr-2" />
                      Additional Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        Physical Address *
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="123 Business Avenue, Victoria Island, Lagos"
                        value={workspaceDetails.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="capacity" className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Maximum Capacity *
                      </Label>
                      <Input
                        id="capacity"
                        type="number"
                        placeholder="10"
                        value={workspaceDetails.capacity}
                        onChange={(e) => handleInputChange("capacity", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pricePerHour" className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        Price Per Hour (₦) *
                      </Label>
                      <Input
                        id="pricePerHour"
                        type="number"
                        placeholder="5000"
                        value={workspaceDetails.pricePerHour}
                        onChange={(e) => handleInputChange("pricePerHour", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="features">Features (comma-separated)</Label>
                      <Input
                        id="features"
                        placeholder="Projector, Whiteboard, Video conferencing"
                        value={workspaceDetails.features}
                        onChange={(e) => handleInputChange("features", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="A brief description of the workspace"
                        value={workspaceDetails.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end mt-6 space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/admin/hubs")}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-deskhive-navy hover:bg-deskhive-navy/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Workspace
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="floorMap">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Grid3X3 className="h-5 w-5 mr-2" />
                  Floor Map Designer
                </CardTitle>
                <CardDescription>
                  Create a floor map with tables and seats. Drag and drop elements to position them.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <WorkspaceFloorMapEditor 
                    onChange={handleFloorMapDataChange}
                  />
                  
                  <div className="flex justify-end mt-6 space-x-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate("/admin/hubs")}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleSubmit} 
                      className="bg-deskhive-navy hover:bg-deskhive-navy/90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Workspace with Floor Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default WorkspaceCreation;

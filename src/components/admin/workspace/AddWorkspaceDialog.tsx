
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Workspace } from "@/types/workspace";
import { useOrganization } from "@/contexts/OrganizationContext";

interface AddWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkspaceAdd: (workspace: Workspace) => void;
}

const AddWorkspaceDialog: React.FC<AddWorkspaceDialogProps> = ({
  open,
  onOpenChange,
  onWorkspaceAdd
}) => {
  const { toast } = useToast();
  const { currentOrganization } = useOrganization();
  const [newWorkspace, setNewWorkspace] = React.useState({
    name: "",
    type: "",
    location: "",
    capacity: "",
    pricePerHour: "",
    availability: "High",
    features: "",
    description: ""
  });

  const handleAddWorkspace = () => {
    if (!newWorkspace.name || !newWorkspace.type || !newWorkspace.location || !newWorkspace.capacity || !newWorkspace.pricePerHour) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const workspace: Workspace = {
      id: `ws-${Date.now()}`,
      name: newWorkspace.name,
      type: newWorkspace.type,
      location: newWorkspace.location,
      capacity: parseInt(newWorkspace.capacity),
      pricePerHour: parseInt(newWorkspace.pricePerHour),
      availability: newWorkspace.availability,
      features: newWorkspace.features.split(',').map(f => f.trim()),
      description: newWorkspace.description,
      image: "",
      enabled: true,
      organizationId: currentOrganization.id
    };
    
    onWorkspaceAdd(workspace);
    onOpenChange(false);
    
    // Reset form
    setNewWorkspace({
      name: "",
      type: "",
      location: "",
      capacity: "",
      pricePerHour: "",
      availability: "High",
      features: "",
      description: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Workspace</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new workspace to the system.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace Name</Label>
              <Input
                id="name"
                placeholder="Executive Meeting Room"
                value={newWorkspace.name}
                onChange={(e) => setNewWorkspace({...newWorkspace, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={newWorkspace.type} 
                onValueChange={(value) => setNewWorkspace({...newWorkspace, type: value})}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hot Desk">Hot Desk</SelectItem>
                  <SelectItem value="Meeting Room">Meeting Room</SelectItem>
                  <SelectItem value="Private Office">Private Office</SelectItem>
                  <SelectItem value="Event Space">Event Space</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select 
                value={newWorkspace.location} 
                onValueChange={(value) => setNewWorkspace({...newWorkspace, location: value})}
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
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="4"
                value={newWorkspace.capacity}
                onChange={(e) => setNewWorkspace({...newWorkspace, capacity: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pricePerHour">Price Per Hour (₦)</Label>
              <Input
                id="pricePerHour"
                type="number"
                placeholder="5000"
                value={newWorkspace.pricePerHour}
                onChange={(e) => setNewWorkspace({...newWorkspace, pricePerHour: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Select 
                value={newWorkspace.availability} 
                onValueChange={(value) => setNewWorkspace({...newWorkspace, availability: value})}
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Input
              id="features"
              placeholder="Projector, Whiteboard, Video conferencing"
              value={newWorkspace.features}
              onChange={(e) => setNewWorkspace({...newWorkspace, features: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="A brief description of the workspace"
              value={newWorkspace.description}
              onChange={(e) => setNewWorkspace({...newWorkspace, description: e.target.value})}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddWorkspace}>
            Add Workspace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkspaceDialog;

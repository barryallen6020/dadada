
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, Pencil, Check, X, Users, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { workspaces } from "@/data/workspaces";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useOrganization } from "@/contexts/OrganizationContext";

const WorkspaceManagementTable = () => {
  const { toast } = useToast();
  const { currentOrganization } = useOrganization();
  
  // Filter workspaces to only show those from the current organization
  const [tableWorkspaces, setTableWorkspaces] = useState(
    workspaces.filter(workspace => workspace.organizationId === currentOrganization.id)
  );
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [workspaceToDelete, setWorkspaceToDelete] = useState<any>(null);
  const [newWorkspace, setNewWorkspace] = useState({
    name: "",
    type: "",
    location: "",
    capacity: "",
    pricePerHour: "",
    availability: "High",
    features: "",
    description: ""
  });

  const handleEdit = (workspace: any) => {
    setEditingId(workspace.id);
    setEditData({ ...workspace });
  };

  const handleSaveEdit = (id: string) => {
    setTableWorkspaces(tableWorkspaces.map(w => w.id === id ? editData : w));
    setEditingId(null);
    
    toast({
      title: "Workspace updated",
      description: `${editData.name} has been updated successfully.`,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleChange = (field: string, value: any) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleAddWorkspace = () => {
    if (!newWorkspace.name || !newWorkspace.type || !newWorkspace.location || !newWorkspace.capacity || !newWorkspace.pricePerHour) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const workspace = {
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
      organizationId: currentOrganization.id // Add the current organization ID here
    };
    
    setTableWorkspaces([...tableWorkspaces, workspace]);
    setShowAddDialog(false);
    
    toast({
      title: "Workspace added",
      description: `${workspace.name} has been added successfully.`,
    });
    
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

  const handleDeletePrompt = (workspace: any) => {
    setWorkspaceToDelete(workspace);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (!workspaceToDelete) return;
    
    setTableWorkspaces(tableWorkspaces.filter(w => w.id !== workspaceToDelete.id));
    setShowDeleteDialog(false);
    
    toast({
      title: "Workspace deleted",
      description: `${workspaceToDelete.name} has been deleted.`,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-deskhive-navy">Workspace Management</h2>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Workspace
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Price/Hour</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableWorkspaces.map((workspace) => (
              <TableRow key={workspace.id}>
                <TableCell>
                  {editingId === workspace.id ? (
                    <Input
                      value={editData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    workspace.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === workspace.id ? (
                    <Select
                      value={editData.type}
                      onValueChange={(value) => handleChange("type", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hot Desk">Hot Desk</SelectItem>
                        <SelectItem value="Meeting Room">Meeting Room</SelectItem>
                        <SelectItem value="Private Office">Private Office</SelectItem>
                        <SelectItem value="Event Space">Event Space</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant="outline">{workspace.type}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === workspace.id ? (
                    <Select
                      value={editData.location}
                      onValueChange={(value) => handleChange("location", value)}
                    >
                      <SelectTrigger className="w-full">
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
                  ) : (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                      {workspace.location}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === workspace.id ? (
                    <Input
                      type="number"
                      value={editData.capacity}
                      onChange={(e) => handleChange("capacity", parseInt(e.target.value))}
                      className="w-full"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-500" />
                      {workspace.capacity}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === workspace.id ? (
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500">₦</span>
                      </div>
                      <Input
                        type="number"
                        value={editData.pricePerHour}
                        onChange={(e) => handleChange("pricePerHour", parseInt(e.target.value))}
                        className="w-full pl-8"
                      />
                    </div>
                  ) : (
                    `₦${workspace.pricePerHour.toLocaleString()}`
                  )}
                </TableCell>
                <TableCell>
                  {editingId === workspace.id ? (
                    <Select
                      value={editData.availability}
                      onValueChange={(value) => handleChange("availability", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge
                      variant="outline"
                      className={
                        workspace.availability === "High"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                          : workspace.availability === "Medium"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                          : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                      }
                    >
                      {workspace.availability}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === workspace.id ? (
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleSaveEdit(workspace.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={handleCancelEdit}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEdit(workspace)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDeletePrompt(workspace)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
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
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddWorkspace}>
              Add Workspace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this workspace? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {workspaceToDelete && (
            <div className="py-2">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="font-medium">{workspaceToDelete.name}</p>
                <p className="text-sm text-gray-500">{workspaceToDelete.type} • {workspaceToDelete.location}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkspaceManagementTable;

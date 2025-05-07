import React, { useEffect, useState, useCallback } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Building2, Pencil, Power, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOrganization } from "@/contexts/OrganizationContext";
import { Workspace, UpdateWorkspaceDTO } from "@/types/workspace";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const WorkspaceTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Price/Booking</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map((index) => (
          <TableRow key={index}>
            <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[180px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-8 w-[80px] ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const WorkspaceManagementTable = () => {
  const { toast } = useToast();
  const { currentOrganization } = useOrganization();
  const navigate = useNavigate();
  
  const [workspaces, setWorkspaces] = useState<UpdateWorkspaceDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [showDisableDialog, setShowDisableDialog] = useState(false);
  const [workspaceToDisable, setWorkspaceToDisable] = useState<UpdateWorkspaceDTO | null>(null);
  
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingWorkspace, setEditingWorkspace] = useState<UpdateWorkspaceDTO | null>(null);

  const handleEditClick = (workspace: UpdateWorkspaceDTO) => {
    setEditingWorkspace({ ...workspace });
    setShowEditDialog(true);
  };

  const handleEditSave = async () => {
    if (!editingWorkspace) return;

    try {
      setLoading(true);
      await api.patch(`/workspace/${editingWorkspace.id}`, editingWorkspace);
      
      toast({
        title: "Workspace updated",
        description: `${editingWorkspace.name} has been updated successfully.`,
      });
      
      setShowEditDialog(false);
      // Fetch fresh data after update
      await fetchWorkspaces();
    } catch (error) {
      console.error("Error updating workspace:", error);
      toast({
        title: "Error",
        description: "Failed to update workspace. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisableClick = (workspace: UpdateWorkspaceDTO) => {
    setWorkspaceToDisable(workspace);
    setShowDisableDialog(true);
  };

  const handleConfirmDisable = async () => {
    if (!workspaceToDisable) return;
    
    try {
      setLoading(true);
      await api.patch(`/workspace/${workspaceToDisable.id}`, {
        ...workspaceToDisable,
        status: workspaceToDisable.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
      });
      
      toast({
        title: `Workspace ${workspaceToDisable.status === "ACTIVE" ? "disabled" : "enabled"}`,
        description: `${workspaceToDisable.name} has been ${workspaceToDisable.status === "ACTIVE" ? "disabled" : "enabled"}.`,
      });
      
      setShowDisableDialog(false);
      // Fetch fresh data after status update
      await fetchWorkspaces();
    } catch (error) {
      console.error("Error updating workspace status:", error);
      toast({
        title: "Error",
        description: "Failed to update workspace status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkspaces = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        // No token found, redirect to login
        navigate('/login');
        return;
      }

      const response = await api.get("/workspace/all-org-workpaces");
      const workspacesData = response.data.data || [];
      setWorkspaces(workspacesData);
      setError(null);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      
      // Handle 401 Unauthorized error
      if ((error as AxiosError)?.response?.status === 401) {
        // Clear invalid tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        toast({
          title: "Session expired",
          description: "Please log in again to continue.",
          variant: "destructive",
        });
        
        navigate('/login');
        return;
      }
      
      setError("Failed to load workspaces. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [navigate, toast]);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-deskhive-navy">Workspace Management</h2>
        </div>
        <div className="rounded-md border">
          <WorkspaceTableSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (workspaces.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="h-12 w-12 mx-auto text-deskhive-darkgray/40 mb-4" />
        <h3 className="text-xl font-medium text-deskhive-navy mb-2">No Workspaces Found</h3>
        <p className="text-deskhive-darkgray/80 mb-6">
          No workspaces have been created yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-deskhive-navy">Workspace Management</h2>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Price/Booking</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workspaces.map((workspace) => (
              <TableRow key={workspace.id}
              onClick={
                () => navigate(`/admin/workspace/${workspace.id}/seat-management`)
              }
              >
                <TableCell className="font-medium">{workspace.name}</TableCell>
                <TableCell>{workspace.type || "-"}</TableCell>
                <TableCell>{workspace.address || "-"}</TableCell>
                <TableCell>{workspace.seatingCapacity}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-deskhive-orange" />
                    ₦{workspace.pricePerBooking}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    workspace.status === "ACTIVE" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {workspace.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditClick(workspace)}
                    className="mr-2"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDisableClick(workspace)}
                    className={workspace.status === "ACTIVE" ? "text-red-500 hover:text-red-700" : "text-green-500 hover:text-green-700"}
                  >
                    <Power className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Workspace</DialogTitle>
            <DialogDescription>
              Make changes to the workspace details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editingWorkspace?.name || ""}
                onChange={(e) => setEditingWorkspace(prev => 
                  prev ? { ...prev, name: e.target.value } : null
                )}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={editingWorkspace?.type || ""}
                onChange={(e) => setEditingWorkspace(prev => 
                  prev ? { ...prev, type: e.target.value } : null
                )}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="address">Location</Label>
              <Input
                id="address"
                value={editingWorkspace?.address || ""}
                onChange={(e) => setEditingWorkspace(prev => 
                  prev ? { ...prev, address: e.target.value } : null
                )}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="price">Price per Booking (₦)</Label>
              <Input
                id="price"
                type="number"
                value={editingWorkspace?.pricePerBooking || 0}
                onChange={(e) => setEditingWorkspace(prev => 
                  prev ? { ...prev, pricePerBooking: Number(e.target.value) } : null
                )}
      />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="capacity">Seating Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={editingWorkspace?.seatingCapacity || 0}
                onChange={(e) => setEditingWorkspace(prev => 
                  prev ? { ...prev, seatingCapacity: Number(e.target.value) } : null
                )}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Disable Confirmation Dialog */}
      <AlertDialog open={showDisableDialog} onOpenChange={setShowDisableDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will {workspaceToDisable?.status === "ACTIVE" ? "disable" : "enable"} the workspace "{workspaceToDisable?.name}". 
              {workspaceToDisable?.status === "ACTIVE" 
                ? " Disabled workspaces will not be available for booking."
                : " Enabled workspaces will be available for booking."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDisable}
              className={workspaceToDisable?.status === "ACTIVE" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
            >
              {workspaceToDisable?.status === "ACTIVE" ? "Disable" : "Enable"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WorkspaceManagementTable;

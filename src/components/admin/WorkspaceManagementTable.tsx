
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOrganization } from "@/contexts/OrganizationContext";
import { Workspace } from "@/types/workspace";
import { workspaces } from "@/data/workspaces";
import AddWorkspaceDialog from "./workspace/AddWorkspaceDialog";
import DeleteWorkspaceDialog from "./workspace/DeleteWorkspaceDialog";
import WorkspaceTableRow from "./workspace/WorkspaceTableRow";

const WorkspaceManagementTable = () => {
  const { toast } = useToast();
  const { currentOrganization } = useOrganization();
  
  // Filter workspaces to only show those from the current organization
  const [tableWorkspaces, setTableWorkspaces] = useState<Workspace[]>(
    workspaces.filter(workspace => workspace.organizationId === currentOrganization.id)
  );
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Workspace | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [workspaceToDelete, setWorkspaceToDelete] = useState<Workspace | null>(null);

  const handleEdit = (workspace: Workspace) => {
    setEditingId(workspace.id);
    setEditData({ ...workspace });
  };

  const handleSaveEdit = (id: string) => {
    if (!editData) return;
    
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
    if (!editData) return;
    setEditData({ ...editData, [field]: value });
  };

  const handleAddWorkspace = (workspace: Workspace) => {
    setTableWorkspaces([...tableWorkspaces, workspace]);
    
    toast({
      title: "Workspace added",
      description: `${workspace.name} has been added successfully.`,
    });
  };

  const handleDeletePrompt = (workspace: Workspace) => {
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
              <WorkspaceTableRow
                key={workspace.id}
                workspace={workspace}
                isEditing={editingId === workspace.id}
                editData={editData}
                onEdit={handleEdit}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
                onDelete={handleDeletePrompt}
                onChange={handleChange}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      
      <AddWorkspaceDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onWorkspaceAdd={handleAddWorkspace}
      />
      
      <DeleteWorkspaceDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        workspace={workspaceToDelete}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default WorkspaceManagementTable;

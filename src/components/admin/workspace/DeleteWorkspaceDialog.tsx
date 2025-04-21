
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Workspace } from "@/types/workspace";

interface DeleteWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspace: Workspace | null;
  onConfirmDelete: () => void;
}

const DeleteWorkspaceDialog: React.FC<DeleteWorkspaceDialogProps> = ({
  open,
  onOpenChange,
  workspace,
  onConfirmDelete,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this workspace? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        {workspace && (
          <div className="py-2">
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium">{workspace.name}</p>
              <p className="text-sm text-gray-500">{workspace.type} • {workspace.location}</p>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirmDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWorkspaceDialog;

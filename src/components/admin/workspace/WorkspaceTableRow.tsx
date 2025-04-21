
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X, Pencil, Trash2, MapPin, Users } from "lucide-react";
import { Workspace } from "@/types/workspace";

interface WorkspaceTableRowProps {
  workspace: Workspace;
  isEditing: boolean;
  editData: Workspace | null;
  onEdit: (workspace: Workspace) => void;
  onSave: (id: string) => void;
  onCancel: () => void;
  onDelete: (workspace: Workspace) => void;
  onChange: (field: string, value: any) => void;
}

const WorkspaceTableRow: React.FC<WorkspaceTableRowProps> = ({
  workspace,
  isEditing,
  editData,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onChange,
}) => {
  return (
    <TableRow>
      <TableCell>
        {isEditing ? (
          <Input
            value={editData?.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            className="w-full"
          />
        ) : (
          workspace.name
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Select
            value={editData?.type || ""}
            onValueChange={(value) => onChange("type", value)}
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
        {isEditing ? (
          <Select
            value={editData?.location || ""}
            onValueChange={(value) => onChange("location", value)}
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
        {isEditing ? (
          <Input
            type="number"
            value={editData?.capacity || 0}
            onChange={(e) => onChange("capacity", parseInt(e.target.value))}
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
        {isEditing ? (
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">₦</span>
            </div>
            <Input
              type="number"
              value={editData?.pricePerHour || 0}
              onChange={(e) => onChange("pricePerHour", parseInt(e.target.value))}
              className="w-full pl-8"
            />
          </div>
        ) : (
          `₦${workspace.pricePerHour.toLocaleString()}`
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Select
            value={editData?.availability || ""}
            onValueChange={(value) => onChange("availability", value)}
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
        {isEditing ? (
          <div className="flex justify-end space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onSave(workspace.id)}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={onCancel}
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
              onClick={() => onEdit(workspace)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => onDelete(workspace)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default WorkspaceTableRow;

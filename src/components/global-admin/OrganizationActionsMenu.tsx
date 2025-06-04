
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Eye, UserCheck, Ban, MoreHorizontal } from 'lucide-react';

interface Organization {
  id: number;
  name: string;
  type: string;
  status: string;
  users: number;
  created: string;
  verified: boolean;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  subscription?: string;
  lastActivity?: string;
}

interface OrganizationActionsMenuProps {
  organization: Organization;
  onViewDetails: (org: Organization) => void;
  onImpersonate: (org: Organization) => void;
  onDeactivate: (org: Organization) => void;
}

const OrganizationActionsMenu: React.FC<OrganizationActionsMenuProps> = ({
  organization,
  onViewDetails,
  onImpersonate,
  onDeactivate
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetails(organization)}>
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onImpersonate(organization)}>
          <UserCheck className="h-4 w-4 mr-2" />
          Impersonate
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600" onClick={() => onDeactivate(organization)}>
          <Ban className="h-4 w-4 mr-2" />
          Deactivate
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrganizationActionsMenu;

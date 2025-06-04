
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import OrganizationActionsMenu from './OrganizationActionsMenu';

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

interface OrganizationTableProps {
  organizations: Organization[];
  onViewDetails: (org: Organization) => void;
  onImpersonate: (org: Organization) => void;
  onDeactivate: (org: Organization) => void;
}

const OrganizationTable: React.FC<OrganizationTableProps> = ({
  organizations,
  onViewDetails,
  onImpersonate,
  onDeactivate
}) => {
  const getStatusBadge = (status: string, verified: boolean) => {
    if (!verified) return <Badge variant="destructive">Unverified</Badge>;
    switch (status) {
      case 'Active': return <Badge variant="default">Active</Badge>;
      case 'Inactive': return <Badge variant="secondary">Inactive</Badge>;
      case 'Pending': return <Badge variant="outline">Pending</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organizations ({organizations.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{org.name}</div>
                  </div>
                </TableCell>
                <TableCell>{org.type}</TableCell>
                <TableCell>{getStatusBadge(org.status, org.verified)}</TableCell>
                <TableCell>{org.users}</TableCell>
                <TableCell>{org.created}</TableCell>
                <TableCell className="text-right">
                  <OrganizationActionsMenu
                    organization={org}
                    onViewDetails={onViewDetails}
                    onImpersonate={onImpersonate}
                    onDeactivate={onDeactivate}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrganizationTable;

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Building2, Users, CheckCircle, AlertCircle } from 'lucide-react';
import OrganizationActionsMenu from './OrganizationActionsMenu';
import { Organization } from '@/hooks/useOrganizationData';

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
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <Badge variant="default">Active</Badge>;
      case 'Inactive': return <Badge variant="secondary">Inactive</Badge>;
      case 'Pending': return <Badge variant="outline">Pending</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    return <Badge variant="outline">{type}</Badge>;
  };

  return (
    <>
      {/* Mobile Card View */}
      <div className="block md:hidden space-y-3 p-4">
        {organizations.map((org) => (
          <Card key={org.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium truncate">{org.name}</h3>
                    {org.verified && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {getTypeBadge(org.type)}
                    {getStatusBadge(org.status)}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {org.users}
                    </div>
                    <div>Created: {org.created}</div>
                  </div>
                </div>
              </div>
              <OrganizationActionsMenu
                organization={org}
                onViewDetails={onViewDetails}
                onImpersonate={onImpersonate}
                onDeactivate={onDeactivate}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
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
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Building2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{org.name}</span>
                        {org.verified ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getTypeBadge(org.type)}</TableCell>
                <TableCell>{getStatusBadge(org.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    {org.users}
                  </div>
                </TableCell>
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
      </div>
    </>
  );
};

export default OrganizationTable;

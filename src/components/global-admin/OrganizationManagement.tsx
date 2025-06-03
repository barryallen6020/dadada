
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, UserCheck, Ban, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const OrganizationManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newOrg, setNewOrg] = useState({ name: '', type: 'private', description: '' });

  // Mock data
  const organizations = [
    { id: 1, name: 'TechCorp Inc', type: 'Enterprise', status: 'Active', users: 150, created: '2024-01-15', verified: true },
    { id: 2, name: 'StartupHub', type: 'Startup', status: 'Active', users: 45, created: '2024-02-20', verified: true },
    { id: 3, name: 'DesignStudio', type: 'Creative', status: 'Pending', users: 12, created: '2024-03-10', verified: false },
    { id: 4, name: 'ConsultFirm', type: 'Professional', status: 'Inactive', users: 78, created: '2024-01-05', verified: true },
    { id: 5, name: 'EduTech', type: 'Education', status: 'Active', users: 200, created: '2024-02-01', verified: true },
  ];

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || org.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddOrganization = () => {
    console.log('Adding organization:', newOrg);
    setIsAddModalOpen(false);
    setNewOrg({ name: '', type: 'private', description: '' });
  };

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
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Organization Management</h2>
          <p className="text-gray-600">Manage all organizations on the platform</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Organization
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Organization</DialogTitle>
              <DialogDescription>Create a new organization on the platform</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="orgName">Organization Name</Label>
                <Input
                  id="orgName"
                  value={newOrg.name}
                  onChange={(e) => setNewOrg({...newOrg, name: e.target.value})}
                  placeholder="Enter organization name"
                />
              </div>
              <div>
                <Label htmlFor="orgType">Type</Label>
                <Select value={newOrg.type} onValueChange={(value) => setNewOrg({...newOrg, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="orgDesc">Description</Label>
                <Input
                  id="orgDesc"
                  value={newOrg.description}
                  onChange={(e) => setNewOrg({...newOrg, description: e.target.value})}
                  placeholder="Enter description"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddOrganization}>
                  Create Organization
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Organizations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Organizations ({filteredOrgs.length})</CardTitle>
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
              {filteredOrgs.map((org) => (
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCheck className="h-4 w-4 mr-2" />
                          Impersonate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Ban className="h-4 w-4 mr-2" />
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationManagement;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, UserX, UserCheck, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [orgFilter, setOrgFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Mock data
  const users = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@techcorp.com', 
      role: 'Admin', 
      organization: 'TechCorp Inc', 
      status: 'Active', 
      lastLogin: '2024-06-01', 
      bookings: 15,
      joinDate: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@startuphub.com', 
      role: 'Member', 
      organization: 'StartupHub', 
      status: 'Active', 
      lastLogin: '2024-05-30', 
      bookings: 8,
      joinDate: '2024-02-20'
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      email: 'mike@designstudio.com', 
      role: 'Hub Manager', 
      organization: 'DesignStudio', 
      status: 'Suspended', 
      lastLogin: '2024-05-28', 
      bookings: 3,
      joinDate: '2024-03-10'
    },
    { 
      id: 4, 
      name: 'Sarah Wilson', 
      email: 'sarah@consultfirm.com', 
      role: 'Member', 
      organization: 'ConsultFirm', 
      status: 'Inactive', 
      lastLogin: '2024-05-25', 
      bookings: 22,
      joinDate: '2024-01-05'
    },
    { 
      id: 5, 
      name: 'David Brown', 
      email: 'david@edutech.com', 
      role: 'Admin', 
      organization: 'EduTech', 
      status: 'Active', 
      lastLogin: '2024-06-02', 
      bookings: 31,
      joinDate: '2024-02-01'
    },
  ];

  const organizations = ['TechCorp Inc', 'StartupHub', 'DesignStudio', 'ConsultFirm', 'EduTech'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
    const matchesOrg = orgFilter === 'all' || user.organization === orgFilter;
    return matchesSearch && matchesRole && matchesOrg;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <Badge variant="default">Active</Badge>;
      case 'Inactive': return <Badge variant="secondary">Inactive</Badge>;
      case 'Suspended': return <Badge variant="destructive">Suspended</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin': return <Badge variant="default">Admin</Badge>;
      case 'Hub Manager': return <Badge variant="outline">Hub Manager</Badge>;
      case 'Member': return <Badge variant="secondary">Member</Badge>;
      default: return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-gray-600">Manage all users across all organizations</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="hub manager">Hub Manager</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
            <Select value={orgFilter} onValueChange={setOrgFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                {organizations.map(org => (
                  <SelectItem key={org} value={org}>{org}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{user.organization}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>{user.bookings}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {user.status === 'Suspended' ? (
                          <DropdownMenuItem>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Reactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-red-600">
                            <UserX className="h-4 w-4 mr-2" />
                            Suspend
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <div className="flex gap-2 mt-2">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Account Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Organization:</span> {selectedUser.organization}</div>
                    <div><span className="font-medium">Join Date:</span> {selectedUser.joinDate}</div>
                    <div><span className="font-medium">Last Login:</span> {selectedUser.lastLogin}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Activity</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Total Bookings:</span> {selectedUser.bookings}</div>
                    <div><span className="font-medium">Status:</span> {selectedUser.status}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, UserX, UserCheck, MoreHorizontal, Mail, Phone, MapPin, Calendar, Activity, CreditCard, Shield, Clock } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [orgFilter, setOrgFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Enhanced mock data with more detailed user information
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
      joinDate: '2024-01-15',
      phone: '+234 801 234 5678',
      address: 'Lagos, Nigeria',
      subscription: 'Premium',
      totalSpent: 125000,
      lastActivity: '2024-06-01 14:30',
      deviceInfo: 'Chrome on Windows',
      ipAddress: '192.168.1.1',
      emailVerified: true,
      phoneVerified: false,
      twoFactorEnabled: true,
      loginAttempts: 0,
      accountLocked: false,
      preferredWorkspace: 'Open Desk Area',
      bookingHistory: [
        { date: '2024-06-01', workspace: 'Conference Room A', duration: '2 hours' },
        { date: '2024-05-30', workspace: 'Hot Desk 15', duration: '8 hours' },
        { date: '2024-05-28', workspace: 'Private Office 3', duration: '4 hours' }
      ]
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
      joinDate: '2024-02-20',
      phone: '+234 802 345 6789',
      address: 'Abuja, Nigeria',
      subscription: 'Basic',
      totalSpent: 45000,
      lastActivity: '2024-05-30 09:15',
      deviceInfo: 'Safari on iPhone',
      ipAddress: '192.168.1.2',
      emailVerified: true,
      phoneVerified: true,
      twoFactorEnabled: false,
      loginAttempts: 0,
      accountLocked: false,
      preferredWorkspace: 'Quiet Zone',
      bookingHistory: [
        { date: '2024-05-30', workspace: 'Meeting Room B', duration: '1 hour' },
        { date: '2024-05-25', workspace: 'Hot Desk 8', duration: '6 hours' }
      ]
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
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold">User Management</h2>
        <p className="text-sm md:text-base text-gray-600">Manage all users across all organizations</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 md:pt-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
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
            <div className="flex gap-2 md:gap-4">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-48">
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
                <SelectTrigger className="w-full md:w-48">
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
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl">Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-3 p-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{user.name}</div>
                      <div className="text-sm text-gray-500 truncate">{user.email}</div>
                      <div className="flex items-center gap-2 mt-1">
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Organization:</span>
                    <div className="truncate">{user.organization}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Bookings:</span>
                    <div>{user.bookings}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
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
          </div>
        </CardContent>
      </Card>

      {/* Enhanced User Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <ScrollArea className="max-h-[80vh] pr-4">
              <div className="space-y-6">
                {/* User Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {selectedUser.email}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getRoleBadge(selectedUser.role)}
                      {getStatusBadge(selectedUser.status)}
                      {selectedUser.emailVerified && <Badge variant="outline" className="text-green-600">Email Verified</Badge>}
                      {selectedUser.twoFactorEnabled && <Badge variant="outline" className="text-blue-600">2FA Enabled</Badge>}
                    </div>
                  </div>
                </div>
                
                <Separator />

                {/* Contact Information */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <div className="flex items-center gap-2">
                        {selectedUser.phone}
                        {selectedUser.phoneVerified ? (
                          <Badge variant="outline" className="text-green-600 text-xs">Verified</Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-600 text-xs">Unverified</Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Address:</span>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        {selectedUser.address}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Account Information */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Account Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Organization:</span>
                      <div>{selectedUser.organization}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Join Date:</span>
                      <div>{selectedUser.joinDate}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Subscription:</span>
                      <div>{selectedUser.subscription}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Activity & Security */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Activity & Security
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Last Login:</span>
                      <div>{selectedUser.lastLogin}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Last Activity:</span>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-gray-500" />
                        {selectedUser.lastActivity}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Device:</span>
                      <div>{selectedUser.deviceInfo}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">IP Address:</span>
                      <div>{selectedUser.ipAddress}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Failed Login Attempts:</span>
                      <div className={selectedUser.loginAttempts > 0 ? 'text-red-600' : 'text-green-600'}>
                        {selectedUser.loginAttempts}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Account Status:</span>
                      <div className={selectedUser.accountLocked ? 'text-red-600' : 'text-green-600'}>
                        {selectedUser.accountLocked ? 'Locked' : 'Active'}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Usage Statistics */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Usage Statistics
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Total Bookings:</span>
                      <div className="text-lg font-semibold text-blue-600">{selectedUser.bookings}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Total Spent:</span>
                      <div className="text-lg font-semibold text-green-600">₦{selectedUser.totalSpent?.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Preferred Workspace:</span>
                      <div>{selectedUser.preferredWorkspace}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Recent Booking History */}
                <div>
                  <h4 className="font-medium mb-3">Recent Booking History</h4>
                  <div className="space-y-2">
                    {selectedUser.bookingHistory?.map((booking: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{booking.workspace}</div>
                          <div className="text-sm text-gray-500">{booking.date}</div>
                        </div>
                        <div className="text-sm text-gray-600">{booking.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;

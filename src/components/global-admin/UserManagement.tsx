
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserFilters from './UserFilters';
import UserTable from './UserTable';
import UserDetailsModal from './UserDetailsModal';

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
      <UserFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        orgFilter={orgFilter}
        setOrgFilter={setOrgFilter}
        organizations={organizations}
      />

      {/* Users Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl">Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <UserTable
            users={filteredUsers}
            onViewDetails={handleViewDetails}
          />
        </CardContent>
      </Card>

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagement;

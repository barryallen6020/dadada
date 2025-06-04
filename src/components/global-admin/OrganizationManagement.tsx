
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import OrganizationFilters from './OrganizationFilters';
import OrganizationTable from './OrganizationTable';
import AddOrganizationModal from './AddOrganizationModal';
import OrganizationDetailsModal from './OrganizationDetailsModal';

const OrganizationManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [newOrg, setNewOrg] = useState({ name: '', type: 'private', description: '' });

  // Mock data with extended information for details modal
  const organizations = [
    { 
      id: 1, 
      name: 'TechCorp Inc', 
      type: 'Enterprise', 
      status: 'Active', 
      users: 150, 
      created: '2024-01-15', 
      verified: true,
      email: 'admin@techcorp.com',
      phone: '+234 901 234 5678',
      address: '123 Victoria Island, Lagos, Nigeria',
      description: 'Leading technology corporation in Nigeria',
      subscription: 'Enterprise Plan',
      lastActivity: '2 hours ago'
    },
    { 
      id: 2, 
      name: 'StartupHub', 
      type: 'Startup', 
      status: 'Active', 
      users: 45, 
      created: '2024-02-20', 
      verified: true,
      email: 'contact@startuphub.ng',
      phone: '+234 802 345 6789',
      address: '45 Ikoyi Road, Lagos, Nigeria',
      description: 'Innovation hub for Nigerian startups',
      subscription: 'Pro Plan',
      lastActivity: '1 day ago'
    },
    { 
      id: 3, 
      name: 'DesignStudio', 
      type: 'Creative', 
      status: 'Pending', 
      users: 12, 
      created: '2024-03-10', 
      verified: false,
      email: 'hello@designstudio.ng',
      phone: '+234 703 456 7890',
      address: '78 Allen Avenue, Ikeja, Lagos',
      description: 'Creative design agency',
      subscription: 'Basic Plan',
      lastActivity: '3 days ago'
    },
    { 
      id: 4, 
      name: 'ConsultFirm', 
      type: 'Professional', 
      status: 'Inactive', 
      users: 78, 
      created: '2024-01-05', 
      verified: true,
      email: 'info@consultfirm.ng',
      phone: '+234 804 567 8901',
      address: '12 Broad Street, Lagos Island',
      description: 'Professional consulting services',
      subscription: 'Pro Plan',
      lastActivity: '2 weeks ago'
    },
    { 
      id: 5, 
      name: 'EduTech', 
      type: 'Education', 
      status: 'Active', 
      users: 200, 
      created: '2024-02-01', 
      verified: true,
      email: 'admin@edutech.ng',
      phone: '+234 905 678 9012',
      address: '90 University Road, Ibadan',
      description: 'Educational technology platform',
      subscription: 'Enterprise Plan',
      lastActivity: '30 minutes ago'
    },
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

  const handleViewDetails = (org) => {
    setSelectedOrganization(org);
    setIsDetailsModalOpen(true);
  };

  const handleImpersonate = (org) => {
    console.log('Impersonating organization:', org.name);
    // Implement impersonation logic here
  };

  const handleDeactivate = (org) => {
    console.log('Deactivating organization:', org.name);
    // Implement deactivation logic here
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
        </Dialog>
      </div>

      {/* Filters */}
      <OrganizationFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Organizations Table */}
      <OrganizationTable
        organizations={filteredOrgs}
        onViewDetails={handleViewDetails}
        onImpersonate={handleImpersonate}
        onDeactivate={handleDeactivate}
      />

      {/* Add Organization Modal */}
      <AddOrganizationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        newOrg={newOrg}
        setNewOrg={setNewOrg}
        onAddOrganization={handleAddOrganization}
      />

      {/* Organization Details Modal */}
      <OrganizationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        organization={selectedOrganization}
      />
    </div>
  );
};

export default OrganizationManagement;

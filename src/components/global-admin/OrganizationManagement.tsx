
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Download, FileText } from 'lucide-react';
import OrganizationAdvancedFilters from './OrganizationAdvancedFilters';
import OrganizationTable from './OrganizationTable';
import AddOrganizationModal from './AddOrganizationModal';
import OrganizationDetailsModal from './OrganizationDetailsModal';

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

interface NewOrganization {
  name: string;
  type: string;
  description: string;
}

const OrganizationManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [newOrg, setNewOrg] = useState<NewOrganization>({
    name: '',
    type: '',
    description: ''
  });

  // Mock data
  const organizations: Organization[] = [
    { 
      id: 1, 
      name: 'TechCorp Inc', 
      type: 'Private', 
      status: 'Active', 
      users: 245, 
      created: '2024-01-15', 
      verified: true,
      email: 'admin@techcorp.com',
      phone: '+234 801 234 5678',
      address: 'Victoria Island, Lagos',
      description: 'Leading technology company specializing in software development',
      subscription: 'Enterprise',
      lastActivity: '2024-06-01'
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

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || org.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFiltersChange = (filters: any) => {
    // Handle advanced filters
    console.log('Filters changed:', filters);
    setSearchTerm(filters.search);
    setStatusFilter(filters.status);
  };

  const handleExportData = (format: string) => {
    console.log(`Exporting organizations as ${format}`);
    // Implementation would generate and download the file
  };

  const handleViewDetails = (organization: Organization) => {
    setSelectedOrganization(organization);
    setIsDetailModalOpen(true);
  };

  const handleImpersonate = (organization: Organization) => {
    console.log('Impersonating organization:', organization.name);
    // Implementation would handle impersonation
  };

  const handleDeactivate = (organization: Organization) => {
    console.log('Deactivating organization:', organization.name);
    // Implementation would handle deactivation
  };

  const handleAddOrganization = () => {
    console.log('Adding organization:', newOrg);
    setIsAddModalOpen(false);
    setNewOrg({ name: '', type: '', description: '' });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Organization Management</h2>
          <p className="text-sm md:text-base text-gray-600">Manage all organizations on the platform</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExportData('csv')} size="sm">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">CSV</span>
          </Button>
          <Button variant="outline" onClick={() => handleExportData('pdf')} size="sm">
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
          <Button 
            onClick={() => setIsAddModalOpen(true)} 
            className="w-full md:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Organization
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <OrganizationAdvancedFilters
        onFiltersChange={handleFiltersChange}
        organizationCount={filteredOrganizations.length}
      />

      {/* Organizations Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl">Organizations ({filteredOrganizations.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <OrganizationTable
            organizations={filteredOrganizations}
            onViewDetails={handleViewDetails}
            onImpersonate={handleImpersonate}
            onDeactivate={handleDeactivate}
          />
        </CardContent>
      </Card>

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
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        organization={selectedOrganization}
      />
    </div>
  );
};

export default OrganizationManagement;

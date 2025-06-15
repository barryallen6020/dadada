
import { useState } from 'react';
import { Organization } from './useOrganizationData';

export interface NewOrganization {
  name: string;
  type: string;
  description: string;
}

export const useOrganizationActions = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [newOrg, setNewOrg] = useState<NewOrganization>({
    name: '',
    type: '',
    description: ''
  });

  const handleExportData = (format: string) => {
    console.log(`Exporting organizations as ${format}`);
    // Implementation would generate and download the file
  };

  const handleViewDetails = (organization: Organization) => {
    console.log('Viewing details for organization:', organization.name);
    setSelectedOrganization(organization);
    setIsDetailModalOpen(true);
  };

  const handleImpersonate = (organization: Organization) => {
    console.log('Impersonating organization:', organization.name);
    // Implementation would handle impersonation logic
    alert(`Impersonating ${organization.name} - This would redirect to their admin view`);
  };

  const handleDeactivate = (organization: Organization) => {
    console.log('Deactivating organization:', organization.name);
    // Implementation would handle deactivation logic
    const confirmDeactivate = window.confirm(`Are you sure you want to deactivate ${organization.name}?`);
    if (confirmDeactivate) {
      alert(`${organization.name} has been deactivated`);
    }
  };

  const handleAddOrganization = () => {
    console.log('Adding new organization:', newOrg);
    // Implementation would handle adding the organization
    alert(`Organization "${newOrg.name}" has been added successfully`);
    setIsAddModalOpen(false);
    setNewOrg({ name: '', type: '', description: '' });
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const closeDetailModal = () => setIsDetailModalOpen(false);

  return {
    isAddModalOpen,
    isDetailModalOpen,
    selectedOrganization,
    newOrg,
    setNewOrg,
    handleExportData,
    handleViewDetails,
    handleImpersonate,
    handleDeactivate,
    handleAddOrganization,
    openAddModal,
    closeAddModal,
    closeDetailModal
  };
};

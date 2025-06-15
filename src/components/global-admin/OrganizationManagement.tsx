
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OrganizationManagementHeader from './OrganizationManagementHeader';
import OrganizationAdvancedFilters from './OrganizationAdvancedFilters';
import OrganizationTable from './OrganizationTable';
import AddOrganizationModal from './AddOrganizationModal';
import OrganizationDetailsModal from './OrganizationDetailsModal';
import { useOrganizationData } from '@/hooks/useOrganizationData';
import { useOrganizationActions } from '@/hooks/useOrganizationActions';

const OrganizationManagement = () => {
  const { filteredOrganizations, handleFiltersChange } = useOrganizationData();
  const {
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
  } = useOrganizationActions();

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <OrganizationManagementHeader
        onExportData={handleExportData}
        onAddOrganization={openAddModal}
      />

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
        onClose={closeAddModal}
        newOrg={newOrg}
        setNewOrg={setNewOrg}
        onAddOrganization={handleAddOrganization}
      />

      {/* Organization Details Modal */}
      <OrganizationDetailsModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        organization={selectedOrganization}
      />
    </div>
  );
};

export default OrganizationManagement;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, FileText } from 'lucide-react';

interface OrganizationManagementHeaderProps {
  onExportData: (format: string) => void;
  onAddOrganization: () => void;
}

const OrganizationManagementHeader: React.FC<OrganizationManagementHeaderProps> = ({
  onExportData,
  onAddOrganization
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl md:text-2xl font-bold">Organization Management</h2>
        <p className="text-sm md:text-base text-gray-600">Manage all organizations on the platform</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => onExportData('csv')} size="sm">
          <Download className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Export CSV</span>
          <span className="sm:hidden">CSV</span>
        </Button>
        <Button variant="outline" onClick={() => onExportData('pdf')} size="sm">
          <FileText className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Export PDF</span>
          <span className="sm:hidden">PDF</span>
        </Button>
        <Button 
          onClick={onAddOrganization} 
          className="w-full md:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Organization
        </Button>
      </div>
    </div>
  );
};

export default OrganizationManagementHeader;

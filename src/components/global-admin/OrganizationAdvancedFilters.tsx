
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import OrganizationSearchAndQuickFilters from './filters/OrganizationSearchAndQuickFilters';
import OrganizationActiveFilters from './filters/OrganizationActiveFilters';
import { useOrganizationFilters } from '@/hooks/useOrganizationFilters';
import { FilterCriteria } from './types/filterTypes';

interface OrganizationAdvancedFiltersProps {
  onFiltersChange: (filters: FilterCriteria) => void;
  organizationCount: number;
}

const OrganizationAdvancedFilters: React.FC<OrganizationAdvancedFiltersProps> = ({
  onFiltersChange,
  organizationCount
}) => {
  const {
    filters,
    activeFilters,
    handleFilterChange,
    clearFilter,
    clearAllFilters
  } = useOrganizationFilters(onFiltersChange);

  return (
    <div className="space-y-4">
      {/* Search and Quick Filters */}
      <Card>
        <CardContent className="pt-4">
          <OrganizationSearchAndQuickFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </CardContent>
      </Card>

      {/* Active Filters and Results */}
      <OrganizationActiveFilters
        filters={filters}
        activeFilters={activeFilters}
        organizationCount={organizationCount}
        onClearFilter={clearFilter}
        onClearAllFilters={clearAllFilters}
      />
    </div>
  );
};

export default OrganizationAdvancedFilters;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { FilterCriteria, FILTER_LABELS } from '../types/filterTypes';

interface OrganizationActiveFiltersProps {
  filters: FilterCriteria;
  activeFilters: string[];
  organizationCount: number;
  onClearFilter: (key: keyof FilterCriteria) => void;
  onClearAllFilters: () => void;
}

const OrganizationActiveFilters: React.FC<OrganizationActiveFiltersProps> = ({
  filters,
  activeFilters,
  organizationCount,
  onClearFilter,
  onClearAllFilters
}) => {
  const getFilterLabel = (key: string, value: string) => {
    return FILTER_LABELS[key as keyof typeof FILTER_LABELS]?.[value] || value;
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-600">
          {organizationCount} organizations found
        </span>
        
        {activeFilters.length > 0 && (
          <>
            <span className="text-sm text-gray-400">•</span>
            <div className="flex flex-wrap items-center gap-2">
              {activeFilters.map((filterKey) => {
                const filterValue = filters[filterKey as keyof FilterCriteria];
                return (
                  <Badge key={filterKey} variant="secondary" className="text-xs">
                    {filterKey === 'search' ? `"${filterValue}"` : getFilterLabel(filterKey, filterValue)}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer hover:text-red-500" 
                      onClick={() => onClearFilter(filterKey as keyof FilterCriteria)}
                    />
                  </Badge>
                );
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAllFilters}
                className="text-xs h-6 px-2"
              >
                Clear all
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrganizationActiveFilters;

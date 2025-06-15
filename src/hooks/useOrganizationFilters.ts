
import { useState, useMemo } from 'react';
import { FilterCriteria, DEFAULT_FILTERS } from '@/components/global-admin/types/filterTypes';

export const useOrganizationFilters = (onFiltersChange: (filters: FilterCriteria) => void) => {
  const [filters, setFilters] = useState<FilterCriteria>(DEFAULT_FILTERS);

  const activeFilters = useMemo(() => {
    return Object.entries(filters)
      .filter(([_, value]) => value !== '' && value !== 'all')
      .map(([key]) => key);
  }, [filters]);

  const handleFilterChange = (key: keyof FilterCriteria, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilter = (key: keyof FilterCriteria) => {
    const defaultValue = key === 'search' ? '' : 'all';
    handleFilterChange(key, defaultValue);
  };

  const clearAllFilters = () => {
    setFilters(DEFAULT_FILTERS);
    onFiltersChange(DEFAULT_FILTERS);
  };

  return {
    filters,
    activeFilters,
    handleFilterChange,
    clearFilter,
    clearAllFilters
  };
};

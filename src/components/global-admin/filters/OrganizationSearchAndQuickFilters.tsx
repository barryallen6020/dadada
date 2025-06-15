
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Filter } from 'lucide-react';
import { FilterCriteria } from '../types/filterTypes';
import OrganizationAdvancedFiltersContent from './OrganizationAdvancedFiltersContent';

interface OrganizationSearchAndQuickFiltersProps {
  filters: FilterCriteria;
  onFilterChange: (key: keyof FilterCriteria, value: string) => void;
}

const OrganizationSearchAndQuickFilters: React.FC<OrganizationSearchAndQuickFiltersProps> = ({
  filters,
  onFilterChange
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search organizations..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex gap-2">
        <Select value={filters.status} onValueChange={(value) => onFilterChange('status', value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.type} onValueChange={(value) => onFilterChange('type', value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="private">Private</SelectItem>
            <SelectItem value="startup">Startup</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>

        {/* Advanced Filters Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <OrganizationAdvancedFiltersContent
              filters={filters}
              onFilterChange={onFilterChange}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default OrganizationSearchAndQuickFilters;

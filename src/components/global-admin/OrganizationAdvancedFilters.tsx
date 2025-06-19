
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Calendar, Building2, Users, MapPin } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface FilterCriteria {
  search: string;
  status: string;
  type: string;
  location: string;
  userRange: string;
  dateRange: string;
  subscription: string;
  verified: string;
}

interface OrganizationAdvancedFiltersProps {
  onFiltersChange: (filters: FilterCriteria) => void;
  organizationCount: number;
}

const OrganizationAdvancedFilters: React.FC<OrganizationAdvancedFiltersProps> = ({
  onFiltersChange,
  organizationCount
}) => {
  const [filters, setFilters] = useState<FilterCriteria>({
    search: '',
    status: 'all',
    type: 'all',
    location: 'all',
    userRange: 'all',
    dateRange: 'all',
    subscription: 'all',
    verified: 'all'
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: keyof FilterCriteria, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);

    // Update active filters
    const newActiveFilters = Object.entries(newFilters)
      .filter(([filterKey, filterValue]) => filterValue !== '' && filterValue !== 'all')
      .map(([filterKey]) => filterKey);
    setActiveFilters(newActiveFilters);
  };

  const clearFilter = (key: keyof FilterCriteria) => {
    const defaultValue = key === 'search' ? '' : 'all';
    handleFilterChange(key, defaultValue);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterCriteria = {
      search: '',
      status: 'all',
      type: 'all',
      location: 'all',
      userRange: 'all',
      dateRange: 'all',
      subscription: 'all',
      verified: 'all'
    };
    setFilters(clearedFilters);
    setActiveFilters([]);
    onFiltersChange(clearedFilters);
  };

  const getFilterLabel = (key: string, value: string) => {
    const labels: Record<string, Record<string, string>> = {
      status: { active: 'Active', inactive: 'Inactive', pending: 'Pending' },
      type: { private: 'Private', startup: 'Startup', creative: 'Creative', professional: 'Professional', education: 'Education' },
      location: { lagos: 'Lagos', abuja: 'Abuja', 'port-harcourt': 'Port Harcourt' },
      userRange: { '1-10': '1-10 users', '11-50': '11-50 users', '51-100': '51-100 users', '100+': '100+ users' },
      dateRange: { '7days': 'Last 7 days', '30days': 'Last 30 days', '90days': 'Last 90 days' },
      subscription: { basic: 'Basic', pro: 'Pro', enterprise: 'Enterprise' },
      verified: { true: 'Verified', false: 'Unverified' }
    };
    return labels[key]?.[value] || value;
  };

  return (
    <div className="space-y-4">
      {/* Search and Quick Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search organizations..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2">
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
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

              <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
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
                  <div className="space-y-4">
                    <h4 className="font-medium">Advanced Filters</h4>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="lagos">Lagos</SelectItem>
                          <SelectItem value="abuja">Abuja</SelectItem>
                          <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="userRange">User Count</Label>
                      <Select value={filters.userRange} onValueChange={(value) => handleFilterChange('userRange', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Sizes</SelectItem>
                          <SelectItem value="1-10">1-10 users</SelectItem>
                          <SelectItem value="11-50">11-50 users</SelectItem>
                          <SelectItem value="51-100">51-100 users</SelectItem>
                          <SelectItem value="100+">100+ users</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="subscription">Subscription</Label>
                      <Select value={filters.subscription} onValueChange={(value) => handleFilterChange('subscription', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subscription" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Plans</SelectItem>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="pro">Pro</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="verified">Verification Status</Label>
                      <Select value={filters.verified} onValueChange={(value) => handleFilterChange('verified', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select verification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="true">Verified</SelectItem>
                          <SelectItem value="false">Unverified</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="dateRange">Registration Date</Label>
                      <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="7days">Last 7 days</SelectItem>
                          <SelectItem value="30days">Last 30 days</SelectItem>
                          <SelectItem value="90days">Last 90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters and Results */}
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
                        onClick={() => clearFilter(filterKey as keyof FilterCriteria)}
                      />
                    </Badge>
                  );
                })}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs h-6 px-2"
                >
                  Clear all
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationAdvancedFilters;

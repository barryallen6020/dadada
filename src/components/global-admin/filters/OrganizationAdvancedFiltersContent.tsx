
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterCriteria } from '../types/filterTypes';

interface OrganizationAdvancedFiltersContentProps {
  filters: FilterCriteria;
  onFilterChange: (key: keyof FilterCriteria, value: string) => void;
}

const OrganizationAdvancedFiltersContent: React.FC<OrganizationAdvancedFiltersContentProps> = ({
  filters,
  onFilterChange
}) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Advanced Filters</h4>
      
      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Select value={filters.location} onValueChange={(value) => onFilterChange('location', value)}>
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
        <Select value={filters.userRange} onValueChange={(value) => onFilterChange('userRange', value)}>
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
        <Select value={filters.subscription} onValueChange={(value) => onFilterChange('subscription', value)}>
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
        <Select value={filters.verified} onValueChange={(value) => onFilterChange('verified', value)}>
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
        <Select value={filters.dateRange} onValueChange={(value) => onFilterChange('dateRange', value)}>
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
  );
};

export default OrganizationAdvancedFiltersContent;

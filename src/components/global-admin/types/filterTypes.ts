
export interface FilterCriteria {
  search: string;
  status: string;
  type: string;
  location: string;
  userRange: string;
  dateRange: string;
  subscription: string;
  verified: string;
}

export interface FilterLabels {
  status: Record<string, string>;
  type: Record<string, string>;
  location: Record<string, string>;
  userRange: Record<string, string>;
  dateRange: Record<string, string>;
  subscription: Record<string, string>;
  verified: Record<string, string>;
}

export const DEFAULT_FILTERS: FilterCriteria = {
  search: '',
  status: 'all',
  type: 'all',
  location: 'all',
  userRange: 'all',
  dateRange: 'all',
  subscription: 'all',
  verified: 'all'
};

export const FILTER_LABELS: FilterLabels = {
  status: { active: 'Active', inactive: 'Inactive', pending: 'Pending' },
  type: { 
    private: 'Private', 
    startup: 'Startup', 
    creative: 'Creative', 
    professional: 'Professional', 
    education: 'Education' 
  },
  location: { lagos: 'Lagos', abuja: 'Abuja', 'port-harcourt': 'Port Harcourt' },
  userRange: { 
    '1-10': '1-10 users', 
    '11-50': '11-50 users', 
    '51-100': '51-100 users', 
    '100+': '100+ users' 
  },
  dateRange: { 
    '7days': 'Last 7 days', 
    '30days': 'Last 30 days', 
    '90days': 'Last 90 days' 
  },
  subscription: { basic: 'Basic', pro: 'Pro', enterprise: 'Enterprise' },
  verified: { true: 'Verified', false: 'Unverified' }
};

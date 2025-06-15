
import { useState, useMemo } from 'react';

export interface Organization {
  id: number;
  name: string;
  type: string;
  status: string;
  users: number;
  created: string;
  verified: boolean;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  subscription?: string;
  lastActivity?: string;
}

export const useOrganizationData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const organizations: Organization[] = [
    { 
      id: 1, 
      name: 'TechCorp Inc', 
      type: 'Private', 
      status: 'Active', 
      users: 245, 
      created: '2024-01-15', 
      verified: true,
      email: 'admin@techcorp.com',
      phone: '+234 801 234 5678',
      address: 'Victoria Island, Lagos',
      description: 'Leading technology company specializing in software development',
      subscription: 'Enterprise',
      lastActivity: '2024-06-01'
    },
    { 
      id: 2, 
      name: 'StartupHub', 
      type: 'Startup', 
      status: 'Active', 
      users: 45, 
      created: '2024-02-20', 
      verified: true,
      email: 'contact@startuphub.ng',
      phone: '+234 802 345 6789',
      address: '45 Ikoyi Road, Lagos, Nigeria',
      description: 'Innovation hub for Nigerian startups',
      subscription: 'Pro Plan',
      lastActivity: '1 day ago'
    },
    { 
      id: 3, 
      name: 'DesignStudio', 
      type: 'Creative', 
      status: 'Pending', 
      users: 12, 
      created: '2024-03-10', 
      verified: false,
      email: 'hello@designstudio.ng',
      phone: '+234 703 456 7890',
      address: '78 Allen Avenue, Ikeja, Lagos',
      description: 'Creative design agency',
      subscription: 'Basic Plan',
      lastActivity: '3 days ago'
    },
    { 
      id: 4, 
      name: 'ConsultFirm', 
      type: 'Professional', 
      status: 'Inactive', 
      users: 78, 
      created: '2024-01-05', 
      verified: true,
      email: 'info@consultfirm.ng',
      phone: '+234 804 567 8901',
      address: '12 Broad Street, Lagos Island',
      description: 'Professional consulting services',
      subscription: 'Pro Plan',
      lastActivity: '2 weeks ago'
    },
    { 
      id: 5, 
      name: 'EduTech', 
      type: 'Education', 
      status: 'Active', 
      users: 200, 
      created: '2024-02-01', 
      verified: true,
      email: 'admin@edutech.ng',
      phone: '+234 905 678 9012',
      address: '90 University Road, Ibadan',
      description: 'Educational technology platform',
      subscription: 'Enterprise Plan',
      lastActivity: '30 minutes ago'
    },
  ];

  const filteredOrganizations = useMemo(() => {
    return organizations.filter(org => {
      const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || org.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, organizations]);

  const handleFiltersChange = (filters: any) => {
    console.log('Filters changed:', filters);
    setSearchTerm(filters.search);
    setStatusFilter(filters.status);
  };

  return {
    organizations,
    filteredOrganizations,
    searchTerm,
    statusFilter,
    handleFiltersChange
  };
};

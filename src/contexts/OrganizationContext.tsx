
import React, { createContext, useContext, useState, useEffect } from 'react';
import organizationService from '@/services/organizationService';

interface Organization {
  id: string;
  name: string;
  description?: string;
  type: 'public' | 'private';
  currency?: string;
  logo?: string;
}

interface OrganizationContextType {
  currentOrganization: Organization;
  setCurrentOrganization: (org: Organization) => void;
  organizations: Organization[];
  setOrganizations: (orgs: Organization[]) => void;
}

const OrganizationContext = createContext<OrganizationContextType>({
  currentOrganization: {
    id: '',
    name: '',
    type: 'public'
  },
  setCurrentOrganization: () => {},
  organizations: [],
  setOrganizations: () => {}
});

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentOrganization, setCurrentOrganization] = useState<Organization>({
    id: '',
    name: '',
    type: 'public'
  });
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchMyOrganization = async () => {
      try {
        const response = await organizationService.getMyOrganization();
        if (response.data) {
          setCurrentOrganization(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch organization:', error);
      }
    };

    fetchMyOrganization();
  }, []);

  return (
    <OrganizationContext.Provider value={{
      currentOrganization,
      setCurrentOrganization,
      organizations,
      setOrganizations
    }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => useContext(OrganizationContext);

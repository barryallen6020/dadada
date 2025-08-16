
import React, { createContext, useContext, useState, useEffect } from 'react';
import { organizations } from '@/data/workspaces';

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
    id: 'org-001', // Default to ALX organization
    name: 'ALX',
    type: 'public'
  });
  const [organizationsList, setOrganizationsList] = useState<Organization[]>(organizations);

  useEffect(() => {
    // Set default organization to ALX (first organization in demo data)
    if (organizations.length > 0) {
      setCurrentOrganization({
        id: organizations[0].id,
        name: organizations[0].name,
        type: organizations[0].type,
        currency: organizations[0].currency,
        description: organizations[0].description,
        logo: organizations[0].logo
      });
      setOrganizationsList(organizations);
    }
  }, []);

  return (
    <OrganizationContext.Provider value={{
      currentOrganization,
      setCurrentOrganization,
      organizations: organizationsList,
      setOrganizations: setOrganizationsList
    }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => useContext(OrganizationContext);

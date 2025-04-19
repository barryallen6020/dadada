
import React, { createContext, useContext, useState, useEffect } from 'react';
import { organizations } from '@/data/workspaces';
import { Organization } from '@/types/workspace';

interface OrganizationContextType {
  currentOrganization: Organization;
  setCurrentOrganization: (org: Organization) => void;
  organizations: Organization[];
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider = ({ children }: { children: React.ReactNode }) => {
  // Load the saved organization from localStorage, or use the first one as default
  const [currentOrganization, setCurrentOrganization] = useState<Organization>(() => {
    const savedOrgId = localStorage.getItem('currentOrganizationId');
    if (savedOrgId) {
      const savedOrg = organizations.find(org => org.id === savedOrgId);
      return savedOrg || organizations[0];
    }
    return organizations[0];
  });

  // Save to localStorage when organization changes
  useEffect(() => {
    localStorage.setItem('currentOrganizationId', currentOrganization.id);
  }, [currentOrganization]);

  return (
    <OrganizationContext.Provider value={{ 
      currentOrganization, 
      setCurrentOrganization,
      organizations 
    }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};

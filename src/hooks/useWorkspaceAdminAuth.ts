
import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'ORG_OWNER' | 'WORKSPACE_MANAGER' | 'STAFF';
  organizationId: string;
}

interface UseWorkspaceAdminAuthReturn {
  user: User | null;
  permissions: string[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useWorkspaceAdminAuth = (): UseWorkspaceAdminAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock authentication - replace with actual API call
    const mockUser: User = {
      id: '1',
      name: 'John Admin',
      email: 'admin@workspace.com',
      avatar: '/placeholder-avatar.jpg',
      role: 'ORG_OWNER',
      organizationId: 'org-1'
    };
    
    setUser(mockUser);
    setIsLoading(false);
  }, []);

  const getPermissions = (role: string): string[] => {
    const rolePermissions: Record<string, string[]> = {
      'ORG_OWNER': [
        'CREATE_WORKSPACE',
        'MANAGE_USERS',
        'VIEW_BILLING',
        'MANAGE_SETTINGS',
        'VIEW_ANALYTICS',
        'MANAGE_INTEGRATIONS'
      ],
      'WORKSPACE_MANAGER': [
        'MANAGE_BOOKINGS',
        'MANAGE_ROOMS',
        'VIEW_ANALYTICS',
        'MANAGE_PRICING',
        'EDIT_FLOOR_PLAN'
      ],
      'STAFF': [
        'VIEW_BOOKINGS',
        'CHECK_IN_USERS'
      ]
    };
    
    return rolePermissions[role] || [];
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    // Mock login logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const logout = (): void => {
    setUser(null);
  };

  return {
    user,
    permissions: user ? getPermissions(user.role) : [],
    isLoading,
    login,
    logout
  };
};

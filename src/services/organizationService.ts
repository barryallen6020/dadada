import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

export interface CreateOrganizationDTO {
  name: string;
  description: string;
  logo?: string;
  type: 'public' | 'private';
}

export interface UpdateOrganizationDTO {
  name?: string;
  description?: string;
  logo?: string;
  type?: 'public' | 'private';
  currency?: string;
}

export interface OrganizationMemberDTO {
  userId: string;
  role: string;
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

const organizationService = {
  // Get all organizations
  getAllOrganizations: async () => {
    const response = await fetch(`${API_BASE_URL}/organization`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch organizations');
    return response.json();
  },

  // Get organization users
  getOrganizationUsers: async (organizationId: string) => {
    const response = await fetch(`${API_BASE_URL}/organization/users/${organizationId}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch organization users');
    return response.json();
  },

  // Create organization
  createOrganization: async (data: CreateOrganizationDTO) => {
    const response = await fetch(`${API_BASE_URL}/organization/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create organization');
    return response.json();
  },

  // Add member to organization
  addOrganizationMember: async (data: OrganizationMemberDTO) => {
    const response = await fetch(`${API_BASE_URL}/organization/member/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to add member');
    return response.json();
  },

  // Update organization
  updateOrganization: async (organizationId: string, data: UpdateOrganizationDTO) => {
    const response = await fetch(`${API_BASE_URL}/organization/update`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ id: organizationId, ...data })
    });
    if (!response.ok) throw new Error('Failed to update organization');
    return response.json();
  },

  // Get my organization
  getMyOrganization: async () => {
    const response = await fetch(`${API_BASE_URL}/organization/myorg`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch my organization');
    return response.json();
  },
};

export default organizationService;

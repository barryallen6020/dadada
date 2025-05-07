import api from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'member' | 'hub_manager' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  preferredHub?: string;
  joinDate: string;
  lastLogin: string | null;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  hubManagers: number;
  pendingApprovals: number;
}

export interface AddMemberData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  preferredHub?: string;
  organizationId?: string;
}

const userManagementService = {
  // Get all organization users
  getOrganizationUsers: async (): Promise<User[]> => {
    const org = await api.get(`${API_ENDPOINTS.ORGANIZATION.GET_MY_ORG}`);
    const orgId = org.data.data.id;
    // console.log(orgId)
    const response = await api.get(`${API_ENDPOINTS.ORGANIZATION.GET_USERS}/${orgId}`);

    console.log(response.data.data[0])
    return response.data.data || [];
  },

  // Add new member
  addMember: async (data: AddMemberData): Promise<User> => {
    // Get current organization from localStorage
    const orgStr = localStorage.getItem('currentOrganization');
    const currentOrganization = orgStr ? JSON.parse(orgStr) : null;

    if (!currentOrganization?.id) {
      throw new Error('No organization selected');
    }

    const memberData = {
      ...data,
      organizationId: currentOrganization.id
    };

    const response = await api.post(API_ENDPOINTS.ORGANIZATION.ADD_MEMBER, memberData);
    return response.data;
  },

  // Update member
  updateMember: async (userId: string, data: Partial<User>): Promise<User> => {
    const response = await api.patch(`${API_ENDPOINTS.ORGANIZATION.UPDATE_MEMBER}/${userId}`, data);
    return response.data;
  },

  // Send invitation
  sendInvitation: async (email: string): Promise<void> => {
    const orgStr = localStorage.getItem('currentOrganization');
    const currentOrganization = orgStr ? JSON.parse(orgStr) : null;

    if (!currentOrganization?.id) {
      throw new Error('No organization selected');
    }

    await api.post(API_ENDPOINTS.INVITATION.CREATE, { 
      email,
      organizationId: currentOrganization.id
    });
  },

  // Get pending invitations
  getPendingInvitations: async (): Promise<{ email: string; createdAt: string }[]> => {
    const response = await api.get(API_ENDPOINTS.INVITATION.GET_ALL);
    return response.data.data || [];
  },

  // Get user statistics
  getUserStats: async (): Promise<UserStats> => {
    const users = await userManagementService.getOrganizationUsers();
    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      hubManagers: users.filter(u => u.role === 'hub_manager').length,
      pendingApprovals: users.filter(u => u.status === 'pending').length
    };
  },

  getWorkspaceById: async (workspaceId: string): Promise<any> => {
    const response = await api.get(`${API_ENDPOINTS.WORKSPACE.GET_BY_ID(workspaceId)}`);
    console.log(response.data.data);
    return response.data;
  },
};

export default userManagementService; 
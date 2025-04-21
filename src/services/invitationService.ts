
import { API_BASE_URL } from '@/config/api';

export interface CreateInvitationDTO {
  email: string;
  organizationId: string;
  role: string;
}

const invitationService = {
  // Create invitation
  createInvitation: async (data: CreateInvitationDTO) => {
    const response = await fetch(`${API_BASE_URL}/invitation/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create invitation');
    return response.json();
  },

  // Get all invitations
  getInvitations: async () => {
    const response = await fetch(`${API_BASE_URL}/invitation`);
    if (!response.ok) throw new Error('Failed to fetch invitations');
    return response.json();
  },

  // Accept invitation
  acceptInvitation: async (invitationId: string) => {
    const response = await fetch(`${API_BASE_URL}/invitation/accept/${invitationId}`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to accept invitation');
    return response.json();
  },

  // Disable invitation
  disableInvitation: async (invitationId: string) => {
    const response = await fetch(`${API_BASE_URL}/invitation/${invitationId}`, {
      method: 'PATCH'
    });
    if (!response.ok) throw new Error('Failed to disable invitation');
    return response.json();
  }
};

export default invitationService;


import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import { 
  CreateWorkspaceDTO, 
  UpdateWorkspaceDTO, 
  CreateSeatDTO, 
  UpdateSeatDTO,
  BulkCreateSeatsDTO,
  Workspace,
  FloorPlan
} from "@/types/workspace";
import api from '@/lib/api';

// Re-export the Workspace type to maintain backward compatibility
export type { Workspace } from "@/types/workspace";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

const getAllWorkspaces = async (): Promise<Workspace[]> => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.GET_ALL, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch workspaces');
  return response.json();
};

const createWorkspace = async (workspace: CreateWorkspaceDTO): Promise<Workspace> => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.CREATE, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(workspace),
  });
  if (!response.ok) throw new Error('Failed to create workspace');
  return response.json();
};

const getOrgWorkspaces = async (): Promise<Workspace[]> => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.GET_ORG_WORKSPACES, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch organization workspaces');
  return response.json();
};

const bulkCreateSeats = async (workspaceId: string, data: BulkCreateSeatsDTO) => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.BULK_CREATE_SEATS(workspaceId), {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create seats');
  return response.json();
};

const getWorkspaceById = async (workspaceId: string): Promise<Workspace> => {
  const response = await api.get(`${API_BASE_URL}/workspace/${workspaceId}`);
  return response.data.data
};

const updateWorkspace = async (workspaceId: string, data: UpdateWorkspaceDTO): Promise<Workspace> => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.UPDATE(workspaceId), {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update workspace');
  return response.json();
};

const createSeat = async (workspaceId: string, data: CreateSeatDTO) => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.CREATE_SEAT(workspaceId), {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create seat');
  return response.json();
};

const updateSeat = async (seatId: string, data: UpdateSeatDTO) => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.UPDATE_SEAT(seatId), {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update seat');
  return response.json();
};

const uploadFloorPlan = async (workspaceId: string, name: string, floor: number, image: File) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('floor', floor.toString());
  formData.append('image', image);

  const token = localStorage.getItem('accessToken');
  const response = await fetch(API_ENDPOINTS.WORKSPACE.UPLOAD_FLOOR_PLAN(workspaceId), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload floor plan');
  return response.json();
};

const getFloorPlans = async (workspaceId: string): Promise<FloorPlan[]> => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.GET_FLOOR_PLANS(workspaceId), {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch floor plans');
  return response.json();
};

const getOrganizationWorkspaces = async (): Promise<Workspace[]> => {
  const response = await api.get(API_ENDPOINTS.WORKSPACE.GET_ORG_WORKSPACES);
  return response.data.data || [];
};

const getActiveHubs = async (): Promise<Workspace[]> => {
  const workspaces = await getOrganizationWorkspaces();
  return workspaces.filter(w => w.status === 'ACTIVE');
};

export const workspaceService = {
  getAllWorkspaces,
  createWorkspace,
  getOrgWorkspaces,
  bulkCreateSeats,
  getWorkspaceById,
  updateWorkspace,
  createSeat,
  updateSeat,
  uploadFloorPlan,
  getFloorPlans,
  getOrganizationWorkspaces,
  getActiveHubs,
};


import { API_ENDPOINTS } from "@/config/api";
import { 
  CreateWorkspaceDTO, 
  UpdateWorkspaceDTO, 
  CreateSeatDTO, 
  UpdateSeatDTO,
  BulkCreateSeatsDTO,
  Workspace,
  FloorPlan
} from "@/types/workspace";

const getAllWorkspaces = async (): Promise<Workspace[]> => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.GET_ALL);
  if (!response.ok) throw new Error('Failed to fetch workspaces');
  return response.json();
};

const createWorkspace = async (workspace: CreateWorkspaceDTO): Promise<Workspace> => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.CREATE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workspace),
  });
  if (!response.ok) throw new Error('Failed to create workspace');
  return response.json();
};

const getOrgWorkspaces = async (): Promise<Workspace[]> => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.GET_ORG_WORKSPACES);
  if (!response.ok) throw new Error('Failed to fetch organization workspaces');
  return response.json();
};

const bulkCreateSeats = async (workspaceId: string, data: BulkCreateSeatsDTO) => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.BULK_CREATE_SEATS(workspaceId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create seats');
  return response.json();
};

const getWorkspaceById = async (workspaceId: string): Promise<Workspace> => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.GET_BY_ID(workspaceId));
  if (!response.ok) throw new Error('Failed to fetch workspace');
  return response.json();
};

const updateWorkspace = async (workspaceId: string, data: UpdateWorkspaceDTO): Promise<Workspace> => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.UPDATE(workspaceId), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update workspace');
  return response.json();
};

const createSeat = async (workspaceId: string, data: CreateSeatDTO) => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.CREATE_SEAT(workspaceId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create seat');
  return response.json();
};

const updateSeat = async (seatId: string, data: UpdateSeatDTO) => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.UPDATE_SEAT(seatId), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
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

  const response = await fetch(API_ENDPOINTS.WORKSPACE.UPLOAD_FLOOR_PLAN(workspaceId), {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload floor plan');
  return response.json();
};

const getFloorPlans = async (workspaceId: string): Promise<FloorPlan[]> => {
  const response = await fetch(API_ENDPOINTS.WORKSPACE.GET_FLOOR_PLANS(workspaceId));
  if (!response.ok) throw new Error('Failed to fetch floor plans');
  return response.json();
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
};


import { API_ENDPOINTS } from "@/config/api";
import { State, LGA } from "@/types/location";

const getAllStates = async (): Promise<State[]> => {
  const response = await fetch(API_ENDPOINTS.LOCATION.GET_STATES);
  if (!response.ok) throw new Error('Failed to fetch states');
  return response.json();
};

const getStateById = async (id: string): Promise<State> => {
  const response = await fetch(API_ENDPOINTS.LOCATION.GET_STATE(id));
  if (!response.ok) throw new Error('Failed to fetch state');
  return response.json();
};

const getLGAsByStateId = async (stateId: string): Promise<LGA[]> => {
  const response = await fetch(API_ENDPOINTS.LOCATION.GET_LGAS(stateId));
  if (!response.ok) throw new Error('Failed to fetch LGAs');
  return response.json();
};

const getLGAById = async (id: string): Promise<LGA> => {
  const response = await fetch(API_ENDPOINTS.LOCATION.GET_LGA(id));
  if (!response.ok) throw new Error('Failed to fetch LGA');
  return response.json();
};

export const locationService = {
  getAllStates,
  getStateById,
  getLGAsByStateId,
  getLGAById,
};

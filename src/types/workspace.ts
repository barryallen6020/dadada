export interface Organization {
  id: string;
  name: string;
  logo: string;
  description: string;
  currency?: string;
  type: 'public' | 'private';
  visibility?: boolean;
  serviceFeePercentage?: number;
  bookingCap?: number;
  memberCap?: number;
  subscriptionPlan?: string;
}

export interface Workspace {
  id: string;
  name: string;
  type: string;
  location: string;
  capacity: number;
  description: string;
  features: string[];
  pricePerHour: number;
  image: string;
  availability: string;
  enabled: boolean;
  organizationId: string;
  rating?: number;
  isFavorite?: boolean;
}

export interface CheckIn {
  id: string;
  learnerId: string;
  learnerName: string;
  email: string;
  hubId: string;
  hub: string;
  checkInTime: string;
  checkOutTime?: string;
  status: string;
}

export interface CreateWorkspaceDTO {
  name: string;
  description: string;
  address: string;
  totalFloors: number;
  openingTime: string;
  closingTime: string;
  seatingCapacity: number;
  amenities: string[];
  isPaidBooking: boolean;
  pricePerBooking: number;
}

export interface UpdateWorkspaceDTO extends CreateWorkspaceDTO {
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Position {
  x: number;
  y: number;
}

export interface CreateSeatDTO {
  position: Position;
  status: 'ACTIVE' | 'INACTIVE';
  floor: number;
  seatType: 'WINDOW' | 'WALL_SIDE' | 'CENTER';
}

export interface UpdateSeatDTO {
  position: Position;
  status: 'ACTIVE' | 'INACTIVE';
  floor: number;
}

export interface BulkCreateSeatsDTO {
  seatingCapacity: number;
  windowSeats: number;
  wallSideSeats: number;
  centerSeats: number;
}

export interface FloorPlan {
  name: string;
  floor: number;
  imageUrl: string;
}

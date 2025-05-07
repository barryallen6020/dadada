
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
  address: string;
  description: string;
  totalFloors: number;
  openingTime: string;
  closingTime: string;
  seatingCapacity: number;
  amenities: string[];
  isPaidBooking: boolean;
  pricePerBooking: number;
  status: 'ACTIVE' | 'INACTIVE';
  organizationId: string;
  // Additional properties needed across the application
  location?: string; // Location name (city, state, etc.)
  capacity?: number; // Alias for seatingCapacity for backward compatibility
  pricePerHour?: number; // Alias for pricePerBooking for backward compatibility
  availability?: string; // Availability status (High, Medium, Low)
  enabled?: boolean; // Whether the workspace is enabled
  features?: string[]; // Alias for amenities for backward compatibility
  image?: string; // Image URL
  images?: string[]; // Multiple image URLs
  rating?: number; // Rating score
  isFavorite?: boolean; // Whether the workspace is marked as favorite
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

export interface UpdateWorkspaceDTO extends Workspace {
  // All fields from Workspace plus any additional update-specific fields
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

// Define HubWithPrice interface for HubPricingManager
export interface HubWithPrice extends Workspace {
  newPrice: number;
}

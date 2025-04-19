
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

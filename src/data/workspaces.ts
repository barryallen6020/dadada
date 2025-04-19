
export const workspaces = [
  {
    id: "demo-workspace-1",
    name: "ALX Africa Hub",
    type: "Hot Desk",
    location: "Lagos, Nigeria",
    capacity: 50,
    description: "A modern coworking space for tech professionals",
    amenities: ["High-Speed WiFi", "Coffee Machine", "Meeting Rooms", "Quiet Areas"],
    images: ["workspace1.jpg"],
    organizationId: "alx",
    rating: 4.5,
    reviews: 28,
    pricePerHour: 15,
    available: true
  },
  {
    id: "demo-workspace-2",
    name: "Tech Hub Marina",
    type: "Private Office",
    location: "Marina, Lagos",
    capacity: 20,
    description: "Private offices and meeting spaces in the heart of Lagos",
    amenities: ["24/7 Access", "Private Phone Booths", "Kitchen", "Security"],
    images: ["workspace2.jpg"],
    organizationId: "alx",
    rating: 4.8,
    reviews: 15,
    pricePerHour: 25,
    available: true
  }
];

export type Workspace = typeof workspaces[0];

// Add the missing organizations export
export const organizations = [
  {
    id: "alx",
    name: "ALX Africa",
    logo: "/logo.svg",
    description: "ALX Africa hub workspace network",
    currency: "₦",
    type: "public",
    visibility: true,
    serviceFeePercentage: 10,
    bookingCap: 100,
    memberCap: 500,
    subscriptionPlan: "premium"
  },
  {
    id: "tech-hub",
    name: "Tech Hub Nigeria",
    logo: "/logo.svg",
    description: "Tech Hub Nigeria workspace network",
    currency: "₦",
    type: "private",
    visibility: false,
    serviceFeePercentage: 5,
    bookingCap: 50,
    memberCap: 200,
    subscriptionPlan: "standard"
  }
];

export type Organization = typeof organizations[0];

// Add checkIns export as it might be needed
export const checkIns = [
  {
    id: "check-in-1",
    email: "learner@example.com",
    learnerName: "John Doe",
    status: "checked-in",
    checkInTime: "2024-04-19T09:00:00",
    hub: "ALX Africa Hub",
    workspace: "Hot Desk 1"
  },
  {
    id: "check-in-2",
    email: "another@example.com",
    learnerName: "Jane Smith",
    status: "checked-out",
    checkInTime: "2024-04-19T08:30:00",
    checkOutTime: "2024-04-19T17:30:00",
    hub: "Tech Hub Marina",
    workspace: "Private Office 2"
  }
];

export type CheckIn = typeof checkIns[0];



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
    available: true,
    enabled: true,
    availability: "High",
    features: ["High-Speed WiFi", "Coffee Machine", "Meeting Rooms", "Quiet Areas"],
    image: "workspace1.jpg"
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
    available: true,
    enabled: true,
    availability: "Medium",
    features: ["24/7 Access", "Private Phone Booths", "Kitchen", "Security"],
    image: "workspace2.jpg"
  }
];

export const organizations = [
  {
    id: "alx",
    name: "ALX Africa",
    logo: "/logo.svg",
    description: "ALX Africa is a tech talent accelerator that trains and connects skilled developers with hiring companies.",
    currency: "₦",
    type: "public",
    visibility: true,
    serviceFeePercentage: 5,
    bookingCap: 100,
    memberCap: 500,
    subscriptionPlan: "Enterprise"
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "/placeholder.svg",
    description: "Microsoft Corporation is an American multinational technology company.",
    currency: "$",
    type: "private",
    visibility: true,
    serviceFeePercentage: 3,
    bookingCap: 200,
    memberCap: 1000,
    subscriptionPlan: "Enterprise"
  }
];

export const checkIns = [
  {
    id: "checkin-1",
    email: "john@example.com",
    learnerName: "John Smith", // Added learnerName property
    status: "active",
    checkInTime: "2025-04-19T09:30:00.000Z",
    hub: "ALX Africa Hub",
    workspace: "Hot Desk Zone A"
  },
  {
    id: "checkin-2",
    email: "jane@example.com",
    learnerName: "Jane Doe", // Added learnerName property
    status: "completed",
    checkInTime: "2025-04-18T10:00:00.000Z",
    checkOutTime: "2025-04-18T17:00:00.000Z",
    hub: "Tech Hub Marina",
    workspace: "Meeting Room 2"
  }
];

export type Workspace = typeof workspaces[0];
export type Organization = typeof organizations[0];
export type CheckIn = typeof checkIns[0];

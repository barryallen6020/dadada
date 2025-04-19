
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

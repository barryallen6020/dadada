import { Organization, Workspace, CheckIn } from '@/types/workspace';

export const organizations: Organization[] = [
  {
    id: "org-001",
    name: "ALX",
    logo: "",
    description: "ALX Learning Spaces",
    currency: "₦", // Nigerian Naira
    type: "public", // Explicitly typed as 'public'
    visibility: true, // Is discoverable
    serviceFeePercentage: 10, // 10% platform fee
  },
  {
    id: "org-002",
    name: "WorkCentral",
    logo: "",
    description: "WorkCentral Collaborative Spaces",
    currency: "₦", // Updated to Naira
    type: "public",
    visibility: true,
    serviceFeePercentage: 10,
  },
  {
    id: "org-003",
    name: "TechHub",
    logo: "",
    description: "TechHub Innovation Centers",
    currency: "₦", // Updated to Naira
    type: "private",
    visibility: false,
    bookingCap: 100, // Weekly booking cap
    memberCap: 200, // Member cap
    subscriptionPlan: "Custom Plan A",
  },
  {
    id: "org-004",
    name: "AfricaWorks",
    logo: "",
    description: "Pan-African Coworking Network",
    currency: "₦", // Updated to Naira
    type: "public",
    visibility: true,
    serviceFeePercentage: 10,
  },
  {
    id: "org-005",
    name: "Impact Hub",
    logo: "",
    description: "Social Innovation Spaces",
    currency: "₦", // Updated to Naira
    type: "private",
    visibility: false,
    bookingCap: 150,
    memberCap: 300,
    subscriptionPlan: "Custom Plan B",
  }
];

export const workspaces: Workspace[] = [
  // ALX Workspaces
  {
    id: "ws-001",
    name: "RALNO HUB AKOWONJO",
    type: "Meeting Room",
    location: "Lagos",
    capacity: 8,
    description: "Spacious meeting room with premium amenities, perfect for important client meetings and presentations.",
    features: ["Projector", "Whiteboard", "Video conferencing", "Refreshments"],
    pricePerHour: 5000,
    image: "https://images.unsplash.com/photo-1497366811353-6db17581c291?auto=format&fit=crop&w=800&q=80",
    availability: "High",
    enabled: true,
    organizationId: "org-001" // ALX
  },
  {
    id: "ws-003",
    name: "Costain Hub 4th Floor (n)",
    type: "Private Office",
    location: "Lagos",
    capacity: 4,
    description: "Fully furnished private office with secure access and dedicated amenities for small teams.",
    features: ["Secure access", "Dedicated printer", "Storage cabinets", "Coffee machine"],
    pricePerHour: 3500,
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=800&q=80",
    availability: "High",
    enabled: true,
    organizationId: "org-001" // ALX
  },
  {
    id: "ws-008",
    name: "ALX Innovation Lab",
    type: "Hot Desk",
    location: "Abuja",
    capacity: 20,
    description: "Modern hot desks in our flagship innovation lab with high-speed internet and collaboration zones.",
    features: ["High-speed internet", "Standing desks", "Meeting pods", "Free coffee"],
    pricePerHour: 2500,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    availability: "Medium",
    enabled: true,
    organizationId: "org-001" // ALX
  },
  {
    id: "ws-009",
    name: "ALX Training Center",
    type: "Event Space",
    location: "Lagos",
    capacity: 50,
    description: "Fully equipped training space perfect for workshops, bootcamps and tech events.",
    features: ["Training equipment", "Breakout rooms", "Presentation setup", "Catering options"],
    pricePerHour: 7500,
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80",
    availability: "Low",
    enabled: true,
    organizationId: "org-001" // ALX
  },
  
  // WorkCentral Workspaces
  {
    id: "ws-002",
    name: "Workbay Ajah",
    type: "Hot Desk",
    location: "Lagos",
    capacity: 12,
    description: "Comfortable workspace in our open-plan area with high-speed internet and power outlets.",
    features: ["Power outlets", "High-speed internet", "Adjustable chair", "Natural lighting"],
    pricePerHour: 1500,
    image: "https://images.unsplash.com/photo-1521737604893-f6a8aca548c2?auto=format&fit=crop&w=800&q=80",
    availability: "Medium",
    enabled: true,
    organizationId: "org-002" // WorkCentral
  },
  {
    id: "ws-004",
    name: "Costain Hub 5th Floor",
    type: "Event Space",
    location: "Lagos",
    capacity: 30,
    description: "Large open space ideal for workshops, training sessions, and team-building activities.",
    features: ["Modular furniture", "AV equipment", "Catering services", "Stage setup"],
    pricePerHour: 10000,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    availability: "Low",
    enabled: true,
    organizationId: "org-002" // WorkCentral
  },
  {
    id: "ws-010",
    name: "WorkCentral Executive Suite",
    type: "Private Office",
    location: "Lagos",
    capacity: 3,
    description: "Premium private office with executive furnishings and business services.",
    features: ["Executive desk", "Ergonomic chair", "Private bathroom", "Coffee service"],
    pricePerHour: 4500,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
    availability: "High",
    enabled: true,
    organizationId: "org-002" // WorkCentral
  },
  {
    id: "ws-011",
    name: "WorkCentral Boardroom",
    type: "Meeting Room",
    location: "Abuja",
    capacity: 14,
    description: "Elegant boardroom for high-level meetings and presentations with state-of-the-art technology.",
    features: ["Video conferencing", "Interactive display", "Sound system", "Executive chairs"],
    pricePerHour: 12000,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
    availability: "Medium",
    enabled: true,
    organizationId: "org-002" // WorkCentral
  },
  
  // TechHub Workspaces (now in Nigeria)
  {
    id: "ws-012",
    name: "TechHub Studio",
    type: "Private Office",
    location: "Abuja",
    capacity: 5,
    description: "Creative studio space designed for tech startups with flexible layouts and equipment.",
    features: ["3D printer", "Developer workstations", "Gaming area", "Podcast studio"],
    pricePerHour: 35,
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80",
    availability: "High",
    enabled: true,
    organizationId: "org-003" // TechHub
  },
  {
    id: "ws-013",
    name: "TechHub Collaboration Zone",
    type: "Hot Desk",
    location: "Port Harcourt",
    capacity: 25,
    description: "Open collaboration space with flexible seating and ideation areas for tech teams.",
    features: ["Whiteboard walls", "Beanbags", "Idea booths", "Charging stations"],
    pricePerHour: 15,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    availability: "Medium",
    enabled: true,
    organizationId: "org-003" // TechHub
  },
  
  // AfricaWorks Workspaces (now in Nigeria)
  {
    id: "ws-014",
    name: "AfricaWorks Lagos",
    type: "Event Space",
    location: "Lagos",
    capacity: 60,
    description: "Premium event space for conferences, product launches and networking events.",
    features: ["Stage", "Sound system", "Lighting", "Breakout areas"],
    pricePerHour: 8000,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    availability: "Low",
    enabled: true,
    organizationId: "org-004" // AfricaWorks
  },
  {
    id: "ws-015",
    name: "AfricaWorks Creator Studio",
    type: "Meeting Room",
    location: "Ibadan",
    capacity: 10,
    description: "Creative meeting space with tools for design thinking and collaborative work.",
    features: ["Design thinking tools", "Digital whiteboard", "Recording equipment", "Mood lighting"],
    pricePerHour: 3500,
    image: "https://images.unsplash.com/photo-1497366811353-6db17581c291?auto=format&fit=crop&w=800&q=80",
    availability: "Medium",
    enabled: true,
    organizationId: "org-004" // AfricaWorks
  },
  
  // Impact Hub Workspaces (now in Nigeria)
  {
    id: "ws-016",
    name: "Impact Hub Lagos",
    type: "Hot Desk",
    location: "Lagos",
    capacity: 30,
    description: "Social impact-focused coworking space with collaborative areas and community programs.",
    features: ["Community events", "Impact library", "Meditation room", "Organic cafe"],
    pricePerHour: 2000,
    image: "https://images.unsplash.com/photo-1521737604893-f6a8aca548c2?auto=format&fit=crop&w=800&q=80",
    availability: "High",
    enabled: true,
    organizationId: "org-005" // Impact Hub
  },
  {
    id: "ws-017",
    name: "Impact Hub Abuja",
    type: "Private Office",
    location: "Abuja",
    capacity: 6,
    description: "Eco-friendly private office for sustainability-focused teams and social enterprises.",
    features: ["Solar power", "Recycled furniture", "Living wall", "Zero waste policy"],
    pricePerHour: 2500,
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=800&q=80",
    availability: "Medium",
    enabled: true,
    organizationId: "org-005" // Impact Hub
  }
];

export const checkIns: CheckIn[] = [
  { 
    id: "check-1", 
    learnerId: "user-001",
    learnerName: "John Doe", 
    email: "john.doe@example.com", 
    hubId: "ws-001",
    hub: "RALNO HUB AKOWONJO", 
    checkInTime: new Date(2023, 9, 15, 9, 30).toISOString(), 
    checkOutTime: new Date(2023, 9, 15, 16, 45).toISOString(),
    status: "completed"
  },
  { 
    id: "check-2", 
    learnerId: "user-002",
    learnerName: "Jane Smith", 
    email: "jane.smith@example.com", 
    hubId: "ws-002",
    hub: "Workbay Ajah", 
    checkInTime: new Date(2023, 9, 15, 10, 15).toISOString(), 
    status: "active"
  },
  { 
    id: "check-3", 
    learnerId: "user-003",
    learnerName: "David Wilson", 
    email: "david.wilson@example.com", 
    hubId: "ws-003",
    hub: "Costain Hub 4th Floor (n)", 
    checkInTime: new Date(2023, 9, 14, 13, 0).toISOString(), 
    checkOutTime: new Date(2023, 9, 14, 17, 30).toISOString(),
    status: "completed"
  }
];

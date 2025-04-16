
import { workspaces } from "./workspaces";

export const bookings = [
  {
    id: "bk-001",
    workspaceId: "ws-001",
    workspace: workspaces.find(w => w.id === "ws-001"),
    date: "2023-08-15",
    startTime: "10:00",
    endTime: "12:00",
    participants: 5,
    status: "confirmed",
    notes: "Client presentation meeting"
  },
  {
    id: "bk-002",
    workspaceId: "ws-003",
    workspace: workspaces.find(w => w.id === "ws-003"),
    date: "2023-08-16",
    startTime: "09:00",
    endTime: "17:00",
    participants: 3,
    status: "confirmed",
    notes: "Team working session on new project"
  },
  {
    id: "bk-003",
    workspaceId: "ws-002",
    workspace: workspaces.find(w => w.id === "ws-002"),
    date: "2023-08-17",
    startTime: "14:00",
    endTime: "16:00",
    participants: 1,
    status: "confirmed",
    notes: ""
  },
  {
    id: "bk-004",
    workspaceId: "ws-004",
    workspace: workspaces.find(w => w.id === "ws-004"),
    date: "2023-08-20",
    startTime: "10:00",
    endTime: "15:00",
    participants: 25,
    status: "confirmed",
    notes: "Company workshop on new product launch"
  },
  {
    id: "bk-005",
    workspaceId: "ws-006",
    workspace: workspaces.find(w => w.id === "ws-006") || null,
    date: "2023-07-28",
    startTime: "11:00",
    endTime: "13:00",
    participants: 8,
    status: "confirmed",
    notes: "Board meeting"
  },
  {
    id: "bk-006",
    workspaceId: "ws-005",
    workspace: workspaces.find(w => w.id === "ws-005"),
    date: "2023-07-25",
    startTime: "09:00",
    endTime: "10:00",
    participants: 1,
    status: "cancelled",
    notes: "Private call with investor"
  },
  {
    id: "bk-007",
    workspaceId: "ws-008",
    workspace: workspaces.find(w => w.id === "ws-008") || null,
    date: "2023-08-22",
    startTime: "13:00",
    endTime: "16:00",
    participants: 12,
    status: "confirmed",
    notes: "Design thinking workshop"
  },
  {
    id: "bk-008",
    workspaceId: "ws-001",
    workspace: workspaces.find(w => w.id === "ws-001"),
    date: "2023-07-20",
    startTime: "15:00",
    endTime: "16:00",
    participants: 4,
    status: "confirmed",
    notes: "Weekly team meeting"
  }
];

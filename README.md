
# DeskHive

DeskHive is Nigeria's premier workspace management solution designed for modern professionals and businesses. The platform allows users to discover, book, and manage workspaces efficiently, helping organizations optimize their space utilization and employees find the right workspace for their needs.

## Project Info

**URL**: [example.com](example.com)

## Features

- **Easy Booking System**: Book workspaces with a few clicks through an intuitive calendar interface.
- **Interactive Floor Plans**: Navigate workspaces visually with detailed floor plans showing real-time availability.
- **Smart Notifications**: Receive timely reminders about bookings and important updates.
- **Usage Analytics**: Gain insights into workspace utilization patterns.
- **Team Collaboration**: Coordinate with team members by viewing shared calendars and booking group workspaces.
- **Admin Dashboard**: Comprehensive analytics and workspace management tools for administrators.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Psybah/deskhive.git
   cd deskhive
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure
- `/src/components`: UI components organized by purpose
  - `/admin`: Admin dashboard components
  - `/common`: Shared components like Logo, LoadingDisplay
  - `/dashboard`: User dashboard components
  - `/home`: Homepage components
  - `/layout`: Layout components like Navbar, Footer
  - `/ui`: shadcn UI components
- `/src/pages`: Page components for different routes
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility functions
- `/src/data`: Mock data for workspaces and bookings
- `/src/integrations`: Integration with Supabase

## Technologies Used

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (based on Radix UI)
- **Routing**: React Router
- **State Management**: React Query
- **Charts**: Recharts
- **Backend/Database**: Supabase
- **Form Handling**: React Hook Form with Zod validation

## Floor Plan Editor Documentation

The floor plan editor is a powerful tool that allows administrators to create and manage interactive floor plans for workspace booking. This feature is built using Fabric.js and provides a rich set of tools for designing workspace layouts.

### How the Floor Plan Editor Works

#### Overview
The floor plan editor allows administrators to:
1. Create a visual representation of their workspace
2. Add walls, rooms, tables, and seating positions
3. Configure seating capacity and pricing
4. Define different seating categories with different pricing models

#### Editor Tools

The editor includes the following tools:

1. **Drawing Tools**:
   - **Line Tool**: Added specifically for outlining the hub perimeter. Use this tool to create the outer walls and inner room dividers.
   - **Square Tool**: Create square shapes for tables, rooms, or other elements.
   - **Circle Tool**: Add circular tables or other rounded elements.
   - **Text Tool**: Add labels to different areas of the floor plan.

2. **Seat Management**:
   - **Add Seats**: Drag and drop seats onto tables.
   - **Seat Status**: Seats can be set as available (green) or unavailable (red).
   - **Seat Numbering**: Each seat is automatically numbered, centered in the circle representation.

3. **Editing Tools**:
   - **Select Tool**: Select and modify existing objects.
   - **Move Tool**: Reposition objects in the canvas.
   - **Delete**: Remove selected objects from the canvas.
   - **Undo/Redo**: Revert or reapply recent changes.

4. **Grid and Snapping**:
   - **Grid Display**: Toggle grid visibility for precise placement.
   - **Snap to Grid**: Enable/disable snapping to align objects perfectly.
   - **Grid Size**: Adjust the grid spacing.

5. **Categorization**:
   - **Seat Categories**: Group seats into categories (e.g., standard, premium).
   - **Category Management**: Set different prices for different seat categories.

### Step-by-Step Floor Plan Creation

1. **Start by outlining the hub**:
   - Select the Line tool
   - Click on the canvas to create the starting point
   - Click again to create line segments that form the outer perimeter
   - Complete your shape by adding all required points
   - Click "Finish Line" when done with a continuous boundary

2. **Add internal walls and partitions**:
   - Continue using the Line tool to create room dividers
   - Create separate rooms and areas within your workspace

3. **Add furniture**:
   - Place tables using Square/Circle tools
   - Position them according to your actual workspace layout

4. **Add seats**:
   - Click the "Add Seat" button
   - Drag seats onto tables
   - Seats will snap to grid points for neat alignment

5. **Configure seat properties**:
   - Select seats to edit their properties
   - Assign categories and prices
   - Set availability status

6. **Save the floor plan**:
   - Click "Save" to store the floor plan
   - The floor plan will be associated with the workspace

### Backend Integration (For Development Team)

The floor plan functionality integrates with the backend through the following architecture and APIs. This section serves as a guideline for backend developers implementing the integration.

#### Recommended Backend Architecture

1. **Data Storage Strategy**:
   - Store floor plan data as structured JSON in your database, either using PostgreSQL JSONB fields or a similar approach
   - Create separate tables for workspaces and seats to optimize query performance
   - Consider versioning floor plans to maintain history and allow rollbacks

2. **API Endpoints Implementation**:

   a. **Workspace Management**:
   - `POST /api/workspaces`: Create a new workspace with floor plan data
   - `PUT /api/workspaces/{id}`: Update an existing workspace and its floor plan
   - `GET /api/workspaces/{id}`: Retrieve workspace details including floor plan
   - `DELETE /api/workspaces/{id}`: Delete a workspace and its floor plan

   b. **Floor Plan Specific Endpoints**:
   - `POST /api/workspaces/{id}/floor-plan`: Create or update the floor plan for a workspace
   - `GET /api/workspaces/{id}/floor-plan`: Retrieve the floor plan data for a workspace

   c. **Seat Management**:
   - `GET /api/workspaces/{id}/seats`: List all seats in a workspace
   - `PUT /api/workspaces/{id}/seats/{seatId}`: Update seat properties (availability, category, price)
   - `GET /api/workspaces/{id}/seats/availability?date={date}`: Check seat availability for a specific date

3. **Real-time Updates**:
   - Implement WebSockets or Server-Sent Events for real-time updates of seat availability
   - Update booking statuses in real-time to prevent double bookings
   - Broadcast seat status changes to all connected clients

4. **Performance Considerations**:
   - Cache floor plan data to reduce database load
   - Optimize JSON structure for faster rendering
   - Consider splitting large floor plans into zones for better performance

5. **Security Implementation**:
   - Apply proper authorization checks on all endpoints
   - Implement Row Level Security if using Supabase
   - Sanitize and validate all input data

#### Data Schema

The floor plan data should be stored in the following format:

```typescript
interface FloorPlan {
  id: string;
  workspaceId: string;
  version: number;
  objects: FloorPlanObject[];
  gridSize: number;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
}

interface FloorPlanObject {
  id: string;
  type: 'wall' | 'table' | 'seat' | 'text';
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  rotation: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  objectType?: string;
  category?: string;
  price?: number;
  seatNumber?: number;
  isAvailable?: boolean;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  points?: {x: number, y: number}[]; // For line/polygon objects
}
```

#### Database Structure

We recommend implementing the following database tables:

1. `workspaces`: Contains general workspace information
   - `id` (primary key)
   - `name`
   - `address`
   - `capacity`
   - `images` (JSON array of image URLs)
   - `price` (base price)
   - `details` (additional workspace information)

2. `floor_plans`: Stores the floor plan layout
   - `id` (primary key)
   - `workspace_id` (foreign key referencing workspaces.id)
   - `data` (JSON containing all floor plan objects)
   - `version`
   - `created_at`
   - `updated_at`

3. `seats`: Individual seats available for booking
   - `id` (primary key)
   - `workspace_id` (foreign key referencing workspaces.id)
   - `floor_plan_object_id` (reference to the object ID in floor_plan.data)
   - `category`
   - `price`
   - `seat_number`

4. `seat_bookings`: Records of seat reservations
   - `id` (primary key)
   - `seat_id` (foreign key referencing seats.id)
   - `user_id` (foreign key referencing users.id)
   - `booking_date`
   - `start_time`
   - `end_time`
   - `status` (confirmed, cancelled, etc.)

#### Implementation Tips for Backend Developers

1. **Supabase Integration**:
   - Use Postgres JSONB type for storing complex floor plan data
   - Set up RLS policies to control access to workspace data
   - Consider using Supabase Functions for complex business logic

2. **Optimized Queries**:
   - Index the `seat_bookings.booking_date` field for faster availability lookups
   - Use JOIN operations to fetch related data efficiently
   - Consider materialized views for frequently accessed data

3. **Testing Approach**:
   - Create automated tests for booking logic to ensure no double bookings occur
   - Test concurrent booking scenarios
   - Validate seat availability calculations

#### Real-time Features

The floor plan booking interface uses real-time updates to show seat availability:

1. **Real-time Seat Status**:
   - WebSocket connections update the UI when seats are booked or released
   - Color coding shows available (green) and unavailable (red) seats in real-time

2. **Booking Confirmation**:
   - Immediate feedback on booking attempts
   - Prevents double-booking through optimistic UI updates

### Future Improvements

1. **Enhanced Line Tool**: Improved polygon creation with automatic closing option
2. **Seat Number Positioning**: Better centralization of seat numbers within circles
3. **3D View Option**: Toggle between 2D and 3D views of the workspace
4. **Mobile-Friendly Editor**: Responsive design for tablet use
5. **Templates**: Predefined floor plan templates for quick setup
6. **Import/Export**: Support for importing floor plans from CAD software


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

## Project Structure- `/src/components`: UI components organized by purpose
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



import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building2, 
  Users, 
  Calendar, 
  Activity
} from 'lucide-react';

interface WorkspaceStatsProps {
  workspaces: Array<{
    capacity: number;
    currentOccupancy: number;
    todayBookings: number;
  }>;
}

const WorkspaceStats: React.FC<WorkspaceStatsProps> = ({ workspaces }) => {
  const stats = [
    {
      title: "Total Workspaces",
      value: workspaces.length,
      icon: Building2,
    },
    {
      title: "Total Capacity",
      value: workspaces.reduce((sum, w) => sum + w.capacity, 0),
      icon: Users,
    },
    {
      title: "Current Occupancy",
      value: workspaces.reduce((sum, w) => sum + w.currentOccupancy, 0),
      icon: Activity,
    },
    {
      title: "Today's Bookings",
      value: workspaces.reduce((sum, w) => sum + w.todayBookings, 0),
      icon: Calendar,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-nav border-white/20">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-deskhive-darkgray">{stat.title}</p>
                <p className="text-lg md:text-2xl font-bold text-deskhive-navy">{stat.value}</p>
              </div>
              <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WorkspaceStats;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity
} from 'lucide-react';

interface Workspace {
  id: number;
  name: string;
  location: string;
  capacity: number;
  currentOccupancy: number;
  todayBookings: number;
  checkedIn: number;
  status: string;
  revenue: number;
  type: string;
}

interface WorkspaceListViewProps {
  workspaces: Workspace[];
  onToggleStatus: (id: number) => void;
}

const WorkspaceListView: React.FC<WorkspaceListViewProps> = ({ workspaces, onToggleStatus }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'maintenance': return 'text-yellow-600 bg-yellow-50';
      case 'inactive': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />;
      case 'maintenance': return <AlertTriangle className="h-3 w-3 md:h-4 md:w-4" />;
      case 'inactive': return <Clock className="h-3 w-3 md:h-4 md:w-4" />;
      default: return <Activity className="h-3 w-3 md:h-4 md:w-4" />;
    }
  };

  return (
    <Card className="glass-nav border-white/20">
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-deskhive-navy text-base md:text-lg">Workspace Overview</CardTitle>
        <CardDescription className="text-xs md:text-sm">Detailed list view of all workspaces</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 md:space-y-4">
          {workspaces.map((workspace) => (
            <div key={workspace.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 border border-white/20 rounded-lg gap-3">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex-1">
                  <h3 className="font-medium text-deskhive-navy text-sm md:text-base">{workspace.name}</h3>
                  <p className="text-xs md:text-sm text-deskhive-darkgray">{workspace.location} • {workspace.type}</p>
                </div>
                <Badge className={`${getStatusColor(workspace.status)} border-0 text-xs`}>
                  {getStatusIcon(workspace.status)}
                  <span className="ml-1 capitalize">{workspace.status}</span>
                </Badge>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-4 md:gap-6 text-xs md:text-sm">
                <div className="text-center">
                  <p className="text-deskhive-darkgray">Occupancy</p>
                  <p className="font-medium text-deskhive-navy">
                    {workspace.currentOccupancy}/{workspace.capacity}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-deskhive-darkgray">Bookings</p>
                  <p className="font-medium text-deskhive-navy">{workspace.todayBookings}</p>
                </div>
                <div className="text-center">
                  <p className="text-deskhive-darkgray">Revenue</p>
                  <p className="font-medium text-deskhive-navy">₦{workspace.revenue.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <Switch 
                    checked={workspace.status === 'active'}
                    onCheckedChange={() => onToggleStatus(workspace.id)}
                  />
                  <Button variant="outline" size="sm" className="border-deskhive-orange text-deskhive-orange hover:bg-deskhive-orange hover:text-white text-xs">
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkspaceListView;

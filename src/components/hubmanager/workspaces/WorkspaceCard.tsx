
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  MapPin
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

interface WorkspaceCardProps {
  workspace: Workspace;
  onToggleStatus: (id: number) => void;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace, onToggleStatus }) => {
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

  const calculateOccupancyRate = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  return (
    <Card className="glass-nav border-white/20 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2 md:pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-base md:text-lg text-deskhive-navy truncate">{workspace.name}</CardTitle>
            <div className="flex items-center gap-1 text-xs md:text-sm text-deskhive-darkgray mt-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{workspace.location}</span>
            </div>
          </div>
          <Badge className={`${getStatusColor(workspace.status)} border-0 text-xs ml-2`}>
            {getStatusIcon(workspace.status)}
            <span className="ml-1 capitalize hidden sm:inline">{workspace.status}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 md:space-y-4">
        <div className="flex justify-between text-xs md:text-sm">
          <span className="text-deskhive-darkgray">Type:</span>
          <span className="font-medium text-deskhive-navy">{workspace.type}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs md:text-sm">
            <span className="text-deskhive-darkgray">Occupancy:</span>
            <span className="font-medium text-deskhive-navy">
              {workspace.currentOccupancy}/{workspace.capacity} 
              ({calculateOccupancyRate(workspace.currentOccupancy, workspace.capacity)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-deskhive-orange h-2 rounded-full transition-all" 
              style={{ width: `${calculateOccupancyRate(workspace.currentOccupancy, workspace.capacity)}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
          <div>
            <span className="text-deskhive-darkgray">Bookings:</span>
            <p className="font-medium text-deskhive-navy">{workspace.todayBookings}</p>
          </div>
          <div>
            <span className="text-deskhive-darkgray">Checked In:</span>
            <p className="font-medium text-deskhive-navy">{workspace.checkedIn}</p>
          </div>
        </div>

        <div className="flex justify-between text-xs md:text-sm">
          <span className="text-deskhive-darkgray">Monthly Revenue:</span>
          <span className="font-medium text-deskhive-navy">₦{workspace.revenue.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/20">
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-deskhive-darkgray">Available:</span>
            <Switch 
              checked={workspace.status === 'active'}
              onCheckedChange={() => onToggleStatus(workspace.id)}
            />
          </div>
          <Button variant="outline" size="sm" className="border-deskhive-orange text-deskhive-orange hover:bg-deskhive-orange hover:text-white text-xs">
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkspaceCard;

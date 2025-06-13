
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, TrendingUp, Clock } from 'lucide-react';

interface WaitlistMetricsProps {
  isSidebarCollapsed?: boolean;
  stats: {
    totalEntries: number;
    thisMonth: number;
    conversionRate: number;
    avgResponseTime: number;
  };
}

const WaitlistMetrics: React.FC<WaitlistMetricsProps> = ({
  isSidebarCollapsed = false,
  stats
}) => {
  return (
    <div className={`grid gap-2 md:gap-3 ${
      isSidebarCollapsed 
        ? 'grid-cols-2 lg:grid-cols-4' 
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    }`}>
      <Card className="p-3 md:p-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
          <CardTitle className="text-xs md:text-sm font-medium">Total Entries</CardTitle>
          <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 pt-1 md:pt-2">
          <div className="text-lg md:text-2xl font-bold">{stats.totalEntries.toLocaleString()}</div>
          <p className="text-xs text-green-600">+12% from last month</p>
        </CardContent>
      </Card>

      <Card className="p-3 md:p-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
          <CardTitle className="text-xs md:text-sm font-medium">This Month</CardTitle>
          <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 pt-1 md:pt-2">
          <div className="text-lg md:text-2xl font-bold">{stats.thisMonth}</div>
          <p className="text-xs text-green-600">+23% from last month</p>
        </CardContent>
      </Card>

      <Card className="p-3 md:p-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
          <CardTitle className="text-xs md:text-sm font-medium">Conversion Rate</CardTitle>
          <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 pt-1 md:pt-2">
          <div className="text-lg md:text-2xl font-bold">{stats.conversionRate}%</div>
          <p className="text-xs text-green-600">+3.2% from last month</p>
        </CardContent>
      </Card>

      <Card className="p-3 md:p-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
          <CardTitle className="text-xs md:text-sm font-medium">Avg Response Time</CardTitle>
          <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 pt-1 md:pt-2">
          <div className="text-lg md:text-2xl font-bold">{stats.avgResponseTime}d</div>
          <p className="text-xs text-red-600">+0.3d from last month</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistMetrics;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Eye, TrendingUp, Users } from 'lucide-react';

interface EmailMetricsProps {
  isSidebarCollapsed?: boolean;
  stats: {
    totalSent: number;
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
  };
}

const EmailMetrics: React.FC<EmailMetricsProps> = ({
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
          <CardTitle className="text-xs md:text-sm font-medium">Total Sent</CardTitle>
          <Mail className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 pt-1 md:pt-2">
          <div className="text-lg md:text-2xl font-bold">{stats.totalSent.toLocaleString()}</div>
          <p className="text-xs text-green-600">+18% from last month</p>
        </CardContent>
      </Card>

      <Card className="p-3 md:p-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
          <CardTitle className="text-xs md:text-sm font-medium">Open Rate</CardTitle>
          <Eye className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 pt-1 md:pt-2">
          <div className="text-lg md:text-2xl font-bold">{stats.openRate}%</div>
          <p className="text-xs text-green-600">+2.1% from last month</p>
        </CardContent>
      </Card>

      <Card className="p-3 md:p-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
          <CardTitle className="text-xs md:text-sm font-medium">Click Rate</CardTitle>
          <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 pt-1 md:pt-2">
          <div className="text-lg md:text-2xl font-bold">{stats.clickRate}%</div>
          <p className="text-xs text-red-600">-0.3% from last month</p>
        </CardContent>
      </Card>

      <Card className="p-3 md:p-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
          <CardTitle className="text-xs md:text-sm font-medium">Unsubscribe Rate</CardTitle>
          <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 pt-1 md:pt-2">
          <div className="text-lg md:text-2xl font-bold">{stats.unsubscribeRate}%</div>
          <p className="text-xs text-green-600">-0.1% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailMetrics;

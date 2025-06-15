
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Users, Building2 } from 'lucide-react';

interface RevenueMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface RevenueOverviewProps {
  isSidebarCollapsed?: boolean;
}

const RevenueOverview: React.FC<RevenueOverviewProps> = ({ isSidebarCollapsed = false }) => {
  const revenueMetrics: RevenueMetric[] = [
    {
      title: 'Total Revenue',
      value: '₦2,450,000',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '₦890,000',
      change: '+8.2%',
      trend: 'up',
      icon: <Calendar className="h-4 w-4" />
    },
    {
      title: 'Average Revenue Per User',
      value: '₦15,600',
      change: '-2.1%',
      trend: 'down',
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'Revenue Per Workspace',
      value: '₦125,000',
      change: '+15.3%',
      trend: 'up',
      icon: <Building2 className="h-4 w-4" />
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Revenue Overview</h2>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          This Month
        </Badge>
      </div>
      
      <div className={`grid gap-4 ${
        isSidebarCollapsed 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
          : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
      }`}>
        {revenueMetrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <div className="text-gray-400">
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>
              <div className="flex items-center space-x-1">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={`text-xs ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RevenueOverview;

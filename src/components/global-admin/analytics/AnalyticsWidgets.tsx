
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, Building2, Calendar, CreditCard, MapPin, Clock } from 'lucide-react';

interface AnalyticsData {
  totalOrganizations: number;
  totalUsers: number;
  totalBookings: number;
  activeOrganizations: number;
  revenue: number;
  averageBookingDuration: number;
  topLocation: string;
  growth: {
    organizations: number;
    users: number;
    bookings: number;
    revenue: number;
  };
}

interface AnalyticsWidgetsProps {
  data: AnalyticsData;
  isLoading?: boolean;
}

const AnalyticsWidgets: React.FC<AnalyticsWidgetsProps> = ({ data, isLoading = false }) => {
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;
  const formatPercentage = (value: number) => `${value > 0 ? '+' : ''}${value}%`;

  const widgets = [
    {
      title: 'Total Organizations',
      value: data.totalOrganizations,
      growth: data.growth.organizations,
      icon: Building2,
      color: 'text-blue-600'
    },
    {
      title: 'Total Users',
      value: data.totalUsers,
      growth: data.growth.users,
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Active Organizations',
      value: data.activeOrganizations,
      growth: 0,
      icon: Building2,
      color: 'text-purple-600'
    },
    {
      title: 'Total Bookings',
      value: data.totalBookings,
      growth: data.growth.bookings,
      icon: Calendar,
      color: 'text-orange-600'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(data.revenue),
      growth: data.growth.revenue,
      icon: CreditCard,
      color: 'text-emerald-600'
    },
    {
      title: 'Avg Booking Duration',
      value: `${data.averageBookingDuration}h`,
      growth: 0,
      icon: Clock,
      color: 'text-indigo-600'
    },
    {
      title: 'Top Location',
      value: data.topLocation,
      growth: 0,
      icon: MapPin,
      color: 'text-red-600'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
      {widgets.map((widget, index) => {
        const Icon = widget.icon;
        const hasGrowth = widget.growth !== 0;
        const isPositiveGrowth = widget.growth > 0;

        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {widget.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${widget.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">
                {typeof widget.value === 'number' ? widget.value.toLocaleString() : widget.value}
              </div>
              {hasGrowth && (
                <div className="flex items-center text-xs">
                  {isPositiveGrowth ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <Badge
                    variant={isPositiveGrowth ? "default" : "destructive"}
                    className="text-xs px-1 py-0"
                  >
                    {formatPercentage(widget.growth)}
                  </Badge>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AnalyticsWidgets;

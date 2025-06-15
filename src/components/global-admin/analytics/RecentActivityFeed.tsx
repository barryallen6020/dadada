
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building2, User, Calendar, CreditCard, AlertTriangle, CheckCircle, UserPlus, UserMinus } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'organization' | 'user' | 'booking' | 'payment' | 'system' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  actor?: string;
  metadata?: Record<string, any>;
}

interface RecentActivityFeedProps {
  isLoading?: boolean;
}

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ isLoading = false }) => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'organization',
      title: 'New Organization Registered',
      description: 'TechHub Lagos has been approved and activated',
      timestamp: '2 minutes ago',
      actor: 'System',
      metadata: { organizationId: 'org_123' }
    },
    {
      id: '2',
      type: 'user',
      title: 'Bulk User Registration',
      description: '25 new users joined StartupHub organization',
      timestamp: '15 minutes ago',
      actor: 'Admin',
      metadata: { count: 25, organizationId: 'org_456' }
    },
    {
      id: '3',
      type: 'booking',
      title: 'High Booking Volume',
      description: '150+ bookings created in the last hour',
      timestamp: '32 minutes ago',
      actor: 'System',
      metadata: { count: 150 }
    },
    {
      id: '4',
      type: 'payment',
      title: 'Payment Processing Issue',
      description: 'Failed payment for ConsultFirm subscription',
      timestamp: '1 hour ago',
      actor: 'Payment Gateway',
      metadata: { amount: 50000, organizationId: 'org_789' }
    },
    {
      id: '5',
      type: 'system',
      title: 'System Maintenance',
      description: 'Database optimization completed successfully',
      timestamp: '2 hours ago',
      actor: 'DevOps',
      metadata: { duration: '45 minutes' }
    },
    {
      id: '6',
      type: 'alert',
      title: 'Security Alert',
      description: 'Multiple failed login attempts detected',
      timestamp: '3 hours ago',
      actor: 'Security System',
      metadata: { attempts: 12, ipAddress: '192.168.1.100' }
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'organization':
        return Building2;
      case 'user':
        return User;
      case 'booking':
        return Calendar;
      case 'payment':
        return CreditCard;
      case 'system':
        return CheckCircle;
      case 'alert':
        return AlertTriangle;
      default:
        return CheckCircle;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'organization':
        return 'text-blue-600';
      case 'user':
        return 'text-green-600';
      case 'booking':
        return 'text-purple-600';
      case 'payment':
        return 'text-orange-600';
      case 'system':
        return 'text-gray-600';
      case 'alert':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'organization':
        return <Badge className="bg-blue-100 text-blue-800">Organization</Badge>;
      case 'user':
        return <Badge className="bg-green-100 text-green-800">User</Badge>;
      case 'booking':
        return <Badge className="bg-purple-100 text-purple-800">Booking</Badge>;
      case 'payment':
        return <Badge className="bg-orange-100 text-orange-800">Payment</Badge>;
      case 'system':
        return <Badge className="bg-gray-100 text-gray-800">System</Badge>;
      case 'alert':
        return <Badge className="bg-red-100 text-red-800">Alert</Badge>;
      default:
        return <Badge variant="secondary">Activity</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="animate-pulse h-6 bg-gray-200 rounded w-1/3"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-start gap-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);

            return (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0">
                <div className={`p-2 rounded-full bg-gray-50 ${getActivityColor(activity.type)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    {getActivityBadge(activity.type)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{activity.timestamp}</span>
                    {activity.actor && (
                      <>
                        <span>•</span>
                        <span>by {activity.actor}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityFeed;

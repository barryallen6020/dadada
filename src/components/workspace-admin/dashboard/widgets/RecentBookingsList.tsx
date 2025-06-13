
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal } from 'lucide-react';

const recentBookings = [
  {
    id: 'BK001',
    user: 'Alice Johnson',
    workspace: 'Downtown Hub',
    date: '2024-01-15',
    time: '09:00 - 17:00',
    status: 'confirmed',
    amount: '$45.00'
  },
  {
    id: 'BK002',
    user: 'Bob Smith',
    workspace: 'Tech Center',
    date: '2024-01-15',
    time: '14:00 - 18:00',
    status: 'pending',
    amount: '$28.00'
  },
  {
    id: 'BK003',
    user: 'Carol Brown',
    workspace: 'Creative Space',
    date: '2024-01-14',
    time: '10:00 - 16:00',
    status: 'cancelled',
    amount: '$38.00'
  },
  {
    id: 'BK004',
    user: 'David Wilson',
    workspace: 'Downtown Hub',
    date: '2024-01-14',
    time: '08:00 - 12:00',
    status: 'confirmed',
    amount: '$25.00'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const RecentBookingsList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>Latest booking activity across all workspaces</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium">{booking.user}</p>
                    <p className="text-sm text-gray-500">{booking.workspace}</p>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <span>{booking.date} • {booking.time}</span>
                  <span className="ml-4 font-medium">{booking.amount}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline">View All Bookings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

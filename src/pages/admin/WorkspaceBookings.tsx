
import React, { useState } from 'react';
import WorkspaceAdminLayout from '@/components/workspace-admin/WorkspaceAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Calendar, Search, Filter, Download, Eye } from 'lucide-react';

const WorkspaceBookings = () => {
  const [bookings] = useState([
    {
      id: 'BK001',
      user: 'John Doe',
      email: 'john@example.com',
      workspace: 'Conference Room A',
      date: '2024-01-15',
      time: '09:00 - 11:00',
      status: 'confirmed',
      amount: '$50'
    },
    {
      id: 'BK002',
      user: 'Jane Smith',
      email: 'jane@example.com',
      workspace: 'Open Workspace',
      date: '2024-01-15',
      time: '14:00 - 17:00',
      status: 'pending',
      amount: '$75'
    },
    {
      id: 'BK003',
      user: 'Mike Johnson',
      email: 'mike@example.com',
      workspace: 'Phone Booth 1',
      date: '2024-01-15',
      time: '10:30 - 11:30',
      status: 'cancelled',
      amount: '$25'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: 'default',
      pending: 'secondary',
      cancelled: 'destructive'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  return (
    <WorkspaceAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Booking Management</h1>
            <p className="text-muted-foreground">Monitor and manage workspace bookings</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search bookings..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest workspace reservations and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Workspace</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.user}</p>
                            <p className="text-sm text-gray-500">{booking.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{booking.workspace}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.date}</p>
                            <p className="text-sm text-gray-500">{booking.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{booking.amount}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Bookings</CardTitle>
                <CardDescription>Bookings scheduled for today</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Filter implementation for today's bookings
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Future workspace reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Filter implementation for upcoming bookings
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Bookings</CardTitle>
                <CardDescription>Bookings awaiting confirmation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Filter implementation for pending bookings
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </WorkspaceAdminLayout>
  );
};

export default WorkspaceBookings;

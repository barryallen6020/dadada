
import React, { useState } from 'react';
import HubManagerLayout from '@/components/layout/HubManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Filter,
  Download,
  Eye
} from 'lucide-react';

const HubManagerBookings = () => {
  const [selectedBookings, setSelectedBookings] = useState<number[]>([]);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      user: { name: 'John Doe', email: 'john@example.com', avatar: null },
      workspace: 'Creative Studio',
      date: '2024-06-08',
      time: '09:00 - 17:00',
      seats: 2,
      duration: '8 hours',
      priority: 'high',
      status: 'pending',
      requestTime: '2 hours ago',
      amount: 12000
    },
    {
      id: 2,
      user: { name: 'Sarah Wilson', email: 'sarah@example.com', avatar: null },
      workspace: 'Tech Hub',
      date: '2024-06-08',
      time: '10:00 - 14:00',
      seats: 1,
      duration: '4 hours',
      priority: 'medium',
      status: 'pending',
      requestTime: '3 hours ago',
      amount: 6000
    },
    {
      id: 3,
      user: { name: 'Mike Johnson', email: 'mike@example.com', avatar: null },
      workspace: 'Meeting Room Alpha',
      date: '2024-06-09',
      time: '14:00 - 16:00',
      seats: 6,
      duration: '2 hours',
      priority: 'urgent',
      status: 'pending',
      requestTime: '30 minutes ago',
      amount: 15000
    },
    {
      id: 4,
      user: { name: 'Emily Davis', email: 'emily@example.com', avatar: null },
      workspace: 'Quiet Zone',
      date: '2024-06-08',
      time: '13:00 - 17:00',
      seats: 1,
      duration: '4 hours',
      priority: 'low',
      status: 'approved',
      requestTime: '1 day ago',
      amount: 4800
    },
    {
      id: 5,
      user: { name: 'David Brown', email: 'david@example.com', avatar: null },
      workspace: 'Creative Studio',
      date: '2024-06-07',
      time: '09:00 - 12:00',
      seats: 3,
      duration: '3 hours',
      priority: 'medium',
      status: 'rejected',
      requestTime: '2 days ago',
      amount: 9000
    }
  ]);

  const handleBookingAction = (bookingId: number, action: 'approve' | 'reject') => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: action === 'approve' ? 'approved' : 'rejected' }
        : booking
    ));
  };

  const handleBulkAction = (action: 'approve' | 'reject') => {
    if (selectedBookings.length === 0) return;
    
    setBookings(prev => prev.map(booking => 
      selectedBookings.includes(booking.id)
        ? { ...booking, status: action === 'approve' ? 'approved' : 'rejected' }
        : booking
    ));
    
    setSelectedBookings([]);
  };

  const toggleBookingSelection = (bookingId: number) => {
    setSelectedBookings(prev => 
      prev.includes(bookingId)
        ? prev.filter(id => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const approvedBookings = bookings.filter(b => b.status === 'approved');
  const rejectedBookings = bookings.filter(b => b.status === 'rejected');

  return (
    <HubManagerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-deskhive-navy">Booking Queue & Approvals</h1>
            <p className="text-deskhive-darkgray">Manage booking requests across all hub workspaces</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-deskhive-navy text-deskhive-navy">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-deskhive-navy text-deskhive-navy">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingBookings.length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Approved Today</p>
                  <p className="text-2xl font-bold text-green-600">{approvedBookings.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{rejectedBookings.length}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Revenue Pending</p>
                  <p className="text-2xl font-bold text-deskhive-orange">
                    ₦{pendingBookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-deskhive-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bulk Actions */}
        {selectedBookings.length > 0 && (
          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-deskhive-darkgray">
                  {selectedBookings.length} booking(s) selected
                </span>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleBulkAction('approve')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve All
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleBulkAction('reject')}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Booking Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="glass-nav border-white/20">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Approved ({approvedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Rejected ({rejectedBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <Card className="glass-nav border-white/20">
              <CardHeader>
                <CardTitle className="text-deskhive-navy">Priority Queue</CardTitle>
                <CardDescription>Bookings requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingBookings
                    .sort((a, b) => {
                      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
                      return priorityOrder[b.priority] - priorityOrder[a.priority];
                    })
                    .map((booking) => (
                    <div key={booking.id} className="flex items-center gap-4 p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                      <Checkbox 
                        checked={selectedBookings.includes(booking.id)}
                        onCheckedChange={() => toggleBookingSelection(booking.id)}
                      />
                      
                      <div className="flex items-center gap-3 flex-1">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-deskhive-orange text-white">
                            {booking.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-deskhive-navy">{booking.user.name}</h3>
                            <Badge className={`${getPriorityColor(booking.priority)} text-xs`}>
                              {booking.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-deskhive-darkgray">{booking.user.email}</p>
                          <div className="flex items-center gap-4 text-xs text-deskhive-darkgray mt-1">
                            <span>{booking.workspace}</span>
                            <span>{booking.date}</span>
                            <span>{booking.time}</span>
                            <span>{booking.seats} seat(s)</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-medium text-deskhive-navy">₦{booking.amount.toLocaleString()}</p>
                        <p className="text-xs text-deskhive-darkgray">{booking.requestTime}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-deskhive-navy text-deskhive-navy"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleBookingAction(booking.id, 'approve')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleBookingAction(booking.id, 'reject')}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            <Card className="glass-nav border-white/20">
              <CardHeader>
                <CardTitle className="text-deskhive-navy">Approved Bookings</CardTitle>
                <CardDescription>Successfully approved booking requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border border-white/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-green-600 text-white">
                            {booking.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-deskhive-navy">{booking.user.name}</h3>
                            <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                              APPROVED
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-deskhive-darkgray">
                            <span>{booking.workspace}</span>
                            <span>{booking.date}</span>
                            <span>{booking.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-deskhive-navy">₦{booking.amount.toLocaleString()}</p>
                        <p className="text-xs text-deskhive-darkgray">{booking.requestTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            <Card className="glass-nav border-white/20">
              <CardHeader>
                <CardTitle className="text-deskhive-navy">Rejected Bookings</CardTitle>
                <CardDescription>Declined booking requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rejectedBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border border-white/20 rounded-lg opacity-75">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-red-600 text-white">
                            {booking.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-deskhive-navy">{booking.user.name}</h3>
                            <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                              REJECTED
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-deskhive-darkgray">
                            <span>{booking.workspace}</span>
                            <span>{booking.date}</span>
                            <span>{booking.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-deskhive-navy">₦{booking.amount.toLocaleString()}</p>
                        <p className="text-xs text-deskhive-darkgray">{booking.requestTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </HubManagerLayout>
  );
};

export default HubManagerBookings;

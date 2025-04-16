
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  User,
  Building,
  BarChart3
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample bookings data
const bookingsData = [
  {
    id: "b-001",
    user: "John Doe",
    email: "john.doe@example.com",
    hub: "RALNO HUB AKOWONJO",
    workspace: "Meeting Room A",
    date: "2023-09-28",
    startTime: "09:00",
    endTime: "12:00",
    status: "approved",
    paymentStatus: "paid",
    amount: 15000
  },
  {
    id: "b-002",
    user: "Jane Smith",
    email: "jane.smith@example.com",
    hub: "Workbay Ajah",
    workspace: "Hot Desk 5",
    date: "2023-09-28",
    startTime: "10:00",
    endTime: "16:00",
    status: "approved",
    paymentStatus: "paid",
    amount: 9000
  },
  {
    id: "b-003",
    user: "Michael Brown",
    email: "michael.b@example.com",
    hub: "Costain Hub 4th Floor (n)",
    workspace: "Private Office 2",
    date: "2023-09-29",
    startTime: "08:00",
    endTime: "17:00",
    status: "pending",
    paymentStatus: "unpaid",
    amount: 31500
  },
  {
    id: "b-004",
    user: "Sarah Johnson",
    email: "sarah.j@example.com",
    hub: "Costain Hub 5th Floor",
    workspace: "Event Space",
    date: "2023-09-30",
    startTime: "13:00",
    endTime: "18:00",
    status: "approved",
    paymentStatus: "paid",
    amount: 50000
  },
  {
    id: "b-005",
    user: "David Wilson",
    email: "david.w@example.com",
    hub: "RALNO HUB AKOWONJO",
    workspace: "Hot Desk 3",
    date: "2023-10-01",
    startTime: "09:00",
    endTime: "13:00",
    status: "cancelled",
    paymentStatus: "refunded",
    amount: 6000
  },
  {
    id: "b-006",
    user: "Emma Watson",
    email: "emma.w@example.com",
    hub: "Workbay Ajah",
    workspace: "Meeting Room B",
    date: "2023-10-02",
    startTime: "14:00",
    endTime: "16:00",
    status: "pending",
    paymentStatus: "unpaid",
    amount: 10000
  }
];

const AdminBookings = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bookings, setBookings] = useState(bookingsData);
  
  // Calculate total revenue
  const totalRevenue = bookings
    .filter(b => b.paymentStatus === 'paid')
    .reduce((sum, booking) => sum + booking.amount, 0);
  
  // Get bookings for today
  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(b => b.date === today);
  
  // Filter bookings based on search and status filter
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.hub.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.workspace.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const approveBooking = (id: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id 
        ? { ...booking, status: "approved" } 
        : booking
    ));
    
    toast({
      title: "Booking approved",
      description: "The booking has been approved successfully.",
    });
  };
  
  const cancelBooking = (id: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id 
        ? { ...booking, status: "cancelled" } 
        : booking
    ));
    
    toast({
      title: "Booking cancelled",
      description: "The booking has been cancelled successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto pb-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Booking Management</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            View and manage all hub bookings across locations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart3 className="h-10 w-10 text-deskhive-orange p-2 bg-deskhive-orange/20 rounded-full mr-3" />
                <div>
                  <div className="text-3xl font-bold text-deskhive-navy">₦{totalRevenue.toLocaleString()}</div>
                  <p className="text-sm text-deskhive-darkgray/70">
                    From {bookings.filter(b => b.paymentStatus === 'paid').length} paid bookings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-10 w-10 text-amber-500 p-2 bg-amber-500/20 rounded-full mr-3" />
                <div>
                  <div className="text-3xl font-bold text-deskhive-navy">
                    {bookings.filter(b => b.status === 'pending').length}
                  </div>
                  <p className="text-sm text-deskhive-darkgray/70">
                    Awaiting approval
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Today's Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-10 w-10 text-green-500 p-2 bg-green-500/20 rounded-full mr-3" />
                <div>
                  <div className="text-3xl font-bold text-deskhive-navy">
                    {todayBookings.length}
                  </div>
                  <p className="text-sm text-deskhive-darkgray/70">
                    Bookings for today
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deskhive-darkgray/70 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search bookings by user, hub, or workspace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/30 backdrop-blur-sm border-white/30 focus-visible:ring-deskhive-navy w-full"
              />
            </div>
            <div className="w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-white/30 backdrop-blur-sm border-white/30">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All bookings</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
        
        <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30 overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              All Bookings
            </CardTitle>
            <CardDescription>
              View and manage booking requests across all hubs
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/10 hover:bg-white/20">
                    <TableHead>User</TableHead>
                    <TableHead>Hub</TableHead>
                    <TableHead>Workspace</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-white/10">
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{booking.user}</span>
                          <span className="text-xs text-deskhive-darkgray/70">{booking.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>{booking.hub}</TableCell>
                      <TableCell>{booking.workspace}</TableCell>
                      <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                      <TableCell>{booking.startTime} - {booking.endTime}</TableCell>
                      <TableCell>₦{booking.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            booking.status === 'approved' ? 'default' : 
                            booking.status === 'pending' ? 'outline' : 'destructive'
                          }
                          className="capitalize"
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => approveBooking(booking.id)}
                              >
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => cancelBooking(booking.id)}
                              >
                                <XCircle className="h-4 w-4 text-red-500" />
                              </Button>
                            </>
                          )}
                          {booking.status === 'approved' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => cancelBooking(booking.id)}
                            >
                              <XCircle className="h-4 w-4 text-red-500" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminBookings;

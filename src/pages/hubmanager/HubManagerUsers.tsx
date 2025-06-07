
import React, { useState } from 'react';
import HubManagerLayout from '@/components/layout/HubManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  UserPlus, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Mail,
  Phone,
  Shield,
  Edit,
  Trash2,
  Search,
  Filter
} from 'lucide-react';

const HubManagerUsers = () => {
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@deskhive.com',
      phone: '+234 123 456 7890',
      role: 'HUB_STAFF',
      status: 'active',
      joinDate: '2024-01-15',
      permissions: ['check-in', 'support'],
      avatar: null
    },
    {
      id: 2,
      name: 'Bob Williams',
      email: 'bob@deskhive.com',
      phone: '+234 123 456 7891',
      role: 'HUB_SUPPORT',
      status: 'active',
      joinDate: '2024-02-20',
      permissions: ['support'],
      avatar: null
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@deskhive.com',
      phone: '+234 123 456 7892',
      role: 'HUB_STAFF',
      status: 'inactive',
      joinDate: '2024-03-10',
      permissions: ['check-in', 'maintenance'],
      avatar: null
    }
  ]);

  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: 'Wi-Fi connectivity issues',
      description: 'Unable to connect to the network in workspace A',
      user: 'John Doe',
      email: 'john@example.com',
      workspace: 'Creative Studio',
      priority: 'high',
      status: 'open',
      assignedTo: 'Alice Johnson',
      createdAt: '2024-06-08 09:30',
      updatedAt: '2024-06-08 10:15'
    },
    {
      id: 2,
      title: 'Chair needs replacement',
      description: 'Broken chair at seat B12',
      user: 'Sarah Wilson',
      email: 'sarah@example.com',
      workspace: 'Tech Hub',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'Bob Williams',
      createdAt: '2024-06-07 14:20',
      updatedAt: '2024-06-08 08:45'
    },
    {
      id: 3,
      title: 'AC not working properly',
      description: 'Temperature too high in meeting room',
      user: 'Mike Johnson',
      email: 'mike@example.com',
      workspace: 'Meeting Room Alpha',
      priority: 'urgent',
      status: 'open',
      assignedTo: null,
      createdAt: '2024-06-08 11:00',
      updatedAt: '2024-06-08 11:00'
    },
    {
      id: 4,
      title: 'Projector not working',
      description: 'Display issues with main projector',
      user: 'Emily Davis',
      email: 'emily@example.com',
      workspace: 'Meeting Room Alpha',
      priority: 'medium',
      status: 'closed',
      assignedTo: 'Alice Johnson',
      createdAt: '2024-06-06 16:30',
      updatedAt: '2024-06-07 09:15'
    }
  ]);

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'HUB_STAFF',
    permissions: [] as string[]
  });

  const handleAddStaff = () => {
    const staffMember = {
      id: staff.length + 1,
      ...newStaff,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      avatar: null
    };
    
    setStaff(prev => [...prev, staffMember]);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      role: 'HUB_STAFF',
      permissions: []
    });
    setIsAddStaffModalOpen(false);
  };

  const updateTicketStatus = (ticketId: number, status: string, assignedTo?: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            status, 
            ...(assignedTo !== undefined && { assignedTo }),
            updatedAt: new Date().toLocaleString()
          }
        : ticket
    ));
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
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const closedTickets = tickets.filter(t => t.status === 'closed').length;
  const activeStaff = staff.filter(s => s.status === 'active').length;

  return (
    <HubManagerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-deskhive-navy">User Management & Support</h1>
            <p className="text-deskhive-darkgray">Manage hub staff and handle support tickets</p>
          </div>
          <Dialog open={isAddStaffModalOpen} onOpenChange={setIsAddStaffModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-deskhive-orange hover:bg-deskhive-orange/90">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Staff Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Staff Member</DialogTitle>
                <DialogDescription>
                  Add a new staff member to your hub team
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newStaff.role} onValueChange={(value) => setNewStaff(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HUB_STAFF">Hub Staff</SelectItem>
                      <SelectItem value="HUB_SUPPORT">Hub Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddStaff}>Add Staff Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Active Staff</p>
                  <p className="text-2xl font-bold text-green-600">{activeStaff}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Open Tickets</p>
                  <p className="text-2xl font-bold text-red-600">{openTickets}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">{inProgressTickets}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Resolved Today</p>
                  <p className="text-2xl font-bold text-green-600">{closedTickets}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="staff" className="space-y-4">
          <TabsList className="glass-nav border-white/20">
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Staff Management
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Support Tickets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="staff" className="space-y-4">
            <Card className="glass-nav border-white/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-deskhive-navy">Staff Members</CardTitle>
                    <CardDescription>Manage your hub team and their permissions</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search staff..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staff
                    .filter(member => 
                      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      member.email.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-deskhive-orange text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-deskhive-navy">{member.name}</h3>
                            <Badge className={`${getStatusColor(member.status)} text-xs`}>
                              {member.status.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {member.role.replace('HUB_', '')}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-deskhive-darkgray">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {member.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {member.phone}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Shield className="h-3 w-3 text-deskhive-darkgray" />
                            <span className="text-xs text-deskhive-darkgray">
                              Permissions: {member.permissions.join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-deskhive-darkgray">
                          Joined {member.joinDate}
                        </span>
                        <Button size="sm" variant="outline" className="border-deskhive-navy text-deskhive-navy">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4">
            <Card className="glass-nav border-white/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-deskhive-navy">Support Tickets</CardTitle>
                    <CardDescription>Manage user support requests and issues</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-deskhive-navy text-deskhive-navy">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-deskhive-navy">{ticket.title}</h3>
                            <Badge className={`${getPriorityColor(ticket.priority)} text-xs`}>
                              {ticket.priority.toUpperCase()}
                            </Badge>
                            <Badge className={`${getStatusColor(ticket.status)} text-xs`}>
                              {ticket.status.replace('-', ' ').toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-deskhive-darkgray mb-2">{ticket.description}</p>
                          <div className="flex items-center gap-4 text-xs text-deskhive-darkgray">
                            <span>User: {ticket.user} ({ticket.email})</span>
                            <span>Workspace: {ticket.workspace}</span>
                            <span>Created: {ticket.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-white/20">
                        <div className="text-xs text-deskhive-darkgray">
                          {ticket.assignedTo ? (
                            <span>Assigned to: <strong>{ticket.assignedTo}</strong></span>
                          ) : (
                            <span>Unassigned</span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          {ticket.status === 'open' && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-yellow-600 hover:bg-yellow-700"
                                onClick={() => updateTicketStatus(ticket.id, 'in-progress', staff[0].name)}
                              >
                                Assign & Start
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => updateTicketStatus(ticket.id, 'closed')}
                              >
                                Resolve
                              </Button>
                            </>
                          )}
                          {ticket.status === 'in-progress' && (
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => updateTicketStatus(ticket.id, 'closed')}
                            >
                              Mark Resolved
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="border-deskhive-navy text-deskhive-navy">
                            View Details
                          </Button>
                        </div>
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

export default HubManagerUsers;

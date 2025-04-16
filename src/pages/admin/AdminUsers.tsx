import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  CheckCircle,
  XCircle,
  Mail,
  UserPlus,
  Shield,
  UserX
} from "lucide-react";

// Sample data for users
const initialUsers = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    role: 'member',
    status: 'active',
    preferredHub: 'RALNO HUB AKOWONJO',
    joinDate: '2023-05-12',
    lastLogin: '2023-09-28'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    role: 'member',
    status: 'active',
    preferredHub: 'Workbay Ajah',
    joinDate: '2023-06-15',
    lastLogin: '2023-09-27'
  },
  { 
    id: '3', 
    name: 'Michael Brown', 
    email: 'michael.b@example.com', 
    role: 'hub_manager',
    status: 'active',
    preferredHub: 'Costain Hub 4th Floor (n)',
    joinDate: '2023-01-05',
    lastLogin: '2023-09-28'
  },
  { 
    id: '4', 
    name: 'Sarah Johnson', 
    email: 'sarah.j@example.com', 
    role: 'hub_manager',
    status: 'active',
    preferredHub: 'Costain Hub 5th Floor',
    joinDate: '2023-03-18',
    lastLogin: '2023-09-26'
  },
  { 
    id: '5', 
    name: 'David Wilson', 
    email: 'david.w@example.com', 
    role: 'member',
    status: 'inactive',
    preferredHub: 'RALNO HUB AKOWONJO',
    joinDate: '2023-07-22',
    lastLogin: '2023-08-15'
  },
  { 
    id: '6', 
    name: 'Emma Watson', 
    email: 'emma.w@example.com', 
    role: 'member',
    status: 'pending',
    preferredHub: 'Workbay Ajah',
    joinDate: '2023-09-05',
    lastLogin: null
  }
];

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole ? user.role === filterRole : true;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = () => {
    toast({
      title: "Create new user",
      description: "Opening user creation form...",
    });
    // In a real app, this would open a form to create a new user
  };

  const handleActivateUser = (id: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: 'active' } : user
    ));
    
    toast({
      title: "User activated",
      description: "User account has been activated successfully.",
    });
  };

  const handleDeactivateUser = (id: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: 'inactive' } : user
    ));
    
    toast({
      title: "User deactivated",
      description: "User account has been deactivated successfully.",
    });
  };

  const handleSendInvite = (email: string) => {
    toast({
      title: "Invitation sent",
      description: `An invitation email has been sent to ${email}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto pb-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Member Management</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Manage members and approve new account requests
          </p>
        </div>

        <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deskhive-darkgray/70 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/30 backdrop-blur-sm border-white/30 focus-visible:ring-deskhive-navy"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="bg-white/40 border-white/30"
                onClick={() => setFilterRole(filterRole === 'member' ? null : 'member')}
              >
                <Users className="h-4 w-4 mr-2" />
                {filterRole === 'member' ? 'All Members' : 'Members Only'}
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/40 border-white/30"
                onClick={() => setFilterRole(filterRole === 'hub_manager' ? null : 'hub_manager')}
              >
                <Shield className="h-4 w-4 mr-2" />
                {filterRole === 'hub_manager' ? 'All Members' : 'Hub Managers'}
              </Button>
            </div>
            <Button onClick={handleCreateUser} className="bg-deskhive-navy hover:bg-deskhive-navy/90 w-full sm:w-auto">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
        </Card>

        <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30 overflow-hidden mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center">
              <Users className="h-5 w-5 mr-2" />
              All Members
            </CardTitle>
            <CardDescription>
              Manage all member accounts in the DeskHive platform
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/10 hover:bg-white/20">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Preferred Hub</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-white/10">
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'hub_manager' ? 'outline' : 'secondary'} className="capitalize">
                          {user.role === 'hub_manager' ? 'Hub Manager' : 'Member'}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.preferredHub}</TableCell>
                      <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            user.status === 'active' ? 'default' : 
                            user.status === 'pending' ? 'outline' : 'destructive'
                          }
                          className="capitalize"
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          {user.status === 'pending' ? (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleActivateUser(user.id)}
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                          ) : user.status === 'active' ? (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleDeactivateUser(user.id)}
                            >
                              <UserX className="h-4 w-4 text-red-500" />
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleActivateUser(user.id)}
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleSendInvite(user.email)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardHeader>
              <CardTitle className="text-lg">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-deskhive-navy">{users.length}</div>
              <p className="text-sm text-deskhive-darkgray/70 mt-1">
                {users.filter(u => u.status === 'active').length} active users
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardHeader>
              <CardTitle className="text-lg">Hub Managers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-deskhive-navy">
                {users.filter(u => u.role === 'hub_manager').length}
              </div>
              <p className="text-sm text-deskhive-darkgray/70 mt-1">
                Managing {4} hubs
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardHeader>
              <CardTitle className="text-lg">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-deskhive-orange">
                {users.filter(u => u.status === 'pending').length}
              </div>
              <p className="text-sm text-deskhive-darkgray/70 mt-1">
                Users awaiting approval
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;

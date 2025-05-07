import React, { useState, useEffect } from "react";
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
  UserX,
  Inbox
} from "lucide-react";
import AddMemberModal from "@/components/admin/AddMemberModal";
import UserTableSkeleton from "@/components/admin/UserTableSkeleton";
import userManagementService, { User, UserStats } from "@/services/userManagementService";

const EmptyState = () => (
  <div className="text-center py-12">
    <Inbox className="h-12 w-12 mx-auto text-deskhive-darkgray/40 mb-4" />
    <h3 className="text-xl font-medium text-deskhive-navy mb-2">No Members Found</h3>
    <p className="text-deskhive-darkgray/80 mb-6">
      There are no members matching your search criteria.
    </p>
  </div>
);

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    hubManagers: 0,
    pendingApprovals: 0
  });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const [fetchedUsers, userStats] = await Promise.all([
        userManagementService.getOrganizationUsers(),
        userManagementService.getUserStats()
      ]);
      setUsers(fetchedUsers);
      setStats(userStats);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // const filteredUsers = users.filter(user => {
  //   const matchesSearch = 
  //     user?.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user?.user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user?.user.email.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesRole = filterRole ? user?.role === filterRole : true;
  //   return matchesSearch && matchesRole;
  // });

  // const [allUsers, setUsers ] = useState<any[]>([]);

  const handleAddMember = async (memberData: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    preferredHub: string;
  }) => {
    try {
      await userManagementService.addMember(memberData);
      await userManagementService.sendInvitation(memberData.email);
      await fetchUsers(); // Refresh the user list
      toast({
        title: "Member added",
        description: "New member has been added and invited successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add member. Please try again.",
        variant: "destructive",
      });
      throw error; // Re-throw to be handled by the modal
    }
  };

  const handleActivateUser = async (userId: string) => {
    try {
      await userManagementService.updateMember(userId, { status: 'active' });
      await fetchUsers();
      toast({
        title: "User activated",
        description: "User account has been activated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to activate user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeactivateUser = async (userId: string) => {
    try {
      await userManagementService.updateMember(userId, { status: 'inactive' });
      await fetchUsers();
      toast({
        title: "User deactivated",
        description: "User account has been deactivated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deactivate user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSendInvite = async (email: string) => {
    try {
      await userManagementService.sendInvitation(email);
      toast({
        title: "Invitation sent",
        description: `An invitation email has been sent to ${email}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    }
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
            <Button onClick={() => setShowAddMemberModal(true)} className="bg-deskhive-navy hover:bg-deskhive-navy/90 w-full sm:w-auto">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Hub Manager
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
              {isLoading ? (
                <UserTableSkeleton />
              ) : users.length === 0 ? (
                <EmptyState />
              ) : (
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
                    {users.map((user: any) => (
                      <TableRow key={user.id} className="hover:bg-white/10">
                        <TableCell className="font-medium">
                          {`${user.user?.firstName} ${user?.user.lastName}`}
                        </TableCell>
                        <TableCell>{user?.user.email}</TableCell>
                        <TableCell>
                          
                            <Badge variant={user?.role === 'HUB_MANAGER' ? 'outline' : user?.role === 'ORG_ADMIN' ? 'default' : 'secondary'} className="capitalize">
                            {user?.user.role === 'HUB_MANAGER' ? 'Hub Manager' : user?.user.role === 'ORG_ADMIN' ? 'Org Admin' : 'Member'}
                            </Badge>
                        </TableCell>
                        <TableCell>{user.preferredHub || '-'}</TableCell>
                        <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              user.status === true ? 'default' : 
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
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardHeader>
              <CardTitle className="text-lg">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-deskhive-navy">{stats.totalUsers}</div>
              <p className="text-sm text-deskhive-darkgray/70 mt-1">
                {stats.activeUsers} active users
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardHeader>
              <CardTitle className="text-lg">Hub Managers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-deskhive-navy">
                {stats.hubManagers}
              </div>
              <p className="text-sm text-deskhive-darkgray/70 mt-1">
                Managing multiple hubs
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardHeader>
              <CardTitle className="text-lg">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-deskhive-orange">
                {stats.pendingApprovals}
              </div>
              <p className="text-sm text-deskhive-darkgray/70 mt-1">
                Users awaiting approval
              </p>
            </CardContent>
          </Card>
        </div>

        <AddMemberModal
          isOpen={showAddMemberModal}
          onClose={() => setShowAddMemberModal(false)}
          onAddMember={handleAddMember}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;

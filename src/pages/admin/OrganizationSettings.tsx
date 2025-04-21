import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Building2, Save, LinkIcon, UsersRound, Send, Ban } from "lucide-react";
import { useOrganization } from "@/contexts/OrganizationContext";
import organizationService from "@/services/organizationService";
import invitationService from "@/services/invitationService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const OrganizationSettings = () => {
  const { toast } = useToast();
  const { currentOrganization, setCurrentOrganization } = useOrganization();
  const [activeTab, setActiveTab] = useState("general");
  
  // Organization General Settings
  const [name, setName] = useState(currentOrganization.name);
  const [description, setDescription] = useState(currentOrganization.description || "");
  const [currency, setCurrency] = useState(currentOrganization.currency || "₦");
  const [serviceFee] = useState(10); // Fixed 10% service fee
  
  // Invitation System
  const [invitations, setInvitations] = useState([]);
  const [newInviteEmail, setNewInviteEmail] = useState("");

  // Fetch invitations on component mount
  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await invitationService.getInvitations();
        setInvitations(response.data);
      } catch (error) {
        console.error('Failed to fetch invitations:', error);
        toast({
          title: "Error fetching invitations",
          description: "Failed to load invitations. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchInvitations();
  }, []);

  const handleSaveGeneral = async () => {
    try {
      // Update organization settings using the service
      const updatedOrg = await organizationService.updateOrganization(currentOrganization.id, {
        name,
        description,
        currency,
        type: 'public'
      });

      setCurrentOrganization({
        ...currentOrganization,
        ...updatedOrg.data
      });
      
      toast({
        title: "Organization settings updated",
        description: "Your organization settings have been saved.",
      });
    } catch (error) {
      console.error('Failed to update organization:', error);
      toast({
        title: "Error updating organization",
        description: "Failed to save organization settings. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleSendInvite = async () => {
    if (!newInviteEmail) return;
    
    try {
      await invitationService.createInvitation({
        email: newInviteEmail,
        organizationId: currentOrganization.id,
        role: 'MEMBER' // Default role for new members
      });
      
      // Refresh invitations list
      const updatedInvitations = await invitationService.getInvitations();
      setInvitations(updatedInvitations.data);
      
      setNewInviteEmail("");
      
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${newInviteEmail}.`,
      });
    } catch (error) {
      console.error('Failed to send invitation:', error);
      toast({
        title: "Error sending invitation",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleCancelInvite = async (invitationId: string) => {
    try {
      await invitationService.disableInvitation(invitationId);
      
      // Refresh invitations list
      const updatedInvitations = await invitationService.getInvitations();
      setInvitations(updatedInvitations.data);
      
      toast({
        title: "Invitation cancelled",
        description: "The invitation has been cancelled successfully.",
      });
    } catch (error) {
      console.error('Failed to cancel invitation:', error);
      toast({
        title: "Error cancelling invitation",
        description: "Failed to cancel invitation. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto pb-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Organization Settings</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Manage your organization's details and access controls
          </p>
        </div>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <div className="bg-white glass-card p-4 md:p-6 mb-8 overflow-hidden">
            <TabsList className="grid grid-cols-2 w-full max-w-[400px] mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="invitations">Invitations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="mr-2 h-5 w-5 text-deskhive-navy" />
                    Organization Details
                  </CardTitle>
                  <CardDescription>
                    Update your organization's basic information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Organization Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter organization name" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input 
                      id="description" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of your organization" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select 
                      value={currency} 
                      onValueChange={setCurrency}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="₦">Nigerian Naira (₦)</SelectItem>
                        <SelectItem value="$">US Dollar ($)</SelectItem>
                        <SelectItem value="£">British Pound (£)</SelectItem>
                        <SelectItem value="€">Euro (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200 mt-4">
                    <h4 className="font-medium text-blue-800 mb-1">Public Organization Notice</h4>
                    <p className="text-sm text-blue-700">
                      Your organization is public, allowing your workspaces to be discoverable by all DeskHive users.
                      A 10% service fee applies to all bookings. To request a private organization setup, please contact our support team.
                    </p>
                  </div>

                  <Button 
                    onClick={handleSaveGeneral}
                    className="bg-deskhive-navy hover:bg-deskhive-navy/90"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="invitations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UsersRound className="mr-2 h-5 w-5 text-deskhive-navy" />
                    Member Invitations
                  </CardTitle>
                  <CardDescription>
                    Invite new members to join your organization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="inviteEmail" className="sr-only">Email Address</Label>
                      <Input 
                        id="inviteEmail" 
                        placeholder="Enter email address" 
                        type="email"
                        value={newInviteEmail}
                        onChange={(e) => setNewInviteEmail(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={handleSendInvite}
                      className="bg-deskhive-navy hover:bg-deskhive-navy/90"
                      disabled={!newInviteEmail}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Invitation
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Pending Invitations</h4>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invitations.length > 0 ? (
                            invitations.map((invite) => (
                              <TableRow key={invite.email}>
                                <TableCell className="font-medium">{invite.email}</TableCell>
                                <TableCell>
                                  <Badge 
                                    variant={
                                      invite.status === "accepted" ? "default" : 
                                      invite.status === "pending" ? "outline" : 
                                      "secondary"
                                    }
                                  >
                                    {invite.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{invite.date}</TableCell>
                                <TableCell className="text-right">
                                  {invite.status === "pending" && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleCancelInvite(invite.email)}
                                    >
                                      <Ban className="h-4 w-4 text-red-500" />
                                    </Button>
                                  )}
                                  {invite.status === "expired" && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleSendInvite()}
                                    >
                                      <Send className="h-4 w-4 text-deskhive-navy" />
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center text-deskhive-darkgray/70 py-4">
                                No pending invitations
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default OrganizationSettings;

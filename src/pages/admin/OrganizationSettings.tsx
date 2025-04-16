import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Building2, Save, LinkIcon, UsersRound, Lock, Globe, Ban, Copy, Send } from "lucide-react";
import { useOrganization } from "@/contexts/OrganizationContext";
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
  const [invitations, setInvitations] = useState([
    { email: "john.smith@example.com", status: "pending", date: "2023-04-01" },
    { email: "sarah.johnson@example.com", status: "accepted", date: "2023-03-28" },
    { email: "michael.brown@example.com", status: "expired", date: "2023-03-15" },
  ]);
  const [newInviteEmail, setNewInviteEmail] = useState("");

  const handleSaveGeneral = () => {
    // Update organization settings
    setCurrentOrganization({
      ...currentOrganization,
      name,
      description,
      currency,
      type: 'public', // Always public
      serviceFeePercentage: 10
    });
    
    toast({
      title: "Organization settings updated",
      description: "Your organization settings have been saved.",
    });
  };
  
  const handleSendInvite = () => {
    if (!newInviteEmail) return;
    
    // In a real app, this would send an invitation
    setInvitations([
      ...invitations,
      { email: newInviteEmail, status: "pending", date: new Date().toISOString().split('T')[0] }
    ]);
    
    setNewInviteEmail("");
    
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${newInviteEmail}.`,
    });
  };
  
  const handleGenerateInviteLink = () => {
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const inviteUrl = `${window.location.origin}/signup?code=${inviteCode}&org=${currentOrganization.id}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(inviteUrl);
    
    toast({
      title: "Invite link generated",
      description: "The invite link has been copied to your clipboard.",
    });
  };
  
  const handleCancelInvite = (email: string) => {
    setInvitations(invitations.filter(invite => invite.email !== email));
    
    toast({
      title: "Invitation cancelled",
      description: `The invitation to ${email} has been cancelled.`,
    });
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
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium mb-1">Generate Invite Link</h4>
                      <p className="text-xs text-deskhive-darkgray/70">
                        Create a reusable link to invite multiple members
                      </p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={handleGenerateInviteLink}
                    >
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Generate Link
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

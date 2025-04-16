
import React, { useState } from 'react';
import HubManagerLayout from "@/components/layout/HubManagerLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Download, 
  Mail, 
  Phone, 
  Calendar, 
  ArrowUpDown, 
  MoreHorizontal,
  UserPlus,
  UserCheck,
  UserX,
  Eye,
  Ban
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const learners = [
  {
    id: "1",
    name: "Chioma Eze",
    email: "chioma.eze@example.com",
    phone: "+234 812 345 6789",
    joinDate: "2023-09-15",
    hub: "Lagos - Yaba",
    status: "active",
    visits: 24,
    lastVisit: "2023-12-10"
  },
  {
    id: "2",
    name: "Oluwaseun Adeyemi",
    email: "seun.adeyemi@example.com",
    phone: "+234 705 123 4567",
    joinDate: "2023-08-02",
    hub: "Lagos - Victoria Island",
    status: "active",
    visits: 32,
    lastVisit: "2023-12-12"
  },
  {
    id: "3",
    name: "Emeka Okafor",
    email: "emeka.okafor@example.com",
    phone: "+234 814 789 0123",
    joinDate: "2023-10-05",
    hub: "Lagos - Ikeja",
    status: "inactive",
    visits: 8,
    lastVisit: "2023-11-15"
  },
  {
    id: "4",
    name: "Ayomide Johnson",
    email: "ayo.johnson@example.com",
    phone: "+234 903 456 7890",
    joinDate: "2023-07-22",
    hub: "Lagos - Yaba",
    status: "active",
    visits: 41,
    lastVisit: "2023-12-09"
  },
  {
    id: "5",
    name: "Ngozi Okonkwo",
    email: "ngozi.okonkwo@example.com",
    phone: "+234 807 234 5678",
    joinDate: "2023-11-08",
    hub: "Lagos - Ikeja",
    status: "active",
    visits: 5,
    lastVisit: "2023-12-08"
  },
  {
    id: "6",
    name: "Ibrahim Mohammed",
    email: "ibrahim.m@example.com",
    phone: "+234 701 987 6543",
    joinDate: "2023-06-14",
    hub: "Lagos - Victoria Island",
    status: "suspended",
    visits: 12,
    lastVisit: "2023-10-30"
  },
  {
    id: "7",
    name: "Chiamaka Nwosu",
    email: "chiamaka.n@example.com",
    phone: "+234 812 345 6780",
    joinDate: "2023-09-30",
    hub: "Lagos - Yaba",
    status: "active",
    visits: 18,
    lastVisit: "2023-12-11"
  }
];

const HubManagerLearners = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [filteredLearners, setFilteredLearners] = useState(learners);
  const [newLearner, setNewLearner] = useState({
    name: "",
    email: "",
    phone: "",
    hub: "",
    sendInvite: true
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filtered = learners.filter(learner => 
      learner.name.toLowerCase().includes(query) || 
      learner.email.toLowerCase().includes(query)
    );
    
    setFilteredLearners(filtered);
  };
  
  const handleAddLearner = () => {
    // Validation would go here in a real application
    
    toast({
      title: "Learner added",
      description: `${newLearner.name} has been added successfully.`,
    });
    
    if (newLearner.sendInvite) {
      toast({
        title: "Invitation sent",
        description: `An invitation email has been sent to ${newLearner.email}.`,
      });
    }
    
    setShowAddDialog(false);
    setNewLearner({
      name: "",
      email: "",
      phone: "",
      hub: "",
      sendInvite: true
    });
  };
  
  const handleSuspendLearner = (learner: typeof learners[0]) => {
    toast({
      title: "Learner suspended",
      description: `${learner.name} has been suspended.`,
      variant: "destructive",
    });
  };
  
  const handleActivateLearner = (learner: typeof learners[0]) => {
    toast({
      title: "Learner activated",
      description: `${learner.name} has been activated.`,
    });
  };
  
  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Learner data is being exported. It will be available for download shortly.",
    });
  };

  return (
    <HubManagerLayout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Manage Learners</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            View and manage learners registered at your hub
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white p-4 rounded-lg border shadow-sm">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search learners..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleExportData} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Learner
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Registered Learners</CardTitle>
            <CardDescription>
              Manage learners that use your hub facilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <table className="min-w-full divide-y">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Learner
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Contact
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Hub
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Status
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Activity
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y">
                  {filteredLearners.map((learner) => (
                    <tr key={learner.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{learner.name}</div>
                            <div className="text-sm text-gray-500">
                              Joined {format(new Date(learner.joinDate), "MMM d, yyyy")}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center text-sm text-gray-900">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            {learner.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            {learner.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {learner.hub}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant="outline" 
                          className={
                            learner.status === "active" ? "bg-green-100 text-green-800 border-green-200" :
                            learner.status === "inactive" ? "bg-gray-100 text-gray-800 border-gray-200" :
                            "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {learner.status === "active" ? "Active" : 
                           learner.status === "inactive" ? "Inactive" : 
                           "Suspended"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="text-gray-900">{learner.visits} visits</div>
                          <div className="text-gray-500">
                            Last: {format(new Date(learner.lastVisit), "MMM d")}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              <span>View Bookings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserCheck className="mr-2 h-4 w-4" />
                              <span>Check In</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {learner.status === "active" ? (
                              <DropdownMenuItem onClick={() => handleSuspendLearner(learner)} className="text-red-600">
                                <Ban className="mr-2 h-4 w-4" />
                                <span>Suspend</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleActivateLearner(learner)} className="text-green-600">
                                <UserCheck className="mr-2 h-4 w-4" />
                                <span>Activate</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <div className="text-sm text-gray-500">
              Showing {filteredLearners.length} of {learners.length} learners
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Learner</DialogTitle>
            <DialogDescription>
              Add a new learner to your hub. They will receive an invitation email if selected.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe"
                value={newLearner.name}
                onChange={(e) => setNewLearner({...newLearner, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com"
                value={newLearner.email}
                onChange={(e) => setNewLearner({...newLearner, email: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                placeholder="+234 800 000 0000"
                value={newLearner.phone}
                onChange={(e) => setNewLearner({...newLearner, phone: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hub">Primary Hub</Label>
              <Select 
                value={newLearner.hub} 
                onValueChange={(value) => setNewLearner({...newLearner, hub: value})}
              >
                <SelectTrigger id="hub">
                  <SelectValue placeholder="Select hub" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lagos-yaba">Lagos - Yaba</SelectItem>
                  <SelectItem value="lagos-vi">Lagos - Victoria Island</SelectItem>
                  <SelectItem value="lagos-ikeja">Lagos - Ikeja</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="sendInvite" 
                checked={newLearner.sendInvite}
                onCheckedChange={(checked) => 
                  setNewLearner({...newLearner, sendInvite: checked as boolean})
                }
              />
              <Label htmlFor="sendInvite" className="text-sm">
                Send invitation email to learner
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLearner} className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Learner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </HubManagerLayout>
  );
};

export default HubManagerLearners;

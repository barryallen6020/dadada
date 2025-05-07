import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";
import { workspaceService, Workspace } from "@/services/workspaceService";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (memberData: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    preferredHub: string;
  }) => Promise<void>;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onAddMember,
}) => {
  // const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [hubs, setHubs] = useState<Workspace[]>([]);
  const [isLoadingHubs, setIsLoadingHubs] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "hub_manager",
    preferredHub: "",
  });
  // const [defaultPassword, setDefaultPassword]

  useEffect(() => {
    const fetchHubs = async () => {
      try {
        setIsLoadingHubs(true);
        const activeHubs = await workspaceService.getOrganizationWorkspaces();
        setHubs(activeHubs);
      } catch (error) {
        toast.error("Failed to load hubs. Please try again.");
        // toast({
        //   title: "Error",
        //   description: "Failed to load hubs. Please try again.",
        //   variant: "destructive",
        // });
      } finally {
        setIsLoadingHubs(false);
      }
    };

    if (isOpen) {
      fetchHubs();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // await onAddMember(formData);

      const res = await api.post('/user/signup/employee', formData)
      toast.success(`Successfully added new hub manager! password is ${res.data.data.defaultPassword}`)
      // toast({
      //   title: "Account Created",
      //   description: "An invitation has been sent to the new member.",
      // });
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(`Failed to add member. Please try again. ${error?.response.data.message}`);
      // toast({
      //   title: "Error",
      //   description: "Failed to add member. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      role: "member",
      preferredHub: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>
              Add a new member to your organization. They will receive an invitation email.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="member">Member</SelectItem> */}
                  <SelectItem value="hub_manager">Hub Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="preferredHub">Preferred Hub</Label>
              <Select
                value={formData.preferredHub}
                onValueChange={(value) =>
                  setFormData({ ...formData, preferredHub: value })
                }
                disabled={isLoadingHubs}
              >
                <SelectTrigger>
                  {isLoadingHubs ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Loading hubs...
                    </div>
                  ) : (
                    <SelectValue placeholder="Select a hub" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {hubs.map((hub) => (
                    <SelectItem key={hub.id} value={hub.id}>
                      {hub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isLoadingHubs}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                "Add Employee"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal; 
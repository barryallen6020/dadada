import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NewOrganization } from '@/hooks/useOrganizationActions';

interface AddOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  newOrg: NewOrganization;
  setNewOrg: (org: NewOrganization) => void;
  onAddOrganization: () => void;
}

const AddOrganizationModal: React.FC<AddOrganizationModalProps> = ({
  isOpen,
  onClose,
  newOrg,
  setNewOrg,
  onAddOrganization
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Organization</DialogTitle>
          <DialogDescription>Create a new organization on the platform</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div>
            <Label htmlFor="orgName">Organization Name</Label>
            <Input
              id="orgName"
              value={newOrg.name}
              onChange={(e) => setNewOrg({...newOrg, name: e.target.value})}
              placeholder="Enter organization name"
            />
          </div>
          <div>
            <Label htmlFor="orgType">Type</Label>
            <Select value={newOrg.type} onValueChange={(value) => setNewOrg({...newOrg, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="orgDesc">Description</Label>
            <Input
              id="orgDesc"
              value={newOrg.description}
              onChange={(e) => setNewOrg({...newOrg, description: e.target.value})}
              placeholder="Enter description"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onAddOrganization}>
              Create Organization
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrganizationModal;


import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building2, Users, Calendar, Mail, Phone, MapPin, CreditCard, Shield } from 'lucide-react';

interface Organization {
  id: number;
  name: string;
  type: string;
  status: string;
  users: number;
  created: string;
  verified: boolean;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  subscription?: string;
  lastActivity?: string;
}

interface OrganizationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  organization: Organization | null;
}

const OrganizationDetailsModal: React.FC<OrganizationDetailsModalProps> = ({
  isOpen,
  onClose,
  organization
}) => {
  if (!organization) return null;

  const getStatusBadge = (status: string, verified: boolean) => {
    if (!verified) return <Badge variant="destructive">Unverified</Badge>;
    switch (status) {
      case 'Active': return <Badge variant="default">Active</Badge>;
      case 'Inactive': return <Badge variant="secondary">Inactive</Badge>;
      case 'Pending': return <Badge variant="outline">Pending</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {organization.name}
          </DialogTitle>
          <DialogDescription>
            Detailed information about this organization
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Organization Name</label>
                  <p className="text-sm">{organization.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Type</label>
                  <p className="text-sm">{organization.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    {getStatusBadge(organization.status, organization.verified)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created Date</label>
                  <p className="text-sm">{organization.created}</p>
                </div>
              </div>
              
              {organization.description && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-sm">{organization.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm">{organization.email || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-sm">{organization.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              
              {organization.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-sm">{organization.address}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Total Users</label>
                    <p className="text-xl font-bold">{organization.users}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Activity</label>
                    <p className="text-sm">{organization.lastActivity || '2 hours ago'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-purple-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Subscription</label>
                    <p className="text-sm">{organization.subscription || 'Basic Plan'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security & Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security & Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Shield className={`h-4 w-4 ${organization.verified ? 'text-green-500' : 'text-red-500'}`} />
                <div>
                  <label className="text-sm font-medium text-gray-500">Verification Status</label>
                  <p className="text-sm">
                    {organization.verified ? 'Verified Organization' : 'Pending Verification'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationDetailsModal;

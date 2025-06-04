
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail, Phone, MapPin, Calendar, Activity, CreditCard, Clock } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  organization: string;
  status: string;
  lastLogin: string;
  bookings: number;
  joinDate: string;
  phone?: string;
  address?: string;
  subscription?: string;
  totalSpent?: number;
  lastActivity?: string;
  deviceInfo?: string;
  ipAddress?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  twoFactorEnabled?: boolean;
  loginAttempts?: number;
  accountLocked?: boolean;
  preferredWorkspace?: string;
  bookingHistory?: Array<{ date: string; workspace: string; duration: string }>;
}

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, user }) => {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin': return <Badge variant="default">Admin</Badge>;
      case 'Hub Manager': return <Badge variant="outline">Hub Manager</Badge>;
      case 'Member': return <Badge variant="secondary">Member</Badge>;
      default: return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <Badge variant="default">Active</Badge>;
      case 'Inactive': return <Badge variant="secondary">Inactive</Badge>;
      case 'Suspended': return <Badge variant="destructive">Suspended</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="space-y-6">
            {/* User Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">
                  {user.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-gray-600 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {getRoleBadge(user.role)}
                  {getStatusBadge(user.status)}
                  {user.emailVerified && <Badge variant="outline" className="text-green-600">Email Verified</Badge>}
                  {user.twoFactorEnabled && <Badge variant="outline" className="text-blue-600">2FA Enabled</Badge>}
                </div>
              </div>
            </div>
            
            <Separator />

            {/* Contact Information */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <div className="flex items-center gap-2">
                    {user.phone}
                    {user.phoneVerified ? (
                      <Badge variant="outline" className="text-green-600 text-xs">Verified</Badge>
                    ) : (
                      <Badge variant="outline" className="text-red-600 text-xs">Unverified</Badge>
                    )}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-gray-500" />
                    {user.address}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Information */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Account Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Organization:</span>
                  <div>{user.organization}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Join Date:</span>
                  <div>{user.joinDate}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Subscription:</span>
                  <div>{user.subscription}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Activity & Security */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Activity & Security
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Last Login:</span>
                  <div>{user.lastLogin}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Last Activity:</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-gray-500" />
                    {user.lastActivity}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Device:</span>
                  <div>{user.deviceInfo}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">IP Address:</span>
                  <div>{user.ipAddress}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Failed Login Attempts:</span>
                  <div className={user.loginAttempts && user.loginAttempts > 0 ? 'text-red-600' : 'text-green-600'}>
                    {user.loginAttempts || 0}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Account Status:</span>
                  <div className={user.accountLocked ? 'text-red-600' : 'text-green-600'}>
                    {user.accountLocked ? 'Locked' : 'Active'}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Usage Statistics */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Usage Statistics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Total Bookings:</span>
                  <div className="text-lg font-semibold text-blue-600">{user.bookings}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Total Spent:</span>
                  <div className="text-lg font-semibold text-green-600">₦{user.totalSpent?.toLocaleString()}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Preferred Workspace:</span>
                  <div>{user.preferredWorkspace}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Recent Booking History */}
            <div>
              <h4 className="font-medium mb-3">Recent Booking History</h4>
              <div className="space-y-2">
                {user.bookingHistory?.map((booking: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{booking.workspace}</div>
                      <div className="text-sm text-gray-500">{booking.date}</div>
                    </div>
                    <div className="text-sm text-gray-600">{booking.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;

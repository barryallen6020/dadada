
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Mail, UserPlus } from 'lucide-react';

const pendingInvites = [
  {
    id: 'INV001',
    email: 'jane.doe@company.com',
    role: 'Workspace Manager',
    workspace: 'Downtown Hub',
    sentDate: '2024-01-10',
    expiresIn: '5 days'
  },
  {
    id: 'INV002',
    email: 'mike.wilson@startup.io',
    role: 'Staff',
    workspace: 'Tech Center',
    sentDate: '2024-01-12',
    expiresIn: '3 days'
  },
  {
    id: 'INV003',
    email: 'sarah.jones@design.co',
    role: 'Staff',
    workspace: 'Creative Space',
    sentDate: '2024-01-13',
    expiresIn: '2 days'
  }
];

export const PendingInvitesList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserPlus className="mr-2 h-5 w-5" />
          Pending Invites
        </CardTitle>
        <CardDescription>User invitations awaiting response</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingInvites.map((invite) => (
            <div key={invite.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="font-medium">{invite.email}</p>
                    <p className="text-sm text-gray-500">{invite.workspace}</p>
                  </div>
                  <Badge variant="outline">{invite.role}</Badge>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>Expires in {invite.expiresIn}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Resend
                </Button>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline">
            <UserPlus className="mr-2 h-4 w-4" />
            Send New Invite
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

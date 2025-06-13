
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  FileText, 
  Users, 
  Settings, 
  MessageSquare, 
  CreditCard 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActionTiles = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Create Workspace',
      description: 'Add a new workspace location',
      icon: Plus,
      color: 'bg-blue-500',
      action: () => navigate('/admin/workspace/list?create=true')
    },
    {
      title: 'View Reports',
      description: 'Access analytics and reports',
      icon: FileText,
      color: 'bg-green-500',
      action: () => navigate('/admin/workspace/reports')
    },
    {
      title: 'Manage Users',
      description: 'Add or edit user permissions',
      icon: Users,
      color: 'bg-purple-500',
      action: () => navigate('/admin/workspace/users')
    },
    {
      title: 'Workspace Settings',
      description: 'Configure workspace preferences',
      icon: Settings,
      color: 'bg-orange-500',
      action: () => navigate('/admin/workspace/settings')
    },
    {
      title: 'Send Announcement',
      description: 'Notify users about updates',
      icon: MessageSquare,
      color: 'bg-pink-500',
      action: () => navigate('/admin/workspace/communications')
    },
    {
      title: 'Billing Overview',
      description: 'View invoices and payments',
      icon: CreditCard,
      color: 'bg-indigo-500',
      action: () => navigate('/admin/workspace/billing')
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-24 flex-col space-y-2 hover:bg-gray-50"
              onClick={action.action}
            >
              <div className={`p-2 rounded-lg ${action.color}`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{action.title}</p>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WorkspaceAdminHeaderProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  currentPath: string;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const WorkspaceAdminHeader: React.FC<WorkspaceAdminHeaderProps> = ({
  user,
  currentPath,
  sidebarCollapsed,
  onToggleSidebar
}) => {
  const getPageTitle = (path: string) => {
    const titles: Record<string, string> = {
      '/admin/workspace': 'Dashboard',
      '/admin/workspace/list': 'Workspaces',
      '/admin/workspace/rooms': 'Rooms & Seats',
      '/admin/workspace/pricing': 'Pricing & Promotions',
      '/admin/workspace/memberships': 'Memberships',
      '/admin/workspace/bookings': 'Booking Management',
      '/admin/workspace/floor-map': 'Floor Map Editor',
      '/admin/workspace/users': 'User Management',
      '/admin/workspace/communications': 'Communications',
      '/admin/workspace/billing': 'Billing & Invoicing',
      '/admin/workspace/api': 'API & Developer Tools',
      '/admin/workspace/audit': 'Audit & Activity Logs',
      '/admin/workspace/settings': 'Workspace Settings'
    };
    return titles[path] || 'Workspace Admin';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {getPageTitle(currentPath)}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64"
            />
          </div>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};


import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Settings, 
  Users, 
  CreditCard, 
  Calendar,
  MapPin,
  DollarSign,
  Bell,
  FileText,
  Code,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkspaceAdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  userRole: string;
  permissions: string[];
}

const navigationItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin/workspace',
    roles: ['ORG_OWNER', 'WORKSPACE_MANAGER']
  },
  {
    title: 'Workspaces',
    icon: Building2,
    href: '/admin/workspace/list',
    roles: ['ORG_OWNER', 'WORKSPACE_MANAGER']
  },
  {
    title: 'Rooms & Seats',
    icon: MapPin,
    href: '/admin/workspace/rooms',
    roles: ['WORKSPACE_MANAGER']
  },
  {
    title: 'Pricing & Promotions',
    icon: DollarSign,
    href: '/admin/workspace/pricing',
    roles: ['ORG_OWNER', 'WORKSPACE_MANAGER']
  },
  {
    title: 'Memberships',
    icon: CreditCard,
    href: '/admin/workspace/memberships',
    roles: ['ORG_OWNER']
  },
  {
    title: 'Bookings',
    icon: Calendar,
    href: '/admin/workspace/bookings',
    roles: ['WORKSPACE_MANAGER', 'ORG_OWNER']
  },
  {
    title: 'Floor Map Editor',
    icon: MapPin,
    href: '/admin/workspace/floor-map',
    roles: ['WORKSPACE_MANAGER']
  },
  {
    title: 'User Management',
    icon: Users,
    href: '/admin/workspace/users',
    roles: ['ORG_OWNER']
  },
  {
    title: 'Communications',
    icon: Bell,
    href: '/admin/workspace/communications',
    roles: ['ORG_OWNER', 'WORKSPACE_MANAGER']
  },
  {
    title: 'Billing',
    icon: FileText,
    href: '/admin/workspace/billing',
    roles: ['ORG_OWNER']
  },
  {
    title: 'API & Developer',
    icon: Code,
    href: '/admin/workspace/api',
    roles: ['ORG_OWNER', 'WORKSPACE_MANAGER']
  },
  {
    title: 'Audit Logs',
    icon: Shield,
    href: '/admin/workspace/audit',
    roles: ['ORG_OWNER', 'WORKSPACE_MANAGER']
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/admin/workspace/settings',
    roles: ['ORG_OWNER', 'WORKSPACE_MANAGER']
  }
];

export const WorkspaceAdminSidebar: React.FC<WorkspaceAdminSidebarProps> = ({
  collapsed,
  onToggle,
  userRole,
  permissions
}) => {
  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(userRole) || 
    item.roles.some(role => permissions.includes(role))
  );

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Admin</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {filteredItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) => cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

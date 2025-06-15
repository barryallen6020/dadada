
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Building2, 
  Settings, 
  Building,
  DollarSign,
  Megaphone,
  Key,
  Shield,
  Activity
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  user: any;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  isOpen, 
  toggleSidebar, 
  user, 
  activeSection, 
  setActiveSection 
}) => {
  const menuItems = [
    { id: 'revenue', label: 'Revenue Management', icon: DollarSign },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'audit-logs', label: 'Audit Logs', icon: Shield },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'hubs', label: 'Hub Management', icon: Building2 },
    { id: 'organization', label: 'Organization', icon: Building },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-6">
        <h2 className="text-xl font-bold text-deskhive-navy">Admin Panel</h2>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSectionChange(item.id)}
            className={cn(
              "w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors",
              activeSection === item.id && "bg-deskhive-skyblue/20 border-r-2 border-deskhive-orange text-deskhive-navy"
            )}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;

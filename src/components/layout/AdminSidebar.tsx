import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  Menu,
  X,
  Building2,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoFull from "../common/LogoFull";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useOrganization } from "@/contexts/OrganizationContext";

interface AdminSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  user: any;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen,
  toggleSidebar,
  user = {}
}) => {
  const location = useLocation();
  const { currentOrganization } = useOrganization();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/admin",
    },
    {
      title: "Hubs",
      icon: <Building2 className="h-5 w-5" />,
      path: "/admin/hubs",
    },
    {
      title: "Members",
      icon: <Users className="h-5 w-5" />,
      path: "/admin/users",
    },
    {
      title: "Bookings",
      icon: <Calendar className="h-5 w-5" />,
      path: "/admin/bookings",
    },
    {
      title: "Organization",
      icon: <Globe className="h-5 w-5" />,
      path: "/admin/organization",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/admin/settings",
    },
  ];

  // Safely generate user initials from name or use a fallback
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 glass-nav rounded-tr-xl rounded-br-xl transition-transform duration-300 ease-in-out overflow-hidden shadow-lg`}
    >
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 border-b border-white/20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <LogoFull />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="px-4 py-3 border-b border-white/20">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-deskhive-navy" />
            <span className="text-sm font-medium text-deskhive-navy">{currentOrganization.name}</span>
          </div>
        </div>
        
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center">
            <Avatar className="h-9 w-9 mr-3">
              <AvatarFallback className="bg-deskhive-navy text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-deskhive-darkgray">
                Admin Panel
              </p>
              <p className="text-xs text-deskhive-darkgray/70">
                {user?.name || "Administrator"}
              </p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-3 py-6 glass-scrollbar">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                    location.pathname === item.path
                      ? "bg-deskhive-navy text-white"
                      : "text-deskhive-darkgray hover:bg-white/20"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-white/20">
          <Button
            variant="outline"
            className="w-full justify-center text-deskhive-darkgray border-deskhive-darkgray/30"
            size="sm"
            asChild
          >
            <Link to="/dashboard">
              <Menu className="h-4 w-4 mr-2" />
              Switch to User View
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;

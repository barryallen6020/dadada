
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, LayoutDashboard, Settings, BarChart3 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import LogoFull from "../common/LogoFull";
import OrganizationSwitcher from "@/components/dashboard/OrganizationSwitcher";
import { LogOut } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  user: any;
  isAdmin: boolean;
  isAdminRoute: boolean;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, user, isAdmin, isAdminRoute, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/dashboard"
    },
    {
      title: "My Bookings",
      icon: <Calendar className="h-5 w-5" />,
      path: "/bookings"
    },
    {
      title: "Account Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings"
    }
  ];

  // Only add admin panel link if user is admin
  if (isAdmin && !isAdminRoute) {
    menuItems.push({
      title: "Admin Panel",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/admin"
    });
  }

  // Safely generate user initials or use fallback
  const userInitials = user?.name ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase() : "U";

  return (
    <aside className={`${isOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 glass-nav rounded-tr-xl rounded-br-xl transition-transform duration-300 ease-in-out overflow-hidden shadow-lg`}>
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 border-b border-white/20">
          <Link to="/" className="flex items-center">
            <LogoFull />
          </Link>
        </div>
        
        {/* Move organization switcher to sidebar */}
        <div className="px-4 py-3 border-b border-white/20">
          <OrganizationSwitcher />
        </div>
        
        <nav className="flex-1 overflow-y-auto px-3 py-6 glass-scrollbar">
          <ul className="space-y-1">
            {menuItems.map(item => (
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarFallback className="bg-deskhive-navy text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-deskhive-darkgray">
                  {`${user?.firstName} ${user?.lastName}` || "Guest User"}
                </p>
                <p className="text-xs text-deskhive-darkgray/70">{user?.email || "guest@example.com"}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-5 w-5 text-deskhive-darkgray/70 hover:text-deskhive-darkgray" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

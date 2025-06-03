
import React from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserProfile from "./UserProfile";

interface HeaderProps {
  isNavOpen: boolean;
  toggleNav: () => void;
  user: any;
  isAdminRoute: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isNavOpen, toggleNav, user, isAdminRoute, onLogout }) => {
  const location = useLocation();

  const getPageTitle = () => {
    if (isAdminRoute) return "Admin Panel";
    
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/bookings":
        return "My Bookings";
      case "/settings":
        return "Account Settings";
      default:
        return "DeskHive";
    }
  };

  return (
    <header className="glass-nav py-3 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleNav} className="mr-2">
          {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <h1 className="text-lg font-medium text-deskhive-navy">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <UserProfile user={user} onLogout={onLogout} />
      </div>
    </header>
  );
};

export default Header;

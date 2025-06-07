import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Calendar,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Building2,
  AlertCircle,
  Users,
  QrCode,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoFull from "../common/LogoFull";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useOrganization } from "@/contexts/OrganizationContext";

interface HubManagerLayoutProps {
  children: React.ReactNode;
}

const HubManagerLayout: React.FC<HubManagerLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isNavOpen, setIsNavOpen] = useState(!isMobile);
  const { currentOrganization } = useOrganization();
  
  const userStr = localStorage.getItem("hubManagerUser");
  const defaultUser = {name: "Hub Manager", email: "manager@example.com", role: "hubmanager"};
  const user = userStr ? JSON.parse(userStr) : defaultUser;
  
  useEffect(() => {
    if (isMobile) {
      setIsNavOpen(false);
    } else {
      setIsNavOpen(true);
    }
  }, [isMobile]);
  
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("hubManagerToken");
    localStorage.removeItem("hubManagerUser");
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of Hub Manager.",
    });
    
    navigate("/hubmanager/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/hubmanager",
    },
    {
      title: "Workspaces",
      icon: <Building2 className="h-5 w-5" />,
      path: "/hubmanager/workspaces",
    },
    {
      title: "Booking Queue",
      icon: <Calendar className="h-5 w-5" />,
      path: "/hubmanager/bookings",
    },
    {
      title: "Check-In Operations",
      icon: <QrCode className="h-5 w-5" />,
      path: "/hubmanager/check-in",
    },
    {
      title: "Maintenance",
      icon: <Settings className="h-5 w-5" />,
      path: "/hubmanager/maintenance",
    },
    {
      title: "User Management",
      icon: <Users className="h-5 w-5" />,
      path: "/hubmanager/users",
    },
    {
      title: "Reports & Analytics",
      icon: <Activity className="h-5 w-5" />,
      path: "/hubmanager/reports",
    },
  ];

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "HM";

  return (
    <div className="min-h-screen bg-deskhive-skyblue flex">
      <aside
        className={`${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 glass-nav rounded-tr-xl rounded-br-xl transition-transform duration-300 ease-in-out overflow-hidden shadow-lg`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-white/20">
            <Link to="/" className="flex items-center">
              <LogoFull />
            </Link>
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
                <AvatarFallback className="bg-deskhive-orange text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-deskhive-darkgray">
                  Hub Manager
                </p>
                <p className="text-xs text-deskhive-darkgray/70">
                  {user?.name || "Manager"}
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
                        ? "bg-deskhive-orange text-white"
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
                Switch to Learner View
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {isNavOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleNav}
        ></div>
      )}

      <div className={`flex-1 flex flex-col ${isNavOpen && !isMobile ? 'ml-64' : ''} transition-all duration-300 w-full`}>
        <header className="glass-nav py-3 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleNav}
              className="mr-2"
            >
              {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-lg font-medium text-deskhive-navy">
              Hub Manager
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-deskhive-orange text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-dropdown">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/hubmanager/profile")}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/hubmanager/settings")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-full px-4 md:px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HubManagerLayout;

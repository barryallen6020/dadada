import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Calendar, LayoutDashboard, Settings, LogOut, Menu, X, ChevronRight, User, Building2, BarChart3, AlertCircle, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoFull from "../common/LogoFull";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import AdminSidebar from "./AdminSidebar";
import OrganizationSwitcher from "@/components/dashboard/OrganizationSwitcher";
import { OrganizationProvider, useOrganization } from "@/contexts/OrganizationContext";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardContent: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const isMobile = useIsMobile();
  const [isNavOpen, setIsNavOpen] = useState(!isMobile);
  const {
    currentOrganization
  } = useOrganization();

  // Get user from localStorage with a fallback to prevent null errors
  const userStr = localStorage.getItem("user");
  const defaultUser = {
    name: "Guest User",
    email: "guest@example.com",
    role: ""
  };
  const user = userStr ? JSON.parse(userStr) : defaultUser;
  const isAdmin = user?.role === "admin";
  const isAdminRoute = location.pathname.startsWith("/admin");
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
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
    navigate("/");
  };
  const menuItems = [{
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: "/dashboard"
  }, {
    title: "My Bookings",
    icon: <Calendar className="h-5 w-5" />,
    path: "/bookings"
  }, {
    title: "Account Settings",
    icon: <Settings className="h-5 w-5" />,
    path: "/settings"
  }];

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
  return <div className="min-h-screen bg-deskhive-skyblue flex">
      {/* Render different sidebar based on route */}
      {isAdminRoute ? <AdminSidebar isOpen={isNavOpen} toggleSidebar={toggleNav} user={user} /> : <aside className={`${isNavOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 glass-nav rounded-tr-xl rounded-br-xl transition-transform duration-300 ease-in-out overflow-hidden shadow-lg`}>
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
                {menuItems.map(item => <li key={item.path}>
                    <Link to={item.path} className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${location.pathname === item.path ? "bg-deskhive-navy text-white" : "text-deskhive-darkgray hover:bg-white/20"}`}>
                      <span className="mr-3">{item.icon}</span>
                      {item.title}
                    </Link>
                  </li>)}
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
                      {user?.name || "Guest User"}
                    </p>
                    <p className="text-xs text-deskhive-darkgray/70">{user?.email || "guest@example.com"}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5 text-deskhive-darkgray/70 hover:text-deskhive-darkgray" />
                </Button>
              </div>
            </div>
          </div>
        </aside>}

      {/* Mobile overlay */}
      {isNavOpen && isMobile && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden" onClick={toggleNav}></div>}

      {/* Main content - with left padding to accommodate fixed sidebar */}
      <div className={`flex-1 flex flex-col ${isNavOpen && !isMobile ? 'ml-64' : ''} transition-all duration-300 w-full`}>
        {/* Top navigation - glassmorphic */}
        <header className="glass-nav py-3 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleNav} className="mr-2">
              {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-lg font-medium text-deskhive-navy">
              {isAdminRoute ? "Admin Panel" : location.pathname === "/dashboard" ? "Dashboard" : location.pathname === "/bookings" ? "My Bookings" : location.pathname === "/settings" ? "Account Settings" : "DeskHive"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-deskhive-navy text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-dropdown" style={{
              zIndex: 150
            }}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
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

        {/* Page content - make sure it respects the width constraints */}
        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-full px-4 md:px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>;
};
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children
}) => {
  return <OrganizationProvider>
      <DashboardContent>{children}</DashboardContent>
    </OrganizationProvider>;
};
export default DashboardLayout;
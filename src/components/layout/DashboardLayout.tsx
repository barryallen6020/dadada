
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import AdminSidebar from "./AdminSidebar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useOrganization } from "@/contexts/OrganizationContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isNavOpen, setIsNavOpen] = useState(!isMobile);
  const [activeAdminSection, setActiveAdminSection] = useState('revenue');
  
  const { currentOrganization } = useOrganization();

  // Get user from localStorage with a fallback to prevent null errors
  let user;
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      user = JSON.parse(userStr);
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
  }
  
  // Default user if no user data is found or parsing fails
  if (!user) {
    user = {
      firstName: "Guest",
      lastName: "User",
      email: "guest@example.com",
      role: ""
    };
  }
  
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

  return (
    <div className="min-h-screen bg-deskhive-skyblue flex">
      {/* Render different sidebar based on route */}
      {isAdminRoute ? (
        <AdminSidebar 
          isOpen={isNavOpen} 
          toggleSidebar={toggleNav} 
          user={user}
          activeSection={activeAdminSection}
          setActiveSection={setActiveAdminSection}
        />
      ) : (
        <Sidebar 
          isOpen={isNavOpen} 
          user={user} 
          isAdmin={isAdmin} 
          isAdminRoute={isAdminRoute} 
          onLogout={handleLogout} 
        />
      )}

      {/* Mobile overlay */}
      {isNavOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden" 
          onClick={toggleNav}
        />
      )}

      {/* Main content - with left padding to accommodate fixed sidebar */}
      <div className={`flex-1 flex flex-col ${isNavOpen && !isMobile ? 'ml-64' : ''} transition-all duration-300 w-full`}>
        <Header 
          isNavOpen={isNavOpen} 
          toggleNav={toggleNav} 
          user={user} 
          isAdminRoute={isAdminRoute} 
          onLogout={handleLogout} 
        />

        {/* Page content - make sure it respects the width constraints */}
        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-full px-4 md:px-6 py-6">
            {isAdminRoute ? (
              React.cloneElement(children as React.ReactElement, {
                activeSection: activeAdminSection,
                setActiveSection: setActiveAdminSection
              })
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

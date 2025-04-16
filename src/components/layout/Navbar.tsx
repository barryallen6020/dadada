import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Building2 } from "lucide-react";
import LogoFull from "../common/LogoFull";
import { useOrganization } from "@/contexts/OrganizationContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const { currentOrganization } = useOrganization();
  
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const userRole = user?.role || "";
  
  const getDashboardRoute = () => {
    if (userRole === "admin") return "/admin";
    if (userRole === "hub_manager") return "/hubmanager";
    return "/dashboard";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <header
        className={`transition-all duration-300 max-w-7xl w-full ${
          isScrolled 
            ? "backdrop-blur-md shadow-lg rounded-full border border-white/20" 
            : "bg-transparent"
        }`}
      >
        <div className="px-4 md:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <LogoFull />
              </Link>
            </div>
            
            {isLoggedIn && currentOrganization?.name && (
              <div className="hidden md:flex items-center mx-4 px-3 py-1 bg-deskhive-navy/10 rounded-full">
                <Building2 className="h-4 w-4 text-deskhive-navy mr-2" />
                <span className="text-sm font-medium text-deskhive-navy">{currentOrganization.name}</span>
              </div>
            )}
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === "/"
                    ? "text-deskhive-navy"
                    : "text-deskhive-darkgray/70 hover:text-deskhive-navy"
                }`}
              >
                Home
              </Link>
              <Link 
                to="/features" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === "/features"
                    ? "text-deskhive-navy"
                    : "text-deskhive-darkgray/70 hover:text-deskhive-navy"
                }`}
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === "/pricing"
                    ? "text-deskhive-navy"
                    : "text-deskhive-darkgray/70 hover:text-deskhive-navy"
                }`}
              >
                Pricing
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === "/contact"
                    ? "text-deskhive-navy"
                    : "text-deskhive-darkgray/70 hover:text-deskhive-navy"
                }`}
              >
                Contact
              </Link>
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <Button asChild variant="default" className="btn-primary rounded-full">
                  <Link to={getDashboardRoute()}>Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="ghost" className="text-deskhive-navy hover:border hover:border-deskhive-navy/30 rounded-full">
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild variant="default" className="btn-primary rounded-full">
                    <Link to="/register">Create Organization</Link>
                  </Button>
                </>
              )}
            </div>
            
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-deskhive-navy rounded-full">
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden pt-2 pb-4 px-4 mt-2 rounded-xl shadow-md border border-white/20 backdrop-blur-md mx-4">
            {isLoggedIn && currentOrganization?.name && (
              <div className="flex items-center mb-4 px-3 py-2 bg-deskhive-navy/10 rounded-lg">
                <Building2 className="h-4 w-4 text-deskhive-navy mr-2" />
                <span className="text-sm font-medium text-deskhive-navy">{currentOrganization.name}</span>
              </div>
            )}
          
            <div className="space-y-1">
              <Link 
                to="/" 
                onClick={toggleMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/"
                    ? "text-deskhive-navy bg-deskhive-navy/5"
                    : "text-deskhive-darkgray/70 hover:text-deskhive-navy hover:bg-deskhive-navy/5"
                }`}
              >
                Home
              </Link>
              <Link 
                to="/features" 
                onClick={toggleMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/features"
                    ? "text-deskhive-navy bg-deskhive-navy/5"
                    : "text-deskhive-darkgray/70 hover:text-deskhive-navy hover:bg-deskhive-navy/5"
                }`}
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                onClick={toggleMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/pricing"
                    ? "text-deskhive-navy bg-deskhive-navy/5"
                    : "text-deskhive-darkgray/70 hover:text-deskhive-navy hover:bg-deskhive-navy/5"
                }`}
              >
                Pricing
              </Link>
              <Link 
                to="/contact" 
                onClick={toggleMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/contact"
                    ? "text-deskhive-navy bg-deskhive-navy/5"
                    : "text-deskhive-darkgray/70 hover:text-deskhive-navy hover:bg-deskhive-navy/5"
                }`}
              >
                Contact
              </Link>
              
              <div className="pt-4 flex flex-col space-y-2">
                {isLoggedIn ? (
                  <Button asChild variant="default" className="btn-primary w-full rounded-full">
                    <Link to={getDashboardRoute()} onClick={toggleMobileMenu}>Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="outline" className="border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5 w-full rounded-full">
                      <Link to="/login" onClick={toggleMobileMenu}>Log in</Link>
                    </Button>
                    <Button asChild variant="default" className="btn-primary w-full rounded-full">
                      <Link to="/register" onClick={toggleMobileMenu}>Create Organization</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;

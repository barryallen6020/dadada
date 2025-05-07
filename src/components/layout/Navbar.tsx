import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Building2 } from "lucide-react";
import LogoFull from "../common/LogoFull";
import { useOrganization } from "@/contexts/OrganizationContext";
import { cn } from "@/lib/utils";

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
    <div className="fixed top-0 left-0 right-0 z-50 px-4">
      <header className={cn(
        "transition-all duration-300",
        "mt-4 rounded-full glass-nav border border-white/20 backdrop-blur-md",
        "relative",
        isScrolled ? "shadow-lg" : "",
        "w-full max-w-7xl mx-auto" // Center and limit width
      )}>
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center">
                <LogoFull />
              </Link>
            
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
                    <Link to="/signup?type=organization">Create Organization</Link>
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
      </header>
        
        {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2">
          <div className="glass-nav border border-white/20 backdrop-blur-md rounded-2xl shadow-lg max-w-7xl mx-auto">
            <nav className="flex flex-col space-y-2 p-4">
              <Link 
                to="/" 
                onClick={toggleMobileMenu}
                className={`text-sm font-medium transition-colors px-4 py-2 rounded-lg ${
                  location.pathname === "/"
                    ? "bg-deskhive-navy/10 text-deskhive-navy"
                    : "text-deskhive-darkgray/70 hover:bg-deskhive-navy/5 hover:text-deskhive-navy"
                }`}
              >
                Home
              </Link>
              <Link 
                to="/features" 
                onClick={toggleMobileMenu}
                className={`text-sm font-medium transition-colors px-4 py-2 rounded-lg ${
                  location.pathname === "/features"
                    ? "bg-deskhive-navy/10 text-deskhive-navy"
                    : "text-deskhive-darkgray/70 hover:bg-deskhive-navy/5 hover:text-deskhive-navy"
                }`}
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                onClick={toggleMobileMenu}
                className={`text-sm font-medium transition-colors px-4 py-2 rounded-lg ${
                  location.pathname === "/pricing"
                    ? "bg-deskhive-navy/10 text-deskhive-navy"
                    : "text-deskhive-darkgray/70 hover:bg-deskhive-navy/5 hover:text-deskhive-navy"
                }`}
              >
                Pricing
              </Link>
              <Link 
                to="/contact" 
                onClick={toggleMobileMenu}
                className={`text-sm font-medium transition-colors px-4 py-2 rounded-lg ${
                  location.pathname === "/contact"
                    ? "bg-deskhive-navy/10 text-deskhive-navy"
                    : "text-deskhive-darkgray/70 hover:bg-deskhive-navy/5 hover:text-deskhive-navy"
                }`}
              >
                Contact
              </Link>
              
              <div className="pt-4 space-y-2 border-t border-white/10">
                {isLoggedIn ? (
                  <Button asChild variant="default" className="btn-primary w-full">
                    <Link to={getDashboardRoute()} onClick={toggleMobileMenu}>
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5">
                      <Link to="/login" onClick={toggleMobileMenu}>
                        Log in
                      </Link>
                    </Button>
                    <Button asChild variant="default" className="w-full btn-primary">
                      <Link to="/signup?type=organization" onClick={toggleMobileMenu}>
                        Create Organization
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
            </div>
          </div>
        )}
    </div>
  );
};

export default Navbar;

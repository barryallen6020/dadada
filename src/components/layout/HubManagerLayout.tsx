
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import HubManagerSidebar from "./hubmanager/HubManagerSidebar";
import HubManagerHeader from "./hubmanager/HubManagerHeader";

interface HubManagerLayoutProps {
  children: React.ReactNode;
}

const HubManagerLayout: React.FC<HubManagerLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [isNavOpen, setIsNavOpen] = useState(!isMobile);
  
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

  return (
    <div className="min-h-screen bg-deskhive-skyblue flex">
      <HubManagerSidebar 
        isNavOpen={isNavOpen}
        onToggleNav={toggleNav}
        isMobile={isMobile}
      />

      <div className={`flex-1 flex flex-col ${isNavOpen && !isMobile ? 'ml-64' : ''} transition-all duration-300 w-full`}>
        <HubManagerHeader 
          isNavOpen={isNavOpen}
          onToggleNav={toggleNav}
        />

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

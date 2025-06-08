
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoFull from '@/components/common/LogoFull';
import HubManagerUserProfile from './HubManagerUserProfile';
import HubManagerNavigation from './HubManagerNavigation';

interface HubManagerSidebarProps {
  isNavOpen: boolean;
  onToggleNav: () => void;
  isMobile: boolean;
}

const HubManagerSidebar: React.FC<HubManagerSidebarProps> = ({ 
  isNavOpen, 
  onToggleNav, 
  isMobile 
}) => {
  return (
    <>
      <aside
        className={`${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-[100] w-64 glass-nav rounded-tr-xl rounded-br-xl transition-transform duration-300 ease-in-out overflow-hidden shadow-lg`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-white/20">
            <Link to="/" className="flex items-center">
              <LogoFull />
            </Link>
          </div>
          
          <HubManagerUserProfile />
          
          <HubManagerNavigation />
          
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
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[90] md:hidden"
          onClick={onToggleNav}
        ></div>
      )}
    </>
  );
};

export default HubManagerSidebar;

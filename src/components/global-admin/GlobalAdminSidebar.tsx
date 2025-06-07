
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, LayoutDashboard, Building2, Users, FileText, Settings, Lock, LogOut, ChevronLeft, ChevronRight, X } from 'lucide-react';
import LogoFull from '@/components/common/LogoFull';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface GlobalAdminSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const GlobalAdminSidebar: React.FC<GlobalAdminSidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  activeTab,
  setActiveTab,
  onLogout
}) => {
  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'organizations', label: 'Organizations', icon: Building2 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'audit-logs', label: 'Booking Audit', icon: FileText },
    { id: 'platform-settings', label: 'Platform Settings', icon: Settings },
    { id: 'security', label: 'Security Center', icon: Lock }
  ];

  const handleMenuItemClick = (itemId: string) => {
    setActiveTab(itemId);
    setIsMobileSidebarOpen(false);
  };

  const renderMenuItems = (isMobile: boolean = false) => (
    <div className="flex-1">
      {menuItems.map(item => {
        const Icon = item.icon;
        return (
          <button 
            key={item.id} 
            onClick={() => isMobile ? handleMenuItemClick(item.id) : setActiveTab(item.id)} 
            className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
              activeTab === item.id 
                ? 'bg-primary/10 text-primary border-r-2 border-primary' 
                : 'text-gray-700'
            } ${!isSidebarOpen && !isMobile && 'justify-center px-4'}`} 
            title={!isSidebarOpen && !isMobile ? item.label : undefined}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            {(isSidebarOpen || isMobile) && <span>{item.label}</span>}
          </button>
        );
      })}
    </div>
  );

  const renderLogoutButton = (isMobile: boolean = false) => (
    <div className="p-4 border-t mt-auto">
      <Button 
        variant="ghost" 
        onClick={onLogout} 
        className={`w-full flex items-center gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 ${
          !isSidebarOpen && !isMobile && 'justify-center px-4'
        }`} 
        title={!isSidebarOpen && !isMobile ? 'Log out' : undefined}
      >
        <LogOut className="h-5 w-5 flex-shrink-0" />
        {(isSidebarOpen || isMobile) && <span>Log out</span>}
      </Button>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={`hidden md:block fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-40 ${
        isSidebarOpen ? 'w-64' : 'w-16'
      }`}>
        <div className="p-6 border-b flex items-center justify-between">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
            {isSidebarOpen && <LogoFull className="text-lg" />}
            {!isSidebarOpen && <img src="/logo.svg" alt="DeskHive Logo" className="h-8 w-8" />}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="flex-shrink-0"
          >
            {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
        
        <nav className="mt-6 flex-1 flex flex-col">
          {renderMenuItems()}
          {renderLogoutButton()}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed left-0 top-0 h-full bg-white shadow-lg transition-transform duration-300 z-50 w-64 ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b flex items-center justify-between">
          <LogoFull className="text-lg" />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-6 flex-1 flex flex-col">
          {renderMenuItems(true)}
          {renderLogoutButton(true)}
        </nav>
      </div>
    </>
  );
};

export default GlobalAdminSidebar;

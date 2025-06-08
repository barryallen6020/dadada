
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import LogoutConfirmationModal from '@/components/global-admin/LogoutConfirmationModal';
import GlobalAdminSidebar from '@/components/global-admin/GlobalAdminSidebar';
import GlobalAdminHeader from '@/components/global-admin/GlobalAdminHeader';

interface GlobalAdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const GlobalAdminLayout: React.FC<GlobalAdminLayoutProps> = ({
  children,
  activeTab,
  setActiveTab
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'organizations', label: 'Organizations' },
    { id: 'users', label: 'User Management' },
    { id: 'waitlist', label: 'Waitlist Management' },
    { id: 'emails', label: 'Email Management' },
    { id: 'audit-logs', label: 'Booking Audit' },
    { id: 'platform-settings', label: 'Platform Settings' },
    { id: 'security', label: 'Security Center' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('globalAdminToken');
    localStorage.removeItem('globalAdminUser');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of Global Admin"
    });
    navigate('/global-admin/login');
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    handleLogout();
  };

  // Clone children with sidebar state
  const childrenWithProps = React.cloneElement(children as React.ReactElement, {
    isSidebarCollapsed: !isSidebarOpen
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <GlobalAdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={() => setShowLogoutModal(true)}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-64' : 'md:ml-16'
      }`}>
        <GlobalAdminHeader
          activeTab={activeTab}
          onMobileSidebarOpen={() => setIsMobileSidebarOpen(true)}
          onLogout={() => setShowLogoutModal(true)}
          menuItems={menuItems}
        />

        {/* Content */}
        <main className="flex-1 p-3 md:p-4 lg:p-6 overflow-y-auto">
          {childrenWithProps}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal 
        isOpen={showLogoutModal} 
        onConfirm={confirmLogout} 
        onCancel={() => setShowLogoutModal(false)} 
      />
    </div>
  );
};

export default GlobalAdminLayout;

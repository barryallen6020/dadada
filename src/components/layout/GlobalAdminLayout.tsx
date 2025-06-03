import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Shield, LayoutDashboard, Building2, Users, FileText, Settings, Lock, LogOut, Menu, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LogoutConfirmationModal from '@/components/global-admin/LogoutConfirmationModal';
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
  const {
    toast
  } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
  const menuItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  }, {
    id: 'organizations',
    label: 'Organizations',
    icon: Building2
  }, {
    id: 'users',
    label: 'User Management',
    icon: Users
  }, {
    id: 'audit-logs',
    label: 'Booking Audit',
    icon: FileText
  }, {
    id: 'platform-settings',
    label: 'Platform Settings',
    icon: Settings
  }, {
    id: 'security',
    label: 'Security Center',
    icon: Lock
  }];
  return <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-40 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-6 border-b flex items-center justify-between">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
            
            {isSidebarOpen && <div>
                <h1 className="text-xl font-bold">Global Admin</h1>
                
              </div>}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="flex-shrink-0">
            {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        
        <nav className="mt-6 flex-1">
          {menuItems.map(item => {
          const Icon = item.icon;
          return <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${activeTab === item.id ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-gray-700'} ${!isSidebarOpen && 'justify-center px-4'}`} title={!isSidebarOpen ? item.label : undefined}>
                <Icon className="h-5 w-5 flex-shrink-0" />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>;
        })}
        </nav>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t">
          <Button variant="ghost" onClick={() => setShowLogoutModal(true)} className={`w-full flex items-center gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 ${!isSidebarOpen && 'justify-center px-4'}`} title={!isSidebarOpen ? 'Log out' : undefined}>
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {isSidebarOpen && <span>Log out</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Fixed Header */}
        <header className="fixed top-0 right-0 bg-white shadow-sm border-b px-6 py-4 z-30 transition-all duration-300" style={{
        left: isSidebarOpen ? '16rem' : '4rem'
      }}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h2>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      GA
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Global Administrator</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowLogoutModal(true)} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content with top padding to account for fixed header */}
        <main className="flex-1 p-6 overflow-y-auto pt-24">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal isOpen={showLogoutModal} onConfirm={confirmLogout} onCancel={() => setShowLogoutModal(false)} />
    </div>;
};
export default GlobalAdminLayout;
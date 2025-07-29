
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import GlobalAdminLayout from '@/components/layout/GlobalAdminLayout';
import GlobalAdminDashboard from '@/components/global-admin/GlobalAdminDashboard';
import OrganizationManagement from '@/components/global-admin/OrganizationManagement';
import UserManagement from '@/components/global-admin/UserManagement';
import BookingAuditLogs from '@/components/global-admin/BookingAuditLogs';
import PlatformSettings from '@/components/global-admin/PlatformSettings';
import SecurityCenter from '@/components/global-admin/SecurityCenter';
import WaitlistManagement from '@/components/global-admin/WaitlistManagement';
import EmailManagement from '@/components/global-admin/EmailManagement';
import MessageComposer from '@/components/messaging/MessageComposer';
import MessageHistory from '@/components/messaging/MessageHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const GlobalAdmin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Check if user is authenticated as global admin
  const globalAdminToken = localStorage.getItem('globalAdminToken');
  if (!globalAdminToken) {
    return <Navigate to="/global-admin/login" replace />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <GlobalAdminDashboard />;
      case 'organizations':
        return <OrganizationManagement />;
      case 'users':
        return <UserManagement />;
      case 'messages':
        return (
          <div className="space-y-6">
            <Tabs defaultValue="compose" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="compose">Compose Message</TabsTrigger>
                <TabsTrigger value="history">Message History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="compose" className="mt-6">
                <MessageComposer userRole="global_admin" />
              </TabsContent>
              
              <TabsContent value="history" className="mt-6">
                <MessageHistory />
              </TabsContent>
            </Tabs>
          </div>
        );
      case 'waitlist':
        return <WaitlistManagement />;
      case 'emails':
        return <EmailManagement />;
      case 'audit-logs':
        return <BookingAuditLogs />;
      case 'platform-settings':
        return <PlatformSettings />;
      case 'security':
        return <SecurityCenter />;
      default:
        return <GlobalAdminDashboard />;
    }
  };

  return (
    <GlobalAdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </GlobalAdminLayout>
  );
};

export default GlobalAdmin;

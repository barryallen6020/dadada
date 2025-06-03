
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import GlobalAdminLayout from '@/components/layout/GlobalAdminLayout';
import GlobalAdminDashboard from '@/components/global-admin/GlobalAdminDashboard';
import OrganizationManagement from '@/components/global-admin/OrganizationManagement';
import UserManagement from '@/components/global-admin/UserManagement';
import BookingAuditLogs from '@/components/global-admin/BookingAuditLogs';
import PlatformSettings from '@/components/global-admin/PlatformSettings';
import SecurityCenter from '@/components/global-admin/SecurityCenter';

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

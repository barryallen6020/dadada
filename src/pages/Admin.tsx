
import React from 'react';
import AdminBookings from './admin/AdminBookings';
import AdminUsers from './admin/AdminUsers';
import AdminSettings from './admin/AdminSettings';
import HubManagement from './admin/HubManagement';
import OrganizationSettings from './admin/OrganizationSettings';
import RevenueManagement from './admin/RevenueManagement';
import AnnouncementCenter from '@/components/admin/announcements/AnnouncementCenter';
import ApiKeyManagement from '@/components/admin/api/ApiKeyManagement';
import AuditLogging from '@/components/admin/audit/AuditLogging';

interface AdminProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

const Admin: React.FC<AdminProps> = ({ activeSection = 'revenue' }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'revenue':
        return <RevenueManagement />;
      case 'announcements':
        return <AnnouncementCenter />;
      case 'api-keys':
        return <ApiKeyManagement />;
      case 'audit-logs':
        return <AuditLogging />;
      case 'bookings':
        return <AdminBookings />;
      case 'users':
        return <AdminUsers />;
      case 'hubs':
        return <HubManagement />;
      case 'organization':
        return <OrganizationSettings />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <RevenueManagement />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {renderContent()}
    </div>
  );
};

export default Admin;

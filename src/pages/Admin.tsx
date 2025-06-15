
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminBookings from './admin/AdminBookings';
import AdminUsers from './admin/AdminUsers';
import AdminSettings from './admin/AdminSettings';
import HubManagement from './admin/HubManagement';
import OrganizationSettings from './admin/OrganizationSettings';
import RevenueManagement from './admin/RevenueManagement';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('revenue');

  const renderContent = () => {
    switch (activeSection) {
      case 'revenue':
        return <RevenueManagement />;
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
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;

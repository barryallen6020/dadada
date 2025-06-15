
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
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
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default Admin;

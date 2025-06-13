
import React from 'react';
import WorkspaceAdminLayout from '@/components/workspace-admin/WorkspaceAdminLayout';
import OwnerDashboard from '@/components/workspace-admin/dashboard/OwnerDashboard';
import ManagerDashboard from '@/components/workspace-admin/dashboard/ManagerDashboard';
import StaffDashboard from '@/components/workspace-admin/dashboard/StaffDashboard';
import { useWorkspaceAdminAuth } from '@/hooks/useWorkspaceAdminAuth';

const WorkspaceAdmin = () => {
  const { user } = useWorkspaceAdminAuth();

  const renderDashboard = () => {
    if (!user) return <div>Loading...</div>;
    
    switch (user.role) {
      case 'ORG_OWNER':
        return <OwnerDashboard />;
      case 'WORKSPACE_MANAGER':
        return <ManagerDashboard />;
      case 'STAFF':
        return <StaffDashboard />;
      default:
        return <div>Unauthorized access</div>;
    }
  };

  return (
    <WorkspaceAdminLayout>
      {renderDashboard()}
    </WorkspaceAdminLayout>
  );
};

export default WorkspaceAdmin;

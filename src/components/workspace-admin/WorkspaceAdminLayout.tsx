
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { WorkspaceAdminSidebar } from './WorkspaceAdminSidebar';
import { WorkspaceAdminHeader } from './WorkspaceAdminHeader';
import { useWorkspaceAdminAuth } from '@/hooks/useWorkspaceAdminAuth';

const WorkspaceAdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const { user, permissions } = useWorkspaceAdminAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <WorkspaceAdminSidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole={user.role}
        permissions={permissions}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <WorkspaceAdminHeader 
          user={user}
          currentPath={location.pathname}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default WorkspaceAdminLayout;

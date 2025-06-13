
import React from 'react';
import WorkspaceAdminLayout from '@/components/workspace-admin/WorkspaceAdminLayout';
import WorkspaceListPage from '@/components/workspace-admin/workspaces/WorkspaceListPage';

const WorkspaceList = () => {
  return (
    <WorkspaceAdminLayout>
      <WorkspaceListPage />
    </WorkspaceAdminLayout>
  );
};

export default WorkspaceList;


import React, { useState } from 'react';
import HubManagerLayout from '@/components/layout/HubManagerLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings } from 'lucide-react';
import WorkspaceStats from '@/components/hubmanager/workspaces/WorkspaceStats';
import WorkspaceCard from '@/components/hubmanager/workspaces/WorkspaceCard';
import WorkspaceListView from '@/components/hubmanager/workspaces/WorkspaceListView';

const HubManagerWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([
    {
      id: 1,
      name: 'Creative Studio',
      location: 'Floor 1, Room A',
      capacity: 24,
      currentOccupancy: 18,
      todayBookings: 28,
      checkedIn: 16,
      status: 'active',
      revenue: 45000,
      type: 'Open Desk'
    },
    {
      id: 2,
      name: 'Tech Hub',
      location: 'Floor 2, Room B',
      capacity: 32,
      currentOccupancy: 24,
      todayBookings: 35,
      checkedIn: 22,
      status: 'active',
      revenue: 62000,
      type: 'Hot Desk'
    },
    {
      id: 3,
      name: 'Meeting Room Alpha',
      location: 'Floor 1, Room C',
      capacity: 8,
      currentOccupancy: 0,
      todayBookings: 6,
      checkedIn: 0,
      status: 'maintenance',
      revenue: 18000,
      type: 'Meeting Room'
    },
    {
      id: 4,
      name: 'Quiet Zone',
      location: 'Floor 3, Room A',
      capacity: 16,
      currentOccupancy: 12,
      todayBookings: 18,
      checkedIn: 10,
      status: 'active',
      revenue: 32000,
      type: 'Focus Area'
    }
  ]);

  const toggleWorkspaceStatus = (id: number) => {
    setWorkspaces(prev => prev.map(workspace => 
      workspace.id === id 
        ? { ...workspace, status: workspace.status === 'active' ? 'inactive' : 'active' }
        : workspace
    ));
  };

  return (
    <HubManagerLayout>
      <div className="space-y-4 md:space-y-6 px-2 sm:px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 md:gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-deskhive-navy">Workspace Management</h1>
            <p className="text-xs md:text-sm text-deskhive-darkgray">Monitor and control all workspaces in your hub</p>
          </div>
          <Button className="bg-deskhive-orange hover:bg-deskhive-orange/90 text-xs md:text-sm" size="sm">
            <Settings className="h-3 w-3 md:h-4 md:w-4 mr-2" />
            Hub Settings
          </Button>
        </div>

        <WorkspaceStats workspaces={workspaces} />

        {/* Workspace List */}
        <Tabs defaultValue="grid" className="space-y-3 md:space-y-4">
          <TabsList className="glass-nav border-white/20 text-xs md:text-sm">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-3 md:space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {workspaces.map((workspace) => (
                <WorkspaceCard
                  key={workspace.id}
                  workspace={workspace}
                  onToggleStatus={toggleWorkspaceStatus}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-3 md:space-y-4">
            <WorkspaceListView
              workspaces={workspaces}
              onToggleStatus={toggleWorkspaceStatus}
            />
          </TabsContent>
        </Tabs>
      </div>
    </HubManagerLayout>
  );
};

export default HubManagerWorkspaces;

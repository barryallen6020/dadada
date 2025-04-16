
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkspaceManagementTable from "@/components/admin/WorkspaceManagementTable";
import HubPricingManager from "@/components/admin/HubPricingManager";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const HubManagement = () => {
  const navigate = useNavigate();

  const handleAddWorkspace = () => {
    navigate("/admin/workspace/create");
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto pb-10">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Hub Management</h1>
            <p className="text-sm md:text-base text-deskhive-darkgray/80">
              Manage hubs, their settings, and pricing
            </p>
          </div>
          <Button onClick={handleAddWorkspace} className="bg-deskhive-navy hover:bg-deskhive-navy/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Workspace
          </Button>
        </div>

        <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
          <CardContent className="p-6">
            <Tabs defaultValue="management" className="space-y-6">
              <TabsList>
                <TabsTrigger value="management">Hub Management</TabsTrigger>
                <TabsTrigger value="pricing">Hub Pricing</TabsTrigger>
              </TabsList>

              <TabsContent value="management">
                <WorkspaceManagementTable />
              </TabsContent>

              <TabsContent value="pricing">
                <HubPricingManager />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HubManagement;

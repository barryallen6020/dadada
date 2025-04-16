
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkspaceManagementTable from "@/components/admin/WorkspaceManagementTable";
import HubPricingManager from "@/components/admin/HubPricingManager";

const HubManagement = () => {
  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto pb-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Hub Management</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Manage hubs, their settings, and pricing
          </p>
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

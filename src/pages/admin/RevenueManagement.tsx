
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RevenueOverview from '@/components/admin/revenue/RevenueOverview';
import WorkspaceAnalytics from '@/components/admin/analytics/WorkspaceAnalytics';
import FinancialReports from '@/components/admin/reports/FinancialReports';
import PricingManagement from '@/components/admin/revenue/PricingManagement';

const RevenueManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="w-full max-w-7xl mx-auto pb-10">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">
          Revenue Management
        </h1>
        <p className="text-sm md:text-base text-deskhive-darkgray/80">
          Monitor revenue, analyze workspace performance, and manage pricing
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
          <TabsTrigger value="analytics">Workspace Analytics</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <RevenueOverview />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <WorkspaceAnalytics />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <FinancialReports />
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <PricingManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RevenueManagement;

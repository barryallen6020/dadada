
import React, { useState } from 'react';
import WorkspaceAdminLayout from '@/components/workspace-admin/WorkspaceAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, DollarSign, Percent, Clock } from 'lucide-react';

const WorkspacePricing = () => {
  const [pricingPlans] = useState([
    { id: '1', name: 'Hourly Rate', price: 5, type: 'hourly', currency: 'USD', active: true },
    { id: '2', name: 'Daily Pass', price: 25, type: 'daily', currency: 'USD', active: true },
    { id: '3', name: 'Monthly Plan', price: 150, type: 'monthly', currency: 'USD', active: false }
  ]);

  const [promotions] = useState([
    { id: '1', code: 'WELCOME20', discount: 20, type: 'percentage', active: true, expiresAt: '2024-12-31' },
    { id: '2', code: 'STUDENT', discount: 5, type: 'fixed', active: true, expiresAt: '2024-12-31' }
  ]);

  return (
    <WorkspaceAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Pricing & Promotions</h1>
            <p className="text-muted-foreground">Manage workspace pricing plans and promotional offers</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Pricing Plan
          </Button>
        </div>

        <Tabs defaultValue="pricing" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pricing">Pricing Plans</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
            <TabsTrigger value="settings">Billing Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="pricing" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <Card key={plan.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {plan.name}
                      <Badge variant={plan.active ? 'default' : 'secondary'}>
                        {plan.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-2xl font-bold">{plan.price}</span>
                        <span className="text-sm">/ {plan.type}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="promotions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Promotions</CardTitle>
                <CardDescription>Manage discount codes and promotional offers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {promotions.map((promo) => (
                    <div key={promo.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">{promo.code}</Badge>
                        <div>
                          <p className="font-medium">
                            {promo.discount}{promo.type === 'percentage' ? '%' : ' USD'} off
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Expires: {promo.expiresAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={promo.active} />
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Configuration</CardTitle>
                <CardDescription>Configure payment methods and billing settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                        <SelectItem value="gbp">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input placeholder="0.00" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Require payment before booking</Label>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </WorkspaceAdminLayout>
  );
};

export default WorkspacePricing;

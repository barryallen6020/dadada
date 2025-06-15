
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, DollarSign, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PricingTier {
  id: string;
  name: string;
  type: string;
  basePrice: number;
  hourlyRate: number;
  peakMultiplier: number;
  isActive: boolean;
  features: string[];
}

interface PricingManagementProps {
  isSidebarCollapsed?: boolean;
}

const PricingManagement: React.FC<PricingManagementProps> = ({ isSidebarCollapsed = false }) => {
  const { toast } = useToast();
  const [editingTier, setEditingTier] = useState<string | null>(null);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    {
      id: '1',
      name: 'Hot Desk',
      type: 'Flexible',
      basePrice: 5000,
      hourlyRate: 2000,
      peakMultiplier: 1.5,
      isActive: true,
      features: ['WiFi Access', 'Basic Amenities', 'Shared Space']
    },
    {
      id: '2',
      name: 'Private Office',
      type: 'Dedicated',
      basePrice: 15000,
      hourlyRate: 5000,
      peakMultiplier: 1.3,
      isActive: true,
      features: ['Private Space', 'WiFi Access', 'Meeting Room Access', 'Storage']
    },
    {
      id: '3',
      name: 'Meeting Room',
      type: 'Bookable',
      basePrice: 0,
      hourlyRate: 8000,
      peakMultiplier: 2.0,
      isActive: true,
      features: ['Projector', 'Whiteboard', 'Video Conferencing', 'Refreshments']
    }
  ]);

  const handleEditTier = (tierId: string) => {
    setEditingTier(tierId);
  };

  const handleSaveTier = (tierId: string) => {
    setEditingTier(null);
    toast({
      title: "Pricing Updated",
      description: "Pricing tier has been successfully updated.",
    });
  };

  const handleCancelEdit = () => {
    setEditingTier(null);
  };

  const handleToggleActive = (tierId: string) => {
    setPricingTiers(prev => 
      prev.map(tier => 
        tier.id === tierId 
          ? { ...tier, isActive: !tier.isActive }
          : tier
      )
    );
    toast({
      title: "Status Updated",
      description: "Pricing tier status has been updated.",
    });
  };

  const updateTierValue = (tierId: string, field: keyof PricingTier, value: any) => {
    setPricingTiers(prev => 
      prev.map(tier => 
        tier.id === tierId 
          ? { ...tier, [field]: value }
          : tier
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Pricing Management</h2>
        <Button>
          <DollarSign className="h-4 w-4 mr-2" />
          Add New Tier
        </Button>
      </div>

      <div className={`grid gap-4 ${
        isSidebarCollapsed 
          ? 'grid-cols-1 xl:grid-cols-2' 
          : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
      }`}>
        {pricingTiers.map((tier) => (
          <Card key={tier.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  <CardDescription>{tier.type}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={tier.isActive}
                    onCheckedChange={() => handleToggleActive(tier.id)}
                  />
                  {editingTier === tier.id ? (
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" onClick={() => handleSaveTier(tier.id)}>
                        <Save className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => handleEditTier(tier.id)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
              <Badge variant={tier.isActive ? "default" : "secondary"} className="w-fit">
                {tier.isActive ? "Active" : "Inactive"}
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`base-${tier.id}`} className="text-xs">Base Price (₦)</Label>
                  {editingTier === tier.id ? (
                    <Input
                      id={`base-${tier.id}`}
                      type="number"
                      value={tier.basePrice}
                      onChange={(e) => updateTierValue(tier.id, 'basePrice', Number(e.target.value))}
                      className="text-sm"
                    />
                  ) : (
                    <div className="text-sm font-medium">₦{tier.basePrice.toLocaleString()}</div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor={`hourly-${tier.id}`} className="text-xs">Hourly Rate (₦)</Label>
                  {editingTier === tier.id ? (
                    <Input
                      id={`hourly-${tier.id}`}
                      type="number"
                      value={tier.hourlyRate}
                      onChange={(e) => updateTierValue(tier.id, 'hourlyRate', Number(e.target.value))}
                      className="text-sm"
                    />
                  ) : (
                    <div className="text-sm font-medium">₦{tier.hourlyRate.toLocaleString()}</div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor={`peak-${tier.id}`} className="text-xs">Peak Hour Multiplier</Label>
                {editingTier === tier.id ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      id={`peak-${tier.id}`}
                      type="number"
                      step="0.1"
                      value={tier.peakMultiplier}
                      onChange={(e) => updateTierValue(tier.id, 'peakMultiplier', Number(e.target.value))}
                      className="text-sm"
                    />
                    <Percent className="h-4 w-4 text-gray-400" />
                  </div>
                ) : (
                  <div className="text-sm font-medium">{tier.peakMultiplier}x</div>
                )}
              </div>

              <div>
                <Label className="text-xs">Features</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tier.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="text-xs text-gray-500">Peak Hour Price</div>
                <div className="text-sm font-semibold text-gray-900">
                  ₦{Math.round(tier.hourlyRate * tier.peakMultiplier).toLocaleString()}/hour
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Revenue Impact Analysis</CardTitle>
          <CardDescription>How pricing changes affect your revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">₦2,450,000</div>
              <div className="text-sm text-gray-600">Current Month Revenue</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">₦2,680,000</div>
              <div className="text-sm text-gray-600">Projected Next Month</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">+9.4%</div>
              <div className="text-sm text-gray-600">Growth Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingManagement;

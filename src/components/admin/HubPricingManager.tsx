
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { workspaces } from "@/data/workspaces";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  Save, 
  AlertCircle,
  Tag
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HubPricingManager = () => {
  const { toast } = useToast();
  
  // State to manage the workspaces with price and enabled status
  const [hubs, setHubs] = useState(workspaces.map(hub => ({
    ...hub,
    newPrice: hub.pricePerHour,
    enabled: hub.enabled ?? hub.available // Use enabled if it exists, otherwise use available
  })));

  const handleStatusChange = (id: string, enabled: boolean) => {
    setHubs(hubs.map(hub => 
      hub.id === id ? { ...hub, enabled } : hub
    ));
  };

  const handlePriceChange = (id: string, newPrice: string) => {
    const price = parseInt(newPrice) || 0;
    setHubs(hubs.map(hub => 
      hub.id === id ? { ...hub, newPrice: price } : hub
    ));
  };

  const handleSave = (id: string) => {
    const hub = hubs.find(h => h.id === id);
    if (!hub) return;

    // In a real app, this would update the database
    // For now we'll just simulate it with a toast notification
    toast({
      title: "Hub updated",
      description: `${hub.name} has been updated successfully.`,
    });
  };

  const handleSaveAll = () => {
    // In a real app, this would update all hubs in the database
    toast({
      title: "All hubs updated",
      description: "All hub settings have been saved successfully.",
    });
  };

  return (
    <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Hub Pricing Management
            </CardTitle>
            <CardDescription>
              Configure pricing and availability for each hub
            </CardDescription>
          </div>
          <Button onClick={handleSaveAll} className="bg-deskhive-navy hover:bg-deskhive-navy/90">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hub Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price Per Hour (₦)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hubs.map((hub) => (
              <TableRow key={hub.id}>
                <TableCell className="font-medium">{hub.name}</TableCell>
                <TableCell>{hub.location}</TableCell>
                <TableCell>{hub.type}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-deskhive-orange" />
                    <Input
                      type="number"
                      value={hub.newPrice}
                      onChange={(e) => handlePriceChange(hub.id, e.target.value)}
                      className="w-24 p-1 h-8 bg-white/30 backdrop-blur-sm border-white/30"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Switch
                      checked={hub.enabled}
                      onCheckedChange={(checked) => handleStatusChange(hub.id, checked)}
                      className="mr-2"
                    />
                    <Label className={hub.enabled ? "text-green-600" : "text-red-600"}>
                      {hub.enabled ? "Enabled" : "Disabled"}
                    </Label>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    onClick={() => handleSave(hub.id)} 
                    size="sm" 
                    variant="outline"
                    className="h-8"
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-6 p-4 border rounded-md bg-amber-50 flex items-start">
          <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-800">Important Note</h4>
            <p className="text-xs text-amber-700 mt-1">
              Disabling a hub will make it unavailable for new bookings. Existing bookings for disabled hubs will not be affected.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HubPricingManager;


import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HubSettingsProps {
  defaultCheckInTime: string;
  setDefaultCheckInTime: (value: string) => void;
  defaultCheckOutTime: string;
  setDefaultCheckOutTime: (value: string) => void;
  advanceBookingDays: number;
  setAdvanceBookingDays: (value: number) => void;
  cancellationPeriodHours: number;
  setCancellationPeriodHours: (value: number) => void;
  allowOvernight: boolean;
  setAllowOvernight: (value: boolean) => void;
  requireApproval: boolean;
  setRequireApproval: (value: boolean) => void;
}

const HubSettings: React.FC<HubSettingsProps> = ({
  defaultCheckInTime,
  setDefaultCheckInTime,
  defaultCheckOutTime,
  setDefaultCheckOutTime,
  advanceBookingDays,
  setAdvanceBookingDays,
  cancellationPeriodHours,
  setCancellationPeriodHours,
  allowOvernight,
  setAllowOvernight,
  requireApproval,
  setRequireApproval,
}) => {
  const { toast } = useToast();

  const handleSaveHub = () => {
    toast({
      title: "Settings saved",
      description: "Hub settings have been updated successfully.",
    });
  };

  return (
    <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Building2 className="h-5 w-5 mr-2" />
          Hub Settings
        </CardTitle>
        <CardDescription>
          Configure settings related to hub operations and bookings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="check-in-time">Default Check-in Time</Label>
            <Input
              id="check-in-time"
              type="time"
              value={defaultCheckInTime}
              onChange={(e) => setDefaultCheckInTime(e.target.value)}
              className="bg-white/30 backdrop-blur-sm border-white/30"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="check-out-time">Default Check-out Time</Label>
            <Input
              id="check-out-time"
              type="time"
              value={defaultCheckOutTime}
              onChange={(e) => setDefaultCheckOutTime(e.target.value)}
              className="bg-white/30 backdrop-blur-sm border-white/30"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="advance-booking">Advance Booking Period (Days)</Label>
            <Input
              id="advance-booking"
              type="number"
              min="1"
              max="365"
              value={advanceBookingDays}
              onChange={(e) => setAdvanceBookingDays(parseInt(e.target.value))}
              className="bg-white/30 backdrop-blur-sm border-white/30"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="cancellation-period">Cancellation Period (Hours)</Label>
            <Input
              id="cancellation-period"
              type="number"
              min="0"
              max="168"
              value={cancellationPeriodHours}
              onChange={(e) => setCancellationPeriodHours(parseInt(e.target.value))}
              className="bg-white/30 backdrop-blur-sm border-white/30"
            />
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="allow-overnight" className="text-base">Allow Overnight Bookings</Label>
              <p className="text-xs text-deskhive-darkgray/70 mt-1">
                Enable users to book workspaces overnight
              </p>
            </div>
            <Switch
              id="allow-overnight"
              checked={allowOvernight}
              onCheckedChange={setAllowOvernight}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="require-approval" className="text-base">Require Booking Approval</Label>
              <p className="text-xs text-deskhive-darkgray/70 mt-1">
                Require admin approval for all bookings
              </p>
            </div>
            <Switch
              id="require-approval"
              checked={requireApproval}
              onCheckedChange={setRequireApproval}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveHub} className="bg-deskhive-navy hover:bg-deskhive-navy/90">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HubSettings;

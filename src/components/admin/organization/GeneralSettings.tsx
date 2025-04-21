
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import organizationService from "@/services/organizationService";

interface GeneralSettingsProps {
  businessName: string;
  setBusinessName: (value: string) => void;
  adminEmail: string;
  setAdminEmail: (value: string) => void;
  contactPhone: string;
  setContactPhone: (value: string) => void;
  supportEmail: string;
  setSupportEmail: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
  timeZone: string;
  setTimeZone: (value: string) => void;
  organizationId: string;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  businessName,
  setBusinessName,
  adminEmail,
  setAdminEmail,
  contactPhone,
  setContactPhone,
  supportEmail,
  setSupportEmail,
  currency,
  setCurrency,
  timeZone,
  setTimeZone,
  organizationId
}) => {
  const { toast } = useToast();

  const handleSaveGeneral = async () => {
    try {
      await organizationService.updateOrganization(organizationId, {
        name: businessName,
        currency
      });
      
      toast({
        title: "Settings saved",
        description: "General settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Globe className="h-5 w-5 mr-2" />
          General Settings
        </CardTitle>
        <CardDescription>
          Configure basic system-wide settings for your DeskHive platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="business-name">Business Name</Label>
            <Input
              id="business-name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="bg-white/30 backdrop-blur-sm border-white/30"
            />
            <p className="text-xs text-deskhive-darkgray/70">
              This will appear in all communications and documents
            </p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="admin-email">Admin Email</Label>
            <Input
              id="admin-email"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="bg-white/30 backdrop-blur-sm border-white/30"
            />
            <p className="text-xs text-deskhive-darkgray/70">
              Primary email for system notifications
            </p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="contact-phone">Contact Phone</Label>
            <Input
              id="contact-phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="bg-white/30 backdrop-blur-sm border-white/30"
            />
            <p className="text-xs text-deskhive-darkgray/70">
              Main contact number for support
            </p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="support-email">Support Email</Label>
            <Input
              id="support-email"
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="bg-white/30 backdrop-blur-sm border-white/30"
            />
            <p className="text-xs text-deskhive-darkgray/70">
              Email address for user support inquiries
            </p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="currency">Default Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency" className="bg-white/30 backdrop-blur-sm border-white/30">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                <SelectItem value="USD">US Dollar ($)</SelectItem>
                <SelectItem value="GBP">British Pound (£)</SelectItem>
                <SelectItem value="EUR">Euro (€)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-deskhive-darkgray/70">
              Currency used for all transactions
            </p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="timezone">Time Zone</Label>
            <Select value={timeZone} onValueChange={setTimeZone}>
              <SelectTrigger id="timezone" className="bg-white/30 backdrop-blur-sm border-white/30">
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Africa/Lagos">Africa/Lagos (GMT+1)</SelectItem>
                <SelectItem value="Africa/Accra">Africa/Accra (GMT+0)</SelectItem>
                <SelectItem value="Europe/London">Europe/London (GMT+0/+1)</SelectItem>
                <SelectItem value="America/New_York">America/New_York (GMT-5/-4)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-deskhive-darkgray/70">
              Default time zone for bookings and operations
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveGeneral} className="bg-deskhive-navy hover:bg-deskhive-navy/90">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GeneralSettings;

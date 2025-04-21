
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Save, Bell, MailCheck, BellRing } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationSettingsProps {
  emailNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  adminBookingAlerts: boolean;
  setAdminBookingAlerts: (value: boolean) => void;
  userWelcomeEmails: boolean;
  setUserWelcomeEmails: (value: boolean) => void;
  bookingReminders: boolean;
  setBookingReminders: (value: boolean) => void;
  marketingEmails: boolean;
  setMarketingEmails: (value: boolean) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  emailNotifications,
  setEmailNotifications,
  adminBookingAlerts,
  setAdminBookingAlerts,
  userWelcomeEmails,
  setUserWelcomeEmails,
  bookingReminders,
  setBookingReminders,
  marketingEmails,
  setMarketingEmails,
}) => {
  const { toast } = useToast();

  const handleSaveNotifications = () => {
    toast({
      title: "Settings saved",
      description: "Notification settings have been updated successfully.",
    });
  };

  return (
    <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Configure email notifications and system alerts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
            <p className="text-xs text-deskhive-darkgray/70 mt-1">
              Enable all email notifications system-wide
            </p>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium flex items-center">
            <MailCheck className="h-4 w-4 mr-2" />
            Email Notification Types
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
              <div>
                <Label htmlFor="admin-booking-alerts" className="text-sm">Admin Booking Alerts</Label>
                <p className="text-xs text-deskhive-darkgray/70 mt-1">
                  New booking notifications for admins
                </p>
              </div>
              <Switch
                id="admin-booking-alerts"
                checked={adminBookingAlerts}
                onCheckedChange={setAdminBookingAlerts}
                disabled={!emailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
              <div>
                <Label htmlFor="user-welcome-emails" className="text-sm">User Welcome Emails</Label>
                <p className="text-xs text-deskhive-darkgray/70 mt-1">
                  Welcome emails for new users
                </p>
              </div>
              <Switch
                id="user-welcome-emails"
                checked={userWelcomeEmails}
                onCheckedChange={setUserWelcomeEmails}
                disabled={!emailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
              <div>
                <Label htmlFor="booking-reminders" className="text-sm">Booking Reminders</Label>
                <p className="text-xs text-deskhive-darkgray/70 mt-1">
                  Send reminder emails before bookings
                </p>
              </div>
              <Switch
                id="booking-reminders"
                checked={bookingReminders}
                onCheckedChange={setBookingReminders}
                disabled={!emailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
              <div>
                <Label htmlFor="marketing-emails" className="text-sm">Marketing Emails</Label>
                <p className="text-xs text-deskhive-darkgray/70 mt-1">
                  Send promotional emails to users
                </p>
              </div>
              <Switch
                id="marketing-emails"
                checked={marketingEmails}
                onCheckedChange={setMarketingEmails}
                disabled={!emailNotifications}
              />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium flex items-center">
            <BellRing className="h-4 w-4 mr-2" />
            Email Template Settings
          </h3>
          
          <div className="space-y-3">
            <Label htmlFor="email-footer">Email Footer Text</Label>
            <Textarea
              id="email-footer"
              className="h-20 bg-white/30 backdrop-blur-sm border-white/30"
              placeholder="Enter the text that will appear in the footer of all system emails"
              defaultValue="© 2023 DeskHive Workspaces. All rights reserved. This email was sent from a notification-only address that cannot accept incoming email."
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveNotifications} className="bg-deskhive-navy hover:bg-deskhive-navy/90">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettings;

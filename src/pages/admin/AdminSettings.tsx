import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Save, 
  CreditCard, 
  Bell, 
  Mail, 
  Shield, 
  AlertTriangle, 
  Lock, 
  FileKey, 
  Globe,
  MailCheck,
  BellRing,
  Building2,
  LockKeyhole
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const AdminSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  
  // General settings state
  const [businessName, setBusinessName] = useState("DeskHive Workspaces");
  const [adminEmail, setAdminEmail] = useState("admin@deskhive.com");
  const [contactPhone, setContactPhone] = useState("+234 123 456 7890");
  const [supportEmail, setSupportEmail] = useState("support@deskhive.com");
  const [currency, setCurrency] = useState("NGN");
  const [timeZone, setTimeZone] = useState("Africa/Lagos");
  
  // Hub settings state
  const [defaultCheckInTime, setDefaultCheckInTime] = useState("08:00");
  const [defaultCheckOutTime, setDefaultCheckOutTime] = useState("18:00");
  const [advanceBookingDays, setAdvanceBookingDays] = useState(30);
  const [cancellationPeriodHours, setCancellationPeriodHours] = useState(24);
  const [allowOvernight, setAllowOvernight] = useState(false);
  const [requireApproval, setRequireApproval] = useState(true);
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [adminBookingAlerts, setAdminBookingAlerts] = useState(true);
  const [userWelcomeEmails, setUserWelcomeEmails] = useState(true);
  const [bookingReminders, setBookingReminders] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Security settings state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordMinLength, setPasswordMinLength] = useState(8);
  const [passwordRequiresSpecial, setPasswordRequiresSpecial] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(60);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "General settings have been updated successfully.",
    });
  };
  
  const handleSaveHub = () => {
    toast({
      title: "Settings saved",
      description: "Hub settings have been updated successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Settings saved",
      description: "Notification settings have been updated successfully.",
    });
  };
  
  const handleSaveSecurity = () => {
    toast({
      title: "Settings saved",
      description: "Security settings have been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto pb-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Admin Settings</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Configure global application settings for DeskHive
          </p>
        </div>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30 p-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="general" className="text-xs md:text-sm">
                <Globe className="h-4 w-4 mr-2 hidden md:inline" />
                General
              </TabsTrigger>
              <TabsTrigger value="hub" className="text-xs md:text-sm">
                <Building2 className="h-4 w-4 mr-2 hidden md:inline" />
                Hub Settings
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs md:text-sm">
                <Bell className="h-4 w-4 mr-2 hidden md:inline" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs md:text-sm">
                <Shield className="h-4 w-4 mr-2 hidden md:inline" />
                Security
              </TabsTrigger>
            </TabsList>
          </Card>
          
          <TabsContent value="general">
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
          </TabsContent>
          
          <TabsContent value="hub">
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
                    <p className="text-xs text-deskhive-darkgray/70">
                      Standard opening time for all hubs
                    </p>
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
                    <p className="text-xs text-deskhive-darkgray/70">
                      Standard closing time for all hubs
                    </p>
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
                    <p className="text-xs text-deskhive-darkgray/70">
                      How many days in advance users can book
                    </p>
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
                    <p className="text-xs text-deskhive-darkgray/70">
                      Hours before booking when cancellation is still allowed
                    </p>
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
          </TabsContent>
          
          <TabsContent value="notifications">
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
                <div className="space-y-6">
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
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveNotifications} className="bg-deskhive-navy hover:bg-deskhive-navy/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security and authentication settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor" className="text-base">Two-Factor Authentication</Label>
                      <p className="text-xs text-deskhive-darkgray/70 mt-1">
                        Require two-factor authentication for admin accounts
                      </p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="password-min-length">Minimum Password Length</Label>
                      <Input
                        id="password-min-length"
                        type="number"
                        min="6"
                        max="20"
                        value={passwordMinLength}
                        onChange={(e) => setPasswordMinLength(parseInt(e.target.value))}
                        className="bg-white/30 backdrop-blur-sm border-white/30"
                      />
                      <p className="text-xs text-deskhive-darkgray/70">
                        Minimum number of characters required for passwords
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="session-timeout">Session Timeout (Minutes)</Label>
                      <Input
                        id="session-timeout"
                        type="number"
                        min="5"
                        max="1440"
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                        className="bg-white/30 backdrop-blur-sm border-white/30"
                      />
                      <p className="text-xs text-deskhive-darkgray/70">
                        How long before inactive users are logged out
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                      <Input
                        id="max-login-attempts"
                        type="number"
                        min="3"
                        max="10"
                        value={maxLoginAttempts}
                        onChange={(e) => setMaxLoginAttempts(parseInt(e.target.value))}
                        className="bg-white/30 backdrop-blur-sm border-white/30"
                      />
                      <p className="text-xs text-deskhive-darkgray/70">
                        Number of failed login attempts before account lockout
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
                      <div>
                        <Label htmlFor="password-special" className="text-sm">Require Special Characters</Label>
                        <p className="text-xs text-deskhive-darkgray/70 mt-1">
                          Require at least one special character in passwords
                        </p>
                      </div>
                      <Switch
                        id="password-special"
                        checked={passwordRequiresSpecial}
                        onCheckedChange={setPasswordRequiresSpecial}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium flex items-center">
                      <LockKeyhole className="h-4 w-4 mr-2" />
                      API Security
                    </h3>
                    
                    <div className="p-4 bg-white/10 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <Label htmlFor="api-key" className="text-sm font-medium">API Key</Label>
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          <FileKey className="h-3 w-3 mr-1" />
                          Generate New Key
                        </Button>
                      </div>
                      <div className="relative">
                        <Input
                          id="api-key"
                          type="text"
                          className="pr-20 bg-white/30 backdrop-blur-sm border-white/30"
                          value="••••••••••••••••••••••••••••••"
                          readOnly
                        />
                        <Button 
                          className="absolute right-1 top-1 h-7 text-xs" 
                          size="sm"
                        >
                          Copy
                        </Button>
                      </div>
                      <p className="text-xs text-deskhive-darkgray/70 mt-2">
                        This API key provides access to the DeskHive API. Keep it secure.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSecurity} className="bg-deskhive-navy hover:bg-deskhive-navy/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;

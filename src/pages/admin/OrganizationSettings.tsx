
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Building2, Bell, Shield } from "lucide-react";
import GeneralSettings from "@/components/admin/organization/GeneralSettings";
import HubSettings from "@/components/admin/organization/HubSettings";
import NotificationSettings from "@/components/admin/organization/NotificationSettings";
import SecuritySettings from "@/components/admin/organization/SecuritySettings";
import { useOrganization } from "@/contexts/OrganizationContext";

const OrganizationSettings = () => {
  const { currentOrganization } = useOrganization();
  const [activeTab, setActiveTab] = useState("general");
  
  // General settings state
  const [businessName, setBusinessName] = useState(currentOrganization.name);
  const [adminEmail, setAdminEmail] = useState("admin@deskhive.com");
  const [contactPhone, setContactPhone] = useState("+234 123 456 7890");
  const [supportEmail, setSupportEmail] = useState("support@deskhive.com");
  const [currency, setCurrency] = useState(currentOrganization.currency || "NGN");
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
            <GeneralSettings 
              businessName={businessName}
              setBusinessName={setBusinessName}
              adminEmail={adminEmail}
              setAdminEmail={setAdminEmail}
              contactPhone={contactPhone}
              setContactPhone={setContactPhone}
              supportEmail={supportEmail}
              setSupportEmail={setSupportEmail}
              currency={currency}
              setCurrency={setCurrency}
              timeZone={timeZone}
              setTimeZone={setTimeZone}
              organizationId={currentOrganization.id}
            />
          </TabsContent>
          
          <TabsContent value="hub">
            <HubSettings 
              defaultCheckInTime={defaultCheckInTime}
              setDefaultCheckInTime={setDefaultCheckInTime}
              defaultCheckOutTime={defaultCheckOutTime}
              setDefaultCheckOutTime={setDefaultCheckOutTime}
              advanceBookingDays={advanceBookingDays}
              setAdvanceBookingDays={setAdvanceBookingDays}
              cancellationPeriodHours={cancellationPeriodHours}
              setCancellationPeriodHours={setCancellationPeriodHours}
              allowOvernight={allowOvernight}
              setAllowOvernight={setAllowOvernight}
              requireApproval={requireApproval}
              setRequireApproval={setRequireApproval}
            />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings 
              emailNotifications={emailNotifications}
              setEmailNotifications={setEmailNotifications}
              adminBookingAlerts={adminBookingAlerts}
              setAdminBookingAlerts={setAdminBookingAlerts}
              userWelcomeEmails={userWelcomeEmails}
              setUserWelcomeEmails={setUserWelcomeEmails}
              bookingReminders={bookingReminders}
              setBookingReminders={setBookingReminders}
              marketingEmails={marketingEmails}
              setMarketingEmails={setMarketingEmails}
            />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettings 
              twoFactorEnabled={twoFactorEnabled}
              setTwoFactorEnabled={setTwoFactorEnabled}
              passwordMinLength={passwordMinLength}
              setPasswordMinLength={setPasswordMinLength}
              passwordRequiresSpecial={passwordRequiresSpecial}
              setPasswordRequiresSpecial={setPasswordRequiresSpecial}
              sessionTimeout={sessionTimeout}
              setSessionTimeout={setSessionTimeout}
              maxLoginAttempts={maxLoginAttempts}
              setMaxLoginAttempts={setMaxLoginAttempts}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default OrganizationSettings;

import React, { useState } from 'react';
import HubManagerLayout from "@/components/layout/HubManagerLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Bell, 
  ShieldCheck, 
  Key,
  Upload,
  Clock,
  ArrowRight,
  Calendar
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from 'lucide-react';

const HubManagerSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Manager",
    email: "john.manager@deskhive.com",
    phone: "+234 812 345 6789",
    jobTitle: "Hub Manager",
    bio: "Experienced hub manager with 5 years in coworking space management. Focused on creating productive environments for learners.",
  });
  
  const [hubSettings, setHubSettings] = useState({
    name: "DeskHive Lagos Hub",
    address: "25 Innovation Drive, Yaba",
    city: "Lagos",
    capacity: "120",
    openingTime: "08:00",
    closingTime: "18:00",
    weekendOperation: false,
    publicHolidays: false,
    autoCheckout: true,
    checkoutTime: "18:00",
    extendedHoursAvailable: false,
    checkInsRequireApproval: false,
    walkInsAllowed: true
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    dailySummary: true,
    checkInAlerts: true,
    capacityAlerts: true,
    maintenanceReminders: false
  });
  
  const handleProfileUpdate = () => {
    // In a real app, send data to backend
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleHubUpdate = () => {
    // In a real app, send data to backend
    toast({
      title: "Hub settings updated",
      description: "Hub settings have been updated successfully.",
    });
  };
  
  const handleNotificationUpdate = () => {
    // In a real app, send data to backend
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been updated successfully.",
    });
  };
  
  const handlePasswordChange = () => {
    // In a real app, validate and update password
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully.",
    });
  };

  return (
    <HubManagerLayout>
      <div className="w-full max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Settings</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Manage your profile and hub settings
          </p>
        </div>

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="hub">Hub Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Profile Settings</CardTitle>
                <CardDescription>
                  Manage your personal information and profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-xl bg-deskhive-navy text-white">
                      JM
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">Profile Picture</h3>
                    <p className="text-sm text-deskhive-darkgray/70 mb-2">
                      Upload a professional photo for your profile
                    </p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Image
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input 
                      id="jobTitle" 
                      value={profileData.jobTitle}
                      onChange={(e) => setProfileData({...profileData, jobTitle: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    placeholder="Tell us about yourself" 
                  />
                  <p className="text-xs text-deskhive-darkgray/70">
                    This bio will be visible to learners in your hub
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-4">
                <Button onClick={handleProfileUpdate} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="hub">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Hub Settings</CardTitle>
                <CardDescription>
                  Configure your hub's operational settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="hubName">Hub Name</Label>
                  <Input 
                    id="hubName" 
                    value={hubSettings.name}
                    onChange={(e) => setHubSettings({...hubSettings, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={hubSettings.address}
                      onChange={(e) => setHubSettings({...hubSettings, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select
                      value={hubSettings.city}
                      onValueChange={(value) => setHubSettings({...hubSettings, city: value})}
                    >
                      <SelectTrigger id="city">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lagos">Lagos</SelectItem>
                        <SelectItem value="Abuja">Abuja</SelectItem>
                        <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
                        <SelectItem value="Ibadan">Ibadan</SelectItem>
                        <SelectItem value="Kano">Kano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Total Capacity</Label>
                    <Input 
                      id="capacity" 
                      type="number" 
                      value={hubSettings.capacity}
                      onChange={(e) => setHubSettings({...hubSettings, capacity: e.target.value})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-medium flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-deskhive-orange" />
                  Operating Hours
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="openingTime">Opening Time</Label>
                    <Input 
                      id="openingTime" 
                      type="time" 
                      value={hubSettings.openingTime}
                      onChange={(e) => setHubSettings({...hubSettings, openingTime: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closingTime">Closing Time</Label>
                    <Input 
                      id="closingTime" 
                      type="time" 
                      value={hubSettings.closingTime}
                      onChange={(e) => setHubSettings({...hubSettings, closingTime: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="weekendOperation" className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-deskhive-darkgray" />
                      <span>Weekend Operation</span>
                    </Label>
                    <Switch 
                      id="weekendOperation"
                      checked={hubSettings.weekendOperation}
                      onCheckedChange={(checked) => 
                        setHubSettings({...hubSettings, weekendOperation: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="publicHolidays" className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-deskhive-darkgray" />
                      <span>Open on Public Holidays</span>
                    </Label>
                    <Switch 
                      id="publicHolidays"
                      checked={hubSettings.publicHolidays}
                      onCheckedChange={(checked) => 
                        setHubSettings({...hubSettings, publicHolidays: checked})
                      }
                    />
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-medium flex items-center">
                  <ArrowRight className="h-5 w-5 mr-2 text-deskhive-orange" />
                  Check-in & Check-out Settings
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="autoCheckout" className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-deskhive-darkgray" />
                      <span>Automatic Check-out</span>
                    </Label>
                    <Switch 
                      id="autoCheckout"
                      checked={hubSettings.autoCheckout}
                      onCheckedChange={(checked) => 
                        setHubSettings({...hubSettings, autoCheckout: checked})
                      }
                    />
                  </div>
                  
                  {hubSettings.autoCheckout && (
                    <div className="space-y-2">
                      <Label htmlFor="checkoutTime">Auto Checkout Time</Label>
                      <Input 
                        id="checkoutTime" 
                        type="time" 
                        value={hubSettings.checkoutTime}
                        onChange={(e) => setHubSettings({...hubSettings, checkoutTime: e.target.value})}
                      />
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="checkInsRequireApproval" className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-deskhive-darkgray" />
                      <span>Check-ins Require Approval</span>
                    </Label>
                    <Switch 
                      id="checkInsRequireApproval"
                      checked={hubSettings.checkInsRequireApproval}
                      onCheckedChange={(checked) => 
                        setHubSettings({...hubSettings, checkInsRequireApproval: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="walkInsAllowed" className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-deskhive-darkgray" />
                      <span>Allow Walk-in Learners</span>
                    </Label>
                    <Switch 
                      id="walkInsAllowed"
                      checked={hubSettings.walkInsAllowed}
                      onCheckedChange={(checked) => 
                        setHubSettings({...hubSettings, walkInsAllowed: checked})
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-4">
                <Button onClick={handleHubUpdate} className="gap-2">
                  <Building2 className="h-4 w-4" />
                  Update Hub Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Notification Preferences</CardTitle>
                <CardDescription>
                  Manage your notification settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <h3 className="text-lg font-medium flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-deskhive-orange" />
                  Communication Channels
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="emailNotifications" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-deskhive-darkgray" />
                      <span>Email Notifications</span>
                    </Label>
                    <Switch 
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, emailNotifications: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="smsNotifications" className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-deskhive-darkgray" />
                      <span>SMS Notifications</span>
                    </Label>
                    <Switch 
                      id="smsNotifications"
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, smsNotifications: checked})
                      }
                    />
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-medium flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-deskhive-orange" />
                  Hub Alerts
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="dailySummary" className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-deskhive-darkgray" />
                      <span>Daily Hub Summary</span>
                    </Label>
                    <Switch 
                      id="dailySummary"
                      checked={notificationSettings.dailySummary}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, dailySummary: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="checkInAlerts" className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-deskhive-darkgray" />
                      <span>Check-in Alerts</span>
                    </Label>
                    <Switch 
                      id="checkInAlerts"
                      checked={notificationSettings.checkInAlerts}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, checkInAlerts: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="capacityAlerts" className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-deskhive-darkgray" />
                      <span>Capacity Alerts</span>
                    </Label>
                    <Switch 
                      id="capacityAlerts"
                      checked={notificationSettings.capacityAlerts}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, capacityAlerts: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="maintenanceReminders" className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-deskhive-darkgray" />
                      <span>Maintenance Reminders</span>
                    </Label>
                    <Switch 
                      id="maintenanceReminders"
                      checked={notificationSettings.maintenanceReminders}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, maintenanceReminders: checked})
                      }
                    />
                  </div>
                </div>
                
                <Alert className="mt-4">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Important Note</AlertTitle>
                  <AlertDescription>
                    Critical system alerts will always be sent to your email regardless of these settings.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-4">
                <Button onClick={handleNotificationUpdate} className="gap-2">
                  <Bell className="h-4 w-4" />
                  Update Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <h3 className="text-lg font-medium flex items-center">
                  <Key className="h-5 w-5 mr-2 text-deskhive-orange" />
                  Change Password
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                    <p className="text-xs text-deskhive-darkgray/70">
                      Password must be at least 8 characters and include a number and a symbol
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  
                  <Button onClick={handlePasswordChange} className="gap-2">
                    <Key className="h-4 w-4" />
                    Change Password
                  </Button>
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-medium flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2 text-deskhive-orange" />
                  Account Security
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2 p-4 border rounded-md bg-gray-50">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-deskhive-darkgray/70">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Set Up
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 p-4 border rounded-md bg-gray-50">
                    <div>
                      <h4 className="font-medium">Active Sessions</h4>
                      <p className="text-sm text-deskhive-darkgray/70">
                        Manage devices where you're currently signed in
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </HubManagerLayout>
  );
};

export default HubManagerSettings;

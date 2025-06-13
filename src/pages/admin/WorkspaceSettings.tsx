
import React, { useState } from 'react';
import WorkspaceAdminLayout from '@/components/workspace-admin/WorkspaceAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Save, Shield, Bell, Globe, Users } from 'lucide-react';

const WorkspaceSettings = () => {
  const [settings, setSettings] = useState({
    workspaceName: 'Downtown Coworking Hub',
    description: 'A modern coworking space in the heart of the city',
    timezone: 'UTC-5',
    currency: 'USD',
    language: 'en',
    autoApproveBookings: true,
    requirePayment: false,
    allowCancellations: true,
    emailNotifications: true,
    smsNotifications: false,
    publicVisible: true
  });

  return (
    <WorkspaceAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Workspace Settings</h1>
            <p className="text-muted-foreground">Configure your workspace preferences and policies</p>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="booking">Booking Policies</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Basic Information</span>
                </CardTitle>
                <CardDescription>Configure basic workspace details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="workspaceName">Workspace Name</Label>
                    <Input 
                      value={settings.workspaceName}
                      onChange={(e) => setSettings({...settings, workspaceName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.timezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="UTC+0">UTC</SelectItem>
                        <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select value={settings.currency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Default Language</Label>
                    <Select value={settings.language}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    value={settings.description}
                    onChange={(e) => setSettings({...settings, description: e.target.value})}
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={settings.publicVisible}
                    onCheckedChange={(checked) => setSettings({...settings, publicVisible: checked})}
                  />
                  <Label>Make workspace publicly visible</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workspace Images</CardTitle>
                <CardDescription>Upload photos of your workspace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-500 mb-2">Drag and drop images here, or click to browse</p>
                  <Button variant="outline">Upload Images</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Booking Policies</span>
                </CardTitle>
                <CardDescription>Configure how bookings are handled</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-approve bookings</Label>
                      <p className="text-sm text-muted-foreground">Automatically approve all booking requests</p>
                    </div>
                    <Switch 
                      checked={settings.autoApproveBookings}
                      onCheckedChange={(checked) => setSettings({...settings, autoApproveBookings: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require payment before booking</Label>
                      <p className="text-sm text-muted-foreground">Users must pay before their booking is confirmed</p>
                    </div>
                    <Switch 
                      checked={settings.requirePayment}
                      onCheckedChange={(checked) => setSettings({...settings, requirePayment: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow cancellations</Label>
                      <p className="text-sm text-muted-foreground">Users can cancel their bookings</p>
                    </div>
                    <Switch 
                      checked={settings.allowCancellations}
                      onCheckedChange={(checked) => setSettings({...settings, allowCancellations: checked})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxBookingDays">Maximum booking duration (days)</Label>
                    <Input placeholder="7" />
                  </div>
                  <div>
                    <Label htmlFor="advanceBooking">Advance booking limit (days)</Label>
                    <Input placeholder="30" />
                  </div>
                  <div>
                    <Label htmlFor="cancellationWindow">Cancellation window (hours)</Label>
                    <Input placeholder="24" />
                  </div>
                  <div>
                    <Label htmlFor="noShowWindow">No-show window (minutes)</Label>
                    <Input placeholder="15" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Configure notification settings for users and admins</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email notifications</Label>
                      <p className="text-sm text-muted-foreground">Send email notifications for bookings and updates</p>
                    </div>
                    <Switch 
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS notifications</Label>
                      <p className="text-sm text-muted-foreground">Send SMS notifications for urgent updates</p>
                    </div>
                    <Switch 
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notificationEmail">Admin notification email</Label>
                  <Input placeholder="admin@workspace.com" />
                </div>
                <div>
                  <Label htmlFor="notificationPhone">Admin notification phone</Label>
                  <Input placeholder="+1 (555) 123-4567" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>Configure security and access control settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require email verification</Label>
                      <p className="text-sm text-muted-foreground">Users must verify their email before booking</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-factor authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>IP restrictions</Label>
                      <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">Session timeout (minutes)</Label>
                    <Input placeholder="60" />
                  </div>
                  <div>
                    <Label htmlFor="passwordMinLength">Minimum password length</Label>
                    <Input placeholder="8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Third-party Integrations</CardTitle>
                <CardDescription>Connect with external services and tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Google Calendar</h3>
                      <Switch />
                    </div>
                    <p className="text-sm text-muted-foreground">Sync bookings with Google Calendar</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Slack</h3>
                      <Switch />
                    </div>
                    <p className="text-sm text-muted-foreground">Send notifications to Slack channels</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Stripe</h3>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">Process payments through Stripe</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">QuickBooks</h3>
                      <Switch />
                    </div>
                    <p className="text-sm text-muted-foreground">Sync financial data with QuickBooks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </WorkspaceAdminLayout>
  );
};

export default WorkspaceSettings;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare, Shield, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PlatformSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailProvider: 'smtp',
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    smsProvider: 'twilio',
    twilioSid: '',
    twilioToken: '',
    qrRotationInterval: '24',
    maintenanceMode: false,
    autoBackup: true,
    backupInterval: '6',
    maxSessionTime: '480',
    passwordExpiry: '90',
    mfaRequired: false
  });

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings:`, settings);
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Platform Settings</h2>
        <p className="text-gray-600">Manage global configurations and system settings</p>
      </div>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emailProvider">Email Provider</Label>
              <Select value={settings.emailProvider} onValueChange={(value) => setSettings({...settings, emailProvider: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smtp">SMTP</SelectItem>
                  <SelectItem value="sendgrid">SendGrid</SelectItem>
                  <SelectItem value="mailgun">Mailgun</SelectItem>
                  <SelectItem value="aws-ses">AWS SES</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={settings.smtpHost}
                onChange={(e) => setSettings({...settings, smtpHost: e.target.value})}
                placeholder="smtp.gmail.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="smtpPort">Port</Label>
              <Input
                id="smtpPort"
                value={settings.smtpPort}
                onChange={(e) => setSettings({...settings, smtpPort: e.target.value})}
                placeholder="587"
              />
            </div>
            <div>
              <Label htmlFor="smtpUser">Username</Label>
              <Input
                id="smtpUser"
                value={settings.smtpUser}
                onChange={(e) => setSettings({...settings, smtpUser: e.target.value})}
                placeholder="your-email@gmail.com"
              />
            </div>
            <div>
              <Label htmlFor="smtpPassword">Password</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={settings.smtpPassword}
                onChange={(e) => setSettings({...settings, smtpPassword: e.target.value})}
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <Button onClick={() => handleSave('Email')}>Save Email Settings</Button>
        </CardContent>
      </Card>

      {/* SMS Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            SMS Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="smsProvider">SMS Provider</Label>
              <Select value={settings.smsProvider} onValueChange={(value) => setSettings({...settings, smsProvider: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="aws-sns">AWS SNS</SelectItem>
                  <SelectItem value="nexmo">Nexmo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="twilioSid">Account SID</Label>
              <Input
                id="twilioSid"
                value={settings.twilioSid}
                onChange={(e) => setSettings({...settings, twilioSid: e.target.value})}
                placeholder="AC..."
              />
            </div>
            <div>
              <Label htmlFor="twilioToken">Auth Token</Label>
              <Input
                id="twilioToken"
                type="password"
                value={settings.twilioToken}
                onChange={(e) => setSettings({...settings, twilioToken: e.target.value})}
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <Button onClick={() => handleSave('SMS')}>Save SMS Settings</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="qrRotation">QR Code Rotation Interval (hours)</Label>
                <Select value={settings.qrRotationInterval} onValueChange={(value) => setSettings({...settings, qrRotationInterval: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="6">6 hours</SelectItem>
                    <SelectItem value="12">12 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="168">1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="sessionTime">Max Session Time (minutes)</Label>
                <Input
                  id="sessionTime"
                  value={settings.maxSessionTime}
                  onChange={(e) => setSettings({...settings, maxSessionTime: e.target.value})}
                  placeholder="480"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                <Input
                  id="passwordExpiry"
                  value={settings.passwordExpiry}
                  onChange={(e) => setSettings({...settings, passwordExpiry: e.target.value})}
                  placeholder="90"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="mfaRequired">Require Multi-Factor Authentication</Label>
                <Switch
                  id="mfaRequired"
                  checked={settings.mfaRequired}
                  onCheckedChange={(checked) => setSettings({...settings, mfaRequired: checked})}
                />
              </div>
            </div>
          </div>
          
          <Button onClick={() => handleSave('Security')}>Save Security Settings</Button>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            System Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className={`h-5 w-5 ${settings.maintenanceMode ? 'text-red-500' : 'text-gray-400'}`} />
              <div>
                <h4 className="font-medium">Maintenance Mode</h4>
                <p className="text-sm text-gray-600">Temporarily disable access to the platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {settings.maintenanceMode && <Badge variant="destructive">Active</Badge>}
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Automatic Backups</h4>
              <p className="text-sm text-gray-600">Automatically backup system data</p>
            </div>
            <Switch
              checked={settings.autoBackup}
              onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
            />
          </div>
          
          {settings.autoBackup && (
            <div>
              <Label htmlFor="backupInterval">Backup Interval (hours)</Label>
              <Select value={settings.backupInterval} onValueChange={(value) => setSettings({...settings, backupInterval: value})}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Every hour</SelectItem>
                  <SelectItem value="6">Every 6 hours</SelectItem>
                  <SelectItem value="12">Every 12 hours</SelectItem>
                  <SelectItem value="24">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <Button onClick={() => handleSave('System')}>Save System Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformSettings;

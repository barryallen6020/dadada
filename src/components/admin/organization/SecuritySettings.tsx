
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save, Shield, LockKeyhole, FileKey } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SecuritySettingsProps {
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (value: boolean) => void;
  passwordMinLength: number;
  setPasswordMinLength: (value: number) => void;
  passwordRequiresSpecial: boolean;
  setPasswordRequiresSpecial: (value: boolean) => void;
  sessionTimeout: number;
  setSessionTimeout: (value: number) => void;
  maxLoginAttempts: number;
  setMaxLoginAttempts: (value: number) => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  twoFactorEnabled,
  setTwoFactorEnabled,
  passwordMinLength,
  setPasswordMinLength,
  passwordRequiresSpecial,
  setPasswordRequiresSpecial,
  sessionTimeout,
  setSessionTimeout,
  maxLoginAttempts,
  setMaxLoginAttempts,
}) => {
  const { toast } = useToast();

  const handleSaveSecurity = () => {
    toast({
      title: "Settings saved",
      description: "Security settings have been updated successfully.",
    });
  };

  return (
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
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveSecurity} className="bg-deskhive-navy hover:bg-deskhive-navy/90">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SecuritySettings;

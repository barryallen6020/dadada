
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { BellRing, Globe, Mail, Moon, Palette, Shield, Sun, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const [theme, setTheme] = useState("system");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  return (
    <DashboardLayout>
      <div className="w-full max-w-5xl mx-auto pb-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Settings</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Manage your account preferences and settings
          </p>
        </div>

        <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30 overflow-hidden shadow-lg">
          <Tabs defaultValue="general" className="w-full p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-64 flex-shrink-0">
                <TabsList className="flex flex-col h-auto w-full bg-white/30 p-1 gap-1">
                  <TabsTrigger value="general" className="w-full justify-start text-left px-3 py-2 h-10">
                    <User className="h-4 w-4 mr-2" />
                    General
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="w-full justify-start text-left px-3 py-2 h-10">
                    <Palette className="h-4 w-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="w-full justify-start text-left px-3 py-2 h-10">
                    <BellRing className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="w-full justify-start text-left px-3 py-2 h-10">
                    <Shield className="h-4 w-4 mr-2" />
                    Privacy
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex-1">
                <TabsContent value="general" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Account Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="mt-1.5 glass-input bg-white/30 focus-visible:ring-deskhive-navy"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            type="tel"
                            defaultValue="+234 800 123 4567"
                            className="mt-1.5 glass-input bg-white/30 focus-visible:ring-deskhive-navy"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language" className="mt-1.5 glass-input bg-white/30 focus-visible:ring-deskhive-navy">
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English (US)</SelectItem>
                            <SelectItem value="en-gb">English (UK)</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Timezone Settings</h3>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="africa-lagos">
                        <SelectTrigger id="timezone" className="mt-1.5 glass-input bg-white/30 focus-visible:ring-deskhive-navy">
                          <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="africa-lagos">Africa/Lagos (GMT+1)</SelectItem>
                          <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                          <SelectItem value="america-new_york">America/New York (GMT-5)</SelectItem>
                          <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="appearance" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Theme</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant={theme === "light" ? "default" : "outline"} 
                          className={theme === "light" ? "bg-deskhive-navy text-white" : ""}
                          onClick={() => setTheme("light")}
                        >
                          <Sun className="h-4 w-4 mr-2" />
                          Light
                        </Button>
                        <Button 
                          variant={theme === "dark" ? "default" : "outline"}
                          className={theme === "dark" ? "bg-deskhive-navy text-white" : ""}
                          onClick={() => setTheme("dark")}
                        >
                          <Moon className="h-4 w-4 mr-2" />
                          Dark
                        </Button>
                        <Button 
                          variant={theme === "system" ? "default" : "outline"}
                          className={theme === "system" ? "bg-deskhive-navy text-white" : ""}
                          onClick={() => setTheme("system")}
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          System
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Booking Notifications</h4>
                          <p className="text-sm text-deskhive-darkgray/70">Receive emails about your bookings</p>
                        </div>
                        <Switch 
                          checked={emailNotifications} 
                          onCheckedChange={setEmailNotifications} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Marketing Emails</h4>
                          <p className="text-sm text-deskhive-darkgray/70">Receive emails about new features and offers</p>
                        </div>
                        <Switch 
                          checked={marketingEmails} 
                          onCheckedChange={setMarketingEmails} 
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="privacy" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Profile Visibility</h4>
                        <Select defaultValue="private">
                          <SelectTrigger className="mt-1.5 glass-input bg-white/30 focus-visible:ring-deskhive-navy">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public - Everyone can see your profile</SelectItem>
                            <SelectItem value="members">Members Only - Only DeskHive members can see your profile</SelectItem>
                            <SelectItem value="private">Private - Only you can see your profile</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="pt-4">
                        <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

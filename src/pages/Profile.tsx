
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Phone, MapPin, Mail, Calendar, Lock, Image } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const user = JSON.parse(localStorage.getItem("user") || '{"name": "Guest", "email": "guest@example.com"}');
  
  const userInitials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <DashboardLayout>
      <div className="w-full max-w-5xl mx-auto pb-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">My Profile</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            View and update your personal information
          </p>
        </div>

        <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30 overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-deskhive-navy/30 to-deskhive-royal/30 h-40 relative">
            <Button className="absolute right-4 top-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white">
              <Image className="h-4 w-4 mr-2" />
              Change Cover
            </Button>
          </div>
          
          <div className="px-6 relative -mt-16">
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
              <Avatar className="h-24 w-24 border-4 border-white/70 shadow-lg">
                <AvatarFallback className="bg-deskhive-navy text-2xl text-white">
                  {userInitials}
                </AvatarFallback>
                <AvatarImage src="/placeholder.svg" />
              </Avatar>
              
              <div className="flex-1 mt-2 md:mt-0">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-deskhive-darkgray/70">DeskHive Member since July 2023</p>
              </div>
              
              <Button className="w-full md:w-auto mt-2 md:mt-0 bg-deskhive-navy hover:bg-deskhive-navy/90">
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="px-6 pb-6">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-6 bg-white/30">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="security">Security Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-deskhive-darkgray">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    defaultValue={user.name.split(' ')[0]}
                    className="mt-1.5 glass-input bg-white/30 focus-visible:ring-deskhive-navy"
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastName" className="text-deskhive-darkgray">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    defaultValue={user.name.split(' ')[1] || ''}
                    className="mt-1.5 glass-input bg-white/30 focus-visible:ring-deskhive-navy"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-deskhive-darkgray">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    defaultValue={user.email}
                    className="mt-1.5 glass-input bg-white/30 focus-visible:ring-deskhive-navy"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-deskhive-darkgray">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+234 800 123 4567"
                    className="mt-1.5 glass-input bg-white/30 focus-visible:ring-deskhive-navy"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="bio" className="text-deskhive-darkgray">About Me</Label>
                  <textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full mt-1.5 rounded-md border border-white/30 bg-white/30 backdrop-blur-sm px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deskhive-navy focus-visible:ring-offset-2"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-deskhive-navy hover:bg-deskhive-navy/90">
                  Save Changes
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Change Password</h3>
                  <Card className="glass-card bg-white/10 border-white/20">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword" className="text-deskhive-darkgray">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            className="mt-1.5 glass-input bg-white/30 focus-visible:ring-deskhive-navy"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="newPassword" className="text-deskhive-darkgray">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            className="mt-1.5 glass-input bg-white/30 focus-visible:ring-deskhive-navy"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="confirmPassword" className="text-deskhive-darkgray">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            className="mt-1.5 glass-input bg-white/30 focus-visible:ring-deskhive-navy"
                          />
                        </div>
                        
                        <Button className="w-full md:w-auto bg-deskhive-navy hover:bg-deskhive-navy/90 mt-2">
                          <Lock className="h-4 w-4 mr-2" />
                          Update Password
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                  <Card className="glass-card bg-white/10 border-white/20">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-medium">Enhance your account security</h4>
                          <p className="text-sm text-deskhive-darkgray/70">Add an extra layer of security to your account by enabling two-factor authentication.</p>
                        </div>
                        <Button variant="outline" className="w-full md:w-auto border-deskhive-navy/30 text-deskhive-navy hover:bg-deskhive-navy/10">
                          Enable 2FA
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;

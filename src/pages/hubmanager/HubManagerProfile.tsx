
import React from 'react';
import HubManagerLayout from "@/components/layout/HubManagerLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building2,
  Clock,
  Briefcase,
  BarChart4,
  Settings,
  Trophy,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const achievements = [
  { title: "Hub Pioneer", description: "First month as hub manager completed", date: "January 2023" },
  { title: "Perfect Attendance", description: "100% check-in rate maintained for 30 days", date: "February 2023" },
  { title: "Hub Growth Champion", description: "Increased hub utilization by 25%", date: "March 2023" },
  { title: "Community Builder", description: "Organized 5 successful community events", date: "April 2023" },
];

const HubManagerProfile = () => {
  const navigate = useNavigate();
  
  const userStr = localStorage.getItem("user");
  const defaultUser = {
    name: "John Manager",
    email: "john.manager@deskhive.com",
    role: "hub_manager"
  };
  const user = userStr ? JSON.parse(userStr) : defaultUser;
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const stats = [
    { label: "Days as Manager", value: "125" },
    { label: "Check-ins Processed", value: "543" },
    { label: "Unique Learners", value: "187" },
    { label: "Hub Utilization", value: "78%" },
  ];

  return (
    <HubManagerLayout>
      <div className="w-full max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">My Profile</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            View and manage your profile information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-deskhive-navy to-deskhive-royal"></div>
              <div className="px-6 -mt-12 pb-6">
                <Avatar className="h-24 w-24 border-4 border-white">
                  <AvatarFallback className="text-2xl bg-deskhive-orange text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="mt-3">
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-deskhive-orange">Hub Manager</Badge>
                  </div>
                  <p className="text-sm text-deskhive-darkgray/80 mt-3">
                    Experienced hub manager focused on creating productive learning environments and supporting learner growth.
                  </p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-deskhive-orange" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-deskhive-orange" />
                    <span>+234 812 345 6789</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-deskhive-orange" />
                    <span>Lagos, Nigeria</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-deskhive-orange" />
                    <span>Joined September 2022</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    onClick={() => navigate("/hubmanager/settings")} 
                    variant="outline" 
                    className="w-full gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Hub Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Building2 className="h-5 w-5 mr-3 text-deskhive-navy mt-0.5" />
                  <div>
                    <h3 className="font-medium">DeskHive Lagos Hub</h3>
                    <p className="text-sm text-deskhive-darkgray/80">
                      25 Innovation Drive, Yaba
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-deskhive-navy mt-0.5" />
                  <div>
                    <h3 className="font-medium">Operating Hours</h3>
                    <p className="text-sm text-deskhive-darkgray/80">
                      Monday - Friday, 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 mr-3 text-deskhive-navy mt-0.5" />
                  <div>
                    <h3 className="font-medium">Capacity</h3>
                    <p className="text-sm text-deskhive-darkgray/80">
                      120 seats
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Performance Overview</CardTitle>
                <CardDescription>
                  Summary of your activity as a hub manager
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-2xl md:text-3xl font-bold text-deskhive-navy">
                        {stat.value}
                      </p>
                      <p className="text-sm text-deskhive-darkgray/80">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button variant="outline" className="gap-2">
                    <BarChart4 className="h-4 w-4" />
                    View Detailed Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Manager Achievements</CardTitle>
                <CardDescription>
                  Recognition for your accomplishments as a hub manager
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="mr-4 h-12 w-12 rounded-full bg-deskhive-skyblue/30 flex items-center justify-center text-deskhive-navy">
                        {index === 0 && <Trophy className="h-6 w-6" />}
                        {index === 1 && <Calendar className="h-6 w-6" />}
                        {index === 2 && <BarChart4 className="h-6 w-6" />}
                        {index === 3 && <Users className="h-6 w-6" />}
                      </div>
                      <div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-deskhive-darkgray/80">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-deskhive-darkgray/60 mt-1">
                          Achieved: {achievement.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <CardDescription>
                  Your latest actions as a hub manager
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex border-l-2 border-green-500 pl-4">
                    <div className="flex-1">
                      <p className="font-medium">Check-in processed for Chioma Eze</p>
                      <p className="text-sm text-deskhive-darkgray/80">
                        Lagos Hub, Yaba
                      </p>
                      <p className="text-xs text-deskhive-darkgray/60 mt-1">
                        Today, 9:15 AM
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex border-l-2 border-blue-500 pl-4">
                    <div className="flex-1">
                      <p className="font-medium">Hub settings updated</p>
                      <p className="text-sm text-deskhive-darkgray/80">
                        Modified operating hours
                      </p>
                      <p className="text-xs text-deskhive-darkgray/60 mt-1">
                        Yesterday, 4:30 PM
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex border-l-2 border-amber-500 pl-4">
                    <div className="flex-1">
                      <p className="font-medium">New learner added</p>
                      <p className="text-sm text-deskhive-darkgray/80">
                        Added Ibrahim Mohammed to the system
                      </p>
                      <p className="text-xs text-deskhive-darkgray/60 mt-1">
                        Yesterday, 2:15 PM
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex border-l-2 border-purple-500 pl-4">
                    <div className="flex-1">
                      <p className="font-medium">Manual check-out processed</p>
                      <p className="text-sm text-deskhive-darkgray/80">
                        Processed check-out for Emeka Okafor
                      </p>
                      <p className="text-xs text-deskhive-darkgray/60 mt-1">
                        December 12, 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </HubManagerLayout>
  );
};

export default HubManagerProfile;

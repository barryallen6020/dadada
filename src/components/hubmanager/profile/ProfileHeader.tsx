
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const navigate = useNavigate();
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-16 md:h-24 bg-gradient-to-r from-deskhive-navy to-deskhive-royal"></div>
      <div className="px-4 md:px-6 -mt-8 md:-mt-12 pb-4 md:pb-6">
        <Avatar className="h-16 w-16 md:h-24 md:w-24 border-4 border-white">
          <AvatarFallback className="text-lg md:text-2xl bg-deskhive-orange text-white">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="mt-2 md:mt-3">
          <h2 className="text-lg md:text-xl font-bold">{user.name}</h2>
          <div className="flex items-center mt-1">
            <Badge className="bg-deskhive-orange text-xs md:text-sm">Hub Manager</Badge>
          </div>
          <p className="text-xs md:text-sm text-deskhive-darkgray/80 mt-2 md:mt-3">
            Experienced hub manager focused on creating productive learning environments and supporting learner growth.
          </p>
        </div>
        
        <Separator className="my-3 md:my-4" />
        
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center text-xs md:text-sm">
            <Mail className="h-3 w-3 md:h-4 md:w-4 mr-2 text-deskhive-orange" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center text-xs md:text-sm">
            <Phone className="h-3 w-3 md:h-4 md:w-4 mr-2 text-deskhive-orange" />
            <span>+234 812 345 6789</span>
          </div>
          <div className="flex items-center text-xs md:text-sm">
            <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-2 text-deskhive-orange" />
            <span>Lagos, Nigeria</span>
          </div>
          <div className="flex items-center text-xs md:text-sm">
            <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2 text-deskhive-orange" />
            <span>Joined September 2022</span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-6">
          <Button 
            onClick={() => navigate("/hubmanager/settings")} 
            variant="outline" 
            className="w-full gap-2 text-xs md:text-sm"
            size="sm"
          >
            <Settings className="h-3 w-3 md:h-4 md:w-4" />
            Edit Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;

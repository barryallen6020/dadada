
import React from 'react';
import { Building2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useOrganization } from '@/contexts/OrganizationContext';

const HubManagerUserProfile = () => {
  const { currentOrganization } = useOrganization();
  
  const userStr = localStorage.getItem("hubManagerUser");
  const defaultUser = {name: "Hub Manager", email: "manager@example.com", role: "hubmanager"};
  const user = userStr ? JSON.parse(userStr) : defaultUser;

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "HM";

  return (
    <div className="relative z-[110]">
      <div className="px-4 py-3 border-b border-white/20">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-deskhive-navy" />
          <span className="text-sm font-medium text-deskhive-navy">
            {currentOrganization.name}
          </span>
        </div>
      </div>
      
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center">
          <Avatar className="h-9 w-9 mr-3">
            <AvatarFallback className="bg-deskhive-orange text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-deskhive-darkgray">
              Hub Manager
            </p>
            <p className="text-xs text-deskhive-darkgray/70">
              {user?.name || "Manager"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubManagerUserProfile;


import React from 'react';
import HubManagerLayout from "@/components/layout/HubManagerLayout";
import ProfileHeader from "@/components/hubmanager/profile/ProfileHeader";
import HubManagementInfo from "@/components/hubmanager/profile/HubManagementInfo";
import PerformanceOverview from "@/components/hubmanager/profile/PerformanceOverview";
import ManagerAchievements from "@/components/hubmanager/profile/ManagerAchievements";
import RecentActivity from "@/components/hubmanager/profile/RecentActivity";

const HubManagerProfile = () => {
  const userStr = localStorage.getItem("user");
  const defaultUser = {
    name: "John Manager",
    email: "john.manager@deskhive.com",
    role: "hub_manager"
  };
  const user = userStr ? JSON.parse(userStr) : defaultUser;

  return (
    <HubManagerLayout>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-deskhive-navy mb-1 md:mb-2">My Profile</h1>
          <p className="text-xs sm:text-sm md:text-base text-deskhive-darkgray/80">
            View and manage your profile information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-1">
            <ProfileHeader user={user} />
            <HubManagementInfo />
          </div>
          
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <PerformanceOverview />
            <ManagerAchievements />
            <RecentActivity />
          </div>
        </div>
      </div>
    </HubManagerLayout>
  );
};

export default HubManagerProfile;

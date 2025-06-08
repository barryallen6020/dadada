
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Trophy,
  Calendar,
  BarChart4,
  Users
} from "lucide-react";

const ManagerAchievements: React.FC = () => {
  const achievements = [
    { title: "Hub Pioneer", description: "First month as hub manager completed", date: "January 2023" },
    { title: "Perfect Attendance", description: "100% check-in rate maintained for 30 days", date: "February 2023" },
    { title: "Hub Growth Champion", description: "Increased hub utilization by 25%", date: "March 2023" },
    { title: "Community Builder", description: "Organized 5 successful community events", date: "April 2023" },
  ];

  const getIcon = (index: number) => {
    const iconProps = "h-5 w-5 md:h-6 md:w-6";
    switch (index) {
      case 0: return <Trophy className={iconProps} />;
      case 1: return <Calendar className={iconProps} />;
      case 2: return <BarChart4 className={iconProps} />;
      case 3: return <Users className={iconProps} />;
      default: return <Trophy className={iconProps} />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-lg md:text-xl">Manager Achievements</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Recognition for your accomplishments as a hub manager
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 md:space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex p-3 md:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="mr-3 md:mr-4 h-10 w-10 md:h-12 md:w-12 rounded-full bg-deskhive-skyblue/30 flex items-center justify-center text-deskhive-navy">
                {getIcon(index)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm md:text-base">{achievement.title}</h3>
                <p className="text-xs md:text-sm text-deskhive-darkgray/80">
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
  );
};

export default ManagerAchievements;

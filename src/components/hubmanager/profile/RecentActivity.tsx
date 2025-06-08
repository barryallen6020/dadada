
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RecentActivity: React.FC = () => {
  const activities = [
    {
      title: "Check-in processed for Chioma Eze",
      description: "Lagos Hub, Yaba",
      time: "Today, 9:15 AM",
      color: "green-500"
    },
    {
      title: "Hub settings updated",
      description: "Modified operating hours",
      time: "Yesterday, 4:30 PM",
      color: "blue-500"
    },
    {
      title: "New learner added",
      description: "Added Ibrahim Mohammed to the system",
      time: "Yesterday, 2:15 PM",
      color: "amber-500"
    },
    {
      title: "Manual check-out processed",
      description: "Processed check-out for Emeka Okafor",
      time: "December 12, 6:00 PM",
      color: "purple-500"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-lg md:text-xl">Recent Activity</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Your latest actions as a hub manager
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 md:space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className={`flex border-l-2 border-${activity.color} pl-3 md:pl-4`}>
              <div className="flex-1">
                <p className="font-medium text-sm md:text-base">{activity.title}</p>
                <p className="text-xs md:text-sm text-deskhive-darkgray/80">
                  {activity.description}
                </p>
                <p className="text-xs text-deskhive-darkgray/60 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

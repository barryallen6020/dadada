
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart4 } from "lucide-react";

const PerformanceOverview: React.FC = () => {
  const stats = [
    { label: "Days as Manager", value: "125" },
    { label: "Check-ins Processed", value: "543" },
    { label: "Unique Learners", value: "187" },
    { label: "Hub Utilization", value: "78%" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-lg md:text-xl">Performance Overview</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Summary of your activity as a hub manager
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 p-3 md:p-4 rounded-lg text-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-deskhive-navy">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-deskhive-darkgray/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 md:mt-6 flex justify-center">
          <Button variant="outline" className="gap-2 text-xs md:text-sm" size="sm">
            <BarChart4 className="h-3 w-3 md:h-4 md:w-4" />
            View Detailed Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;

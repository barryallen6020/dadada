
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CheckInInstructions = () => {
  const steps = [
    {
      number: 1,
      title: "Verify Learner Identity",
      description: "Check the learner's ID or other identification to confirm their identity."
    },
    {
      number: 2,
      title: "Check Booking Status",
      description: "Enter the learner's email to verify they have an active booking for today."
    },
    {
      number: 3,
      title: "Complete Check-In",
      description: "Once verified, complete the check-in process and provide any necessary hub information."
    },
    {
      number: 4,
      title: "For Walk-ins",
      description: "Use the Manual Entry option for walk-in learners who don't have a prior booking."
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-lg md:text-xl">Check-In Instructions</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          How to check in learners at your hub
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4">
        {steps.map((step) => (
          <div key={step.number} className="space-y-2">
            <h3 className="font-medium flex items-center text-sm md:text-base">
              <span className="bg-deskhive-navy text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-xs mr-2">
                {step.number}
              </span>
              {step.title}
            </h3>
            <p className="text-xs md:text-sm text-deskhive-darkgray/80 pl-6 md:pl-7">
              {step.description}
            </p>
          </div>
        ))}
        
        <Alert className="mt-4 md:mt-6 bg-blue-50 border-blue-200">
          <AlertTitle className="text-blue-800 text-sm md:text-base">Hub Manager Tip</AlertTitle>
          <AlertDescription className="text-blue-700 text-xs md:text-sm">
            Always remind learners to check out when they leave the hub to maintain accurate usage statistics.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default CheckInInstructions;

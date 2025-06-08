
import React from 'react';
import HubManagerLayout from "@/components/layout/HubManagerLayout";
import CheckInForm from "@/components/hubmanager/checkin/CheckInForm";
import CheckInInstructions from "@/components/hubmanager/checkin/CheckInInstructions";

const HubManagerCheckIn = () => {
  return (
    <HubManagerLayout>
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-deskhive-navy mb-1 md:mb-2">Check-In Learners</h1>
          <p className="text-xs sm:text-sm md:text-base text-deskhive-darkgray/80">
            Verify and check in learners at your hub
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <CheckInForm />
          <CheckInInstructions />
        </div>
      </div>
    </HubManagerLayout>
  );
};

export default HubManagerCheckIn;


import React from 'react';
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

const BookingDetails = () => {
  return (
    <div className="border rounded-md p-3 md:p-4 bg-white">
      <h3 className="font-medium mb-2 text-sm md:text-base">Booking Details</h3>
      <div className="space-y-2 text-xs md:text-sm">
        <div className="flex items-center">
          <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2 text-deskhive-orange" />
          <span>Today, {format(new Date(), "MMMM d, yyyy")}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3 w-3 md:h-4 md:w-4 mr-2 text-deskhive-orange" />
          <span>9:00 AM - 5:00 PM</span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;

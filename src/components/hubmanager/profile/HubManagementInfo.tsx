
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2,
  Clock,
  Briefcase
} from "lucide-react";

const HubManagementInfo: React.FC = () => {
  return (
    <Card className="mt-4 md:mt-6">
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-base md:text-lg">Hub Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4">
        <div className="flex items-start">
          <Building2 className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 text-deskhive-navy mt-0.5" />
          <div>
            <h3 className="font-medium text-sm md:text-base">DeskHive Lagos Hub</h3>
            <p className="text-xs md:text-sm text-deskhive-darkgray/80">
              25 Innovation Drive, Yaba
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <Clock className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 text-deskhive-navy mt-0.5" />
          <div>
            <h3 className="font-medium text-sm md:text-base">Operating Hours</h3>
            <p className="text-xs md:text-sm text-deskhive-darkgray/80">
              Monday - Friday, 8:00 AM - 6:00 PM
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <Briefcase className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 text-deskhive-navy mt-0.5" />
          <div>
            <h3 className="font-medium text-sm md:text-base">Capacity</h3>
            <p className="text-xs md:text-sm text-deskhive-darkgray/80">
              120 seats
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HubManagementInfo;

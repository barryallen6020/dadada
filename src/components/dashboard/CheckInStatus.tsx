
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Building2, LogOut } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { checkIns } from "@/data/workspaces";

interface CheckInStatusProps {
  userEmail: string;
}

const CheckInStatus: React.FC<CheckInStatusProps> = ({ userEmail }) => {
  const { toast } = useToast();
  
  // Safety check for empty email
  if (!userEmail) {
    return null;
  }
  
  // Find active check-in for this user
  const activeCheckIn = checkIns.find(
    checkIn => checkIn.email === userEmail && checkIn.status === "active"
  );

  const handleCheckOut = () => {
    toast({
      title: "Checked out successfully",
      description: "You have been checked out from the hub.",
    });
  };

  if (!activeCheckIn) {
    return null;
  }

  const checkInTime = new Date(activeCheckIn.checkInTime);

  return (
    <Card className="border-2 border-green-500 bg-green-50 shadow-md">
      <CardHeader className="bg-green-100 pb-2">
        <CardTitle className="flex items-center text-green-800">
          <Badge variant="outline" className="mr-2 bg-green-600 text-white border-0">Active</Badge>
          Currently Checked In
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-center text-green-800">
            <Building2 className="h-5 w-5 mr-2 text-green-600" />
            <div>
              <p className="font-medium">{activeCheckIn.hub}</p>
              <p className="text-sm text-green-600">
                Checked in {formatDistanceToNow(checkInTime, { addSuffix: true })}
              </p>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-green-700">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{format(checkInTime, "h:mm a, MMM d")}</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-2 border-green-600 text-green-700 hover:bg-green-100 hover:text-green-800"
            onClick={handleCheckOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Check Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckInStatus;

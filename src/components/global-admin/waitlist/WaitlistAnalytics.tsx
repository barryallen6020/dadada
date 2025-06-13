
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WaitlistAnalyticsProps {
  sourceData: Array<{
    source: string;
    count: number;
  }>;
}

const WaitlistAnalytics: React.FC<WaitlistAnalyticsProps> = ({ sourceData }) => {
  return (
    <div className="grid gap-3 md:gap-4 grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
          <CardTitle className="text-sm md:text-lg">Traffic Sources</CardTitle>
          <CardDescription className="text-xs md:text-sm">Where users are coming from</CardDescription>
        </CardHeader>
        <CardContent className="p-2 md:p-4">
          <div className="w-full h-[200px] md:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" fontSize={9} tick={{ fontSize: 9 }} />
                <YAxis fontSize={9} tick={{ fontSize: 9 }} width={30} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
          <CardTitle className="text-sm md:text-lg">Recent Activity</CardTitle>
          <CardDescription className="text-xs md:text-sm">Latest waitlist activities</CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="text-xs md:text-sm font-medium">New signup from TechCorp</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-xs md:text-sm font-medium">Email sent to 25 pending users</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-yellow-500 rounded-full" />
              <div className="flex-1">
                <p className="text-xs md:text-sm font-medium">3 users converted to paid plans</p>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistAnalytics;

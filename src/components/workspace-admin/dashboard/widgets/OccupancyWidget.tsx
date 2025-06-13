
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', occupancy: 85 },
  { day: 'Tue', occupancy: 78 },
  { day: 'Wed', occupancy: 92 },
  { day: 'Thu', occupancy: 88 },
  { day: 'Fri', occupancy: 95 },
  { day: 'Sat', occupancy: 65 },
  { day: 'Sun', occupancy: 45 }
];

export const OccupancyWidget = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Occupancy Rate</CardTitle>
        <CardDescription>Weekly occupancy percentage by day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'Occupancy']} />
              <Bar dataKey="occupancy" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

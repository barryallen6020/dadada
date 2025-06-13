
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface WaitlistChartsProps {
  isSidebarCollapsed?: boolean;
  chartData: Array<{
    month: string;
    entries: number;
    converted: number;
  }>;
  roleDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const WaitlistCharts: React.FC<WaitlistChartsProps> = ({
  isSidebarCollapsed = false,
  chartData,
  roleDistribution
}) => {
  return (
    <div className={`grid gap-3 md:gap-4 ${
      isSidebarCollapsed 
        ? 'grid-cols-1 xl:grid-cols-2' 
        : 'grid-cols-1 lg:grid-cols-2'
    }`}>
      <Card>
        <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
          <CardTitle className="text-sm md:text-lg">Entry Trends</CardTitle>
          <CardDescription className="text-xs md:text-sm">Monthly waitlist entries and conversions</CardDescription>
        </CardHeader>
        <CardContent className="p-2 md:p-4">
          <div className="w-full h-[150px] sm:h-[200px] md:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={9} tick={{ fontSize: 9 }} />
                <YAxis fontSize={9} tick={{ fontSize: 9 }} width={30} />
                <Tooltip />
                <Line type="monotone" dataKey="entries" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="converted" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
          <CardTitle className="text-sm md:text-lg">Role Distribution</CardTitle>
          <CardDescription className="text-xs md:text-sm">Breakdown by professional roles</CardDescription>
        </CardHeader>
        <CardContent className="p-2 md:p-4">
          <div className="w-full h-[150px] sm:h-[200px] md:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                >
                  {roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {roleDistribution.map((role, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: role.color }}
                />
                <span>{role.name}: {role.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistCharts;

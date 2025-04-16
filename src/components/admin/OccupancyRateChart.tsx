
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const OccupancyRateChart = () => {
  // Sample data
  const data = [
    {
      name: "Lagos",
      occupancy: 87,
    },
    {
      name: "Abuja",
      occupancy: 64,
    },
    {
      name: "Port Harcourt",
      occupancy: 70,
    },
    {
      name: "Ibadan",
      occupancy: 58,
    },
    {
      name: "Kano",
      occupancy: 52,
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-sm">{`Occupancy: ${payload[0].value}%`}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 50,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
        <YAxis dataKey="name" type="category" />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="occupancy" 
          fill="#022B60" 
          radius={[0, 4, 4, 0]}
          label={{ 
            position: 'right',
            formatter: (value: number) => `${value}%`,
            fill: '#333',
            fontSize: 12
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OccupancyRateChart;

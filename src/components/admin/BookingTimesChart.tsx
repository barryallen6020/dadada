
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BookingTimesChart = () => {
  // Sample data
  const data = [
    {
      time: "8 AM",
      Monday: 10,
      Tuesday: 12,
      Wednesday: 15,
      Thursday: 16,
      Friday: 14,
    },
    {
      time: "9 AM",
      Monday: 20,
      Tuesday: 25,
      Wednesday: 28,
      Thursday: 26,
      Friday: 22,
    },
    {
      time: "10 AM",
      Monday: 35,
      Tuesday: 40,
      Wednesday: 38,
      Thursday: 36,
      Friday: 32,
    },
    {
      time: "11 AM",
      Monday: 42,
      Tuesday: 45,
      Wednesday: 46,
      Thursday: 43,
      Friday: 40,
    },
    {
      time: "12 PM",
      Monday: 38,
      Tuesday: 42,
      Wednesday: 40,
      Thursday: 39,
      Friday: 35,
    },
    {
      time: "1 PM",
      Monday: 28,
      Tuesday: 32,
      Wednesday: 30,
      Thursday: 31,
      Friday: 27,
    },
    {
      time: "2 PM",
      Monday: 32,
      Tuesday: 36,
      Wednesday: 34,
      Thursday: 33,
      Friday: 30,
    },
    {
      time: "3 PM",
      Monday: 30,
      Tuesday: 33,
      Wednesday: 32,
      Thursday: 29,
      Friday: 28,
    },
    {
      time: "4 PM",
      Monday: 25,
      Tuesday: 28,
      Wednesday: 26,
      Thursday: 24,
      Friday: 22,
    },
    {
      time: "5 PM",
      Monday: 15,
      Tuesday: 18,
      Wednesday: 16,
      Thursday: 14,
      Friday: 10,
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium mb-1">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} bookings`}
            </p>
          ))}
        </div>
      );
    }
  
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="Monday" stroke="#022B60" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Tuesday" stroke="#FF9202" strokeWidth={2} />
        <Line type="monotone" dataKey="Wednesday" stroke="#0056B3" strokeWidth={2} />
        <Line type="monotone" dataKey="Thursday" stroke="#28C76F" strokeWidth={2} />
        <Line type="monotone" dataKey="Friday" stroke="#EA5455" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BookingTimesChart;

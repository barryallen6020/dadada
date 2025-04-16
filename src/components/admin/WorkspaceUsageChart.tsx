
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const WorkspaceUsageChart = () => {
  // Sample data
  const data = [
    {
      name: "Week 1",
      "Meeting Rooms": 18,
      "Hot Desks": 32,
      "Private Offices": 25,
      "Event Spaces": 10,
    },
    {
      name: "Week 2",
      "Meeting Rooms": 22,
      "Hot Desks": 35,
      "Private Offices": 28,
      "Event Spaces": 12,
    },
    {
      name: "Week 3",
      "Meeting Rooms": 30,
      "Hot Desks": 38,
      "Private Offices": 21,
      "Event Spaces": 15,
    },
    {
      name: "Week 4",
      "Meeting Rooms": 25,
      "Hot Desks": 40,
      "Private Offices": 24,
      "Event Spaces": 18,
    },
    {
      name: "Week 5",
      "Meeting Rooms": 32,
      "Hot Desks": 43,
      "Private Offices": 26,
      "Event Spaces": 14,
    },
    {
      name: "Week 6",
      "Meeting Rooms": 28,
      "Hot Desks": 45,
      "Private Offices": 30,
      "Event Spaces": 16,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="name" stroke="#333" fontSize={12} />
        <YAxis stroke="#333" fontSize={12} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Meeting Rooms"
          stackId="1"
          stroke="#022B60"
          fill="#022B60"
        />
        <Area
          type="monotone"
          dataKey="Hot Desks"
          stackId="1"
          stroke="#FF9202"
          fill="#FF9202"
        />
        <Area
          type="monotone"
          dataKey="Private Offices"
          stackId="1"
          stroke="#0056B3"
          fill="#0056B3"
        />
        <Area
          type="monotone"
          dataKey="Event Spaces"
          stackId="1"
          stroke="#28C76F"
          fill="#28C76F"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default WorkspaceUsageChart;

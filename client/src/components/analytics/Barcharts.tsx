import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Static data passed
const data = [
  { device: "Desktop", users: 600 },
  { device: "Mobile", users: 900 },
  { device: "Tablet", users: 300 }
];

const Barcharts = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center my-4">User Info</h1>

      <div className="w-full min-w-[140px] h-20 md:h-96 flex items-center justify-center overflow-hidden">
        <ResponsiveContainer width="100%" height="100%" className="flex items-center justify-center min-w-0">
          {/* BarChart */}
          <BarChart data={data} className="flex items-center justify-center">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="device" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Barcharts;

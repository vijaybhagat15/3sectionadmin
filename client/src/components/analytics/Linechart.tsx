import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Static data
const data = [
  { date: "Feb 1", totalVisitors: 900, activeUsers: 600 },
  { date: "Feb 5", totalVisitors: 1100, activeUsers: 700 },
  { date: "Feb 10", totalVisitors: 1500, activeUsers: 900 },
  { date: "Feb 15", totalVisitors: 1700, activeUsers: 1200 },
  { date: "Feb 20", totalVisitors: 2000, activeUsers: 1400 },
  { date: "Feb 25", totalVisitors: 1800, activeUsers: 1300 },
  { date: "Feb 28", totalVisitors: 2100, activeUsers: 1600 }
];

const Linechart = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center my-2">
        User Traffic Throughout the Month
      </h1>

      {/* Chart container */}
      <div className="w-full min-w-[250px] h-64 md:h-96 flex items-center justify-center overflow-hidden">
        
        <ResponsiveContainer width="100%" height="100%" className="flex items-center justify-center min-w-0">
          
          <LineChart data={data}>
            <defs>
                {/* Linear gradients */}
                <linearGradient id="colorTotalVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6655aa" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6655aa" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="colorActiveUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5a9b76" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#5a9b76" stopOpacity={0} />
                </linearGradient>
            </defs>

            {/* Grid, Axes, Tooltip, and Legend */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: '10px' }} />
            <YAxis tick={{ fontSize: '10px' }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '12px', padding: '10px'  }}  />

            {/* Lines */}
              <Line
                type="monotone"
                dataKey="totalVisitors"
                stroke="url(#colorTotalVisitors)"
                strokeWidth={3}
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="activeUsers"
                stroke="url(#colorActiveUsers)"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Linechart;

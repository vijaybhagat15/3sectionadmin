import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
  
  
} from "recharts";

//passing static data
const data = [
  { name: "Jan", Desktop: 4000, Mobile: 2400, Tablet: 1400 },
  { name: "Feb", Desktop: 3000, Mobile: 1398, Tablet: 2210 },
  { name: "Mar", Desktop: 2000, Mobile: 9800, Tablet: 2290 },
  { name: "Apr", Desktop: 2780, Mobile: 3908, Tablet: 2000 },
  { name: "May", Desktop: 1890, Mobile: 4800, Tablet: 2181 },
  { name: "Jun", Desktop: 2390, Mobile: 3800, Tablet: 2500 }
];

const colors = {
  Desktop: "#0088FE",
  Mobile: "#00C49F",
  Tablet: "#FFBB28"
};

// Define the Custom Tooltip component
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;
  
    return (
      <div className="bg-white p-2 rounded-md shadow-lg text-sm border border-gray-200">
        <p className="font-bold">{payload[0].payload.name}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.dataKey}: {entry.value}
          </p>
        ))}
      </div>
    );
  };

const Stack = () => {
  return (
    <div className="p-4 md:w-200 rounded-lg shadow-md">
    <h2 className="text-center font-bold mb-4 text-lg">Website Traffic by Device</h2>
    <ResponsiveContainer width="100%" height={300}>
       {/* barchart */}
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="Desktop" stackId="a" fill={colors.Desktop} />
        <Bar dataKey="Mobile" stackId="a" fill={colors.Mobile} />
        <Bar dataKey="Tablet" stackId="a" fill={colors.Tablet} />
      </BarChart>
    </ResponsiveContainer>
  </div>
  )
}

export default Stack

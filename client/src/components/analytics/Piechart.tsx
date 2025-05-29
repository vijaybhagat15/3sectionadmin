import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";

// Static data
const data = [
  { id: 0, name: "Direct", value: 35 },
  { id: 1, name: "Search Engines", value: 40 },
  { id: 2, name: "Social Media", value: 15 },
  { id: 3, name: "Referrals", value: 10 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Piechart = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [chartSize, setChartSize] = useState({ outerRadius: 120, innerRadius: 80 });

  // Adjust chart radius on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartSize({ outerRadius: 100, innerRadius: 60 });
      } else {
        setChartSize({ outerRadius: 120, innerRadius: 80 });
      }
    };

    handleResize(); // Initial size setting
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="text-center w-full max-w-6xl mx-auto p-4 flex flex-col items-center">
      {/* Title */}
      <h3 className="text-xl p-1 my-2">Website Traffic Sources</h3>

      {/* Chart container */}
      <div className="w-full min-w-[250px] h-80 md:h-96 flex items-center justify-center">
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={chartSize.outerRadius}
                  innerRadius={chartSize.innerRadius}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {data.map((entry) => (
                    <Cell
                      key={`cell-${entry.id}`}
                      fill={COLORS[entry.id]}
                      strokeWidth={0}
                      onMouseEnter={() => setActiveId(entry.id)}
                      onMouseLeave={() => setActiveId(null)}
                      style={{
                        transform: activeId === entry.id ? "scale(1.1)" : "scale(1)",
                        transition: "transform 0.3s ease-in-out",
                        
                      }}
                    />
                     ))}
                </Pie>

            <Tooltip />
            
            <Legend layout="horizontal" align="center" verticalAlign="bottom" className="text-sm md:text-base" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Piechart;

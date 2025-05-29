import { JSX, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';

interface ActivityDataPoint {
  name: string;
  value: number;
}

export default function ActivityChart(): JSX.Element {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  const userActivityData: ActivityDataPoint[] = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 750 },
  ];

  useEffect(() => {
    // Clean up previous chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Create new chart
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        const chartData: ChartData = {
          labels: userActivityData.map(item => item.name),
          datasets: [{
            label: 'User Activity',
            data: userActivityData.map(item => item.value),
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            tension: 0.1,
            fill: true
          }]
        };

        const chartOptions: ChartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        };

        const config: ChartConfiguration = {
          type: 'line',
          data: chartData,
          options: chartOptions
        };

        chartInstance.current = new Chart(ctx, config);
      }
    }
    
    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-surface p-4 rounded-xl shadow-md">
      <h3 className="font-medium mb-4">Monthly User Activity</h3>
      <div className="h-64">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
import  { useEffect, useRef, useState,JSX } from 'react';
import Chart from 'chart.js/auto';
import { ChartConfiguration, ChartData, ChartOptions, ChartEvent, ActiveElement } from 'chart.js';

interface SchoolData {
  name: string;
  performance: number;
}

type PerformanceRating = 'Excellent' | 'Very Good' | 'Good' | 'Satisfactory' | 'Needs Improvement';

export default function SchoolPerformanceChart(): JSX.Element {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  const schoolPerformanceData: SchoolData[] = [
    { name: 'School A', performance: 85 },
    { name: 'School B', performance: 72 },
    { name: 'School C', performance: 90 },
    { name: 'School D', performance: 68 },
    { name: 'School E', performance: 76 },
    { name: 'School F', performance: 82 },
    { name: 'School G', performance: 50 },
  ];

  // Get performance rating
  const getPerformanceRating = (score: number): PerformanceRating => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Satisfactory';
    return 'Needs Improvement';
  };

  // Get color based on performance
  const getColorForPerformance = (score: number): string => {
    if (score >= 90) return '#059669'; // Green 700
    if (score >= 80) return '#10B981'; // Green 500
    if (score >= 70) return '#6EE7B7'; // Green 300
    if (score >= 60) return '#FCD34D'; // Yellow 300
    return '#F87171'; // Red 400
  };

  // Get selected school data
  const getSelectedData = (): SchoolData | null => {
    if (!selectedSchool) return null;
    return schoolPerformanceData.find(item => item.name === selectedSchool) || null;
  };

  const selectedData = getSelectedData();

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
          labels: schoolPerformanceData.map(item => item.name),
          datasets: [
            {
              label: 'Performance Score',
              data: schoolPerformanceData.map(item => item.performance),
              backgroundColor: schoolPerformanceData.map(item =>
                getColorForPerformance(item.performance)
              ),
              borderColor: schoolPerformanceData.map(item =>
                getColorForPerformance(item.performance)
              ),
              borderWidth: 1,
              borderRadius: 4,
              barPercentage: 0.6,
              categoryPercentage: 0.8
            }
          ]
        };

        const chartOptions: ChartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 750,
            easing: 'easeOutQuart'
          },
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function (context) {
                  const score = context.raw as number || 0;
                  const rating = getPerformanceRating(score);
                  return [`Performance: ${score}%`, `Rating: ${rating}`];
                }
              }
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                drawBorder: false,
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                callback: function (value) {
                  return value + '%';
                }
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          onClick: (event: ChartEvent, elements: ActiveElement[]) => {
            if (elements && elements.length > 0) {
              const index = elements[0].index;
              setSelectedSchool(schoolPerformanceData[index].name);
            } else {
              setSelectedSchool(null);
            }
          }
        };

        const config: ChartConfiguration = {
          type: 'bar',
          data: chartData,
          options: chartOptions
        };

        chartInstance.current = new Chart(ctx, config);
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  // Update chart when school is selected
  useEffect(() => {
    if (chartInstance.current) {
      const chart = chartInstance.current;

      // Highlight selected bar
      const datasets = chart.data.datasets;
      if (datasets && datasets.length > 0) {
        datasets[0].backgroundColor = schoolPerformanceData.map((item,) => {
          const baseColor = getColorForPerformance(item.performance);
          return item.name === selectedSchool
            ? baseColor
            : baseColor.replace(')', ', 0.5)').replace('rgb', 'rgba');
        });
      }

      chart.update();
    }
  }, [selectedSchool]);

  // Performance rating scale for legend
  const performanceRatings: Array<{ rating: PerformanceRating, score: number }> = [
    { rating: 'Excellent', score: 90 },
    { rating: 'Very Good', score: 80 },
    { rating: 'Good', score: 70 },
    { rating: 'Satisfactory', score: 60 },
    { rating: 'Needs Improvement', score: 0 }
  ];

  return (
    <div className="bg-surface p-4 rounded-xl shadow-md">
      <h3 className="font-medium mb-4">Website  Performance</h3>
      <div className="h-64 mb-4">
        <canvas ref={chartRef} />
      </div>

      {selectedData && (
        <div className="p-4 rounded-lg mt-4 border border-color">
          <h4 className="font-medium text-center mb-3">{selectedData.name} Details</h4>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 relative mb-3">
              <div className="w-full h-full rounded-full backGroundColor shadow-2xl flex items-center justify-center">
                <div
                  className="absolute inset-1 rounded-full flex items-center justify-center"
                  style={{
                    background: `conic-gradient(${getColorForPerformance(selectedData.performance)} ${selectedData.performance}%, transparent 0)`,
                    mask: 'radial-gradient(white 45%, transparent 0)',
                    WebkitMask: 'radial-gradient(white 45%, transparent 0)'
                  }}
                />
                <span className="text-2xl font-medium text-secondary z-10">{selectedData.performance}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium" style={{ color: getColorForPerformance(selectedData.performance) }}>
                {getPerformanceRating(selectedData.performance)}
              </p>
              <p className="text-sm text-gray-500 mt-1">Performance Rating</p>
            </div>
          </div>
        </div>
      )}

      {!selectedData && (
        <div className="mt-4">
          <div className="flex justify-center gap-2 flex-wrap">
            {performanceRatings.map(({ rating, score }) => (
              <div key={rating} className="flex items-center gap-1 text-xs">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getColorForPerformance(score) }}
                />
                <span>{rating}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            Click on any bar to see detailed information
          </p>
        </div>
      )}
    </div>
  );
}
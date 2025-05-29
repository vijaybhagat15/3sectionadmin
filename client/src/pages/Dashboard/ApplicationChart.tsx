import { useEffect, useRef, useState, JSX } from 'react';
import Chart from 'chart.js/auto';
import { ChartConfiguration, ChartData, ChartOptions, ChartEvent, ActiveElement } from 'chart.js';

interface ApplicationData {
    name: string;
    applications: number;
    approvals: number;
}

export default function ApplicationChart(): JSX.Element {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [hoveredDataset, setHoveredDataset] = useState<number | null | undefined>(null);

    const applicationTrendsData: ApplicationData[] = [
        { name: 'Jan', applications: 24, approvals: 18 },
        { name: 'Feb', applications: 30, approvals: 22 },
        { name: 'Mar', applications: 45, approvals: 35 },
        { name: 'Apr', applications: 32, approvals: 28 },
        { name: 'May', applications: 38, approvals: 30 },
        { name: 'Jun', applications: 42, approvals: 36 },
    ];

    // Calculate approval rate for each month
    const getApprovalRate = (month: string): number => {
        const data = applicationTrendsData.find(item => item.name === month);
        return data ? Math.round((data.approvals / data.applications) * 100) : 0;
    };

    // Get selected month data
    const getSelectedData = (): ApplicationData | null => {
        if (!selectedMonth) return null;
        const data = applicationTrendsData.find(item => item.name === selectedMonth);
        return data || null;
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
                    labels: applicationTrendsData.map(item => item.name),
                    datasets: [
                        {
                            label: 'Total Applications',
                            data: applicationTrendsData.map(item => item.applications),
                            backgroundColor: 'rgba(136, 132, 216, 0.7)',
                            borderColor: 'rgba(136, 132, 216, 1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(136, 132, 216, 0.9)',
                            barPercentage: 0.7,
                            categoryPercentage: 0.8
                        },
                        {
                            label: 'Approved',
                            data: applicationTrendsData.map(item => item.approvals),
                            backgroundColor: 'rgba(130, 202, 157, 0.7)',
                            borderColor: 'rgba(130, 202, 157, 1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(130, 202, 157, 0.9)',
                            barPercentage: 0.7,
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
                                    const label = context.dataset.label || '';
                                    const value = context.raw || 0;
                                    return `${label}: ${value}`;
                                },
                                afterBody: function (tooltipItems) {
                                    const dataIndex = tooltipItems[0].dataIndex;
                                    const month = applicationTrendsData[dataIndex].name;
                                    const rate = getApprovalRate(month);
                                    return `Approval Rate: ${rate}%`;
                                }
                            }
                        },
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 15,
                                padding: 15
                            },
                            onHover: (event, legendItem) => {
                                setHoveredDataset(legendItem.datasetIndex);
                            },
                            onLeave: () => {
                                setHoveredDataset(null);
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false,
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                font: {
                                    size: 11
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 11
                                }
                            }
                        }
                    },
                    onClick: (event: ChartEvent, elements: ActiveElement[]) => {
                        if (elements && elements.length > 0) {
                            const index = elements[0].index;
                            setSelectedMonth(applicationTrendsData[index].name);
                        } else {
                            setSelectedMonth(null);
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

    // Update chart highlights when hovering over legend
    useEffect(() => {
        if (chartInstance.current && hoveredDataset !== null) {
            const datasets = chartInstance.current.data.datasets;

            datasets.forEach((dataset, index) => {
                if (index === hoveredDataset) {
                    dataset.backgroundColor = index === 0 ? 'rgba(136, 132, 216, 0.9)' : 'rgba(130, 202, 157, 0.9)';
                } else {
                    dataset.backgroundColor = index === 0 ? 'rgba(136, 132, 216, 0.3)' : 'rgba(130, 202, 157, 0.3)';
                }
            });

            chartInstance.current.update();
        } else if (chartInstance.current) {
            // Reset colors
            const datasets = chartInstance.current.data.datasets;
            datasets[0].backgroundColor = 'rgba(136, 132, 216, 0.7)';
            datasets[1].backgroundColor = 'rgba(130, 202, 157, 0.7)';
            chartInstance.current.update();
        }
    }, [hoveredDataset]);

    return (
        <div className="bg-surface p-4 rounded-xl shadow-md mb-6">
            <h3 className="font-medium mb-4">Application Trends</h3>
            <div className="h-64 mb-4">
                <canvas ref={chartRef} />
            </div>

            {selectedData && (
                <div className="p-3 bg-surface border border-color rounded-lg mt-4 text-sm">
                    <h4 className="font-medium text-center mb-2">{selectedMonth} Details</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-2 bg-surface drop-shadow-2xl rounded">
                            <p className="text-purple-600 font-medium text-lg">{selectedData.applications}</p>
                            <p className="text-gray-500">Applications</p>
                        </div>
                        <div className="p-2 bg-surface drop-shadow-2xl rounded">
                            <p className="text-green-600 font-medium text-lg">{selectedData.approvals}</p>
                            <p className="text-gray-500">Approvals</p>
                        </div>
                        <div className="p-2 bg-surface drop-shadow-2xl rounded">
                            <p className="text-blue-600 font-medium text-lg">{getApprovalRate(selectedMonth || '')}</p>
                            <p className="text-gray-500">Approval Rate %</p>
                        </div>
                    </div>
                </div>
            )}

            {!selectedData && (
                <p className="text-sm text-secondary text-center mt-2">
                    Click on any bar to see detailed information
                </p>
            )}
        </div>
    );
}

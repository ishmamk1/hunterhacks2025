import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BusyChartProps {
  locationName: string;
}

const BusyChart: React.FC<BusyChartProps> = ({ locationName }) => {
  const hourlyData = [
    { hour: '8AM', occupancy: 20 },
    { hour: '9AM', occupancy: 45 },
    { hour: '10AM', occupancy: 75 },
    { hour: '11AM', occupancy: 90 },
    { hour: '12PM', occupancy: 100 },
    { hour: '1PM', occupancy: 85 },
    { hour: '2PM', occupancy: 70 },
    { hour: '3PM', occupancy: 60 },
    { hour: '4PM', occupancy: 50 },
    { hour: '5PM', occupancy: 30 },
    { hour: '6PM', occupancy: 20 },
    { hour: '7PM', occupancy: 15 },
  ];

  const getCurrentHourIndex = () => {
    const hour = new Date().getHours();
    return hour >= 8 && hour <= 19 ? hour - 8 : -1;
  };

  const currentHourIndex = getCurrentHourIndex();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Popular times at ${locationName}`,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Occupancy %'
        }
      }
    }
  };

  const data = {
    labels: hourlyData.map(data => data.hour),
    datasets: [
      {
        data: hourlyData.map(data => data.occupancy),
        backgroundColor: hourlyData.map((_, index) => 
          index === currentHourIndex ? 'rgba(59, 130, 246, 0.8)' : 'rgba(209, 213, 219, 0.8)'
        ),
        borderColor: hourlyData.map((_, index) => 
          index === currentHourIndex ? 'rgb(59, 130, 246)' : 'rgb(209, 213, 219)'
        ),
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Bar options={options} data={data} height={300} />
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>Less busy</span>
        <div className="w-32 h-2 bg-gradient-to-r from-gray-300 to-blue-500 rounded-full" />
        <span>More busy</span>
      </div>
    </div>
  );
};

export default BusyChart;
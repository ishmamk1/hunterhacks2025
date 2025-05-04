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
  const daedalusLoungeData = [
    { hour: '8AM', occupancy: 5 },
    { hour: '9AM', occupancy: 10 },
    { hour: '10AM', occupancy: 20 },
    { hour: '11AM', occupancy: 30 },
    { hour: '12PM', occupancy: 40 },
    { hour: '1PM', occupancy: 35 },
    { hour: '2PM', occupancy: 25 },
    { hour: '3PM', occupancy: 15 },
    { hour: '4PM', occupancy: 10 },
    { hour: '5PM', occupancy: 5 },
    { hour: '6PM', occupancy: 5 },
    { hour: '7PM', occupancy: 5 },
  ];

  const eastLibraryData = [
    { hour: '8AM', occupancy: 7 },
    { hour: '9AM', occupancy: 15 },
    { hour: '10AM', occupancy: 25 },
    { hour: '11AM', occupancy: 35 },
    { hour: '12PM', occupancy: 45 },
    { hour: '1PM', occupancy: 50 },
    { hour: '2PM', occupancy: 40 },
    { hour: '3PM', occupancy: 30 },
    { hour: '4PM', occupancy: 20 },
    { hour: '5PM', occupancy: 10 },
    { hour: '6PM', occupancy: 5 },
    { hour: '7PM', occupancy: 5 },
  ];

  const westLobbyData = [
    { hour: '8AM', occupancy: 15 },
    { hour: '9AM', occupancy: 25 },
    { hour: '10AM', occupancy: 35 },
    { hour: '11AM', occupancy: 45 },
    { hour: '12PM', occupancy: 60 },
    { hour: '1PM', occupancy: 70 },
    { hour: '2PM', occupancy: 65 },
    { hour: '3PM', occupancy: 55 },
    { hour: '4PM', occupancy: 45 },
    { hour: '5PM', occupancy: 35 },
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
        display: false,
      },
      title: {
        display: true,
        text: `Popular times at ${locationName}`,
        font: {
          size: 14,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 80,
        title: {
          display: true,
          text: 'Occupancy %',
        },
      },
    },
  };

  const data = {
    labels: daedalusLoungeData.map((data) => data.hour),
    datasets: [
      {
        label: 'Daedalus Lounge',
        data: daedalusLoungeData.map((data) => data.occupancy),
        backgroundColor: daedalusLoungeData.map((_, index) =>
          index === currentHourIndex ? 'rgba(59, 130, 246, 0.8)' : 'rgba(209, 213, 219, 0.8)'
        ),
        borderColor: daedalusLoungeData.map((_, index) =>
          index === currentHourIndex ? 'rgb(59, 130, 246)' : 'rgb(209, 213, 219)'
        ),
        borderWidth: 1,
        borderRadius: 4,
        hidden: locationName !== 'Daedalus Lounge',
      },
      {
        label: 'East Library',
        data: eastLibraryData.map((data) => data.occupancy),
        backgroundColor: eastLibraryData.map((_, index) =>
          index === currentHourIndex ? 'rgba(34, 197, 94, 0.8)' : 'rgba(209, 213, 219, 0.8)'
        ),
        borderColor: eastLibraryData.map((_, index) =>
          index === currentHourIndex ? 'rgb(34, 197, 94)' : 'rgb(209, 213, 219)'
        ),
        borderWidth: 1,
        borderRadius: 4,
        hidden: locationName !== 'East Library',
      },
      {
        label: 'West Lobby',
        data: westLobbyData.map((data) => data.occupancy),
        backgroundColor: westLobbyData.map((_, index) =>
          index === currentHourIndex ? 'rgba(255, 159, 64, 0.8)' : 'rgba(209, 213, 219, 0.8)'
        ),
        borderColor: westLobbyData.map((_, index) =>
          index === currentHourIndex ? 'rgb(255, 159, 64)' : 'rgb(209, 213, 219)'
        ),
        borderWidth: 1,
        borderRadius: 4,
        hidden: locationName !== 'West Lobby',
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Bar options={options} data={data} height={250} />
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>Less busy</span>
        <div className="w-32 h-2 bg-gradient-to-r from-gray-300 to-blue-500 rounded-full" />
        <span>More busy</span>
      </div>
    </div>
  );
};

export default BusyChart;

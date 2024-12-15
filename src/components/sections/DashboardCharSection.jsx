import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Import Filler for area fill
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register Filler
);

const TimestampGraph = ({ data }) => {
  // Check if the data prop is valid
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="no-data-container">
        <p className="no-data-message">
          No data available to display the graph.
        </p>
      </div>
    );
  }

  // Group data by date and count occurrences
  const urlCounts = data.reduce((acc, item) => {
    const date = new Date(item.timestamp).toISOString().split("T")[0]; // Extract date
    acc[date] = (acc[date] || 0) + 1; // Increment count for this date
    return acc;
  }, {});

  // Prepare data for Chart.js
  const timestamps = Object.keys(urlCounts); // Array of dates (x-axis)
  const values = Object.values(urlCounts); // Count of URLs for each date (y-axis)

  // Chart.js configuration
  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Number of URLs Created per Date",
        data: values,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.3)", // Semi-transparent green for area fill
        pointBackgroundColor: "#388e3c",
        pointBorderColor: "#2e7d32",
        pointHoverBackgroundColor: "#1b5e20",
        fill: true, // Enable area fill
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "URLs Created Per Date",
        color: "#212121",
        font: {
          size: 20,
          weight: "bold",
        },
      },
      tooltip: {
        backgroundColor: "#616161",
        titleColor: "#fff",
        bodyColor: "#eee",
        borderColor: "#9e9e9e",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#424242",
        },
        grid: {
          color: "#e0e0e0",
        },
      },
      y: {
        ticks: {
          color: "#424242",
        },
        grid: {
          color: "#e0e0e0",
        },
      },
    },
  };

  // Calculate total and peak URL creation statistics
  const totalURLs = values.reduce((sum, count) => sum + count, 0);
  const peakDate = timestamps[values.indexOf(Math.max(...values))];
  const peakCount = Math.max(...values);

  return (
    <div className="graph-container">
      <div className="stats-container">
        <h2>Key Statistics</h2>
        <p>
          <strong>Total URLs Created:</strong> {totalURLs}
        </p>
        <p>
          <strong>Peak Date:</strong> {peakDate} ({peakCount} URLs)
        </p>
      </div>
      <div className="graph-content">
        <h2>URLs Created Per Date</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default TimestampGraph;

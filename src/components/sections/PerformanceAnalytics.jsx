import React from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Import necessary components
import { Chart as ChartJS } from "chart.js"; // Import Chart.js to register components
import {
  AlertTriangle,
  ArrowLeftCircle,
  Clipboard,
  StopCircle,
} from "react-feather";
import { AttributionControl } from "react-leaflet";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceAnalytics = () => {
  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "User Engagement",
        data: [100, 150, 250, 350, 450],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 3,
        tension: 0.4,
      },
      {
        label: "Conversion Rate",
        data: [50, 75, 100, 125, 150],
        fill: true,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 3,
        tension: 0.4,
      },
      {
        label: "Click-through Rate",
        data: [30, 50, 80, 120, 180],
        fill: true,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Performance Analytics",
        font: { size: 18 },
        padding: { bottom: 30 },
        color: "#4B8DF8",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        type: "category", // Set the scale type for the x-axis to 'category'
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
      },
      y: {
        type: "linear", // Set the scale type for the y-axis to 'linear'
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
      },
    },
  };

  return (
    <section className="py-12 mt-[80px] bg-white">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section: Text Information */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="flex items-center space-x-6">
            <div>
              <h2 className="text-3xl font-bold text-blue-700">
                <div className="flex items-center gap-3">
                  <Clipboard size={30} /> <div>Trimio Analytics</div>
                </div>
              </h2>
              <p className="text-gray-700 text-lg">
                Welcome to Trimio's performance analytics dashboard. Track the
                success of your shortened URLs, monitor user behavior, and
                optimize your marketing campaigns with data-driven insights.
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-blue-700">
              <div className="flex items-center gap-3">
                <ArrowLeftCircle size={30} /> <div>About Trimio</div>
              </div>
            </h2>
            <p className="text-gray-600 text-lg">
              Trimio is a robust URL shortening service designed to help
              businesses track and optimize their online links. Our powerful
              analytics provide valuable insights into user engagement,
              click-through rates, and conversion trends, ensuring that your
              marketing efforts are always data-driven.
            </p>
          </div>

          {/* Performance Insights */}
          {/* <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-blue-700">
              Performance Insights
            </h3>
            <p className="text-gray-600 text-sm">
              Our analytics provide a detailed look at user interactions with
              your links. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>User Engagement: How often your links are clicked.</li>
              <li>
                Conversion Rate: The percentage of users who perform the desired
                action after clicking.
              </li>
              <li>
                Click-through Rate: The rate at which users engage with the
                link.
              </li>
            </ul>
          </div> */}

          {/* Key Takeaways */}
          {/* <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-blue-700">
              Key Takeaways
            </h3>
            <p className="text-gray-600 text-sm">
              Trimio analytics show a significant increase in user engagement,
              conversion rates, and click-through rates, indicating that your
              shortened URLs are performing exceptionally well. Regularly
              monitoring these metrics will help you optimize your URLs for even
              better performance.
            </p>
          </div> */}
        </div>

        {/* Right Section: Graph */}
        <div className="w-full h-96 bg-white border rounded-lg shadow-xl p-6">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </section>
  );
};

export default PerformanceAnalytics;

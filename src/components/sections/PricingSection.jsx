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
} from "chart.js";
import { Chart as ChartJS } from "chart.js";

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

const Pricing = () => {
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
        type: "category",
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
      },
      y: {
        type: "linear",
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
    <section className="py-12 bg-white ">
      {/* Pricing Section */}
      <div className="bg-blue-100 rounded-3xl shadow-lg py-12">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-blue-700">
            Choose the Right Plan for You
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Trimio offers flexible pricing plans to suit businesses of all
            sizes. Whether you’re just starting out or need enterprise-level
            analytics, we’ve got a plan for you.
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-95 transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-blue-700">Basic</h3>
              <p className="text-gray-600 text-sm mb-4">
                Ideal for individuals and small businesses just starting out.
              </p>
              <div className="text-3xl font-bold text-blue-600">$0 / month</div>
              <ul className="space-y-2 mt-4">
                <li>500 URL Shortening Requests</li>
                <li>Basic Analytics</li>
                <li>Link Customization</li>
                <li>Email Support</li>
              </ul>
              <a
                href="/signup"
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700"
              >
                Start Free Trial
              </a>
            </div>

            {/* Pro Plan (Middle card with bigger size and up) */}
            <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out -translate-y-4">
              <h3 className="text-2xl font-semibold text-blue-700">Pro</h3>
              <p className="text-gray-600 text-sm mb-4">
                Perfect for growing businesses that need advanced analytics.
              </p>
              <div className="text-3xl font-bold text-blue-600">
                $19.99 / month
              </div>
              <ul className="space-y-2 mt-4">
                <li>5,000 URL Shortening Requests</li>
                <li>Advanced Analytics & Reporting</li>
                <li>Link Management</li>
                <li>Priority Email & Chat Support</li>
              </ul>
              <a
                href="/signup"
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700"
              >
                Upgrade Now
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-95 transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-blue-700">
                Enterprise
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Designed for large teams and enterprises with custom needs.
              </p>
              <div className="text-3xl font-bold text-blue-600">
                Custom Pricing
              </div>
              <ul className="space-y-2 mt-4">
                <li>Unlimited URL Shortening Requests</li>
                <li>Custom Analytics Dashboards</li>
                <li>API Integration</li>
                <li>24/7 Premium Support</li>
              </ul>
              <a
                href="/contact"
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

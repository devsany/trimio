import React from "react";
import { FaLink, FaCog, FaShieldAlt, FaChartBar } from "react-icons/fa"; // Import icons
import ServiceList from "./ServiceList";

const ServicesSection = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
        Explore Our URL Shortener Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Link Shortening Section */}
        <ServiceList
          icon={<FaLink className="text-4xl text-teal-400 mb-4 mx-auto" />}
          header="Easy Link Shortening"
          description="Shorten any long URLs with just a click! It's fast, reliable, and easy to use."
          color="[#FBFAF0]"
        />

        {/* Custom Links Section */}
        <ServiceList
          icon={<FaCog className="text-4xl text-indigo-400 mb-4 mx-auto" />}
          header="Customizable Links"
          description=" Create personalized short links that align with your brand or your
            needs."
          color="[#EBD5F3]"
        />

        {/* Security Section */}
        <ServiceList
          icon={
            <FaShieldAlt className="text-4xl text-yellow-400 mb-4 mx-auto" />
          }
          header="Secure & Private"
          description=" Your links are secured with encryption, ensuring that they’re safe
            from unauthorized access."
          color="[#F8F7DE]"
        />

        {/* Analytics Section */}
        <ServiceList
          icon={
            <FaShieldAlt className="text-4xl text-yellow-400 mb-4 mx-auto" />
          }
          header="Link Analytics"
          description="Track the performance of your shortened URLs with detailed analytics
            to optimize your strategy."
          color="[#DCF3EF]"
        />
      </div>
    </div>
  );
};

export default ServicesSection;

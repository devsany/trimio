import React from "react";
import Slider from "react-slick"; // Importing the carousel component
import { FaLink, FaCog, FaShieldAlt, FaChartBar } from "react-icons/fa"; // Icons

const TestimonialCarousel = () => {
  const settings = {
    dots: true, // Show dots navigation
    infinite: true, // Infinite loop for scrolling
    speed: 500, // Speed of transition
    slidesToShow: 1, // Number of items to show at once
    slidesToScroll: 1, // Number of items to scroll at once
    autoplay: true, // Enable auto-play
    autoplaySpeed: 3000, // Speed of auto-play
    centerMode: true, // Center the current slide
    focusOnSelect: true, // Focus on the selected slide
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
        Explore Our URL Shortener Features
      </h2>

      <Slider {...settings}>
        {/* Link Shortening Section */}
        <div className="text-center bg-gradient-to-t from-[#FBFAF0] p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <FaLink className="text-4xl text-teal-400 mb-4 mx-auto" />
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Easy Link Shortening
          </h3>
          <p className="text-gray-600 mb-4">
            Shorten any long URLs with just a click! It's fast, reliable, and
            easy to use.
          </p>
          <a href="/explore" className="text-teal-500 hover:text-teal-700">
            Explore
          </a>
        </div>

        {/* Custom Links Section */}
        <div className="text-center bg-gradient-to-t from-[#EBD5F3] to-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <FaCog className="text-4xl text-indigo-400 mb-4 mx-auto" />
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Customizable Links
          </h3>
          <p className="text-gray-600 mb-4">
            Create personalized short links that align with your brand or your
            needs.
          </p>
          <a href="/explore" className="text-indigo-500 hover:text-indigo-700">
            Explore
          </a>
        </div>

        {/* Security Section */}
        <div className="text-center bg-gradient-to-t from-[#F8F7DE] to-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <FaShieldAlt className="text-4xl text-yellow-400 mb-4 mx-auto" />
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Secure & Private
          </h3>
          <p className="text-gray-600 mb-4">
            Your links are secured with encryption, ensuring that they’re safe
            from unauthorized access.
          </p>
          <a href="/explore" className="text-yellow-500 hover:text-yellow-700">
            Explore
          </a>
        </div>

        {/* Analytics Section */}
        <div className="text-center bg-gradient-to-t from-[#DCF3EF] to-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <FaChartBar className="text-4xl text-purple-400 mb-4 mx-auto" />
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Link Analytics
          </h3>
          <p className="text-gray-600 mb-4">
            Track the performance of your shortened URLs with detailed analytics
            to optimize your strategy.
          </p>
          <a href="/explore" className="text-purple-500 hover:text-purple-700">
            Explore
          </a>
        </div>
      </Slider>
    </div>
  );
};

export default TestimonialCarousel;

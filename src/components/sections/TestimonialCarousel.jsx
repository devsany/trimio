import React from "react";
import Slider from "react-slick";
import { FaLink, FaCog, FaShieldAlt, FaChartBar } from "react-icons/fa";

const TestimonialCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    focusOnSelect: true,
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
        Explore Our URL Shortener Features
      </h2>

      <Slider {...settings}>
        {/* Link Shortening Section */}
        <div className="group relative bg-gradient-to-t from-[#FBFAF0] to-[#F8F7DE] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
          <div className="text-center w-full">
            <FaLink className="text-4xl text-teal-400 mb-4 mx-auto" />
            <h3 className="text-xl font-medium text-gray-800 mb-4">
              Easy Link Shortening
            </h3>
            <p className="text-gray-600 mb-4">
              Shorten any long URLs with just a click! It's fast, reliable, and
              easy to use.
            </p>
            <a
              href="/explore"
              className="inline-block text-teal-500 hover:text-teal-700 py-2 px-4 border border-teal-500 rounded-md transition-all group-hover:bg-teal-500 group-hover:text-white mt-4"
            >
              Explore
            </a>
          </div>
        </div>

        {/* Custom Links Section */}
        <div className="group relative bg-gradient-to-t from-[#EBD5F3] to-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
          <div className="text-center w-full">
            <FaCog className="text-4xl text-indigo-400 mb-4 mx-auto" />
            <h3 className="text-xl font-medium text-gray-800 mb-4">
              Customizable Links
            </h3>
            <p className="text-gray-600 mb-4">
              Create personalized short links that align with your brand or your
              needs.
            </p>
            <a
              href="/explore"
              className="inline-block text-indigo-500 hover:text-indigo-700 py-2 px-4 border border-indigo-500 rounded-md transition-all group-hover:bg-indigo-500 group-hover:text-white mt-4"
            >
              Explore
            </a>
          </div>
        </div>

        {/* Security Section */}
        <div className="group relative bg-gradient-to-t from-[#F8F7DE] to-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
          <div className="text-center w-full">
            <FaShieldAlt className="text-4xl text-yellow-400 mb-4 mx-auto" />
            <h3 className="text-xl font-medium text-gray-800 mb-4">
              Secure & Private
            </h3>
            <p className="text-gray-600 mb-4">
              Your links are secured with encryption, ensuring that they’re safe
              from unauthorized access.
            </p>
            <a
              href="/explore"
              className="inline-block text-yellow-500 hover:text-yellow-700 py-2 px-4 border border-yellow-500 rounded-md transition-all group-hover:bg-yellow-500 group-hover:text-white mt-4"
            >
              Explore
            </a>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="group relative bg-gradient-to-t from-[#DCF3EF] to-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
          <div className="text-center w-full">
            <FaChartBar className="text-4xl text-purple-400 mb-4 mx-auto" />
            <h3 className="text-xl font-medium text-gray-800 mb-4">
              Link Analytics
            </h3>
            <p className="text-gray-600 mb-4">
              Track the performance of your shortened URLs with detailed
              analytics to optimize your strategy.
            </p>
            <a
              href="/explore"
              className="inline-block text-purple-500 hover:text-purple-700 py-2 px-4 border border-purple-500 rounded-md transition-all group-hover:bg-purple-500 group-hover:text-white mt-4"
            >
              Explore
            </a>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default TestimonialCarousel;

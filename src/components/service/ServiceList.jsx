import React from "react";

const ServiceList = (props) => {
  const { icon, header, description ,color} = props;
  return (
    <div>
      <div className={`text-center bg-gradient-to-t from-${color} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow`}>
        {icon}
        <h3 className="text-xl font-medium text-gray-800 mb-4">{header}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a href="/explore" className="text-teal-500 hover:text-teal-700">
          Explore
        </a>
      </div>
    </div>
  );
};

export default ServiceList;

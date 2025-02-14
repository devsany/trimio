import React from "react";
import { FaClipboard } from "react-icons/fa";

const AboutTrimoAnalytics = (props) => {    
  const { header, description, iconSize, icon } = props;
  return (
    <>
      <h2 className="text-3xl font-bold text-blue-700">
        <div className="flex items-center gap-3">
           {icon} <div>{header}</div>
        </div>
      </h2>
      <p className="text-gray-700 text-lg">{description}</p>
    </>
  );
};

export default AboutTrimoAnalytics;

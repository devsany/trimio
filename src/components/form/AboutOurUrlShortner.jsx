import React from "react";

const AboutOurUrlShortner = (props) => {
  const { icon, header, description } = props;
  return (
    <div>
      {" "}
      <div className="flex items-start space-x-6">
        {icon}
        <div>
          <h3 className="text-xl font-semibold text-blue-700">{header}</h3>
          <p className="text-gray-700 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutOurUrlShortner;

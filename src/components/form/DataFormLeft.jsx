import React from "react";
import { CheckCircle, Clipboard, Link2, Share2 } from "react-feather";
import AboutOurUrlShortner from "./AboutOurUrlShortner";

const DataFormLeft = () => {
  return (
    <div>
      {" "}
      <div className="flex flex-col space-y-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Why Use Our URL Shortener?
        </h2>
        <AboutOurUrlShortner
          icon={<Link2 className="text-blue-500" size={48} />}
          header="URL Shortening"
          description="Easily shorten long URLs for better sharing and tracking."
        />
        <div className="flex items-start space-x-6">
          <AboutOurUrlShortner
            icon={<Clipboard className="text-pink-500" size={48} />}
            header="Copy to Clipboard"
            description="Quickly copy shortened URLs to your clipboard for fast sharing."
          />
        </div>
        <div className="flex items-start space-x-6">
          <AboutOurUrlShortner
            icon={<CheckCircle className="text-yellow-400" size={48} />}
            header="Track Success"
            description="Monitor the engagement of your shortened URLs with ease."
          />
        </div>
        <div className="flex items-start space-x-6">
          <AboutOurUrlShortner
            icon={<Share2 className="text-red-500" size={48} />}
            header="Share Fast"
            description=" Share shortened links directly across social media platforms."
          />
        </div>
      </div>
    </div>
  );
};

export default DataFormLeft;

import React from "react";
import { CheckCircle, Clipboard, Link2, Share2 } from "react-feather";

const DataFormLeft = () => {
  return (
    <div>
      {" "}
      <div className="flex flex-col space-y-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Why Use Our URL Shortener?
        </h2>
        <div className="flex items-start space-x-6">
          <Link2 className="text-blue-500" size={48} />
          <div>
            <h3 className="text-xl font-semibold text-blue-700">
              URL Shortening
            </h3>
            <p className="text-gray-700 text-sm">
              Easily shorten long URLs for better sharing and tracking.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-6">
          <Clipboard className="text-pink-500" size={48} />
          <div>
            <h3 className="text-xl font-semibold text-blue-700">
              Copy to Clipboard
            </h3>
            <p className="text-gray-700 text-sm">
              Quickly copy shortened URLs to your clipboard for fast sharing.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-6">
          <CheckCircle className="text-yellow-400" size={48} />
          <div>
            <h3 className="text-xl font-semibold text-blue-700">
              Track Success
            </h3>
            <p className="text-gray-700 text-sm">
              Monitor the engagement of your shortened URLs with ease.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-6">
          <Share2 className="text-red-500" size={48} />
          <div>
            <h3 className="text-xl font-semibold text-blue-700">Share Fast</h3>
            <p className="text-gray-700 text-sm">
              Share shortened links directly across social media platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFormLeft;

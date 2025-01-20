import React from "react";
import DataFormLeft from "../DataFormLeft";
import DataFormRight from "../DataFormRight";
import ThreadAnimation from "../../animation/ThreadAnimation ";

const UrlFormMain = () => {
  return (
    <div>
      <section className="flex justify-center items-center py-12 rounded-xl bg-blue-50">
        <div className="container relative max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Section: Informative Icons */}
          <div className="absolute ml-[-100px]">
            <ThreadAnimation />
          </div>

          <DataFormLeft />

          {/* Right Section: URL Shortening Form */}

          <DataFormRight />
        </div>
      </section>
    </div>
  );
};

export default UrlFormMain;

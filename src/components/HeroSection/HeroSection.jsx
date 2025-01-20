import React, { useState } from "react";
import FloatingDots from "../animation/FloatingDots";
import WaveAnimationGSAP from "../animation/WaveAnimation ";
import WaveAnimationCanvas from "../animation/WaveAnimation";

const HeroSection = () => {
  const [position, setPosition] = useState({ x: 49, y: 49 });
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };
  return (
    <div>
      {" "}
      <section className="text-center mb-8">
        <div className="m-[10px] relative pt-10 pb-10 bg-blue-50 mt-[70px] rounded-tl-3xl  rounded-tr-3xl   ">
          <div className="absolute ml-14">
            <div className="flex gap-30">
              <div></div>
              <div>
                <FloatingDots />
              </div>
            </div>
          </div>

          <div className="hidden md:block w-[400px] opacity-60  right-0 mt-[60px]   absolute">
            <img
              src="/illustration-ezgif.com-png-to-jpg-converter.png"
              alt=""
            />
          </div>

          <div className="flex justify-center mt-10 pt-[50px] hover:cursor-auto  mb-5 ">
            <h1
              onMouseMove={handleMouseMove}
              style={{
                transform: `perspective(1000px) rotateX(${
                  (position.y - 50) / 2
                }deg) rotateY(${(position.x - 50) / 2}deg)  `,
              }}
              className="text-5xl w-[75%] font-bold text-blue-600"
            >
              Trimio: Simplifying URLs with style and{" "}
              <span className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-[#FECC39] bg-clip-text text-transparent">
                powerful analytics.
              </span>
              <div className="flex justify-center">
                <p className="  text-slate-700 text-lg w-[75%] font-thin mt-4">
                  Trimio simplifies long URLs into short, shareable links with a
                  sleek design and powerful analytics. Perfect for anyone who
                  values efficiency and style.
                </p>
              </div>
            </h1>
          </div>
          <div className="flex justify-center mt-[50px]">
            <div className="bg-slate-800 text-white pl-4 pr-4 pt-1 pb-1 cursor-pointer font-semibold text-sm shadow-md rounded-full">
              Get Started
            </div>
            <div className="bg-[#75c4ec] ml-2 text-slate-700 pl-4 pr-4 pt-1 pb-1 cursor-pointer font-semibold text-sm shadow-md rounded-full">
              Contact Us
            </div>
          </div>
          <div className="mb-[-38px]">
            <WaveAnimationCanvas />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

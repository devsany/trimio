import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FloatingDots = () => {
  const dotsRef = useRef([]);

  useEffect(() => {
    dotsRef.current.forEach((dot, index) => {
      gsap.to(dot, {
        y: -200,
        x: index % 2 === 0 ? 50 : -50,
        repeat: -1,
        yoyo: true,
        duration: 2 + index * 0.5,
        ease: "power1.inOut",
      });
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen  ">
      {[...Array(10)].map((_, index) => (
        <div
          className="opacity-50"
          key={index}
          ref={(el) => (dotsRef.current[index] = el)}
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "#8e44ad",
            borderRadius: "50%",
            margin: "10px",
          }}
        ></div>
      ))}
    </div>
  );
};

export default FloatingDots;

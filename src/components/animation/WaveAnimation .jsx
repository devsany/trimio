import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const WaveAnimation = () => {
  const dotsRef = useRef([]);

  useEffect(() => {
    dotsRef.current.forEach((dot, index) => {
      gsap.to(dot, {
        y: index % 2 === 0 ? 20 : -20,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        delay: index * 0.1,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          ref={(el) => (dotsRef.current[index] = el)}
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: "#2ecc71",
            borderRadius: "50%",
            margin: "5px",
          }}
        ></div>
      ))}
    </div>
  );
};

export default WaveAnimation;

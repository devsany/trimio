import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BouncingBall = () => {
  const ballRef = useRef(null);

  useEffect(() => {
    gsap.to(ballRef.current, {
      y: 300,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "bounce.out",
    });
  }, []);

  return (
    <div className="flex justify-center items-start h-screen ">
      <div
        ref={ballRef}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "#A294F9",
          borderRadius: "50%",
        }}
      ></div>
    </div>
  );
};

export default BouncingBall;

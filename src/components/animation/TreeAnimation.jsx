import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TreeAnimation = () => {
  const trunkRef = useRef(null);
  const branchesRef = useRef([]);

  useEffect(() => {
    // Animate the trunk
    gsap.fromTo(
      trunkRef.current,
      { strokeDasharray: 300, strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 2, ease: "power1.inOut" }
    );

    // Animate the branches
    branchesRef.current.forEach((branch, index) => {
      gsap.fromTo(
        branch,
        { strokeDasharray: 200, strokeDashoffset: 200 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: 2 + index * 0.5,
          ease: "power1.inOut",
        }
      );
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen  ">
      <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
        {/* Tree Trunk */}
        <path
          ref={trunkRef}
          d="M200 300 L200 200"
          stroke="#8B4513"
          strokeWidth="6"
        />
        {/* Branches */}
        <path
          ref={(el) => (branchesRef.current[0] = el)}
          d="M200 200 C180 180 150 150 130 130"
          stroke="#8B4513"
          strokeWidth="4"
        />
        <path
          ref={(el) => (branchesRef.current[1] = el)}
          d="M200 200 C220 180 250 150 270 130"
          stroke="#8B4513"
          strokeWidth="4"
        />
        <path
          ref={(el) => (branchesRef.current[2] = el)}
          d="M200 250 C180 240 150 220 130 200"
          stroke="#8B4513"
          strokeWidth="4"
        />
        <path
          ref={(el) => (branchesRef.current[3] = el)}
          d="M200 250 C220 240 250 220 270 200"
          stroke="#8B4513"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

export default TreeAnimation;

import React, { useRef, useEffect } from "react";

const WaveAnimationCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = 150);

    const waves = [
      {
        height: 20,
        wavelength: 0.02,
        speed: 30,
        color: "#CDC1FF",
      },
      {
        height: 15,
        wavelength: 0.03,
        speed: 50,
        color: "rgba(0, 200, 150, 0.4)",
      },
      {
        height: 25,
        wavelength: 0.015,
        speed: 20,
        color: "rgba(25, 13, 100, 0.3)",
      },
    ];

    // Variable to track the downward movement over time
    let downwardOffset = 0;
    const waveLimit = height; // Set a limit to prevent the wave from going too far down

    const drawWave = () => {
      ctx.clearRect(0, 0, width, height);

      waves.forEach((wave) => {
        let offset = wave.speed * Date.now() * 0.002; // Unique offset per wave
        ctx.fillStyle = wave.color;
        ctx.beginPath();
        ctx.moveTo(0, height / 2 + downwardOffset);

        for (let x = 0; x < width; x++) {
          // Adjust wave to only move down by changing the vertical position
          let y =
            Math.sin((x + offset) * wave.wavelength) * wave.height +
            height / 2 +
            downwardOffset;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height); // Filling the bottom part of the canvas
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      });

      // Increase the downwardOffset for downward movement
      downwardOffset += 0.1; // You can adjust the rate of downward movement here

      // If the downwardOffset goes beyond the canvas height, reset it
      if (downwardOffset > waveLimit) {
        downwardOffset = 0;
      }

      requestAnimationFrame(drawWave);
    };

    drawWave();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = 150;
    });

    return () => window.removeEventListener("resize", () => {});
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "120px" }} />;
};

export default WaveAnimationCanvas;

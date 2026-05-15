import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const AnimatedBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // 300-frame cycle (~10s) — very slow breathing
  const cycle = (frame % 300) / 300;
  const pulse = Math.sin(cycle * Math.PI * 2);

  const radiusX = interpolate(pulse, [-1, 1], [55, 75]);
  const radiusY = interpolate(pulse, [-1, 1], [35, 50]);
  const opacity = interpolate(pulse, [-1, 1], [0.7, 1.0]);
  const cx = 50 + Math.sin(cycle * Math.PI * 2) * 3;
  const cy = 15 + Math.cos(cycle * Math.PI * 2) * 2;

  return (
    <>
      {/* Base solid */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#020d0d" }} />

      {/* Animated radial gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(
            ellipse ${radiusX}% ${radiusY}% at ${cx}% ${cy}%,
            rgba(0,60,58,${opacity})   0%,
            rgba(0,40,38,0.8)          30%,
            rgba(2,20,19,0.9)          60%,
            rgba(2,13,13,1)            100%
          )`,
        }}
      />

      {/* SVG grid — very subtle */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(0,207,206,0.04)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </>
  );
};

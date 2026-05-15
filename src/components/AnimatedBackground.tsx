import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const AnimatedBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // 300-frame cycle (~10s) — very slow breathing
  const cycle = (frame % 300) / 300;
  const pulse = Math.sin(cycle * Math.PI * 2);

  const radiusX = interpolate(pulse, [-1, 1], [65, 90]);
  const radiusY = interpolate(pulse, [-1, 1], [45, 65]);
  const opacity = interpolate(pulse, [-1, 1], [0.85, 1.0]);
  const cx = 50 + Math.sin(cycle * Math.PI * 2) * 3;
  const cy = 20 + Math.cos(cycle * Math.PI * 2) * 2;

  return (
    <>
      {/* Base solid */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#020d0d" }} />

      {/* Ambient teal layer — always-on base glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 55% at 50% 18%, rgba(0,55,52,0.55) 0%, rgba(0,25,23,0.3) 50%, transparent 100%)" }} />

      {/* Animated radial gradient — breathing */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(
            ellipse ${radiusX}% ${radiusY}% at ${cx}% ${cy}%,
            rgba(0,90,85,${opacity})   0%,
            rgba(0,58,54,0.88)         28%,
            rgba(2,28,26,0.92)         60%,
            rgba(2,13,13,1)            100%
          )`,
        }}
      />

      {/* SVG grid — subtle */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(0,207,206,0.06)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </>
  );
};

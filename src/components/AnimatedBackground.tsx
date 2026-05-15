import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const AnimatedBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30; // seconds

  // Orb 1 — large, slow Lissajous drift (top-left quadrant)
  const orb1X = 28 + Math.sin(t * 0.22) * 18 + Math.sin(t * 0.09) * 7;
  const orb1Y = 28 + Math.cos(t * 0.17) * 15 + Math.cos(t * 0.07) * 8;

  // Orb 2 — large, different phase (bottom-right quadrant)
  const orb2X = 68 + Math.sin(t * 0.18 + 2.1) * 20 + Math.cos(t * 0.11) * 6;
  const orb2Y = 62 + Math.cos(t * 0.14 + 1.5) * 18 + Math.sin(t * 0.08) * 9;

  // Orb 3 — medium, faster, center drift
  const orb3X = 50 + Math.sin(t * 0.30 + 3.7) * 14 + Math.cos(t * 0.13) * 5;
  const orb3Y = 45 + Math.cos(t * 0.24 + 1.2) * 14 + Math.sin(t * 0.10) * 6;

  // Breathing pulse (300-frame cycle)
  const cycle  = (frame % 300) / 300;
  const pulse  = Math.sin(cycle * Math.PI * 2);
  const baseOp = interpolate(pulse, [-1, 1], [0.82, 1.0]);

  return (
    <>
      {/* Base deep dark */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#020d0d" }} />

      {/* Orb 1 — top-left warm teal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(
            circle 360px at ${orb1X}% ${orb1Y}%,
            rgba(0,207,206,0.13) 0%,
            rgba(0,130,125,0.07) 40%,
            transparent 70%
          )`,
        }}
      />

      {/* Orb 2 — bottom-right cooler teal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(
            circle 320px at ${orb2X}% ${orb2Y}%,
            rgba(0,180,175,0.11) 0%,
            rgba(0,100,95,0.06) 42%,
            transparent 68%
          )`,
        }}
      />

      {/* Orb 3 — center accent, smaller */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(
            circle 240px at ${orb3X}% ${orb3Y}%,
            rgba(0,207,206,0.09) 0%,
            rgba(0,150,145,0.04) 45%,
            transparent 70%
          )`,
        }}
      />

      {/* Breathing radial gradient — top ambient dome */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(
            ellipse 80% 50% at 50% 15%,
            rgba(0,80,76,${baseOp * 0.60}) 0%,
            rgba(0,45,42,0.40) 35%,
            rgba(2,18,17,0.55) 65%,
            rgba(2,13,13,0.95) 100%
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
              stroke="rgba(0,207,206,0.055)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </>
  );
};

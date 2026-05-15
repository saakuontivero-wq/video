import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const AnimatedBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30; // seconds

  // Orb 1 — large, top-left sweep
  const orb1X = 28 + Math.sin(t * 0.22) * 18 + Math.sin(t * 0.09) * 7;
  const orb1Y = 28 + Math.cos(t * 0.17) * 15 + Math.cos(t * 0.07) * 8;

  // Orb 2 — large, bottom-right sweep
  const orb2X = 68 + Math.sin(t * 0.18 + 2.1) * 20 + Math.cos(t * 0.11) * 6;
  const orb2Y = 62 + Math.cos(t * 0.14 + 1.5) * 18 + Math.sin(t * 0.08) * 9;

  // Orb 3 — medium, center drift
  const orb3X = 50 + Math.sin(t * 0.30 + 3.7) * 14 + Math.cos(t * 0.13) * 5;
  const orb3Y = 45 + Math.cos(t * 0.24 + 1.2) * 14 + Math.sin(t * 0.10) * 6;

  // Breathing pulse
  const cycle  = (frame % 300) / 300;
  const pulse  = Math.sin(cycle * Math.PI * 2);
  const baseOp = interpolate(pulse, [-1, 1], [0.75, 1.0]);

  return (
    <>
      {/* Base deep dark */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#010a0a" }} />

      {/* Orb 1 — very bright, large */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(
            circle 480px at ${orb1X}% ${orb1Y}%,
            rgba(0,207,206,0.32)  0%,
            rgba(0,160,155,0.18)  30%,
            rgba(0,100,95,0.08)   55%,
            transparent           75%
          )`,
        }}
      />

      {/* Orb 2 — bright, different position */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(
            circle 420px at ${orb2X}% ${orb2Y}%,
            rgba(0,190,188,0.26)  0%,
            rgba(0,130,125,0.14)  32%,
            rgba(0,80,76,0.06)    58%,
            transparent           75%
          )`,
        }}
      />

      {/* Orb 3 — medium accent */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(
            circle 300px at ${orb3X}% ${orb3Y}%,
            rgba(0,207,206,0.20)  0%,
            rgba(0,160,155,0.10)  40%,
            transparent           70%
          )`,
        }}
      />

      {/* Top ambient dome — always-on soft glow */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(
            ellipse 75% 45% at 50% 12%,
            rgba(0,100,95,${baseOp * 0.55}) 0%,
            rgba(0,55,52,0.35) 40%,
            rgba(2,18,17,0.60) 70%,
            rgba(2,13,13,0.95) 100%
          )`,
        }}
      />

      {/* SVG grid */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(0,207,206,0.06)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </>
  );
};
